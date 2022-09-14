import type { Class } from '@aurelia/kernel';
import type { IConnectable, ISubscribable, ISubscriber, IBinding, ICollectionSubscriber, IndexMap, ICollectionSubscribable, LifecycleFlags } from '../observation';
import type { IObserverLocator } from '../observation/observer-locator';
export interface IObserverLocatorBasedConnectable extends IBinding, ISubscriber, ICollectionSubscriber {
    oL: IObserverLocator;
}
export interface IConnectableBinding extends IObserverLocatorBasedConnectable, IConnectable {
    /**
     * A record storing observers that are currently subscribed to by this binding
     */
    obs: BindingObserverRecord;
}
declare type ObservationRecordImplType = {
    version: number;
    count: number;
    binding: IConnectableBinding;
} & Record<string, unknown>;
export interface BindingObserverRecord extends ObservationRecordImplType {
}
export declare class BindingObserverRecord implements ISubscriber, ICollectionSubscriber {
    version: number;
    count: number;
    constructor(b: IConnectableBinding);
    handleChange(value: unknown, oldValue: unknown, flags: LifecycleFlags): unknown;
    handleCollectionChange(indexMap: IndexMap, flags: LifecycleFlags): void;
    /**
     * Add, and subscribe to a given observer
     */
    add(observer: ISubscribable | ICollectionSubscribable): void;
    /**
     * Unsubscribe the observers that are not up to date with the record version
     */
    clear(): void;
    clearAll(): void;
}
declare type Connectable = IConnectable & Partial<ISubscriber & ICollectionSubscriber>;
declare type DecoratableConnectable<TProto, TClass> = Class<TProto & Connectable, TClass>;
declare type DecoratedConnectable<TProto, TClass> = Class<TProto & Connectable, TClass>;
declare function connectableDecorator<TProto, TClass>(target: DecoratableConnectable<TProto, TClass>): DecoratedConnectable<TProto, TClass>;
export declare function connectable(): typeof connectableDecorator;
export declare function connectable<TProto, TClass>(target: DecoratableConnectable<TProto, TClass>): DecoratedConnectable<TProto, TClass>;
export {};
//# sourceMappingURL=connectable.d.ts.map