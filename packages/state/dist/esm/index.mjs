import { DI as t, Registration as i, optional as s, all as n, ILogger as e, camelCase as h } from "@aurelia/kernel";

import { Scope as r, connectable as o, BindingMode as c, bindingBehavior as u, BindingInterceptor as l, IExpressionParser as a, IObserverLocator as d } from "@aurelia/runtime";

import { attributePattern as f, bindingCommand as v, renderer as p, AttrSyntax as b, IAttrMapper as g, IPlatform as m, applyBindingBehavior as S, lifecycleHooks as y, CustomElement as w, ILifecycleHooks as B } from "@aurelia/runtime-html";

const I = t.createInterface("IActionHandler");

const P = t.createInterface("IStore");

const R = t.createInterface("IState");

const $ = "__reducer__";

const A = Object.freeze({
    define(t) {
        function s(i, s, ...n) {
            return t(i, s, ...n);
        }
        s[$] = true;
        s.register = function(s) {
            i.instance(I, t).register(s);
        };
        return s;
    },
    isType: t => "function" === typeof t && $ in t
});

class Store {
    constructor(t, i, s) {
        this.t = new Set;
        this.i = 0;
        this.h = [];
        this._state = null !== t && void 0 !== t ? t : new State;
        this.u = i;
        this.B = s;
    }
    static register(t) {
        i.singleton(P, this).register(t);
    }
    subscribe(t) {
        this.t.add(t);
    }
    unsubscribe(t) {
        this.t.delete(t);
    }
    I(t) {
        const i = this._state;
        this._state = t;
        this.t.forEach((s => s.handleStateChange(t, i)));
    }
    getState() {
        return this._state;
    }
    dispatch(t, ...i) {
        if (this.i > 0) {
            this.h.push({
                type: t,
                params: i
            });
            return;
        }
        this.i++;
        let s;
        const n = (t, i, s) => this.u.reduce(((t, n) => {
            if (t instanceof Promise) return t.then((t => n(t, i, ...null !== s && void 0 !== s ? s : [])));
            return n(t, i, ...null !== s && void 0 !== s ? s : []);
        }), t);
        const e = t => {
            if (this.h.length > 0) {
                s = this.h.shift();
                const i = n(t, s.type, s.params);
                if (i instanceof Promise) return i.then((t => e(t))); else return e(i);
            }
        };
        const h = n(this._state, t, i);
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

Store.inject = [ s(R), n(I), e ];

class State {}

function C(t, i, s, n) {
    var e = arguments.length, h = e < 3 ? i : null === n ? n = Object.getOwnPropertyDescriptor(i, s) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, i, s, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(i, s, h) : r(i, s)) || h;
    return e > 3 && h && Object.defineProperty(i, s, h), h;
}

function T(t, i) {
    const s = {
        bindingContext: t
    };
    const n = r.create(t, s, true);
    n.parentScope = i;
    return n;
}

const j = (t, i, s) => Reflect.defineProperty(t.prototype, i, s);

function D(t) {
    return t instanceof Object && "subscribe" in t;
}

const {toView: _, oneTime: O} = c;

let x = class StateBinding {
    constructor(t, i, s, n, e, h, r) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.persistentFlags = 0;
        this.mode = _;
        this.locator = t;
        this.taskQueue = i;
        this.$ = s;
        this.oL = n;
        this.sourceExpression = e;
        this.target = h;
        this.targetProperty = r;
    }
    updateTarget(t, i) {
        const s = this.targetObserver;
        const n = this.target;
        const e = this.targetProperty;
        const h = this.R++;
        const r = () => h === this.R - 1;
        this.A();
        if (E(t)) {
            this.P = t.subscribe((t => {
                if (r()) s.setValue(t, i, n, e);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (r()) s.setValue(t, i, n, e);
            }), (() => {}));
            return;
        }
        s.setValue(t, i, n, e);
    }
    $bind(t, i) {
        if (this.isBound) return;
        this.isBound = true;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.$scope = T(this.$.getState(), i);
        this.$.subscribe(this);
        this.updateTarget(this.v = this.sourceExpression.evaluate(1, this.$scope, this.locator, this.mode > O ? this : null), 0);
    }
    $unbind() {
        var t;
        if (!this.isBound) return;
        this.A();
        this.R++;
        this.isBound = false;
        this.$scope = void 0;
        null === (t = this.task) || void 0 === t ? void 0 : t.cancel();
        this.task = null;
        this.$.unsubscribe(this);
    }
    handleChange(t, i, s) {
        if (!this.isBound) return;
        s |= this.persistentFlags;
        const n = 0 === (2 & s) && (4 & this.targetObserver.type) > 0;
        const e = this.obs;
        e.version++;
        t = this.sourceExpression.evaluate(s, this.$scope, this.locator, this.interceptor);
        e.clear();
        let h;
        if (n) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, s);
                this.task = null;
            }), H);
            null === h || void 0 === h ? void 0 : h.cancel();
            h = null;
        } else this.interceptor.updateTarget(t, s);
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = this.sourceExpression.evaluate(1, i, this.locator, this.mode > O ? this : null);
        const e = (4 & this.targetObserver.type) > 0;
        if (n === this.v) return;
        this.v = n;
        let h = null;
        if (e) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(n, 1);
                this.task = null;
            }), H);
            null === h || void 0 === h ? void 0 : h.cancel();
        } else this.interceptor.updateTarget(this.v, 0);
    }
    A() {
        var t, i, s, n;
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            null === (i = (t = this.P).dispose) || void 0 === i ? void 0 : i.call(t);
            null === (n = (s = this.P).unsubscribe) || void 0 === n ? void 0 : n.call(s);
        }
        this.P = void 0;
    }
};

