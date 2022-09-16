import { ISubscriberRecord, ICollectionSubscriber, IndexMap } from '../observation.js';
import type { IAnySubscriber } from './subscriber-collection.js';
export declare let batching: boolean;
export declare function batch(fn: () => unknown): void;
export declare function addCollectionBatch(subs: ISubscriberRecord<ICollectionSubscriber>, indexMap: IndexMap): void;
export declare function addValueBatch(subs: ISubscriberRecord<IAnySubscriber>, newValue: unknown, oldValue: unknown): void;
//# sourceMappingURL=subscriber-batch.d.ts.map