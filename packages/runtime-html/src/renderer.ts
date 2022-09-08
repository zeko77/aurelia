import { DI, emptyArray, InstanceProvider } from '@aurelia/kernel';
import {
  BindingMode,
  ExpressionType,
  IExpressionParser,
  IObserverLocator,
  LifecycleFlags,
  BindingBehaviorExpression,
  BindingBehaviorFactory,
  ExpressionKind,
  IBinding,
  Scope,
} from '@aurelia/runtime';
import { CallBinding } from './binding/call-binding';
import { AttributeBinding } from './binding/attribute';
import { InterpolationBinding, InterpolationPartBinding, ContentBinding } from './binding/interpolation-binding';
import { LetBinding } from './binding/let-binding';
import { PropertyBinding } from './binding/property-binding';
import { RefBinding } from './binding/ref-binding';
import { Listener, ListenerOptions } from './binding/listener';
import { IEventDelegator } from './observation/event-delegator';
import { CustomElement, CustomElementDefinition, findElementControllerFor } from './resources/custom-element';
import { AuSlotsInfo, IAuSlotsInfo, IProjections } from './resources/slot-injectables';
import { CustomAttribute, CustomAttributeDefinition, findAttributeControllerFor } from './resources/custom-attribute';
import { convertToRenderLocation, IRenderLocation, INode, setRef } from './dom';
import { Controller, ICustomElementController, ICustomElementViewModel, IController, ICustomAttributeViewModel, IHydrationContext, ViewModelKind } from './templating/controller';
import { IPlatform } from './platform';
import { IViewFactory } from './templating/view';
import { IRendering } from './templating/rendering';
import { AttrSyntax } from './resources/attribute-pattern';
import { isString } from './utilities';

import type { IServiceLocator, IContainer, Constructable, IResolver } from '@aurelia/kernel';
import type {
  Interpolation,
  IsBindingBehavior,
  AnyBindingExpression,
  BindingBehaviorInstance,
  IInterceptableBinding,
  IObservable,
  ForOfStatement,
  DelegationStrategy,
} from '@aurelia/runtime';
import type { IHydratableController } from './templating/controller';
import type { PartialCustomElementDefinition } from './resources/custom-element';

export const enum InstructionType {
  hydrateElement = 'ra',
  hydrateAttribute = 'rb',
  hydrateTemplateController = 'rc',
  hydrateLetElement = 'rd',
  setProperty = 're',
  interpolation = 'rf',
  propertyBinding = 'rg',
  callBinding = 'rh',
  letBinding = 'ri',
  refBinding = 'rj',
  iteratorBinding = 'rk',
  textBinding = 'ha',
  listenerBinding = 'hb',
  attributeBinding = 'hc',
  stylePropertyBinding = 'hd',
  setAttribute = 'he',
  setClassAttribute = 'hf',
  setStyleAttribute = 'hg',
  spreadBinding = 'hs',
  spreadElementProp = 'hp',
}

export type InstructionTypeName = string;

export type IInstruction = {
  readonly type: InstructionTypeName;
} | {
  readonly type?: undefined;
  render(
    renderingCtrl: IHydratableController,
    target: INode | IController,
  ): void;

}
export const IInstruction = DI.createInterface<IInstruction>('Instruction');

export function isInstruction(value: unknown): value is IInstruction {
  const type = (value as { type?: string }).type;
  return isString(type) && type.length === 2;
}

export class InterpolationInstruction {
  public get type(): InstructionType.interpolation { return InstructionType.interpolation; }

  public constructor(
    public from: string | Interpolation,
    public to: string,
  ) {}
}

export class PropertyBindingInstruction {
  public get type(): InstructionType.propertyBinding { return InstructionType.propertyBinding; }

  public constructor(
    public from: string | IsBindingBehavior,
    public to: string,
    public mode: BindingMode,
  ) {}
}

export class IteratorBindingInstruction {
  public get type(): InstructionType.iteratorBinding { return InstructionType.iteratorBinding; }

  public constructor(
    public from: string | ForOfStatement,
    public to: string,
  ) {}
}

export class CallBindingInstruction {
  public get type(): InstructionType.callBinding { return InstructionType.callBinding; }

  public constructor(
    public from: string | IsBindingBehavior,
    public to: string,
  ) {}
}

export class RefBindingInstruction {
  public get type(): InstructionType.refBinding { return InstructionType.refBinding; }

  public constructor(
    public readonly from: string | IsBindingBehavior,
    public readonly to: string
  ) {}
}

export class SetPropertyInstruction {
  public get type(): InstructionType.setProperty { return InstructionType.setProperty; }

