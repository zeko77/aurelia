import { Writable } from '@aurelia/kernel';
import { ICustomElementController, IPlatform, IViewModel, LifecycleFlags as LF, IHydratedController as HC, IHydratedParentController as HPC } from '@aurelia/runtime-html';
import { Parameters as P, Navigation, RoutingInstruction } from '@aurelia/router';
import { ResolutionMode, SwapStrategy } from './_shared/create-fixture.js';
declare const hookNames: readonly ["binding", "bound", "attaching", "attached", "detaching", "unbinding", "canLoad", "load", "canUnload", "unload"];
declare type HookName = typeof hookNames[number] | 'dispose';
declare class DelayedInvokerFactory<T extends HookName> {
    readonly name: T;
    readonly ticks: number;
    constructor(name: T, ticks: number);
    create(mgr: INotifierManager, p: IPlatform): DelayedInvoker<T>;
    toString(): string;
}
export declare class HookSpecs {
    readonly binding: DelayedInvokerFactory<'binding'>;
    readonly bound: DelayedInvokerFactory<'bound'>;
    readonly attaching: DelayedInvokerFactory<'attaching'>;
    readonly attached: DelayedInvokerFactory<'attached'>;
    readonly detaching: DelayedInvokerFactory<'detaching'>;
    readonly unbinding: DelayedInvokerFactory<'unbinding'>;
    readonly dispose: DelayedInvokerFactory<'dispose'>;
    readonly canLoad: DelayedInvokerFactory<'canLoad'>;
    readonly load: DelayedInvokerFactory<'load'>;
    readonly canUnload: DelayedInvokerFactory<'canUnload'>;
    readonly unload: DelayedInvokerFactory<'unload'>;
    readonly ticks: number;
    private constructor();
    static create(ticks: number, input?: Partial<HookSpecs>): HookSpecs;
    $dispose(): void;
    toString(exclude?: number): string;
}
declare abstract class TestVM implements IViewModel {
    readonly $controller: ICustomElementController<this>;
    get name(): string;
    readonly bindingDI: DelayedInvoker<'binding'>;
    readonly boundDI: DelayedInvoker<'bound'>;
    readonly attachingDI: DelayedInvoker<'attaching'>;
    readonly attachedDI: DelayedInvoker<'attached'>;
    readonly detachingDI: DelayedInvoker<'detaching'>;
    readonly unbindingDI: DelayedInvoker<'unbinding'>;
    readonly canLoadDI: DelayedInvoker<'canLoad'>;
    readonly loadDI: DelayedInvoker<'load'>;
    readonly canUnloadDI: DelayedInvoker<'canUnload'>;
    readonly unloadDI: DelayedInvoker<'unload'>;
    readonly disposeDI: DelayedInvoker<'dispose'>;
    constructor(mgr: INotifierManager, p: IPlatform, specs: HookSpecs);
    binding(i: HC, p: HPC, f: LF): void | Promise<void>;
    bound(i: HC, p: HPC, f: LF): void | Promise<void>;
    attaching(i: HC, p: HPC, f: LF): void | Promise<void>;
    attached(i: HC, f: LF): void | Promise<void>;
    detaching(i: HC, p: HPC, f: LF): void | Promise<void>;
    unbinding(i: HC, p: HPC, f: LF): void | Promise<void>;
    canLoad(p: P, n: Navigation, c: Navigation | null): boolean | RoutingInstruction | RoutingInstruction[] | Promise<boolean | RoutingInstruction | RoutingInstruction[]>;
    load(p: P, n: Navigation, c: Navigation | null): void | Promise<void>;
    canUnload(n: Navigation | null, c: Navigation): boolean | Promise<boolean>;
    unload(n: Navigation | null, c: Navigation): void | Promise<void>;
    dispose(): void;
    protected $binding(_i: HC, _p: HPC, _f: LF): void;
    protected $bound(_i: HC, _p: HPC, _f: LF): void;
    protected $attaching(_i: HC, _p: HPC, _f: LF): void;
    protected $attached(_i: HC, _f: LF): void;
    protected $detaching(_i: HC, _p: HPC, _f: LF): void;
    protected $unbinding(_i: HC, _p: HPC, _f: LF): void;
    protected $canLoad(_p: P, _n: Navigation, _c: Navigation | null): boolean | RoutingInstruction | RoutingInstruction[] | Promise<boolean | RoutingInstruction | RoutingInstruction[]>;
    protected $load(_p: P, _n: Navigation, _c: Navigation | null): void | Promise<void>;
    protected $canUnload(_n: Navigation | null, _c: Navigation): boolean | Promise<boolean>;
    protected $unload(_n: Navigation | null, _c: Navigation): void | Promise<void>;
    protected $dispose(this: Partial<Writable<this>>): void;
}
declare class Notifier {
    readonly mgr: NotifierManager;
    readonly name: HookName;
    readonly p: IPlatform;
    readonly entryHistory: string[];
    readonly fullHistory: string[];
    constructor(mgr: NotifierManager, name: HookName);
    enter(vm: TestVM): void;
    leave(vm: TestVM): void;
    tick(vm: TestVM, i: number): void;
    dispose(this: Partial<Writable<this>>): void;
}
declare const INotifierManager: import("@aurelia/kernel").InterfaceSymbol<INotifierManager>;
interface INotifierManager extends NotifierManager {
}
declare class NotifierManager {
    readonly p: IPlatform;
    readonly entryNotifyHistory: string[];
    readonly fullNotifyHistory: string[];
    prefix: string;
    constructor(p: IPlatform);
    readonly binding: Notifier;
    readonly bound: Notifier;
    readonly attaching: Notifier;
    readonly attached: Notifier;
    readonly detaching: Notifier;
    readonly unbinding: Notifier;
    readonly canLoad: Notifier;
    readonly load: Notifier;
    readonly canUnload: Notifier;
    readonly unload: Notifier;
    readonly dispose: Notifier;
    enter(vm: TestVM, tracker: Notifier): void;
    leave(vm: TestVM, tracker: Notifier): void;
    tick(vm: TestVM, tracker: Notifier, i: number): void;
    setPrefix(prefix: string): void;
    $dispose(this: Partial<Writable<this>>): void;
}
declare class DelayedInvoker<T extends HookName> {
    readonly mgr: INotifierManager;
    readonly p: IPlatform;
    readonly name: T;
    readonly ticks: number;
    constructor(mgr: INotifierManager, p: IPlatform, name: T, ticks: number);
    static binding(ticks?: number): DelayedInvokerFactory<'binding'>;
    static bound(ticks?: number): DelayedInvokerFactory<'bound'>;
    static attaching(ticks?: number): DelayedInvokerFactory<'attaching'>;
    static attached(ticks?: number): DelayedInvokerFactory<'attached'>;
    static detaching(ticks?: number): DelayedInvokerFactory<'detaching'>;
    static unbinding(ticks?: number): DelayedInvokerFactory<'unbinding'>;
    static canLoad(ticks?: number): DelayedInvokerFactory<'canLoad'>;
    static load(ticks?: number): DelayedInvokerFactory<'load'>;
    static canUnload(ticks?: number): DelayedInvokerFactory<'canUnload'>;
    static unload(ticks?: number): DelayedInvokerFactory<'unload'>;
    static dispose(ticks?: number): DelayedInvokerFactory<'dispose'>;
    invoke(vm: TestVM, cb: () => any): any;
    toString(): string;
}
export interface Iopts {
    resolutionMode: ResolutionMode;
    swapStrategy: SwapStrategy;
}
export interface IComponentSpec {
    kind: 'all-sync' | 'all-async';
    hookSpec: HookSpecs;
}
export {};
//# sourceMappingURL=hook-tests.spec.d.ts.map