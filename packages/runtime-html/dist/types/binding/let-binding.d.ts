import type { IIndexable, IServiceLocator } from '@aurelia/kernel';
import type { IObservable, IObserverLocator, IsExpression, Scope } from '@aurelia/runtime';
import type { IAstBasedBinding } from './interfaces-bindings';
export interface LetBinding extends IAstBasedBinding {
}
export declare class LetBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    ast: IsExpression;
    targetProperty: string;
    isBound: boolean;
    scope?: Scope;
    target: (IObservable & IIndexable) | null;
    constructor(locator: IServiceLocator, observerLocator: IObserverLocator, ast: IsExpression, targetProperty: string, toBindingContext?: boolean);
    updateTarget(): void;
    handleChange(): void;
    handleCollectionChange(): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=let-binding.d.ts.map