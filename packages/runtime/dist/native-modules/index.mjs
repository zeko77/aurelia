import { Protocol as t, Registration as e, DI as s, firstDefined as r, mergeArrays as i, fromAnnotationOrDefinitionOrTypeOrDefault as n, isNumberOrBigInt as o, isStringOrDate as c, emptyArray as u, isArrayIndex as h, IPlatform as a, ILogger as l } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as f } from "../../../metadata/dist/native-modules/index.mjs";

const d = Object.prototype.hasOwnProperty;

const v = Reflect.defineProperty;

const p = t => "function" === typeof t;

const g = t => "string" === typeof t;

function w(t, e, s) {
    v(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function b(t, e, s, r = false) {
    if (r || !d.call(t, e)) w(t, e, s);
}

const E = () => Object.create(null);

const A = f.getOwn;

const y = f.hasOwn;

const m = f.define;

const x = t.annotation.keyFor;

const U = t.resource.keyFor;

const S = t.resource.appendTo;

function O(...t) {
    return function(e) {
        const s = x("aliases");
        const r = A(s, e);
        if (void 0 === r) m(s, t, e); else r.push(...t);
    };
}

function C(t, s, r, i) {
    for (let n = 0, o = t.length; n < o; ++n) e.aliasTo(r, s.keyFrom(t[n])).register(i);
}

Object.freeze({});

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) if (void 0 !== e) this[t] = e; else for (const e in t) if (d.call(t, e)) this[e] = t[e];
    }
    static create(t, e) {
        return new BindingContext(t, e);
    }
    static get(t, e, s, r) {
        var i, n;
        if (null == t) throw new Error(`AUR0203:${t}`);
        let o = t.overrideContext;
        let c = t;
        if (s > 0) {
            while (s > 0) {
                s--;
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

const k = s.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = E();
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

var $;

(function(t) {
    t[t["singleton"] = 1] = "singleton";
    t[t["interceptor"] = 2] = "interceptor";
})($ || ($ = {}));

function B(t) {
    return function(e) {
        return T.define(t, e);
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
    static create(t, e) {
        let s;
        let o;
        if (g(t)) {
            s = t;
            o = {
                name: s
            };
        } else {
            s = t.name;
            o = t;
        }
        const c = Object.getPrototypeOf(e) === BindingInterceptor;
        return new BindingBehaviorDefinition(e, r(P(e, "name"), s), i(P(e, "aliases"), o.aliases, e.aliases), T.keyFrom(s), n("strategy", o, e, (() => c ? 2 : 1)));
    }
    register(t) {
        const {Type: s, key: r, aliases: i, strategy: n} = this;
        switch (n) {
          case 1:
            e.singleton(r, s).register(t);
            break;

          case 2:
            e.instance(r, new BindingBehaviorFactory(t, s)).register(t);
            break;
        }
        e.aliasTo(r, s).register(t);
        C(i, T, r, t);
    }
}

class BindingBehaviorFactory {
    constructor(t, e) {
        this.ctn = t;
        this.Type = e;
        this.deps = s.getDependencies(e);
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

const L = [ "isBound", "$scope", "obs", "sourceExpression", "locator", "oL" ];

L.forEach((t => {
    v(BindingInterceptor.prototype, t, {
        enumerable: false,
        configurable: true,
        get: function() {
            return this.binding[t];
        }
    });
}));

const R = U("binding-behavior");

const P = (t, e) => A(x(e), t);

const T = Object.freeze({
    name: R,
    keyFrom(t) {
        return `${R}:${t}`;
    },
    isType(t) {
        return p(t) && y(R, t);
    },
    define(t, e) {
        const s = BindingBehaviorDefinition.create(t, e);
        m(R, s, s.Type);
        m(R, s, s);
        S(e, R);
        return s.Type;
    },
    getDefinition(t) {
        const e = A(R, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        m(x(e), s, t);
    },
    getAnnotation: P
});

function j(t) {
    return function(e) {
        return D.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, s, r) {
        this.Type = t;
        this.name = e;
        this.aliases = s;
        this.key = r;
    }
    static create(t, e) {
        let s;
        let n;
        if (g(t)) {
            s = t;
            n = {
                name: s
            };
        } else {
            s = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, r(M(e, "name"), s), i(M(e, "aliases"), n.aliases, e.aliases), D.keyFrom(s));
    }
    register(t) {
        const {Type: s, key: r, aliases: i} = this;
        e.singleton(r, s).register(t);
        e.aliasTo(r, s).register(t);
        C(i, D, r, t);
    }
}

const I = U("value-converter");

const M = (t, e) => A(x(e), t);

const D = Object.freeze({
    name: I,
    keyFrom: t => `${I}:${t}`,
    isType(t) {
        return p(t) && y(I, t);
    },
    define(t, e) {
        const s = ValueConverterDefinition.create(t, e);
        m(I, s, s.Type);
        m(I, s, s);
        S(e, I);
        return s.Type;
    },
    getDefinition(t) {
        const e = A(I, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, s) {
        m(x(e), s, t);
    },
    getAnnotation: M
});

var F;

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
})(F || (F = {}));

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
        if (g(t.value)) {
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
        this.behaviorKey = T.keyFrom(e);
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
        const i = s;
        if (void 0 !== i[r]) {
            if (p(i[r].unbind)) i[r].unbind(t, e, s);
            i[r] = void 0;
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
        this.converterKey = D.keyFrom(e);
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
                const e = s.get(k);
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
        const i = s.locator.get(k);
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
        let c = this.ancestor;
        while (c-- && n) {
            o = o.parentScope;
            n = null !== (i = null === o || void 0 === o ? void 0 : o.overrideContext) && void 0 !== i ? i : null;
        }
        return c < 1 && n ? n.bindingContext : void 0;
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
        const o = N(t, n, this.name);
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
        const o = N(t, i, this.name);
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
        const i = this.func.evaluate(t, e, s, r);
        if (p(i)) return i(...this.args.map((i => i.evaluate(t, e, s, r))));
        if (!(8 & t) && null == i) return;
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
    evaluate(t, e, s, r) {
        var i;
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(t, e, s, r) && this.right.evaluate(t, e, s, r);

          case "||":
            return this.left.evaluate(t, e, s, r) || this.right.evaluate(t, e, s, r);

          case "??":
            return null !== (i = this.left.evaluate(t, e, s, r)) && void 0 !== i ? i : this.right.evaluate(t, e, s, r);

          case "==":
            return this.left.evaluate(t, e, s, r) == this.right.evaluate(t, e, s, r);

          case "===":
            return this.left.evaluate(t, e, s, r) === this.right.evaluate(t, e, s, r);

          case "!=":
            return this.left.evaluate(t, e, s, r) != this.right.evaluate(t, e, s, r);

          case "!==":
            return this.left.evaluate(t, e, s, r) !== this.right.evaluate(t, e, s, r);

          case "instanceof":
            {
                const i = this.right.evaluate(t, e, s, r);
                if (p(i)) return this.left.evaluate(t, e, s, r) instanceof i;
                return false;
            }

          case "in":
            {
                const i = this.right.evaluate(t, e, s, r);
                if (i instanceof Object) return this.left.evaluate(t, e, s, r) in i;
                return false;
            }

          case "+":
            {
                const i = this.left.evaluate(t, e, s, r);
                const n = this.right.evaluate(t, e, s, r);
                if ((1 & t) > 0) return i + n;
                if (!i || !n) {
                    if (o(i) || o(n)) return (i || 0) + (n || 0);
                    if (c(i) || c(n)) return (i || "") + (n || "");
                }
                return i + n;
            }

          case "-":
            return this.left.evaluate(t, e, s, r) - this.right.evaluate(t, e, s, r);

          case "*":
            return this.left.evaluate(t, e, s, r) * this.right.evaluate(t, e, s, r);

          case "/":
            return this.left.evaluate(t, e, s, r) / this.right.evaluate(t, e, s, r);

          case "%":
            return this.left.evaluate(t, e, s, r) % this.right.evaluate(t, e, s, r);

          case "<":
            return this.left.evaluate(t, e, s, r) < this.right.evaluate(t, e, s, r);

          case ">":
            return this.left.evaluate(t, e, s, r) > this.right.evaluate(t, e, s, r);

          case "<=":
            return this.left.evaluate(t, e, s, r) <= this.right.evaluate(t, e, s, r);

          case ">=":
            return this.left.evaluate(t, e, s, r) >= this.right.evaluate(t, e, s, r);

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

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(u);

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

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(u, u);

class TemplateExpression {
    constructor(t, e = u) {
        this.cooked = t;
        this.expressions = e;
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
    constructor(t, e, s, r = u) {
        this.cooked = t;
        this.func = s;
        this.expressions = r;
        t.raw = e;
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
        const i = this.expressions.map((i => i.evaluate(t, e, s, r)));
        const n = this.func.evaluate(t, e, s, r);
        if (!p(n)) throw new Error(`AUR0110`);
        return n(this.cooked, ...i);
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

const V = Object.prototype.toString;

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
        switch (V.call(e)) {
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
            throw new Error(`Cannot count ${V.call(e)}`);
        }
    }
    iterate(t, e, s) {
        switch (V.call(e)) {
          case "[object Array]":
            return K(e, s);

          case "[object Map]":
            return q(e, s);

          case "[object Set]":
            return H(e, s);

          case "[object Number]":
            return Q(e, s);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${V.call(e)}`);
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
    constructor(t, e = u) {
        this.parts = t;
        this.expressions = e;
        this.isMulti = e.length > 1;
        this.firstExpression = e[0];
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
        let c;
        let u;
        for (c = 0; c < o; c++) {
            u = n[c];
            switch (u.$kind) {
              case 139289:
                u.assign(t, e, s, r);
                break;

              case 90137:
              case 106521:
                {
                    if ("object" !== typeof r || null === r) throw new Error(`AUR0112`);
                    let n = u.source.evaluate(t, Scope.create(r), s, null);
                    if (void 0 === n) n = null === (i = u.initializer) || void 0 === i ? void 0 : i.evaluate(t, e, s, null);
                    u.assign(t, e, s, n);
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
    assign(t, e, s, r) {
        if (null == r) return;
        if ("object" !== typeof r) throw new Error(`AUR0112`);
        const i = this.indexOrProperties;
        let n;
        if (h(i)) {
            if (!Array.isArray(r)) throw new Error(`AUR0112`);
            n = r.slice(i);
        } else n = Object.entries(r).reduce(((t, [e, s]) => {
            if (!i.includes(e)) t[e] = s;
            return t;
        }), {});
        this.target.assign(t, e, s, n);
    }
    accept(t) {
        return t.visitDestructuringAssignmentRestExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

function N(t, e, s) {
    const r = null == e ? null : e[s];
    if (p(r)) return r;
    if (!(8 & t) && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function K(t, e) {
    for (let s = 0, r = t.length; s < r; ++s) e(t, s, t[s]);
}

function q(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.entries()) s[++r] = e;
    K(s, e);
}

function H(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.keys()) s[++r] = e;
    K(s, e);
}

function Q(t, e) {
    const s = Array(t);
    for (let e = 0; e < t; ++e) s[e] = e;
    K(s, e);
}

const _ = s.createInterface("ICoercionConfiguration");

var z;

(function(t) {
    t[t["oneTime"] = 1] = "oneTime";
    t[t["toView"] = 2] = "toView";
    t[t["fromView"] = 4] = "fromView";
    t[t["twoWay"] = 6] = "twoWay";
    t[t["default"] = 8] = "default";
})(z || (z = {}));

var W;

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
})(W || (W = {}));

var G;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(G || (G = {}));

var Z;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(Z || (Z = {}));

var J;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(J || (J = {}));

var X;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(X || (X = {}));

function Y(t, e) {
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

function tt(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function et(t) {
    const e = t.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function st(t) {
    return t instanceof Array && true === t.isIndexMap;
}

function rt(t) {
    return null == t ? it : it(t);
}

function it(t) {
    const e = t.prototype;
    v(e, "subs", {
        get: nt
    });
    b(e, "subscribe", ot);
    b(e, "unsubscribe", ct);
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

function nt() {
    return w(this, "subs", new SubscriberRecord);
}

function ot(t) {
    return this.subs.add(t);
}

function ct(t) {
    return this.subs.remove(t);
}

function ut(t) {
    return null == t ? ht : ht(t);
}

function ht(t) {
    const e = t.prototype;
    v(e, "queue", {
        get: at
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
            this.i.forEach(lt);
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

function at() {
    return FlushQueue.instance;
}

function lt(t, e, s) {
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
    setValue(t, e) {
        const s = this.v;
        if (t !== s && h(t)) {
            if (0 === (64 & e)) this.o.length = t;
            this.v = t;
            this.u = s;
            this.f = e;
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
        pt = this.u;
        this.u = this.v;
        this.subs.notify(this.v, pt, this.f);
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
        pt = this.u;
        this.u = this.v;
        this.subs.notify(this.v, pt, this.f);
    }
}

function ft(t) {
    const e = t.prototype;
    b(e, "subscribe", dt, true);
    b(e, "unsubscribe", vt, true);
    ut(t);
    rt(t);
}

function dt(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function vt(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

ft(CollectionLengthObserver);

ft(CollectionSizeObserver);

let pt;

const gt = new WeakMap;

function wt(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function bt(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function Et(t, e, s, r, i) {
    let n, o, c, u, h;
    let a, l;
    for (a = s + 1; a < r; a++) {
        n = t[a];
        o = e[a];
        for (l = a - 1; l >= s; l--) {
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

function At(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let d, v, p;
    let g, w;
    let b, E, A, y;
    let m, x, U, S;
    while (true) {
        if (r - s <= 10) {
            Et(t, e, s, r, i);
            return;
        }
        n = s + (r - s >> 1);
        c = t[s];
        a = e[s];
        u = t[r - 1];
        l = e[r - 1];
        h = t[n];
        f = e[n];
        d = i(c, u);
        if (d > 0) {
            g = c;
            w = a;
            c = u;
            a = l;
            u = g;
            l = w;
        }
        v = i(c, h);
        if (v >= 0) {
            g = c;
            w = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = g;
            l = w;
        } else {
            p = i(u, h);
            if (p > 0) {
                g = u;
                w = l;
                u = h;
                l = f;
                h = g;
                f = w;
            }
        }
        t[s] = c;
        e[s] = a;
        t[r - 1] = h;
        e[r - 1] = f;
        b = u;
        E = l;
        A = s + 1;
        y = r - 1;
        t[n] = t[A];
        e[n] = e[A];
        t[A] = b;
        e[A] = E;
        t: for (o = A + 1; o < y; o++) {
            m = t[o];
            x = e[o];
            U = i(m, b);
            if (U < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = m;
                e[A] = x;
                A++;
            } else if (U > 0) {
                do {
                    y--;
                    if (y == o) break t;
                    S = t[y];
                    U = i(S, b);
                } while (U > 0);
                t[o] = t[y];
                e[o] = e[y];
                t[y] = m;
                e[y] = x;
                if (U < 0) {
                    m = t[o];
                    x = e[o];
                    t[o] = t[A];
                    e[o] = e[A];
                    t[A] = m;
                    e[A] = x;
                    A++;
                }
            }
        }
        if (r - y < A - s) {
            At(t, e, y, r, i);
            r = A;
        } else {
            At(t, e, s, A, i);
            s = y;
        }
    }
}

const yt = Array.prototype;

const mt = yt.push;

const xt = yt.unshift;

const Ut = yt.pop;

const St = yt.shift;

const Ot = yt.splice;

const Ct = yt.reverse;

const kt = yt.sort;

const $t = {
    push: mt,
    unshift: xt,
    pop: Ut,
    shift: St,
    splice: Ot,
    reverse: Ct,
    sort: kt
};

const Bt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const Lt = {
    push: function(...t) {
        const e = gt.get(this);
        if (void 0 === e) return mt.apply(this, t);
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
        const e = gt.get(this);
        if (void 0 === e) return xt.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        xt.apply(e.indexMap, r);
        const n = xt.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = gt.get(this);
        if (void 0 === t) return Ut.call(this);
        const e = t.indexMap;
        const s = Ut.call(this);
        const r = e.length - 1;
        if (e[r] > -1) e.deletedItems.push(e[r]);
        Ut.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = gt.get(this);
        if (void 0 === t) return St.call(this);
        const e = t.indexMap;
        const s = St.call(this);
        if (e[0] > -1) e.deletedItems.push(e[0]);
        St.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = gt.get(this);
        if (void 0 === r) return Ot.apply(this, t);
        const i = this.length;
        const n = 0 | e;
        const o = n < 0 ? Math.max(i + n, 0) : Math.min(n, i);
        const c = r.indexMap;
        const u = t.length;
        const h = 0 === u ? 0 : 1 === u ? i - o : s;
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
            const r = new Array(t);
            let i = 0;
            while (i < t) r[i++] = -2;
            Ot.call(c, e, s, ...r);
        } else Ot.apply(c, t);
        const a = Ot.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = gt.get(this);
        if (void 0 === t) {
            Ct.call(this);
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
            const c = t.indexMap[s];
            this[r] = o;
            t.indexMap[r] = c;
            this[s] = i;
            t.indexMap[s] = n;
            r++;
        }
        t.notify();
        return this;
    },
    sort: function(t) {
        const e = gt.get(this);
        if (void 0 === e) {
            kt.call(this, t);
            return this;
        }
        const s = this.length;
        if (s < 2) return this;
        At(this, e.indexMap, 0, s, bt);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !p(t)) t = wt;
        At(this, e.indexMap, 0, r, t);
        e.notify();
        return this;
    }
};

for (const t of Bt) v(Lt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Rt = false;

function Pt() {
    for (const t of Bt) if (true !== yt[t].observing) w(yt, t, Lt[t]);
}

function Tt() {
    for (const t of Bt) if (true === yt[t].observing) w(yt, t, $t[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!Rt) {
            Rt = true;
            Pt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = tt(t.length);
        this.lenObs = void 0;
        gt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.length;
        this.indexMap = tt(e);
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

rt(ArrayObserver);

rt(ArrayIndexObserver);

function jt(t) {
    let e = gt.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

function It(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = et(t);
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

function Mt(t, e) {
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

const Dt = new WeakMap;

const Ft = Set.prototype;

const Vt = Ft.add;

const Nt = Ft.clear;

const Kt = Ft.delete;

const qt = {
    add: Vt,
    clear: Nt,
    delete: Kt
};

const Ht = [ "add", "clear", "delete" ];

const Qt = {
    add: function(t) {
        const e = Dt.get(this);
        if (void 0 === e) {
            Vt.call(this, t);
            return this;
        }
        const s = this.size;
        Vt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Dt.get(this);
        if (void 0 === t) return Nt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            Nt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Dt.get(this);
        if (void 0 === e) return Kt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = Kt.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            r++;
        }
        return false;
    }
};

const _t = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ht) v(Qt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let zt = false;

function Wt() {
    for (const t of Ht) if (true !== Ft[t].observing) v(Ft, t, {
        ..._t,
        value: Qt[t]
    });
}

function Gt() {
    for (const t of Ht) if (true === Ft[t].observing) v(Ft, t, {
        ..._t,
        value: qt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!zt) {
            zt = true;
            Wt();
        }
        this.collection = t;
        this.indexMap = tt(t.size);
        this.lenObs = void 0;
        Dt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = tt(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        var t;
        return null !== (t = this.lenObs) && void 0 !== t ? t : this.lenObs = new CollectionSizeObserver(this);
    }
}

rt(SetObserver);

function Zt(t) {
    let e = Dt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Jt = new WeakMap;

const Xt = Map.prototype;

const Yt = Xt.set;

const te = Xt.clear;

const ee = Xt.delete;

const se = {
    set: Yt,
    clear: te,
    delete: ee
};

const re = [ "set", "clear", "delete" ];

const ie = {
    set: function(t, e) {
        const s = Jt.get(this);
        if (void 0 === s) {
            Yt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Yt.call(this, t, e);
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
        const t = Jt.get(this);
        if (void 0 === t) return te.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            te.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Jt.get(this);
        if (void 0 === e) return ee.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = ee.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            ++r;
        }
        return false;
    }
};

const ne = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of re) v(ie[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let oe = false;

function ce() {
    for (const t of re) if (true !== Xt[t].observing) v(Xt, t, {
        ...ne,
        value: ie[t]
    });
}

function ue() {
    for (const t of re) if (true === Xt[t].observing) v(Xt, t, {
        ...ne,
        value: se[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!oe) {
            oe = true;
            ce();
        }
        this.collection = t;
        this.indexMap = tt(t.size);
        this.lenObs = void 0;
        Jt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = tt(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        var t;
        return null !== (t = this.lenObs) && void 0 !== t ? t : this.lenObs = new CollectionSizeObserver(this);
    }
}

rt(MapObserver);

function he(t) {
    let e = Jt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function ae(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function le() {
    return w(this, "obs", new BindingObserverRecord(this));
}

function fe(t) {
    let e;
    if (t instanceof Array) e = jt(t); else if (t instanceof Set) e = Zt(t); else if (t instanceof Map) e = he(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function de(t) {
    this.obs.add(t);
}

function ve() {
    throw new Error(`AUR2011:handleChange`);
}

function pe() {
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
        this.o.forEach(we, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(ge, this);
        this.o.clear();
        this.count = 0;
    }
}

function ge(t, e) {
    e.unsubscribe(this);
}

function we(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function be(t) {
    const e = t.prototype;
    b(e, "observe", ae, true);
    b(e, "observeCollection", fe, true);
    b(e, "subscribeTo", de, true);
    v(e, "obs", {
        get: le
    });
    b(e, "handleChange", ve);
    b(e, "handleCollectionChange", pe);
    return t;
}

function Ee(t) {
    return null == t ? be : be(t);
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

be(BindingMediator);

const Ae = s.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = E();
        this.A = E();
        this.U = E();
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
        Re.ip = t;
        Re.length = t.length;
        Re.index = 0;
        Re.O = t.charCodeAt(0);
        return Te(Re, 61, void 0 === e ? 8 : e);
    }
}

var ye;

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
})(ye || (ye = {}));

function me(t) {
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

var xe;

(function(t) {
    t[t["Variadic"] = 61] = "Variadic";
    t[t["Assign"] = 62] = "Assign";
    t[t["Conditional"] = 63] = "Conditional";
    t[t["NullishCoalescing"] = 64] = "NullishCoalescing";
    t[t["LogicalOR"] = 128] = "LogicalOR";
    t[t["LogicalAND"] = 192] = "LogicalAND";
    t[t["Equality"] = 256] = "Equality";
    t[t["Relational"] = 320] = "Relational";
    t[t["Additive"] = 384] = "Additive";
    t[t["Multiplicative"] = 448] = "Multiplicative";
    t[t["Binary"] = 449] = "Binary";
    t[t["LeftHandSide"] = 450] = "LeftHandSide";
    t[t["Primary"] = 451] = "Primary";
    t[t["Unary"] = 452] = "Unary";
})(xe || (xe = {}));

var Ue;

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
})(Ue || (Ue = {}));

const Se = PrimitiveLiteralExpression.$false;

const Oe = PrimitiveLiteralExpression.$true;

const Ce = PrimitiveLiteralExpression.$null;

const ke = PrimitiveLiteralExpression.$undefined;

const $e = AccessThisExpression.$this;

const Be = AccessThisExpression.$parent;

var Le;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(Le || (Le = {}));

class ParserState {
    constructor(t) {
        this.ip = t;
        this.index = 0;
        this.C = 0;
        this.$ = 6291456;
        this.B = "";
        this.L = true;
        this.R = false;
        this.length = t.length;
        this.O = t.charCodeAt(0);
    }
    get P() {
        return this.ip.slice(this.C, this.index);
    }
}

const Re = new ParserState("");

function Pe(t, e) {
    Re.ip = t;
    Re.length = t.length;
    Re.index = 0;
    Re.O = t.charCodeAt(0);
    return Te(Re, 61, void 0 === e ? 8 : e);
}

function Te(t, e, s) {
    if (16 === s) return new CustomExpression(t.ip);
    if (0 === t.index) {
        if (1 & s) return _e(t);
        Ge(t);
        if (4194304 & t.$) throw new Error(`AUR0151:${t.ip}`);
    }
    t.L = 449 > e;
    t.R = false;
    let r = false;
    let i;
    let n = 0;
    if (131072 & t.$) {
        const e = os[63 & t.$];
        Ge(t);
        i = new UnaryExpression(e, Te(t, 450, s));
        t.L = false;
    } else {
        t: switch (t.$) {
          case 12294:
            t.L = false;
            do {
                Ge(t);
                ++n;
                if (is(t, 65545)) {
                    if (65545 === t.$) throw new Error(`AUR0152:${t.ip}`); else if (6291456 === t.$) throw new Error(`AUR0153:${t.ip}`);
                } else if (2162698 === t.$) {
                    t.R = true;
                    Ge(t);
                    if (0 === (12288 & t.$)) {
                        i = 0 === n ? $e : 1 === n ? Be : new AccessThisExpression(n);
                        r = true;
                        break t;
                    }
                } else if (2097152 & t.$) {
                    i = 0 === n ? $e : 1 === n ? Be : new AccessThisExpression(n);
                    break t;
                } else throw new Error(`AUR0154:${t.ip}`);
            } while (12294 === t.$);

          case 4096:
            if (2 & s) i = new BindingIdentifier(t.B); else i = new AccessScopeExpression(t.B, n);
            t.L = !t.R;
            Ge(t);
            break;

          case 12292:
            t.L = false;
            Ge(t);
            i = $e;
            break;

          case 2688007:
            {
                Ge(t);
                const e = t.R;
                i = Te(t, 62, s);
                t.R = e;
                ns(t, 7340044);
                break;
            }

          case 2688014:
            i = t.ip.search(/\s+of\s+/) > t.index ? je(t) : qe(t, s);
            break;

          case 524296:
            i = Qe(t, s);
            break;

          case 2163756:
            i = new TemplateExpression([ t.B ]);
            t.L = false;
            Ge(t);
            break;

          case 2163757:
            i = ze(t, s, i, false);
            break;

          case 16384:
          case 32768:
            i = new PrimitiveLiteralExpression(t.B);
            t.L = false;
            Ge(t);
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            i = os[63 & t.$];
            t.L = false;
            Ge(t);
            break;

          default:
            if (t.index >= t.length) throw new Error(`AUR0155:${t.ip}`); else throw new Error(`AUR0156:${t.ip}`);
        }
        if (2 & s) return He(t, i);
        if (450 < e) return i;
        if (1793 === i.$kind) switch (t.$) {
          case 2162698:
            t.R = true;
            t.L = false;
            Ge(t);
            Ve(t);
            if (12288 & t.$) {
                i = new AccessScopeExpression(t.B, i.ancestor);
                Ge(t);
            } else if (2688007 === t.$) i = new CallFunctionExpression(i, Ie(t), true); else if (2688014 === t.$) i = Me(t, i, true); else throw Ke(t);
            break;

          case 65545:
            t.L = !t.R;
            Ge(t);
            Ne(t);
            i = new AccessScopeExpression(t.B, i.ancestor);
            Ge(t);
            break;

          case 2688007:
            i = new CallFunctionExpression(i, Ie(t), r);
            break;

          case 2688014:
            i = Me(t, i, r);
            break;

          case 2163756:
            i = We(t, i);
            break;

          case 2163757:
            i = ze(t, s, i, true);
            break;
        }
        while ((65536 & t.$) > 0) switch (t.$) {
          case 2162698:
            i = De(t, i);
            break;

          case 65545:
            Ge(t);
            Ne(t);
            i = Fe(t, i, false);
            break;

          case 2688007:
            if (10082 === i.$kind) i = new CallScopeExpression(i.name, Ie(t), i.ancestor, false); else if (9323 === i.$kind) i = new CallMemberExpression(i.object, i.name, Ie(t), i.optional, false); else i = new CallFunctionExpression(i, Ie(t), false);
            break;

          case 2688014:
            i = Me(t, i, false);
            break;

          case 2163756:
            if (t.R) throw Ke(t);
            i = We(t, i);
            break;

          case 2163757:
            if (t.R) throw Ke(t);
            i = ze(t, s, i, true);
            break;
        }
    }
    if (449 < e) return i;
    while ((262144 & t.$) > 0) {
        const r = t.$;
        if ((960 & r) <= e) break;
        Ge(t);
        i = new BinaryExpression(os[63 & r], i, Te(t, 960 & r, s));
        t.L = false;
    }
    if (63 < e) return i;
    if (is(t, 6291475)) {
        const e = Te(t, 62, s);
        ns(t, 6291472);
        i = new ConditionalExpression(i, e, Te(t, 62, s));
        t.L = false;
    }
    if (62 < e) return i;
    if (is(t, 4194346)) {
        if (!t.L) throw new Error(`AUR0158:${t.ip}`);
        i = new AssignExpression(i, Te(t, 62, s));
    }
    if (61 < e) return i;
    while (is(t, 6291477)) {
        if (6291456 === t.$) throw new Error(`AUR0159:${t.ip}`);
        const e = t.B;
        Ge(t);
        const r = new Array;
        while (is(t, 6291472)) r.push(Te(t, 62, s));
        i = new ValueConverterExpression(i, e, r);
    }
    while (is(t, 6291476)) {
        if (6291456 === t.$) throw new Error(`AUR0160:${t.ip}`);
        const e = t.B;
        Ge(t);
        const r = new Array;
        while (is(t, 6291472)) r.push(Te(t, 62, s));
        i = new BindingBehaviorExpression(i, e, r);
    }
    if (6291456 !== t.$) {
        if (1 & s) return i;
        if ("of" === t.P) throw new Error(`AUR0161:${t.ip}`);
        throw new Error(`AUR0162:${t.ip}`);
    }
    return i;
}

function je(t) {
    const e = [];
    const s = new DestructuringAssignmentExpression(90137, e, void 0, void 0);
    let r = "";
    let i = true;
    let n = 0;
    while (i) {
        Ge(t);
        switch (t.$) {
          case 7340047:
            i = false;
            o();
            break;

          case 6291469:
            o();
            break;

          case 4096:
            r = t.P;
            break;

          default:
            throw new Error(`AUR0170:${t.ip}`);
        }
    }
    ns(t, 7340047);
    return s;
    function o() {
        if ("" !== r) {
            e.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression($e, r), new AccessKeyedExpression($e, new PrimitiveLiteralExpression(n++)), void 0));
            r = "";
        } else n++;
    }
}

function Ie(t) {
    const e = t.R;
    Ge(t);
    const s = [];
    while (7340044 !== t.$) {
        s.push(Te(t, 62, 0));
        if (!is(t, 6291469)) break;
    }
    ns(t, 7340044);
    t.L = false;
    t.R = e;
    return s;
}

function Me(t, e, s) {
    const r = t.R;
    Ge(t);
    e = new AccessKeyedExpression(e, Te(t, 62, 0), s);
    ns(t, 7340047);
    t.L = !r;
    t.R = r;
    return e;
}

function De(t, e) {
    t.R = true;
    t.L = false;
    Ge(t);
    Ve(t);
    if (12288 & t.$) return Fe(t, e, true);
    if (2688007 === t.$) if (10082 === e.$kind) return new CallScopeExpression(e.name, Ie(t), e.ancestor, true); else if (9323 === e.$kind) return new CallMemberExpression(e.object, e.name, Ie(t), e.optional, true); else return new CallFunctionExpression(e, Ie(t), true);
    if (2688014 === t.$) return Me(t, e, true);
    throw Ke(t);
}

function Fe(t, e, s) {
    const r = t.B;
    switch (t.$) {
      case 2162698:
        t.R = true;
        t.L = false;
        Ze(t);
        Ge(t);
        Ve(t);
        if (2688007 === t.$) return new CallMemberExpression(e, r, Ie(t), s, true);
        Je(t);
        return new AccessMemberExpression(e, r, s);

      case 2688007:
        t.L = false;
        return new CallMemberExpression(e, r, Ie(t), s, false);

      default:
        t.L = !t.R;
        Ge(t);
        return new AccessMemberExpression(e, r, s);
    }
}

function Ve(t) {
    if (0 === (13312 & t.$)) throw new Error(`AUR0171:${t.ip}`);
}

function Ne(t) {
    if (0 === (12288 & t.$)) throw new Error(`AUR0153:${t.ip}`);
}

function Ke(t) {
    return new Error(`AUR0172:${t.ip}`);
}

function qe(t, e) {
    const s = t.R;
    Ge(t);
    const r = new Array;
    while (7340047 !== t.$) if (is(t, 6291469)) {
        r.push(ke);
        if (7340047 === t.$) break;
    } else {
        r.push(Te(t, 62, ~2 & e));
        if (is(t, 6291469)) {
            if (7340047 === t.$) break;
        } else break;
    }
    t.R = s;
    ns(t, 7340047);
    if (2 & e) return new ArrayBindingPattern(r); else {
        t.L = false;
        return new ArrayLiteralExpression(r);
    }
}

function He(t, e) {
    if (0 === (65536 & e.$kind)) throw new Error(`AUR0163:${t.ip}`);
    if (4204590 !== t.$) throw new Error(`AUR0163:${t.ip}`);
    Ge(t);
    const s = e;
    const r = Te(t, 61, 0);
    return new ForOfStatement(s, r);
}

function Qe(t, e) {
    const s = t.R;
    const r = new Array;
    const i = new Array;
    Ge(t);
    while (7340043 !== t.$) {
        r.push(t.B);
        if (49152 & t.$) {
            Ge(t);
            ns(t, 6291472);
            i.push(Te(t, 62, ~2 & e));
        } else if (12288 & t.$) {
            const {O: s, $: r, index: n} = t;
            Ge(t);
            if (is(t, 6291472)) i.push(Te(t, 62, ~2 & e)); else {
                t.O = s;
                t.$ = r;
                t.index = n;
                i.push(Te(t, 451, ~2 & e));
            }
        } else throw new Error(`AUR0164:${t.ip}`);
        if (7340043 !== t.$) ns(t, 6291469);
    }
    t.R = s;
    ns(t, 7340043);
    if (2 & e) return new ObjectBindingPattern(r, i); else {
        t.L = false;
        return new ObjectLiteralExpression(r, i);
    }
}

function _e(t) {
    const e = [];
    const s = [];
    const r = t.length;
    let i = "";
    while (t.index < r) {
        switch (t.O) {
          case 36:
            if (123 === t.ip.charCodeAt(t.index + 1)) {
                e.push(i);
                i = "";
                t.index += 2;
                t.O = t.ip.charCodeAt(t.index);
                Ge(t);
                const r = Te(t, 61, 1);
                s.push(r);
                continue;
            } else i += "$";
            break;

          case 92:
            i += String.fromCharCode(me(Xe(t)));
            break;

          default:
            i += String.fromCharCode(t.O);
        }
        Xe(t);
    }
    if (s.length) {
        e.push(i);
        return new Interpolation(e, s);
    }
    return null;
}

function ze(t, e, s, r) {
    const i = t.R;
    const n = [ t.B ];
    ns(t, 2163757);
    const o = [ Te(t, 62, e) ];
    while (2163756 !== (t.$ = rs(t))) {
        n.push(t.B);
        ns(t, 2163757);
        o.push(Te(t, 62, e));
    }
    n.push(t.B);
    t.L = false;
    t.R = i;
    if (r) {
        Ge(t);
        return new TaggedTemplateExpression(n, n, s, o);
    } else {
        Ge(t);
        return new TemplateExpression(n, o);
    }
}

function We(t, e) {
    t.L = false;
    const s = [ t.B ];
    Ge(t);
    return new TaggedTemplateExpression(s, s, e);
}

function Ge(t) {
    while (t.index < t.length) {
        t.C = t.index;
        if (null != (t.$ = vs[t.O](t))) return;
    }
    t.$ = 6291456;
}

const {save: Ze, restore: Je} = function() {
    let t = 0;
    let e = 0;
    let s = 6291456;
    let r = 0;
    let i = "";
    let n = true;
    let o = false;
    function c(c) {
        t = c.index;
        e = c.C;
        s = c.$;
        r = c.O;
        i = c.B;
        n = c.L;
        o = c.R;
    }
    function u(c) {
        c.index = t;
        c.C = e;
        c.$ = s;
        c.O = r;
        c.B = i;
        c.L = n;
        c.R = o;
    }
    return {
        save: c,
        restore: u
    };
}();

function Xe(t) {
    return t.O = t.ip.charCodeAt(++t.index);
}

function Ye(t) {
    while (ds[Xe(t)]) ;
    const e = cs[t.B = t.P];
    return void 0 === e ? 4096 : e;
}

function ts(t, e) {
    let s = t.O;
    if (false === e) {
        do {
            s = Xe(t);
        } while (s <= 57 && s >= 48);
        if (46 !== s) {
            t.B = parseInt(t.P, 10);
            return 32768;
        }
        s = Xe(t);
        if (t.index >= t.length) {
            t.B = parseInt(t.P.slice(0, -1), 10);
            return 32768;
        }
    }
    if (s <= 57 && s >= 48) do {
        s = Xe(t);
    } while (s <= 57 && s >= 48); else t.O = t.ip.charCodeAt(--t.index);
    t.B = parseFloat(t.P);
    return 32768;
}

function es(t) {
    const e = t.O;
    Xe(t);
    let s = 0;
    const r = new Array;
    let i = t.index;
    while (t.O !== e) if (92 === t.O) {
        r.push(t.ip.slice(i, t.index));
        Xe(t);
        s = me(t.O);
        Xe(t);
        r.push(String.fromCharCode(s));
        i = t.index;
    } else if (t.index >= t.length) throw new Error(`AUR0165:${t.ip}`); else Xe(t);
    const n = t.ip.slice(i, t.index);
    Xe(t);
    r.push(n);
    const o = r.join("");
    t.B = o;
    return 16384;
}

function ss(t) {
    let e = true;
    let s = "";
    while (96 !== Xe(t)) if (36 === t.O) if (t.index + 1 < t.length && 123 === t.ip.charCodeAt(t.index + 1)) {
        t.index++;
        e = false;
        break;
    } else s += "$"; else if (92 === t.O) s += String.fromCharCode(me(Xe(t))); else {
        if (t.index >= t.length) throw new Error(`AUR0166:${t.ip}`);
        s += String.fromCharCode(t.O);
    }
    Xe(t);
    t.B = s;
    if (e) return 2163756;
    return 2163757;
}

function rs(t) {
    if (t.index >= t.length) throw new Error(`AUR0166:${t.ip}`);
    t.index--;
    return ss(t);
}

function is(t, e) {
    if (t.$ === e) {
        Ge(t);
        return true;
    }
    return false;
}

function ns(t, e) {
    if (t.$ === e) Ge(t); else throw new Error(`AUR0167:${t.ip}<${e}`);
}

const os = [ Se, Oe, Ce, ke, "$this", null, "$parent", "(", "{", ".", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163756, 2163757, "of" ];

const cs = E();

cs.true = 8193;

cs.null = 8194;

cs.false = 8192;

cs.undefined = 8195;

cs.$this = 12292;

cs.$parent = 12294;

cs.in = 6562209;

cs.instanceof = 6562210;

cs.typeof = 139301;

cs.void = 139302;

cs.of = 4204590;

const us = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function hs(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function as(t) {
    return e => {
        Xe(e);
        return t;
    };
}

const ls = t => {
    throw new Error(`AUR0168:${t.ip}`);
};

ls.notMapped = true;

const fs = new Set;

hs(null, fs, us.AsciiIdPart, true);

const ds = new Uint8Array(65535);

hs(ds, null, us.IdStart, 1);

hs(ds, null, us.Digit, 1);

const vs = new Array(65535);

vs.fill(ls, 0, 65535);

hs(vs, null, us.Skip, (t => {
    Xe(t);
    return null;
}));

hs(vs, null, us.IdStart, Ye);

hs(vs, null, us.Digit, (t => ts(t, false)));

vs[34] = vs[39] = t => es(t);

vs[96] = t => ss(t);

vs[33] = t => {
    if (61 !== Xe(t)) return 131115;
    if (61 !== Xe(t)) return 6553946;
    Xe(t);
    return 6553948;
};

vs[61] = t => {
    if (61 !== Xe(t)) return 4194346;
    if (61 !== Xe(t)) return 6553945;
    Xe(t);
    return 6553947;
};

vs[38] = t => {
    if (38 !== Xe(t)) return 6291476;
    Xe(t);
    return 6553880;
};

vs[124] = t => {
    if (124 !== Xe(t)) return 6291477;
    Xe(t);
    return 6553815;
};

vs[63] = t => {
    if (46 === Xe(t)) {
        const e = t.ip.charCodeAt(t.index + 1);
        if (e <= 48 || e >= 57) {
            Xe(t);
            return 2162698;
        }
        return 6291475;
    }
    if (63 !== t.O) return 6291475;
    if (61 === Xe(t)) throw new Error("Operator ??= is not supported.");
    return 6553750;
};

vs[46] = t => {
    if (Xe(t) <= 57 && t.O >= 48) return ts(t, true);
    return 65545;
};

vs[60] = t => {
    if (61 !== Xe(t)) return 6554013;
    Xe(t);
    return 6554015;
};

vs[62] = t => {
    if (61 !== Xe(t)) return 6554014;
    Xe(t);
    return 6554016;
};

vs[37] = as(6554152);

vs[40] = as(2688007);

vs[41] = as(7340044);

vs[42] = as(6554151);

vs[43] = as(2490851);

vs[44] = as(6291469);

vs[45] = as(2490852);

vs[47] = as(6554153);

vs[58] = as(6291472);

vs[91] = as(2688014);

vs[93] = as(7340047);

vs[123] = as(524296);

vs[125] = as(7340043);

let ps = null;

const gs = [];

let ws = false;

function bs() {
    ws = false;
}

function Es() {
    ws = true;
}

function As() {
    return ps;
}

function ys(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == ps) {
        ps = t;
        gs[0] = ps;
        ws = true;
        return;
    }
    if (ps === t) throw new Error(`AUR0207`);
    gs.push(t);
    ps = t;
    ws = true;
}

function ms(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (ps !== t) throw new Error(`AUR0209`);
    gs.pop();
    ps = gs.length > 0 ? gs[gs.length - 1] : null;
    ws = null != ps;
}

const xs = Object.freeze({
    get current() {
        return ps;
    },
    get connecting() {
        return ws;
    },
    enter: ys,
    exit: ms,
    pause: bs,
    resume: Es
});

const Us = Reflect.get;

const Ss = Object.prototype.toString;

const Os = new WeakMap;

function Cs(t) {
    switch (Ss.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const ks = "__raw__";

function $s(t) {
    return Cs(t) ? Bs(t) : t;
}

function Bs(t) {
    var e;
    return null !== (e = Os.get(t)) && void 0 !== e ? e : Ts(t);
}

function Ls(t) {
    var e;
    return null !== (e = t[ks]) && void 0 !== e ? e : t;
}

function Rs(t) {
    return Cs(t) && t[ks] || t;
}

function Ps(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Ts(t) {
    const e = t instanceof Array ? Is : t instanceof Map || t instanceof Set ? nr : js;
    const s = new Proxy(t, e);
    Os.set(t, s);
    return s;
}

const js = {
    get(t, e, s) {
        if (e === ks) return t;
        const r = As();
        if (!ws || Ps(e) || null == r) return Us(t, e, s);
        r.observe(t, e);
        return $s(Us(t, e, s));
    }
};

const Is = {
    get(t, e, s) {
        if (e === ks) return t;
        const r = As();
        if (!ws || Ps(e) || null == r) return Us(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Ms;

          case "includes":
            return Vs;

          case "indexOf":
            return Ns;

          case "lastIndexOf":
            return Ks;

          case "every":
            return Ds;

          case "filter":
            return Fs;

          case "find":
            return Hs;

          case "findIndex":
            return qs;

          case "flat":
            return Qs;

          case "flatMap":
            return _s;

          case "join":
            return zs;

          case "push":
            return Gs;

          case "pop":
            return Ws;

          case "reduce":
            return rr;

          case "reduceRight":
            return ir;

          case "reverse":
            return Ys;

          case "shift":
            return Zs;

          case "unshift":
            return Js;

          case "slice":
            return sr;

          case "splice":
            return Xs;

          case "some":
            return tr;

          case "sort":
            return er;

          case "keys":
            return dr;

          case "values":
          case Symbol.iterator:
            return vr;

          case "entries":
            return pr;
        }
        r.observe(t, e);
        return $s(Us(t, e, s));
    },
    ownKeys(t) {
        var e;
        null === (e = As()) || void 0 === e ? void 0 : e.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Ms(t, e) {
    var s;
    const r = Ls(this);
    const i = r.map(((s, r) => Rs(t.call(e, $s(s), r, this))));
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return $s(i);
}

function Ds(t, e) {
    var s;
    const r = Ls(this);
    const i = r.every(((s, r) => t.call(e, $s(s), r, this)));
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return i;
}

function Fs(t, e) {
    var s;
    const r = Ls(this);
    const i = r.filter(((s, r) => Rs(t.call(e, $s(s), r, this))));
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return $s(i);
}

function Vs(t) {
    var e;
    const s = Ls(this);
    const r = s.includes(Rs(t));
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return r;
}

function Ns(t) {
    var e;
    const s = Ls(this);
    const r = s.indexOf(Rs(t));
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return r;
}

function Ks(t) {
    var e;
    const s = Ls(this);
    const r = s.lastIndexOf(Rs(t));
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return r;
}

function qs(t, e) {
    var s;
    const r = Ls(this);
    const i = r.findIndex(((s, r) => Rs(t.call(e, $s(s), r, this))));
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return i;
}

function Hs(t, e) {
    var s;
    const r = Ls(this);
    const i = r.find(((e, s) => t($s(e), s, this)), e);
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return $s(i);
}

function Qs() {
    var t;
    const e = Ls(this);
    null === (t = As()) || void 0 === t ? void 0 : t.observeCollection(e);
    return $s(e.flat());
}

function _s(t, e) {
    var s;
    const r = Ls(this);
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return Bs(r.flatMap(((s, r) => $s(t.call(e, $s(s), r, this)))));
}

function zs(t) {
    var e;
    const s = Ls(this);
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return s.join(t);
}

function Ws() {
    return $s(Ls(this).pop());
}

function Gs(...t) {
    return Ls(this).push(...t);
}

function Zs() {
    return $s(Ls(this).shift());
}

function Js(...t) {
    return Ls(this).unshift(...t);
}

function Xs(...t) {
    return $s(Ls(this).splice(...t));
}

function Ys(...t) {
    var e;
    const s = Ls(this);
    const r = s.reverse();
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return $s(r);
}

function tr(t, e) {
    var s;
    const r = Ls(this);
    const i = r.some(((s, r) => Rs(t.call(e, $s(s), r, this))));
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return i;
}

function er(t) {
    var e;
    const s = Ls(this);
    const r = s.sort(t);
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return $s(r);
}

function sr(t, e) {
    var s;
    const r = Ls(this);
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return Bs(r.slice(t, e));
}

function rr(t, e) {
    var s;
    const r = Ls(this);
    const i = r.reduce(((e, s, r) => t(e, $s(s), r, this)), e);
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return $s(i);
}

function ir(t, e) {
    var s;
    const r = Ls(this);
    const i = r.reduceRight(((e, s, r) => t(e, $s(s), r, this)), e);
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return $s(i);
}

const nr = {
    get(t, e, s) {
        if (e === ks) return t;
        const r = As();
        if (!ws || Ps(e) || null == r) return Us(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return lr;

          case "delete":
            return fr;

          case "forEach":
            return or;

          case "add":
            if (t instanceof Set) return ar;
            break;

          case "get":
            if (t instanceof Map) return ur;
            break;

          case "set":
            if (t instanceof Map) return hr;
            break;

          case "has":
            return cr;

          case "keys":
            return dr;

          case "values":
            return vr;

          case "entries":
            return pr;

          case Symbol.iterator:
            return t instanceof Map ? pr : vr;
        }
        return $s(Us(t, e, s));
    }
};

function or(t, e) {
    var s;
    const r = Ls(this);
    null === (s = As()) || void 0 === s ? void 0 : s.observeCollection(r);
    return r.forEach(((s, r) => {
        t.call(e, $s(s), $s(r), this);
    }));
}

function cr(t) {
    var e;
    const s = Ls(this);
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return s.has(Rs(t));
}

function ur(t) {
    var e;
    const s = Ls(this);
    null === (e = As()) || void 0 === e ? void 0 : e.observeCollection(s);
    return $s(s.get(Rs(t)));
}

function hr(t, e) {
    return $s(Ls(this).set(Rs(t), Rs(e)));
}

function ar(t) {
    return $s(Ls(this).add(Rs(t)));
}

function lr() {
    return $s(Ls(this).clear());
}

function fr(t) {
    return $s(Ls(this).delete(Rs(t)));
}

function dr() {
    var t;
    const e = Ls(this);
    null === (t = As()) || void 0 === t ? void 0 : t.observeCollection(e);
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
                value: $s(e),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function vr() {
    var t;
    const e = Ls(this);
    null === (t = As()) || void 0 === t ? void 0 : t.observeCollection(e);
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
                value: $s(e),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function pr() {
    var t;
    const e = Ls(this);
    null === (t = As()) || void 0 === t ? void 0 : t.observeCollection(e);
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
                value: [ $s(e[0]), $s(e[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const gr = Object.freeze({
    getProxy: Bs,
    getRaw: Ls,
    wrap: $s,
    unwrap: Rs,
    rawKey: ks
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
    static create(t, e, s, r, i) {
        const n = s.get;
        const o = s.set;
        const c = new ComputedObserver(t, n, o, i, r);
        const u = () => c.getValue();
        u.getObserver = () => c;
        v(t, e, {
            enumerable: s.enumerable,
            configurable: true,
            get: u,
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
        if (p(this.set)) {
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
        wr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, wr, 0);
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
            ys(this);
            return this.v = Rs(this.get.call(this.up ? $s(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            ms(this);
        }
    }
}

Ee(ComputedObserver);

rt(ComputedObserver);

ut(ComputedObserver);

let wr;

const br = s.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Er = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Ar = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.T = null;
        this.j = 0;
        this.check = () => {
            if (Er.disabled) return;
            if (++this.j < Er.timeoutsPerCheck) return;
            this.j = 0;
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
        if (Er.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.T = this.p.taskQueue.queueTask(this.check, Ar);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.T.cancel();
            this.T = null;
        }
    }
}

DirtyChecker.inject = [ a ];

ut(DirtyChecker);

class DirtyCheckProperty {
    constructor(t, e, s) {
        this.obj = e;
        this.key = s;
        this.type = 0;
        this.ov = void 0;
        this.I = t;
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
            this.I.addProperty(this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.I.removeProperty(this);
    }
}

rt(DirtyCheckProperty);

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

let yr;

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
        yr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, yr, this.f);
    }
    start() {
        if (false === this.iO) {
            this.iO = true;
            this.v = this.o[this.k];
            v(this.o, this.k, {
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
            v(this.o, this.k, {
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
        this.hs = p(s);
        const i = t[e];
        this.cb = p(i) ? i : void 0;
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
        yr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, yr, this.f);
    }
}

rt(SetterObserver);

rt(SetterNotifier);

ut(SetterObserver);

ut(SetterNotifier);

const mr = new PropertyAccessor;

const xr = s.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Ur = s.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => {
    t.getAll(l).forEach((t => {
        t.error("Using default INodeObserverLocator implementation. Will not be able to observe nodes (HTML etc...).");
    }));
    return new DefaultNodeObserverLocator;
}))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return mr;
    }
    getAccessor() {
        return mr;
    }
}

class ObserverLocator {
    constructor(t, e) {
        this.I = t;
        this.M = e;
        this.F = [];
    }
    addAdapter(t) {
        this.F.push(t);
    }
    getObserver(t, e) {
        var s, r;
        return null !== (r = null === (s = t.$observers) || void 0 === s ? void 0 : s[e]) && void 0 !== r ? r : this.V(t, e, this.createObserver(t, e));
    }
    getAccessor(t, e) {
        var s;
        const r = null === (s = t.$observers) || void 0 === s ? void 0 : s[e];
        if (void 0 !== r) return r;
        if (this.M.handles(t, e, this)) return this.M.getAccessor(t, e, this);
        return mr;
    }
    getArrayObserver(t) {
        return jt(t);
    }
    getMapObserver(t) {
        return he(t);
    }
    getSetObserver(t) {
        return Zt(t);
    }
    createObserver(t, e) {
        var s, r, i, n;
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        if (this.M.handles(t, e, this)) return this.M.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (t instanceof Array) return jt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return he(t).getLengthObserver(); else if (t instanceof Set) return Zt(t).getLengthObserver();
            break;

          default:
            if (t instanceof Array && h(e)) return jt(t).getIndexObserver(Number(e));
            break;
        }
        let o = Cr(t, e);
        if (void 0 === o) {
            let s = Or(t);
            while (null !== s) {
                o = Cr(s, e);
                if (void 0 === o) s = Or(s); else break;
            }
        }
        if (void 0 !== o && !d.call(o, "value")) {
            let c = this.N(t, e, o);
            if (null == c) c = null === (n = null !== (r = null === (s = o.get) || void 0 === s ? void 0 : s.getObserver) && void 0 !== r ? r : null === (i = o.set) || void 0 === i ? void 0 : i.getObserver) || void 0 === n ? void 0 : n(t, this);
            return null == c ? o.configurable ? ComputedObserver.create(t, e, o, this, true) : this.I.createProperty(t, e) : c;
        }
        return new SetterObserver(t, e);
    }
    N(t, e, s) {
        if (this.F.length > 0) for (const r of this.F) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
    V(t, e, s) {
        if (true === s.doNotCache) return s;
        if (void 0 === t.$observers) {
            v(t, "$observers", {
                value: {
                    [e]: s
                }
            });
            return s;
        }
        return t.$observers[e] = s;
    }
}

ObserverLocator.inject = [ br, Ur ];

function Sr(t) {
    let e;
    if (t instanceof Array) e = jt(t); else if (t instanceof Map) e = he(t); else if (t instanceof Set) e = Zt(t);
    return e;
}

const Or = Object.getPrototypeOf;

const Cr = Object.getOwnPropertyDescriptor;

const kr = s.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ xr ];
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
            ys(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            ms(this);
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

Ee(Effect);

function $r(t) {
    if (void 0 === t.$observers) v(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Br = {};

function Lr(t, e, s) {
    if (null == e) return (e, s, i) => r(e, s, i, t);
    return r(t, e, s);
    function r(t, e, s, r) {
        var i;
        const n = void 0 === e;
        r = "object" !== typeof r ? {
            name: r
        } : r || {};
        if (n) e = r.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const o = r.callback || `${String(e)}Changed`;
        let c = Br;
        if (s) {
            delete s.value;
            delete s.writable;
            c = null === (i = s.initializer) || void 0 === i ? void 0 : i.call(s);
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const u = r.set;
        s.get = function t() {
            var s;
            const r = Rr(this, e, o, c, u);
            null === (s = As()) || void 0 === s ? void 0 : s.subscribeTo(r);
            return r.getValue();
        };
        s.set = function t(s) {
            Rr(this, e, o, c, u).setValue(s, 0);
        };
        s.get.getObserver = function t(s) {
            return Rr(s, e, o, c, u);
        };
        if (n) v(t.prototype, e, s); else return s;
    }
}

function Rr(t, e, s, r, i) {
    const n = $r(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Br ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, X as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, AssignExpression, BinaryExpression, T as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorExpression, BindingBehaviorFactory, $ as BindingBehaviorStrategy, BindingContext, BindingIdentifier, BindingInterceptor, BindingMediator, z as BindingMode, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, ye as Char, J as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, xs as ConnectableSwitcher, CustomExpression, Z as DelegationStrategy, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Er as DirtyCheckSettings, F as ExpressionKind, Le as ExpressionType, FlushQueue, ForOfStatement, HtmlLiteralExpression, _ as ICoercionConfiguration, br as IDirtyChecker, Ae as IExpressionParser, Ur as INodeObserverLocator, kr as IObservation, xr as IObserverLocator, k as ISignaler, Interpolation, W as LifecycleFlags, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, OverrideContext, ParserState, xe as Precedence, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, gr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, D as ValueConverter, ValueConverterDefinition, ValueConverterExpression, O as alias, It as applyMutationsToIndices, B as bindingBehavior, et as cloneIndexMap, Ee as connectable, Y as copyIndexMap, tt as createIndexMap, Tt as disableArrayObservation, ue as disableMapObservation, Gt as disableSetObservation, Pt as enableArrayObservation, ce as enableMapObservation, Wt as enableSetObservation, Sr as getCollectionObserver, st as isIndexMap, Lr as observable, Te as parse, Pe as parseExpression, C as registerAliases, rt as subscriberCollection, Mt as synchronizeIndices, j as valueConverter, ut as withFlushQueue };

