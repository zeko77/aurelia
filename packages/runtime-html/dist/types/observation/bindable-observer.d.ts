import { AccessorType, ICoercionConfiguration } from '@aurelia/runtime';
import type { IIndexable } from '@aurelia/kernel';
import type { InterceptorFunc, IObserver, ISubscriber, ISubscriberCollection } from '@aurelia/runtime';
import type { IController } from '../templating/controller';
export interface BindableObserver extends IObserver, ISubscriberCollection {
}
export declare class BindableObserver {
    private readonly set;
    readonly $controller: IController | null;
    private readonly _coercionConfig;
    get type(): AccessorType;
    constructor(obj: IIndexable, key: string, cbName: string, set: InterceptorFunc, $controller: IController | null, _coercionConfig: ICoercionConfiguration | null);
    getValue(): unknown;
    setValue(newValue: unknown): void;
    subscribe(subscriber: ISubscriber): void;
}
//# sourceMappingURL=bindable-observer.d.ts.map