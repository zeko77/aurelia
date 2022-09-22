import { AccessorType } from '../observation';
import type { IIndexable } from '@aurelia/kernel';
import type { IAccessor, InterceptorFunc, ISubscriber, ISubscriberCollection } from '../observation';
export interface SetterObserver extends ISubscriberCollection {
}
/**
 * Observer for the mutation of object property value employing getter-setter strategy.
 * This is used for observing object properties that has no decorator.
 */
export declare class SetterObserver implements IAccessor, ISubscriberCollection {
    type: AccessorType;
    constructor(obj: IIndexable, key: PropertyKey);
    getValue(): unknown;
    setValue(newValue: unknown): void;
    subscribe(subscriber: ISubscriber): void;
    start(): this;
    stop(): this;
}
export interface SetterNotifier extends IAccessor, ISubscriberCollection {
}
export declare class SetterNotifier implements IAccessor {
    readonly type: AccessorType;
    constructor(obj: object, callbackKey: PropertyKey, set: InterceptorFunc | undefined, initialValue: unknown);
    getValue(): unknown;
    setValue(value: unknown): void;
}
//# sourceMappingURL=setter-observer.d.ts.map