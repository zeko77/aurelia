"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var s = require("@aurelia/runtime-html");

var i = require("@aurelia/runtime");

const e = t.DI.createInterface("IActionHandler");

const n = t.DI.createInterface("IStore");

const h = t.DI.createInterface("IState");

const r = "__au_ah__";

const o = Object.freeze({
    define(s) {
        function i(t, i, ...e) {
            return s(t, i, ...e);
        }
        i[r] = true;
        i.register = function(i) {
            t.Registration.instance(e, s).register(i);
        };
        return i;
    },
    isType: t => "function" === typeof t && r in t
});

class Store {
    constructor(t, s, i) {
        this.t = new Set;
        this.i = 0;
        this.h = [];
        this._state = t ?? new State;
        this.u = s;
        this.B = i;
    }
    static register(s) {
        t.Registration.singleton(n, this).register(s);
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
        const e = (t, s, i) => this.u.reduce(((t, e) => {
            if (t instanceof Promise) return t.then((t => e(t, s, ...i ?? [])));
            return e(t, s, ...i ?? []);
        }), t);
        const n = t => {
            if (this.h.length > 0) {
                i = this.h.shift();
                const s = e(t, i.type, i.params);
                if (s instanceof Promise) return s.then((t => n(t))); else return n(s);
            }
        };
        const h = e(this._state, t, s);
        if (h instanceof Promise) return h.then((t => {
            this.I(t);
            this.i--;
            return n(this._state);
        }), (t => {
            this.i--;
            throw t;
        })); else {
            this.I(h);
            this.i--;
            return n(this._state);
        }
    }
}

Store.inject = [ t.optional(h), t.all(e), t.ILogger ];

class State {}

function c(t, s, i, e) {
    var n = arguments.length, h = n < 3 ? s : null === e ? e = Object.getOwnPropertyDescriptor(s, i) : e, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, s, i, e); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (n < 3 ? r(h) : n > 3 ? r(s, i, h) : r(s, i)) || h;
    return n > 3 && h && Object.defineProperty(s, i, h), h;
}

function a(t, s) {
    const e = {
        bindingContext: t
    };
    const n = i.Scope.create(t, e, true);
    n.parent = s;
    return n;
}

function u(t) {
    return t instanceof Object && "subscribe" in t;
}

class StateBinding {
    constructor(t, s, i, e, n, h, r, o) {
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this._ = 0;
        this.boundFn = false;
        this.mode = 2;
        this.A = t;
        this.l = s;
        this.C = e;
        this.R = o;
        this.oL = i;
        this.ast = n;
        this.target = h;
        this.targetProperty = r;
    }
    updateTarget(t) {
        const s = this.targetObserver;
        const i = this.target;
        const e = this.targetProperty;
        const n = this._++;
        const h = () => n === this._ - 1;
        this.j();
        if (l(t)) {
            this.P = t.subscribe((t => {
                if (h()) s.setValue(t, i, e);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (h()) s.setValue(t, i, e);
            }), (() => {}));
            return;
        }
        s.setValue(t, i, e);
    }
    bind(t) {
        if (this.isBound) return;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.R.subscribe(this);
        this.updateTarget(this.v = i.astEvaluate(this.ast, this.scope = a(this.R.getState(), t), this, this.mode > 1 ? this : null));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.j();
        this._++;
        this.scope = void 0;
        this.task?.cancel();
        this.task = null;
        this.R.unsubscribe(this);
    }
    handleChange(t) {
        if (!this.isBound) return;
        const s = 1 !== this.A.state && (4 & this.targetObserver.type) > 0;
        const e = this.obs;
        e.version++;
        t = i.astEvaluate(this.ast, this.scope, this, this);
        e.clear();
        let n;
        if (s) {
            n = this.task;
            this.task = this.C.queueTask((() => {
                this.updateTarget(t);
                this.task = null;
            }), d);
            n?.cancel();
            n = null;
        } else this.updateTarget(t);
    }
    handleStateChange() {
        if (!this.isBound) return;
        const t = this.R.getState();
        const s = this.scope;
        const e = s.overrideContext;
        s.bindingContext = e.bindingContext = e.$state = t;
        const n = i.astEvaluate(this.ast, s, this, this.mode > 1 ? this : null);
        const h = 1 !== this.A.state && (4 & this.targetObserver.type) > 0;
        if (n === this.v) return;
        this.v = n;
        let r = null;
        if (h) {
            r = this.task;
            this.task = this.C.queueTask((() => {
                this.updateTarget(n);
                this.task = null;
            }), d);
            r?.cancel();
        } else this.updateTarget(this.v);
    }
    j() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
}

function l(t) {
    return t instanceof Object && "subscribe" in t;
}

