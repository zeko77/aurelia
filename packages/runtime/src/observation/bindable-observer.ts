import { IIndexable, Reporter, PLATFORM } from '@aurelia/kernel';
import { LifecycleFlags } from '../flags';
import { ILifecycle } from '../lifecycle';
import { IPropertyObserver, ISubscriber } from '../observation';
import { subscriberCollection } from './subscriber-collection';
import { InterceptorFunc } from '../templating/bindable';
import { collecting, getCurrentSubscriber } from './subscriber-switcher';

export interface BindableObserver extends IPropertyObserver<IIndexable, string> {}

interface IMayHavePropertyChangedCallback {
  propertyChanged?(name: string, newValue: unknown, oldValue: unknown, flags: LifecycleFlags): void;
}

type HasPropertyChangedCallback = Required<IMayHavePropertyChangedCallback>;

@subscriberCollection()
export class BindableObserver {
  public currentValue: unknown = void 0;
  public oldValue: unknown = void 0;

  public readonly persistentFlags: LifecycleFlags;
  public inBatch: boolean = false;
  public observing!: boolean;

  private readonly callback?: (newValue: unknown, oldValue: unknown, flags: LifecycleFlags) => void;
  private readonly propertyChangedCallback?: HasPropertyChangedCallback['propertyChanged'];
  private readonly hasPropertyChangedCallback: boolean;
  private readonly shouldInterceptSet: boolean;

  public constructor(
    public readonly lifecycle: ILifecycle,
    flags: LifecycleFlags,
    public readonly obj: IIndexable,
    public readonly propertyKey: string,
    cbName: string,
    private readonly $$set: InterceptorFunc,
  ) {
    this.callback = this.obj[cbName] as typeof BindableObserver.prototype.callback;

    const propertyChangedCallback = this.propertyChangedCallback = (this.obj as IMayHavePropertyChangedCallback).propertyChanged;
    const hasPropertyChangedCallback = this.hasPropertyChangedCallback = typeof propertyChangedCallback === 'function';

    const shouldInterceptSet = this.shouldInterceptSet = $$set !== PLATFORM.noop;
    // when user declare @bindable({ set })
    // it's expected to work from the start,
    // regardless where the assignment comes from: either direct view model assignment or from binding during render
    // so if either getter/setter config is present, alter the accessor straight await
    if (this.callback === void 0 && !hasPropertyChangedCallback && !shouldInterceptSet) {
      this.observing = false;
    } else {
      this.start();
    }
    this.persistentFlags = flags & LifecycleFlags.persistentBindingFlags;
  }

  public handleChange(newValue: unknown, oldValue: unknown, flags: LifecycleFlags): void {
    this.setValue(newValue, flags);
  }

  public getValue(): unknown {
    if (collecting) {
      const currentSubscriber = getCurrentSubscriber();
      if (currentSubscriber != null) {
        this.subscribe(currentSubscriber);
      }
    }
    return this.currentValue;
  }

  public setValue(newValue: unknown, flags: LifecycleFlags): void {
    if (this.shouldInterceptSet) {
      newValue = this.$$set(newValue);
    }

    if (this.observing) {
      const currentValue = this.currentValue;
      // eslint-disable-next-line compat/compat
      if (Object.is(newValue, currentValue)) {
        return;
      }
      this.currentValue = newValue;
      if (this.lifecycle.batch.depth === 0) {
        this.callSubscribers(newValue, currentValue, this.persistentFlags | flags);
        if ((flags & LifecycleFlags.fromBind) === 0 || (flags & LifecycleFlags.updateSourceExpression) > 0) {
          const callback = this.callback;

          if (callback !== void 0) {
            callback.call(this.obj, newValue, currentValue, this.persistentFlags | flags);
          }

          if (this.hasPropertyChangedCallback) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            this.propertyChangedCallback!.call(this.obj, this.propertyKey, newValue, currentValue, this.persistentFlags | flags);
          }
        }
      } else if (!this.inBatch) {
        this.inBatch = true;
        this.oldValue = currentValue;
        this.lifecycle.batch.add(this);
      }
    } else {
      // See SetterObserver.setValue for explanation
      this.obj[this.propertyKey] = newValue;
    }
  }

  public subscribe(subscriber: ISubscriber): void {
    if (this.observing === false) {
      this.start();
    }

    this.addSubscriber(subscriber);
  }

  public notify(): void {
    this.callSubscribers(this.currentValue, this.oldValue, LifecycleFlags.none);
  }

  public start(): void {
    if (this.observing) {
      return;
    }
    this.observing = true;
    const currentValue = this.obj[this.propertyKey];
    this.currentValue = this.shouldInterceptSet && currentValue !== void 0
      ? this.$$set(currentValue)
      : currentValue;
    this.createGetterSetter();
  }

  private createGetterSetter(): void {
    if (
      !Reflect.defineProperty(
        this.obj,
        this.propertyKey,
        {
          enumerable: true,
          configurable: true,
          get: this.$get.bind(this),
          set: this.$set.bind(this),
        }
      )
    ) {
      Reporter.write(1, this.propertyKey, this.obj);
    }
  }

  private $get() {
    if (collecting) {
      const currentSubscriber = getCurrentSubscriber();
      if (currentSubscriber != null) {
        this.subscribe(currentSubscriber);
      }
    }
    return this.getValue();
  }

  private $set(value: unknown): void {
    this.setValue(value, LifecycleFlags.none);
  }
}
