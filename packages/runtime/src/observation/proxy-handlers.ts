import { IIndexable, isArrayIndex } from '@aurelia/kernel';
import { Collection, IBindingTargetObserver } from '../observation';
import { getArrayObserver } from './array-observer';
import { DepCollectorSwitcher } from './dep-collector-switcher';
import { IProxiedObject } from './proxy-observer';
import { hasObserver, getObserver } from './observable';
import { getSetObserver } from './set-observer';
import { getMapObserver } from './map-observer';

type $PropertyKey = Exclude<PropertyKey, symbol>;

const { peek } = DepCollectorSwitcher;

const toStringTag = Object.prototype.toString;
const arrTag = '[object Array]';
const setTag = '[object Set]';
const mapTag = '[object Map]';
const funTag = '[object Function]';
const blnTag = '[object Boolean]';
const numTag = '[object Number]';
const strTag = '[object String]';
const nulTag = '[object Null]';
const undTag = '[object Undefined]';

const objectHandler: ProxyHandler<object> = {
  get(target: IIndexable, propertyKey: PropertyKey, receiver?: unknown): unknown {
    const $key = propertyKey as $PropertyKey;
    const currentCollector = peek();
    if (currentCollector == null) {
      return target[$key as $PropertyKey];
    }

    const observer = getObserver(target, $key);
    observer.subscribe(currentCollector);

    const value = observer.getValue();
    if (!(value instanceof Object)) {
      return value;
    }

    return getOrCreateProxy(value);
  },

  set(target: IIndexable, key: PropertyKey, value: unknown, receiver?: unknown): boolean {
    const $key = key as $PropertyKey;
    const currentCollector = peek();

    if (currentCollector == null) {
      target[$key] = value;
      return true;
    }
    return true;
  },

  deleteProperty(target: IIndexable, key): boolean {
    if (hasObserver(target, key)) {
      const observer = getObserver(target, key) as IBindingTargetObserver;
      observer.callSubscribers(observer.currentValue, observer.currentValue, 0);
    }
    return delete target[key as $PropertyKey];
  }
};

const collectionHandler: ProxyHandler<Collection> = {
  get(target: IIndexable<Collection>, key: PropertyKey, receiver?): unknown {
    const $key = key as $PropertyKey;
    const currentCollector = peek();
    if (currentCollector == null) {
      return target[$key];
    }
    
    switch (toStringTag.call(target)) {
      case arrTag:
        if (isArrayIndex($key)) {
          getArrayObserver(target as unknown as unknown[]).getIndexObserver(Number($key)).subscribe(currentCollector);
        } else if ($key === 'length') {
          const lengthObserver = getArrayObserver(target as unknown as unknown[]).getLengthObserver();
          lengthObserver.subscribe(currentCollector);
          return lengthObserver.currentValue;
        }
        break;
      case setTag:
        if ($key === 'size') {
          const lengthObserver = getSetObserver(target as unknown as Set<unknown>).getLengthObserver();
          lengthObserver.subscribe(currentCollector);
          return lengthObserver.currentValue;
        }
        // todo: checking built-in method accesses
        break;
      case mapTag:
        if ($key === 'size') {
          const lengthObserver = getMapObserver(target as unknown as Map<unknown, unknown>).getLengthObserver();
          lengthObserver.subscribe(currentCollector);
          return lengthObserver.currentValue;
        }
        // todo: checking built-in method accesses
        break;
    }
    const value = target[$key];
    if (!(value instanceof Object)) {
      return value;
    }

    switch (toStringTag.call(value)) {
      // todo: some array method needs not observing on all element
      // just need length observation
      // example: [].forEach only requires length observation or any mutation, not every index observation
      
      case funTag:
        // calling native methods on collection object
        // example: map.forEach | set.forEach | set.has
        if (value.toString().indexOf('[native code]') > -1) {
          return value;
        }
    }

    return getOrCreateProxy(value);
  },

  set(target: IIndexable<Collection>, key: PropertyKey, value: unknown, receiver?): boolean {
    const $key = key as $PropertyKey;

    switch (toStringTag.call(target)) {
      case arrTag:
        if (isArrayIndex($key)) {
          target[$key] = value;
          getArrayObserver(target as unknown as unknown[]).notify();
        }
        break;
      case mapTag:
      case setTag:
        if ($key === 'size') {
          return false;
        }
        break;
      // todo: what else to be rejected?
    }
    return true;
  }
};

function defineOnObject<T extends object = object>(obj: T, proxiedObj: T): T {
  Reflect.defineProperty(obj, '$proxy', {
    configurable: true,
    enumerable: false,
    value: proxiedObj
  });
  return proxiedObj;
}

function getOrCreateProxy<T extends object>(obj: T): T {
  return ensureProxy(obj);
}

function ensureProxy<T extends object = object>(obj: T): T {
  if (obj instanceof Object) {
    const proxy = (obj as IProxiedObject).$proxy;
    if (proxy === void 0) {
      switch (toStringTag.call(obj)) {
        case arrTag:
        case setTag:
        case mapTag:
          return defineOnObject(obj, new Proxy(obj, collectionHandler as ProxyHandler<T>)) as T;
      }
      return defineOnObject(obj, new Proxy(obj, objectHandler)) as T;
    }
  }
  throw new Error('Invalid proxy target');
}