  public constructor(
    public value: unknown,
    public to: string,
  ) {}
}

export class HydrateElementInstruction {
  public get type(): InstructionType.hydrateElement { return InstructionType.hydrateElement; }

  /**
   * A special property that can be used to store <au-slot/> usage information
   */
  public auSlot: { name: string; fallback: CustomElementDefinition } | null = null;

  public constructor(
    /**
     * The name of the custom element this instruction is associated with
     */
    // in theory, Constructor of resources should be accepted too
    // though it would be unnecessary right now
    public res: string | /* Constructable |  */CustomElementDefinition,
    public alias: string | undefined,
    /**
     * Bindable instructions for the custom element instance
     */
    public props: IInstruction[],
    /**
     * Indicates what projections are associated with the element usage
     */
    public projections: Record<string, CustomElementDefinition> | null,
    /**
     * Indicates whether the usage of the custom element was with a containerless attribute or not
     */
    public containerless: boolean,
    /**
     * A list of captured attr syntaxes
     */
    public captures: AttrSyntax[] | undefined,
  ) {
  }
}

export class HydrateAttributeInstruction {
  public get type(): InstructionType.hydrateAttribute { return InstructionType.hydrateAttribute; }

  public constructor(
    // in theory, Constructor of resources should be accepted too
    // though it would be unnecessary right now
    public res: string | /* Constructable |  */CustomAttributeDefinition,
    public alias: string | undefined,
    /**
     * Bindable instructions for the custom attribute instance
     */
    public props: IInstruction[],
  ) {}
}

export class HydrateTemplateController {
  public get type(): InstructionType.hydrateTemplateController { return InstructionType.hydrateTemplateController; }

  public constructor(
    public def: PartialCustomElementDefinition,
    // in theory, Constructor of resources should be accepted too
    // though it would be unnecessary right now
    public res: string | /* Constructable |  */CustomAttributeDefinition,
    public alias: string | undefined,
    /**
     * Bindable instructions for the template controller instance
     */
    public props: IInstruction[],
  ) {}
}

export class HydrateLetElementInstruction {
  public get type(): InstructionType.hydrateLetElement { return InstructionType.hydrateLetElement; }

  public constructor(
    public instructions: LetBindingInstruction[],
    public toBindingContext: boolean,
  ) {}
}

export class LetBindingInstruction {
  public get type(): InstructionType.letBinding { return InstructionType.letBinding; }

  public constructor(
    public from: string | IsBindingBehavior | Interpolation,
    public to: string,
  ) {}
}

export class TextBindingInstruction {
  public get type(): InstructionType.textBinding { return InstructionType.textBinding; }

  public constructor(
    public from: string | Interpolation,
    /**
     * Indicates whether the value of the expression "from"
     * should be evaluated in strict mode.
     *
     * In none strict mode, "undefined" and "null" are coerced into empty string
     */
    public strict: boolean,
  ) {}
}

export class ListenerBindingInstruction {
  public get type(): InstructionType.listenerBinding { return InstructionType.listenerBinding; }

  public constructor(
    public from: string | IsBindingBehavior,
    public to: string,
    public preventDefault: boolean,
    public strategy: DelegationStrategy,
  ) {}
}
export class StylePropertyBindingInstruction {
  public get type(): InstructionType.stylePropertyBinding { return InstructionType.stylePropertyBinding; }

  public constructor(
    public from: string | IsBindingBehavior,
    public to: string,
  ) {}
}

export class SetAttributeInstruction {
  public get type(): InstructionType.setAttribute { return InstructionType.setAttribute; }

  public constructor(
    public value: string,
    public to: string,
  ) {}
}

export class SetClassAttributeInstruction {
  public readonly type: InstructionType.setClassAttribute = InstructionType.setClassAttribute;

  public constructor(
    public readonly value: string,
  ) {}
}

export class SetStyleAttributeInstruction {
  public readonly type: InstructionType.setStyleAttribute = InstructionType.setStyleAttribute;

  public constructor(
    public readonly value: string,
  ) {}
}

export class AttributeBindingInstruction {
  public get type(): InstructionType.attributeBinding { return InstructionType.attributeBinding; }

  public constructor(
    /**
     * `attr` and `to` have the same value on a normal attribute
     * Will be different on `class` and `style`
     * on `class`: attr = `class` (from binding command), to = attribute name
     * on `style`: attr = `style` (from binding command), to = attribute name
     */
    public attr: string,
    public from: string | IsBindingBehavior,
    public to: string,
  ) {}
}

export class SpreadBindingInstruction {
  public get type(): InstructionType.spreadBinding { return InstructionType.spreadBinding; }
}

