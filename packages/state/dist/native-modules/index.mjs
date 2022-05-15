import { DI as t, Registration as s, optional as i, all as n, ILogger as e, camelCase as h } from "../../../kernel/dist/native-modules/index.mjs";

import { connectable as r, Scope as o, IExpressionParser as c, IObserverLocator as a } from "../../../runtime/dist/native-modules/index.mjs";

import { attributePattern as u, bindingCommand as l, renderer as f, AttrSyntax as d, IAttrMapper as p, applyBindingBehavior as b } from "../../../runtime-html/dist/native-modules/index.mjs";

const g = t.createInterface("IReducerAction");

const m = "__reducer__";

const S = Object.freeze(new class {
    constructor() {
        this.isType = t => "function" === typeof t && m in t;
    }
    define(t, i) {
        const n = "string" === typeof t ? [ t, i ] : [ t, t ];
        const e = n[1];
        function h(t, ...s) {
            return e(t, ...s);
        }
        h[m] = true;
        h.register = function(t) {
            s.instance(g, n).register(t);
        };
        return h;
    }
});

const v = t.createInterface("IStateContainer");

const w = t.createInterface("IState");

class StateContainer {
    constructor(t, s, i) {
        this.t = new Set;
        this.i = 0;
        this.h = [];
        this._state = null !== t && void 0 !== t ? t : new State;
        this.u = new Map(s);
        this.B = i;
    }
    static register(t) {
        s.singleton(v, this).register(t);
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
    C(t) {
        return this.u.get(t);
    }
    dispatch(t, ...s) {
        if (this.i > 0) {
            this.h.push({
                action: t,
                params: s
            });
            return;
        }
        this.i++;
        const i = (s, i) => {
            if (null == s) return;
            s = this.C(s);
            if (null == s) {
                if ("string" === typeof t) return;
                s = t;
            }
            let e;
            try {
                e = s(this._state, ...i);
            } catch (t) {
                this.i--;
                throw t;
            }
            if (e instanceof Promise) return e.then((t => {
                this.I(t);
                return n();
            })).then((() => {
                this.i--;
            }), (t => {
                this.i--;
                throw t;
            })); else {
                this.I(e);
                const t = n();
                if (t instanceof Promise) return t.then((() => {
                    this.i--;
                }), (t => {
                    this.i--;
                    throw t;
                })); else this.i--;
            }
        };
        const n = () => {
            if (this.h.length > 0) {
                const t = this.h.shift();
                return i(t.action, t.params);
            }
        };
        return i(t, s);
    }
}

StateContainer.inject = [ i(w), n(g), e ];

class State {}

function B(t, s, i, n) {
    var e = arguments.length, h = e < 3 ? s : null === n ? n = Object.getOwnPropertyDescriptor(s, i) : n, r;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) h = Reflect.decorate(t, s, i, n); else for (var o = t.length - 1; o >= 0; o--) if (r = t[o]) h = (e < 3 ? r(h) : e > 3 ? r(s, i, h) : r(s, i)) || h;
    return e > 3 && h && Object.defineProperty(s, i, h), h;
}

let I = class StateBinding {
    constructor(t, s, i, n, e, h) {
        this.interceptor = this;
        this.isBound = false;
        this.v = void 0;
        this.R = void 0;
        this.A = 0;
        this.locator = t;
        this.P = s;
        this.oL = i;
        this.expr = n;
        this.target = e;
        this.prop = h;
    }
    updateTarget(t) {
        const s = this.$;
        const i = this.target;
        const n = this.prop;
        const e = this.A++;
        this._();
        if (y(t)) {
            this.R = t.subscribe((t => {
                if (e === this.A - 1) s.setValue(t, 0, i, n);
            }));
            return;
        }
        if (t instanceof Promise) {
            void t.then((t => {
                if (e === this.A - 1) s.setValue(t, 0, i, n);
            }), (() => {}));
            return;
        }
        s.setValue(t, 0, i, n);
    }
    $bind(t, s) {
        if (this.isBound) return;
        this.isBound = true;
        this.$ = this.oL.getAccessor(this.target, this.prop);
        const i = this.P.getState();
        const n = {
            bindingContext: i,
            $state: i,
            $store: this.P
        };
        (this.$scope = o.fromOverride(n)).parentScope = s;
        this.P.subscribe(this);
        this.updateTarget(this.v = this.expr.evaluate(1, this.$scope, this.locator, null));
    }
    $unbind() {
        if (!this.isBound) return;
        this._();
        this.A++;
        this.isBound = false;
        this.$scope = void 0;
        this.P.unsubscribe(this);
    }
    handleStateChange(t) {
        const s = this.$scope;
        const i = s.overrideContext;
        s.bindingContext = i.bindingContext = i.$state = t;
        const n = this.expr.evaluate(1, s, this.locator, null);
        if (n !== this.v) {
            this.v = n;
            this.updateTarget(n);
        }
    }
    _() {
        if ("function" === typeof this.R) this.R(); else if (void 0 !== this.R) this.R.dispose();
        this.R = void 0;
    }
};

