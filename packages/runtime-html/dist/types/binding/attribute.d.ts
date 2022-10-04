import { IServiceLocator } from '@aurelia/kernel';
import { IBinding, IObserver } from '@aurelia/runtime';
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
export declare class AttributeBinding implements IBinding {
    targetAttribute: string;
    targetProperty: string;
    mode: BindingMode;
    isBound: boolean;
    scope?: Scope;
    task: ITask | null;
    /**
     * Target key. In case Attr has inner structure, such as class -> classList, style -> CSSStyleDeclaration
     */
    targetObserver: IObserver;
    target: Element;
    ast: IsBindingBehavior | ForOfStatement;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, taskQueue: TaskQueue, ast: IsBindingBehavior | ForOfStatement, target: INode, targetAttribute: string, targetProperty: string, mode: BindingMode);
    updateTarget(value: unknown): void;
    handleChange(): void;
    handleCollectionChange(): void;
    bind(scope: Scope): void;
    unbind(): void;
}
//# sourceMappingURL=attribute.d.ts.map