import { BindingInterceptor, IInterceptableBinding } from '../binding-behavior';
import { type BindingBehaviorExpression, type Scope } from '@aurelia/runtime';
export declare class DebounceBindingBehavior extends BindingInterceptor {
    constructor(binding: IInterceptableBinding, expr: BindingBehaviorExpression);
    callSource(args: object): unknown;
    handleChange(newValue: unknown, oldValue: unknown): void;
    updateSource(newValue: unknown): void;
    private queueTask;
    $bind(scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=debounce.d.ts.map