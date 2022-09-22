import { AccessorType } from '@aurelia/runtime';
import type { INode } from '../dom';
import type { EventSubscriber } from './event-delegator';
import type { IObserver, IObserverLocator, ISubscriber, ISubscriberCollection } from '@aurelia/runtime';
declare function defaultMatcher(a: unknown, b: unknown): boolean;
export interface ISelectElement extends HTMLSelectElement {
    options: HTMLCollectionOf<IOptionElement> & Pick<HTMLOptionsCollection, 'length' | 'selectedIndex' | 'add' | 'remove'>;
    matcher?: typeof defaultMatcher;
}
export interface IOptionElement extends HTMLOptionElement {
    model?: unknown;
}
export interface SelectValueObserver extends ISubscriberCollection {
}
export declare class SelectValueObserver implements IObserver {
    type: AccessorType;
    readonly handler: EventSubscriber;
    constructor(obj: INode, _key: PropertyKey, handler: EventSubscriber, observerLocator: IObserverLocator);
    getValue(): unknown;
    setValue(newValue: unknown): void;
    handleCollectionChange(): void;
    syncOptions(): void;
    syncValue(): boolean;
    handleEvent(): void;
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
}
export {};
//# sourceMappingURL=select-value-observer.d.ts.map