import { IndexMap } from '@aurelia/runtime';
import { BindingMode } from './interfaces-bindings';
import type { TaskQueue } from '@aurelia/platform';
import type { IServiceLocator } from '@aurelia/kernel';
import type { AccessorOrObserver, ForOfStatement, IObserverLocator, IsBindingBehavior, Scope } from '@aurelia/runtime';
import type { IAstBasedBinding, IBindingController } from './interfaces-bindings';
export interface PropertyBinding extends IAstBasedBinding {
}
export declare class PropertyBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    ast: IsBindingBehavior | ForOfStatement;
    target: object;
    targetProperty: string;
    mode: BindingMode;
    interceptor: this;
    isBound: boolean;
    $scope?: Scope;
    targetObserver?: AccessorOrObserver;
    private task;
    private targetSubscriber;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, ast: IsBindingBehavior | ForOfStatement, target: object, targetProperty: string, mode: BindingMode);
    updateTarget(value: unknown): void;
    updateSource(value: unknown): void;
    handleChange(newValue: unknown, _previousValue: unknown): void;
    handleCollectionChange(_indexMap: IndexMap): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=property-binding.d.ts.map