I = B([ r() ], I);

function y(t) {
    return t instanceof Object && "subscribe" in t;
}

let C = class StateDispatchActionBinding {
    constructor(t, s, i, n, e) {
        this.interceptor = this;
        this.isBound = false;
        this.locator = t;
        this.P = s;
        this.expr = i;
        this.target = n;
        this.prop = e;
    }
    callSource(t) {
        const s = this.$scope;
        s.overrideContext.$event = t;
        const i = this.expr.evaluate(1, s, this.locator, null);
        delete s.overrideContext.$event;
        void this.P.dispatch("event", {
            target: this.target,
            event: this.prop,
            value: i
        });
    }
    handleEvent(t) {
        this.interceptor.callSource(t);
    }
    $bind(t, s) {
        if (this.isBound) return;
        this.isBound = true;
        const i = this.P.getState();
        const n = {
            bindingContext: i,
            $state: i,
            $store: this.P
        };
        (this.$scope = o.fromOverride(n)).parentScope = s;
        this.target.addEventListener(this.prop, this);
    }
    $unbind() {
        if (!this.isBound) return;
        this.isBound = false;
        this.$scope = void 0;
        this.target.removeEventListener(this.prop, this);
    }
};

C = B([ r() ], C);

let R = class StateAttributePattern {
    "PART.state"(t, s, i) {
        return new d(t, s, i[0], "state");
    }
};

R = B([ u({
    pattern: "PART.state",
    symbols: "."
}) ], R);

let A = class DispatchAttributePattern {
    "PART.dispatch"(t, s, i) {
        return new d(t, s, i[0], "dispatch");
    }
};

A = B([ u({
    pattern: "PART.dispatch",
    symbols: "."
}) ], A);

let P = class StateBindingCommand {
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

P.inject = [ p ];

P = B([ l("state") ], P);

let $ = class DispatchBindingCommand {
    constructor(t) {
        this.m = t;
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

$.inject = [ p ];

$ = B([ l("dispatch") ], $);

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

let D = class StateBindingInstructionRenderer {
    constructor(t, s, i) {
        this.ep = t;
        this.oL = s;
        this.P = i;
    }
    render(t, s, i) {
        const n = new I(t.container, this.P, this.oL, j(this.ep, i.from, 4), s, i.to);
        t.addBinding(n);
    }
};

D.inject = [ c, a, v ];

D = B([ f("sb") ], D);

let _ = class DispatchBindingInstructionRenderer {
    constructor(t, s, i) {
        this.ep = t;
        this.oL = s;
        this.P = i;
    }
    render(t, s, i) {
        const n = j(this.ep, i.expr, 8);
        const e = new C(t.container, this.P, n, s, i.from);
        t.addBinding(38962 === n.$kind ? b(e, n, t.container) : e);
    }
};

_.inject = [ c, a, v ];

_ = B([ f("sd") ], _);

function j(t, s, i) {
    if ("string" === typeof s) return t.parse(s, i);
    return s;
}

const T = [ R, P, D, A, $, _, StateContainer ];

const O = (t, i) => ({
    register: n => n.register(...T, s.instance(w, t), ...i.map((t => S.isType(t) ? t : S.define(t.target, t.action)))),
    init: (t, ...s) => O(t, s)
});

const x = O({}, []);

export { S as Action, A as DispatchAttributePattern, $ as DispatchBindingCommand, DispatchBindingInstruction, _ as DispatchBindingInstructionRenderer, g as IReducerAction, w as IState, v as IStateContainer, x as StandardStateConfiguration, R as StateAttributePattern, I as StateBinding, P as StateBindingCommand, StateBindingInstruction, D as StateBindingInstructionRenderer, StateContainer, C as StateDispatchActionBinding };

