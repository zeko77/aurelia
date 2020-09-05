import { Constructable, IIndexable } from '@aurelia/kernel';
import { IObservable, IBindingContext, IBindingTargetObserver } from '../observation';
import { getObserver, hasObserver } from './observable';

type $Getter = PropertyDescriptor['get'] & {
  getObserver(obj: IObservable|IBindingContext): IBindingTargetObserver;
};
type $DecoTarget = Constructable | Constructable['prototype'];
type $PropertyKey = Exclude<PropertyKey, symbol>;

export interface IObservableConfiguration {
  name?: string;
  changeHandler?: string;
}

export function observable(
  targetOrConfig: $DecoTarget | IObservableConfiguration,
  key: PropertyKey,
  descriptor?: PropertyDescriptor
): ClassDecorator | PropertyDecorator {
  function deco(
    target: $DecoTarget,
    key?: PropertyKey,
    descriptor?: PropertyDescriptor & { initializer?: unknown },
    config?: string | IObservableConfiguration,
  ) {
    // class decorator?
    const isClassDecorator = key === void 0;
    config = typeof config === 'string'
      ? { name: config }
      : config;

    if (isClassDecorator) {
      target = target.prototype;
      key = config ? config.name : '';
    }

    if (key === '') {
      throw new Error('Invalid usage, cannot determine property name for @observable');
    }

    // use a convention to compute the inner property name
    const innerKey = typeof key === 'symbol' ? Symbol(`_${String(key)}`) : `_${key}`;
    const innerPropertyDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      writable: true
    };

    // determine callback name based on config or convention.
    const callbackName = (config && config.changeHandler) || `${String(key)}Changed`;

    if (descriptor) {
      // babel passes in the property descriptor with a method to get the initial value.

      // set the initial value of the property if it is defined.
      if (typeof descriptor.initializer === 'function') {
        innerPropertyDescriptor.value = descriptor.initializer();
      }
    } else {
      // there is no descriptor if the target was a field in TS (although Babel provides one),
      // or if the decorator was applied to a class.
      descriptor = {};
    }

    // make the accessor enumerable by default, as fields are enumerable
    if (!('enumerable' in descriptor)) {
      descriptor.enumerable = true;
    }

    // we're adding a getter and setter which means the property descriptor
    // cannot have a "value" or "writable" attribute
    delete descriptor.value;
    delete descriptor.writable;
    delete descriptor.initializer;

    // Add the inner property on the prototype.
    Reflect.defineProperty(target, innerKey, innerPropertyDescriptor);

    // add the getter and setter to the property descriptor.
    descriptor.get = function(this: IIndexable) {
      if (!hasObserver(this, innerKey)) {
        getObserver(this, innerKey).currentValue = innerPropertyDescriptor.value;
      }
      return this[innerKey as $PropertyKey];
    };
    descriptor.set = function(this: IIndexable, newValue: unknown) {
      let oldValue = this[innerKey as $PropertyKey];
      if (newValue === oldValue) {
        return;
      }

      if (!hasObserver(this, innerKey)) {
        getObserver(this, innerKey).setValue(newValue, 0);
      }

      if (this[callbackName]) {
        (this[callbackName] as CallableFunction)(newValue, oldValue, key);
      }
    };
    (descriptor.get as $Getter).getObserver = function(obj: IIndexable) {
      return getObserver(obj, innerKey);
    };

    if (isClassDecorator) {
      Reflect.defineProperty(target, key!, descriptor);
    } else {
      return descriptor;
    }
  }

  if (key === undefined) {
    // parens...
    return ((t: $DecoTarget, k: PropertyKey, d: PropertyDescriptor) => deco(t, k, d, targetOrConfig)) as ClassDecorator;
  }

  return deco(targetOrConfig as $DecoTarget, key, descriptor) as PropertyDecorator;
}

/*
          | typescript       | babel
----------|------------------|-------------------------
property  | config           | config
w/parens  | target, key      | target, key, descriptor
----------|------------------|-------------------------
property  | target, key      | target, key, descriptor
no parens | n/a              | n/a
----------|------------------|-------------------------
class     | config           | config
          | target           | target
*/
