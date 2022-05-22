import { DI as t, Registration as s, optional as i, all as n, ILogger as e, camelCase as h } from "../../../kernel/dist/native-modules/index.mjs";

import { Scope as r, connectable as o, BindingMode as c, bindingBehavior as u, BindingInterceptor as l, IExpressionParser as a, IObserverLocator as d } from "../../../runtime/dist/native-modules/index.mjs";

import { attributePattern as f, bindingCommand as p, renderer as v, AttrSyntax as b, IAttrMapper as g, IPlatform as m, applyBindingBehavior as S } from "../../../runtime-html/dist/native-modules/index.mjs";

const B = t.createInterface("IReducer");

const y = t.createInterface("IStore");

const w = t.createInterface("IState");

const I = "__reducer__";

const P = Object.freeze({
    define(t) {
        function i(s, i, ...n) {
            return t(s, i, ...n);
        }
        i[I] = true;
        i.register = function(i) {
            s.instance(B, t).register(i);
        };
        return i;
    },
    isType: t => "function" === typeof t && I in t
});

class Store {
    constructor(t, s, i) {
        this.t = new Set;
        this.i = 0;
        this.h = [];
        this._state = null !== t && void 0 !== t ? t : new State;
        this.u = s;
        this.B = i;
    }
    static register(t) {
        s.singleton(y, this).register(t);
    }
    subscribe(t) {
        this.t.add(t);
    }
    unsubscribe(t) {
        this.t.delete(t);
    }
    I(t) {
        const s = this._state;
        this._state = t;
        this.t.forEach((i => i.handleStateChange(t, s)));
    }
    getState() {
        return this._state;
    }
    dispatch(t, ...s) {
        if (this.i > 0) {
            this.h.push({
                type: t,
                params: s
            });
            return;
        }
        this.i++;
        let i;
        const n = (t, s, i) => this.u.reduce(((t, n) => {
            if (t instanceof Promise) return t.then((t => n(t, s, ...null !== i && void 0 !== i ? i : [])));
            return n(t, s, ...null !== i && void 0 !== i ? i : []);
        }), t);
        const e = t => {
            if (this.h.length > 0) {
                i = this.h.shift();
                const s = n(t, i.type, i.params);
                if (s instanceof Promise) return s.then((t => e(t))); else return e(s);
            }
        };
        const h = n(this._state, t, s);
        if (h instanceof Promise) return h.then((t => {
            this.I(t);
            this.i--;
            return e(this._state);
        }), (t => {
            this.i--;
            throw t;
        })); else {
            this.I(h);
            this.i--;
            return e(this._state);
        }
    }
}

Store.inject = [ i(w), n(B), e ];

class State {}

function R(t, s, i, n) {
    var e = arguments.length, h = e < 3 ? s : null === n ? n = Object.getOwnPropertyDescriptor(s, i) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, s, i, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(s, i, h) : r(s, i)) || h;
    return e > 3 && h && Object.defineProperty(s, i, h), h;
}

function A(t, s) {
    const i = {
        bindingContext: t
    };
    const n = r.create(t, i, true);
    n.parentScope = s;
    return n;
}

const D = (t, s, i) => Reflect.defineProperty(t.prototype, s, i);

const {toView: T, oneTime: $} = c;

let j = class StateBinding {
    constructor(t, s, i, n, e, h, r) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.persistentFlags = 0;
        this.mode = T;
        this.locator = t;
        this.taskQueue = s;
        this.A = i;
        this.oL = n;
        this.sourceExpression = e;
        this.target = h;
        this.targetProperty = r;
    }
    updateTarget(t, s) {
        const i = this.targetObserver;
        const n = this.target;
        const e = this.targetProperty;
        const h = this.R++;
        const r = () => h === this.R - 1;
        this.T();
        if (C(t)) {
            this.P = t.subscribe((t => {
                if (r()) i.setValue(t, s, n, e);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (r()) i.setValue(t, s, n, e);
            }), (() => {}));
            return;
        }
        i.setValue(t, s, n, e);
    }
    $bind(t, s) {
        if (this.isBound) return;
        this.isBound = true;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.$scope = A(this.A.getState(), s);
        this.A.subscribe(this);
        this.updateTarget(this.v = this.sourceExpression.evaluate(1, this.$scope, this.locator, this.mode > $ ? this : null), 0);
    }
    $unbind() {
        var t;
        if (!this.isBound) return;
        this.T();
        this.R++;
        this.isBound = false;
        this.$scope = void 0;
        null === (t = this.task) || void 0 === t ? void 0 : t.cancel();
        this.task = null;
        this.A.unsubscribe(this);
    }
    handleChange(t, s, i) {
        if (!this.isBound) return;
        i |= this.persistentFlags;
        const n = 0 === (2 & i) && (4 & this.targetObserver.type) > 0;
        const e = this.obs;
        e.version++;
        t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
        e.clear();
        let h;
        if (n) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), _);
            null === h || void 0 === h ? void 0 : h.cancel();
            h = null;
        } else this.interceptor.updateTarget(t, i);
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const n = this.sourceExpression.evaluate(1, s, this.locator, this.mode > $ ? this : null);
        const e = (4 & this.targetObserver.type) > 0;
        if (n === this.v) return;
        this.v = n;
        let h = null;
        if (e) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(n, 1);
                this.task = null;
            }), _);
            null === h || void 0 === h ? void 0 : h.cancel();
        } else this.interceptor.updateTarget(this.v, 0);
    }
    T() {
        var t, s, i, n;
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            null === (s = (t = this.P).dispose) || void 0 === s ? void 0 : s.call(t);
            null === (n = (i = this.P).unsubscribe) || void 0 === n ? void 0 : n.call(i);
        }
        this.P = void 0;
    }
};

