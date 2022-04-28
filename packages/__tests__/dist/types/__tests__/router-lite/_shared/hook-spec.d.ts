import { HookName } from './hook-invocation-tracker.js';
import { ITestRouteViewModel } from './view-models.js';
export interface IHookSpec<T extends HookName> {
    name: T;
    type: string;
    ticks: number;
    invoke(vm: ITestRouteViewModel, getValue: () => ReturnType<ITestRouteViewModel[T]>): ReturnType<ITestRouteViewModel[T]>;
}
export declare const hookSpecsMap: {
    binding: {
        sync: IHookSpec<"binding">;
        async(count: number): IHookSpec<"binding">;
    };
    bound: {
        sync: IHookSpec<"bound">;
        async(count: number): IHookSpec<"bound">;
    };
    attaching: {
        sync: IHookSpec<"attaching">;
        async(count: number): IHookSpec<"attaching">;
    };
    attached: {
        sync: IHookSpec<"attached">;
        async(count: number): IHookSpec<"attached">;
    };
    detaching: {
        sync: IHookSpec<"detaching">;
        async(count: number): IHookSpec<"detaching">;
    };
    unbinding: {
        sync: IHookSpec<"unbinding">;
        async(count: number): IHookSpec<"unbinding">;
    };
    dispose: IHookSpec<"dispose">;
    canLoad: {
        sync: IHookSpec<"canLoad">;
        async(count: number): IHookSpec<"canLoad">;
    };
    load: {
        sync: IHookSpec<"load">;
        async(count: number): IHookSpec<"load">;
    };
    canUnload: {
        sync: IHookSpec<"canUnload">;
        async(count: number): IHookSpec<"canUnload">;
    };
    unload: {
        sync: IHookSpec<"unload">;
        async(count: number): IHookSpec<"unload">;
    };
};
export declare function verifyInvocationsEqual(actual: string[], expected: string[]): void;
//# sourceMappingURL=hook-spec.d.ts.map