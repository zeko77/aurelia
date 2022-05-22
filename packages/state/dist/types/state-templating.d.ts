import { IExpressionParser, IObserverLocator, type IsBindingBehavior } from '@aurelia/runtime';
import { AttrSyntax, CommandType, IAttrMapper, IHydratableController, IPlatform, type BindingCommandInstance, type ICommandBuildInfo, type IInstruction, type IRenderer } from '@aurelia/runtime-html';
import { IStore } from './interfaces';
export declare class StateAttributePattern {
    'PART.state'(rawName: string, rawValue: string, parts: string[]): AttrSyntax;
}
export declare class DispatchAttributePattern {
    'PART.dispatch'(rawName: string, rawValue: string, parts: string[]): AttrSyntax;
}
export declare class StateBindingCommand implements BindingCommandInstance {
    readonly type: CommandType;
    get name(): string;
    constructor(
    /** @internal */ _attrMapper: IAttrMapper);
    build(info: ICommandBuildInfo): IInstruction;
}
export declare class DispatchBindingCommand implements BindingCommandInstance {
    readonly type: CommandType;
    get name(): string;
    build(info: ICommandBuildInfo): IInstruction;
}
export declare class StateBindingInstruction {
    from: string | IsBindingBehavior;
    to: string;
    readonly type = "sb";
    constructor(from: string | IsBindingBehavior, to: string);
}
export declare class DispatchBindingInstruction {
    from: string;
    expr: string | IsBindingBehavior;
    readonly type = "sd";
    constructor(from: string, expr: string | IsBindingBehavior);
}
export declare class StateBindingInstructionRenderer implements IRenderer {
    readonly target: 'sb';
    constructor(
    /** @internal */ _exprParser: IExpressionParser, 
    /** @internal */ _observerLocator: IObserverLocator, 
    /** @internal */ _stateContainer: IStore<object>, 
    /** @internal */ p: IPlatform);
    render(renderingCtrl: IHydratableController, target: object, instruction: StateBindingInstruction): void;
}
export declare class DispatchBindingInstructionRenderer implements IRenderer {
    readonly target: 'sd';
    constructor(
    /** @internal */ _exprParser: IExpressionParser, 
    /** @internal */ _stateContainer: IStore<object>);
    render(renderingCtrl: IHydratableController, target: HTMLElement, instruction: DispatchBindingInstruction): void;
}
//# sourceMappingURL=state-templating.d.ts.map