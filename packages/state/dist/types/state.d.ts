import { IContainer, ILogger } from '@aurelia/kernel';
import { IReducerAction } from './reducer';
export interface IStateContainer<T extends object> {
    subscribe(subscriber: IStateSubscriber<T>): void;
    unsubscribe(subscriber: IStateSubscriber<T>): void;
    getState(): T;
    dispatch(action: string | IReducerAction<T>, ...params: any[]): void | Promise<void>;
}
export declare const IStateContainer: import("@aurelia/kernel").InterfaceSymbol<object>;
export declare const IState: import("@aurelia/kernel").InterfaceSymbol<object>;
export declare class StateContainer<T extends object> implements IStateContainer<T> {
    static register(c: IContainer): void;
    constructor(initialState: T | null, actions: [string | IReducerAction<T>, IReducerAction<T>][], logger: ILogger);
    subscribe(subscriber: IStateSubscriber<T>): void;
    unsubscribe(subscriber: IStateSubscriber<T>): void;
    private _setState;
    getState(): T;
    dispatch(action: string | IReducerAction<T>, ...params: any[]): void | Promise<void>;
}
export interface IStateSubscriber<T extends object> {
    handleStateChange(state: T, prevState: T): void;
}
//# sourceMappingURL=state.d.ts.map