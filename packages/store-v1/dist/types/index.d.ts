import { IContainer } from '@aurelia/kernel';
import { StoreOptions } from './store';
export interface StorePluginOptions<T> extends StoreOptions {
    initialState: T;
}
export interface IConfigure {
    withInitialState(state: unknown): IConfigure;
    withOptions(options: Partial<StorePluginOptions<unknown>>): IConfigure;
    register(container: IContainer): IContainer;
}
export declare const StoreConfiguration: IConfigure;
export { ActionRegistrationError, DevToolsRemoteDispatchError, type IStoreWindow, type MiddlewareSettings, PerformanceMeasurement, type PipedDispatch, type Reducer, ReducerNoStateError, STORE, Store, type StoreOptions, UnregisteredActionError, dispatchify, } from './store';
export { type StepFn, executeSteps } from './test-helpers';
export { type HistoryOptions, type StateHistory, applyLimits, isStateHistory, jump, nextStateHistory, } from './history';
export { type LogDefinitions, LogLevel, getLogType, } from './logging';
export { type CallingAction, DEFAULT_LOCAL_STORAGE_KEY, type Middleware, MiddlewarePlacement, localStorageMiddleware, logMiddleware, rehydrateFromLocalStorage, } from './middleware';
export { type ConnectToSettings, type MultipleSelector, connectTo, } from './decorator';
export { type Action, type ActionCreator, type DevTools, type DevToolsExtension, type DevToolsMessage, type DevToolsOptions, } from './devtools';
//# sourceMappingURL=index.d.ts.map