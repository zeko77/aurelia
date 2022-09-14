import { Constructable } from '@aurelia/kernel';
import { IAstEvaluator, ISubscriber, LifecycleFlags } from '@aurelia/runtime';
import type { IAstBasedBinding } from './interfaces-bindings';
interface ITwoWayBindingImpl extends IAstBasedBinding {
    updateSource(value: unknown, flags: LifecycleFlags): void;
}
/**
 * A subscriber that is used for subcribing to target observer & invoking `updateSource` on a binding
 */
export declare class BindingTargetSubscriber implements ISubscriber {
    private readonly b;
    constructor(b: ITwoWayBindingImpl);
    handleChange(value: unknown, _: unknown, flags: LifecycleFlags): void;
}
/**
 * Turns a class into AST evaluator, and optionally connectable
 *
 * @param strict - whether the evaluation of AST nodes will be in strict mode
 */
export declare function astEvaluator(strict?: boolean | undefined, strictFnCall?: boolean): (target: Constructable<IAstEvaluator>) => void;
export {};
//# sourceMappingURL=binding-utils.d.ts.map