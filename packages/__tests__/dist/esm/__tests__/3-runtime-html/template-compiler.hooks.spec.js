var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomElement, templateCompilerHooks, TemplateCompilerHooks } from '@aurelia/runtime-html';
import { assert, createFixture } from '@aurelia/testing';
describe('3-runtime-html/templating-compiler.hooks.spec.ts', function () {
    it('compiles with child hooks', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: [TemplateCompilerHooks.define(class {
                        compiling(template) {
                            template.content.querySelector('input').setAttribute('value.bind', 'value');
                        }
                    })]
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            })
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello');
        await tearDown();
    });
    it('compiles with root hooks', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: []
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            }),
            TemplateCompilerHooks.define(class {
                compiling(template) {
                    var _a;
                    (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('value.bind', 'value');
                }
            })
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello');
        await tearDown();
    });
    it('does not compiles with hooks from parent', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<parent>`, class App {
        }, [
            CustomElement.define({
                name: 'parent',
                template: '<child>',
                dependencies: [
                    TemplateCompilerHooks.define(class {
                        compiling(template) {
                            var _a;
                            (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('value.bind', 'value');
                        }
                    }),
                    CustomElement.define({
                        name: 'child',
                        template: '<input>',
                        dependencies: [
                            TemplateCompilerHooks.define(class {
                                compiling(template) {
                                    var _a;
                                    assert.strictEqual(template.content.querySelector('input').getAttribute('value.bind'), null);
                                    (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('value.bind', 'value2');
                                }
                            }),
                        ]
                    }, class Child {
                        constructor() {
                            this.value = 'hello';
                            this.value2 = 'hello 2';
                        }
                    })
                ]
            }, class Parent {
            }),
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello 2');
        await tearDown();
    });
    it('gets all hooks registered in child', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: [
                    TemplateCompilerHooks.define(class {
                        compiling(template) {
                            template.content.querySelector('input').setAttribute('value.bind', 'value');
                        }
                    }),
                    TemplateCompilerHooks.define(class {
                        compiling(template) {
                            template.content.querySelector('input').setAttribute('id.bind', 'value');
                        }
                    }),
                ]
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            })
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello');
        assert.strictEqual(appHost.querySelector('input').id, 'hello');
        await tearDown();
    });
    it('gets all hooks registered in root', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: []
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            }),
            TemplateCompilerHooks.define(class {
                compiling(template) {
                    var _a;
                    (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('value.bind', 'value');
                }
            }),
            TemplateCompilerHooks.define(class {
                compiling(template) {
                    var _a;
                    (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('id.bind', 'value');
                }
            }),
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello');
        assert.strictEqual(appHost.querySelector('input').id, 'hello');
        await tearDown();
    });
    it('gets all hooks registered in root and child', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: [
                    TemplateCompilerHooks.define(class {
                        compiling(template) {
                            var _a;
                            (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-id-1.bind', 'value');
                        }
                    }),
                    TemplateCompilerHooks.define(class {
                        compiling(template) {
                            var _a;
                            (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-id-2.bind', 'value');
                        }
                    }),
                ]
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            }),
            TemplateCompilerHooks.define(class {
                compiling(template) {
                    var _a;
                    (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-id-3.bind', 'value');
                }
            }),
            TemplateCompilerHooks.define(class {
                compiling(template) {
                    var _a;
                    (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-id-4.bind', 'value');
                }
            }),
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').getAttribute('data-id-1'), 'hello');
        assert.strictEqual(appHost.querySelector('input').getAttribute('data-id-2'), 'hello');
        assert.strictEqual(appHost.querySelector('input').getAttribute('data-id-3'), 'hello');
        assert.strictEqual(appHost.querySelector('input').getAttribute('data-id-4'), 'hello');
        await tearDown();
    });
    it('calls hooks in child before root', async function () {
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: [
                    TemplateCompilerHooks.define(class {
                        compiling(template) {
                            var _a;
                            (_a = template.content.querySelector('input')) === null || _a === void 0 ? void 0 : _a.setAttribute('data-id-2.bind', 'value');
                        }
                    }),
                ]
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            }),
            TemplateCompilerHooks.define(class {
                compiling(template) {
                    const input = template.content.querySelector('input');
                    input === null || input === void 0 ? void 0 : input.setAttribute('data-id-1.bind', 'value');
                    if (input) {
                        assert.strictEqual(input.getAttribute('data-id-2.bind'), 'value');
                    }
                }
            }),
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').getAttribute('data-id-1'), 'hello');
        assert.strictEqual(appHost.querySelector('input').getAttribute('data-id-2'), 'hello');
        await tearDown();
    });
    it('works with decorator @templateCompilerHooks (no paren)', async function () {
        let Hooks = class Hooks {
            compiling(template) {
                template.content.querySelector('input').setAttribute('value.bind', 'value');
            }
        };
        Hooks = __decorate([
            templateCompilerHooks
        ], Hooks);
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: [Hooks]
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            })
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello');
        await tearDown();
    });
    it('works with decorator @templateCompilerHooks() (with paren)', async function () {
        let Hooks = class Hooks {
            compiling(template) {
                template.content.querySelector('input').setAttribute('value.bind', 'value');
            }
        };
        Hooks = __decorate([
            templateCompilerHooks()
        ], Hooks);
        const { appHost, startPromise, tearDown } = createFixture(`<my-el>`, class App {
        }, [
            CustomElement.define({
                name: 'my-el',
                template: '<input >',
                dependencies: [Hooks]
            }, class MyEll {
                constructor() {
                    this.value = 'hello';
                }
            })
        ]);
        await startPromise;
        assert.strictEqual(appHost.querySelector('input').value, 'hello');
        await tearDown();
    });
});
//# sourceMappingURL=template-compiler.hooks.spec.js.map