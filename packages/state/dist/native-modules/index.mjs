import { DI as t, Registration as i, optional as s, all as n, ILogger as e, camelCase as h } from "../../../kernel/dist/native-modules/index.mjs";

import { implementAstEvaluator as r, mixingBindingLimited as o, bindingBehavior as c, attributePattern as a, bindingCommand as u, renderer as l, AttrSyntax as f, IPlatform as d, lifecycleHooks as g, CustomElement as p, CustomAttribute as S, ILifecycleHooks as b } from "../../../runtime-html/dist/native-modules/index.mjs";

import { Scope as B, connectable as m, astEvaluate as v, astBind as y, astUnbind as w, IExpressionParser as I, IObserverLocator as D } from "../../../runtime/dist/native-modules/index.mjs";

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

function $(t, i, s, n) {
    var e = arguments.length, h = e < 3 ? i : null === n ? n = Object.getOwnPropertyDescriptor(i, s) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, i, s, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(i, s, h) : r(i, s)) || h;
    return e > 3 && h && Object.defineProperty(i, s, h), h;
}

function _(t, i) {
    const s = {
        bindingContext: t
    };
    const n = B.create(t, s, true);
    n.parent = i;
    return n;
}

function j(t) {
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
        this.locator = i;
        this.taskQueue = n;
        this.R = o;
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
        this.T();
        if (O(t)) {
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
    $bind(t) {
        if (this.isBound) return;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.R.subscribe(this);
        this.updateTarget(this.v = v(this.ast, this.scope = _(this.R.getState(), t), this, this.mode > 1 ? this : null));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.T();
        this.A++;
        this.scope = void 0;
        this.task?.cancel();
        this.task = null;
        this.R.unsubscribe(this);
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
            this.task = this.taskQueue.queueTask((() => {
                this.updateTarget(t);
                this.task = null;
            }), k);
            n?.cancel();
            n = null;
        } else this.updateTarget(t);
    }
    handleStateChange() {
        if (!this.isBound) return;
        const t = this.R.getState();
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
            this.task = this.taskQueue.queueTask((() => {
                this.updateTarget(n);
                this.task = null;
            }), k);
            h?.cancel();
        } else this.updateTarget(this.v);
    }
    T() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
}

function O(t) {
    return t instanceof Object && "subscribe" in t;
}

const k = {
    reusable: false,
    preempt: true
};

m(StateBinding);

r(true)(StateBinding);

o(StateBinding, (() => "updateTarget"));

const E = new WeakMap;

let H = class StateBindingBehavior {
    constructor(t) {
        this.R = t;
    }
    bind(t, i) {
        const s = i instanceof StateBinding;
        t = s ? t : _(this.R.getState(), t);
        let n;
        if (!s) {
            n = E.get(i);
            if (null == n) E.set(i, n = new StateSubscriber(i, t)); else n.$ = t;
            this.R.subscribe(n);
            i.useScope(t);
        }
    }
    unbind(t, i) {
        const s = i instanceof StateBinding;
        if (!s) {
            this.R.unsubscribe(E.get(i));
            E.delete(i);
        }
    }
};

H.inject = [ A ];

H = $([ c("state") ], H);

class StateSubscriber {
    constructor(t, i) {
        this._ = t;
        this.$ = i;
    }
    handleStateChange(t) {
        const i = this.$;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        this._.handleChange?.(void 0, void 0);
    }
}

class StateDispatchBinding {
    constructor(t, i, s, n, e) {
        this.isBound = false;
        this.boundFn = false;
        this.locator = t;
        this.R = e;
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
        void this.R.dispatch(s.type, ...s.params instanceof Array ? s.params : []);
    }
    handleEvent(t) {
        this.callSource(t);
    }
    $bind(t) {
        if (this.isBound) return;
        y(this.ast, t, this);
        this.scope = _(this.R.getState(), t);
        this.target.addEventListener(this.targetProperty, this);
        this.R.subscribe(this);
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        w(this.ast, this.scope, this);
        this.scope = void 0;
        this.target.removeEventListener(this.targetProperty, this);
        this.R.unsubscribe(this);
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

let x = class StateAttributePattern {
    "PART.state"(t, i, s) {
        return new f(t, i, s[0], "state");
    }
};

x = $([ a({
    pattern: "PART.state",
    symbols: "."
}) ], x);

let L = class DispatchAttributePattern {
    "PART.dispatch"(t, i, s) {
        return new f(t, i, s[0], "dispatch");
    }
};

L = $([ a({
    pattern: "PART.dispatch",
    symbols: "."
}) ], L);

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

G = $([ u("state") ], G);

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

M = $([ u("dispatch") ], M);

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
        this.j = s;
        this.p = n;
    }
    render(t, i, s) {
        const n = new StateBinding(t, t.container, this.oL, this.p.domWriteQueue, z(this.ep, s.from, 4), i, s.to, this.j);
        t.addBinding(n);
    }
};

W.inject = [ I, D, A, d ];

W = $([ l("sb") ], W);

let q = class DispatchBindingInstructionRenderer {
    constructor(t, i) {
        this.ep = t;
        this.j = i;
    }
    render(t, i, s) {
        const n = z(this.ep, s.ast, 8);
        t.addBinding(new StateDispatchBinding(t.container, n, i, s.from, this.j));
    }
};

q.inject = [ I, A ];

q = $([ l("sd") ], q);

function z(t, i, s) {
    if ("string" === typeof i) return t.parse(i, s);
    return i;
}

const F = [ x, G, W, L, M, q, H, Store ];

const J = (t, s) => ({
    register: n => {
        n.register(i.instance(C, t), ...F, ...s.map(T.define));
    },
    init: (t, ...i) => J(t, i)
});

const K = J({}, []);

let N = class StateGetterBinding {
    constructor(t, i, s, n, e) {
        this.isBound = false;
        this.v = void 0;
        this.P = void 0;
        this.A = 0;
        this.locator = t;
        this.R = n;
        this.$get = e;
        this.target = i;
        this.key = s;
    }
    updateTarget(t) {
        const i = this.target;
        const s = this.key;
        const n = this.A++;
        const e = () => n === this.A - 1;
        this.T();
        if (j(t)) {
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
    $bind(t) {
        if (this.isBound) return;
        const i = this.R.getState();
        this.scope = _(i, t);
        this.R.subscribe(this);
        this.updateTarget(this.v = this.$get(i));
        this.isBound = true;
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.T();
        this.A++;
        this.scope = void 0;
        this.R.unsubscribe(this);
    }
    handleStateChange(t) {
        const i = this.scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = this.$get(this.R.getState());
        if (n === this.v) return;
        this.v = n;
        this.updateTarget(n);
    }
    T() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
};

N = $([ m() ], N);

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
        i.addBinding(new N(s, t, this.key, s.get(A), this.$get));
    }
};

V = $([ g() ], V);

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
        i.addBinding(new N(s, t, this.key, s.get(A), this.$get));
    }
};

X = $([ g() ], X);

export { T as ActionHandler, L as DispatchAttributePattern, M as DispatchBindingCommand, DispatchBindingInstruction, q as DispatchBindingInstructionRenderer, P as IActionHandler, C as IState, A as IStore, x as StateAttributePattern, StateBinding, H as StateBindingBehavior, G as StateBindingCommand, StateBindingInstruction, W as StateBindingInstructionRenderer, K as StateDefaultConfiguration, StateDispatchBinding, Q as fromState };

