import { DI as t, Registration as i, optional as s, all as n, ILogger as e, camelCase as h } from "@aurelia/kernel";

import { astEvaluator as r, BindingMode as o, bindingBehavior as c, BindingInterceptor as a, attributePattern as u, bindingCommand as l, renderer as f, AttrSyntax as d, IAttrMapper as g, IPlatform as p, applyBindingBehavior as b, lifecycleHooks as S, CustomElement as m, CustomAttribute as v, ILifecycleHooks as B } from "@aurelia/runtime-html";

import { Scope as y, connectable as w, IExpressionParser as I, IObserverLocator as P } from "@aurelia/runtime";

const D = t.createInterface("IActionHandler");

const R = t.createInterface("IStore");

const $ = t.createInterface("IState");

const A = "__reducer__";

const C = Object.freeze({
    define(t) {
        function s(i, s, ...n) {
            return t(i, s, ...n);
        }
        s[A] = true;
        s.register = function(s) {
            i.instance(D, t).register(s);
        };
        return s;
    },
    isType: t => "function" === typeof t && A in t
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
        i.singleton(R, this).register(t);
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

Store.inject = [ s($), n(D), e ];

class State {}

function T(t, i, s, n) {
    var e = arguments.length, h = e < 3 ? i : null === n ? n = Object.getOwnPropertyDescriptor(i, s) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, i, s, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(i, s, h) : r(i, s)) || h;
    return e > 3 && h && Object.defineProperty(i, s, h), h;
}

function j(t, i) {
    const s = {
        bindingContext: t
    };
    const n = y.create(t, s, true);
    n.parentScope = i;
    return n;
}

const _ = (t, i, s) => Reflect.defineProperty(t.prototype, i, s);

function O(t) {
    return t instanceof Object && "subscribe" in t;
}

const {toView: x, oneTime: E} = o;

class StateBinding {
    constructor(t, i, s, n, e, h, r, o) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.mode = x;
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
        if (H(t)) {
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
        this.$scope = j(this.A.getState(), t);
        this.A.subscribe(this);
        this.updateTarget(this.v = this.ast.evaluate(this.$scope, this, this.mode > E ? this : null));
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
        t = this.ast.evaluate(this.$scope, this, this.interceptor);
        s.clear();
        let n;
        if (i) {
            n = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t);
                this.task = null;
            }), k);
            n?.cancel();
            n = null;
        } else this.interceptor.updateTarget(t);
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        const n = this.ast.evaluate(i, this, this.mode > E ? this : null);
        const e = 1 !== this.$.state && (4 & this.targetObserver.type) > 0;
        if (n === this.v) return;
        this.v = n;
        let h = null;
        if (e) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(n);
                this.task = null;
            }), k);
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

function H(t) {
    return t instanceof Object && "subscribe" in t;
}

const k = {
    reusable: false,
    preempt: true
};

w(StateBinding);

r(true)(StateBinding);

let L = class StateBindingBehavior extends a {
    constructor(t, i, s) {
        super(i, s);
        this.A = t;
        this.T = i instanceof StateBinding;
    }
    $bind(t) {
        const i = this.binding;
        const s = this.T ? t : j(this.A.getState(), t);
        if (!this.T) this.A.subscribe(this);
        i.$bind(s);
    }
    $unbind() {
        if (!this.T) this.A.unsubscribe(this);
        this.binding.$unbind();
    }
    handleStateChange(t) {
        const i = this.$scope;
        const s = i.overrideContext;
        i.bindingContext = s.bindingContext = s.$state = t;
        this.binding.handleChange(void 0, void 0);
    }
};

L.inject = [ R ];

L = T([ c("state") ], L);

