"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/metadata");

const r = Object.prototype.hasOwnProperty;

const s = Reflect.defineProperty;

const i = t => "function" === typeof t;

const n = t => "string" === typeof t;

function o(t, e, r) {
    s(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: r
    });
    return r;
}

function c(t, e, s, i = false) {
    if (i || !r.call(t, e)) o(t, e, s);
}

const u = () => Object.create(null);

const h = e.Metadata.getOwn;

const a = e.Metadata.hasOwn;

const l = e.Metadata.define;

const f = t.Protocol.annotation.keyFor;

const d = t.Protocol.resource.keyFor;

const p = t.Protocol.resource.appendTo;

function v(...t) {
    return function(e) {
        const r = f("aliases");
        const s = h(r, e);
        if (void 0 === s) l(r, t, e); else s.push(...t);
    };
}

function w(e, r, s, i) {
    for (let n = 0, o = e.length; n < o; ++n) t.Registration.aliasTo(s, r.keyFrom(e[n])).register(i);
}

Object.freeze({});

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) if (void 0 !== e) this[t] = e; else for (const e in t) if (r.call(t, e)) this[e] = t[e];
    }
    static create(t, e) {
        return new BindingContext(t, e);
    }
    static get(t, e, r, s) {
        var i, n;
        if (null == t) throw new Error(`AUR0203:${t}`);
        let o = t.overrideContext;
        let c = t;
        if (r > 0) {
            while (r > 0) {
                r--;
                c = c.parentScope;
                if (null == (null === c || void 0 === c ? void 0 : c.overrideContext)) return;
            }
            o = c.overrideContext;
            return e in o ? o : o.bindingContext;
        }
        while (!(null === c || void 0 === c ? void 0 : c.isBoundary) && null != o && !(e in o) && !(o.bindingContext && e in o.bindingContext)) {
            c = null !== (i = c.parentScope) && void 0 !== i ? i : null;
            o = null !== (n = null === c || void 0 === c ? void 0 : c.overrideContext) && void 0 !== n ? n : null;
        }
        if (o) return e in o ? o : o.bindingContext;
        return t.bindingContext || t.overrideContext;
    }
}

