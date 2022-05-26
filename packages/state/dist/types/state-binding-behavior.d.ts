import { BindingBehaviorExpression, BindingInterceptor, IInterceptableBinding, LifecycleFlags, Scope } from '@aurelia/runtime';
import { IStore, IStoreSubscriber } from './interfaces';
export declare class StateBindingBehavior extends BindingInterceptor implements IStoreSubscriber<object> {
    constructor(store: IStore<object>, binding: IInterceptableBinding, expr: BindingBehaviorExpression);
    $bind(flags: LifecycleFlags, scope: Scope): void;
    $unbind(flags: LifecycleFlags): void;
    handleStateChange(state: object): void;
}
//# sourceMappingURL=state-binding-behavior.d.ts.map