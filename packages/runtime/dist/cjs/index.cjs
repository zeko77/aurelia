"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/metadata");

const s = Object.prototype.hasOwnProperty;

const r = Reflect.defineProperty;

const i = t => "function" === typeof t;

const n = t => "string" === typeof t;

function o(t, e, s) {
    r(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function u(t, e, r, i = false) {
    if (i || !s.call(t, e)) o(t, e, r);
}

const c = () => Object.create(null);

const h = e.Metadata.getOwn;

const a = e.Metadata.hasOwn;

const l = e.Metadata.define;

const f = t.Protocol.annotation.keyFor;

const d = t.Protocol.resource.keyFor;

const p = t.Protocol.resource.appendTo;

function v(...t) {
    return function(e) {
        const s = f("aliases");
        const r = h(s, e);
        if (void 0 === r) l(s, t, e); else r.push(...t);
    };
}

function g(e, s, r, i) {
    for (let n = 0, o = e.length; n < o; ++n) t.Registration.aliasTo(r, s.keyFrom(e[n])).register(i);
}

Object.freeze({});

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) if (void 0 !== e) this[t] = e; else for (const e in t) if (s.call(t, e)) this[e] = t[e];
    }
    static create(t, e) {
        return new BindingContext(t, e);
    }
    static get(t, e, s, r) {
        var i, n;
        if (null == t) throw new Error(`AUR0203:${t}`);
        let o = t.overrideContext;
        let u = t;
        if (s > 0) {
            while (s > 0) {
                s--;
                u = u.parentScope;
                if (null == (null === u || void 0 === u ? void 0 : u.overrideContext)) return;
            }
            o = u.overrideContext;
            return e in o ? o : o.bindingContext;
        }
        while (!(null === u || void 0 === u ? void 0 : u.isBoundary) && null != o && !(e in o) && !(o.bindingContext && e in o.bindingContext)) {
            u = null !== (i = u.parentScope) && void 0 !== i ? i : null;
            o = null !== (n = null === u || void 0 === u ? void 0 : u.overrideContext) && void 0 !== n ? n : null;
        }
        if (o) return e in o ? o : o.bindingContext;
        return t.bindingContext || t.overrideContext;
    }
}

class Scope {
    constructor(t, e, s, r) {
        this.parentScope = t;
        this.bindingContext = e;
        this.overrideContext = s;
        this.isBoundary = r;
    }
    static create(t, e, s) {
        return new Scope(null, t, null == e ? OverrideContext.create(t) : e, null !== s && void 0 !== s ? s : false);
    }
    static fromOverride(t) {
        if (null == t) throw new Error(`AUR0204:${t}`);
        return new Scope(null, t.bindingContext, t, false);
    }
    static fromParent(t, e) {
        if (null == t) throw new Error(`AUR0205:${t}`);
        return new Scope(t, e, OverrideContext.create(e), false);
    }
}

class OverrideContext {
    constructor(t) {
        this.bindingContext = t;
    }
    static create(t) {
        return new OverrideContext(t);
    }
}

const w = t.DI.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = c();
    }
    dispatchSignal(t, e) {
        const s = this.signals[t];
        if (void 0 === s) return;
        let r;
        for (r of s.keys()) r.handleChange(void 0, void 0, e);
    }
    addSignalListener(t, e) {
        const s = this.signals;
        const r = s[t];
        if (void 0 === r) s[t] = new Set([ e ]); else r.add(e);
    }
    removeSignalListener(t, e) {
        const s = this.signals[t];
        if (s) s.delete(e);
    }
}

exports.BindingBehaviorStrategy = void 0;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})(exports.BindingBehaviorStrategy || (exports.BindingBehaviorStrategy = {}));

function b(t) {
    return function(e) {
        return y.define(t, e);
    };
}

class BindingBehaviorDefinition {
    constructor(t, e, s, r, i) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = r;
        this.strategy = i;
    }
    static create(e, s) {
        let r;
        let i;
        if (n(e)) {
            r = e;
            i = {
                name: r
            };
        } else {
            r = e.name;
            i = e;
        }
        const o = Object.getPrototypeOf(s) === BindingInterceptor;
        return new BindingBehaviorDefinition(s, t.firstDefined(A(s, "name"), r), t.mergeArrays(A(s, "aliases"), i.aliases, s.aliases), y.keyFrom(r), t.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", i, s, (() => o ? 2 : 1)));
    }
    register(e) {
        const {Type: s, key: r, aliases: i, strategy: n} = this;
        switch (n) {
          case 1:
            t.Registration.singleton(r, s).register(e);
            break;

          case 2:
            t.Registration.instance(r, new BindingBehaviorFactory(e, s)).register(e);
            break;
        }
        t.Registration.aliasTo(r, s).register(e);
        g(i, y, r, e);
    }
}

class BindingBehaviorFactory {
    constructor(e, s) {
        this.ctn = e;
        this.Type = s;
        this.deps = t.DI.getDependencies(s);
    }
    construct(t, e) {
        const s = this.ctn;
        const r = this.deps;
        switch (r.length) {
          case 0:
            return new this.Type(t, e);

          case 1:
            return new this.Type(s.get(r[0]), t, e);

          case 2:
            return new this.Type(s.get(r[0]), s.get(r[1]), t, e);

          default:
            return new this.Type(...r.map((t => s.get(t))), t, e);
        }
    }
}

class BindingInterceptor {
    constructor(t, e) {
        this.binding = t;
        this.expr = e;
        this.interceptor = this;
        let s;
        while (t.interceptor !== this) {
            s = t.interceptor;
            t.interceptor = this;
            t = s;
        }
    }
    updateTarget(t, e) {
        this.binding.updateTarget(t, e);
    }
    updateSource(t, e) {
        this.binding.updateSource(t, e);
    }
    callSource(t) {
        return this.binding.callSource(t);
    }
    handleChange(t, e, s) {
        this.binding.handleChange(t, e, s);
    }
    handleCollectionChange(t, e) {
        this.binding.handleCollectionChange(t, e);
    }
    observe(t, e) {
        this.binding.observe(t, e);
    }
    observeCollection(t) {
        this.binding.observeCollection(t);
    }
    $bind(t, e) {
        this.binding.$bind(t, e);
    }
    $unbind(t) {
        this.binding.$unbind(t);
    }
}

const x = [ "isBound", "$scope", "obs", "sourceExpression", "locator", "oL" ];