export class SpreadElementPropBindingInstruction {
  public get type(): InstructionType.spreadElementProp { return InstructionType.spreadElementProp; }
  public constructor(
    public readonly instructions: IInstruction,
  ) {}
}

export const ITemplateCompiler = DI.createInterface<ITemplateCompiler>('ITemplateCompiler');
export interface ITemplateCompiler {
  /**
   * Indicates whether this compiler should compile template in debug mode
   *
   * For the default compiler, this means all expressions are kept as is on the template
   */
  debug: boolean;
  /**
   * Experimental API, for optimization.
   *
   * `true` to create CustomElement/CustomAttribute instructions
   * with resolved resources constructor during compilation, instead of name
   */
  resolveResources: boolean;
  compile(
    partialDefinition: PartialCustomElementDefinition,
    context: IContainer,
    compilationInstruction: ICompliationInstruction | null,
  ): CustomElementDefinition;

  /**
   * Compile a list of captured attributes as if they are declared in a template
   *
   * @param requestor - the context definition where the attributes is compiled
   * @param attrSyntaxes - the attributes captured
   * @param container - the container containing information for the compilation
   * @param host - the host element where the attributes are spreaded on
   */
  compileSpread(
    requestor: PartialCustomElementDefinition,
    attrSyntaxes: AttrSyntax[],
    container: IContainer,
    host: Element,
  ): IInstruction[];
}

export interface ICompliationInstruction {
  /**
   * A record of projections available for compiling a template.
   * Where each key is the matching slot name for <au-slot/> inside,
   * and each value is the definition to render and project
   */
  projections: IProjections | null;
}

export interface IInstructionTypeClassifier<TType extends string = string> {
  target: TType;
}

function ensureExpression<TFrom>(parser: IExpressionParser, srcOrExpr: TFrom, expressionType: ExpressionType): Exclude<TFrom, string> {
  if (isString(srcOrExpr)) {
    return parser.parse(srcOrExpr, expressionType) as unknown as Exclude<TFrom, string>;
  }
  return srcOrExpr as Exclude<TFrom, string>;
}

function getTarget(potentialTarget: object): object {
  if ((potentialTarget as { viewModel?: object }).viewModel != null) {
    return (potentialTarget as { viewModel: object }).viewModel;
  }
  return potentialTarget;
}

function getRefTarget(refHost: INode, refTargetName: string): object {
  if (refTargetName === 'element') {
    return refHost;
  }
  switch (refTargetName) {
    case 'controller':
      // this means it supports returning undefined
      return findElementControllerFor(refHost)!;
    case 'view':
      // todo: returns node sequences for fun?
      if (__DEV__)
        throw new Error(`AUR0750: Not supported API`);
      else
        throw new Error(`AUR0750`);
    case 'view-model':
      // this means it supports returning undefined
      return findElementControllerFor(refHost)!.viewModel;
    default: {
      const caController = findAttributeControllerFor(refHost, refTargetName);
      if (caController !== void 0) {
        return caController.viewModel;
      }
      const ceController = findElementControllerFor(refHost, { name: refTargetName });
      if (ceController === void 0) {
        if (__DEV__)
          throw new Error(`AUR0751: Attempted to reference "${refTargetName}", but it was not found amongst the target's API.`);
        else
          throw new Error(`AUR0751:${refTargetName}`);
      }
      return ceController.viewModel;
    }
  }
}

let behaviorExpressionIndex = 0;
const behaviorExpressions: BindingBehaviorExpression[] = [];

export function applyBindingBehavior<T extends IInterceptableBinding>(
  binding: T,
  expression: IsBindingBehavior,
  locator: IServiceLocator,
): T {
  while (expression instanceof BindingBehaviorExpression) {
    behaviorExpressions[behaviorExpressionIndex++] = expression;
    expression = expression.expression;
  }
  while (behaviorExpressionIndex > 0) {
    const behaviorExpression = behaviorExpressions[--behaviorExpressionIndex];
    const behaviorOrFactory = locator.get<BindingBehaviorFactory | BindingBehaviorInstance>(behaviorExpression.behaviorKey);
    if (behaviorOrFactory instanceof BindingBehaviorFactory) {
      binding = behaviorOrFactory.construct(binding, behaviorExpression) as T;
    }
  }
  behaviorExpressions.length = 0;
  return binding;
}

export interface IListenerBehaviorOptions {
  /**
   * `true` if the expression specified in the template is meant to be treated as a handler
   */
  expAsHandler: boolean;
}
export const IListenerBehaviorOptions = DI.createInterface<IListenerBehaviorOptions>('IListenerBehaviorOptions', x => x.singleton(ListenerBehaviorOptions));

