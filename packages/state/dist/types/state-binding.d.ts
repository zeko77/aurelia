import { type IServiceLocator } from '@aurelia/kernel';
import { LifecycleFlags, Scope, type IConnectableBinding, type IObserverLocator, type IsBindingBehavior } from '@aurelia/runtime';
import { IStateContainer, type IStateSubscriber } from './state';
/**
 * A binding that handles the connection of the global state to a property of a target object
 */
export interface StateBinding extends IConnectableBinding {
}
export declare class StateBinding implements IConnectableBinding, IStateSubscriber<object> {
    interceptor: this;
    locator: IServiceLocator;
    $scope?: Scope | undefined;
    isBound: boolean;
    expr: IsBindingBehavior;
    private readonly target;
    private readonly prop;
    constructor(locator: IServiceLocator, stateContainer: IStateContainer<object>, observerLocator: IObserverLocator, expr: IsBindingBehavior, target: object, prop: PropertyKey);
    updateTarget(value: unknown): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(): void;
    handleStateChange(state: object): void;
}
//# sourceMappingURL=state-binding.d.ts.map