import { IndexMap, LifecycleFlags } from '@aurelia/runtime';
import { BindingMode } from './interfaces-bindings';
import type { TaskQueue } from '@aurelia/platform';
import type { IServiceLocator } from '@aurelia/kernel';
import type { AccessorOrObserver, ForOfStatement, IObserverLocator, IsBindingBehavior, Scope } from '@aurelia/runtime';
import type { IAstBasedBinding, IBindingController } from './interfaces-bindings';
export interface PropertyBinding extends IAstBasedBinding {
}
export declare class PropertyBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    private readonly taskQueue;
    ast: IsBindingBehavior | ForOfStatement;
    target: object;
    targetProperty: string;
    mode: BindingMode;
    interceptor: this;
    isBound: boolean;
    $scope?: Scope;
    targetObserver?: AccessorOrObserver;
    persistentFlags: LifecycleFlags;
    private task;
    private targetSubscriber;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, ast: IsBindingBehavior | ForOfStatement, target: object, targetProperty: string, mode: BindingMode);
    updateTarget(value: unknown, flags: LifecycleFlags): void;
    updateSource(value: unknown, _flags: LifecycleFlags): void;
    handleChange(newValue: unknown, _previousValue: unknown, flags: LifecycleFlags): void;
    handleCollectionChange(_indexMap: IndexMap, flags: LifecycleFlags): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
}
//# sourceMappingURL=property-binding.d.ts.map