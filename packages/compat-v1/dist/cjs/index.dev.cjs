'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@aurelia/runtime');
var runtimeHtml = require('@aurelia/runtime-html');
var interpolationBinding = require('@aurelia/runtime-html/dist/types/binding/interpolation-binding');

let defined$1 = false;
function defineAstMethods() {
    if (defined$1) {
        return;
    }
    defined$1 = true;
    const def = (Klass, name, value) => Object.defineProperty(Klass.prototype, name, { configurable: true, enumerable: false, writable: true, value });
    [
        runtime.BindingBehaviorExpression,
        runtime.ValueConverterExpression,
        runtime.AssignExpression,
        runtime.ConditionalExpression,
        runtime.AccessThisExpression,
        runtime.AccessScopeExpression,
        runtime.AccessMemberExpression,
        runtime.AccessKeyedExpression,
        runtime.CallScopeExpression,
        runtime.CallMemberExpression,
        runtime.CallFunctionExpression,
        runtime.BinaryExpression,
        runtime.UnaryExpression,
        runtime.PrimitiveLiteralExpression,
        runtime.ArrayLiteralExpression,
        runtime.ObjectLiteralExpression,
        runtime.TemplateExpression,
        runtime.TaggedTemplateExpression,
        runtime.ArrayBindingPattern,
        runtime.ObjectBindingPattern,
        runtime.BindingIdentifier,
        runtime.ForOfStatement,
        runtime.Interpolation,
        runtime.DestructuringAssignmentExpression,
        runtime.DestructuringAssignmentSingleExpression,
        runtime.DestructuringAssignmentRestExpression,
        runtime.ArrowFunction,
    ].forEach(ast => {
        def(ast, 'evaluate', function (...args) {
            return runtime.astEvaluate(this, ...args);
        });
        def(ast, 'assign', function (...args) {
            return runtime.astAssign(this, ...args);
        });
        def(ast, 'accept', function (...args) {
            return runtime.astVisit(this, ...args);
        });
        def(ast, 'bind', function (...args) {
            return runtime.astBind(this, ...args);
        });
        def(ast, 'unbind', function (...args) {
            return runtime.astUnbind(this, ...args);
        });
        console.warn('"evaluate"/"assign"/"accept"/"visit"/"bind"/"unbind" are only valid on AST with $kind Custom.'
            + ' Or import and use astEvaluate/astAssign/astVisit/astBind/astUnbind accordingly.');
    });
}

let defined = false;
const defineBindingMethods = () => {
    if (defined)
        return;
    defined = true;
    [
        [runtimeHtml.PropertyBinding, 'Property binding'],
        [runtimeHtml.AttributeBinding, 'Attribute binding'],
        [runtimeHtml.Listener, 'Listener binding'],
        [runtimeHtml.CallBinding, 'Call binding'],
        [runtimeHtml.LetBinding, 'Let binding'],
        [runtimeHtml.InterpolationPartBinding, 'Interpolation binding'],
        [interpolationBinding.ContentBinding, 'Text binding'],
        [runtimeHtml.RefBinding, 'Ref binding']
    ].forEach(([b, name]) => {
        Object.defineProperty(b.prototype, 'sourceExpression', {
            configurable: true, enumerable: false, writable: true, get() {
                console.warn(`@deprecated "sourceExpression" property for expression on ${name}. It has been renamed to "ast". expression: "${runtime.Unparser.unparse(this.ast)}"`);
                return this.ast;
            }
        });
    });
};

const PreventFormActionlessSubmit = runtimeHtml.AppTask.creating(runtimeHtml.IEventTarget, appRoot => {
    appRoot.addEventListener('submit', (e) => {
        const target = e.target;
        const action = target.action;
        if (target.tagName.toLowerCase() === 'form' && !action) {
            e.preventDefault();
        }
    }, false);
});

const registration = {
    register(container) {
        defineAstMethods();
        defineBindingMethods();
        container.register(PreventFormActionlessSubmit);
    }
};

exports.PreventFormActionlessSubmit = PreventFormActionlessSubmit;
exports["default"] = registration;
//# sourceMappingURL=index.dev.cjs.map
