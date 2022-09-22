import { SetterObserver, AccessorType } from '@aurelia/runtime';
import type { INode } from '../dom';
import type { EventSubscriber } from './event-delegator';
import type { ValueAttributeObserver } from './value-attribute-observer';
import type { ISubscriber, ISubscriberCollection, IObserver, IObserverLocator } from '@aurelia/runtime';
export interface IInputElement extends HTMLInputElement {
    model?: unknown;
    $observers?: {
        model?: SetterObserver;
        value?: ValueAttributeObserver;
    };
    matcher?: typeof defaultMatcher;
}
declare function defaultMatcher(a: unknown, b: unknown): boolean;
export interface CheckedObserver extends ISubscriberCollection {
}
export declare class CheckedObserver implements IObserver {
    readonly handler: EventSubscriber;
    type: AccessorType;
    constructor(obj: INode, _key: PropertyKey, handler: EventSubscriber, observerLocator: IObserverLocator);
    getValue(): unknown;
    setValue(newValue: unknown): void;
    handleCollectionChange(): void;
    handleChange(_newValue: unknown, _previousValue: unknown): void;
    handleEvent(): void;
    start(): void;
    stop(): void;
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
}
export {};
//# sourceMappingURL=checked-observer.d.ts.map