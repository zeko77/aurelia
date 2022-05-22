import { type IServiceLocator } from '@aurelia/kernel';
import { TaskQueue } from '@aurelia/platform';
import { BindingMode, LifecycleFlags, Scope, type IConnectableBinding, type IObserverLocator, type IsBindingBehavior } from '@aurelia/runtime';
import { IStore, type IStoreSubscriber } from './interfaces';
/**
 * A binding that handles the connection of the global state to a property of a target object
 */
export interface StateBinding extends IConnectableBinding {
}
export declare class StateBinding implements IConnectableBinding, IStoreSubscriber<object> {
    readonly oL: IObserverLocator;
    interceptor: this;
    locator: IServiceLocator;
    $scope?: Scope | undefined;
    isBound: boolean;
    sourceExpression: IsBindingBehavior;
    private readonly target;
    private readonly targetProperty;
    private task;
    private readonly taskQueue;
    persistentFlags: LifecycleFlags;
    mode: BindingMode;
    constructor(locator: IServiceLocator, taskQueue: TaskQueue, store: IStore<object>, observerLocator: IObserverLocator, expr: IsBindingBehavior, target: object, prop: PropertyKey);
    updateTarget(value: unknown, flags: LifecycleFlags): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(): void;
    handleChange(newValue: unknown, previousValue: unknown, flags: LifecycleFlags): void;
    handleStateChange(state: object): void;
}
//# sourceMappingURL=state-binding.d.ts.map