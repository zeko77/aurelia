import { BindingBehaviorExpression, ValueConverterExpression, AssignExpression, ConditionalExpression, AccessThisExpression, AccessScopeExpression, AccessMemberExpression, AccessKeyedExpression, CallScopeExpression, CallMemberExpression, CallFunctionExpression, BinaryExpression, UnaryExpression, PrimitiveLiteralExpression, ArrayLiteralExpression, ObjectLiteralExpression, TemplateExpression, TaggedTemplateExpression, ArrayBindingPattern, ObjectBindingPattern, BindingIdentifier, ForOfStatement, Interpolation, DestructuringAssignmentExpression, DestructuringAssignmentSingleExpression, DestructuringAssignmentRestExpression, ArrowFunction, astEvaluate, astAssign, astVisit, astBind, astUnbind, Unparser } from '@aurelia/runtime';
import { PropertyBinding, AttributeBinding, Listener, CallBinding, LetBinding, InterpolationPartBinding, RefBinding, AppTask, IEventTarget } from '@aurelia/runtime-html';
import { ContentBinding } from '@aurelia/runtime-html/dist/types/binding/interpolation-binding';

let defined$1 = false;
function defineAstMethods() {
    if (defined$1) {
        return;
    }
    defined$1 = true;
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
        ArrowFunction,
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
        [PropertyBinding, 'Property binding'],
        [AttributeBinding, 'Attribute binding'],
        [Listener, 'Listener binding'],
        [CallBinding, 'Call binding'],
        [LetBinding, 'Let binding'],
        [InterpolationPartBinding, 'Interpolation binding'],
        [ContentBinding, 'Text binding'],
        [RefBinding, 'Ref binding']
    ].forEach(([b, name]) => {
        Object.defineProperty(b.prototype, 'sourceExpression', {
            configurable: true, enumerable: false, writable: true, get() {
                console.warn(`@deprecated "sourceExpression" property for expression on ${name}. It has been renamed to "ast". expression: "${Unparser.unparse(this.ast)}"`);
                return this.ast;
            }
        });
    });
};

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
        defineBindingMethods();
        container.register(PreventFormActionlessSubmit);
    }
};

export { PreventFormActionlessSubmit, registration as default };
//# sourceMappingURL=index.dev.mjs.map
