'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var runtime = require('@aurelia/runtime');
var runtimeHtml = require('@aurelia/runtime-html');

let defined = false;
function defineAstMethods() {
    if (defined) {
        return;
    }
    defined = true;
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
        runtime.ArrowFunction
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
    });
}

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
        container.register(PreventFormActionlessSubmit);
    }
};

exports.PreventFormActionlessSubmit = PreventFormActionlessSubmit;
exports["default"] = registration;
//# sourceMappingURL=index.dev.cjs.map
