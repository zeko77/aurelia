import { Resolved, ResourceType } from '@aurelia/kernel';
import { BindingBehaviorInstance, Collection, IndexMap, ValueConverterInstance } from '@aurelia/runtime';
import { BindingMode } from '../binding/interfaces-bindings';
import type { Constructable, IContainer, IResourceKind, IServiceLocator, Key, PartialResourceDefinition, ResourceDefinition } from '@aurelia/kernel';
import type { BindingBehaviorExpression, BindingObserverRecord, ForOfStatement, IConnectableBinding, IObserverLocator, IsBindingBehavior, Scope } from '@aurelia/runtime';
export declare type PartialBindingBehaviorDefinition = PartialResourceDefinition<{
    strategy?: BindingBehaviorStrategy;
}>;
export declare const enum BindingBehaviorStrategy {
    singleton = 1,
    interceptor = 2
}
export declare type BindingBehaviorType<T extends Constructable = Constructable> = ResourceType<T, BindingBehaviorInstance>;
export declare type BindingBehaviorKind = IResourceKind<BindingBehaviorType, BindingBehaviorDefinition> & {
    isType<T>(value: T): value is (T extends Constructable ? BindingBehaviorType<T> : never);
    define<T extends Constructable>(name: string, Type: T): BindingBehaviorType<T>;
    define<T extends Constructable>(def: PartialBindingBehaviorDefinition, Type: T): BindingBehaviorType<T>;
    define<T extends Constructable>(nameOrDef: string | PartialBindingBehaviorDefinition, Type: T): BindingBehaviorType<T>;
    getDefinition<T extends Constructable>(Type: T): BindingBehaviorDefinition<T>;
    annotate<K extends keyof PartialBindingBehaviorDefinition>(Type: Constructable, prop: K, value: PartialBindingBehaviorDefinition[K]): void;
    getAnnotation<K extends keyof PartialBindingBehaviorDefinition>(Type: Constructable, prop: K): PartialBindingBehaviorDefinition[K];
};
export declare type BindingBehaviorDecorator = <T extends Constructable>(Type: T) => BindingBehaviorType<T>;
export declare function bindingBehavior(definition: PartialBindingBehaviorDefinition): BindingBehaviorDecorator;
export declare function bindingBehavior(name: string): BindingBehaviorDecorator;
export declare function bindingBehavior(nameOrDef: string | PartialBindingBehaviorDefinition): BindingBehaviorDecorator;
export declare class BindingBehaviorDefinition<T extends Constructable = Constructable> implements ResourceDefinition<T, BindingBehaviorInstance> {
    readonly Type: BindingBehaviorType<T>;
    readonly name: string;
    readonly aliases: readonly string[];
    readonly key: string;
    readonly strategy: BindingBehaviorStrategy;
    private constructor();
    static create<T extends Constructable = Constructable>(nameOrDef: string | PartialBindingBehaviorDefinition, Type: BindingBehaviorType<T>): BindingBehaviorDefinition<T>;
    register(container: IContainer): void;
}
export declare class BindingBehaviorFactory<T extends Constructable = Constructable> {
    private readonly ctn;
    private readonly Type;
    private readonly deps;
    constructor(ctn: IContainer, Type: BindingBehaviorType<T>);
    construct(binding: IInterceptableBinding, expr: BindingBehaviorExpression): IInterceptableBinding;
}
export declare type IInterceptableBinding = Exclude<IConnectableBinding, 'updateTarget' | 'updateSource' | 'callSource' | 'handleChange'> & {
    updateTarget?(value: unknown): void;
    updateSource?(value: unknown): void;
    callSource?(args: object): unknown;
    handleChange?(newValue: unknown, previousValue: unknown): void;
};
export interface BindingInterceptor extends IConnectableBinding {
}
export declare class BindingInterceptor implements IInterceptableBinding {
    readonly binding: IInterceptableBinding;
    readonly expr: BindingBehaviorExpression;
    readonly type = "instance";
    interceptor: this;
    readonly oL: IObserverLocator;
    readonly locator: IServiceLocator;
    readonly $scope: Scope | undefined;
    readonly isBound: boolean;
    readonly obs: BindingObserverRecord;
    readonly ast: IsBindingBehavior | ForOfStatement;
    readonly mode: BindingMode;
    constructor(binding: IInterceptableBinding, expr: BindingBehaviorExpression);
    get(key: Key): Resolved<Key>;
    getConverter<T>(name: string): ValueConverterInstance<T> | undefined;
    getBehavior<T>(name: string): BindingBehaviorInstance<T> | undefined;
    updateTarget(value: unknown): void;
    updateSource(value: unknown): void;
    callSource(args: object): unknown;
    handleChange(newValue: unknown, previousValue: unknown): void;
    handleCollectionChange(indexMap: IndexMap): void;
    observe(obj: object, key: string): void;
    observeCollection(observer: Collection): void;
    $bind(scope: Scope): void;
    $unbind(): void;
}
export declare const BindingBehavior: Readonly<BindingBehaviorKind>;
//# sourceMappingURL=binding-behavior.d.ts.map