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
            const t = e.get?.(g);
            const s = i.length;
            let r = 0;
            for (;r < s; ++r) t?.addSignalListener(i[r], e);
        }
        if (this.expression.hasBind) this.expression.bind(t, e);
    }
    unbind(t, e) {
        const s = e.getConverter?.(this.name);
        if (void 0 === s?.signals) return;
        const r = e.get(g);
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
        const n = y(e?.strictFnCall, i, this.name);
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
        const n = y(e?.strictFnCall, r, this.name);
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

const U = Object.prototype.toString;

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
        switch (U.call(e)) {
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
            throw new Error(`Cannot count ${U.call(e)}`);
        }
    }
    iterate(t, e, s) {
        switch (U.call(e)) {
          case "[object Array]":
            return S(e, s);

          case "[object Map]":
            return O(e, s);

          case "[object Set]":
            return k(e, s);

          case "[object Number]":
            return C(e, s);

          case "[object Null]":
            return;

          case "[object Undefined]":
            return;

          default:
            throw new Error(`Cannot iterate over ${U.call(e)}`);
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

function y(t, e, s) {
    const r = null == e ? null : e[s];
    if (l(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function S(t, e) {
    for (let s = 0, r = t.length; s < r; ++s) e(t, s, t[s]);
}

function O(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.entries()) s[++r] = e;
    S(s, e);
}

function k(t, e) {
    const s = Array(t.size);
    let r = -1;
    for (const e of t.keys()) s[++r] = e;
    S(s, e);
}

function C(t, e) {
    const s = Array(t);
    for (let e = 0; e < t; ++e) s[e] = e;
    S(s, e);
}

const $ = e.createInterface("ICoercionConfiguration");

var L;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["fromBind"] = 1] = "fromBind";
    t[t["fromUnbind"] = 2] = "fromUnbind";
    t[t["dispose"] = 4] = "dispose";
})(L || (L = {}));

var B;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Subscriber0"] = 1] = "Subscriber0";
    t[t["Subscriber1"] = 2] = "Subscriber1";
    t[t["Subscriber2"] = 4] = "Subscriber2";
    t[t["SubscribersRest"] = 8] = "SubscribersRest";
    t[t["Any"] = 15] = "Any";
})(B || (B = {}));

var R;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["capturing"] = 1] = "capturing";
    t[t["bubbling"] = 2] = "bubbling";
})(R || (R = {}));

var P;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(P || (P = {}));

var T;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(T || (T = {}));

