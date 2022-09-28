"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var e = require("@aurelia/runtime");

var t = require("@aurelia/runtime-html");

var n = require("@aurelia/runtime-html/dist/types/binding/interpolation-binding");

let i = false;

function r() {
    if (i) return;
    i = true;
    const t = (e, t, n) => Object.defineProperty(e.prototype, t, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: n
    });
    [ e.BindingBehaviorExpression, e.ValueConverterExpression, e.AssignExpression, e.ConditionalExpression, e.AccessThisExpression, e.AccessScopeExpression, e.AccessMemberExpression, e.AccessKeyedExpression, e.CallScopeExpression, e.CallMemberExpression, e.CallFunctionExpression, e.BinaryExpression, e.UnaryExpression, e.PrimitiveLiteralExpression, e.ArrayLiteralExpression, e.ObjectLiteralExpression, e.TemplateExpression, e.TaggedTemplateExpression, e.ArrayBindingPattern, e.ObjectBindingPattern, e.BindingIdentifier, e.ForOfStatement, e.Interpolation, e.DestructuringAssignmentExpression, e.DestructuringAssignmentSingleExpression, e.DestructuringAssignmentRestExpression, e.ArrowFunction ].forEach((n => {
        t(n, "evaluate", (function(...t) {
            return e.astEvaluate(this, ...t);
        }));
        t(n, "assign", (function(...t) {
            return e.astAssign(this, ...t);
        }));
        t(n, "accept", (function(...t) {
            return e.astVisit(this, ...t);
        }));
        t(n, "bind", (function(...t) {
            return e.astBind(this, ...t);
        }));
        t(n, "unbind", (function(...t) {
            return e.astUnbind(this, ...t);
        }));
        console.warn('"evaluate"/"assign"/"accept"/"visit"/"bind"/"unbind" are only valid on AST with $kind Custom.' + " Or import and use astEvaluate/astAssign/astVisit/astBind/astUnbind accordingly.");
    }));
}

let s = false;

const u = () => {
    if (s) return;
    s = true;
    [ [ t.PropertyBinding, "Property binding" ], [ t.AttributeBinding, "Attribute binding" ], [ t.Listener, "Listener binding" ], [ t.CallBinding, "Call binding" ], [ t.LetBinding, "Let binding" ], [ t.InterpolationPartBinding, "Interpolation binding" ], [ n.ContentBinding, "Text binding" ], [ t.RefBinding, "Ref binding" ] ].forEach((([t, n]) => {
        Object.defineProperty(t.prototype, "sourceExpression", {
            configurable: true,
            enumerable: false,
            writable: true,
            get() {
                console.warn(`@deprecated "sourceExpression" property for expression on ${n}. It has been renamed to "ast". expression: "${e.Unparser.unparse(this.ast)}"`);
                return this.ast;
            }
        });
    }));
};

const a = t.AppTask.creating(t.IEventTarget, (e => {
    e.addEventListener("submit", (e => {
        const t = e.target;
        const n = t.action;
        if ("form" === t.tagName.toLowerCase() && !n) e.preventDefault();
    }), false);
}));

const o = {
    register(e) {
        r();
        u();
        e.register(a);
    }
};

exports.PreventFormActionlessSubmit = a;

exports.compatRegistration = o;
//# sourceMappingURL=index.cjs.map