const d = {
    reusable: false,
    preempt: true
};

i.connectable(StateBinding);

s.mixinAstEvaluator(true)(StateBinding);

s.mixingBindingLimited(StateBinding, (() => "updateTarget"));

const f = new WeakMap;

exports.StateBindingBehavior = class StateBindingBehavior {
    constructor(t) {
        this.R = t;
    }
    bind(t, s) {
        const i = s instanceof StateBinding;
        t = i ? t : a(this.R.getState(), t);
        let e;
        if (!i) {
            e = f.get(s);
            if (null == e) f.set(s, e = new StateSubscriber(s, t)); else e.T = t;
            this.R.subscribe(e);
            s.useScope(t);
        }
    }
    unbind(t, s) {
        const i = s instanceof StateBinding;
        if (!i) {
            this.R.unsubscribe(f.get(s));
            f.delete(s);
        }
    }
};

exports.StateBindingBehavior.inject = [ n ];

exports.StateBindingBehavior = c([ s.bindingBehavior("state") ], exports.StateBindingBehavior);

class StateSubscriber {
    constructor(t, s) {
        this.O = t;
        this.T = s;
    }
    handleStateChange(t) {
        const s = this.T;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        this.O.handleChange?.(void 0, void 0);
    }
}

class StateDispatchBinding {
    constructor(t, s, i, e, n) {
        this.isBound = false;
        this.boundFn = false;
        this.l = t;
        this.R = n;
        this.ast = s;
        this.target = i;
        this.targetProperty = e;
    }
    callSource(t) {
        const s = this.scope;
        s.overrideContext.$event = t;
        const e = i.astEvaluate(this.ast, s, this, null);
        delete s.overrideContext.$event;
        if (!this.isAction(e)) throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${t.type}"`);
        void this.R.dispatch(e.type, ...e.params instanceof Array ? e.params : []);
    }
    handleEvent(t) {
        this.callSource(t);
    }
    bind(t) {
        if (this.isBound) return;
        i.astBind(this.ast, t, this);
        this.scope = a(this.R.getState(), t);
        this.target.addEventListener(this.targetProperty, this);
        this.R.subscribe(this);
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        i.astUnbind(this.ast, this.scope, this);
        this.scope = void 0;
        this.target.removeEventListener(this.targetProperty, this);
        this.R.unsubscribe(this);
    }
    handleStateChange(t) {
        const s = this.scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = t;
    }
    isAction(t) {
        return null != t && "object" === typeof t && "type" in t;
    }
}

i.connectable(StateDispatchBinding);

s.mixinAstEvaluator(true)(StateDispatchBinding);

s.mixingBindingLimited(StateDispatchBinding, (() => "callSource"));

exports.StateAttributePattern = class StateAttributePattern {
    "PART.state"(t, i, e) {
        return new s.AttrSyntax(t, i, e[0], "state");
    }
};

exports.StateAttributePattern = c([ s.attributePattern({
    pattern: "PART.state",
    symbols: "."
}) ], exports.StateAttributePattern);

exports.DispatchAttributePattern = class DispatchAttributePattern {
    "PART.dispatch"(t, i, e) {
        return new s.AttrSyntax(t, i, e[0], "dispatch");
    }
};

exports.DispatchAttributePattern = c([ s.attributePattern({
    pattern: "PART.dispatch",
    symbols: "."
}) ], exports.DispatchAttributePattern);

exports.StateBindingCommand = class StateBindingCommand {
    get type() {
        return 0;
    }
    get name() {
        return "state";
    }
    build(s, i, e) {
        const n = s.attr;
        let h = n.target;
        let r = n.rawValue;
        if (null == s.bindable) h = e.map(s.node, h) ?? t.camelCase(h); else {
            if ("" === r && 1 === s.def.type) r = t.camelCase(h);
            h = s.bindable.property;
        }
        return new StateBindingInstruction(r, h);
    }
};

exports.StateBindingCommand = c([ s.bindingCommand("state") ], exports.StateBindingCommand);

exports.DispatchBindingCommand = class DispatchBindingCommand {
    get type() {
        return 1;
    }
    get name() {
        return "dispatch";
    }
    build(t) {
        const s = t.attr;
        return new DispatchBindingInstruction(s.target, s.rawValue);
    }
};

exports.DispatchBindingCommand = c([ s.bindingCommand("dispatch") ], exports.DispatchBindingCommand);

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
        this.ast = s;
        this.type = "sd";
    }
}

