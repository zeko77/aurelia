import type { ISubscriber, LifecycleFlags } from '../observation';
export interface ISignaler extends Signaler {
}
export declare const ISignaler: import("@aurelia/kernel").InterfaceSymbol<ISignaler>;
export declare class Signaler {
    signals: Record<string, Set<ISubscriber> | undefined>;
    dispatchSignal(name: string, flags?: LifecycleFlags): void;
    addSignalListener(name: string, listener: ISubscriber): void;
    removeSignalListener(name: string, listener: ISubscriber): void;
}
//# sourceMappingURL=signaler.d.ts.map