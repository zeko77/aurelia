import { type IServiceLocator } from '@aurelia/kernel';
import { LifecycleFlags, Scope, type IConnectableBinding, type IsBindingBehavior } from '@aurelia/runtime';
import { type IStore } from './interfaces';
/**
 * A binding that handles the connection of the global state to a property of a target object
 */
export interface StateDispatchBinding extends IConnectableBinding {
}
export declare class StateDispatchBinding implements IConnectableBinding {
    interceptor: this;
    locator: IServiceLocator;
    $scope?: Scope | undefined;
    isBound: boolean;
    expr: IsBindingBehavior;
    private readonly target;
    private readonly targetProperty;
    constructor(locator: IServiceLocator, store: IStore<object>, expr: IsBindingBehavior, target: HTMLElement, prop: string);
    callSource(e: Event): void;
    handleEvent(e: Event): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(): void;
    handleStateChange(state: object): void;
}
//# sourceMappingURL=state-dispatch-binding.d.ts.map