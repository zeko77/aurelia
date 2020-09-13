import {
  IServiceLocator,
  Reporter,
} from '@aurelia/kernel';
import {
  AccessorOrObserver,
  BindingMode,
  connectable,
  ExpressionKind,
  hasBind,
  hasUnbind,
  IBindingTargetObserver,
  IConnectableBinding,
  IForOfStatement,
  IObserverLocator,
  IPartialConnectableBinding,
  IsBindingBehavior,
  IScope,
  LifecycleFlags,
  State,
  IScheduler,
  INode,
  ITask,
  AccessorType,
  QueueTaskOptions,
  IAccessor,
} from '@aurelia/runtime';
import {
  AttributeObserver,
  IHtmlElement,
} from '../observation/element-attribute-observer';

// BindingMode is not a const enum (and therefore not inlined), so assigning them to a variable to save a member accessor is a minor perf tweak
const { oneTime, toView, fromView } = BindingMode;

// pre-combining flags for bitwise checks is a minor perf tweak
const toViewOrOneTime = toView | oneTime;

const taskOptions: QueueTaskOptions = {
  reusable: false,
};

export interface AttributeBinding extends IConnectableBinding {}

/**
 * Attribute binding. Handle attribute binding betwen view/view model. Understand Html special attributes
 */
@connectable()
export class AttributeBinding implements IPartialConnectableBinding {
  public interceptor: this = this;

  public id!: number;
  public $state: State = State.none;
  public $scheduler: IScheduler;
  public $scope: IScope = null!;
  public part?: string;
  public task: ITask | null = null;

  /**
   * Target key. In case Attr has inner structure, such as class -> classList, style -> CSSStyleDeclaration
   */

  public targetObserver!: AccessorOrObserver;

  public persistentFlags: LifecycleFlags = LifecycleFlags.none;

  public target: Element;

  public constructor(
    public sourceExpression: IsBindingBehavior | IForOfStatement,
    target: INode,
    // some attributes may have inner structure
    // such as class -> collection of class names
    // such as style -> collection of style rules
    //
    // for normal attributes, targetAttribute and targetProperty are the same and can be ignore
    public targetAttribute: string,
    public targetProperty: string,
    public mode: BindingMode,
    public observerLocator: IObserverLocator,
    public locator: IServiceLocator,
  ) {
    this.target = target as Element;
    connectable.assignIdTo(this);
    this.$scheduler = locator.get(IScheduler);
  }

  public updateTarget(value: unknown, flags: LifecycleFlags): void {
    flags |= this.persistentFlags;
    this.targetObserver.setValue(value, flags | LifecycleFlags.updateTargetInstance);
  }

  public updateSource(value: unknown, flags: LifecycleFlags): void {
    flags |= this.persistentFlags;
    this.sourceExpression.assign!(flags | LifecycleFlags.updateSourceExpression, this.$scope, this.locator, value);
  }

