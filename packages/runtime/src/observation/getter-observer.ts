import { LifecycleFlags } from '../flags';
import {
  IBindingTargetObserver,
  IObservable,
  IProxy
} from '../observation';
import { subscriberCollection } from './subscriber-collection';
import { getOrCreateProxy } from './proxy-handlers';
import { enterSubscriber, exitSubscriber } from './subscriber-switcher';

export interface ComputedOverrides {
  // Indicates that a getter doesn't need to re-calculate its dependencies after the first observation.
  static?: boolean;

  // Indicates that the getter of a getter/setter pair can change its value based on side-effects outside the setter.
  volatile?: boolean;
}

// todo: implement switcher, with stack to determine which getterobserver currently collecting dependencies
export interface GetterObserver extends IBindingTargetObserver { }

// Used when there is no setter, and the getter is dependent on other properties of the object;
// Used when there is a setter but the value of the getter can change based on properties set outside of the setter.
@subscriberCollection()
export class GetterObserver implements GetterObserver {
  public currentValue: unknown = void 0;
  public oldValue: unknown = void 0;
  public observing: boolean = false;
  public readonly obj: IObservable & { $proxy?: IProxy<IObservable> };

  private readonly proxy: IObservable & { $raw: IObservable; $proxy: IProxy<IObservable> };
  private isDirty: boolean;
  private isCollecting: boolean = false;

  public constructor(
    obj: IObservable & { $raw?: IObservable; $proxy?: IProxy<IObservable> },
    public readonly propertyKey: PropertyKey,
    private readonly descriptor: PropertyDescriptor,
    private readonly overrides: ComputedOverrides,
  ) {
    // by default, if not tracking the deps, it's dirty
    this.isDirty = true;
    this.proxy = getOrCreateProxy(obj) as Required<typeof obj>;
    this.obj = this.proxy.$raw;
    this.start();
  }

  public getValue(): unknown {
    const $get = this.descriptor.get;
    const shouldObserve = this.isCollecting;
    this.currentValue = $get?.call(shouldObserve ? this.proxy : this.obj);
    return this.currentValue;
  }

  public handleChange(): void {
    const oldValue = this.currentValue;
    this.isDirty = true;
    if (!this.hasSubscribers()) {
      return;
    }
    const newValue = this.$get();
    if (oldValue !== newValue) {
      this.callSubscribers(newValue, oldValue, LifecycleFlags.updateTargetInstance);
    }
  }

  public handleCollectionChange(): void {
    const oldValue = this.currentValue;
    this.isDirty = true;
    if (!this.hasSubscribers()) {
      return;
    }
    const newValue = this.$get();
    if (oldValue !== newValue) {
      this.callSubscribers(newValue, oldValue, LifecycleFlags.updateTargetInstance);
    }
  }

  public start(): void {
    if (this.observing) {
      return;
    }
    this.observing = true;
    Reflect.defineProperty(
      this.obj,
      this.propertyKey,
      { configurable: true, get: this.$get.bind(this), set: this.descriptor.set }
    );
  }

  /**
   * @internal
   */
  private $get(): unknown {
    if (!this.isDirty && !this.overrides.volatile) {
      return this.currentValue;
    }

    this.isCollecting = true;
    enterSubscriber(this);
    const value = this.getValue();
    exitSubscriber(this);
    this.isCollecting = false;
    this.isDirty = false;

    return value;
  }
}