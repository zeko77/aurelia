import { Protocol as t, Registration as e, DI as r, firstDefined as s, mergeArrays as i, fromAnnotationOrDefinitionOrTypeOrDefault as n, isNumberOrBigInt as o, isStringOrDate as c, emptyArray as u, isArrayIndex as h, IPlatform as a, ILogger as l } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as f } from "../../../metadata/dist/native-modules/index.mjs";

const d = Object.prototype.hasOwnProperty;

const v = Reflect.defineProperty;

const p = t => "function" === typeof t;

const w = t => "string" === typeof t;

function g(t, e, r) {
    v(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: r
    });
    return r;
}

function b(t, e, r, s = false) {
    if (s || !d.call(t, e)) g(t, e, r);
}

const E = () => Object.create(null);

const A = f.getOwn;

const y = f.hasOwn;

const m = f.define;

const U = t.annotation.keyFor;

const x = t.resource.keyFor;

const S = t.resource.appendTo;

function O(...t) {
    return function(e) {
        const r = U("aliases");
        const s = A(r, e);
        if (void 0 === s) m(r, t, e); else s.push(...t);
    };
}

function C(t, r, s, i) {
    for (let n = 0, o = t.length; n < o; ++n) e.aliasTo(s, r.keyFrom(t[n])).register(i);
}

Object.freeze({});

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) if (void 0 !== e) this[t] = e; else for (const e in t) if (d.call(t, e)) this[e] = t[e];
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

const k = r.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = E();
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
    constructor(t, e, r, s, i) {
        this.Type = t;
        this.name = e;
        this.aliases = r;
        this.key = s;
        this.strategy = i;
    }
    static create(t, e) {
        let r;
        let o;
        if (w(t)) {
            r = t;
            o = {
                name: r
            };
        } else {
            r = t.name;
            o = t;
        }
        const c = Object.getPrototypeOf(e) === BindingInterceptor;
        return new BindingBehaviorDefinition(e, s(P(e, "name"), r), i(P(e, "aliases"), o.aliases, e.aliases), T.keyFrom(r), n("strategy", o, e, (() => c ? 2 : 1)));
    }
    register(t) {
        const {Type: r, key: s, aliases: i, strategy: n} = this;
        switch (n) {
          case 1:
            e.singleton(s, r).register(t);
            break;

          case 2:
            e.instance(s, new BindingBehaviorFactory(t, r)).register(t);
            break;
        }
        e.aliasTo(s, r).register(t);
        C(i, T, s, t);
    }
}

