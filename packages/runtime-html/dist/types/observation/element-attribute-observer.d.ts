import { AccessorType } from '@aurelia/runtime';
import type { IObserver, ISubscriber, ISubscriberCollection } from '@aurelia/runtime';
export interface AttributeObserver extends IObserver, ISubscriber, ISubscriberCollection {
}
/**
 * Observer for handling two-way binding with attributes
 * Has different strategy for class/style and normal attributes
 * TODO: handle SVG/attributes with namespace
 */
export declare class AttributeObserver implements AttributeObserver, ElementMutationSubscriber {
    type: AccessorType;
    constructor(obj: HTMLElement, prop: string, attr: string);
    getValue(): unknown;
    setValue(value: unknown): void;
    handleMutation(mutationRecords: MutationRecord[]): void;
    subscribe(subscriber: ISubscriber): void;
    unsubscribe(subscriber: ISubscriber): void;
}
interface ElementMutationSubscriber {
    handleMutation(mutationRecords: MutationRecord[]): void;
}
export {};
//# sourceMappingURL=element-attribute-observer.d.ts.map