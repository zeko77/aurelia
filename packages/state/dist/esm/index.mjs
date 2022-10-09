import { DI as t, Registration as i, optional as s, all as n, ILogger as e, camelCase as h } from "@aurelia/kernel";

import { mixinAstEvaluator as r, mixingBindingLimited as o, bindingBehavior as c, attributePattern as a, bindingCommand as u, renderer as l, AttrSyntax as f, IPlatform as d, lifecycleHooks as g, CustomElement as p, CustomAttribute as S, ILifecycleHooks as b } from "@aurelia/runtime-html";

import { Scope as B, connectable as m, astEvaluate as v, astBind as y, astUnbind as w, IExpressionParser as I, IObserverLocator as D } from "@aurelia/runtime";

const P = t.createInterface("IActionHandler");

const A = t.createInterface("IStore");

const C = t.createInterface("IState");

const R = "__au_ah__";

const T = Object.freeze({
    define(t) {
        function s(i, s, ...n) {
            return t(i, s, ...n);
        }
        s[R] = true;
        s.register = function(s) {
            i.instance(P, t).register(s);
        };
        return s;
    },
    isType: t => "function" === typeof t && R in t
});

class Store {
    constructor(t, i, s) {
        this.t = new Set;
        this.i = 0;
        this.h = [];
        this._state = t ?? new State;
        this.u = i;
        this.B = s;
    }
    static register(t) {
        i.singleton(A, this).register(t);
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
            if (t instanceof Promise) return t.then((t => n(t, i, ...s ?? [])));
            return n(t, i, ...s ?? []);
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

Store.inject = [ s(C), n(P), e ];

class State {}

function _(t, i, s, n) {
    var e = arguments.length, h = e < 3 ? i : null === n ? n = Object.getOwnPropertyDescriptor(i, s) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, i, s, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(i, s, h) : r(i, s)) || h;
    return e > 3 && h && Object.defineProperty(i, s, h), h;
}

function j(t, i) {
    const s = {
        bindingContext: t
    };
    const n = B.create(t, s, true);
    n.parent = i;
    return n;
}

function O(t) {
    return t instanceof Object && "subscribe" in t;
}

class StateBinding {
    constructor(t, i, s, n, e, h, r, o) {
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.A = 0;
        this.boundFn = false;
        this.mode = 2;
        this.C = t;
        this.l = i;
        this.R = n;
        this.T = o;
        this.oL = s;
        this.ast = e;
        this.target = h;
        this.targetProperty = r;
    }
    updateTarget(t) {
        const i = this.targetObserver;
        const s = this.target;
        const n = this.targetProperty;
        const e = this.A++;
        const h = () => e === this.A - 1;
        this._();
        if (k(t)) {
            this.P = t.subscribe((t => {
                if (h()) i.setValue(t, s, n);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (h()) i.setValue(t, s, n);
            }), (() => {}));
            return;
        }
        i.setValue(t, s, n);
    }
    bind(t) {
        if (this.isBound) return;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.T.subscribe(this);
        this.updateTarget(this.v = v(this.ast, this.scope = j(this.T.getState(), t), this, this.mode > 1 ? this : null));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this._();
        this.A++;
        this.scope = void 0;
        this.task?.cancel();
        this.task = null;
        this.T.unsubscribe(this);
    }
    handleChange(t) {
        if (!this.isBound) return;
        const i = 1 !== this.C.state && (4 & this.targetObserver.type) > 0;
        const s = this.obs;
        s.version++;
        t = v(this.ast, this.scope, this, this);
        s.clear();
        let n;
        if (i) {
            n = this.task;
            this.task = this.R.queueTask((() => {
                this.updateTarget(t);
                this.task = null;
            }), E);
            n?.cancel();
            n = null;
        } else this.updateTarget(t);
    }
    handleStateChange() {
        if (!this.isBound) return;
        const t = this.T.getState();
        const i = this.scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = v(this.ast, i, this, this.mode > 1 ? this : null);
        const e = 1 !== this.C.state && (4 & this.targetObserver.type) > 0;
        if (n === this.v) return;
        this.v = n;
        let h = null;
        if (e) {
            h = this.task;
            this.task = this.R.queueTask((() => {
                this.updateTarget(n);
                this.task = null;
            }), E);
            h?.cancel();
        } else this.updateTarget(this.v);
    }
    _() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
}

function k(t) {
    return t instanceof Object && "subscribe" in t;
}

const E = {
    reusable: false,
    preempt: true
};

m(StateBinding);

r(true)(StateBinding);

o(StateBinding, (() => "updateTarget"));

const H = new WeakMap;

let x = class StateBindingBehavior {
    constructor(t) {
        this.T = t;
    }
    bind(t, i) {
        const s = i instanceof StateBinding;
        t = s ? t : j(this.T.getState(), t);
        let n;
        if (!s) {
            n = H.get(i);
            if (null == n) H.set(i, n = new StateSubscriber(i, t)); else n.j = t;
            this.T.subscribe(n);
            i.useScope(t);
        }
    }
    unbind(t, i) {
        const s = i instanceof StateBinding;
        if (!s) {
            this.T.unsubscribe(H.get(i));
            H.delete(i);
        }
    }
};

x.inject = [ A ];

x = _([ c("state") ], x);

class StateSubscriber {
    constructor(t, i) {
        this.O = t;
        this.j = i;
    }
    handleStateChange(t) {
        const i = this.j;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        this.O.handleChange?.(void 0, void 0);
    }
}

class StateDispatchBinding {
    constructor(t, i, s, n, e) {
        this.isBound = false;
        this.boundFn = false;
        this.l = t;
        this.T = e;
        this.ast = i;
        this.target = s;
        this.targetProperty = n;
    }
    callSource(t) {
        const i = this.scope;
        i.overrideContext.$event = t;
        const s = v(this.ast, i, this, null);
        delete i.overrideContext.$event;
        if (!this.isAction(s)) throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${t.type}"`);
        void this.T.dispatch(s.type, ...s.params instanceof Array ? s.params : []);
    }
    handleEvent(t) {
        this.callSource(t);
    }
    bind(t) {
        if (this.isBound) return;
        y(this.ast, t, this);
        this.scope = j(this.T.getState(), t);
        this.target.addEventListener(this.targetProperty, this);
        this.T.subscribe(this);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        w(this.ast, this.scope, this);
        this.scope = void 0;
        this.target.removeEventListener(this.targetProperty, this);
        this.T.unsubscribe(this);
    }
    handleStateChange(t) {
        const i = this.scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = t;
    }
    isAction(t) {
        return null != t && "object" === typeof t && "type" in t;
    }
}

m(StateDispatchBinding);

r(true)(StateDispatchBinding);

o(StateDispatchBinding, (() => "callSource"));

let L = class StateAttributePattern {
    "PART.state"(t, i, s) {
        return new f(t, i, s[0], "state");
    }
};

L = _([ a({
    pattern: "PART.state",
    symbols: "."
}) ], L);

let $ = class DispatchAttributePattern {
    "PART.dispatch"(t, i, s) {
        return new f(t, i, s[0], "dispatch");
    }
};

$ = _([ a({
    pattern: "PART.dispatch",
    symbols: "."
}) ], $);

let G = class StateBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "state";
    }
    build(t, i, s) {
        const n = t.attr;
        let e = n.target;
        let r = n.rawValue;
        if (null == t.bindable) e = s.map(t.node, e) ?? h(e); else {
            if ("" === r && 1 === t.def.type) r = h(e);
            e = t.bindable.property;
        }
        return new StateBindingInstruction(r, e);
    }
};