class ListenerBehaviorOptions implements IListenerBehaviorOptions {
  public expAsHandler = false;
}

class SpreadBinding implements IBinding {
  public interceptor = this;
  public $scope?: Scope | undefined;
  public isBound: boolean = false;
  public readonly locator: IServiceLocator;

  public readonly ctrl: ICustomElementController;

  public get container() {
    return this.locator;
  }

  public get definition(): CustomElementDefinition | CustomElementDefinition {
    return this.ctrl.definition;
  }

  public get isStrictBinding() {
    return this.ctrl.isStrictBinding;
  }

  public constructor(
    /** @internal */ private readonly _innerBindings: IBinding[],
    /** @internal */ private readonly _hydrationContext: IHydrationContext<object>,
  ) {
    this.ctrl = _hydrationContext.controller;
    this.locator = this.ctrl.container;
  }

  public $bind(flags: LifecycleFlags, _scope: Scope): void {
    if (this.isBound) {
      return;
    }
    this.isBound = true;
    const innerScope = this.$scope = this._hydrationContext.controller.scope.parentScope ?? void 0;
    if (innerScope == null) {
      throw new Error('Invalid spreading. Context scope is null/undefined');
    }

    this._innerBindings.forEach(b => b.$bind(flags, innerScope));
  }

  public $unbind(flags: LifecycleFlags): void {
    this._innerBindings.forEach(b => b.$unbind(flags));
    this.isBound = false;
  }

  public addBinding(binding: IBinding) {
    this._innerBindings.push(binding);
  }

  public addChild(controller: IController) {
    if (controller.vmKind !== ViewModelKind.customAttribute) {
      throw new Error('Spread binding does not support spreading custom attributes/template controllers');
    }
    this.ctrl.addChild(controller);
  }
}

// http://jsben.ch/7n5Kt
function addClasses(classList: DOMTokenList, className: string): void {
  const len = className.length;
  let start = 0;
  for (let i = 0; i < len; ++i) {
    if (className.charCodeAt(i) === 0x20) {
      if (i !== start) {
        classList.add(className.slice(start, i));
      }
      start = i + 1;
    } else if (i + 1 === len) {
      classList.add(className.slice(start));
    }
  }
}

const createSurrogateBinding = (context: IHydrationContext<object>) =>
  new SpreadBinding([], context) as SpreadBinding & IHydratableController;
const controllerProviderName = 'IController';
const instructionProviderName = 'IInstruction';
const locationProviderName = 'IRenderLocation';
const slotInfoProviderName = 'IAuSlotsInfo';

function createElementContainer(
  p: IPlatform,
  renderingCtrl: IController,
  host: HTMLElement,
  instruction: HydrateElementInstruction,
  location: IRenderLocation | null,
  auSlotsInfo?: IAuSlotsInfo,
): IContainer {
  const ctn = renderingCtrl.container.createChild();

  // todo:
  // both node provider and location provider may not be allowed to throw
  // if there's no value associated, unlike InstanceProvider
  // reason being some custom element can have `containerless` attribute on them
  // causing the host to disappear, and replace by a location instead
  ctn.registerResolver(
    p.HTMLElement,
    ctn.registerResolver(
      p.Element,
      ctn.registerResolver(INode, new InstanceProvider('ElementResolver', host))
    )
  );
  ctn.registerResolver(IController, new InstanceProvider(controllerProviderName, renderingCtrl));
  ctn.registerResolver(IInstruction, new InstanceProvider(instructionProviderName, instruction));
  ctn.registerResolver(IRenderLocation, location == null
    ? noLocationProvider
    : new RenderLocationProvider(location));
  ctn.registerResolver(IViewFactory, noViewFactoryProvider);
  ctn.registerResolver(IAuSlotsInfo, auSlotsInfo == null
    ? noAuSlotProvider
    : new InstanceProvider(slotInfoProviderName, auSlotsInfo)
  );

  return ctn;
}

class ViewFactoryProvider implements IResolver {
  private readonly f: IViewFactory | null;
  public get $isResolver(): true { return true; }

  public constructor(
    /**
     * The factory instance that this provider will resolves to,
     * until explicitly overridden by prepare call
     */
    factory: IViewFactory | null
  ) {
    this.f = factory;
  }

  public resolve(): IViewFactory {
    const f = this.f;
    if (f === null) {
      if (__DEV__)
        throw new Error(`AUR7055: Cannot resolve ViewFactory before the provider was prepared.`);
      else
        throw new Error(`AUR7055`);
    }
    if (!isString(f.name) || f.name.length === 0) {
      if (__DEV__)
        throw new Error(`AUR0756: Cannot resolve ViewFactory without a (valid) name.`);
      else
        throw new Error(`AUR0756`);
    }
    return f;
  }
}