x = C([ o() ], x);

function E(t) {
    return t instanceof Object && "subscribe" in t;
}

const H = {
    reusable: false,
    preempt: true
};

let k = class StateBindingBehavior extends l {
    constructor(t, i, s) {
        super(i, s);
        this.$ = t;
        this.C = i instanceof x;
    }
    $bind(t, i) {
        const s = this.binding;
        const n = this.C ? i : T(this.$.getState(), i);
        if (!this.C) this.$.subscribe(this);
        s.$bind(t, n);
    }
    $unbind(t) {
        if (!this.C) this.$.unsubscribe(this);
        this.binding.$unbind(t);
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        this.binding.handleChange(void 0, void 0, 0);
    }
};

k.inject = [ P ];

k = C([ u("state") ], k);

[ "target", "targetProperty" ].forEach((t => {
    j(k, t, {
        enumerable: false,
        configurable: true,
        get() {
            return this.binding[t];
        },
        set(i) {
            this.binding[t] = i;
        }
    });
}));

let G = class StateDispatchBinding {
    constructor(t, i, s, n, e) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = t;
        this.$ = i;
        this.expr = s;
        this.target = n;
        this.targetProperty = e;
    }
    callSource(t) {
        const i = this.$scope;
        i.overrideContext.$event = t;
        const s = this.expr.evaluate(1, i, this.locator, null);
        delete i.overrideContext.$event;
        if (!this.isAction(s)) throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${t.type}"`);
        void this.$.dispatch(s.type, ...s.params instanceof Array ? s.params : []);
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, i) {
        if (this.isBound) return;
        this.isBound = true;
        this.$scope = T(this.$.getState(), i);
        this.target.addEventListener(this.targetProperty, this);
        this.$.subscribe(this);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        this.target.removeEventListener(this.targetProperty, this);
        this.$.unsubscribe(this);
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = t;
    }
    isAction(t) {
        return null != t && "object" === typeof t && "type" in t;
    }
};

G = C([ o() ], G);

let L = class StateAttributePattern {
    "PART.state"(t, i, s) {
        return new b(t, i, s[0], "state");
    }
};

L = C([ f({
    pattern: "PART.state",
    symbols: "."
}) ], L);

let V = class DispatchAttributePattern {
    "PART.dispatch"(t, i, s) {
        return new b(t, i, s[0], "dispatch");
    }
};

V = C([ f({
    pattern: "PART.dispatch",
    symbols: "."
}) ], V);

let q = class StateBindingCommand {
    constructor(t) {
        this.m = t;
        this.type = 0;
    }
    get name() {
        return "state";
    }
    build(t) {
        var i;
        const s = t.attr;
        let n = s.target;
        let e = s.rawValue;
        if (null == t.bindable) n = null !== (i = this.m.map(t.node, n)) && void 0 !== i ? i : h(n); else {
            if ("" === e && 1 === t.def.type) e = h(n);
            n = t.bindable.property;
        }
        return new StateBindingInstruction(e, n);
    }
};

q.inject = [ g ];

q = C([ v("state") ], q);

let z = class DispatchBindingCommand {
    constructor() {
        this.type = 1;
    }
    get name() {
        return "dispatch";
    }
    build(t) {
        const i = t.attr;
        return new DispatchBindingInstruction(i.target, i.rawValue);
    }
};

