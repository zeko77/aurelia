import { type IContainer } from '@aurelia/kernel';
import { IAccessor, IAstEvaluator, IBinding, IConnectableBinding, IExpressionParser, IObserverLocator, IsBindingBehavior, Scope } from '@aurelia/runtime';
import { BindingCommandInstance, CommandType, ICommandBuildInfo, IController, IHydratableController, IInstruction, IRenderer } from '@aurelia/runtime-html';
import type { IServiceLocator } from '@aurelia/kernel';
export declare const callSyntax: {
    register(container: IContainer): void;
};
declare const instructionType = "rh";
export declare class CallBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    readonly type = "rh";
    constructor(from: string | IsBindingBehavior, to: string);
}
export declare class CallBindingCommand implements BindingCommandInstance {
    get type(): CommandType.None;
    build(info: ICommandBuildInfo, exprParser: IExpressionParser): IInstruction;
}
export declare class CallBindingRenderer implements IRenderer {
    target: typeof instructionType;
    constructor(exprParser: IExpressionParser, observerLocator: IObserverLocator);
    render(renderingCtrl: IHydratableController, target: IController, instruction: CallBindingInstruction): void;
}
/**
 * A binding for handling .call syntax
 */
export interface CallBinding extends IAstEvaluator, IConnectableBinding {
}
export declare class CallBinding implements IBinding {
    ast: IsBindingBehavior;
    readonly target: object;
    readonly targetProperty: string;
    isBound: boolean;
    scope?: Scope;
    targetObserver: IAccessor;
    constructor(locator: IServiceLocator, observerLocator: IObserverLocator, ast: IsBindingBehavior, target: object, targetProperty: string);
    callSource(args: object): unknown;
    bind(scope: Scope): void;
    unbind(): void;
}
export {};
//# sourceMappingURL=compat-call.d.ts.map