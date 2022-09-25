import { type IsBindingBehavior, type Scope } from '@aurelia/runtime';
import type { IIndexable, IServiceLocator } from '@aurelia/kernel';
import type { IAstBasedBinding } from './interfaces-bindings';
export interface RefBinding extends IAstBasedBinding {
}
export declare class RefBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    ast: IsBindingBehavior;
    target: object;
    interceptor: this;
    isBound: boolean;
    $scope?: Scope;
    constructor(locator: IServiceLocator, ast: IsBindingBehavior, target: object);
    $bind(scope: Scope): void;
    $unbind(): void;
    observe(_obj: IIndexable, _propertyName: string): void;
    handleChange(_newValue: unknown, _previousValue: unknown): void;
}
//# sourceMappingURL=ref-binding.d.ts.map