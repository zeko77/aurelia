import { IRenderLocation } from '../../dom';
import { IViewFactory } from '../../templating/view';
import type { LifecycleFlags, ISyntheticView, ICustomAttributeController, ICustomAttributeViewModel, IHydratedController, IHydratedParentController, ControllerVisitor, IHydratableController } from '../../templating/controller';
import type { IInstruction } from '../../renderer';
import type { INode } from '../../dom';
export declare class If implements ICustomAttributeViewModel {
    elseFactory?: IViewFactory;
    elseView?: ISyntheticView;
    ifView?: ISyntheticView;
    view?: ISyntheticView;
    readonly $controller: ICustomAttributeController<this>;
    value: unknown;
    /**
     * `false` to always dispose the existing `view` whenever the value of if changes to false
     */
    cache: boolean;
    private pending;
    constructor(ifFactory: IViewFactory, location: IRenderLocation);
    attaching(initiator: IHydratedController, parent: IHydratedController, f: LifecycleFlags): void | Promise<void>;
    detaching(initiator: IHydratedController, parent: IHydratedParentController, flags: LifecycleFlags): void | Promise<void>;
    valueChanged(newValue: unknown, oldValue: unknown, f: LifecycleFlags): void | Promise<void>;
    dispose(): void;
    accept(visitor: ControllerVisitor): void | true;
}
export declare class Else implements ICustomAttributeViewModel {
    constructor(factory: IViewFactory);
    link(controller: IHydratableController, _childController: ICustomAttributeController, _target: INode, _instruction: IInstruction): void;
}
//# sourceMappingURL=if.d.ts.map