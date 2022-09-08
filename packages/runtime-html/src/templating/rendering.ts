import { DI, IContainer } from '@aurelia/kernel';

import { FragmentNodeSequence, INode, INodeSequence } from '../dom';
import { IPlatform } from '../platform';
import { ICompliationInstruction, IInstruction, ITemplateCompiler, render } from '../renderer';
import { CustomElementDefinition, PartialCustomElementDefinition } from '../resources/custom-element';
import { isString } from '../utilities';
import { IViewFactory, ViewFactory } from './view';
import type { IHydratableController } from './controller';

export const IRendering = DI.createInterface<IRendering>('IRendering', x => x.singleton(Rendering));
export interface IRendering extends Rendering { }

export class Rendering {
  /** @internal */
  protected static inject: unknown[] = [IContainer];
  /** @internal */
  private readonly _p: IPlatform;
  /** @internal */
  private readonly _compilationCache: WeakMap<PartialCustomElementDefinition, CustomElementDefinition> = new WeakMap();
  /** @internal */
  private readonly _fragmentCache: WeakMap<CustomElementDefinition, DocumentFragment | null> = new WeakMap();
  /** @internal */
  private readonly _empty: INodeSequence;

  public constructor(container: IContainer) {
    this._p = container.root.get(IPlatform);
    this._empty = new FragmentNodeSequence(this._p, this._p.document.createDocumentFragment());
  }

  public compile(
    definition: PartialCustomElementDefinition,
    container: IContainer,
    compilationInstruction: ICompliationInstruction | null,
  ): CustomElementDefinition {
    if (definition.needsCompile !== false) {
      const compiledMap = this._compilationCache;
      const compiler = container.get(ITemplateCompiler);
      let compiled = compiledMap.get(definition);
      if (compiled == null) {
        compiledMap.set(definition, compiled = compiler.compile(definition, container, compilationInstruction));
      } else {
        // todo:
        // should only register if the compiled def resolution is string
        // instead of direct resources
        container.register(...compiled.dependencies);
      }
      return compiled;
    }

    return definition as CustomElementDefinition;
  }

  public getViewFactory(definition: PartialCustomElementDefinition, container: IContainer): IViewFactory {
    return new ViewFactory(container, CustomElementDefinition.getOrCreate(definition));
  }

  public createNodes(definition: CustomElementDefinition): INodeSequence {
    if (definition.enhance === true) {
      return new FragmentNodeSequence(this._p, definition.template as DocumentFragment);
    }
    let fragment: DocumentFragment | null | undefined;
    const cache = this._fragmentCache;
    if (cache.has(definition)) {
      fragment = cache.get(definition);
    } else {
      const p = this._p;
      const doc = p.document;
      const template = definition.template;
      let tpl: HTMLTemplateElement;
      if (template === null) {
        fragment = null;
      } else if (template instanceof p.Node) {
        if (template.nodeName === 'TEMPLATE') {
          fragment = doc.adoptNode((template as HTMLTemplateElement).content);
        } else {
          (fragment = doc.adoptNode(doc.createDocumentFragment())).appendChild(template.cloneNode(true));
        }
      } else {
        tpl = doc.createElement('template');
        if (isString(template)) {
          tpl.innerHTML = template;
        }
        doc.adoptNode(fragment = tpl.content);
      }
      cache.set(definition, fragment);
    }
    return fragment == null
      ? this._empty
      : new FragmentNodeSequence(this._p, fragment.cloneNode(true) as DocumentFragment);
  }

  public render(
    controller: IHydratableController,
    targets: ArrayLike<INode>,
    definition: CustomElementDefinition,
    host: INode | null | undefined,
  ): void {
    const rows = definition.instructions;
    const ii = targets.length;
    if (targets.length !== rows.length) {
      if (__DEV__)
        throw new Error(`AUR0757: The compiled template is not aligned with the render instructions. There are ${ii} targets and ${rows.length} instructions.`);
      else
        throw new Error(`AUR0757:${ii}<>${rows.length}`);
    }

    let i = 0;
    let j = 0;
    let jj = 0;
    let row: readonly IInstruction[];
    let instruction: IInstruction;
    let target: INode;

    if (ii > 0) {
      while (ii > i) {
        row = rows[i];
        target = targets[i];
        j = 0;
        jj = row.length;
        while (jj > j) {
          instruction = row[j];
          render(controller, target, instruction);
          ++j;
        }
        ++i;
      }
    }

    if (host !== void 0 && host !== null) {
      row = definition.surrogates;
      if ((jj = row.length) > 0) {
        j = 0;
        while (jj > j) {
          instruction = row[j];
          render(controller, host, instruction);
          ++j;
        }
      }
    }
  }
}