z = C([ v("dispatch") ], z);

class StateBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.to = i;
        this.type = "sb";
    }
}

class DispatchBindingInstruction {
    constructor(t, i) {
        this.from = t;
        this.expr = i;
        this.type = "sd";
    }
}

let F = class StateBindingInstructionRenderer {
    constructor(t, i, s, n) {
        this.ep = t;
        this.oL = i;
        this.T = s;
        this.p = n;
    }
    render(t, i, s) {
        const n = new x(t.container, this.p.domWriteQueue, this.T, this.oL, K(this.ep, s.from, 4), i, s.to);
        t.addBinding(n);
    }
};

F.inject = [ a, d, P, m ];

F = C([ p("sb") ], F);

let J = class DispatchBindingInstructionRenderer {
    constructor(t, i) {
        this.ep = t;
        this.T = i;
    }
    render(t, i, s) {
        const n = K(this.ep, s.expr, 8);
        const e = new G(t.container, this.T, n, i, s.from);
        t.addBinding(38962 === n.$kind ? S(e, n, t.container) : e);
    }
};

J.inject = [ a, P ];

J = C([ p("sd") ], J);

function K(t, i, s) {
    if ("string" === typeof i) return t.parse(i, s);
    return i;
}

const M = [ L, q, F, V, z, J, k, Store ];

const N = (t, s) => ({
    register: n => {
        n.register(i.instance(R, t), ...M, ...s.map(A.define));
    },
    init: (t, ...i) => N(t, i)
});

const Q = N({}, []);

let U = class StateGetterBinding {
    constructor(t, i, s, n, e) {
        this.interceptor = this;
        this.isBound = false;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.locator = t;
        this.$ = i;
        this.$get = s;
        this.target = n;
        this.key = e;
    }
    updateTarget(t) {
        const i = this.target;
        const s = this.key;
        const n = this.R++;
        const e = () => n === this.R - 1;
        this.A();
        if (D(t)) {
            this.P = t.subscribe((t => {
                if (e()) i[s] = t;
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (e()) i[s] = t;
            }), (() => {}));
            return;
        }
        i[s] = t;
    }
    $bind(t, i) {
        if (this.isBound) return;
        const s = this.$.getState();
        this.isBound = true;
        this.$scope = T(s, i);
        this.$.subscribe(this);
        this.updateTarget(this.v = this.$get(s));
    }
    $unbind() {
        if (!this.isBound) return;
        this.A();
        this.R++;
        this.isBound = false;
        this.$scope = void 0;
        this.$.unsubscribe(this);
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = this.$get(this.$.getState());
        if (n === this.v) return;
        this.v = n;
        this.updateTarget(n);
    }
    A() {
        var t, i, s, n;
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            null === (i = (t = this.P).dispose) || void 0 === i ? void 0 : i.call(t);
            null === (n = (s = this.P).unsubscribe) || void 0 === n ? void 0 : n.call(s);
        }
        this.P = void 0;
    }
};

U = C([ o() ], U);

function W(t) {
    return function(i, s, n) {
        if ("function" === typeof i) throw new Error(`Invalid usage. @state can only be used on a field`);
        if ("undefined" !== typeof (null === n || void 0 === n ? void 0 : n.value)) throw new Error(`Invalid usage. @state can only be used on a field`);
        i = i.constructor;
        let e = w.getAnnotation(i, X);
        if (null == e) w.annotate(i, X, e = []);
        e.push(new Y(t, s));
    };
}

const X = "dependencies";

let Y = class HydratingLifecycleHooks {
    constructor(t, i) {
        this.$get = t;
        this.key = i;
    }
    register(t) {
        i.instance(B, this).register(t);
    }
    hydrating(t, i) {
        const s = i.container;
        i.addBinding(new U(s, s.get(P), this.$get, t, this.key));
    }
};

Y = C([ y() ], Y);

export { A as ActionHandler, V as DispatchAttributePattern, z as DispatchBindingCommand, DispatchBindingInstruction, J as DispatchBindingInstructionRenderer, I as IActionHandler, R as IState, P as IStore, L as StateAttributePattern, x as StateBinding, k as StateBindingBehavior, q as StateBindingCommand, StateBindingInstruction, F as StateBindingInstructionRenderer, Q as StateDefaultConfiguration, G as StateDispatchBinding, W as fromStore };
//# sourceMappingURL=index.mjs.map
