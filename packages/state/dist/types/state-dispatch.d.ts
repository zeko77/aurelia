import { type IServiceLocator } from '@aurelia/kernel';
import { LifecycleFlags, Scope, type IConnectableBinding, type IsBindingBehavior } from '@aurelia/runtime';
import { type IStateContainer } from './state';
/**
 * A binding that handles the connection of the global state to a property of a target object
 */
export interface StateDispatchActionBinding extends IConnectableBinding {
}
export declare class StateDispatchActionBinding implements IConnectableBinding {
    interceptor: this;
    locator: IServiceLocator;
    $scope?: Scope | undefined;
    isBound: boolean;
    expr: IsBindingBehavior;
    private readonly target;
    private readonly prop;
    constructor(locator: IServiceLocator, stateContainer: IStateContainer<object>, expr: IsBindingBehavior, target: HTMLElement, prop: string);
    callSource(e: Event): void;
    handleEvent(e: Event): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=state-dispatch.d.ts.map