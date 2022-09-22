import { type BindingBehaviorInstance } from '@aurelia/runtime';
import { Listener } from '../../binding/listener';
import type { Scope } from '@aurelia/runtime';
export declare type SelfableBinding = Listener & {
    selfEventCallSource: Listener['callSource'];
};
export declare class SelfBindingBehavior implements BindingBehaviorInstance {
    bind(_scope: Scope, binding: SelfableBinding): void;
    unbind(_scope: Scope, binding: SelfableBinding): void;
}
//# sourceMappingURL=self.d.ts.map