class Scope {
    constructor(t, e, r, s) {
        this.parentScope = t;
        this.bindingContext = e;
        this.overrideContext = r;
        this.isBoundary = s;
    }
    static create(t, e, r) {
        return new Scope(null, t, null == e ? OverrideContext.create(t) : e, null !== r && void 0 !== r ? r : false);
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

const g = t.DI.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = u();
    }
    dispatchSignal(t, e) {
        const r = this.signals[t];
        if (void 0 === r) return;
        let s;
        for (s of r.keys()) s.handleChange(void 0, void 0, e);
    }
    addSignalListener(t, e) {
        const r = this.signals;
        const s = r[t];
        if (void 0 === s) r[t] = new Set([ e ]); else s.add(e);
    }
    removeSignalListener(t, e) {
        const r = this.signals[t];
        if (r) r.delete(e);
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
    constructor(t, e, r, s, i) {
        this.Type = t;
        this.name = e;
        this.aliases = r;
        this.key = s;
        this.strategy = i;
    }
    static create(e, r) {
        let s;
        let i;
        if (n(e)) {
            s = e;
            i = {
                name: s
            };
        } else {
            s = e.name;
            i = e;
        }
        const o = Object.getPrototypeOf(r) === BindingInterceptor;
        return new BindingBehaviorDefinition(r, t.firstDefined(A(r, "name"), s), t.mergeArrays(A(r, "aliases"), i.aliases, r.aliases), y.keyFrom(s), t.fromAnnotationOrDefinitionOrTypeOrDefault("strategy", i, r, (() => o ? 2 : 1)));
    }
    register(e) {
        const {Type: r, key: s, aliases: i, strategy: n} = this;
        switch (n) {
          case 1:
            t.Registration.singleton(s, r).register(e);
            break;

          case 2:
            t.Registration.instance(s, new BindingBehaviorFactory(e, r)).register(e);
            break;
        }
        t.Registration.aliasTo(s, r).register(e);
        w(i, y, s, e);
    }
}

class BindingBehaviorFactory {
    constructor(e, r) {
        this.ctn = e;
        this.Type = r;
        this.deps = t.DI.getDependencies(r);
    }
    construct(t, e) {
        const r = this.ctn;
        const s = this.deps;
        switch (s.length) {
          case 0:
            return new this.Type(t, e);

          case 1:
            return new this.Type(r.get(s[0]), t, e);

          case 2:
            return new this.Type(r.get(s[0]), r.get(s[1]), t, e);

          default:
            return new this.Type(...s.map((t => r.get(t))), t, e);
        }
    }
}

class BindingInterceptor {
    constructor(t, e) {
        this.binding = t;
        this.expr = e;
        this.interceptor = this;
        let r;
        while (t.interceptor !== this) {
            r = t.interceptor;
            t.interceptor = this;
            t = r;
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
    handleChange(t, e, r) {
        this.binding.handleChange(t, e, r);
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
    s(BindingInterceptor.prototype, t, {
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
        const r = BindingBehaviorDefinition.create(t, e);
        l(E, r, r.Type);
        l(E, r, r);
        p(e, E);
        return r.Type;
    },
    getDefinition(t) {
        const e = h(E, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, r) {
        l(f(e), r, t);
    },
    getAnnotation: A
});

function m(t) {
    return function(e) {
        return O.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, r, s) {
        this.Type = t;
        this.name = e;
        this.aliases = r;
        this.key = s;
    }
    static create(e, r) {
        let s;
        let i;
        if (n(e)) {
            s = e;
            i = {
                name: s
            };
        } else {
            s = e.name;
            i = e;
        }
        return new ValueConverterDefinition(r, t.firstDefined(S(r, "name"), s), t.mergeArrays(S(r, "aliases"), i.aliases, r.aliases), O.keyFrom(s));
    }
    register(e) {
        const {Type: r, key: s, aliases: i} = this;
        t.Registration.singleton(s, r).register(e);
        t.Registration.aliasTo(s, r).register(e);
        w(i, O, s, e);
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
        const r = ValueConverterDefinition.create(t, e);
        l(U, r, r.Type);
        l(U, r, r);
        p(e, U);
        return r.Type;
    },
    getDefinition(t) {
        const e = h(U, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, r) {
        l(f(e), r, t);
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
    t[t["ArrowFunction"] = 17] = "ArrowFunction";
    t[t["ValueConverter"] = 36914] = "ValueConverter";
    t[t["BindingBehavior"] = 38963] = "BindingBehavior";
    t[t["HtmlLiteral"] = 52] = "HtmlLiteral";
    t[t["ArrayBindingPattern"] = 65557] = "ArrayBindingPattern";
    t[t["ObjectBindingPattern"] = 65558] = "ObjectBindingPattern";
    t[t["BindingIdentifier"] = 65559] = "BindingIdentifier";
    t[t["ForOfStatement"] = 6200] = "ForOfStatement";
    t[t["Interpolation"] = 25] = "Interpolation";
    t[t["ArrayDestructuring"] = 90138] = "ArrayDestructuring";
    t[t["ObjectDestructuring"] = 106523] = "ObjectDestructuring";
    t[t["DestructuringAssignmentLeaf"] = 139292] = "DestructuringAssignmentLeaf";
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
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            e[t].accept(this);
        }
        this.text += "]";
    }
    visitArrowFunction(t) {
        const e = t.args;
        const r = e.length;
        let s = 0;
        let i = "(";
        let n;
        for (;s < r; ++s) {
            n = e[s].name;
            if (s > 0) i += ", ";
            if (s < r - 1) i += n; else i += t.rest ? `...${n}` : n;
        }
        this.text += `${i}) => `;
        t.body.accept(this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const r = t.values;
        this.text += "{";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            r[t].accept(this);
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
        const {cooked: e, expressions: r} = t;
        const s = r.length;
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < s; t++) {
            r[t].accept(this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: r} = t;
        const s = r.length;
        t.func.accept(this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < s; t++) {
            r[t].accept(this);
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
        for (let t = 0, r = e.length; t < r; ++t) {
            this.text += ":";
            e[t].accept(this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        t.expression.accept(this);
        this.text += `&${t.name}`;
        for (let t = 0, r = e.length; t < r; ++t) {
            this.text += ":";
            e[t].accept(this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            e[t].accept(this);
        }
        this.text += "]";
    }
    visitObjectBindingPattern(t) {
        const e = t.keys;
        const r = t.values;
        this.text += "{";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            r[t].accept(this);
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
        const {parts: e, expressions: r} = t;
        const s = r.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < s; t++) {
            r[t].accept(this);
            this.text += e[t + 1];
        }
        this.text += "}";
    }
    visitDestructuringAssignmentExpression(t) {
        const e = t.$kind;
        const r = 106523 === e;
        this.text += r ? "{" : "[";
        const s = t.list;
        const i = s.length;
        let n;
        let o;
        for (n = 0; n < i; n++) {
            o = s[n];
            switch (o.$kind) {
              case 139292:
                o.accept(this);
                break;

              case 90138:
              case 106523:
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
        this.text += r ? "}" : "]";
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
        for (let e = 0, r = t.length; e < r; ++e) {
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
    evaluate(t, e, r, s) {
        return this.value;
    }
}

class BindingBehaviorExpression {
    constructor(t, e, r) {
        this.expression = t;
        this.name = e;
        this.args = r;
        this.behaviorKey = y.keyFrom(e);
    }
    get $kind() {
        return 38963;
    }
    get hasBind() {
        return true;
    }
    get hasUnbind() {
        return true;
    }
    evaluate(t, e, r, s) {
        return this.expression.evaluate(t, e, r, s);
    }
    assign(t, e, r, s) {
        return this.expression.assign(t, e, r, s);
    }
    bind(t, e, r) {
        if (this.expression.hasBind) this.expression.bind(t, e, r);
        const s = r.locator.get(this.behaviorKey);
        if (null == s) throw new Error(`AUR0101:${this.name}`);
        if (!(s instanceof BindingBehaviorFactory)) if (void 0 === r[this.behaviorKey]) {
            r[this.behaviorKey] = s;
            s.bind(t, e, r, ...this.args.map((s => s.evaluate(t, e, r.locator, null))));
        } else throw new Error(`AUR0102:${this.name}`);
    }
    unbind(t, e, r) {
        const s = this.behaviorKey;
        const n = r;
        if (void 0 !== n[s]) {
            if (i(n[s].unbind)) n[s].unbind(t, e, r);
            n[s] = void 0;
        }
        if (this.expression.hasUnbind) this.expression.unbind(t, e, r);
    }
    accept(t) {
        return t.visitBindingBehavior(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ValueConverterExpression {
    constructor(t, e, r) {
        this.expression = t;
        this.name = e;
        this.args = r;
        this.converterKey = O.keyFrom(e);
    }
    get $kind() {
        return 36914;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return true;
    }
    evaluate(t, e, r, s) {
        const i = r.get(this.converterKey);
        if (null == i) throw new Error(`AUR0103:${this.name}`);
        if (null !== s && "handleChange" in s) {
            const t = i.signals;
            if (null != t) {
                const e = r.get(g);
                for (let r = 0, i = t.length; r < i; ++r) e.addSignalListener(t[r], s);
            }
        }
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, r, s), ...this.args.map((i => i.evaluate(t, e, r, s))));
        return this.expression.evaluate(t, e, r, s);
    }
    assign(t, e, r, s) {
        const i = r.get(this.converterKey);
        if (null == i) throw new Error(`AUR0104:${this.name}`);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, r, null))));
        return this.expression.assign(t, e, r, s);
    }
    unbind(t, e, r) {
        const s = r.locator.get(this.converterKey);
        if (void 0 === s.signals) return;
        const i = r.locator.get(g);
        for (let t = 0; t < s.signals.length; ++t) i.removeSignalListener(s.signals[t], r);
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
    evaluate(t, e, r, s) {
        return this.target.assign(t, e, r, this.value.evaluate(t, e, r, s));
    }
    assign(t, e, r, s) {
        this.value.assign(t, e, r, s);
        return this.target.assign(t, e, r, s);
    }
    accept(t) {
        return t.visitAssign(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ConditionalExpression {
    constructor(t, e, r) {
        this.condition = t;
        this.yes = e;
        this.no = r;
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
    evaluate(t, e, r, s) {
        return this.condition.evaluate(t, e, r, s) ? this.yes.evaluate(t, e, r, s) : this.no.evaluate(t, e, r, s);
    }
    assign(t, e, r, s) {
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
    evaluate(t, e, r, s) {
        var i;
        let n = e.overrideContext;
        let o = e;
        let c = this.ancestor;
        while (c-- && n) {
            o = o.parentScope;
            n = null !== (i = null === o || void 0 === o ? void 0 : o.overrideContext) && void 0 !== i ? i : null;
        }
        return c < 1 && n ? n.bindingContext : void 0;
    }
    assign(t, e, r, s) {
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
    evaluate(t, e, r, s) {
        const i = BindingContext.get(e, this.name, this.ancestor, t);
        if (null !== s) s.observe(i, this.name);
        const n = i[this.name];
        if (null == n && "$host" === this.name) throw new Error(`AUR0105`);
        if (1 & t) return n;
        return null == n ? "" : n;
    }
    assign(t, e, r, s) {
        var i;
        if ("$host" === this.name) throw new Error(`AUR0106`);
        const n = BindingContext.get(e, this.name, this.ancestor, t);
        if (n instanceof Object) if (void 0 !== (null === (i = n.$observers) || void 0 === i ? void 0 : i[this.name])) {
            n.$observers[this.name].setValue(s, t);
            return s;
        } else return n[this.name] = s;
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
    constructor(t, e, r = false) {
        this.object = t;
        this.name = e;
        this.optional = r;
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
    evaluate(t, e, r, s) {
        const i = this.object.evaluate(t, e, r, (32 & t) > 0 ? null : s);
        if (1 & t) {
            if (null == i) return i;
            if (null !== s) s.observe(i, this.name);
            return i[this.name];
        }
        if (null !== s && i instanceof Object) s.observe(i, this.name);
        return i ? i[this.name] : "";
    }
    assign(t, e, r, s) {
        const i = this.object.evaluate(t, e, r, null);
        if (i instanceof Object) if (void 0 !== i.$observers && void 0 !== i.$observers[this.name]) i.$observers[this.name].setValue(s, t); else i[this.name] = s; else this.object.assign(t, e, r, {
            [this.name]: s
        });
        return s;
    }
    accept(t) {
        return t.visitAccessMember(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class AccessKeyedExpression {
    constructor(t, e, r = false) {
        this.object = t;
        this.key = e;
        this.optional = r;
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
    evaluate(t, e, r, s) {
        const i = this.object.evaluate(t, e, r, (32 & t) > 0 ? null : s);
        if (i instanceof Object) {
            const n = this.key.evaluate(t, e, r, (32 & t) > 0 ? null : s);
            if (null !== s) s.observe(i, n);
            return i[n];
        }
        return;
    }
    assign(t, e, r, s) {
        const i = this.object.evaluate(t, e, r, null);
        const n = this.key.evaluate(t, e, r, null);
        return i[n] = s;
    }
    accept(t) {
        return t.visitAccessKeyed(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class CallScopeExpression {
    constructor(t, e, r = 0, s = false) {
        this.name = t;
        this.args = e;
        this.ancestor = r;
        this.optional = s;
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
    evaluate(t, e, r, s) {
        const i = this.args.map((i => i.evaluate(t, e, r, s)));
        const n = BindingContext.get(e, this.name, this.ancestor, t);
        const o = k(t, n, this.name);
        if (o) return o.apply(n, i);
        return;
    }
    assign(t, e, r, s) {
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
    constructor(t, e, r, s = false, i = false) {
        this.object = t;
        this.name = e;
        this.args = r;
        this.optionalMember = s;
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
    evaluate(t, e, r, s) {
        const i = this.object.evaluate(t, e, r, (32 & t) > 0 ? null : s);
        const n = this.args.map((i => i.evaluate(t, e, r, s)));
        const o = k(t, i, this.name);
        if (o) return o.apply(i, n);
        return;
    }
    assign(t, e, r, s) {
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
    constructor(t, e, r = false) {
        this.func = t;
        this.args = e;
        this.optional = r;
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
    evaluate(t, e, r, s) {
        const n = this.func.evaluate(t, e, r, s);
        if (i(n)) return n(...this.args.map((i => i.evaluate(t, e, r, s))));
        if (!(8 & t) && null == n) return;
        throw new Error(`AUR0107`);
    }
    assign(t, e, r, s) {
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
    constructor(t, e, r) {
        this.operation = t;
        this.left = e;
        this.right = r;
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
    evaluate(e, r, s, n) {
        var o;
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(e, r, s, n) && this.right.evaluate(e, r, s, n);

          case "||":
            return this.left.evaluate(e, r, s, n) || this.right.evaluate(e, r, s, n);

          case "??":
            return null !== (o = this.left.evaluate(e, r, s, n)) && void 0 !== o ? o : this.right.evaluate(e, r, s, n);

          case "==":
            return this.left.evaluate(e, r, s, n) == this.right.evaluate(e, r, s, n);

          case "===":
            return this.left.evaluate(e, r, s, n) === this.right.evaluate(e, r, s, n);

          case "!=":
            return this.left.evaluate(e, r, s, n) != this.right.evaluate(e, r, s, n);

          case "!==":
            return this.left.evaluate(e, r, s, n) !== this.right.evaluate(e, r, s, n);

          case "instanceof":
            {
                const t = this.right.evaluate(e, r, s, n);
                if (i(t)) return this.left.evaluate(e, r, s, n) instanceof t;
                return false;
            }

          case "in":
            {
                const t = this.right.evaluate(e, r, s, n);
                if (t instanceof Object) return this.left.evaluate(e, r, s, n) in t;
                return false;
            }

          case "+":
            {
                const i = this.left.evaluate(e, r, s, n);
                const o = this.right.evaluate(e, r, s, n);
                if ((1 & e) > 0) return i + o;
                if (!i || !o) {
                    if (t.isNumberOrBigInt(i) || t.isNumberOrBigInt(o)) return (i || 0) + (o || 0);
                    if (t.isStringOrDate(i) || t.isStringOrDate(o)) return (i || "") + (o || "");
                }
                return i + o;
            }

          case "-":
            return this.left.evaluate(e, r, s, n) - this.right.evaluate(e, r, s, n);

          case "*":
            return this.left.evaluate(e, r, s, n) * this.right.evaluate(e, r, s, n);

          case "/":
            return this.left.evaluate(e, r, s, n) / this.right.evaluate(e, r, s, n);

          case "%":
            return this.left.evaluate(e, r, s, n) % this.right.evaluate(e, r, s, n);

          case "<":
            return this.left.evaluate(e, r, s, n) < this.right.evaluate(e, r, s, n);

          case ">":
            return this.left.evaluate(e, r, s, n) > this.right.evaluate(e, r, s, n);

          case "<=":
            return this.left.evaluate(e, r, s, n) <= this.right.evaluate(e, r, s, n);

          case ">=":
            return this.left.evaluate(e, r, s, n) >= this.right.evaluate(e, r, s, n);

          default:
            throw new Error(`AUR0108:${this.operation}`);
        }
    }
    assign(t, e, r, s) {
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
    evaluate(t, e, r, s) {
        switch (this.operation) {
          case "void":
            return void this.expression.evaluate(t, e, r, s);

          case "typeof":
            return typeof this.expression.evaluate(1 | t, e, r, s);

          case "!":
            return !this.expression.evaluate(t, e, r, s);

          case "-":
            return -this.expression.evaluate(t, e, r, s);

          case "+":
            return +this.expression.evaluate(t, e, r, s);

          default:
            throw new Error(`AUR0109:${this.operation}`);
        }
    }
    assign(t, e, r, s) {
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
    evaluate(t, e, r, s) {
        return this.value;
    }
    assign(t, e, r, s) {
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
        return 52;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        let i = "";
        for (let n = 0; n < this.parts.length; ++n) {
            const o = this.parts[n].evaluate(t, e, r, s);
            if (null == o) continue;
            i += o;
        }
        return i;
    }
    assign(t, e, r, s, i) {
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
    evaluate(t, e, r, s) {
        return this.elements.map((i => i.evaluate(t, e, r, s)));
    }
    assign(t, e, r, s) {
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
    evaluate(t, e, r, s) {
        const i = {};
        for (let n = 0; n < this.keys.length; ++n) i[this.keys[n]] = this.values[n].evaluate(t, e, r, s);
        return i;
    }
    assign(t, e, r, s) {
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
    constructor(e, r = t.emptyArray) {
        this.cooked = e;
        this.expressions = r;
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
    evaluate(t, e, r, s) {
        let i = this.cooked[0];
        for (let n = 0; n < this.expressions.length; ++n) {
            i += String(this.expressions[n].evaluate(t, e, r, s));
            i += this.cooked[n + 1];
        }
        return i;
    }
    assign(t, e, r, s) {
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
    constructor(e, r, s, i = t.emptyArray) {
        this.cooked = e;
        this.func = s;
        this.expressions = i;
        e.raw = r;
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
    evaluate(t, e, r, s) {
        const n = this.expressions.map((i => i.evaluate(t, e, r, s)));
        const o = this.func.evaluate(t, e, r, s);
        if (!i(o)) throw new Error(`AUR0110`);
        return o(this.cooked, ...n);
    }
    assign(t, e, r, s) {
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
        return 65557;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        return;
    }
    assign(t, e, r, s) {
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
        return 65558;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        return;
    }
    assign(t, e, r, s) {
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
        return 65559;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
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
        return 6200;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        return this.iterable.evaluate(t, e, r, s);
    }
    assign(t, e, r, s) {
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
    iterate(t, e, r) {
        switch (C.call(e)) {
          case "[object Array]":
            return $(e, r);

          case "[object Map]":
            return B(e, r);

          case "[object Set]":
            return L(e, r);

          case "[object Number]":
            return R(e, r);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${C.call(e)}`);
        }
    }
    bind(t, e, r) {
        if (this.iterable.hasBind) this.iterable.bind(t, e, r);
    }
    unbind(t, e, r) {
        if (this.iterable.hasUnbind) this.iterable.unbind(t, e, r);
    }
    accept(t) {
        return t.visitForOfStatement(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class Interpolation {
    constructor(e, r = t.emptyArray) {
        this.parts = e;
        this.expressions = r;
        this.isMulti = r.length > 1;
        this.firstExpression = r[0];
    }
    get $kind() {
        return 25;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        if (this.isMulti) {
            let i = this.parts[0];
            for (let n = 0; n < this.expressions.length; ++n) {
                i += String(this.expressions[n].evaluate(t, e, r, s));
                i += this.parts[n + 1];
            }
            return i;
        } else return `${this.parts[0]}${this.firstExpression.evaluate(t, e, r, s)}${this.parts[1]}`;
    }
    assign(t, e, r, s) {
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
    constructor(t, e, r, s) {
        this.$kind = t;
        this.list = e;
        this.source = r;
        this.initializer = s;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        return;
    }
    assign(t, e, r, s) {
        var i;
        const n = this.list;
        const o = n.length;
        let c;
        let u;
        for (c = 0; c < o; c++) {
            u = n[c];
            switch (u.$kind) {
              case 139292:
                u.assign(t, e, r, s);
                break;

              case 90138:
              case 106523:
                {
                    if ("object" !== typeof s || null === s) throw new Error(`AUR0112`);
                    let n = u.source.evaluate(t, Scope.create(s), r, null);
                    if (void 0 === n) n = null === (i = u.initializer) || void 0 === i ? void 0 : i.evaluate(t, e, r, null);
                    u.assign(t, e, r, n);
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
    constructor(t, e, r) {
        this.target = t;
        this.source = e;
        this.initializer = r;
    }
    get $kind() {
        return 139292;
    }
    evaluate(t, e, r, s) {
        return;
    }
    assign(t, e, r, s) {
        var i;
        if (null == s) return;
        if ("object" !== typeof s) throw new Error(`AUR0112`);
        let n = this.source.evaluate(t, Scope.create(s), r, null);
        if (void 0 === n) n = null === (i = this.initializer) || void 0 === i ? void 0 : i.evaluate(t, e, r, null);
        this.target.assign(t, e, r, n);
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
        return 139292;
    }
    evaluate(t, e, r, s) {
        return;
    }
    assign(e, r, s, i) {
        if (null == i) return;
        if ("object" !== typeof i) throw new Error(`AUR0112`);
        const n = this.indexOrProperties;
        let o;
        if (t.isArrayIndex(n)) {
            if (!Array.isArray(i)) throw new Error(`AUR0112`);
            o = i.slice(n);
        } else o = Object.entries(i).reduce(((t, [e, r]) => {
            if (!n.includes(e)) t[e] = r;
            return t;
        }), {});
        this.target.assign(e, r, s, o);
    }
    accept(t) {
        return t.visitDestructuringAssignmentRestExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ArrowFunction {
    constructor(t, e, r = false) {
        this.args = t;
        this.body = e;
        this.rest = r;
    }
    get $kind() {
        return 17;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, r, s) {
        const i = (...i) => {
            const n = this.args;
            const o = this.rest;
            const c = n.length - 1;
            const u = n.reduce(((t, e, r) => {
                if (o && r === c) t[e.name] = i.slice(r); else t[e.name] = i[r];
                return t;
            }), {});
            const h = Scope.fromParent(e, u);
            return this.body.evaluate(t, h, r, s);
        };
        return i;
    }
    assign(t, e, r, s) {
        return;
    }
    accept(t) {
        return t.visitArrowFunction(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

function k(t, e, r) {
    const s = null == e ? null : e[r];
    if (i(s)) return s;
    if (!(8 & t) && null == s) return null;
    throw new Error(`AUR0111:${r}`);
}

function $(t, e) {
    for (let r = 0, s = t.length; r < s; ++r) e(t, r, t[r]);
}

function B(t, e) {
    const r = Array(t.size);
    let s = -1;
    for (const e of t.entries()) r[++s] = e;
    $(r, e);
}

function L(t, e) {
    const r = Array(t.size);
    let s = -1;
    for (const e of t.keys()) r[++s] = e;
    $(r, e);
}

function R(t, e) {
    const r = Array(t);
    for (let e = 0; e < t; ++e) r[e] = e;
    $(r, e);
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
    const {length: r} = t;
    const s = Array(r);
    let i = 0;
    while (i < r) {
        s[i] = t[i];
        ++i;
    }
    if (void 0 !== e) s.deletedItems = e.slice(0); else if (void 0 !== t.deletedItems) s.deletedItems = t.deletedItems.slice(0); else s.deletedItems = [];
    s.isIndexMap = true;
    return s;
}

function I(t = 0) {
    const e = Array(t);
    let r = 0;
    while (r < t) e[r] = r++;
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function D(t) {
    const e = t.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function M(t) {
    return t instanceof Array && true === t.isIndexMap;
}

function F(t) {
    return null == t ? V : V(t);
}

function V(t) {
    const e = t.prototype;
    s(e, "subs", {
        get: N
    });
    c(e, "subscribe", K);
    c(e, "unsubscribe", q);
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
            const r = e.length;
            let s = 0;
            for (;s < r; ++s) if (e[s] === t) return true;
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
            const r = e.length;
            let s = 0;
            for (;s < r; ++s) if (e[s] === t) {
                e.splice(s, 1);
                if (1 === r) this.sf = 8 ^ (8 | this.sf);
                --this.count;
                return true;
            }
        }
        return false;
    }
    notify(t, e, r) {
        const s = this.s0;
        const i = this.s1;
        const n = this.s2;
        let o = this.sr;
        if (void 0 !== o) o = o.slice();
        if (void 0 !== s) s.handleChange(t, e, r);
        if (void 0 !== i) i.handleChange(t, e, r);
        if (void 0 !== n) n.handleChange(t, e, r);
        if (void 0 !== o) {
            const s = o.length;
            let i;
            let n = 0;
            for (;n < s; ++n) {
                i = o[n];
                if (void 0 !== i) i.handleChange(t, e, r);
            }
        }
    }
    notifyCollection(t, e) {
        const r = this.s0;
        const s = this.s1;
        const i = this.s2;
        let n = this.sr;
        if (void 0 !== n) n = n.slice();
        if (void 0 !== r) r.handleCollectionChange(t, e);
        if (void 0 !== s) s.handleCollectionChange(t, e);
        if (void 0 !== i) i.handleCollectionChange(t, e);
        if (void 0 !== n) {
            const r = n.length;
            let s;
            let i = 0;
            for (;i < r; ++i) {
                s = n[i];
                if (void 0 !== s) s.handleCollectionChange(t, e);
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
    s(e, "queue", {
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

function z(t, e, r) {
    r.delete(t);
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
    setValue(e, r) {
        const s = this.v;
        if (e !== s && t.isArrayIndex(e)) {
            if (0 === (64 & r)) this.o.length = e;
            this.v = e;
            this.u = s;
            this.f = r;
            this.queue.add(this);
        }
    }
    handleCollectionChange(t, e) {
        const r = this.v;
        const s = this.o.length;
        if ((this.v = s) !== r) {
            this.u = r;
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
        const r = this.v;
        const s = this.o.size;
        if ((this.v = s) !== r) {
            this.u = r;
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
    c(e, "subscribe", G, true);
    c(e, "unsubscribe", Z, true);
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

function et(t, e, r, s, i) {
    let n, o, c, u, h;
    let a, l;
    for (a = r + 1; a < s; a++) {
        n = t[a];
        o = e[a];
        for (l = a - 1; l >= r; l--) {
            c = t[l];
            u = e[l];
            h = i(c, n);
            if (h > 0) {
                t[l + 1] = c;
                e[l + 1] = u;
            } else break;
        }
        t[l + 1] = n;
        e[l + 1] = o;
    }
}

function rt(t, e, r, s, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let d, p, v;
    let w, g;
    let b, x, E, A;
    let y, m, U, S;
    while (true) {
        if (s - r <= 10) {
            et(t, e, r, s, i);
            return;
        }
        n = r + (s - r >> 1);
        c = t[r];
        a = e[r];
        u = t[s - 1];
        l = e[s - 1];
        h = t[n];
        f = e[n];
        d = i(c, u);
        if (d > 0) {
            w = c;
            g = a;
            c = u;
            a = l;
            u = w;
            l = g;
        }
        p = i(c, h);
        if (p >= 0) {
            w = c;
            g = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = w;
            l = g;
        } else {
            v = i(u, h);
            if (v > 0) {
                w = u;
                g = l;
                u = h;
                l = f;
                h = w;
                f = g;
            }
        }
        t[r] = c;
        e[r] = a;
        t[s - 1] = h;
        e[s - 1] = f;
        b = u;
        x = l;
        E = r + 1;
        A = s - 1;
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
        if (s - A < E - r) {
            rt(t, e, A, s, i);
            s = E;
        } else {
            rt(t, e, r, E, i);
            r = A;
        }
    }
}

const st = Array.prototype;

const it = st.push;

const nt = st.unshift;

const ot = st.pop;

const ct = st.shift;

const ut = st.splice;

const ht = st.reverse;

const at = st.sort;

const lt = {
    push: it,
    unshift: nt,
    pop: ot,
    shift: ct,
    splice: ut,
    reverse: ht,
    sort: at
};

const ft = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const dt = {
    push: function(...t) {
        const e = X.get(this);
        if (void 0 === e) return it.apply(this, t);
        const r = this.length;
        const s = t.length;
        if (0 === s) return r;
        this.length = e.indexMap.length = r + s;
        let i = r;
        while (i < this.length) {
            this[i] = t[i - r];
            e.indexMap[i] = -2;
            i++;
        }
        e.notify();
        return this.length;
    },
    unshift: function(...t) {
        const e = X.get(this);
        if (void 0 === e) return nt.apply(this, t);
        const r = t.length;
        const s = new Array(r);
        let i = 0;
        while (i < r) s[i++] = -2;
        nt.apply(e.indexMap, s);
        const n = nt.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = X.get(this);
        if (void 0 === t) return ot.call(this);
        const e = t.indexMap;
        const r = ot.call(this);
        const s = e.length - 1;
        if (e[s] > -1) e.deletedItems.push(e[s]);
        ot.call(e);
        t.notify();
        return r;
    },
    shift: function() {
        const t = X.get(this);
        if (void 0 === t) return ct.call(this);
        const e = t.indexMap;
        const r = ct.call(this);
        if (e[0] > -1) e.deletedItems.push(e[0]);
        ct.call(e);
        t.notify();
        return r;
    },
    splice: function(...t) {
        const e = t[0];
        const r = t[1];
        const s = X.get(this);
        if (void 0 === s) return ut.apply(this, t);
        const i = this.length;
        const n = 0 | e;
        const o = n < 0 ? Math.max(i + n, 0) : Math.min(n, i);
        const c = s.indexMap;
        const u = t.length;
        const h = 0 === u ? 0 : 1 === u ? i - o : r;
        if (h > 0) {
            let t = o;
            const e = t + h;
            while (t < e) {
                if (c[t] > -1) c.deletedItems.push(c[t]);
                t++;
            }
        }
        if (u > 2) {
            const t = u - 2;
            const s = new Array(t);
            let i = 0;
            while (i < t) s[i++] = -2;
            ut.call(c, e, r, ...s);
        } else ut.apply(c, t);
        const a = ut.apply(this, t);
        s.notify();
        return a;
    },
    reverse: function() {
        const t = X.get(this);
        if (void 0 === t) {
            ht.call(this);
            return this;
        }
        const e = this.length;
        const r = e / 2 | 0;
        let s = 0;
        while (s !== r) {
            const r = e - s - 1;
            const i = this[s];
            const n = t.indexMap[s];
            const o = this[r];
            const c = t.indexMap[r];
            this[s] = o;
            t.indexMap[s] = c;
            this[r] = i;
            t.indexMap[r] = n;
            s++;
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
        const r = this.length;
        if (r < 2) return this;
        rt(this, e.indexMap, 0, r, tt);
        let s = 0;
        while (s < r) {
            if (void 0 === this[s]) break;
            s++;
        }
        if (void 0 === t || !i(t)) t = Y;
        rt(this, e.indexMap, 0, s, t);
        e.notify();
        return this;
    }
};

for (const t of ft) s(dt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let pt = false;

function vt() {
    for (const t of ft) if (true !== st[t].observing) o(st, t, dt[t]);
}

function wt() {
    for (const t of ft) if (true === st[t].observing) o(st, t, lt[t]);
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
        var r;
        return null !== (e = (r = this.indexObservers)[t]) && void 0 !== e ? e : r[t] = new ArrayIndexObserver(this, t);
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
        const r = this.owner;
        const s = this.index;
        const i = r.indexMap;
        if (i[s] > -1) i.deletedItems.push(i[s]);
        i[s] = -2;
        r.collection[s] = t;
        r.notify();
    }
    handleCollectionChange(t, e) {
        const r = this.index;
        const s = t[r] === r;
        if (s) return;
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

function gt(t) {
    let e = X.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

function bt(t) {
    let e = 0;
    let r = 0;
    let s = 0;
    const i = D(t);
    const n = i.length;
    for (;s < n; ++s) {
        while (i.deletedItems[r] <= s - e) {
            ++r;
            --e;
        }
        if (-2 === i[s]) ++e; else i[s] += e;
    }
    return i;
}

function xt(t, e) {
    const r = t.slice();
    const s = e.length;
    let i = 0;
    let n = 0;
    while (i < s) {
        n = e[i];
        if (-2 !== n) t[i] = r[n];
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
        const r = this.size;
        yt.call(this, t);
        const s = this.size;
        if (s === r) return this;
        e.indexMap[r] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Et.get(this);
        if (void 0 === t) return mt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let r = 0;
            for (const t of this.keys()) {
                if (e[r] > -1) e.deletedItems.push(e[r]);
                r++;
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
        const r = this.size;
        if (0 === r) return false;
        let s = 0;
        const i = e.indexMap;
        for (const r of this.keys()) {
            if (r === t) {
                if (i[s] > -1) i.deletedItems.push(i[s]);
                i.splice(s, 1);
                const r = Ut.call(this, t);
                if (true === r) e.notify();
                return r;
            }
            s++;
        }
        return false;
    }
};

const kt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ot) s(Ct[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let $t = false;

function Bt() {
    for (const t of Ot) if (true !== At[t].observing) s(At, t, {
        ...kt,
        value: Ct[t]
    });
}

function Lt() {
    for (const t of Ot) if (true === At[t].observing) s(At, t, {
        ...kt,
        value: St[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!$t) {
            $t = true;
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

const Dt = Tt.delete;

const Mt = {
    set: jt,
    clear: It,
    delete: Dt
};

const Ft = [ "set", "clear", "delete" ];

const Vt = {
    set: function(t, e) {
        const r = Pt.get(this);
        if (void 0 === r) {
            jt.call(this, t, e);
            return this;
        }
        const s = this.get(t);
        const i = this.size;
        jt.call(this, t, e);
        const n = this.size;
        if (n === i) {
            let e = 0;
            for (const i of this.entries()) {
                if (i[0] === t) {
                    if (i[1] !== s) {
                        r.indexMap.deletedItems.push(r.indexMap[e]);
                        r.indexMap[e] = -2;
                        r.notify();
                    }
                    return this;
                }
                e++;
            }
            return this;
        }
        r.indexMap[i] = -2;
        r.notify();
        return this;
    },
    clear: function() {
        const t = Pt.get(this);
        if (void 0 === t) return It.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let r = 0;
            for (const t of this.keys()) {
                if (e[r] > -1) e.deletedItems.push(e[r]);
                r++;
            }
            It.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Pt.get(this);
        if (void 0 === e) return Dt.call(this, t);
        const r = this.size;
        if (0 === r) return false;
        let s = 0;
        const i = e.indexMap;
        for (const r of this.keys()) {
            if (r === t) {
                if (i[s] > -1) i.deletedItems.push(i[s]);
                i.splice(s, 1);
                const r = Dt.call(this, t);
                if (true === r) e.notify();
                return r;
            }
            ++s;
        }
        return false;
    }
};

const Nt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ft) s(Vt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Kt = false;

function qt() {
    for (const t of Ft) if (true !== Tt[t].observing) s(Tt, t, {
        ...Nt,
        value: Vt[t]
    });
}

function Ht() {
    for (const t of Ft) if (true === Tt[t].observing) s(Tt, t, {
        ...Nt,
        value: Mt[t]
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
    const r = this.oL.getObserver(t, e);
    this.obs.add(r);
}

function zt() {
    return o(this, "obs", new BindingObserverRecord(this));
}

function Wt(t) {
    let e;
    if (t instanceof Array) e = gt(t); else if (t instanceof Set) e = Rt(t); else if (t instanceof Map) e = Qt(t); else throw new Error(`AUR0210`);
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
    handleChange(t, e, r) {
        return this.b.interceptor.handleChange(t, e, r);
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
    c(e, "observe", _t, true);
    c(e, "observeCollection", Wt, true);
    c(e, "subscribeTo", Gt, true);
    s(e, "obs", {
        get: zt
    });
    c(e, "handleChange", Zt);
    c(e, "handleCollectionChange", Jt);
    return t;
}

function ee(t) {
    return null == t ? te : te(t);
}

class BindingMediator {
    constructor(t, e, r, s) {
        this.key = t;
        this.binding = e;
        this.oL = r;
        this.locator = s;
        this.interceptor = this;
    }
    $bind() {
        throw new Error(`AUR0213:$bind`);
    }
    $unbind() {
        throw new Error(`AUR0214:$unbind`);
    }
    handleChange(t, e, r) {
        this.binding[this.key](t, e, r);
    }
}

te(BindingMediator);

const re = t.DI.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = u();
        this.A = u();
        this.U = u();
    }
    parse(t, e) {
        let r;
        switch (e) {
          case 16:
            return new CustomExpression(t);

          case 1:
            r = this.U[t];
            if (void 0 === r) r = this.U[t] = this.$parse(t, e);
            return r;

          case 2:
            r = this.A[t];
            if (void 0 === r) r = this.A[t] = this.$parse(t, e);
            return r;

          default:
            if (0 === t.length) {
                if ((e & (4 | 8)) > 0) return PrimitiveLiteralExpression.$empty;
                throw Ye();
            }
            r = this.h[t];
            if (void 0 === r) r = this.h[t] = this.$parse(t, e);
            return r;
        }
    }
    $parse(t, e) {
        fe = t;
        de = 0;
        pe = t.length;
        ve = 0;
        we = 0;
        ge = 6291456;
        be = "";
        xe = t.charCodeAt(0);
        Ee = true;
        Ae = false;
        return Ue(61, void 0 === e ? 8 : e);
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

function se(t) {
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
    t[t["DotDot"] = 10] = "DotDot";
    t[t["DotDotDot"] = 11] = "DotDotDot";
    t[t["QuestionDot"] = 2162700] = "QuestionDot";
    t[t["CloseBrace"] = 7340045] = "CloseBrace";
    t[t["CloseParen"] = 7340046] = "CloseParen";
    t[t["Comma"] = 6291471] = "Comma";
    t[t["OpenBracket"] = 2688016] = "OpenBracket";
    t[t["CloseBracket"] = 7340051] = "CloseBracket";
    t[t["Colon"] = 6291476] = "Colon";
    t[t["Question"] = 6291477] = "Question";
    t[t["Ampersand"] = 6291478] = "Ampersand";
    t[t["Bar"] = 6291479] = "Bar";
    t[t["QuestionQuestion"] = 6553752] = "QuestionQuestion";
    t[t["BarBar"] = 6553817] = "BarBar";
    t[t["AmpersandAmpersand"] = 6553882] = "AmpersandAmpersand";
    t[t["EqualsEquals"] = 6553947] = "EqualsEquals";
    t[t["ExclamationEquals"] = 6553948] = "ExclamationEquals";
    t[t["EqualsEqualsEquals"] = 6553949] = "EqualsEqualsEquals";
    t[t["ExclamationEqualsEquals"] = 6553950] = "ExclamationEqualsEquals";
    t[t["LessThan"] = 6554015] = "LessThan";
    t[t["GreaterThan"] = 6554016] = "GreaterThan";
    t[t["LessThanEquals"] = 6554017] = "LessThanEquals";
    t[t["GreaterThanEquals"] = 6554018] = "GreaterThanEquals";
    t[t["InKeyword"] = 6562211] = "InKeyword";
    t[t["InstanceOfKeyword"] = 6562212] = "InstanceOfKeyword";
    t[t["Plus"] = 2490853] = "Plus";
    t[t["Minus"] = 2490854] = "Minus";
    t[t["TypeofKeyword"] = 139303] = "TypeofKeyword";
    t[t["VoidKeyword"] = 139304] = "VoidKeyword";
    t[t["Asterisk"] = 6554153] = "Asterisk";
    t[t["Percent"] = 6554154] = "Percent";
    t[t["Slash"] = 6554155] = "Slash";
    t[t["Equals"] = 4194348] = "Equals";
    t[t["Exclamation"] = 131117] = "Exclamation";
    t[t["TemplateTail"] = 2163758] = "TemplateTail";
    t[t["TemplateContinuation"] = 2163759] = "TemplateContinuation";
    t[t["OfKeyword"] = 4204592] = "OfKeyword";
    t[t["Arrow"] = 49] = "Arrow";
})(ne || (ne = {}));

const oe = PrimitiveLiteralExpression.$false;

const ce = PrimitiveLiteralExpression.$true;

const ue = PrimitiveLiteralExpression.$null;

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

let we = 0;

let ge = 6291456;

let be = "";

let xe;

let Ee = true;

let Ae = false;

function ye() {
    return fe.slice(we, de);
}

function me(t, e) {
    fe = t;
    de = 0;
    pe = t.length;
    ve = 0;
    we = 0;
    ge = 6291456;
    be = "";
    xe = t.charCodeAt(0);
    Ee = true;
    Ae = false;
    return Ue(61, void 0 === e ? 8 : e);
}

function Ue(t, e) {
    if (16 === e) return new CustomExpression(fe);
    if (0 === de) {
        if (1 & e) return je();
        Me();
        if (4194304 & ge) throw ze();
    }
    Ee = 513 > t;
    Ae = false;
    let r = false;
    let s;
    let i = 0;
    if (131072 & ge) {
        const t = xr[63 & ge];
        Me();
        s = new UnaryExpression(t, Ue(514, e));
        Ee = false;
    } else {
        t: switch (ge) {
          case 12294:
            i = ve;
            Ee = false;
            do {
                Me();
                ++i;
                switch (ge) {
                  case 65545:
                    Me();
                    if (0 === (12288 & ge)) throw Ge();
                    break;

                  case 10:
                  case 11:
                    throw Ge();

                  case 2162700:
                    Ae = true;
                    Me();
                    if (0 === (12288 & ge)) {
                        s = 0 === i ? ae : 1 === i ? le : new AccessThisExpression(i);
                        r = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & ge) {
                        s = 0 === i ? ae : 1 === i ? le : new AccessThisExpression(i);
                        break t;
                    }
                    throw Ze();
                }
            } while (12294 === ge);

          case 4096:
            {
                const t = be;
                if (2 & e) s = new BindingIdentifier(t); else s = new AccessScopeExpression(t, i);
                Ee = !Ae;
                Me();
                if (Qe(49)) {
                    if (524296 === ge) throw gr();
                    const e = Ae;
                    const r = ve;
                    ++ve;
                    const i = Ue(62, 0);
                    Ae = e;
                    ve = r;
                    Ee = false;
                    s = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw br();

          case 11:
            throw We();

          case 12292:
            Ee = false;
            Me();
            switch (ve) {
              case 0:
                s = ae;
                break;

              case 1:
                s = le;
                break;

              default:
                s = new AccessThisExpression(ve);
                break;
            }
            break;

          case 2688007:
            s = Le(e);
            break;

          case 2688016:
            s = fe.search(/\s+of\s+/) > de ? Se() : Re(e);
            break;

          case 524296:
            s = Te(e);
            break;

          case 2163758:
            s = new TemplateExpression([ be ]);
            Ee = false;
            Me();
            break;

          case 2163759:
            s = Ie(e, s, false);
            break;

          case 16384:
          case 32768:
            s = new PrimitiveLiteralExpression(be);
            Ee = false;
            Me();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            s = xr[63 & ge];
            Ee = false;
            Me();
            break;

          default:
            if (de >= pe) throw Je(); else throw Xe();
        }
        if (2 & e) return Pe(s);
        if (514 < t) return s;
        if (10 === ge || 11 === ge) throw Ge();
        if (1793 === s.$kind) switch (ge) {
          case 2162700:
            Ae = true;
            Ee = false;
            Me();
            if (0 === (13312 & ge)) throw lr();
            if (12288 & ge) {
                s = new AccessScopeExpression(be, s.ancestor);
                Me();
            } else if (2688007 === ge) s = new CallFunctionExpression(s, Oe(), true); else if (2688016 === ge) s = Ce(s, true); else throw fr();
            break;

          case 65545:
            Ee = !Ae;
            Me();
            if (0 === (12288 & ge)) throw Ge();
            s = new AccessScopeExpression(be, s.ancestor);
            Me();
            break;

          case 10:
          case 11:
            throw Ge();

          case 2688007:
            s = new CallFunctionExpression(s, Oe(), r);
            break;

          case 2688016:
            s = Ce(s, r);
            break;

          case 2163758:
            s = De(s);
            break;

          case 2163759:
            s = Ie(e, s, true);
            break;
        }
        while ((65536 & ge) > 0) switch (ge) {
          case 2162700:
            s = ke(s);
            break;

          case 65545:
            Me();
            if (0 === (12288 & ge)) throw Ge();
            s = $e(s, false);
            break;

          case 10:
          case 11:
            throw Ge();

          case 2688007:
            if (10082 === s.$kind) s = new CallScopeExpression(s.name, Oe(), s.ancestor, false); else if (9323 === s.$kind) s = new CallMemberExpression(s.object, s.name, Oe(), s.optional, false); else s = new CallFunctionExpression(s, Oe(), false);
            break;

          case 2688016:
            s = Ce(s, false);
            break;

          case 2163758:
            if (Ae) throw fr();
            s = De(s);
            break;

          case 2163759:
            if (Ae) throw fr();
            s = Ie(e, s, true);
            break;
        }
    }
    if (10 === ge || 11 === ge) throw Ge();
    if (513 < t) return s;
    while ((262144 & ge) > 0) {
        const r = ge;
        if ((960 & r) <= t) break;
        Me();
        s = new BinaryExpression(xr[63 & r], s, Ue(960 & r, e));
        Ee = false;
    }
    if (63 < t) return s;
    if (Qe(6291477)) {
        const t = Ue(62, e);
        _e(6291476);
        s = new ConditionalExpression(s, t, Ue(62, e));
        Ee = false;
    }
    if (62 < t) return s;
    if (Qe(4194348)) {
        if (!Ee) throw tr();
        s = new AssignExpression(s, Ue(62, e));
    }
    if (61 < t) return s;
    while (Qe(6291479)) {
        if (6291456 === ge) throw er();
        const t = be;
        Me();
        const r = new Array;
        while (Qe(6291476)) r.push(Ue(62, e));
        s = new ValueConverterExpression(s, t, r);
    }
    while (Qe(6291478)) {
        if (6291456 === ge) throw rr();
        const t = be;
        Me();
        const r = new Array;
        while (Qe(6291476)) r.push(Ue(62, e));
        s = new BindingBehaviorExpression(s, t, r);
    }
    if (6291456 !== ge) {
        if (1 & e) return s;
        if ("of" === ye()) throw sr();
        throw Xe();
    }
    return s;
}

function Se() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let r = "";
    let s = true;
    let i = 0;
    while (s) {
        Me();
        switch (ge) {
          case 7340051:
            s = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            r = ye();
            break;

          default:
            throw ar();
        }
    }
    _e(7340051);
    return e;
    function n() {
        if ("" !== r) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(ae, r), new AccessKeyedExpression(ae, new PrimitiveLiteralExpression(i++)), void 0));
            r = "";
        } else i++;
    }
}

function Oe() {
    const t = Ae;
    Me();
    const e = [];
    while (7340046 !== ge) {
        e.push(Ue(62, 0));
        if (!Qe(6291471)) break;
    }
    _e(7340046);
    Ee = false;
    Ae = t;
    return e;
}

function Ce(t, e) {
    const r = Ae;
    Me();
    t = new AccessKeyedExpression(t, Ue(62, 0), e);
    _e(7340051);
    Ee = !r;
    Ae = r;
    return t;
}

function ke(t) {
    Ae = true;
    Ee = false;
    Me();
    if (0 === (13312 & ge)) throw lr();
    if (12288 & ge) return $e(t, true);
    if (2688007 === ge) if (10082 === t.$kind) return new CallScopeExpression(t.name, Oe(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, Oe(), t.optional, true); else return new CallFunctionExpression(t, Oe(), true);
    if (2688016 === ge) return Ce(t, true);
    throw fr();
}

function $e(t, e) {
    const r = be;
    switch (ge) {
      case 2162700:
        {
            Ae = true;
            Ee = false;
            const s = de;
            const i = we;
            const n = ge;
            const o = xe;
            const c = be;
            const u = Ee;
            const h = Ae;
            Me();
            if (0 === (13312 & ge)) throw lr();
            if (2688007 === ge) return new CallMemberExpression(t, r, Oe(), e, true);
            de = s;
            we = i;
            ge = n;
            xe = o;
            be = c;
            Ee = u;
            Ae = h;
            return new AccessMemberExpression(t, r, e);
        }

      case 2688007:
        Ee = false;
        return new CallMemberExpression(t, r, Oe(), e, false);

      default:
        Ee = !Ae;
        Me();
        return new AccessMemberExpression(t, r, e);
    }
}

var Be;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(Be || (Be = {}));

function Le(t) {
    Me();
    const e = de;
    const r = we;
    const s = ge;
    const i = xe;
    const n = be;
    const o = Ee;
    const c = Ae;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === ge) {
            Me();
            if (4096 !== ge) throw Ge();
            u.push(new BindingIdentifier(be));
            Me();
            if (6291471 === ge) throw wr();
            if (7340046 !== ge) throw We();
            Me();
            if (49 !== ge) throw We();
            Me();
            const t = Ae;
            const e = ve;
            ++ve;
            const r = Ue(62, 0);
            Ae = t;
            ve = e;
            Ee = false;
            return new ArrowFunction(u, r, true);
        }
        switch (ge) {
          case 4096:
            u.push(new BindingIdentifier(be));
            Me();
            break;

          case 7340046:
            Me();
            break t;

          case 524296:
          case 2688016:
            Me();
            h = 4;
            break;

          case 6291471:
            h = 2;
            a = true;
            break t;

          case 2688007:
            h = 2;
            break t;

          default:
            Me();
            h = 2;
            break;
        }
        switch (ge) {
          case 6291471:
            Me();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Me();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw dr();
            Me();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === ge) {
        if (1 === h) {
            Me();
            if (524296 === ge) throw gr();
            const t = Ae;
            const e = ve;
            ++ve;
            const r = Ue(62, 0);
            Ae = t;
            ve = e;
            Ee = false;
            return new ArrowFunction(u, r);
        }
        throw dr();
    } else if (1 === h && 0 === u.length) throw ur(49);
    if (a) switch (h) {
      case 2:
        throw dr();

      case 3:
        throw pr();

      case 4:
        throw vr();
    }
    de = e;
    we = r;
    ge = s;
    xe = i;
    be = n;
    Ee = o;
    Ae = c;
    const l = Ae;
    const f = Ue(62, t);
    Ae = l;
    _e(7340046);
    if (49 === ge) switch (h) {
      case 2:
        throw dr();

      case 3:
        throw pr();

      case 4:
        throw vr();
    }
    return f;
}

function Re(t) {
    const e = Ae;
    Me();
    const r = new Array;
    while (7340051 !== ge) if (Qe(6291471)) {
        r.push(he);
        if (7340051 === ge) break;
    } else {
        r.push(Ue(62, ~2 & t));
        if (Qe(6291471)) {
            if (7340051 === ge) break;
        } else break;
    }
    Ae = e;
    _e(7340051);
    if (2 & t) return new ArrayBindingPattern(r); else {
        Ee = false;
        return new ArrayLiteralExpression(r);
    }
}

function Pe(t) {
    if (0 === (65536 & t.$kind)) throw ir();
    if (4204592 !== ge) throw ir();
    Me();
    const e = t;
    const r = Ue(61, 0);
    return new ForOfStatement(e, r);
}

function Te(t) {
    const e = Ae;
    const r = new Array;
    const s = new Array;
    Me();
    while (7340045 !== ge) {
        r.push(be);
        if (49152 & ge) {
            Me();
            _e(6291476);
            s.push(Ue(62, ~2 & t));
        } else if (12288 & ge) {
            const e = xe;
            const r = ge;
            const i = de;
            Me();
            if (Qe(6291476)) s.push(Ue(62, ~2 & t)); else {
                xe = e;
                ge = r;
                de = i;
                s.push(Ue(515, ~2 & t));
            }
        } else throw nr();
        if (7340045 !== ge) _e(6291471);
    }
    Ae = e;
    _e(7340045);
    if (2 & t) return new ObjectBindingPattern(r, s); else {
        Ee = false;
        return new ObjectLiteralExpression(r, s);
    }
}

function je() {
    const t = [];
    const e = [];
    const r = pe;
    let s = "";
    while (de < r) {
        switch (xe) {
          case 36:
            if (123 === fe.charCodeAt(de + 1)) {
                t.push(s);
                s = "";
                de += 2;
                xe = fe.charCodeAt(de);
                Me();
                const r = Ue(61, 1);
                e.push(r);
                continue;
            } else s += "$";
            break;

          case 92:
            s += String.fromCharCode(se(Fe()));
            break;

          default:
            s += String.fromCharCode(xe);
        }
        Fe();
    }
    if (e.length) {
        t.push(s);
        return new Interpolation(t, e);
    }
    return null;
}

function Ie(t, e, r) {
    const s = Ae;
    const i = [ be ];
    _e(2163759);
    const n = [ Ue(62, t) ];
    while (2163758 !== (ge = He())) {
        i.push(be);
        _e(2163759);
        n.push(Ue(62, t));
    }
    i.push(be);
    Ee = false;
    Ae = s;
    if (r) {
        Me();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Me();
        return new TemplateExpression(i, n);
    }
}

function De(t) {
    Ee = false;
    const e = [ be ];
    Me();
    return new TaggedTemplateExpression(e, e, t);
}

function Me() {
    while (de < pe) {
        we = de;
        if (null != (ge = Or[xe]())) return;
    }
    ge = 6291456;
}

function Fe() {
    return xe = fe.charCodeAt(++de);
}

function Ve() {
    while (Sr[Fe()]) ;
    const t = Er[be = ye()];
    return void 0 === t ? 4096 : t;
}

function Ne(t) {
    let e = xe;
    if (false === t) {
        do {
            e = Fe();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            be = parseInt(ye(), 10);
            return 32768;
        }
        e = Fe();
        if (de >= pe) {
            be = parseInt(ye().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Fe();
    } while (e <= 57 && e >= 48); else xe = fe.charCodeAt(--de);
    be = parseFloat(ye());
    return 32768;
}

function Ke() {
    const t = xe;
    Fe();
    let e = 0;
    const r = new Array;
    let s = de;
    while (xe !== t) if (92 === xe) {
        r.push(fe.slice(s, de));
        Fe();
        e = se(xe);
        Fe();
        r.push(String.fromCharCode(e));
        s = de;
    } else if (de >= pe) throw or(); else Fe();
    const i = fe.slice(s, de);
    Fe();
    r.push(i);
    const n = r.join("");
    be = n;
    return 16384;
}

function qe() {
    let t = true;
    let e = "";
    while (96 !== Fe()) if (36 === xe) if (de + 1 < pe && 123 === fe.charCodeAt(de + 1)) {
        de++;
        t = false;
        break;
    } else e += "$"; else if (92 === xe) e += String.fromCharCode(se(Fe())); else {
        if (de >= pe) throw cr();
        e += String.fromCharCode(xe);
    }
    Fe();
    be = e;
    if (t) return 2163758;
    return 2163759;
}

function He() {
    if (de >= pe) throw cr();
    de--;
    return qe();
}

function Qe(t) {
    if (ge === t) {
        Me();
        return true;
    }
    return false;
}

function _e(t) {
    if (ge === t) Me(); else throw ur(t);
}

function ze() {
    return new Error(`AUR0151:${fe}`);
}

function We() {
    return new Error(`AUR0152:${fe}`);
}

function Ge() {
    return new Error(`AUR0153:${fe}`);
}

function Ze() {
    return new Error(`AUR0154:${fe}`);
}

function Je() {
    return new Error(`AUR0155:${fe}`);
}

function Xe() {
    return new Error(`AUR0156:${fe}`);
}

function Ye() {
    return new Error(`AUR0157`);
}

function tr() {
    return new Error(`AUR0158:${fe}`);
}

function er() {
    return new Error(`AUR0159:${fe}`);
}

function rr() {
    return new Error(`AUR0160:${fe}`);
}

function sr() {
    return new Error(`AUR0161:${fe}`);
}

function ir() {
    return new Error(`AUR0163:${fe}`);
}

function nr() {
    return new Error(`AUR0164:${fe}`);
}

function or() {
    return new Error(`AUR0165:${fe}`);
}

function cr() {
    return new Error(`AUR0166:${fe}`);
}

function ur(t) {
    return new Error(`AUR0167:${fe}<${xr[63 & t]}`);
}

const hr = () => {
    throw new Error(`AUR0168:${fe}`);
};

hr.notMapped = true;

function ar() {
    return new Error(`AUR0170:${fe}`);
}

function lr() {
    return new Error(`AUR0171:${fe}`);
}

function fr() {
    return new Error(`AUR0172:${fe}`);
}

function dr() {
    return new Error(`AUR0173:${fe}`);
}

function pr() {
    return new Error(`AUR0174:${fe}`);
}

function vr() {
    return new Error(`AUR0175:${fe}`);
}

function wr() {
    return new Error(`AUR0176:${fe}`);
}

function gr() {
    return new Error(`AUR0178:${fe}`);
}

function br() {
    return new Error(`AUR0179:${fe}`);
}

const xr = [ oe, ce, ue, he, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Er = Object.assign(Object.create(null), {
    true: 8193,
    null: 8194,
    false: 8192,
    undefined: 8195,
    $this: 12292,
    $parent: 12294,
    in: 6562211,
    instanceof: 6562212,
    typeof: 139303,
    void: 139304,
    of: 4204592
});

const Ar = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function yr(t, e, r, s) {
    const i = r.length;
    for (let n = 0; n < i; n += 2) {
        const i = r[n];
        let o = r[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(s, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function mr(t) {
    return () => {
        Fe();
        return t;
    };
}

const Ur = new Set;

yr(null, Ur, Ar.AsciiIdPart, true);

const Sr = new Uint8Array(65535);

yr(Sr, null, Ar.IdStart, 1);

yr(Sr, null, Ar.Digit, 1);

const Or = new Array(65535);

Or.fill(hr, 0, 65535);

yr(Or, null, Ar.Skip, (() => {
    Fe();
    return null;
}));

yr(Or, null, Ar.IdStart, Ve);

yr(Or, null, Ar.Digit, (() => Ne(false)));

Or[34] = Or[39] = () => Ke();

Or[96] = () => qe();

Or[33] = () => {
    if (61 !== Fe()) return 131117;
    if (61 !== Fe()) return 6553948;
    Fe();
    return 6553950;
};

Or[61] = () => {
    if (62 === Fe()) {
        Fe();
        return 49;
    }
    if (61 !== xe) return 4194348;
    if (61 !== Fe()) return 6553947;
    Fe();
    return 6553949;
};

Or[38] = () => {
    if (38 !== Fe()) return 6291478;
    Fe();
    return 6553882;
};

Or[124] = () => {
    if (124 !== Fe()) return 6291479;
    Fe();
    return 6553817;
};

Or[63] = () => {
    if (46 === Fe()) {
        const t = fe.charCodeAt(de + 1);
        if (t <= 48 || t >= 57) {
            Fe();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== xe) return 6291477;
    Fe();
    return 6553752;
};

Or[46] = () => {
    if (Fe() <= 57 && xe >= 48) return Ne(true);
    if (46 === xe) {
        if (46 !== Fe()) return 10;
        Fe();
        return 11;
    }
    return 65545;
};

Or[60] = () => {
    if (61 !== Fe()) return 6554015;
    Fe();
    return 6554017;
};

Or[62] = () => {
    if (61 !== Fe()) return 6554016;
    Fe();
    return 6554018;
};

Or[37] = mr(6554154);

Or[40] = mr(2688007);

Or[41] = mr(7340046);

Or[42] = mr(6554153);

Or[43] = mr(2490853);

Or[44] = mr(6291471);

Or[45] = mr(2490854);

Or[47] = mr(6554155);

Or[58] = mr(6291476);

Or[91] = mr(2688016);

Or[93] = mr(7340051);

Or[123] = mr(524296);

Or[125] = mr(7340045);

let Cr = null;

const kr = [];

let $r = false;

function Br() {
    $r = false;
}

function Lr() {
    $r = true;
}

function Rr() {
    return Cr;
}

function Pr(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Cr) {
        Cr = t;
        kr[0] = Cr;
        $r = true;
        return;
    }
    if (Cr === t) throw new Error(`AUR0207`);
    kr.push(t);
    Cr = t;
    $r = true;
}

function Tr(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Cr !== t) throw new Error(`AUR0209`);
    kr.pop();
    Cr = kr.length > 0 ? kr[kr.length - 1] : null;
    $r = null != Cr;
}

const jr = Object.freeze({
    get current() {
        return Cr;
    },
    get connecting() {
        return $r;
    },
    enter: Pr,
    exit: Tr,
    pause: Br,
    resume: Lr
});

const Ir = Reflect.get;

const Dr = Object.prototype.toString;

const Mr = new WeakMap;

function Fr(t) {
    switch (Dr.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Vr = "__raw__";

function Nr(t) {
    return Fr(t) ? Kr(t) : t;
}

function Kr(t) {
    var e;
    return null !== (e = Mr.get(t)) && void 0 !== e ? e : _r(t);
}

function qr(t) {
    var e;
    return null !== (e = t[Vr]) && void 0 !== e ? e : t;
}

function Hr(t) {
    return Fr(t) && t[Vr] || t;
}

function Qr(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function _r(t) {
    const e = t instanceof Array ? Wr : t instanceof Map || t instanceof Set ? gs : zr;
    const r = new Proxy(t, e);
    Mr.set(t, r);
    return r;
}

const zr = {
    get(t, e, r) {
        if (e === Vr) return t;
        const s = Rr();
        if (!$r || Qr(e) || null == s) return Ir(t, e, r);
        s.observe(t, e);
        return Nr(Ir(t, e, r));
    }
};

const Wr = {
    get(t, e, r) {
        if (e === Vr) return t;
        const s = Rr();
        if (!$r || Qr(e) || null == s) return Ir(t, e, r);
        switch (e) {
          case "length":
            s.observe(t, "length");
            return t.length;

          case "map":
            return Gr;

          case "includes":
            return Xr;

          case "indexOf":
            return Yr;

          case "lastIndexOf":
            return ts;

          case "every":
            return Zr;

          case "filter":
            return Jr;

          case "find":
            return rs;

          case "findIndex":
            return es;

          case "flat":
            return ss;

          case "flatMap":
            return is;

          case "join":
            return ns;

          case "push":
            return cs;

          case "pop":
            return os;

          case "reduce":
            return vs;

          case "reduceRight":
            return ws;

          case "reverse":
            return ls;

          case "shift":
            return us;

          case "unshift":
            return hs;

          case "slice":
            return ps;

          case "splice":
            return as;

          case "some":
            return fs;

          case "sort":
            return ds;

          case "keys":
            return Ss;

          case "values":
          case Symbol.iterator:
            return Os;

          case "entries":
            return Cs;
        }
        s.observe(t, e);
        return Nr(Ir(t, e, r));
    },
    ownKeys(t) {
        var e;
        null === (e = Rr()) || void 0 === e ? void 0 : e.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Gr(t, e) {
    var r;
    const s = qr(this);
    const i = s.map(((r, s) => Hr(t.call(e, Nr(r), s, this))));
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Nr(i);
}

function Zr(t, e) {
    var r;
    const s = qr(this);
    const i = s.every(((r, s) => t.call(e, Nr(r), s, this)));
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return i;
}

function Jr(t, e) {
    var r;
    const s = qr(this);
    const i = s.filter(((r, s) => Hr(t.call(e, Nr(r), s, this))));
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Nr(i);
}

function Xr(t) {
    var e;
    const r = qr(this);
    const s = r.includes(Hr(t));
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return s;
}

function Yr(t) {
    var e;
    const r = qr(this);
    const s = r.indexOf(Hr(t));
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return s;
}

function ts(t) {
    var e;
    const r = qr(this);
    const s = r.lastIndexOf(Hr(t));
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return s;
}

function es(t, e) {
    var r;
    const s = qr(this);
    const i = s.findIndex(((r, s) => Hr(t.call(e, Nr(r), s, this))));
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return i;
}

function rs(t, e) {
    var r;
    const s = qr(this);
    const i = s.find(((e, r) => t(Nr(e), r, this)), e);
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Nr(i);
}

function ss() {
    var t;
    const e = qr(this);
    null === (t = Rr()) || void 0 === t ? void 0 : t.observeCollection(e);
    return Nr(e.flat());
}

function is(t, e) {
    var r;
    const s = qr(this);
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Kr(s.flatMap(((r, s) => Nr(t.call(e, Nr(r), s, this)))));
}

function ns(t) {
    var e;
    const r = qr(this);
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return r.join(t);
}

function os() {
    return Nr(qr(this).pop());
}

function cs(...t) {
    return qr(this).push(...t);
}

function us() {
    return Nr(qr(this).shift());
}

function hs(...t) {
    return qr(this).unshift(...t);
}

function as(...t) {
    return Nr(qr(this).splice(...t));
}

function ls(...t) {
    var e;
    const r = qr(this);
    const s = r.reverse();
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return Nr(s);
}

function fs(t, e) {
    var r;
    const s = qr(this);
    const i = s.some(((r, s) => Hr(t.call(e, Nr(r), s, this))));
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return i;
}

function ds(t) {
    var e;
    const r = qr(this);
    const s = r.sort(t);
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return Nr(s);
}

function ps(t, e) {
    var r;
    const s = qr(this);
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Kr(s.slice(t, e));
}

function vs(t, e) {
    var r;
    const s = qr(this);
    const i = s.reduce(((e, r, s) => t(e, Nr(r), s, this)), e);
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Nr(i);
}

function ws(t, e) {
    var r;
    const s = qr(this);
    const i = s.reduceRight(((e, r, s) => t(e, Nr(r), s, this)), e);
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return Nr(i);
}

const gs = {
    get(t, e, r) {
        if (e === Vr) return t;
        const s = Rr();
        if (!$r || Qr(e) || null == s) return Ir(t, e, r);
        switch (e) {
          case "size":
            s.observe(t, "size");
            return t.size;

          case "clear":
            return ms;

          case "delete":
            return Us;

          case "forEach":
            return bs;

          case "add":
            if (t instanceof Set) return ys;
            break;

          case "get":
            if (t instanceof Map) return Es;
            break;

          case "set":
            if (t instanceof Map) return As;
            break;

          case "has":
            return xs;

          case "keys":
            return Ss;

          case "values":
            return Os;

          case "entries":
            return Cs;

          case Symbol.iterator:
            return t instanceof Map ? Cs : Os;
        }
        return Nr(Ir(t, e, r));
    }
};

function bs(t, e) {
    var r;
    const s = qr(this);
    null === (r = Rr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return s.forEach(((r, s) => {
        t.call(e, Nr(r), Nr(s), this);
    }));
}

function xs(t) {
    var e;
    const r = qr(this);
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return r.has(Hr(t));
}

function Es(t) {
    var e;
    const r = qr(this);
    null === (e = Rr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return Nr(r.get(Hr(t)));
}

function As(t, e) {
    return Nr(qr(this).set(Hr(t), Hr(e)));
}

function ys(t) {
    return Nr(qr(this).add(Hr(t)));
}

function ms() {
    return Nr(qr(this).clear());
}

function Us(t) {
    return Nr(qr(this).delete(Hr(t)));
}

function Ss() {
    var t;
    const e = qr(this);
    null === (t = Rr()) || void 0 === t ? void 0 : t.observeCollection(e);
    const r = e.keys();
    return {
        next() {
            const t = r.next();
            const e = t.value;
            const s = t.done;
            return s ? {
                value: void 0,
                done: s
            } : {
                value: Nr(e),
                done: s
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Os() {
    var t;
    const e = qr(this);
    null === (t = Rr()) || void 0 === t ? void 0 : t.observeCollection(e);
    const r = e.values();
    return {
        next() {
            const t = r.next();
            const e = t.value;
            const s = t.done;
            return s ? {
                value: void 0,
                done: s
            } : {
                value: Nr(e),
                done: s
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Cs() {
    var t;
    const e = qr(this);
    null === (t = Rr()) || void 0 === t ? void 0 : t.observeCollection(e);
    const r = e.entries();
    return {
        next() {
            const t = r.next();
            const e = t.value;
            const s = t.done;
            return s ? {
                value: void 0,
                done: s
            } : {
                value: [ Nr(e[0]), Nr(e[1]) ],
                done: s
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const ks = Object.freeze({
    getProxy: Kr,
    getRaw: qr,
    wrap: Nr,
    unwrap: Hr,
    rawKey: Vr
});

class ComputedObserver {
    constructor(t, e, r, s, i) {
        this.interceptor = this;
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.ir = false;
        this.D = false;
        this.o = t;
        this.get = e;
        this.set = r;
        this.up = s;
        this.oL = i;
    }
    static create(t, e, r, i, n) {
        const o = r.get;
        const c = r.set;
        const u = new ComputedObserver(t, o, c, n, i);
        const h = () => u.getValue();
        h.getObserver = () => u;
        s(t, e, {
            enumerable: r.enumerable,
            configurable: true,
            get: h,
            set: t => {
                u.setValue(t, 0);
            }
        });
        return u;
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
        $s = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, $s, 0);
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
            Pr(this);
            return this.v = Hr(this.get.call(this.up ? Nr(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Tr(this);
        }
    }
}

ee(ComputedObserver);

F(ComputedObserver);

H(ComputedObserver);

let $s;

const Bs = t.DI.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Ls = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Rs = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Ls.disabled) return;
            if (++this.C < Ls.timeoutsPerCheck) return;
            this.C = 0;
            const t = this.tracked;
            const e = t.length;
            let r;
            let s = 0;
            for (;s < e; ++s) {
                r = t[s];
                if (r.isDirty()) this.queue.add(r);
            }
        };
    }
    createProperty(t, e) {
        if (Ls.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Rs);
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
    constructor(t, e, r) {
        this.obj = e;
        this.key = r;
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
    setValue(t, e, r, s) {
        r[s] = t;
    }
}

let Ps;

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
        Ps = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ps, this.f);
    }
    start() {
        if (false === this.iO) {
            this.iO = true;
            this.v = this.o[this.k];
            s(this.o, this.k, {
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
            s(this.o, this.k, {
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
    constructor(t, e, r, s) {
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        this.o = t;
        this.S = r;
        this.hs = i(r);
        const n = t[e];
        this.cb = i(n) ? n : void 0;
        this.v = s;
    }
    getValue() {
        return this.v;
    }
    setValue(t, e) {
        var r;
        if (this.hs) t = this.S(t, null);
        if (!Object.is(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.f = e;
            null === (r = this.cb) || void 0 === r ? void 0 : r.call(this.o, this.v, this.ov, e);
            this.queue.add(this);
        }
    }
    flush() {
        Ps = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ps, this.f);
    }
}

F(SetterObserver);

F(SetterNotifier);

H(SetterObserver);

H(SetterNotifier);

const Ts = new PropertyAccessor;

const js = t.DI.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Is = t.DI.createInterface("INodeObserverLocator", (e => e.cachedCallback((e => {
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
        return Ts;
    }
    getAccessor() {
        return Ts;
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
        var r, s;
        return null !== (s = null === (r = t.$observers) || void 0 === r ? void 0 : r[e]) && void 0 !== s ? s : this.R(t, e, this.createObserver(t, e));
    }
    getAccessor(t, e) {
        var r;
        const s = null === (r = t.$observers) || void 0 === r ? void 0 : r[e];
        if (void 0 !== s) return s;
        if (this.B.handles(t, e, this)) return this.B.getAccessor(t, e, this);
        return Ts;
    }
    getArrayObserver(t) {
        return gt(t);
    }
    getMapObserver(t) {
        return Qt(t);
    }
    getSetObserver(t) {
        return Rt(t);
    }
    createObserver(e, s) {
        var i, n, o, c;
        if (!(e instanceof Object)) return new PrimitiveObserver(e, s);
        if (this.B.handles(e, s, this)) return this.B.getObserver(e, s, this);
        switch (s) {
          case "length":
            if (e instanceof Array) return gt(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Qt(e).getLengthObserver(); else if (e instanceof Set) return Rt(e).getLengthObserver();
            break;

          default:
            if (e instanceof Array && t.isArrayIndex(s)) return gt(e).getIndexObserver(Number(s));
            break;
        }
        let u = Fs(e, s);
        if (void 0 === u) {
            let t = Ms(e);
            while (null !== t) {
                u = Fs(t, s);
                if (void 0 === u) t = Ms(t); else break;
            }
        }
        if (void 0 !== u && !r.call(u, "value")) {
            let t = this.P(e, s, u);
            if (null == t) t = null === (c = null !== (n = null === (i = u.get) || void 0 === i ? void 0 : i.getObserver) && void 0 !== n ? n : null === (o = u.set) || void 0 === o ? void 0 : o.getObserver) || void 0 === c ? void 0 : c(e, this);
            return null == t ? u.configurable ? ComputedObserver.create(e, s, u, this, true) : this.$.createProperty(e, s) : t;
        }
        return new SetterObserver(e, s);
    }
    P(t, e, r) {
        if (this.L.length > 0) for (const s of this.L) {
            const i = s.getObserver(t, e, r, this);
            if (null != i) return i;
        }
        return null;
    }
    R(t, e, r) {
        if (true === r.doNotCache) return r;
        if (void 0 === t.$observers) {
            s(t, "$observers", {
                value: {
                    [e]: r
                }
            });
            return r;
        }
        return t.$observers[e] = r;
    }
}

ObserverLocator.inject = [ Bs, Is ];

function Ds(t) {
    let e;
    if (t instanceof Array) e = gt(t); else if (t instanceof Map) e = Qt(t); else if (t instanceof Set) e = Rt(t);
    return e;
}

const Ms = Object.getPrototypeOf;

const Fs = Object.getOwnPropertyDescriptor;

const Vs = t.DI.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ js ];
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
            Pr(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Tr(this);
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

function Ns(t) {
    if (void 0 === t.$observers) s(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Ks = {};

function qs(t, e, r) {
    if (null == e) return (e, r, s) => i(e, r, s, t);
    return i(t, e, r);
    function i(t, e, r, i) {
        var n;
        const o = void 0 === e;
        i = "object" !== typeof i ? {
            name: i
        } : i || {};
        if (o) e = i.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const c = i.callback || `${String(e)}Changed`;
        let u = Ks;
        if (r) {
            delete r.value;
            delete r.writable;
            u = null === (n = r.initializer) || void 0 === n ? void 0 : n.call(r);
            delete r.initializer;
        } else r = {
            configurable: true
        };
        if (!("enumerable" in r)) r.enumerable = true;
        const h = i.set;
        r.get = function t() {
            var r;
            const s = Hs(this, e, c, u, h);
            null === (r = Rr()) || void 0 === r ? void 0 : r.subscribeTo(s);
            return s.getValue();
        };
        r.set = function t(r) {
            Hs(this, e, c, u, h).setValue(r, 0);
        };
        r.get.getObserver = function t(r) {
            return Hs(r, e, c, u, h);
        };
        if (o) s(t.prototype, e, r); else return r;
    }
}

function Hs(t, e, r, s, i) {
    const n = Ns(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, r, i, s === Ks ? void 0 : s);
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

exports.ArrowFunction = ArrowFunction;

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

exports.ConnectableSwitcher = jr;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = Ls;

exports.FlushQueue = FlushQueue;

exports.ForOfStatement = ForOfStatement;

exports.HtmlLiteralExpression = HtmlLiteralExpression;

exports.ICoercionConfiguration = P;

exports.IDirtyChecker = Bs;

exports.IExpressionParser = re;

exports.INodeObserverLocator = Is;

exports.IObservation = Vs;

exports.IObserverLocator = js;

exports.ISignaler = g;

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

exports.ProxyObservable = ks;

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

exports.cloneIndexMap = D;

exports.connectable = ee;

exports.copyIndexMap = j;

exports.createIndexMap = I;

exports.disableArrayObservation = wt;

exports.disableMapObservation = Ht;

exports.disableSetObservation = Lt;

exports.enableArrayObservation = vt;

exports.enableMapObservation = qt;

exports.enableSetObservation = Bt;

exports.getCollectionObserver = Ds;

exports.isIndexMap = M;

exports.observable = qs;

exports.parseExpression = me;

exports.registerAliases = w;

exports.subscriberCollection = F;

exports.synchronizeIndices = xt;

exports.valueConverter = m;

exports.withFlushQueue = H;
//# sourceMappingURL=index.cjs.map
