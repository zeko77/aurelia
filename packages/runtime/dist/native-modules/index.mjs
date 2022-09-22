import { Protocol as t, DI as e, emptyArray as s, isArrayIndex as r, IPlatform as i } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as n } from "../../../metadata/dist/native-modules/index.mjs";

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) this[t] = e;
    }
}

class Scope {
    constructor(t, e, s, r) {
        this.parentScope = t;
        this.bindingContext = e;
        this.overrideContext = s;
        this.isBoundary = r;
    }
    static getContext(t, e, s) {
        if (null == t) throw o();
        let r = t.overrideContext;
        let i = t;
        if (s > 0) {
            while (s > 0) {
                s--;
                i = i.parentScope;
                if (null == i) return;
            }
            r = i.overrideContext;
            return e in r ? r : i.bindingContext;
        }
        while (null != i && !i.isBoundary && !(e in i.overrideContext) && !(e in i.bindingContext)) i = i.parentScope;
        if (null == i) return t.bindingContext;
        r = i.overrideContext;
        return e in r ? r : i.bindingContext;
    }
    static create(t, e, s) {
        if (null == t) throw c();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw o();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const o = () => new Error(`AUR0203`);

const c = () => new Error("AUR0204");

class OverrideContext {}

const u = Object.prototype.hasOwnProperty;

const h = Reflect.defineProperty;

const a = t => "function" === typeof t;

const l = t => "string" === typeof t;

const f = t => t instanceof Array;

function p(t, e, s) {
    h(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function d(t, e, s) {
    if (!(e in t)) p(t, e, s);
}

const w = String;

const b = () => Object.create(null);

const g = n.getOwn;

n.hasOwn;

const v = n.define;

t.annotation.keyFor;

t.resource.keyFor;

t.resource.appendTo;

const E = e.createInterface("ISignaler", (t => t.singleton(Signaler)));

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

var A;

(function(t) {
    t[t["AccessThis"] = 0] = "AccessThis";
    t[t["AccessScope"] = 1] = "AccessScope";
    t[t["ArrayLiteral"] = 2] = "ArrayLiteral";
    t[t["ObjectLiteral"] = 3] = "ObjectLiteral";
    t[t["PrimitiveLiteral"] = 4] = "PrimitiveLiteral";
    t[t["Template"] = 5] = "Template";
    t[t["Unary"] = 6] = "Unary";
    t[t["CallScope"] = 7] = "CallScope";
    t[t["CallMember"] = 8] = "CallMember";
    t[t["CallFunction"] = 9] = "CallFunction";
    t[t["AccessMember"] = 10] = "AccessMember";
    t[t["AccessKeyed"] = 11] = "AccessKeyed";
    t[t["TaggedTemplate"] = 12] = "TaggedTemplate";
    t[t["Binary"] = 13] = "Binary";
    t[t["Conditional"] = 14] = "Conditional";
    t[t["Assign"] = 15] = "Assign";
    t[t["ArrowFunction"] = 16] = "ArrowFunction";
    t[t["ValueConverter"] = 17] = "ValueConverter";
    t[t["BindingBehavior"] = 18] = "BindingBehavior";
    t[t["ArrayBindingPattern"] = 19] = "ArrayBindingPattern";
    t[t["ObjectBindingPattern"] = 20] = "ObjectBindingPattern";
    t[t["BindingIdentifier"] = 21] = "BindingIdentifier";
    t[t["ForOfStatement"] = 22] = "ForOfStatement";
    t[t["Interpolation"] = 23] = "Interpolation";
    t[t["ArrayDestructuring"] = 24] = "ArrayDestructuring";
    t[t["ObjectDestructuring"] = 25] = "ObjectDestructuring";
    t[t["DestructuringAssignmentLeaf"] = 26] = "DestructuringAssignmentLeaf";
})(A || (A = {}));

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
        if (l(t.value)) {
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
        const s = 25 === e;
        this.text += s ? "{" : "[";
        const r = t.list;
        const i = r.length;
        let n;
        let o;
        for (n = 0; n < i; n++) {
            o = r[n];
            switch (o.$kind) {
              case 26:
                o.accept(this);
                break;

              case 24:
              case 25:
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
        return 18;
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
        if (null == i) throw x(s);
        if (void 0 === e[r]) {
            e[r] = i;
            i.bind?.(t, e, ...this.args.map((s => s.evaluate(t, e, null))));
        } else throw U(s);
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

const x = t => new Error(`AUR0101:${t}`);

const U = t => new Error(`AUR0102:${t}`);

class ValueConverterExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
    }
    get $kind() {
        return 17;
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
        if (null == i) throw y(r);
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s), ...this.args.map((r => r.evaluate(t, e, s))));
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw y(r);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, null))));
        return this.expression.assign(t, e, s);
    }
    bind(t, e) {
        const s = this.name;
        const r = e.getConverter?.(s);
        if (null == r) throw y(s);
        const i = r.signals;
        if (null != i) {
            const t = e.get?.(E);
            const s = i.length;
            let r = 0;
            for (;r < s; ++r) t?.addSignalListener(i[r], e);
        }
        if (this.expression.hasBind) this.expression.bind(t, e);
    }
    unbind(t, e) {
        const s = e.getConverter?.(this.name);
        if (void 0 === s?.signals) return;
        const r = e.get(E);
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

const y = t => new Error(`AUR0103:${t}`);

class AssignExpression {
    constructor(t, e) {
        this.target = t;
        this.value = e;
    }
    get $kind() {
        return 15;
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
        return 14;
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
        return 0;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        let r = t;
        let i = this.ancestor;
        while (i-- && r) r = r.parentScope;
        return i < 1 && r ? r.bindingContext : void 0;
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
        return 1;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        const r = Scope.getContext(t, this.name, this.ancestor);
        if (null !== s) s.observe(r, this.name);
        const i = r[this.name];
        if (null == i && "$host" === this.name) throw new Error(`AUR0105`);
        if (e?.strict) return e?.boundFn && a(i) ? i.bind(r) : i;
        return null == i ? "" : e?.boundFn && a(i) ? i.bind(r) : i;
    }
    assign(t, e, s) {
        if ("$host" === this.name) throw new Error(`AUR0106`);
        const r = Scope.getContext(t, this.name, this.ancestor);
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
        return 10;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        const r = this.object.evaluate(t, e, s);
        let i;
        if (e?.strict) {
            if (null == r) return r;
            if (null !== s) s.observe(r, this.name);
            i = r[this.name];
            if (e?.boundFn && a(i)) return i.bind(r);
            return i;
        }
        if (null !== s && r instanceof Object) s.observe(r, this.name);
        if (r) {
            i = r[this.name];
            if (e?.boundFn && a(i)) return i.bind(r);
            return i;
        }
        return "";
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
        return 11;
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
        return 7;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        const r = this.args.map((r => r.evaluate(t, e, s)));
        const i = Scope.getContext(t, this.name, this.ancestor);
        const n = S(e?.strictFnCall, i, this.name);
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

const m = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

class CallMemberExpression {
    constructor(t, e, s, r = false, i = false) {
        this.object = t;
        this.name = e;
        this.args = s;
        this.optionalMember = r;
        this.optionalCall = i;
    }
    get $kind() {
        return 8;
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
        const n = S(e?.strictFnCall, r, this.name);
        if (n) {
            const t = n.apply(r, i);
            if (f(r) && m.includes(this.name)) s?.observeCollection(r);
            return t;
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
        return 9;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        const r = this.func.evaluate(t, e, s);
        if (a(r)) return r(...this.args.map((r => r.evaluate(t, e, s))));
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
        return 13;
    }
    get hasBind() {
        return false;
    }
    get hasUnbind() {
        return false;
    }
    evaluate(t, e, s) {
        switch (this.operation) {
          case "&&":
            return this.left.evaluate(t, e, s) && this.right.evaluate(t, e, s);

          case "||":
            return this.left.evaluate(t, e, s) || this.right.evaluate(t, e, s);

          case "??":
            return this.left.evaluate(t, e, s) ?? this.right.evaluate(t, e, s);

          case "==":
            return this.left.evaluate(t, e, s) == this.right.evaluate(t, e, s);

          case "===":
            return this.left.evaluate(t, e, s) === this.right.evaluate(t, e, s);

          case "!=":
            return this.left.evaluate(t, e, s) != this.right.evaluate(t, e, s);

          case "!==":
            return this.left.evaluate(t, e, s) !== this.right.evaluate(t, e, s);

          case "instanceof":
            {
                const r = this.right.evaluate(t, e, s);
                if (a(r)) return this.left.evaluate(t, e, s) instanceof r;
                return false;
            }

          case "in":
            {
                const r = this.right.evaluate(t, e, s);
                if (r instanceof Object) return this.left.evaluate(t, e, s) in r;
                return false;
            }

          case "+":
            {
                const r = this.left.evaluate(t, e, s);
                const i = this.right.evaluate(t, e, s);
                if (e?.strict) return r + i;
                if (!r || !i) {
                    if (O(r) || O(i)) return (r || 0) + (i || 0);
                    if (k(r) || k(i)) return (r || "") + (i || "");
                }
                return r + i;
            }

          case "-":
            return this.left.evaluate(t, e, s) - this.right.evaluate(t, e, s);

          case "*":
            return this.left.evaluate(t, e, s) * this.right.evaluate(t, e, s);

          case "/":
            return this.left.evaluate(t, e, s) / this.right.evaluate(t, e, s);

          case "%":
            return this.left.evaluate(t, e, s) % this.right.evaluate(t, e, s);

          case "<":
            return this.left.evaluate(t, e, s) < this.right.evaluate(t, e, s);

          case ">":
            return this.left.evaluate(t, e, s) > this.right.evaluate(t, e, s);

          case "<=":
            return this.left.evaluate(t, e, s) <= this.right.evaluate(t, e, s);

          case ">=":
            return this.left.evaluate(t, e, s) >= this.right.evaluate(t, e, s);

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
        return 6;
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
        return 4;
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

class ArrayLiteralExpression {
    constructor(t) {
        this.elements = t;
    }
    get $kind() {
        return 2;
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

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(s);

class ObjectLiteralExpression {
    constructor(t, e) {
        this.keys = t;
        this.values = e;
    }
    get $kind() {
        return 3;
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

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(s, s);

class TemplateExpression {
    constructor(t, e = s) {
        this.cooked = t;
        this.expressions = e;
    }
    get $kind() {
        return 5;
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
            r += w(this.expressions[i].evaluate(t, e, s));
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
    constructor(t, e, r, i = s) {
        this.cooked = t;
        this.func = r;
        this.expressions = i;
        t.raw = e;
    }
    get $kind() {
        return 12;
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
        if (!a(i)) throw new Error(`AUR0110`);
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
        return 19;
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
        return 20;
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
        return 21;
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
        return 22;
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
    constructor(t, e = s) {
        this.parts = t;
        this.expressions = e;
        this.isMulti = e.length > 1;
        this.firstExpression = e[0];
    }
    get $kind() {
        return 23;
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
                r += w(this.expressions[i].evaluate(t, e, s));
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
              case 26:
                o.assign(t, e, s);
                break;

              case 24:
              case 25:
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
        return 26;
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
        return 26;
    }
    evaluate(t, e, s) {
        return;
    }
    assign(t, e, s) {
        if (null == s) return;
        if ("object" !== typeof s) throw new Error(`AUR0112`);
        const i = this.indexOrProperties;
        let n;
        if (r(i)) {
            if (!Array.isArray(s)) throw new Error(`AUR0112`);
            n = s.slice(i);
        } else n = Object.entries(s).reduce(((t, [e, s]) => {
            if (!i.includes(e)) t[e] = s;
            return t;
        }), {});
        this.target.assign(t, e, n);
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
        return 16;
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

function S(t, e, s) {
    const r = null == e ? null : e[s];
    if (a(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function O(t) {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
}

function k(t) {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
}

const C = e.createInterface("ICoercionConfiguration");

var $;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})($ || ($ = {}));

var L;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(L || (L = {}));

function B(t, e, s) {
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

function R(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function P(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function T(t) {
    return f(t) && true === t.isIndexMap;
}

let M = new Map;

let _ = false;

function I(t) {
    const e = M;
    const s = M = new Map;
    _ = true;
    try {
        t();
    } finally {
        M = null;
        _ = false;
        try {
            let t;
            let r;
            let i;
            let n;
            let o;
            let c = false;
            let u;
            let h;
            for (t of s) {
                r = t[0];
                i = t[1];
                if (e?.has(r)) e.set(r, i);
                if (1 === i[0]) r.notify(i[1], i[2]); else {
                    n = i[1];
                    o = i[2];
                    c = false;
                    if (o.deletedIndices.length > 0) c = true; else for (u = 0, h = o.length; u < h; ++u) if (o[u] !== u) {
                        c = true;
                        break;
                    }
                    if (c) r.notifyCollection(n, o);
                }
            }
        } finally {
            M = e;
        }
    }
}

function j(t, e, s) {
    if (!M.has(t)) M.set(t, [ 2, e, s ]);
}

function D(t, e, s) {
    const r = M.get(t);
    if (void 0 === r) M.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function F(t) {
    return null == t ? V : V(t);
}

function V(t) {
    const e = t.prototype;
    h(e, "subs", {
        get: N
    });
    d(e, "subscribe", K);
    d(e, "unsubscribe", q);
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
        if (_) {
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
    return p(this, "subs", new SubscriberRecord);
}

function K(t) {
    return this.subs.add(t);
}

function q(t) {
    return this.subs.remove(t);
}

var Q;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Sub0"] = 1] = "Sub0";
    t[t["Sub1"] = 2] = "Sub1";
    t[t["Sub2"] = 4] = "Sub2";
    t[t["SubRest"] = 8] = "SubRest";
    t[t["Any"] = 15] = "Any";
})(Q || (Q = {}));

class CollectionLengthObserver {
    constructor(t) {
        this.owner = t;
        this.type = 18;
        this.v = (this.o = t.collection).length;
    }
    getValue() {
        return this.o.length;
    }
    setValue(t) {
        const e = this.v;
        if (t !== e && r(t)) {
            this.o.length = t;
            this.v = t;
            this.subs.notify(t, e);
        }
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.length;
        if ((this.v = r) !== s) this.subs.notify(this.v, s);
    }
}

class CollectionSizeObserver {
    constructor(t) {
        this.owner = t;
        this.v = (this.o = t.collection).size;
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
        if ((this.v = r) !== s) this.subs.notify(this.v, s);
    }
}

function z(t) {
    const e = t.prototype;
    d(e, "subscribe", W);
    d(e, "unsubscribe", G);
    F(t);
}

function W(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function G(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

z(CollectionLengthObserver);

z(CollectionSizeObserver);

const H = "__au_array_obs__";

const Z = (() => {
    let t = g(H, Array);
    if (null == t) v(H, t = new WeakMap, Array);
    return t;
})();

function J(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function X(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function Y(t, e, s, r, i) {
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

function tt(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let p, d, w;
    let b, g;
    let v, E, A, x;
    let U, y, m, S;
    while (true) {
        if (r - s <= 10) {
            Y(t, e, s, r, i);
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
        E = l;
        A = s + 1;
        x = r - 1;
        t[n] = t[A];
        e[n] = e[A];
        t[A] = v;
        e[A] = E;
        t: for (o = A + 1; o < x; o++) {
            U = t[o];
            y = e[o];
            m = i(U, v);
            if (m < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = U;
                e[A] = y;
                A++;
            } else if (m > 0) {
                do {
                    x--;
                    if (x == o) break t;
                    S = t[x];
                    m = i(S, v);
                } while (m > 0);
                t[o] = t[x];
                e[o] = e[x];
                t[x] = U;
                e[x] = y;
                if (m < 0) {
                    U = t[o];
                    y = e[o];
                    t[o] = t[A];
                    e[o] = e[A];
                    t[A] = U;
                    e[A] = y;
                    A++;
                }
            }
        }
        if (r - x < A - s) {
            tt(t, e, x, r, i);
            r = A;
        } else {
            tt(t, e, s, A, i);
            s = x;
        }
    }
}

const et = Array.prototype;

const st = et.push;

const rt = et.unshift;

const it = et.pop;

const nt = et.shift;

const ot = et.splice;

const ct = et.reverse;

const ut = et.sort;

const ht = {
    push: st,
    unshift: rt,
    pop: it,
    shift: nt,
    splice: ot,
    reverse: ct,
    sort: ut
};

const at = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const lt = {
    push: function(...t) {
        const e = Z.get(this);
        if (void 0 === e) return st.apply(this, t);
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
        const e = Z.get(this);
        if (void 0 === e) return rt.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        rt.apply(e.indexMap, r);
        const n = rt.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = Z.get(this);
        if (void 0 === t) return it.call(this);
        const e = t.indexMap;
        const s = it.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        it.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = Z.get(this);
        if (void 0 === t) return nt.call(this);
        const e = t.indexMap;
        const s = nt.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        nt.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = Z.get(this);
        if (void 0 === r) return ot.apply(this, t);
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
            ot.call(c, e, s, ...r);
        } else ot.apply(c, t);
        const a = ot.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = Z.get(this);
        if (void 0 === t) {
            ct.call(this);
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
        const e = Z.get(this);
        if (void 0 === e) {
            ut.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        tt(this, e.indexMap, 0, s, X);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !a(t)) t = J;
        tt(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of at) h(lt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let ft = false;

const pt = "__au_arr_on__";

function dt() {
    if (!(g(pt, Array) ?? false)) {
        v(pt, true, Array);
        for (const t of at) if (true !== et[t].observing) p(et, t, lt[t]);
    }
}

function wt() {
    for (const t of at) if (true === et[t].observing) p(et, t, ht[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!ft) {
            ft = true;
            dt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = R(t.length);
        this.lenObs = void 0;
        Z.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (_) {
            j(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = R(r);
        this.subs.notifyCollection(s, e);
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
    handleCollectionChange(t, e) {
        const s = this.index;
        const r = e[s] === s;
        if (r) return;
        const i = this.value;
        const n = this.value = this.getValue();
        if (i !== n) this.subs.notify(n, i);
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
    let e = Z.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const gt = (t, e) => t - e;

function vt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = P(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(gt);
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

function Et(t, e) {
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

const At = "__au_set_obs__";

const xt = (() => {
    let t = g(At, Set);
    if (null == t) v(At, t = new WeakMap, Set);
    return t;
})();

const Ut = Set.prototype;

const yt = Ut.add;

const mt = Ut.clear;

const St = Ut.delete;

const Ot = {
    add: yt,
    clear: mt,
    delete: St
};

const kt = [ "add", "clear", "delete" ];

const Ct = {
    add: function(t) {
        const e = xt.get(this);
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
        const t = xt.get(this);
        if (void 0 === t) return mt.call(this);
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
            mt.call(this);
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

for (const t of kt) h(Ct[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Lt = false;

const Bt = "__au_set_on__";

function Rt() {
    if (!(g(Bt, Set) ?? false)) {
        v(Bt, true, Set);
        for (const t of kt) if (true !== Ut[t].observing) h(Ut, t, {
            ...$t,
            value: Ct[t]
        });
    }
}

function Pt() {
    for (const t of kt) if (true === Ut[t].observing) h(Ut, t, {
        ...$t,
        value: Ot[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Lt) {
            Lt = true;
            Rt();
        }
        this.collection = t;
        this.indexMap = R(t.size);
        this.lenObs = void 0;
        xt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (_) {
            j(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = R(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

F(SetObserver);

function Tt(t) {
    let e = xt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Mt = "__au_map_obs__";

const _t = (() => {
    let t = g(Mt, Map);
    if (null == t) v(Mt, t = new WeakMap, Map);
    return t;
})();

const It = Map.prototype;

const jt = It.set;

const Dt = It.clear;

const Ft = It.delete;

const Vt = {
    set: jt,
    clear: Dt,
    delete: Ft
};

const Nt = [ "set", "clear", "delete" ];

const Kt = {
    set: function(t, e) {
        const s = _t.get(this);
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
        const t = _t.get(this);
        if (void 0 === t) return Dt.call(this);
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
            Dt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = _t.get(this);
        if (void 0 === e) return Ft.call(this, t);
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
                const n = Ft.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            ++r;
        }
        return false;
    }
};

const qt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Nt) h(Kt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Qt = false;

const zt = "__au_map_on__";

function Wt() {
    if (!(g(zt, Map) ?? false)) {
        v(zt, true, Map);
        for (const t of Nt) if (true !== It[t].observing) h(It, t, {
            ...qt,
            value: Kt[t]
        });
    }
}

function Gt() {
    for (const t of Nt) if (true === It[t].observing) h(It, t, {
        ...qt,
        value: Vt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Qt) {
            Qt = true;
            Wt();
        }
        this.collection = t;
        this.indexMap = R(t.size);
        this.lenObs = void 0;
        _t.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (_) {
            j(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = R(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

F(MapObserver);

function Ht(t) {
    let e = _t.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Zt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Jt() {
    return p(this, "obs", new BindingObserverRecord(this));
}

function Xt(t) {
    let e;
    if (f(t)) e = bt(t); else if (t instanceof Set) e = Tt(t); else if (t instanceof Map) e = Ht(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function Yt(t) {
    this.obs.add(t);
}

function te() {
    throw new Error(`AUR2011:handleChange`);
}

function ee() {
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
        this.o.forEach(re, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(se, this);
        this.o.clear();
        this.count = 0;
    }
}

function se(t, e) {
    e.unsubscribe(this);
}

function re(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function ie(t) {
    const e = t.prototype;
    d(e, "observe", Zt);
    d(e, "observeCollection", Xt);
    d(e, "subscribeTo", Yt);
    h(e, "obs", {
        get: Jt
    });
    d(e, "handleChange", te);
    d(e, "handleCollectionChange", ee);
    return t;
}

function ne(t) {
    return null == t ? ie : ie(t);
}

const oe = e.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.t = b();
        this.i = b();
        this.u = b();
    }
    parse(t, e) {
        let s;
        switch (e) {
          case 16:
            return new CustomExpression(t);

          case 1:
            s = this.u[t];
            if (void 0 === s) s = this.u[t] = this.$parse(t, e);
            return s;

          case 2:
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;

          default:
            if (0 === t.length) {
                if ((e & (4 | 8)) > 0) return PrimitiveLiteralExpression.$empty;
                throw ns();
            }
            s = this.t[t];
            if (void 0 === s) s = this.t[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        ve = t;
        Ee = 0;
        Ae = t.length;
        xe = 0;
        Ue = 0;
        ye = 6291456;
        me = "";
        Se = t.charCodeAt(0);
        Oe = true;
        ke = false;
        return Le(61, void 0 === e ? 8 : e);
    }
}

var ce;

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
})(ce || (ce = {}));

function ue(t) {
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

var he;

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
})(he || (he = {}));

var ae;

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
})(ae || (ae = {}));

const le = PrimitiveLiteralExpression.$false;

const fe = PrimitiveLiteralExpression.$true;

const pe = PrimitiveLiteralExpression.$null;

const de = PrimitiveLiteralExpression.$undefined;

const we = AccessThisExpression.$this;

const be = AccessThisExpression.$parent;

var ge;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(ge || (ge = {}));

let ve = "";

let Ee = 0;

let Ae = 0;

let xe = 0;

let Ue = 0;

let ye = 6291456;

let me = "";

let Se;

let Oe = true;

let ke = false;

function Ce() {
    return ve.slice(Ue, Ee);
}

function $e(t, e) {
    ve = t;
    Ee = 0;
    Ae = t.length;
    xe = 0;
    Ue = 0;
    ye = 6291456;
    me = "";
    Se = t.charCodeAt(0);
    Oe = true;
    ke = false;
    return Le(61, void 0 === e ? 8 : e);
}

function Le(t, e) {
    if (16 === e) return new CustomExpression(ve);
    if (0 === Ee) {
        if (1 & e) return Ve();
        qe();
        if (4194304 & ye) throw Ye();
    }
    Oe = 513 > t;
    ke = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & ye) {
        const t = Ss[63 & ye];
        qe();
        r = new UnaryExpression(t, Le(514, e));
        Oe = false;
    } else {
        t: switch (ye) {
          case 12294:
            i = xe;
            Oe = false;
            do {
                qe();
                ++i;
                switch (ye) {
                  case 65545:
                    qe();
                    if (0 === (12288 & ye)) throw es();
                    break;

                  case 10:
                  case 11:
                    throw es();

                  case 2162700:
                    ke = true;
                    qe();
                    if (0 === (12288 & ye)) {
                        r = 0 === i ? we : 1 === i ? be : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & ye) {
                        r = 0 === i ? we : 1 === i ? be : new AccessThisExpression(i);
                        break t;
                    }
                    throw ss();
                }
            } while (12294 === ye);

          case 4096:
            {
                const t = me;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Oe = !ke;
                qe();
                if (Je(49)) {
                    if (524296 === ye) throw ys();
                    const e = ke;
                    const s = xe;
                    ++xe;
                    const i = Le(62, 0);
                    ke = e;
                    xe = s;
                    Oe = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw ms();

          case 11:
            throw ts();

          case 12292:
            Oe = false;
            qe();
            switch (xe) {
              case 0:
                r = we;
                break;

              case 1:
                r = be;
                break;

              default:
                r = new AccessThisExpression(xe);
                break;
            }
            break;

          case 2688007:
            r = Ie(e);
            break;

          case 2688016:
            r = ve.search(/\s+of\s+/) > Ee ? Be() : je(e);
            break;

          case 524296:
            r = Fe(e);
            break;

          case 2163758:
            r = new TemplateExpression([ me ]);
            Oe = false;
            qe();
            break;

          case 2163759:
            r = Ne(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(me);
            Oe = false;
            qe();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Ss[63 & ye];
            Oe = false;
            qe();
            break;

          default:
            if (Ee >= Ae) throw rs(); else throw is();
        }
        if (2 & e) return De(r);
        if (514 < t) return r;
        if (10 === ye || 11 === ye) throw es();
        if (0 === r.$kind) switch (ye) {
          case 2162700:
            ke = true;
            Oe = false;
            qe();
            if (0 === (13312 & ye)) throw gs();
            if (12288 & ye) {
                r = new AccessScopeExpression(me, r.ancestor);
                qe();
            } else if (2688007 === ye) r = new CallFunctionExpression(r, Re(), true); else if (2688016 === ye) r = Pe(r, true); else throw vs();
            break;

          case 65545:
            Oe = !ke;
            qe();
            if (0 === (12288 & ye)) throw es();
            r = new AccessScopeExpression(me, r.ancestor);
            qe();
            break;

          case 10:
          case 11:
            throw es();

          case 2688007:
            r = new CallFunctionExpression(r, Re(), s);
            break;

          case 2688016:
            r = Pe(r, s);
            break;

          case 2163758:
            r = Ke(r);
            break;

          case 2163759:
            r = Ne(e, r, true);
            break;
        }
        while ((65536 & ye) > 0) switch (ye) {
          case 2162700:
            r = Te(r);
            break;

          case 65545:
            qe();
            if (0 === (12288 & ye)) throw es();
            r = Me(r, false);
            break;

          case 10:
          case 11:
            throw es();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Re(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Re(), r.optional, false); else r = new CallFunctionExpression(r, Re(), false);
            break;

          case 2688016:
            r = Pe(r, false);
            break;

          case 2163758:
            if (ke) throw vs();
            r = Ke(r);
            break;

          case 2163759:
            if (ke) throw vs();
            r = Ne(e, r, true);
            break;
        }
    }
    if (10 === ye || 11 === ye) throw es();
    if (513 < t) return r;
    while ((262144 & ye) > 0) {
        const s = ye;
        if ((960 & s) <= t) break;
        qe();
        r = new BinaryExpression(Ss[63 & s], r, Le(960 & s, e));
        Oe = false;
    }
    if (63 < t) return r;
    if (Je(6291477)) {
        const t = Le(62, e);
        Xe(6291476);
        r = new ConditionalExpression(r, t, Le(62, e));
        Oe = false;
    }
    if (62 < t) return r;
    if (Je(4194348)) {
        if (!Oe) throw os();
        r = new AssignExpression(r, Le(62, e));
    }
    if (61 < t) return r;
    while (Je(6291479)) {
        if (6291456 === ye) throw cs();
        const t = me;
        qe();
        const s = new Array;
        while (Je(6291476)) s.push(Le(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Je(6291478)) {
        if (6291456 === ye) throw us();
        const t = me;
        qe();
        const s = new Array;
        while (Je(6291476)) s.push(Le(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== ye) {
        if ((1 & e) > 0 && 7340045 === ye) return r;
        if ("of" === Ce()) throw hs();
        throw is();
    }
    return r;
}

function Be() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        qe();
        switch (ye) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Ce();
            break;

          default:
            throw bs();
        }
    }
    Xe(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(we, s), new AccessKeyedExpression(we, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Re() {
    const t = ke;
    qe();
    const e = [];
    while (7340046 !== ye) {
        e.push(Le(62, 0));
        if (!Je(6291471)) break;
    }
    Xe(7340046);
    Oe = false;
    ke = t;
    return e;
}

function Pe(t, e) {
    const s = ke;
    qe();
    t = new AccessKeyedExpression(t, Le(62, 0), e);
    Xe(7340051);
    Oe = !s;
    ke = s;
    return t;
}

function Te(t) {
    ke = true;
    Oe = false;
    qe();
    if (0 === (13312 & ye)) throw gs();
    if (12288 & ye) return Me(t, true);
    if (2688007 === ye) if (1 === t.$kind) return new CallScopeExpression(t.name, Re(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Re(), t.optional, true); else return new CallFunctionExpression(t, Re(), true);
    if (2688016 === ye) return Pe(t, true);
    throw vs();
}

function Me(t, e) {
    const s = me;
    switch (ye) {
      case 2162700:
        {
            ke = true;
            Oe = false;
            const r = Ee;
            const i = Ue;
            const n = ye;
            const o = Se;
            const c = me;
            const u = Oe;
            const h = ke;
            qe();
            if (0 === (13312 & ye)) throw gs();
            if (2688007 === ye) return new CallMemberExpression(t, s, Re(), e, true);
            Ee = r;
            Ue = i;
            ye = n;
            Se = o;
            me = c;
            Oe = u;
            ke = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Oe = false;
        return new CallMemberExpression(t, s, Re(), e, false);

      default:
        Oe = !ke;
        qe();
        return new AccessMemberExpression(t, s, e);
    }
}

var _e;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(_e || (_e = {}));

function Ie(t) {
    qe();
    const e = Ee;
    const s = Ue;
    const r = ye;
    const i = Se;
    const n = me;
    const o = Oe;
    const c = ke;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === ye) {
            qe();
            if (4096 !== ye) throw es();
            u.push(new BindingIdentifier(me));
            qe();
            if (6291471 === ye) throw Us();
            if (7340046 !== ye) throw ts();
            qe();
            if (49 !== ye) throw ts();
            qe();
            const t = ke;
            const e = xe;
            ++xe;
            const s = Le(62, 0);
            ke = t;
            xe = e;
            Oe = false;
            return new ArrowFunction(u, s, true);
        }
        switch (ye) {
          case 4096:
            u.push(new BindingIdentifier(me));
            qe();
            break;

          case 7340046:
            qe();
            break t;

          case 524296:
          case 2688016:
            qe();
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
            qe();
            h = 2;
            break;
        }
        switch (ye) {
          case 6291471:
            qe();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            qe();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw Es();
            qe();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === ye) {
        if (1 === h) {
            qe();
            if (524296 === ye) throw ys();
            const t = ke;
            const e = xe;
            ++xe;
            const s = Le(62, 0);
            ke = t;
            xe = e;
            Oe = false;
            return new ArrowFunction(u, s);
        }
        throw Es();
    } else if (1 === h && 0 === u.length) throw ds(49);
    if (a) switch (h) {
      case 2:
        throw Es();

      case 3:
        throw As();

      case 4:
        throw xs();
    }
    Ee = e;
    Ue = s;
    ye = r;
    Se = i;
    me = n;
    Oe = o;
    ke = c;
    const l = ke;
    const f = Le(62, t);
    ke = l;
    Xe(7340046);
    if (49 === ye) switch (h) {
      case 2:
        throw Es();

      case 3:
        throw As();

      case 4:
        throw xs();
    }
    return f;
}

function je(t) {
    const e = ke;
    qe();
    const s = new Array;
    while (7340051 !== ye) if (Je(6291471)) {
        s.push(de);
        if (7340051 === ye) break;
    } else {
        s.push(Le(62, ~2 & t));
        if (Je(6291471)) {
            if (7340051 === ye) break;
        } else break;
    }
    ke = e;
    Xe(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Oe = false;
        return new ArrayLiteralExpression(s);
    }
}

function De(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw as();
    if (4204592 !== ye) throw as();
    qe();
    const e = t;
    const s = Le(61, 0);
    return new ForOfStatement(e, s);
}

function Fe(t) {
    const e = ke;
    const s = new Array;
    const r = new Array;
    qe();
    while (7340045 !== ye) {
        s.push(me);
        if (49152 & ye) {
            qe();
            Xe(6291476);
            r.push(Le(62, ~2 & t));
        } else if (12288 & ye) {
            const e = Se;
            const s = ye;
            const i = Ee;
            qe();
            if (Je(6291476)) r.push(Le(62, ~2 & t)); else {
                Se = e;
                ye = s;
                Ee = i;
                r.push(Le(515, ~2 & t));
            }
        } else throw ls();
        if (7340045 !== ye) Xe(6291471);
    }
    ke = e;
    Xe(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Oe = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function Ve() {
    const t = [];
    const e = [];
    const s = Ae;
    let r = "";
    while (Ee < s) {
        switch (Se) {
          case 36:
            if (123 === ve.charCodeAt(Ee + 1)) {
                t.push(r);
                r = "";
                Ee += 2;
                Se = ve.charCodeAt(Ee);
                qe();
                const s = Le(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(ue(Qe()));
            break;

          default:
            r += String.fromCharCode(Se);
        }
        Qe();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ne(t, e, s) {
    const r = ke;
    const i = [ me ];
    Xe(2163759);
    const n = [ Le(62, t) ];
    while (2163758 !== (ye = Ze())) {
        i.push(me);
        Xe(2163759);
        n.push(Le(62, t));
    }
    i.push(me);
    Oe = false;
    ke = r;
    if (s) {
        qe();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        qe();
        return new TemplateExpression(i, n);
    }
}

function Ke(t) {
    Oe = false;
    const e = [ me ];
    qe();
    return new TaggedTemplateExpression(e, e, t);
}

function qe() {
    while (Ee < Ae) {
        Ue = Ee;
        if (null != (ye = Rs[Se]())) return;
    }
    ye = 6291456;
}

function Qe() {
    return Se = ve.charCodeAt(++Ee);
}

function ze() {
    while (Bs[Qe()]) ;
    const t = Os[me = Ce()];
    return void 0 === t ? 4096 : t;
}

function We(t) {
    let e = Se;
    if (false === t) {
        do {
            e = Qe();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            me = parseInt(Ce(), 10);
            return 32768;
        }
        e = Qe();
        if (Ee >= Ae) {
            me = parseInt(Ce().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Qe();
    } while (e <= 57 && e >= 48); else Se = ve.charCodeAt(--Ee);
    me = parseFloat(Ce());
    return 32768;
}

function Ge() {
    const t = Se;
    Qe();
    let e = 0;
    const s = new Array;
    let r = Ee;
    while (Se !== t) if (92 === Se) {
        s.push(ve.slice(r, Ee));
        Qe();
        e = ue(Se);
        Qe();
        s.push(String.fromCharCode(e));
        r = Ee;
    } else if (Ee >= Ae) throw fs(); else Qe();
    const i = ve.slice(r, Ee);
    Qe();
    s.push(i);
    const n = s.join("");
    me = n;
    return 16384;
}

function He() {
    let t = true;
    let e = "";
    while (96 !== Qe()) if (36 === Se) if (Ee + 1 < Ae && 123 === ve.charCodeAt(Ee + 1)) {
        Ee++;
        t = false;
        break;
    } else e += "$"; else if (92 === Se) e += String.fromCharCode(ue(Qe())); else {
        if (Ee >= Ae) throw ps();
        e += String.fromCharCode(Se);
    }
    Qe();
    me = e;
    if (t) return 2163758;
    return 2163759;
}

function Ze() {
    if (Ee >= Ae) throw ps();
    Ee--;
    return He();
}

function Je(t) {
    if (ye === t) {
        qe();
        return true;
    }
    return false;
}

function Xe(t) {
    if (ye === t) qe(); else throw ds(t);
}

function Ye() {
    return new Error(`AUR0151:${ve}`);
}

function ts() {
    return new Error(`AUR0152:${ve}`);
}

function es() {
    return new Error(`AUR0153:${ve}`);
}

function ss() {
    return new Error(`AUR0154:${ve}`);
}

function rs() {
    return new Error(`AUR0155:${ve}`);
}

function is() {
    return new Error(`AUR0156:${ve}`);
}

function ns() {
    return new Error(`AUR0157`);
}

function os() {
    return new Error(`AUR0158:${ve}`);
}

function cs() {
    return new Error(`AUR0159:${ve}`);
}

function us() {
    return new Error(`AUR0160:${ve}`);
}

function hs() {
    return new Error(`AUR0161:${ve}`);
}

function as() {
    return new Error(`AUR0163:${ve}`);
}

function ls() {
    return new Error(`AUR0164:${ve}`);
}

function fs() {
    return new Error(`AUR0165:${ve}`);
}

function ps() {
    return new Error(`AUR0166:${ve}`);
}

function ds(t) {
    return new Error(`AUR0167:${ve}<${Ss[63 & t]}`);
}

const ws = () => {
    throw new Error(`AUR0168:${ve}`);
};

ws.notMapped = true;

function bs() {
    return new Error(`AUR0170:${ve}`);
}

function gs() {
    return new Error(`AUR0171:${ve}`);
}

function vs() {
    return new Error(`AUR0172:${ve}`);
}

function Es() {
    return new Error(`AUR0173:${ve}`);
}

function As() {
    return new Error(`AUR0174:${ve}`);
}

function xs() {
    return new Error(`AUR0175:${ve}`);
}

function Us() {
    return new Error(`AUR0176:${ve}`);
}

function ys() {
    return new Error(`AUR0178:${ve}`);
}

function ms() {
    return new Error(`AUR0179:${ve}`);
}

const Ss = [ le, fe, pe, de, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Os = Object.assign(Object.create(null), {
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

const ks = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Cs(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function $s(t) {
    return () => {
        Qe();
        return t;
    };
}

const Ls = new Set;

Cs(null, Ls, ks.AsciiIdPart, true);

const Bs = new Uint8Array(65535);

Cs(Bs, null, ks.IdStart, 1);

Cs(Bs, null, ks.Digit, 1);

const Rs = new Array(65535);

Rs.fill(ws, 0, 65535);

Cs(Rs, null, ks.Skip, (() => {
    Qe();
    return null;
}));

Cs(Rs, null, ks.IdStart, ze);

Cs(Rs, null, ks.Digit, (() => We(false)));

Rs[34] = Rs[39] = () => Ge();

Rs[96] = () => He();

Rs[33] = () => {
    if (61 !== Qe()) return 131117;
    if (61 !== Qe()) return 6553948;
    Qe();
    return 6553950;
};

Rs[61] = () => {
    if (62 === Qe()) {
        Qe();
        return 49;
    }
    if (61 !== Se) return 4194348;
    if (61 !== Qe()) return 6553947;
    Qe();
    return 6553949;
};

Rs[38] = () => {
    if (38 !== Qe()) return 6291478;
    Qe();
    return 6553882;
};

Rs[124] = () => {
    if (124 !== Qe()) return 6291479;
    Qe();
    return 6553817;
};

Rs[63] = () => {
    if (46 === Qe()) {
        const t = ve.charCodeAt(Ee + 1);
        if (t <= 48 || t >= 57) {
            Qe();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Se) return 6291477;
    Qe();
    return 6553752;
};

Rs[46] = () => {
    if (Qe() <= 57 && Se >= 48) return We(true);
    if (46 === Se) {
        if (46 !== Qe()) return 10;
        Qe();
        return 11;
    }
    return 65545;
};

Rs[60] = () => {
    if (61 !== Qe()) return 6554015;
    Qe();
    return 6554017;
};

Rs[62] = () => {
    if (61 !== Qe()) return 6554016;
    Qe();
    return 6554018;
};

Rs[37] = $s(6554154);

Rs[40] = $s(2688007);

Rs[41] = $s(7340046);

Rs[42] = $s(6554153);

Rs[43] = $s(2490853);

Rs[44] = $s(6291471);

Rs[45] = $s(2490854);

Rs[47] = $s(6554155);

Rs[58] = $s(6291476);

Rs[91] = $s(2688016);

Rs[93] = $s(7340051);

Rs[123] = $s(524296);

Rs[125] = $s(7340045);

let Ps = null;

const Ts = [];

let Ms = false;

function _s() {
    Ms = false;
}

function Is() {
    Ms = true;
}

function js() {
    return Ps;
}

function Ds(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Ps) {
        Ps = t;
        Ts[0] = Ps;
        Ms = true;
        return;
    }
    if (Ps === t) throw new Error(`AUR0207`);
    Ts.push(t);
    Ps = t;
    Ms = true;
}

function Fs(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Ps !== t) throw new Error(`AUR0209`);
    Ts.pop();
    Ps = Ts.length > 0 ? Ts[Ts.length - 1] : null;
    Ms = null != Ps;
}

const Vs = Object.freeze({
    get current() {
        return Ps;
    },
    get connecting() {
        return Ms;
    },
    enter: Ds,
    exit: Fs,
    pause: _s,
    resume: Is
});

const Ns = Reflect.get;

const Ks = Object.prototype.toString;

const qs = new WeakMap;

function Qs(t) {
    switch (Ks.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const zs = "__raw__";

function Ws(t) {
    return Qs(t) ? Gs(t) : t;
}

function Gs(t) {
    return qs.get(t) ?? Xs(t);
}

function Hs(t) {
    return t[zs] ?? t;
}

function Zs(t) {
    return Qs(t) && t[zs] || t;
}

function Js(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Xs(t) {
    const e = f(t) ? tr : t instanceof Map || t instanceof Set ? yr : Ys;
    const s = new Proxy(t, e);
    qs.set(t, s);
    return s;
}

const Ys = {
    get(t, e, s) {
        if (e === zs) return t;
        const r = js();
        if (!Ms || Js(e) || null == r) return Ns(t, e, s);
        r.observe(t, e);
        return Ws(Ns(t, e, s));
    }
};

const tr = {
    get(t, e, s) {
        if (e === zs) return t;
        const r = js();
        if (!Ms || Js(e) || null == r) return Ns(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return er;

          case "includes":
            return ir;

          case "indexOf":
            return nr;

          case "lastIndexOf":
            return or;

          case "every":
            return sr;

          case "filter":
            return rr;

          case "find":
            return ur;

          case "findIndex":
            return cr;

          case "flat":
            return hr;

          case "flatMap":
            return ar;

          case "join":
            return lr;

          case "push":
            return pr;

          case "pop":
            return fr;

          case "reduce":
            return xr;

          case "reduceRight":
            return Ur;

          case "reverse":
            return gr;

          case "shift":
            return dr;

          case "unshift":
            return wr;

          case "slice":
            return Ar;

          case "splice":
            return br;

          case "some":
            return vr;

          case "sort":
            return Er;

          case "keys":
            return Br;

          case "values":
          case Symbol.iterator:
            return Rr;

          case "entries":
            return Pr;
        }
        r.observe(t, e);
        return Ws(Ns(t, e, s));
    },
    ownKeys(t) {
        js()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function er(t, e) {
    const s = Hs(this);
    const r = s.map(((s, r) => Zs(t.call(e, Ws(s), r, this))));
    js()?.observeCollection(s);
    return Ws(r);
}

function sr(t, e) {
    const s = Hs(this);
    const r = s.every(((s, r) => t.call(e, Ws(s), r, this)));
    js()?.observeCollection(s);
    return r;
}

function rr(t, e) {
    const s = Hs(this);
    const r = s.filter(((s, r) => Zs(t.call(e, Ws(s), r, this))));
    js()?.observeCollection(s);
    return Ws(r);
}

function ir(t) {
    const e = Hs(this);
    const s = e.includes(Zs(t));
    js()?.observeCollection(e);
    return s;
}

function nr(t) {
    const e = Hs(this);
    const s = e.indexOf(Zs(t));
    js()?.observeCollection(e);
    return s;
}

function or(t) {
    const e = Hs(this);
    const s = e.lastIndexOf(Zs(t));
    js()?.observeCollection(e);
    return s;
}

function cr(t, e) {
    const s = Hs(this);
    const r = s.findIndex(((s, r) => Zs(t.call(e, Ws(s), r, this))));
    js()?.observeCollection(s);
    return r;
}

function ur(t, e) {
    const s = Hs(this);
    const r = s.find(((e, s) => t(Ws(e), s, this)), e);
    js()?.observeCollection(s);
    return Ws(r);
}

function hr() {
    const t = Hs(this);
    js()?.observeCollection(t);
    return Ws(t.flat());
}

function ar(t, e) {
    const s = Hs(this);
    js()?.observeCollection(s);
    return Gs(s.flatMap(((s, r) => Ws(t.call(e, Ws(s), r, this)))));
}

function lr(t) {
    const e = Hs(this);
    js()?.observeCollection(e);
    return e.join(t);
}

function fr() {
    return Ws(Hs(this).pop());
}

function pr(...t) {
    return Hs(this).push(...t);
}

function dr() {
    return Ws(Hs(this).shift());
}

function wr(...t) {
    return Hs(this).unshift(...t);
}

function br(...t) {
    return Ws(Hs(this).splice(...t));
}

function gr(...t) {
    const e = Hs(this);
    const s = e.reverse();
    js()?.observeCollection(e);
    return Ws(s);
}

function vr(t, e) {
    const s = Hs(this);
    const r = s.some(((s, r) => Zs(t.call(e, Ws(s), r, this))));
    js()?.observeCollection(s);
    return r;
}

function Er(t) {
    const e = Hs(this);
    const s = e.sort(t);
    js()?.observeCollection(e);
    return Ws(s);
}

function Ar(t, e) {
    const s = Hs(this);
    js()?.observeCollection(s);
    return Gs(s.slice(t, e));
}

function xr(t, e) {
    const s = Hs(this);
    const r = s.reduce(((e, s, r) => t(e, Ws(s), r, this)), e);
    js()?.observeCollection(s);
    return Ws(r);
}

function Ur(t, e) {
    const s = Hs(this);
    const r = s.reduceRight(((e, s, r) => t(e, Ws(s), r, this)), e);
    js()?.observeCollection(s);
    return Ws(r);
}

const yr = {
    get(t, e, s) {
        if (e === zs) return t;
        const r = js();
        if (!Ms || Js(e) || null == r) return Ns(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return $r;

          case "delete":
            return Lr;

          case "forEach":
            return mr;

          case "add":
            if (t instanceof Set) return Cr;
            break;

          case "get":
            if (t instanceof Map) return Or;
            break;

          case "set":
            if (t instanceof Map) return kr;
            break;

          case "has":
            return Sr;

          case "keys":
            return Br;

          case "values":
            return Rr;

          case "entries":
            return Pr;

          case Symbol.iterator:
            return t instanceof Map ? Pr : Rr;
        }
        return Ws(Ns(t, e, s));
    }
};

function mr(t, e) {
    const s = Hs(this);
    js()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Ws(s), Ws(r), this);
    }));
}

function Sr(t) {
    const e = Hs(this);
    js()?.observeCollection(e);
    return e.has(Zs(t));
}

function Or(t) {
    const e = Hs(this);
    js()?.observeCollection(e);
    return Ws(e.get(Zs(t)));
}

function kr(t, e) {
    return Ws(Hs(this).set(Zs(t), Zs(e)));
}

function Cr(t) {
    return Ws(Hs(this).add(Zs(t)));
}

function $r() {
    return Ws(Hs(this).clear());
}

function Lr(t) {
    return Ws(Hs(this).delete(Zs(t)));
}

function Br() {
    const t = Hs(this);
    js()?.observeCollection(t);
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
                value: Ws(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Rr() {
    const t = Hs(this);
    js()?.observeCollection(t);
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
                value: Ws(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Pr() {
    const t = Hs(this);
    js()?.observeCollection(t);
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
                value: [ Ws(s[0]), Ws(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Tr = Object.freeze({
    getProxy: Gs,
    getRaw: Hs,
    wrap: Ws,
    unwrap: Zs,
    rawKey: zs
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
        h(t, e, {
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
        if (a(this.$set)) {
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
    run() {
        if (this.ir) return;
        const t = this.v;
        const e = this.compute();
        this.D = false;
        if (!Object.is(e, t)) {
            this.ov = t;
            Mr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Mr);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            Ds(this);
            return this.v = Zs(this.$get.call(this.up ? Ws(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Fs(this);
        }
    }
}

ne(ComputedObserver);

F(ComputedObserver);

let Mr;

const _r = e.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Ir = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const jr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.h = null;
        this.A = 0;
        this.check = () => {
            if (Ir.disabled) return;
            if (++this.A < Ir.timeoutsPerCheck) return;
            this.A = 0;
            const t = this.tracked;
            const e = t.length;
            let s;
            let r = 0;
            for (;r < e; ++r) {
                s = t[r];
                if (s.isDirty()) s.flush();
            }
        };
    }
    createProperty(t, e) {
        if (Ir.throw) throw new Error(`AUR0222:${w(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.h = this.p.taskQueue.queueTask(this.check, jr);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.h.cancel();
            this.h = null;
        }
    }
}

DirtyChecker.inject = [ i ];

class DirtyCheckProperty {
    constructor(t, e, s) {
        this.obj = e;
        this.key = s;
        this.type = 0;
        this.ov = void 0;
        this.U = t;
    }
    getValue() {
        return this.obj[this.key];
    }
    setValue(t) {
        throw new Error(`Trying to set value for property ${w(this.key)} in dirty checker`);
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
            this.U.addProperty(this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.U.removeProperty(this);
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

class SetterObserver {
    constructor(t, e) {
        this.type = 1;
        this.v = void 0;
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
            Dr = this.v;
            this.v = t;
            this.subs.notify(t, Dr);
        } else this.o[this.k] = t;
    }
    subscribe(t) {
        if (false === this.iO) this.start();
        this.subs.add(t);
    }
    start() {
        if (false === this.iO) {
            this.iO = true;
            this.v = this.o[this.k];
            h(this.o, this.k, {
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
            h(this.o, this.k, {
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
        this.hs = a(s);
        const i = t[e];
        this.cb = a(i) ? i : void 0;
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
            Dr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Dr);
        }
    }
}

F(SetterObserver);

F(SetterNotifier);

let Dr;

const Fr = new PropertyAccessor;

const Vr = e.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Nr = e.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Fr;
    }
    getAccessor() {
        return Fr;
    }
}

class ObserverLocator {
    constructor(t, e) {
        this.O = [];
        this.U = t;
        this.C = e;
    }
    addAdapter(t) {
        this.O.push(t);
    }
    getObserver(t, e) {
        if (null == t) throw Wr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = zr(t);
        let r = s[e];
        if (void 0 === r) {
            r = this.createObserver(t, e);
            if (!r.doNotCache) s[e] = r;
        }
        return r;
    }
    getAccessor(t, e) {
        const s = t.$observers?.[e];
        if (void 0 !== s) return s;
        if (this.C.handles(t, e, this)) return this.C.getAccessor(t, e, this);
        return Fr;
    }
    getArrayObserver(t) {
        return bt(t);
    }
    getMapObserver(t) {
        return Ht(t);
    }
    getSetObserver(t) {
        return Tt(t);
    }
    createObserver(t, e) {
        if (this.C.handles(t, e, this)) return this.C.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (f(t)) return bt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return Ht(t).getLengthObserver(); else if (t instanceof Set) return Tt(t).getLengthObserver();
            break;

          default:
            if (f(t) && r(e)) return bt(t).getIndexObserver(Number(e));
            break;
        }
        let s = Qr(t, e);
        if (void 0 === s) {
            let r = qr(t);
            while (null !== r) {
                s = Qr(r, e);
                if (void 0 === s) r = qr(r); else break;
            }
        }
        if (void 0 !== s && !u.call(s, "value")) {
            let r = this.$(t, e, s);
            if (null == r) r = (s.get?.getObserver ?? s.set?.getObserver)?.(t, this);
            return null == r ? s.configurable ? ComputedObserver.create(t, e, s, this, true) : this.U.createProperty(t, e) : r;
        }
        return new SetterObserver(t, e);
    }
    $(t, e, s) {
        if (this.O.length > 0) for (const r of this.O) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
}

ObserverLocator.inject = [ _r, Nr ];

const Kr = t => {
    let e;
    if (f(t)) e = bt(t); else if (t instanceof Map) e = Ht(t); else if (t instanceof Set) e = Tt(t);
    return e;
};

const qr = Object.getPrototypeOf;

const Qr = Object.getOwnPropertyDescriptor;

const zr = t => {
    let e = t.$observers;
    if (void 0 === e) h(t, "$observers", {
        enumerable: false,
        value: e = b()
    });
    return e;
};

const Wr = t => new Error(`AUR0199:${w(t)}`);

const Gr = e.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Vr ];
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
            Ds(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Fs(this);
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

ne(Effect);

function Hr(t) {
    if (void 0 === t.$observers) h(t, "$observers", {
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
        const n = r.callback || `${w(e)}Changed`;
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
            js()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Xr(this, e, n, o, c).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Xr(s, e, n, o, c);
        };
        if (i) h(t.prototype, e, s); else return s;
    }
}

function Xr(t, e, s, r, i) {
    const n = Hr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Zr ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, L as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, $ as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, Vs as ConnectableSwitcher, CustomExpression, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Ir as DirtyCheckSettings, A as ExpressionKind, ge as ExpressionType, ForOfStatement, C as ICoercionConfiguration, _r as IDirtyChecker, oe as IExpressionParser, Nr as INodeObserverLocator, Gr as IObservation, Vr as IObserverLocator, E as ISignaler, Interpolation, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Tr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, ValueConverterExpression, vt as applyMutationsToIndices, I as batch, P as cloneIndexMap, ne as connectable, B as copyIndexMap, R as createIndexMap, wt as disableArrayObservation, Gt as disableMapObservation, Pt as disableSetObservation, dt as enableArrayObservation, Wt as enableMapObservation, Rt as enableSetObservation, Kr as getCollectionObserver, zr as getObserverLookup, T as isIndexMap, Jr as observable, $e as parseExpression, F as subscriberCollection, Et as synchronizeIndices };

