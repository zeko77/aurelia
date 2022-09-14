import { AnyBindingExpression, IAstEvaluator, IConnectableBinding } from '@aurelia/runtime';
import { State } from '../templating/controller';
/**
 * Mode of a binding to operate
 */
export declare enum BindingMode {
    oneTime = 1,
    toView = 2,
    fromView = 4,
    twoWay = 6,
    /**
     * Unspecified mode, bindings may act differently with this mode
     */
    default = 8
}
export declare type IAstBasedBinding = IAstEvaluator & IConnectableBinding & {
    ast: AnyBindingExpression;
};
export interface IBindingController {
    readonly state: State;
}
//# sourceMappingURL=interfaces-bindings.d.ts.map