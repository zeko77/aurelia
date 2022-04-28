import { ICollectionSubscriber, IndexMap, LifecycleFlags as LF } from '@aurelia/runtime';
export declare class SynchronizingCollectionSubscriber implements ICollectionSubscriber {
    readonly oldArr: unknown[];
    readonly newArr: unknown[];
    constructor(oldArr: unknown[], newArr: unknown[]);
    handleCollectionChange(indexMap: IndexMap, _flags: LF): void;
}
//# sourceMappingURL=array-observer.spec.d.ts.map