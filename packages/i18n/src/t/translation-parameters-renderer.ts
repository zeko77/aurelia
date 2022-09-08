import { camelCase } from '@aurelia/kernel';
import { TranslationBinding } from './translation-binding';
import {
  ExpressionType,
  IExpressionParser,
  IObserverLocator,
  BindingMode,
  type IsBindingBehavior,
} from '@aurelia/runtime';
import {
  CommandType,
  IHydratableController,
  attributePattern,
  AttrSyntax,
  bindingCommand,
  IPlatform,
  IAttrMapper,
  ICommandBuildInfo,
} from '@aurelia/runtime-html';

import type {
  BindingCommandInstance,
} from '@aurelia/runtime-html';

export const TranslationParametersInstructionType = 'tpt';
// `.bind` part is needed here only for vCurrent compliance
const attribute = 't-params.bind';

@attributePattern({ pattern: attribute, symbols: '' })
export class TranslationParametersAttributePattern {
  public [attribute](rawName: string, rawValue: string, parts: string[]): AttrSyntax {
    return new AttrSyntax(rawName, rawValue, '', attribute);
  }
}

export class TranslationParametersBindingInstruction {
  public readonly type: string = TranslationParametersInstructionType;
  public mode: BindingMode.toView = BindingMode.toView;

  public constructor(
    public from: IsBindingBehavior,
    public to: string,
  ) {}

  public render(
    controller: IHydratableController,
    target: HTMLElement,
  ): void {
    const context = controller.container;

    const platform = context.get(IPlatform);
    const parser = context.get(IExpressionParser);
    const observerLocator = context.get(IObserverLocator);

    TranslationBinding.create({
      parser,
      observerLocator,
      context,
      controller,
      target,
      instruction: this,
      isParameterContext: true,
      platform
    });
  }
}

@bindingCommand(attribute)
export class TranslationParametersBindingCommand implements BindingCommandInstance {
  public readonly type: CommandType.None = CommandType.None;
  public get name() { return attribute; }

  /** @internal */ protected static inject = [IAttrMapper, IExpressionParser];
  /** @internal */ private readonly _attrMapper: IAttrMapper;
  /** @internal */ private readonly _exprParser: IExpressionParser;

  public constructor(m: IAttrMapper, xp: IExpressionParser) {
    this._attrMapper = m;
    this._exprParser = xp;
  }

  public build(info: ICommandBuildInfo): TranslationParametersBindingInstruction {
    const attr = info.attr;
    let target = attr.target;
    if (info.bindable == null) {
      target = this._attrMapper.map(info.node, target)
        // if the transformer doesn't know how to map it
        // use the default behavior, which is camel-casing
        ?? camelCase(target);
    } else {
      target = info.bindable.property;
    }
    return new TranslationParametersBindingInstruction(this._exprParser.parse(attr.rawValue, ExpressionType.IsProperty), target);
  }
}

