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
import { kebabCase, ILogConfig } from '@aurelia/kernel';
import { assert, TestContext } from '@aurelia/testing';
import { RouterConfiguration, IRouter, route } from '@aurelia/router-lite';
import { Aurelia, customElement, CustomElement, IPlatform } from '@aurelia/runtime-html';
import { TestRouterConfiguration } from './_shared/configuration.js';
function vp(count) {
    return '<au-viewport></au-viewport>'.repeat(count);
}
function getText(spec) {
    return spec.map(function (x) {
        if (x instanceof Array) {
            return getText(x);
        }
        return kebabCase(x.name);
    }).join('');
}
function assertComponentsVisible(host, spec, msg = '') {
    assert.strictEqual(host.textContent, getText(spec), msg);
}
function assertIsActive(router, instruction, context, expected, assertId) {
    const isActive = router.isActive(instruction, context);
    assert.strictEqual(isActive, expected, `expected isActive to return ${expected} (assertId ${assertId})`);
}
async function createFixture(Component, deps, level = 5 /* fatal */) {
    const ctx = TestContext.create();
    const { container, platform } = ctx;
    container.register(TestRouterConfiguration.for(level));
    container.register(RouterConfiguration.customize({ resolutionMode: 'dynamic' }));
    container.register(...deps);
    const component = container.get(Component);
    const router = container.get(IRouter);
    const au = new Aurelia(container);
    const host = ctx.createElement('div');
    au.app({ component, host });
    await au.start();
    assertComponentsVisible(host, [Component]);
    const logConfig = container.get(ILogConfig);
    return {
        ctx,
        au,
        host,
        component,
        platform,
        container,
        router,
        startTracing() {
            logConfig.level = 0 /* trace */;
        },
        stopTracing() {
            logConfig.level = level;
        },
        async tearDown() {
            assert.areTaskQueuesEmpty();
            await au.stop(true);
        }
    };
}
describe('router (smoke tests)', function () {
    let A01 = class A01 {
    };
    A01 = __decorate([
        customElement({ name: 'a01', template: `a01${vp(0)}` })
    ], A01);
    let A02 = class A02 {
    };
    A02 = __decorate([
        customElement({ name: 'a02', template: `a02${vp(0)}` })
    ], A02);
    const A0 = [A01, A02];
    let A11 = class A11 {
    };
    A11 = __decorate([
        route({
            routes: [
                { path: 'a01', component: A01 },
                { path: 'a02', component: A02 },
            ]
        }),
        customElement({ name: 'a11', template: `a11${vp(1)}` })
    ], A11);
    let A12 = class A12 {
    };
    A12 = __decorate([
        route({
            routes: [
                { path: 'a01', component: A01 },
                { path: 'a02', component: A02 },
                { path: 'a11', component: A11 },
            ]
        }),
        customElement({ name: 'a12', template: `a12${vp(1)}` })
    ], A12);
    const A1 = [A11, A12];
    let A21 = class A21 {
    };
    A21 = __decorate([
        customElement({ name: 'a21', template: `a21${vp(2)}` })
    ], A21);
    let A22 = class A22 {
    };
    A22 = __decorate([
        customElement({ name: 'a22', template: `a22${vp(2)}` })
    ], A22);
    const A2 = [A21, A22];
    const A = [...A0, ...A1, ...A2];
    let B01 = class B01 {
        async canUnload(_next, _current) {
            await new Promise(function (resolve) { setTimeout(resolve, 0); });
            return true;
        }
    };
    B01 = __decorate([
        customElement({ name: 'b01', template: `b01${vp(0)}` })
    ], B01);
    let B02 = class B02 {
        async canUnload(_next, _current) {
            await new Promise(function (resolve) { setTimeout(resolve, 0); });
            return false;
        }
    };
    B02 = __decorate([
        customElement({ name: 'b02', template: `b02${vp(0)}` })
    ], B02);
    const B0 = [B01, B02];
    let B11 = class B11 {
        async canUnload(_next, _current) {
            await new Promise(function (resolve) { setTimeout(resolve, 0); });
            return true;
        }
    };
    B11 = __decorate([
        route({
            routes: [
                { path: 'a01', component: A01 },
                { path: 'a02', component: A02 },
                { path: 'b01', component: B01 },
                { path: 'b02', component: B02 },
            ]
        }),
        customElement({ name: 'b11', template: `b11${vp(1)}` })
    ], B11);
    let B12 = class B12 {
        async canUnload(_next, _current) {
            await new Promise(function (resolve) { setTimeout(resolve, 0); });
            return false;
        }
    };
    B12 = __decorate([
        route({
            routes: [
                { path: 'a01', component: A01 },
                { path: 'a02', component: A02 },
                { path: 'b01', component: B01 },
                { path: 'b02', component: B02 },
            ]
        }),
        customElement({ name: 'b12', template: `b12${vp(1)}` })
    ], B12);
    const B1 = [B11, B12];
    const B = [...B0, ...B1];
    const Z = [...A, ...B];
    let Root1 = class Root1 {
    };
    Root1 = __decorate([
        route({
            routes: [
                { path: 'a01', component: A01 },
                { path: 'a02', component: A02 },
                { path: 'a11', component: A11 },
                { path: 'a12', component: A12 },
                { path: 'b11', component: B11 },
                { path: 'b12', component: B12 },
            ]
        }),
        customElement({ name: 'root1', template: `root1${vp(1)}` })
    ], Root1);
    let Root2 = class Root2 {
    };
    Root2 = __decorate([
        route({
            routes: [
                { path: 'a01', component: A01 },
                { path: 'a02', component: A02 },
                { path: 'a11', component: A11 },
                { path: 'a12', component: A12 },
            ]
        }),
        customElement({ name: 'root2', template: `root2${vp(2)}` })
    ], Root2);
    // Start with a broad sample of non-generated tests that are easy to debug and mess around with.
    it(`root1 can load a01 as a string and can determine if it's active`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load('a01');
        assertComponentsVisible(host, [Root1, A01]);
        assertIsActive(router, 'a01', router.routeTree.root.context, true, 1);
        await tearDown();
    });
    it(`root1 can load a01 as a type and can determine if it's active`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load(A01);
        assertComponentsVisible(host, [Root1, A01]);
        assertIsActive(router, A01, router.routeTree.root.context, true, 1);
        await tearDown();
    });
    it(`root1 can load a01 as a ViewportInstruction and can determine if it's active`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load({ component: A01 });
        assertComponentsVisible(host, [Root1, A01]);
        assertIsActive(router, { component: A01 }, router.routeTree.root.context, true, 1);
        await tearDown();
    });
    it(`root1 can load a01 as a CustomElementDefinition and can determine if it's active`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load(CustomElement.getDefinition(A01));
        assertComponentsVisible(host, [Root1, A01]);
        assertIsActive(router, CustomElement.getDefinition(A01), router.routeTree.root.context, true, 1);
        await tearDown();
    });
    it(`root1 can load a01,a02 in order and can determine if it's active`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load('a01');
        assertComponentsVisible(host, [Root1, A01]);
        assertIsActive(router, 'a01', router.routeTree.root.context, true, 1);
        await router.load('a02');
        assertComponentsVisible(host, [Root1, A02]);
        assertIsActive(router, 'a02', router.routeTree.root.context, true, 2);
        await tearDown();
    });
    it(`root1 can load a11,a11/a02 in order with context and can determine if it's active`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load(A11);
        assertComponentsVisible(host, [Root1, A11]);
        assertIsActive(router, A11, router.routeTree.root.context, true, 1);
        const context = router.routeTree.root.children[0].context;
        await router.load(A02, { context });
        assertComponentsVisible(host, [Root1, A11, A02]);
        assertIsActive(router, A02, context, true, 2);
        assertIsActive(router, A02, router.routeTree.root.context, false, 3);
        assertIsActive(router, A11, router.routeTree.root.context, true, 3);
        await tearDown();
    });
    it(`root1 can load a11/a01,a11/a02 in order with context`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load({ component: A11, children: [A01] });
        assertComponentsVisible(host, [Root1, A11, A01]);
        const context = router.routeTree.root.children[0].context;
        await router.load(A02, { context });
        assertComponentsVisible(host, [Root1, A11, A02]);
        await tearDown();
    });
    it(`root1 correctly handles canUnload with load b01,a01 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        let result = await router.load(B01);
        assertComponentsVisible(host, [Root1, B01]);
        assert.strictEqual(result, true, '#1 result===true');
        result = await router.load(A01);
        assertComponentsVisible(host, [Root1, A01]);
        assert.strictEqual(result, true, '#2 result===true');
        await tearDown();
    });
    it(`root1 correctly handles canUnload with load b02,a01 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        let result = await router.load(B02);
        assertComponentsVisible(host, [Root1, B02]);
        assert.strictEqual(result, true, '#1 result===true');
        result = await router.load(A01);
        assertComponentsVisible(host, [Root1, B02]);
        assert.strictEqual(result, false, '#2 result===false');
        await tearDown();
    });
    it(`root1 correctly handles canUnload with load b02,a01,a02 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        let result = await router.load(B02);
        assertComponentsVisible(host, [Root1, B02], '#1');
        assert.strictEqual(result, true, '#1 result===true');
        result = await router.load(A01);
        assertComponentsVisible(host, [Root1, B02], '#2');
        assert.strictEqual(result, false, '#2 result===false');
        result = await router.load(A02);
        assertComponentsVisible(host, [Root1, B02], '#3');
        assert.strictEqual(result, false, '#3 result===false');
        await tearDown();
    });
    it(`root1 correctly handles canUnload with load b11/b02,b11/a02 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        let result = await router.load(`b11/b02`);
        assertComponentsVisible(host, [Root1, B11, [B02]]);
        assert.strictEqual(result, true, '#1 result===true');
        result = await router.load(`b11/a02`);
        assertComponentsVisible(host, [Root1, B11, [B02]]);
        assert.strictEqual(result, false, '#2 result===false');
        await tearDown();
    });
    it(`root1 correctly handles canUnload with load b12/b01,b11/b01 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        let result = await router.load(`b12/b01`);
        assertComponentsVisible(host, [Root1, B12, [B01]]);
        assert.strictEqual(result, true, '#1 result===true');
        result = await router.load(`b11/b01`);
        assertComponentsVisible(host, [Root1, B12, [B01]]);
        assert.strictEqual(result, false, '#2 result===false');
        await tearDown();
    });
    it(`root1 correctly handles canUnload with load b12/b01,b12/a01 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        let result = await router.load(`b12/b01`);
        assertComponentsVisible(host, [Root1, B12, [B01]]);
        assert.strictEqual(result, true, '#1 result===true');
        result = await router.load(`b12/a01`);
        assertComponentsVisible(host, [Root1, B12, [A01]]);
        assert.strictEqual(result, true, '#2 result===true');
        await tearDown();
    });
    it(`root1 can load a11/a01 as a string`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load(`a11/a01`);
        assertComponentsVisible(host, [Root1, A11, A01]);
        await tearDown();
    });
    it(`root1 can load a11/a01 as a ViewportInstruction`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load({ component: A11, children: [A01] });
        assertComponentsVisible(host, [Root1, A11, A01]);
        await tearDown();
    });
    it(`root1 can load a11/a01,a11/a02 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root1, Z);
        await router.load(`a11/a01`);
        assertComponentsVisible(host, [Root1, A11, A01]);
        await router.load(`a11/a02`);
        assertComponentsVisible(host, [Root1, A11, A02]);
        await tearDown();
    });
    it(`root2 can load a01+a02 as a string`, async function () {
        const { router, host, tearDown } = await createFixture(Root2, Z);
        await router.load(`a01+a02`);
        assertComponentsVisible(host, [Root2, A01, A02]);
        await tearDown();
    });
    it(`root2 can load a01+a02 as an array of strings`, async function () {
        const { router, host, tearDown } = await createFixture(Root2, Z);
        await router.load(['a01', 'a02']);
        assertComponentsVisible(host, [Root2, A01, A02]);
        await tearDown();
    });
    it(`root2 can load a01+a02 as an array of types`, async function () {
        const { router, host, tearDown } = await createFixture(Root2, Z);
        await router.load([A01, A02]);
        assertComponentsVisible(host, [Root2, A01, A02]);
        await tearDown();
    });
    it(`root2 can load a01+a02 as a mixed array type and string`, async function () {
        const { router, host, tearDown } = await createFixture(Root2, Z);
        await router.load([A01, 'a02']);
        assertComponentsVisible(host, [Root2, A01, A02]);
        await tearDown();
    });
    it(`root2 can load a01+a02,a02+a01 in order`, async function () {
        const { router, host, tearDown } = await createFixture(Root2, Z);
        await router.load(`a01+a02`);
        assertComponentsVisible(host, [Root2, A01, A02]);
        await router.load(`a02+a01`);
        assertComponentsVisible(host, [Root2, A02, A01]);
        await tearDown();
    });
    it(`root2 can load a12/a11/a01+a12/a01,a11/a12/a01+a12/a11/a01,a11/a12/a02+a12/a11/a01 in order with context`, async function () {
        const { router, host, tearDown } = await createFixture(Root2, Z);
        await router.load(`a12/a11/a01+a12/a01`);
        assertComponentsVisible(host, [Root2, [A12, [A11, [A01]]], [A12, [A01]]], '#1');
        let context = router.routeTree.root.children[1].context;
        await router.load(`a11/a01`, { context });
        assertComponentsVisible(host, [Root2, [A12, [A11, [A01]]], [A12, [A11, [A01]]]], '#2');
        context = router.routeTree.root.children[0].children[0].context;
        await router.load(`a02`, { context });
        assertComponentsVisible(host, [Root2, [A12, [A11, [A02]]], [A12, [A11, [A01]]]], '#3');
        await tearDown();
    });
    // Now generate stuff
    const $1vp = {
        // [x]
        [`a01`]: [A01],
        [`a02`]: [A02],
        // [x/x]
        [`a11/a01`]: [A11, [A01]],
        [`a11/a02`]: [A11, [A02]],
        [`a12/a01`]: [A12, [A01]],
        [`a12/a02`]: [A12, [A02]],
        // [x/x/x]
        [`a12/a11/a01`]: [A12, [A11, [A01]]],
        [`a12/a11/a02`]: [A12, [A11, [A02]]],
    };
    const $1vpKeys = Object.keys($1vp);
    for (let i = 0, ii = $1vpKeys.length; i < ii; ++i) {
        const key11 = $1vpKeys[i];
        const value11 = $1vp[key11];
        it(`root1 can load ${key11}`, async function () {
            const { router, host, tearDown } = await createFixture(Root1, Z);
            await router.load(key11);
            assertComponentsVisible(host, [Root1, value11]);
            await tearDown();
        });
        if (i >= 1) {
            const key11prev = $1vpKeys[i - 1];
            const value11prev = $1vp[key11prev];
            it(`root1 can load ${key11prev},${key11} in order`, async function () {
                const { router, host, tearDown } = await createFixture(Root1, Z);
                await router.load(key11prev);
                assertComponentsVisible(host, [Root1, value11prev]);
                await router.load(key11);
                assertComponentsVisible(host, [Root1, value11]);
                await tearDown();
            });
            it(`root1 can load ${key11},${key11prev} in order`, async function () {
                const { router, host, tearDown } = await createFixture(Root1, Z);
                await router.load(key11);
                assertComponentsVisible(host, [Root1, value11]);
                await router.load(key11prev);
                assertComponentsVisible(host, [Root1, value11prev]);
                await tearDown();
            });
        }
    }
    const $2vps = {
        // [x+x]
        [`a01+a02`]: [[A01], [A02]],
        [`a02+a01`]: [[A02], [A01]],
        // [x/x+x]
        [`a11/a01+a02`]: [[A11, [A01]], [A02]],
        [`a11/a02+a01`]: [[A11, [A02]], [A01]],
        [`a12/a01+a02`]: [[A12, [A01]], [A02]],
        [`a12/a02+a01`]: [[A12, [A02]], [A01]],
        // [x+x/x]
        [`a01+a11/a02`]: [[A01], [A11, [A02]]],
        [`a02+a11/a01`]: [[A02], [A11, [A01]]],
        [`a01+a12/a02`]: [[A01], [A12, [A02]]],
        [`a02+a12/a01`]: [[A02], [A12, [A01]]],
        // [x/x+x/x]
        [`a11/a01+a12/a02`]: [[A11, [A01]], [A12, [A02]]],
        [`a11/a02+a12/a01`]: [[A11, [A02]], [A12, [A01]]],
        [`a12/a01+a11/a02`]: [[A12, [A01]], [A11, [A02]]],
        [`a12/a02+a11/a01`]: [[A12, [A02]], [A11, [A01]]],
    };
    const $2vpsKeys = Object.keys($2vps);
    for (let i = 0, ii = $2vpsKeys.length; i < ii; ++i) {
        const key21 = $2vpsKeys[i];
        const value21 = $2vps[key21];
        it(`root2 can load ${key21}`, async function () {
            const { router, host, tearDown } = await createFixture(Root2, Z);
            await router.load(key21);
            assertComponentsVisible(host, [Root2, value21]);
            await tearDown();
        });
        if (i >= 1) {
            const key21prev = $2vpsKeys[i - 1];
            const value21prev = $2vps[key21prev];
            it(`root2 can load ${key21prev},${key21} in order`, async function () {
                const { router, host, tearDown } = await createFixture(Root2, Z);
                await router.load(key21prev);
                assertComponentsVisible(host, [Root2, value21prev]);
                await router.load(key21);
                assertComponentsVisible(host, [Root2, value21]);
                await tearDown();
            });
            it(`root2 can load ${key21},${key21prev} in order`, async function () {
                const { router, host, tearDown } = await createFixture(Root2, Z);
                await router.load(key21);
                assertComponentsVisible(host, [Root2, value21]);
                await router.load(key21prev);
                assertComponentsVisible(host, [Root2, value21prev]);
                await tearDown();
            });
        }
    }
    for (const mode of ['static', 'dynamic']) {
        it(`can load single anonymous default at the root with mode: ${mode}`, async function () {
            let A = class A {
            };
            A = __decorate([
                customElement({ name: 'a', template: 'a' })
            ], A);
            let B = class B {
            };
            B = __decorate([
                customElement({ name: 'b', template: 'b' })
            ], B);
            let Root = class Root {
            };
            Root = __decorate([
                route({
                    routes: [
                        { path: 'a', component: A },
                        { path: 'b', component: B },
                    ]
                }),
                customElement({
                    name: 'root',
                    template: `root<au-viewport default="a"></au-viewport>`,
                    dependencies: [A, B],
                })
            ], Root);
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for());
            container.register(RouterConfiguration.customize({ resolutionMode: mode }));
            const component = container.get(Root);
            const router = container.get(IRouter);
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            au.app({ component, host });
            await au.start();
            assertComponentsVisible(host, [Root, [A]]);
            await router.load('b');
            assertComponentsVisible(host, [Root, [B]]);
            await router.load('');
            assertComponentsVisible(host, [Root, [A]]);
            await au.stop(true);
            assert.areTaskQueuesEmpty();
        });
        it(`can load a named default with one sibling at the root with mode: ${mode}`, async function () {
            let A = class A {
            };
            A = __decorate([
                customElement({ name: 'a', template: 'a' })
            ], A);
            let B = class B {
            };
            B = __decorate([
                customElement({ name: 'b', template: 'b' })
            ], B);
            let Root = class Root {
            };
            Root = __decorate([
                route({
                    routes: [
                        { path: 'a', component: A },
                        { path: 'b', component: B },
                    ]
                }),
                customElement({
                    name: 'root',
                    template: `root<au-viewport name="a" default="a"></au-viewport><au-viewport name="b"></au-viewport>`,
                    dependencies: [A, B],
                })
            ], Root);
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for());
            container.register(RouterConfiguration.customize({ resolutionMode: mode }));
            const component = container.get(Root);
            const router = container.get(IRouter);
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            au.app({ component, host });
            await au.start();
            assertComponentsVisible(host, [Root, [A]], '1');
            await router.load('b@b');
            assertComponentsVisible(host, [Root, [A, B]], '2');
            await router.load('');
            assertComponentsVisible(host, [Root, [A]], '3');
            await router.load('a@a+b@b');
            assertComponentsVisible(host, [Root, [A, B]], '4');
            await router.load('b@a');
            assertComponentsVisible(host, [Root, [B]], '5');
            await router.load('');
            assertComponentsVisible(host, [Root, [A]], '6');
            await router.load('b@a+a@b');
            assertComponentsVisible(host, [Root, [B, A]], '7');
            await au.stop(true);
            assert.areTaskQueuesEmpty();
        });
        it(`can load a named default with one sibling at a child with mode: ${mode}`, async function () {
            let B = class B {
            };
            B = __decorate([
                customElement({ name: 'b', template: 'b' })
            ], B);
            let C = class C {
            };
            C = __decorate([
                customElement({ name: 'c', template: 'c' })
            ], C);
            let A = class A {
            };
            A = __decorate([
                route({
                    routes: [
                        { path: 'b', component: B },
                        { path: 'c', component: C },
                    ]
                }),
                customElement({
                    name: 'a',
                    template: 'a<au-viewport name="b" default="b"></au-viewport><au-viewport name="c"></au-viewport>',
                    dependencies: [B, C],
                })
            ], A);
            let Root = class Root {
            };
            Root = __decorate([
                route({
                    routes: [
                        { path: 'a', component: A },
                    ]
                }),
                customElement({
                    name: 'root',
                    template: `root<au-viewport default="a">`,
                    dependencies: [A],
                })
            ], Root);
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for(3 /* warn */));
            container.register(RouterConfiguration.customize({ resolutionMode: mode }));
            const component = container.get(Root);
            const router = container.get(IRouter);
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            au.app({ component, host });
            await au.start();
            assertComponentsVisible(host, [Root, [A, [B]]], '1');
            await router.load('a/c@c');
            assertComponentsVisible(host, [Root, [A, [B, C]]], '2');
            await router.load('');
            assertComponentsVisible(host, [Root, [A, [B]]], '3');
            await router.load('a/(b@b+c@c)');
            assertComponentsVisible(host, [Root, [A, [B, C]]], '4');
            await router.load('a/c@b');
            assertComponentsVisible(host, [Root, [A, [C]]], '5');
            await router.load('');
            assertComponentsVisible(host, [Root, [A, [B]]], '6');
            await router.load('a/(c@b+b@c)');
            assertComponentsVisible(host, [Root, [A, [C, B]]], '7');
            await au.stop(true);
            assert.areTaskQueuesEmpty();
        });
        for (const [name, fallback] of [['ce name', 'ce-a'], ['route', 'a'], ['route-id', 'r1']]) {
            it(`will load the fallback when navigating to a non-existing route - with ${name} - with mode: ${mode}`, async function () {
                let A = class A {
                };
                A = __decorate([
                    customElement({ name: 'ce-a', template: 'a' })
                ], A);
                let Root = class Root {
                };
                Root = __decorate([
                    route({
                        routes: [
                            { id: 'r1', path: 'a', component: A },
                        ]
                    }),
                    customElement({
                        name: 'root',
                        template: `root<au-viewport fallback="${fallback}">`,
                        dependencies: [A],
                    })
                ], Root);
                const ctx = TestContext.create();
                const { container } = ctx;
                container.register(TestRouterConfiguration.for(3 /* warn */));
                container.register(RouterConfiguration.customize({ resolutionMode: mode }));
                const component = container.get(Root);
                const router = container.get(IRouter);
                const au = new Aurelia(container);
                const host = ctx.createElement('div');
                au.app({ component, host });
                await au.start();
                assertComponentsVisible(host, [Root]);
                await router.load('b');
                assertComponentsVisible(host, [Root, [A]]);
                await au.stop(true);
                assert.areTaskQueuesEmpty();
            });
            it(`will load the global-fallback when navigating to a non-existing route - with mode: ${mode}`, async function () {
                let A = class A {
                };
                A = __decorate([
                    customElement({ name: 'ce-a', template: 'a' })
                ], A);
                let Root = class Root {
                };
                Root = __decorate([
                    route({
                        routes: [
                            { id: 'r1', path: 'a', component: A },
                        ],
                        fallback,
                    }),
                    customElement({
                        name: 'root',
                        template: `root<au-viewport>`,
                        dependencies: [A],
                    })
                ], Root);
                const ctx = TestContext.create();
                const { container } = ctx;
                container.register(TestRouterConfiguration.for(3 /* warn */));
                container.register(RouterConfiguration.customize({ resolutionMode: mode }));
                const component = container.get(Root);
                const router = container.get(IRouter);
                const au = new Aurelia(container);
                const host = ctx.createElement('div');
                au.app({ component, host });
                await au.start();
                assertComponentsVisible(host, [Root]);
                await router.load('b');
                assertComponentsVisible(host, [Root, [A]]);
                await au.stop(true);
                assert.areTaskQueuesEmpty();
            });
            it(`will load the global-fallback when navigating to a non-existing route - sibling - with ${name} - with mode: ${mode}`, async function () {
                let A = class A {
                };
                A = __decorate([
                    customElement({ name: 'ce-a', template: 'a' })
                ], A);
                let Root = class Root {
                };
                Root = __decorate([
                    route({
                        routes: [
                            { id: 'r1', path: 'a', component: A },
                        ],
                        fallback,
                    }),
                    customElement({
                        name: 'root',
                        template: `root<au-viewport></au-viewport><au-viewport></au-viewport>`,
                        dependencies: [A],
                    })
                ], Root);
                const ctx = TestContext.create();
                const { container } = ctx;
                container.register(TestRouterConfiguration.for(3 /* warn */));
                container.register(RouterConfiguration.customize({ resolutionMode: mode }));
                const component = container.get(Root);
                const router = container.get(IRouter);
                const au = new Aurelia(container);
                const host = ctx.createElement('div');
                au.app({ component, host });
                await au.start();
                assertComponentsVisible(host, [Root]);
                await router.load('b+c');
                assertComponentsVisible(host, [Root, [A, A]]);
                await au.stop(true);
                assert.areTaskQueuesEmpty();
            });
        }
        it(`will load the global-fallback when navigating to a non-existing route - parent-child - with mode: ${mode}`, async function () {
            let Ac01 = class Ac01 {
            };
            Ac01 = __decorate([
                customElement({ name: 'ce-a01', template: 'ac01' })
            ], Ac01);
            let Ac02 = class Ac02 {
            };
            Ac02 = __decorate([
                customElement({ name: 'ce-a02', template: 'ac02' })
            ], Ac02);
            let A = class A {
            };
            A = __decorate([
                route({
                    routes: [
                        { id: 'rc1', path: 'ac01', component: Ac01 },
                        { id: 'rc2', path: 'ac02', component: Ac02 },
                    ],
                    fallback: 'rc1',
                }),
                customElement({ name: 'ce-a', template: 'a<au-viewport>', dependencies: [Ac01, Ac02] })
            ], A);
            let Root = class Root {
            };
            Root = __decorate([
                route({
                    routes: [
                        { id: 'r1', path: 'a', component: A },
                    ],
                    fallback: 'r1',
                }),
                customElement({
                    name: 'root',
                    template: `root<au-viewport>`,
                    dependencies: [A],
                })
            ], Root);
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for(3 /* warn */));
            container.register(RouterConfiguration.customize({ resolutionMode: mode }));
            const component = container.get(Root);
            const router = container.get(IRouter);
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            au.app({ component, host });
            await au.start();
            assertComponentsVisible(host, [Root]);
            await router.load('a/b');
            assertComponentsVisible(host, [Root, [A, [Ac01]]]);
            await au.stop(true);
            assert.areTaskQueuesEmpty();
        });
        it(`will load the global-fallback when navigating to a non-existing route - sibling + parent-child - with mode: ${mode}`, async function () {
            let Ac01 = class Ac01 {
            };
            Ac01 = __decorate([
                customElement({ name: 'ce-a01', template: 'ac01' })
            ], Ac01);
            let Ac02 = class Ac02 {
            };
            Ac02 = __decorate([
                customElement({ name: 'ce-a02', template: 'ac02' })
            ], Ac02);
            let A = class A {
            };
            A = __decorate([
                route({
                    routes: [
                        { id: 'rc1', path: 'ac01', component: Ac01 },
                        { id: 'rc2', path: 'ac02', component: Ac02 },
                    ],
                    fallback: 'rc1',
                }),
                customElement({ name: 'ce-a', template: 'a<au-viewport>', dependencies: [Ac01, Ac02] })
            ], A);
            let Bc01 = class Bc01 {
            };
            Bc01 = __decorate([
                customElement({ name: 'ce-b01', template: 'bc01' })
            ], Bc01);
            let Bc02 = class Bc02 {
            };
            Bc02 = __decorate([
                customElement({ name: 'ce-b02', template: 'bc02' })
            ], Bc02);
            let B = class B {
            };
            B = __decorate([
                route({
                    routes: [
                        { id: 'rc1', path: 'bc01', component: Bc01 },
                        { id: 'rc2', path: 'bc02', component: Bc02 },
                    ],
                    fallback: 'rc2',
                }),
                customElement({ name: 'ce-b', template: 'b<au-viewport>', dependencies: [Bc01, Bc02] })
            ], B);
            let Root = class Root {
            };
            Root = __decorate([
                route({
                    routes: [
                        { id: 'r1', path: 'a', component: A },
                        { id: 'r2', path: 'b', component: B },
                    ],
                    fallback: 'r1',
                }),
                customElement({
                    name: 'root',
                    template: `root<au-viewport></au-viewport><au-viewport></au-viewport>`,
                    dependencies: [A, B],
                })
            ], Root);
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for(3 /* warn */));
            container.register(RouterConfiguration.customize({ resolutionMode: mode }));
            const component = container.get(Root);
            const router = container.get(IRouter);
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            au.app({ component, host });
            await au.start();
            assertComponentsVisible(host, [Root]);
            await router.load('a/ac02+b/u');
            assertComponentsVisible(host, [Root, [A, [Ac02]], [B, [Bc02]]]);
            await router.load('a/u+b/bc01');
            assertComponentsVisible(host, [Root, [A, [Ac01]], [B, [Bc01]]]);
            await router.load('a/u+b/u');
            assertComponentsVisible(host, [Root, [A, [Ac01]], [B, [Bc02]]]);
            await au.stop(true);
            assert.areTaskQueuesEmpty();
        });
        it(`au-viewport#fallback precedes global fallback - with mode: ${mode}`, async function () {
            let A = class A {
            };
            A = __decorate([
                customElement({ name: 'ce-a', template: 'a' })
            ], A);
            let B = class B {
            };
            B = __decorate([
                customElement({ name: 'ce-b', template: 'b' })
            ], B);
            let Root = class Root {
            };
            Root = __decorate([
                route({
                    routes: [
                        { id: 'r1', path: 'a', component: A },
                        { id: 'r2', path: 'b', component: B },
                    ],
                    fallback: 'r1',
                }),
                customElement({
                    name: 'root',
                    template: `root<au-viewport name="1"></au-viewport><au-viewport name="2" fallback="r2"></au-viewport>`,
                    dependencies: [A, B],
                })
            ], Root);
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for(3 /* warn */));
            container.register(RouterConfiguration.customize({ resolutionMode: mode }));
            const component = container.get(Root);
            const router = container.get(IRouter);
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            au.app({ component, host });
            await au.start();
            assertComponentsVisible(host, [Root]);
            await router.load('u1@1+u2@2');
            assertComponentsVisible(host, [Root, [A, B]]);
            await au.stop(true);
            assert.areTaskQueuesEmpty();
        });
    }
    it(`correctly parses parameters`, async function () {
        const a1Params = [];
        const a2Params = [];
        const b1Params = [];
        const b2arams = [];
        let B1 = class B1 {
            load(params) {
                b1Params.push(params);
            }
        };
        B1 = __decorate([
            customElement({ name: 'b1', template: null })
        ], B1);
        let B2 = class B2 {
            load(params) {
                b2arams.push(params);
            }
        };
        B2 = __decorate([
            customElement({ name: 'b2', template: null })
        ], B2);
        let A1 = class A1 {
            load(params) {
                a1Params.push(params);
            }
        };
        A1 = __decorate([
            route({
                routes: [
                    { path: 'b1/:b', component: B1 },
                ]
            }),
            customElement({
                name: 'a1',
                template: `<au-viewport></au-viewport>`,
                dependencies: [B1],
            })
        ], A1);
        let A2 = class A2 {
            load(params) {
                a2Params.push(params);
            }
        };
        A2 = __decorate([
            route({
                routes: [
                    { path: 'b2/:d', component: B2 },
                ]
            }),
            customElement({
                name: 'a2',
                template: `<au-viewport></au-viewport>`,
                dependencies: [B2],
            })
        ], A2);
        let Root = class Root {
        };
        Root = __decorate([
            route({
                routes: [
                    { path: 'a1/:a', component: A1 },
                    { path: 'a2/:c', component: A2 },
                ]
            }),
            customElement({
                name: 'root',
                template: `<au-viewport name="a1"></au-viewport><au-viewport name="a2"></au-viewport>`,
                dependencies: [A1, A2],
            })
        ], Root);
        const ctx = TestContext.create();
        const { container } = ctx;
        container.register(TestRouterConfiguration.for(3 /* warn */));
        container.register(RouterConfiguration);
        const component = container.get(Root);
        const router = container.get(IRouter);
        const au = new Aurelia(container);
        const host = ctx.createElement('div');
        au.app({ component, host });
        await au.start();
        await router.load('a1/a/b1/b+a2/c/b2/d');
        await router.load('a1/1/b1/2+a2/3/b2/4');
        // TODO(sayan): avoid adding parent parameters; or add those to a separate property.
        assert.deepStrictEqual([
            a1Params,
            b1Params,
            a2Params,
            b2arams,
        ], [
            [
                { a: 'a' },
                { a: '1' },
            ],
            [
                { a: 'a', b: 'b' },
                { a: '1', b: '2' },
            ],
            [
                { c: 'c' },
                { c: '3' },
            ],
            [
                { c: 'c', d: 'd' },
                { c: '3', d: '4' },
            ],
        ]);
        await au.stop(true);
        assert.areTaskQueuesEmpty();
    });
    // TODO(sayan): add more tests for parameter parsing with multiple route parameters including optional parameter.
    it('does not interfere with standard "href" attribute', async function () {
        const ctx = TestContext.create();
        const { container } = ctx;
        container.register(TestRouterConfiguration.for(1 /* debug */));
        container.register(RouterConfiguration);
        const component = container.get(CustomElement.define({ name: 'app', template: '<a href.bind="href">' }, class App {
            constructor() {
                this.href = 'abc';
            }
        }));
        const au = new Aurelia(container);
        const host = ctx.createElement('div');
        await au.app({ component, host }).start();
        assert.strictEqual(host.querySelector('a').getAttribute('href'), 'abc');
        component.href = null;
        ctx.platform.domWriteQueue.flush();
        assert.strictEqual(host.querySelector('a').getAttribute('href'), null);
        await au.stop();
    });
    {
        let VmA = class VmA {
            load(params, next) {
                this.params = params;
                this.query = next.queryParams;
            }
        };
        VmA = __decorate([
            customElement({ name: 'vm-a', template: `view-a foo: \${params.foo} | query: \${query.toString()}` })
        ], VmA);
        let VmB = class VmB {
            constructor(router) {
                this.router = router;
            }
            async redirect1() {
                await this.router.load('a?foo=bar');
            }
            async redirect2() {
                await this.router.load('a', { queryParams: { foo: 'bar' } });
            }
            async redirect3() {
                await this.router.load('a?foo=fizz', { queryParams: { foo: 'bar' } });
            }
            async redirect4() {
                await this.router.load('a/fizz', { queryParams: { foo: 'bar' } });
            }
        };
        VmB = __decorate([
            customElement({ name: 'vm-b', template: 'view-b' }),
            __param(0, IRouter),
            __metadata("design:paramtypes", [Object])
        ], VmB);
        let AppRoot = class AppRoot {
        };
        AppRoot = __decorate([
            route({
                title: 'base',
                routes: [
                    { path: ['a', 'a/:foo'], component: VmA, title: 'A', },
                    { path: ['', 'b'], component: VmB, title: 'B' },
                ],
            }),
            customElement({ name: 'app-root', template: '<au-viewport></au-viewport>' })
        ], AppRoot);
        async function start(buildTitle = null) {
            const ctx = TestContext.create();
            const { container } = ctx;
            container.register(TestRouterConfiguration.for(3 /* warn */), RouterConfiguration.customize({ buildTitle }));
            const au = new Aurelia(container);
            const host = ctx.createElement('div');
            await au.app({ component: AppRoot, host }).start();
            return { host, au, container };
        }
        it('queryString - #1', async function () {
            const { host, au } = await start();
            const vmb = CustomElement.for(host.querySelector('vm-b')).viewModel;
            await vmb.redirect1();
            assert.html.textContent(host, 'view-a foo: undefined | query: foo=bar');
            await au.stop();
        });
        it('queryString - #2', async function () {
            const { host, au } = await start();
            const vmb = CustomElement.for(host.querySelector('vm-b')).viewModel;
            await vmb.redirect2();
            assert.html.textContent(host, 'view-a foo: undefined | query: foo=bar');
            await au.stop();
        });
        it('queryString - #3', async function () {
            const { host, au } = await start();
            const vmb = CustomElement.for(host.querySelector('vm-b')).viewModel;
            await vmb.redirect3();
            assert.html.textContent(host, 'view-a foo: undefined | query: foo=bar');
            await au.stop();
        });
        it('queryString - #4', async function () {
            const { host, au } = await start();
            const vmb = CustomElement.for(host.querySelector('vm-b')).viewModel;
            await vmb.redirect4();
            assert.html.textContent(host, 'view-a foo: fizz | query: foo=bar');
            await au.stop();
        });
        it('shows title correctly', async function () {
            const { host, au, container } = await start();
            assert.strictEqual(container.get(IPlatform).document.title, 'B | base');
            const vmb = CustomElement.for(host.querySelector('vm-b')).viewModel;
            await vmb.redirect1();
            assert.strictEqual(container.get(IPlatform).document.title, 'A | base');
            await au.stop();
        });
        it('respects custom buildTitle', async function () {
            const { host, au, container } = await start((tr) => {
                const root = tr.routeTree.root;
                return `${root.context.definition.config.title} - ${root.children.map(c => c.title).join(' - ')}`;
            });
            assert.strictEqual(container.get(IPlatform).document.title, 'base - B');
            const vmb = CustomElement.for(host.querySelector('vm-b')).viewModel;
            await vmb.redirect1();
            assert.strictEqual(container.get(IPlatform).document.title, 'base - A');
            await au.stop();
        });
        // TODO(sayan): add more tests for title involving children and sibling routes
    }
    // TODO(sayan): add tests here for the location URL building in relation for sibling, parent/children relationship and viewport name
});
//# sourceMappingURL=smoke-tests.spec.js.map