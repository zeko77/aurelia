import { type IServiceLocator } from '@aurelia/kernel';
import { Scope, type IsBindingBehavior } from '@aurelia/runtime';
import { type IAstBasedBinding } from '@aurelia/runtime-html';
import { type IStore } from './interfaces';
/**
 * A binding that handles the connection of the global state to a property of a target object
 */
export interface StateDispatchBinding extends IAstBasedBinding {
}
export declare class StateDispatchBinding implements IAstBasedBinding {
    interceptor: this;
    locator: IServiceLocator;
    $scope?: Scope | undefined;
    isBound: boolean;
    ast: IsBindingBehavior;
    private readonly target;
    private readonly targetProperty;
    constructor(locator: IServiceLocator, expr: IsBindingBehavior, target: HTMLElement, prop: string, store: IStore<object>);
    callSource(e: Event): void;
    handleEvent(e: Event): void;
    $bind(scope: Scope): void;
    $unbind(): void;
    handleStateChange(state: object): void;
}
//# sourceMappingURL=state-dispatch-binding.d.ts.map