exports.StateBindingInstructionRenderer = class StateBindingInstructionRenderer {
    constructor(t, s, i, e) {
        this.ep = t;
        this.oL = s;
        this.H = i;
        this.p = e;
    }
    render(t, s, i) {
        t.addBinding(new StateBinding(t, t.container, this.oL, this.p.domWriteQueue, p(this.ep, i.from, 8), s, i.to, this.H));
    }
};

exports.StateBindingInstructionRenderer.inject = [ i.IExpressionParser, i.IObserverLocator, n, s.IPlatform ];

exports.StateBindingInstructionRenderer = c([ s.renderer("sb") ], exports.StateBindingInstructionRenderer);

exports.DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(t, s) {
        this.ep = t;
        this.H = s;
    }
    render(t, s, i) {
        const e = p(this.ep, i.ast, 16);
        t.addBinding(new StateDispatchBinding(t.container, e, s, i.from, this.H));
    }
};

exports.DispatchBindingInstructionRenderer.inject = [ i.IExpressionParser, n ];

exports.DispatchBindingInstructionRenderer = c([ s.renderer("sd") ], exports.DispatchBindingInstructionRenderer);

function p(t, s, i) {
    if ("string" === typeof s) return t.parse(s, i);
    return s;
}

const g = [ exports.StateAttributePattern, exports.StateBindingCommand, exports.StateBindingInstructionRenderer, exports.DispatchAttributePattern, exports.DispatchBindingCommand, exports.DispatchBindingInstructionRenderer, exports.StateBindingBehavior, Store ];

const x = (s, i) => ({
    register: e => {
        e.register(t.Registration.instance(h, s), ...g, ...i.map(o.define));
    },
    init: (t, ...s) => x(t, s)
});

const b = x({}, []);

let S = class StateGetterBinding {
    constructor(t, s, i, e) {
        this.isBound = false;
        this.v = void 0;
        this.P = void 0;
        this._ = 0;
        this.R = i;
        this.$get = e;
        this.target = t;
        this.key = s;
    }
    updateTarget(t) {
        const s = this.target;
        const i = this.key;
        const e = this._++;
        const n = () => e === this._ - 1;
        this.j();
        if (u(t)) {
            this.P = t.subscribe((t => {
                if (n()) s[i] = t;
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (n()) s[i] = t;
            }), (() => {}));
            return;
        }
        s[i] = t;
    }
    bind(t) {
        if (this.isBound) return;
        const s = this.R.getState();
        this.scope = a(s, t);
        this.R.subscribe(this);
        this.updateTarget(this.v = this.$get(s));
        this.isBound = true;
    }
    unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.j();
        this._++;
        this.scope = void 0;
        this.R.unsubscribe(this);
    }
    handleStateChange(t) {
        const s = this.scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const e = this.$get(this.R.getState());
        if (e === this.v) return;
        this.v = e;
        this.updateTarget(e);
    }
    j() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
};

S = c([ i.connectable() ], S);

function v(t) {
    return function(i, e, n) {
        if ("function" === typeof i) throw new Error(`Invalid usage. @state can only be used on a field`);
        if ("undefined" !== typeof n?.value) throw new Error(`Invalid usage. @state can only be used on a field`);
        i = i.constructor;
        let h = s.CustomElement.getAnnotation(i, B);
        if (null == h) s.CustomElement.annotate(i, B, h = []);
        h.push(new y(t, e));
        h = s.CustomAttribute.getAnnotation(i, B);
        if (null == h) s.CustomElement.annotate(i, B, h = []);
        h.push(new w(t, e));
    };
}

const B = "dependencies";

let y = class HydratingLifecycleHooks {
    constructor(t, s) {
        this.$get = t;
        this.key = s;
    }
    register(i) {
        t.Registration.instance(s.ILifecycleHooks, this).register(i);
    }
    hydrating(t, s) {
        const i = s.container;
        s.addBinding(new S(t, this.key, i.get(n), this.$get));
    }
};

y = c([ s.lifecycleHooks() ], y);

let w = class CreatedLifecycleHooks {
    constructor(t, s) {
        this.$get = t;
        this.key = s;
    }
    register(i) {
        t.Registration.instance(s.ILifecycleHooks, this).register(i);
    }
    created(t, s) {
        const i = s.container;
        s.addBinding(new S(t, this.key, i.get(n), this.$get));
    }
};

w = c([ s.lifecycleHooks() ], w);

exports.ActionHandler = o;

exports.DispatchBindingInstruction = DispatchBindingInstruction;

exports.IActionHandler = e;

exports.IState = h;

exports.IStore = n;

exports.StateBinding = StateBinding;

exports.StateBindingInstruction = StateBindingInstruction;

exports.StateDefaultConfiguration = b;

exports.StateDispatchBinding = StateDispatchBinding;

exports.fromState = v;
//# sourceMappingURL=index.cjs.map
