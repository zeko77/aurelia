import { type BindingBehaviorInstance } from '@aurelia/runtime';
import { ListenerBinding } from '../../binding/listener-binding';
import type { Scope } from '@aurelia/runtime';
export declare type SelfableBinding = ListenerBinding & {
    selfEventCallSource: ListenerBinding['callSource'];
};
export declare class SelfBindingBehavior implements BindingBehaviorInstance {
    bind(_scope: Scope, binding: SelfableBinding): void;
    unbind(_scope: Scope, binding: SelfableBinding): void;
}
//# sourceMappingURL=self.d.ts.map