class BindingBehaviorFactory {
    constructor(t, e) {
        this.ctn = t;
        this.Type = e;
        this.deps = r.getDependencies(e);
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

const R = x("binding-behavior");

const P = (t, e) => A(U(e), t);

const T = Object.freeze({
    name: R,
    keyFrom(t) {
        return `${R}:${t}`;
    },
    isType(t) {
        return p(t) && y(R, t);
    },
    define(t, e) {
        const r = BindingBehaviorDefinition.create(t, e);
        m(R, r, r.Type);
        m(R, r, r);
        S(e, R);
        return r.Type;
    },
    getDefinition(t) {
        const e = A(R, t);
        if (void 0 === e) throw new Error(`AUR0151:${t.name}`);
        return e;
    },
    annotate(t, e, r) {
        m(U(e), r, t);
    },
    getAnnotation: P
});

function j(t) {
    return function(e) {
        return M.define(t, e);
    };
}

class ValueConverterDefinition {
    constructor(t, e, r, s) {
        this.Type = t;
        this.name = e;
        this.aliases = r;
        this.key = s;
    }
    static create(t, e) {
        let r;
        let n;
        if (w(t)) {
            r = t;
            n = {
                name: r
            };
        } else {
            r = t.name;
            n = t;
        }
        return new ValueConverterDefinition(e, s(D(e, "name"), r), i(D(e, "aliases"), n.aliases, e.aliases), M.keyFrom(r));
    }
    register(t) {
        const {Type: r, key: s, aliases: i} = this;
        e.singleton(s, r).register(t);
        e.aliasTo(s, r).register(t);
        C(i, M, s, t);
    }
}

const I = x("value-converter");

const D = (t, e) => A(U(e), t);

const M = Object.freeze({
    name: I,
    keyFrom: t => `${I}:${t}`,
    isType(t) {
        return p(t) && y(I, t);
    },
    define(t, e) {
        const r = ValueConverterDefinition.create(t, e);
        m(I, r, r.Type);
        m(I, r, r);
        S(e, I);
        return r.Type;
    },
    getDefinition(t) {
        const e = A(I, t);
        if (void 0 === e) throw new Error(`AUR0152:${t.name}`);
        return e;
    },
    annotate(t, e, r) {
        m(U(e), r, t);
    },
    getAnnotation: D
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
        if (w(t.value)) {
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
        this.behaviorKey = T.keyFrom(e);
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
        const i = r;
        if (void 0 !== i[s]) {
            if (p(i[s].unbind)) i[s].unbind(t, e, r);
            i[s] = void 0;
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
        this.converterKey = M.keyFrom(e);
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
                const e = r.get(k);
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
        const i = r.locator.get(k);
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
        const o = N(t, n, this.name);
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
        const o = N(t, i, this.name);
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
        const i = this.func.evaluate(t, e, r, s);
        if (p(i)) return i(...this.args.map((i => i.evaluate(t, e, r, s))));
        if (!(8 & t) && null == i) return;
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
    evaluate(t, e, r, s) {
        var i;
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(t, e, r, s) && this.right.evaluate(t, e, r, s);

          case "||":
            return this.left.evaluate(t, e, r, s) || this.right.evaluate(t, e, r, s);

          case "??":
            return null !== (i = this.left.evaluate(t, e, r, s)) && void 0 !== i ? i : this.right.evaluate(t, e, r, s);

          case "==":
            return this.left.evaluate(t, e, r, s) == this.right.evaluate(t, e, r, s);

          case "===":
            return this.left.evaluate(t, e, r, s) === this.right.evaluate(t, e, r, s);

          case "!=":
            return this.left.evaluate(t, e, r, s) != this.right.evaluate(t, e, r, s);

          case "!==":
            return this.left.evaluate(t, e, r, s) !== this.right.evaluate(t, e, r, s);

          case "instanceof":
            {
                const i = this.right.evaluate(t, e, r, s);
                if (p(i)) return this.left.evaluate(t, e, r, s) instanceof i;
                return false;
            }

          case "in":
            {
                const i = this.right.evaluate(t, e, r, s);
                if (i instanceof Object) return this.left.evaluate(t, e, r, s) in i;
                return false;
            }

          case "+":
            {
                const i = this.left.evaluate(t, e, r, s);
                const n = this.right.evaluate(t, e, r, s);
                if ((1 & t) > 0) return i + n;
                if (!i || !n) {
                    if (o(i) || o(n)) return (i || 0) + (n || 0);
                    if (c(i) || c(n)) return (i || "") + (n || "");
                }
                return i + n;
            }

          case "-":
            return this.left.evaluate(t, e, r, s) - this.right.evaluate(t, e, r, s);

          case "*":
            return this.left.evaluate(t, e, r, s) * this.right.evaluate(t, e, r, s);

          case "/":
            return this.left.evaluate(t, e, r, s) / this.right.evaluate(t, e, r, s);

          case "%":
            return this.left.evaluate(t, e, r, s) % this.right.evaluate(t, e, r, s);

          case "<":
            return this.left.evaluate(t, e, r, s) < this.right.evaluate(t, e, r, s);

          case ">":
            return this.left.evaluate(t, e, r, s) > this.right.evaluate(t, e, r, s);

          case "<=":
            return this.left.evaluate(t, e, r, s) <= this.right.evaluate(t, e, r, s);

          case ">=":
            return this.left.evaluate(t, e, r, s) >= this.right.evaluate(t, e, r, s);

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
    constructor(t, e, r, s = u) {
        this.cooked = t;
        this.func = r;
        this.expressions = s;
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
    evaluate(t, e, r, s) {
        const i = this.expressions.map((i => i.evaluate(t, e, r, s)));
        const n = this.func.evaluate(t, e, r, s);
        if (!p(n)) throw new Error(`AUR0110`);
        return n(this.cooked, ...i);
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

const V = Object.prototype.toString;

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
    iterate(t, e, r) {
        switch (V.call(e)) {
          case "[object Array]":
            return K(e, r);

          case "[object Map]":
            return q(e, r);

          case "[object Set]":
            return H(e, r);

          case "[object Number]":
            return Q(e, r);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${V.call(e)}`);
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
    constructor(t, e = u) {
        this.parts = t;
        this.expressions = e;
        this.isMulti = e.length > 1;
        this.firstExpression = e[0];
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
    assign(t, e, r, s) {
        if (null == s) return;
        if ("object" !== typeof s) throw new Error(`AUR0112`);
        const i = this.indexOrProperties;
        let n;
        if (h(i)) {
            if (!Array.isArray(s)) throw new Error(`AUR0112`);
            n = s.slice(i);
        } else n = Object.entries(s).reduce(((t, [e, r]) => {
            if (!i.includes(e)) t[e] = r;
            return t;
        }), {});
        this.target.assign(t, e, r, n);
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

function N(t, e, r) {
    const s = null == e ? null : e[r];
    if (p(s)) return s;
    if (!(8 & t) && null == s) return null;
    throw new Error(`AUR0111:${r}`);
}

function K(t, e) {
    for (let r = 0, s = t.length; r < s; ++r) e(t, r, t[r]);
}

function q(t, e) {
    const r = Array(t.size);
    let s = -1;
    for (const e of t.entries()) r[++s] = e;
    K(r, e);
}

function H(t, e) {
    const r = Array(t.size);
    let s = -1;
    for (const e of t.keys()) r[++s] = e;
    K(r, e);
}

function Q(t, e) {
    const r = Array(t);
    for (let e = 0; e < t; ++e) r[e] = e;
    K(r, e);
}

const _ = r.createInterface("ICoercionConfiguration");

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

function tt(t = 0) {
    const e = Array(t);
    let r = 0;
    while (r < t) e[r] = r++;
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

function rt(t) {
    return t instanceof Array && true === t.isIndexMap;
}

function st(t) {
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

function nt() {
    return g(this, "subs", new SubscriberRecord);
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

function lt(t, e, r) {
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
    setValue(t, e) {
        const r = this.v;
        if (t !== r && h(t)) {
            if (0 === (64 & e)) this.o.length = t;
            this.v = t;
            this.u = r;
            this.f = e;
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
        const r = this.v;
        const s = this.o.size;
        if ((this.v = s) !== r) {
            this.u = r;
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
    st(t);
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

const wt = new WeakMap;

function gt(t, e) {
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

function Et(t, e, r, s, i) {
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

function At(t, e, r, s, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let d, v, p;
    let w, g;
    let b, E, A, y;
    let m, U, x, S;
    while (true) {
        if (s - r <= 10) {
            Et(t, e, r, s, i);
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
        v = i(c, h);
        if (v >= 0) {
            w = c;
            g = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = w;
            l = g;
        } else {
            p = i(u, h);
            if (p > 0) {
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
        E = l;
        A = r + 1;
        y = s - 1;
        t[n] = t[A];
        e[n] = e[A];
        t[A] = b;
        e[A] = E;
        t: for (o = A + 1; o < y; o++) {
            m = t[o];
            U = e[o];
            x = i(m, b);
            if (x < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = m;
                e[A] = U;
                A++;
            } else if (x > 0) {
                do {
                    y--;
                    if (y == o) break t;
                    S = t[y];
                    x = i(S, b);
                } while (x > 0);
                t[o] = t[y];
                e[o] = e[y];
                t[y] = m;
                e[y] = U;
                if (x < 0) {
                    m = t[o];
                    U = e[o];
                    t[o] = t[A];
                    e[o] = e[A];
                    t[A] = m;
                    e[A] = U;
                    A++;
                }
            }
        }
        if (s - y < A - r) {
            At(t, e, y, s, i);
            s = A;
        } else {
            At(t, e, r, A, i);
            r = y;
        }
    }
}

const yt = Array.prototype;

const mt = yt.push;

const Ut = yt.unshift;

const xt = yt.pop;

const St = yt.shift;

const Ot = yt.splice;

const Ct = yt.reverse;

const kt = yt.sort;

const $t = {
    push: mt,
    unshift: Ut,
    pop: xt,
    shift: St,
    splice: Ot,
    reverse: Ct,
    sort: kt
};

const Bt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const Lt = {
    push: function(...t) {
        const e = wt.get(this);
        if (void 0 === e) return mt.apply(this, t);
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
        const e = wt.get(this);
        if (void 0 === e) return Ut.apply(this, t);
        const r = t.length;
        const s = new Array(r);
        let i = 0;
        while (i < r) s[i++] = -2;
        Ut.apply(e.indexMap, s);
        const n = Ut.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = wt.get(this);
        if (void 0 === t) return xt.call(this);
        const e = t.indexMap;
        const r = xt.call(this);
        const s = e.length - 1;
        if (e[s] > -1) e.deletedItems.push(e[s]);
        xt.call(e);
        t.notify();
        return r;
    },
    shift: function() {
        const t = wt.get(this);
        if (void 0 === t) return St.call(this);
        const e = t.indexMap;
        const r = St.call(this);
        if (e[0] > -1) e.deletedItems.push(e[0]);
        St.call(e);
        t.notify();
        return r;
    },
    splice: function(...t) {
        const e = t[0];
        const r = t[1];
        const s = wt.get(this);
        if (void 0 === s) return Ot.apply(this, t);
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
            Ot.call(c, e, r, ...s);
        } else Ot.apply(c, t);
        const a = Ot.apply(this, t);
        s.notify();
        return a;
    },
    reverse: function() {
        const t = wt.get(this);
        if (void 0 === t) {
            Ct.call(this);
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
        const e = wt.get(this);
        if (void 0 === e) {
            kt.call(this, t);
            return this;
        }
        const r = this.length;
        if (r < 2) return this;
        At(this, e.indexMap, 0, r, bt);
        let s = 0;
        while (s < r) {
            if (void 0 === this[s]) break;
            s++;
        }
        if (void 0 === t || !p(t)) t = gt;
        At(this, e.indexMap, 0, s, t);
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
    for (const t of Bt) if (true !== yt[t].observing) g(yt, t, Lt[t]);
}

function Tt() {
    for (const t of Bt) if (true === yt[t].observing) g(yt, t, $t[t]);
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
        wt.set(t, this);
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

st(ArrayObserver);

st(ArrayIndexObserver);

function jt(t) {
    let e = wt.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

function It(t) {
    let e = 0;
    let r = 0;
    let s = 0;
    const i = et(t);
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

function Dt(t, e) {
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

const Mt = new WeakMap;

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
        const e = Mt.get(this);
        if (void 0 === e) {
            Vt.call(this, t);
            return this;
        }
        const r = this.size;
        Vt.call(this, t);
        const s = this.size;
        if (s === r) return this;
        e.indexMap[r] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Mt.get(this);
        if (void 0 === t) return Nt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let r = 0;
            for (const t of this.keys()) {
                if (e[r] > -1) e.deletedItems.push(e[r]);
                r++;
            }
            Nt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Mt.get(this);
        if (void 0 === e) return Kt.call(this, t);
        const r = this.size;
        if (0 === r) return false;
        let s = 0;
        const i = e.indexMap;
        for (const r of this.keys()) {
            if (r === t) {
                if (i[s] > -1) i.deletedItems.push(i[s]);
                i.splice(s, 1);
                const r = Kt.call(this, t);
                if (true === r) e.notify();
                return r;
            }
            s++;
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
        Mt.set(t, this);
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

st(SetObserver);

function Zt(t) {
    let e = Mt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Jt = new WeakMap;

const Xt = Map.prototype;

const Yt = Xt.set;

const te = Xt.clear;

const ee = Xt.delete;

const re = {
    set: Yt,
    clear: te,
    delete: ee
};

const se = [ "set", "clear", "delete" ];

const ie = {
    set: function(t, e) {
        const r = Jt.get(this);
        if (void 0 === r) {
            Yt.call(this, t, e);
            return this;
        }
        const s = this.get(t);
        const i = this.size;
        Yt.call(this, t, e);
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
        const t = Jt.get(this);
        if (void 0 === t) return te.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let r = 0;
            for (const t of this.keys()) {
                if (e[r] > -1) e.deletedItems.push(e[r]);
                r++;
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
        const r = this.size;
        if (0 === r) return false;
        let s = 0;
        const i = e.indexMap;
        for (const r of this.keys()) {
            if (r === t) {
                if (i[s] > -1) i.deletedItems.push(i[s]);
                i.splice(s, 1);
                const r = ee.call(this, t);
                if (true === r) e.notify();
                return r;
            }
            ++s;
        }
        return false;
    }
};

const ne = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of se) v(ie[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let oe = false;

function ce() {
    for (const t of se) if (true !== Xt[t].observing) v(Xt, t, {
        ...ne,
        value: ie[t]
    });
}

function ue() {
    for (const t of se) if (true === Xt[t].observing) v(Xt, t, {
        ...ne,
        value: re[t]
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

st(MapObserver);

function he(t) {
    let e = Jt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function ae(t, e) {
    const r = this.oL.getObserver(t, e);
    this.obs.add(r);
}

function le() {
    return g(this, "obs", new BindingObserverRecord(this));
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
        this.o.forEach(ge, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(we, this);
        this.o.clear();
        this.count = 0;
    }
}

function we(t, e) {
    e.unsubscribe(this);
}

function ge(t, e) {
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

be(BindingMediator);

const Ae = r.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = E();
        this.A = E();
        this.U = E();
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
                throw Er();
            }
            r = this.h[t];
            if (void 0 === r) r = this.h[t] = this.$parse(t, e);
            return r;
        }
    }
    $parse(t, e) {
        Re = t;
        Pe = 0;
        Te = t.length;
        je = 0;
        Ie = 0;
        De = 6291456;
        Me = "";
        Fe = t.charCodeAt(0);
        Ve = true;
        Ne = false;
        return He(61, void 0 === e ? 8 : e);
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

var Ue;

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
})(Ue || (Ue = {}));

var xe;

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
})(xe || (xe = {}));

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

let Re = "";

let Pe = 0;

let Te = 0;

let je = 0;

let Ie = 0;

let De = 6291456;

let Me = "";

let Fe;

let Ve = true;

let Ne = false;

function Ke() {
    return Re.slice(Ie, Pe);
}

function qe(t, e) {
    Re = t;
    Pe = 0;
    Te = t.length;
    je = 0;
    Ie = 0;
    De = 6291456;
    Me = "";
    Fe = t.charCodeAt(0);
    Ve = true;
    Ne = false;
    return He(61, void 0 === e ? 8 : e);
}

function He(t, e) {
    if (16 === e) return new CustomExpression(Re);
    if (0 === Pe) {
        if (1 & e) return er();
        ir();
        if (4194304 & De) throw dr();
    }
    Ve = 513 > t;
    Ne = false;
    let r = false;
    let s;
    let i = 0;
    if (131072 & De) {
        const t = Fr[63 & De];
        ir();
        s = new UnaryExpression(t, He(514, e));
        Ve = false;
    } else {
        t: switch (De) {
          case 12294:
            i = je;
            Ve = false;
            do {
                ir();
                ++i;
                switch (De) {
                  case 65545:
                    ir();
                    if (0 === (12288 & De)) throw pr();
                    break;

                  case 10:
                  case 11:
                    throw pr();

                  case 2162700:
                    Ne = true;
                    ir();
                    if (0 === (12288 & De)) {
                        s = 0 === i ? $e : 1 === i ? Be : new AccessThisExpression(i);
                        r = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & De) {
                        s = 0 === i ? $e : 1 === i ? Be : new AccessThisExpression(i);
                        break t;
                    }
                    throw wr();
                }
            } while (12294 === De);

          case 4096:
            {
                const t = Me;
                if (2 & e) s = new BindingIdentifier(t); else s = new AccessScopeExpression(t, i);
                Ve = !Ne;
                ir();
                if (lr(49)) {
                    if (524296 === De) throw Dr();
                    const e = Ne;
                    const r = je;
                    ++je;
                    const i = He(62, 0);
                    Ne = e;
                    je = r;
                    Ve = false;
                    s = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Mr();

          case 11:
            throw vr();

          case 12292:
            Ve = false;
            ir();
            switch (je) {
              case 0:
                s = $e;
                break;

              case 1:
                s = Be;
                break;

              default:
                s = new AccessThisExpression(je);
                break;
            }
            break;

          case 2688007:
            s = Je(e);
            break;

          case 2688016:
            s = Re.search(/\s+of\s+/) > Pe ? Qe() : Xe(e);
            break;

          case 524296:
            s = tr(e);
            break;

          case 2163758:
            s = new TemplateExpression([ Me ]);
            Ve = false;
            ir();
            break;

          case 2163759:
            s = rr(e, s, false);
            break;

          case 16384:
          case 32768:
            s = new PrimitiveLiteralExpression(Me);
            Ve = false;
            ir();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            s = Fr[63 & De];
            Ve = false;
            ir();
            break;

          default:
            if (Pe >= Te) throw gr(); else throw br();
        }
        if (2 & e) return Ye(s);
        if (514 < t) return s;
        if (10 === De || 11 === De) throw pr();
        if (1793 === s.$kind) switch (De) {
          case 2162700:
            Ne = true;
            Ve = false;
            ir();
            if (0 === (13312 & De)) throw Lr();
            if (12288 & De) {
                s = new AccessScopeExpression(Me, s.ancestor);
                ir();
            } else if (2688007 === De) s = new CallFunctionExpression(s, _e(), true); else if (2688016 === De) s = ze(s, true); else throw Rr();
            break;

          case 65545:
            Ve = !Ne;
            ir();
            if (0 === (12288 & De)) throw pr();
            s = new AccessScopeExpression(Me, s.ancestor);
            ir();
            break;

          case 10:
          case 11:
            throw pr();

          case 2688007:
            s = new CallFunctionExpression(s, _e(), r);
            break;

          case 2688016:
            s = ze(s, r);
            break;

          case 2163758:
            s = sr(s);
            break;

          case 2163759:
            s = rr(e, s, true);
            break;
        }
        while ((65536 & De) > 0) switch (De) {
          case 2162700:
            s = We(s);
            break;

          case 65545:
            ir();
            if (0 === (12288 & De)) throw pr();
            s = Ge(s, false);
            break;

          case 10:
          case 11:
            throw pr();

          case 2688007:
            if (10082 === s.$kind) s = new CallScopeExpression(s.name, _e(), s.ancestor, false); else if (9323 === s.$kind) s = new CallMemberExpression(s.object, s.name, _e(), s.optional, false); else s = new CallFunctionExpression(s, _e(), false);
            break;

          case 2688016:
            s = ze(s, false);
            break;

          case 2163758:
            if (Ne) throw Rr();
            s = sr(s);
            break;

          case 2163759:
            if (Ne) throw Rr();
            s = rr(e, s, true);
            break;
        }
    }
    if (10 === De || 11 === De) throw pr();
    if (513 < t) return s;
    while ((262144 & De) > 0) {
        const r = De;
        if ((960 & r) <= t) break;
        ir();
        s = new BinaryExpression(Fr[63 & r], s, He(960 & r, e));
        Ve = false;
    }
    if (63 < t) return s;
    if (lr(6291477)) {
        const t = He(62, e);
        fr(6291476);
        s = new ConditionalExpression(s, t, He(62, e));
        Ve = false;
    }
    if (62 < t) return s;
    if (lr(4194348)) {
        if (!Ve) throw Ar();
        s = new AssignExpression(s, He(62, e));
    }
    if (61 < t) return s;
    while (lr(6291479)) {
        if (6291456 === De) throw yr();
        const t = Me;
        ir();
        const r = new Array;
        while (lr(6291476)) r.push(He(62, e));
        s = new ValueConverterExpression(s, t, r);
    }
    while (lr(6291478)) {
        if (6291456 === De) throw mr();
        const t = Me;
        ir();
        const r = new Array;
        while (lr(6291476)) r.push(He(62, e));
        s = new BindingBehaviorExpression(s, t, r);
    }
    if (6291456 !== De) {
        if (1 & e) return s;
        if ("of" === Ke()) throw Ur();
        throw br();
    }
    return s;
}

function Qe() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let r = "";
    let s = true;
    let i = 0;
    while (s) {
        ir();
        switch (De) {
          case 7340051:
            s = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            r = Ke();
            break;

          default:
            throw Br();
        }
    }
    fr(7340051);
    return e;
    function n() {
        if ("" !== r) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression($e, r), new AccessKeyedExpression($e, new PrimitiveLiteralExpression(i++)), void 0));
            r = "";
        } else i++;
    }
}

function _e() {
    const t = Ne;
    ir();
    const e = [];
    while (7340046 !== De) {
        e.push(He(62, 0));
        if (!lr(6291471)) break;
    }
    fr(7340046);
    Ve = false;
    Ne = t;
    return e;
}

function ze(t, e) {
    const r = Ne;
    ir();
    t = new AccessKeyedExpression(t, He(62, 0), e);
    fr(7340051);
    Ve = !r;
    Ne = r;
    return t;
}

function We(t) {
    Ne = true;
    Ve = false;
    ir();
    if (0 === (13312 & De)) throw Lr();
    if (12288 & De) return Ge(t, true);
    if (2688007 === De) if (10082 === t.$kind) return new CallScopeExpression(t.name, _e(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, _e(), t.optional, true); else return new CallFunctionExpression(t, _e(), true);
    if (2688016 === De) return ze(t, true);
    throw Rr();
}

function Ge(t, e) {
    const r = Me;
    switch (De) {
      case 2162700:
        {
            Ne = true;
            Ve = false;
            const s = Pe;
            const i = Ie;
            const n = De;
            const o = Fe;
            const c = Me;
            const u = Ve;
            const h = Ne;
            ir();
            if (0 === (13312 & De)) throw Lr();
            if (2688007 === De) return new CallMemberExpression(t, r, _e(), e, true);
            Pe = s;
            Ie = i;
            De = n;
            Fe = o;
            Me = c;
            Ve = u;
            Ne = h;
            return new AccessMemberExpression(t, r, e);
        }

      case 2688007:
        Ve = false;
        return new CallMemberExpression(t, r, _e(), e, false);

      default:
        Ve = !Ne;
        ir();
        return new AccessMemberExpression(t, r, e);
    }
}

var Ze;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(Ze || (Ze = {}));

function Je(t) {
    ir();
    const e = Pe;
    const r = Ie;
    const s = De;
    const i = Fe;
    const n = Me;
    const o = Ve;
    const c = Ne;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === De) {
            ir();
            if (4096 !== De) throw pr();
            u.push(new BindingIdentifier(Me));
            ir();
            if (6291471 === De) throw Ir();
            if (7340046 !== De) throw vr();
            ir();
            if (49 !== De) throw vr();
            ir();
            const t = Ne;
            const e = je;
            ++je;
            const r = He(62, 0);
            Ne = t;
            je = e;
            Ve = false;
            return new ArrowFunction(u, r, true);
        }
        switch (De) {
          case 4096:
            u.push(new BindingIdentifier(Me));
            ir();
            break;

          case 7340046:
            ir();
            break t;

          case 524296:
          case 2688016:
            ir();
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
            ir();
            h = 2;
            break;
        }
        switch (De) {
          case 6291471:
            ir();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            ir();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw Pr();
            ir();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === De) {
        if (1 === h) {
            ir();
            if (524296 === De) throw Dr();
            const t = Ne;
            const e = je;
            ++je;
            const r = He(62, 0);
            Ne = t;
            je = e;
            Ve = false;
            return new ArrowFunction(u, r);
        }
        throw Pr();
    } else if (1 === h && 0 === u.length) throw kr(49);
    if (a) switch (h) {
      case 2:
        throw Pr();

      case 3:
        throw Tr();

      case 4:
        throw jr();
    }
    Pe = e;
    Ie = r;
    De = s;
    Fe = i;
    Me = n;
    Ve = o;
    Ne = c;
    const l = Ne;
    const f = He(62, t);
    Ne = l;
    fr(7340046);
    if (49 === De) switch (h) {
      case 2:
        throw Pr();

      case 3:
        throw Tr();

      case 4:
        throw jr();
    }
    return f;
}

function Xe(t) {
    const e = Ne;
    ir();
    const r = new Array;
    while (7340051 !== De) if (lr(6291471)) {
        r.push(ke);
        if (7340051 === De) break;
    } else {
        r.push(He(62, ~2 & t));
        if (lr(6291471)) {
            if (7340051 === De) break;
        } else break;
    }
    Ne = e;
    fr(7340051);
    if (2 & t) return new ArrayBindingPattern(r); else {
        Ve = false;
        return new ArrayLiteralExpression(r);
    }
}

function Ye(t) {
    if (0 === (65536 & t.$kind)) throw xr();
    if (4204592 !== De) throw xr();
    ir();
    const e = t;
    const r = He(61, 0);
    return new ForOfStatement(e, r);
}

function tr(t) {
    const e = Ne;
    const r = new Array;
    const s = new Array;
    ir();
    while (7340045 !== De) {
        r.push(Me);
        if (49152 & De) {
            ir();
            fr(6291476);
            s.push(He(62, ~2 & t));
        } else if (12288 & De) {
            const e = Fe;
            const r = De;
            const i = Pe;
            ir();
            if (lr(6291476)) s.push(He(62, ~2 & t)); else {
                Fe = e;
                De = r;
                Pe = i;
                s.push(He(515, ~2 & t));
            }
        } else throw Sr();
        if (7340045 !== De) fr(6291471);
    }
    Ne = e;
    fr(7340045);
    if (2 & t) return new ObjectBindingPattern(r, s); else {
        Ve = false;
        return new ObjectLiteralExpression(r, s);
    }
}

function er() {
    const t = [];
    const e = [];
    const r = Te;
    let s = "";
    while (Pe < r) {
        switch (Fe) {
          case 36:
            if (123 === Re.charCodeAt(Pe + 1)) {
                t.push(s);
                s = "";
                Pe += 2;
                Fe = Re.charCodeAt(Pe);
                ir();
                const r = He(61, 1);
                e.push(r);
                continue;
            } else s += "$";
            break;

          case 92:
            s += String.fromCharCode(me(nr()));
            break;

          default:
            s += String.fromCharCode(Fe);
        }
        nr();
    }
    if (e.length) {
        t.push(s);
        return new Interpolation(t, e);
    }
    return null;
}

function rr(t, e, r) {
    const s = Ne;
    const i = [ Me ];
    fr(2163759);
    const n = [ He(62, t) ];
    while (2163758 !== (De = ar())) {
        i.push(Me);
        fr(2163759);
        n.push(He(62, t));
    }
    i.push(Me);
    Ve = false;
    Ne = s;
    if (r) {
        ir();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        ir();
        return new TemplateExpression(i, n);
    }
}

function sr(t) {
    Ve = false;
    const e = [ Me ];
    ir();
    return new TaggedTemplateExpression(e, e, t);
}

function ir() {
    while (Pe < Te) {
        Ie = Pe;
        if (null != (De = _r[Fe]())) return;
    }
    De = 6291456;
}

function nr() {
    return Fe = Re.charCodeAt(++Pe);
}

function or() {
    while (Qr[nr()]) ;
    const t = Vr[Me = Ke()];
    return void 0 === t ? 4096 : t;
}

function cr(t) {
    let e = Fe;
    if (false === t) {
        do {
            e = nr();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Me = parseInt(Ke(), 10);
            return 32768;
        }
        e = nr();
        if (Pe >= Te) {
            Me = parseInt(Ke().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = nr();
    } while (e <= 57 && e >= 48); else Fe = Re.charCodeAt(--Pe);
    Me = parseFloat(Ke());
    return 32768;
}

function ur() {
    const t = Fe;
    nr();
    let e = 0;
    const r = new Array;
    let s = Pe;
    while (Fe !== t) if (92 === Fe) {
        r.push(Re.slice(s, Pe));
        nr();
        e = me(Fe);
        nr();
        r.push(String.fromCharCode(e));
        s = Pe;
    } else if (Pe >= Te) throw Or(); else nr();
    const i = Re.slice(s, Pe);
    nr();
    r.push(i);
    const n = r.join("");
    Me = n;
    return 16384;
}

function hr() {
    let t = true;
    let e = "";
    while (96 !== nr()) if (36 === Fe) if (Pe + 1 < Te && 123 === Re.charCodeAt(Pe + 1)) {
        Pe++;
        t = false;
        break;
    } else e += "$"; else if (92 === Fe) e += String.fromCharCode(me(nr())); else {
        if (Pe >= Te) throw Cr();
        e += String.fromCharCode(Fe);
    }
    nr();
    Me = e;
    if (t) return 2163758;
    return 2163759;
}

function ar() {
    if (Pe >= Te) throw Cr();
    Pe--;
    return hr();
}

function lr(t) {
    if (De === t) {
        ir();
        return true;
    }
    return false;
}

function fr(t) {
    if (De === t) ir(); else throw kr(t);
}

function dr() {
    return new Error(`AUR0151:${Re}`);
}

function vr() {
    return new Error(`AUR0152:${Re}`);
}

function pr() {
    return new Error(`AUR0153:${Re}`);
}

function wr() {
    return new Error(`AUR0154:${Re}`);
}

function gr() {
    return new Error(`AUR0155:${Re}`);
}

function br() {
    return new Error(`AUR0156:${Re}`);
}

function Er() {
    return new Error(`AUR0157`);
}

function Ar() {
    return new Error(`AUR0158:${Re}`);
}

function yr() {
    return new Error(`AUR0159:${Re}`);
}

function mr() {
    return new Error(`AUR0160:${Re}`);
}

function Ur() {
    return new Error(`AUR0161:${Re}`);
}

function xr() {
    return new Error(`AUR0163:${Re}`);
}

function Sr() {
    return new Error(`AUR0164:${Re}`);
}

function Or() {
    return new Error(`AUR0165:${Re}`);
}

function Cr() {
    return new Error(`AUR0166:${Re}`);
}

function kr(t) {
    return new Error(`AUR0167:${Re}<${Fr[63 & t]}`);
}

const $r = () => {
    throw new Error(`AUR0168:${Re}`);
};

$r.notMapped = true;

function Br() {
    return new Error(`AUR0170:${Re}`);
}

function Lr() {
    return new Error(`AUR0171:${Re}`);
}

function Rr() {
    return new Error(`AUR0172:${Re}`);
}

function Pr() {
    return new Error(`AUR0173:${Re}`);
}

function Tr() {
    return new Error(`AUR0174:${Re}`);
}

function jr() {
    return new Error(`AUR0175:${Re}`);
}

function Ir() {
    return new Error(`AUR0176:${Re}`);
}

function Dr() {
    return new Error(`AUR0178:${Re}`);
}

function Mr() {
    return new Error(`AUR0179:${Re}`);
}

const Fr = [ Se, Oe, Ce, ke, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Vr = Object.assign(Object.create(null), {
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

const Nr = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Kr(t, e, r, s) {
    const i = r.length;
    for (let n = 0; n < i; n += 2) {
        const i = r[n];
        let o = r[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(s, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function qr(t) {
    return () => {
        nr();
        return t;
    };
}

const Hr = new Set;

Kr(null, Hr, Nr.AsciiIdPart, true);

const Qr = new Uint8Array(65535);

Kr(Qr, null, Nr.IdStart, 1);

Kr(Qr, null, Nr.Digit, 1);

const _r = new Array(65535);

_r.fill($r, 0, 65535);

Kr(_r, null, Nr.Skip, (() => {
    nr();
    return null;
}));

Kr(_r, null, Nr.IdStart, or);

Kr(_r, null, Nr.Digit, (() => cr(false)));

_r[34] = _r[39] = () => ur();

_r[96] = () => hr();

_r[33] = () => {
    if (61 !== nr()) return 131117;
    if (61 !== nr()) return 6553948;
    nr();
    return 6553950;
};

_r[61] = () => {
    if (62 === nr()) {
        nr();
        return 49;
    }
    if (61 !== Fe) return 4194348;
    if (61 !== nr()) return 6553947;
    nr();
    return 6553949;
};

_r[38] = () => {
    if (38 !== nr()) return 6291478;
    nr();
    return 6553882;
};

_r[124] = () => {
    if (124 !== nr()) return 6291479;
    nr();
    return 6553817;
};

_r[63] = () => {
    if (46 === nr()) {
        const t = Re.charCodeAt(Pe + 1);
        if (t <= 48 || t >= 57) {
            nr();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Fe) return 6291477;
    nr();
    return 6553752;
};

_r[46] = () => {
    if (nr() <= 57 && Fe >= 48) return cr(true);
    if (46 === Fe) {
        if (46 !== nr()) return 10;
        nr();
        return 11;
    }
    return 65545;
};

_r[60] = () => {
    if (61 !== nr()) return 6554015;
    nr();
    return 6554017;
};

_r[62] = () => {
    if (61 !== nr()) return 6554016;
    nr();
    return 6554018;
};

_r[37] = qr(6554154);

_r[40] = qr(2688007);

_r[41] = qr(7340046);

_r[42] = qr(6554153);

_r[43] = qr(2490853);

_r[44] = qr(6291471);

_r[45] = qr(2490854);

_r[47] = qr(6554155);

_r[58] = qr(6291476);

_r[91] = qr(2688016);

_r[93] = qr(7340051);

_r[123] = qr(524296);

_r[125] = qr(7340045);

let zr = null;

const Wr = [];

let Gr = false;

function Zr() {
    Gr = false;
}

function Jr() {
    Gr = true;
}

function Xr() {
    return zr;
}

function Yr(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == zr) {
        zr = t;
        Wr[0] = zr;
        Gr = true;
        return;
    }
    if (zr === t) throw new Error(`AUR0207`);
    Wr.push(t);
    zr = t;
    Gr = true;
}

function ts(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (zr !== t) throw new Error(`AUR0209`);
    Wr.pop();
    zr = Wr.length > 0 ? Wr[Wr.length - 1] : null;
    Gr = null != zr;
}

const es = Object.freeze({
    get current() {
        return zr;
    },
    get connecting() {
        return Gr;
    },
    enter: Yr,
    exit: ts,
    pause: Zr,
    resume: Jr
});

const rs = Reflect.get;

const ss = Object.prototype.toString;

const is = new WeakMap;

function ns(t) {
    switch (ss.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const os = "__raw__";

function cs(t) {
    return ns(t) ? us(t) : t;
}

function us(t) {
    var e;
    return null !== (e = is.get(t)) && void 0 !== e ? e : fs(t);
}

function hs(t) {
    var e;
    return null !== (e = t[os]) && void 0 !== e ? e : t;
}

function as(t) {
    return ns(t) && t[os] || t;
}

function ls(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function fs(t) {
    const e = t instanceof Array ? vs : t instanceof Map || t instanceof Set ? Ds : ds;
    const r = new Proxy(t, e);
    is.set(t, r);
    return r;
}

const ds = {
    get(t, e, r) {
        if (e === os) return t;
        const s = Xr();
        if (!Gr || ls(e) || null == s) return rs(t, e, r);
        s.observe(t, e);
        return cs(rs(t, e, r));
    }
};

const vs = {
    get(t, e, r) {
        if (e === os) return t;
        const s = Xr();
        if (!Gr || ls(e) || null == s) return rs(t, e, r);
        switch (e) {
          case "length":
            s.observe(t, "length");
            return t.length;

          case "map":
            return ps;

          case "includes":
            return bs;

          case "indexOf":
            return Es;

          case "lastIndexOf":
            return As;

          case "every":
            return ws;

          case "filter":
            return gs;

          case "find":
            return ms;

          case "findIndex":
            return ys;

          case "flat":
            return Us;

          case "flatMap":
            return xs;

          case "join":
            return Ss;

          case "push":
            return Cs;

          case "pop":
            return Os;

          case "reduce":
            return js;

          case "reduceRight":
            return Is;

          case "reverse":
            return Ls;

          case "shift":
            return ks;

          case "unshift":
            return $s;

          case "slice":
            return Ts;

          case "splice":
            return Bs;

          case "some":
            return Rs;

          case "sort":
            return Ps;

          case "keys":
            return Qs;

          case "values":
          case Symbol.iterator:
            return _s;

          case "entries":
            return zs;
        }
        s.observe(t, e);
        return cs(rs(t, e, r));
    },
    ownKeys(t) {
        var e;
        null === (e = Xr()) || void 0 === e ? void 0 : e.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function ps(t, e) {
    var r;
    const s = hs(this);
    const i = s.map(((r, s) => as(t.call(e, cs(r), s, this))));
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return cs(i);
}

function ws(t, e) {
    var r;
    const s = hs(this);
    const i = s.every(((r, s) => t.call(e, cs(r), s, this)));
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return i;
}

function gs(t, e) {
    var r;
    const s = hs(this);
    const i = s.filter(((r, s) => as(t.call(e, cs(r), s, this))));
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return cs(i);
}

function bs(t) {
    var e;
    const r = hs(this);
    const s = r.includes(as(t));
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return s;
}

function Es(t) {
    var e;
    const r = hs(this);
    const s = r.indexOf(as(t));
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return s;
}

function As(t) {
    var e;
    const r = hs(this);
    const s = r.lastIndexOf(as(t));
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return s;
}

function ys(t, e) {
    var r;
    const s = hs(this);
    const i = s.findIndex(((r, s) => as(t.call(e, cs(r), s, this))));
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return i;
}

function ms(t, e) {
    var r;
    const s = hs(this);
    const i = s.find(((e, r) => t(cs(e), r, this)), e);
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return cs(i);
}

function Us() {
    var t;
    const e = hs(this);
    null === (t = Xr()) || void 0 === t ? void 0 : t.observeCollection(e);
    return cs(e.flat());
}

function xs(t, e) {
    var r;
    const s = hs(this);
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return us(s.flatMap(((r, s) => cs(t.call(e, cs(r), s, this)))));
}

function Ss(t) {
    var e;
    const r = hs(this);
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return r.join(t);
}

function Os() {
    return cs(hs(this).pop());
}

function Cs(...t) {
    return hs(this).push(...t);
}

function ks() {
    return cs(hs(this).shift());
}

function $s(...t) {
    return hs(this).unshift(...t);
}

function Bs(...t) {
    return cs(hs(this).splice(...t));
}

function Ls(...t) {
    var e;
    const r = hs(this);
    const s = r.reverse();
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return cs(s);
}

function Rs(t, e) {
    var r;
    const s = hs(this);
    const i = s.some(((r, s) => as(t.call(e, cs(r), s, this))));
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return i;
}

function Ps(t) {
    var e;
    const r = hs(this);
    const s = r.sort(t);
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return cs(s);
}

function Ts(t, e) {
    var r;
    const s = hs(this);
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return us(s.slice(t, e));
}

function js(t, e) {
    var r;
    const s = hs(this);
    const i = s.reduce(((e, r, s) => t(e, cs(r), s, this)), e);
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return cs(i);
}

function Is(t, e) {
    var r;
    const s = hs(this);
    const i = s.reduceRight(((e, r, s) => t(e, cs(r), s, this)), e);
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return cs(i);
}

const Ds = {
    get(t, e, r) {
        if (e === os) return t;
        const s = Xr();
        if (!Gr || ls(e) || null == s) return rs(t, e, r);
        switch (e) {
          case "size":
            s.observe(t, "size");
            return t.size;

          case "clear":
            return qs;

          case "delete":
            return Hs;

          case "forEach":
            return Ms;

          case "add":
            if (t instanceof Set) return Ks;
            break;

          case "get":
            if (t instanceof Map) return Vs;
            break;

          case "set":
            if (t instanceof Map) return Ns;
            break;

          case "has":
            return Fs;

          case "keys":
            return Qs;

          case "values":
            return _s;

          case "entries":
            return zs;

          case Symbol.iterator:
            return t instanceof Map ? zs : _s;
        }
        return cs(rs(t, e, r));
    }
};

function Ms(t, e) {
    var r;
    const s = hs(this);
    null === (r = Xr()) || void 0 === r ? void 0 : r.observeCollection(s);
    return s.forEach(((r, s) => {
        t.call(e, cs(r), cs(s), this);
    }));
}

function Fs(t) {
    var e;
    const r = hs(this);
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return r.has(as(t));
}

function Vs(t) {
    var e;
    const r = hs(this);
    null === (e = Xr()) || void 0 === e ? void 0 : e.observeCollection(r);
    return cs(r.get(as(t)));
}

function Ns(t, e) {
    return cs(hs(this).set(as(t), as(e)));
}

function Ks(t) {
    return cs(hs(this).add(as(t)));
}

function qs() {
    return cs(hs(this).clear());
}

function Hs(t) {
    return cs(hs(this).delete(as(t)));
}

function Qs() {
    var t;
    const e = hs(this);
    null === (t = Xr()) || void 0 === t ? void 0 : t.observeCollection(e);
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
                value: cs(e),
                done: s
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function _s() {
    var t;
    const e = hs(this);
    null === (t = Xr()) || void 0 === t ? void 0 : t.observeCollection(e);
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
                value: cs(e),
                done: s
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function zs() {
    var t;
    const e = hs(this);
    null === (t = Xr()) || void 0 === t ? void 0 : t.observeCollection(e);
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
                value: [ cs(e[0]), cs(e[1]) ],
                done: s
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Ws = Object.freeze({
    getProxy: us,
    getRaw: hs,
    wrap: cs,
    unwrap: as,
    rawKey: os
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
    static create(t, e, r, s, i) {
        const n = r.get;
        const o = r.set;
        const c = new ComputedObserver(t, n, o, i, s);
        const u = () => c.getValue();
        u.getObserver = () => c;
        v(t, e, {
            enumerable: r.enumerable,
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
        Gs = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Gs, 0);
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
            Yr(this);
            return this.v = as(this.get.call(this.up ? cs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            ts(this);
        }
    }
}

Ee(ComputedObserver);

st(ComputedObserver);

ut(ComputedObserver);

let Gs;

const Zs = r.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Js = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Xs = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Js.disabled) return;
            if (++this.C < Js.timeoutsPerCheck) return;
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
        if (Js.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Xs);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.O.cancel();
            this.O = null;
        }
    }
}

DirtyChecker.inject = [ a ];

ut(DirtyChecker);

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

st(DirtyCheckProperty);

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

let Ys;

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
        Ys = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ys, this.f);
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
    constructor(t, e, r, s) {
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.f = 0;
        this.o = t;
        this.S = r;
        this.hs = p(r);
        const i = t[e];
        this.cb = p(i) ? i : void 0;
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
        Ys = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ys, this.f);
    }
}

st(SetterObserver);

st(SetterNotifier);

ut(SetterObserver);

ut(SetterNotifier);

const ti = new PropertyAccessor;

const ei = r.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const ri = r.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => {
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
        return ti;
    }
    getAccessor() {
        return ti;
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
        return ti;
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
        var r, s, i, n;
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        if (this.B.handles(t, e, this)) return this.B.getObserver(t, e, this);
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
        let o = ni(t, e);
        if (void 0 === o) {
            let r = ii(t);
            while (null !== r) {
                o = ni(r, e);
                if (void 0 === o) r = ii(r); else break;
            }
        }
        if (void 0 !== o && !d.call(o, "value")) {
            let c = this.P(t, e, o);
            if (null == c) c = null === (n = null !== (s = null === (r = o.get) || void 0 === r ? void 0 : r.getObserver) && void 0 !== s ? s : null === (i = o.set) || void 0 === i ? void 0 : i.getObserver) || void 0 === n ? void 0 : n(t, this);
            return null == c ? o.configurable ? ComputedObserver.create(t, e, o, this, true) : this.$.createProperty(t, e) : c;
        }
        return new SetterObserver(t, e);
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
            v(t, "$observers", {
                value: {
                    [e]: r
                }
            });
            return r;
        }
        return t.$observers[e] = r;
    }
}

ObserverLocator.inject = [ Zs, ri ];

function si(t) {
    let e;
    if (t instanceof Array) e = jt(t); else if (t instanceof Map) e = he(t); else if (t instanceof Set) e = Zt(t);
    return e;
}

const ii = Object.getPrototypeOf;

const ni = Object.getOwnPropertyDescriptor;

const oi = r.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ ei ];
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
            Yr(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            ts(this);
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

function ci(t) {
    if (void 0 === t.$observers) v(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const ui = {};

function hi(t, e, r) {
    if (null == e) return (e, r, i) => s(e, r, i, t);
    return s(t, e, r);
    function s(t, e, r, s) {
        var i;
        const n = void 0 === e;
        s = "object" !== typeof s ? {
            name: s
        } : s || {};
        if (n) e = s.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const o = s.callback || `${String(e)}Changed`;
        let c = ui;
        if (r) {
            delete r.value;
            delete r.writable;
            c = null === (i = r.initializer) || void 0 === i ? void 0 : i.call(r);
            delete r.initializer;
        } else r = {
            configurable: true
        };
        if (!("enumerable" in r)) r.enumerable = true;
        const u = s.set;
        r.get = function t() {
            var r;
            const s = ai(this, e, o, c, u);
            null === (r = Xr()) || void 0 === r ? void 0 : r.subscribeTo(s);
            return s.getValue();
        };
        r.set = function t(r) {
            ai(this, e, o, c, u).setValue(r, 0);
        };
        r.get.getObserver = function t(r) {
            return ai(r, e, o, c, u);
        };
        if (n) v(t.prototype, e, r); else return r;
    }
}

function ai(t, e, r, s, i) {
    const n = ci(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, r, i, s === ui ? void 0 : s);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, X as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, T as BindingBehavior, BindingBehaviorDefinition, BindingBehaviorExpression, BindingBehaviorFactory, $ as BindingBehaviorStrategy, BindingContext, BindingIdentifier, BindingInterceptor, BindingMediator, z as BindingMode, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, ye as Char, J as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, es as ConnectableSwitcher, CustomExpression, Z as DelegationStrategy, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Js as DirtyCheckSettings, F as ExpressionKind, Le as ExpressionType, FlushQueue, ForOfStatement, HtmlLiteralExpression, _ as ICoercionConfiguration, Zs as IDirtyChecker, Ae as IExpressionParser, ri as INodeObserverLocator, oi as IObservation, ei as IObserverLocator, k as ISignaler, Interpolation, W as LifecycleFlags, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, OverrideContext, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Ws as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, M as ValueConverter, ValueConverterDefinition, ValueConverterExpression, O as alias, It as applyMutationsToIndices, B as bindingBehavior, et as cloneIndexMap, Ee as connectable, Y as copyIndexMap, tt as createIndexMap, Tt as disableArrayObservation, ue as disableMapObservation, Gt as disableSetObservation, Pt as enableArrayObservation, ce as enableMapObservation, Wt as enableSetObservation, si as getCollectionObserver, rt as isIndexMap, hi as observable, qe as parseExpression, C as registerAliases, st as subscriberCollection, Dt as synchronizeIndices, j as valueConverter, ut as withFlushQueue };

