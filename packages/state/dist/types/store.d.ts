import { IContainer, ILogger } from '@aurelia/kernel';
import { IReducer, IStore, IStoreSubscriber } from './interfaces';
export declare class Store<T extends object> implements IStore<T> {
    static register(c: IContainer): void;
    constructor(initialState: T | null, reducers: IReducer<T>[], logger: ILogger);
    subscribe(subscriber: IStoreSubscriber<T>): void;
    unsubscribe(subscriber: IStoreSubscriber<T>): void;
    getState(): T;
    dispatch(action: unknown, ...params: any[]): void | Promise<void>;
}
//# sourceMappingURL=store.d.ts.map