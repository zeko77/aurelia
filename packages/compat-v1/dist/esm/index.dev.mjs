import { BindingBehaviorExpression, ValueConverterExpression, AssignExpression, ConditionalExpression, AccessThisExpression, AccessScopeExpression, AccessMemberExpression, AccessKeyedExpression, CallScopeExpression, CallMemberExpression, CallFunctionExpression, BinaryExpression, UnaryExpression, PrimitiveLiteralExpression, ArrayLiteralExpression, ObjectLiteralExpression, TemplateExpression, TaggedTemplateExpression, ArrayBindingPattern, ObjectBindingPattern, BindingIdentifier, ForOfStatement, Interpolation, DestructuringAssignmentExpression, DestructuringAssignmentSingleExpression, DestructuringAssignmentRestExpression, ArrowFunction, astEvaluate, astAssign, astVisit, astBind, astUnbind } from '@aurelia/runtime';
import { AppTask, IEventTarget } from '@aurelia/runtime-html';

let defined = false;
function defineAstMethods() {
    if (defined) {
        return;
    }
    defined = true;
    const def = (Klass, name, value) => Object.defineProperty(Klass.prototype, name, { configurable: true, enumerable: false, writable: true, value });
    [
        BindingBehaviorExpression,
        ValueConverterExpression,
        AssignExpression,
        ConditionalExpression,
        AccessThisExpression,
        AccessScopeExpression,
        AccessMemberExpression,
        AccessKeyedExpression,
        CallScopeExpression,
        CallMemberExpression,
        CallFunctionExpression,
        BinaryExpression,
        UnaryExpression,
        PrimitiveLiteralExpression,
        ArrayLiteralExpression,
        ObjectLiteralExpression,
        TemplateExpression,
        TaggedTemplateExpression,
        ArrayBindingPattern,
        ObjectBindingPattern,
        BindingIdentifier,
        ForOfStatement,
        Interpolation,
        DestructuringAssignmentExpression,
        DestructuringAssignmentSingleExpression,
        DestructuringAssignmentRestExpression,
        ArrowFunction
    ].forEach(ast => {
        def(ast, 'evaluate', function (...args) {
            return astEvaluate(this, ...args);
        });
        def(ast, 'assign', function (...args) {
            return astAssign(this, ...args);
        });
        def(ast, 'accept', function (...args) {
            return astVisit(this, ...args);
        });
        def(ast, 'bind', function (...args) {
            return astBind(this, ...args);
        });
        def(ast, 'unbind', function (...args) {
            return astUnbind(this, ...args);
        });
    });
}

const PreventFormActionlessSubmit = AppTask.creating(IEventTarget, appRoot => {
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

export { PreventFormActionlessSubmit, registration as default };
//# sourceMappingURL=index.dev.mjs.map
