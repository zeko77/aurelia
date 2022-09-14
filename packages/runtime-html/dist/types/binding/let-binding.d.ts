import { IndexMap, LifecycleFlags } from '@aurelia/runtime';
import type { ITask } from '@aurelia/platform';
import type { IIndexable, IServiceLocator } from '@aurelia/kernel';
import type { IObservable, IObserverLocator, IsExpression, Scope } from '@aurelia/runtime';
import type { IAstBasedBinding } from './interfaces-bindings';
export interface LetBinding extends IAstBasedBinding {
}
export declare class LetBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    ast: IsExpression;
    targetProperty: string;
    interceptor: this;
    isBound: boolean;
    $scope?: Scope;
    task: ITask | null;
    target: (IObservable & IIndexable) | null;
    constructor(locator: IServiceLocator, observerLocator: IObserverLocator, ast: IsExpression, targetProperty: string, toBindingContext?: boolean);
    handleChange(newValue: unknown, _previousValue: unknown, _flags: LifecycleFlags): void;
    handleCollectionChange(_indexMap: IndexMap, _flags: LifecycleFlags): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
}
//# sourceMappingURL=let-binding.d.ts.map