import { Constructable } from '@aurelia/kernel';
import { IAstEvaluator, ISubscriber } from '@aurelia/runtime';
import type { IAstBasedBinding } from './interfaces-bindings';
interface ITwoWayBindingImpl extends IAstBasedBinding {
    updateSource(value: unknown): void;
}
/**
 * A subscriber that is used for subcribing to target observer & invoking `updateSource` on a binding
 */
export declare class BindingTargetSubscriber implements ISubscriber {
    private readonly b;
    constructor(b: ITwoWayBindingImpl);
    handleChange(value: unknown, _: unknown): void;
}
/**
 * Turns a class into AST evaluator
 *
 * @param strict - whether the evaluation of AST nodes will be in strict mode
 */
export declare function astEvaluator(strict?: boolean | undefined, strictFnCall?: boolean): (target: Constructable<IAstEvaluator>) => void;
export {};
//# sourceMappingURL=binding-utils.d.ts.map