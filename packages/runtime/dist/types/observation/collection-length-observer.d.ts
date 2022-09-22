import { AccessorType, Collection, CollectionKind, IObserver } from '../observation';
import type { ICollectionObserver, IndexMap, ISubscriberCollection, ICollectionSubscriber } from '../observation';
export interface CollectionLengthObserver extends ISubscriberCollection {
}
export declare class CollectionLengthObserver implements IObserver, ICollectionSubscriber {
    readonly owner: ICollectionObserver<CollectionKind.array>;
    readonly type: AccessorType;
    constructor(owner: ICollectionObserver<CollectionKind.array>);
    getValue(): number;
    setValue(newValue: number): void;
    handleCollectionChange(_arr: unknown[], _: IndexMap): void;
}
export interface CollectionSizeObserver extends ISubscriberCollection {
}
export declare class CollectionSizeObserver implements ICollectionSubscriber {
    readonly owner: ICollectionObserver<CollectionKind.map | CollectionKind.set>;
    readonly type: AccessorType;
    constructor(owner: ICollectionObserver<CollectionKind.map | CollectionKind.set>);
    getValue(): number;
    setValue(): void;
    handleCollectionChange(_collection: Collection, _: IndexMap): void;
}
//# sourceMappingURL=collection-length-observer.d.ts.map