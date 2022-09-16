import { AccessorType, CollectionKind, IObserver } from '../observation';
import type { ICollectionObserver, IndexMap, ISubscriberCollection, ICollectionSubscriber } from '../observation';
import type { FlushQueue, IFlushable, IWithFlushQueue } from './flush-queue';
export interface CollectionLengthObserver extends ISubscriberCollection {
}
export declare class CollectionLengthObserver implements IObserver, IWithFlushQueue, ICollectionSubscriber, IFlushable {
    readonly owner: ICollectionObserver<CollectionKind.array>;
    readonly type: AccessorType;
    readonly queue: FlushQueue;
    constructor(owner: ICollectionObserver<CollectionKind.array>);
    getValue(): number;
    setValue(newValue: number): void;
    handleCollectionChange(_: IndexMap): void;
    flush(): void;
}
export interface CollectionSizeObserver extends ISubscriberCollection {
}
export declare class CollectionSizeObserver implements ICollectionSubscriber, IFlushable {
    readonly owner: ICollectionObserver<CollectionKind.map | CollectionKind.set>;
    readonly type: AccessorType;
    readonly queue: FlushQueue;
    constructor(owner: ICollectionObserver<CollectionKind.map | CollectionKind.set>);
    getValue(): number;
    setValue(): void;
    handleCollectionChange(_: IndexMap): void;
    flush(): void;
}
//# sourceMappingURL=collection-length-observer.d.ts.map