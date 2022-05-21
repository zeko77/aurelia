import { BindingBehaviorExpression, BindingInterceptor, IInterceptableBinding, LifecycleFlags, Scope } from '@aurelia/runtime';
import { IStore } from './interfaces';
export declare class StateBindingBehavior extends BindingInterceptor {
    constructor(store: IStore<object>, binding: IInterceptableBinding, expr: BindingBehaviorExpression);
    $bind(flags: LifecycleFlags, scope: Scope): void;
}
//# sourceMappingURL=state-binding-behavior.d.ts.map