j = R([ o() ], j);

function C(t) {
    return t instanceof Object && "subscribe" in t;
}

const _ = {
    reusable: false,
    preempt: true
};

let x = class StateBindingBehavior extends l {
    constructor(t, s, i) {
        super(s, i);
        this.A = t;
    }
    $bind(t, s) {
        const i = this.binding;
        const n = i instanceof j ? s : A(this.A.getState(), s);
        i.$bind(t, n);
    }
};

x.inject = [ y ];

x = R([ u("state") ], x);

[ "target", "targetProperty" ].forEach((t => {
    D(x, t, {
        enumerable: false,
        configurable: true,
        get() {
            return this.binding[t];
        },
        set(s) {
            this.binding[t] = s;
        }
    });
}));

let O = class StateDispatchBinding {
    constructor(t, s, i, n, e) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = t;
        this.A = s;
        this.expr = i;
        this.target = n;
        this.targetProperty = e;
    }
    callSource(t) {
        const s = this.$scope;
        s.overrideContext.$event = t;
        const i = this.expr.evaluate(1, s, this.locator, null);
        delete s.overrideContext.$event;
        if (!this.isAction(i)) throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${t.type}"`);
        void this.A.dispatch(i.type, ...i.params instanceof Array ? i.params : []);
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, s) {
        if (this.isBound) return;
        this.isBound = true;
        this.$scope = A(this.A.getState(), s);
        this.target.addEventListener(this.targetProperty, this);
        this.A.subscribe(this);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        this.target.removeEventListener(this.targetProperty, this);
        this.A.unsubscribe(this);
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = t;
    }
    isAction(t) {
        return null != t && "object" === typeof t && "type" in t;
    }
};

O = R([ o() ], O);

let E = class StateAttributePattern {
    "PART.state"(t, s, i) {
        return new b(t, s, i[0], "state");
    }
};

E = R([ f({
    pattern: "PART.state",
    symbols: "."
}) ], E);

let k = class DispatchAttributePattern {
    "PART.dispatch"(t, s, i) {
        return new b(t, s, i[0], "dispatch");
    }
};

k = R([ f({
    pattern: "PART.dispatch",
    symbols: "."
}) ], k);

let V = class StateBindingCommand {
    constructor(t) {
        this.m = t;
        this.type = 0;
    }
    get name() {
        return "state";
    }
    build(t) {
        var s;
        const i = t.attr;
        let n = i.target;
        let e = i.rawValue;
        if (null == t.bindable) n = null !== (s = this.m.map(t.node, n)) && void 0 !== s ? s : h(n); else {
            if ("" === e && 1 === t.def.type) e = h(n);
            n = t.bindable.property;
        }
        return new StateBindingInstruction(e, n);
    }
};

V.inject = [ g ];

V = R([ p("state") ], V);

let q = class DispatchBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() {
        return "dispatch";
    }
    build(t) {
        const s = t.attr;
        return new DispatchBindingInstruction(s.target, s.rawValue);
    }
};

q = R([ p("dispatch") ], q);

class StateBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.to = s;
        this.type = "sb";
    }
}

class DispatchBindingInstruction {
    constructor(t, s) {
        this.from = t;
        this.expr = s;
        this.type = "sd";
    }
}

let z = class StateBindingInstructionRenderer {
    constructor(t, s, i, n) {
        this.ep = t;
        this.oL = s;
        this.$ = i;
        this.p = n;
    }
    render(t, s, i) {
        const n = new j(t.container, this.p.domWriteQueue, this.$, this.oL, G(this.ep, i.from, 4), s, i.to);
        t.addBinding(n);
    }
};

z.inject = [ a, d, y, m ];

z = R([ v("sb") ], z);

let F = class DispatchBindingInstructionRenderer {
    constructor(t, s) {
        this.ep = t;
        this.$ = s;
    }
    render(t, s, i) {
        const n = G(this.ep, i.expr, 8);
        const e = new O(t.container, this.$, n, s, i.from);
        t.addBinding(38962 === n.$kind ? S(e, n, t.container) : e);
    }
};

F.inject = [ a, y ];

F = R([ v("sd") ], F);

function G(t, s, i) {
    if ("string" === typeof s) return t.parse(s, i);
    return s;
}

const H = [ E, V, z, k, q, F, Store ];

const J = (t, i) => ({
    register: n => {
        n.register(...H, s.instance(w, t), x, ...i.map(P.define));
    },
    init: (t, ...s) => J(t, s)
});

const K = J({}, []);

export { P as Action, k as DispatchAttributePattern, q as DispatchBindingCommand, DispatchBindingInstruction, F as DispatchBindingInstructionRenderer, B as IReducer, w as IState, y as IStore, E as StateAttributePattern, j as StateBinding, x as StateBindingBehavior, V as StateBindingCommand, StateBindingInstruction, z as StateBindingInstructionRenderer, K as StateDefaultConfiguration, O as StateDispatchBinding };

