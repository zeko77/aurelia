import { DelegationStrategy } from '../renderer';
import type { IIndexable, IServiceLocator } from '@aurelia/kernel';
import type { IsBindingBehavior, Scope } from '@aurelia/runtime';
import type { IEventDelegator } from '../observation/event-delegator';
import type { IAstBasedBinding } from './interfaces-bindings';
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
    interceptor: this;
    isBound: boolean;
    $scope: Scope;
    private handler;
    constructor(locator: IServiceLocator, ast: IsBindingBehavior, target: Node, targetEvent: string, eventDelegator: IEventDelegator, options: ListenerOptions);
    callSource(event: Event): ReturnType<IsBindingBehavior['evaluate']>;
    handleEvent(event: Event): void;
    $bind(scope: Scope): void;
    $unbind(): void;
    observe(obj: IIndexable, propertyName: string): void;
    handleChange(newValue: unknown, previousValue: unknown): void;
}
//# sourceMappingURL=listener.d.ts.map