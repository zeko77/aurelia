import { Protocol as t, DI as e, isNumberOrBigInt as s, isStringOrDate as r, emptyArray as i, isArrayIndex as n, IPlatform as o, ILogger as c } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as u } from "../../../metadata/dist/native-modules/index.mjs";

const h = Object.prototype.hasOwnProperty;

const a = Reflect.defineProperty;

const l = t => "function" === typeof t;

const f = t => "string" === typeof t;

const d = t => t instanceof Array;

function p(t, e, s) {
    a(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function w(t, e, s) {
    if (!(e in t)) p(t, e, s);
}

const b = () => Object.create(null);

u.getOwn;

u.hasOwn;

u.define;

t.annotation.keyFor;

t.resource.keyFor;

t.resource.appendTo;

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) if (void 0 !== e) this[t] = e; else for (const e in t) if (h.call(t, e)) this[e] = t[e];
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

const g = e.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = b();
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

var v;

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
})(v || (v = {}));

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
        if (f(t.value)) {
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
                const r = e?.get?.(g);
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
        const i = s.get(g);
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
        const n = x(e?.strictFnCall, i, this.name);
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

const E = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some".split(" ");

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
        const n = x(e?.strictFnCall, r, this.name);
        if (n) {
            if (d(r) && E.includes(this.name)) s?.observeCollection(r);
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
        if (l(r)) return r(...this.args.map((r => r.evaluate(t, e, s))));
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
    evaluate(t, e, i) {
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(t, e, i) && this.right.evaluate(t, e, i);

          case "||":
            return this.left.evaluate(t, e, i) || this.right.evaluate(t, e, i);

          case "??":
            return this.left.evaluate(t, e, i) ?? this.right.evaluate(t, e, i);

          case "==":
            return this.left.evaluate(t, e, i) == this.right.evaluate(t, e, i);

          case "===":
            return this.left.evaluate(t, e, i) === this.right.evaluate(t, e, i);

          case "!=":
            return this.left.evaluate(t, e, i) != this.right.evaluate(t, e, i);

          case "!==":
            return this.left.evaluate(t, e, i) !== this.right.evaluate(t, e, i);

          case "instanceof":
            {
                const s = this.right.evaluate(t, e, i);
                if (l(s)) return this.left.evaluate(t, e, i) instanceof s;
                return false;
            }

          case "in":
            {
                const s = this.right.evaluate(t, e, i);
                if (s instanceof Object) return this.left.evaluate(t, e, i) in s;
                return false;
            }

          case "+":
            {
                const n = this.left.evaluate(t, e, i);
                const o = this.right.evaluate(t, e, i);
                if (e?.strict) return n + o;
                if (!n || !o) {
                    if (s(n) || s(o)) return (n || 0) + (o || 0);
                    if (r(n) || r(o)) return (n || "") + (o || "");
                }
                return n + o;
            }

          case "-":
            return this.left.evaluate(t, e, i) - this.right.evaluate(t, e, i);

          case "*":
            return this.left.evaluate(t, e, i) * this.right.evaluate(t, e, i);

          case "/":
            return this.left.evaluate(t, e, i) / this.right.evaluate(t, e, i);

          case "%":
            return this.left.evaluate(t, e, i) % this.right.evaluate(t, e, i);

          case "<":
            return this.left.evaluate(t, e, i) < this.right.evaluate(t, e, i);

          case ">":
            return this.left.evaluate(t, e, i) > this.right.evaluate(t, e, i);

          case "<=":
            return this.left.evaluate(t, e, i) <= this.right.evaluate(t, e, i);

          case ">=":
            return this.left.evaluate(t, e, i) >= this.right.evaluate(t, e, i);

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

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(i);

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

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(i, i);

class TemplateExpression {
    constructor(t, e = i) {
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
    constructor(t, e, s, r = i) {
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
    evaluate(t, e, s) {
        const r = this.expressions.map((r => r.evaluate(t, e, s)));
        const i = this.func.evaluate(t, e, s);
        if (!l(i)) throw new Error(`AUR0110`);
        return i(this.cooked, ...r);
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

const A = Object.prototype.toString;

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
        switch (A.call(e)) {
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
            throw new Error(`Cannot count ${A.call(e)}`);
        }
    }
    iterate(t, e, s) {
        switch (A.call(e)) {
          case "[object Array]":
            return m(e, s);

          case "[object Map]":
            return U(e, s);

          case "[object Set]":
            return y(e, s);

          case "[object Number]":
            return S(e, s);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${A.call(e)}`);
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
    constructor(t, e = i) {
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
    assign(t, e, s) {
        if (null == s) return;
        if ("object" !== typeof s) throw new Error(`AUR0112`);
        const r = this.indexOrProperties;
        let i;
        if (n(r)) {
            if (!Array.isArray(s)) throw new Error(`AUR0112`);
            i = s.slice(r);
        } else i = Object.entries(s).reduce(((t, [e, s]) => {
            if (!r.includes(e)) t[e] = s;
            return t;
        }), {});
        this.target.assign(t, e, i);
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

function x(t, e, s) {
    const r = null == e ? null : e[s];
    if (l(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function m(t, e) {
    for (let s = 0, r = t.length; s < r; ++s) e(t, s, t[s]);
}

function U(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.entries()) s[++r] = e;
    m(s, e);
}

function y(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.keys()) s[++r] = e;
    m(s, e);
}

function S(t, e) {
    const s = Array(t);
    for (let e = 0; e < t; ++e) s[e] = e;
    m(s, e);
}

const O = e.createInterface("ICoercionConfiguration");

var k;

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
})(k || (k = {}));

var C;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(C || (C = {}));

var $;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})($ || ($ = {}));

var L;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(L || (L = {}));

var B;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(B || (B = {}));

function R(t, e) {
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

function P(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function T(t) {
    const e = t.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function j(t) {
    return d(t) && true === t.isIndexMap;
}

function I(t) {
    return null == t ? M : M(t);
}

function M(t) {
    const e = t.prototype;
    a(e, "subs", {
        get: D
    });
    w(e, "subscribe", F);
    w(e, "unsubscribe", V);
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

function D() {
    return p(this, "subs", new SubscriberRecord);
}

function F(t) {
    return this.subs.add(t);
}

function V(t) {
    return this.subs.remove(t);
}

function N(t) {
    return null == t ? K : K(t);
}

function K(t) {
    const e = t.prototype;
    a(e, "queue", {
        get: q
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
            this.i.forEach(H);
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

function q() {
    return FlushQueue.instance;
}

function H(t, e, s) {
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
        if (t !== s && n(t)) {
            if (0 === (32 & e)) this.o.length = t;
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
        W = this.u;
        this.u = this.v;
        this.subs.notify(this.v, W, this.f);
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
        W = this.u;
        this.u = this.v;
        this.subs.notify(this.v, W, this.f);
    }
}

function Q(t) {
    const e = t.prototype;
    w(e, "subscribe", _);
    w(e, "unsubscribe", z);
    N(t);
    I(t);
}

function _(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function z(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

Q(CollectionLengthObserver);

Q(CollectionSizeObserver);

let W;

const G = new WeakMap;

function Z(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function J(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function X(t, e, s, r, i) {
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

function Y(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let d, p, w;
    let b, g;
    let v, E, A, x;
    let m, U, y, S;
    while (true) {
        if (r - s <= 10) {
            X(t, e, s, r, i);
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
            b = c;
            g = a;
            c = u;
            a = l;
            u = b;
            l = g;
        }
        p = i(c, h);
        if (p >= 0) {
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
        E = l;
        A = s + 1;
        x = r - 1;
        t[n] = t[A];
        e[n] = e[A];
        t[A] = v;
        e[A] = E;
        t: for (o = A + 1; o < x; o++) {
            m = t[o];
            U = e[o];
            y = i(m, v);
            if (y < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = m;
                e[A] = U;
                A++;
            } else if (y > 0) {
                do {
                    x--;
                    if (x == o) break t;
                    S = t[x];
                    y = i(S, v);
                } while (y > 0);
                t[o] = t[x];
                e[o] = e[x];
                t[x] = m;
                e[x] = U;
                if (y < 0) {
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
        if (r - x < A - s) {
            Y(t, e, x, r, i);
            r = A;
        } else {
            Y(t, e, s, A, i);
            s = x;
        }
    }
}

const tt = Array.prototype;

const et = tt.push;

const st = tt.unshift;

const rt = tt.pop;

const it = tt.shift;

const nt = tt.splice;

const ot = tt.reverse;

const ct = tt.sort;

const ut = {
    push: et,
    unshift: st,
    pop: rt,
    shift: it,
    splice: nt,
    reverse: ot,
    sort: ct
};

const ht = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const at = {
    push: function(...t) {
        const e = G.get(this);
        if (void 0 === e) return et.apply(this, t);
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
        const e = G.get(this);
        if (void 0 === e) return st.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        st.apply(e.indexMap, r);
        const n = st.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = G.get(this);
        if (void 0 === t) return rt.call(this);
        const e = t.indexMap;
        const s = rt.call(this);
        const r = e.length - 1;
        if (e[r] > -1) e.deletedItems.push(e[r]);
        rt.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = G.get(this);
        if (void 0 === t) return it.call(this);
        const e = t.indexMap;
        const s = it.call(this);
        if (e[0] > -1) e.deletedItems.push(e[0]);
        it.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = G.get(this);
        if (void 0 === r) return nt.apply(this, t);
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
            nt.call(c, e, s, ...r);
        } else nt.apply(c, t);
        const a = nt.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = G.get(this);
        if (void 0 === t) {
            ot.call(this);
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
        const e = G.get(this);
        if (void 0 === e) {
            ct.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        Y(this, e.indexMap, 0, s, J);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !l(t)) t = Z;
        Y(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of ht) a(at[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let lt = false;

function ft() {
    for (const t of ht) if (true !== tt[t].observing) p(tt, t, at[t]);
}

function dt() {
    for (const t of ht) if (true === tt[t].observing) p(tt, t, ut[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!lt) {
            lt = true;
            ft();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = P(t.length);
        this.lenObs = void 0;
        G.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.length;
        this.indexMap = P(e);
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

I(ArrayObserver);

I(ArrayIndexObserver);

function pt(t) {
    let e = G.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

function wt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = T(t);
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

function bt(t, e) {
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

const gt = new WeakMap;

const vt = Set.prototype;

const Et = vt.add;

const At = vt.clear;

const xt = vt.delete;

const mt = {
    add: Et,
    clear: At,
    delete: xt
};

const Ut = [ "add", "clear", "delete" ];

const yt = {
    add: function(t) {
        const e = gt.get(this);
        if (void 0 === e) {
            Et.call(this, t);
            return this;
        }
        const s = this.size;
        Et.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = gt.get(this);
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
        const e = gt.get(this);
        if (void 0 === e) return xt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = xt.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            r++;
        }
        return false;
    }
};

const St = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ut) a(yt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Ot = false;

function kt() {
    for (const t of Ut) if (true !== vt[t].observing) a(vt, t, {
        ...St,
        value: yt[t]
    });
}

function Ct() {
    for (const t of Ut) if (true === vt[t].observing) a(vt, t, {
        ...St,
        value: mt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Ot) {
            Ot = true;
            kt();
        }
        this.collection = t;
        this.indexMap = P(t.size);
        this.lenObs = void 0;
        gt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = P(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

I(SetObserver);

function $t(t) {
    let e = gt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Lt = new WeakMap;

const Bt = Map.prototype;

const Rt = Bt.set;

const Pt = Bt.clear;

const Tt = Bt.delete;

const jt = {
    set: Rt,
    clear: Pt,
    delete: Tt
};

const It = [ "set", "clear", "delete" ];

const Mt = {
    set: function(t, e) {
        const s = Lt.get(this);
        if (void 0 === s) {
            Rt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Rt.call(this, t, e);
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
        const t = Lt.get(this);
        if (void 0 === t) return Pt.call(this);
        const e = this.size;
        if (e > 0) {
            const e = t.indexMap;
            let s = 0;
            for (const t of this.keys()) {
                if (e[s] > -1) e.deletedItems.push(e[s]);
                s++;
            }
            Pt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Lt.get(this);
        if (void 0 === e) return Tt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const i = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (i[r] > -1) i.deletedItems.push(i[r]);
                i.splice(r, 1);
                const s = Tt.call(this, t);
                if (true === s) e.notify();
                return s;
            }
            ++r;
        }
        return false;
    }
};

const Dt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of It) a(Mt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Ft = false;

function Vt() {
    for (const t of It) if (true !== Bt[t].observing) a(Bt, t, {
        ...Dt,
        value: Mt[t]
    });
}

function Nt() {
    for (const t of It) if (true === Bt[t].observing) a(Bt, t, {
        ...Dt,
        value: jt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Ft) {
            Ft = true;
            Vt();
        }
        this.collection = t;
        this.indexMap = P(t.size);
        this.lenObs = void 0;
        Lt.set(t, this);
    }
    notify() {
        const t = this.indexMap;
        const e = this.collection.size;
        this.indexMap = P(e);
        this.subs.notifyCollection(t, 0);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

I(MapObserver);

function Kt(t) {
    let e = Lt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function qt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Ht() {
    return p(this, "obs", new BindingObserverRecord(this));
}

function Qt(t) {
    let e;
    if (d(t)) e = pt(t); else if (t instanceof Set) e = $t(t); else if (t instanceof Map) e = Kt(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function _t(t) {
    this.obs.add(t);
}

function zt() {
    throw new Error(`AUR2011:handleChange`);
}

function Wt() {
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
        this.o.forEach(Zt, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(Gt, this);
        this.o.clear();
        this.count = 0;
    }
}

function Gt(t, e) {
    e.unsubscribe(this);
}

function Zt(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function Jt(t) {
    const e = t.prototype;
    w(e, "observe", qt);
    w(e, "observeCollection", Qt);
    w(e, "subscribeTo", _t);
    a(e, "obs", {
        get: Ht
    });
    w(e, "handleChange", zt);
    w(e, "handleCollectionChange", Wt);
    return t;
}

function Xt(t) {
    return null == t ? Jt : Jt(t);
}

const Yt = e.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = b();
        this.A = b();
        this.U = b();
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
                throw Xe();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        le = t;
        fe = 0;
        de = t.length;
        pe = 0;
        we = 0;
        be = 6291456;
        ge = "";
        ve = t.charCodeAt(0);
        Ee = true;
        Ae = false;
        return Ue(61, void 0 === e ? 8 : e);
    }
}

var te;

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
})(te || (te = {}));

function ee(t) {
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

var se;

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
})(se || (se = {}));

var re;

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
})(re || (re = {}));

const ie = PrimitiveLiteralExpression.$false;

const ne = PrimitiveLiteralExpression.$true;

const oe = PrimitiveLiteralExpression.$null;

const ce = PrimitiveLiteralExpression.$undefined;

const ue = AccessThisExpression.$this;

const he = AccessThisExpression.$parent;

var ae;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(ae || (ae = {}));

let le = "";

let fe = 0;

let de = 0;

let pe = 0;

let we = 0;

let be = 6291456;

let ge = "";

let ve;

let Ee = true;

let Ae = false;

function xe() {
    return le.slice(we, fe);
}

function me(t, e) {
    le = t;
    fe = 0;
    de = t.length;
    pe = 0;
    we = 0;
    be = 6291456;
    ge = "";
    ve = t.charCodeAt(0);
    Ee = true;
    Ae = false;
    return Ue(61, void 0 === e ? 8 : e);
}

function Ue(t, e) {
    if (16 === e) return new CustomExpression(le);
    if (0 === fe) {
        if (1 & e) return Te();
        Me();
        if (4194304 & be) throw _e();
    }
    Ee = 513 > t;
    Ae = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & be) {
        const t = vs[63 & be];
        Me();
        r = new UnaryExpression(t, Ue(514, e));
        Ee = false;
    } else {
        t: switch (be) {
          case 12294:
            i = pe;
            Ee = false;
            do {
                Me();
                ++i;
                switch (be) {
                  case 65545:
                    Me();
                    if (0 === (12288 & be)) throw We();
                    break;

                  case 10:
                  case 11:
                    throw We();

                  case 2162700:
                    Ae = true;
                    Me();
                    if (0 === (12288 & be)) {
                        r = 0 === i ? ue : 1 === i ? he : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & be) {
                        r = 0 === i ? ue : 1 === i ? he : new AccessThisExpression(i);
                        break t;
                    }
                    throw Ge();
                }
            } while (12294 === be);

          case 4096:
            {
                const t = ge;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Ee = !Ae;
                Me();
                if (He(49)) {
                    if (524296 === be) throw bs();
                    const e = Ae;
                    const s = pe;
                    ++pe;
                    const i = Ue(62, 0);
                    Ae = e;
                    pe = s;
                    Ee = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw gs();

          case 11:
            throw ze();

          case 12292:
            Ee = false;
            Me();
            switch (pe) {
              case 0:
                r = ue;
                break;

              case 1:
                r = he;
                break;

              default:
                r = new AccessThisExpression(pe);
                break;
            }
            break;

          case 2688007:
            r = Le(e);
            break;

          case 2688016:
            r = le.search(/\s+of\s+/) > fe ? ye() : Be(e);
            break;

          case 524296:
            r = Pe(e);
            break;

          case 2163758:
            r = new TemplateExpression([ ge ]);
            Ee = false;
            Me();
            break;

          case 2163759:
            r = je(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(ge);
            Ee = false;
            Me();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = vs[63 & be];
            Ee = false;
            Me();
            break;

          default:
            if (fe >= de) throw Ze(); else throw Je();
        }
        if (2 & e) return Re(r);
        if (514 < t) return r;
        if (10 === be || 11 === be) throw We();
        if (1793 === r.$kind) switch (be) {
          case 2162700:
            Ae = true;
            Ee = false;
            Me();
            if (0 === (13312 & be)) throw as();
            if (12288 & be) {
                r = new AccessScopeExpression(ge, r.ancestor);
                Me();
            } else if (2688007 === be) r = new CallFunctionExpression(r, Se(), true); else if (2688016 === be) r = Oe(r, true); else throw ls();
            break;

          case 65545:
            Ee = !Ae;
            Me();
            if (0 === (12288 & be)) throw We();
            r = new AccessScopeExpression(ge, r.ancestor);
            Me();
            break;

          case 10:
          case 11:
            throw We();

          case 2688007:
            r = new CallFunctionExpression(r, Se(), s);
            break;

          case 2688016:
            r = Oe(r, s);
            break;

          case 2163758:
            r = Ie(r);
            break;

          case 2163759:
            r = je(e, r, true);
            break;
        }
        while ((65536 & be) > 0) switch (be) {
          case 2162700:
            r = ke(r);
            break;

          case 65545:
            Me();
            if (0 === (12288 & be)) throw We();
            r = Ce(r, false);
            break;

          case 10:
          case 11:
            throw We();

          case 2688007:
            if (10082 === r.$kind) r = new CallScopeExpression(r.name, Se(), r.ancestor, false); else if (9323 === r.$kind) r = new CallMemberExpression(r.object, r.name, Se(), r.optional, false); else r = new CallFunctionExpression(r, Se(), false);
            break;

          case 2688016:
            r = Oe(r, false);
            break;

          case 2163758:
            if (Ae) throw ls();
            r = Ie(r);
            break;

          case 2163759:
            if (Ae) throw ls();
            r = je(e, r, true);
            break;
        }
    }
    if (10 === be || 11 === be) throw We();
    if (513 < t) return r;
    while ((262144 & be) > 0) {
        const s = be;
        if ((960 & s) <= t) break;
        Me();
        r = new BinaryExpression(vs[63 & s], r, Ue(960 & s, e));
        Ee = false;
    }
    if (63 < t) return r;
    if (He(6291477)) {
        const t = Ue(62, e);
        Qe(6291476);
        r = new ConditionalExpression(r, t, Ue(62, e));
        Ee = false;
    }
    if (62 < t) return r;
    if (He(4194348)) {
        if (!Ee) throw Ye();
        r = new AssignExpression(r, Ue(62, e));
    }
    if (61 < t) return r;
    while (He(6291479)) {
        if (6291456 === be) throw ts();
        const t = ge;
        Me();
        const s = new Array;
        while (He(6291476)) s.push(Ue(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (He(6291478)) {
        if (6291456 === be) throw es();
        const t = ge;
        Me();
        const s = new Array;
        while (He(6291476)) s.push(Ue(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== be) {
        if ((1 & e) > 0 && 7340045 === be) return r;
        if ("of" === xe()) throw ss();
        throw Je();
    }
    return r;
}

function ye() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Me();
        switch (be) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = xe();
            break;

          default:
            throw hs();
        }
    }
    Qe(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(ue, s), new AccessKeyedExpression(ue, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Se() {
    const t = Ae;
    Me();
    const e = [];
    while (7340046 !== be) {
        e.push(Ue(62, 0));
        if (!He(6291471)) break;
    }
    Qe(7340046);
    Ee = false;
    Ae = t;
    return e;
}

function Oe(t, e) {
    const s = Ae;
    Me();
    t = new AccessKeyedExpression(t, Ue(62, 0), e);
    Qe(7340051);
    Ee = !s;
    Ae = s;
    return t;
}

function ke(t) {
    Ae = true;
    Ee = false;
    Me();
    if (0 === (13312 & be)) throw as();
    if (12288 & be) return Ce(t, true);
    if (2688007 === be) if (10082 === t.$kind) return new CallScopeExpression(t.name, Se(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, Se(), t.optional, true); else return new CallFunctionExpression(t, Se(), true);
    if (2688016 === be) return Oe(t, true);
    throw ls();
}

function Ce(t, e) {
    const s = ge;
    switch (be) {
      case 2162700:
        {
            Ae = true;
            Ee = false;
            const r = fe;
            const i = we;
            const n = be;
            const o = ve;
            const c = ge;
            const u = Ee;
            const h = Ae;
            Me();
            if (0 === (13312 & be)) throw as();
            if (2688007 === be) return new CallMemberExpression(t, s, Se(), e, true);
            fe = r;
            we = i;
            be = n;
            ve = o;
            ge = c;
            Ee = u;
            Ae = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Ee = false;
        return new CallMemberExpression(t, s, Se(), e, false);

      default:
        Ee = !Ae;
        Me();
        return new AccessMemberExpression(t, s, e);
    }
}

var $e;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})($e || ($e = {}));

function Le(t) {
    Me();
    const e = fe;
    const s = we;
    const r = be;
    const i = ve;
    const n = ge;
    const o = Ee;
    const c = Ae;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === be) {
            Me();
            if (4096 !== be) throw We();
            u.push(new BindingIdentifier(ge));
            Me();
            if (6291471 === be) throw ws();
            if (7340046 !== be) throw ze();
            Me();
            if (49 !== be) throw ze();
            Me();
            const t = Ae;
            const e = pe;
            ++pe;
            const s = Ue(62, 0);
            Ae = t;
            pe = e;
            Ee = false;
            return new ArrowFunction(u, s, true);
        }
        switch (be) {
          case 4096:
            u.push(new BindingIdentifier(ge));
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
        switch (be) {
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
            if (a) throw fs();
            Me();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === be) {
        if (1 === h) {
            Me();
            if (524296 === be) throw bs();
            const t = Ae;
            const e = pe;
            ++pe;
            const s = Ue(62, 0);
            Ae = t;
            pe = e;
            Ee = false;
            return new ArrowFunction(u, s);
        }
        throw fs();
    } else if (1 === h && 0 === u.length) throw cs(49);
    if (a) switch (h) {
      case 2:
        throw fs();

      case 3:
        throw ds();

      case 4:
        throw ps();
    }
    fe = e;
    we = s;
    be = r;
    ve = i;
    ge = n;
    Ee = o;
    Ae = c;
    const l = Ae;
    const f = Ue(62, t);
    Ae = l;
    Qe(7340046);
    if (49 === be) switch (h) {
      case 2:
        throw fs();

      case 3:
        throw ds();

      case 4:
        throw ps();
    }
    return f;
}

function Be(t) {
    const e = Ae;
    Me();
    const s = new Array;
    while (7340051 !== be) if (He(6291471)) {
        s.push(ce);
        if (7340051 === be) break;
    } else {
        s.push(Ue(62, ~2 & t));
        if (He(6291471)) {
            if (7340051 === be) break;
        } else break;
    }
    Ae = e;
    Qe(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Ee = false;
        return new ArrayLiteralExpression(s);
    }
}

function Re(t) {
    if (0 === (65536 & t.$kind)) throw rs();
    if (4204592 !== be) throw rs();
    Me();
    const e = t;
    const s = Ue(61, 0);
    return new ForOfStatement(e, s);
}

function Pe(t) {
    const e = Ae;
    const s = new Array;
    const r = new Array;
    Me();
    while (7340045 !== be) {
        s.push(ge);
        if (49152 & be) {
            Me();
            Qe(6291476);
            r.push(Ue(62, ~2 & t));
        } else if (12288 & be) {
            const e = ve;
            const s = be;
            const i = fe;
            Me();
            if (He(6291476)) r.push(Ue(62, ~2 & t)); else {
                ve = e;
                be = s;
                fe = i;
                r.push(Ue(515, ~2 & t));
            }
        } else throw is();
        if (7340045 !== be) Qe(6291471);
    }
    Ae = e;
    Qe(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Ee = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function Te() {
    const t = [];
    const e = [];
    const s = de;
    let r = "";
    while (fe < s) {
        switch (ve) {
          case 36:
            if (123 === le.charCodeAt(fe + 1)) {
                t.push(r);
                r = "";
                fe += 2;
                ve = le.charCodeAt(fe);
                Me();
                const s = Ue(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(ee(De()));
            break;

          default:
            r += String.fromCharCode(ve);
        }
        De();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function je(t, e, s) {
    const r = Ae;
    const i = [ ge ];
    Qe(2163759);
    const n = [ Ue(62, t) ];
    while (2163758 !== (be = qe())) {
        i.push(ge);
        Qe(2163759);
        n.push(Ue(62, t));
    }
    i.push(ge);
    Ee = false;
    Ae = r;
    if (s) {
        Me();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Me();
        return new TemplateExpression(i, n);
    }
}

function Ie(t) {
    Ee = false;
    const e = [ ge ];
    Me();
    return new TaggedTemplateExpression(e, e, t);
}

function Me() {
    while (fe < de) {
        we = fe;
        if (null != (be = Ss[ve]())) return;
    }
    be = 6291456;
}

function De() {
    return ve = le.charCodeAt(++fe);
}

function Fe() {
    while (ys[De()]) ;
    const t = Es[ge = xe()];
    return void 0 === t ? 4096 : t;
}

function Ve(t) {
    let e = ve;
    if (false === t) {
        do {
            e = De();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            ge = parseInt(xe(), 10);
            return 32768;
        }
        e = De();
        if (fe >= de) {
            ge = parseInt(xe().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = De();
    } while (e <= 57 && e >= 48); else ve = le.charCodeAt(--fe);
    ge = parseFloat(xe());
    return 32768;
}

function Ne() {
    const t = ve;
    De();
    let e = 0;
    const s = new Array;
    let r = fe;
    while (ve !== t) if (92 === ve) {
        s.push(le.slice(r, fe));
        De();
        e = ee(ve);
        De();
        s.push(String.fromCharCode(e));
        r = fe;
    } else if (fe >= de) throw ns(); else De();
    const i = le.slice(r, fe);
    De();
    s.push(i);
    const n = s.join("");
    ge = n;
    return 16384;
}

function Ke() {
    let t = true;
    let e = "";
    while (96 !== De()) if (36 === ve) if (fe + 1 < de && 123 === le.charCodeAt(fe + 1)) {
        fe++;
        t = false;
        break;
    } else e += "$"; else if (92 === ve) e += String.fromCharCode(ee(De())); else {
        if (fe >= de) throw os();
        e += String.fromCharCode(ve);
    }
    De();
    ge = e;
    if (t) return 2163758;
    return 2163759;
}

function qe() {
    if (fe >= de) throw os();
    fe--;
    return Ke();
}

function He(t) {
    if (be === t) {
        Me();
        return true;
    }
    return false;
}

function Qe(t) {
    if (be === t) Me(); else throw cs(t);
}

function _e() {
    return new Error(`AUR0151:${le}`);
}

function ze() {
    return new Error(`AUR0152:${le}`);
}

function We() {
    return new Error(`AUR0153:${le}`);
}

function Ge() {
    return new Error(`AUR0154:${le}`);
}

function Ze() {
    return new Error(`AUR0155:${le}`);
}

function Je() {
    return new Error(`AUR0156:${le}`);
}

function Xe() {
    return new Error(`AUR0157`);
}

function Ye() {
    return new Error(`AUR0158:${le}`);
}

function ts() {
    return new Error(`AUR0159:${le}`);
}

function es() {
    return new Error(`AUR0160:${le}`);
}

function ss() {
    return new Error(`AUR0161:${le}`);
}

function rs() {
    return new Error(`AUR0163:${le}`);
}

function is() {
    return new Error(`AUR0164:${le}`);
}

function ns() {
    return new Error(`AUR0165:${le}`);
}

function os() {
    return new Error(`AUR0166:${le}`);
}

function cs(t) {
    return new Error(`AUR0167:${le}<${vs[63 & t]}`);
}

const us = () => {
    throw new Error(`AUR0168:${le}`);
};

us.notMapped = true;

function hs() {
    return new Error(`AUR0170:${le}`);
}

function as() {
    return new Error(`AUR0171:${le}`);
}

function ls() {
    return new Error(`AUR0172:${le}`);
}

function fs() {
    return new Error(`AUR0173:${le}`);
}

function ds() {
    return new Error(`AUR0174:${le}`);
}

function ps() {
    return new Error(`AUR0175:${le}`);
}

function ws() {
    return new Error(`AUR0176:${le}`);
}

function bs() {
    return new Error(`AUR0178:${le}`);
}

function gs() {
    return new Error(`AUR0179:${le}`);
}

const vs = [ ie, ne, oe, ce, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Es = Object.assign(Object.create(null), {
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

const As = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function xs(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function ms(t) {
    return () => {
        De();
        return t;
    };
}

const Us = new Set;

xs(null, Us, As.AsciiIdPart, true);

const ys = new Uint8Array(65535);

xs(ys, null, As.IdStart, 1);

xs(ys, null, As.Digit, 1);

const Ss = new Array(65535);

Ss.fill(us, 0, 65535);

xs(Ss, null, As.Skip, (() => {
    De();
    return null;
}));

xs(Ss, null, As.IdStart, Fe);

xs(Ss, null, As.Digit, (() => Ve(false)));

Ss[34] = Ss[39] = () => Ne();

Ss[96] = () => Ke();

Ss[33] = () => {
    if (61 !== De()) return 131117;
    if (61 !== De()) return 6553948;
    De();
    return 6553950;
};

Ss[61] = () => {
    if (62 === De()) {
        De();
        return 49;
    }
    if (61 !== ve) return 4194348;
    if (61 !== De()) return 6553947;
    De();
    return 6553949;
};

Ss[38] = () => {
    if (38 !== De()) return 6291478;
    De();
    return 6553882;
};

Ss[124] = () => {
    if (124 !== De()) return 6291479;
    De();
    return 6553817;
};

Ss[63] = () => {
    if (46 === De()) {
        const t = le.charCodeAt(fe + 1);
        if (t <= 48 || t >= 57) {
            De();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== ve) return 6291477;
    De();
    return 6553752;
};

Ss[46] = () => {
    if (De() <= 57 && ve >= 48) return Ve(true);
    if (46 === ve) {
        if (46 !== De()) return 10;
        De();
        return 11;
    }
    return 65545;
};

Ss[60] = () => {
    if (61 !== De()) return 6554015;
    De();
    return 6554017;
};

Ss[62] = () => {
    if (61 !== De()) return 6554016;
    De();
    return 6554018;
};

Ss[37] = ms(6554154);

Ss[40] = ms(2688007);

Ss[41] = ms(7340046);

Ss[42] = ms(6554153);

Ss[43] = ms(2490853);

Ss[44] = ms(6291471);

Ss[45] = ms(2490854);

Ss[47] = ms(6554155);

Ss[58] = ms(6291476);

Ss[91] = ms(2688016);

Ss[93] = ms(7340051);

Ss[123] = ms(524296);

Ss[125] = ms(7340045);

let Os = null;

const ks = [];

let Cs = false;

function $s() {
    Cs = false;
}

function Ls() {
    Cs = true;
}

function Bs() {
    return Os;
}

function Rs(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Os) {
        Os = t;
        ks[0] = Os;
        Cs = true;
        return;
    }
    if (Os === t) throw new Error(`AUR0207`);
    ks.push(t);
    Os = t;
    Cs = true;
}

function Ps(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Os !== t) throw new Error(`AUR0209`);
    ks.pop();
    Os = ks.length > 0 ? ks[ks.length - 1] : null;
    Cs = null != Os;
}

const Ts = Object.freeze({
    get current() {
        return Os;
    },
    get connecting() {
        return Cs;
    },
    enter: Rs,
    exit: Ps,
    pause: $s,
    resume: Ls
});

const js = Reflect.get;

const Is = Object.prototype.toString;

const Ms = new WeakMap;

function Ds(t) {
    switch (Is.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Fs = "__raw__";

function Vs(t) {
    return Ds(t) ? Ns(t) : t;
}

function Ns(t) {
    return Ms.get(t) ?? Qs(t);
}

function Ks(t) {
    return t[Fs] ?? t;
}

function qs(t) {
    return Ds(t) && t[Fs] || t;
}

function Hs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Qs(t) {
    const e = d(t) ? zs : t instanceof Map || t instanceof Set ? br : _s;
    const s = new Proxy(t, e);
    Ms.set(t, s);
    return s;
}

const _s = {
    get(t, e, s) {
        if (e === Fs) return t;
        const r = Bs();
        if (!Cs || Hs(e) || null == r) return js(t, e, s);
        r.observe(t, e);
        return Vs(js(t, e, s));
    }
};

const zs = {
    get(t, e, s) {
        if (e === Fs) return t;
        const r = Bs();
        if (!Cs || Hs(e) || null == r) return js(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Ws;

          case "includes":
            return Js;

          case "indexOf":
            return Xs;

          case "lastIndexOf":
            return Ys;

          case "every":
            return Gs;

          case "filter":
            return Zs;

          case "find":
            return er;

          case "findIndex":
            return tr;

          case "flat":
            return sr;

          case "flatMap":
            return rr;

          case "join":
            return ir;

          case "push":
            return or;

          case "pop":
            return nr;

          case "reduce":
            return pr;

          case "reduceRight":
            return wr;

          case "reverse":
            return ar;

          case "shift":
            return cr;

          case "unshift":
            return ur;

          case "slice":
            return dr;

          case "splice":
            return hr;

          case "some":
            return lr;

          case "sort":
            return fr;

          case "keys":
            return yr;

          case "values":
          case Symbol.iterator:
            return Sr;

          case "entries":
            return Or;
        }
        r.observe(t, e);
        return Vs(js(t, e, s));
    },
    ownKeys(t) {
        Bs()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Ws(t, e) {
    const s = Ks(this);
    const r = s.map(((s, r) => qs(t.call(e, Vs(s), r, this))));
    Bs()?.observeCollection(s);
    return Vs(r);
}

function Gs(t, e) {
    const s = Ks(this);
    const r = s.every(((s, r) => t.call(e, Vs(s), r, this)));
    Bs()?.observeCollection(s);
    return r;
}

function Zs(t, e) {
    const s = Ks(this);
    const r = s.filter(((s, r) => qs(t.call(e, Vs(s), r, this))));
    Bs()?.observeCollection(s);
    return Vs(r);
}

function Js(t) {
    const e = Ks(this);
    const s = e.includes(qs(t));
    Bs()?.observeCollection(e);
    return s;
}

function Xs(t) {
    const e = Ks(this);
    const s = e.indexOf(qs(t));
    Bs()?.observeCollection(e);
    return s;
}

function Ys(t) {
    const e = Ks(this);
    const s = e.lastIndexOf(qs(t));
    Bs()?.observeCollection(e);
    return s;
}

function tr(t, e) {
    const s = Ks(this);
    const r = s.findIndex(((s, r) => qs(t.call(e, Vs(s), r, this))));
    Bs()?.observeCollection(s);
    return r;
}

function er(t, e) {
    const s = Ks(this);
    const r = s.find(((e, s) => t(Vs(e), s, this)), e);
    Bs()?.observeCollection(s);
    return Vs(r);
}

function sr() {
    const t = Ks(this);
    Bs()?.observeCollection(t);
    return Vs(t.flat());
}

function rr(t, e) {
    const s = Ks(this);
    Bs()?.observeCollection(s);
    return Ns(s.flatMap(((s, r) => Vs(t.call(e, Vs(s), r, this)))));
}

function ir(t) {
    const e = Ks(this);
    Bs()?.observeCollection(e);
    return e.join(t);
}

function nr() {
    return Vs(Ks(this).pop());
}

function or(...t) {
    return Ks(this).push(...t);
}

function cr() {
    return Vs(Ks(this).shift());
}

function ur(...t) {
    return Ks(this).unshift(...t);
}

function hr(...t) {
    return Vs(Ks(this).splice(...t));
}

function ar(...t) {
    const e = Ks(this);
    const s = e.reverse();
    Bs()?.observeCollection(e);
    return Vs(s);
}

function lr(t, e) {
    const s = Ks(this);
    const r = s.some(((s, r) => qs(t.call(e, Vs(s), r, this))));
    Bs()?.observeCollection(s);
    return r;
}

function fr(t) {
    const e = Ks(this);
    const s = e.sort(t);
    Bs()?.observeCollection(e);
    return Vs(s);
}

function dr(t, e) {
    const s = Ks(this);
    Bs()?.observeCollection(s);
    return Ns(s.slice(t, e));
}

function pr(t, e) {
    const s = Ks(this);
    const r = s.reduce(((e, s, r) => t(e, Vs(s), r, this)), e);
    Bs()?.observeCollection(s);
    return Vs(r);
}

function wr(t, e) {
    const s = Ks(this);
    const r = s.reduceRight(((e, s, r) => t(e, Vs(s), r, this)), e);
    Bs()?.observeCollection(s);
    return Vs(r);
}

const br = {
    get(t, e, s) {
        if (e === Fs) return t;
        const r = Bs();
        if (!Cs || Hs(e) || null == r) return js(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return mr;

          case "delete":
            return Ur;

          case "forEach":
            return gr;

          case "add":
            if (t instanceof Set) return xr;
            break;

          case "get":
            if (t instanceof Map) return Er;
            break;

          case "set":
            if (t instanceof Map) return Ar;
            break;

          case "has":
            return vr;

          case "keys":
            return yr;

          case "values":
            return Sr;

          case "entries":
            return Or;

          case Symbol.iterator:
            return t instanceof Map ? Or : Sr;
        }
        return Vs(js(t, e, s));
    }
};

function gr(t, e) {
    const s = Ks(this);
    Bs()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Vs(s), Vs(r), this);
    }));
}

function vr(t) {
    const e = Ks(this);
    Bs()?.observeCollection(e);
    return e.has(qs(t));
}

function Er(t) {
    const e = Ks(this);
    Bs()?.observeCollection(e);
    return Vs(e.get(qs(t)));
}

function Ar(t, e) {
    return Vs(Ks(this).set(qs(t), qs(e)));
}

function xr(t) {
    return Vs(Ks(this).add(qs(t)));
}

function mr() {
    return Vs(Ks(this).clear());
}

function Ur(t) {
    return Vs(Ks(this).delete(qs(t)));
}

function yr() {
    const t = Ks(this);
    Bs()?.observeCollection(t);
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
                value: Vs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Sr() {
    const t = Ks(this);
    Bs()?.observeCollection(t);
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
                value: Vs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Or() {
    const t = Ks(this);
    Bs()?.observeCollection(t);
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
                value: [ Vs(s[0]), Vs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const kr = Object.freeze({
    getProxy: Ns,
    getRaw: Ks,
    wrap: Vs,
    unwrap: qs,
    rawKey: Fs
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
    static create(t, e, s, r, i) {
        const n = s.get;
        const o = s.set;
        const c = new ComputedObserver(t, n, o, i, r);
        const u = () => c.getValue();
        u.getObserver = () => c;
        a(t, e, {
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
        if (0 === this.subs.count) return this.$get.call(this.o, this);
        if (this.D) {
            this.compute();
            this.D = false;
        }
        return this.v;
    }
    setValue(t, e) {
        if (l(this.$set)) {
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
        Cr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Cr, 0);
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
            Rs(this);
            return this.v = qs(this.$get.call(this.up ? Vs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Ps(this);
        }
    }
}

Xt(ComputedObserver);

I(ComputedObserver);

N(ComputedObserver);

let Cr;

const $r = e.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Lr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Br = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Lr.disabled) return;
            if (++this.C < Lr.timeoutsPerCheck) return;
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
        if (Lr.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Br);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.O.cancel();
            this.O = null;
        }
    }
}

DirtyChecker.inject = [ o ];

N(DirtyChecker);

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

I(DirtyCheckProperty);

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

let Rr;

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
        Rr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Rr, this.f);
    }
    start() {
        if (false === this.iO) {
            this.iO = true;
            this.v = this.o[this.k];
            a(this.o, this.k, {
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
            a(this.o, this.k, {
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
        this.hs = l(s);
        const i = t[e];
        this.cb = l(i) ? i : void 0;
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
        Rr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Rr, this.f);
    }
}

I(SetterObserver);

I(SetterNotifier);

N(SetterObserver);

N(SetterNotifier);

const Pr = new PropertyAccessor;

const Tr = e.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const jr = e.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => {
    t.getAll(c).forEach((t => {
        t.error("Using default INodeObserverLocator implementation. Will not be able to observe nodes (HTML etc...).");
    }));
    return new DefaultNodeObserverLocator;
}))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Pr;
    }
    getAccessor() {
        return Pr;
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
        return Pr;
    }
    getArrayObserver(t) {
        return pt(t);
    }
    getMapObserver(t) {
        return Kt(t);
    }
    getSetObserver(t) {
        return $t(t);
    }
    createObserver(t, e) {
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        if (this.L.handles(t, e, this)) return this.L.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (d(t)) return pt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return Kt(t).getLengthObserver(); else if (t instanceof Set) return $t(t).getLengthObserver();
            break;

          default:
            if (d(t) && n(e)) return pt(t).getIndexObserver(Number(e));
            break;
        }
        let s = Dr(t, e);
        if (void 0 === s) {
            let r = Mr(t);
            while (null !== r) {
                s = Dr(r, e);
                if (void 0 === s) r = Mr(r); else break;
            }
        }
        if (void 0 !== s && !h.call(s, "value")) {
            let r = this.P(t, e, s);
            if (null == r) r = (s.get?.getObserver ?? s.set?.getObserver)?.(t, this);
            return null == r ? s.configurable ? ComputedObserver.create(t, e, s, this, true) : this.$.createProperty(t, e) : r;
        }
        return new SetterObserver(t, e);
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
            a(t, "$observers", {
                value: {
                    [e]: s
                }
            });
            return s;
        }
        return t.$observers[e] = s;
    }
}

ObserverLocator.inject = [ $r, jr ];

function Ir(t) {
    let e;
    if (d(t)) e = pt(t); else if (t instanceof Map) e = Kt(t); else if (t instanceof Set) e = $t(t);
    return e;
}

const Mr = Object.getPrototypeOf;

const Dr = Object.getOwnPropertyDescriptor;

const Fr = e.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Tr ];
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
            Rs(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Ps(this);
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

Xt(Effect);

function Vr(t) {
    if (void 0 === t.$observers) a(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Nr = {};

function Kr(t, e, s) {
    if (null == e) return (e, s, i) => r(e, s, i, t);
    return r(t, e, s);
    function r(t, e, s, r) {
        const i = void 0 === e;
        r = "object" !== typeof r ? {
            name: r
        } : r || {};
        if (i) e = r.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const n = r.callback || `${String(e)}Changed`;
        let o = Nr;
        if (s) {
            delete s.value;
            delete s.writable;
            o = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const c = r.set;
        s.get = function t() {
            const s = qr(this, e, n, o, c);
            Bs()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            qr(this, e, n, o, c).setValue(s, 0);
        };
        s.get.getObserver = function t(s) {
            return qr(s, e, n, o, c);
        };
        if (i) a(t.prototype, e, s); else return s;
    }
}

function qr(t, e, s, r, i) {
    const n = Vr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Nr ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, B as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, te as Char, L as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, Ts as ConnectableSwitcher, CustomExpression, $ as DelegationStrategy, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Lr as DirtyCheckSettings, v as ExpressionKind, ae as ExpressionType, FlushQueue, ForOfStatement, HtmlLiteralExpression, O as ICoercionConfiguration, $r as IDirtyChecker, Yt as IExpressionParser, jr as INodeObserverLocator, Fr as IObservation, Tr as IObserverLocator, g as ISignaler, Interpolation, k as LifecycleFlags, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, OverrideContext, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, kr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, ValueConverterExpression, wt as applyMutationsToIndices, T as cloneIndexMap, Xt as connectable, R as copyIndexMap, P as createIndexMap, dt as disableArrayObservation, Nt as disableMapObservation, Ct as disableSetObservation, ft as enableArrayObservation, Vt as enableMapObservation, kt as enableSetObservation, Ir as getCollectionObserver, j as isIndexMap, Kr as observable, me as parseExpression, I as subscriberCollection, bt as synchronizeIndices, N as withFlushQueue };

