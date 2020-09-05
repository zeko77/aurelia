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
  const $propertyName = key as $PropertyKey;
  // fixed observation:
  // - primitive (none)
  // - array
  // - map
  // - set
  if (!(obj instanceof Object)) {
    return new PrimitiveObserver(obj as unknown as Primitive, $propertyName) as unknown as IBindingTargetObserver;
  }

  const tag = toStringTag.call(obj);
  switch (tag) {
    case '[object Array]':
      if ($propertyName === 'length') {
        return getArrayObserver(obj as IObservedArray).getLengthObserver();
      }
      // is numer only returns true for integer
      if (isArrayIndex($propertyName)) {
        return getArrayObserver(obj as IObservedArray).getIndexObserver(Number($propertyName));
      }
      break;
    case '[object Map]':
      if ($propertyName === 'size') {
        return getMapObserver(obj as IObservedMap).getLengthObserver();
      }
      break;
    case '[object Set]':
      if ($propertyName === 'size') {
        return getSetObserver(obj as IObservedSet).getLengthObserver();
      }
      break;
  }
  // ----------
  // adaptive observation everything else

  // first via checking adapter
  // attempt to use an adapter before resorting to dirty checking.
  // example: an application & its plugins give different ways of how to observe a Node/an Element
  const adapterObserver = getAdapterObserver(obj, $propertyName);
  if (adapterObserver != null) {
    return adapterObserver;
  }

  const descriptor = getPropertyDescriptor(obj, $propertyName) as PropertyDescriptor & {
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
      const overrides: ComputedOverrides = computedConfiguration != null && computedConfiguration[$propertyName] || computedOverrideDefaults;
      return new GetterObserver(obj as IObservable, $propertyName, descriptor, overrides);
    }

    if (descriptor.set != null) {
      // return new CustomSetterObserver();
    }
  }

  // finally just use a traditional getter/setter
  return new SetterObserver(obj, $propertyName);
}

export function hasObserver(obj: object, propertyName: PropertyKey): boolean {
  const observerLookup = (obj as IObservable).$observers;
  if (observerLookup == null) {
    return false;
  }
  return propertyName in observerLookup;
}

export function getObserver(obj: IObservable|IBindingContext, key: PropertyKey): IBindingTargetObserver {
  const $key = key as $PropertyKey;
  // if (flags & LifecycleFlags.proxyStrategy && typeof obj === 'object') {
  //   return ProxyObserver.getOrCreate(obj, propertyName) as unknown as AccessorOrObserver; // TODO: fix typings (and ensure proper contracts ofc)
  // }
  // todo: re-enable this
  // if (isBindingContext(obj)) {
  //   return obj.getObservers!(flags).getOrCreate(this.lifecycle, flags, obj, propertyName);
  // }
  let observersLookup = obj.$observers as $ObserverRecord;

  if (observersLookup != null && $key in observersLookup) {
    return observersLookup[$key] as IBindingTargetObserver;
  }

  const observer: IBindingTargetObserver & { doNotCache?: boolean } = createPropertyObserver(obj, $key);

  if (!observer.doNotCache) {
    if (observersLookup === void 0) {
      observersLookup = createObserverRecord(obj);
    }

    attachObserver(observersLookup, $key, observer, obj.hasOwnProperty($key));
  }

  return observer;
};

let canAddAdapter = true;
let lastLockToken = 0;
function lockAdapter() {
  canAddAdapter = false;
  return lastLockToken = Math.random();
}
function unlockAdapter(unlockToken: number) {
  if (unlockToken === lastLockToken) {
    canAddAdapter = true;
    lastLockToken = 0;
  }
}

function addObservationAdapter(observationAdapter: IObservationAdapter): void {
  if (canAddAdapter && !adapters.includes(observationAdapter)) {
    adapters.push(observationAdapter);
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

function createObserverRecord<T extends IObservable | IBindingContext = IObservable | IBindingContext>(obj: T): $ObserverRecord {
  observersRecordPropertyDescriptor.value = {};
  Reflect.defineProperty(obj, '$observers', observersRecordPropertyDescriptor);
  observersRecordPropertyDescriptor.value = null;
  return obj.$observers as $ObserverRecord;
}

function attachObserver(record: $ObserverRecord, key: PropertyKey, observer: IBindingTargetObserver, enumerable?: boolean): void {
  Reflect.defineProperty(record.obj, key, {
    configurable: true,
    enumerable,
    get: observer.getValue.bind(observer),
    set: observer.setValue.bind(observer) as any,
  });
  record[key as $PropertyKey] = observer;
}

function detachObserver(key: PropertyKey): void {
  throw new Error('method not implemented');
}
