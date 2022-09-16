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

const r = "__reducer__";

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
    n.parentScope = s;
    return n;
}

const u = (t, s, i) => Reflect.defineProperty(t.prototype, s, i);

function l(t) {
    return t instanceof Object && "subscribe" in t;
}

const {toView: d, oneTime: f} = s.BindingMode;

class StateBinding {
    constructor(t, s, i, e, n, h, r, o) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.mode = d;
        this.$ = t;
        this.locator = s;
        this.taskQueue = e;
        this.A = o;
        this.oL = i;
        this.ast = n;
        this.target = h;
        this.targetProperty = r;
    }
    updateTarget(t) {
        const s = this.targetObserver;
        const i = this.target;
        const e = this.targetProperty;
        const n = this.R++;
        const h = () => n === this.R - 1;
        this.C();
        if (p(t)) {
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
    $bind(t) {
        if (this.isBound) return;
        this.isBound = true;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.$scope = a(this.A.getState(), t);
        this.A.subscribe(this);
        this.updateTarget(this.v = this.ast.evaluate(this.$scope, this, this.mode > f ? this : null));
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
        const s = 1 !== this.$.state && (4 & this.targetObserver.type) > 0;
        const i = this.obs;
        i.version++;
        t = this.ast.evaluate(this.$scope, this, this.interceptor);
        i.clear();
        let e;
        if (s) {
            e = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t);
                this.task = null;
            }), g);
            e?.cancel();
            e = null;
        } else this.interceptor.updateTarget(t);
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const e = this.ast.evaluate(s, this, this.mode > f ? this : null);
        const n = 1 !== this.$.state && (4 & this.targetObserver.type) > 0;
        if (e === this.v) return;
        this.v = e;
        let h = null;
        if (n) {
            h = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(e);
                this.task = null;
            }), g);
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

function p(t) {
    return t instanceof Object && "subscribe" in t;
}

const g = {
    reusable: false,
    preempt: true
};

i.connectable(StateBinding);

s.astEvaluator(true)(StateBinding);

exports.StateBindingBehavior = class StateBindingBehavior extends s.BindingInterceptor {
    constructor(t, s, i) {
        super(s, i);
        this.A = t;
        this._ = s instanceof StateBinding;
    }
    $bind(t) {
        const s = this.binding;
        const i = this._ ? t : a(this.A.getState(), t);
        if (!this._) this.A.subscribe(this);
        s.$bind(i);
    }
    $unbind() {
        if (!this._) this.A.unsubscribe(this);
        this.binding.$unbind();
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        this.binding.handleChange(void 0, void 0);
    }
};

exports.StateBindingBehavior.inject = [ n ];

exports.StateBindingBehavior = c([ s.bindingBehavior("state") ], exports.StateBindingBehavior);