function invokeAttribute(
  p: IPlatform,
  definition: CustomAttributeDefinition,
  renderingCtrl: IController,
  host: HTMLElement,
  instruction: HydrateAttributeInstruction | HydrateTemplateController,
  viewFactory?: IViewFactory,
  location?: IRenderLocation,
  auSlotsInfo?: IAuSlotsInfo,
): { vm: ICustomAttributeViewModel; ctn: IContainer } {
  const ctn = renderingCtrl.container.createChild();
  ctn.registerResolver(
    p.HTMLElement,
    ctn.registerResolver(
      p.Element,
      ctn.registerResolver(INode, new InstanceProvider('ElementResolver', host))
    )
  );
  renderingCtrl = renderingCtrl instanceof Controller
    ? renderingCtrl
    : (renderingCtrl as unknown as SpreadBinding).ctrl;
  ctn.registerResolver(IController, new InstanceProvider(controllerProviderName, renderingCtrl));
  ctn.registerResolver(IInstruction, new InstanceProvider<IInstruction>(instructionProviderName, instruction));
  ctn.registerResolver(IRenderLocation, location == null
    ? noLocationProvider
    : new InstanceProvider(locationProviderName, location));
  ctn.registerResolver(IViewFactory, viewFactory == null
    ? noViewFactoryProvider
    : new ViewFactoryProvider(viewFactory));
  ctn.registerResolver(IAuSlotsInfo, auSlotsInfo == null
    ? noAuSlotProvider
    : new InstanceProvider(slotInfoProviderName, auSlotsInfo));

  return { vm: ctn.invoke(definition.Type), ctn };
}

class RenderLocationProvider implements IResolver {
  public get name() { return 'IRenderLocation'; }
  public get $isResolver(): true { return true; }

  public constructor(
    private readonly _location: IRenderLocation | null
  ) {}

  public resolve(): IRenderLocation | null {
    return this._location;
  }
}

const noLocationProvider = new RenderLocationProvider(null);
const noViewFactoryProvider = new ViewFactoryProvider(null);
const noAuSlotProvider = new InstanceProvider<IAuSlotsInfo>(slotInfoProviderName, new AuSlotsInfo(emptyArray));

export type RenderingInstruction = (
  | InterpolationInstruction
  | PropertyBindingInstruction
  | IteratorBindingInstruction
  | CallBindingInstruction
  | RefBindingInstruction
  | SetPropertyInstruction
  | HydrateElementInstruction
  | HydrateAttributeInstruction
  | HydrateTemplateController
  | HydrateLetElementInstruction
  | LetBindingInstruction
  | TextBindingInstruction
  | ListenerBindingInstruction
  | StylePropertyBindingInstruction
  | SetAttributeInstruction
  | SetClassAttributeInstruction
  | SetStyleAttributeInstruction
  | AttributeBindingInstruction
  | SpreadBindingInstruction
  | SpreadElementPropBindingInstruction
  | {
    type?: undefined;
    render(
      renderingCtrl: IHydratableController,
      target: INode | IController,
    ): void;
  }
);

