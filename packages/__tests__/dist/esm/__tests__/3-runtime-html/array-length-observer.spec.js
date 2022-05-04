import { assert, createFixture, eachCartesianJoin, } from '@aurelia/testing';
import { ValueConverter, } from '@aurelia/runtime';
describe('3-runtime-html/array-length-observer.spec.ts', function () {
    class TestClass {
        constructor() {
            this.items = Array.from({ length: 10 }, (_, idx) => {
                return { name: `i-${idx}`, value: idx + 1 };
            });
            this.logs = [];
        }
        logChange(e) {
            this.logs.push(e.target.value);
        }
    }
    const collectionLengthBindingTestCases = [
        {
            title: 'works in basic scenario',
            template: `<input value.bind="items.length | number" input.trigger="logChange($event)" />`,
            vm: TestClass,
            assertFn: (ctx, host, component) => {
                const inputEl = host.querySelector('input');
                assert.strictEqual(inputEl.value, '10');
                inputEl.value = '00';
                inputEl.dispatchEvent(new ctx.CustomEvent('input'));
                assert.strictEqual(component.items.length, 0);
                assert.deepStrictEqual(component.logs, ['00']);
                assert.strictEqual(inputEl.value, '00');
                ctx.platform.domWriteQueue.flush();
                assert.strictEqual(inputEl.value, '0');
                component.items.push({ name: 'i-0', value: 1 });
                assert.strictEqual(inputEl.value, '0');
                ctx.platform.domWriteQueue.flush();
                assert.strictEqual(inputEl.value, '1');
                inputEl.value = 'aa';
                inputEl.dispatchEvent(new ctx.CustomEvent('input'));
                assert.strictEqual(component.items.length, 1);
                assert.deepStrictEqual(component.logs, ['00', 'aa']);
                assert.strictEqual(inputEl.value, 'aa');
                ctx.platform.domWriteQueue.flush();
                assert.strictEqual(inputEl.value, 'aa');
            },
        },
    ];
    eachCartesianJoin([collectionLengthBindingTestCases], ({ only, title, template, vm, assertFn }) => {
        // eslint-disable-next-line mocha/no-exclusive-tests
        const $it = (title_, fn) => only ? it.only(title_, fn) : it(title_, fn);
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        $it(title, async function () {
            const { ctx, component, appHost, startPromise, tearDown } = createFixture(template, vm, [
                ValueConverter.define('number', class NumberVc {
                    fromView(v) {
                        return Number(v);
                    }
                }),
            ]);
            await startPromise;
            await assertFn(ctx, appHost, component);
            // test cases could be sharing the same context document
            // so wait a bit before running the next test
            await tearDown();
        });
    });
});
//# sourceMappingURL=array-length-observer.spec.js.map