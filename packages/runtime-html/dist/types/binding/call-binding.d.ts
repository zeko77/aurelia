import { LifecycleFlags } from '@aurelia/runtime';
import type { IServiceLocator } from '@aurelia/kernel';
import type { IAccessor, IObserverLocator, IsBindingBehavior, Scope } from '@aurelia/runtime';
import type { IAstBasedBinding } from './interfaces-bindings';
/**
 * A binding for handling .call syntax
 */
export interface CallBinding extends IAstBasedBinding {
}
export declare class CallBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    ast: IsBindingBehavior;
    readonly target: object;
    readonly targetProperty: string;
    interceptor: this;
    isBound: boolean;
    $scope?: Scope;
    targetObserver: IAccessor;
    constructor(locator: IServiceLocator, observerLocator: IObserverLocator, ast: IsBindingBehavior, target: object, targetProperty: string);
    callSource(args: object): unknown;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
    observe(_obj: object, _propertyName: string): void;
    handleChange(_newValue: unknown, _previousValue: unknown, _flags: LifecycleFlags): void;
}
//# sourceMappingURL=call-binding.d.ts.map