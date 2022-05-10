import { Constructable, IContainer } from '@aurelia/kernel';
import { IObserverLocator } from '@aurelia/runtime';
import { Aurelia, IPlatform, type ICustomElementViewModel } from '@aurelia/runtime-html';
import { TestContext } from './test-context';
export declare const onFixtureCreated: <T>(callback: (fixture: IFixture<T>) => unknown) => import("@aurelia/kernel").IDisposable;
export declare function createFixture<T, K = (T extends Constructable<infer U> ? U : T)>(template: string | Node, $class?: T, registrations?: unknown[], autoStart?: boolean, ctx?: TestContext): IFixture<ICustomElementViewModel & K>;
export declare namespace createFixture {
    var html: <T>(html: string | TemplateStringsArray, ...values: TemplateValues<T>[]) => CreateBuilder<T, "component" | "deps">;
    var component: <T>(component: T) => CreateBuilder<T, "html" | "deps">;
    var deps: <T>(...deps: unknown[]) => CreateBuilder<T, "html" | "component">;
}
export interface IFixture<T> {
    readonly startPromise: void | Promise<void>;
    readonly ctx: TestContext;
    readonly host: HTMLElement;
    readonly container: IContainer;
    readonly platform: IPlatform;
    readonly testHost: HTMLElement;
    readonly appHost: HTMLElement;
    readonly au: Aurelia;
    readonly component: ICustomElementViewModel & T;
    readonly observerLocator: IObserverLocator;
    readonly torn: boolean;
    start(): Promise<void>;
    tearDown(): void | Promise<void>;
    readonly promise: Promise<IFixture<T>>;
    getBy(selector: string): HTMLElement;
    getAllBy(selector: string): HTMLElement[];
    queryBy(selector: string): HTMLElement | null;
    assertText(selector: string, text: string): void;
    trigger: ITrigger;
}
export declare type ITrigger = ((selector: string, event: string, init: CustomEventInit) => void) & {
    click(selector: string, init?: CustomEventInit): void;
    change(selector: string, init?: CustomEventInit): void;
    input(selector: string, init?: CustomEventInit): void;
};
export interface IFixtureBuilderBase<T, E = {}> {
    html(html: string): this & E;
    html<M>(html: TemplateStringsArray, ...values: TemplateValues<M>[]): this & E;
    component(comp: T): this & E;
    deps(...args: unknown[]): this & E;
}
declare type BuilderMethodNames = 'html' | 'component' | 'deps';
declare type CreateBuilder<T, Availables extends BuilderMethodNames = BuilderMethodNames> = {
    [key in Availables]: key extends 'html' ? {
        (html: string): CreateBuilder<T, Exclude<Availables, 'html'>> & {
            build(): IFixture<T>;
        };
        (html: TemplateStringsArray, ...values: TemplateValues<T>[]): CreateBuilder<T, Exclude<Availables, 'html'>> & {
            build(): IFixture<T>;
        };
    } : (...args: Parameters<IFixtureBuilderBase<T>[key]>) => CreateBuilder<T, Exclude<Availables, key>>;
} & (never extends Availables ? {
    build(): IFixture<T>;
} : {});
declare type TaggedTemplateLambda<M> = (vm: M) => unknown;
declare type TemplateValues<M> = string | number | TaggedTemplateLambda<M>;
export {};
//# sourceMappingURL=startup.d.ts.map