import { type Collection, ForOfStatement, type IndexMap } from '@aurelia/runtime';
import { IRenderLocation } from '../../dom';
import { IViewFactory } from '../../templating/view';
import type { LifecycleFlags, ISyntheticView, ICustomAttributeController, IHydratableController, ICustomAttributeViewModel, IHydratedController, IHydratedParentController, ControllerVisitor } from '../../templating/controller';
declare type Items<C extends Collection = unknown[]> = C | undefined;
export declare class Repeat<C extends Collection = unknown[]> implements ICustomAttributeViewModel {
    views: ISyntheticView[];
    key?: string;
    forOf: ForOfStatement;
    local: string;
    readonly $controller: ICustomAttributeController<this>;
    items: Items<C>;
    constructor(location: IRenderLocation, parent: IHydratableController, factory: IViewFactory);
    binding(_initiator: IHydratedController, _parent: IHydratedParentController, _flags: LifecycleFlags): void | Promise<void>;
    attaching(initiator: IHydratedController, _parent: IHydratedParentController, _flags: LifecycleFlags): void | Promise<void>;
    detaching(initiator: IHydratedController, _parent: IHydratedParentController, _flags: LifecycleFlags): void | Promise<void>;
    itemsChanged(): void;
    handleCollectionChange(collection: Collection, indexMap: IndexMap | undefined): void;
    dispose(): void;
    accept(visitor: ControllerVisitor): void | true;
}
export {};
//# sourceMappingURL=repeat.d.ts.map