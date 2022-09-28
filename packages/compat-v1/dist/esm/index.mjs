import { BindingBehaviorExpression as n, ValueConverterExpression as t, AssignExpression as e, ConditionalExpression as i, AccessThisExpression as r, AccessScopeExpression as s, AccessMemberExpression as o, AccessKeyedExpression as a, CallScopeExpression as u, CallMemberExpression as l, CallFunctionExpression as c, BinaryExpression as b, UnaryExpression as d, PrimitiveLiteralExpression as f, ArrayLiteralExpression as g, ObjectLiteralExpression as m, TemplateExpression as p, TaggedTemplateExpression as h, ArrayBindingPattern as v, ObjectBindingPattern as x, BindingIdentifier as y, ForOfStatement as w, Interpolation as A, DestructuringAssignmentExpression as E, DestructuringAssignmentSingleExpression as O, DestructuringAssignmentRestExpression as $, ArrowFunction as j, astEvaluate as C, astAssign as I, astVisit as L, astBind as T, astUnbind as k, Unparser as B } from "@aurelia/runtime";

import { PropertyBinding as P, AttributeBinding as R, Listener as S, CallBinding as U, LetBinding as V, InterpolationPartBinding as q, RefBinding as z, AppTask as D, IEventTarget as F } from "@aurelia/runtime-html";

import { ContentBinding as G } from "@aurelia/runtime-html/dist/types/binding/interpolation-binding";

let H = false;

function J() {
    if (H) return;
    H = true;
    const B = (n, t, e) => Object.defineProperty(n.prototype, t, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: e
    });
    [ n, t, e, i, r, s, o, a, u, l, c, b, d, f, g, m, p, h, v, x, y, w, A, E, O, $, j ].forEach((n => {
        B(n, "evaluate", (function(...n) {
            return C(this, ...n);
        }));
        B(n, "assign", (function(...n) {
            return I(this, ...n);
        }));
        B(n, "accept", (function(...n) {
            return L(this, ...n);
        }));
        B(n, "bind", (function(...n) {
            return T(this, ...n);
        }));
        B(n, "unbind", (function(...n) {
            return k(this, ...n);
        }));
        console.warn('"evaluate"/"assign"/"accept"/"visit"/"bind"/"unbind" are only valid on AST with $kind Custom.' + " Or import and use astEvaluate/astAssign/astVisit/astBind/astUnbind accordingly.");
    }));
}

let K = false;

const M = () => {
    if (K) return;
    K = true;
    [ [ P, "Property binding" ], [ R, "Attribute binding" ], [ S, "Listener binding" ], [ U, "Call binding" ], [ V, "Let binding" ], [ q, "Interpolation binding" ], [ G, "Text binding" ], [ z, "Ref binding" ] ].forEach((([n, t]) => {
        Object.defineProperty(n.prototype, "sourceExpression", {
            configurable: true,
            enumerable: false,
            writable: true,
            get() {
                console.warn(`@deprecated "sourceExpression" property for expression on ${t}. It has been renamed to "ast". expression: "${B.unparse(this.ast)}"`);
                return this.ast;
            }
        });
    }));
};

const N = D.creating(F, (n => {
    n.addEventListener("submit", (n => {
        const t = n.target;
        const e = t.action;
        if ("form" === t.tagName.toLowerCase() && !e) n.preventDefault();
    }), false);
}));

const Q = {
    register(n) {
        J();
        M();
        n.register(N);
    }
};

export { N as PreventFormActionlessSubmit, Q as compatRegistration };
//# sourceMappingURL=index.mjs.map
