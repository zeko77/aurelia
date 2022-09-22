import { AccessorType } from '@aurelia/runtime';
import type { IObserver, ISubscriber, ISubscriberCollection } from '@aurelia/runtime';
import type { INode } from '../dom';
import type { EventSubscriber } from './event-delegator';
export interface ValueAttributeObserver extends ISubscriberCollection {
}
/**
 * Observer for non-radio, non-checkbox input.
 */
export declare class ValueAttributeObserver implements IObserver {
    readonly handler: EventSubscriber;
    type: AccessorType;
    constructor(obj: INode, key: PropertyKey, handler: EventSubscriber);
    getValue(): unknown;
    setValue(newValue: string | null): void;
    handleEvent(): void;
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
}
//# sourceMappingURL=value-attribute-observer.d.ts.map