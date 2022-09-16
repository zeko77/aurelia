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

const g = () => Object.create(null);

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

const b = e.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = g();
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
    bind(t, e) {
        const s = this.name;
        const r = this.k;
        const i = e.getBehavior?.(s);
        if (null == i) throw E(s);
        if (void 0 === e[r]) {
            e[r] = i;
            i.bind?.(t, e, ...this.args.map((s => s.evaluate(t, e, null))));
        } else throw A(s);
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

const E = t => new Error(`AUR0101:${t}`);

const A = t => new Error(`AUR0102:${t}`);

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
        if (null == i) throw x(r);
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s), ...this.args.map((r => r.evaluate(t, e, s))));
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw x(r);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, null))));
        return this.expression.assign(t, e, s);
    }
    bind(t, e) {
        const s = this.name;
        const r = e.getConverter?.(s);
        if (null == r) throw x(s);
        const i = r.signals;
        if (null != i) {
            const t = e.get?.(b);
            const s = i.length;
            let r = 0;
            for (;r < s; ++r) t?.addSignalListener(i[r], e);
        }
        if (this.expression.hasBind) this.expression.bind(t, e);
    }
    unbind(t, e) {
        const s = e.getConverter?.(this.name);
        if (void 0 === s?.signals) return;
        const r = e.get(b);
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

const x = t => new Error(`AUR0103:${t}`);

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
        const n = U(e?.strictFnCall, i, this.name);
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

const m = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some".split(" ");

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
        const n = U(e?.strictFnCall, r, this.name);
        if (n) {
            if (d(r) && m.includes(this.name)) s?.observeCollection(r);
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

class ForOfStatement {
    constructor(t, e) {
        this.declaration = t;
        this.iterable = e;
    }
    get $kind() {
        return 6200;
    }
    get hasBind() {
        return true;
    }
    get hasUnbind() {
        return true;
    }
    evaluate(t, e, s) {
        return this.iterable.evaluate(t, e, s);
    }
    assign(t, e, s) {
        return;
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

function U(t, e, s) {
    const r = null == e ? null : e[s];
    if (l(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

const y = e.createInterface("ICoercionConfiguration");

var S;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(S || (S = {}));

var O;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(O || (O = {}));

var k;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(k || (k = {}));

var C;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(C || (C = {}));

var $;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})($ || ($ = {}));

function L(t, e, s) {
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

function B(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function R(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function P(t) {
    return d(t) && true === t.isIndexMap;
}

let T = new Map;

let I = false;

function M(t) {
    const e = T;
    const s = T = new Map;
    I = true;
    try {
        t();
    } finally {
        T = null;
        I = false;
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
            T = e;
        }
    }
}

function j(t, e) {
    if (!T.has(t)) T.set(t, [ 2, e ]);
}

function D(t, e, s) {
    const r = T.get(t);
    if (void 0 === r) T.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function F(t) {
    return null == t ? V : V(t);
}

function V(t) {
    const e = t.prototype;
    a(e, "subs", {
        get: N
    });
    w(e, "subscribe", K);
    w(e, "unsubscribe", q);
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
        if (I) {
            D(this, t, e);
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

function N() {
    return p(this, "subs", new SubscriberRecord);
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
    a(e, "queue", {
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
        this.v = this.u = (this.o = t.collection).length;
    }
    getValue() {
        return this.o.length;
    }
    setValue(t) {
        const e = this.v;
        if (t !== e && n(t)) {
            this.o.length = t;
            this.v = t;
            this.u = e;
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
        J = this.u;
        this.u = this.v;
        this.subs.notify(this.v, J);
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
        J = this.u;
        this.u = this.v;
        this.subs.notify(this.v, J);
    }
}

function W(t) {
    const e = t.prototype;
    w(e, "subscribe", G);
    w(e, "unsubscribe", Z);
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

function st(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let d, p, w;
    let g, b;
    let v, E, A, x;
    let m, U, y, S;
    while (true) {
        if (r - s <= 10) {
            et(t, e, s, r, i);
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
            b = a;
            c = u;
            a = l;
            u = g;
            l = b;
        }
        p = i(c, h);
        if (p >= 0) {
            g = c;
            b = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = g;
            l = b;
        } else {
            w = i(u, h);
            if (w > 0) {
                g = u;
                b = l;
                u = h;
                l = f;
                h = g;
                f = b;
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
            st(t, e, x, r, i);
            r = A;
        } else {
            st(t, e, s, A, i);
            s = x;
        }
    }
}

const rt = Array.prototype;

const it = rt.push;

const nt = rt.unshift;

const ot = rt.pop;

const ct = rt.shift;

const ut = rt.splice;

const ht = rt.reverse;

const at = rt.sort;

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
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        ot.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = X.get(this);
        if (void 0 === t) return ct.call(this);
        const e = t.indexMap;
        const s = ct.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        ct.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = X.get(this);
        if (void 0 === r) return ut.apply(this, t);
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
            ut.call(c, e, s, ...r);
        } else ut.apply(c, t);
        const a = ut.apply(this, t);
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
        const e = X.get(this);
        if (void 0 === e) {
            at.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        st(this, e.indexMap, 0, s, tt);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !l(t)) t = Y;
        st(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of ft) a(dt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let pt = false;

function wt() {
    for (const t of ft) if (true !== rt[t].observing) p(rt, t, dt[t]);
}

function gt() {
    for (const t of ft) if (true === rt[t].observing) p(rt, t, lt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!pt) {
            pt = true;
            wt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = B(t.length);
        this.lenObs = void 0;
        X.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
            j(t, e);
            return;
        }
        const s = this.collection.length;
        this.indexMap = B(s);
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

F(ArrayObserver);

F(ArrayIndexObserver);

function bt(t) {
    let e = X.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const vt = (t, e) => t - e;

function Et(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = R(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(vt);
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

function At(t, e) {
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

const xt = new WeakMap;

const mt = Set.prototype;

const Ut = mt.add;

const yt = mt.clear;

const St = mt.delete;

const Ot = {
    add: Ut,
    clear: yt,
    delete: St
};

const kt = [ "add", "clear", "delete" ];

const Ct = {
    add: function(t) {
        const e = xt.get(this);
        if (void 0 === e) {
            Ut.call(this, t);
            return this;
        }
        const s = this.size;
        Ut.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = xt.get(this);
        if (void 0 === t) return yt.call(this);
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
            yt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = xt.get(this);
        if (void 0 === e) return St.call(this, t);
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
                const n = St.call(this, t);
                if (true === n) e.notify();
                return n;
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

for (const t of kt) a(Ct[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Lt = false;

function Bt() {
    for (const t of kt) if (true !== mt[t].observing) a(mt, t, {
        ...$t,
        value: Ct[t]
    });
}

function Rt() {
    for (const t of kt) if (true === mt[t].observing) a(mt, t, {
        ...$t,
        value: Ot[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Lt) {
            Lt = true;
            Bt();
        }
        this.collection = t;
        this.indexMap = B(t.size);
        this.lenObs = void 0;
        xt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
            j(t, e);
            return;
        }
        const s = this.collection.size;
        this.indexMap = B(s);
        this.subs.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

F(SetObserver);

function Pt(t) {
    let e = xt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Tt = new WeakMap;

const It = Map.prototype;

const Mt = It.set;

const jt = It.clear;

const Dt = It.delete;

const Ft = {
    set: Mt,
    clear: jt,
    delete: Dt
};

const Vt = [ "set", "clear", "delete" ];

const Nt = {
    set: function(t, e) {
        const s = Tt.get(this);
        if (void 0 === s) {
            Mt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Mt.call(this, t, e);
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
        const t = Tt.get(this);
        if (void 0 === t) return jt.call(this);
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
            jt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Tt.get(this);
        if (void 0 === e) return Dt.call(this, t);
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
                const n = Dt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            ++r;
        }
        return false;
    }
};

const Kt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Vt) a(Nt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let qt = false;

function Ht() {
    for (const t of Vt) if (true !== It[t].observing) a(It, t, {
        ...Kt,
        value: Nt[t]
    });
}

function Qt() {
    for (const t of Vt) if (true === It[t].observing) a(It, t, {
        ...Kt,
        value: Ft[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!qt) {
            qt = true;
            Ht();
        }
        this.collection = t;
        this.indexMap = B(t.size);
        this.lenObs = void 0;
        Tt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
            j(t, e);
            return;
        }
        const s = this.collection.size;
        this.indexMap = B(s);
        t.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

F(MapObserver);

function _t(t) {
    let e = Tt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function zt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Wt() {
    return p(this, "obs", new BindingObserverRecord(this));
}

function Gt(t) {
    let e;
    if (d(t)) e = bt(t); else if (t instanceof Set) e = Pt(t); else if (t instanceof Map) e = _t(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function Zt(t) {
    this.obs.add(t);
}

function Jt() {
    throw new Error(`AUR2011:handleChange`);
}

function Xt() {
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
        this.o.forEach(te, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(Yt, this);
        this.o.clear();
        this.count = 0;
    }
}

function Yt(t, e) {
    e.unsubscribe(this);
}

function te(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function ee(t) {
    const e = t.prototype;
    w(e, "observe", zt);
    w(e, "observeCollection", Gt);
    w(e, "subscribeTo", Zt);
    a(e, "obs", {
        get: Wt
    });
    w(e, "handleChange", Jt);
    w(e, "handleCollectionChange", Xt);
    return t;
}

function se(t) {
    return null == t ? ee : ee(t);
}

const re = e.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = g();
        this.A = g();
        this.U = g();
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
                throw ss();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        we = t;
        ge = 0;
        be = t.length;
        ve = 0;
        Ee = 0;
        Ae = 6291456;
        xe = "";
        me = t.charCodeAt(0);
        Ue = true;
        ye = false;
        return ke(61, void 0 === e ? 8 : e);
    }
}

var ie;

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
})(ie || (ie = {}));

function ne(t) {
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

var oe;

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
})(oe || (oe = {}));

var ce;

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
})(ce || (ce = {}));

const ue = PrimitiveLiteralExpression.$false;

const he = PrimitiveLiteralExpression.$true;

const ae = PrimitiveLiteralExpression.$null;

const le = PrimitiveLiteralExpression.$undefined;

const fe = AccessThisExpression.$this;

const de = AccessThisExpression.$parent;

var pe;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(pe || (pe = {}));

let we = "";

let ge = 0;

let be = 0;

let ve = 0;

let Ee = 0;

let Ae = 6291456;

let xe = "";

let me;

let Ue = true;

let ye = false;

function Se() {
    return we.slice(Ee, ge);
}

function Oe(t, e) {
    we = t;
    ge = 0;
    be = t.length;
    ve = 0;
    Ee = 0;
    Ae = 6291456;
    xe = "";
    me = t.charCodeAt(0);
    Ue = true;
    ye = false;
    return ke(61, void 0 === e ? 8 : e);
}

function ke(t, e) {
    if (16 === e) return new CustomExpression(we);
    if (0 === ge) {
        if (1 & e) return De();
        Ne();
        if (4194304 & Ae) throw Ze();
    }
    Ue = 513 > t;
    ye = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & Ae) {
        const t = ms[63 & Ae];
        Ne();
        r = new UnaryExpression(t, ke(514, e));
        Ue = false;
    } else {
        t: switch (Ae) {
          case 12294:
            i = ve;
            Ue = false;
            do {
                Ne();
                ++i;
                switch (Ae) {
                  case 65545:
                    Ne();
                    if (0 === (12288 & Ae)) throw Xe();
                    break;

                  case 10:
                  case 11:
                    throw Xe();

                  case 2162700:
                    ye = true;
                    Ne();
                    if (0 === (12288 & Ae)) {
                        r = 0 === i ? fe : 1 === i ? de : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & Ae) {
                        r = 0 === i ? fe : 1 === i ? de : new AccessThisExpression(i);
                        break t;
                    }
                    throw Ye();
                }
            } while (12294 === Ae);

          case 4096:
            {
                const t = xe;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Ue = !ye;
                Ne();
                if (We(49)) {
                    if (524296 === Ae) throw As();
                    const e = ye;
                    const s = ve;
                    ++ve;
                    const i = ke(62, 0);
                    ye = e;
                    ve = s;
                    Ue = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw xs();

          case 11:
            throw Je();

          case 12292:
            Ue = false;
            Ne();
            switch (ve) {
              case 0:
                r = fe;
                break;

              case 1:
                r = de;
                break;

              default:
                r = new AccessThisExpression(ve);
                break;
            }
            break;

          case 2688007:
            r = Te(e);
            break;

          case 2688016:
            r = we.search(/\s+of\s+/) > ge ? Ce() : Ie(e);
            break;

          case 524296:
            r = je(e);
            break;

          case 2163758:
            r = new TemplateExpression([ xe ]);
            Ue = false;
            Ne();
            break;

          case 2163759:
            r = Fe(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(xe);
            Ue = false;
            Ne();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = ms[63 & Ae];
            Ue = false;
            Ne();
            break;

          default:
            if (ge >= be) throw ts(); else throw es();
        }
        if (2 & e) return Me(r);
        if (514 < t) return r;
        if (10 === Ae || 11 === Ae) throw Xe();
        if (1793 === r.$kind) switch (Ae) {
          case 2162700:
            ye = true;
            Ue = false;
            Ne();
            if (0 === (13312 & Ae)) throw ps();
            if (12288 & Ae) {
                r = new AccessScopeExpression(xe, r.ancestor);
                Ne();
            } else if (2688007 === Ae) r = new CallFunctionExpression(r, $e(), true); else if (2688016 === Ae) r = Le(r, true); else throw ws();
            break;

          case 65545:
            Ue = !ye;
            Ne();
            if (0 === (12288 & Ae)) throw Xe();
            r = new AccessScopeExpression(xe, r.ancestor);
            Ne();
            break;

          case 10:
          case 11:
            throw Xe();

          case 2688007:
            r = new CallFunctionExpression(r, $e(), s);
            break;

          case 2688016:
            r = Le(r, s);
            break;

          case 2163758:
            r = Ve(r);
            break;

          case 2163759:
            r = Fe(e, r, true);
            break;
        }
        while ((65536 & Ae) > 0) switch (Ae) {
          case 2162700:
            r = Be(r);
            break;

          case 65545:
            Ne();
            if (0 === (12288 & Ae)) throw Xe();
            r = Re(r, false);
            break;

          case 10:
          case 11:
            throw Xe();

          case 2688007:
            if (10082 === r.$kind) r = new CallScopeExpression(r.name, $e(), r.ancestor, false); else if (9323 === r.$kind) r = new CallMemberExpression(r.object, r.name, $e(), r.optional, false); else r = new CallFunctionExpression(r, $e(), false);
            break;

          case 2688016:
            r = Le(r, false);
            break;

          case 2163758:
            if (ye) throw ws();
            r = Ve(r);
            break;

          case 2163759:
            if (ye) throw ws();
            r = Fe(e, r, true);
            break;
        }
    }
    if (10 === Ae || 11 === Ae) throw Xe();
    if (513 < t) return r;
    while ((262144 & Ae) > 0) {
        const s = Ae;
        if ((960 & s) <= t) break;
        Ne();
        r = new BinaryExpression(ms[63 & s], r, ke(960 & s, e));
        Ue = false;
    }
    if (63 < t) return r;
    if (We(6291477)) {
        const t = ke(62, e);
        Ge(6291476);
        r = new ConditionalExpression(r, t, ke(62, e));
        Ue = false;
    }
    if (62 < t) return r;
    if (We(4194348)) {
        if (!Ue) throw rs();
        r = new AssignExpression(r, ke(62, e));
    }
    if (61 < t) return r;
    while (We(6291479)) {
        if (6291456 === Ae) throw is();
        const t = xe;
        Ne();
        const s = new Array;
        while (We(6291476)) s.push(ke(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (We(6291478)) {
        if (6291456 === Ae) throw ns();
        const t = xe;
        Ne();
        const s = new Array;
        while (We(6291476)) s.push(ke(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== Ae) {
        if ((1 & e) > 0 && 7340045 === Ae) return r;
        if ("of" === Se()) throw os();
        throw es();
    }
    return r;
}

function Ce() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Ne();
        switch (Ae) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Se();
            break;

          default:
            throw ds();
        }
    }
    Ge(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(fe, s), new AccessKeyedExpression(fe, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function $e() {
    const t = ye;
    Ne();
    const e = [];
    while (7340046 !== Ae) {
        e.push(ke(62, 0));
        if (!We(6291471)) break;
    }
    Ge(7340046);
    Ue = false;
    ye = t;
    return e;
}

function Le(t, e) {
    const s = ye;
    Ne();
    t = new AccessKeyedExpression(t, ke(62, 0), e);
    Ge(7340051);
    Ue = !s;
    ye = s;
    return t;
}

function Be(t) {
    ye = true;
    Ue = false;
    Ne();
    if (0 === (13312 & Ae)) throw ps();
    if (12288 & Ae) return Re(t, true);
    if (2688007 === Ae) if (10082 === t.$kind) return new CallScopeExpression(t.name, $e(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, $e(), t.optional, true); else return new CallFunctionExpression(t, $e(), true);
    if (2688016 === Ae) return Le(t, true);
    throw ws();
}

function Re(t, e) {
    const s = xe;
    switch (Ae) {
      case 2162700:
        {
            ye = true;
            Ue = false;
            const r = ge;
            const i = Ee;
            const n = Ae;
            const o = me;
            const c = xe;
            const u = Ue;
            const h = ye;
            Ne();
            if (0 === (13312 & Ae)) throw ps();
            if (2688007 === Ae) return new CallMemberExpression(t, s, $e(), e, true);
            ge = r;
            Ee = i;
            Ae = n;
            me = o;
            xe = c;
            Ue = u;
            ye = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Ue = false;
        return new CallMemberExpression(t, s, $e(), e, false);

      default:
        Ue = !ye;
        Ne();
        return new AccessMemberExpression(t, s, e);
    }
}

var Pe;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(Pe || (Pe = {}));

function Te(t) {
    Ne();
    const e = ge;
    const s = Ee;
    const r = Ae;
    const i = me;
    const n = xe;
    const o = Ue;
    const c = ye;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === Ae) {
            Ne();
            if (4096 !== Ae) throw Xe();
            u.push(new BindingIdentifier(xe));
            Ne();
            if (6291471 === Ae) throw Es();
            if (7340046 !== Ae) throw Je();
            Ne();
            if (49 !== Ae) throw Je();
            Ne();
            const t = ye;
            const e = ve;
            ++ve;
            const s = ke(62, 0);
            ye = t;
            ve = e;
            Ue = false;
            return new ArrowFunction(u, s, true);
        }
        switch (Ae) {
          case 4096:
            u.push(new BindingIdentifier(xe));
            Ne();
            break;

          case 7340046:
            Ne();
            break t;

          case 524296:
          case 2688016:
            Ne();
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
            Ne();
            h = 2;
            break;
        }
        switch (Ae) {
          case 6291471:
            Ne();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Ne();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw gs();
            Ne();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === Ae) {
        if (1 === h) {
            Ne();
            if (524296 === Ae) throw As();
            const t = ye;
            const e = ve;
            ++ve;
            const s = ke(62, 0);
            ye = t;
            ve = e;
            Ue = false;
            return new ArrowFunction(u, s);
        }
        throw gs();
    } else if (1 === h && 0 === u.length) throw ls(49);
    if (a) switch (h) {
      case 2:
        throw gs();

      case 3:
        throw bs();

      case 4:
        throw vs();
    }
    ge = e;
    Ee = s;
    Ae = r;
    me = i;
    xe = n;
    Ue = o;
    ye = c;
    const l = ye;
    const f = ke(62, t);
    ye = l;
    Ge(7340046);
    if (49 === Ae) switch (h) {
      case 2:
        throw gs();

      case 3:
        throw bs();

      case 4:
        throw vs();
    }
    return f;
}

function Ie(t) {
    const e = ye;
    Ne();
    const s = new Array;
    while (7340051 !== Ae) if (We(6291471)) {
        s.push(le);
        if (7340051 === Ae) break;
    } else {
        s.push(ke(62, ~2 & t));
        if (We(6291471)) {
            if (7340051 === Ae) break;
        } else break;
    }
    ye = e;
    Ge(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Ue = false;
        return new ArrayLiteralExpression(s);
    }
}

function Me(t) {
    if (0 === (65536 & t.$kind)) throw cs();
    if (4204592 !== Ae) throw cs();
    Ne();
    const e = t;
    const s = ke(61, 0);
    return new ForOfStatement(e, s);
}

function je(t) {
    const e = ye;
    const s = new Array;
    const r = new Array;
    Ne();
    while (7340045 !== Ae) {
        s.push(xe);
        if (49152 & Ae) {
            Ne();
            Ge(6291476);
            r.push(ke(62, ~2 & t));
        } else if (12288 & Ae) {
            const e = me;
            const s = Ae;
            const i = ge;
            Ne();
            if (We(6291476)) r.push(ke(62, ~2 & t)); else {
                me = e;
                Ae = s;
                ge = i;
                r.push(ke(515, ~2 & t));
            }
        } else throw us();
        if (7340045 !== Ae) Ge(6291471);
    }
    ye = e;
    Ge(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Ue = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function De() {
    const t = [];
    const e = [];
    const s = be;
    let r = "";
    while (ge < s) {
        switch (me) {
          case 36:
            if (123 === we.charCodeAt(ge + 1)) {
                t.push(r);
                r = "";
                ge += 2;
                me = we.charCodeAt(ge);
                Ne();
                const s = ke(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(ne(Ke()));
            break;

          default:
            r += String.fromCharCode(me);
        }
        Ke();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Fe(t, e, s) {
    const r = ye;
    const i = [ xe ];
    Ge(2163759);
    const n = [ ke(62, t) ];
    while (2163758 !== (Ae = ze())) {
        i.push(xe);
        Ge(2163759);
        n.push(ke(62, t));
    }
    i.push(xe);
    Ue = false;
    ye = r;
    if (s) {
        Ne();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Ne();
        return new TemplateExpression(i, n);
    }
}

function Ve(t) {
    Ue = false;
    const e = [ xe ];
    Ne();
    return new TaggedTemplateExpression(e, e, t);
}

function Ne() {
    while (ge < be) {
        Ee = ge;
        if (null != (Ae = $s[me]())) return;
    }
    Ae = 6291456;
}

function Ke() {
    return me = we.charCodeAt(++ge);
}

function qe() {
    while (Cs[Ke()]) ;
    const t = Us[xe = Se()];
    return void 0 === t ? 4096 : t;
}

function He(t) {
    let e = me;
    if (false === t) {
        do {
            e = Ke();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            xe = parseInt(Se(), 10);
            return 32768;
        }
        e = Ke();
        if (ge >= be) {
            xe = parseInt(Se().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Ke();
    } while (e <= 57 && e >= 48); else me = we.charCodeAt(--ge);
    xe = parseFloat(Se());
    return 32768;
}

function Qe() {
    const t = me;
    Ke();
    let e = 0;
    const s = new Array;
    let r = ge;
    while (me !== t) if (92 === me) {
        s.push(we.slice(r, ge));
        Ke();
        e = ne(me);
        Ke();
        s.push(String.fromCharCode(e));
        r = ge;
    } else if (ge >= be) throw hs(); else Ke();
    const i = we.slice(r, ge);
    Ke();
    s.push(i);
    const n = s.join("");
    xe = n;
    return 16384;
}

function _e() {
    let t = true;
    let e = "";
    while (96 !== Ke()) if (36 === me) if (ge + 1 < be && 123 === we.charCodeAt(ge + 1)) {
        ge++;
        t = false;
        break;
    } else e += "$"; else if (92 === me) e += String.fromCharCode(ne(Ke())); else {
        if (ge >= be) throw as();
        e += String.fromCharCode(me);
    }
    Ke();
    xe = e;
    if (t) return 2163758;
    return 2163759;
}

function ze() {
    if (ge >= be) throw as();
    ge--;
    return _e();
}

function We(t) {
    if (Ae === t) {
        Ne();
        return true;
    }
    return false;
}

function Ge(t) {
    if (Ae === t) Ne(); else throw ls(t);
}

function Ze() {
    return new Error(`AUR0151:${we}`);
}

function Je() {
    return new Error(`AUR0152:${we}`);
}

function Xe() {
    return new Error(`AUR0153:${we}`);
}

function Ye() {
    return new Error(`AUR0154:${we}`);
}

function ts() {
    return new Error(`AUR0155:${we}`);
}

function es() {
    return new Error(`AUR0156:${we}`);
}

function ss() {
    return new Error(`AUR0157`);
}

function rs() {
    return new Error(`AUR0158:${we}`);
}

function is() {
    return new Error(`AUR0159:${we}`);
}

function ns() {
    return new Error(`AUR0160:${we}`);
}

function os() {
    return new Error(`AUR0161:${we}`);
}

function cs() {
    return new Error(`AUR0163:${we}`);
}

function us() {
    return new Error(`AUR0164:${we}`);
}

function hs() {
    return new Error(`AUR0165:${we}`);
}

function as() {
    return new Error(`AUR0166:${we}`);
}

function ls(t) {
    return new Error(`AUR0167:${we}<${ms[63 & t]}`);
}

const fs = () => {
    throw new Error(`AUR0168:${we}`);
};

fs.notMapped = true;

function ds() {
    return new Error(`AUR0170:${we}`);
}

function ps() {
    return new Error(`AUR0171:${we}`);
}

function ws() {
    return new Error(`AUR0172:${we}`);
}

function gs() {
    return new Error(`AUR0173:${we}`);
}

function bs() {
    return new Error(`AUR0174:${we}`);
}

function vs() {
    return new Error(`AUR0175:${we}`);
}

function Es() {
    return new Error(`AUR0176:${we}`);
}

function As() {
    return new Error(`AUR0178:${we}`);
}

function xs() {
    return new Error(`AUR0179:${we}`);
}

const ms = [ ue, he, ae, le, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Us = Object.assign(Object.create(null), {
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

const ys = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Ss(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function Os(t) {
    return () => {
        Ke();
        return t;
    };
}

const ks = new Set;

Ss(null, ks, ys.AsciiIdPart, true);

const Cs = new Uint8Array(65535);

Ss(Cs, null, ys.IdStart, 1);

Ss(Cs, null, ys.Digit, 1);

const $s = new Array(65535);

$s.fill(fs, 0, 65535);

Ss($s, null, ys.Skip, (() => {
    Ke();
    return null;
}));

Ss($s, null, ys.IdStart, qe);

Ss($s, null, ys.Digit, (() => He(false)));

$s[34] = $s[39] = () => Qe();

$s[96] = () => _e();

$s[33] = () => {
    if (61 !== Ke()) return 131117;
    if (61 !== Ke()) return 6553948;
    Ke();
    return 6553950;
};

$s[61] = () => {
    if (62 === Ke()) {
        Ke();
        return 49;
    }
    if (61 !== me) return 4194348;
    if (61 !== Ke()) return 6553947;
    Ke();
    return 6553949;
};

$s[38] = () => {
    if (38 !== Ke()) return 6291478;
    Ke();
    return 6553882;
};

$s[124] = () => {
    if (124 !== Ke()) return 6291479;
    Ke();
    return 6553817;
};

$s[63] = () => {
    if (46 === Ke()) {
        const t = we.charCodeAt(ge + 1);
        if (t <= 48 || t >= 57) {
            Ke();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== me) return 6291477;
    Ke();
    return 6553752;
};

$s[46] = () => {
    if (Ke() <= 57 && me >= 48) return He(true);
    if (46 === me) {
        if (46 !== Ke()) return 10;
        Ke();
        return 11;
    }
    return 65545;
};

$s[60] = () => {
    if (61 !== Ke()) return 6554015;
    Ke();
    return 6554017;
};

$s[62] = () => {
    if (61 !== Ke()) return 6554016;
    Ke();
    return 6554018;
};

$s[37] = Os(6554154);

$s[40] = Os(2688007);

$s[41] = Os(7340046);

$s[42] = Os(6554153);

$s[43] = Os(2490853);

$s[44] = Os(6291471);

$s[45] = Os(2490854);

$s[47] = Os(6554155);

$s[58] = Os(6291476);

$s[91] = Os(2688016);

$s[93] = Os(7340051);

$s[123] = Os(524296);

$s[125] = Os(7340045);

let Ls = null;

const Bs = [];

let Rs = false;

function Ps() {
    Rs = false;
}

function Ts() {
    Rs = true;
}

function Is() {
    return Ls;
}

function Ms(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Ls) {
        Ls = t;
        Bs[0] = Ls;
        Rs = true;
        return;
    }
    if (Ls === t) throw new Error(`AUR0207`);
    Bs.push(t);
    Ls = t;
    Rs = true;
}

function js(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Ls !== t) throw new Error(`AUR0209`);
    Bs.pop();
    Ls = Bs.length > 0 ? Bs[Bs.length - 1] : null;
    Rs = null != Ls;
}

const Ds = Object.freeze({
    get current() {
        return Ls;
    },
    get connecting() {
        return Rs;
    },
    enter: Ms,
    exit: js,
    pause: Ps,
    resume: Ts
});

const Fs = Reflect.get;

const Vs = Object.prototype.toString;

const Ns = new WeakMap;

function Ks(t) {
    switch (Vs.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const qs = "__raw__";

function Hs(t) {
    return Ks(t) ? Qs(t) : t;
}

function Qs(t) {
    return Ns.get(t) ?? Gs(t);
}

function _s(t) {
    return t[qs] ?? t;
}

function zs(t) {
    return Ks(t) && t[qs] || t;
}

function Ws(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Gs(t) {
    const e = d(t) ? Js : t instanceof Map || t instanceof Set ? Ar : Zs;
    const s = new Proxy(t, e);
    Ns.set(t, s);
    return s;
}

const Zs = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = Is();
        if (!Rs || Ws(e) || null == r) return Fs(t, e, s);
        r.observe(t, e);
        return Hs(Fs(t, e, s));
    }
};

const Js = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = Is();
        if (!Rs || Ws(e) || null == r) return Fs(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Xs;

          case "includes":
            return er;

          case "indexOf":
            return sr;

          case "lastIndexOf":
            return rr;

          case "every":
            return Ys;

          case "filter":
            return tr;

          case "find":
            return nr;

          case "findIndex":
            return ir;

          case "flat":
            return or;

          case "flatMap":
            return cr;

          case "join":
            return ur;

          case "push":
            return ar;

          case "pop":
            return hr;

          case "reduce":
            return vr;

          case "reduceRight":
            return Er;

          case "reverse":
            return pr;

          case "shift":
            return lr;

          case "unshift":
            return fr;

          case "slice":
            return br;

          case "splice":
            return dr;

          case "some":
            return wr;

          case "sort":
            return gr;

          case "keys":
            return Cr;

          case "values":
          case Symbol.iterator:
            return $r;

          case "entries":
            return Lr;
        }
        r.observe(t, e);
        return Hs(Fs(t, e, s));
    },
    ownKeys(t) {
        Is()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Xs(t, e) {
    const s = _s(this);
    const r = s.map(((s, r) => zs(t.call(e, Hs(s), r, this))));
    Is()?.observeCollection(s);
    return Hs(r);
}

function Ys(t, e) {
    const s = _s(this);
    const r = s.every(((s, r) => t.call(e, Hs(s), r, this)));
    Is()?.observeCollection(s);
    return r;
}

function tr(t, e) {
    const s = _s(this);
    const r = s.filter(((s, r) => zs(t.call(e, Hs(s), r, this))));
    Is()?.observeCollection(s);
    return Hs(r);
}

function er(t) {
    const e = _s(this);
    const s = e.includes(zs(t));
    Is()?.observeCollection(e);
    return s;
}

function sr(t) {
    const e = _s(this);
    const s = e.indexOf(zs(t));
    Is()?.observeCollection(e);
    return s;
}

function rr(t) {
    const e = _s(this);
    const s = e.lastIndexOf(zs(t));
    Is()?.observeCollection(e);
    return s;
}

function ir(t, e) {
    const s = _s(this);
    const r = s.findIndex(((s, r) => zs(t.call(e, Hs(s), r, this))));
    Is()?.observeCollection(s);
    return r;
}

function nr(t, e) {
    const s = _s(this);
    const r = s.find(((e, s) => t(Hs(e), s, this)), e);
    Is()?.observeCollection(s);
    return Hs(r);
}

function or() {
    const t = _s(this);
    Is()?.observeCollection(t);
    return Hs(t.flat());
}

function cr(t, e) {
    const s = _s(this);
    Is()?.observeCollection(s);
    return Qs(s.flatMap(((s, r) => Hs(t.call(e, Hs(s), r, this)))));
}

function ur(t) {
    const e = _s(this);
    Is()?.observeCollection(e);
    return e.join(t);
}

function hr() {
    return Hs(_s(this).pop());
}

function ar(...t) {
    return _s(this).push(...t);
}

function lr() {
    return Hs(_s(this).shift());
}

function fr(...t) {
    return _s(this).unshift(...t);
}

function dr(...t) {
    return Hs(_s(this).splice(...t));
}

function pr(...t) {
    const e = _s(this);
    const s = e.reverse();
    Is()?.observeCollection(e);
    return Hs(s);
}

function wr(t, e) {
    const s = _s(this);
    const r = s.some(((s, r) => zs(t.call(e, Hs(s), r, this))));
    Is()?.observeCollection(s);
    return r;
}

function gr(t) {
    const e = _s(this);
    const s = e.sort(t);
    Is()?.observeCollection(e);
    return Hs(s);
}

function br(t, e) {
    const s = _s(this);
    Is()?.observeCollection(s);
    return Qs(s.slice(t, e));
}

function vr(t, e) {
    const s = _s(this);
    const r = s.reduce(((e, s, r) => t(e, Hs(s), r, this)), e);
    Is()?.observeCollection(s);
    return Hs(r);
}

function Er(t, e) {
    const s = _s(this);
    const r = s.reduceRight(((e, s, r) => t(e, Hs(s), r, this)), e);
    Is()?.observeCollection(s);
    return Hs(r);
}

const Ar = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = Is();
        if (!Rs || Ws(e) || null == r) return Fs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Or;

          case "delete":
            return kr;

          case "forEach":
            return xr;

          case "add":
            if (t instanceof Set) return Sr;
            break;

          case "get":
            if (t instanceof Map) return Ur;
            break;

          case "set":
            if (t instanceof Map) return yr;
            break;

          case "has":
            return mr;

          case "keys":
            return Cr;

          case "values":
            return $r;

          case "entries":
            return Lr;

          case Symbol.iterator:
            return t instanceof Map ? Lr : $r;
        }
        return Hs(Fs(t, e, s));
    }
};

function xr(t, e) {
    const s = _s(this);
    Is()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Hs(s), Hs(r), this);
    }));
}

function mr(t) {
    const e = _s(this);
    Is()?.observeCollection(e);
    return e.has(zs(t));
}

function Ur(t) {
    const e = _s(this);
    Is()?.observeCollection(e);
    return Hs(e.get(zs(t)));
}

function yr(t, e) {
    return Hs(_s(this).set(zs(t), zs(e)));
}

function Sr(t) {
    return Hs(_s(this).add(zs(t)));
}

function Or() {
    return Hs(_s(this).clear());
}

function kr(t) {
    return Hs(_s(this).delete(zs(t)));
}

function Cr() {
    const t = _s(this);
    Is()?.observeCollection(t);
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
                value: Hs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function $r() {
    const t = _s(this);
    Is()?.observeCollection(t);
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
                value: Hs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Lr() {
    const t = _s(this);
    Is()?.observeCollection(t);
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
                value: [ Hs(s[0]), Hs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Br = Object.freeze({
    getProxy: Qs,
    getRaw: _s,
    wrap: Hs,
    unwrap: zs,
    rawKey: qs
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
                c.setValue(t);
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
    setValue(t) {
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
        Rr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Rr);
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
            Ms(this);
            return this.v = zs(this.$get.call(this.up ? Hs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            js(this);
        }
    }
}

se(ComputedObserver);

F(ComputedObserver);

H(ComputedObserver);

let Rr;

const Pr = e.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Tr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Ir = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Tr.disabled) return;
            if (++this.C < Tr.timeoutsPerCheck) return;
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
        if (Tr.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Ir);
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
    setValue(t, e, s) {
        e[s] = t;
    }
}

let Mr;

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
        Mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Mr);
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
                    this.setValue(t);
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
        Mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Mr);
    }
}

F(SetterObserver);

F(SetterNotifier);

H(SetterObserver);

H(SetterNotifier);

const jr = new PropertyAccessor;

const Dr = e.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Fr = e.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => {
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
        return jr;
    }
    getAccessor() {
        return jr;
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
        return jr;
    }
    getArrayObserver(t) {
        return bt(t);
    }
    getMapObserver(t) {
        return _t(t);
    }
    getSetObserver(t) {
        return Pt(t);
    }
    createObserver(t, e) {
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        if (this.B.handles(t, e, this)) return this.B.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (d(t)) return bt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return _t(t).getLengthObserver(); else if (t instanceof Set) return Pt(t).getLengthObserver();
            break;

          default:
            if (d(t) && n(e)) return bt(t).getIndexObserver(Number(e));
            break;
        }
        let s = Kr(t, e);
        if (void 0 === s) {
            let r = Nr(t);
            while (null !== r) {
                s = Kr(r, e);
                if (void 0 === s) r = Nr(r); else break;
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
        if (this.L.length > 0) for (const r of this.L) {
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

ObserverLocator.inject = [ Pr, Fr ];

function Vr(t) {
    let e;
    if (d(t)) e = bt(t); else if (t instanceof Map) e = _t(t); else if (t instanceof Set) e = Pt(t);
    return e;
}

const Nr = Object.getPrototypeOf;

const Kr = Object.getOwnPropertyDescriptor;

const qr = e.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Dr ];
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
            Ms(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            js(this);
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

se(Effect);

function Hr(t) {
    if (void 0 === t.$observers) a(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Qr = {};

function _r(t, e, s) {
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
        let o = Qr;
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
            const s = zr(this, e, n, o, c);
            Is()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            zr(this, e, n, o, c).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return zr(s, e, n, o, c);
        };
        if (i) a(t.prototype, e, s); else return s;
    }
}

function zr(t, e, s, r, i) {
    const n = Hr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Qr ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, $ as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, ie as Char, C as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, Ds as ConnectableSwitcher, CustomExpression, k as DelegationStrategy, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Tr as DirtyCheckSettings, v as ExpressionKind, pe as ExpressionType, FlushQueue, ForOfStatement, HtmlLiteralExpression, y as ICoercionConfiguration, Pr as IDirtyChecker, re as IExpressionParser, Fr as INodeObserverLocator, qr as IObservation, Dr as IObserverLocator, b as ISignaler, Interpolation, S as LifecycleFlags, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, OverrideContext, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Br as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, ValueConverterExpression, Et as applyMutationsToIndices, M as batch, R as cloneIndexMap, se as connectable, L as copyIndexMap, B as createIndexMap, gt as disableArrayObservation, Qt as disableMapObservation, Rt as disableSetObservation, wt as enableArrayObservation, Ht as enableMapObservation, Bt as enableSetObservation, Vr as getCollectionObserver, P as isIndexMap, _r as observable, Oe as parseExpression, F as subscriberCollection, At as synchronizeIndices, H as withFlushQueue };

