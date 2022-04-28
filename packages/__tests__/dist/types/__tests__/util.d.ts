import { IContainer } from '@aurelia/kernel';
import { IPlatform } from '@aurelia/runtime-html';
import { TestContext } from '@aurelia/testing';
export interface TestExecutionContext<TApp> {
    ctx: TestContext;
    container: IContainer;
    host: HTMLElement;
    app: TApp;
    platform: IPlatform;
}
export declare type $TestSetupContext = Record<string, any> & {
    timeout?: number;
};
export declare type TestFunction<TTestContext extends TestExecutionContext<any>> = (ctx: TTestContext) => void | Promise<void>;
export declare type WrapperFunction<TTestContext extends TestExecutionContext<any>, TSetupContext extends $TestSetupContext = $TestSetupContext> = (testFunction: TestFunction<TTestContext>, setupContext?: TSetupContext) => void | Promise<void>;
export declare function createSpecFunction<TTestContext extends TestExecutionContext<any>, TSetupContext extends $TestSetupContext = $TestSetupContext>(wrap: WrapperFunction<TTestContext, TSetupContext>): {
    (title: string, testFunction: TestFunction<TTestContext>, setupContext?: TSetupContext): void;
    only(title: string, testFunction: TestFunction<TTestContext>, setupContext?: TSetupContext): void;
    skip(title: string, testFunction: TestFunction<TTestContext>, setupContext?: TSetupContext): Mocha.Test;
};
export declare class ToNumberValueConverter {
    fromView(value: string): number;
}
export declare class TickLogger {
    ticks: number;
    private running;
    private cb;
    start(): void;
    stop(): void;
    onTick(cb: () => void): void;
}
//# sourceMappingURL=util.d.ts.map