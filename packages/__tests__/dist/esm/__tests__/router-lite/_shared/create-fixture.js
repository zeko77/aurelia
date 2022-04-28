import { Registration, ILogConfig, DI, LoggerConfiguration, ConsoleSink } from '@aurelia/kernel';
import { Aurelia } from '@aurelia/runtime-html';
import { RouterConfiguration, IRouter } from '@aurelia/router-lite';
import { TestContext } from '@aurelia/testing';
import { IHIAConfig, IHookInvocationAggregator } from './hook-invocation-tracker.js';
import { TestRouterConfiguration } from './configuration.js';
export const IActivityTracker = DI.createInterface('IActivityTracker', x => x.singleton(ActivityTracker));
export class ActivityTracker {
    constructor() {
        this.activeVMs = [];
    }
    setActive(vm) {
        this.activeVMs.push(vm);
    }
    setNonActive(vm) {
        this.activeVMs.splice(this.activeVMs.indexOf(vm), 1);
    }
}
export async function createFixture(Component, deps, createHIAConfig, createRouterOptions, level = 5 /* fatal */) {
    const hiaConfig = createHIAConfig();
    const routerOptions = createRouterOptions === null || createRouterOptions === void 0 ? void 0 : createRouterOptions();
    const ctx = TestContext.create();
    const { container, platform } = ctx;
    container.register(Registration.instance(IHIAConfig, hiaConfig));
    container.register(TestRouterConfiguration.for(level));
    container.register(RouterConfiguration.customize(routerOptions));
    container.register(LoggerConfiguration.create({ sinks: [ConsoleSink], level: 5 /* fatal */ }));
    container.register(...deps);
    const activityTracker = container.get(IActivityTracker);
    const hia = container.get(IHookInvocationAggregator);
    const router = container.get(IRouter);
    const component = container.get(Component);
    const au = new Aurelia(container);
    const host = ctx.createElement('div');
    const logConfig = container.get(ILogConfig);
    au.app({ component, host });
    hia.setPhase('start');
    await au.start();
    return {
        ctx,
        container,
        au,
        host,
        hia,
        component,
        platform,
        router,
        activityTracker,
        startTracing() {
            logConfig.level = 0 /* trace */;
        },
        stopTracing() {
            logConfig.level = level;
        },
        async tearDown() {
            hia.setPhase('stop');
            await au.stop(true);
        },
    };
}
//# sourceMappingURL=create-fixture.js.map