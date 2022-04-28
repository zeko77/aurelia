import { CustomAttribute } from '@aurelia/runtime-html';
import { assert, createFixture } from '@aurelia/testing';
describe('3-runtime-html/binding-command.attr.spec.ts', function () {
    const testCases = [
        {
            title: 'sets attribute with hyphen',
            template: '<div my-attr.attr="a">',
            App: class {
                constructor() {
                    this.a = 5;
                }
            },
            assertFn: ({ appHost }) => {
                var _a;
                assert.strictEqual((_a = appHost.querySelector('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('my-attr'), '5');
            },
        },
        {
            title: 'sets attribute without hyphen',
            template: '<div myattr.attr="a">',
            App: class {
                constructor() {
                    this.a = 5;
                }
            },
            assertFn: ({ appHost }) => {
                var _a;
                assert.strictEqual((_a = appHost.querySelector('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('myattr'), '5');
            },
        },
        {
            title: 'ignores custom attributes',
            template: '<div custom-attr.attr="a"></div>',
            App: class {
                constructor() {
                    this.a = 5;
                }
            },
            registrations: [
                CustomAttribute.define({ name: 'custom-attr', bindables: ['value'] }, class {
                    constructor() {
                        throw new Error('Should have not created a custom attribute');
                    }
                })
            ],
            assertFn: ({ appHost }) => {
                var _a;
                assert.strictEqual((_a = appHost.querySelector('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('custom-attr'), '5');
            },
        },
        {
            title: 'removes attribute when value is null/undefined',
            template: '<div myattr.attr="a">',
            App: class App {
                constructor() {
                    this.a = 5;
                }
            },
            assertFn: ({ ctx, appHost, component }) => {
                var _a;
                assert.strictEqual((_a = appHost.querySelector('div')) === null || _a === void 0 ? void 0 : _a.getAttribute('myattr'), '5');
                component['a'] = undefined;
                assert.strictEqual(appHost.querySelector('div').getAttribute('myattr'), '5');
                ctx.platform.domWriteQueue.flush();
                assert.strictEqual(appHost.querySelector('div').hasAttribute('myattr'), false);
                component['a'] = 5;
                assert.strictEqual(appHost.querySelector('div').hasAttribute('myattr'), false);
                ctx.platform.domWriteQueue.flush();
                assert.strictEqual(appHost.querySelector('div').getAttribute('myattr'), '5');
                component['a'] = null;
                assert.strictEqual(appHost.querySelector('div').getAttribute('myattr'), '5');
                ctx.platform.domWriteQueue.flush();
                assert.strictEqual(appHost.querySelector('div').hasAttribute('myattr'), false);
            },
        },
    ];
    for (const testCase of testCases) {
        const { title, template, App, registrations = [], assertFn } = testCase;
        it(title, async function () {
            const { appHost, ctx, component, startPromise, tearDown } = createFixture(template, App, registrations);
            await startPromise;
            await assertFn({ ctx, component, appHost });
            await tearDown();
        });
    }
});
//# sourceMappingURL=binding-command.attr.spec.js.map