import { nextId } from '@aurelia/kernel';
import { LifecycleFlags, Scope } from '@aurelia/runtime';
import { IRenderLocation } from '../../dom.js';
import { IViewFactory } from '../../templating/view.js';
import { templateController } from '../custom-attribute.js';
import { bindable } from '../../bindable.js';
import type { ISyntheticView, ICustomAttributeController, ICustomAttributeViewModel, IHydratedController, IHydratedParentController, ControllerVisitor } from '../../templating/controller.js';

export class With implements ICustomAttributeViewModel {
  public static inject = [IViewFactory, IRenderLocation];
  public readonly id: number = nextId('au$component');

  public view!: ISyntheticView;

  public readonly $controller!: ICustomAttributeController<this>; // This is set by the controller after this instance is constructed

  @bindable public value?: object;

  private _viewScope: Scope | null = null;

  public constructor(
    private readonly factory: IViewFactory,
    private readonly location: IRenderLocation
  ) {
    this.id = nextId('au$component');
  }

  public binding(): void {
    this._viewScope = Scope.fromParent(this.$controller.scope, this.value === void 0 ? {} : this.value);
    this.view = this.factory.create(this._viewScope).setLocation(this.location);
  }

  public valueChanged(
    newValue: unknown,
    oldValue: unknown,
    flags: LifecycleFlags,
  ): void {
    const $controller = this.$controller;
    const bindings = this.view.bindings;
    let scope: Scope;
    let i = 0, ii = 0;
    if ($controller.isActive && bindings != null) {
      scope = this._viewScope = Scope.fromParent($controller.scope, newValue === void 0 ? {} : newValue as object);
      for (ii = bindings.length; ii > i; ++i) {
        bindings[i].$bind(LifecycleFlags.fromBind, scope);
      }
    }
  }

  public attaching(
    initiator: IHydratedController,
    parent: IHydratedParentController,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    const { $controller } = this;
    return this.view.activate(initiator, $controller, flags, this._viewScope!);
  }

  public detaching(
    initiator: IHydratedController,
    parent: IHydratedParentController,
    flags: LifecycleFlags,
  ): void | Promise<void> {
    return this.view.deactivate(initiator, this.$controller, flags);
  }

  public dispose(): void {
    this.view.dispose();
    this.view = (void 0)!;
  }

  public accept(visitor: ControllerVisitor): void | true {
    if (this.view?.accept(visitor) === true) {
      return true;
    }
  }
}

templateController('with')(With);
