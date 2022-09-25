import { DI as t, Registration as i, optional as s, all as n, ILogger as e, camelCase as h } from "../../../kernel/dist/native-modules/index.mjs";

import { astEvaluator as r, bindingBehavior as o, BindingInterceptor as c, attributePattern as a, bindingCommand as u, renderer as l, AttrSyntax as f, IPlatform as d, applyBindingBehavior as g, lifecycleHooks as p, CustomElement as b, CustomAttribute as S, ILifecycleHooks as m } from "../../../runtime-html/dist/native-modules/index.mjs";

import { Scope as v, connectable as y, astEvaluate as B, IExpressionParser as w, IObserverLocator as I } from "../../../runtime/dist/native-modules/index.mjs";

const P = t.createInterface("IActionHandler");

const D = t.createInterface("IStore");

const R = t.createInterface("IState");

const $ = "__au_ah__";

const A = Object.freeze({
    define(t) {
        function s(i, s, ...n) {
            return t(i, s, ...n);
        }
        s[$] = true;
        s.register = function(s) {
            i.instance(P, t).register(s);
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
        this._state = t ?? new State;
        this.u = i;
        this.B = s;
    }
    static register(t) {
        i.singleton(D, this).register(t);
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

Store.inject = [ s(R), n(P), e ];

class State {}

function C(t, i, s, n) {
    var e = arguments.length, h = e < 3 ? i : null === n ? n = Object.getOwnPropertyDescriptor(i, s) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, i, s, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(i, s, h) : r(i, s)) || h;
    return e > 3 && h && Object.defineProperty(i, s, h), h;
}

function _(t, i) {
    const s = {
        bindingContext: t
    };
    const n = v.create(t, s, true);
    n.parent = i;
    return n;
}

const j = (t, i, s) => Reflect.defineProperty(t.prototype, i, s);

function T(t) {
    return t instanceof Object && "subscribe" in t;
}

class StateBinding {
    constructor(t, i, s, n, e, h, r, o) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.boundFn = false;
        this.mode = 2;
        this.$ = t;
        this.locator = i;
        this.taskQueue = n;
        this.A = o;
        this.oL = s;
        this.ast = e;
        this.target = h;
        this.targetProperty = r;
    }
    updateTarget(t) {
        const i = this.targetObserver;
        const s = this.target;
        const n = this.targetProperty;
        const e = this.R++;
        const h = () => e === this.R - 1;
        this.C();
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
        this.isBound = true;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.$scope = _(this.A.getState(), t);
        this.A.subscribe(this);
        this.updateTarget(this.v = B(this.ast, this.$scope, this, this.mode > 1 ? this : null));
    }
    $unbind() {
        if (!this.isBound) return;
        this.C();
        this.R++;
        this.isBound = false;
        this.$scope = void 0;
        this.task?.cancel();
        this.task = null;
        this.A.unsubscribe(this);
    }
    handleChange(t) {
        if (!this.isBound) return;
        const i = 1 !== this.$.state && (4 & this.targetObserver.type) > 0;
        const s = this.obs;
        s.version++;
        t = B(this.ast, this.$scope, this, this.interceptor);
        s.clear();
        let n;
        if (i) {
            n = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t);
                this.task = null;
            }), x);
            n?.cancel();
            n = null;
        } else this.interceptor.updateTarget(t);
    }
    handleStateChange() {
        if (!this.isBound) return;
        const t = this.A.getState();
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = B(this.ast, i, this, this.mode > 1 ? this : null);
        const e = 1 !== this.$.state && (4 & this.targetObserver.type) > 0;
        if (n === this.v) return;
        this.v = n;
        let h = null;
        if (e) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(n);
                this.task = null;
            }), x);
            h?.cancel();
        } else this.interceptor.updateTarget(this.v);
    }
    C() {
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

const x = {
    reusable: false,
    preempt: true
};

y(StateBinding);

r(true)(StateBinding);

let E = class StateBindingBehavior extends c {
    constructor(t, i, s) {
        super(i, s);
        this.A = t;
        this._ = i instanceof StateBinding;
    }
    $bind(t) {
        const i = this.binding;
        const s = this._ ? t : _(this.A.getState(), t);
        if (!this._) this.A.subscribe(this);
        i.$bind(s);
    }
    $unbind() {
        if (!this._) this.A.unsubscribe(this);
        this.binding.$unbind();
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        this.binding.handleChange(void 0, void 0);
    }
};

E.inject = [ D ];

E = C([ o("state") ], E);

[ "target", "targetProperty" ].forEach((t => {
    j(E, t, {
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

class StateDispatchBinding {
    constructor(t, i, s, n, e) {
        this.interceptor = this;
        this.isBound = false;
        this.boundFn = false;
        this.locator = t;
        this.A = e;
        this.ast = i;
        this.target = s;
        this.targetProperty = n;
    }
    callSource(t) {
        const i = this.$scope;
        i.overrideContext.$event = t;
        const s = B(this.ast, i, this, null);
        delete i.overrideContext.$event;
        if (!this.isAction(s)) throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${t.type}"`);
        void this.A.dispatch(s.type, ...s.params instanceof Array ? s.params : []);
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t) {
        if (this.isBound) return;
        this.isBound = true;
        this.$scope = _(this.A.getState(), t);
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
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = t;
    }
    isAction(t) {
        return null != t && "object" === typeof t && "type" in t;
    }
}

y(StateDispatchBinding);

r(true)(StateDispatchBinding);

let H = class StateAttributePattern {
    "PART.state"(t, i, s) {
        return new f(t, i, s[0], "state");
    }
};

H = C([ a({
    pattern: "PART.state",
    symbols: "."
}) ], H);

let k = class DispatchAttributePattern {
    "PART.dispatch"(t, i, s) {
        return new f(t, i, s[0], "dispatch");
    }
};

k = C([ a({
    pattern: "PART.dispatch",
    symbols: "."
}) ], k);

let L = class StateBindingCommand {
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

L = C([ u("state") ], L);

let G = class DispatchBindingCommand {
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

G = C([ u("dispatch") ], G);

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

let q = class StateBindingInstructionRenderer {
    constructor(t, i, s, n) {
        this.ep = t;
        this.oL = i;
        this.j = s;
        this.p = n;
    }
    render(t, i, s) {
        const n = new StateBinding(t, t.container, this.oL, this.p.domWriteQueue, F(this.ep, s.from, 4), i, s.to, this.j);
        t.addBinding(n);
    }
};

q.inject = [ w, I, D, d ];

q = C([ l("sb") ], q);

let z = class DispatchBindingInstructionRenderer {
    constructor(t, i) {
        this.ep = t;
        this.j = i;
    }
    render(t, i, s) {
        const n = F(this.ep, s.ast, 8);
        const e = new StateDispatchBinding(t.container, n, i, s.from, this.j);
        t.addBinding(18 === n.$kind ? g(e, n, t.container) : e);
    }
};

z.inject = [ w, D ];

z = C([ l("sd") ], z);

function F(t, i, s) {
    if ("string" === typeof i) return t.parse(i, s);
    return i;
}

const J = [ H, L, q, k, G, z, E, Store ];

const K = (t, s) => ({
    register: n => {
        n.register(i.instance(R, t), ...J, ...s.map(A.define));
    },
    init: (t, ...i) => K(t, i)
});

const M = K({}, []);

let N = class StateGetterBinding {
    constructor(t, i, s, n, e) {
        this.interceptor = this;
        this.isBound = false;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.locator = t;
        this.A = n;
        this.$get = e;
        this.target = i;
        this.key = s;
    }
    updateTarget(t) {
        const i = this.target;
        const s = this.key;
        const n = this.R++;
        const e = () => n === this.R - 1;
        this.C();
        if (T(t)) {
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
        const i = this.A.getState();
        this.isBound = true;
        this.$scope = _(i, t);
        this.A.subscribe(this);
        this.updateTarget(this.v = this.$get(i));
    }
    $unbind() {
        if (!this.isBound) return;
        this.C();
        this.R++;
        this.isBound = false;
        this.$scope = void 0;
        this.A.unsubscribe(this);
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = this.$get(this.A.getState());
        if (n === this.v) return;
        this.v = n;
        this.updateTarget(n);
    }
    C() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
};

N = C([ y() ], N);

function Q(t) {
    return function(i, s, n) {
        if ("function" === typeof i) throw new Error(`Invalid usage. @state can only be used on a field`);
        if ("undefined" !== typeof n?.value) throw new Error(`Invalid usage. @state can only be used on a field`);
        i = i.constructor;
        let e = b.getAnnotation(i, U);
        if (null == e) b.annotate(i, U, e = []);
        e.push(new V(t, s));
        e = S.getAnnotation(i, U);
        if (null == e) b.annotate(i, U, e = []);
        e.push(new W(t, s));
    };
}

const U = "dependencies";

let V = class HydratingLifecycleHooks {
    constructor(t, i) {
        this.$get = t;
        this.key = i;
    }
    register(t) {
        i.instance(m, this).register(t);
    }
    hydrating(t, i) {
        const s = i.container;
        i.addBinding(new N(s, t, this.key, s.get(D), this.$get));
    }
};

V = C([ p() ], V);

let W = class CreatedLifecycleHooks {
    constructor(t, i) {
        this.$get = t;
        this.key = i;
    }
    register(t) {
        i.instance(m, this).register(t);
    }
    created(t, i) {
        const s = i.container;
        i.addBinding(new N(s, t, this.key, s.get(D), this.$get));
    }
};

W = C([ p() ], W);

export { A as ActionHandler, k as DispatchAttributePattern, G as DispatchBindingCommand, DispatchBindingInstruction, z as DispatchBindingInstructionRenderer, P as IActionHandler, R as IState, D as IStore, H as StateAttributePattern, StateBinding, E as StateBindingBehavior, L as StateBindingCommand, StateBindingInstruction, q as StateBindingInstructionRenderer, M as StateDefaultConfiguration, StateDispatchBinding, Q as fromState };

