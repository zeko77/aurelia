import { DelegationStrategy } from '../renderer';
import type { IServiceLocator } from '@aurelia/kernel';
import { Scope, type IsBindingBehavior } from '@aurelia/runtime';
import { type IEventDelegator } from '../observation/event-delegator';
import { type IAstBasedBinding } from './interfaces-bindings';
export declare class ListenerOptions {
    readonly prevent: boolean;
    readonly strategy: DelegationStrategy;
    constructor(prevent: boolean, strategy: DelegationStrategy);
}
export interface Listener extends IAstBasedBinding {
}
/**
 * Listener binding. Handle event binding between view and view model
 */
export declare class Listener implements IAstBasedBinding {
    locator: IServiceLocator;
    ast: IsBindingBehavior;
    target: Node;
    targetEvent: string;
    eventDelegator: IEventDelegator;
    isBound: boolean;
    scope?: Scope;
    private handler;
    constructor(locator: IServiceLocator, ast: IsBindingBehavior, target: Node, targetEvent: string, eventDelegator: IEventDelegator, options: ListenerOptions);
    callSource(event: Event): unknown;
    handleEvent(event: Event): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=listener.d.ts.map