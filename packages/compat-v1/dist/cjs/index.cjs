"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var e = require("@aurelia/runtime");

var t = require("@aurelia/runtime-html");

let r = false;

function n() {
    if (r) return;
    r = true;
    const t = (e, t, r) => Object.defineProperty(e.prototype, t, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: r
    });
    [ e.BindingBehaviorExpression, e.ValueConverterExpression, e.AssignExpression, e.ConditionalExpression, e.AccessThisExpression, e.AccessScopeExpression, e.AccessMemberExpression, e.AccessKeyedExpression, e.CallScopeExpression, e.CallMemberExpression, e.CallFunctionExpression, e.BinaryExpression, e.UnaryExpression, e.PrimitiveLiteralExpression, e.ArrayLiteralExpression, e.ObjectLiteralExpression, e.TemplateExpression, e.TaggedTemplateExpression, e.ArrayBindingPattern, e.ObjectBindingPattern, e.BindingIdentifier, e.ForOfStatement, e.Interpolation, e.DestructuringAssignmentExpression, e.DestructuringAssignmentSingleExpression, e.DestructuringAssignmentRestExpression, e.ArrowFunction ].forEach((r => {
        t(r, "evaluate", (function(...t) {
            return e.astEvaluate(this, ...t);
        }));
        t(r, "assign", (function(...t) {
            return e.astAssign(this, ...t);
        }));
        t(r, "accept", (function(...t) {
            return e.astVisit(this, ...t);
        }));
        t(r, "bind", (function(...t) {
            return e.astBind(this, ...t);
        }));
        t(r, "unbind", (function(...t) {
            return e.astUnbind(this, ...t);
        }));
    }));
}

const u = t.AppTask.creating(t.IEventTarget, (e => {
    e.addEventListener("submit", (e => {
        const t = e.target;
        const r = t.action;
        if ("form" === t.tagName.toLowerCase() && !r) e.preventDefault();
    }), false);
}));

const i = {
    register(e) {
        n();
        e.register(u);
    }
};

exports.PreventFormActionlessSubmit = u;

exports["default"] = i;
//# sourceMappingURL=index.cjs.map
