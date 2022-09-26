import { BindingBehaviorExpression as t, ValueConverterExpression as n, AssignExpression as e, ConditionalExpression as i, AccessThisExpression as r, AccessScopeExpression as s, AccessMemberExpression as a, AccessKeyedExpression as o, CallScopeExpression as u, CallMemberExpression as l, CallFunctionExpression as c, BinaryExpression as b, UnaryExpression as d, PrimitiveLiteralExpression as f, ArrayLiteralExpression as g, ObjectLiteralExpression as m, TemplateExpression as p, TaggedTemplateExpression as h, ArrayBindingPattern as v, ObjectBindingPattern as x, BindingIdentifier as y, ForOfStatement as w, Interpolation as A, DestructuringAssignmentExpression as E, DestructuringAssignmentSingleExpression as O, DestructuringAssignmentRestExpression as $, ArrowFunction as j, astEvaluate as C, astAssign as I, astVisit as L, astBind as T, astUnbind as k, Unparser as B } from "../../../runtime/dist/native-modules/index.mjs";

import { PropertyBinding as P, AttributeBinding as R, Listener as S, CallBinding as U, LetBinding as V, InterpolationPartBinding as q, RefBinding as z, AppTask as D, IEventTarget as F } from "../../../runtime-html/dist/native-modules/index.mjs";

import { ContentBinding as G } from "../../../runtime-html/dist/types/binding/interpolation-binding/dist/native-modules/index.mjs";

let H = false;

function J() {
    if (H) return;
    H = true;
    const B = (t, n, e) => Object.defineProperty(t.prototype, n, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: e
    });
    [ t, n, e, i, r, s, a, o, u, l, c, b, d, f, g, m, p, h, v, x, y, w, A, E, O, $, j ].forEach((t => {
        B(t, "evaluate", (function(...t) {
            return C(this, ...t);
        }));
        B(t, "assign", (function(...t) {
            return I(this, ...t);
        }));
        B(t, "accept", (function(...t) {
            return L(this, ...t);
        }));
        B(t, "bind", (function(...t) {
            return T(this, ...t);
        }));
        B(t, "unbind", (function(...t) {
            return k(this, ...t);
        }));
        console.warn('"evaluate"/"assign"/"accept"/"visit"/"bind"/"unbind" are only valid on AST with $kind Custom.' + " Or import and use astEvaluate/astAssign/astVisit/astBind/astUnbind accordingly.");
    }));
}

let K = false;

const M = () => {
    if (K) return;
    K = true;
    [ [ P, "Property binding" ], [ R, "Attribute binding" ], [ S, "Listener binding" ], [ U, "Call binding" ], [ V, "Let binding" ], [ q, "Interpolation binding" ], [ G, "Text binding" ], [ z, "Ref binding" ] ].forEach((([t, n]) => {
        Object.defineProperty(t.prototype, "sourceExpression", {
            configurable: true,
            enumerable: false,
            writable: true,
            get() {
                console.warn(`@deprecated "sourceExpression" property for expression on ${n}. It has been renamed to "ast". expression: "${B.unparse(this.ast)}"`);
                return this.ast;
            }
        });
    }));
};

const N = D.creating(F, (t => {
    t.addEventListener("submit", (t => {
        const n = t.target;
        const e = n.action;
        if ("form" === n.tagName.toLowerCase() && !e) t.preventDefault();
    }), false);
}));

const Q = {
    register(t) {
        J();
        M();
        t.register(N);
    }
};

export { N as PreventFormActionlessSubmit, Q as default };