G = _([ u("state") ], G);

let M = class DispatchBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "dispatch";
    }
    build(t) {
        const i = t.attr;
        return new DispatchBindingInstruction(i.target, i.rawValue);
    }
};

M = _([ u("dispatch") ], M);

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
        this.ast = i;
        this.type = "sd";
    }
}

let W = class StateBindingInstructionRenderer {
    constructor(t, i, s, n) {
        this.ep = t;
        this.oL = i;
        this.H = s;
        this.p = n;
    }
    render(t, i, s) {
        t.addBinding(new StateBinding(t, t.container, this.oL, this.p.domWriteQueue, z(this.ep, s.from, 8), i, s.to, this.H));
    }
};

W.inject = [ I, D, A, d ];

W = _([ l("sb") ], W);

let q = class DispatchBindingInstructionRenderer {
    constructor(t, i) {
        this.ep = t;
        this.H = i;
    }
    render(t, i, s) {
        const n = z(this.ep, s.ast, 16);
        t.addBinding(new StateDispatchBinding(t.container, n, i, s.from, this.H));
    }
};

q.inject = [ I, A ];

q = _([ l("sd") ], q);

function z(t, i, s) {
    if ("string" === typeof i) return t.parse(i, s);
    return i;
}

const F = [ L, G, W, $, M, q, x, Store ];

