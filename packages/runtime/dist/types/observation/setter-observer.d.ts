import { AccessorType } from '../observation';
import type { IIndexable } from '@aurelia/kernel';
import type { IAccessor, InterceptorFunc, ISubscriber, ISubscriberCollection } from '../observation';
import { FlushQueue, IFlushable, IWithFlushQueue } from './flush-queue';
export interface SetterObserver extends IAccessor, ISubscriberCollection {
}
/**
 * Observer for the mutation of object property value employing getter-setter strategy.
 * This is used for observing object properties that has no decorator.
 */
export declare class SetterObserver implements IWithFlushQueue, IFlushable {
    type: AccessorType;
    readonly queue: FlushQueue;
    constructor(obj: IIndexable, key: PropertyKey);
    getValue(): unknown;
    setValue(newValue: unknown): void;
    subscribe(subscriber: ISubscriber): void;
    flush(): void;
    start(): this;
    stop(): this;
}
export interface SetterNotifier extends IAccessor, ISubscriberCollection {
}
export declare class SetterNotifier implements IAccessor, IWithFlushQueue, IFlushable {
    readonly type: AccessorType;
    readonly queue: FlushQueue;
    constructor(obj: object, callbackKey: PropertyKey, set: InterceptorFunc | undefined, initialValue: unknown);
    getValue(): unknown;
    setValue(value: unknown): void;
    flush(): void;
}
//# sourceMappingURL=setter-observer.d.ts.map