function j(t, e, s) {
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

function I(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function M(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function D(t) {
    return d(t) && true === t.isIndexMap;
}

let F = new Map;

let V = false;

function N(t) {
    const e = F;
    const s = F = new Map;
    V = true;
    try {
        t();
    } finally {
        F = null;
        V = false;
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
            F = e;
        }
    }
}

function K(t, e) {
    if (!F.has(t)) F.set(t, [ 2, e ]);
}

function q(t, e, s) {
    const r = F.get(t);
    if (void 0 === r) F.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function H(t) {
    return null == t ? Q : Q(t);
}

function Q(t) {
    const e = t.prototype;
    a(e, "subs", {
        get: _
    });
    w(e, "subscribe", z);
    w(e, "unsubscribe", W);
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
        if (V) {
            q(this, t, e);
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

function _() {
    return p(this, "subs", new SubscriberRecord);
}

function z(t) {
    return this.subs.add(t);
}

function W(t) {
    return this.subs.remove(t);
}

function G(t) {
    return null == t ? Z : Z(t);
}

function Z(t) {
    const e = t.prototype;
    a(e, "queue", {
        get: J
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
            this.i.forEach(X);
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

function J() {
    return FlushQueue.instance;
}

function X(t, e, s) {
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
        st = this.u;
        this.u = this.v;
        this.subs.notify(this.v, st);
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
        st = this.u;
        this.u = this.v;
        this.subs.notify(this.v, st);
    }
}

function Y(t) {
    const e = t.prototype;
    w(e, "subscribe", tt);
    w(e, "unsubscribe", et);
    G(t);
    H(t);
}

function tt(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function et(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

Y(CollectionLengthObserver);

Y(CollectionSizeObserver);

let st;

const rt = new WeakMap;

function it(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function nt(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function ot(t, e, s, r, i) {
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

function ct(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let d, p, w;
    let b, g;
    let v, E, A, x;
    let m, U, y, S;
    while (true) {
        if (r - s <= 10) {
            ot(t, e, s, r, i);
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
            ct(t, e, x, r, i);
            r = A;
        } else {
            ct(t, e, s, A, i);
            s = x;
        }
    }
}

const ut = Array.prototype;

const ht = ut.push;

const at = ut.unshift;

const lt = ut.pop;

const ft = ut.shift;

const dt = ut.splice;

const pt = ut.reverse;

const wt = ut.sort;

const bt = {
    push: ht,
    unshift: at,
    pop: lt,
    shift: ft,
    splice: dt,
    reverse: pt,
    sort: wt
};

const gt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const vt = {
    push: function(...t) {
        const e = rt.get(this);
        if (void 0 === e) return ht.apply(this, t);
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
        const e = rt.get(this);
        if (void 0 === e) return at.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        at.apply(e.indexMap, r);
        const n = at.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = rt.get(this);
        if (void 0 === t) return lt.call(this);
        const e = t.indexMap;
        const s = lt.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        lt.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = rt.get(this);
        if (void 0 === t) return ft.call(this);
        const e = t.indexMap;
        const s = ft.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        ft.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = rt.get(this);
        if (void 0 === r) return dt.apply(this, t);
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
            dt.call(c, e, s, ...r);
        } else dt.apply(c, t);
        const a = dt.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = rt.get(this);
        if (void 0 === t) {
            pt.call(this);
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
        const e = rt.get(this);
        if (void 0 === e) {
            wt.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        ct(this, e.indexMap, 0, s, nt);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !l(t)) t = it;
        ct(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of gt) a(vt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Et = false;

function At() {
    for (const t of gt) if (true !== ut[t].observing) p(ut, t, vt[t]);
}

function xt() {
    for (const t of gt) if (true === ut[t].observing) p(ut, t, bt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!Et) {
            Et = true;
            At();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = I(t.length);
        this.lenObs = void 0;
        rt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (V) {
            K(t, e);
            return;
        }
        const s = this.collection.length;
        this.indexMap = I(s);
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

H(ArrayObserver);

H(ArrayIndexObserver);

function mt(t) {
    let e = rt.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const Ut = (t, e) => t - e;

function yt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = M(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(Ut);
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

function St(t, e) {
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

const Ot = new WeakMap;

const kt = Set.prototype;

const Ct = kt.add;

const $t = kt.clear;

const Lt = kt.delete;

const Bt = {
    add: Ct,
    clear: $t,
    delete: Lt
};

const Rt = [ "add", "clear", "delete" ];

const Pt = {
    add: function(t) {
        const e = Ot.get(this);
        if (void 0 === e) {
            Ct.call(this, t);
            return this;
        }
        const s = this.size;
        Ct.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Ot.get(this);
        if (void 0 === t) return $t.call(this);
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
            $t.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Ot.get(this);
        if (void 0 === e) return Lt.call(this, t);
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
                const n = Lt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            r++;
        }
        return false;
    }
};

const Tt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Rt) a(Pt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let jt = false;

function It() {
    for (const t of Rt) if (true !== kt[t].observing) a(kt, t, {
        ...Tt,
        value: Pt[t]
    });
}

function Mt() {
    for (const t of Rt) if (true === kt[t].observing) a(kt, t, {
        ...Tt,
        value: Bt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!jt) {
            jt = true;
            It();
        }
        this.collection = t;
        this.indexMap = I(t.size);
        this.lenObs = void 0;
        Ot.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (V) {
            K(t, e);
            return;
        }
        const s = this.collection.size;
        this.indexMap = I(s);
        this.subs.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

H(SetObserver);

function Dt(t) {
    let e = Ot.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Ft = new WeakMap;

const Vt = Map.prototype;

const Nt = Vt.set;

const Kt = Vt.clear;

const qt = Vt.delete;

const Ht = {
    set: Nt,
    clear: Kt,
    delete: qt
};

const Qt = [ "set", "clear", "delete" ];

const _t = {
    set: function(t, e) {
        const s = Ft.get(this);
        if (void 0 === s) {
            Nt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Nt.call(this, t, e);
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
        const t = Ft.get(this);
        if (void 0 === t) return Kt.call(this);
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
            Kt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Ft.get(this);
        if (void 0 === e) return qt.call(this, t);
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
                const n = qt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            ++r;
        }
        return false;
    }
};

const zt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Qt) a(_t[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Wt = false;

function Gt() {
    for (const t of Qt) if (true !== Vt[t].observing) a(Vt, t, {
        ...zt,
        value: _t[t]
    });
}

function Zt() {
    for (const t of Qt) if (true === Vt[t].observing) a(Vt, t, {
        ...zt,
        value: Ht[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Wt) {
            Wt = true;
            Gt();
        }
        this.collection = t;
        this.indexMap = I(t.size);
        this.lenObs = void 0;
        Ft.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (V) {
            K(t, e);
            return;
        }
        const s = this.collection.size;
        this.indexMap = I(s);
        t.notifyCollection(e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

H(MapObserver);

function Jt(t) {
    let e = Ft.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Xt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Yt() {
    return p(this, "obs", new BindingObserverRecord(this));
}

function te(t) {
    let e;
    if (d(t)) e = mt(t); else if (t instanceof Set) e = Dt(t); else if (t instanceof Map) e = Jt(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function ee(t) {
    this.obs.add(t);
}

function se() {
    throw new Error(`AUR2011:handleChange`);
}

function re() {
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
        this.o.forEach(ne, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(ie, this);
        this.o.clear();
        this.count = 0;
    }
}

function ie(t, e) {
    e.unsubscribe(this);
}

function ne(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function oe(t) {
    const e = t.prototype;
    w(e, "observe", Xt);
    w(e, "observeCollection", te);
    w(e, "subscribeTo", ee);
    a(e, "obs", {
        get: Yt
    });
    w(e, "handleChange", se);
    w(e, "handleCollectionChange", re);
    return t;
}

function ce(t) {
    return null == t ? oe : oe(t);
}

const ue = e.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

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
                throw cs();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        Ae = t;
        xe = 0;
        me = t.length;
        Ue = 0;
        ye = 0;
        Se = 6291456;
        Oe = "";
        ke = t.charCodeAt(0);
        Ce = true;
        $e = false;
        return Re(61, void 0 === e ? 8 : e);
    }
}

var he;

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
})(he || (he = {}));

function ae(t) {
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

var le;

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
})(le || (le = {}));

var fe;

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
})(fe || (fe = {}));

const de = PrimitiveLiteralExpression.$false;

const pe = PrimitiveLiteralExpression.$true;

const we = PrimitiveLiteralExpression.$null;

const be = PrimitiveLiteralExpression.$undefined;

const ge = AccessThisExpression.$this;

const ve = AccessThisExpression.$parent;

var Ee;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(Ee || (Ee = {}));

let Ae = "";

let xe = 0;

let me = 0;

let Ue = 0;

let ye = 0;

let Se = 6291456;

let Oe = "";

let ke;

let Ce = true;

let $e = false;

function Le() {
    return Ae.slice(ye, xe);
}

function Be(t, e) {
    Ae = t;
    xe = 0;
    me = t.length;
    Ue = 0;
    ye = 0;
    Se = 6291456;
    Oe = "";
    ke = t.charCodeAt(0);
    Ce = true;
    $e = false;
    return Re(61, void 0 === e ? 8 : e);
}

function Re(t, e) {
    if (16 === e) return new CustomExpression(Ae);
    if (0 === xe) {
        if (1 & e) return qe();
        _e();
        if (4194304 & Se) throw es();
    }
    Ce = 513 > t;
    $e = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & Se) {
        const t = ks[63 & Se];
        _e();
        r = new UnaryExpression(t, Re(514, e));
        Ce = false;
    } else {
        t: switch (Se) {
          case 12294:
            i = Ue;
            Ce = false;
            do {
                _e();
                ++i;
                switch (Se) {
                  case 65545:
                    _e();
                    if (0 === (12288 & Se)) throw rs();
                    break;

                  case 10:
                  case 11:
                    throw rs();

                  case 2162700:
                    $e = true;
                    _e();
                    if (0 === (12288 & Se)) {
                        r = 0 === i ? ge : 1 === i ? ve : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & Se) {
                        r = 0 === i ? ge : 1 === i ? ve : new AccessThisExpression(i);
                        break t;
                    }
                    throw is();
                }
            } while (12294 === Se);

          case 4096:
            {
                const t = Oe;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Ce = !$e;
                _e();
                if (Ye(49)) {
                    if (524296 === Se) throw Ss();
                    const e = $e;
                    const s = Ue;
                    ++Ue;
                    const i = Re(62, 0);
                    $e = e;
                    Ue = s;
                    Ce = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Os();

          case 11:
            throw ss();

          case 12292:
            Ce = false;
            _e();
            switch (Ue) {
              case 0:
                r = ge;
                break;

              case 1:
                r = ve;
                break;

              default:
                r = new AccessThisExpression(Ue);
                break;
            }
            break;

          case 2688007:
            r = Fe(e);
            break;

          case 2688016:
            r = Ae.search(/\s+of\s+/) > xe ? Pe() : Ve(e);
            break;

          case 524296:
            r = Ke(e);
            break;

          case 2163758:
            r = new TemplateExpression([ Oe ]);
            Ce = false;
            _e();
            break;

          case 2163759:
            r = He(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(Oe);
            Ce = false;
            _e();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = ks[63 & Se];
            Ce = false;
            _e();
            break;

          default:
            if (xe >= me) throw ns(); else throw os();
        }
        if (2 & e) return Ne(r);
        if (514 < t) return r;
        if (10 === Se || 11 === Se) throw rs();
        if (1793 === r.$kind) switch (Se) {
          case 2162700:
            $e = true;
            Ce = false;
            _e();
            if (0 === (13312 & Se)) throw Es();
            if (12288 & Se) {
                r = new AccessScopeExpression(Oe, r.ancestor);
                _e();
            } else if (2688007 === Se) r = new CallFunctionExpression(r, Te(), true); else if (2688016 === Se) r = je(r, true); else throw As();
            break;

          case 65545:
            Ce = !$e;
            _e();
            if (0 === (12288 & Se)) throw rs();
            r = new AccessScopeExpression(Oe, r.ancestor);
            _e();
            break;

          case 10:
          case 11:
            throw rs();

          case 2688007:
            r = new CallFunctionExpression(r, Te(), s);
            break;

          case 2688016:
            r = je(r, s);
            break;

          case 2163758:
            r = Qe(r);
            break;

          case 2163759:
            r = He(e, r, true);
            break;
        }
        while ((65536 & Se) > 0) switch (Se) {
          case 2162700:
            r = Ie(r);
            break;

          case 65545:
            _e();
            if (0 === (12288 & Se)) throw rs();
            r = Me(r, false);
            break;

          case 10:
          case 11:
            throw rs();

          case 2688007:
            if (10082 === r.$kind) r = new CallScopeExpression(r.name, Te(), r.ancestor, false); else if (9323 === r.$kind) r = new CallMemberExpression(r.object, r.name, Te(), r.optional, false); else r = new CallFunctionExpression(r, Te(), false);
            break;

          case 2688016:
            r = je(r, false);
            break;

          case 2163758:
            if ($e) throw As();
            r = Qe(r);
            break;

          case 2163759:
            if ($e) throw As();
            r = He(e, r, true);
            break;
        }
    }
    if (10 === Se || 11 === Se) throw rs();
    if (513 < t) return r;
    while ((262144 & Se) > 0) {
        const s = Se;
        if ((960 & s) <= t) break;
        _e();
        r = new BinaryExpression(ks[63 & s], r, Re(960 & s, e));
        Ce = false;
    }
    if (63 < t) return r;
    if (Ye(6291477)) {
        const t = Re(62, e);
        ts(6291476);
        r = new ConditionalExpression(r, t, Re(62, e));
        Ce = false;
    }
    if (62 < t) return r;
    if (Ye(4194348)) {
        if (!Ce) throw us();
        r = new AssignExpression(r, Re(62, e));
    }
    if (61 < t) return r;
    while (Ye(6291479)) {
        if (6291456 === Se) throw hs();
        const t = Oe;
        _e();
        const s = new Array;
        while (Ye(6291476)) s.push(Re(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Ye(6291478)) {
        if (6291456 === Se) throw as();
        const t = Oe;
        _e();
        const s = new Array;
        while (Ye(6291476)) s.push(Re(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== Se) {
        if ((1 & e) > 0 && 7340045 === Se) return r;
        if ("of" === Le()) throw ls();
        throw os();
    }
    return r;
}

function Pe() {
    const t = [];
    const e = new DestructuringAssignmentExpression(90138, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        _e();
        switch (Se) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Le();
            break;

          default:
            throw vs();
        }
    }
    ts(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(ge, s), new AccessKeyedExpression(ge, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Te() {
    const t = $e;
    _e();
    const e = [];
    while (7340046 !== Se) {
        e.push(Re(62, 0));
        if (!Ye(6291471)) break;
    }
    ts(7340046);
    Ce = false;
    $e = t;
    return e;
}

function je(t, e) {
    const s = $e;
    _e();
    t = new AccessKeyedExpression(t, Re(62, 0), e);
    ts(7340051);
    Ce = !s;
    $e = s;
    return t;
}

function Ie(t) {
    $e = true;
    Ce = false;
    _e();
    if (0 === (13312 & Se)) throw Es();
    if (12288 & Se) return Me(t, true);
    if (2688007 === Se) if (10082 === t.$kind) return new CallScopeExpression(t.name, Te(), t.ancestor, true); else if (9323 === t.$kind) return new CallMemberExpression(t.object, t.name, Te(), t.optional, true); else return new CallFunctionExpression(t, Te(), true);
    if (2688016 === Se) return je(t, true);
    throw As();
}

function Me(t, e) {
    const s = Oe;
    switch (Se) {
      case 2162700:
        {
            $e = true;
            Ce = false;
            const r = xe;
            const i = ye;
            const n = Se;
            const o = ke;
            const c = Oe;
            const u = Ce;
            const h = $e;
            _e();
            if (0 === (13312 & Se)) throw Es();
            if (2688007 === Se) return new CallMemberExpression(t, s, Te(), e, true);
            xe = r;
            ye = i;
            Se = n;
            ke = o;
            Oe = c;
            Ce = u;
            $e = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Ce = false;
        return new CallMemberExpression(t, s, Te(), e, false);

      default:
        Ce = !$e;
        _e();
        return new AccessMemberExpression(t, s, e);
    }
}

var De;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(De || (De = {}));

function Fe(t) {
    _e();
    const e = xe;
    const s = ye;
    const r = Se;
    const i = ke;
    const n = Oe;
    const o = Ce;
    const c = $e;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === Se) {
            _e();
            if (4096 !== Se) throw rs();
            u.push(new BindingIdentifier(Oe));
            _e();
            if (6291471 === Se) throw ys();
            if (7340046 !== Se) throw ss();
            _e();
            if (49 !== Se) throw ss();
            _e();
            const t = $e;
            const e = Ue;
            ++Ue;
            const s = Re(62, 0);
            $e = t;
            Ue = e;
            Ce = false;
            return new ArrowFunction(u, s, true);
        }
        switch (Se) {
          case 4096:
            u.push(new BindingIdentifier(Oe));
            _e();
            break;

          case 7340046:
            _e();
            break t;

          case 524296:
          case 2688016:
            _e();
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
            _e();
            h = 2;
            break;
        }
        switch (Se) {
          case 6291471:
            _e();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            _e();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw xs();
            _e();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === Se) {
        if (1 === h) {
            _e();
            if (524296 === Se) throw Ss();
            const t = $e;
            const e = Ue;
            ++Ue;
            const s = Re(62, 0);
            $e = t;
            Ue = e;
            Ce = false;
            return new ArrowFunction(u, s);
        }
        throw xs();
    } else if (1 === h && 0 === u.length) throw bs(49);
    if (a) switch (h) {
      case 2:
        throw xs();

      case 3:
        throw ms();

      case 4:
        throw Us();
    }
    xe = e;
    ye = s;
    Se = r;
    ke = i;
    Oe = n;
    Ce = o;
    $e = c;
    const l = $e;
    const f = Re(62, t);
    $e = l;
    ts(7340046);
    if (49 === Se) switch (h) {
      case 2:
        throw xs();

      case 3:
        throw ms();

      case 4:
        throw Us();
    }
    return f;
}

function Ve(t) {
    const e = $e;
    _e();
    const s = new Array;
    while (7340051 !== Se) if (Ye(6291471)) {
        s.push(be);
        if (7340051 === Se) break;
    } else {
        s.push(Re(62, ~2 & t));
        if (Ye(6291471)) {
            if (7340051 === Se) break;
        } else break;
    }
    $e = e;
    ts(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Ce = false;
        return new ArrayLiteralExpression(s);
    }
}

function Ne(t) {
    if (0 === (65536 & t.$kind)) throw fs();
    if (4204592 !== Se) throw fs();
    _e();
    const e = t;
    const s = Re(61, 0);
    return new ForOfStatement(e, s);
}

function Ke(t) {
    const e = $e;
    const s = new Array;
    const r = new Array;
    _e();
    while (7340045 !== Se) {
        s.push(Oe);
        if (49152 & Se) {
            _e();
            ts(6291476);
            r.push(Re(62, ~2 & t));
        } else if (12288 & Se) {
            const e = ke;
            const s = Se;
            const i = xe;
            _e();
            if (Ye(6291476)) r.push(Re(62, ~2 & t)); else {
                ke = e;
                Se = s;
                xe = i;
                r.push(Re(515, ~2 & t));
            }
        } else throw ds();
        if (7340045 !== Se) ts(6291471);
    }
    $e = e;
    ts(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Ce = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function qe() {
    const t = [];
    const e = [];
    const s = me;
    let r = "";
    while (xe < s) {
        switch (ke) {
          case 36:
            if (123 === Ae.charCodeAt(xe + 1)) {
                t.push(r);
                r = "";
                xe += 2;
                ke = Ae.charCodeAt(xe);
                _e();
                const s = Re(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(ae(ze()));
            break;

          default:
            r += String.fromCharCode(ke);
        }
        ze();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function He(t, e, s) {
    const r = $e;
    const i = [ Oe ];
    ts(2163759);
    const n = [ Re(62, t) ];
    while (2163758 !== (Se = Xe())) {
        i.push(Oe);
        ts(2163759);
        n.push(Re(62, t));
    }
    i.push(Oe);
    Ce = false;
    $e = r;
    if (s) {
        _e();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        _e();
        return new TemplateExpression(i, n);
    }
}

function Qe(t) {
    Ce = false;
    const e = [ Oe ];
    _e();
    return new TaggedTemplateExpression(e, e, t);
}

function _e() {
    while (xe < me) {
        ye = xe;
        if (null != (Se = Ts[ke]())) return;
    }
    Se = 6291456;
}

function ze() {
    return ke = Ae.charCodeAt(++xe);
}

function We() {
    while (Ps[ze()]) ;
    const t = Cs[Oe = Le()];
    return void 0 === t ? 4096 : t;
}

function Ge(t) {
    let e = ke;
    if (false === t) {
        do {
            e = ze();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Oe = parseInt(Le(), 10);
            return 32768;
        }
        e = ze();
        if (xe >= me) {
            Oe = parseInt(Le().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = ze();
    } while (e <= 57 && e >= 48); else ke = Ae.charCodeAt(--xe);
    Oe = parseFloat(Le());
    return 32768;
}

function Ze() {
    const t = ke;
    ze();
    let e = 0;
    const s = new Array;
    let r = xe;
    while (ke !== t) if (92 === ke) {
        s.push(Ae.slice(r, xe));
        ze();
        e = ae(ke);
        ze();
        s.push(String.fromCharCode(e));
        r = xe;
    } else if (xe >= me) throw ps(); else ze();
    const i = Ae.slice(r, xe);
    ze();
    s.push(i);
    const n = s.join("");
    Oe = n;
    return 16384;
}

function Je() {
    let t = true;
    let e = "";
    while (96 !== ze()) if (36 === ke) if (xe + 1 < me && 123 === Ae.charCodeAt(xe + 1)) {
        xe++;
        t = false;
        break;
    } else e += "$"; else if (92 === ke) e += String.fromCharCode(ae(ze())); else {
        if (xe >= me) throw ws();
        e += String.fromCharCode(ke);
    }
    ze();
    Oe = e;
    if (t) return 2163758;
    return 2163759;
}

function Xe() {
    if (xe >= me) throw ws();
    xe--;
    return Je();
}

function Ye(t) {
    if (Se === t) {
        _e();
        return true;
    }
    return false;
}

function ts(t) {
    if (Se === t) _e(); else throw bs(t);
}

function es() {
    return new Error(`AUR0151:${Ae}`);
}

function ss() {
    return new Error(`AUR0152:${Ae}`);
}

function rs() {
    return new Error(`AUR0153:${Ae}`);
}

function is() {
    return new Error(`AUR0154:${Ae}`);
}

function ns() {
    return new Error(`AUR0155:${Ae}`);
}

function os() {
    return new Error(`AUR0156:${Ae}`);
}

function cs() {
    return new Error(`AUR0157`);
}

function us() {
    return new Error(`AUR0158:${Ae}`);
}

function hs() {
    return new Error(`AUR0159:${Ae}`);
}

function as() {
    return new Error(`AUR0160:${Ae}`);
}

function ls() {
    return new Error(`AUR0161:${Ae}`);
}

function fs() {
    return new Error(`AUR0163:${Ae}`);
}

function ds() {
    return new Error(`AUR0164:${Ae}`);
}

function ps() {
    return new Error(`AUR0165:${Ae}`);
}

function ws() {
    return new Error(`AUR0166:${Ae}`);
}

function bs(t) {
    return new Error(`AUR0167:${Ae}<${ks[63 & t]}`);
}

const gs = () => {
    throw new Error(`AUR0168:${Ae}`);
};

gs.notMapped = true;

function vs() {
    return new Error(`AUR0170:${Ae}`);
}

function Es() {
    return new Error(`AUR0171:${Ae}`);
}

function As() {
    return new Error(`AUR0172:${Ae}`);
}

function xs() {
    return new Error(`AUR0173:${Ae}`);
}

function ms() {
    return new Error(`AUR0174:${Ae}`);
}

function Us() {
    return new Error(`AUR0175:${Ae}`);
}

function ys() {
    return new Error(`AUR0176:${Ae}`);
}

function Ss() {
    return new Error(`AUR0178:${Ae}`);
}

function Os() {
    return new Error(`AUR0179:${Ae}`);
}

const ks = [ de, pe, we, be, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Cs = Object.assign(Object.create(null), {
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

const $s = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Ls(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function Bs(t) {
    return () => {
        ze();
        return t;
    };
}

const Rs = new Set;

Ls(null, Rs, $s.AsciiIdPart, true);

const Ps = new Uint8Array(65535);

Ls(Ps, null, $s.IdStart, 1);

Ls(Ps, null, $s.Digit, 1);

const Ts = new Array(65535);

Ts.fill(gs, 0, 65535);

Ls(Ts, null, $s.Skip, (() => {
    ze();
    return null;
}));

Ls(Ts, null, $s.IdStart, We);

Ls(Ts, null, $s.Digit, (() => Ge(false)));

Ts[34] = Ts[39] = () => Ze();

Ts[96] = () => Je();

Ts[33] = () => {
    if (61 !== ze()) return 131117;
    if (61 !== ze()) return 6553948;
    ze();
    return 6553950;
};

Ts[61] = () => {
    if (62 === ze()) {
        ze();
        return 49;
    }
    if (61 !== ke) return 4194348;
    if (61 !== ze()) return 6553947;
    ze();
    return 6553949;
};

Ts[38] = () => {
    if (38 !== ze()) return 6291478;
    ze();
    return 6553882;
};

Ts[124] = () => {
    if (124 !== ze()) return 6291479;
    ze();
    return 6553817;
};

Ts[63] = () => {
    if (46 === ze()) {
        const t = Ae.charCodeAt(xe + 1);
        if (t <= 48 || t >= 57) {
            ze();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== ke) return 6291477;
    ze();
    return 6553752;
};

Ts[46] = () => {
    if (ze() <= 57 && ke >= 48) return Ge(true);
    if (46 === ke) {
        if (46 !== ze()) return 10;
        ze();
        return 11;
    }
    return 65545;
};

Ts[60] = () => {
    if (61 !== ze()) return 6554015;
    ze();
    return 6554017;
};

Ts[62] = () => {
    if (61 !== ze()) return 6554016;
    ze();
    return 6554018;
};

Ts[37] = Bs(6554154);

Ts[40] = Bs(2688007);

Ts[41] = Bs(7340046);

Ts[42] = Bs(6554153);

Ts[43] = Bs(2490853);

Ts[44] = Bs(6291471);

Ts[45] = Bs(2490854);

Ts[47] = Bs(6554155);

Ts[58] = Bs(6291476);

Ts[91] = Bs(2688016);

Ts[93] = Bs(7340051);

Ts[123] = Bs(524296);

Ts[125] = Bs(7340045);

let js = null;

const Is = [];

let Ms = false;

function Ds() {
    Ms = false;
}

function Fs() {
    Ms = true;
}

function Vs() {
    return js;
}

function Ns(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == js) {
        js = t;
        Is[0] = js;
        Ms = true;
        return;
    }
    if (js === t) throw new Error(`AUR0207`);
    Is.push(t);
    js = t;
    Ms = true;
}

function Ks(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (js !== t) throw new Error(`AUR0209`);
    Is.pop();
    js = Is.length > 0 ? Is[Is.length - 1] : null;
    Ms = null != js;
}

const qs = Object.freeze({
    get current() {
        return js;
    },
    get connecting() {
        return Ms;
    },
    enter: Ns,
    exit: Ks,
    pause: Ds,
    resume: Fs
});

const Hs = Reflect.get;

const Qs = Object.prototype.toString;

const _s = new WeakMap;

function zs(t) {
    switch (Qs.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Ws = "__raw__";

function Gs(t) {
    return zs(t) ? Zs(t) : t;
}

function Zs(t) {
    return _s.get(t) ?? tr(t);
}

function Js(t) {
    return t[Ws] ?? t;
}

function Xs(t) {
    return zs(t) && t[Ws] || t;
}

function Ys(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function tr(t) {
    const e = d(t) ? sr : t instanceof Map || t instanceof Set ? Sr : er;
    const s = new Proxy(t, e);
    _s.set(t, s);
    return s;
}

const er = {
    get(t, e, s) {
        if (e === Ws) return t;
        const r = Vs();
        if (!Ms || Ys(e) || null == r) return Hs(t, e, s);
        r.observe(t, e);
        return Gs(Hs(t, e, s));
    }
};

const sr = {
    get(t, e, s) {
        if (e === Ws) return t;
        const r = Vs();
        if (!Ms || Ys(e) || null == r) return Hs(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return rr;

          case "includes":
            return or;

          case "indexOf":
            return cr;

          case "lastIndexOf":
            return ur;

          case "every":
            return ir;

          case "filter":
            return nr;

          case "find":
            return ar;

          case "findIndex":
            return hr;

          case "flat":
            return lr;

          case "flatMap":
            return fr;

          case "join":
            return dr;

          case "push":
            return wr;

          case "pop":
            return pr;

          case "reduce":
            return Ur;

          case "reduceRight":
            return yr;

          case "reverse":
            return Er;

          case "shift":
            return br;

          case "unshift":
            return gr;

          case "slice":
            return mr;

          case "splice":
            return vr;

          case "some":
            return Ar;

          case "sort":
            return xr;

          case "keys":
            return Pr;

          case "values":
          case Symbol.iterator:
            return Tr;

          case "entries":
            return jr;
        }
        r.observe(t, e);
        return Gs(Hs(t, e, s));
    },
    ownKeys(t) {
        Vs()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function rr(t, e) {
    const s = Js(this);
    const r = s.map(((s, r) => Xs(t.call(e, Gs(s), r, this))));
    Vs()?.observeCollection(s);
    return Gs(r);
}

function ir(t, e) {
    const s = Js(this);
    const r = s.every(((s, r) => t.call(e, Gs(s), r, this)));
    Vs()?.observeCollection(s);
    return r;
}

function nr(t, e) {
    const s = Js(this);
    const r = s.filter(((s, r) => Xs(t.call(e, Gs(s), r, this))));
    Vs()?.observeCollection(s);
    return Gs(r);
}

function or(t) {
    const e = Js(this);
    const s = e.includes(Xs(t));
    Vs()?.observeCollection(e);
    return s;
}

function cr(t) {
    const e = Js(this);
    const s = e.indexOf(Xs(t));
    Vs()?.observeCollection(e);
    return s;
}

function ur(t) {
    const e = Js(this);
    const s = e.lastIndexOf(Xs(t));
    Vs()?.observeCollection(e);
    return s;
}

function hr(t, e) {
    const s = Js(this);
    const r = s.findIndex(((s, r) => Xs(t.call(e, Gs(s), r, this))));
    Vs()?.observeCollection(s);
    return r;
}

function ar(t, e) {
    const s = Js(this);
    const r = s.find(((e, s) => t(Gs(e), s, this)), e);
    Vs()?.observeCollection(s);
    return Gs(r);
}

function lr() {
    const t = Js(this);
    Vs()?.observeCollection(t);
    return Gs(t.flat());
}

function fr(t, e) {
    const s = Js(this);
    Vs()?.observeCollection(s);
    return Zs(s.flatMap(((s, r) => Gs(t.call(e, Gs(s), r, this)))));
}

function dr(t) {
    const e = Js(this);
    Vs()?.observeCollection(e);
    return e.join(t);
}

function pr() {
    return Gs(Js(this).pop());
}

function wr(...t) {
    return Js(this).push(...t);
}

function br() {
    return Gs(Js(this).shift());
}

function gr(...t) {
    return Js(this).unshift(...t);
}

function vr(...t) {
    return Gs(Js(this).splice(...t));
}

function Er(...t) {
    const e = Js(this);
    const s = e.reverse();
    Vs()?.observeCollection(e);
    return Gs(s);
}

function Ar(t, e) {
    const s = Js(this);
    const r = s.some(((s, r) => Xs(t.call(e, Gs(s), r, this))));
    Vs()?.observeCollection(s);
    return r;
}

function xr(t) {
    const e = Js(this);
    const s = e.sort(t);
    Vs()?.observeCollection(e);
    return Gs(s);
}

function mr(t, e) {
    const s = Js(this);
    Vs()?.observeCollection(s);
    return Zs(s.slice(t, e));
}

function Ur(t, e) {
    const s = Js(this);
    const r = s.reduce(((e, s, r) => t(e, Gs(s), r, this)), e);
    Vs()?.observeCollection(s);
    return Gs(r);
}

function yr(t, e) {
    const s = Js(this);
    const r = s.reduceRight(((e, s, r) => t(e, Gs(s), r, this)), e);
    Vs()?.observeCollection(s);
    return Gs(r);
}

const Sr = {
    get(t, e, s) {
        if (e === Ws) return t;
        const r = Vs();
        if (!Ms || Ys(e) || null == r) return Hs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Br;

          case "delete":
            return Rr;

          case "forEach":
            return Or;

          case "add":
            if (t instanceof Set) return Lr;
            break;

          case "get":
            if (t instanceof Map) return Cr;
            break;

          case "set":
            if (t instanceof Map) return $r;
            break;

          case "has":
            return kr;

          case "keys":
            return Pr;

          case "values":
            return Tr;

          case "entries":
            return jr;

          case Symbol.iterator:
            return t instanceof Map ? jr : Tr;
        }
        return Gs(Hs(t, e, s));
    }
};

function Or(t, e) {
    const s = Js(this);
    Vs()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Gs(s), Gs(r), this);
    }));
}

function kr(t) {
    const e = Js(this);
    Vs()?.observeCollection(e);
    return e.has(Xs(t));
}

function Cr(t) {
    const e = Js(this);
    Vs()?.observeCollection(e);
    return Gs(e.get(Xs(t)));
}

function $r(t, e) {
    return Gs(Js(this).set(Xs(t), Xs(e)));
}

function Lr(t) {
    return Gs(Js(this).add(Xs(t)));
}

function Br() {
    return Gs(Js(this).clear());
}

function Rr(t) {
    return Gs(Js(this).delete(Xs(t)));
}

function Pr() {
    const t = Js(this);
    Vs()?.observeCollection(t);
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
                value: Gs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Tr() {
    const t = Js(this);
    Vs()?.observeCollection(t);
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
                value: Gs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function jr() {
    const t = Js(this);
    Vs()?.observeCollection(t);
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
                value: [ Gs(s[0]), Gs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Ir = Object.freeze({
    getProxy: Zs,
    getRaw: Js,
    wrap: Gs,
    unwrap: Xs,
    rawKey: Ws
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
        Mr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Mr);
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
            Ns(this);
            return this.v = Xs(this.$get.call(this.up ? Gs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Ks(this);
        }
    }
}

ce(ComputedObserver);

H(ComputedObserver);

G(ComputedObserver);

let Mr;

const Dr = e.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Fr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Vr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Fr.disabled) return;
            if (++this.C < Fr.timeoutsPerCheck) return;
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
        if (Fr.throw) throw new Error(`AUR0222:${e}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Vr);
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

G(DirtyChecker);

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

H(DirtyCheckProperty);

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

let Nr;

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
        Nr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Nr);
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
        Nr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Nr);
    }
}

H(SetterObserver);

H(SetterNotifier);

G(SetterObserver);

G(SetterNotifier);

const Kr = new PropertyAccessor;

const qr = e.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Hr = e.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => {
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
        return Kr;
    }
    getAccessor() {
        return Kr;
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
        return Kr;
    }
    getArrayObserver(t) {
        return mt(t);
    }
    getMapObserver(t) {
        return Jt(t);
    }
    getSetObserver(t) {
        return Dt(t);
    }
    createObserver(t, e) {
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        if (this.B.handles(t, e, this)) return this.B.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (d(t)) return mt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return Jt(t).getLengthObserver(); else if (t instanceof Set) return Dt(t).getLengthObserver();
            break;

          default:
            if (d(t) && n(e)) return mt(t).getIndexObserver(Number(e));
            break;
        }
        let s = zr(t, e);
        if (void 0 === s) {
            let r = _r(t);
            while (null !== r) {
                s = zr(r, e);
                if (void 0 === s) r = _r(r); else break;
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

ObserverLocator.inject = [ Dr, Hr ];

function Qr(t) {
    let e;
    if (d(t)) e = mt(t); else if (t instanceof Map) e = Jt(t); else if (t instanceof Set) e = Dt(t);
    return e;
}

const _r = Object.getPrototypeOf;

const zr = Object.getOwnPropertyDescriptor;

const Wr = e.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ qr ];
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
            Ns(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Ks(this);
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

ce(Effect);

function Gr(t) {
    if (void 0 === t.$observers) a(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Zr = {};

function Jr(t, e, s) {
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
        let o = Zr;
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
            const s = Xr(this, e, n, o, c);
            Vs()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Xr(this, e, n, o, c).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Xr(s, e, n, o, c);
        };
        if (i) a(t.prototype, e, s); else return s;
    }
}

function Xr(t, e, s, r, i) {
    const n = Gr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Zr ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, T as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, he as Char, P as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, qs as ConnectableSwitcher, CustomExpression, R as DelegationStrategy, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Fr as DirtyCheckSettings, v as ExpressionKind, Ee as ExpressionType, FlushQueue, ForOfStatement, HtmlLiteralExpression, $ as ICoercionConfiguration, Dr as IDirtyChecker, ue as IExpressionParser, Hr as INodeObserverLocator, Wr as IObservation, qr as IObserverLocator, g as ISignaler, Interpolation, L as LifecycleFlags, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, OverrideContext, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Ir as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, ValueConverterExpression, yt as applyMutationsToIndices, N as batch, M as cloneIndexMap, ce as connectable, j as copyIndexMap, I as createIndexMap, xt as disableArrayObservation, Zt as disableMapObservation, Mt as disableSetObservation, At as enableArrayObservation, Gt as enableMapObservation, It as enableSetObservation, Qr as getCollectionObserver, D as isIndexMap, Jr as observable, Be as parseExpression, H as subscriberCollection, St as synchronizeIndices, G as withFlushQueue };

