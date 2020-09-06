import {
  IServiceLocator,
  Reporter,
  IIndexable,
} from '@aurelia/kernel';
import {
  IForOfStatement,
  IsBindingBehavior,
} from '../ast';
import {
  BindingMode,
  ExpressionKind,
  LifecycleFlags,
  State,
} from '../flags';
import { ILifecycle } from '../lifecycle';
import {
  AccessorOrObserver,
  IBindingTargetObserver,
  IScope,
} from '../observation';
import { IObserverLocator } from '../observation/observer-locator';
import {
  hasBind,
  hasUnbind,
} from './ast';
import {
  connectable,
  IConnectableBinding,
  IPartialConnectableBinding,
} from './connectable';

// BindingMode is not a const enum (and therefore not inlined), so assigning them to a variable to save a member accessor is a minor perf tweak
const { oneTime, toView, fromView } = BindingMode;

// pre-combining flags for bitwise checks is a minor perf tweak
const toViewOrOneTime = toView | oneTime;

export interface PropertyBinding extends IConnectableBinding {}

@connectable()
export class PropertyBinding implements IPartialConnectableBinding {
  public interceptor: this = this;

  public id!: number;
  public $state: State = State.none;
  public $lifecycle: ILifecycle;
  public $scope?: IScope = void 0;
  public part?: string;

  public targetObserver?: AccessorOrObserver = void 0;;

  public persistentFlags: LifecycleFlags = LifecycleFlags.none;

  public constructor(
    public sourceExpression: IsBindingBehavior | IForOfStatement,
    public target: object,
    public targetProperty: string,
    public mode: BindingMode,
    public observerLocator: IObserverLocator,
    public locator: IServiceLocator,
  ) {
    connectable.assignIdTo(this);
    this.$lifecycle = locator.get(ILifecycle);
  }

  public updateTarget(value: unknown, flags: LifecycleFlags): void {
    flags |= this.persistentFlags;
    this.targetObserver!.setValue(value, flags);
  }

  public updateSource(value: unknown, flags: LifecycleFlags): void {
    flags |= this.persistentFlags;
    this.sourceExpression.assign!(flags, this.$scope!, this.locator, value, this.part);
  }

  public handleChange(newValue: unknown, _previousValue: unknown, flags: LifecycleFlags): void {
    if ((this.$state & State.isBound) === 0) {
      return;
    }

    flags |= this.persistentFlags;

    const interceptor = this.interceptor;
    const sourceExpression = this.sourceExpression;

    if ((flags & LifecycleFlags.updateTargetInstance) > 0) {
      const previousValue = this.targetObserver!.getValue();
      const shouldObserve = (this.mode & toView) > 0;

      // if the only observable is an AccessScope then we can assume the passed-in newValue is the correct and latest value
      if (sourceExpression.$kind !== ExpressionKind.AccessScope || this.observerSlots > 1) {
        if (shouldObserve) {
          interceptor.version++;
        }
        newValue = sourceExpression.evaluate(flags, this.$scope!, this.locator, this.part, shouldObserve ? interceptor : void 0);
        if (shouldObserve) {
          interceptor.unobserve(false);
        }
      } else if (shouldObserve) {
        interceptor.version++;
        sourceExpression.connect(flags, this.$scope!, interceptor, this.part);
        interceptor.unobserve();
      }

      if (newValue !== previousValue) {
        // todo: if target is DOM connector, queue, otherwise update
        // always update for now as there's no flag ready
        interceptor.updateTarget(newValue, flags);
      }
      return;
    }

    if ((flags & LifecycleFlags.updateSourceExpression) > 0) {
      if (newValue !== sourceExpression.evaluate(flags, this.$scope!, this.locator, this.part)) {
        interceptor.updateSource(newValue, flags);
      }
      return;
    }

    throw new Error('Unexpected handleChange context');
  }

  public $bind(flags: LifecycleFlags, scope: IScope, part?: string): void {
    if (this.$state & State.isBound) {
      if (this.$scope === scope) {
        return;
      }
      this.interceptor.$unbind(flags | LifecycleFlags.fromBind);
    }
    // add isBinding flag
    this.$state |= State.isBinding;
    // Force property binding to always be strict
    flags |= LifecycleFlags.isStrictBindingStrategy;

    // Store flags which we can only receive during $bind and need to pass on
    // to the AST during evaluate/connect/assign
    this.persistentFlags = flags & LifecycleFlags.persistentBindingFlags;

    this.$scope = scope;
    this.part = part;

    let sourceExpression = this.sourceExpression;
    if (hasBind(sourceExpression)) {
      sourceExpression.bind(flags, scope, this.interceptor);
    }

    let targetObserver = this.targetObserver as IIndexable<IBindingTargetObserver>;
    if (!targetObserver) {
      if (this.mode & fromView) {
        targetObserver
          = this.targetObserver
          = this.observerLocator.getObserver(flags, this.target, this.targetProperty) as IIndexable<IBindingTargetObserver>;
      } else {
        targetObserver
          = this.targetObserver
          = this.observerLocator.getAccessor(flags, this.target, this.targetProperty) as IIndexable<IBindingTargetObserver>;
      }
    }

    let mode = this.mode;
    if (mode !== BindingMode.oneTime && targetObserver.bind) {
      targetObserver.bind(flags);
    }

    // during bind, binding behavior might have changed sourceExpression/mode
    sourceExpression = this.sourceExpression;
    mode = this.mode;
    const interceptor = this.interceptor;

    if (mode & toViewOrOneTime) {
      const shouldObserve = (mode & toView) > 0;
      if (shouldObserve) {
        interceptor.version++;
      }
      interceptor.updateTarget(
        sourceExpression.evaluate(flags, scope, this.locator, part, shouldObserve ? interceptor : void 0),
        flags,
      );
      if (shouldObserve) {
        interceptor.unobserve();
      }
    }

    if (mode & fromView) {
      targetObserver.subscribe(interceptor);
      if ((mode & toView) === 0) {
        interceptor.updateSource(targetObserver.getValue(), flags);
      }
      targetObserver[this.id] |= LifecycleFlags.updateSourceExpression;
    }

    // add isBound flag and remove isBinding flag
    this.$state |= State.isBound;
    this.$state &= ~State.isBinding;
  }

  public $unbind(flags: LifecycleFlags): void {
    if (!(this.$state & State.isBound)) {
      return;
    }
    // add isUnbinding flag
    this.$state |= State.isUnbinding;

    // clear persistent flags
    this.persistentFlags = LifecycleFlags.none;

    if (hasUnbind(this.sourceExpression)) {
      this.sourceExpression.unbind(flags, this.$scope!, this.interceptor);
    }
    this.$scope = void 0;

    if (typeof (this.targetObserver as IBindingTargetObserver).unbind === 'function') {
      (this.targetObserver as IBindingTargetObserver).unbind!(flags);
    }
    if (typeof (this.targetObserver as IBindingTargetObserver).unsubscribe === 'function') {
      (this.targetObserver as IBindingTargetObserver).unsubscribe(this.interceptor);
      (this.targetObserver as this['targetObserver'] & { [key: number]: number })[this.id] &= ~LifecycleFlags.updateSourceExpression;
    }
    this.interceptor.unobserve(true);

    // remove isBound and isUnbinding flags
    this.$state &= ~(State.isBound | State.isUnbinding);
  }
}
