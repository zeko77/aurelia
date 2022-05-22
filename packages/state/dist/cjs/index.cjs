"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var s = require("@aurelia/runtime");

var i = require("@aurelia/runtime-html");

const e = t.DI.createInterface("IReducer");

const n = t.DI.createInterface("IStore");

const r = t.DI.createInterface("IState");

const h = "__reducer__";

const o = Object.freeze({
    define(s) {
        function i(t, i, ...e) {
            return s(t, i, ...e);
        }
        i[h] = true;
        i.register = function(i) {
            t.Registration.instance(e, s).register(i);
        };
        return i;
    },
    isType: t => "function" === typeof t && h in t
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
            if (t instanceof Promise) return t.then((t => e(t, s, ...null !== i && void 0 !== i ? i : [])));
            return e(t, s, ...null !== i && void 0 !== i ? i : []);
        }), t);
        const n = t => {
            if (this.h.length > 0) {
                i = this.h.shift();
                const s = e(t, i.type, i.params);
                if (s instanceof Promise) return s.then((t => n(t))); else return n(s);
            }
        };
        const r = e(this._state, t, s);
        if (r instanceof Promise) return r.then((t => {
            this.I(t);
            this.i--;
            return n(this._state);
        }), (t => {
            this.i--;
            throw t;
        })); else {
            this.I(r);
            this.i--;
            return n(this._state);
        }
    }
}

Store.inject = [ t.optional(r), t.all(e), t.ILogger ];

class State {}

function c(t, s, i, e) {
    var n = arguments.length, r = n < 3 ? s : null === e ? e = Object.getOwnPropertyDescriptor(s, i) : e, h;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(t, s, i, e); else for (var o = t.length - 1; o >= 0; o--) if (h = t[o]) r = (n < 3 ? h(r) : n > 3 ? h(s, i, r) : h(s, i)) || r;
    return n > 3 && r && Object.defineProperty(s, i, r), r;
}

function u(t, i) {
    const e = {
        bindingContext: t
    };
    const n = s.Scope.create(t, e, true);
    n.parentScope = i;
    return n;
}

const a = (t, s, i) => Reflect.defineProperty(t.prototype, s, i);

const {toView: l, oneTime: p} = s.BindingMode;

exports.StateBinding = class StateBinding {
    constructor(t, s, i, e, n, r, h) {
        this.interceptor = this;
        this.isBound = false;
        this.task = null;
        this.v = void 0;
        this.P = void 0;
        this.R = 0;
        this.persistentFlags = 0;
        this.mode = l;
        this.locator = t;
        this.taskQueue = s;
        this.A = i;
        this.oL = e;
        this.sourceExpression = n;
        this.target = r;
        this.targetProperty = h;
    }
    updateTarget(t, s) {
        const i = this.targetObserver;
        const e = this.target;
        const n = this.targetProperty;
        const r = this.R++;
        const h = () => r === this.R - 1;
        this._();
        if (d(t)) {
            this.P = t.subscribe((t => {
                if (h()) i.setValue(t, s, e, n);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (h()) i.setValue(t, s, e, n);
            }), (() => {}));
            return;
        }
        i.setValue(t, s, e, n);
    }
    $bind(t, s) {
        if (this.isBound) return;
        this.isBound = true;
        this.targetObserver = this.oL.getAccessor(this.target, this.targetProperty);
        this.$scope = u(this.A.getState(), s);
        this.A.subscribe(this);
        this.updateTarget(this.v = this.sourceExpression.evaluate(1, this.$scope, this.locator, this.mode > p ? this : null), 0);
    }
    $unbind() {
        var t;
        if (!this.isBound) return;
        this._();
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
        const e = 0 === (2 & i) && (4 & this.targetObserver.type) > 0;
        const n = this.obs;
        n.version++;
        t = this.sourceExpression.evaluate(i, this.$scope, this.locator, this.interceptor);
        n.clear();
        let r;
        if (e) {
            r = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(t, i);
                this.task = null;
            }), f);
            null === r || void 0 === r ? void 0 : r.cancel();
            r = null;
        } else this.interceptor.updateTarget(t, i);
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const e = this.sourceExpression.evaluate(1, s, this.locator, this.mode > p ? this : null);
        const n = (4 & this.targetObserver.type) > 0;
        if (e === this.v) return;
        this.v = e;
        let r = null;
        if (n) {
            r = this.task;
            this.task = this.taskQueue.queueTask((() => {
                this.interceptor.updateTarget(e, 1);
                this.task = null;
            }), f);
            null === r || void 0 === r ? void 0 : r.cancel();
        } else this.interceptor.updateTarget(this.v, 0);
    }
    _() {
        var t, s, i, e;
        if ("function" === typeof this.P) this.P(); else if (void 0 !== this.P) {
            null === (s = (t = this.P).dispose) || void 0 === s ? void 0 : s.call(t);
            null === (e = (i = this.P).unsubscribe) || void 0 === e ? void 0 : e.call(i);
        }
        this.P = void 0;
    }
};