[ "target", "targetProperty" ].forEach((t => {
    _(L, t, {
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
        this.locator = t;
        this.A = e;
        this.ast = i;
        this.target = s;
        this.targetProperty = n;
    }
    callSource(t) {
        const i = this.$scope;
        i.overrideContext.$event = t;
        const s = this.ast.evaluate(i, this, null);
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
        this.$scope = j(this.A.getState(), t);
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

w(StateDispatchBinding);

r(true)(StateDispatchBinding);

let G = class StateAttributePattern {
    "PART.state"(t, i, s) {
        return new d(t, i, s[0], "state");
    }
};

G = T([ u({
    pattern: "PART.state",
    symbols: "."
}) ], G);

let V = class DispatchAttributePattern {
    "PART.dispatch"(t, i, s) {
        return new d(t, i, s[0], "dispatch");
    }
};

V = T([ u({
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
        const i = t.attr;
        let s = i.target;
        let n = i.rawValue;
        if (null == t.bindable) s = this.m.map(t.node, s) ?? h(s); else {
            if ("" === n && 1 === t.def.type) n = h(s);
            s = t.bindable.property;
        }
        return new StateBindingInstruction(n, s);
    }
};

q.inject = [ g ];

q = T([ l("state") ], q);

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

z = T([ l("dispatch") ], z);

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

let F = class StateBindingInstructionRenderer {
    constructor(t, i, s, n) {
        this.ep = t;
        this.oL = i;
        this.j = s;
        this.p = n;
    }
    render(t, i, s) {
        const n = new StateBinding(t, t.container, this.oL, this.p.domWriteQueue, K(this.ep, s.from, 4), i, s.to, this.j);
        t.addBinding(n);
    }
};

F.inject = [ I, P, R, p ];

F = T([ f("sb") ], F);

let J = class DispatchBindingInstructionRenderer {
    constructor(t, i) {
        this.ep = t;
        this.j = i;
    }
    render(t, i, s) {
        const n = K(this.ep, s.ast, 8);
        const e = new StateDispatchBinding(t.container, n, i, s.from, this.j);
        t.addBinding(38963 === n.$kind ? b(e, n, t.container) : e);
    }
};

J.inject = [ I, R ];

J = T([ f("sd") ], J);

function K(t, i, s) {
    if ("string" === typeof i) return t.parse(i, s);
    return i;
}

const M = [ G, q, F, V, z, J, L, Store ];

const N = (t, s) => ({
    register: n => {
        n.register(i.instance($, t), ...M, ...s.map(C.define));
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
    $bind(t) {
        if (this.isBound) return;
        const i = this.A.getState();
        this.isBound = true;
        this.$scope = j(i, t);
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

U = T([ w() ], U);

function W(t) {
    return function(i, s, n) {
        if ("function" === typeof i) throw new Error(`Invalid usage. @state can only be used on a field`);
        if ("undefined" !== typeof n?.value) throw new Error(`Invalid usage. @state can only be used on a field`);
        i = i.constructor;
        let e = m.getAnnotation(i, X);
        if (null == e) m.annotate(i, X, e = []);
        e.push(new Y(t, s));
        e = v.getAnnotation(i, X);
        if (null == e) m.annotate(i, X, e = []);
        e.push(new Z(t, s));
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
        i.addBinding(new U(s, t, this.key, s.get(R), this.$get));
    }
};

Y = T([ S() ], Y);

let Z = class CreatedLifecycleHooks {
    constructor(t, i) {
        this.$get = t;
        this.key = i;
    }
    register(t) {
        i.instance(B, this).register(t);
    }
    created(t, i) {
        const s = i.container;
        i.addBinding(new U(s, t, this.key, s.get(R), this.$get));
    }
};

Z = T([ S() ], Z);

export { C as ActionHandler, V as DispatchAttributePattern, z as DispatchBindingCommand, DispatchBindingInstruction, J as DispatchBindingInstructionRenderer, D as IActionHandler, $ as IState, R as IStore, G as StateAttributePattern, StateBinding, L as StateBindingBehavior, q as StateBindingCommand, StateBindingInstruction, F as StateBindingInstructionRenderer, Q as StateDefaultConfiguration, StateDispatchBinding, W as fromState };
//# sourceMappingURL=index.mjs.map
