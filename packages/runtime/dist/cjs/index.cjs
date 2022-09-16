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

const o = t => t instanceof Array;

function c(t, e, s) {
    r(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function u(t, e, s) {
    if (!(e in t)) c(t, e, s);
}

const h = () => Object.create(null);

e.Metadata.getOwn;

e.Metadata.hasOwn;

e.Metadata.define;

t.Protocol.annotation.keyFor;

t.Protocol.resource.keyFor;

t.Protocol.resource.appendTo;

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) if (void 0 !== e) this[t] = e; else for (const e in t) if (s.call(t, e)) this[e] = t[e];
    }
    static create(t, e) {
        return new BindingContext(t, e);
    }
    static get(t, e, s) {
        if (null == t) throw new Error(`AUR0203:${t}`);
        let r = t.overrideContext;
        let i = t;
        if (s > 0) {
            while (s > 0) {
                s--;
                i = i.parentScope;
                if (null == i?.overrideContext) return;
            }
            r = i.overrideContext;
            return e in r ? r : r.bindingContext;
        }
        while (!i?.isBoundary && null != r && !(e in r) && !(r.bindingContext && e in r.bindingContext)) {
            i = i.parentScope ?? null;
            r = i?.overrideContext ?? null;
        }
        if (r) return e in r ? r : r.bindingContext;
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
        return new Scope(null, t, null == e ? OverrideContext.create(t) : e, s ?? false);
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

const a = t.DI.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = h();
    }
    dispatchSignal(t) {
        const e = this.signals[t];
        if (void 0 === e) return;
        let s;
        for (s of e.keys()) s.handleChange(void 0, void 0);
    }
    addSignalListener(t, e) {
        const s = this.signals;
        const r = s[t];
        if (void 0 === r) s[t] = new Set([ e ]); else r.add(e);
    }
    removeSignalListener(t, e) {
        this.signals[t]?.delete(e);
    }
}

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
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            e[t].accept(this);
        }
        this.text += "]";
    }
    visitArrowFunction(t) {
        const e = t.args;
        const s = e.length;
        let r = 0;
        let i = "(";
        let n;
        for (;r < s; ++r) {
            n = e[r].name;
            if (r > 0) i += ", ";
            if (r < s - 1) i += n; else i += t.rest ? `...${n}` : n;
        }
        this.text += `${i}) => `;
        t.body.accept(this);
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
        const s = 106523 === e;
        this.text += s ? "{" : "[";
        const r = t.list;
        const i = r.length;
        let n;
        let o;
        for (n = 0; n < i; n++) {
            o = r[n];
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
    evaluate(t, e, s) {
        return this.value;
    }
}

class BindingBehaviorExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
        this.k = `_bb_${e}`;
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
    evaluate(t, e, s) {
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        return this.expression.assign(t, e, s);
    }
    bind(t, e) {
        const s = this.name;
        const r = this.k;
        const i = e.getBehavior?.(s);
        if (null == i) throw l(s);
        if (void 0 === e[r]) {
            e[r] = i;
            i.bind?.(t, e, ...this.args.map((s => s.evaluate(t, e, null))));
        } else throw f(s);
        if (this.expression.hasBind) this.expression.bind(t, e);
    }
    unbind(t, e) {
        const s = this.k;
        const r = e;
        if (void 0 !== r[s]) {
            r[s].unbind?.(t, e);
            r[s] = void 0;
        }
        if (this.expression.hasUnbind) this.expression.unbind(t, e);
    }
    accept(t) {
        return t.visitBindingBehavior(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

const l = t => new Error(`AUR0101:${t}`);

const f = t => new Error(`AUR0102:${t}`);

class ValueConverterExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
    }
    get $kind() {
        return 36914;
    }
    get hasBind() {
        return true;
    }
    get hasUnbind() {
        return true;
    }
    evaluate(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw p(r);
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s), ...this.args.map((r => r.evaluate(t, e, s))));
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw p(r);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, null))));
        return this.expression.assign(t, e, s);
    }
    bind(t, e) {
        const s = this.name;
        const r = e.getConverter?.(s);
        if (null == r) throw p(s);
        const i = r.signals;
        if (null != i) {
            const t = e.get?.(a);
            const s = i.length;
            let r = 0;
            for (;r < s; ++r) t?.addSignalListener(i[r], e);
        }
        if (this.expression.hasBind) this.expression.bind(t, e);
    }
    unbind(t, e) {
        const s = e.getConverter?.(this.name);
        if (void 0 === s?.signals) return;
        const r = e.get(a);
        let i = 0;
        for (;i < s.signals.length; ++i) r.removeSignalListener(s.signals[i], e);
    }
    accept(t) {
        return t.visitValueConverter(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

const p = t => new Error(`AUR0103:${t}`);

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
    evaluate(t, e, s) {
        return this.target.assign(t, e, this.value.evaluate(t, e, s));
    }
    assign(t, e, s) {
        this.value.assign(t, e, s);
        return this.target.assign(t, e, s);
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
    evaluate(t, e, s) {
        return this.condition.evaluate(t, e, s) ? this.yes.evaluate(t, e, s) : this.no.evaluate(t, e, s);
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        let r = t.overrideContext;
        let i = t;
        let n = this.ancestor;
        while (n-- && r) {
            i = i.parentScope;
            r = i?.overrideContext ?? null;
        }
        return n < 1 && r ? r.bindingContext : void 0;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        const r = BindingContext.get(t, this.name, this.ancestor);
        if (null !== s) s.observe(r, this.name);
        const i = r[this.name];
        if (null == i && "$host" === this.name) throw new Error(`AUR0105`);
        if (e?.strict) return i;
        return null == i ? "" : i;
    }
    assign(t, e, s) {
        if ("$host" === this.name) throw new Error(`AUR0106`);
        const r = BindingContext.get(t, this.name, this.ancestor);
        if (r instanceof Object) if (void 0 !== r.$observers?.[this.name]) {
            r.$observers[this.name].setValue(s);
            return s;
        } else return r[this.name] = s;
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
    evaluate(t, e, s) {
        const r = this.object.evaluate(t, e, s);
        if (e?.strict) {
            if (null == r) return r;
            if (null !== s) s.observe(r, this.name);
            return r[this.name];
        }
        if (null !== s && r instanceof Object) s.observe(r, this.name);
        return r ? r[this.name] : "";
    }
    assign(t, e, s) {
        const r = this.object.evaluate(t, e, null);
        if (r instanceof Object) if (void 0 !== r.$observers && void 0 !== r.$observers[this.name]) r.$observers[this.name].setValue(s); else r[this.name] = s; else this.object.assign(t, e, {
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
    evaluate(t, e, s) {
        const r = this.object.evaluate(t, e, s);
        if (r instanceof Object) {
            const i = this.key.evaluate(t, e, s);
            if (null !== s) s.observe(r, i);
            return r[i];
        }
        return;
    }
    assign(t, e, s) {
        const r = this.object.evaluate(t, e, null);
        const i = this.key.evaluate(t, e, null);
        return r[i] = s;
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
    evaluate(t, e, s) {
        const r = this.args.map((r => r.evaluate(t, e, s)));
        const i = BindingContext.get(t, this.name, this.ancestor);
        const n = b(e?.strictFnCall, i, this.name);
        if (n) return n.apply(i, r);
        return;
    }
    assign(t, e, s) {
        return;
    }
    accept(t) {
        return t.visitCallScope(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

const d = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some".split(" ");

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
    evaluate(t, e, s) {
        const r = this.object.evaluate(t, e, s);
        const i = this.args.map((r => r.evaluate(t, e, s)));
        const n = b(e?.strictFnCall, r, this.name);
        if (n) {
            if (o(r) && d.includes(this.name)) s?.observeCollection(r);
            return n.apply(r, i);
        }
        return;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        const r = this.func.evaluate(t, e, s);
        if (i(r)) return r(...this.args.map((r => r.evaluate(t, e, s))));
        if (!e?.strictFnCall && null == r) return;
        throw new Error(`AUR0107`);
    }
    assign(t, e, s) {
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
    evaluate(e, s, r) {
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(e, s, r) && this.right.evaluate(e, s, r);

          case "||":
            return this.left.evaluate(e, s, r) || this.right.evaluate(e, s, r);

          case "??":
            return this.left.evaluate(e, s, r) ?? this.right.evaluate(e, s, r);

          case "==":
            return this.left.evaluate(e, s, r) == this.right.evaluate(e, s, r);

          case "===":
            return this.left.evaluate(e, s, r) === this.right.evaluate(e, s, r);

          case "!=":
            return this.left.evaluate(e, s, r) != this.right.evaluate(e, s, r);

          case "!==":
            return this.left.evaluate(e, s, r) !== this.right.evaluate(e, s, r);

          case "instanceof":
            {
                const t = this.right.evaluate(e, s, r);
                if (i(t)) return this.left.evaluate(e, s, r) instanceof t;
                return false;
            }

          case "in":
            {
                const t = this.right.evaluate(e, s, r);
                if (t instanceof Object) return this.left.evaluate(e, s, r) in t;
                return false;
            }

          case "+":
            {
                const i = this.left.evaluate(e, s, r);
                const n = this.right.evaluate(e, s, r);
                if (s?.strict) return i + n;
                if (!i || !n) {
                    if (t.isNumberOrBigInt(i) || t.isNumberOrBigInt(n)) return (i || 0) + (n || 0);
                    if (t.isStringOrDate(i) || t.isStringOrDate(n)) return (i || "") + (n || "");
                }
                return i + n;
            }

          case "-":
            return this.left.evaluate(e, s, r) - this.right.evaluate(e, s, r);

          case "*":
            return this.left.evaluate(e, s, r) * this.right.evaluate(e, s, r);

          case "/":
            return this.left.evaluate(e, s, r) / this.right.evaluate(e, s, r);

          case "%":
            return this.left.evaluate(e, s, r) % this.right.evaluate(e, s, r);

          case "<":
            return this.left.evaluate(e, s, r) < this.right.evaluate(e, s, r);

          case ">":
            return this.left.evaluate(e, s, r) > this.right.evaluate(e, s, r);

          case "<=":
            return this.left.evaluate(e, s, r) <= this.right.evaluate(e, s, r);

          case ">=":
            return this.left.evaluate(e, s, r) >= this.right.evaluate(e, s, r);

          default:
            throw new Error(`AUR0108:${this.operation}`);
        }
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        switch (this.operation) {
          case "void":
            return void this.expression.evaluate(t, e, s);

          case "typeof":
            return typeof this.expression.evaluate(t, e, s);

          case "!":
            return !this.expression.evaluate(t, e, s);

          case "-":
            return -this.expression.evaluate(t, e, s);

          case "+":
            return +this.expression.evaluate(t, e, s);

          default:
            throw new Error(`AUR0109:${this.operation}`);
        }
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        return this.value;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        let r = "";
        for (let i = 0; i < this.parts.length; ++i) {
            const n = this.parts[i].evaluate(t, e, s);
            if (null == n) continue;
            r += n;
        }
        return r;
    }
    assign(t, e, s, r) {
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
    evaluate(t, e, s) {
        return this.elements.map((r => r.evaluate(t, e, s)));
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        const r = {};
        for (let i = 0; i < this.keys.length; ++i) r[this.keys[i]] = this.values[i].evaluate(t, e, s);
        return r;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        let r = this.cooked[0];
        for (let i = 0; i < this.expressions.length; ++i) {
            r += String(this.expressions[i].evaluate(t, e, s));
            r += this.cooked[i + 1];
        }
        return r;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        const r = this.expressions.map((r => r.evaluate(t, e, s)));
        const n = this.func.evaluate(t, e, s);
        if (!i(n)) throw new Error(`AUR0110`);
        return n(this.cooked, ...r);
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        return;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        return;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        return this.name;
    }
    accept(t) {
        return t.visitBindingIdentifier(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

const w = Object.prototype.toString;

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
    evaluate(t, e, s) {
        return this.iterable.evaluate(t, e, s);
    }
    assign(t, e, s) {
        return;
    }
    count(t, e) {
        switch (w.call(e)) {
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
            throw new Error(`Cannot count ${w.call(e)}`);
        }
    }
    iterate(t, e, s) {
        switch (w.call(e)) {
          case "[object Array]":
            return g(e, s);

          case "[object Map]":
            return v(e, s);

          case "[object Set]":
            return x(e, s);

          case "[object Number]":
            return E(e, s);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${w.call(e)}`);
        }
    }
    bind(t, e) {
        if (this.iterable.hasBind) this.iterable.bind(t, e);
    }
    unbind(t, e) {
        if (this.iterable.hasUnbind) this.iterable.unbind(t, e);
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
        return 25;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        if (this.isMulti) {
            let r = this.parts[0];
            let i = 0;
            for (;i < this.expressions.length; ++i) {
                r += String(this.expressions[i].evaluate(t, e, s));
                r += this.parts[i + 1];
            }
            return r;
        } else return `${this.parts[0]}${this.firstExpression.evaluate(t, e, s)}${this.parts[1]}`;
    }
    assign(t, e, s) {
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
    evaluate(t, e, s) {
        return;
    }
    assign(t, e, s) {
        const r = this.list;
        const i = r.length;
        let n;
        let o;
        for (n = 0; n < i; n++) {
            o = r[n];
            switch (o.$kind) {
              case 139292:
                o.assign(t, e, s);
                break;

              case 90138:
              case 106523:
                {
                    if ("object" !== typeof s || null === s) throw new Error(`AUR0112`);
                    let r = o.source.evaluate(Scope.create(s), e, null);
                    if (void 0 === r) r = o.initializer?.evaluate(t, e, null);
                    o.assign(t, e, r);
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
        return 139292;
    }
    evaluate(t, e, s) {
        return;
    }
    assign(t, e, s) {
        if (null == s) return;
        if ("object" !== typeof s) throw new Error(`AUR0112`);
        let r = this.source.evaluate(Scope.create(s), e, null);
        if (void 0 === r) r = this.initializer?.evaluate(t, e, null);
        this.target.assign(t, e, r);
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
    evaluate(t, e, s) {
        return;
    }
    assign(e, s, r) {
        if (null == r) return;
        if ("object" !== typeof r) throw new Error(`AUR0112`);
        const i = this.indexOrProperties;
        let n;
        if (t.isArrayIndex(i)) {
            if (!Array.isArray(r)) throw new Error(`AUR0112`);
            n = r.slice(i);
        } else n = Object.entries(r).reduce(((t, [e, s]) => {
            if (!i.includes(e)) t[e] = s;
            return t;
        }), {});
        this.target.assign(e, s, n);
    }
    accept(t) {
        return t.visitDestructuringAssignmentRestExpression(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

class ArrowFunction {
    constructor(t, e, s = false) {
        this.args = t;
        this.body = e;
        this.rest = s;
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
    evaluate(t, e, s) {
        const r = (...r) => {
            const i = this.args;
            const n = this.rest;
            const o = i.length - 1;
            const c = i.reduce(((t, e, s) => {
                if (n && s === o) t[e.name] = r.slice(s); else t[e.name] = r[s];
                return t;
            }), {});
            const u = Scope.fromParent(t, c);
            return this.body.evaluate(u, e, s);
        };
        return r;
    }
    assign(t, e, s) {
        return;
    }
    accept(t) {
        return t.visitArrowFunction(this);
    }
    toString() {
        return Unparser.unparse(this);
    }
}

function b(t, e, s) {
    const r = null == e ? null : e[s];
    if (i(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function g(t, e) {
    for (let s = 0, r = t.length; s < r; ++s) e(t, s, t[s]);
}

function v(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.entries()) s[++r] = e;
    g(s, e);
}

function x(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.keys()) s[++r] = e;
    g(s, e);
}

function E(t, e) {
    const s = Array(t);
    for (let e = 0; e < t; ++e) s[e] = e;
    g(s, e);
}

const A = t.DI.createInterface("ICoercionConfiguration");

exports.LifecycleFlags = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(exports.LifecycleFlags || (exports.LifecycleFlags = {}));

var U;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(U || (U = {}));

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

function m(t, e, s) {
    const {length: r} = t;
    const i = Array(r);
    let n = 0;
    while (n < r) {
        i[n] = t[n];
        ++n;
    }
    if (void 0 !== e) i.deletedIndices = e.slice(0); else if (void 0 !== t.deletedIndices) i.deletedIndices = t.deletedIndices.slice(0); else i.deletedIndices = [];
    if (void 0 !== s) i.deletedItems = s.slice(0); else if (void 0 !== t.deletedItems) i.deletedItems = t.deletedItems.slice(0); else i.deletedItems = [];
    i.isIndexMap = true;
    return i;
}

function y(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function S(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function O(t) {
    return o(t) && true === t.isIndexMap;
}

let k = new Map;

let C = false;

function $(t) {
    const e = k;
    const s = k = new Map;
    C = true;
    try {
        t();
    } finally {
        k = null;
        C = false;
        try {
            let t;
            let r;
            let i;
            let n;
            let o = false;
            let c;
            let u;
            for (t of s) {
                r = t[0];
                i = t[1];
                if (e?.has(r)) e.set(r, i);
                if (1 === i[0]) r.notify(i[1], i[2]); else {
                    n = i[1];
                    o = false;
                    if (n.deletedIndices.length > 0) o = true; else for (c = 0, u = n.length; c < u; ++c) if (n[c] !== c) {
                        o = true;
                        break;
                    }
                    if (o) r.notifyCollection(n);
                }
            }
        } finally {
            k = e;
        }
    }
}

function L(t, e) {
    if (!k.has(t)) k.set(t, [ 2, e ]);
}

function B(t, e, s) {
    const r = k.get(t);
    if (void 0 === r) k.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function R(t) {
    return null == t ? P : P(t);
}

function P(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: T
    });
    u(e, "subscribe", j);
    u(e, "unsubscribe", I);
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
    notify(t, e) {
        if (C) {
            B(this, t, e);
            return;
        }
        const s = this.s0;
        const r = this.s1;
        const i = this.s2;
        let n = this.sr;
        if (void 0 !== n) n = n.slice();
        if (void 0 !== s) s.handleChange(t, e);
        if (void 0 !== r) r.handleChange(t, e);
        if (void 0 !== i) i.handleChange(t, e);
        if (void 0 !== n) {
            const s = n.length;
            let r;
            let i = 0;
            for (;i < s; ++i) {
                r = n[i];
                if (void 0 !== r) r.handleChange(t, e);
            }
        }
    }
    notifyCollection(t) {
        const e = this.s0;
        const s = this.s1;
        const r = this.s2;
        let i = this.sr;
        if (void 0 !== i) i = i.slice();
        if (void 0 !== e) e.handleCollectionChange(t);
        if (void 0 !== s) s.handleCollectionChange(t);
        if (void 0 !== r) r.handleCollectionChange(t);
        if (void 0 !== i) {
            const e = i.length;
            let s;
            let r = 0;
            for (;r < e; ++r) {
                s = i[r];
                if (void 0 !== s) s.handleCollectionChange(t);
            }
        }
    }
}

function T() {
    return c(this, "subs", new SubscriberRecord);
}

function j(t) {
    return this.subs.add(t);
}

function I(t) {
    return this.subs.remove(t);
}

function M(t) {
    return null == t ? D : D(t);
}

function D(t) {
    const e = t.prototype;
    r(e, "queue", {
        get: F
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
            this.i.forEach(V);
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

function F() {
    return FlushQueue.instance;
}

function V(t, e, s) {
    s.delete(t);
    t.flush();
}

class CollectionLengthObserver {
    constructor(t) {
        this.owner = t;
        this.type = 18;
        this.v = this.u = (this.o = t.collection).length;
    }
    getValue() {
        return this.o.length;
    }
    setValue(e) {
        const s = this.v;
        if (e !== s && t.isArrayIndex(e)) {
            this.o.length = e;
            this.v = e;
            this.u = s;
            this.queue.add(this);
        }
    }
    handleCollectionChange(t) {
        const e = this.v;
        const s = this.o.length;
        if ((this.v = s) !== e) {
            this.u = e;
            this.queue.add(this);
        }
    }
    flush() {
        H = this.u;
        this.u = this.v;
        this.subs.notify(this.v, H);
    }
}

class CollectionSizeObserver {
    constructor(t) {
        this.owner = t;
        this.v = this.u = (this.o = t.collection).size;
        this.type = this.o instanceof Map ? 66 : 34;
    }
    getValue() {
        return this.o.size;
    }
    setValue() {
        throw new Error(`AUR02`);
    }
    handleCollectionChange(t) {
        const e = this.v;
        const s = this.o.size;
        if ((this.v = s) !== e) {
            this.u = e;
            this.queue.add(this);
        }
    }
    flush() {
        H = this.u;
        this.u = this.v;
        this.subs.notify(this.v, H);
    }
}

function N(t) {
    const e = t.prototype;
    u(e, "subscribe", K);
    u(e, "unsubscribe", q);
    M(t);
    R(t);
}

function K(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function q(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

N(CollectionLengthObserver);

N(CollectionSizeObserver);

let H;

const Q = new WeakMap;

function _(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function z(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function W(t, e, s, r, i) {
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

function G(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let p, d, w;
    let b, g;
    let v, x, E, A;
    let U, m, y, S;
    while (true) {
        if (r - s <= 10) {
            W(t, e, s, r, i);
            return;
        }
        n = s + (r - s >> 1);
        c = t[s];
        a = e[s];
        u = t[r - 1];
        l = e[r - 1];
        h = t[n];
        f = e[n];
        p = i(c, u);
        if (p > 0) {
            b = c;
            g = a;
            c = u;
            a = l;
            u = b;
            l = g;
        }
        d = i(c, h);
        if (d >= 0) {
            b = c;
            g = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = b;
            l = g;
        } else {
            w = i(u, h);
            if (w > 0) {
                b = u;
                g = l;
                u = h;
                l = f;
                h = b;
                f = g;
            }
        }
        t[s] = c;
        e[s] = a;
        t[r - 1] = h;
        e[r - 1] = f;
        v = u;
        x = l;
        E = s + 1;
        A = r - 1;
        t[n] = t[E];
        e[n] = e[E];
        t[E] = v;
        e[E] = x;
        t: for (o = E + 1; o < A; o++) {
            U = t[o];
            m = e[o];
            y = i(U, v);
            if (y < 0) {
                t[o] = t[E];
                e[o] = e[E];
                t[E] = U;
                e[E] = m;
                E++;
            } else if (y > 0) {
                do {
                    A--;
                    if (A == o) break t;
                    S = t[A];
                    y = i(S, v);
                } while (y > 0);
                t[o] = t[A];
                e[o] = e[A];
                t[A] = U;
                e[A] = m;
                if (y < 0) {
                    U = t[o];
                    m = e[o];
                    t[o] = t[E];
                    e[o] = e[E];
                    t[E] = U;
                    e[E] = m;
                    E++;
                }
            }
        }
        if (r - A < E - s) {
            G(t, e, A, r, i);
            r = E;
        } else {
            G(t, e, s, E, i);
            s = A;
        }
    }
}

const Z = Array.prototype;

const J = Z.push;

const X = Z.unshift;

const Y = Z.pop;

const tt = Z.shift;

const et = Z.splice;

const st = Z.reverse;

const rt = Z.sort;

const it = {
    push: J,
    unshift: X,
    pop: Y,
    shift: tt,
    splice: et,
    reverse: st,
    sort: rt
};

const nt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const ot = {
    push: function(...t) {
        const e = Q.get(this);
        if (void 0 === e) return J.apply(this, t);
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
        const e = Q.get(this);
        if (void 0 === e) return X.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        X.apply(e.indexMap, r);
        const n = X.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = Q.get(this);
        if (void 0 === t) return Y.call(this);
        const e = t.indexMap;
        const s = Y.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        Y.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = Q.get(this);
        if (void 0 === t) return tt.call(this);
        const e = t.indexMap;
        const s = tt.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        tt.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = Q.get(this);
        if (void 0 === r) return et.apply(this, t);
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
                if (c[t] > -1) {
                    c.deletedIndices.push(c[t]);
                    c.deletedItems.push(this[t]);
                }
                t++;
            }
        }
        if (u > 2) {
            const t = u - 2;
            const r = new Array(t);
            let i = 0;
            while (i < t) r[i++] = -2;
            et.call(c, e, s, ...r);
        } else et.apply(c, t);
        const a = et.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = Q.get(this);
        if (void 0 === t) {
            st.call(this);
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
        const e = Q.get(this);
        if (void 0 === e) {
            rt.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        G(this, e.indexMap, 0, s, z);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !i(t)) t = _;
        G(this, e.indexMap, 0, r, t);
        let n = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            n = true;
            break;
        }
        if (n) e.notify();
        return this;
    }
};

for (const t of nt) r(ot[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let ct = false;

function ut() {
    for (const t of nt) if (true !== Z[t].observing) c(Z, t, ot[t]);
}

function ht() {
    for (const t of nt) if (true === Z[t].observing) c(Z, t, it[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!ct) {
            ct = true;
            ut();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = y(t.length);
        this.lenObs = void 0;
        Q.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (C) {
            L(t, e);
            return;
        }
        const s = this.collection.length;
        this.indexMap = y(s);
        this.subs.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionLengthObserver(this));
    }
    getIndexObserver(t) {
        var e;
        return (e = this.indexObservers)[t] ?? (e[t] = new ArrayIndexObserver(this, t));
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
    setValue(t) {
        if (t === this.getValue()) return;
        const e = this.owner;
        const s = this.index;
        const r = e.indexMap;
        if (r[s] > -1) r.deletedIndices.push(r[s]);
        r[s] = -2;
        e.collection[s] = t;
        e.notify();
    }
    handleCollectionChange(t) {
        const e = this.index;
        const s = t[e] === e;
        if (s) return;
        const r = this.value;
        const i = this.value = this.getValue();
        if (r !== i) this.subs.notify(i, r);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.owner.unsubscribe(this);
    }
}

R(ArrayObserver);

R(ArrayIndexObserver);

function at(t) {
    let e = Q.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const lt = (t, e) => t - e;

function ft(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = S(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(lt);
    const n = i.length;
    for (;r < n; ++r) {
        while (i.deletedIndices[s] <= r - e) {
            ++s;
            --e;
        }
        if (-2 === i[r]) ++e; else i[r] += e;
    }
    return i;
}

function pt(t, e) {
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

const dt = new WeakMap;

const wt = Set.prototype;

const bt = wt.add;

const gt = wt.clear;

const vt = wt.delete;

const xt = {
    add: bt,
    clear: gt,
    delete: vt
};

const Et = [ "add", "clear", "delete" ];

const At = {
    add: function(t) {
        const e = dt.get(this);
        if (void 0 === e) {
            bt.call(this, t);
            return this;
        }
        const s = this.size;
        bt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = dt.get(this);
        if (void 0 === t) return gt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) {
                    e.deletedIndices.push(e[s]);
                    e.deletedItems.push(t);
                }
                s++;
            }
            gt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = dt.get(this);
        if (void 0 === e) return vt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) {
                    i.deletedIndices.push(i[r]);
                    i.deletedItems.push(s);
                }
                i.splice(r, 1);
                const n = vt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            r++;
        }
        return false;
    }
};

const Ut = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Et) r(At[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let mt = false;

function yt() {
    for (const t of Et) if (true !== wt[t].observing) r(wt, t, {
        ...Ut,
        value: At[t]
    });
}

function St() {
    for (const t of Et) if (true === wt[t].observing) r(wt, t, {
        ...Ut,
        value: xt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!mt) {
            mt = true;
            yt();
        }
        this.collection = t;
        this.indexMap = y(t.size);
        this.lenObs = void 0;
        dt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (C) {
            L(t, e);
            return;
        }
        const s = this.collection.size;
        this.indexMap = y(s);
        this.subs.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

R(SetObserver);

function Ot(t) {
    let e = dt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const kt = new WeakMap;

const Ct = Map.prototype;

const $t = Ct.set;

const Lt = Ct.clear;

const Bt = Ct.delete;

const Rt = {
    set: $t,
    clear: Lt,
    delete: Bt
};

const Pt = [ "set", "clear", "delete" ];

const Tt = {
    set: function(t, e) {
        const s = kt.get(this);
        if (void 0 === s) {
            $t.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        $t.call(this, t, e);
        const n = this.size;
        if (n === i) {
            let e = 0;
            for (const i of this.entries()) {
                if (i[0] === t) {
                    if (i[1] !== r) {
                        s.indexMap.deletedIndices.push(s.indexMap[e]);
                        s.indexMap.deletedItems.push(i);
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
        const t = kt.get(this);
        if (void 0 === t) return Lt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) {
                    e.deletedIndices.push(e[s]);
                    e.deletedItems.push(t);
                }
                s++;
            }
            Lt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = kt.get(this);
        if (void 0 === e) return Bt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) {
                    i.deletedIndices.push(i[r]);
                    i.deletedItems.push(s);
                }
                i.splice(r, 1);
                const n = Bt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            ++r;
        }
        return false;
    }
};

const jt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Pt) r(Tt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let It = false;

function Mt() {
    for (const t of Pt) if (true !== Ct[t].observing) r(Ct, t, {
        ...jt,
        value: Tt[t]
    });
}

function Dt() {
    for (const t of Pt) if (true === Ct[t].observing) r(Ct, t, {
        ...jt,
        value: Rt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!It) {
            It = true;
            Mt();
        }
        this.collection = t;
        this.indexMap = y(t.size);
        this.lenObs = void 0;
        kt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (C) {
            L(t, e);
            return;
        }
        const s = this.collection.size;
        this.indexMap = y(s);
        t.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

R(MapObserver);

function Ft(t) {
    let e = kt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Vt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Nt() {
    return c(this, "obs", new BindingObserverRecord(this));
}

function Kt(t) {
    let e;
    if (o(t)) e = at(t); else if (t instanceof Set) e = Ot(t); else if (t instanceof Map) e = Ft(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function qt(t) {
    this.obs.add(t);
}

function Ht() {
    throw new Error(`AUR2011:handleChange`);
}

function Qt() {
    throw new Error(`AUR2011:handleCollectionChange`);
}

class BindingObserverRecord {
    constructor(t) {
        this.version = 0;
        this.count = 0;
        this.o = new Map;
        this.b = t;
    }
    handleChange(t, e) {
        return this.b.interceptor.handleChange(t, e);
    }
    handleCollectionChange(t) {
        this.b.interceptor.handleCollectionChange(t);
    }
    add(t) {
        if (!this.o.has(t)) {
            t.subscribe(this);
            ++this.count;
        }
        this.o.set(t, this.version);
    }
    clear() {
        this.o.forEach(zt, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(_t, this);
        this.o.clear();
        this.count = 0;
    }
}

function _t(t, e) {
    e.unsubscribe(this);
}

function zt(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function Wt(t) {
    const e = t.prototype;
    u(e, "observe", Vt);
    u(e, "observeCollection", Kt);
    u(e, "subscribeTo", qt);
    r(e, "obs", {
        get: Nt
    });
    u(e, "handleChange", Ht);
    u(e, "handleCollectionChange", Qt);
    return t;
}

function Gt(t) {
    return null == t ? Wt : Wt(t);
}

const Zt = t.DI.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = h();
        this.A = h();
        this.U = h();
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
                throw ze();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        oe = t;
        ce = 0;
        ue = t.length;
        he = 0;
        ae = 0;
        le = 6291456;
        fe = "";
        pe = t.charCodeAt(0);
        de = true;
        we = false;
        return ve(61, void 0 === e ? 8 : e);
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

function Jt(t) {
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

var Xt;

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
})(Xt || (Xt = {}));

var Yt;

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
})(Yt || (Yt = {}));

const te = PrimitiveLiteralExpression.$false;

const ee = PrimitiveLiteralExpression.$true;

const se = PrimitiveLiteralExpression.$null;

const re = PrimitiveLiteralExpression.$undefined;

const ie = AccessThisExpression.$this;

const ne = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let oe = "";

let ce = 0;

let ue = 0;

let he = 0;

let ae = 0;

let le = 6291456;

let fe = "";

let pe;

let de = true;

let we = false;

function be() {
    return oe.slice(ae, ce);
}

function ge(t, e) {
    oe = t;
    ce = 0;
    ue = t.length;
    he = 0;
    ae = 0;
    le = 6291456;
    fe = "";
    pe = t.charCodeAt(0);
    de = true;
    we = false;
    return ve(61, void 0 === e ? 8 : e);
}

function ve(t, e) {
    if (16 === e) return new CustomExpression(oe);
    if (0 === ce) {
        if (1 & e) return $e();
        Re();
        if (4194304 & le) throw Ne();
    }
    de = 513 > t;
    we = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & le) {
        const t = ps[63 & le];
        Re();
        r = new UnaryExpression(t, ve(514, e));
        de = false;
    } else {
        t: switch (le) {
          case 12294:
            i = he;
            de = false;
            do {
                Re();
                ++i;
                switch (le) {
                  case 65545:
                    Re();
                    if (0 === (12288 & le)) throw qe();
                    break;

                  case 10:
                  case 11:
                    throw qe();

                  case 2162700:
                    we = true;
                    Re();
                    if (0 === (12288 & le)) {
                        r = 0 === i ? ie : 1 === i ? ne : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & le) {
                        r = 0 === i ? ie : 1 === i ? ne : new AccessThisExpression(i);
                        break t;
                    }
                    throw He();
                }
            } while (12294 === le);

          case 4096:
            {
                const t = fe;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                de = !we;
                Re();
                if (Fe(49)) {
                    if (524296 === le) throw ls();
                    const e = we;
                    const s = he;
                    ++he;
                    const i = ve(62, 0);
                    we = e;
                    he = s;
                    de = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw fs();

          case 11:
            throw Ke();

          case 12292:
            de = false;
            Re();
            switch (he) {
              case 0:
                r = ie;
                break;

              case 1:
                r = ne;
                break;

              default:
                r = new AccessThisExpression(he);
                break;
            }
            break;

          case 2688007:
            r = Se(e);
            break;

          case 2688016:
            r = oe.search(/\s+of\s+/) > ce ? xe() : Oe(e);
            break;

          case 524296:
            r = Ce(e);
            break;

          case 2163758:
            r = new TemplateExpression([ fe ]);
            de = false;
            Re();
            break;

          case 2163759:
            r = Le(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(fe);
            de = false;
            Re();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = ps[63 & le];
            de = false;
            Re();
            break;

          default:
            if (ce >= ue) throw Qe(); else throw _e();
        }
        if (2 & e) return ke(r);
        if (514 < t) return r;
        if (10 === le || 11 === le) throw qe();
        if (1793 === r.$kind) switch (le) {
          case 2162700:
            we = true;
            de = false;
            Re();
            if (0 === (13312 & le)) throw ns();
            if (12288 & le) {
                r = new AccessScopeExpression(fe, r.ancestor);
                Re();
            } else if (2688007 === le) r = new CallFunctionExpression(r, Ee(), true); else if (2688016 === le) r = Ae(r, true); else throw os();
            break;

          case 65545:
            de = !we;
            Re();
            if (0 === (12288 & le)) throw qe();
            r = new AccessScopeExpression(fe, r.ancestor);
            Re();
            break;

          case 10:
          case 11:
            throw qe();

          case 2688007:
            r = new CallFunctionExpression(r, Ee(), s);
            break;

          case 2688016:
            r = Ae(r, s);
            break;

          case 2163758:
            r = Be(r);
            break;

          case 2163759:
            r = Le(e, r, true);
            break;
        }
        while ((65536 & le) > 0) switch (le) {
          case 2162700:
            r = Ue(r);
            break;

          case 65545:
            Re();
            if (0 === (12288 & le)) throw qe();
            r = me(r, false);
            break;

          case 10:
          case 11:
            throw qe();

          case 2688007:
            if (10082 === r.$kind) r = new CallScopeExpression(r.name, Ee(), r.ancestor, false); else if (9323 === r.$kind) r = new CallMemberExpression(r.object, r.name, Ee(), r.optional, false); else r = new CallFunctionExpression(r, Ee(), false);
            break;

          case 2688016:
            r = Ae(r, false);
            break;

          case 2163758:
            if (we) throw os();
            r = Be(r);
            break;

          case 2163759:
            if (we) throw os();
            r = Le(e, r, true);
            break;
        }
    }
    if (10 === le || 11 === le) throw qe();
    if (513 < t) return r;
    while ((262144 & le) > 0) {
        const s = le;
        if ((960 & s) <= t) break;
        Re();
        r = new BinaryExpression(ps[63 & s], r, ve(960 & s, e));
        de = false;
    }
    if (63 < t) return r;
    if (Fe(6291477)) {
        const t = ve(62, e);
        Ve(6291476);
        r = new ConditionalExpression(r, t, ve(62, e));
        de = false;
    }
    if (62 < t) return r;
    if (Fe(4194348)) {
        if (!de) throw We();
        r = new AssignExpression(r, ve(62, e));
    }
    if (61 < t) return r;
    while (Fe(6291479)) {
        if (6291456 === le) throw Ge();
        const t = fe;
        Re();
        const s = new Array;
        while (Fe(6291476)) s.push(ve(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Fe(6291478)) {
        if (6291456 === le) throw Ze();
        const t = fe;
        Re();
        const s = new Array;
        while (Fe(6291476)) s.push(ve(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== le) {
        if ((1 & e) > 0 && 7340045 === le) return r;
        if ("of" === be()) throw Je();
        throw _e();
    }
    return r;
}

function xe() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Re();
        switch (le) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = be();
            break;

          default:
            throw is();
        }
    }
    Ve(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(ie, s), new AccessKeyedExpression(ie, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Ee() {
    const t = we;
    Re();
    const e = [];
    while (7340046 !== le) {
        e.push(ve(62, 0));
        if (!Fe(6291471)) break;
    }
    Ve(7340046);
    de = false;
    we = t;
    return e;
}

function Ae(t, e) {
    const s = we;
    Re();
    t = new AccessKeyedExpression(t, ve(62, 0), e);
    Ve(7340051);
    de = !s;
    we = s;
    return t;
}

function Ue(t) {
    we = true;
    de = false;
    Re();
    if (0 === (13312 & le)) throw ns();
    if (12288 & le) return me(t, true);
    if (2688007 === le) if (10082 === t.$kind) return new CallScopeExpression(t.name, Ee(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, Ee(), t.optional, true); else return new CallFunctionExpression(t, Ee(), true);
    if (2688016 === le) return Ae(t, true);
    throw os();
}

function me(t, e) {
    const s = fe;
    switch (le) {
      case 2162700:
        {
            we = true;
            de = false;
            const r = ce;
            const i = ae;
            const n = le;
            const o = pe;
            const c = fe;
            const u = de;
            const h = we;
            Re();
            if (0 === (13312 & le)) throw ns();
            if (2688007 === le) return new CallMemberExpression(t, s, Ee(), e, true);
            ce = r;
            ae = i;
            le = n;
            pe = o;
            fe = c;
            de = u;
            we = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        de = false;
        return new CallMemberExpression(t, s, Ee(), e, false);

      default:
        de = !we;
        Re();
        return new AccessMemberExpression(t, s, e);
    }
}

var ye;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(ye || (ye = {}));

function Se(t) {
    Re();
    const e = ce;
    const s = ae;
    const r = le;
    const i = pe;
    const n = fe;
    const o = de;
    const c = we;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === le) {
            Re();
            if (4096 !== le) throw qe();
            u.push(new BindingIdentifier(fe));
            Re();
            if (6291471 === le) throw as();
            if (7340046 !== le) throw Ke();
            Re();
            if (49 !== le) throw Ke();
            Re();
            const t = we;
            const e = he;
            ++he;
            const s = ve(62, 0);
            we = t;
            he = e;
            de = false;
            return new ArrowFunction(u, s, true);
        }
        switch (le) {
          case 4096:
            u.push(new BindingIdentifier(fe));
            Re();
            break;

          case 7340046:
            Re();
            break t;

          case 524296:
          case 2688016:
            Re();
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
            Re();
            h = 2;
            break;
        }
        switch (le) {
          case 6291471:
            Re();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Re();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw cs();
            Re();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === le) {
        if (1 === h) {
            Re();
            if (524296 === le) throw ls();
            const t = we;
            const e = he;
            ++he;
            const s = ve(62, 0);
            we = t;
            he = e;
            de = false;
            return new ArrowFunction(u, s);
        }
        throw cs();
    } else if (1 === h && 0 === u.length) throw ss(49);
    if (a) switch (h) {
      case 2:
        throw cs();

      case 3:
        throw us();

      case 4:
        throw hs();
    }
    ce = e;
    ae = s;
    le = r;
    pe = i;
    fe = n;
    de = o;
    we = c;
    const l = we;
    const f = ve(62, t);
    we = l;
    Ve(7340046);
    if (49 === le) switch (h) {
      case 2:
        throw cs();

      case 3:
        throw us();

      case 4:
        throw hs();
    }
    return f;
}

function Oe(t) {
    const e = we;
    Re();
    const s = new Array;
    while (7340051 !== le) if (Fe(6291471)) {
        s.push(re);
        if (7340051 === le) break;
    } else {
        s.push(ve(62, ~2 & t));
        if (Fe(6291471)) {
            if (7340051 === le) break;
        } else break;
    }
    we = e;
    Ve(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        de = false;
        return new ArrayLiteralExpression(s);
    }
}

function ke(t) {
    if (0 === (65536 & t.$kind)) throw Xe();
    if (4204592 !== le) throw Xe();
    Re();
    const e = t;
    const s = ve(61, 0);
    return new ForOfStatement(e, s);
}

function Ce(t) {
    const e = we;
    const s = new Array;
    const r = new Array;
    Re();
    while (7340045 !== le) {
        s.push(fe);
        if (49152 & le) {
            Re();
            Ve(6291476);
            r.push(ve(62, ~2 & t));
        } else if (12288 & le) {
            const e = pe;
            const s = le;
            const i = ce;
            Re();
            if (Fe(6291476)) r.push(ve(62, ~2 & t)); else {
                pe = e;
                le = s;
                ce = i;
                r.push(ve(515, ~2 & t));
            }
        } else throw Ye();
        if (7340045 !== le) Ve(6291471);
    }
    we = e;
    Ve(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        de = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function $e() {
    const t = [];
    const e = [];
    const s = ue;
    let r = "";
    while (ce < s) {
        switch (pe) {
          case 36:
            if (123 === oe.charCodeAt(ce + 1)) {
                t.push(r);
                r = "";
                ce += 2;
                pe = oe.charCodeAt(ce);
                Re();
                const s = ve(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(Jt(Pe()));
            break;

          default:
            r += String.fromCharCode(pe);
        }
        Pe();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Le(t, e, s) {
    const r = we;
    const i = [ fe ];
    Ve(2163759);
    const n = [ ve(62, t) ];
    while (2163758 !== (le = De())) {
        i.push(fe);
        Ve(2163759);
        n.push(ve(62, t));
    }
    i.push(fe);
    de = false;
    we = r;
    if (s) {
        Re();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Re();
        return new TemplateExpression(i, n);
    }
}

function Be(t) {
    de = false;
    const e = [ fe ];
    Re();
    return new TaggedTemplateExpression(e, e, t);
}

function Re() {
    while (ce < ue) {
        ae = ce;
        if (null != (le = Es[pe]())) return;
    }
    le = 6291456;
}

function Pe() {
    return pe = oe.charCodeAt(++ce);
}

function Te() {
    while (xs[Pe()]) ;
    const t = ds[fe = be()];
    return void 0 === t ? 4096 : t;
}

function je(t) {
    let e = pe;
    if (false === t) {
        do {
            e = Pe();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            fe = parseInt(be(), 10);
            return 32768;
        }
        e = Pe();
        if (ce >= ue) {
            fe = parseInt(be().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Pe();
    } while (e <= 57 && e >= 48); else pe = oe.charCodeAt(--ce);
    fe = parseFloat(be());
    return 32768;
}

function Ie() {
    const t = pe;
    Pe();
    let e = 0;
    const s = new Array;
    let r = ce;
    while (pe !== t) if (92 === pe) {
        s.push(oe.slice(r, ce));
        Pe();
        e = Jt(pe);
        Pe();
        s.push(String.fromCharCode(e));
        r = ce;
    } else if (ce >= ue) throw ts(); else Pe();
    const i = oe.slice(r, ce);
    Pe();
    s.push(i);
    const n = s.join("");
    fe = n;
    return 16384;
}

function Me() {
    let t = true;
    let e = "";
    while (96 !== Pe()) if (36 === pe) if (ce + 1 < ue && 123 === oe.charCodeAt(ce + 1)) {
        ce++;
        t = false;
        break;
    } else e += "$"; else if (92 === pe) e += String.fromCharCode(Jt(Pe())); else {
        if (ce >= ue) throw es();
        e += String.fromCharCode(pe);
    }
    Pe();
    fe = e;
    if (t) return 2163758;
    return 2163759;
}

function De() {
    if (ce >= ue) throw es();
    ce--;
    return Me();
}

function Fe(t) {
    if (le === t) {
        Re();
        return true;
    }
    return false;
}

function Ve(t) {
    if (le === t) Re(); else throw ss(t);
}

function Ne() {
    return new Error(`AUR0151:${oe}`);
}

function Ke() {
    return new Error(`AUR0152:${oe}`);
}

function qe() {
    return new Error(`AUR0153:${oe}`);
}

function He() {
    return new Error(`AUR0154:${oe}`);
}

function Qe() {
    return new Error(`AUR0155:${oe}`);
}

function _e() {
    return new Error(`AUR0156:${oe}`);
}

function ze() {
    return new Error(`AUR0157`);
}

function We() {
    return new Error(`AUR0158:${oe}`);
}

function Ge() {
    return new Error(`AUR0159:${oe}`);
}

function Ze() {
    return new Error(`AUR0160:${oe}`);
}

function Je() {
    return new Error(`AUR0161:${oe}`);
}

function Xe() {
    return new Error(`AUR0163:${oe}`);
}

function Ye() {
    return new Error(`AUR0164:${oe}`);
}

function ts() {
    return new Error(`AUR0165:${oe}`);
}

function es() {
    return new Error(`AUR0166:${oe}`);
}

function ss(t) {
    return new Error(`AUR0167:${oe}<${ps[63 & t]}`);
}

const rs = () => {
    throw new Error(`AUR0168:${oe}`);
};

rs.notMapped = true;

function is() {
    return new Error(`AUR0170:${oe}`);
}

function ns() {
    return new Error(`AUR0171:${oe}`);
}

function os() {
    return new Error(`AUR0172:${oe}`);
}

function cs() {
    return new Error(`AUR0173:${oe}`);
}

function us() {
    return new Error(`AUR0174:${oe}`);
}

function hs() {
    return new Error(`AUR0175:${oe}`);
}

function as() {
    return new Error(`AUR0176:${oe}`);
}

function ls() {
    return new Error(`AUR0178:${oe}`);
}

function fs() {
    return new Error(`AUR0179:${oe}`);
}

const ps = [ te, ee, se, re, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const ds = Object.assign(Object.create(null), {
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

const ws = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function bs(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function gs(t) {
    return () => {
        Pe();
        return t;
    };
}

const vs = new Set;

bs(null, vs, ws.AsciiIdPart, true);

const xs = new Uint8Array(65535);

bs(xs, null, ws.IdStart, 1);

bs(xs, null, ws.Digit, 1);

const Es = new Array(65535);

Es.fill(rs, 0, 65535);

bs(Es, null, ws.Skip, (() => {
    Pe();
    return null;
}));

bs(Es, null, ws.IdStart, Te);

bs(Es, null, ws.Digit, (() => je(false)));

Es[34] = Es[39] = () => Ie();

Es[96] = () => Me();

Es[33] = () => {
    if (61 !== Pe()) return 131117;
    if (61 !== Pe()) return 6553948;
    Pe();
    return 6553950;
};

Es[61] = () => {
    if (62 === Pe()) {
        Pe();
        return 49;
    }
    if (61 !== pe) return 4194348;
    if (61 !== Pe()) return 6553947;
    Pe();
    return 6553949;
};

Es[38] = () => {
    if (38 !== Pe()) return 6291478;
    Pe();
    return 6553882;
};

Es[124] = () => {
    if (124 !== Pe()) return 6291479;
    Pe();
    return 6553817;
};

Es[63] = () => {
    if (46 === Pe()) {
        const t = oe.charCodeAt(ce + 1);
        if (t <= 48 || t >= 57) {
            Pe();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== pe) return 6291477;
    Pe();
    return 6553752;
};

Es[46] = () => {
    if (Pe() <= 57 && pe >= 48) return je(true);
    if (46 === pe) {
        if (46 !== Pe()) return 10;
        Pe();
        return 11;
    }
    return 65545;
};

Es[60] = () => {
    if (61 !== Pe()) return 6554015;
    Pe();
    return 6554017;
};

Es[62] = () => {
    if (61 !== Pe()) return 6554016;
    Pe();
    return 6554018;
};

Es[37] = gs(6554154);

Es[40] = gs(2688007);

Es[41] = gs(7340046);

Es[42] = gs(6554153);

Es[43] = gs(2490853);

Es[44] = gs(6291471);

Es[45] = gs(2490854);

Es[47] = gs(6554155);

Es[58] = gs(6291476);

Es[91] = gs(2688016);

Es[93] = gs(7340051);

Es[123] = gs(524296);

Es[125] = gs(7340045);

let As = null;

const Us = [];

let ms = false;

function ys() {
    ms = false;
}

function Ss() {
    ms = true;
}

function Os() {
    return As;
}

function ks(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == As) {
        As = t;
        Us[0] = As;
        ms = true;
        return;
    }
    if (As === t) throw new Error(`AUR0207`);
    Us.push(t);
    As = t;
    ms = true;
}

function Cs(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (As !== t) throw new Error(`AUR0209`);
    Us.pop();
    As = Us.length > 0 ? Us[Us.length - 1] : null;
    ms = null != As;
}

const $s = Object.freeze({
    get current() {
        return As;
    },
    get connecting() {
        return ms;
    },
    enter: ks,
    exit: Cs,
    pause: ys,
    resume: Ss
});

const Ls = Reflect.get;

const Bs = Object.prototype.toString;

const Rs = new WeakMap;

function Ps(t) {
    switch (Bs.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Ts = "__raw__";

function js(t) {
    return Ps(t) ? Is(t) : t;
}

function Is(t) {
    return Rs.get(t) ?? Vs(t);
}

function Ms(t) {
    return t[Ts] ?? t;
}

function Ds(t) {
    return Ps(t) && t[Ts] || t;
}

function Fs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Vs(t) {
    const e = o(t) ? Ks : t instanceof Map || t instanceof Set ? lr : Ns;
    const s = new Proxy(t, e);
    Rs.set(t, s);
    return s;
}

const Ns = {
    get(t, e, s) {
        if (e === Ts) return t;
        const r = Os();
        if (!ms || Fs(e) || null == r) return Ls(t, e, s);
        r.observe(t, e);
        return js(Ls(t, e, s));
    }
};

const Ks = {
    get(t, e, s) {
        if (e === Ts) return t;
        const r = Os();
        if (!ms || Fs(e) || null == r) return Ls(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return qs;

          case "includes":
            return _s;

          case "indexOf":
            return zs;

          case "lastIndexOf":
            return Ws;

          case "every":
            return Hs;

          case "filter":
            return Qs;

          case "find":
            return Zs;

          case "findIndex":
            return Gs;

          case "flat":
            return Js;

          case "flatMap":
            return Xs;

          case "join":
            return Ys;

          case "push":
            return er;

          case "pop":
            return tr;

          case "reduce":
            return hr;

          case "reduceRight":
            return ar;

          case "reverse":
            return nr;

          case "shift":
            return sr;

          case "unshift":
            return rr;

          case "slice":
            return ur;

          case "splice":
            return ir;

          case "some":
            return or;

          case "sort":
            return cr;

          case "keys":
            return xr;

          case "values":
          case Symbol.iterator:
            return Er;

          case "entries":
            return Ar;
        }
        r.observe(t, e);
        return js(Ls(t, e, s));
    },
    ownKeys(t) {
        Os()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function qs(t, e) {
    const s = Ms(this);
    const r = s.map(((s, r) => Ds(t.call(e, js(s), r, this))));
    Os()?.observeCollection(s);
    return js(r);
}

function Hs(t, e) {
    const s = Ms(this);
    const r = s.every(((s, r) => t.call(e, js(s), r, this)));
    Os()?.observeCollection(s);
    return r;
}

function Qs(t, e) {
    const s = Ms(this);
    const r = s.filter(((s, r) => Ds(t.call(e, js(s), r, this))));
    Os()?.observeCollection(s);
    return js(r);
}

function _s(t) {
    const e = Ms(this);
    const s = e.includes(Ds(t));
    Os()?.observeCollection(e);
    return s;
}

function zs(t) {
    const e = Ms(this);
    const s = e.indexOf(Ds(t));
    Os()?.observeCollection(e);
    return s;
}

function Ws(t) {
    const e = Ms(this);
    const s = e.lastIndexOf(Ds(t));
    Os()?.observeCollection(e);
    return s;
}

function Gs(t, e) {
    const s = Ms(this);
    const r = s.findIndex(((s, r) => Ds(t.call(e, js(s), r, this))));
    Os()?.observeCollection(s);
    return r;
}

function Zs(t, e) {
    const s = Ms(this);
    const r = s.find(((e, s) => t(js(e), s, this)), e);
    Os()?.observeCollection(s);
    return js(r);
}

function Js() {
    const t = Ms(this);
    Os()?.observeCollection(t);
    return js(t.flat());
}

function Xs(t, e) {
    const s = Ms(this);
    Os()?.observeCollection(s);
    return Is(s.flatMap(((s, r) => js(t.call(e, js(s), r, this)))));
}

function Ys(t) {
    const e = Ms(this);
    Os()?.observeCollection(e);
    return e.join(t);
}

function tr() {
    return js(Ms(this).pop());
}

function er(...t) {
    return Ms(this).push(...t);
}

function sr() {
    return js(Ms(this).shift());
}

function rr(...t) {
    return Ms(this).unshift(...t);
}

function ir(...t) {
    return js(Ms(this).splice(...t));
}

function nr(...t) {
    const e = Ms(this);
    const s = e.reverse();
    Os()?.observeCollection(e);
    return js(s);
}

function or(t, e) {
    const s = Ms(this);
    const r = s.some(((s, r) => Ds(t.call(e, js(s), r, this))));
    Os()?.observeCollection(s);
    return r;
}

function cr(t) {
    const e = Ms(this);
    const s = e.sort(t);
    Os()?.observeCollection(e);
    return js(s);
}

function ur(t, e) {
    const s = Ms(this);
    Os()?.observeCollection(s);
    return Is(s.slice(t, e));
}

function hr(t, e) {
    const s = Ms(this);
    const r = s.reduce(((e, s, r) => t(e, js(s), r, this)), e);
    Os()?.observeCollection(s);
    return js(r);
}

function ar(t, e) {
    const s = Ms(this);
    const r = s.reduceRight(((e, s, r) => t(e, js(s), r, this)), e);
    Os()?.observeCollection(s);
    return js(r);
}

const lr = {
    get(t, e, s) {
        if (e === Ts) return t;
        const r = Os();
        if (!ms || Fs(e) || null == r) return Ls(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return gr;

          case "delete":
            return vr;

          case "forEach":
            return fr;

          case "add":
            if (t instanceof Set) return br;
            break;

          case "get":
            if (t instanceof Map) return dr;
            break;

          case "set":
            if (t instanceof Map) return wr;
            break;

          case "has":
            return pr;

          case "keys":
            return xr;

          case "values":
            return Er;

          case "entries":
            return Ar;

          case Symbol.iterator:
            return t instanceof Map ? Ar : Er;
        }
        return js(Ls(t, e, s));
    }
};

function fr(t, e) {
    const s = Ms(this);
    Os()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, js(s), js(r), this);
    }));
}

function pr(t) {
    const e = Ms(this);
    Os()?.observeCollection(e);
    return e.has(Ds(t));
}

function dr(t) {
    const e = Ms(this);
    Os()?.observeCollection(e);
    return js(e.get(Ds(t)));
}

function wr(t, e) {
    return js(Ms(this).set(Ds(t), Ds(e)));
}

function br(t) {
    return js(Ms(this).add(Ds(t)));
}

function gr() {
    return js(Ms(this).clear());
}

function vr(t) {
    return js(Ms(this).delete(Ds(t)));
}

function xr() {
    const t = Ms(this);
    Os()?.observeCollection(t);
    const e = t.keys();
    return {
        next() {
            const t = e.next();
            const s = t.value;
            const r = t.done;
            return r ? {
                value: void 0,
                done: r
            } : {
                value: js(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Er() {
    const t = Ms(this);
    Os()?.observeCollection(t);
    const e = t.values();
    return {
        next() {
            const t = e.next();
            const s = t.value;
            const r = t.done;
            return r ? {
                value: void 0,
                done: r
            } : {
                value: js(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Ar() {
    const t = Ms(this);
    Os()?.observeCollection(t);
    const e = t.entries();
    return {
        next() {
            const t = e.next();
            const s = t.value;
            const r = t.done;
            return r ? {
                value: void 0,
                done: r
            } : {
                value: [ js(s[0]), js(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Ur = Object.freeze({
    getProxy: Is,
    getRaw: Ms,
    wrap: js,
    unwrap: Ds,
    rawKey: Ts
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
        this.$get = e;
        this.$set = s;
        this.up = r;
        this.oL = i;
    }
    static create(t, e, s, i, n) {
        const o = s.get;
        const c = s.set;
        const u = new ComputedObserver(t, o, c, n, i);
        const h = () => u.getValue();
        h.getObserver = () => u;
        r(t, e, {
            enumerable: s.enumerable,
            configurable: true,
            get: h,
            set: t => {
                u.setValue(t);
            }
        });
        return u;
    }
    getValue() {
        if (0 === this.subs.count) return this.$get.call(this.o, this);
        if (this.D) {
            this.compute();
            this.D = false;
        }
        return this.v;
    }
    setValue(t) {
        if (i(this.$set)) {
            if (t !== this.v) {
                this.ir = true;
                this.$set.call(this.o, t);
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
        mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, mr);
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
            ks(this);
            return this.v = Ds(this.$get.call(this.up ? js(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Cs(this);
        }
    }
}

Gt(ComputedObserver);

R(ComputedObserver);

M(ComputedObserver);

let mr;

const yr = t.DI.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Sr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Or = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Sr.disabled) return;
            if (++this.C < Sr.timeoutsPerCheck) return;
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
        if (Sr.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Or);
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

M(DirtyChecker);

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
    setValue(t) {
        throw new Error(`Trying to set value for property ${this.key} in dirty checker`);
    }
    isDirty() {
        return this.ov !== this.obj[this.key];
    }
    flush() {
        const t = this.ov;
        const e = this.getValue();
        this.ov = e;
        this.subs.notify(e, t);
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

R(DirtyCheckProperty);

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
    setValue(t, e, s) {
        e[s] = t;
    }
}

let kr;

class SetterObserver {
    constructor(t, e) {
        this.type = 1;
        this.v = void 0;
        this.ov = void 0;
        this.iO = false;
        this.o = t;
        this.k = e;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (this.iO) {
            if (Object.is(t, this.v)) return;
            this.ov = this.v;
            this.v = t;
            this.queue.add(this);
        } else this.o[this.k] = t;
    }
    subscribe(t) {
        if (false === this.iO) this.start();
        this.subs.add(t);
    }
    flush() {
        kr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, kr);
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
                    this.setValue(t);
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
    setValue(t) {
        if (this.hs) t = this.S(t, null);
        if (!Object.is(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.cb?.call(this.o, this.v, this.ov);
            this.queue.add(this);
        }
    }
    flush() {
        kr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, kr);
    }
}

R(SetterObserver);

R(SetterNotifier);

M(SetterObserver);

M(SetterNotifier);

const Cr = new PropertyAccessor;

const $r = t.DI.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Lr = t.DI.createInterface("INodeObserverLocator", (e => e.cachedCallback((e => {
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
        return Cr;
    }
    getAccessor() {
        return Cr;
    }
}

class ObserverLocator {
    constructor(t, e) {
        this.L = [];
        this.$ = t;
        this.B = e;
    }
    addAdapter(t) {
        this.L.push(t);
    }
    getObserver(t, e) {
        return t.$observers?.[e] ?? this.R(t, e, this.createObserver(t, e));
    }
    getAccessor(t, e) {
        const s = t.$observers?.[e];
        if (void 0 !== s) return s;
        if (this.B.handles(t, e, this)) return this.B.getAccessor(t, e, this);
        return Cr;
    }
    getArrayObserver(t) {
        return at(t);
    }
    getMapObserver(t) {
        return Ft(t);
    }
    getSetObserver(t) {
        return Ot(t);
    }
    createObserver(e, r) {
        if (!(e instanceof Object)) return new PrimitiveObserver(e, r);
        if (this.B.handles(e, r, this)) return this.B.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (o(e)) return at(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Ft(e).getLengthObserver(); else if (e instanceof Set) return Ot(e).getLengthObserver();
            break;

          default:
            if (o(e) && t.isArrayIndex(r)) return at(e).getIndexObserver(Number(r));
            break;
        }
        let i = Pr(e, r);
        if (void 0 === i) {
            let t = Rr(e);
            while (null !== t) {
                i = Pr(t, r);
                if (void 0 === i) t = Rr(t); else break;
            }
        }
        if (void 0 !== i && !s.call(i, "value")) {
            let t = this.P(e, r, i);
            if (null == t) t = (i.get?.getObserver ?? i.set?.getObserver)?.(e, this);
            return null == t ? i.configurable ? ComputedObserver.create(e, r, i, this, true) : this.$.createProperty(e, r) : t;
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

ObserverLocator.inject = [ yr, Lr ];

function Br(t) {
    let e;
    if (o(t)) e = at(t); else if (t instanceof Map) e = Ft(t); else if (t instanceof Set) e = Ot(t);
    return e;
}

const Rr = Object.getPrototypeOf;

const Pr = Object.getOwnPropertyDescriptor;

const Tr = t.DI.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ $r ];
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
            ks(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Cs(this);
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

Gt(Effect);

function jr(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Ir = {};

function Mr(t, e, s) {
    if (null == e) return (e, s, r) => i(e, s, r, t);
    return i(t, e, s);
    function i(t, e, s, i) {
        const n = void 0 === e;
        i = "object" !== typeof i ? {
            name: i
        } : i || {};
        if (n) e = i.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const o = i.callback || `${String(e)}Changed`;
        let c = Ir;
        if (s) {
            delete s.value;
            delete s.writable;
            c = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const u = i.set;
        s.get = function t() {
            const s = Dr(this, e, o, c, u);
            Os()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Dr(this, e, o, c, u).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Dr(s, e, o, c, u);
        };
        if (n) r(t.prototype, e, s); else return s;
    }
}

function Dr(t, e, s, r, i) {
    const n = jr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Ir ? void 0 : r);
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

exports.BindingBehaviorExpression = BindingBehaviorExpression;

exports.BindingContext = BindingContext;

exports.BindingIdentifier = BindingIdentifier;

exports.BindingObserverRecord = BindingObserverRecord;

exports.CallFunctionExpression = CallFunctionExpression;

exports.CallMemberExpression = CallMemberExpression;

exports.CallScopeExpression = CallScopeExpression;

exports.CollectionLengthObserver = CollectionLengthObserver;

exports.CollectionSizeObserver = CollectionSizeObserver;

exports.ComputedObserver = ComputedObserver;

exports.ConditionalExpression = ConditionalExpression;

exports.ConnectableSwitcher = $s;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = Sr;

exports.FlushQueue = FlushQueue;

exports.ForOfStatement = ForOfStatement;

exports.HtmlLiteralExpression = HtmlLiteralExpression;

exports.ICoercionConfiguration = A;

exports.IDirtyChecker = yr;

exports.IExpressionParser = Zt;

exports.INodeObserverLocator = Lr;

exports.IObservation = Tr;

exports.IObserverLocator = $r;

exports.ISignaler = a;

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

exports.ProxyObservable = Ur;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = ft;

exports.batch = $;

exports.cloneIndexMap = S;

exports.connectable = Gt;

exports.copyIndexMap = m;

exports.createIndexMap = y;

exports.disableArrayObservation = ht;

exports.disableMapObservation = Dt;

exports.disableSetObservation = St;

exports.enableArrayObservation = ut;

exports.enableMapObservation = Mt;

exports.enableSetObservation = yt;

exports.getCollectionObserver = Br;

exports.isIndexMap = O;

exports.observable = Mr;

exports.parseExpression = ge;

exports.subscriberCollection = R;

exports.synchronizeIndices = pt;

exports.withFlushQueue = M;
//# sourceMappingURL=index.cjs.map
