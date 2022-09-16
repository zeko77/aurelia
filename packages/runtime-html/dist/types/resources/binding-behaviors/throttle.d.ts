import { BindingInterceptor, IInterceptableBinding } from '../binding-behavior';
import type { BindingBehaviorExpression, Scope } from '@aurelia/runtime';
export declare class ThrottleBindingBehavior extends BindingInterceptor {
    private readonly _taskQueue;
    private readonly _platform;
    private readonly opts;
    private readonly firstArg;
    private task;
    private lastCall;
    private delay;
    constructor(binding: IInterceptableBinding, expr: BindingBehaviorExpression);
    callSource(args: object): unknown;
    handleChange(newValue: unknown, oldValue: unknown): void;
    updateSource(newValue: unknown): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
//# sourceMappingURL=throttle.d.ts.map