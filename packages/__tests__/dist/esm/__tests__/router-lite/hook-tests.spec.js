var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { DI, ILogConfig, Registration } from '@aurelia/kernel';
import { CustomElement, customElement, IPlatform, Aurelia, } from '@aurelia/runtime-html';
import { IRouter, RouterConfiguration, route, } from '@aurelia/router-lite';
import { assert, TestContext } from '@aurelia/testing';
import { TestRouterConfiguration } from './_shared/configuration.js';
function join(sep, ...parts) {
    return parts.filter(function (x) {
        return x === null || x === void 0 ? void 0 : x.split('@')[0];
    }).join(sep);
}
const hookNames = ['binding', 'bound', 'attaching', 'attached', 'detaching', 'unbinding', 'canLoad', 'load', 'canUnload', 'unload'];
class DelayedInvokerFactory {
    constructor(name, ticks) {
        this.name = name;
        this.ticks = ticks;
    }
    create(mgr, p) {
        return new DelayedInvoker(mgr, p, this.name, this.ticks);
    }
    toString() {
        return `${this.name}(${this.ticks})`;
    }
}
export class HookSpecs {
    constructor(binding, bound, attaching, attached, detaching, unbinding, dispose, canLoad, load, canUnload, unload, ticks) {
        this.binding = binding;
        this.bound = bound;
        this.attaching = attaching;
        this.attached = attached;
        this.detaching = detaching;
        this.unbinding = unbinding;
        this.dispose = dispose;
        this.canLoad = canLoad;
        this.load = load;
        this.canUnload = canUnload;
        this.unload = unload;
        this.ticks = ticks;
    }
    static create(ticks, input = {}) {
        return new HookSpecs(input.binding || DelayedInvoker.binding(ticks), input.bound || DelayedInvoker.bound(ticks), input.attaching || DelayedInvoker.attaching(ticks), input.attached || DelayedInvoker.attached(ticks), input.detaching || DelayedInvoker.detaching(ticks), input.unbinding || DelayedInvoker.unbinding(ticks), DelayedInvoker.dispose(), input.canLoad || DelayedInvoker.canLoad(ticks), input.load || DelayedInvoker.load(ticks), input.canUnload || DelayedInvoker.canUnload(ticks), input.unload || DelayedInvoker.unload(ticks), ticks);
    }
    $dispose() {
        const $this = this;
        $this.binding = void 0;
        $this.bound = void 0;
        $this.attaching = void 0;
        $this.attached = void 0;
        $this.detaching = void 0;
        $this.unbinding = void 0;
        $this.dispose = void 0;
        $this.canLoad = void 0;
        $this.load = void 0;
        $this.canUnload = void 0;
        $this.unload = void 0;
    }
    toString(exclude = this.ticks) {
        const strings = [];
        for (const k of hookNames) {
            const factory = this[k];
            if (factory.ticks !== exclude) {
                strings.push(factory.toString());
            }
        }
        return strings.length > 0 ? strings.join(',') : '';
    }
}
class TestVM {
    constructor(mgr, p, specs) {
        this.bindingDI = specs.binding.create(mgr, p);
        this.boundDI = specs.bound.create(mgr, p);
        this.attachingDI = specs.attaching.create(mgr, p);
        this.attachedDI = specs.attached.create(mgr, p);
        this.detachingDI = specs.detaching.create(mgr, p);
        this.unbindingDI = specs.unbinding.create(mgr, p);
        this.canLoadDI = specs.canLoad.create(mgr, p);
        this.loadDI = specs.load.create(mgr, p);
        this.canUnloadDI = specs.canUnload.create(mgr, p);
        this.unloadDI = specs.unload.create(mgr, p);
        this.disposeDI = specs.dispose.create(mgr, p);
    }
    get name() { return this.$controller.definition.name; }
    binding(i, p, f) { return this.bindingDI.invoke(this, () => { return this.$binding(i, p, f); }); }
    bound(i, p, f) { return this.boundDI.invoke(this, () => { return this.$bound(i, p, f); }); }
    attaching(i, p, f) { return this.attachingDI.invoke(this, () => { return this.$attaching(i, p, f); }); }
    attached(i, f) { return this.attachedDI.invoke(this, () => { return this.$attached(i, f); }); }
    detaching(i, p, f) { return this.detachingDI.invoke(this, () => { return this.$detaching(i, p, f); }); }
    unbinding(i, p, f) { return this.unbindingDI.invoke(this, () => { return this.$unbinding(i, p, f); }); }
    canLoad(p, n, c) { return this.canLoadDI.invoke(this, () => { return this.$canLoad(p, n, c); }); }
    load(p, n, c) { return this.loadDI.invoke(this, () => { return this.$load(p, n, c); }); }
    canUnload(n, c) { return this.canUnloadDI.invoke(this, () => { return this.$canUnload(n, c); }); }
    unload(n, c) { return this.unloadDI.invoke(this, () => { return this.$unload(n, c); }); }
    dispose() { void this.disposeDI.invoke(this, () => { this.$dispose(); }); }
    $binding(_i, _p, _f) { }
    $bound(_i, _p, _f) { }
    $attaching(_i, _p, _f) { }
    $attached(_i, _f) { }
    $detaching(_i, _p, _f) { }
    $unbinding(_i, _p, _f) { }
    $canLoad(_p, _n, _c) { return true; }
    $load(_p, _n, _c) { }
    $canUnload(_n, _c) { return true; }
    $unload(_n, _c) { }
    $dispose() {
        this.bindingDI = void 0;
        this.boundDI = void 0;
        this.attachingDI = void 0;
        this.attachedDI = void 0;
        this.detachingDI = void 0;
        this.unbindingDI = void 0;
        this.disposeDI = void 0;
    }
}
class Notifier {
    constructor(mgr, name) {
        this.mgr = mgr;
        this.name = name;
        this.entryHistory = [];
        this.fullHistory = [];
        this.p = mgr.p;
    }
    enter(vm) {
        this.entryHistory.push(vm.name);
        this.fullHistory.push(`${vm.name}.enter`);
        this.mgr.enter(vm, this);
    }
    leave(vm) {
        this.fullHistory.push(`${vm.name}.leave`);
        this.mgr.leave(vm, this);
    }
    tick(vm, i) {
        this.fullHistory.push(`${vm.name}.tick(${i})`);
        this.mgr.tick(vm, this, i);
    }
    dispose() {
        this.entryHistory = void 0;
        this.fullHistory = void 0;
        this.p = void 0;
        this.mgr = void 0;
    }
}
const INotifierConfig = DI.createInterface('INotifierConfig');
class NotifierConfig {
    constructor(resolveLabels, resolveTimeoutMs) {
        this.resolveLabels = resolveLabels;
        this.resolveTimeoutMs = resolveTimeoutMs;
    }
}
const INotifierManager = DI.createInterface('INotifierManager', x => x.singleton(NotifierManager));
let NotifierManager = class NotifierManager {
    constructor(p) {
        this.p = p;
        this.entryNotifyHistory = [];
        this.fullNotifyHistory = [];
        this.prefix = '';
        this.binding = new Notifier(this, 'binding');
        this.bound = new Notifier(this, 'bound');
        this.attaching = new Notifier(this, 'attaching');
        this.attached = new Notifier(this, 'attached');
        this.detaching = new Notifier(this, 'detaching');
        this.unbinding = new Notifier(this, 'unbinding');
        this.canLoad = new Notifier(this, 'canLoad');
        this.load = new Notifier(this, 'load');
        this.canUnload = new Notifier(this, 'canUnload');
        this.unload = new Notifier(this, 'unload');
        this.dispose = new Notifier(this, 'dispose');
    }
    enter(vm, tracker) {
        const label = `${this.prefix}.${vm.name}.${tracker.name}`;
        this.entryNotifyHistory.push(label);
        this.fullNotifyHistory.push(`${label}.enter`);
    }
    leave(vm, tracker) {
        const label = `${this.prefix}.${vm.name}.${tracker.name}`;
        this.fullNotifyHistory.push(`${label}.leave`);
    }
    tick(vm, tracker, i) {
        const label = `${this.prefix}.${vm.name}.${tracker.name}`;
        this.fullNotifyHistory.push(`${label}.tick(${i})`);
    }
    setPrefix(prefix) {
        this.prefix = prefix;
    }
    $dispose() {
        this.binding.dispose();
        this.bound.dispose();
        this.attaching.dispose();
        this.attached.dispose();
        this.detaching.dispose();
        this.unbinding.dispose();
        this.canLoad.dispose();
        this.load.dispose();
        this.canUnload.dispose();
        this.unload.dispose();
        this.dispose.dispose();
        this.entryNotifyHistory = void 0;
        this.fullNotifyHistory = void 0;
        this.p = void 0;
        this.binding = void 0;
        this.bound = void 0;
        this.attaching = void 0;
        this.attached = void 0;
        this.detaching = void 0;
        this.unbinding = void 0;
        this.canLoad = void 0;
        this.load = void 0;
        this.canUnload = void 0;
        this.unload = void 0;
        this.$dispose = void 0;
    }
};
NotifierManager = __decorate([
    __param(0, IPlatform),
    __metadata("design:paramtypes", [Object])
], NotifierManager);
class DelayedInvoker {
    constructor(mgr, p, name, ticks) {
        this.mgr = mgr;
        this.p = p;
        this.name = name;
        this.ticks = ticks;
    }
    static binding(ticks = 0) { return new DelayedInvokerFactory('binding', ticks); }
    static bound(ticks = 0) { return new DelayedInvokerFactory('bound', ticks); }
    static attaching(ticks = 0) { return new DelayedInvokerFactory('attaching', ticks); }
    static attached(ticks = 0) { return new DelayedInvokerFactory('attached', ticks); }
    static detaching(ticks = 0) { return new DelayedInvokerFactory('detaching', ticks); }
    static unbinding(ticks = 0) { return new DelayedInvokerFactory('unbinding', ticks); }
    static canLoad(ticks = 0) { return new DelayedInvokerFactory('canLoad', ticks); }
    static load(ticks = 0) { return new DelayedInvokerFactory('load', ticks); }
    static canUnload(ticks = 0) { return new DelayedInvokerFactory('canUnload', ticks); }
    static unload(ticks = 0) { return new DelayedInvokerFactory('unload', ticks); }
    static dispose(ticks = 0) { return new DelayedInvokerFactory('dispose', ticks); }
    invoke(vm, cb) {
        if (this.ticks === 0) {
            this.mgr[this.name].enter(vm);
            const value = cb();
            this.mgr[this.name].leave(vm);
            return value;
        }
        else {
            let i = -1;
            let resolve;
            const p = new Promise(r => {
                resolve = r;
            });
            const next = () => {
                if (++i === 0) {
                    this.mgr[this.name].enter(vm);
                }
                else {
                    this.mgr[this.name].tick(vm, i);
                }
                if (i < this.ticks) {
                    void Promise.resolve().then(next);
                }
                else {
                    const value = cb();
                    this.mgr[this.name].leave(vm);
                    resolve(value);
                }
            };
            next();
            return p;
        }
    }
    toString() {
        let str = this.name;
        if (this.ticks !== 0) {
            str = `${str}.${this.ticks}t`;
        }
        return str;
    }
}
function verifyInvocationsEqual(actual, expected) {
    var _a, _b;
    const groupNames = new Set();
    actual.forEach(x => groupNames.add(x.slice(0, x.indexOf('.'))));
    expected.forEach(x => groupNames.add(x.slice(0, x.indexOf('.'))));
    const expectedGroups = {};
    const actualGroups = {};
    for (const groupName of groupNames) {
        expectedGroups[groupName] = expected.filter(x => x.startsWith(`${groupName}.`));
        actualGroups[groupName] = actual.filter(x => x.startsWith(`${groupName}.`));
    }
    const errors = [];
    for (const prefix in expectedGroups) {
        expected = expectedGroups[prefix];
        actual = actualGroups[prefix];
        const len = Math.max(actual.length, expected.length);
        for (let i = 0; i < len; ++i) {
            const $actual = (_a = actual[i]) !== null && _a !== void 0 ? _a : '';
            const $expected = ((_b = expected[i]) !== null && _b !== void 0 ? _b : '').replace(/>$/, '');
            if ($actual === $expected) {
                errors.push(`    OK : ${$actual}`);
            }
            else {
                errors.push(`NOT OK : ${$actual}          (expected: ${$expected})`);
            }
        }
    }
    if (errors.some(e => e.startsWith('N'))) {
        throw new Error(`Failed assertion: invocation mismatch\n  - ${errors.join('\n  - ')})`);
    }
    else {
        // fallback just to make sure there's no bugs in this function causing false positives
        assert.deepStrictEqual(actual, expected);
    }
}
function vp(count) {
    if (count === 1) {
        return `<au-viewport></au-viewport>`;
    }
    let template = '';
    for (let i = 0; i < count; ++i) {
        template = `${template}<au-viewport name="$${i}"></au-viewport>`;
    }
    return template;
}
function* $(prefix, component, ticks, ...calls) {
    if (component instanceof Array) {
        for (const c of component) {
            yield* $(prefix, c, ticks, ...calls);
        }
    }
    else {
        for (const call of calls) {
            if (call === '') {
                if (component.length > 0) {
                    yield '';
                }
            }
            else if (typeof call === 'string') {
                if (component.length > 0) {
                    if (!call.includes('.')) {
                        yield `${prefix}.${component}.${call}.enter`;
                        if (call !== 'dispose') {
                            for (let i = 1; i <= ticks; ++i) {
                                if (i === ticks) {
                                    yield `${prefix}.${component}.${call}.tick(${i})>`;
                                }
                                else {
                                    yield `${prefix}.${component}.${call}.tick(${i})`;
                                }
                            }
                        }
                        yield `${prefix}.${component}.${call}.leave`;
                    }
                    else {
                        yield `${prefix}.${component}.${call}`;
                    }
                }
            }
            else {
                yield* call;
            }
        }
    }
}
function* interleave(...generators) {
    while (generators.length > 0) {
        for (let i = 0, ii = generators.length; i < ii; ++i) {
            const gen = generators[i];
            const next = gen.next();
            if (next.done) {
                generators.splice(i, 1);
                --i;
                --ii;
            }
            else {
                const value = next.value;
                if (value) {
                    if (value.endsWith('>')) {
                        yield value.slice(0, -1);
                        yield gen.next().value;
                    }
                    else if (value.endsWith('dispose.enter')) {
                        yield value;
                        yield gen.next().value;
                    }
                    else {
                        yield value;
                    }
                }
            }
        }
    }
}
async function createFixture(Component, deps, routerOptions, level = 5 /* fatal */) {
    const ctx = TestContext.create();
    const cfg = new NotifierConfig([], 100);
    const { container, platform } = ctx;
    container.register(TestRouterConfiguration.for(level));
    container.register(Registration.instance(INotifierConfig, cfg));
    container.register(RouterConfiguration.customize({ ...routerOptions }));
    container.register(...deps);
    const mgr = container.get(INotifierManager);
    const router = container.get(IRouter);
    const component = container.get(Component);
    const au = new Aurelia(container);
    const host = ctx.createElement('div');
    const logConfig = container.get(ILogConfig);
    au.app({ component, host });
    mgr.setPrefix('start');
    await au.start();
    return {
        ctx,
        container,
        au,
        host,
        mgr,
        component,
        platform,
        router,
        startTracing() {
            logConfig.level = 0 /* trace */;
        },
        stopTracing() {
            logConfig.level = level;
        },
        async tearDown() {
            mgr.setPrefix('stop');
            await au.stop(true);
        },
    };
}
function $forEachRouterOptions(cb) {
    return function () {
        for (const resolutionMode of [
            'dynamic',
            'static',
        ]) {
            describe(`resolution:'${resolutionMode}'`, function () {
                cb({
                    resolutionMode,
                });
            });
        }
    };
}
function forEachRouterOptions(title, cb) {
    describe(title, $forEachRouterOptions(cb));
}
forEachRouterOptions.skip = function (title, cb) {
    // eslint-disable-next-line mocha/no-skipped-tests
    describe.skip(title, $forEachRouterOptions(cb));
};
forEachRouterOptions.only = function (title, cb) {
    // eslint-disable-next-line mocha/no-exclusive-tests
    describe.only(title, $forEachRouterOptions(cb));
};
describe('router hooks', function () {
    forEachRouterOptions('monomorphic timings', function (opts) {
        for (const ticks of [
            0,
            1,
        ]) {
            const hookSpec = HookSpecs.create(ticks);
            let A01 = class A01 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A01 = __decorate([
                customElement({ name: 'a01', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A01);
            let A02 = class A02 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A02 = __decorate([
                customElement({ name: 'a02', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A02);
            let A03 = class A03 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A03 = __decorate([
                customElement({ name: 'a03', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A03);
            let A04 = class A04 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A04 = __decorate([
                customElement({ name: 'a04', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A04);
            const A0 = [A01, A02, A03, A04];
            let Root1 = 
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Root1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root1 = __decorate([
                customElement({ name: 'root1', template: vp(1) })
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                ,
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root1);
            let A11 = class A11 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A11 = __decorate([
                customElement({ name: 'a11', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A11);
            let A12 = class A12 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A12 = __decorate([
                customElement({ name: 'a12', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A12);
            let A13 = class A13 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A13 = __decorate([
                customElement({ name: 'a13', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A13);
            let A14 = class A14 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A14 = __decorate([
                customElement({ name: 'a14', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A14);
            const A1 = [A11, A12, A13, A14];
            let Root2 = class Root2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root2 = __decorate([
                route({
                    routes: [
                        { path: 'a01', component: A01 },
                        { path: 'a02', component: A02 },
                        { path: 'a03', component: A03 },
                        { path: 'a04', component: A04 },
                    ]
                }),
                customElement({ name: 'root2', template: vp(2) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root2);
            let A21 = class A21 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A21 = __decorate([
                customElement({ name: 'a21', template: vp(2) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A21);
            let A22 = class A22 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            A22 = __decorate([
                customElement({ name: 'a22', template: vp(2) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], A22);
            const A2 = [A21, A22];
            const A = [...A0, ...A1, ...A2];
            describe(`ticks: ${ticks}`, function () {
                describe('single', function () {
                    for (const spec of [
                        { t1: 'a01', t2: 'a02', t3: 'a01', t4: 'a02' },
                        { t1: 'a01', t2: 'a02', t3: 'a03', t4: 'a01' },
                        { t1: 'a01', t2: 'a02', t3: 'a01', t4: 'a04' },
                    ]) {
                        const { t1, t2, t3, t4 } = spec;
                        it(`'${t1}' -> '${t2}' -> '${t3}' -> '${t4}'`, async function () {
                            const { router, mgr, tearDown } = await createFixture(Root2, A, opts);
                            const phase1 = `('' -> '${t1}')#1`;
                            const phase2 = `('${t1}' -> '${t2}')#2`;
                            const phase3 = `('${t2}' -> '${t3}')#3`;
                            const phase4 = `('${t3}' -> '${t4}')#4`;
                            mgr.setPrefix(phase1);
                            await router.load(t1);
                            mgr.setPrefix(phase2);
                            await router.load(t2);
                            mgr.setPrefix(phase3);
                            await router.load(t3);
                            mgr.setPrefix(phase4);
                            await router.load(t4);
                            await tearDown();
                            const expected = [...(function* () {
                                    switch (ticks) {
                                        case 0:
                                            yield* $('start', 'root2', ticks, 'binding', 'bound', 'attaching', 'attached');
                                            yield* $(phase1, t1, ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                            for (const [phase, { $t1, $t2 }] of [
                                                [phase2, { $t1: t1, $t2: t2 }],
                                                [phase3, { $t1: t2, $t2: t3 }],
                                                [phase4, { $t1: t3, $t2: t4 }],
                                            ]) {
                                                yield* $(phase, $t1, ticks, 'canUnload');
                                                yield* $(phase, $t2, ticks, 'canLoad');
                                                yield* $(phase, $t1, ticks, 'unload');
                                                yield* $(phase, $t2, ticks, 'load');
                                                yield* $(phase, $t1, ticks, 'detaching', 'unbinding', 'dispose');
                                                yield* $(phase, $t2, ticks, 'binding', 'bound', 'attaching', 'attached');
                                            }
                                            yield* $('stop', [t4, 'root2'], ticks, 'detaching');
                                            yield* $('stop', [t4, 'root2'], ticks, 'unbinding');
                                            yield* $('stop', ['root2', t4], ticks, 'dispose');
                                            break;
                                        case 1:
                                            yield* $('start', 'root2', ticks, 'binding', 'bound', 'attaching', 'attached');
                                            yield* $(phase1, t1, ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                            for (const [phase, { $t1, $t2 }] of [
                                                [phase2, { $t1: t1, $t2: t2 }],
                                                [phase3, { $t1: t2, $t2: t3 }],
                                                [phase4, { $t1: t3, $t2: t4 }],
                                            ]) {
                                                yield* $(phase, $t1, ticks, 'canUnload');
                                                yield* $(phase, $t2, ticks, 'canLoad');
                                                yield* $(phase, $t1, ticks, 'unload');
                                                yield* $(phase, $t2, ticks, 'load');
                                                yield* $(phase, $t1, ticks, 'detaching', 'unbinding', 'dispose');
                                                yield* $(phase, $t2, ticks, 'binding', 'bound', 'attaching', 'attached');
                                            }
                                            yield* interleave($('stop', t4, ticks, 'detaching', 'unbinding'), $('stop', 'root2', ticks, 'detaching', 'unbinding'));
                                            yield* $('stop', 'root2', ticks, 'dispose');
                                            yield* $('stop', t4, ticks, 'dispose');
                                            break;
                                    }
                                })()];
                            verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                            mgr.$dispose();
                        });
                    }
                });
                describe('siblings', function () {
                    for (const { t1, t2 } of [
                        // Only $0 changes with every nav
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a03', vp1: 'a02' } },
                        { t1: { vp0: '', vp1: 'a02' }, t2: { vp0: 'a03', vp1: 'a02' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: '', vp1: 'a02' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a02', vp1: 'a02' } },
                        { t1: { vp0: '', vp1: 'a02' }, t2: { vp0: 'a02', vp1: 'a02' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: '', vp1: 'a02' } },
                        { t1: { vp0: 'a02', vp1: 'a02' }, t2: { vp0: 'a01', vp1: 'a02' } },
                        { t1: { vp0: '', vp1: 'a02' }, t2: { vp0: 'a01', vp1: 'a02' } },
                        { t1: { vp0: 'a02', vp1: 'a02' }, t2: { vp0: '', vp1: 'a02' } },
                        // Only $1 changes with every nav
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a01', vp1: 'a03' } },
                        { t1: { vp0: 'a01', vp1: '' }, t2: { vp0: 'a01', vp1: 'a03' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a01', vp1: '' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a01', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: '' }, t2: { vp0: 'a01', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a01', vp1: '' } },
                        { t1: { vp0: 'a01', vp1: 'a01' }, t2: { vp0: 'a01', vp1: 'a02' } },
                        { t1: { vp0: 'a01', vp1: '' }, t2: { vp0: 'a01', vp1: 'a02' } },
                        { t1: { vp0: 'a01', vp1: 'a01' }, t2: { vp0: 'a01', vp1: '' } },
                        // Both $0 and $1 change with every nav
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a03', vp1: 'a04' } },
                        { t1: { vp0: '', vp1: 'a02' }, t2: { vp0: 'a03', vp1: 'a04' } },
                        { t1: { vp0: 'a01', vp1: '' }, t2: { vp0: 'a03', vp1: 'a04' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: '', vp1: 'a04' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a03', vp1: '' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a02', vp1: 'a01' } },
                        { t1: { vp0: '', vp1: 'a02' }, t2: { vp0: 'a02', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: '' }, t2: { vp0: 'a02', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: '', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a02', vp1: '' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a04', vp1: 'a01' } },
                        { t1: { vp0: '', vp1: 'a02' }, t2: { vp0: 'a04', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: '' }, t2: { vp0: 'a04', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: '', vp1: 'a01' } },
                        { t1: { vp0: 'a01', vp1: 'a02' }, t2: { vp0: 'a04', vp1: '' } },
                    ]) {
                        const instr1 = join('+', `${t1.vp0}@$0`, `${t1.vp1}@$1`);
                        const instr2 = join('+', `${t2.vp0}@$0`, `${t2.vp1}@$1`);
                        it(`${instr1}' -> '${instr2}' -> '${instr1}' -> '${instr2}'`, async function () {
                            const { router, mgr, tearDown } = await createFixture(Root2, A, opts);
                            const phase1 = `('' -> '${instr1}')#1`;
                            const phase2 = `('${instr1}' -> '${instr2}')#2`;
                            const phase3 = `('${instr2}' -> '${instr1}')#3`;
                            const phase4 = `('${instr1}' -> '${instr2}')#4`;
                            mgr.setPrefix(phase1);
                            await router.load(instr1);
                            mgr.setPrefix(phase2);
                            await router.load(instr2);
                            mgr.setPrefix(phase3);
                            await router.load(instr1);
                            mgr.setPrefix(phase4);
                            await router.load(instr2);
                            await tearDown();
                            const expected = [...(function* () {
                                    switch (ticks) {
                                        case 0:
                                            yield* $('start', 'root2', ticks, 'binding', 'bound', 'attaching', 'attached');
                                            yield* $(phase1, [t1.vp0, t1.vp1], ticks, 'canLoad');
                                            yield* $(phase1, [t1.vp0, t1.vp1], ticks, 'load');
                                            yield* $(phase1, [t1.vp0, t1.vp1], ticks, 'binding', 'bound', 'attaching', 'attached');
                                            for (const [phase, { $t1, $t2 }] of [
                                                [phase2, { $t1: t1, $t2: t2 }],
                                                [phase3, { $t1: t2, $t2: t1 }],
                                                [phase4, { $t1: t1, $t2: t2 }],
                                            ]) {
                                                if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t1.vp0, ticks, 'canUnload');
                                                }
                                                if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t1.vp1, ticks, 'canUnload');
                                                }
                                                if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t2.vp0, ticks, 'canLoad');
                                                }
                                                if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t2.vp1, ticks, 'canLoad');
                                                }
                                                if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t1.vp0, ticks, 'unload');
                                                }
                                                if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t1.vp1, ticks, 'unload');
                                                }
                                                if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t2.vp0, ticks, 'load');
                                                }
                                                if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t2.vp1, ticks, 'load');
                                                }
                                                if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t1.vp0, ticks, 'detaching', 'unbinding', 'dispose');
                                                }
                                                if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t2.vp0, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                }
                                                if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t1.vp1, ticks, 'detaching', 'unbinding', 'dispose');
                                                }
                                                if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t2.vp1, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                }
                                            }
                                            yield* $('stop', [t2.vp0, t2.vp1, 'root2'], ticks, 'detaching');
                                            yield* $('stop', [t2.vp0, t2.vp1, 'root2'], ticks, 'unbinding');
                                            yield* $('stop', ['root2', t2.vp0, t2.vp1], ticks, 'dispose');
                                            break;
                                        case 1:
                                            yield* $('start', 'root2', ticks, 'binding', 'bound', 'attaching', 'attached');
                                            yield* interleave($(phase1, t1.vp0, ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'), $(phase1, t1.vp1, ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'));
                                            for (const [phase, { $t1, $t2 }] of [
                                                [phase2, { $t1: t1, $t2: t2 }],
                                                [phase3, { $t1: t2, $t2: t1 }],
                                                [phase4, { $t1: t1, $t2: t2 }],
                                            ]) {
                                                yield* interleave((function* () { if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t1.vp0, ticks, 'canUnload');
                                                } })(), (function* () { if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t1.vp1, ticks, 'canUnload');
                                                } })());
                                                yield* interleave((function* () { if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t2.vp0, ticks, 'canLoad');
                                                } })(), (function* () { if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t2.vp1, ticks, 'canLoad');
                                                } })());
                                                yield* interleave((function* () { if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t1.vp0, ticks, 'unload');
                                                } })(), (function* () { if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t1.vp1, ticks, 'unload');
                                                } })());
                                                yield* interleave((function* () { if ($t1.vp0 !== $t2.vp0) {
                                                    yield* $(phase, $t2.vp0, ticks, 'load');
                                                } })(), (function* () { if ($t1.vp1 !== $t2.vp1) {
                                                    yield* $(phase, $t2.vp1, ticks, 'load');
                                                } })());
                                                yield* interleave((function* () {
                                                    if ($t1.vp0 !== $t2.vp0) {
                                                        yield* $(phase, $t1.vp0, ticks, 'detaching', 'unbinding', 'dispose');
                                                    }
                                                    if ($t1.vp0 !== $t2.vp0) {
                                                        yield* $(phase, $t2.vp0, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                    }
                                                })(), (function* () {
                                                    if ($t1.vp1 !== $t2.vp1) {
                                                        yield* $(phase, $t1.vp1, ticks, 'detaching', 'unbinding', 'dispose');
                                                    }
                                                    if ($t1.vp1 !== $t2.vp1) {
                                                        yield* $(phase, $t2.vp1, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                    }
                                                })());
                                            }
                                            yield* interleave($('stop', t2.vp0, ticks, 'detaching', 'unbinding'), $('stop', t2.vp1, ticks, 'detaching', 'unbinding'), $('stop', 'root2', ticks, 'detaching', 'unbinding'));
                                            yield* $('stop', ['root2', t2.vp0, t2.vp1], ticks, 'dispose');
                                            break;
                                    }
                                })()];
                            verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                            mgr.$dispose();
                        });
                    }
                });
                describe('parent-child', function () {
                    let PcA01 = class PcA01 extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcA01 = __decorate([
                        customElement({ name: 'a01', template: null }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcA01);
                    let PcA02 = class PcA02 extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcA02 = __decorate([
                        customElement({ name: 'a02', template: null }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcA02);
                    let PcA12 = class PcA12 extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcA12 = __decorate([
                        route({
                            routes: [
                                { path: 'a02', component: PcA02 },
                            ]
                        }),
                        customElement({ name: 'a12', template: vp(1) }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcA12);
                    let PcA11 = class PcA11 extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcA11 = __decorate([
                        route({
                            routes: [
                                { path: 'a01', component: PcA01 },
                                { path: 'a02', component: PcA02 },
                                { path: 'a12', component: PcA12 },
                            ]
                        }),
                        customElement({ name: 'a11', template: vp(1) }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcA11);
                    let PcA14 = class PcA14 extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcA14 = __decorate([
                        customElement({ name: 'a14', template: vp(1) }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcA14);
                    let PcA13 = class PcA13 extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcA13 = __decorate([
                        route({
                            routes: [
                                { path: 'a11', component: PcA11 },
                                { path: 'a12', component: PcA12 },
                                { path: 'a14', component: PcA14 },
                            ]
                        }),
                        customElement({ name: 'a13', template: vp(1) }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcA13);
                    let PcRoot = class PcRoot extends TestVM {
                        constructor(mgr, p) { super(mgr, p, hookSpec); }
                    };
                    PcRoot = __decorate([
                        route({
                            routes: [
                                { path: 'a11', component: PcA11 },
                                { path: 'a12', component: PcA12 },
                                { path: 'a13', component: PcA13 },
                            ]
                        }),
                        customElement({ name: 'root2', template: vp(2) }),
                        __param(0, INotifierManager),
                        __param(1, IPlatform),
                        __metadata("design:paramtypes", [Object, Object])
                    ], PcRoot);
                    const deps = [PcA01, PcA02, PcA11, PcA12, PcA13, PcA14];
                    for (const { t1, t2 } of [
                        // Only parent changes with every nav
                        { t1: { p: 'a11', c: 'a12' }, t2: { p: 'a13', c: 'a12' } },
                        // the following routes self reference components as child. do we want to support this as configured route? TODO(sayan).
                        // { t1: { p: 'a11', c: 'a12' }, t2: { p: 'a12', c: 'a12' } },
                        // { t1: { p: 'a12', c: 'a12' }, t2: { p: 'a11', c: 'a12' } },
                        // Only child changes with every nav
                        { t1: { p: 'a11', c: 'a01' }, t2: { p: 'a11', c: 'a02' } },
                        { t1: { p: 'a11', c: '' }, t2: { p: 'a11', c: 'a02' } },
                        { t1: { p: 'a11', c: 'a01' }, t2: { p: 'a11', c: '' } },
                        // the following routes self reference components as child. do we want to support this as configured route? TODO(sayan).
                        // { t1: { p: 'a11', c: 'a11' }, t2: { p: 'a11', c: 'a02' } },
                        // { t1: { p: 'a11', c: 'a11' }, t2: { p: 'a11', c: ''    } },
                        // { t1: { p: 'a11', c: 'a01' }, t2: { p: 'a11', c: 'a11' } },
                        // { t1: { p: 'a11', c: ''    }, t2: { p: 'a11', c: 'a11' } },
                        // Both parent and child change with every nav
                        { t1: { p: 'a11', c: 'a01' }, t2: { p: 'a12', c: 'a02' } },
                        { t1: { p: 'a11', c: '' }, t2: { p: 'a12', c: 'a02' } },
                        { t1: { p: 'a11', c: 'a01' }, t2: { p: 'a12', c: '' } },
                        // the following routes self reference components as child. do we want to support this as configured route? TODO(sayan).
                        // { t1: { p: 'a11', c: 'a11' }, t2: { p: 'a12', c: 'a02' } },
                        // { t1: { p: 'a11', c: 'a11' }, t2: { p: 'a12', c: 'a12' } },
                        // { t1: { p: 'a11', c: 'a11' }, t2: { p: 'a12', c: ''    } },
                        // { t1: { p: 'a12', c: 'a02' }, t2: { p: 'a11', c: 'a11' } },
                        // { t1: { p: 'a12', c: 'a12' }, t2: { p: 'a11', c: 'a11' } },
                        // { t1: { p: 'a12', c: ''    }, t2: { p: 'a11', c: 'a11' } },
                        { t1: { p: 'a11', c: 'a12' }, t2: { p: 'a13', c: 'a14' } },
                        { t1: { p: 'a11', c: 'a12' }, t2: { p: 'a13', c: 'a11' } },
                        { t1: { p: 'a13', c: 'a14' }, t2: { p: 'a11', c: 'a12' } },
                        { t1: { p: 'a13', c: 'a11' }, t2: { p: 'a11', c: 'a12' } },
                    ]) {
                        const instr1 = join('/', t1.p, t1.c);
                        const instr2 = join('/', t2.p, t2.c);
                        it(`${instr1}' -> '${instr2}' -> '${instr1}' -> '${instr2}'`, async function () {
                            const { router, mgr, tearDown } = await createFixture(PcRoot, deps, opts);
                            const phase1 = `('' -> '${instr1}')#1`;
                            const phase2 = `('${instr1}' -> '${instr2}')#2`;
                            const phase3 = `('${instr2}' -> '${instr1}')#3`;
                            const phase4 = `('${instr1}' -> '${instr2}')#4`;
                            mgr.setPrefix(phase1);
                            await router.load(instr1);
                            mgr.setPrefix(phase2);
                            await router.load(instr2);
                            mgr.setPrefix(phase3);
                            await router.load(instr1);
                            mgr.setPrefix(phase4);
                            await router.load(instr2);
                            await tearDown();
                            const expected = [...(function* () {
                                    switch (ticks) {
                                        case 0:
                                            yield* $('start', 'root2', ticks, 'binding', 'bound', 'attaching', 'attached');
                                            switch (opts.resolutionMode) {
                                                case 'dynamic':
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                                    break;
                                                case 'static':
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'canLoad');
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'load');
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'binding', 'bound', 'attaching');
                                                    yield* $(phase1, [t1.c, t1.p], ticks, 'attached');
                                                    break;
                                            }
                                            for (const [phase, { $t1, $t2 }] of [
                                                [phase2, { $t1: t1, $t2: t2 }],
                                                [phase3, { $t1: t2, $t2: t1 }],
                                                [phase4, { $t1: t1, $t2: t2 }],
                                            ]) {
                                                // When parents are equal, this becomes like an ordinary single component transition
                                                if ($t1.p === $t2.p) {
                                                    yield* $(phase, $t1.c, ticks, 'canUnload');
                                                    yield* $(phase, $t2.c, ticks, 'canLoad');
                                                    yield* $(phase, $t1.c, ticks, 'unload');
                                                    yield* $(phase, $t2.c, ticks, 'load');
                                                    yield* $(phase, $t1.c, ticks, 'detaching', 'unbinding', 'dispose');
                                                    yield* $(phase, $t2.c, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                }
                                                else {
                                                    yield* $(phase, [$t1.c, $t1.p], ticks, 'canUnload');
                                                    yield* $(phase, $t2.p, ticks, 'canLoad');
                                                    switch (opts.resolutionMode) {
                                                        case 'dynamic':
                                                            yield* $(phase, [$t1.c, $t1.p], ticks, 'unload');
                                                            yield* $(phase, $t2.p, ticks, 'load');
                                                            break;
                                                        case 'static':
                                                            yield* $(phase, $t2.c, ticks, 'canLoad');
                                                            yield* $(phase, [$t1.c, $t1.p], ticks, 'unload');
                                                            yield* $(phase, [$t2.p, $t2.c], ticks, 'load');
                                                            break;
                                                    }
                                                    yield* $(phase, [$t1.c, $t1.p], ticks, 'detaching');
                                                    yield* $(phase, [$t1.c, $t1.p], ticks, 'unbinding');
                                                    yield* $(phase, [$t1.p, $t1.c], ticks, 'dispose');
                                                    yield* $(phase, $t2.p, ticks, 'binding', 'bound', 'attaching');
                                                    switch (opts.resolutionMode) {
                                                        case 'dynamic':
                                                            yield* $(phase, $t2.p, ticks, 'attached');
                                                            yield* $(phase, $t2.c, ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                                            break;
                                                        case 'static':
                                                            yield* $(phase, $t2.c, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                            yield* $(phase, $t2.p, ticks, 'attached');
                                                            break;
                                                    }
                                                }
                                            }
                                            yield* $('stop', [t2.c, t2.p, 'root2'], ticks, 'detaching');
                                            yield* $('stop', [t2.c, t2.p, 'root2'], ticks, 'unbinding');
                                            yield* $('stop', ['root2', t2.p, t2.c], ticks, 'dispose');
                                            break;
                                        case 1:
                                            yield* $('start', 'root2', ticks, 'binding', 'bound', 'attaching', 'attached');
                                            switch (opts.resolutionMode) {
                                                case 'dynamic':
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                                    break;
                                                case 'static':
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'canLoad');
                                                    yield* $(phase1, [t1.p, t1.c], ticks, 'load');
                                                    yield* $(phase1, t1.p, ticks, 'binding', 'bound');
                                                    yield* interleave($(phase1, t1.p, ticks, 'attaching'), $(phase1, t1.c, ticks, 'binding', 'bound', 'attaching', 'attached'));
                                                    yield* $(phase1, t1.p, ticks, 'attached');
                                                    break;
                                            }
                                            for (const [phase, { $t1, $t2 }] of [
                                                [phase2, { $t1: t1, $t2: t2 }],
                                                [phase3, { $t1: t2, $t2: t1 }],
                                                [phase4, { $t1: t1, $t2: t2 }],
                                            ]) {
                                                // When parents are equal, this becomes like an ordinary single component transition
                                                if ($t1.p === $t2.p) {
                                                    yield* $(phase, $t1.c, ticks, 'canUnload');
                                                    yield* $(phase, $t2.c, ticks, 'canLoad');
                                                    yield* $(phase, $t1.c, ticks, 'unload');
                                                    yield* $(phase, $t2.c, ticks, 'load');
                                                    yield* $(phase, $t1.c, ticks, 'detaching', 'unbinding', 'dispose');
                                                    yield* $(phase, $t2.c, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                }
                                                else {
                                                    yield* $(phase, [$t1.c, $t1.p], ticks, 'canUnload');
                                                    yield* $(phase, $t2.p, ticks, 'canLoad');
                                                    switch (opts.resolutionMode) {
                                                        case 'dynamic':
                                                            yield* $(phase, [$t1.c, $t1.p], ticks, 'unload');
                                                            yield* $(phase, $t2.p, ticks, 'load');
                                                            break;
                                                        case 'static':
                                                            yield* $(phase, $t2.c, ticks, 'canLoad');
                                                            yield* $(phase, [$t1.c, $t1.p], ticks, 'unload');
                                                            yield* $(phase, [$t2.p, $t2.c], ticks, 'load');
                                                            break;
                                                    }
                                                    yield* interleave($(phase, $t1.c, ticks, 'detaching', 'unbinding'), $(phase, $t1.p, ticks, 'detaching', 'unbinding'));
                                                    yield* $(phase, [$t1.p, $t1.c], ticks, 'dispose');
                                                    switch (opts.resolutionMode) {
                                                        case 'dynamic':
                                                            yield* $(phase, $t2.p, ticks, 'binding', 'bound', 'attaching', 'attached');
                                                            yield* $(phase, $t2.c, ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                                            break;
                                                        case 'static':
                                                            yield* $(phase, $t2.p, ticks, 'binding', 'bound');
                                                            yield* interleave($(phase, $t2.p, ticks, 'attaching'), $(phase, $t2.c, ticks, 'binding', 'bound', 'attaching', 'attached'));
                                                            yield* $(phase, $t2.p, ticks, 'attached');
                                                            break;
                                                    }
                                                }
                                            }
                                            yield* interleave($('stop', t2.c, ticks, 'detaching', 'unbinding'), $('stop', t2.p, ticks, 'detaching', 'unbinding'), $('stop', 'root2', ticks, 'detaching', 'unbinding'));
                                            yield* $('stop', ['root2', t2.p, t2.c], ticks, 'dispose');
                                            break;
                                    }
                                })()];
                            verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                            mgr.$dispose();
                        });
                    }
                });
            });
        }
    });
    forEachRouterOptions('parent-child timings', function (opts) {
        for (const hookSpec of [
            HookSpecs.create(0, {
                canUnload: DelayedInvoker.canUnload(1),
            }),
            HookSpecs.create(0, {
                unload: DelayedInvoker.unload(1),
            }),
            HookSpecs.create(0, {
                canLoad: DelayedInvoker.canLoad(1),
            }),
            HookSpecs.create(0, {
                load: DelayedInvoker.load(1),
            }),
            HookSpecs.create(0, {
                binding: DelayedInvoker.binding(1),
            }),
            HookSpecs.create(0, {
                bound: DelayedInvoker.bound(1),
            }),
            HookSpecs.create(0, {
                attaching: DelayedInvoker.attaching(1),
            }),
            HookSpecs.create(0, {
                attached: DelayedInvoker.attached(1),
            }),
            HookSpecs.create(0, {
                detaching: DelayedInvoker.detaching(1),
            }),
            HookSpecs.create(0, {
                unbinding: DelayedInvoker.unbinding(1),
            }),
        ]) {
            it(`'a/b/c/d' -> 'a' (c.hookSpec:${hookSpec})`, async function () {
                let D = class D extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                D = __decorate([
                    customElement({ name: 'd', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], D);
                let C = class C extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                C = __decorate([
                    route({ routes: [{ path: 'd', component: D }] }),
                    customElement({ name: 'c', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], C);
                let B = class B extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                B = __decorate([
                    route({ routes: [{ path: 'c', component: C }] }),
                    customElement({ name: 'b', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], B);
                let A = class A extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                A = __decorate([
                    route({ routes: [{ path: 'b', component: B }] }),
                    customElement({ name: 'a', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                Root = __decorate([
                    route({ routes: [{ path: 'a', component: A }] }),
                    customElement({ name: 'root', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [A, B, C, D], opts);
                const phase1 = `('' -> 'a/b/c/d')`;
                mgr.setPrefix(phase1);
                await router.load('a/b/c/d');
                const phase2 = `('a/b/c/d' -> 'a')`;
                mgr.setPrefix(phase2);
                await router.load('a');
                await tearDown();
                const expected = [...(function* () {
                        yield* $('start', 'root', 0, 'binding', 'bound', 'attaching', 'attached');
                        const hookName = hookSpec.toString().slice(0, -3);
                        switch (opts.resolutionMode) {
                            case 'dynamic':
                                yield* $(phase1, ['a', 'b'], 0, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                switch (hookName) {
                                    case 'canLoad':
                                        yield* $(phase1, 'c', 1, 'canLoad');
                                        yield* $(phase1, 'c', 0, 'load', 'binding', 'bound', 'attaching', 'attached');
                                        break;
                                    case 'load':
                                        yield* $(phase1, 'c', 0, 'canLoad');
                                        yield* $(phase1, 'c', 1, 'load');
                                        yield* $(phase1, 'c', 0, 'binding', 'bound', 'attaching', 'attached');
                                        break;
                                    case 'binding':
                                        yield* $(phase1, 'c', 0, 'canLoad', 'load');
                                        yield* $(phase1, 'c', 1, 'binding');
                                        yield* $(phase1, 'c', 0, 'bound', 'attaching', 'attached');
                                        break;
                                    case 'bound':
                                        yield* $(phase1, 'c', 0, 'canLoad', 'load', 'binding');
                                        yield* $(phase1, 'c', 1, 'bound');
                                        yield* $(phase1, 'c', 0, 'attaching', 'attached');
                                        break;
                                    case 'attaching':
                                        yield* $(phase1, 'c', 0, 'canLoad', 'load', 'binding', 'bound');
                                        yield* $(phase1, 'c', 1, 'attaching');
                                        yield* $(phase1, 'c', 0, 'attached');
                                        break;
                                    case 'attached':
                                        yield* $(phase1, 'c', 0, 'canLoad', 'load', 'binding', 'bound', 'attaching');
                                        yield* $(phase1, 'c', 1, 'attached');
                                        break;
                                    default:
                                        yield* $(phase1, 'c', 0, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                        break;
                                }
                                yield* $(phase1, 'd', 0, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached');
                                break;
                            case 'static':
                                switch (hookName) {
                                    case 'canLoad':
                                        yield* $(phase1, ['a', 'b'], 0, 'canLoad');
                                        yield* $(phase1, 'c', 1, 'canLoad');
                                        yield* $(phase1, 'd', 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'load');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, ['d', 'c', 'b', 'a'], 0, 'attached');
                                        break;
                                    case 'load':
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b'], 0, 'load');
                                        yield* $(phase1, 'c', 1, 'load');
                                        yield* $(phase1, 'd', 0, 'load');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, ['d', 'c', 'b', 'a'], 0, 'attached');
                                        break;
                                    case 'binding':
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'load');
                                        yield* $(phase1, ['a', 'b'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, 'c', 1, 'binding');
                                        yield* $(phase1, 'c', 0, 'bound', 'attaching');
                                        yield* $(phase1, 'd', 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, ['d', 'c', 'b', 'a'], 0, 'attached');
                                        break;
                                    case 'bound':
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'load');
                                        yield* $(phase1, ['a', 'b'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, 'c', 0, 'binding');
                                        yield* $(phase1, 'c', 1, 'bound');
                                        yield* $(phase1, 'c', 0, 'attaching');
                                        yield* $(phase1, 'd', 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, ['d', 'c', 'b', 'a'], 0, 'attached');
                                        break;
                                    case 'attaching':
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'load');
                                        yield* $(phase1, ['a', 'b'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, 'c', 0, 'binding', 'bound');
                                        yield* $(phase1, 'c', 0, 'attaching.enter');
                                        yield* $(phase1, 'd', 0, 'binding', 'bound', 'attaching', 'attached');
                                        yield* $(phase1, 'c', 0, 'attaching.tick(1)');
                                        yield* $(phase1, 'c', 0, 'attaching.leave');
                                        yield* $(phase1, ['c', 'b', 'a'], 0, 'attached');
                                        break;
                                    case 'attached':
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'load');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, 'd', 0, 'attached');
                                        yield* $(phase1, 'c', 1, 'attached');
                                        yield* $(phase1, ['b', 'a'], 0, 'attached');
                                        break;
                                    default:
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'canLoad');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'load');
                                        yield* $(phase1, ['a', 'b', 'c', 'd'], 0, 'binding', 'bound', 'attaching');
                                        yield* $(phase1, ['d', 'c', 'b', 'a'], 0, 'attached');
                                        break;
                                }
                                break;
                        }
                        switch (hookName) {
                            case 'canUnload':
                                yield* $(phase2, 'd', 0, 'canUnload');
                                yield* $(phase2, 'c', 1, 'canUnload');
                                yield* $(phase2, 'b', 0, 'canUnload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'detaching');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unbinding');
                                break;
                            case 'unload':
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'canUnload');
                                yield* $(phase2, 'd', 0, 'unload');
                                yield* $(phase2, 'c', 1, 'unload');
                                yield* $(phase2, 'b', 0, 'unload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'detaching');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unbinding');
                                break;
                            case 'detaching':
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'canUnload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unload');
                                yield* $(phase2, 'd', 0, 'detaching');
                                yield* $(phase2, 'c', 0, 'detaching.enter');
                                yield* $(phase2, 'b', 0, 'detaching');
                                yield* $(phase2, 'c', 0, 'detaching.tick(1)');
                                yield* $(phase2, 'c', 0, 'detaching.leave');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unbinding');
                                break;
                            case 'unbinding':
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'canUnload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'detaching');
                                yield* $(phase2, 'd', 0, 'unbinding');
                                yield* $(phase2, 'c', 0, 'unbinding.enter');
                                yield* $(phase2, 'b', 0, 'unbinding');
                                yield* $(phase2, 'c', 0, 'unbinding.tick(1)');
                                yield* $(phase2, 'c', 0, 'unbinding.leave');
                                break;
                            default:
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'canUnload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unload');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'detaching');
                                yield* $(phase2, ['d', 'c', 'b'], 0, 'unbinding');
                                break;
                        }
                        yield* $(phase2, ['b', 'c', 'd'], 0, 'dispose');
                        yield* $('stop', ['a', 'root'], 0, 'detaching');
                        yield* $('stop', ['a', 'root'], 0, 'unbinding');
                        yield* $('stop', ['root', 'a'], 0, 'dispose');
                    })()];
                verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                mgr.$dispose();
            });
        }
    });
    forEachRouterOptions('single incoming sibling transition', function (opts) {
        for (const [aCanLoad, bCanLoad, aLoad, bLoad] of [
            [1, 1, 1, 2],
            [1, 1, 1, 3],
            [1, 1, 1, 4],
            [1, 1, 1, 5],
            [1, 1, 1, 6],
            [1, 1, 1, 7],
            [1, 1, 1, 8],
            [1, 1, 1, 9],
            [1, 1, 1, 10],
            [1, 1, 2, 1],
            [1, 1, 3, 1],
            [1, 1, 4, 1],
            [1, 1, 5, 1],
            [1, 1, 6, 1],
            [1, 1, 7, 1],
            [1, 1, 8, 1],
            [1, 1, 9, 1],
            [1, 1, 10, 1],
            [1, 5, 1, 2],
            [1, 5, 1, 10],
            [1, 5, 2, 1],
            [1, 5, 10, 1],
            [5, 1, 1, 2],
            [5, 1, 1, 10],
            [5, 1, 2, 1],
            [5, 1, 10, 1],
        ]) {
            const spec = {
                a: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(aCanLoad),
                    load: DelayedInvoker.load(aLoad),
                }),
                b: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(bCanLoad),
                    load: DelayedInvoker.load(bLoad),
                }),
            };
            const title = Object.keys(spec).map(key => `${key}:${spec[key]}`).filter(x => x.length > 2).join(',');
            it(title, async function () {
                const { a, b } = spec;
                let A = class A extends TestVM {
                    constructor(mgr, p) { super(mgr, p, a); }
                };
                A = __decorate([
                    customElement({ name: 'a', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A);
                let B = class B extends TestVM {
                    constructor(mgr, p) { super(mgr, p, b); }
                };
                B = __decorate([
                    customElement({ name: 'b', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], B);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                Root = __decorate([
                    route({
                        routes: [
                            { path: 'a', component: A },
                            { path: 'b', component: B },
                        ]
                    }),
                    customElement({ name: 'root', template: '<au-viewport name="$0"></au-viewport><au-viewport name="$1"></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [A, B], opts);
                const phase1 = `('' -> 'a$0+b$1')`;
                mgr.setPrefix(phase1);
                await router.load('a@$0+b@$1');
                await tearDown();
                const expected = [...(function* () {
                        yield* $(`start`, 'root', 0, 'binding', 'bound', 'attaching', 'attached');
                        yield* interleave($(phase1, 'a', aCanLoad, 'canLoad'), $(phase1, 'b', bCanLoad, 'canLoad'));
                        yield* interleave($(phase1, 'a', aLoad, 'load'), $(phase1, 'b', bLoad, 'load'));
                        yield* interleave($(phase1, 'a', 1, 'binding', 'bound', 'attaching', 'attached'), $(phase1, 'b', 1, 'binding', 'bound', 'attaching', 'attached'));
                        yield* interleave($('stop', 'a', 0, 'detaching.enter'), $('stop', 'b', 0, 'detaching.enter'), $('stop', 'root', 0, 'detaching'));
                        yield* $('stop', ['a', 'b'], 0, 'detaching.tick(1)', 'detaching.leave');
                        yield* interleave($('stop', 'a', 0, 'unbinding.enter'), $('stop', 'b', 0, 'unbinding.enter'), $('stop', 'root', 0, 'unbinding'));
                        yield* $('stop', ['a', 'b'], 0, 'unbinding.tick(1)', 'unbinding.leave');
                        yield* $('stop', ['root', 'a', 'b'], 0, 'dispose');
                    }())];
                verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                mgr.$dispose();
            });
        }
    });
    forEachRouterOptions('single incoming parent-child transition', function (opts) {
        for (const [a1CanLoad, a2CanLoad, a1Load, a2Load] of [
            [1, 5, 1, 5],
            [1, 5, 5, 1],
            [5, 1, 1, 5],
            [5, 1, 5, 1],
        ]) {
            const spec = {
                a1: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(a1CanLoad),
                    load: DelayedInvoker.load(a1Load),
                }),
                a2: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(a2CanLoad),
                    load: DelayedInvoker.load(a2Load),
                }),
            };
            const title = Object.keys(spec).map(key => `${key}:${spec[key]}`).filter(x => x.length > 2).join(',');
            it(title, async function () {
                const { a1, a2 } = spec;
                let A2 = class A2 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, a2); }
                };
                A2 = __decorate([
                    customElement({ name: 'a2', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A2);
                let A1 = class A1 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, a1); }
                };
                A1 = __decorate([
                    route({ routes: [{ path: 'a2', component: A2 }] }),
                    customElement({ name: 'a1', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A1);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                Root = __decorate([
                    route({ routes: [{ path: 'a1', component: A1 }] }),
                    customElement({ name: 'root', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [A1, A2], opts);
                const phase1 = `('' -> 'a1/a2')`;
                mgr.setPrefix(phase1);
                await router.load('a1/a2');
                await tearDown();
                const expected = [...(function* () {
                        yield* $(`start`, 'root', 0, 'binding', 'bound', 'attaching', 'attached');
                        switch (opts.resolutionMode) {
                            case 'dynamic':
                                yield* $(phase1, 'a1', a1CanLoad, 'canLoad');
                                yield* $(phase1, 'a1', a1Load, 'load');
                                yield* $(phase1, 'a1', 1, 'binding', 'bound', 'attaching', 'attached');
                                yield* $(phase1, 'a2', a2CanLoad, 'canLoad');
                                yield* $(phase1, 'a2', a2Load, 'load');
                                yield* $(phase1, 'a2', 1, 'binding', 'bound', 'attaching', 'attached');
                                break;
                            case 'static':
                                yield* $(phase1, 'a1', a1CanLoad, 'canLoad');
                                yield* $(phase1, 'a2', a2CanLoad, 'canLoad');
                                yield* $(phase1, 'a1', a1Load, 'load');
                                yield* $(phase1, 'a2', a2Load, 'load');
                                yield* $(phase1, 'a1', 1, 'binding', 'bound');
                                yield* interleave($(phase1, 'a1', 1, 'attaching'), $(phase1, 'a2', 1, 'binding', 'bound', 'attaching', 'attached'));
                                yield* $(phase1, 'a1', 1, 'attached');
                                break;
                        }
                        yield* $('stop', ['a2', 'a1'], 0, 'detaching.enter');
                        yield* $('stop', 'root', 0, 'detaching');
                        yield* $('stop', ['a2', 'a1'], 0, 'detaching.tick(1)', 'detaching.leave');
                        yield* $('stop', ['a2', 'a1'], 0, 'unbinding.enter');
                        yield* $('stop', 'root', 0, 'unbinding');
                        yield* $('stop', ['a2', 'a1'], 0, 'unbinding.tick(1)', 'unbinding.leave');
                        yield* $('stop', ['root', 'a1', 'a2'], 0, 'dispose');
                    })()];
                verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                mgr.$dispose();
            });
        }
    });
    forEachRouterOptions('single incoming parentsiblings-childsiblings transition', function (opts) {
        for (const [a1CanLoad, a2CanLoad, b1CanLoad, b2CanLoad, a1Load, a2Load, b1Load, b2Load,] of [
            // a1.canLoad
            [
                2, 1, 1, 1,
                1, 1, 1, 1,
            ],
            [
                4, 1, 1, 1,
                1, 1, 1, 1,
            ],
            [
                8, 1, 1, 1,
                1, 1, 1, 1,
            ],
            // b1.canLoad
            [
                1, 1, 2, 1,
                1, 1, 1, 1,
            ],
            [
                1, 1, 4, 1,
                1, 1, 1, 1,
            ],
            [
                1, 1, 8, 1,
                1, 1, 1, 1,
            ],
            // a1.load
            [
                1, 1, 1, 1,
                2, 1, 1, 1,
            ],
            [
                1, 1, 1, 1,
                4, 1, 1, 1,
            ],
            [
                1, 1, 1, 1,
                8, 1, 1, 1,
            ],
            // b1.load
            [
                1, 1, 1, 1,
                1, 1, 2, 1,
            ],
            [
                1, 1, 1, 1,
                1, 1, 4, 1,
            ],
            [
                1, 1, 1, 1,
                1, 1, 8, 1,
            ],
            // a2.canLoad
            [
                1, 2, 1, 1,
                1, 1, 1, 1,
            ],
            [
                1, 4, 1, 1,
                1, 1, 1, 1,
            ],
            [
                1, 8, 1, 1,
                1, 1, 1, 1,
            ],
            // b2.canLoad
            [
                1, 1, 1, 2,
                1, 1, 1, 1,
            ],
            [
                1, 1, 1, 4,
                1, 1, 1, 1,
            ],
            [
                1, 1, 1, 8,
                1, 1, 1, 1,
            ],
            // a2.load
            [
                1, 1, 1, 1,
                1, 2, 1, 1,
            ],
            [
                1, 1, 1, 1,
                1, 4, 1, 1,
            ],
            [
                1, 1, 1, 1,
                1, 8, 1, 1,
            ],
            // b2.load
            [
                1, 1, 1, 1,
                1, 1, 1, 2,
            ],
            [
                1, 1, 1, 1,
                1, 1, 1, 4,
            ],
            [
                1, 1, 1, 1,
                1, 1, 1, 8,
            ],
        ]) {
            const spec = {
                a1: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(a1CanLoad),
                    load: DelayedInvoker.load(a1Load),
                }),
                a2: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(a2CanLoad),
                    load: DelayedInvoker.load(a2Load),
                }),
                b1: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(b1CanLoad),
                    load: DelayedInvoker.load(b1Load),
                }),
                b2: HookSpecs.create(1, {
                    canLoad: DelayedInvoker.canLoad(b2CanLoad),
                    load: DelayedInvoker.load(b2Load),
                }),
            };
            const title = Object.keys(spec).map(key => `${key}:${spec[key]}`).filter(x => x.length > 2).join(',');
            it(title, async function () {
                const { a1, a2, b1, b2 } = spec;
                let A2 = class A2 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, a2); }
                };
                A2 = __decorate([
                    customElement({ name: 'a2', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A2);
                let A1 = class A1 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, a1); }
                };
                A1 = __decorate([
                    route({ routes: [{ path: 'a2', component: A2 }] }),
                    customElement({ name: 'a1', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A1);
                let B2 = class B2 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, b2); }
                };
                B2 = __decorate([
                    customElement({ name: 'b2', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], B2);
                let B1 = class B1 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, b1); }
                };
                B1 = __decorate([
                    route({ routes: [{ path: 'b2', component: B2 }] }),
                    customElement({ name: 'b1', template: '<au-viewport></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], B1);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, HookSpecs.create(0)); }
                };
                Root = __decorate([
                    route({
                        routes: [
                            { path: 'a1', component: A1 },
                            { path: 'b1', component: B1 },
                        ]
                    }),
                    customElement({ name: 'root', template: '<au-viewport name="$0"></au-viewport><au-viewport name="$1"></au-viewport>' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [A1, A2, B1, B2], opts);
                const phase1 = `('' -> 'a1@$0/a2+b1@$1/b2')`;
                mgr.setPrefix(phase1);
                await router.load('a1@$0/a2+b1@$1/b2');
                await tearDown();
                const expected = [...(function* () {
                        yield* $(`start`, 'root', 0, 'binding', 'bound', 'attaching', 'attached');
                        switch (opts.resolutionMode) {
                            case 'dynamic':
                                yield* interleave($(phase1, 'a1', a1CanLoad, 'canLoad'), $(phase1, 'b1', b1CanLoad, 'canLoad'));
                                yield* interleave($(phase1, 'a1', a1Load, 'load'), $(phase1, 'b1', b1Load, 'load'));
                                yield* interleave((function* () {
                                    yield* $(phase1, 'a1', 1, 'binding', 'bound', 'attaching', 'attached');
                                    yield* $(phase1, 'a2', a2CanLoad, 'canLoad');
                                    yield* $(phase1, 'a2', a2Load, 'load');
                                    yield* $(phase1, 'a2', 1, 'binding', 'bound', 'attaching', 'attached');
                                })(), (function* () {
                                    yield* $(phase1, 'b1', 1, 'binding', 'bound', 'attaching', 'attached');
                                    yield* $(phase1, 'b2', b2CanLoad, 'canLoad');
                                    yield* $(phase1, 'b2', b2Load, 'load');
                                    yield* $(phase1, 'b2', 1, 'binding', 'bound', 'attaching', 'attached');
                                })());
                                break;
                            case 'static':
                                yield* interleave((function* () {
                                    yield* $(phase1, 'a1', a1CanLoad, 'canLoad');
                                    yield* $(phase1, 'a2', a2CanLoad, 'canLoad');
                                })(), (function* () {
                                    yield* $(phase1, 'b1', b1CanLoad, 'canLoad');
                                    yield* $(phase1, 'b2', b2CanLoad, 'canLoad');
                                })());
                                yield* interleave((function* () {
                                    yield* $(phase1, 'a1', a1Load, 'load');
                                    yield* $(phase1, 'a2', a2Load, 'load');
                                })(), (function* () {
                                    yield* $(phase1, 'b1', b1Load, 'load');
                                    yield* $(phase1, 'b2', b2Load, 'load');
                                })());
                                yield* interleave($(phase1, 'a1', 1, 'binding', 'bound'), $(phase1, 'b1', 1, 'binding', 'bound'));
                                yield* interleave($(phase1, 'a1', 1, 'attaching'), $(phase1, 'a2', 1, 'binding'), $(phase1, 'b1', 1, 'attaching'), $(phase1, 'b2', 1, 'binding'));
                                yield* interleave($(phase1, 'a2', 1, 'bound', 'attaching', 'attached'), $(phase1, 'b2', 1, 'bound', 'attaching', 'attached'));
                                yield* interleave($(phase1, 'a1', 1, 'attached'), $(phase1, 'b1', 1, 'attached'));
                                break;
                        }
                        yield* interleave($('stop', ['a2', 'b2'], 0, 'detaching.enter'), $('stop', ['a1', 'b1'], 0, 'detaching.enter'));
                        yield* $('stop', 'root', 0, 'detaching');
                        yield* interleave($('stop', ['a2', 'a1', 'b2', 'b1'], 0, 'detaching.tick(1)'), $('stop', ['a2', 'a1', 'b2', 'b1'], 0, 'detaching.leave'));
                        yield* interleave($('stop', ['a2', 'b2'], 0, 'unbinding.enter'), $('stop', ['a1', 'b1'], 0, 'unbinding.enter'));
                        yield* $('stop', 'root', 0, 'unbinding');
                        yield* interleave($('stop', ['a2', 'a1', 'b2', 'b1'], 0, 'unbinding.tick(1)'), $('stop', ['a2', 'a1', 'b2', 'b1'], 0, 'unbinding.leave'));
                        yield* $('stop', ['root', 'a1', 'a2', 'b1', 'b2'], 0, 'dispose');
                    })()];
                verifyInvocationsEqual(mgr.fullNotifyHistory, expected);
                mgr.$dispose();
            });
        }
    });
    const isFirefox = TestContext.create().wnd.navigator.userAgent.includes('Firefox');
    // TODO: make these pass in firefox (firefox for some reason uses different type of stack trace - see https://app.circleci.com/pipelines/github/aurelia/aurelia/7569/workflows/60a7fb9f-e8b0-47e4-b753-eaa9b5da42c2/jobs/64147)
    if (!isFirefox) {
        forEachRouterOptions('error handling', function (opts) {
            function runTest(spec) {
                it(`re-throws ${spec}`, async function () {
                    const components = spec.createCes();
                    let Root = class Root {
                    };
                    Root = __decorate([
                        route({ routes: components.map(component => ({ path: CustomElement.getDefinition(component).name, component })) }),
                        customElement({ name: 'root', template: '<au-viewport></au-viewport>' })
                    ], Root);
                    const { router, tearDown } = await createFixture(Root, components, opts);
                    let err = void 0;
                    try {
                        await spec.action(router);
                    }
                    catch ($err) {
                        err = $err;
                    }
                    if (err === void 0) {
                        assert.fail(`Expected an error, but no error was thrown`);
                    }
                    else {
                        assert.match(err.message, spec.messageMatcher, `Expected message to match (${err.message}) matches Regexp(${spec.messageMatcher})`);
                        assert.match(err.stack, spec.stackMatcher, `Expected stack to match (${err.stack}) matches Regex(${spec.stackMatcher})`);
                    }
                    try {
                        await tearDown();
                    }
                    catch ($err) {
                        if ($err.message.includes('error in')) {
                            // The router should by default "remember" the last error and propagate it once again from the first deactivated viewport
                            // on the next shutdown attempt.
                            // This is the error we expect, so ignore it
                        }
                        else {
                            // Re-throw anything else which would not be an expected error (e.g. "unexpected state" shouldn't happen if the router handled
                            // the last error)
                            throw $err;
                        }
                    }
                });
            }
            for (const hookName of [
                'binding',
                'bound',
                'attaching',
                'attached',
                'canLoad',
                'load',
            ]) {
                runTest({
                    createCes() {
                        return [CustomElement.define({ name: 'a', template: null }, class Target {
                                async [hookName]() {
                                    throw new Error(`error in ${hookName}`);
                                }
                            })];
                    },
                    async action(router) {
                        await router.load('a');
                    },
                    messageMatcher: new RegExp(`error in ${hookName}`),
                    stackMatcher: new RegExp(`Target.${hookName}`),
                    toString() {
                        return String(this.messageMatcher);
                    },
                });
            }
            for (const hookName of [
                'detaching',
                'unbinding',
                'canUnload',
                'unload',
            ]) {
                const throwsInTarget1 = ['canUnload'].includes(hookName);
                runTest({
                    createCes() {
                        const target1 = CustomElement.define({ name: 'a', template: null }, class Target1 {
                            async [hookName]() {
                                throw new Error(`error in ${hookName}`);
                            }
                        });
                        const target2 = CustomElement.define({ name: 'b', template: null }, class Target2 {
                            async binding() { throw new Error(`error in binding`); }
                            async bound() { throw new Error(`error in bound`); }
                            async attaching() { throw new Error(`error in attaching`); }
                            async attached() { throw new Error(`error in attached`); }
                            async canLoad() { throw new Error(`error in canLoad`); }
                            async load() { throw new Error(`error in load`); }
                        });
                        return [target1, target2];
                    },
                    async action(router) {
                        await router.load('a');
                        await router.load('b');
                    },
                    messageMatcher: new RegExp(`error in ${throwsInTarget1 ? hookName : 'canLoad'}`),
                    stackMatcher: new RegExp(`${throwsInTarget1 ? 'Target1' : 'Target2'}.${throwsInTarget1 ? hookName : 'canLoad'}`),
                    toString() {
                        return `${String(this.messageMatcher)} with canLoad,load,binding,bound,attaching`;
                    },
                });
            }
            for (const hookName of [
                'detaching',
                'unbinding',
                'canUnload',
                'unload',
            ]) {
                const throwsInTarget1 = ['canUnload', 'unload'].includes(hookName);
                runTest({
                    createCes() {
                        const target1 = CustomElement.define({ name: 'a', template: null }, class Target1 {
                            async [hookName]() {
                                throw new Error(`error in ${hookName}`);
                            }
                        });
                        const target2 = CustomElement.define({ name: 'b', template: null }, class Target2 {
                            async binding() { throw new Error(`error in binding`); }
                            async bound() { throw new Error(`error in bound`); }
                            async attaching() { throw new Error(`error in attaching`); }
                            async attached() { throw new Error(`error in attached`); }
                            async load() { throw new Error(`error in load`); }
                        });
                        return [target1, target2];
                    },
                    async action(router) {
                        await router.load('a');
                        await router.load('b');
                    },
                    messageMatcher: new RegExp(`error in ${throwsInTarget1 ? hookName : 'load'}`),
                    stackMatcher: new RegExp(`${throwsInTarget1 ? 'Target1' : 'Target2'}.${throwsInTarget1 ? hookName : 'load'}`),
                    toString() {
                        return `${String(this.messageMatcher)} with load,binding,bound,attaching`;
                    },
                });
            }
            for (const hookName of [
                'detaching',
                'unbinding',
            ]) {
                runTest({
                    createCes() {
                        const target1 = CustomElement.define({ name: 'a', template: null }, class Target1 {
                            async [hookName]() {
                                throw new Error(`error in ${hookName}`);
                            }
                        });
                        const target2 = CustomElement.define({ name: 'b', template: null }, class Target2 {
                            async binding() { throw new Error(`error in binding`); }
                            async bound() { throw new Error(`error in bound`); }
                            async attaching() { throw new Error(`error in attaching`); }
                            async attached() { throw new Error(`error in attached`); }
                        });
                        return [target1, target2];
                    },
                    async action(router) {
                        await router.load('a');
                        await router.load('b');
                    },
                    messageMatcher: new RegExp(`error in ${hookName}`),
                    stackMatcher: new RegExp(`Target1.${hookName}`),
                    toString() {
                        return `${String(this.messageMatcher)} with binding,bound,attaching`;
                    },
                });
            }
        });
    }
    // Note that the resolution mode ('dynamic' | 'static') will be removed in future. Thus, here we are concentrating only on the 'dynamic' resolution mode.
    describe('unconfigured route', function () {
        for (const { name, routes, withInitialLoad } of [
            {
                name: 'without empty route',
                routes(...[A, B]) {
                    return [
                        { path: 'a', component: A },
                        { path: 'b', component: B },
                    ];
                },
                withInitialLoad: false,
            },
            {
                name: 'with empty route',
                routes(...[A, B]) {
                    return [
                        { path: ['', 'a'], component: A },
                        { path: 'b', component: B },
                    ];
                },
                withInitialLoad: true,
            },
            {
                name: 'with empty route - explicit redirect',
                routes(...[A, B]) {
                    return [
                        { path: '', redirectTo: 'a' },
                        { path: 'a', component: A },
                        { path: 'b', component: B },
                    ];
                },
                withInitialLoad: true,
            },
        ]) {
            it(`without fallback - single viewport - ${name}`, async function () {
                const ticks = 0;
                const hookSpec = HookSpecs.create(ticks);
                let A = class A extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                A = __decorate([
                    customElement({ name: 'a', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A);
                let B = class B extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                B = __decorate([
                    customElement({ name: 'b', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], B);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                Root = __decorate([
                    route({ routes: routes(A, B) }),
                    customElement({ name: 'root', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [A, B], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
                let phase = 'start';
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached'),
                    ...(withInitialLoad ? $(phase, 'a', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached') : [])
                ]);
                // phase 1: load unconfigured
                phase = 'phase1';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await assert.rejects(() => router.load('unconfigured'), /Neither the route 'unconfigured' matched any configured route/);
                verifyInvocationsEqual(mgr.fullNotifyHistory, []);
                // phase 2: load configured
                mgr.fullNotifyHistory.length = 0;
                phase = 'phase2';
                mgr.setPrefix(phase);
                await router.load('b');
                verifyInvocationsEqual(mgr.fullNotifyHistory, withInitialLoad
                    ? [
                        ...$(phase, 'a', ticks, 'canUnload'),
                        ...$(phase, 'b', ticks, 'canLoad'),
                        ...$(phase, 'a', ticks, 'unload'),
                        ...$(phase, 'b', ticks, 'load'),
                        ...$(phase, 'a', ticks, 'detaching', 'unbinding', 'dispose'),
                        ...$(phase, 'b', ticks, 'binding', 'bound', 'attaching', 'attached'),
                    ]
                    : [...$(phase, 'b', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
                // phase 3: load unconfigured1/unconfigured2
                phase = 'phase3';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await assert.rejects(() => router.load('unconfigured1/unconfigured2'), /Neither the route 'unconfigured1' matched any configured route/);
                verifyInvocationsEqual(mgr.fullNotifyHistory, []);
                // phase 4: load configured
                phase = 'phase4';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('a');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'b', ticks, 'canUnload'),
                    ...$(phase, 'a', ticks, 'canLoad'),
                    ...$(phase, 'b', ticks, 'unload'),
                    ...$(phase, 'a', ticks, 'load'),
                    ...$(phase, 'b', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'a', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // phase 5: load unconfigured/configured
                phase = 'phase5';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await assert.rejects(() => router.load('unconfigured/b'), /Neither the route 'unconfigured' matched any configured route/);
                verifyInvocationsEqual(mgr.fullNotifyHistory, []);
                // phase 6: load configured
                phase = 'phase6';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('b');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'a', ticks, 'canUnload'),
                    ...$(phase, 'b', ticks, 'canLoad'),
                    ...$(phase, 'a', ticks, 'unload'),
                    ...$(phase, 'b', ticks, 'load'),
                    ...$(phase, 'a', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'b', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // stop
                mgr.fullNotifyHistory.length = 0;
                phase = 'stop';
                await tearDown();
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, ['b', 'root'], ticks, 'detaching'),
                    ...$(phase, ['b', 'root'], ticks, 'unbinding'),
                    ...$(phase, ['root', 'b'], ticks, 'dispose'),
                ]);
                mgr.$dispose();
            });
            it(`with fallback - single viewport - ${name}`, async function () {
                const ticks = 0;
                const hookSpec = HookSpecs.create(ticks);
                let A = class A extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                A = __decorate([
                    customElement({ name: 'a', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], A);
                let B = class B extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                B = __decorate([
                    customElement({ name: 'b', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], B);
                let C = class C extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                C = __decorate([
                    customElement({ name: 'c', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], C);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                Root = __decorate([
                    route({ routes: [...routes(A, B), { path: 'c', component: C }], fallback: 'c' }),
                    customElement({ name: 'root', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [A, B, C], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
                let phase = 'start';
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached'),
                    ...(withInitialLoad ? $(phase, 'a', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached') : [])
                ]);
                // phase 1: load unconfigured
                phase = 'phase1';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('unconfigured');
                verifyInvocationsEqual(mgr.fullNotifyHistory, withInitialLoad
                    ? [
                        ...$(phase, 'a', ticks, 'canUnload'),
                        ...$(phase, 'c', ticks, 'canLoad'),
                        ...$(phase, 'a', ticks, 'unload'),
                        ...$(phase, 'c', ticks, 'load'),
                        ...$(phase, 'a', ticks, 'detaching', 'unbinding', 'dispose'),
                        ...$(phase, 'c', ticks, 'binding', 'bound', 'attaching', 'attached'),
                    ]
                    : [...$(phase, 'c', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
                // phase 2: load configured
                mgr.fullNotifyHistory.length = 0;
                phase = 'phase2';
                mgr.setPrefix(phase);
                await router.load('b');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'c', ticks, 'canUnload'),
                    ...$(phase, 'b', ticks, 'canLoad'),
                    ...$(phase, 'c', ticks, 'unload'),
                    ...$(phase, 'b', ticks, 'load'),
                    ...$(phase, 'c', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'b', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // phase 3: load unconfigured1/unconfigured2
                phase = 'phase3';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('unconfigured1/unconfigured2'); // unconfigured2 will be discarded.
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'b', ticks, 'canUnload'),
                    ...$(phase, 'c', ticks, 'canLoad'),
                    ...$(phase, 'b', ticks, 'unload'),
                    ...$(phase, 'c', ticks, 'load'),
                    ...$(phase, 'b', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'c', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // phase 4: load configured
                phase = 'phase4';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('a');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'c', ticks, 'canUnload'),
                    ...$(phase, 'a', ticks, 'canLoad'),
                    ...$(phase, 'c', ticks, 'unload'),
                    ...$(phase, 'a', ticks, 'load'),
                    ...$(phase, 'c', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'a', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // phase 5: load unconfigured/configured
                phase = 'phase5';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('unconfigured/b'); // the configured 'b' doesn't matter due to fail-fast strategy
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'a', ticks, 'canUnload'),
                    ...$(phase, 'c', ticks, 'canLoad'),
                    ...$(phase, 'a', ticks, 'unload'),
                    ...$(phase, 'c', ticks, 'load'),
                    ...$(phase, 'a', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'c', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // phase 6: load configured
                phase = 'phase6';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('b');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, 'c', ticks, 'canUnload'),
                    ...$(phase, 'b', ticks, 'canLoad'),
                    ...$(phase, 'c', ticks, 'unload'),
                    ...$(phase, 'b', ticks, 'load'),
                    ...$(phase, 'c', ticks, 'detaching', 'unbinding', 'dispose'),
                    ...$(phase, 'b', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // stop
                mgr.fullNotifyHistory.length = 0;
                phase = 'stop';
                try {
                    await tearDown();
                }
                catch (e) {
                    console.log('caught post stop', e);
                }
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, ['b', 'root'], ticks, 'detaching'),
                    ...$(phase, ['b', 'root'], ticks, 'unbinding'),
                    ...$(phase, ['root', 'b'], ticks, 'dispose'),
                ]);
                mgr.$dispose();
            });
        }
        // this test sort of asserts the current "incorrect" behavior, until the "undo" (refer ViewportAgent#cancelUpdate) is implemented. TODO(sayan): implement "undo" later and refactor this test.
        it(`without fallback - parent/child viewport`, async function () {
            const ticks = 0;
            const hookSpec = HookSpecs.create(ticks);
            let C1 = class C1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C1 = __decorate([
                customElement({ name: 'c1', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C1);
            let C2 = class C2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C2 = __decorate([
                customElement({ name: 'c2', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C2);
            let P = class P extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            P = __decorate([
                route({
                    routes: [
                        { path: 'c1', component: C1 },
                        { path: 'c2', component: C2 },
                    ],
                }),
                customElement({ name: 'p', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], P);
            let Root = class Root extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root = __decorate([
                route({
                    routes: [
                        {
                            path: 'p',
                            component: P
                        }
                    ]
                }),
                customElement({ name: 'root', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root);
            const { router, mgr, tearDown } = await createFixture(Root, [C1, C2, P], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
            let phase = 'start';
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
            // phase 1: load unconfigured
            phase = 'phase1';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await assert.rejects(() => router.load('p/unconfigured'), /Neither the route 'unconfigured' matched any configured route/);
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'p', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
            // phase 2: load configured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase2';
            mgr.setPrefix(phase);
            await assert.rejects(() => router.load('p/c1'), /Failed to resolve VR/);
            verifyInvocationsEqual(mgr.fullNotifyHistory, []);
            // stop
            mgr.fullNotifyHistory.length = 0;
            phase = 'stop';
            try {
                await tearDown();
            }
            catch (e) {
                console.error(e);
            }
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
            // ...$(phase, ['root'], ticks, 'detaching'),
            // ...$(phase, ['root'], ticks, 'unbinding'),
            // ...$(phase, ['root'], ticks, 'dispose'),
            ]);
            mgr.$dispose();
        });
        // this test sort of asserts the current "incorrect" behavior, until the "undo" (refer ViewportAgent#cancelUpdate) is implemented. TODO(sayan): implement "undo" later and refactor this test.
        it(`without fallback - sibling viewport`, async function () {
            const ticks = 0;
            const hookSpec = HookSpecs.create(ticks);
            let S1 = class S1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            S1 = __decorate([
                customElement({ name: 's1', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], S1);
            let S2 = class S2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            S2 = __decorate([
                customElement({ name: 's2', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], S2);
            let Root = class Root extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root = __decorate([
                route({
                    routes: [
                        { path: 's1', component: S1 },
                        { path: 's2', component: S2 },
                    ]
                }),
                customElement({ name: 'root', template: vp(2) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root);
            const { router, mgr, tearDown } = await createFixture(Root, [S1, S2], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
            let phase = 'start';
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
            // phase 1: load unconfigured
            phase = 'phase1';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await assert.rejects(() => router.load('s1@$1+unconfigured@$2'), /Neither the route 'unconfigured' matched any configured route/);
            verifyInvocationsEqual(mgr.fullNotifyHistory, []);
            // phase 2: load configured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase2';
            mgr.setPrefix(phase);
            await assert.rejects(() => router.load('s1@$1+s2@$2'), /Failed to resolve VR/);
            verifyInvocationsEqual(mgr.fullNotifyHistory, []);
            // stop
            mgr.fullNotifyHistory.length = 0;
            phase = 'stop';
            try {
                await tearDown();
            }
            catch (e) {
                console.error(e);
            }
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['root'], ticks, 'detaching'),
                ...$(phase, ['root'], ticks, 'unbinding'),
                ...$(phase, ['root'], ticks, 'dispose'),
            ]);
            mgr.$dispose();
        });
        it(`with fallback - single-level parent/child viewport`, async function () {
            const ticks = 0;
            const hookSpec = HookSpecs.create(ticks);
            let C1 = class C1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C1 = __decorate([
                customElement({ name: 'c1', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C1);
            let C2 = class C2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C2 = __decorate([
                customElement({ name: 'c2', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C2);
            let P = class P extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            P = __decorate([
                route({
                    routes: [
                        { path: 'c1', component: C1 },
                        { path: 'c2', component: C2 },
                    ],
                    fallback: 'c2'
                }),
                customElement({ name: 'p', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], P);
            let Root = class Root extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root = __decorate([
                route({
                    routes: [
                        {
                            path: 'p',
                            component: P
                        }
                    ]
                }),
                customElement({ name: 'root', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root);
            const { router, mgr, tearDown } = await createFixture(Root, [C1, C2, P], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
            let phase = 'start';
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
            // phase 1: load unconfigured
            phase = 'phase1';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('p/unconfigured');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, ['p', 'c2'], ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
            // phase 2: load configured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase2';
            mgr.setPrefix(phase);
            await router.load('p/c1');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, 'c2', ticks, 'canUnload'),
                ...$(phase, 'c1', ticks, 'canLoad'),
                ...$(phase, 'c2', ticks, 'unload'),
                ...$(phase, 'c1', ticks, 'load'),
                ...$(phase, 'c2', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 'c1', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 3: load unconfigured1/unconfigured2
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase3';
            mgr.setPrefix(phase);
            await router.load('p/unconfigured1/unconfigured2');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, 'c1', ticks, 'canUnload'),
                ...$(phase, 'c2', ticks, 'canLoad'),
                ...$(phase, 'c1', ticks, 'unload'),
                ...$(phase, 'c2', ticks, 'load'),
                ...$(phase, 'c1', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 'c2', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 3: load configured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase2';
            mgr.setPrefix(phase);
            await router.load('p/c1');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, 'c2', ticks, 'canUnload'),
                ...$(phase, 'c1', ticks, 'canLoad'),
                ...$(phase, 'c2', ticks, 'unload'),
                ...$(phase, 'c1', ticks, 'load'),
                ...$(phase, 'c2', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 'c1', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // stop
            mgr.fullNotifyHistory.length = 0;
            phase = 'stop';
            await tearDown();
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['c1', 'p', 'root'], ticks, 'detaching'),
                ...$(phase, ['c1', 'p', 'root'], ticks, 'unbinding'),
                ...$(phase, ['root', 'p', 'c1'], ticks, 'dispose'),
            ]);
            mgr.$dispose();
        });
        it(`with fallback - multi-level parent/child viewport`, async function () {
            const ticks = 0;
            const hookSpec = HookSpecs.create(ticks);
            let GC11 = class GC11 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC11 = __decorate([
                customElement({ name: 'gc11', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC11);
            let GC12 = class GC12 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC12 = __decorate([
                customElement({ name: 'gc12', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC12);
            let GC21 = class GC21 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC21 = __decorate([
                customElement({ name: 'gc21', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC21);
            let GC22 = class GC22 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC22 = __decorate([
                customElement({ name: 'gc22', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC22);
            let C1 = class C1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C1 = __decorate([
                route({
                    routes: [
                        { path: 'gc11', component: GC11 },
                        { path: 'gc12', component: GC12 },
                    ],
                    fallback: 'gc11'
                }),
                customElement({ name: 'c1', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C1);
            let C2 = class C2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C2 = __decorate([
                route({
                    routes: [
                        { path: 'gc21', component: GC21 },
                        { path: 'gc22', component: GC22 },
                    ],
                    fallback: 'gc22'
                }),
                customElement({ name: 'c2', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C2);
            let P = class P extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            P = __decorate([
                route({
                    routes: [
                        { path: 'c1', component: C1 },
                        { path: 'c2', component: C2 },
                    ],
                    fallback: 'c2'
                }),
                customElement({ name: 'p', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], P);
            let Root = class Root extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root = __decorate([
                route({
                    routes: [
                        {
                            path: 'p',
                            component: P
                        }
                    ]
                }),
                customElement({ name: 'root', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root);
            const { router, mgr, tearDown } = await createFixture(Root, [GC11, GC12, GC21, GC22, C1, C2, P], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
            let phase = 'start';
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
            // phase 1: load unconfigured
            phase = 'phase1';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('p/unconfigured');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, ['p', 'c2'], ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
            // phase 2: load configured1/unconfigured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase2';
            mgr.setPrefix(phase);
            await router.load('p/c1/unconfigured');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, 'c2', ticks, 'canUnload'),
                ...$(phase, 'c1', ticks, 'canLoad'),
                ...$(phase, 'c2', ticks, 'unload'),
                ...$(phase, 'c1', ticks, 'load'),
                ...$(phase, 'c2', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 'c1', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc11', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 3: load configured1/configured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase3';
            mgr.setPrefix(phase);
            await router.load('p/c1/gc12');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc11', 'c1'], ticks, 'canUnload'),
                ...$(phase, 'gc12', ticks, 'canLoad'),
                ...$(phase, 'gc11', ticks, 'unload'),
                ...$(phase, 'gc12', ticks, 'load'),
                ...$(phase, 'gc11', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 'gc12', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 4: load configured2/unconfigured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase4';
            mgr.setPrefix(phase);
            await router.load('p/c2/unconfigured');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc12', 'c1'], ticks, 'canUnload'),
                ...$(phase, 'c2', ticks, 'canLoad'),
                ...$(phase, ['gc12', 'c1'], ticks, 'unload'),
                ...$(phase, 'c2', ticks, 'load'),
                ...$(phase, ['gc12', 'c1'], ticks, 'detaching'),
                ...$(phase, ['gc12', 'c1'], ticks, 'unbinding'),
                ...$(phase, ['c1', 'gc12'], ticks, 'dispose'),
                ...$(phase, 'c2', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc22', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 5: load configured2/configured
            mgr.fullNotifyHistory.length = 0;
            phase = 'phase5';
            mgr.setPrefix(phase);
            await router.load('p/c2/gc21');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc22', 'c2'], ticks, 'canUnload'),
                ...$(phase, 'gc21', ticks, 'canLoad'),
                ...$(phase, 'gc22', ticks, 'unload'),
                ...$(phase, 'gc21', ticks, 'load'),
                ...$(phase, 'gc22', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 'gc21', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // stop
            mgr.fullNotifyHistory.length = 0;
            phase = 'stop';
            await tearDown();
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc21', 'c2', 'p', 'root'], ticks, 'detaching'),
                ...$(phase, ['gc21', 'c2', 'p', 'root'], ticks, 'unbinding'),
                ...$(phase, ['root', 'p', 'c2', 'gc21'], ticks, 'dispose'),
            ]);
            mgr.$dispose();
        });
        it(`with fallback - sibling viewport`, async function () {
            const ticks = 0;
            const hookSpec = HookSpecs.create(ticks);
            let S1 = class S1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            S1 = __decorate([
                customElement({ name: 's1', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], S1);
            let S2 = class S2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            S2 = __decorate([
                customElement({ name: 's2', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], S2);
            let S3 = class S3 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            S3 = __decorate([
                customElement({ name: 's3', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], S3);
            let Root = class Root extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root = __decorate([
                route({
                    routes: [
                        { path: 's1', component: S1 },
                        { path: 's2', component: S2 },
                        { path: 's3', component: S3 },
                    ],
                    fallback: 's2',
                }),
                customElement({ name: 'root', template: vp(2) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root);
            const { router, mgr, tearDown } = await createFixture(Root, [S1, S2, S3], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
            let phase = 'start';
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
            // phase 1: load configured+unconfigured
            phase = 'phase1';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('s1@$0+unconfigured@$1');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['s1', 's2'], ticks, 'canLoad'),
                ...$(phase, ['s1', 's2'], ticks, 'load'),
                ...$(phase, ['s1', 's2'], ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 2: load unconfigured+configured
            phase = 'phase2';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('unconfigured@$0+s1@$1');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['s1', 's2'], ticks, 'canUnload'),
                ...$(phase, ['s2', 's1'], ticks, 'canLoad'),
                ...$(phase, ['s1', 's2'], ticks, 'unload'),
                ...$(phase, ['s2', 's1'], ticks, 'load'),
                ...$(phase, 's1', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 's2', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 's2', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 's1', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 3: load configured+configured
            phase = 'phase3';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('s3@$0+s2@$1');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['s2', 's1'], ticks, 'canUnload'),
                ...$(phase, ['s3', 's2'], ticks, 'canLoad'),
                ...$(phase, ['s2', 's1'], ticks, 'unload'),
                ...$(phase, ['s3', 's2'], ticks, 'load'),
                ...$(phase, 's2', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 's3', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 's1', ticks, 'detaching', 'unbinding', 'dispose'),
                ...$(phase, 's2', ticks, 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // stop
            mgr.fullNotifyHistory.length = 0;
            phase = 'stop';
            await tearDown();
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['s3', 's2', 'root'], ticks, 'detaching'),
                ...$(phase, ['s3', 's2', 'root'], ticks, 'unbinding'),
                ...$(phase, ['root', 's3', 's2'], ticks, 'dispose'),
            ]);
            mgr.$dispose();
        });
        it(`with fallback - sibling + parent/child viewport`, async function () {
            const ticks = 0;
            const hookSpec = HookSpecs.create(ticks);
            let GC11 = class GC11 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC11 = __decorate([
                customElement({ name: 'gc11', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC11);
            let GC12 = class GC12 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC12 = __decorate([
                customElement({ name: 'gc12', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC12);
            let GC21 = class GC21 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC21 = __decorate([
                customElement({ name: 'gc21', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC21);
            let GC22 = class GC22 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            GC22 = __decorate([
                customElement({ name: 'gc22', template: null }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], GC22);
            let C1 = class C1 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C1 = __decorate([
                route({
                    routes: [
                        { path: 'gc11', component: GC11 },
                        { path: 'gc12', component: GC12 },
                    ],
                    fallback: 'gc11'
                }),
                customElement({ name: 'c1', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C1);
            let C2 = class C2 extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            C2 = __decorate([
                route({
                    routes: [
                        { path: 'gc21', component: GC21 },
                        { path: 'gc22', component: GC22 },
                    ],
                    fallback: 'gc22'
                }),
                customElement({ name: 'c2', template: vp(1) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], C2);
            let Root = class Root extends TestVM {
                constructor(mgr, p) { super(mgr, p, hookSpec); }
            };
            Root = __decorate([
                route({
                    routes: [
                        { path: 'c1', component: C1 },
                        { path: 'c2', component: C2 },
                    ],
                }),
                customElement({ name: 'root', template: vp(2) }),
                __param(0, INotifierManager),
                __param(1, IPlatform),
                __metadata("design:paramtypes", [Object, Object])
            ], Root);
            const { router, mgr, tearDown } = await createFixture(Root, [C1, C2, GC11, GC12, GC21, GC22], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
            let phase = 'start';
            verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
            // phase 1
            phase = 'phase1';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('c1/gc12+c2/unconfigured');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['c1', 'c2'], ticks, 'canLoad'),
                ...$(phase, ['c1', 'c2'], ticks, 'load'),
                ...$(phase, 'c1', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc12', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'c2', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc22', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 2
            phase = 'phase2';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('c2/gc21+c1/unconfigured');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc12', 'c1'], ticks, 'canUnload'),
                ...$(phase, ['gc22', 'c2'], ticks, 'canUnload'),
                ...$(phase, ['c2', 'c1'], ticks, 'canLoad'),
                ...$(phase, ['gc12', 'c1'], ticks, 'unload'),
                ...$(phase, ['gc22', 'c2'], ticks, 'unload'),
                ...$(phase, ['c2', 'c1'], ticks, 'load'),
                ...$(phase, ['gc12', 'c1'], ticks, 'detaching'),
                ...$(phase, ['gc12', 'c1'], ticks, 'unbinding'),
                ...$(phase, ['c1', 'gc12'], ticks, 'dispose'),
                ...$(phase, 'c2', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc21', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, ['gc22', 'c2'], ticks, 'detaching'),
                ...$(phase, ['gc22', 'c2'], ticks, 'unbinding'),
                ...$(phase, ['c2', 'gc22'], ticks, 'dispose'),
                ...$(phase, 'c1', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc11', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // phase 3
            phase = 'phase3';
            mgr.fullNotifyHistory.length = 0;
            mgr.setPrefix(phase);
            await router.load('c1/gc12+c2/gc21');
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc21', 'c2'], ticks, 'canUnload'),
                ...$(phase, ['gc11', 'c1'], ticks, 'canUnload'),
                ...$(phase, ['c1', 'c2'], ticks, 'canLoad'),
                ...$(phase, ['gc21', 'c2'], ticks, 'unload'),
                ...$(phase, ['gc11', 'c1'], ticks, 'unload'),
                ...$(phase, ['c1', 'c2'], ticks, 'load'),
                ...$(phase, ['gc21', 'c2'], ticks, 'detaching'),
                ...$(phase, ['gc21', 'c2'], ticks, 'unbinding'),
                ...$(phase, ['c2', 'gc21'], ticks, 'dispose'),
                ...$(phase, 'c1', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc12', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, ['gc11', 'c1'], ticks, 'detaching'),
                ...$(phase, ['gc11', 'c1'], ticks, 'unbinding'),
                ...$(phase, ['c1', 'gc11'], ticks, 'dispose'),
                ...$(phase, 'c2', ticks, 'binding', 'bound', 'attaching', 'attached'),
                ...$(phase, 'gc21', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
            ]);
            // stop
            mgr.fullNotifyHistory.length = 0;
            phase = 'stop';
            await tearDown();
            verifyInvocationsEqual(mgr.fullNotifyHistory, [
                ...$(phase, ['gc12', 'c1', 'gc21', 'c2', 'root'], ticks, 'detaching'),
                ...$(phase, ['gc12', 'c1', 'gc21', 'c2', 'root'], ticks, 'unbinding'),
                ...$(phase, ['root', 'c1', 'gc12', 'c2', 'gc21'], ticks, 'dispose'),
            ]);
            mgr.$dispose();
        });
        for (const [name, fallback] of [['fallback same as CE name', 'nf'], ['fallback different as CE name', 'not-found']]) {
            it(`fallback defined on root - single-level parent/child viewport - ${name}`, async function () {
                const ticks = 0;
                const hookSpec = HookSpecs.create(ticks);
                let C1 = class C1 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                C1 = __decorate([
                    customElement({ name: 'c1', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], C1);
                let C2 = class C2 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                C2 = __decorate([
                    customElement({ name: 'c2', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], C2);
                let P = class P extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                P = __decorate([
                    route({
                        routes: [
                            { path: 'c1', component: C1 },
                            { path: 'c2', component: C2 },
                        ],
                    }),
                    customElement({ name: 'p', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], P);
                let NF = class NF extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                NF = __decorate([
                    customElement({ name: 'nf' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], NF);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                Root = __decorate([
                    route({
                        routes: [
                            { path: 'p', component: P },
                            { path: fallback, component: NF },
                        ],
                        fallback,
                    }),
                    customElement({ name: 'root', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [C1, C2, P, NF], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
                let phase = 'start';
                verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
                phase = 'phase1';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('p/unconfigured');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, ['p', 'nf'], ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
                // stop
                mgr.fullNotifyHistory.length = 0;
                phase = 'stop';
                await tearDown();
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, ['nf', 'p', 'root'], ticks, 'detaching'),
                    ...$(phase, ['nf', 'p', 'root'], ticks, 'unbinding'),
                    ...$(phase, ['root', 'p', 'nf'], ticks, 'dispose'),
                ]);
                mgr.$dispose();
            });
            it(`fallback defined on root but missing on some nodes on downstream - multi-level parent/child viewport - ${name}`, async function () {
                const ticks = 0;
                const hookSpec = HookSpecs.create(ticks);
                let GC1 = class GC1 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                GC1 = __decorate([
                    customElement({ name: 'gc1', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], GC1);
                let GC21 = class GC21 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                GC21 = __decorate([
                    customElement({ name: 'gc21', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], GC21);
                let GC22 = class GC22 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                GC22 = __decorate([
                    customElement({ name: 'gc22', template: null }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], GC22);
                let C1 = class C1 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                C1 = __decorate([
                    route({
                        routes: [
                            { path: 'gc1', component: GC1 },
                        ]
                    }),
                    customElement({ name: 'c1', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], C1);
                let C2 = class C2 extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                C2 = __decorate([
                    route({
                        routes: [
                            { path: 'gc21', component: GC21 },
                            { path: 'gc22', component: GC22 },
                        ],
                        fallback: 'gc22'
                    }),
                    customElement({ name: 'c2', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], C2);
                let P = class P extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                P = __decorate([
                    route({
                        routes: [
                            { path: 'c1', component: C1 },
                            { path: 'c2', component: C2 },
                        ],
                    }),
                    customElement({ name: 'p', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], P);
                let NF = class NF extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                NF = __decorate([
                    customElement({ name: 'nf' }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], NF);
                let Root = class Root extends TestVM {
                    constructor(mgr, p) { super(mgr, p, hookSpec); }
                };
                Root = __decorate([
                    route({
                        routes: [
                            { path: 'p', component: P },
                            { path: fallback, component: NF },
                        ],
                        fallback,
                    }),
                    customElement({ name: 'root', template: vp(1) }),
                    __param(0, INotifierManager),
                    __param(1, IPlatform),
                    __metadata("design:paramtypes", [Object, Object])
                ], Root);
                const { router, mgr, tearDown } = await createFixture(Root, [GC1, GC21, GC22, C1, C2, P, NF], { resolutionMode: 'dynamic' } /* , LogLevel.trace */);
                let phase = 'start';
                verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, 'root', ticks, 'binding', 'bound', 'attaching', 'attached')]);
                phase = 'phase1';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('p/c1/unconfigured');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [...$(phase, ['p', 'c1', 'nf'], ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached')]);
                phase = 'phase2';
                mgr.fullNotifyHistory.length = 0;
                mgr.setPrefix(phase);
                await router.load('p/c2/unconfigured');
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, ['nf', 'c1'], ticks, 'canUnload'),
                    ...$(phase, 'c2', ticks, 'canLoad'),
                    ...$(phase, ['nf', 'c1'], ticks, 'unload'),
                    ...$(phase, 'c2', ticks, 'load'),
                    ...$(phase, ['nf', 'c1'], ticks, 'detaching'),
                    ...$(phase, ['nf', 'c1'], ticks, 'unbinding'),
                    ...$(phase, ['c1', 'nf'], ticks, 'dispose'),
                    ...$(phase, 'c2', ticks, 'binding', 'bound', 'attaching', 'attached'),
                    ...$(phase, 'gc22', ticks, 'canLoad', 'load', 'binding', 'bound', 'attaching', 'attached'),
                ]);
                // stop
                mgr.fullNotifyHistory.length = 0;
                phase = 'stop';
                await tearDown();
                verifyInvocationsEqual(mgr.fullNotifyHistory, [
                    ...$(phase, ['gc22', 'c2', 'p', 'root'], ticks, 'detaching'),
                    ...$(phase, ['gc22', 'c2', 'p', 'root'], ticks, 'unbinding'),
                    ...$(phase, ['root', 'p', 'c2', 'gc22'], ticks, 'dispose'),
                ]);
                mgr.$dispose();
            });
        }
    });
});
//# sourceMappingURL=hook-tests.spec.js.map