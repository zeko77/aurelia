import { BindingBehaviorExpression as t, ValueConverterExpression as e, AssignExpression as n, ConditionalExpression as r, AccessThisExpression as i, AccessScopeExpression as u, AccessMemberExpression as o, AccessKeyedExpression as s, CallScopeExpression as a, CallMemberExpression as f, CallFunctionExpression as c, BinaryExpression as l, UnaryExpression as m, PrimitiveLiteralExpression as b, ArrayLiteralExpression as h, ObjectLiteralExpression as p, TemplateExpression as d, TaggedTemplateExpression as g, ArrayBindingPattern as v, ObjectBindingPattern as j, BindingIdentifier as w, ForOfStatement as x, Interpolation as O, DestructuringAssignmentExpression as k, DestructuringAssignmentSingleExpression as q, DestructuringAssignmentRestExpression as y, ArrowFunction as z, astEvaluate as A, astAssign as B, astVisit as C, astBind as D, astUnbind as E } from "@aurelia/runtime";

import { AppTask as F, IEventTarget as G } from "@aurelia/runtime-html";

let H = false;

function I() {
    if (H) return;
    H = true;
    const F = (t, e, n) => Object.defineProperty(t.prototype, e, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: n
    });
    [ t, e, n, r, i, u, o, s, a, f, c, l, m, b, h, p, d, g, v, j, w, x, O, k, q, y, z ].forEach((t => {
        F(t, "evaluate", (function(...t) {
            return A(this, ...t);
        }));
        F(t, "assign", (function(...t) {
            return B(this, ...t);
        }));
        F(t, "accept", (function(...t) {
            return C(this, ...t);
        }));
        F(t, "bind", (function(...t) {
            return D(this, ...t);
        }));
        F(t, "unbind", (function(...t) {
            return E(this, ...t);
        }));
    }));
}

const J = F.creating(G, (t => {
    t.addEventListener("submit", (t => {
        const e = t.target;
        const n = e.action;
        if ("form" === e.tagName.toLowerCase() && !n) t.preventDefault();
    }), false);
}));

const K = {
    register(t) {
        I();
        t.register(J);
    }
};

export { J as PreventFormActionlessSubmit, K as default };
//# sourceMappingURL=index.mjs.map
