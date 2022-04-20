/**
 *
 * NOTE: This file is still WIP and will go through at least one more iteration of refactoring, commenting and clean up!
 * In its current state, it is NOT a good source for learning about the inner workings and design of the router.
 *
 */
import { ComponentAppellation, IComponentAndOrViewportOrNothing, RouteableComponentType } from './interfaces.js';
import { RoutingInstruction } from './instructions/routing-instruction.js';
import { Navigation } from './navigation.js';
import { Viewport } from './endpoints/viewport.js';
import { InstructionComponent } from './instructions/instruction-component.js';
import { InstructionEndpoint } from './instructions/instruction-endpoint.js';

/**
 * Public API
 */
export type RoutingHookType = 'beforeNavigation' | 'transformFromUrl' | 'transformToUrl' | 'transformTitle';
/**
 * Public API
 */
export type BeforeNavigationHookFunction = (routingInstructions: RoutingInstruction[], navigationInstruction: Navigation) => Promise<boolean | RoutingInstruction[]>;
/**
 * Public API
 */
export type TransformFromUrlHookFunction = (url: string, navigationInstruction: Navigation) => Promise<string | RoutingInstruction[]>;
/**
 * Public API
 */
export type TransformToUrlHookFunction = (state: string | RoutingInstruction[], navigationInstruction: Navigation) => Promise<string | RoutingInstruction[]>;
/**
 * Public API
 */
export type TransformTitleHookFunction = (title: string | RoutingInstruction[], navigationInstruction: Navigation) => Promise<string | RoutingInstruction[]>;

/**
 * @internal
 */
export type RoutingHookFunction = BeforeNavigationHookFunction | TransformFromUrlHookFunction | TransformToUrlHookFunction | TransformTitleHookFunction;
/**
 * @internal
 */
export type RoutingHookParameter = string | RoutingInstruction[];
/**
 * @internal
 */
export type RoutingHookResult = boolean | string | RoutingInstruction[];

export type RoutingHookTarget = ComponentAppellation | IComponentAndOrViewportOrNothing;

/**
 * Public API
 */
export type RoutingHookIdentity = number;

/**
 * Public API
 */
export interface IRoutingHookOptions {
  /**
   * What event/when to hook. Defaults to BeforeNavigation
   */
  type?: RoutingHookType;
  /**
   * What to hook. If omitted, everything is included
   */
  include?: RoutingHookTarget[];
  /**
   * What not to hook. If omitted, nothing is excluded
   */
  exclude?: RoutingHookTarget[];
}

/**
 * Public API
 */
export interface IRoutingHookDefinition {
  hook: RoutingHookFunction;
  options: IRoutingHookOptions;
}

/**
 * @internal - Shouldn't be used directly
 */
export class RoutingHook {
  public static hooks: Map<RoutingHookType, RoutingHook[]> = new Map([
    ['beforeNavigation', []],
    ['transformFromUrl', []],
    ['transformToUrl', []],
    ['transformTitle', []],
  ]
  );

  private static lastIdentity: number = 0;

  public type: RoutingHookType = 'beforeNavigation';
  public includeTargets: Target[] = [];
  public excludeTargets: Target[] = [];

  public constructor(
    public hook: RoutingHookFunction,
    options: IRoutingHookOptions,
    public id: RoutingHookIdentity
  ) {
    if (options.type !== void 0) {
      this.type = options.type;
    }

    for (const target of options.include ?? []) {
      this.includeTargets.push(new Target(target));
    }
    for (const target of options.exclude ?? []) {
      this.excludeTargets.push(new Target(target));
    }
  }

  public static add(beforeNavigationHookFunction: BeforeNavigationHookFunction, options?: IRoutingHookOptions): RoutingHookIdentity;
  public static add(transformFromUrlHookFunction: TransformFromUrlHookFunction, options?: IRoutingHookOptions): RoutingHookIdentity;
  public static add(transformToUrlHookFunction: TransformToUrlHookFunction, options?: IRoutingHookOptions): RoutingHookIdentity;
  public static add(transformTitleHookFunction: TransformTitleHookFunction, options?: IRoutingHookOptions): RoutingHookIdentity;
  public static add(hookFunction: RoutingHookFunction, options?: IRoutingHookOptions): RoutingHookIdentity;
  public static add(hookFunction: RoutingHookFunction, options?: IRoutingHookOptions): RoutingHookIdentity {
    const hook = new RoutingHook(hookFunction, options ?? {}, ++this.lastIdentity);
    this.hooks.get(hook.type)?.push(hook);
    return this.lastIdentity;
  }

