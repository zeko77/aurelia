import { Constructable, IContainer } from '@aurelia/kernel';
import { IObserverLocator } from '@aurelia/runtime';
import { Aurelia, IPlatform, type ICustomElementViewModel } from '@aurelia/runtime-html';
import { TestContext } from './test-context';
export declare const onFixtureCreated: <T>(callback: (fixture: IFixture<T>) => unknown) => import("@aurelia/kernel").IDisposable;
export declare function createFixture<T, K = (T extends Constructable<infer U> ? U : T)>(template: string | Node, $class?: T, registrations?: unknown[], autoStart?: boolean, ctx?: TestContext): IFixture<ICustomElementViewModel & K>;
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
    tearDown(): Promise<void>;
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
//# sourceMappingURL=startup.d.ts.map