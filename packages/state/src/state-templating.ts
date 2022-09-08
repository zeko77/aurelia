import { camelCase } from '@aurelia/kernel';
import {
  ExpressionKind,
  ExpressionType,
  IExpressionParser,
  IObserverLocator,
  type IsBindingBehavior,
} from '@aurelia/runtime';
import {
  applyBindingBehavior,
  attributePattern,
  AttrSyntax,
  bindingCommand,
  CommandType,
  DefinitionType,
  IAttrMapper,
  IHydratableController,
  IPlatform,
  type BindingCommandInstance,
  type ICommandBuildInfo,
  type IInstruction,
} from '@aurelia/runtime-html';
import { IStore } from './interfaces';
import { StateBinding } from './state-binding';
import { StateDispatchBinding } from './state-dispatch-binding';

@attributePattern({ pattern: 'PART.state', symbols: '.' })
export class StateAttributePattern {
  public 'PART.state'(rawName: string, rawValue: string, parts: string[]): AttrSyntax {
    return new AttrSyntax(rawName, rawValue, parts[0], 'state');
  }
}

@attributePattern({ pattern: 'PART.dispatch', symbols: '.' })
export class DispatchAttributePattern {
  public 'PART.dispatch'(rawName: string, rawValue: string, parts: string[]): AttrSyntax {
    return new AttrSyntax(rawName, rawValue, parts[0], 'dispatch');
  }
}

@bindingCommand('state')
export class StateBindingCommand implements BindingCommandInstance {
  /** @internal */ protected static inject = [IAttrMapper];
  public readonly type: CommandType = CommandType.None;
  public get name(): string { return 'state'; }

  public constructor(
    /** @internal */ private readonly _attrMapper: IAttrMapper,
  ) {}

  public build(info: ICommandBuildInfo): IInstruction {
    const attr = info.attr;
    let target = attr.target;
    let value = attr.rawValue;
    if (info.bindable == null) {
      target = this._attrMapper.map(info.node, target)
        // if the mapper doesn't know how to map it
        // use the default behavior, which is camel-casing
        ?? camelCase(target);
    } else {
      // if it looks like: <my-el value.bind>
      // it means        : <my-el value.bind="value">
      if (value === '' && info.def.type === DefinitionType.Element) {
        value = camelCase(target);
      }
      target = info.bindable.property;
    }
    return new StateBindingInstruction(value, target);
  }
}

@bindingCommand('dispatch')
export class DispatchBindingCommand implements BindingCommandInstance {
  public readonly type: CommandType = CommandType.IgnoreAttr;
  public get name(): string { return 'dispatch'; }

  public build(info: ICommandBuildInfo): IInstruction {
    const attr = info.attr;
    return new DispatchBindingInstruction(attr.target, attr.rawValue);
  }
}

export class StateBindingInstruction {
  public readonly type = 'sb';
  public constructor(
    public from: string | IsBindingBehavior,
    public to: string,
  ) {}

  public render(
    renderingCtrl: IHydratableController,
    target: object,
  ): void {
    const context = renderingCtrl.container;

    const parser = context.get(IExpressionParser);
    const observerLocator = context.get(IObserverLocator);
    const stateContainer = context.get(IStore);
    const platform = context.get(IPlatform);

    const binding = new StateBinding(
      renderingCtrl.container,
      platform.domWriteQueue,
      stateContainer,
      observerLocator,
      ensureExpression(parser, this.from, ExpressionType.IsFunction),
      target,
      this.to,
    );
    renderingCtrl.addBinding(binding);
  }
}

export class DispatchBindingInstruction {
  public readonly type = 'sd';
  public constructor(
    public from: string,
    public expr: string | IsBindingBehavior,
  ) {}

  public render(
    renderingCtrl: IHydratableController,
    target: object,
  ): void {
    const context = renderingCtrl.container;

    const parser = context.get(IExpressionParser);
    const stateContainer = context.get(IStore);

    const expr = ensureExpression(parser, this.expr, ExpressionType.IsProperty);
    const binding = new StateDispatchBinding(
      context,
      stateContainer,
      expr,
      target as HTMLElement,
      this.from
    );
    renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
      ? applyBindingBehavior(binding, expr, renderingCtrl.container)
      : binding
    );
  }
}

function ensureExpression<TFrom>(parser: IExpressionParser, srcOrExpr: TFrom, expressionType: ExpressionType): Exclude<TFrom, string> {
  if (typeof srcOrExpr === 'string') {
    return parser.parse(srcOrExpr, expressionType) as unknown as Exclude<TFrom, string>;
  }
  return srcOrExpr as Exclude<TFrom, string>;
}
