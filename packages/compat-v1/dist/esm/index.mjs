import { BindingBehaviorExpression as t, ValueConverterExpression as i, AssignExpression as e, ConditionalExpression as s, AccessThisExpression as n, AccessScopeExpression as r, AccessMemberExpression as l, AccessKeyedExpression as o, CallScopeExpression as h, CallMemberExpression as c, CallFunctionExpression as a, BinaryExpression as u, UnaryExpression as d, PrimitiveLiteralExpression as f, ArrayLiteralExpression as g, ObjectLiteralExpression as b, TemplateExpression as p, TaggedTemplateExpression as B, ArrayBindingPattern as m, ObjectBindingPattern as v, BindingIdentifier as D, ForOfStatement as L, Interpolation as C, DestructuringAssignmentExpression as w, DestructuringAssignmentSingleExpression as y, DestructuringAssignmentRestExpression as E, ArrowFunction as I, astEvaluate as O, astAssign as S, astVisit as j, astBind as R, astUnbind as x, IExpressionParser as k, IObserverLocator as T, Unparser as $ } from "@aurelia/runtime";

import { bindingCommand as A, renderer as M, mixinBindingUseScope as _, mixingBindingLimited as P, mixinAstEvaluator as U, AppTask as V, IEventTarget as q, PropertyBinding as z, AttributeBinding as F, ListenerBinding as G, LetBinding as H, InterpolationPartBinding as J, ContentBinding as K, RefBinding as N } from "@aurelia/runtime-html";

import { camelCase as Q, DI as W } from "@aurelia/kernel";

let X = false;

function Y() {
    if (X) return;
    X = true;
    const k = (t, i, e) => Object.defineProperty(t.prototype, i, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: e
    });
    [ t, i, e, s, n, r, l, o, h, c, a, u, d, f, g, b, p, B, m, v, D, L, C, w, y, E, I ].forEach((t => {
        k(t, "evaluate", (function(...t) {
            return O(this, ...t);
        }));
        k(t, "assign", (function(...t) {
            return S(this, ...t);
        }));
        k(t, "accept", (function(...t) {
            return j(this, ...t);
        }));
        k(t, "bind", (function(...t) {
            return R(this, ...t);
        }));
        k(t, "unbind", (function(...t) {
            return x(this, ...t);
        }));
        console.warn('"evaluate"/"assign"/"accept"/"visit"/"bind"/"unbind" are only valid on AST with $kind Custom.' + " Or import and use astEvaluate/astAssign/astVisit/astBind/astUnbind accordingly.");
    }));
}

function Z(t, i, e, s) {
    var n = arguments.length, r = n < 3 ? i : null === s ? s = Object.getOwnPropertyDescriptor(i, e) : s, l;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, i, e, s); else for (var o = t.length - 1; o >= 0; o--) if (l = t[o]) r = (n < 3 ? l(r) : n > 3 ? l(i, e, r) : l(i, e)) || r;
    return n > 3 && r && Object.defineProperty(i, e, r), r;
}

const tt = () => Object.create(null);

const it = t => "function" === typeof t;

const et = t => "string" === typeof t;

const st = (t, i, e) => {
    if (et(i)) return t.parse(i, e);
    return i;
};

const nt = Symbol(".call");

const rt = {
    register(t) {
        if (!t[nt]) {
            t[nt] = true;
            t.register(ot, ht);
        }
    }
};

const lt = "rh";

class CallBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
        this.type = lt;
    }
}

let ot = class CallBindingCommand {
    get type() {
        return 0;
    }
    build(t, i) {
        const e = null === t.bindable ? Q(t.attr.target) : t.bindable.property;
        return new CallBindingInstruction(i.parse(t.attr.rawValue, 8 | 4), e);
    }
};

ot = Z([ A("call") ], ot);

let ht = class CallBindingRenderer {
    constructor(t, i) {
        this.ep = t;
        this.oL = i;
    }
    render(t, i, e) {
        const s = st(this.ep, e.from, 8 | 4);
        t.addBinding(new CallBinding(t.container, this.oL, s, ct(i), e.to));
    }
};

ht.inject = [ k, T ];

ht = Z([ M(lt) ], ht);

function ct(t) {
    if (null != t.viewModel) return t.viewModel;
    return t;
}

class CallBinding {
    constructor(t, i, e, s, n) {
        this.ast = e;
        this.target = s;
        this.targetProperty = n;
        this.isBound = false;
        this.boundFn = false;
        this.l = t;
        this.targetObserver = i.getAccessor(s, n);
    }
    callSource(t) {
        const i = this.scope.overrideContext;
        i.$event = t;
        const e = O(this.ast, this.scope, this, null);
        Reflect.deleteProperty(i, "$event");
        return e;
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        R(this.ast, t, this);
        this.targetObserver.setValue((t => this.callSource(t)), this.target, this.targetProperty);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        x(this.ast, this.scope, this);
        this.scope = void 0;
        this.targetObserver.setValue(null, this.target, this.targetProperty);
    }
}

_(CallBinding);

P(CallBinding, (() => "callSource"));

U(true)(CallBinding);

const at = Symbol(".delegate");

const ut = {
    register(t) {
        if (!t[at]) {
            t[at] = true;
            t.register(pt, ft, gt);
        }
    }
};

const dt = "dl";

let ft = class DelegateBindingCommand {
    get type() {
        return 1;
    }
    build(t, i) {
        return new DelegateBindingInstruction(i.parse(t.attr.rawValue, 4), t.attr.target, false);
    }
};

ft = Z([ A("delegate") ], ft);

