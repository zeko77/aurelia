/**
 * Add a readonly 'queue' property on the target class to return the default FlushQueue
 * implementation
 */
export declare function withFlushQueue(): ClassDecorator;
export declare function withFlushQueue(target: Function): void;
export interface IFlushable {
    flush(): void;
}
export interface IWithFlushQueue {
    queue: FlushQueue;
}
export declare const IFlushQueue: import("@aurelia/kernel").InterfaceSymbol<import("@aurelia/kernel").Key>;
export interface IFlushQueue {
    get count(): number;
    add(flushable: IFlushable): void;
    clear(): void;
}
export declare class FlushQueue implements IFlushQueue {
    static readonly instance: FlushQueue;
    get count(): number;
    add(callable: IFlushable): void;
    clear(): void;
}
//# sourceMappingURL=flush-queue.d.ts.map