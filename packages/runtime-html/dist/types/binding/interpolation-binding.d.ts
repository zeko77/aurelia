import { BindingMode } from './interfaces-bindings';
import type { IServiceLocator } from '@aurelia/kernel';
import type { ITask, TaskQueue } from '@aurelia/platform';
import type { IBinding, ICollectionSubscriber, Interpolation, IObserverLocator, IsExpression, Scope } from '@aurelia/runtime';
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
    isBound: boolean;
    scope?: Scope;
    partBindings: InterpolationPartBinding[];
    private readonly targetObserver;
    private task;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, ast: Interpolation, target: object, targetProperty: string, mode: BindingMode);
    updateTarget(): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
export interface InterpolationPartBinding extends IAstBasedBinding {
}
export declare class InterpolationPartBinding implements IAstBasedBinding, ICollectionSubscriber {
    readonly ast: IsExpression;
    readonly target: object;
    readonly targetProperty: string;
    readonly locator: IServiceLocator;
    readonly owner: InterpolationBinding;
    readonly mode: BindingMode;
    scope?: Scope;
    task: ITask | null;
    isBound: boolean;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(ast: IsExpression, target: object, targetProperty: string, locator: IServiceLocator, observerLocator: IObserverLocator, owner: InterpolationBinding);
    updateTarget(): void;
    handleChange(): void;
    handleCollectionChange(): void;
    $bind(scope: Scope): void;
    $unbind(): void;
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
    readonly mode: BindingMode;
    scope?: Scope;
    task: ITask | null;
    isBound: boolean;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, p: IPlatform, ast: IsExpression, target: Text, strict: boolean);
    updateTarget(value: unknown): void;
    handleChange(): void;
    handleCollectionChange(): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=interpolation-binding.d.ts.map