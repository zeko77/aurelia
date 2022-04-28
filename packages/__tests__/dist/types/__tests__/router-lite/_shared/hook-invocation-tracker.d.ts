import { IPlatform } from '@aurelia/runtime-html';
export declare type HookName = ('binding' | 'bound' | 'attaching' | 'attached' | 'detaching' | 'unbinding' | 'dispose' | 'canLoad' | 'load' | 'canUnload' | 'unload');
export declare type MaybeHookName = HookName | '';
export declare class HookInvocationTracker {
    readonly aggregator: HookInvocationAggregator;
    readonly methodName: HookName;
    get promise(): Promise<void>;
    _promise: Promise<void>;
    timeout: number;
    $resolve: () => void;
    readonly platform: IPlatform;
    readonly notifyHistory: string[];
    constructor(aggregator: HookInvocationAggregator, methodName: HookName);
    notify(componentName: string): void;
    resolve(): void;
    private setTimeout;
    private clearTimeout;
    dispose(): void;
}
export declare const IHIAConfig: import("@aurelia/kernel").InterfaceSymbol<IHIAConfig>;
export interface IHIAConfig extends HIAConfig {
}
export declare class HIAConfig {
    readonly resolveLabels: string[];
    readonly resolveTimeoutMs: number;
    constructor(resolveLabels: string[], resolveTimeoutMs: number);
}
export declare const IHookInvocationAggregator: import("@aurelia/kernel").InterfaceSymbol<IHookInvocationAggregator>;
export interface IHookInvocationAggregator extends HookInvocationAggregator {
}
export declare class HookInvocationAggregator {
    readonly platform: IPlatform;
    readonly config: IHIAConfig;
    readonly notifyHistory: string[];
    phase: string;
    constructor(platform: IPlatform, config: IHIAConfig);
    readonly binding: HookInvocationTracker;
    readonly bound: HookInvocationTracker;
    readonly attaching: HookInvocationTracker;
    readonly attached: HookInvocationTracker;
    readonly detaching: HookInvocationTracker;
    readonly unbinding: HookInvocationTracker;
    readonly $$dispose: HookInvocationTracker;
    readonly canLoad: HookInvocationTracker;
    readonly load: HookInvocationTracker;
    readonly canUnload: HookInvocationTracker;
    readonly unload: HookInvocationTracker;
    notify(componentName: string, tracker: HookInvocationTracker): void;
    setPhase(label: string): void;
    dispose(): void;
}
//# sourceMappingURL=hook-invocation-tracker.d.ts.map