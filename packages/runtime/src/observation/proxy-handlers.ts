import { IIndexable, isArrayIndex } from '@aurelia/kernel';
import { IBindingTargetObserver } from '../observation';
import { getArrayObserver } from './array-observer';
import { collecting, getCurrentSubscriber } from './dep-collector-switcher';
import { hasObserver, getObserver } from './observable';
import { getSetObserver } from './set-observer';
import { getMapObserver } from './map-observer';

export type IProxiedObject = IIndexable<{
  $raw: IProxiedObject;
  $proxy: IProxiedObject;
}>

type $PropertyKey = Exclude<PropertyKey, symbol>;

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

function doNotCollect(target: unknown, key: PropertyKey) {
  return key === '$observers'
    || key === '$synthetic'
    || key === 'constructor'
    || key === '$proxy'
    || key === '$raw';
}

const objectHandler: ProxyHandler<object> = {
  get(target: IIndexable, key: PropertyKey, receiver?: unknown): unknown {
    const $key = key as $PropertyKey;
    if (!collecting) {
      return target[$key];
    }

    if (doNotCollect(target, $key)) {
      return target[$key];
    }

    const currentSubscriber = getCurrentSubscriber();
    if (currentSubscriber == null) {
      return target[$key];
    }

    const observer = getObserver(target, $key);
    observer.subscribe(currentSubscriber);

    const value = observer.getValue();
    if (!(value instanceof Object)) {
      return value;
    }

    return getOrCreateProxy(value);
  },

  set(target: IIndexable, key: PropertyKey, value: unknown, receiver?: unknown): boolean {
    const $key = key as $PropertyKey;
    const currentSubscriber = getCurrentSubscriber();

    if (currentSubscriber == null) {
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

const arrayHandler: ProxyHandler<unknown[]> = {
  get(target: unknown[], key: PropertyKey, receiver?): unknown {
    const $key = key as $PropertyKey;
    if (!collecting) {
      return target[$key as number];
    }

    if (doNotCollect(target, $key)) {
      return target[$key as number];
    }

    const currentSubscriber = getCurrentSubscriber();
    if (currentSubscriber == null) {
      return target[$key as number];
    }

    if ($key === 'length') {
      const lengthObserver = getArrayObserver(target).getLengthObserver();
      lengthObserver.subscribe(currentSubscriber);
      return lengthObserver.currentValue;
    }

    if (isArrayIndex($key)) {
      const indexObserver = getArrayObserver(target).getIndexObserver(Number($key));
      indexObserver.subscribe(currentSubscriber);

      const idxValue = indexObserver.currentValue;
      if (!(idxValue instanceof Object)) {
        return idxValue;
      }

      return getOrCreateProxy(idxValue);
    }

    // todo: some array method needs not observing on all element
    // just need length observation
    // example: [].forEach only requires length observation or any mutation, not every index observation
    // how?
    const value = target[$key];
    return value;
  },

  set(target: unknown[], key: PropertyKey, value: unknown, receiver?): boolean {
    const $key = key as $PropertyKey;

    if ($key === 'length' || isArrayIndex($key)) {
      target[$key as number] = value;
      getArrayObserver(target).notify();
    }
    return true;
  },
};

type $MapOrSet = Map<unknown, unknown> | Set<unknown>;
const collectionHandler: ProxyHandler<$MapOrSet> = {
  get(target: IIndexable<$MapOrSet>, key: PropertyKey, receiver?): unknown {
    const $key = key as $PropertyKey;
    if (!collecting) {
      return target[$key];
    }

    if (doNotCollect(target, key)) {
      return target[$key];
    }

    const currentSubscriber = getCurrentSubscriber();
    if (currentSubscriber == null) {
      return target[$key];
    }

    if (target instanceof Set) {
      if ($key === 'size') {
        const lengthObserver = getSetObserver(target).getLengthObserver();
        lengthObserver.subscribe(currentSubscriber);
        return lengthObserver.currentValue;
      }
      // todo: checking built-in method accesses
    } else {
      if ($key === 'size') {
        const lengthObserver = getMapObserver(target).getLengthObserver();
        lengthObserver.subscribe(currentSubscriber);
        return lengthObserver.currentValue;
      }
      // todo: checking built-in method accesses
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

  set(target: $MapOrSet, key: PropertyKey, value: unknown, receiver?): boolean {
    const $key = key as $PropertyKey;
    if ($key === 'size') {
      return false;
    }
    if (target instanceof Set) {

    } else {

    }
    return true;
  }
};

function createAndDefineProxy<T extends object = object>(obj: T, proxyHandlers: ProxyHandler<T>): T {
  const proxiedObj = new Proxy(obj, proxyHandlers);
  Reflect.defineProperty(obj, '$proxy', {
    configurable: true,
    enumerable: false,
    value: proxiedObj
  });
  return proxiedObj;
}

export function getOrCreateProxy<T extends object>(obj: T): T {
  if (obj instanceof Object) {
    const proxy = (obj as IProxiedObject).$proxy;
    if (proxy === void 0) {
      switch (toStringTag.call(obj)) {
        case arrTag:
          return createAndDefineProxy(obj, arrayHandler as ProxyHandler<T>);
        case setTag:
        case mapTag:
          return createAndDefineProxy(obj, collectionHandler as ProxyHandler<T>);
      }
      return createAndDefineProxy(obj, objectHandler) as T;
    }
  }
  throw new Error('Invalid proxy target');
}