exports.StateBinding = c([ s.connectable() ], exports.StateBinding);

function d(t) {
    return t instanceof Object && "subscribe" in t;
}

const f = {
    reusable: false,
    preempt: true
};

exports.StateBindingBehavior = class StateBindingBehavior extends s.BindingInterceptor {
    constructor(t, s, i) {
        super(s, i);
        this.A = t;
    }
    $bind(t, s) {
        const i = this.binding;
        const e = i instanceof exports.StateBinding ? s : u(this.A.getState(), s);
        i.$bind(t, e);
    }
};

exports.StateBindingBehavior.inject = [ n ];

exports.StateBindingBehavior = c([ s.bindingBehavior("state") ], exports.StateBindingBehavior);

[ "target", "targetProperty" ].forEach((t => {
    a(exports.StateBindingBehavior, t, {
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

exports.StateDispatchBinding = class StateDispatchBinding {
    constructor(t, s, i, e, n) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = t;
        this.A = s;
        this.expr = i;
        this.target = e;
        this.targetProperty = n;
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
        this.$scope = u(this.A.getState(), s);
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

exports.StateDispatchBinding = c([ s.connectable() ], exports.StateDispatchBinding);

exports.StateAttributePattern = class StateAttributePattern {
    "PART.state"(t, s, e) {
        return new i.AttrSyntax(t, s, e[0], "state");
    }
};

exports.StateAttributePattern = c([ i.attributePattern({
    pattern: "PART.state",
    symbols: "."
}) ], exports.StateAttributePattern);

exports.DispatchAttributePattern = class DispatchAttributePattern {
    "PART.dispatch"(t, s, e) {
        return new i.AttrSyntax(t, s, e[0], "dispatch");
    }
};

exports.DispatchAttributePattern = c([ i.attributePattern({
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
        var i;
        const e = s.attr;
        let n = e.target;
        let r = e.rawValue;
        if (null == s.bindable) n = null !== (i = this.m.map(s.node, n)) && void 0 !== i ? i : t.camelCase(n); else {
            if ("" === r && 1 === s.def.type) r = t.camelCase(n);
            n = s.bindable.property;
        }
        return new StateBindingInstruction(r, n);
    }
};

exports.StateBindingCommand.inject = [ i.IAttrMapper ];

exports.StateBindingCommand = c([ i.bindingCommand("state") ], exports.StateBindingCommand);

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

exports.DispatchBindingCommand = c([ i.bindingCommand("dispatch") ], exports.DispatchBindingCommand);

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

exports.StateBindingInstructionRenderer = class StateBindingInstructionRenderer {
    constructor(t, s, i, e) {
        this.ep = t;
        this.oL = s;
        this.j = i;
        this.p = e;
    }
    render(t, s, i) {
        const e = new exports.StateBinding(t.container, this.p.domWriteQueue, this.j, this.oL, x(this.ep, i.from, 4), s, i.to);
        t.addBinding(e);
    }
};

exports.StateBindingInstructionRenderer.inject = [ s.IExpressionParser, s.IObserverLocator, n, i.IPlatform ];

exports.StateBindingInstructionRenderer = c([ i.renderer("sb") ], exports.StateBindingInstructionRenderer);

exports.DispatchBindingInstructionRenderer = class DispatchBindingInstructionRenderer {
    constructor(t, s) {
        this.ep = t;
        this.j = s;
    }
    render(t, s, e) {
        const n = x(this.ep, e.expr, 8);
        const r = new exports.StateDispatchBinding(t.container, this.j, n, s, e.from);
        t.addBinding(38962 === n.$kind ? i.applyBindingBehavior(r, n, t.container) : r);
    }
};

exports.DispatchBindingInstructionRenderer.inject = [ s.IExpressionParser, n ];

exports.DispatchBindingInstructionRenderer = c([ i.renderer("sd") ], exports.DispatchBindingInstructionRenderer);

function x(t, s, i) {
    if ("string" === typeof s) return t.parse(s, i);
    return s;
}

const v = [ exports.StateAttributePattern, exports.StateBindingCommand, exports.StateBindingInstructionRenderer, exports.DispatchAttributePattern, exports.DispatchBindingCommand, exports.DispatchBindingInstructionRenderer, Store ];

const b = (s, i) => ({
    register: e => {
        e.register(...v, t.Registration.instance(r, s), exports.StateBindingBehavior, ...i.map(o.define));
    },
    init: (t, ...s) => b(t, s)
});

const g = b({}, []);

exports.Action = o;

exports.DispatchBindingInstruction = DispatchBindingInstruction;

exports.IReducer = e;

exports.IState = r;

exports.IStore = n;

exports.StateBindingInstruction = StateBindingInstruction;

exports.StateDefaultConfiguration = g;
//# sourceMappingURL=index.cjs.map
