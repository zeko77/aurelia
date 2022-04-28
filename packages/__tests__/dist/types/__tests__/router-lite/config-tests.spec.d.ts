import { ICustomElementController } from '@aurelia/runtime-html';
import { ResolutionMode } from '@aurelia/router-lite';
import { HookName } from './_shared/hook-invocation-tracker.js';
import { HookSpecs } from './_shared/view-models.js';
import { IActivityTracker } from './_shared/create-fixture.js';
export declare function prepend(prefix: string, component: string, ...calls: (HookName | '')[]): Generator<string, void>;
export declare function prependDeferrable(prefix: string, component: string, resolution: ResolutionMode, ...calls: (HookName | '')[]): Generator<string, void>;
export declare function interleave(...generators: Generator<string, void>[]): Generator<string, void>;
export interface IRouterOptionsSpec {
    resolution: ResolutionMode;
    toString(): string;
}
export interface IComponentSpec {
    kind: 'all-sync' | 'all-async';
    hookSpecs: HookSpecs;
}
export declare abstract class SimpleActivityTrackingVMBase {
    readonly tracker: IActivityTracker;
    readonly $controller: ICustomElementController;
    constructor(tracker: IActivityTracker);
    attached(): void;
    setNonActive(): void;
}
//# sourceMappingURL=config-tests.spec.d.ts.map