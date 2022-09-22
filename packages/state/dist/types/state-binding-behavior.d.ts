import { BindingBehaviorExpression, Scope } from '@aurelia/runtime';
import { BindingInterceptor, IInterceptableBinding } from '@aurelia/runtime-html';
import { IStore, IStoreSubscriber } from './interfaces';
export declare class StateBindingBehavior extends BindingInterceptor implements IStoreSubscriber<object> {
    constructor(store: IStore<object>, binding: IInterceptableBinding, expr: BindingBehaviorExpression);
    $bind(scope: Scope): void;
    $unbind(): void;
    handleStateChange(state: object): void;
}
//# sourceMappingURL=state-binding-behavior.d.ts.map