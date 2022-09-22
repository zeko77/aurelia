import { type BindingBehaviorInstance, IObserverLocator } from '@aurelia/runtime';
import { EventSubscriber } from '../../observation/event-delegator';
import type { Scope } from '@aurelia/runtime';
import type { PropertyBinding } from '../../binding/property-binding';
import type { CheckedObserver } from '../../observation/checked-observer';
import type { SelectValueObserver } from '../../observation/select-value-observer';
import type { ValueAttributeObserver } from '../../observation/value-attribute-observer';
export declare type UpdateTriggerableObserver = ((ValueAttributeObserver & Required<ValueAttributeObserver>) | (CheckedObserver & Required<CheckedObserver>) | (SelectValueObserver & Required<SelectValueObserver>)) & {
    originalHandler?: EventSubscriber;
};
export declare type UpdateTriggerableBinding = PropertyBinding & {
    targetObserver: UpdateTriggerableObserver;
};
export declare class UpdateTriggerBindingBehavior implements BindingBehaviorInstance {
    static inject: import("@aurelia/kernel").InterfaceSymbol<IObserverLocator>[];
    private readonly oL;
    constructor(observerLocator: IObserverLocator);
    bind(_scope: Scope, binding: UpdateTriggerableBinding, ...events: string[]): void;
    unbind(_scope: Scope, binding: UpdateTriggerableBinding): void;
}
//# sourceMappingURL=update-trigger.d.ts.map