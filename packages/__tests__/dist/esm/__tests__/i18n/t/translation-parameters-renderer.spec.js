import { I18nConfiguration, TranslationBinding, TranslationParametersAttributePattern, TranslationParametersBindingCommand, TranslationParametersBindingInstruction, TranslationParametersBindingRenderer, TranslationParametersInstructionType } from '@aurelia/i18n';
import { DI } from '@aurelia/kernel';
import { IExpressionParser, IObserverLocator, } from '@aurelia/runtime';
import { StandardConfiguration, BindingCommand, IAttributePattern, IPlatform, } from '@aurelia/runtime-html';
import { assert, PLATFORM, TestContext } from '@aurelia/testing';
describe('TranslationParametersAttributePattern', function () {
    function createFixture() {
        const container = DI.createContainer();
        container.register(TranslationParametersAttributePattern);
        return container.get(IAttributePattern);
    }
    it('creates attribute syntax without `to`', function () {
        const sut = createFixture();
        const pattern = 't-params.bind';
        const value = '{foo: "bar"}';
        const actual = sut[pattern](pattern, value, []);
        assert.equal(actual.command, pattern);
        assert.equal(actual.rawName, pattern);
        assert.equal(actual.rawValue, value);
        assert.equal(actual.target, '');
    });
});
describe('TranslationParametersBindingCommand', function () {
    function createFixture() {
        const container = DI.createContainer();
        container.register(TranslationParametersBindingCommand);
        return container.get(BindingCommand.keyFrom(`t-params.bind`));
    }
    it('registers the `t-params.bind` command', function () {
        const sut = createFixture();
        assert.instanceOf(sut, TranslationParametersBindingCommand);
    });
    it('compiles the binding to a TranslationParametersBindingInstruction', function () {
        const sut = createFixture();
        const syntax = { command: 't-params.bind', rawName: 't-params.bind', rawValue: '{foo: "bar"}', target: '' };
        const actual = sut.build({
            node: { nodeName: 'abc' },
            attr: syntax,
            bindable: null,
            def: null,
        });
        assert.instanceOf(actual, TranslationParametersBindingInstruction);
    });
});
describe('TranslationParametersBindingRenderer', function () {
    function createFixture() {
        const { container } = TestContext.create();
        container.register(StandardConfiguration, I18nConfiguration);
        return container;
    }
    it('instantiated with instruction type', function () {
        const container = createFixture();
        const sut = new TranslationParametersBindingRenderer(container.get(IExpressionParser), container.get(IObserverLocator), container.get(IPlatform));
        assert.equal(sut.instructionType, TranslationParametersInstructionType);
    });
    it('#render instantiates TranslationBinding if there are none existing', function () {
        const container = createFixture();
        const sut = new TranslationParametersBindingRenderer(container.get(IExpressionParser), container.get(IObserverLocator), container.get(IPlatform));
        const expressionParser = container.get(IExpressionParser);
        const controller = { container, bindings: [], addBinding(binding) { controller.bindings.push(binding); } };
        const callBindingInstruction = { from: expressionParser.parse('{foo: "bar"}', 8 /* IsProperty */) };
        sut.render(controller, PLATFORM.document.createElement('span'), callBindingInstruction);
        assert.instanceOf(controller.bindings[0], TranslationBinding);
    });
    it('#render add the paramExpr to the existing TranslationBinding for the target element', function () {
        const container = createFixture();
        const sut = new TranslationParametersBindingRenderer(container.get(IExpressionParser), container.get(IObserverLocator), container.get(IPlatform));
        const expressionParser = container.get(IExpressionParser);
        const targetElement = PLATFORM.document.createElement('span');
        const binding = new TranslationBinding(targetElement, container.get(IObserverLocator), container, container.get(IPlatform));
        const hydratable = { container, bindings: [binding] };
        const paramExpr = expressionParser.parse('{foo: "bar"}', 8 /* IsProperty */);
        const callBindingInstruction = { from: paramExpr };
        sut.render(hydratable, targetElement, callBindingInstruction);
        assert.equal(binding['parameter'].expr, paramExpr);
    });
});
//# sourceMappingURL=translation-parameters-renderer.spec.js.map