  public static remove(id: RoutingHookIdentity): void {
    for (const [key, hook] of this.hooks) {
      const index = hook.findIndex(h => h.id === id);
      if (index > -1) {
        hook.splice(index, 1);
        return;
      }
    }
  }

  public static removeAll(): void {
    this.hooks.forEach(hook => hook = [])
  }

  public static async invokeBeforeNavigation(routingInstructions: RoutingInstruction[], navigationInstruction: Navigation): Promise<boolean | RoutingInstruction[]> {
    return this.invoke('beforeNavigation', navigationInstruction, routingInstructions) as Promise<boolean | RoutingInstruction[]>;
  }
  public static async invokeTransformFromUrl(url: string, navigationInstruction: Navigation): Promise<string | RoutingInstruction[]> {
    return this.invoke('transformFromUrl', navigationInstruction, url) as Promise<string | RoutingInstruction[]>;
  }
  public static async invokeTransformToUrl(state: string | RoutingInstruction[], navigationInstruction: Navigation): Promise<string | RoutingInstruction[]> {
    return this.invoke('transformToUrl', navigationInstruction, state) as Promise<string | RoutingInstruction[]>;
  }
  public static async invokeTransformTitle(title: string | RoutingInstruction[], navigationInstruction: Navigation): Promise<string | RoutingInstruction[]> {
    return this.invoke('transformTitle', navigationInstruction, title) as Promise<string | RoutingInstruction[]>;
  }

  public static async invoke(type: RoutingHookType, navigationInstruction: Navigation, arg: RoutingHookParameter): Promise<RoutingHookResult> {
    let outcome: RoutingHookResult = arg;

    this.hooks.get(type)?.filter(hook => !hook.wantsMatch || hook.matches(arg)).every(async hook => {
      outcome = await hook.invoke(navigationInstruction, arg);
      if (typeof outcome === 'boolean') return outcome;
      arg = outcome;
    });
    return outcome;
  }

  public get wantsMatch(): boolean {
    return this.includeTargets.length > 0 || this.excludeTargets.length > 0;
  }

  public matches(routingInstructions: RoutingHookParameter): boolean {

    if (this.includeTargets.length && !this.includeTargets.some(target => target.matches(routingInstructions as RoutingInstruction[]))) {
      return false;
    }
    if (this.excludeTargets.length && this.excludeTargets.some(target => target.matches(routingInstructions as RoutingInstruction[]))) {
      return false;
    }
    return true;
  }

  public invoke(navigationInstruction: Navigation, arg: RoutingHookParameter): Promise<RoutingHookResult> {
    // TODO: Fix the type here
    return this.hook(arg as any, navigationInstruction);
  }
}

class Target {
  public componentType: RouteableComponentType | null = null;
  public componentName: string | null = null;
  public viewport: Viewport | null = null;
  public viewportName: string | null = null;

  public constructor(target: RoutingHookTarget) {
    if (typeof target === 'string') { this.componentName = target; return; }
    if (InstructionComponent.isType(target as RouteableComponentType)) {
      this.componentType = target as RouteableComponentType;
      this.componentName = InstructionComponent.getName(target as RouteableComponentType);
      return;
    }
    const component = (target as IComponentAndOrViewportOrNothing).component;
    if (component) {
      this.componentType = InstructionComponent.isType(component)
        ? InstructionComponent.getType(component)
        : null;
      this.componentName = InstructionComponent.getName(component);
    }
    const viewport = (target as IComponentAndOrViewportOrNothing).viewport;
    if (viewport) {
      this.viewport = InstructionEndpoint.isInstance(viewport) ? viewport : null;
      this.viewportName = InstructionEndpoint.getName(viewport);
    }
  }

  public matches(routingInstructions: RoutingInstruction[]): boolean {
    const instructions = routingInstructions.slice();
    !instructions.length && instructions.push(RoutingInstruction.create('') as RoutingInstruction);

    return instructions.some(instruction =>
      this.componentName && this.componentName === instruction.component.name ||
      this.componentType && this.componentType === instruction.component.type ||
      this.viewportName && this.viewportName === instruction.endpoint.name ||
      this.viewport && this.viewport === instruction.endpoint.instance);
  }
}
