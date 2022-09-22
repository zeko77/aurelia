import { Constructable } from '@aurelia/kernel';
import { RenderPlan } from '../../create-element';
import { HydrateElementInstruction } from '../../renderer';
import { IPlatform } from '../../platform';
import { IViewFactory } from '../../templating/view';
import { CustomElementDefinition } from '../custom-element';
import { LifecycleFlags, ControllerVisitor, ICustomElementController, ICustomElementViewModel, IHydratedController, IHydratedParentController, IHydrationContext, ISyntheticView } from '../../templating/controller';
import { IRendering } from '../../templating/rendering';
export declare type Subject = string | IViewFactory | ISyntheticView | RenderPlan | Constructable | CustomElementDefinition;
export declare type MaybeSubjectPromise = Subject | Promise<Subject> | undefined;
export declare class AuRender implements ICustomElementViewModel {
    component?: MaybeSubjectPromise;
    composing: boolean;
    view?: ISyntheticView;
    readonly $controller: ICustomElementController<this>;
    constructor(
    /** @internal */ _platform: IPlatform, 
    /** @internal */ _instruction: HydrateElementInstruction, 
    /** @internal */ _hdrContext: IHydrationContext, 
    /** @internal */ _rendering: IRendering);
    attaching(initiator: IHydratedController, parent: IHydratedParentController | null, flags: LifecycleFlags): void | Promise<void>;
    detaching(initiator: IHydratedController, parent: IHydratedParentController | null, flags: LifecycleFlags): void | Promise<void>;
    componentChanged(newValue: Subject | Promise<Subject>, previousValue: Subject | Promise<Subject>, flags: LifecycleFlags): void;
    private compose;
    dispose(): void;
    accept(visitor: ControllerVisitor): void | true;
}
//# sourceMappingURL=au-render.d.ts.map