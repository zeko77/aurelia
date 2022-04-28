import { PropertyBinding, AttrBindingBehavior, DataAttributeAccessor } from '@aurelia/runtime-html';
import { TestContext, assert } from '@aurelia/testing';
describe('3-runtime-html/attr-binding-behavior.spec.ts', function () {
    let target;
    let targetProperty;
    let container;
    let sut;
    let binding;
    // eslint-disable-next-line mocha/no-hooks
    beforeEach(function () {
        const ctx = TestContext.create();
        target = ctx.createElement('div');
        targetProperty = 'foo';
        sut = new AttrBindingBehavior();
        container = ctx.container;
        binding = new PropertyBinding(undefined, target, targetProperty, undefined, undefined, container, {});
        sut.bind(undefined, undefined, binding);
    });
    it('bind()   should put a DataAttributeObserver on the binding', function () {
        assert.strictEqual(binding.targetObserver instanceof DataAttributeAccessor, true, `binding.targetObserver instanceof DataAttributeAccessor`);
    });
    // it('unbind() should clear the DataAttributeObserver from the binding', function () {
    //   // TODO: it doesn't actually do, and it should
    // });
});
//# sourceMappingURL=attr-binding-behavior.spec.js.map