export function render(
  renderingCtrl: IHydratableController,
  target: INode | IController,
  instruction: IInstruction,
) {
  const _instruction = instruction as RenderingInstruction;
  switch (_instruction.type) {
    case InstructionType.hydrateElement: {
      /* eslint-disable prefer-const */
      let def: CustomElementDefinition | null;
      let Ctor: Constructable<ICustomElementViewModel>;
      let component: ICustomElementViewModel;
      let childCtrl: ICustomElementController;
      const res = _instruction.res;
      const projections = _instruction.projections;
      const ctxContainer = renderingCtrl.container;
      switch (typeof res) {
        case 'string':
          def = ctxContainer.find(CustomElement, res);
          if (def == null) {
            if (__DEV__)
              throw new Error(`AUR0752: Element ${res} is not registered in ${(renderingCtrl as Controller)['name']}.`);
            else
              throw new Error(`AUR0752:${res}@${(renderingCtrl as Controller)['name']}`);
          }
          break;
        // constructor based instruction
        // will be enabled later if needed.
        // As both AOT + runtime based can use definition for perf
        // -----------------
        // case 'function':
        //   def = CustomElement.getDefinition(res);
        //   break;
        default:
          def = res;
      }
      const platform = ctxContainer.get(IPlatform);
      const containerless = _instruction.containerless || def.containerless;
      const location = containerless ? convertToRenderLocation(target as HTMLElement) : null;
      const container = createElementContainer(
        /* platform         */platform,
        /* parentController */renderingCtrl,
        /* host             */target as HTMLElement,
        /* instruction      */_instruction,
        /* location         */location,
        /* auSlotsInfo      */projections == null ? void 0 : new AuSlotsInfo(Object.keys(projections)),
      );
      Ctor = def.Type;
      component = container.invoke(Ctor);
      container.registerResolver(Ctor, new InstanceProvider<typeof Ctor>(def.key, component));
      childCtrl = Controller.$el(
        /* own container       */container,
        /* viewModel           */component,
        /* host                */target as HTMLElement,
        /* instruction         */_instruction,
        /* definition          */def,
        /* location            */location
      );

      setRef(target as HTMLElement, def.key, childCtrl);

      const props = _instruction.props;
      const ii = props.length;
      let i = 0;
      while (ii > i) {
        render(renderingCtrl, childCtrl, props[i] as RenderingInstruction);
        ++i;
      }

      renderingCtrl.addChild(childCtrl);
      /* eslint-enable prefer-const */
      break;
    }
    case InstructionType.hydrateAttribute: {
      /* eslint-disable prefer-const */
      let ctxContainer = renderingCtrl.container;
      let def: CustomAttributeDefinition | null;
      switch (typeof _instruction.res) {
        case 'string':
          def = ctxContainer.find(CustomAttribute, _instruction.res);
          if (def == null) {
            if (__DEV__)
              throw new Error(`AUR0753: Attribute ${_instruction.res} is not registered in ${(renderingCtrl as Controller)['name']}.`);
            else
              throw new Error(`AUR0753:${_instruction.res}@${(renderingCtrl as Controller)['name']}`);
          }
          break;
        // constructor based instruction
        // will be enabled later if needed.
        // As both AOT + runtime based can use definition for perf
        // -----------------
        // case 'function':
        //   def = CustomAttribute.getDefinition(instruction.res);
        //   break;
        default:
          def = _instruction.res;
      }
      const platform = ctxContainer.get(IPlatform);
      const results = invokeAttribute(
        /* platform         */platform,
        /* attr definition  */def,
        /* parentController */renderingCtrl,
        /* host             */target as HTMLElement,
        /* instruction      */_instruction,
        /* viewFactory      */void 0,
        /* location         */void 0,
      );
      const childController = Controller.$attr(
        /* context ct */results.ctn,
        /* viewModel  */results.vm,
        /* host       */target as HTMLElement,
        /* definition */def,
      );

      setRef(target as HTMLElement, def.key, childController);

      const props = _instruction.props;
      const ii = props.length;
      let i = 0;
      while (ii > i) {
        render(renderingCtrl, childController, props[i] as RenderingInstruction);
        ++i;
      }

      renderingCtrl.addChild(childController);
      /* eslint-enable prefer-const */
      break;
    }
    case InstructionType.hydrateTemplateController: {
      /* eslint-disable prefer-const */
      let ctxContainer = renderingCtrl.container;
      let def: CustomAttributeDefinition | null;
      switch (typeof _instruction.res) {
        case 'string':
          def = ctxContainer.find(CustomAttribute, _instruction.res);
          if (def == null) {
            if (__DEV__)
              throw new Error(`AUR0754: Attribute ${_instruction.res} is not registered in ${(renderingCtrl as Controller)['name']}.`);
            else
              throw new Error(`AUR0754:${_instruction.res}@${(renderingCtrl as Controller)['name']}`);
          }
          break;
        // constructor based instruction
        // will be enabled later if needed.
        // As both AOT + runtime based can use definition for perf
        // -----------------
        // case 'function':
        //   def = CustomAttribute.getDefinition(instruction.res);
        //   break;
        default:
          def = _instruction.res;
      }
      const rendering = ctxContainer.get(IRendering);
      const platform = ctxContainer.get(IPlatform);
      const viewFactory = rendering.getViewFactory(_instruction.def, ctxContainer);
      const renderLocation = convertToRenderLocation(target as HTMLElement);
      const results = invokeAttribute(
        /* platform         */platform,
        /* attr definition  */def,
        /* parentController */renderingCtrl,
        /* host             */target as HTMLElement,
        /* instruction      */_instruction,
        /* viewFactory      */viewFactory,
        /* location         */renderLocation,
      );
      const childController = Controller.$attr(
        /* container ct */results.ctn,
        /* viewModel    */results.vm,
        /* host         */target as HTMLElement,
        /* definition   */def,
      );

      setRef(renderLocation, def.key, childController);

      results.vm.link?.(renderingCtrl, childController, target as HTMLElement, _instruction);

      const props = _instruction.props;
      const ii = props.length;
      let i = 0;
      while (ii > i) {
        render(renderingCtrl, childController, props[i] as RenderingInstruction);
        ++i;
      }

      renderingCtrl.addChild(childController);
      /* eslint-enable prefer-const */
      break;
    }
    case InstructionType.hydrateLetElement: {
      (target as HTMLElement).remove();
      const childInstructions = _instruction.instructions;
      const toBindingContext = _instruction.toBindingContext;
      const container = renderingCtrl.container;
      const ii = childInstructions.length;

      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      let childInstruction: LetBindingInstruction;
      let expr: AnyBindingExpression;
      let binding: LetBinding;
      let i = 0;
      while (ii > i) {
        childInstruction = childInstructions[i];
        expr = ensureExpression(exprParser, childInstruction.from, ExpressionType.IsProperty);
        binding = new LetBinding(expr, childInstruction.to, observerLocator, container, toBindingContext);
        renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
          ? applyBindingBehavior(binding, expr, container)
          : binding
        );
        ++i;
      }
      break;
    }
    case InstructionType.setProperty: {
      const obj = getTarget(target) as IObservable;
      if (obj.$observers !== void 0 && obj.$observers[_instruction.to] !== void 0) {
        obj.$observers[_instruction.to].setValue(_instruction.value, LifecycleFlags.fromBind);
      } else {
        obj[_instruction.to] = _instruction.value;
      }
      break;
    }
    case InstructionType.interpolation: {
      const container = renderingCtrl.container;

      const platform = container.get(IPlatform);
      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.Interpolation);
      const binding = new InterpolationBinding(
        observerLocator,
        expr,
        getTarget(target),
        _instruction.to,
        BindingMode.toView,
        container,
        platform.domWriteQueue,
      );
      const partBindings = binding.partBindings;
      const ii = partBindings.length;
      let i = 0;
      let partBinding: InterpolationPartBinding;
      for (; ii > i; ++i) {
        partBinding = partBindings[i];
        if (partBinding.sourceExpression.$kind === ExpressionKind.BindingBehavior) {
          partBindings[i] = applyBindingBehavior(
            partBinding,
            partBinding.sourceExpression as unknown as IsBindingBehavior,
            container
          );
        }
      }
      renderingCtrl.addBinding(binding);
      break;
    }
    case InstructionType.propertyBinding: {
      const container = renderingCtrl.container;

      const platform = container.get(IPlatform);
      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsProperty);
      const binding = new PropertyBinding(expr, getTarget(target), _instruction.to, _instruction.mode, observerLocator, renderingCtrl.container, platform.domWriteQueue);
      renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr, renderingCtrl.container)
        : binding
      );
      break;
    }
    case InstructionType.callBinding: {
      const container = renderingCtrl.container;

      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsProperty | ExpressionType.IsFunction);
      const binding = new CallBinding(expr, getTarget(target), _instruction.to, observerLocator, renderingCtrl.container);
      renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr, renderingCtrl.container)
        : binding
      );
      break;
    }
    case InstructionType.letBinding: {
      break;
    }
    case InstructionType.refBinding: {
      const container = renderingCtrl.container;

      const exprParser = container.get(IExpressionParser);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsProperty);
      const binding = new RefBinding(expr, getRefTarget(target as HTMLElement, _instruction.to), renderingCtrl.container);
      renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr, renderingCtrl.container)
        : binding
      );
      break;
    }
    case InstructionType.iteratorBinding: {
      const container = renderingCtrl.container;

      const platform = container.get(IPlatform);
      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsIterator);
      const binding = new PropertyBinding(expr, getTarget(target), _instruction.to, BindingMode.toView, observerLocator, renderingCtrl.container, platform.domWriteQueue);
      renderingCtrl.addBinding(expr.iterable.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr.iterable, renderingCtrl.container)
        : binding);
      break;
    }
    case InstructionType.textBinding: {
      const container = renderingCtrl.container;

      const platform = container.get(IPlatform);
      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const next = (target as HTMLElement).nextSibling!;
      const parent = (target as HTMLElement).parentNode!;
      const doc = platform.document;
      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.Interpolation);
      const staticParts = expr.parts;
      const dynamicParts = expr.expressions;

      const ii = dynamicParts.length;
      let i = 0;
      let text = staticParts[0];
      let binding: ContentBinding;
      let part: IsBindingBehavior;
      if (text !== '') {
        parent.insertBefore(doc.createTextNode(text), next);
      }
      for (; ii > i; ++i) {
        part = dynamicParts[i];
        binding = new ContentBinding(
          part,
          // using a text node instead of comment, as a mean to:
          // support seamless transition between a html node, or a text
          // reduce the noise in the template, caused by html comment
          parent.insertBefore(doc.createTextNode(''), next),
          container,
          observerLocator,
          platform,
          _instruction.strict
        );
        renderingCtrl.addBinding(part.$kind === ExpressionKind.BindingBehavior
          // each of the dynamic expression of an interpolation
          // will be mapped to a ContentBinding
          ? applyBindingBehavior(binding, part, container)
          : binding
        );
        // while each of the static part of an interpolation
        // will just be a text node
        text = staticParts[i + 1];
        if (text !== '') {
          parent.insertBefore(doc.createTextNode(text), next);
        }
      }
      if ((target as HTMLElement).nodeName === 'AU-M') {
        (target as HTMLElement).remove();
      }
      break;
    }
    case InstructionType.listenerBinding: {
      const container = renderingCtrl.container;

      const platform = container.get(IPlatform);
      const exprParser = container.get(IExpressionParser);
      const eventDelegator = container.get(IEventDelegator);
      const listenerBehaviorOptions = container.get(IListenerBehaviorOptions);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsFunction);
      const binding = new Listener(
        platform,
        _instruction.to,
        expr,
        target as HTMLElement,
        eventDelegator,
        renderingCtrl.container,
        new ListenerOptions(_instruction.preventDefault, _instruction.strategy, listenerBehaviorOptions.expAsHandler),
      );
      renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr, renderingCtrl.container)
        : binding
      );
      break;
    }
    case InstructionType.attributeBinding: {
      const container = renderingCtrl.container;

      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsProperty);
      const binding = new AttributeBinding(
        expr,
        target as HTMLElement,
        _instruction.attr/* targetAttribute */,
        _instruction.to/* targetKey */,
        BindingMode.toView,
        observerLocator,
        renderingCtrl.container
      );
      renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr, renderingCtrl.container)
        : binding
      );
      break;
    }
    case InstructionType.stylePropertyBinding: {
      const container = renderingCtrl.container;

      const platform = container.get(IPlatform);
      const exprParser = container.get(IExpressionParser);
      const observerLocator = container.get(IObserverLocator);

      const expr = ensureExpression(exprParser, _instruction.from, ExpressionType.IsProperty);
      const binding = new PropertyBinding(expr, (target as HTMLElement).style, _instruction.to, BindingMode.toView, observerLocator, renderingCtrl.container, platform.domWriteQueue);
      renderingCtrl.addBinding(expr.$kind === ExpressionKind.BindingBehavior
        ? applyBindingBehavior(binding, expr, renderingCtrl.container)
        : binding
      );
      break;
    }
    case InstructionType.setAttribute: {
      (target as HTMLElement).setAttribute(_instruction.to, _instruction.value);
      break;
    }
    case InstructionType.setClassAttribute:
    addClasses((target as HTMLElement).classList, _instruction.value);{
      break;
    }
    case InstructionType.setStyleAttribute: {
      (target as HTMLElement).style.cssText += _instruction.value;
      break;
    }
    case InstructionType.spreadBinding: {
      const container = renderingCtrl.container;
      const hydrationContext = container.get(IHydrationContext);
      const compiler = container.get(ITemplateCompiler);
      const getHydrationContext = (ancestor: number) => {
        let currentLevel = ancestor;
        let currentContext: IHydrationContext | undefined = hydrationContext;
        while (currentContext != null && currentLevel > 0) {
          currentContext = currentContext.parent;
          --currentLevel;
        }
        if (currentContext == null) {
          throw new Error('No scope context for spread binding.');
        }
        return currentContext as IHydrationContext<object>;
      };
      const renderSpreadInstruction = (ancestor: number) => {
        const context = getHydrationContext(ancestor);
        const spreadBinding = createSurrogateBinding(context);
        const instructions = compiler.compileSpread(
          context.controller.definition,
          context.instruction?.captures ?? emptyArray,
          context.controller.container,
          target as HTMLElement,
        );
        let inst: IInstruction;
        for (inst of instructions) {
          switch (inst.type) {
            case InstructionType.spreadBinding:
              renderSpreadInstruction(ancestor + 1);
              break;
            case InstructionType.spreadElementProp:
              render(
                spreadBinding,
                findElementControllerFor(target as HTMLElement),
                (inst as SpreadElementPropBindingInstruction).instructions as RenderingInstruction,
              );
              break;
            default:
              render(spreadBinding, target, inst as RenderingInstruction);
          }
        }
        renderingCtrl.addBinding(spreadBinding);
      };
      renderSpreadInstruction(0);
      break;
    }
    case InstructionType.spreadElementProp: {
      break;
    }
    default:
      _instruction.render(renderingCtrl, target);
  }
}
