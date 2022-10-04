import { IContainer } from '@aurelia/kernel';
import { IExpressionParser, IBinding, Scope, type IsBindingBehavior } from '@aurelia/runtime';
import { InstructionType, IRenderer, IHydratableController, type IAstBasedBinding, CommandType, ICommandBuildInfo, BindingCommandInstance, IInstruction } from '@aurelia/runtime-html';
import type { IDisposable, IServiceLocator } from '@aurelia/kernel';
export declare const delegateSyntax: {
    register(container: IContainer): void;
};
export declare class DelegateBindingCommand implements BindingCommandInstance {
    get type(): CommandType.IgnoreAttr;
    build(info: ICommandBuildInfo, exprParser: IExpressionParser): IInstruction;
}
export declare class ListenerBindingRenderer implements IRenderer {
    readonly target: 'dl';
    constructor(parser: IExpressionParser, eventDelegator: IEventDelegator);
    render(renderingCtrl: IHydratableController, target: HTMLElement, instruction: DelegateBindingInstruction): void;
}
export declare class DelegateBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    preventDefault: boolean;
    readonly type = InstructionType.listenerBinding;
    constructor(from: string | IsBindingBehavior, to: string, preventDefault: boolean);
}
export declare class DelegateListenerOptions {
    readonly prevent: boolean;
    constructor(prevent: boolean);
}
export interface DelegateListenerBinding extends IAstBasedBinding {
}
/**
 * Listener binding. Handle event binding between view and view model
 */
export declare class DelegateListenerBinding implements IBinding {
    ast: IsBindingBehavior;
    target: Node;
    targetEvent: string;
    eventDelegator: IEventDelegator;
    isBound: boolean;
    scope?: Scope;
    private handler;
    constructor(locator: IServiceLocator, ast: IsBindingBehavior, target: Node, targetEvent: string, eventDelegator: IEventDelegator, options: DelegateListenerOptions);
    callSource(event: Event): unknown;
    handleEvent(event: Event): void;
    bind(scope: Scope): void;
    unbind(): void;
}
export interface IEventDelegator extends EventDelegator {
}
export declare const IEventDelegator: import("@aurelia/kernel").InterfaceSymbol<IEventDelegator>;
export declare class EventDelegator implements IDisposable {
    addEventListener(publisher: EventTarget, target: Node, eventName: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions): IDisposable;
    dispose(): void;
}
//# sourceMappingURL=compat-delegate.d.ts.map