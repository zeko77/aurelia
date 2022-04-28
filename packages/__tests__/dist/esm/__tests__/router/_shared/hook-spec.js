import { setTimeoutWaiter } from './waiters.js';
function getHookSpecs(name) {
    return {
        sync: {
            name,
            type: 'sync',
            ticks: 0,
            invoke(_vm, getValue, tracker) {
                var _a, _b, _c, _d;
                if (tracker) {
                    tracker.notify(`${(_b = (_a = _vm.viewport) === null || _a === void 0 ? void 0 : _a.pathname) !== null && _b !== void 0 ? _b : ''}.${_vm.name}`, 'enter');
                }
                const value = getValue();
                // console.log(`${_vm.name}.${name} sync`, value);
                if (tracker) {
                    tracker.notify(`${(_d = (_c = _vm.viewport) === null || _c === void 0 ? void 0 : _c.pathname) !== null && _d !== void 0 ? _d : ''}.${_vm.name}`, 'leave');
                }
                return value;
            },
        },
        async(count) {
            return {
                name,
                type: `async${count}`,
                ticks: count,
                invoke(_vm, getValue, tracker) {
                    var _a, _b;
                    if (tracker) {
                        tracker.notify(`${(_b = (_a = _vm.viewport) === null || _a === void 0 ? void 0 : _a.pathname) !== null && _b !== void 0 ? _b : ''}.${_vm.name}`, 'enter');
                    }
                    const value = getValue();
                    let i = -1;
                    // console.log(`${_vm.name}.${name} enter async(${count})`, value);
                    function next() {
                        var _a, _b, _c, _d;
                        // if (i >= 0) {
                        //   console.log(`${_vm.name}.${name} tick ${i + 1} async(${count})`, value);
                        // }
                        if (++i < count) {
                            if (tracker) {
                                tracker.notify(`${(_b = (_a = _vm.viewport) === null || _a === void 0 ? void 0 : _a.pathname) !== null && _b !== void 0 ? _b : ''}.${_vm.name}`, 'tick');
                            }
                            return Promise.resolve().then(next);
                        }
                        // console.log(`${_vm.name}.${name} leave async(${count})`, value);
                        if (tracker) {
                            tracker.notify(`${(_d = (_c = _vm.viewport) === null || _c === void 0 ? void 0 : _c.pathname) !== null && _d !== void 0 ? _d : ''}.${_vm.name}`, 'leave');
                        }
                        return value;
                    }
                    return next();
                },
            };
        },
        setTimeout_0: {
            name,
            ticks: -1,
            type: 'setTimeout_0',
            async invoke(vm, getValue, tracker) {
                const value = getValue();
                const ctx = vm.$controller.container;
                const label = `${vm.name}.${name}`;
                return setTimeoutWaiter(ctx, 0, label)
                    .then(() => value);
            },
        },
    };
}
export const hookSpecsMap = {
    binding: getHookSpecs('binding'),
    bound: getHookSpecs('bound'),
    attaching: getHookSpecs('attaching'),
    attached: getHookSpecs('attached'),
    detaching: getHookSpecs('detaching'),
    unbinding: getHookSpecs('unbinding'),
    dispose: getHookSpecs('dispose').sync,
    canLoad: getHookSpecs('canLoad'),
    load: getHookSpecs('load'),
    canUnload: getHookSpecs('canUnload'),
    unload: getHookSpecs('unload'),
};
function groupByPrefix(list) {
    var _a;
    const groups = {};
    for (let i = 0; i < list.length; ++i) {
        const item = list[i];
        const prefix = item.slice(0, item.indexOf('.'));
        ((_a = groups[prefix]) !== null && _a !== void 0 ? _a : (groups[prefix] = [])).push(item);
    }
    return groups;
}
export function verifyInvocationsEqual(actualIn, expectedIn) {
    var _a;
    let actual = filterHooks(actualIn);
    let expected = filterHooks(expectedIn);
    const errors = [];
    const expectedGroups = groupByPrefix(expected);
    const actualGroups = groupByPrefix(actual);
    for (const prefix in expectedGroups) {
        expected = expectedGroups[prefix];
        actual = (_a = actualGroups[prefix]) !== null && _a !== void 0 ? _a : [];
        const len = Math.max(actual.length, expected.length);
        for (let i = 0; i < len; ++i) {
            const $actual = actual[i];
            const $expected = expected[i];
            if ($actual === $expected) {
                errors.push(`    OK : ${$actual}`);
            }
            else {
                errors.push(`NOT OK : ${$actual} (expected: ${$expected})`);
            }
        }
    }
    if (errors.some(e => e.startsWith('N'))) {
        throw new Error(`Failed assertion: invocation mismatch\n  - ${errors.join('\n  - ')})`);
    }
}
function filterHooks(hooks) {
    return hooks.filter(hook => hook
        && !hook.endsWith('.leave')
        && !hook.endsWith('.tick')
        // && !hook.endsWith('.dispose')
        // && !hook.startsWith('stop.')
        && (hook.includes('canUnload') || hook.includes('canLoad') || hook.includes('unload') || hook.includes('load'))).map(hook => hook.replace(/:.*?\./gi, '.').replace(/\.enter$/, ''));
}
//# sourceMappingURL=hook-spec.js.map