x.forEach((t => {
    r(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const E = d("binding-behavior");

const A = (t, e) => h(f(e), t);

const y = Object.freeze({
    name: E,
    keyFrom(t) {
        return `${E}:${t}`;
    },
    isType(t) {
        return i(t) && a(E, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        l(E, s, s.Type);
        l(E, s, s);
        p(e, E);
        return s.Type;
    },
    getDefinition(t) {
        const e = h(E, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        l(f(e), s, t);
    },
    getAnnotation: A
});

function m(t) {
    return function(e) {
        return O.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, s, r) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = r;
    }
    static create(e, s) {
        let r;
        let i;
        if (n(e)) {
            r = e;
            i = {
                name: r
            };
        } else {
            r = e.name;
            i = e;
        }
        return new ValueConverterDefinition(s, t.firstDefined(S(s, "name"), r), t.mergeArrays(S(s, "aliases"), i.aliases, s.aliases), O.keyFrom(r));
    }
    register(e) {
        const {Type: s, key: r, aliases: i} = this;
        t.Registration.singleton(r, s).register(e);
        t.Registration.aliasTo(r, s).register(e);
        g(i, O, r, e);
    }
}

const U = d("value-converter");

const S = (t, e) => h(f(e), t);

const O = Object.freeze({
    name: U,
    keyFrom: t => `${U}:${t}`,
    isType(t) {
        return i(t) && a(U, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        l(U, s, s.Type);
        l(U, s, s);
        p(e, U);
        return s.Type;
    },
    getDefinition(t) {
        const e = h(U, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        l(f(e), s, t);
    },
    getAnnotation: S
});

exports.ExpressionKind = void 0;

(function(t) {
    t[t["CallsFunction"] = 128] = "CallsFunction";
    t[t["HasAncestor"] = 256] = "HasAncestor";
    t[t["IsPrimary"] = 512] = "IsPrimary";
    t[t["IsLeftHandSide"] = 1024] = "IsLeftHandSide";
    t[t["HasBind"] = 2048] = "HasBind";
    t[t["HasUnbind"] = 4096] = "HasUnbind";
    t[t["IsAssignable"] = 8192] = "IsAssignable";
    t[t["IsLiteral"] = 16384] = "IsLiteral";
    t[t["IsResource"] = 32768] = "IsResource";
    t[t["IsForDeclaration"] = 65536] = "IsForDeclaration";
    t[t["Type"] = 31] = "Type";
    t[t["AccessThis"] = 1793] = "AccessThis";
    t[t["AccessScope"] = 10082] = "AccessScope";
    t[t["ArrayLiteral"] = 17955] = "ArrayLiteral";
    t[t["ObjectLiteral"] = 17956] = "ObjectLiteral";
    t[t["PrimitiveLiteral"] = 17925] = "PrimitiveLiteral";
    t[t["Template"] = 17958] = "Template";
    t[t["Unary"] = 39] = "Unary";
    t[t["CallScope"] = 1448] = "CallScope";
    t[t["CallMember"] = 1161] = "CallMember";
    t[t["CallFunction"] = 1162] = "CallFunction";
    t[t["AccessMember"] = 9323] = "AccessMember";
    t[t["AccessKeyed"] = 9324] = "AccessKeyed";
    t[t["TaggedTemplate"] = 1197] = "TaggedTemplate";
    t[t["Binary"] = 46] = "Binary";
    t[t["Conditional"] = 63] = "Conditional";
    t[t["Assign"] = 8208] = "Assign";
    t[t["ValueConverter"] = 36913] = "ValueConverter";
    t[t["BindingBehavior"] = 38962] = "BindingBehavior";
    t[t["HtmlLiteral"] = 51] = "HtmlLiteral";
    t[t["ArrayBindingPattern"] = 65556] = "ArrayBindingPattern";
    t[t["ObjectBindingPattern"] = 65557] = "ObjectBindingPattern";
    t[t["BindingIdentifier"] = 65558] = "BindingIdentifier";
    t[t["ForOfStatement"] = 6199] = "ForOfStatement";
    t[t["Interpolation"] = 24] = "Interpolation";
    t[t["ArrayDestructuring"] = 90137] = "ArrayDestructuring";
    t[t["ObjectDestructuring"] = 106521] = "ObjectDestructuring";
    t[t["DestructuringAssignmentLeaf"] = 139289] = "DestructuringAssignmentLeaf";
})(exports.ExpressionKind || (exports.ExpressionKind = {}));

class Unparser {
    constructor() {
        this.text = "";
    }
    static unparse(t) {
        const e = new Unparser;
        t.accept(e);
        return e.text;
    }
    visitAccessMember(t) {
        t.object.accept(this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        t.object.accept(this);
        this.text += `${t.optional ? "?." : ""}[`;
        t.key.accept(this);
        this.text += "]";
    }
    visitAccessThis(t) {
        if (0 === t.ancestor) {
            this.text += "$this";
            return;
        }
        this.text += "$parent";
        let e = t.ancestor - 1;
        while (e--) this.text += ".$parent";
    }
    visitAccessScope(t) {
        let e = t.ancestor;
        while (e--) this.text += "$parent.";
        this.text += t.name;
    }
    visitArrayLiteral(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            e[t].accept(this);
        }
        this.text += "]";
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            s[t].accept(this);
        }
        this.text += "}";
    }
    visitPrimitiveLiteral(t) {
        this.text += "(";
        if (n(t.value)) {
            const e = t.value.replace(/'/g, "\\'");
            this.text += `'${e}'`;
        } else this.text += `${t.value}`;
        this.text += ")";
    }
    visitCallFunction(t) {
        this.text += "(";
        t.func.accept(this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        t.object.accept(this);
        this.text += `${t.optionalMember ? "?." : ""}.${t.name}${t.optionalCall ? "?." : ""}`;
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallScope(t) {
        this.text += "(";
        let e = t.ancestor;
        while (e--) this.text += "$parent.";
        this.text += `${t.name}${t.optional ? "?." : ""}`;
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            s[t].accept(this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        t.func.accept(this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            s[t].accept(this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        t.expression.accept(this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        t.left.accept(this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        t.right.accept(this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        t.condition.accept(this);
        this.text += "?";
        t.yes.accept(this);
        this.text += ":";
        t.no.accept(this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        t.target.accept(this);
        this.text += "=";
        t.value.accept(this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        t.expression.accept(this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            e[t].accept(this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        t.expression.accept(this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            e[t].accept(this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            e[t].accept(this);
        }
        this.text += "]";
    }
    visitObjectBindingPattern(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            s[t].accept(this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitHtmlLiteral(t) {
        throw new Error("visitHtmlLiteral");
    }
    visitForOfStatement(t) {
        t.declaration.accept(this);
        this.text += " of ";
        t.iterable.accept(this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            s[t].accept(this);
            this.text += e[t + 1];
        }
        this.text += "}";
    }
    visitDestructuringAssignmentExpression(t) {
        const e = t.$kind;
        const s = 106521 === e;
        this.text += s ? "{" : "[";
        const r = t.list;
        const i = r.length;
        let n;
        let o;
        for (n = 0; n < i; n++) {
            o = r[n];
            switch (o.$kind) {
              case 139289:
                o.accept(this);
                break;

              case 90137:
              case 106521:
                {
                    const t = o.source;
                    if (t) {
                        t.accept(this);
                        this.text += ":";
                    }
                    o.accept(this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        t.source.accept(this);
        this.text += ":";
        t.target.accept(this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            e.accept(this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        t.accept(this);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            t[e].accept(this);
        }
        this.text += ")";
    }
}

class CustomExpression {
    constructor(t) {
        this.value = t;
    }
    evaluate(t, e, s, r) {
        return this.value;
    }
}

class BindingBehaviorExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
        this.behaviorKey = y.keyFrom(e);
    }
    get $kind() {
        return 38962;
    }
    get hasBind() {
        return true;
    }
    get hasUnbind() {
        return true;
    }
    evaluate(t, e, s, r) {
        return this.expression.evaluate(t, e, s, r);
    }
    assign(t, e, s, r) {
        return this.expression.assign(t, e, s, r);
    }
    bind(t, e, s) {
        if (this.expression.hasBind) this.expression.bind(t, e, s);
        const r = s.locator.get(this.behaviorKey);
        if (null == r) throw new Error(`AUR0101:${this.name}`);
        if (!(r instanceof BindingBehaviorFactory)) if (void 0 === s[this.behaviorKey]) {
            s[this.behaviorKey] = r;
            r.bind(t, e, s, ...this.args.map((r => r.evaluate(t, e, s.locator, null))));
        } else throw new Error(`AUR0102:${this.name}`);
    }
    unbind(t, e, s) {
        const r = this.behaviorKey;
        const n = s;
        if (void 0 !== n[r]) {
            if (i(n[r].unbind)) n[r].unbind(t, e, s);
            n[r] = void 0;
        }
        if (this.expression.hasUnbind) this.expression.unbind(t, e, s);
    }
    accept(t) {
        return t.visitBindingBehavior(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ValueConverterExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
        this.converterKey = O.keyFrom(e);
    }
    get $kind() {
        return 36913;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return true;
    }
    evaluate(t, e, s, r) {
        const i = s.get(this.converterKey);
        if (null == i) throw new Error(`AUR0103:${this.name}`);
        if (null !== r && "handleChange" in r) {
            const t = i.signals;
            if (null != t) {
                const e = s.get(w);
                for (let s = 0, i = t.length; s < i; ++s) e.addSignalListener(t[s], r);
            }
        }
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s, r), ...this.args.map((i => i.evaluate(t, e, s, r))));
        return this.expression.evaluate(t, e, s, r);
    }
    assign(t, e, s, r) {
        const i = s.get(this.converterKey);
        if (null == i) throw new Error(`AUR0104:${this.name}`);
        if ("fromView" in i) r = i.fromView(r, ...this.args.map((r => r.evaluate(t, e, s, null))));
        return this.expression.assign(t, e, s, r);
    }
    unbind(t, e, s) {
        const r = s.locator.get(this.converterKey);
        if (void 0 === r.signals) return;
        const i = s.locator.get(w);
        for (let t = 0; t < r.signals.length; ++t) i.removeSignalListener(r.signals[t], s);
    }
    accept(t) {
        return t.visitValueConverter(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class AssignExpression {
    constructor(t, e) {
        this.target = t;
        this.value = e;
    }
    get $kind() {
        return 8208;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return this.target.assign(t, e, s, this.value.evaluate(t, e, s, r));
    }
    assign(t, e, s, r) {
        this.value.assign(t, e, s, r);
        return this.target.assign(t, e, s, r);
    }
    accept(t) {
        return t.visitAssign(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ConditionalExpression {
    constructor(t, e, s) {
        this.condition = t;
        this.yes = e;
        this.no = s;
    }
    get $kind() {
        return 63;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return this.condition.evaluate(t, e, s, r) ? this.yes.evaluate(t, e, s, r) : this.no.evaluate(t, e, s, r);
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitConditional(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class AccessThisExpression {
    constructor(t = 0) {
        this.ancestor = t;
    }
    get $kind() {
        return 1793;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        var i;
        let n = e.overrideContext;
        let o = e;
        let u = this.ancestor;
        while (u-- && n) {
            o = o.parentScope;
            n = null !== (i = null === o || void 0 === o ? void 0 : o.overrideContext) && void 0 !== i ? i : null;
        }
        return u < 1 && n ? n.bindingContext : void 0;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitAccessThis(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

AccessThisExpression.$this = new AccessThisExpression(0);

AccessThisExpression.$parent = new AccessThisExpression(1);

class AccessScopeExpression {
    constructor(t, e = 0) {
        this.name = t;
        this.ancestor = e;
    }
    get $kind() {
        return 10082;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const i = BindingContext.get(e, this.name, this.ancestor, t);
        if (null !== r) r.observe(i, this.name);
        const n = i[this.name];
        if (null == n && "$host" === this.name) throw new Error(`AUR0105`);
        if (1 & t) return n;
        return null == n ? "" : n;
    }
    assign(t, e, s, r) {
        var i;
        if ("$host" === this.name) throw new Error(`AUR0106`);
        const n = BindingContext.get(e, this.name, this.ancestor, t);
        if (n instanceof Object) if (void 0 !== (null === (i = n.$observers) || void 0 === i ? void 0 : i[this.name])) {
            n.$observers[this.name].setValue(r, t);
            return r;
        } else return n[this.name] = r;
        return;
    }
    accept(t) {
        return t.visitAccessScope(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class AccessMemberExpression {
    constructor(t, e, s = false) {
        this.object = t;
        this.name = e;
        this.optional = s;
    }
    get $kind() {
        return 9323;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const i = this.object.evaluate(t, e, s, (32 & t) > 0 ? null : r);
        if (1 & t) {
            if (null == i) return i;
            if (null !== r) r.observe(i, this.name);
            return i[this.name];
        }
        if (null !== r && i instanceof Object) r.observe(i, this.name);
        return i ? i[this.name] : "";
    }
    assign(t, e, s, r) {
        const i = this.object.evaluate(t, e, s, null);
        if (i instanceof Object) if (void 0 !== i.$observers && void 0 !== i.$observers[this.name]) i.$observers[this.name].setValue(r, t); else i[this.name] = r; else this.object.assign(t, e, s, {
            [this.name]: r
        });
        return r;
    }
    accept(t) {
        return t.visitAccessMember(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class AccessKeyedExpression {
    constructor(t, e, s = false) {
        this.object = t;
        this.key = e;
        this.optional = s;
    }
    get $kind() {
        return 9324;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const i = this.object.evaluate(t, e, s, (32 & t) > 0 ? null : r);
        if (i instanceof Object) {
            const n = this.key.evaluate(t, e, s, (32 & t) > 0 ? null : r);
            if (null !== r) r.observe(i, n);
            return i[n];
        }
        return;
    }
    assign(t, e, s, r) {
        const i = this.object.evaluate(t, e, s, null);
        const n = this.key.evaluate(t, e, s, null);
        return i[n] = r;
    }
    accept(t) {
        return t.visitAccessKeyed(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class CallScopeExpression {
    constructor(t, e, s = 0, r = false) {
        this.name = t;
        this.args = e;
        this.ancestor = s;
        this.optional = r;
    }
    get $kind() {
        return 1448;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const i = this.args.map((i => i.evaluate(t, e, s, r)));
        const n = BindingContext.get(e, this.name, this.ancestor, t);
        const o = $(t, n, this.name);
        if (o) return o.apply(n, i);
        return;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitCallScope(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class CallMemberExpression {
    constructor(t, e, s, r = false, i = false) {
        this.object = t;
        this.name = e;
        this.args = s;
        this.optionalMember = r;
        this.optionalCall = i;
    }
    get $kind() {
        return 1161;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const i = this.object.evaluate(t, e, s, (32 & t) > 0 ? null : r);
        const n = this.args.map((i => i.evaluate(t, e, s, r)));
        const o = $(t, i, this.name);
        if (o) return o.apply(i, n);
        return;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitCallMember(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class CallFunctionExpression {
    constructor(t, e, s = false) {
        this.func = t;
        this.args = e;
        this.optional = s;
    }
    get $kind() {
        return 1162;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const n = this.func.evaluate(t, e, s, r);
        if (i(n)) return n(...this.args.map((i => i.evaluate(t, e, s, r))));
        if (!(8 & t) && null == n) return;
        throw new Error(`AUR0107`);
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitCallFunction(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class BinaryExpression {
    constructor(t, e, s) {
        this.operation = t;
        this.left = e;
        this.right = s;
    }
    get $kind() {
        return 46;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(e, s, r, n) {
        var o;
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(e, s, r, n) && this.right.evaluate(e, s, r, n);

          case "||":
            return this.left.evaluate(e, s, r, n) || this.right.evaluate(e, s, r, n);

          case "??":
            return null !== (o = this.left.evaluate(e, s, r, n)) && void 0 !== o ? o : this.right.evaluate(e, s, r, n);

          case "==":
            return this.left.evaluate(e, s, r, n) == this.right.evaluate(e, s, r, n);

          case "===":
            return this.left.evaluate(e, s, r, n) === this.right.evaluate(e, s, r, n);

          case "!=":
            return this.left.evaluate(e, s, r, n) != this.right.evaluate(e, s, r, n);

          case "!==":
            return this.left.evaluate(e, s, r, n) !== this.right.evaluate(e, s, r, n);

          case "instanceof":
            {
                const t = this.right.evaluate(e, s, r, n);
                if (i(t)) return this.left.evaluate(e, s, r, n) instanceof t;
                return false;
            }

          case "in":
            {
                const t = this.right.evaluate(e, s, r, n);
                if (t instanceof Object) return this.left.evaluate(e, s, r, n) in t;
                return false;
            }

          case "+":
            {
                const i = this.left.evaluate(e, s, r, n);
                const o = this.right.evaluate(e, s, r, n);
                if ((1 & e) > 0) return i + o;
                if (!i || !o) {
                    if (t.isNumberOrBigInt(i) || t.isNumberOrBigInt(o)) return (i || 0) + (o || 0);
                    if (t.isStringOrDate(i) || t.isStringOrDate(o)) return (i || "") + (o || "");
                }
                return i + o;
            }

          case "-":
            return this.left.evaluate(e, s, r, n) - this.right.evaluate(e, s, r, n);

          case "*":
            return this.left.evaluate(e, s, r, n) * this.right.evaluate(e, s, r, n);

          case "/":
            return this.left.evaluate(e, s, r, n) / this.right.evaluate(e, s, r, n);

          case "%":
            return this.left.evaluate(e, s, r, n) % this.right.evaluate(e, s, r, n);

          case "<":
            return this.left.evaluate(e, s, r, n) < this.right.evaluate(e, s, r, n);

          case ">":
            return this.left.evaluate(e, s, r, n) > this.right.evaluate(e, s, r, n);

          case "<=":
            return this.left.evaluate(e, s, r, n) <= this.right.evaluate(e, s, r, n);

          case ">=":
            return this.left.evaluate(e, s, r, n) >= this.right.evaluate(e, s, r, n);

          default:
            throw new Error(`AUR0108:${this.operation}`);
        }
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitBinary(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class UnaryExpression {
    constructor(t, e) {
        this.operation = t;
        this.expression = e;
    }
    get $kind() {
        return 39;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        switch (this.operation) {
          case "void":
            return void this.expression.evaluate(t, e, s, r);

          case "typeof":
            return typeof this.expression.evaluate(1 | t, e, s, r);

          case "!":
            return !this.expression.evaluate(t, e, s, r);

          case "-":
            return -this.expression.evaluate(t, e, s, r);

          case "+":
            return +this.expression.evaluate(t, e, s, r);

          default:
            throw new Error(`AUR0109:${this.operation}`);
        }
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitUnary(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class PrimitiveLiteralExpression {
    constructor(t) {
        this.value = t;
    }
    get $kind() {
        return 17925;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return this.value;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitPrimitiveLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

PrimitiveLiteralExpression.$undefined = new PrimitiveLiteralExpression(void 0);

PrimitiveLiteralExpression.$null = new PrimitiveLiteralExpression(null);

PrimitiveLiteralExpression.$true = new PrimitiveLiteralExpression(true);

PrimitiveLiteralExpression.$false = new PrimitiveLiteralExpression(false);

PrimitiveLiteralExpression.$empty = new PrimitiveLiteralExpression("");

class HtmlLiteralExpression {
    constructor(t) {
        this.parts = t;
    }
    get $kind() {
        return 51;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        let i = "";
        for (let n = 0; n < this.parts.length; ++n) {
            const o = this.parts[n].evaluate(t, e, s, r);
            if (null == o) continue;
            i += o;
        }
        return i;
    }
    assign(t, e, s, r, i) {
        return;
    }
    accept(t) {
        return t.visitHtmlLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ArrayLiteralExpression {
    constructor(t) {
        this.elements = t;
    }
    get $kind() {
        return 17955;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return this.elements.map((i => i.evaluate(t, e, s, r)));
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitArrayLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(t.emptyArray);

class ObjectLiteralExpression {
    constructor(t, e) {
        this.keys = t;
        this.values = e;
    }
    get $kind() {
        return 17956;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const i = {};
        for (let n = 0; n < this.keys.length; ++n) i[this.keys[n]] = this.values[n].evaluate(t, e, s, r);
        return i;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitObjectLiteral(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(t.emptyArray, t.emptyArray);

class TemplateExpression {
    constructor(e, s = t.emptyArray) {
        this.cooked = e;
        this.expressions = s;
    }
    get $kind() {
        return 17958;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        let i = this.cooked[0];
        for (let n = 0; n < this.expressions.length; ++n) {
            i += String(this.expressions[n].evaluate(t, e, s, r));
            i += this.cooked[n + 1];
        }
        return i;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitTemplate(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

TemplateExpression.$empty = new TemplateExpression([ "" ]);

class TaggedTemplateExpression {
    constructor(e, s, r, i = t.emptyArray) {
        this.cooked = e;
        this.func = r;
        this.expressions = i;
        e.raw = s;
    }
    get $kind() {
        return 1197;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        const n = this.expressions.map((i => i.evaluate(t, e, s, r)));
        const o = this.func.evaluate(t, e, s, r);
        if (!i(o)) throw new Error(`AUR0110`);
        return o(this.cooked, ...n);
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitTaggedTemplate(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ArrayBindingPattern {
    constructor(t) {
        this.elements = t;
    }
    get $kind() {
        return 65556;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitArrayBindingPattern(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ObjectBindingPattern {
    constructor(t, e) {
        this.keys = t;
        this.values = e;
    }
    get $kind() {
        return 65557;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitObjectBindingPattern(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class BindingIdentifier {
    constructor(t) {
        this.name = t;
    }
    get $kind() {
        return 65558;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return this.name;
    }
    accept(t) {
        return t.visitBindingIdentifier(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

const C = Object.prototype.toString;

class ForOfStatement {
    constructor(t, e) {
        this.declaration = t;
        this.iterable = e;
    }
    get $kind() {
        return 6199;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return this.iterable.evaluate(t, e, s, r);
    }
    assign(t, e, s, r) {
        return;
    }
    count(t, e) {
        switch (C.call(e)) {
          case "[object Array]":
            return e.length;

          case "[object Map]":
            return e.size;

          case "[object Set]":
            return e.size;

          case "[object Number]":
            return e;

          case "[object Null]":
            return 0;

          case "[object Undefined]":
            return 0;

          default:
            throw new Error(`Cannot count ${C.call(e)}`);
        }
    }
    iterate(t, e, s) {
        switch (C.call(e)) {
          case "[object Array]":
            return k(e, s);

          case "[object Map]":
            return B(e, s);

          case "[object Set]":
            return L(e, s);

          case "[object Number]":
            return R(e, s);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${C.call(e)}`);
        }
    }
    bind(t, e, s) {
        if (this.iterable.hasBind) this.iterable.bind(t, e, s);
    }
    unbind(t, e, s) {
        if (this.iterable.hasUnbind) this.iterable.unbind(t, e, s);
    }
    accept(t) {
        return t.visitForOfStatement(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class Interpolation {
    constructor(e, s = t.emptyArray) {
        this.parts = e;
        this.expressions = s;
        this.isMulti = s.length > 1;
        this.firstExpression = s[0];
    }
    get $kind() {
        return 24;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        if (this.isMulti) {
            let i = this.parts[0];
            for (let n = 0; n < this.expressions.length; ++n) {
                i += String(this.expressions[n].evaluate(t, e, s, r));
                i += this.parts[n + 1];
            }
            return i;
        } else return `${this.parts[0]}${this.firstExpression.evaluate(t, e, s, r)}${this.parts[1]}`;
    }
    assign(t, e, s, r) {
        return;
    }
    accept(t) {
        return t.visitInterpolation(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class DestructuringAssignmentExpression {
    constructor(t, e, s, r) {
        this.$kind = t;
        this.list = e;
        this.source = s;
        this.initializer = r;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s, r) {
        return;
    }
    assign(t, e, s, r) {
        var i;
        const n = this.list;
        const o = n.length;
        let u;
        let c;
        for (u = 0; u < o; u++) {
            c = n[u];
            switch (c.$kind) {
              case 139289:
                c.assign(t, e, s, r);
                break;

              case 90137:
              case 106521:
                {
                    if ("object" !== typeof r || null === r) throw new Error(`AUR0112`);
                    let n = c.source.evaluate(t, Scope.create(r), s, null);
                    if (void 0 === n) n = null === (i = c.initializer) || void 0 === i ? void 0 : i.evaluate(t, e, s, null);
                    c.assign(t, e, s, n);
                    break;
                }
            }
        }
    }
    accept(t) {
        return t.visitDestructuringAssignmentExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class DestructuringAssignmentSingleExpression {
    constructor(t, e, s) {
        this.target = t;
        this.source = e;
        this.initializer = s;
    }
    get $kind() {
        return 139289;
    }
    evaluate(t, e, s, r) {
        return;
    }
    assign(t, e, s, r) {
        var i;
        if (null == r) return;
        if ("object" !== typeof r) throw new Error(`AUR0112`);
        let n = this.source.evaluate(t, Scope.create(r), s, null);
        if (void 0 === n) n = null === (i = this.initializer) || void 0 === i ? void 0 : i.evaluate(t, e, s, null);
        this.target.assign(t, e, s, n);
    }
    accept(t) {
        return t.visitDestructuringAssignmentSingleExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class DestructuringAssignmentRestExpression {
    constructor(t, e) {
        this.target = t;
        this.indexOrProperties = e;
    }
    get $kind() {
        return 139289;
    }
    evaluate(t, e, s, r) {
        return;
    }
    assign(e, s, r, i) {
        if (null == i) return;
        if ("object" !== typeof i) throw new Error(`AUR0112`);
        const n = this.indexOrProperties;
        let o;
        if (t.isArrayIndex(n)) {
            if (!Array.isArray(i)) throw new Error(`AUR0112`);
            o = i.slice(n);
        } else o = Object.entries(i).reduce(((t, [e, s]) => {
            if (!n.includes(e)) t[e] = s;
            return t;
        }), {});
        this.target.assign(e, s, r, o);
    }
    accept(t) {
        return t.visitDestructuringAssignmentRestExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

function $(t, e, s) {
    const r = null == e ? null : e[s];
    if (i(r)) return r;
    if (!(8 & t) && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function k(t, e) {
    for (let s = 0, r = t.length; s < r; ++s) e(t, s, t[s]);
}

function B(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.entries()) s[++r] = e;
    k(s, e);
}

function L(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.keys()) s[++r] = e;
    k(s, e);
}

function R(t, e) {
    const s = Array(t);
    for (let e = 0; e < t; ++e) s[e] = e;
    k(s, e);
}

const P = t.DI.createInterface("ICoercionConfiguration");

exports.BindingMode = void 0;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(exports.BindingMode || (exports.BindingMode = {}));

exports.LifecycleFlags = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["persistentBindingFlags"] = 97] = "persistentBindingFlags";
    t[t["observeLeafPropertiesOnly"] = 32] = "observeLeafPropertiesOnly";
    t[t["noFlush"] = 64] = "noFlush";
    t[t["bindingStrategy"] = 1] = "bindingStrategy";
    t[t["isStrictBindingStrategy"] = 1] = "isStrictBindingStrategy";
    t[t["fromBind"] = 2] = "fromBind";
    t[t["fromUnbind"] = 4] = "fromUnbind";
    t[t["mustEvaluate"] = 8] = "mustEvaluate";
    t[t["dispose"] = 16] = "dispose";
})(exports.LifecycleFlags || (exports.LifecycleFlags = {}));

var T;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(T || (T = {}));

exports.DelegationStrategy = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(exports.DelegationStrategy || (exports.DelegationStrategy = {}));

exports.CollectionKind = void 0;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(exports.CollectionKind || (exports.CollectionKind = {}));

exports.AccessorType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(exports.AccessorType || (exports.AccessorType = {}));

function j(t, e) {
    const {length: s} = t;
    const r = Array(s);
    let i = 0;
    while (i < s) {
        r[i] = t[i];
        ++i;
    }
    if (void 0 !== e) r.deletedItems = e.slice(0); else if (void 0 !== t.deletedItems) r.deletedItems = t.deletedItems.slice(0); else r.deletedItems = [];
    r.isIndexMap = true;
    return r;
}

function I(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function M(t) {
    const e = t.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function D(t) {
    return t instanceof Array && true === t.isIndexMap;
}

function F(t) {
    return null == t ? V : V(t);
}

function V(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: N
    });
    u(e, "subscribe", K);
    u(e, "unsubscribe", q);
}

class SubscriberRecord {
    constructor() {
        this.sf = 0;
        this.count = 0;
    }
    add(t) {
        if (this.has(t)) return false;
        const e = this.sf;
        if (0 === (1 & e)) {
            this.s0 = t;
            this.sf |= 1;
        } else if (0 === (2 & e)) {
            this.s1 = t;
            this.sf |= 2;
        } else if (0 === (4 & e)) {
            this.s2 = t;
            this.sf |= 4;
        } else if (0 === (8 & e)) {
            this.sr = [ t ];
            this.sf |= 8;
        } else this.sr.push(t);
        ++this.count;
        return true;
    }
    has(t) {
        const e = this.sf;
        if ((1 & e) > 0 && this.s0 === t) return true;
        if ((2 & e) > 0 && this.s1 === t) return true;
        if ((4 & e) > 0 && this.s2 === t) return true;
        if ((8 & e) > 0) {
            const e = this.sr;
            const s = e.length;
            let r = 0;
            for (;r < s; ++r) if (e[r] === t) return true;
        }
        return false;
    }
    any() {
        return 0 !== this.sf;
    }
    remove(t) {
        const e = this.sf;
        if ((1 & e) > 0 && this.s0 === t) {
            this.s0 = void 0;
            this.sf = 1 ^ (1 | this.sf);
            --this.count;
            return true;
        } else if ((2 & e) > 0 && this.s1 === t) {
            this.s1 = void 0;
            this.sf = 2 ^ (2 | this.sf);
            --this.count;
            return true;
        } else if ((4 & e) > 0 && this.s2 === t) {
            this.s2 = void 0;
            this.sf = 4 ^ (4 | this.sf);
            --this.count;
            return true;
        } else if ((8 & e) > 0) {
            const e = this.sr;
            const s = e.length;
            let r = 0;
            for (;r < s; ++r) if (e[r] === t) {
                e.splice(r, 1);
                if (1 === s) this.sf = 8 ^ (8 | this.sf);
                --this.count;
                return true;
            }
        }
        return false;
    }
    notify(t, e, s) {
        const r = this.s0;
        const i = this.s1;
        const n = this.s2;
        let o = this.sr;
        if (void 0 !== o) o = o.slice();
        if (void 0 !== r) r.handleChange(t, e, s);
        if (void 0 !== i) i.handleChange(t, e, s);
        if (void 0 !== n) n.handleChange(t, e, s);
        if (void 0 !== o) {
            const r = o.length;
            let i;
            let n = 0;
            for (;n < r; ++n) {
                i = o[n];
                if (void 0 !== i) i.handleChange(t, e, s);
            }
        }
    }
    notifyCollection(t, e) {
        const s = this.s0;
        const r = this.s1;
        const i = this.s2;
        let n = this.sr;
        if (void 0 !== n) n = n.slice();
        if (void 0 !== s) s.handleCollectionChange(t, e);
        if (void 0 !== r) r.handleCollectionChange(t, e);
        if (void 0 !== i) i.handleCollectionChange(t, e);
        if (void 0 !== n) {
            const s = n.length;
            let r;
            let i = 0;
            for (;i < s; ++i) {
                r = n[i];
                if (void 0 !== r) r.handleCollectionChange(t, e);
            }
        }
    }
}

function N() {
    return o(this, "subs", new SubscriberRecord);
}

function K(t) {
    return this.subs.add(t);
}

function q(t) {
    return this.subs.remove(t);
}

function H(t) {
    return null == t ? Q : Q(t);
}

function Q(t) {
    const e = t.prototype;
    r(e, "queue", {
        get: _
    });
}

class FlushQueue {
    constructor() {
        this.t = false;
        this.i = new Set;
    }
    get count() {
        return this.i.size;
    }
    add(t) {
        this.i.add(t);
        if (this.t) return;
        this.t = true;
        try {
            this.i.forEach(z);
        } finally {
            this.t = false;
        }
    }
    clear() {
        this.i.clear();
        this.t = false;
    }
}

FlushQueue.instance = new FlushQueue;

function _() {
    return FlushQueue.instance;
}

function z(t, e, s) {
    s.delete(t);
    t.flush();
}

class CollectionLengthObserver {
    constructor(t) {
        this.owner = t;
        this.type = 18;
        this.f = 0;
        this.v = this.u = (this.o = t.collection).length;
    }
    getValue() {
        return this.o.length;
    }
    setValue(e, s) {
        const r = this.v;
        if (e !== r && t.isArrayIndex(e)) {
            if (0 === (64 & s)) this.o.length = e;
            this.v = e;
            this.u = r;
            this.f = s;
            this.queue.add(this);
        }
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.length;
        if ((this.v = r) !== s) {
            this.u = s;
            this.f = e;
            this.queue.add(this);
        }
    }
    flush() {
        J = this.u;
        this.u = this.v;
        this.subs.notify(this.v, J, this.f);
    }
}

class CollectionSizeObserver {
    constructor(t) {
        this.owner = t;
        this.f = 0;
        this.v = this.u = (this.o = t.collection).size;
        this.type = this.o instanceof Map ? 66 : 34;
    }
    getValue() {
        return this.o.size;
    }
    setValue() {
        throw new Error(`AUR02`);
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.size;
        if ((this.v = r) !== s) {
            this.u = s;
            this.f = e;
            this.queue.add(this);
        }
    }
    flush() {
        J = this.u;
        this.u = this.v;
        this.subs.notify(this.v, J, this.f);
    }
}

function W(t) {
    const e = t.prototype;
    u(e, "subscribe", G, true);
    u(e, "unsubscribe", Z, true);
    H(t);
    F(t);
}

function G(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function Z(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

W(CollectionLengthObserver);

W(CollectionSizeObserver);

let J;

const X = new WeakMap;

function Y(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function tt(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function et(t, e, s, r, i) {
    let n, o, u, c, h;
    let a, l;
    for (a = s + 1; a < r; a++) {
        n = t[a];
        o = e[a];
        for (l = a - 1; l >= s; l--) {
            u = t[l];
            c = e[l];
            h = i(u, n);
            if (h > 0) {
                t[l + 1] = u;
                e[l + 1] = c;
            } else break;
        }
        t[l + 1] = n;
        e[l + 1] = o;
    }
}

function st(t, e, s, r, i) {
    let n = 0, o = 0;
    let u, c, h;
    let a, l, f;
    let d, p, v;
    let g, w;
    let b, x, E, A;
    let y, m, U, S;
    while (true) {
        if (r - s <= 10) {
            et(t, e, s, r, i);
            return;
        }
        n = s + (r - s >> 1);
        u = t[s];
        a = e[s];
        c = t[r - 1];
        l = e[r - 1];
        h = t[n];
        f = e[n];
        d = i(u, c);
        if (d > 0) {
            g = u;
            w = a;
            u = c;
            a = l;
            c = g;
            l = w;
        }
        p = i(u, h);
        if (p >= 0) {
            g = u;
            w = a;
            u = h;
            a = f;
            h = c;
            f = l;
            c = g;
            l = w;
        } else {
            v = i(c, h);
            if (v > 0) {
                g = c;
                w = l;
                c = h;
                l = f;
                h = g;
                f = w;
            }
        }
        t[s] = u;
        e[s] = a;
        t[r - 1] = h;
        e[r - 1] = f;
        b = c;
        x = l;
        E = s + 1;
        A = r - 1;
        t[n] = t[E];
        e[n] = e[E];
        t[E] = b;
        e[E] = x;
        t: for (o = E + 1; o < A; o++) {
            y = t[o];
            m = e[o];
            U = i(y, b);
            if (U < 0) {
                t[o] = t[E];
                e[o] = e[E];
                t[E] = y;
                e[E] = m;
                E++;
            } else if (U > 0) {
                do {
                    A--;
                    if (A == o) break t;
                    S = t[A];
                    U = i(S, b);
                } while (U > 0);
                t[o] = t[A];
                e[o] = e[A];
                t[A] = y;
                e[A] = m;
                if (U < 0) {
                    y = t[o];
                    m = e[o];
                    t[o] = t[E];
                    e[o] = e[E];
                    t[E] = y;
                    e[E] = m;
                    E++;
                }
            }
        }
        if (r - A < E - s) {
            st(t, e, A, r, i);
            r = E;
        } else {
            st(t, e, s, E, i);
            s = A;
        }
    }
}

const rt = Array.prototype;

const it = rt.push;

const nt = rt.unshift;

const ot = rt.pop;

const ut = rt.shift;

const ct = rt.splice;

const ht = rt.reverse;

const at = rt.sort;

const lt = {
    push: it,
    unshift: nt,
    pop: ot,
    shift: ut,
    splice: ct,
    reverse: ht,
    sort: at
};

const ft = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const dt = {
    push: function(...t) {
        const e = X.get(this);
        if (void 0 === e) return it.apply(this, t);
        const s = this.length;
        const r = t.length;
        if (0 === r) return s;
        this.length = e.indexMap.length = s + r;
        let i = s;
        while (i < this.length) {
            this[i] = t[i - s];
            e.indexMap[i] = -2;
            i++;
        }
        e.notify();
        return this.length;
    },
    unshift: function(...t) {
        const e = X.get(this);
        if (void 0 === e) return nt.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        nt.apply(e.indexMap, r);
        const n = nt.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = X.get(this);
        if (void 0 === t) return ot.call(this);
        const e = t.indexMap;
        const s = ot.call(this);
        const r = e.length - 1;
        if (e[r] > -1) e.deletedItems.push(e[r]);
        ot.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = X.get(this);
        if (void 0 === t) return ut.call(this);
        const e = t.indexMap;
        const s = ut.call(this);
        if (e[0] > -1) e.deletedItems.push(e[0]);
        ut.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = X.get(this);
        if (void 0 === r) return ct.apply(this, t);
        const i = this.length;
        const n = 0 | e;
        const o = n < 0 ? Math.max(i + n, 0) : Math.min(n, i);
        const u = r.indexMap;
        const c = t.length;
        const h = 0 === c ? 0 : 1 === c ? i - o : s;
        if (h > 0) {
            let t = o;
            const e = t + h;
            while (t < e) {
                if (u[t] > -1) u.deletedItems.push(u[t]);
                t++;
            }
        }
        if (c > 2) {
            const t = c - 2;
            const r = new Array(t);
            let i = 0;
            while (i < t) r[i++] = -2;
            ct.call(u, e, s, ...r);
        } else ct.apply(u, t);
        const a = ct.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = X.get(this);
        if (void 0 === t) {
            ht.call(this);
            return this;
        }
        const e = this.length;
        const s = e / 2 | 0;
        let r = 0;
        while (r !== s) {
            const s = e - r - 1;
            const i = this[r];
            const n = t.indexMap[r];
            const o = this[s];
            const u = t.indexMap[s];
            this[r] = o;
            t.indexMap[r] = u;
            this[s] = i;
            t.indexMap[s] = n;
            r++;
        }
        t.notify();
        return this;
    },
    sort: function(t) {
        const e = X.get(this);
        if (void 0 === e) {
            at.call(this, t);
            return this;
        }
        const s = this.length;
        if (s < 2) return this;
        st(this, e.indexMap, 0, s, tt);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !i(t)) t = Y;
        st(this, e.indexMap, 0, r, t);
        e.notify();
        return this;
    }
};

for (const t of ft) r(dt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let pt = false;

function vt() {
    for (const t of ft) if (true !== rt[t].observing) o(rt, t, dt[t]);
}

function gt() {
    for (const t of ft) if (true === rt[t].observing) o(rt, t, lt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!pt) {
            pt = true;
            vt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = I(t.length);
        this.lenObs = void 0;
        X.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.length;
        this.indexMap = I(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        var t;
        return null !== (t = this.lenObs) && void 0 !== t ? t : this.lenObs = new CollectionLengthObserver(this);
    }
    getIndexObserver(t) {
        var e;
        var s;
        return null !== (e = (s = this.indexObservers)[t]) && void 0 !== e ? e : s[t] = new ArrayIndexObserver(this, t);
    }
}

class ArrayIndexObserver {
    constructor(t, e) {
        this.owner = t;
        this.index = e;
        this.doNotCache = true;
        this.value = this.getValue();
    }
    getValue() {
        return this.owner.collection[this.index];
    }
    setValue(t, e) {
        if (t === this.getValue()) return;
        const s = this.owner;
        const r = this.index;
        const i = s.indexMap;
        if (i[r] > -1) i.deletedItems.push(i[r]);
        i[r] = -2;
        s.collection[r] = t;
        s.notify();
    }
    handleCollectionChange(t, e) {
        const s = this.index;
        const r = t[s] === s;
        if (r) return;
        const i = this.value;
        const n = this.value = this.getValue();
        if (i !== n) this.subs.notify(n, i, e);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.owner.unsubscribe(this);
    }
}

F(ArrayObserver);

F(ArrayIndexObserver);

function wt(t) {
    let e = X.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

function bt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = M(t);
    const n = i.length;
    for (;r < n; ++r) {
        while (i.deletedItems[s] <= r - e) {
            ++s;
            --e;
        }
        if (-2 === i[r]) ++e; else i[r] += e;
    }
    return i;
}

function xt(t, e) {
    const s = t.slice();
    const r = e.length;
    let i = 0;
    let n = 0;
    while (i < r) {
        n = e[i];
        if (-2 !== n) t[i] = s[n];
        ++i;
    }
}

const Et = new WeakMap;

const At = Set.prototype;

const yt = At.add;

const mt = At.clear;

const Ut = At.delete;

const St = {
    add: yt,
    clear: mt,
    delete: Ut
};

const Ot = [ "add", "clear", "delete" ];

const Ct = {
    add: function(t) {
        const e = Et.get(this);
        if (void 0 === e) {
            yt.call(this, t);
            return this;
        }
        const s = this.size;
        yt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Et.get(this);
        if (void 0 === t) return mt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            mt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Et.get(this);
        if (void 0 === e) return Ut.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = Ut.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            r++;
        }
        return false;
    }
};

const $t = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ot) r(Ct[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let kt = false;

function Bt() {
    for (const t of Ot) if (true !== At[t].observing) r(At, t, {
        ...$t,
        value: Ct[t]
    });
}

function Lt() {
    for (const t of Ot) if (true === At[t].observing) r(At, t, {
        ...$t,
        value: St[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!kt) {
            kt = true;
            Bt();
        }
        this.collection = t;
        this.indexMap = I(t.size);
        this.lenObs = void 0;
        Et.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = I(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        var t;
        return null !== (t = this.lenObs) && void 0 !== t ? t : this.lenObs = new CollectionSizeObserver(this);
    }
}

F(SetObserver);

function Rt(t) {
    let e = Et.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Pt = new WeakMap;

const Tt = Map.prototype;

const jt = Tt.set;

const It = Tt.clear;

const Mt = Tt.delete;

const Dt = {
    set: jt,
    clear: It,
    delete: Mt
};

const Ft = [ "set", "clear", "delete" ];

const Vt = {
    set: function(t, e) {
        const s = Pt.get(this);
        if (void 0 === s) {
            jt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        jt.call(this, t, e);
        const n = this.size;
        if (n === i) {
            let e = 0;
            for (const i of this.entries()) {
                if (i[0] === t) {
                    if (i[1] !== r) {
                        s.indexMap.deletedItems.push(s.indexMap[e]);
                        s.indexMap[e] = -2;
                        s.notify();
                    }
                    return this;
                }
                e++;
            }
            return this;
        }
        s.indexMap[i] = -2;
        s.notify();
        return this;
    },
    clear: function() {
        const t = Pt.get(this);
        if (void 0 === t) return It.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            It.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Pt.get(this);
        if (void 0 === e) return Mt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = Mt.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            ++r;
        }
        return false;
    }
};

const Nt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ft) r(Vt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Kt = false;

function qt() {
    for (const t of Ft) if (true !== Tt[t].observing) r(Tt, t, {
        ...Nt,
        value: Vt[t]
    });
}

function Ht() {
    for (const t of Ft) if (true === Tt[t].observing) r(Tt, t, {
        ...Nt,
        value: Dt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Kt) {
            Kt = true;
            qt();
        }
        this.collection = t;
        this.indexMap = I(t.size);
        this.lenObs = void 0;
        Pt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = I(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        var t;
        return null !== (t = this.lenObs) && void 0 !== t ? t : this.lenObs = new CollectionSizeObserver(this);
    }
}

F(MapObserver);

function Qt(t) {
    let e = Pt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function _t(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function zt() {
    return o(this, "obs", new BindingObserverRecord(this));
}

function Wt(t) {
    let e;
    if (t instanceof Array) e = wt(t); else if (t instanceof Set) e = Rt(t); else if (t instanceof Map) e = Qt(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function Gt(t) {
    this.obs.add(t);
}

function Zt() {
    throw new Error(`AUR2011:handleChange`);
}

function Jt() {
    throw new Error(`AUR2011:handleCollectionChange`);
}

class BindingObserverRecord {
    constructor(t) {
        this.version = 0;
        this.count = 0;
        this.o = new Map;
        this.b = t;
    }
    handleChange(t, e, s) {
        return this.b.interceptor.handleChange(t, e, s);
    }
    handleCollectionChange(t, e) {
        this.b.interceptor.handleCollectionChange(t, e);
    }
    add(t) {
        if (!this.o.has(t)) {
            t.subscribe(this);
            ++this.count;
        }
        this.o.set(t, this.version);
    }
    clear() {
        this.o.forEach(Yt, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(Xt, this);
        this.o.clear();
        this.count = 0;
    }
}

function Xt(t, e) {
    e.unsubscribe(this);
}

function Yt(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function te(t) {
    const e = t.prototype;
    u(e, "observe", _t, true);
    u(e, "observeCollection", Wt, true);
    u(e, "subscribeTo", Gt, true);
    r(e, "obs", {
        get: zt
    });
    u(e, "handleChange", Zt);
    u(e, "handleCollectionChange", Jt);
    return t;
}

function ee(t) {
    return null == t ? te : te(t);
}

class BindingMediator {
    constructor(t, e, s, r) {
        this.key = t;
        this.binding = e;
        this.oL = s;
        this.locator = r;
        this.interceptor = this;
    }
    $bind() {
        throw new Error(`AUR0213:$bind`);
    }
    $unbind() {
        throw new Error(`AUR0214:$unbind`);
    }
    handleChange(t, e, s) {
        this.binding[this.key](t, e, s);
    }
}

te(BindingMediator);

const se = t.DI.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = c();
        this.A = c();
        this.U = c();
    }
    parse(t, e) {
        let s;
        switch (e) {
          case 16:
            return new CustomExpression(t);

          case 1:
            s = this.U[t];
            if (void 0 === s) s = this.U[t] = this.$parse(t, e);
            return s;

          case 2:
            s = this.A[t];
            if (void 0 === s) s = this.A[t] = this.$parse(t, e);
            return s;

          default:
            if (0 === t.length) {
                if ((e & (4 | 8)) > 0) return PrimitiveLiteralExpression.$empty;
                throw new Error(`AUR0169`);
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        fe = t;
        pe = t.length;
        de = 0;
        be = t.charCodeAt(0);
        return me(61, void 0 === e ? 8 : e);
    }
}

exports.Char = void 0;

(function(t) {
    t[t["Null"] = 0] = "Null";
    t[t["Backspace"] = 8] = "Backspace";
    t[t["Tab"] = 9] = "Tab";
    t[t["LineFeed"] = 10] = "LineFeed";
    t[t["VerticalTab"] = 11] = "VerticalTab";
    t[t["FormFeed"] = 12] = "FormFeed";
    t[t["CarriageReturn"] = 13] = "CarriageReturn";
    t[t["Space"] = 32] = "Space";
    t[t["Exclamation"] = 33] = "Exclamation";
    t[t["DoubleQuote"] = 34] = "DoubleQuote";
    t[t["Dollar"] = 36] = "Dollar";
    t[t["Percent"] = 37] = "Percent";
    t[t["Ampersand"] = 38] = "Ampersand";
    t[t["SingleQuote"] = 39] = "SingleQuote";
    t[t["OpenParen"] = 40] = "OpenParen";
    t[t["CloseParen"] = 41] = "CloseParen";
    t[t["Asterisk"] = 42] = "Asterisk";
    t[t["Plus"] = 43] = "Plus";
    t[t["Comma"] = 44] = "Comma";
    t[t["Minus"] = 45] = "Minus";
    t[t["Dot"] = 46] = "Dot";
    t[t["Slash"] = 47] = "Slash";
    t[t["Semicolon"] = 59] = "Semicolon";
    t[t["Backtick"] = 96] = "Backtick";
    t[t["OpenBracket"] = 91] = "OpenBracket";
    t[t["Backslash"] = 92] = "Backslash";
    t[t["CloseBracket"] = 93] = "CloseBracket";
    t[t["Caret"] = 94] = "Caret";
    t[t["Underscore"] = 95] = "Underscore";
    t[t["OpenBrace"] = 123] = "OpenBrace";
    t[t["Bar"] = 124] = "Bar";
    t[t["CloseBrace"] = 125] = "CloseBrace";
    t[t["Colon"] = 58] = "Colon";
    t[t["LessThan"] = 60] = "LessThan";
    t[t["Equals"] = 61] = "Equals";
    t[t["GreaterThan"] = 62] = "GreaterThan";
    t[t["Question"] = 63] = "Question";
    t[t["Zero"] = 48] = "Zero";
    t[t["One"] = 49] = "One";
    t[t["Two"] = 50] = "Two";
    t[t["Three"] = 51] = "Three";
    t[t["Four"] = 52] = "Four";
    t[t["Five"] = 53] = "Five";
    t[t["Six"] = 54] = "Six";
    t[t["Seven"] = 55] = "Seven";
    t[t["Eight"] = 56] = "Eight";
    t[t["Nine"] = 57] = "Nine";
    t[t["UpperA"] = 65] = "UpperA";
    t[t["UpperB"] = 66] = "UpperB";
    t[t["UpperC"] = 67] = "UpperC";
    t[t["UpperD"] = 68] = "UpperD";
    t[t["UpperE"] = 69] = "UpperE";
    t[t["UpperF"] = 70] = "UpperF";
    t[t["UpperG"] = 71] = "UpperG";
    t[t["UpperH"] = 72] = "UpperH";
    t[t["UpperI"] = 73] = "UpperI";
    t[t["UpperJ"] = 74] = "UpperJ";
    t[t["UpperK"] = 75] = "UpperK";
    t[t["UpperL"] = 76] = "UpperL";
    t[t["UpperM"] = 77] = "UpperM";
    t[t["UpperN"] = 78] = "UpperN";
    t[t["UpperO"] = 79] = "UpperO";
    t[t["UpperP"] = 80] = "UpperP";
    t[t["UpperQ"] = 81] = "UpperQ";
    t[t["UpperR"] = 82] = "UpperR";
    t[t["UpperS"] = 83] = "UpperS";
    t[t["UpperT"] = 84] = "UpperT";
    t[t["UpperU"] = 85] = "UpperU";
    t[t["UpperV"] = 86] = "UpperV";
    t[t["UpperW"] = 87] = "UpperW";
    t[t["UpperX"] = 88] = "UpperX";
    t[t["UpperY"] = 89] = "UpperY";
    t[t["UpperZ"] = 90] = "UpperZ";
    t[t["LowerA"] = 97] = "LowerA";
    t[t["LowerB"] = 98] = "LowerB";
    t[t["LowerC"] = 99] = "LowerC";
    t[t["LowerD"] = 100] = "LowerD";
    t[t["LowerE"] = 101] = "LowerE";
    t[t["LowerF"] = 102] = "LowerF";
    t[t["LowerG"] = 103] = "LowerG";
    t[t["LowerH"] = 104] = "LowerH";
    t[t["LowerI"] = 105] = "LowerI";
    t[t["LowerJ"] = 106] = "LowerJ";
    t[t["LowerK"] = 107] = "LowerK";
    t[t["LowerL"] = 108] = "LowerL";
    t[t["LowerM"] = 109] = "LowerM";
    t[t["LowerN"] = 110] = "LowerN";
    t[t["LowerO"] = 111] = "LowerO";
    t[t["LowerP"] = 112] = "LowerP";
    t[t["LowerQ"] = 113] = "LowerQ";
    t[t["LowerR"] = 114] = "LowerR";
    t[t["LowerS"] = 115] = "LowerS";
    t[t["LowerT"] = 116] = "LowerT";
    t[t["LowerU"] = 117] = "LowerU";
    t[t["LowerV"] = 118] = "LowerV";
    t[t["LowerW"] = 119] = "LowerW";
    t[t["LowerX"] = 120] = "LowerX";
    t[t["LowerY"] = 121] = "LowerY";
    t[t["LowerZ"] = 122] = "LowerZ";
})(exports.Char || (exports.Char = {}));

function re(t) {
    switch (t) {
      case 98:
        return 8;

      case 116:
        return 9;

      case 110:
        return 10;

      case 118:
        return 11;

      case 102:
        return 12;

      case 114:
        return 13;

      case 34:
        return 34;

      case 39:
        return 39;

      case 92:
        return 92;

      default:
        return t;
    }
}

var ie;

(function(t) {
    t[t["Variadic"] = 61] = "Variadic";
    t[t["Assign"] = 62] = "Assign";
    t[t["Conditional"] = 63] = "Conditional";
    t[t["NullishCoalescing"] = 128] = "NullishCoalescing";
    t[t["LogicalOR"] = 192] = "LogicalOR";
    t[t["LogicalAND"] = 256] = "LogicalAND";
    t[t["Equality"] = 320] = "Equality";
    t[t["Relational"] = 384] = "Relational";
    t[t["Additive"] = 448] = "Additive";
    t[t["Multiplicative"] = 512] = "Multiplicative";
    t[t["Binary"] = 513] = "Binary";
    t[t["LeftHandSide"] = 514] = "LeftHandSide";
    t[t["Primary"] = 515] = "Primary";
    t[t["Unary"] = 516] = "Unary";
})(ie || (ie = {}));

var ne;

(function(t) {
    t[t["EOF"] = 6291456] = "EOF";
    t[t["ExpressionTerminal"] = 4194304] = "ExpressionTerminal";
    t[t["AccessScopeTerminal"] = 2097152] = "AccessScopeTerminal";
    t[t["ClosingToken"] = 1048576] = "ClosingToken";
    t[t["OpeningToken"] = 524288] = "OpeningToken";
    t[t["BinaryOp"] = 262144] = "BinaryOp";
    t[t["UnaryOp"] = 131072] = "UnaryOp";
    t[t["LeftHandSide"] = 65536] = "LeftHandSide";
    t[t["StringOrNumericLiteral"] = 49152] = "StringOrNumericLiteral";
    t[t["NumericLiteral"] = 32768] = "NumericLiteral";
    t[t["StringLiteral"] = 16384] = "StringLiteral";
    t[t["IdentifierName"] = 12288] = "IdentifierName";
    t[t["Keyword"] = 8192] = "Keyword";
    t[t["Identifier"] = 4096] = "Identifier";
    t[t["Contextual"] = 2048] = "Contextual";
    t[t["OptionalSuffix"] = 13312] = "OptionalSuffix";
    t[t["Precedence"] = 960] = "Precedence";
    t[t["Type"] = 63] = "Type";
    t[t["FalseKeyword"] = 8192] = "FalseKeyword";
    t[t["TrueKeyword"] = 8193] = "TrueKeyword";
    t[t["NullKeyword"] = 8194] = "NullKeyword";
    t[t["UndefinedKeyword"] = 8195] = "UndefinedKeyword";
    t[t["ThisScope"] = 12292] = "ThisScope";
    t[t["ParentScope"] = 12294] = "ParentScope";
    t[t["OpenParen"] = 2688007] = "OpenParen";
    t[t["OpenBrace"] = 524296] = "OpenBrace";
    t[t["Dot"] = 65545] = "Dot";
    t[t["QuestionDot"] = 2162698] = "QuestionDot";
    t[t["CloseBrace"] = 7340043] = "CloseBrace";
    t[t["CloseParen"] = 7340044] = "CloseParen";
    t[t["Comma"] = 6291469] = "Comma";
    t[t["OpenBracket"] = 2688014] = "OpenBracket";
    t[t["CloseBracket"] = 7340047] = "CloseBracket";
    t[t["Colon"] = 6291472] = "Colon";
    t[t["Question"] = 6291475] = "Question";
    t[t["Ampersand"] = 6291476] = "Ampersand";
    t[t["Bar"] = 6291477] = "Bar";
    t[t["QuestionQuestion"] = 6553750] = "QuestionQuestion";
    t[t["BarBar"] = 6553815] = "BarBar";
    t[t["AmpersandAmpersand"] = 6553880] = "AmpersandAmpersand";
    t[t["EqualsEquals"] = 6553945] = "EqualsEquals";
    t[t["ExclamationEquals"] = 6553946] = "ExclamationEquals";
    t[t["EqualsEqualsEquals"] = 6553947] = "EqualsEqualsEquals";
    t[t["ExclamationEqualsEquals"] = 6553948] = "ExclamationEqualsEquals";
    t[t["LessThan"] = 6554013] = "LessThan";
    t[t["GreaterThan"] = 6554014] = "GreaterThan";
    t[t["LessThanEquals"] = 6554015] = "LessThanEquals";
    t[t["GreaterThanEquals"] = 6554016] = "GreaterThanEquals";
    t[t["InKeyword"] = 6562209] = "InKeyword";
    t[t["InstanceOfKeyword"] = 6562210] = "InstanceOfKeyword";
    t[t["Plus"] = 2490851] = "Plus";
    t[t["Minus"] = 2490852] = "Minus";
    t[t["TypeofKeyword"] = 139301] = "TypeofKeyword";
    t[t["VoidKeyword"] = 139302] = "VoidKeyword";
    t[t["Asterisk"] = 6554151] = "Asterisk";
    t[t["Percent"] = 6554152] = "Percent";
    t[t["Slash"] = 6554153] = "Slash";
    t[t["Equals"] = 4194346] = "Equals";
    t[t["Exclamation"] = 131115] = "Exclamation";
    t[t["TemplateTail"] = 2163756] = "TemplateTail";
    t[t["TemplateContinuation"] = 2163757] = "TemplateContinuation";
    t[t["OfKeyword"] = 4204590] = "OfKeyword";
})(ne || (ne = {}));

const oe = PrimitiveLiteralExpression.$false;

const ue = PrimitiveLiteralExpression.$true;

const ce = PrimitiveLiteralExpression.$null;

const he = PrimitiveLiteralExpression.$undefined;

const ae = AccessThisExpression.$this;

const le = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let fe = "";

let de = 0;

let pe = 0;

let ve = 0;

let ge = 6291456;

let we = "";

let be;

let xe = true;

let Ee = false;

function Ae() {
    return fe.slice(ve, de);
}

function ye(t, e) {
    fe = t;
    pe = t.length;
    de = 0;
    be = t.charCodeAt(0);
    return me(61, void 0 === e ? 8 : e);
}

function me(t, e) {
    if (16 === e) return new CustomExpression(fe);
    if (0 === de) {
        if (1 & e) return je();
        De();
        if (4194304 & ge) throw new Error(`AUR0151:${fe}`);
    }
    xe = 513 > t;
    Ee = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & ge) {
        const t = Ge[63 & ge];
        De();
        r = new UnaryExpression(t, me(514, e));
        xe = false;
    } else {
        t: switch (ge) {
          case 12294:
            xe = false;
            do {
                De();
                ++i;
                if (ze(65545)) {
                    if (65545 === ge) throw new Error(`AUR0152:${fe}`); else if (6291456 === ge) throw new Error(`AUR0153:${fe}`);
                } else if (2162698 === ge) {
                    Ee = true;
                    De();
                    if (0 === (12288 & ge)) {
                        r = 0 === i ? ae : 1 === i ? le : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                } else if (2097152 & ge) {
                    r = 0 === i ? ae : 1 === i ? le : new AccessThisExpression(i);
                    break t;
                } else throw new Error(`AUR0154:${fe}`);
            } while (12294 === ge);

          case 4096:
            if (2 & e) r = new BindingIdentifier(we); else r = new AccessScopeExpression(we, i);
            xe = !Ee;
            De();
            break;

          case 12292:
            xe = false;
            De();
            r = ae;
            break;

          case 2688007:
            {
                De();
                const t = Ee;
                r = me(62, e);
                Ee = t;
                We(7340044);
                break;
            }

          case 2688014:
            r = fe.search(/\s+of\s+/) > de ? Ue() : Re(e);
            break;

          case 524296:
            r = Te(e);
            break;

          case 2163756:
            r = new TemplateExpression([ we ]);
            xe = false;
            De();
            break;

          case 2163757:
            r = Ie(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(we);
            xe = false;
            De();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Ge[63 & ge];
            xe = false;
            De();
            break;

          default:
            if (de >= pe) throw new Error(`AUR0155:${fe}`); else throw new Error(`AUR0156:${fe}`);
        }
        if (2 & e) return Pe(r);
        if (514 < t) return r;
        if (1793 === r.$kind) switch (ge) {
          case 2162698:
            Ee = true;
            xe = false;
            De();
            ke();
            if (12288 & ge) {
                r = new AccessScopeExpression(we, r.ancestor);
                De();
            } else if (2688007 === ge) r = new CallFunctionExpression(r, Se(), true); else if (2688014 === ge) r = Oe(r, true); else throw Le();
            break;

          case 65545:
            xe = !Ee;
            De();
            Be();
            r = new AccessScopeExpression(we, r.ancestor);
            De();
            break;

          case 2688007:
            r = new CallFunctionExpression(r, Se(), s);
            break;

          case 2688014:
            r = Oe(r, s);
            break;

          case 2163756:
            r = Me(r);
            break;

          case 2163757:
            r = Ie(e, r, true);
            break;
        }
        while ((65536 & ge) > 0) switch (ge) {
          case 2162698:
            r = Ce(r);
            break;

          case 65545:
            De();
            Be();
            r = $e(r, false);
            break;

          case 2688007:
            if (10082 === r.$kind) r = new CallScopeExpression(r.name, Se(), r.ancestor, false); else if (9323 === r.$kind) r = new CallMemberExpression(r.object, r.name, Se(), r.optional, false); else r = new CallFunctionExpression(r, Se(), false);
            break;

          case 2688014:
            r = Oe(r, false);
            break;

          case 2163756:
            if (Ee) throw Le();
            r = Me(r);
            break;

          case 2163757:
            if (Ee) throw Le();
            r = Ie(e, r, true);
            break;
        }
    }
    if (513 < t) return r;
    while ((262144 & ge) > 0) {
        const s = ge;
        if ((960 & s) <= t) break;
        De();
        r = new BinaryExpression(Ge[63 & s], r, me(960 & s, e));
        xe = false;
    }
    if (63 < t) return r;
    if (ze(6291475)) {
        const t = me(62, e);
        We(6291472);
        r = new ConditionalExpression(r, t, me(62, e));
        xe = false;
    }
    if (62 < t) return r;
    if (ze(4194346)) {
        if (!xe) throw new Error(`AUR0158:${fe}`);
        r = new AssignExpression(r, me(62, e));
    }
    if (61 < t) return r;
    while (ze(6291477)) {
        if (6291456 === ge) throw new Error(`AUR0159:${fe}`);
        const t = we;
        De();
        const s = new Array;
        while (ze(6291472)) s.push(me(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (ze(6291476)) {
        if (6291456 === ge) throw new Error(`AUR0160:${fe}`);
        const t = we;
        De();
        const s = new Array;
        while (ze(6291472)) s.push(me(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== ge) {
        if (1 & e) return r;
        if ("of" === Ae()) throw new Error(`AUR0161:${fe}`);
        throw new Error(`AUR0162:${fe}`);
    }
    return r;
}

function Ue() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90137, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        De();
        switch (ge) {
          case 7340047:
            r = false;
            n();
            break;

          case 6291469:
            n();
            break;

          case 4096:
            s = Ae();
            break;

          default:
            throw new Error(`AUR0170:${fe}`);
        }
    }
    We(7340047);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(ae, s), new AccessKeyedExpression(ae, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Se() {
    const t = Ee;
    De();
    const e = [];
    while (7340044 !== ge) {
        e.push(me(62, 0));
        if (!ze(6291469)) break;
    }
    We(7340044);
    xe = false;
    Ee = t;
    return e;
}

function Oe(t, e) {
    const s = Ee;
    De();
    t = new AccessKeyedExpression(t, me(62, 0), e);
    We(7340047);
    xe = !s;
    Ee = s;
    return t;
}

function Ce(t) {
    Ee = true;
    xe = false;
    De();
    ke();
    if (12288 & ge) return $e(t, true);
    if (2688007 === ge) if (10082 === t.$kind) return new CallScopeExpression(t.name, Se(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, Se(), t.optional, true); else return new CallFunctionExpression(t, Se(), true);
    if (2688014 === ge) return Oe(t, true);
    throw Le();
}

function $e(t, e) {
    const s = we;
    switch (ge) {
      case 2162698:
        Ee = true;
        xe = false;
        Fe();
        De();
        ke();
        if (2688007 === ge) return new CallMemberExpression(t, s, Se(), e, true);
        Ve();
        return new AccessMemberExpression(t, s, e);

      case 2688007:
        xe = false;
        return new CallMemberExpression(t, s, Se(), e, false);

      default:
        xe = !Ee;
        De();
        return new AccessMemberExpression(t, s, e);
    }
}

function ke() {
    if (0 === (13312 & ge)) throw new Error(`AUR0171:${fe}`);
}

function Be() {
    if (0 === (12288 & ge)) throw new Error(`AUR0153:${fe}`);
}

function Le() {
    return new Error(`AUR0172:${fe}`);
}

function Re(t) {
    const e = Ee;
    De();
    const s = new Array;
    while (7340047 !== ge) if (ze(6291469)) {
        s.push(he);
        if (7340047 === ge) break;
    } else {
        s.push(me(62, ~2 & t));
        if (ze(6291469)) {
            if (7340047 === ge) break;
        } else break;
    }
    Ee = e;
    We(7340047);
    if (2 & t) return new ArrayBindingPattern(s); else {
        xe = false;
        return new ArrayLiteralExpression(s);
    }
}

function Pe(t) {
    if (0 === (65536 & t.$kind)) throw new Error(`AUR0163:${fe}`);
    if (4204590 !== ge) throw new Error(`AUR0163:${fe}`);
    De();
    const e = t;
    const s = me(61, 0);
    return new ForOfStatement(e, s);
}

function Te(t) {
    const e = Ee;
    const s = new Array;
    const r = new Array;
    De();
    while (7340043 !== ge) {
        s.push(we);
        if (49152 & ge) {
            De();
            We(6291472);
            r.push(me(62, ~2 & t));
        } else if (12288 & ge) {
            const e = be;
            const s = ge;
            const i = de;
            De();
            if (ze(6291472)) r.push(me(62, ~2 & t)); else {
                be = e;
                ge = s;
                de = i;
                r.push(me(515, ~2 & t));
            }
        } else throw new Error(`AUR0164:${fe}`);
        if (7340043 !== ge) We(6291469);
    }
    Ee = e;
    We(7340043);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        xe = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function je() {
    const t = [];
    const e = [];
    const s = pe;
    let r = "";
    while (de < s) {
        switch (be) {
          case 36:
            if (123 === fe.charCodeAt(de + 1)) {
                t.push(r);
                r = "";
                de += 2;
                be = fe.charCodeAt(de);
                De();
                const s = me(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(re(Ne()));
            break;

          default:
            r += String.fromCharCode(be);
        }
        Ne();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ie(t, e, s) {
    const r = Ee;
    const i = [ we ];
    We(2163757);
    const n = [ me(62, t) ];
    while (2163756 !== (ge = _e())) {
        i.push(we);
        We(2163757);
        n.push(me(62, t));
    }
    i.push(we);
    xe = false;
    Ee = r;
    if (s) {
        De();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        De();
        return new TemplateExpression(i, n);
    }
}

function Me(t) {
    xe = false;
    const e = [ we ];
    De();
    return new TaggedTemplateExpression(e, e, t);
}

function De() {
    while (de < pe) {
        ve = de;
        if (null != (ge = rs[be]())) return;
    }
    ge = 6291456;
}

const {save: Fe, restore: Ve} = function() {
    let t = 0;
    let e = 0;
    let s = 6291456;
    let r = 0;
    let i = "";
    let n = true;
    let o = false;
    function u() {
        t = de;
        e = ve;
        s = ge;
        r = be;
        i = we;
        n = xe;
        o = Ee;
    }
    function c() {
        de = t;
        ve = e;
        ge = s;
        be = r;
        we = i;
        xe = n;
        Ee = o;
    }
    return {
        save: u,
        restore: c
    };
}();

function Ne() {
    return be = fe.charCodeAt(++de);
}

function Ke() {
    while (ss[Ne()]) ;
    const t = Ze[we = Ae()];
    return void 0 === t ? 4096 : t;
}

function qe(t) {
    let e = be;
    if (false === t) {
        do {
            e = Ne();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            we = parseInt(Ae(), 10);
            return 32768;
        }
        e = Ne();
        if (de >= pe) {
            we = parseInt(Ae().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Ne();
    } while (e <= 57 && e >= 48); else be = fe.charCodeAt(--de);
    we = parseFloat(Ae());
    return 32768;
}

function He() {
    const t = be;
    Ne();
    let e = 0;
    const s = new Array;
    let r = de;
    while (be !== t) if (92 === be) {
        s.push(fe.slice(r, de));
        Ne();
        e = re(be);
        Ne();
        s.push(String.fromCharCode(e));
        r = de;
    } else if (de >= pe) throw new Error(`AUR0165:${fe}`); else Ne();
    const i = fe.slice(r, de);
    Ne();
    s.push(i);
    const n = s.join("");
    we = n;
    return 16384;
}

function Qe() {
    let t = true;
    let e = "";
    while (96 !== Ne()) if (36 === be) if (de + 1 < pe && 123 === fe.charCodeAt(de + 1)) {
        de++;
        t = false;
        break;
    } else e += "$"; else if (92 === be) e += String.fromCharCode(re(Ne())); else {
        if (de >= pe) throw new Error(`AUR0166:${fe}`);
        e += String.fromCharCode(be);
    }
    Ne();
    we = e;
    if (t) return 2163756;
    return 2163757;
}

function _e() {
    if (de >= pe) throw new Error(`AUR0166:${fe}`);
    de--;
    return Qe();
}

function ze(t) {
    if (ge === t) {
        De();
        return true;
    }
    return false;
}

function We(t) {
    if (ge === t) De(); else throw new Error(`AUR0167:${fe}<${t}`);
}

const Ge = [ oe, ue, ce, he, "$this", null, "$parent", "(", "{", ".", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163756, 2163757, "of" ];

const Ze = Object.assign(Object.create(null), {
    true: 8193,
    null: 8194,
    false: 8192,
    undefined: 8195,
    $this: 12292,
    $parent: 12294,
    in: 6562209,
    instanceof: 6562210,
    typeof: 139301,
    void: 139302,
    of: 4204590
});

const Je = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Xe(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function Ye(t) {
    return () => {
        Ne();
        return t;
    };
}

const ts = () => {
    throw new Error(`AUR0168:${fe}`);
};

ts.notMapped = true;

const es = new Set;

Xe(null, es, Je.AsciiIdPart, true);

const ss = new Uint8Array(65535);

Xe(ss, null, Je.IdStart, 1);

Xe(ss, null, Je.Digit, 1);

const rs = new Array(65535);

rs.fill(ts, 0, 65535);

Xe(rs, null, Je.Skip, (() => {
    Ne();
    return null;
}));

Xe(rs, null, Je.IdStart, Ke);

Xe(rs, null, Je.Digit, (() => qe(false)));

rs[34] = rs[39] = () => He();

rs[96] = () => Qe();

rs[33] = () => {
    if (61 !== Ne()) return 131115;
    if (61 !== Ne()) return 6553946;
    Ne();
    return 6553948;
};

rs[61] = () => {
    if (61 !== Ne()) return 4194346;
    if (61 !== Ne()) return 6553945;
    Ne();
    return 6553947;
};

rs[38] = () => {
    if (38 !== Ne()) return 6291476;
    Ne();
    return 6553880;
};

rs[124] = () => {
    if (124 !== Ne()) return 6291477;
    Ne();
    return 6553815;
};

rs[63] = () => {
    if (46 === Ne()) {
        const t = fe.charCodeAt(de + 1);
        if (t <= 48 || t >= 57) {
            Ne();
            return 2162698;
        }
        return 6291475;
    }
    if (63 !== be) return 6291475;
    if (61 === Ne()) throw new Error("Operator ??= is not supported.");
    return 6553750;
};

rs[46] = () => {
    if (Ne() <= 57 && be >= 48) return qe(true);
    return 65545;
};

rs[60] = () => {
    if (61 !== Ne()) return 6554013;
    Ne();
    return 6554015;
};

rs[62] = () => {
    if (61 !== Ne()) return 6554014;
    Ne();
    return 6554016;
};

rs[37] = Ye(6554152);

rs[40] = Ye(2688007);

rs[41] = Ye(7340044);

rs[42] = Ye(6554151);

rs[43] = Ye(2490851);

rs[44] = Ye(6291469);

rs[45] = Ye(2490852);

rs[47] = Ye(6554153);

rs[58] = Ye(6291472);

rs[91] = Ye(2688014);

rs[93] = Ye(7340047);

rs[123] = Ye(524296);

rs[125] = Ye(7340043);

let is = null;

const ns = [];

let os = false;

function us() {
    os = false;
}

function cs() {
    os = true;
}

function hs() {
    return is;
}

function as(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == is) {
        is = t;
        ns[0] = is;
        os = true;
        return;
    }
    if (is === t) throw new Error(`AUR0207`);
    ns.push(t);
    is = t;
    os = true;
}

function ls(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (is !== t) throw new Error(`AUR0209`);
    ns.pop();
    is = ns.length > 0 ? ns[ns.length - 1] : null;
    os = null != is;
}

const fs = Object.freeze({
    get current() {
        return is;
    },
    get connecting() {
        return os;
    },
    enter: as,
    exit: ls,
    pause: us,
    resume: cs
});

const ds = Reflect.get;

const ps = Object.prototype.toString;

const vs = new WeakMap;

function gs(t) {
    switch (ps.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const ws = "__raw__";

function bs(t) {
    return gs(t) ? xs(t) : t;
}

function xs(t) {
    var e;
    return null !== (e = vs.get(t)) && void 0 !== e ? e : ms(t);
}

function Es(t) {
    var e;
    return null !== (e = t[ws]) && void 0 !== e ? e : t;
}

function As(t) {
    return gs(t) && t[ws] || t;
}

function ys(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function ms(t) {
    const e = t instanceof Array ? Ss : t instanceof Map || t instanceof Set ? Ws : Us;
    const s = new Proxy(t, e);
    vs.set(t, s);
    return s;
}

const Us = {
    get(t, e, s) {
        if (e === ws) return t;
        const r = hs();
        if (!os || ys(e) || null == r) return ds(t, e, s);
        r.observe(t, e);
        return bs(ds(t, e, s));
    }
};

const Ss = {
    get(t, e, s) {
        if (e === ws) return t;
        const r = hs();
        if (!os || ys(e) || null == r) return ds(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Os;

          case "includes":
            return ks;

          case "indexOf":
            return Bs;

          case "lastIndexOf":
            return Ls;

          case "every":
            return Cs;

          case "filter":
            return $s;

          case "find":
            return Ps;

          case "findIndex":
            return Rs;

          case "flat":
            return Ts;

          case "flatMap":
            return js;

          case "join":
            return Is;

          case "push":
            return Ds;

          case "pop":
            return Ms;

          case "reduce":
            return _s;

          case "reduceRight":
            return zs;

          case "reverse":
            return Ks;

          case "shift":
            return Fs;

          case "unshift":
            return Vs;

          case "slice":
            return Qs;

          case "splice":
            return Ns;

          case "some":
            return qs;

          case "sort":
            return Hs;

          case "keys":
            return sr;

          case "values":
          case Symbol.iterator:
            return rr;

          case "entries":
            return ir;
        }
        r.observe(t, e);
        return bs(ds(t, e, s));
    },
    ownKeys(t) {
        var e;
        null === (e = hs()) || void 0 === e ? void 0 : e.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Os(t, e) {
    var s;
    const r = Es(this);
    const i = r.map(((s, r) => As(t.call(e, bs(s), r, this))));
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return bs(i);
}

function Cs(t, e) {
    var s;
    const r = Es(this);
    const i = r.every(((s, r) => t.call(e, bs(s), r, this)));
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return i;
}

function $s(t, e) {
    var s;
    const r = Es(this);
    const i = r.filter(((s, r) => As(t.call(e, bs(s), r, this))));
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return bs(i);
}

function ks(t) {
    var e;
    const s = Es(this);
    const r = s.includes(As(t));
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return r;
}

function Bs(t) {
    var e;
    const s = Es(this);
    const r = s.indexOf(As(t));
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return r;
}

function Ls(t) {
    var e;
    const s = Es(this);
    const r = s.lastIndexOf(As(t));
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return r;
}

function Rs(t, e) {
    var s;
    const r = Es(this);
    const i = r.findIndex(((s, r) => As(t.call(e, bs(s), r, this))));
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return i;
}

function Ps(t, e) {
    var s;
    const r = Es(this);
    const i = r.find(((e, s) => t(bs(e), s, this)), e);
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return bs(i);
}

function Ts() {
    var t;
    const e = Es(this);
    null === (t = hs()) || void 0 === t ? void 0 : t.observeCollection(e);
    return bs(e.flat());
}

function js(t, e) {
    var s;
    const r = Es(this);
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return xs(r.flatMap(((s, r) => bs(t.call(e, bs(s), r, this)))));
}

function Is(t) {
    var e;
    const s = Es(this);
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return s.join(t);
}

function Ms() {
    return bs(Es(this).pop());
}

function Ds(...t) {
    return Es(this).push(...t);
}

function Fs() {
    return bs(Es(this).shift());
}

function Vs(...t) {
    return Es(this).unshift(...t);
}

function Ns(...t) {
    return bs(Es(this).splice(...t));
}

function Ks(...t) {
    var e;
    const s = Es(this);
    const r = s.reverse();
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return bs(r);
}

function qs(t, e) {
    var s;
    const r = Es(this);
    const i = r.some(((s, r) => As(t.call(e, bs(s), r, this))));
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return i;
}

function Hs(t) {
    var e;
    const s = Es(this);
    const r = s.sort(t);
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return bs(r);
}

function Qs(t, e) {
    var s;
    const r = Es(this);
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return xs(r.slice(t, e));
}

function _s(t, e) {
    var s;
    const r = Es(this);
    const i = r.reduce(((e, s, r) => t(e, bs(s), r, this)), e);
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return bs(i);
}

function zs(t, e) {
    var s;
    const r = Es(this);
    const i = r.reduceRight(((e, s, r) => t(e, bs(s), r, this)), e);
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return bs(i);
}

const Ws = {
    get(t, e, s) {
        if (e === ws) return t;
        const r = hs();
        if (!os || ys(e) || null == r) return ds(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return tr;

          case "delete":
            return er;

          case "forEach":
            return Gs;

          case "add":
            if (t instanceof Set) return Ys;
            break;

          case "get":
            if (t instanceof Map) return Js;
            break;

          case "set":
            if (t instanceof Map) return Xs;
            break;

          case "has":
            return Zs;

          case "keys":
            return sr;

          case "values":
            return rr;

          case "entries":
            return ir;

          case Symbol.iterator:
            return t instanceof Map ? ir : rr;
        }
        return bs(ds(t, e, s));
    }
};

function Gs(t, e) {
    var s;
    const r = Es(this);
    null === (s = hs()) || void 0 === s ? void 0 : s.observeCollection(r);
    return r.forEach(((s, r) => {
        t.call(e, bs(s), bs(r), this);
    }));
}

function Zs(t) {
    var e;
    const s = Es(this);
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return s.has(As(t));
}

function Js(t) {
    var e;
    const s = Es(this);
    null === (e = hs()) || void 0 === e ? void 0 : e.observeCollection(s);
    return bs(s.get(As(t)));
}

function Xs(t, e) {
    return bs(Es(this).set(As(t), As(e)));
}

function Ys(t) {
    return bs(Es(this).add(As(t)));
}

function tr() {
    return bs(Es(this).clear());
}

function er(t) {
    return bs(Es(this).delete(As(t)));
}

function sr() {
    var t;
    const e = Es(this);
    null === (t = hs()) || void 0 === t ? void 0 : t.observeCollection(e);
    const s = e.keys();
    return {
        next() {
            const t = s.next();
            const e = t.value;
            const r = t.done;
            return r ? {
                value: void 0,
                done: r
            } : {
                value: bs(e),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function rr() {
    var t;
    const e = Es(this);
    null === (t = hs()) || void 0 === t ? void 0 : t.observeCollection(e);
    const s = e.values();
    return {
        next() {
            const t = s.next();
            const e = t.value;
            const r = t.done;
            return r ? {
                value: void 0,
                done: r
            } : {
                value: bs(e),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function ir() {
    var t;
    const e = Es(this);
    null === (t = hs()) || void 0 === t ? void 0 : t.observeCollection(e);
    const s = e.entries();
    return {
        next() {
            const t = s.next();
            const e = t.value;
            const r = t.done;
            return r ? {
                value: void 0,
                done: r
            } : {
                value: [ bs(e[0]), bs(e[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const nr = Object.freeze({
    getProxy: xs,
    getRaw: Es,
    wrap: bs,
    unwrap: As,
    rawKey: ws
});

class ComputedObserver {
    constructor(t, e, s, r, i) {
        this.interceptor = this;
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.ir = false;
        this.D = false;
        this.o = t;
        this.get = e;
        this.set = s;
        this.up = r;
        this.oL = i;
    }
    static create(t, e, s, i, n) {
        const o = s.get;
        const u = s.set;
        const c = new ComputedObserver(t, o, u, n, i);
        const h = () => c.getValue();
        h.getObserver = () => c;
        r(t, e, {
            enumerable: s.enumerable,
            configurable: true,
            get: h,
            set: t => {
                c.setValue(t, 0);
            }
        });
        return c;
    }
    getValue() {
        if (0 === this.subs.count) return this.get.call(this.o, this);
        if (this.D) {
            this.compute();
            this.D = false;
        }
        return this.v;
    }
    setValue(t, e) {
        if (i(this.set)) {
            if (t !== this.v) {
                this.ir = true;
                this.set.call(this.o, t);
                this.ir = false;
                this.run();
            }
        } else throw new Error(`AUR0221`);
    }
    handleChange() {
        this.D = true;
        if (this.subs.count > 0) this.run();
    }
    handleCollectionChange() {
        this.D = true;
        if (this.subs.count > 0) this.run();
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.compute();
            this.D = false;
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) {
            this.D = true;
            this.obs.clearAll();
        }
    }
    flush() {
        or = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, or, 0);
    }
    run() {
        if (this.ir) return;
        const t = this.v;
        const e = this.compute();
        this.D = false;
        if (!Object.is(e, t)) {
            this.ov = t;
            this.queue.add(this);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            as(this);
            return this.v = As(this.get.call(this.up ? bs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            ls(this);
        }
    }
}

ee(ComputedObserver);

F(ComputedObserver);

H(ComputedObserver);

let or;

const ur = t.DI.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const cr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const hr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (cr.disabled) return;
            if (++this.C < cr.timeoutsPerCheck) return;
            this.C = 0;
            const t = this.tracked;
            const e = t.length;
            let s;
            let r = 0;
            for (;r < e; ++r) {
                s = t[r];
                if (s.isDirty()) this.queue.add(s);
            }
        };
    }
    createProperty(t, e) {
        if (cr.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, hr);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.O.cancel();
            this.O = null;
        }
    }
}

DirtyChecker.inject = [ t.IPlatform ];

H(DirtyChecker);

class DirtyCheckProperty {
    constructor(t, e, s) {
        this.obj = e;
        this.key = s;
        this.type = 0;
        this.ov = void 0;
        this.$ = t;
    }
    getValue() {
        return this.obj[this.key];
    }
    setValue(t, e) {
        throw new Error(`Trying to set value for property ${this.key} in dirty checker`);
    }
    isDirty() {
        return this.ov !== this.obj[this.key];
    }
    flush() {
        const t = this.ov;
        const e = this.getValue();
        this.ov = e;
        this.subs.notify(e, t, 0);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) {
            this.ov = this.obj[this.key];
            this.$.addProperty(this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.$.removeProperty(this);
    }
}

F(DirtyCheckProperty);

class PrimitiveObserver {
    constructor(t, e) {
        this.type = 0;
        this.o = t;
        this.k = e;
    }
    get doNotCache() {
        return true;
    }
    getValue() {
        return this.o[this.k];
    }
    setValue() {}
    subscribe() {}
    unsubscribe() {}
}

class PropertyAccessor {
    constructor() {
        this.type = 0;
    }
    getValue(t, e) {
        return t[e];
    }
    setValue(t, e, s, r) {
        s[r] = t;
    }
}

let ar;

class SetterObserver {
    constructor(t, e) {
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.iO = false;
        this.f = 0;
        this.o = t;
        this.k = e;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        if (this.iO) {
            if (Object.is(t, this.v)) return;
            this.ov = this.v;
            this.v = t;
            this.f = e;
            this.queue.add(this);
        } else this.o[this.k] = t;
    }
    subscribe(t) {
        if (false === this.iO) this.start();
        this.subs.add(t);
    }
    flush() {
        ar = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ar, this.f);
    }
    start() {
        if (false === this.iO) {
            this.iO = true;
            this.v = this.o[this.k];
            r(this.o, this.k, {
                enumerable: true,
                configurable: true,
                get: () => this.getValue(),
                set: t => {
                    this.setValue(t, 0);
                }
            });
        }
        return this;
    }
    stop() {
        if (this.iO) {
            r(this.o, this.k, {
                enumerable: true,
                configurable: true,
                writable: true,
                value: this.v
            });
            this.iO = false;
        }
        return this;
    }
}

class SetterNotifier {
    constructor(t, e, s, r) {
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        this.o = t;
        this.S = s;
        this.hs = i(s);
        const n = t[e];
        this.cb = i(n) ? n : void 0;
        this.v = r;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        var s;
        if (this.hs) t = this.S(t, null);
        if (!Object.is(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.f = e;
            null === (s = this.cb) || void 0 === s ? void 0 : s.call(this.o, this.v, this.ov, e);
            this.queue.add(this);
        }
    }
    flush() {
        ar = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, ar, this.f);
    }
}

F(SetterObserver);

F(SetterNotifier);

H(SetterObserver);

H(SetterNotifier);

const lr = new PropertyAccessor;

const fr = t.DI.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const dr = t.DI.createInterface("INodeObserverLocator", (e => e.cachedCallback((e => {
    e.getAll(t.ILogger).forEach((t => {
        t.error("Using default INodeObserverLocator implementation. Will not be able to observe nodes (HTML etc...).");
    }));
    return new DefaultNodeObserverLocator;
}))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return lr;
    }
    getAccessor() {
        return lr;
    }
}

class ObserverLocator {
    constructor(t, e) {
        this.$ = t;
        this.B = e;
        this.L = [];
    }
    addAdapter(t) {
        this.L.push(t);
    }
    getObserver(t, e) {
        var s, r;
        return null !== (r = null === (s = t.$observers) || void 0 === s ? void 0 : s[e]) && void 0 !== r ? r : this.R(t, e, this.createObserver(t, e));
    }
    getAccessor(t, e) {
        var s;
        const r = null === (s = t.$observers) || void 0 === s ? void 0 : s[e];
        if (void 0 !== r) return r;
        if (this.B.handles(t, e, this)) return this.B.getAccessor(t, e, this);
        return lr;
    }
    getArrayObserver(t) {
        return wt(t);
    }
    getMapObserver(t) {
        return Qt(t);
    }
    getSetObserver(t) {
        return Rt(t);
    }
    createObserver(e, r) {
        var i, n, o, u;
        if (!(e instanceof Object)) return new PrimitiveObserver(e, r);
        if (this.B.handles(e, r, this)) return this.B.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (e instanceof Array) return wt(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Qt(e).getLengthObserver(); else if (e instanceof Set) return Rt(e).getLengthObserver();
            break;

          default:
            if (e instanceof Array && t.isArrayIndex(r)) return wt(e).getIndexObserver(Number(r));
            break;
        }
        let c = gr(e, r);
        if (void 0 === c) {
            let t = vr(e);
            while (null !== t) {
                c = gr(t, r);
                if (void 0 === c) t = vr(t); else break;
            }
        }
        if (void 0 !== c && !s.call(c, "value")) {
            let t = this.P(e, r, c);
            if (null == t) t = null === (u = null !== (n = null === (i = c.get) || void 0 === i ? void 0 : i.getObserver) && void 0 !== n ? n : null === (o = c.set) || void 0 === o ? void 0 : o.getObserver) || void 0 === u ? void 0 : u(e, this);
            return null == t ? c.configurable ? ComputedObserver.create(e, r, c, this, true) : this.$.createProperty(e, r) : t;
        }
        return new SetterObserver(e, r);
    }
    P(t, e, s) {
        if (this.L.length > 0) for (const r of this.L) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
    R(t, e, s) {
        if (true === s.doNotCache) return s;
        if (void 0 === t.$observers) {
            r(t, "$observers", {
                value: {
                    [e]: s
                }
            });
            return s;
        }
        return t.$observers[e] = s;
    }
}

ObserverLocator.inject = [ ur, dr ];

function pr(t) {
    let e;
    if (t instanceof Array) e = wt(t); else if (t instanceof Map) e = Qt(t); else if (t instanceof Set) e = Rt(t);
    return e;
}

const vr = Object.getPrototypeOf;

const gr = Object.getOwnPropertyDescriptor;

const wr = t.DI.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ fr ];
    }
    run(t) {
        const e = new Effect(this.oL, t);
        e.run();
        return e;
    }
}

class Effect {
    constructor(t, e) {
        this.oL = t;
        this.fn = e;
        this.interceptor = this;
        this.maxRunCount = 10;
        this.queued = false;
        this.running = false;
        this.runCount = 0;
        this.stopped = false;
    }
    handleChange() {
        this.queued = true;
        this.run();
    }
    handleCollectionChange() {
        this.queued = true;
        this.run();
    }
    run() {
        if (this.stopped) throw new Error(`AUR0225`);
        if (this.running) return;
        ++this.runCount;
        this.running = true;
        this.queued = false;
        ++this.obs.version;
        try {
            as(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            ls(this);
        }
        if (this.queued) {
            if (this.runCount > this.maxRunCount) {
                this.runCount = 0;
                throw new Error(`AUR0226`);
            }
            this.run();
        } else this.runCount = 0;
    }
    stop() {
        this.stopped = true;
        this.obs.clearAll();
    }
}

ee(Effect);

function br(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const xr = {};

function Er(t, e, s) {
    if (null == e) return (e, s, r) => i(e, s, r, t);
    return i(t, e, s);
    function i(t, e, s, i) {
        var n;
        const o = void 0 === e;
        i = "object" !== typeof i ? {
            name: i
        } : i || {};
        if (o) e = i.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const u = i.callback || `${String(e)}Changed`;
        let c = xr;
        if (s) {
            delete s.value;
            delete s.writable;
            c = null === (n = s.initializer) || void 0 === n ? void 0 : n.call(s);
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const h = i.set;
        s.get = function t() {
            var s;
            const r = Ar(this, e, u, c, h);
            null === (s = hs()) || void 0 === s ? void 0 : s.subscribeTo(r);
            return r.getValue();
        };
        s.set = function t(s) {
            Ar(this, e, u, c, h).setValue(s, 0);
        };
        s.get.getObserver = function t(s) {
            return Ar(s, e, u, c, h);
        };
        if (o) r(t.prototype, e, s); else return s;
    }
}

function Ar(t, e, s, r, i) {
    const n = br(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === xr ? void 0 : r);
        n[e] = o;
    }
    return o;
}

exports.AccessKeyedExpression = AccessKeyedExpression;

exports.AccessMemberExpression = AccessMemberExpression;

exports.AccessScopeExpression = AccessScopeExpression;

exports.AccessThisExpression = AccessThisExpression;

exports.ArrayBindingPattern = ArrayBindingPattern;

exports.ArrayIndexObserver = ArrayIndexObserver;

exports.ArrayLiteralExpression = ArrayLiteralExpression;

exports.ArrayObserver = ArrayObserver;

exports.AssignExpression = AssignExpression;

exports.BinaryExpression = BinaryExpression;

exports.BindingBehavior = y;

exports.BindingBehaviorDefinition = BindingBehaviorDefinition;

exports.BindingBehaviorExpression = BindingBehaviorExpression;

exports.BindingBehaviorFactory = BindingBehaviorFactory;

exports.BindingContext = BindingContext;

exports.BindingIdentifier = BindingIdentifier;

exports.BindingInterceptor = BindingInterceptor;

exports.BindingMediator = BindingMediator;

exports.BindingObserverRecord = BindingObserverRecord;

exports.CallFunctionExpression = CallFunctionExpression;

exports.CallMemberExpression = CallMemberExpression;

exports.CallScopeExpression = CallScopeExpression;

exports.CollectionLengthObserver = CollectionLengthObserver;

exports.CollectionSizeObserver = CollectionSizeObserver;

exports.ComputedObserver = ComputedObserver;

exports.ConditionalExpression = ConditionalExpression;

exports.ConnectableSwitcher = fs;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = cr;

exports.FlushQueue = FlushQueue;

exports.ForOfStatement = ForOfStatement;

exports.HtmlLiteralExpression = HtmlLiteralExpression;

exports.ICoercionConfiguration = P;

exports.IDirtyChecker = ur;

exports.IExpressionParser = se;

exports.INodeObserverLocator = dr;

exports.IObservation = wr;

exports.IObserverLocator = fr;

exports.ISignaler = w;

exports.Interpolation = Interpolation;

exports.MapObserver = MapObserver;

exports.ObjectBindingPattern = ObjectBindingPattern;

exports.ObjectLiteralExpression = ObjectLiteralExpression;

exports.Observation = Observation;

exports.ObserverLocator = ObserverLocator;

exports.OverrideContext = OverrideContext;

exports.PrimitiveLiteralExpression = PrimitiveLiteralExpression;

exports.PrimitiveObserver = PrimitiveObserver;

exports.PropertyAccessor = PropertyAccessor;

exports.ProxyObservable = nr;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.ValueConverter = O;

exports.ValueConverterDefinition = ValueConverterDefinition;

exports.ValueConverterExpression = ValueConverterExpression;

exports.alias = v;

exports.applyMutationsToIndices = bt;

exports.bindingBehavior = b;

exports.cloneIndexMap = M;

exports.connectable = ee;

exports.copyIndexMap = j;

exports.createIndexMap = I;

exports.disableArrayObservation = gt;

exports.disableMapObservation = Ht;

exports.disableSetObservation = Lt;

exports.enableArrayObservation = vt;

exports.enableMapObservation = qt;

exports.enableSetObservation = Bt;

exports.getCollectionObserver = pr;

exports.isIndexMap = D;

exports.observable = Er;

exports.parseExpression = ye;

exports.registerAliases = g;

exports.subscriberCollection = F;

exports.synchronizeIndices = xt;

exports.valueConverter = m;

exports.withFlushQueue = H;
//# sourceMappingURL=index.cjs.map
