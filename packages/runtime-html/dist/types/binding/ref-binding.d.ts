import { IBinding, type IsBindingBehavior, type Scope } from '@aurelia/runtime';
import type { IServiceLocator } from '@aurelia/kernel';
import type { IAstBasedBinding } from './interfaces-bindings';
export interface RefBinding extends IAstBasedBinding {
}
export declare class RefBinding implements IBinding {
    ast: IsBindingBehavior;
    target: object;
    isBound: boolean;
    scope?: Scope;
    constructor(locator: IServiceLocator, ast: IsBindingBehavior, target: object);
    bind(scope: Scope): void;
    unbind(): void;
}
//# sourceMappingURL=ref-binding.d.ts.map