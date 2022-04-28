import { Constructable, LogLevel, IContainer, Resolved, IPlatform } from '@aurelia/kernel';
import { Aurelia } from '@aurelia/runtime-html';
import { IRouterOptions, IRouter } from '@aurelia/router-lite';
import { TestContext } from '@aurelia/testing';
import { IHIAConfig, IHookInvocationAggregator } from './hook-invocation-tracker.js';
export declare const IActivityTracker: import("@aurelia/kernel").InterfaceSymbol<IActivityTracker>;
export interface IActivityTracker extends ActivityTracker {
}
export declare class ActivityTracker {
    readonly activeVMs: string[];
    setActive(vm: string): void;
    setNonActive(vm: string): void;
}
export declare function createFixture<T extends Constructable>(Component: T, deps: Constructable[], createHIAConfig: () => IHIAConfig, createRouterOptions?: () => IRouterOptions, level?: LogLevel): Promise<{
    ctx: TestContext;
    container: IContainer;
    au: Aurelia;
    host: HTMLElement;
    hia: IHookInvocationAggregator;
    component: Resolved<T>;
    platform: IPlatform;
    router: IRouter;
    activityTracker: IActivityTracker;
    startTracing(): void;
    stopTracing(): void;
    tearDown(): Promise<void>;
}>;
//# sourceMappingURL=create-fixture.d.ts.map