[ "target", "targetProperty" ].forEach((t => {
    u(exports.StateBindingBehavior, t, {
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

class StateDispatchBinding {
    constructor(t, s, i, e, n) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = t;
        this.A = n;
        this.ast = s;
        this.target = i;
        this.targetProperty = e;
    }
    callSource(t) {
        const s = this.$scope;
        s.overrideContext.$event = t;
        const i = this.ast.evaluate(s, this, null);
        delete s.overrideContext.$event;
        if (!this.isAction(i)) throw new Error(`Invalid dispatch value from expression on ${this.target} on event: "${t.type}"`);
        void this.A.dispatch(i.type, ...i.params instanceof Array ? i.params : []);
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t) {
        if (this.isBound) return;
        this.isBound = true;
        this.$scope = a(this.A.getState(), t);
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
}

i.connectable(StateDispatchBinding);

s.astEvaluator(true)(StateDispatchBinding);

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
    constructor(t) {
        this.m = t;
        this.type = 0;
    }
    get name() {
        return "state";
    }
    build(s) {
        const i = s.attr;
        let e = i.target;
        let n = i.rawValue;
        if (null == s.bindable) e = this.m.map(s.node, e) ?? t.camelCase(e); else {
            if ("" === n && 1 === s.def.type) n = t.camelCase(e);
            e = s.bindable.property;
        }
        return new StateBindingInstruction(n, e);
    }
};

exports.StateBindingCommand.inject = [ s.IAttrMapper ];

exports.StateBindingCommand = c([ s.bindingCommand("state") ], exports.StateBindingCommand);

exports.DispatchBindingCommand = class DispatchBindingCommand {
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
        this.j = i;
        this.p = e;
    }
    render(t, s, i) {
        const e = new StateBinding(t, t.container, this.oL, this.p.domWriteQueue, x(this.ep, i.from, 4), s, i.to, this.j);
        t.addBinding(e);
    }
};

exports.StateBindingInstructionRenderer.inject = [ i.IExpressionParser, i.IObserverLocator, n, s.IPlatform ];

exports.StateBindingInstructionRenderer = c([ s.renderer("sb") ], exports.StateBindingInstructionRenderer);

exports.DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(t, s) {
        this.ep = t;
        this.j = s;
    }
    render(t, i, e) {
        const n = x(this.ep, e.ast, 8);
        const h = new StateDispatchBinding(t.container, n, i, e.from, this.j);
        t.addBinding(38963 === n.$kind ? s.applyBindingBehavior(h, n, t.container) : h);
    }
};

exports.DispatchBindingInstructionRenderer.inject = [ i.IExpressionParser, n ];

exports.DispatchBindingInstructionRenderer = c([ s.renderer("sd") ], exports.DispatchBindingInstructionRenderer);

function x(t, s, i) {
    if ("string" === typeof s) return t.parse(s, i);
    return s;
}

const b = [ exports.StateAttributePattern, exports.StateBindingCommand, exports.StateBindingInstructionRenderer, exports.DispatchAttributePattern, exports.DispatchBindingCommand, exports.DispatchBindingInstructionRenderer, exports.StateBindingBehavior, Store ];

const S = (s, i) => ({
    register: e => {
        e.register(t.Registration.instance(h, s), ...b, ...i.map(o.define));
    },
    init: (t, ...s) => S(t, s)
});

const v = S({}, []);

let B = class StateGetterBinding {
    constructor(t, s, i, e, n) {
        this.interceptor = this;
        this.isBound = false;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.locator = t;
        this.A = e;
        this.$get = n;
        this.target = s;
        this.key = i;
    }
    updateTarget(t) {
        const s = this.target;
        const i = this.key;
        const e = this.R++;
        const n = () => e === this.R - 1;
        this.C();
        if (l(t)) {
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
    $bind(t) {
        if (this.isBound) return;
        const s = this.A.getState();
        this.isBound = true;
        this.$scope = a(s, t);
        this.A.subscribe(this);
        this.updateTarget(this.v = this.$get(s));
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
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const e = this.$get(this.A.getState());
        if (e === this.v) return;
        this.v = e;
        this.updateTarget(e);
    }
    C() {
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            this.P.dispose?.();
            this.P.unsubscribe?.();
        }
        this.P = void 0;
    }
};

B = c([ i.connectable() ], B);

function y(t) {
    return function(i, e, n) {
        if ("function" === typeof i) throw new Error(`Invalid usage. @state can only be used on a field`);
        if ("undefined" !== typeof n?.value) throw new Error(`Invalid usage. @state can only be used on a field`);
        i = i.constructor;
        let h = s.CustomElement.getAnnotation(i, m);
        if (null == h) s.CustomElement.annotate(i, m, h = []);
        h.push(new w(t, e));
        h = s.CustomAttribute.getAnnotation(i, m);
        if (null == h) s.CustomElement.annotate(i, m, h = []);
        h.push(new I(t, e));
    };
}

const m = "dependencies";

let w = class HydratingLifecycleHooks {
    constructor(t, s) {
        this.$get = t;
        this.key = s;
    }
    register(i) {
        t.Registration.instance(s.ILifecycleHooks, this).register(i);
    }
    hydrating(t, s) {
        const i = s.container;
        s.addBinding(new B(i, t, this.key, i.get(n), this.$get));
    }
};

w = c([ s.lifecycleHooks() ], w);

let I = class CreatedLifecycleHooks {
    constructor(t, s) {
        this.$get = t;
        this.key = s;
    }
    register(i) {
        t.Registration.instance(s.ILifecycleHooks, this).register(i);
    }
    created(t, s) {
        const i = s.container;
        s.addBinding(new B(i, t, this.key, i.get(n), this.$get));
    }
};

I = c([ s.lifecycleHooks() ], I);

exports.ActionHandler = o;

exports.DispatchBindingInstruction = DispatchBindingInstruction;

exports.IActionHandler = e;

exports.IState = h;

exports.IStore = n;

exports.StateBinding = StateBinding;

exports.StateBindingInstruction = StateBindingInstruction;

exports.StateDefaultConfiguration = v;

exports.StateDispatchBinding = StateDispatchBinding;

exports.fromState = y;
//# sourceMappingURL=index.cjs.map
