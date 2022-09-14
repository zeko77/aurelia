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
    bind(t, e, s) {
        if (this.expression.hasBind) this.expression.bind(t, e, s);
        const r = this.name;
        const i = this.k;
        const n = s.getBehavior?.(r);
        if (null == n) throw new Error(`AUR0101:${r}`);
        if (void 0 === s[i]) {
            s[i] = n;
            n.bind?.(t, e, s, ...this.args.map((t => t.evaluate(e, s, null))));
        } else throw new Error(`AUR0102:${r}`);
    }
    unbind(t, e, s) {
        const r = this.k;
        const i = s;
        if (void 0 !== i[r]) {
            i[r].unbind?.(t, e, s);
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
    evaluate(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw new Error(`AUR0103:${r}`);
        if (null !== s && "handleChange" in s) {
            const t = i.signals;
            if (null != t) {
                const r = e?.get?.(a);
                const i = t.length;
                let n = 0;
                for (;n < i; ++n) r?.addSignalListener(t[n], s);
            }
        }
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s), ...this.args.map((r => r.evaluate(t, e, s))));
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw new Error(`AUR0104:${r}`);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, null))));
        return this.expression.assign(t, e, s);
    }
    unbind(t, e, s) {
        const r = s.getConverter?.(this.name);
        if (void 0 === r?.signals) return;
        const i = s.get(a);
        let n = 0;
        for (;n < r.signals.length; ++n) i.removeSignalListener(r.signals[n], s);
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
            r.$observers[this.name].setValue(s, 0);
            return s;
        } else return r[this.name] = s;
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
        if (r instanceof Object) if (void 0 !== r.$observers && void 0 !== r.$observers[this.name]) r.$observers[this.name].setValue(s, 0); else r[this.name] = s; else this.object.assign(t, e, {
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
        const n = p(e?.strictFnCall, i, this.name);
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

const l = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some".split(" ");

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
        const n = p(e?.strictFnCall, r, this.name);
        if (n) {
            if (o(r) && l.includes(this.name)) s?.observeCollection(r);
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

const f = Object.prototype.toString;

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
        switch (f.call(e)) {
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
            throw new Error(`Cannot count ${f.call(e)}`);
        }
    }
    iterate(t, e, s) {
        switch (f.call(e)) {
          case "[object Array]":
            return d(e, s);

          case "[object Map]":
            return w(e, s);

          case "[object Set]":
            return b(e, s);

          case "[object Number]":
            return g(e, s);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${f.call(e)}`);
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

function p(t, e, s) {
    const r = null == e ? null : e[s];
    if (i(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function d(t, e) {
    for (let s = 0, r = t.length; s < r; ++s) e(t, s, t[s]);
}

function w(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.entries()) s[++r] = e;
    d(s, e);
}

function b(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.keys()) s[++r] = e;
    d(s, e);
}

function g(t, e) {
    const s = Array(t);
    for (let e = 0; e < t; ++e) s[e] = e;
    d(s, e);
}

const v = t.DI.createInterface("ICoercionConfiguration");

exports.LifecycleFlags = void 0;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["persistentBindingFlags"] = 33] = "persistentBindingFlags";
    t[t["noFlush"] = 32] = "noFlush";
    t[t["bindingStrategy"] = 1] = "bindingStrategy";
    t[t["isStrictBindingStrategy"] = 1] = "isStrictBindingStrategy";
    t[t["fromBind"] = 2] = "fromBind";
    t[t["fromUnbind"] = 4] = "fromUnbind";
    t[t["mustEvaluate"] = 8] = "mustEvaluate";
    t[t["dispose"] = 16] = "dispose";
})(exports.LifecycleFlags || (exports.LifecycleFlags = {}));

var x;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(x || (x = {}));

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

function E(t, e) {
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

function A(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function U(t) {
    const e = t.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function m(t) {
    return o(t) && true === t.isIndexMap;
}

function y(t) {
    return null == t ? S : S(t);
}

function S(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: O
    });
    u(e, "subscribe", k);
    u(e, "unsubscribe", C);
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

function O() {
    return c(this, "subs", new SubscriberRecord);
}

function k(t) {
    return this.subs.add(t);
}

function C(t) {
    return this.subs.remove(t);
}

function $(t) {
    return null == t ? L : L(t);
}

function L(t) {
    const e = t.prototype;
    r(e, "queue", {
        get: B
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
            this.i.forEach(R);
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

function B() {
    return FlushQueue.instance;
}

function R(t, e, s) {
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
            if (0 === (32 & s)) this.o.length = e;
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
        I = this.u;
        this.u = this.v;
        this.subs.notify(this.v, I, this.f);
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
        I = this.u;
        this.u = this.v;
        this.subs.notify(this.v, I, this.f);
    }
}

function P(t) {
    const e = t.prototype;
    u(e, "subscribe", T);
    u(e, "unsubscribe", j);
    $(t);
    y(t);
}

function T(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function j(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

P(CollectionLengthObserver);

P(CollectionSizeObserver);

let I;

const M = new WeakMap;

function D(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function F(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function V(t, e, s, r, i) {
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

function N(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let p, d, w;
    let b, g;
    let v, x, E, A;
    let U, m, y, S;
    while (true) {
        if (r - s <= 10) {
            V(t, e, s, r, i);
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
            N(t, e, A, r, i);
            r = E;
        } else {
            N(t, e, s, E, i);
            s = A;
        }
    }
}

const K = Array.prototype;

const q = K.push;

const H = K.unshift;

const Q = K.pop;

const _ = K.shift;

const z = K.splice;

const W = K.reverse;

const G = K.sort;

const Z = {
    push: q,
    unshift: H,
    pop: Q,
    shift: _,
    splice: z,
    reverse: W,
    sort: G
};

const J = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const X = {
    push: function(...t) {
        const e = M.get(this);
        if (void 0 === e) return q.apply(this, t);
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
        const e = M.get(this);
        if (void 0 === e) return H.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        H.apply(e.indexMap, r);
        const n = H.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = M.get(this);
        if (void 0 === t) return Q.call(this);
        const e = t.indexMap;
        const s = Q.call(this);
        const r = e.length - 1;
        if (e[r] > -1) e.deletedItems.push(e[r]);
        Q.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = M.get(this);
        if (void 0 === t) return _.call(this);
        const e = t.indexMap;
        const s = _.call(this);
        if (e[0] > -1) e.deletedItems.push(e[0]);
        _.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = M.get(this);
        if (void 0 === r) return z.apply(this, t);
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
            z.call(c, e, s, ...r);
        } else z.apply(c, t);
        const a = z.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = M.get(this);
        if (void 0 === t) {
            W.call(this);
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
        const e = M.get(this);
        if (void 0 === e) {
            G.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        N(this, e.indexMap, 0, s, F);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !i(t)) t = D;
        N(this, e.indexMap, 0, r, t);
        let n = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            n = true;
            break;
        }
        if (n) e.notify();
        return this;
    }
};

for (const t of J) r(X[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Y = false;

function tt() {
    for (const t of J) if (true !== K[t].observing) c(K, t, X[t]);
}

function et() {
    for (const t of J) if (true === K[t].observing) c(K, t, Z[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!Y) {
            Y = true;
            tt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = A(t.length);
        this.lenObs = void 0;
        M.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.length;
        this.indexMap = A(e);
        this.subs.notifyCollection(t, 0);
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

y(ArrayObserver);

y(ArrayIndexObserver);

function st(t) {
    let e = M.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

function rt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = U(t);
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

function it(t, e) {
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

const nt = new WeakMap;

const ot = Set.prototype;

const ct = ot.add;

const ut = ot.clear;

const ht = ot.delete;

const at = {
    add: ct,
    clear: ut,
    delete: ht
};

const lt = [ "add", "clear", "delete" ];

const ft = {
    add: function(t) {
        const e = nt.get(this);
        if (void 0 === e) {
            ct.call(this, t);
            return this;
        }
        const s = this.size;
        ct.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = nt.get(this);
        if (void 0 === t) return ut.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            ut.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = nt.get(this);
        if (void 0 === e) return ht.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = ht.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            r++;
        }
        return false;
    }
};

const pt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of lt) r(ft[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let dt = false;

function wt() {
    for (const t of lt) if (true !== ot[t].observing) r(ot, t, {
        ...pt,
        value: ft[t]
    });
}

function bt() {
    for (const t of lt) if (true === ot[t].observing) r(ot, t, {
        ...pt,
        value: at[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!dt) {
            dt = true;
            wt();
        }
        this.collection = t;
        this.indexMap = A(t.size);
        this.lenObs = void 0;
        nt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = A(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

y(SetObserver);

function gt(t) {
    let e = nt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const vt = new WeakMap;

const xt = Map.prototype;

const Et = xt.set;

const At = xt.clear;

const Ut = xt.delete;

const mt = {
    set: Et,
    clear: At,
    delete: Ut
};

const yt = [ "set", "clear", "delete" ];

const St = {
    set: function(t, e) {
        const s = vt.get(this);
        if (void 0 === s) {
            Et.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Et.call(this, t, e);
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
        const t = vt.get(this);
        if (void 0 === t) return At.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            At.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = vt.get(this);
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
            ++r;
        }
        return false;
    }
};

const Ot = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of yt) r(St[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let kt = false;

function Ct() {
    for (const t of yt) if (true !== xt[t].observing) r(xt, t, {
        ...Ot,
        value: St[t]
    });
}

function $t() {
    for (const t of yt) if (true === xt[t].observing) r(xt, t, {
        ...Ot,
        value: mt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!kt) {
            kt = true;
            Ct();
        }
        this.collection = t;
        this.indexMap = A(t.size);
        this.lenObs = void 0;
        vt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = A(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

y(MapObserver);

function Lt(t) {
    let e = vt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Bt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Rt() {
    return c(this, "obs", new BindingObserverRecord(this));
}

function Pt(t) {
    let e;
    if (o(t)) e = st(t); else if (t instanceof Set) e = gt(t); else if (t instanceof Map) e = Lt(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function Tt(t) {
    this.obs.add(t);
}

function jt() {
    throw new Error(`AUR2011:handleChange`);
}

function It() {
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
        this.o.forEach(Dt, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(Mt, this);
        this.o.clear();
        this.count = 0;
    }
}

function Mt(t, e) {
    e.unsubscribe(this);
}

function Dt(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function Ft(t) {
    const e = t.prototype;
    u(e, "observe", Bt);
    u(e, "observeCollection", Pt);
    u(e, "subscribeTo", Tt);
    r(e, "obs", {
        get: Rt
    });
    u(e, "handleChange", jt);
    u(e, "handleCollectionChange", It);
    return t;
}

function Vt(t) {
    return null == t ? Ft : Ft(t);
}

const Nt = t.DI.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

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
                throw De();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        Jt = t;
        Xt = 0;
        Yt = t.length;
        te = 0;
        ee = 0;
        se = 6291456;
        re = "";
        ie = t.charCodeAt(0);
        ne = true;
        oe = false;
        return he(61, void 0 === e ? 8 : e);
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

function Kt(t) {
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

var qt;

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
})(qt || (qt = {}));

var Ht;

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
})(Ht || (Ht = {}));

const Qt = PrimitiveLiteralExpression.$false;

const _t = PrimitiveLiteralExpression.$true;

const zt = PrimitiveLiteralExpression.$null;

const Wt = PrimitiveLiteralExpression.$undefined;

const Gt = AccessThisExpression.$this;

const Zt = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let Jt = "";

let Xt = 0;

let Yt = 0;

let te = 0;

let ee = 0;

let se = 6291456;

let re = "";

let ie;

let ne = true;

let oe = false;

function ce() {
    return Jt.slice(ee, Xt);
}

function ue(t, e) {
    Jt = t;
    Xt = 0;
    Yt = t.length;
    te = 0;
    ee = 0;
    se = 6291456;
    re = "";
    ie = t.charCodeAt(0);
    ne = true;
    oe = false;
    return he(61, void 0 === e ? 8 : e);
}

function he(t, e) {
    if (16 === e) return new CustomExpression(Jt);
    if (0 === Xt) {
        if (1 & e) return Ee();
        me();
        if (4194304 & se) throw Re();
    }
    ne = 513 > t;
    oe = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & se) {
        const t = is[63 & se];
        me();
        r = new UnaryExpression(t, he(514, e));
        ne = false;
    } else {
        t: switch (se) {
          case 12294:
            i = te;
            ne = false;
            do {
                me();
                ++i;
                switch (se) {
                  case 65545:
                    me();
                    if (0 === (12288 & se)) throw Te();
                    break;

                  case 10:
                  case 11:
                    throw Te();

                  case 2162700:
                    oe = true;
                    me();
                    if (0 === (12288 & se)) {
                        r = 0 === i ? Gt : 1 === i ? Zt : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & se) {
                        r = 0 === i ? Gt : 1 === i ? Zt : new AccessThisExpression(i);
                        break t;
                    }
                    throw je();
                }
            } while (12294 === se);

          case 4096:
            {
                const t = re;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                ne = !oe;
                me();
                if (Le(49)) {
                    if (524296 === se) throw ss();
                    const e = oe;
                    const s = te;
                    ++te;
                    const i = he(62, 0);
                    oe = e;
                    te = s;
                    ne = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw rs();

          case 11:
            throw Pe();

          case 12292:
            ne = false;
            me();
            switch (te) {
              case 0:
                r = Gt;
                break;

              case 1:
                r = Zt;
                break;

              default:
                r = new AccessThisExpression(te);
                break;
            }
            break;

          case 2688007:
            r = be(e);
            break;

          case 2688016:
            r = Jt.search(/\s+of\s+/) > Xt ? ae() : ge(e);
            break;

          case 524296:
            r = xe(e);
            break;

          case 2163758:
            r = new TemplateExpression([ re ]);
            ne = false;
            me();
            break;

          case 2163759:
            r = Ae(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(re);
            ne = false;
            me();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = is[63 & se];
            ne = false;
            me();
            break;

          default:
            if (Xt >= Yt) throw Ie(); else throw Me();
        }
        if (2 & e) return ve(r);
        if (514 < t) return r;
        if (10 === se || 11 === se) throw Te();
        if (1793 === r.$kind) switch (se) {
          case 2162700:
            oe = true;
            ne = false;
            me();
            if (0 === (13312 & se)) throw Ze();
            if (12288 & se) {
                r = new AccessScopeExpression(re, r.ancestor);
                me();
            } else if (2688007 === se) r = new CallFunctionExpression(r, le(), true); else if (2688016 === se) r = fe(r, true); else throw Je();
            break;

          case 65545:
            ne = !oe;
            me();
            if (0 === (12288 & se)) throw Te();
            r = new AccessScopeExpression(re, r.ancestor);
            me();
            break;

          case 10:
          case 11:
            throw Te();

          case 2688007:
            r = new CallFunctionExpression(r, le(), s);
            break;

          case 2688016:
            r = fe(r, s);
            break;

          case 2163758:
            r = Ue(r);
            break;

          case 2163759:
            r = Ae(e, r, true);
            break;
        }
        while ((65536 & se) > 0) switch (se) {
          case 2162700:
            r = pe(r);
            break;

          case 65545:
            me();
            if (0 === (12288 & se)) throw Te();
            r = de(r, false);
            break;

          case 10:
          case 11:
            throw Te();

          case 2688007:
            if (10082 === r.$kind) r = new CallScopeExpression(r.name, le(), r.ancestor, false); else if (9323 === r.$kind) r = new CallMemberExpression(r.object, r.name, le(), r.optional, false); else r = new CallFunctionExpression(r, le(), false);
            break;

          case 2688016:
            r = fe(r, false);
            break;

          case 2163758:
            if (oe) throw Je();
            r = Ue(r);
            break;

          case 2163759:
            if (oe) throw Je();
            r = Ae(e, r, true);
            break;
        }
    }
    if (10 === se || 11 === se) throw Te();
    if (513 < t) return r;
    while ((262144 & se) > 0) {
        const s = se;
        if ((960 & s) <= t) break;
        me();
        r = new BinaryExpression(is[63 & s], r, he(960 & s, e));
        ne = false;
    }
    if (63 < t) return r;
    if (Le(6291477)) {
        const t = he(62, e);
        Be(6291476);
        r = new ConditionalExpression(r, t, he(62, e));
        ne = false;
    }
    if (62 < t) return r;
    if (Le(4194348)) {
        if (!ne) throw Fe();
        r = new AssignExpression(r, he(62, e));
    }
    if (61 < t) return r;
    while (Le(6291479)) {
        if (6291456 === se) throw Ve();
        const t = re;
        me();
        const s = new Array;
        while (Le(6291476)) s.push(he(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Le(6291478)) {
        if (6291456 === se) throw Ne();
        const t = re;
        me();
        const s = new Array;
        while (Le(6291476)) s.push(he(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== se) {
        if ((1 & e) > 0 && 7340045 === se) return r;
        if ("of" === ce()) throw Ke();
        throw Me();
    }
    return r;
}

function ae() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        me();
        switch (se) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = ce();
            break;

          default:
            throw Ge();
        }
    }
    Be(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(Gt, s), new AccessKeyedExpression(Gt, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function le() {
    const t = oe;
    me();
    const e = [];
    while (7340046 !== se) {
        e.push(he(62, 0));
        if (!Le(6291471)) break;
    }
    Be(7340046);
    ne = false;
    oe = t;
    return e;
}

function fe(t, e) {
    const s = oe;
    me();
    t = new AccessKeyedExpression(t, he(62, 0), e);
    Be(7340051);
    ne = !s;
    oe = s;
    return t;
}

function pe(t) {
    oe = true;
    ne = false;
    me();
    if (0 === (13312 & se)) throw Ze();
    if (12288 & se) return de(t, true);
    if (2688007 === se) if (10082 === t.$kind) return new CallScopeExpression(t.name, le(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, le(), t.optional, true); else return new CallFunctionExpression(t, le(), true);
    if (2688016 === se) return fe(t, true);
    throw Je();
}

function de(t, e) {
    const s = re;
    switch (se) {
      case 2162700:
        {
            oe = true;
            ne = false;
            const r = Xt;
            const i = ee;
            const n = se;
            const o = ie;
            const c = re;
            const u = ne;
            const h = oe;
            me();
            if (0 === (13312 & se)) throw Ze();
            if (2688007 === se) return new CallMemberExpression(t, s, le(), e, true);
            Xt = r;
            ee = i;
            se = n;
            ie = o;
            re = c;
            ne = u;
            oe = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        ne = false;
        return new CallMemberExpression(t, s, le(), e, false);

      default:
        ne = !oe;
        me();
        return new AccessMemberExpression(t, s, e);
    }
}

var we;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(we || (we = {}));

function be(t) {
    me();
    const e = Xt;
    const s = ee;
    const r = se;
    const i = ie;
    const n = re;
    const o = ne;
    const c = oe;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === se) {
            me();
            if (4096 !== se) throw Te();
            u.push(new BindingIdentifier(re));
            me();
            if (6291471 === se) throw es();
            if (7340046 !== se) throw Pe();
            me();
            if (49 !== se) throw Pe();
            me();
            const t = oe;
            const e = te;
            ++te;
            const s = he(62, 0);
            oe = t;
            te = e;
            ne = false;
            return new ArrowFunction(u, s, true);
        }
        switch (se) {
          case 4096:
            u.push(new BindingIdentifier(re));
            me();
            break;

          case 7340046:
            me();
            break t;

          case 524296:
          case 2688016:
            me();
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
            me();
            h = 2;
            break;
        }
        switch (se) {
          case 6291471:
            me();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            me();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw Xe();
            me();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === se) {
        if (1 === h) {
            me();
            if (524296 === se) throw ss();
            const t = oe;
            const e = te;
            ++te;
            const s = he(62, 0);
            oe = t;
            te = e;
            ne = false;
            return new ArrowFunction(u, s);
        }
        throw Xe();
    } else if (1 === h && 0 === u.length) throw ze(49);
    if (a) switch (h) {
      case 2:
        throw Xe();

      case 3:
        throw Ye();

      case 4:
        throw ts();
    }
    Xt = e;
    ee = s;
    se = r;
    ie = i;
    re = n;
    ne = o;
    oe = c;
    const l = oe;
    const f = he(62, t);
    oe = l;
    Be(7340046);
    if (49 === se) switch (h) {
      case 2:
        throw Xe();

      case 3:
        throw Ye();

      case 4:
        throw ts();
    }
    return f;
}

function ge(t) {
    const e = oe;
    me();
    const s = new Array;
    while (7340051 !== se) if (Le(6291471)) {
        s.push(Wt);
        if (7340051 === se) break;
    } else {
        s.push(he(62, ~2 & t));
        if (Le(6291471)) {
            if (7340051 === se) break;
        } else break;
    }
    oe = e;
    Be(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        ne = false;
        return new ArrayLiteralExpression(s);
    }
}

function ve(t) {
    if (0 === (65536 & t.$kind)) throw qe();
    if (4204592 !== se) throw qe();
    me();
    const e = t;
    const s = he(61, 0);
    return new ForOfStatement(e, s);
}

function xe(t) {
    const e = oe;
    const s = new Array;
    const r = new Array;
    me();
    while (7340045 !== se) {
        s.push(re);
        if (49152 & se) {
            me();
            Be(6291476);
            r.push(he(62, ~2 & t));
        } else if (12288 & se) {
            const e = ie;
            const s = se;
            const i = Xt;
            me();
            if (Le(6291476)) r.push(he(62, ~2 & t)); else {
                ie = e;
                se = s;
                Xt = i;
                r.push(he(515, ~2 & t));
            }
        } else throw He();
        if (7340045 !== se) Be(6291471);
    }
    oe = e;
    Be(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        ne = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function Ee() {
    const t = [];
    const e = [];
    const s = Yt;
    let r = "";
    while (Xt < s) {
        switch (ie) {
          case 36:
            if (123 === Jt.charCodeAt(Xt + 1)) {
                t.push(r);
                r = "";
                Xt += 2;
                ie = Jt.charCodeAt(Xt);
                me();
                const s = he(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(Kt(ye()));
            break;

          default:
            r += String.fromCharCode(ie);
        }
        ye();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ae(t, e, s) {
    const r = oe;
    const i = [ re ];
    Be(2163759);
    const n = [ he(62, t) ];
    while (2163758 !== (se = $e())) {
        i.push(re);
        Be(2163759);
        n.push(he(62, t));
    }
    i.push(re);
    ne = false;
    oe = r;
    if (s) {
        me();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        me();
        return new TemplateExpression(i, n);
    }
}

function Ue(t) {
    ne = false;
    const e = [ re ];
    me();
    return new TaggedTemplateExpression(e, e, t);
}

function me() {
    while (Xt < Yt) {
        ee = Xt;
        if (null != (se = ls[ie]())) return;
    }
    se = 6291456;
}

function ye() {
    return ie = Jt.charCodeAt(++Xt);
}

function Se() {
    while (as[ye()]) ;
    const t = ns[re = ce()];
    return void 0 === t ? 4096 : t;
}

function Oe(t) {
    let e = ie;
    if (false === t) {
        do {
            e = ye();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            re = parseInt(ce(), 10);
            return 32768;
        }
        e = ye();
        if (Xt >= Yt) {
            re = parseInt(ce().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = ye();
    } while (e <= 57 && e >= 48); else ie = Jt.charCodeAt(--Xt);
    re = parseFloat(ce());
    return 32768;
}

function ke() {
    const t = ie;
    ye();
    let e = 0;
    const s = new Array;
    let r = Xt;
    while (ie !== t) if (92 === ie) {
        s.push(Jt.slice(r, Xt));
        ye();
        e = Kt(ie);
        ye();
        s.push(String.fromCharCode(e));
        r = Xt;
    } else if (Xt >= Yt) throw Qe(); else ye();
    const i = Jt.slice(r, Xt);
    ye();
    s.push(i);
    const n = s.join("");
    re = n;
    return 16384;
}

function Ce() {
    let t = true;
    let e = "";
    while (96 !== ye()) if (36 === ie) if (Xt + 1 < Yt && 123 === Jt.charCodeAt(Xt + 1)) {
        Xt++;
        t = false;
        break;
    } else e += "$"; else if (92 === ie) e += String.fromCharCode(Kt(ye())); else {
        if (Xt >= Yt) throw _e();
        e += String.fromCharCode(ie);
    }
    ye();
    re = e;
    if (t) return 2163758;
    return 2163759;
}

function $e() {
    if (Xt >= Yt) throw _e();
    Xt--;
    return Ce();
}

function Le(t) {
    if (se === t) {
        me();
        return true;
    }
    return false;
}

function Be(t) {
    if (se === t) me(); else throw ze(t);
}

function Re() {
    return new Error(`AUR0151:${Jt}`);
}

function Pe() {
    return new Error(`AUR0152:${Jt}`);
}

function Te() {
    return new Error(`AUR0153:${Jt}`);
}

function je() {
    return new Error(`AUR0154:${Jt}`);
}

function Ie() {
    return new Error(`AUR0155:${Jt}`);
}

function Me() {
    return new Error(`AUR0156:${Jt}`);
}

function De() {
    return new Error(`AUR0157`);
}

function Fe() {
    return new Error(`AUR0158:${Jt}`);
}

function Ve() {
    return new Error(`AUR0159:${Jt}`);
}

function Ne() {
    return new Error(`AUR0160:${Jt}`);
}

function Ke() {
    return new Error(`AUR0161:${Jt}`);
}

function qe() {
    return new Error(`AUR0163:${Jt}`);
}

function He() {
    return new Error(`AUR0164:${Jt}`);
}

function Qe() {
    return new Error(`AUR0165:${Jt}`);
}

function _e() {
    return new Error(`AUR0166:${Jt}`);
}

function ze(t) {
    return new Error(`AUR0167:${Jt}<${is[63 & t]}`);
}

const We = () => {
    throw new Error(`AUR0168:${Jt}`);
};

We.notMapped = true;

function Ge() {
    return new Error(`AUR0170:${Jt}`);
}

function Ze() {
    return new Error(`AUR0171:${Jt}`);
}

function Je() {
    return new Error(`AUR0172:${Jt}`);
}

function Xe() {
    return new Error(`AUR0173:${Jt}`);
}

function Ye() {
    return new Error(`AUR0174:${Jt}`);
}

function ts() {
    return new Error(`AUR0175:${Jt}`);
}

function es() {
    return new Error(`AUR0176:${Jt}`);
}

function ss() {
    return new Error(`AUR0178:${Jt}`);
}

function rs() {
    return new Error(`AUR0179:${Jt}`);
}

const is = [ Qt, _t, zt, Wt, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const ns = Object.assign(Object.create(null), {
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

const os = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function cs(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function us(t) {
    return () => {
        ye();
        return t;
    };
}

const hs = new Set;

cs(null, hs, os.AsciiIdPart, true);

const as = new Uint8Array(65535);

cs(as, null, os.IdStart, 1);

cs(as, null, os.Digit, 1);

const ls = new Array(65535);

ls.fill(We, 0, 65535);

cs(ls, null, os.Skip, (() => {
    ye();
    return null;
}));

cs(ls, null, os.IdStart, Se);

cs(ls, null, os.Digit, (() => Oe(false)));

ls[34] = ls[39] = () => ke();

ls[96] = () => Ce();

ls[33] = () => {
    if (61 !== ye()) return 131117;
    if (61 !== ye()) return 6553948;
    ye();
    return 6553950;
};

ls[61] = () => {
    if (62 === ye()) {
        ye();
        return 49;
    }
    if (61 !== ie) return 4194348;
    if (61 !== ye()) return 6553947;
    ye();
    return 6553949;
};

ls[38] = () => {
    if (38 !== ye()) return 6291478;
    ye();
    return 6553882;
};

ls[124] = () => {
    if (124 !== ye()) return 6291479;
    ye();
    return 6553817;
};

ls[63] = () => {
    if (46 === ye()) {
        const t = Jt.charCodeAt(Xt + 1);
        if (t <= 48 || t >= 57) {
            ye();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== ie) return 6291477;
    ye();
    return 6553752;
};

ls[46] = () => {
    if (ye() <= 57 && ie >= 48) return Oe(true);
    if (46 === ie) {
        if (46 !== ye()) return 10;
        ye();
        return 11;
    }
    return 65545;
};

ls[60] = () => {
    if (61 !== ye()) return 6554015;
    ye();
    return 6554017;
};

ls[62] = () => {
    if (61 !== ye()) return 6554016;
    ye();
    return 6554018;
};

ls[37] = us(6554154);

ls[40] = us(2688007);

ls[41] = us(7340046);

ls[42] = us(6554153);

ls[43] = us(2490853);

ls[44] = us(6291471);

ls[45] = us(2490854);

ls[47] = us(6554155);

ls[58] = us(6291476);

ls[91] = us(2688016);

ls[93] = us(7340051);

ls[123] = us(524296);

ls[125] = us(7340045);

let fs = null;

const ps = [];

let ds = false;

function ws() {
    ds = false;
}

function bs() {
    ds = true;
}

function gs() {
    return fs;
}

function vs(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == fs) {
        fs = t;
        ps[0] = fs;
        ds = true;
        return;
    }
    if (fs === t) throw new Error(`AUR0207`);
    ps.push(t);
    fs = t;
    ds = true;
}

function xs(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (fs !== t) throw new Error(`AUR0209`);
    ps.pop();
    fs = ps.length > 0 ? ps[ps.length - 1] : null;
    ds = null != fs;
}

const Es = Object.freeze({
    get current() {
        return fs;
    },
    get connecting() {
        return ds;
    },
    enter: vs,
    exit: xs,
    pause: ws,
    resume: bs
});

const As = Reflect.get;

const Us = Object.prototype.toString;

const ms = new WeakMap;

function ys(t) {
    switch (Us.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Ss = "__raw__";

function Os(t) {
    return ys(t) ? ks(t) : t;
}

function ks(t) {
    return ms.get(t) ?? Bs(t);
}

function Cs(t) {
    return t[Ss] ?? t;
}

function $s(t) {
    return ys(t) && t[Ss] || t;
}

function Ls(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Bs(t) {
    const e = o(t) ? Ps : t instanceof Map || t instanceof Set ? sr : Rs;
    const s = new Proxy(t, e);
    ms.set(t, s);
    return s;
}

const Rs = {
    get(t, e, s) {
        if (e === Ss) return t;
        const r = gs();
        if (!ds || Ls(e) || null == r) return As(t, e, s);
        r.observe(t, e);
        return Os(As(t, e, s));
    }
};

const Ps = {
    get(t, e, s) {
        if (e === Ss) return t;
        const r = gs();
        if (!ds || Ls(e) || null == r) return As(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Ts;

          case "includes":
            return Ms;

          case "indexOf":
            return Ds;

          case "lastIndexOf":
            return Fs;

          case "every":
            return js;

          case "filter":
            return Is;

          case "find":
            return Ns;

          case "findIndex":
            return Vs;

          case "flat":
            return Ks;

          case "flatMap":
            return qs;

          case "join":
            return Hs;

          case "push":
            return _s;

          case "pop":
            return Qs;

          case "reduce":
            return tr;

          case "reduceRight":
            return er;

          case "reverse":
            return Zs;

          case "shift":
            return zs;

          case "unshift":
            return Ws;

          case "slice":
            return Ys;

          case "splice":
            return Gs;

          case "some":
            return Js;

          case "sort":
            return Xs;

          case "keys":
            return ar;

          case "values":
          case Symbol.iterator:
            return lr;

          case "entries":
            return fr;
        }
        r.observe(t, e);
        return Os(As(t, e, s));
    },
    ownKeys(t) {
        gs()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Ts(t, e) {
    const s = Cs(this);
    const r = s.map(((s, r) => $s(t.call(e, Os(s), r, this))));
    gs()?.observeCollection(s);
    return Os(r);
}

function js(t, e) {
    const s = Cs(this);
    const r = s.every(((s, r) => t.call(e, Os(s), r, this)));
    gs()?.observeCollection(s);
    return r;
}

function Is(t, e) {
    const s = Cs(this);
    const r = s.filter(((s, r) => $s(t.call(e, Os(s), r, this))));
    gs()?.observeCollection(s);
    return Os(r);
}

function Ms(t) {
    const e = Cs(this);
    const s = e.includes($s(t));
    gs()?.observeCollection(e);
    return s;
}

function Ds(t) {
    const e = Cs(this);
    const s = e.indexOf($s(t));
    gs()?.observeCollection(e);
    return s;
}

function Fs(t) {
    const e = Cs(this);
    const s = e.lastIndexOf($s(t));
    gs()?.observeCollection(e);
    return s;
}

function Vs(t, e) {
    const s = Cs(this);
    const r = s.findIndex(((s, r) => $s(t.call(e, Os(s), r, this))));
    gs()?.observeCollection(s);
    return r;
}

function Ns(t, e) {
    const s = Cs(this);
    const r = s.find(((e, s) => t(Os(e), s, this)), e);
    gs()?.observeCollection(s);
    return Os(r);
}

function Ks() {
    const t = Cs(this);
    gs()?.observeCollection(t);
    return Os(t.flat());
}

function qs(t, e) {
    const s = Cs(this);
    gs()?.observeCollection(s);
    return ks(s.flatMap(((s, r) => Os(t.call(e, Os(s), r, this)))));
}

function Hs(t) {
    const e = Cs(this);
    gs()?.observeCollection(e);
    return e.join(t);
}

function Qs() {
    return Os(Cs(this).pop());
}

function _s(...t) {
    return Cs(this).push(...t);
}

function zs() {
    return Os(Cs(this).shift());
}

function Ws(...t) {
    return Cs(this).unshift(...t);
}

function Gs(...t) {
    return Os(Cs(this).splice(...t));
}

function Zs(...t) {
    const e = Cs(this);
    const s = e.reverse();
    gs()?.observeCollection(e);
    return Os(s);
}

function Js(t, e) {
    const s = Cs(this);
    const r = s.some(((s, r) => $s(t.call(e, Os(s), r, this))));
    gs()?.observeCollection(s);
    return r;
}

function Xs(t) {
    const e = Cs(this);
    const s = e.sort(t);
    gs()?.observeCollection(e);
    return Os(s);
}

function Ys(t, e) {
    const s = Cs(this);
    gs()?.observeCollection(s);
    return ks(s.slice(t, e));
}

function tr(t, e) {
    const s = Cs(this);
    const r = s.reduce(((e, s, r) => t(e, Os(s), r, this)), e);
    gs()?.observeCollection(s);
    return Os(r);
}

function er(t, e) {
    const s = Cs(this);
    const r = s.reduceRight(((e, s, r) => t(e, Os(s), r, this)), e);
    gs()?.observeCollection(s);
    return Os(r);
}

const sr = {
    get(t, e, s) {
        if (e === Ss) return t;
        const r = gs();
        if (!ds || Ls(e) || null == r) return As(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return ur;

          case "delete":
            return hr;

          case "forEach":
            return rr;

          case "add":
            if (t instanceof Set) return cr;
            break;

          case "get":
            if (t instanceof Map) return nr;
            break;

          case "set":
            if (t instanceof Map) return or;
            break;

          case "has":
            return ir;

          case "keys":
            return ar;

          case "values":
            return lr;

          case "entries":
            return fr;

          case Symbol.iterator:
            return t instanceof Map ? fr : lr;
        }
        return Os(As(t, e, s));
    }
};

function rr(t, e) {
    const s = Cs(this);
    gs()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Os(s), Os(r), this);
    }));
}

function ir(t) {
    const e = Cs(this);
    gs()?.observeCollection(e);
    return e.has($s(t));
}

function nr(t) {
    const e = Cs(this);
    gs()?.observeCollection(e);
    return Os(e.get($s(t)));
}

function or(t, e) {
    return Os(Cs(this).set($s(t), $s(e)));
}

function cr(t) {
    return Os(Cs(this).add($s(t)));
}

function ur() {
    return Os(Cs(this).clear());
}

function hr(t) {
    return Os(Cs(this).delete($s(t)));
}

function ar() {
    const t = Cs(this);
    gs()?.observeCollection(t);
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
                value: Os(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function lr() {
    const t = Cs(this);
    gs()?.observeCollection(t);
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
                value: Os(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function fr() {
    const t = Cs(this);
    gs()?.observeCollection(t);
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
                value: [ Os(s[0]), Os(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const pr = Object.freeze({
    getProxy: ks,
    getRaw: Cs,
    wrap: Os,
    unwrap: $s,
    rawKey: Ss
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
                u.setValue(t, 0);
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
    setValue(t, e) {
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
        dr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, dr, 0);
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
            vs(this);
            return this.v = $s(this.$get.call(this.up ? Os(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            xs(this);
        }
    }
}

Vt(ComputedObserver);

y(ComputedObserver);

$(ComputedObserver);

let dr;

const wr = t.DI.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const br = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const gr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (br.disabled) return;
            if (++this.C < br.timeoutsPerCheck) return;
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
        if (br.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, gr);
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

$(DirtyChecker);

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

y(DirtyCheckProperty);

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

let vr;

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
        vr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, vr, this.f);
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
        if (this.hs) t = this.S(t, null);
        if (!Object.is(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.f = e;
            this.cb?.call(this.o, this.v, this.ov, e);
            this.queue.add(this);
        }
    }
    flush() {
        vr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, vr, this.f);
    }
}

y(SetterObserver);

y(SetterNotifier);

$(SetterObserver);

$(SetterNotifier);

const xr = new PropertyAccessor;

const Er = t.DI.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Ar = t.DI.createInterface("INodeObserverLocator", (e => e.cachedCallback((e => {
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
        return xr;
    }
    getAccessor() {
        return xr;
    }
}

class ObserverLocator {
    constructor(t, e) {
        this.$ = t;
        this.L = e;
        this.B = [];
    }
    addAdapter(t) {
        this.B.push(t);
    }
    getObserver(t, e) {
        return t.$observers?.[e] ?? this.R(t, e, this.createObserver(t, e));
    }
    getAccessor(t, e) {
        const s = t.$observers?.[e];
        if (void 0 !== s) return s;
        if (this.L.handles(t, e, this)) return this.L.getAccessor(t, e, this);
        return xr;
    }
    getArrayObserver(t) {
        return st(t);
    }
    getMapObserver(t) {
        return Lt(t);
    }
    getSetObserver(t) {
        return gt(t);
    }
    createObserver(e, r) {
        if (!(e instanceof Object)) return new PrimitiveObserver(e, r);
        if (this.L.handles(e, r, this)) return this.L.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (o(e)) return st(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Lt(e).getLengthObserver(); else if (e instanceof Set) return gt(e).getLengthObserver();
            break;

          default:
            if (o(e) && t.isArrayIndex(r)) return st(e).getIndexObserver(Number(r));
            break;
        }
        let i = yr(e, r);
        if (void 0 === i) {
            let t = mr(e);
            while (null !== t) {
                i = yr(t, r);
                if (void 0 === i) t = mr(t); else break;
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
        if (this.B.length > 0) for (const r of this.B) {
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

ObserverLocator.inject = [ wr, Ar ];

function Ur(t) {
    let e;
    if (o(t)) e = st(t); else if (t instanceof Map) e = Lt(t); else if (t instanceof Set) e = gt(t);
    return e;
}

const mr = Object.getPrototypeOf;

const yr = Object.getOwnPropertyDescriptor;

const Sr = t.DI.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Er ];
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
            vs(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            xs(this);
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

Vt(Effect);

function Or(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const kr = {};

function Cr(t, e, s) {
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
        let c = kr;
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
            const s = $r(this, e, o, c, u);
            gs()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            $r(this, e, o, c, u).setValue(s, 0);
        };
        s.get.getObserver = function t(s) {
            return $r(s, e, o, c, u);
        };
        if (n) r(t.prototype, e, s); else return s;
    }
}

function $r(t, e, s, r, i) {
    const n = Or(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === kr ? void 0 : r);
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

exports.ConnectableSwitcher = Es;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = br;

exports.FlushQueue = FlushQueue;

exports.ForOfStatement = ForOfStatement;

exports.HtmlLiteralExpression = HtmlLiteralExpression;

exports.ICoercionConfiguration = v;

exports.IDirtyChecker = wr;

exports.IExpressionParser = Nt;

exports.INodeObserverLocator = Ar;

exports.IObservation = Sr;

exports.IObserverLocator = Er;

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

exports.ProxyObservable = pr;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = rt;

exports.cloneIndexMap = U;

exports.connectable = Vt;

exports.copyIndexMap = E;

exports.createIndexMap = A;

exports.disableArrayObservation = et;

exports.disableMapObservation = $t;

exports.disableSetObservation = bt;

exports.enableArrayObservation = tt;

exports.enableMapObservation = Ct;

exports.enableSetObservation = wt;

exports.getCollectionObserver = Ur;

exports.isIndexMap = m;

exports.observable = Cr;

exports.parseExpression = ue;

exports.subscriberCollection = y;

exports.synchronizeIndices = it;

exports.withFlushQueue = $;
//# sourceMappingURL=index.cjs.map
