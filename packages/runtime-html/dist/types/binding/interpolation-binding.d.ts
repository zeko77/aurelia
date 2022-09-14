import { LifecycleFlags } from '@aurelia/runtime';
import { BindingMode } from './interfaces-bindings';
import type { ITask, TaskQueue } from '@aurelia/platform';
import type { IServiceLocator } from '@aurelia/kernel';
import type { ICollectionSubscriber, IndexMap, Interpolation, IObserverLocator, IsExpression, IBinding, Scope } from '@aurelia/runtime';
import type { IPlatform } from '../platform';
import type { IAstBasedBinding, IBindingController } from './interfaces-bindings';
export interface InterpolationBinding extends IBinding {
}
export declare class InterpolationBinding implements IBinding {
    locator: IServiceLocator;
    private readonly taskQueue;
    ast: Interpolation;
    target: object;
    targetProperty: string;
    mode: BindingMode;
    interceptor: this;
    isBound: boolean;
    $scope?: Scope;
    partBindings: InterpolationPartBinding[];
    private readonly targetObserver;
    private task;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, ast: Interpolation, target: object, targetProperty: string, mode: BindingMode);
    updateTarget(value: unknown, flags: LifecycleFlags): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
}
export interface InterpolationPartBinding extends IAstBasedBinding {
}
export declare class InterpolationPartBinding implements IAstBasedBinding, ICollectionSubscriber {
    readonly ast: IsExpression;
    readonly target: object;
    readonly targetProperty: string;
    readonly locator: IServiceLocator;
    readonly owner: InterpolationBinding;
    interceptor: this;
    readonly mode: BindingMode;
    value: unknown;
    $scope?: Scope;
    task: ITask | null;
    isBound: boolean;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(ast: IsExpression, target: object, targetProperty: string, locator: IServiceLocator, observerLocator: IObserverLocator, owner: InterpolationBinding);
    handleChange(newValue: unknown, oldValue: unknown, flags: LifecycleFlags): void;
    handleCollectionChange(indexMap: IndexMap, flags: LifecycleFlags): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
}
export interface ContentBinding extends IAstBasedBinding {
}
/**
 * A binding for handling the element content interpolation
 */
export declare class ContentBinding implements IAstBasedBinding, ICollectionSubscriber {
    readonly locator: IServiceLocator;
    private readonly taskQueue;
    private readonly p;
    readonly ast: IsExpression;
    readonly target: Text;
    readonly strict: boolean;
    interceptor: this;
    readonly mode: BindingMode;
    value: unknown;
    $scope?: Scope;
    task: ITask | null;
    isBound: boolean;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, p: IPlatform, ast: IsExpression, target: Text, strict: boolean);
    updateTarget(value: unknown, _flags: LifecycleFlags): void;
    handleChange(newValue: unknown, oldValue: unknown, flags: LifecycleFlags): void;
    handleCollectionChange(): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
    private queueUpdate;
}
//# sourceMappingURL=interpolation-binding.d.ts.map