const J = (t, s) => ({
    register: n => {
        n.register(i.instance(C, t), ...F, ...s.map(T.define));
    },
    init: (t, ...i) => J(t, i)
});

const K = J({}, []);

let N = class StateGetterBinding {
    constructor(t, i, s, n) {
        this.isBound = false;
        this.v = void 0;
        this.P = void 0;
        this.A = 0;
        this.T = s;
        this.$get = n;
        this.target = t;
        this.key = i;
    }
    updateTarget(t) {
        const i = this.target;
        const s = this.key;
        const n = this.A++;
        const e = () => n === this.A - 1;
        this._();
        if (O(t)) {
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
    bind(t) {
        if (this.isBound) return;
        const i = this.T.getState();
        this.scope = j(i, t);
        this.T.subscribe(this);
        this.updateTarget(this.v = this.$get(i));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this._();
        this.A++;
        this.scope = void 0;
        this.T.unsubscribe(this);
    }
    handleStateChange(t) {
        const i = this.scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = this.$get(this.T.getState());
        if (n === this.v) return;
        this.v = n;
        this.updateTarget(n);
    }
    _() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
};

N = _([ m() ], N);

function Q(t) {
    return function(i, s, n) {
        if ("function" === typeof i) throw new Error(`Invalid usage. @state can only be used on a field`);
        if ("undefined" !== typeof n?.value) throw new Error(`Invalid usage. @state can only be used on a field`);
        i = i.constructor;
        let e = p.getAnnotation(i, U);
        if (null == e) p.annotate(i, U, e = []);
        e.push(new V(t, s));
        e = S.getAnnotation(i, U);
        if (null == e) p.annotate(i, U, e = []);
        e.push(new X(t, s));
    };
}

const U = "dependencies";

let V = class HydratingLifecycleHooks {
    constructor(t, i) {
        this.$get = t;
        this.key = i;
    }
    register(t) {
        i.instance(b, this).register(t);
    }
    hydrating(t, i) {
        const s = i.container;
        i.addBinding(new N(t, this.key, s.get(A), this.$get));
    }
};

V = _([ g() ], V);

let X = class CreatedLifecycleHooks {
    constructor(t, i) {
        this.$get = t;
        this.key = i;
    }
    register(t) {
        i.instance(b, this).register(t);
    }
    created(t, i) {
        const s = i.container;
        i.addBinding(new N(t, this.key, s.get(A), this.$get));
    }
};

X = _([ g() ], X);

export { T as ActionHandler, $ as DispatchAttributePattern, M as DispatchBindingCommand, DispatchBindingInstruction, q as DispatchBindingInstructionRenderer, P as IActionHandler, C as IState, A as IStore, L as StateAttributePattern, StateBinding, x as StateBindingBehavior, G as StateBindingCommand, StateBindingInstruction, W as StateBindingInstructionRenderer, K as StateDefaultConfiguration, StateDispatchBinding, Q as fromState };
//# sourceMappingURL=index.mjs.map
