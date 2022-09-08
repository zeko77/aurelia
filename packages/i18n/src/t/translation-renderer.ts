import { camelCase } from '@aurelia/kernel';
import { TranslationBinding } from './translation-binding';
import {
  CustomExpression,
  ExpressionType,
  IExpressionParser,
  IObserverLocator,
  type IsBindingBehavior,
  BindingMode,
} from '@aurelia/runtime';
import {
  CommandType,
  IHydratableController,
  AttrSyntax,
  IPlatform,
  IAttrMapper,
  ICommandBuildInfo,
} from '@aurelia/runtime-html';

import type {
  BindingCommandInstance,
} from '@aurelia/runtime-html';

export const TranslationInstructionType = 'tt';

export class TranslationAttributePattern {
  [key: string]: ((rawName: string, rawValue: string, parts: string[]) => AttrSyntax);

  public static registerAlias(alias: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.prototype[alias] = function (rawName: string, rawValue: string, parts: string[]): AttrSyntax {
      return new AttrSyntax(rawName, rawValue, '', alias);
    };
  }
}

export class TranslationBindingInstruction {
  public readonly type: string = TranslationInstructionType;
  public mode: BindingMode.toView = BindingMode.toView;

  public constructor(
    public from: IsBindingBehavior,
    public to: string,
  ) { }

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
      platform,
    });
  }
}

export class TranslationBindingCommand implements BindingCommandInstance {
  public readonly type: CommandType.None = CommandType.None;
  public get name() { return 't'; }

  /** @internal */ protected static inject = [IAttrMapper];
  /** @internal */ private readonly _attrMapper: IAttrMapper;

  public constructor(m: IAttrMapper) {
    this._attrMapper = m;
  }

  public build(info: ICommandBuildInfo): TranslationBindingInstruction {
    let target: string;
    if (info.bindable == null) {
      target = this._attrMapper.map(info.node, info.attr.target)
        // if the mapper doesn't know how to map it
        // use the default behavior, which is camel-casing
        ?? camelCase(info.attr.target);
    } else {
      target = info.bindable.property;
    }
    return new TranslationBindingInstruction(new CustomExpression(info.attr.rawValue) as IsBindingBehavior, target);
  }
}

export const TranslationBindInstructionType = 'tbt';

export class TranslationBindAttributePattern {
  [key: string]: ((rawName: string, rawValue: string, parts: string[]) => AttrSyntax);

  public static registerAlias(alias: string) {
    const bindPattern = `${alias}.bind`;
    this.prototype[bindPattern] = function (rawName: string, rawValue: string, parts: string[]): AttrSyntax {
      return new AttrSyntax(rawName, rawValue, parts[1], bindPattern);
    };
  }
}

export class TranslationBindBindingInstruction {
  public readonly type: string = TranslationBindInstructionType;
  public mode: BindingMode.toView = BindingMode.toView;

  public constructor(
    public from: IsBindingBehavior,
    public to: string,
  ) { }
}

export class TranslationBindBindingCommand implements BindingCommandInstance {
  public readonly type: CommandType.None = CommandType.None;
  public get name() { return 't-bind'; }

  /** @internal */ protected static inject = [IAttrMapper, IExpressionParser];
  /** @internal */ private readonly _attrMapper: IAttrMapper;
  /** @internal */ private readonly _exprParser: IExpressionParser;

  public constructor(attrMapper: IAttrMapper, exprParser: IExpressionParser) {
    this._attrMapper = attrMapper;
    this._exprParser = exprParser;
  }

  public build(info: ICommandBuildInfo): TranslationBindBindingInstruction {
    let target: string;
    if (info.bindable == null) {
      target = this._attrMapper.map(info.node, info.attr.target)
        // if the mapper doesn't know how to map it
        // use the default behavior, which is camel-casing
        ?? camelCase(info.attr.target);
    } else {
      target = info.bindable.property;
    }
    return new TranslationBindBindingInstruction(this._exprParser.parse(info.attr.rawValue, ExpressionType.IsProperty), target);
  }
}