let gt = class ListenerBindingRenderer {
    constructor(t, i) {
        this.ep = t;
        this.t = i;
    }
    static get inject() {
        return [ k, pt ];
    }
    render(t, i, e) {
        const s = st(this.ep, e.from, 4);
        t.addBinding(new DelegateListenerBinding(t.container, s, i, e.to, this.t, new DelegateListenerOptions(e.preventDefault)));
    }
};

gt = Z([ M(dt) ], gt);

class DelegateBindingInstruction {
    constructor(t, i, e) {
        this.from = t;
        this.to = i;
        this.preventDefault = e;
        this.type = "hb";
    }
}

class DelegateListenerOptions {
    constructor(t) {
        this.prevent = t;
    }
}

class DelegateListenerBinding {
    constructor(t, i, e, s, n, r) {
        this.ast = i;
        this.target = e;
        this.targetEvent = s;
        this.eventDelegator = n;
        this.isBound = false;
        this.handler = null;
        this.boundFn = true;
        this.l = t;
        this.i = r;
    }
    callSource(t) {
        const i = this.scope.overrideContext;
        i.$event = t;
        let e = O(this.ast, this.scope, this, null);
        delete i.$event;
        if (it(e)) e = e(t);
        if (true !== e && this.i.prevent) t.preventDefault();
        return e;
    }
    handleEvent(t) {
        this.callSource(t);
    }
    bind(t) {
        if (this.isBound) {
            if (this.scope === t) return;
            this.unbind();
        }
        this.scope = t;
        R(this.ast, t, this);
        this.handler = this.eventDelegator.addEventListener(this.l.get(q), this.target, this.targetEvent, this);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        x(this.ast, this.scope, this);
        this.scope = void 0;
        this.handler.dispose();
        this.handler = null;
    }
}

_(DelegateListenerBinding);

P(DelegateListenerBinding, (() => "callSource"));

U(true, true)(DelegateListenerBinding);

const bt = {
    capture: false
};

class ListenerTracker {
    constructor(t, i, e = bt) {
        this.h = t;
        this.u = i;
        this.i = e;
        this.B = 0;
        this.L = new Map;
        this.C = new Map;
    }
    I() {
        if (1 === ++this.B) this.h.addEventListener(this.u, this, this.i);
    }
    O() {
        if (0 === --this.B) this.h.removeEventListener(this.u, this, this.i);
    }
    dispose() {
        if (this.B > 0) {
            this.B = 0;
            this.h.removeEventListener(this.u, this, this.i);
        }
        this.L.clear();
        this.C.clear();
    }
    j(t) {
        const i = true === this.i.capture ? this.L : this.C;
        let e = i.get(t);
        if (void 0 === e) i.set(t, e = tt());
        return e;
    }
    handleEvent(t) {
        const i = true === this.i.capture ? this.L : this.C;
        const e = t.composedPath();
        if (true === this.i.capture) e.reverse();
        for (const s of e) {
            const e = i.get(s);
            if (void 0 === e) continue;
            const n = e[this.u];
            if (void 0 === n) continue;
            if (it(n)) n(t); else n.handleEvent(t);
            if (true === t.cancelBubble) return;
        }
    }
}

class DelegateSubscription {
    constructor(t, i, e, s) {
        this.R = t;
        this.T = i;
        this.u = e;
        t.I();
        i[e] = s;
    }
    dispose() {
        this.R.O();
        this.T[this.u] = void 0;
    }
}

const pt = W.createInterface("IEventDelegator", (t => t.cachedCallback((t => {
    const i = t.invoke(EventDelegator);
    t.register(V.deactivating((() => i.dispose())));
    return i;
}))));

class EventDelegator {
    constructor() {
        this.$ = tt();
    }
    addEventListener(t, i, e, s, n) {
        var r;
        const l = (r = this.$)[e] ?? (r[e] = new Map);
        let o = l.get(t);
        if (void 0 === o) l.set(t, o = new ListenerTracker(t, e, n));
        return new DelegateSubscription(o, o.j(i), e, s);
    }
    dispose() {
        for (const t in this.$) {
            const i = this.$[t];
            for (const t of i.values()) t.dispose();
            i.clear();
        }
    }
}

let Bt = false;

const mt = () => {
    if (Bt) return;
    Bt = true;
    [ [ z, "Property binding" ], [ F, "Attribute binding" ], [ G, "Listener binding" ], [ CallBinding, "Call binding" ], [ H, "Let binding" ], [ J, "Interpolation binding" ], [ K, "Text binding" ], [ N, "Ref binding" ], [ DelegateListenerBinding, "Delegate Listener binding" ] ].forEach((([t, i]) => {
        Object.defineProperty(t.prototype, "sourceExpression", {
            configurable: true,
            enumerable: false,
            writable: true,
            get() {
                console.warn(`@deprecated "sourceExpression" property for expression on ${i}. It has been renamed to "ast". expression: "${$.unparse(this.ast)}"`);
                return this.ast;
            }
        });
    }));
};

const vt = V.creating(q, (t => {
    t.addEventListener("submit", (t => {
        const i = t.target;
        const e = i.action;
        if ("form" === i.tagName.toLowerCase() && !e) t.preventDefault();
    }), false);
}));

const Dt = {
    register(t) {
        Y();
        mt();
        t.register(vt);
        ut.register(t);
        rt.register(t);
    }
};

export { CallBinding, ot as CallBindingCommand, CallBindingInstruction, ht as CallBindingRenderer, ft as DelegateBindingCommand, DelegateBindingInstruction, DelegateListenerBinding, DelegateListenerOptions, EventDelegator, pt as IEventDelegator, gt as ListenerBindingRenderer, vt as PreventFormActionlessSubmit, rt as callSyntax, Dt as compatRegistration, ut as delegateSyntax };
//# sourceMappingURL=index.mjs.map
