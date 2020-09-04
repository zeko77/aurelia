import { IIndexable } from '@aurelia/kernel';
import { LifecycleFlags } from '../flags';
import { IBindingTargetObserver, IObservable, ISubscriber } from '../observation';
import { subscriberCollection } from './subscriber-collection';

export const DirtyCheckSettings = {
  /**
   * Default: `6`
   *
   * Adjust the global dirty check frequency.
   * Measures in "frames per check", such that (given an FPS of 60):
   * - A value of 1 will result in 60 dirty checks per second
   * - A value of 6 will result in 10 dirty checks per second
   */
  framesPerCheck: 6,
  /**
   * Default: `false`
   *
   * Disable dirty-checking entirely. Properties that cannot be observed without dirty checking
   * or an adapter, will simply not be observed.
   */
  disabled: false,
  /**
   * Default: `true`
   *
   * Log a warning message to the console if a property is being dirty-checked.
   */
  warn: true,
  /**
   * Default: `false`
   *
   * Throw an error if a property is being dirty-checked.
   */
  throw: false,
  /**
   * Resets all dirty checking settings to the framework's defaults.
   */
  resetToDefault(): void {
    this.framesPerCheck = 6;
    this.disabled = false;
    this.warn = true;
    this.throw = false;
  }
};

export class DirtyChecker {

  public static instance = new DirtyChecker();

  public tracked: DirtyCheckObserver[];
  public checkDelay: number;

  public constructor() {
    this.tracked = [];
    this.checkDelay = 120;
  }

  public addProperty(property: DirtyCheckObserver): void {
    if (this.tracked.push(property) === 1) {
      this.scheduleDirtyCheck();
    }
  }

  public removeProperty(property: DirtyCheckObserver): void {
    const tracked = this.tracked;
    tracked.splice(tracked.indexOf(property), 1);
  }

  public scheduleDirtyCheck(): void {
    setTimeout(() => this.check(), this.checkDelay);
  }

  public check() {
    let tracked = this.tracked;
    let i = tracked.length;

    while (i--) {
      let current = tracked[i];

      if (current.isDirty()) {
        current.flush(LifecycleFlags.none);
      }
    }

    if (tracked.length > 0) {
      this.scheduleDirtyCheck();
    }
  }
}

export interface DirtyCheckObserver extends IBindingTargetObserver { }

@subscriberCollection()
export class DirtyCheckObserver implements DirtyCheckObserver {
  public oldValue: unknown;
  public doNotCache: boolean = true;
  public dirtyChecker: DirtyChecker | null = null;

  public constructor(
    public obj: IObservable & IIndexable,
    public propertyKey: string,
  ) { }

  public isDirty(): boolean {
    return this.oldValue !== this.obj[this.propertyKey];
  }

  public flush(flags: LifecycleFlags): void {
    const oldValue = this.oldValue;
    const newValue = this.obj[this.propertyKey];

    this.callSubscribers(newValue, oldValue, flags | LifecycleFlags.updateTargetInstance);

    this.oldValue = newValue;
  }

  public subscribe(subscriber: ISubscriber): void {
    if (!this.hasSubscribers()) {
      this.oldValue = this.obj[this.propertyKey];
      //   this.dirtyChecker.addProperty(this);
    }
    this.addSubscriber(subscriber);
  }

  public unsubscribe(subscriber: ISubscriber): void {
    if (this.removeSubscriber(subscriber) && !this.hasSubscribers()) {
      //   this.dirtyChecker.removeProperty(this);
    }
  }
}
