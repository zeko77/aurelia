var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomElement, lifecycleHooks, LifecycleHooks, } from '@aurelia/runtime-html';
import { assert, createFixture } from '@aurelia/testing';
describe('3-runtime-html/lifecycle-hooks.spec.ts', function () {
    it('retrieves global hooks at root', async function () {
        class Hooks {
            attaching() { }
        }
        const { au, startPromise, tearDown } = createFixture(`\${message}`, class App {
        }, [LifecycleHooks.define({}, Hooks)]);
        await startPromise;
        const hooks = au.root.controller.lifecycleHooks;
        assert.strictEqual(hooks.attaching.length, 1);
        await tearDown();
    });
    it('retrieves global hooks at child', async function () {
        class Hooks {
            attaching() { }
        }
        const { au, component, startPromise, tearDown } = createFixture(`<el view-model.ref="el">`, class App {
        }, [
            CustomElement.define({
                name: 'el',
                dependencies: []
            }),
            LifecycleHooks.define({}, Hooks)
        ]);
        await startPromise;
        const hooks = au.root.controller.lifecycleHooks;
        assert.strictEqual(hooks.attaching.length, 1);
        const childHooks = component.el.$controller.lifecycleHooks;
        assert.strictEqual(childHooks.attaching.length, 1);
        await tearDown();
    });
    it('retrieves local hooks at child', async function () {
        var _a;
        class Hooks {
            attaching() { }
        }
        const { au, component, startPromise, tearDown } = createFixture(`<el view-model.ref="el">`, class App {
        }, [
            CustomElement.define({
                name: 'el',
                dependencies: [
                    LifecycleHooks.define({}, Hooks)
                ]
            }),
        ]);
        await startPromise;
        const hooks = au.root.controller.lifecycleHooks;
        assert.notStrictEqual((_a = hooks.attaching) === null || _a === void 0 ? void 0 : _a.length, 0);
        const childHooks = component.el.$controller.lifecycleHooks;
        assert.strictEqual(childHooks.attaching.length, 1);
        await tearDown();
    });
    describe('<App/> -> <Child/> -> <Grand Child/>', function () {
        it('does not retrieve hooks in the middle layer', async function () {
            var _a;
            let hooksCall = 0;
            let differentHooksCall = 0;
            class Hooks {
                attaching() {
                    hooksCall++;
                }
            }
            class Hooks2 {
                attaching() {
                    hooksCall++;
                }
            }
            class DifferentHooks {
                attaching() {
                    differentHooksCall++;
                }
            }
            class DifferentHooks2 {
                attaching() {
                    differentHooksCall++;
                }
            }
            const { au, component, startPromise, tearDown } = createFixture(`<el view-model.ref="el">`, class App {
            }, [
                CustomElement.define({
                    name: 'el',
                    template: '<el-child view-model.ref="elChild">',
                    dependencies: [
                        LifecycleHooks.define({}, Hooks),
                        LifecycleHooks.define({}, Hooks2),
                        CustomElement.define({
                            name: 'el-child',
                            dependencies: [
                                LifecycleHooks.define({}, DifferentHooks),
                                LifecycleHooks.define({}, DifferentHooks2)
                            ]
                        })
                    ]
                }),
            ]);
            await startPromise;
            const hooks = au.root.controller.lifecycleHooks;
            assert.notStrictEqual((_a = hooks.attaching) === null || _a === void 0 ? void 0 : _a.length, 0);
            const childHooks = component.el.$controller.lifecycleHooks;
            assert.strictEqual(childHooks.attaching.length, 2);
            const grandChildHooks = component.el.elChild.$controller.lifecycleHooks;
            assert.strictEqual(grandChildHooks.attaching.length, 2);
            assert.strictEqual(hooksCall, 0);
            assert.strictEqual(differentHooksCall, 0);
            childHooks.attaching.forEach(x => x.instance.attaching(null));
            grandChildHooks.attaching.forEach(x => x.instance.attaching(null));
            assert.strictEqual(hooksCall, 2);
            assert.strictEqual(differentHooksCall, 2);
            await tearDown();
        });
        it('retrieves the same hooks Type twice as declaration', async function () {
            var _a;
            let hooksCall = 0;
            let differentHooksCall = 0;
            let Hooks = class Hooks {
                attaching() {
                    hooksCall++;
                }
            };
            Hooks = __decorate([
                lifecycleHooks()
            ], Hooks);
            let Hooks2 = class Hooks2 {
                attaching() {
                    hooksCall++;
                }
            };
            Hooks2 = __decorate([
                lifecycleHooks()
            ], Hooks2);
            let DifferentHooks = class DifferentHooks {
                attaching() {
                    differentHooksCall++;
                }
            };
            DifferentHooks = __decorate([
                lifecycleHooks()
            ], DifferentHooks);
            let DifferentHooks2 = class DifferentHooks2 {
                attaching() {
                    differentHooksCall++;
                }
            };
            DifferentHooks2 = __decorate([
                lifecycleHooks()
            ], DifferentHooks2);
            const { au, component, startPromise, tearDown } = createFixture(`<el view-model.ref="el">`, class App {
            }, [
                CustomElement.define({
                    name: 'el',
                    template: '<el-child view-model.ref="elChild">',
                    dependencies: [
                        Hooks,
                        Hooks2,
                        Hooks,
                        Hooks2,
                        CustomElement.define({
                            name: 'el-child',
                            dependencies: [
                                DifferentHooks,
                                DifferentHooks2,
                                DifferentHooks,
                                DifferentHooks2,
                            ]
                        })
                    ]
                }),
            ]);
            await startPromise;
            const hooks = au.root.controller.lifecycleHooks;
            assert.notStrictEqual((_a = hooks.attaching) === null || _a === void 0 ? void 0 : _a.length, 0);
            const childHooks = component.el.$controller.lifecycleHooks;
            assert.strictEqual(childHooks.attaching.length, 4);
            const grandChildHooks = component.el.elChild.$controller.lifecycleHooks;
            assert.strictEqual(grandChildHooks.attaching.length, 4);
            assert.strictEqual(hooksCall, 0);
            assert.strictEqual(differentHooksCall, 0);
            childHooks.attaching.forEach(x => x.instance.attaching(null));
            grandChildHooks.attaching.forEach(x => x.instance.attaching(null));
            assert.strictEqual(hooksCall, 4);
            assert.strictEqual(differentHooksCall, 4);
            await tearDown();
        });
    });
});
//# sourceMappingURL=lifecycle-hooks.spec.js.map