import { Collection } from '@aurelia/runtime';
import { IViewFactory, HydrateTemplateController, IHydratedComponentController, ICustomAttributeViewModel, ISyntheticView, IRenderLocation, IPlatform } from '@aurelia/runtime-html';
import type { IScrollerInfo, IScrollerSubscriber, IVirtualRepeater } from "./interfaces";
import type { IServiceLocator } from "@aurelia/kernel";
export interface VirtualRepeat extends ICustomAttributeViewModel {
}
export declare class VirtualRepeat implements IScrollerSubscriber, IVirtualRepeater {
    readonly location: IRenderLocation;
    readonly instruction: HydrateTemplateController;
    readonly parent: IHydratedComponentController;
    local: string;
    items: Collection | null | undefined;
    private itemHeight;
    private minViewsRequired;
    private collectionStrategy?;
    private dom;
    private scrollerObserver;
    constructor(location: IRenderLocation, instruction: HydrateTemplateController, parent: IHydratedComponentController, 
    /** @internal */ _factory: IViewFactory, 
    /** @internal */ _container: IServiceLocator, platform: IPlatform);
    handleScrollerChange(scrollerInfo: IScrollerInfo): void;
    getDistances(): [top: number, bottom: number];
    getViews(): readonly ISyntheticView[];
}
export declare const enum SizingSignals {
    none = 0,
    reset = 1,
    has_sizing = 2
}
//# sourceMappingURL=virtual-repeat.d.ts.map