import { IServiceLocator } from '@aurelia/kernel';
import { LifecycleFlags, IObserver } from '@aurelia/runtime';
import { BindingMode } from './interfaces-bindings';
import type { ITask, TaskQueue } from '@aurelia/platform';
import type { ForOfStatement, IObserverLocator, IsBindingBehavior, Scope } from '@aurelia/runtime';
import type { INode } from '../dom';
import type { IAstBasedBinding, IBindingController } from './interfaces-bindings';
export interface AttributeBinding extends IAstBasedBinding {
}
/**
 * Attribute binding. Handle attribute binding betwen view/view model. Understand Html special attributes
 */
export declare class AttributeBinding implements IAstBasedBinding {
    locator: IServiceLocator;
    taskQueue: TaskQueue;
    ast: IsBindingBehavior | ForOfStatement;
    targetAttribute: string;
    targetProperty: string;
    mode: BindingMode;
    interceptor: this;
    isBound: boolean;
    $scope: Scope;
    task: ITask | null;
    private targetSubscriber;
    /**
     * Target key. In case Attr has inner structure, such as class -> classList, style -> CSSStyleDeclaration
     */
    targetObserver: IObserver;
    persistentFlags: LifecycleFlags;
    target: Element;
    value: unknown;
    /**
     * A semi-private property used by connectable mixin
     */
    oL: IObserverLocator;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, ast: IsBindingBehavior | ForOfStatement, target: INode, targetAttribute: string, targetProperty: string, mode: BindingMode);
    updateTarget(value: unknown, flags: LifecycleFlags): void;
    updateSource(value: unknown, _flags: LifecycleFlags): void;
    handleChange(newValue: unknown, _previousValue: unknown, flags: LifecycleFlags): void;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
}
//# sourceMappingURL=attribute.d.ts.map