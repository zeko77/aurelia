import { LifecycleFlags } from '@aurelia/runtime';
import { IPlatform, IAstBasedBinding, IBindingController } from '@aurelia/runtime-html';
import i18next from 'i18next';
import type { IContainer, IServiceLocator } from '@aurelia/kernel';
import type { Scope, IsExpression, IExpressionParser, IObserverLocator, IObserverLocatorBasedConnectable } from '@aurelia/runtime';
import type { CallBindingInstruction, IHydratableController, INode } from '@aurelia/runtime-html';
interface TranslationBindingCreationContext {
    parser: IExpressionParser;
    observerLocator: IObserverLocator;
    context: IContainer;
    controller: IHydratableController;
    target: HTMLElement;
    instruction: CallBindingInstruction;
    platform: IPlatform;
    isParameterContext?: boolean;
}
export interface TranslationBinding extends IAstBasedBinding {
}
export declare class TranslationBinding implements IObserverLocatorBasedConnectable {
    locator: IServiceLocator;
    interceptor: this;
    isBound: boolean;
    expr: IsExpression;
    private readonly i18n;
    private scope;
    private task;
    private readonly _targetAccessors;
    target: HTMLElement;
    private readonly platform;
    private readonly taskQueue;
    private parameter;
    /**
     * A semi-private property used by connectable mixin
     */
    readonly oL: IObserverLocator;
    constructor(controller: IBindingController, locator: IServiceLocator, observerLocator: IObserverLocator, platform: IPlatform, target: INode);
    static create({ parser, observerLocator, context, controller, target, instruction, platform, isParameterContext, }: TranslationBindingCreationContext): void;
    private static getBinding;
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
    handleChange(newValue: string | i18next.TOptions, _previousValue: string | i18next.TOptions, flags: LifecycleFlags): void;
    handleLocaleChange(): void;
    useParameter(expr: IsExpression): void;
}
export {};
//# sourceMappingURL=translation-binding.d.ts.map