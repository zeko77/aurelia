import {
  Primitive,
  isArrayIndex,
} from '@aurelia/kernel';
import {
  AccessorOrObserver,
  IBindingContext,
  IBindingTargetAccessor,
  IBindingTargetObserver,
  IObservable,
  IObservedArray,
  IObservedMap,
  IObservedSet,
  IPropertyObserver,
} from '../observation';
import { getArrayObserver } from './array-observer';
import { getMapObserver } from './map-observer';
import { PrimitiveObserver } from './primitive-observer';
import { getSetObserver } from './set-observer';
import { SetterObserver } from './setter-observer';
import { GetterObserver, ComputedOverrides } from './getter-observer';

export const Observable = Object.freeze({
  getArrayObserver: getArrayObserver,
  getMapObserver: getMapObserver,
  getSetObserver: getSetObserver,
  getObserver: getObserver,
  hasObserver: hasObserver,
  lockAdapter: lockAdapter,
  unlockAdapter: unlockAdapter,
  addObservationAdapter: addObservationAdapter,
  removeObservationAdapter: removeObservationAdapter,
  /**
   * @internal
   */
  createPropertyObserver: createPropertyObserver,
});

type $PropertyKey = Exclude<PropertyKey, symbol>;
type $ObserverRecord = Record<PropertyKey, IBindingTargetObserver>;
type ComputedLookup = { computed?: Record<string, ComputedOverrides> };

const toStringTag = Object.prototype.toString;
const computedOverrideDefaults: ComputedOverrides = { static: false, volatile: false };

interface IObservationAdapter {
  priority: number;
  handles(obj: object, key: PropertyKey): boolean;
  getObserver(obj: object, key: PropertyKey): IBindingTargetObserver;
}

const adapters: IObservationAdapter[] = [];

function getAdapterObserver(obj: object, key: PropertyKey): IBindingTargetObserver | null {
  let adapter: IObservationAdapter | undefined;
  for (let i = 0, ii = adapters.length; ii > 0; ++i) {
    const $adapter = adapters[i];
    if ($adapter.handles(obj, key)) {
      if (adapter == null || $adapter.priority > adapter.priority) {
        adapter = $adapter;
      }
    }
  }
  if (adapter != null) {
    return adapter.getObserver(obj, key) || null;
  }
  return null;
}

function createPropertyObserver(obj: IObservable|IBindingContext, key: PropertyKey): IBindingTargetObserver {
  // fixed observation:
  // - primitive (none)
  // - array
  // - map
  // - set
  if (!(obj instanceof Object)) {
    return new PrimitiveObserver(obj as unknown as Primitive, key) as unknown as IBindingTargetObserver;
  }

  const tag = toStringTag.call(obj);
  switch (tag) {
    case '[object Array]':
      if (key === 'length') {
        return getArrayObserver(obj as IObservedArray).getLengthObserver();
      }
      // is numer only returns true for integer
      if (isArrayIndex(key)) {
        return getArrayObserver(obj as IObservedArray).getIndexObserver(Number(key));
      }
      break;
    case '[object Map]':
      if (key === 'size') {
        return getMapObserver(obj as IObservedMap).getLengthObserver();
      }
      break;
    case '[object Set]':
      if (key === 'size') {
        return getSetObserver(obj as IObservedSet).getLengthObserver();
      }
      break;
  }
  // ----------
  // adaptive observation everything else

  // first via checking adapter
  // attempt to use an adapter before resorting to dirty checking.
  // example: an application & its plugins give different ways of how to observe a Node/an Element
  const adapterObserver = getAdapterObserver(obj, key);
  if (adapterObserver != null) {
    return adapterObserver;
  }

  const descriptor = getPropertyDescriptor(obj, key) as PropertyDescriptor & {
    get: PropertyDescriptor['get'] & { getObserver(obj: IObservable|IBindingContext): IBindingTargetObserver };
  };

  // then attempt to check getter custom declaration
  if (descriptor != null) {
    if (!descriptor.configurable) {
      // return new DirtyChecker();
    }

    if (descriptor.get != null) {
      if (descriptor.get.getObserver != null) {
        return descriptor.get.getObserver(obj);
      }

      const computedConfiguration = (obj as IObservable & { constructor: { prototype: ComputedLookup } }).constructor.prototype.computed;
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unnecessary-type-assertion
      const overrides: ComputedOverrides = computedConfiguration != null && computedConfiguration[key] || computedOverrideDefaults;
      return new GetterObserver(obj as IObservable, key, descriptor, overrides);
    }

    if (descriptor.set != null) {
      // return new CustomSetterObserver();
    }
  }

  // finally just use a traditional getter/setter
  return new SetterObserver(obj, key);
}

export function hasObserver(obj: object, key: PropertyKey): boolean {
  const observerLookup = (obj as IObservable).$observers;
  if (observerLookup == null) {
    return false;
  }
  return key in observerLookup;
}

export function getObserver(obj: IObservable|IBindingContext, key: PropertyKey): IBindingTargetObserver {
  const $key = key as $PropertyKey;
  let observersLookup = obj.$observers as $ObserverRecord;

  if (observersLookup != null && $key in observersLookup) {
    return observersLookup[$key] as IBindingTargetObserver;
  }

  const observer: IBindingTargetObserver & { doNotCache?: boolean } = createPropertyObserver(obj, $key);

  if (!observer.doNotCache) {
    if (observersLookup === void 0) {
      observersLookup = createObserverLookup(obj);
    }

    observersLookup[$key] = observer;
  }

  return observer;
}

let adapterLocked = true;
let lastLockToken = 0;
function lockAdapter() {
  adapterLocked = false;
  return lastLockToken = Math.random();
}
function unlockAdapter(unlockToken: number) {
  if (unlockToken === lastLockToken) {
    adapterLocked = true;
    lastLockToken = 0;
  }
}

function addObservationAdapter(observationAdapter: IObservationAdapter): void {
  if (adapterLocked && !adapters.includes(observationAdapter)) {
    adapters.push(observationAdapter);
  }
}
function removeObservationAdapter(observationAdapter: IObservationAdapter): void {
  if (!adapterLocked && adapters.includes(observationAdapter)) {
    adapters.splice(adapters.indexOf(observationAdapter), -1);
  }
}

export function getPropertyDescriptor(subject: object, key: PropertyKey): PropertyDescriptor {
  let pd = Object.getOwnPropertyDescriptor(subject, key);
  let proto = Object.getPrototypeOf(subject);

  while (pd == null && proto != null) {
    pd = Object.getOwnPropertyDescriptor(proto, key);
    proto = Object.getPrototypeOf(proto);
  }

  return pd!;
}

const observersRecordPropertyDescriptor: PropertyDescriptor = {
  configurable: true,
  value: null,
};

function createObserverLookup<T extends IObservable | IBindingContext = IObservable | IBindingContext>(obj: T): $ObserverRecord {
  observersRecordPropertyDescriptor.value = new InternalObserverLookup();
  Reflect.defineProperty(obj, '$observers', observersRecordPropertyDescriptor);
  observersRecordPropertyDescriptor.value = null;
  return obj.$observers as $ObserverRecord;
}

class InternalObserverLookup {}
