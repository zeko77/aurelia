var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CustomElement, view, customElement, Aurelia, RenderPlan, IRendering, } from '@aurelia/runtime-html';
import { eachCartesianJoin, TestContext, trimFull, assert, createFixture, } from '@aurelia/testing';
describe('3-runtime-html/au-render.spec.ts', function () {
    function $createFixture() {
        const ctx = TestContext.create();
        const { container, platform, observerLocator } = ctx;
        const au = new Aurelia(container);
        const host = platform.document.createElement('div');
        return { container, platform, au, host, observerLocator };
    }
    const subjectSpecs = [
        {
            t: '1',
            createSubject: () => ({ template: `<template>Hello!</template>` }),
            expectedText: 'Hello!'
        },
        {
            t: '2',
            createSubject: () => Promise.resolve({ template: `<template>Hello!</template>` }),
            expectedText: 'Hello!'
        },
        {
            t: '3',
            createSubject: () => Promise.resolve().then(() => {
                return new Promise(resolve => {
                    setTimeout(() => { resolve({ template: `<template>Hello!</template>` }); }, 50);
                });
            }),
            expectedText: 'Hello!'
        },
        {
            t: '4',
            createSubject: ctx => ctx.container.get(IRendering).getViewFactory({ name: 'cmp', template: `<template>Hello!</template>` }, ctx.container),
            expectedText: 'Hello!'
        },
        // {
        //   t: '5',
        //   createSubject: ctx => getRenderContext({ name: 'cmp', template: `<template>Hello!</template>` }, ctx.container).getViewFactory().create(),
        //   expectedText: 'Hello!'
        // },
        {
            t: '6',
            createSubject: _ctx => new RenderPlan(`<div>Hello!</div>`, [], []),
            expectedText: 'Hello!'
        }
    ];
    const templateSpecs = [
        {
            t: '1',
            template: `<template><au-render component.bind="sub"></au-render></template>`
        },
        {
            t: '2',
            template: `<template><template as-element="au-render" component.bind="sub"></template></template>`
        },
        {
            t: '13',
            template: `<template><au-render repeat.for="i of 1" component.bind="sub"></au-render></template>`
        },
        {
            t: '4',
            template: `<template><au-render if.bind="true" component.bind="sub"></au-render></template>`
        },
        {
            t: '5',
            template: `<template><div if.bind="false"></div><au-render else component.bind="sub"></au-render></template>`
        },
        {
            t: '16',
            template: `<template><au-render if.bind="true" repeat.for="i of 1" component.bind="sub"></au-render></template>`
        },
        {
            t: '17',
            template: `<template><au-render if.bind="true" repeat.for="i of 1" component.bind="sub"></au-render></template>`
        },
        {
            t: '18',
            template: `<template><au-render component.bind="sub" if.bind="true" repeat.for="i of 1"></au-render></template>`
        },
        {
            t: '19',
            template: `<template><au-render if.bind="true" component.bind="sub" repeat.for="i of 1"></au-render></template>`
        },
    ];
    eachCartesianJoin([subjectSpecs, templateSpecs], (subjectSpec, templateSpec) => {
        const { createSubject, expectedText } = subjectSpec;
        const { template } = templateSpec;
        it(`verify au-compose behavior - subjectSpec ${subjectSpec.t}, templateSpec ${templateSpec.t}`, async function () {
            const ctx = $createFixture();
            const subject = createSubject(ctx);
            const { au, host } = ctx;
            class App {
                constructor() {
                    this.sub = null;
                }
            }
            CustomElement.define({ name: 'app', template }, App);
            const component = new App();
            component.sub = subject;
            const task = au.app({ host, component }).start();
            if (subject instanceof Promise) {
                assert.strictEqual(trimFull(host.textContent), '', `host.textContent #1`);
                await task;
                assert.strictEqual(trimFull(host.textContent), expectedText, `host.textContent #2`);
            }
            else {
                assert.strictEqual(trimFull(host.textContent), expectedText, `host.textContent #3`);
            }
            await au.stop();
        });
    });
    describe('With the ViewLocator value converter', function () {
        it('can compose a vanilla JS class instance', async function () {
            const { au, host } = $createFixture();
            let MyModel = class MyModel {
                constructor() {
                    this.message = 'Hello world!';
                }
            };
            MyModel = __decorate([
                view({ name: 'default-view', template: `\${message}` })
            ], MyModel);
            let App = class App {
                constructor() {
                    this.model = new MyModel();
                }
            };
            App = __decorate([
                customElement({ name: 'app', template: '<au-render component.bind="model | view"></au-compose>' })
            ], App);
            au.app({ host, component: App });
            await au.start();
            assert.visibleTextEqual(host, 'Hello world!');
            await au.stop();
            au.dispose();
        });
    });
    describe('string as component name', function () {
        it('works with string as component name', async function () {
            let callCount = 0;
            const { appHost, startPromise, tearDown } = createFixture(`<au-render component="one">`, class App {
            }, [CustomElement.define({ name: 'one', template: 'one-1' }, class One {
                    constructor() {
                        callCount++;
                    }
                })]);
            await startPromise;
            assert.visibleTextEqual(appHost, 'one-1');
            assert.html.innerEqual(appHost, '<one class="au">one-1</one>');
            assert.strictEqual(callCount, 1);
            await tearDown();
            assert.visibleTextEqual(appHost, '');
            assert.html.innerEqual(appHost, '');
        });
        it('acitvates correctly', async function () {
            let callCount = 0;
            const { appHost, component, startPromise, tearDown } = createFixture(`<au-render if.bind="condition" component="one">`, class App {
                constructor() {
                    this.condition = true;
                }
            }, [CustomElement.define({ name: 'one', template: 'one-1' }, class One {
                    constructor() {
                        callCount++;
                    }
                })]);
            await startPromise;
            assert.visibleTextEqual(appHost, 'one-1');
            assert.html.innerEqual(appHost, '<one class="au">one-1</one>');
            assert.strictEqual(callCount, 1);
            component.condition = false;
            assert.visibleTextEqual(appHost, '');
            assert.html.innerEqual(appHost, '');
            component.condition = true;
            assert.visibleTextEqual(appHost, 'one-1');
            assert.html.innerEqual(appHost, '<one class="au">one-1</one>');
            assert.strictEqual(callCount, 1);
            await tearDown();
        });
        it('throws when theres no registered element', async function () {
            const { start, tearDown } = createFixture(`<au-render if.bind="condition" component="one">`, class App {
                constructor() {
                    this.condition = true;
                }
            }, [], false);
            let ex;
            await start().catch(e => ex = e);
            assert.instanceOf(ex, Error);
            // assert.includes(String(ex), 'Unable to find custom element one for <au-render>.');
            assert.includes(String(ex), 'AUR0809:one');
            await tearDown();
        });
        it('multiple <au-render/> compose independently', async function () {
            let callCount = 0;
            const { appHost, startPromise, tearDown } = createFixture(`<au-render component="one"></au-render> <au-render component="two">`, class App {
            }, [
                CustomElement.define({ name: 'one', template: 'one-1' }, class One {
                    constructor() {
                        callCount++;
                    }
                }),
                CustomElement.define({ name: 'two', template: 'two-2' }, class Two {
                    constructor() {
                        callCount++;
                    }
                }),
            ]);
            await startPromise;
            assert.visibleTextEqual(appHost, 'one-1 two-2');
            assert.html.innerEqual(appHost, '<one class="au">one-1</one> <two class="au">two-2</two>');
            assert.strictEqual(callCount, 2);
            await tearDown();
        });
        it('works with component name in binding', async function () {
            let callCount = 0;
            const { appHost, component, startPromise, tearDown } = createFixture(`<au-render component.bind="condition ? 'one' : 'two'"></au-render>`, class App {
                constructor() {
                    this.condition = true;
                }
            }, [
                CustomElement.define({ name: 'one', template: 'one-1' }, class One {
                    constructor() {
                        callCount++;
                    }
                }),
                CustomElement.define({ name: 'two', template: 'two-2' }, class Two {
                    constructor() {
                        callCount++;
                    }
                }),
            ]);
            await startPromise;
            assert.visibleTextEqual(appHost, 'one-1');
            assert.html.innerEqual(appHost, '<one class="au">one-1</one>');
            assert.strictEqual(callCount, 1);
            component.condition = false;
            assert.visibleTextEqual(appHost, 'two-2');
            assert.html.innerEqual(appHost, '<two class="au">two-2</two>');
            assert.strictEqual(callCount, 2);
            component.condition = true;
            assert.visibleTextEqual(appHost, 'one-1');
            assert.html.innerEqual(appHost, '<one class="au">one-1</one>');
            assert.strictEqual(callCount, 3);
            await tearDown();
            assert.visibleTextEqual(appHost, '');
            assert.html.innerEqual(appHost, '');
        });
    });
});
//# sourceMappingURL=au-render.spec.js.map