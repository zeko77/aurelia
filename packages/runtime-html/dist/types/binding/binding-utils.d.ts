import { type Constructable } from '@aurelia/kernel';
import { type IAstEvaluator, type ISubscriber } from '@aurelia/runtime';
import { type IAstBasedBinding } from './interfaces-bindings';
interface ITwoWayBindingImpl extends IAstBasedBinding {
    updateSource(value: unknown): void;
}
/**
 * A subscriber that is used for subcribing to target observer & invoking `updateSource` on a binding
 */
export declare class BindingTargetSubscriber implements ISubscriber {
    constructor(b: ITwoWayBindingImpl, flushQueue: IFlushQueue);
    flush(): void;
    handleChange(value: unknown, _: unknown): void;
}
/**
 * Turns a class into AST evaluator
 *
 * @param strict - whether the evaluation of AST nodes will be in strict mode
 */
export declare function astEvaluator(strict?: boolean | undefined, strictFnCall?: boolean): (target: Constructable<IAstEvaluator>) => void;
export interface IFlushable {
    flush(): void;
}
export declare const IFlushQueue: import("@aurelia/kernel").InterfaceSymbol<IFlushQueue>;
export interface IFlushQueue {
    get count(): number;
    add(flushable: IFlushable): void;
}
export declare class FlushQueue implements IFlushQueue {
    get count(): number;
    add(flushable: IFlushable): void;
    clear(): void;
}
export {};
//# sourceMappingURL=binding-utils.d.ts.map