  public handleChange(newValue: unknown, _previousValue: unknown, flags: LifecycleFlags): void {
    if (!(this.$state & State.isBound)) {
      return;
    }

    flags |= this.persistentFlags;

    const mode = this.mode;
    if (mode === BindingMode.fromView) {
      flags &= ~LifecycleFlags.updateTargetInstance;
      flags |= LifecycleFlags.updateSourceExpression;
    }

    if (flags & LifecycleFlags.updateTargetInstance) {
      const interceptor = this.interceptor;
      const sourceExpression = this.sourceExpression;
      const targetObserver = this.targetObserver;
      if ((targetObserver.type & AccessorType.Layout) > 0) {
        this.task?.cancel();
        this.task = this.$scheduler.queueRenderTask(() => {
          // if the only observable is an AccessScope then we can assume the passed-in newValue is the correct and latest value
          if (sourceExpression.$kind !== ExpressionKind.AccessScope || this.observerSlots > 1) {
            newValue = sourceExpression.evaluate(flags, this.$scope, this.locator, this.part);
          }
          interceptor.updateTarget(newValue, flags);

          if ((mode & oneTime) === 0) {
            this.version++;
            sourceExpression.connect(flags, this.$scope, interceptor, this.part);
            interceptor.unobserve(false);
          }

          this.task = null;
        }, taskOptions);
      } else {
        // if the only observable is an AccessScope then we can assume the passed-in newValue is the correct and latest value
        if (sourceExpression.$kind !== ExpressionKind.AccessScope || this.observerSlots > 1) {
          newValue = sourceExpression.evaluate(flags, this.$scope, this.locator, this.part);
        }

        if (newValue != targetObserver.getValue()) {
          interceptor.updateTarget(newValue, flags);
        }

        if ((mode & oneTime) === 0) {
          this.version++;
          sourceExpression.connect(flags, this.$scope, this.interceptor, this.part);
          interceptor.unobserve(false);
        }
      }
      return;
    }

    if (flags & LifecycleFlags.updateSourceExpression) {
      if (newValue !== this.sourceExpression.evaluate(flags, this.$scope, this.locator, this.part)) {
        this.interceptor.updateSource(newValue, flags);
      }
      return;
    }

    throw new Error('Unexpected handleChange context in AttributeBinding');
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

    // Store flags which we can only receive during $bind and need to pass on
    // to the AST during evaluate/connect/assign
    this.persistentFlags = flags & LifecycleFlags.persistentBindingFlags;

    this.$scope = scope;
    this.part = part;

    let sourceExpression = this.sourceExpression;
    if (hasBind(sourceExpression)) {
      sourceExpression.bind(flags, scope, this.interceptor);
    }

    let targetObserver = this.targetObserver as IBindingTargetObserver;
    if (!targetObserver) {
      targetObserver = this.targetObserver = new AttributeObserver(
        this.$scheduler,
        flags,
        this.observerLocator,
        this.target as IHtmlElement,
        this.targetProperty,
        this.targetAttribute,
      );
    }
    if (targetObserver.bind) {
      targetObserver.bind(flags);
    }

    // during bind, binding behavior might have changed sourceExpression
    sourceExpression = this.sourceExpression;
    const $mode = this.mode;
    const interceptor = this.interceptor;

    if ($mode & toViewOrOneTime) {
      if ((interceptor.targetObserver.type & AccessorType.Layout) > 0) {
        this.task?.cancel();
        targetObserver.task = this.task = this.$scheduler.queueRenderTask(() => {
          interceptor.updateTarget(sourceExpression.evaluate(flags, scope, this.locator, part), flags);
          this.task = null;
        }, taskOptions);
      } else {
        interceptor.updateTarget(sourceExpression.evaluate(flags, scope, this.locator, part), flags);
      }
    }
    if ($mode & toView) {
      sourceExpression.connect(flags, scope, this, part);
    }
    if ($mode & fromView) {
      targetObserver[this.id] |= LifecycleFlags.updateSourceExpression;
      targetObserver.subscribe(this.interceptor);
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
      this.sourceExpression.unbind(flags, this.$scope, this.interceptor);
    }
    this.$scope = null!;

    const targetObserver = this.targetObserver as IBindingTargetObserver;
    const task = this.task;
    if (targetObserver.unbind) {
      targetObserver.unbind!(flags);
    }
    if (targetObserver.unsubscribe) {
      targetObserver.unsubscribe(this.interceptor);
      targetObserver[this.id] &= ~LifecycleFlags.updateSourceExpression;
    }
    if (task != null) {
      task.cancel();
      if (task === targetObserver.task) {
        targetObserver.task = null;
      }
      this.task = null;
    }
    this.interceptor.unobserve(true);

    // remove isBound and isUnbinding flags
    this.$state &= ~(State.isBound | State.isUnbinding);
  }

  public connect(flags: LifecycleFlags): void {
    if (this.$state & State.isBound) {
      flags |= this.persistentFlags;
      this.sourceExpression.connect(flags | LifecycleFlags.mustEvaluate, this.$scope, this.interceptor, this.part); // why do we have a connect method here in the first place? will this be called after bind?
    }
  }

  private handleUpdateTarget() {

  }
}
