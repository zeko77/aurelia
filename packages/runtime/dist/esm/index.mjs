import { Protocol as t, DI as e, emptyArray as s, isArrayIndex as r, IPlatform as i } from "@aurelia/kernel";

import { Metadata as n } from "@aurelia/metadata";

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
        } else throw y(s);
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

const y = t => new Error(`AUR0102:${t}`);

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
        if (null == i) throw U(r);
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s), ...this.args.map((r => r.evaluate(t, e, s))));
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw U(r);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, null))));
        return this.expression.assign(t, e, s);
    }
    bind(t, e) {
        const s = this.name;
        const r = e.getConverter?.(s);
        if (null == r) throw U(s);
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

const U = t => new Error(`AUR0103:${t}`);

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
        if (e?.strict) return i;
        return null == i ? "" : i;
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

let I = false;

function _(t) {
    const e = M;
    const s = M = new Map;
    I = true;
    try {
        t();
    } finally {
        M = null;
        I = false;
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
    d(e, "unsubscribe", Q);
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

function Q(t) {
    return this.subs.remove(t);
}

var q;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Sub0"] = 1] = "Sub0";
    t[t["Sub1"] = 2] = "Sub1";
    t[t["Sub2"] = 4] = "Sub2";
    t[t["SubRest"] = 8] = "SubRest";
    t[t["Any"] = 15] = "Any";
})(q || (q = {}));

function z(t) {
    return null == t ? W : W(t);
}

function W(t) {
    const e = t.prototype;
    h(e, "queue", {
        get: H
    });
}

const G = e.createInterface("IFlushQueue", (t => t.instance(FlushQueue.instance)));

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
            this.i.forEach(Z);
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

function H() {
    return FlushQueue.instance;
}

function Z(t, e, s) {
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
        if (t !== e && r(t)) {
            this.o.length = t;
            this.v = t;
            this.u = e;
            this.queue.add(this);
        }
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.length;
        if ((this.v = r) !== s) {
            this.u = s;
            this.queue.add(this);
        }
    }
    flush() {
        tt = this.u;
        this.u = this.v;
        this.subs.notify(this.v, tt);
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
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.size;
        if ((this.v = r) !== s) {
            this.u = s;
            this.queue.add(this);
        }
    }
    flush() {
        tt = this.u;
        this.u = this.v;
        this.subs.notify(this.v, tt);
    }
}

function J(t) {
    const e = t.prototype;
    d(e, "subscribe", X);
    d(e, "unsubscribe", Y);
    z(t);
    F(t);
}

function X(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function Y(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

J(CollectionLengthObserver);

J(CollectionSizeObserver);

let tt;

const et = "__au_array_obs__";

const st = (() => {
    let t = g(et, Array);
    if (null == t) v(et, t = new WeakMap, Array);
    return t;
})();

function rt(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function it(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function nt(t, e, s, r, i) {
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

function ot(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let p, d, w;
    let b, g;
    let v, E, A, x;
    let y, U, m, S;
    while (true) {
        if (r - s <= 10) {
            nt(t, e, s, r, i);
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
            y = t[o];
            U = e[o];
            m = i(y, v);
            if (m < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = y;
                e[A] = U;
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
                t[x] = y;
                e[x] = U;
                if (m < 0) {
                    y = t[o];
                    U = e[o];
                    t[o] = t[A];
                    e[o] = e[A];
                    t[A] = y;
                    e[A] = U;
                    A++;
                }
            }
        }
        if (r - x < A - s) {
            ot(t, e, x, r, i);
            r = A;
        } else {
            ot(t, e, s, A, i);
            s = x;
        }
    }
}

const ct = Array.prototype;

const ut = ct.push;

const ht = ct.unshift;

const at = ct.pop;

const lt = ct.shift;

const ft = ct.splice;

const pt = ct.reverse;

const dt = ct.sort;

const wt = {
    push: ut,
    unshift: ht,
    pop: at,
    shift: lt,
    splice: ft,
    reverse: pt,
    sort: dt
};

const bt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const gt = {
    push: function(...t) {
        const e = st.get(this);
        if (void 0 === e) return ut.apply(this, t);
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
        const e = st.get(this);
        if (void 0 === e) return ht.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        ht.apply(e.indexMap, r);
        const n = ht.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = st.get(this);
        if (void 0 === t) return at.call(this);
        const e = t.indexMap;
        const s = at.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        at.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = st.get(this);
        if (void 0 === t) return lt.call(this);
        const e = t.indexMap;
        const s = lt.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        lt.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = st.get(this);
        if (void 0 === r) return ft.apply(this, t);
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
            ft.call(c, e, s, ...r);
        } else ft.apply(c, t);
        const a = ft.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = st.get(this);
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
        const e = st.get(this);
        if (void 0 === e) {
            dt.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        ot(this, e.indexMap, 0, s, it);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !a(t)) t = rt;
        ot(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of bt) h(gt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let vt = false;

const Et = "__au_arr_on__";

function At() {
    if (!(g(Et, Array) ?? false)) {
        v(Et, true, Array);
        for (const t of bt) if (true !== ct[t].observing) p(ct, t, gt[t]);
    }
}

function xt() {
    for (const t of bt) if (true === ct[t].observing) p(ct, t, wt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!vt) {
            vt = true;
            At();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = R(t.length);
        this.lenObs = void 0;
        st.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
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

function yt(t) {
    let e = st.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const Ut = (t, e) => t - e;

function mt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = P(t);
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

const Ot = "__au_set_obs__";

const kt = (() => {
    let t = g(Ot, Set);
    if (null == t) v(Ot, t = new WeakMap, Set);
    return t;
})();

const Ct = Set.prototype;

const $t = Ct.add;

const Lt = Ct.clear;

const Bt = Ct.delete;

const Rt = {
    add: $t,
    clear: Lt,
    delete: Bt
};

const Pt = [ "add", "clear", "delete" ];

const Tt = {
    add: function(t) {
        const e = kt.get(this);
        if (void 0 === e) {
            $t.call(this, t);
            return this;
        }
        const s = this.size;
        $t.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
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
            r++;
        }
        return false;
    }
};

const Mt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Pt) h(Tt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let It = false;

const _t = "__au_set_on__";

function jt() {
    if (!(g(_t, Set) ?? false)) {
        v(_t, true, Set);
        for (const t of Pt) if (true !== Ct[t].observing) h(Ct, t, {
            ...Mt,
            value: Tt[t]
        });
    }
}

function Dt() {
    for (const t of Pt) if (true === Ct[t].observing) h(Ct, t, {
        ...Mt,
        value: Rt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!It) {
            It = true;
            jt();
        }
        this.collection = t;
        this.indexMap = R(t.size);
        this.lenObs = void 0;
        kt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
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

function Ft(t) {
    let e = kt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Vt = "__au_map_obs__";

const Nt = (() => {
    let t = g(Vt, Map);
    if (null == t) v(Vt, t = new WeakMap, Map);
    return t;
})();

const Kt = Map.prototype;

const Qt = Kt.set;

const qt = Kt.clear;

const zt = Kt.delete;

const Wt = {
    set: Qt,
    clear: qt,
    delete: zt
};

const Gt = [ "set", "clear", "delete" ];

const Ht = {
    set: function(t, e) {
        const s = Nt.get(this);
        if (void 0 === s) {
            Qt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Qt.call(this, t, e);
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
        const t = Nt.get(this);
        if (void 0 === t) return qt.call(this);
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
            qt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Nt.get(this);
        if (void 0 === e) return zt.call(this, t);
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
                const n = zt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            ++r;
        }
        return false;
    }
};

const Zt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Gt) h(Ht[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Jt = false;

const Xt = "__au_map_on__";

function Yt() {
    if (!(g(Xt, Map) ?? false)) {
        v(Xt, true, Map);
        for (const t of Gt) if (true !== Kt[t].observing) h(Kt, t, {
            ...Zt,
            value: Ht[t]
        });
    }
}

function te() {
    for (const t of Gt) if (true === Kt[t].observing) h(Kt, t, {
        ...Zt,
        value: Wt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Jt) {
            Jt = true;
            Yt();
        }
        this.collection = t;
        this.indexMap = R(t.size);
        this.lenObs = void 0;
        Nt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
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

function ee(t) {
    let e = Nt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function se(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function re() {
    return p(this, "obs", new BindingObserverRecord(this));
}

function ie(t) {
    let e;
    if (f(t)) e = yt(t); else if (t instanceof Set) e = Ft(t); else if (t instanceof Map) e = ee(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function ne(t) {
    this.obs.add(t);
}

function oe() {
    throw new Error(`AUR2011:handleChange`);
}

function ce() {
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
        this.o.forEach(he, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(ue, this);
        this.o.clear();
        this.count = 0;
    }
}

function ue(t, e) {
    e.unsubscribe(this);
}

function he(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function ae(t) {
    const e = t.prototype;
    d(e, "observe", se);
    d(e, "observeCollection", ie);
    d(e, "subscribeTo", ne);
    h(e, "obs", {
        get: re
    });
    d(e, "handleChange", oe);
    d(e, "handleCollectionChange", ce);
    return t;
}

function le(t) {
    return null == t ? ae : ae(t);
}

const fe = e.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

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
                throw ls();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        me = t;
        Se = 0;
        Oe = t.length;
        ke = 0;
        Ce = 0;
        $e = 6291456;
        Le = "";
        Be = t.charCodeAt(0);
        Re = true;
        Pe = false;
        return Ie(61, void 0 === e ? 8 : e);
    }
}

var pe;

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
})(pe || (pe = {}));

function de(t) {
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

var we;

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
})(we || (we = {}));

var be;

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
})(be || (be = {}));

const ge = PrimitiveLiteralExpression.$false;

const ve = PrimitiveLiteralExpression.$true;

const Ee = PrimitiveLiteralExpression.$null;

const Ae = PrimitiveLiteralExpression.$undefined;

const xe = AccessThisExpression.$this;

const ye = AccessThisExpression.$parent;

var Ue;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(Ue || (Ue = {}));

let me = "";

let Se = 0;

let Oe = 0;

let ke = 0;

let Ce = 0;

let $e = 6291456;

let Le = "";

let Be;

let Re = true;

let Pe = false;

function Te() {
    return me.slice(Ce, Se);
}

function Me(t, e) {
    me = t;
    Se = 0;
    Oe = t.length;
    ke = 0;
    Ce = 0;
    $e = 6291456;
    Le = "";
    Be = t.charCodeAt(0);
    Re = true;
    Pe = false;
    return Ie(61, void 0 === e ? 8 : e);
}

function Ie(t, e) {
    if (16 === e) return new CustomExpression(me);
    if (0 === Se) {
        if (1 & e) return We();
        Ze();
        if (4194304 & $e) throw ns();
    }
    Re = 513 > t;
    Pe = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & $e) {
        const t = Bs[63 & $e];
        Ze();
        r = new UnaryExpression(t, Ie(514, e));
        Re = false;
    } else {
        t: switch ($e) {
          case 12294:
            i = ke;
            Re = false;
            do {
                Ze();
                ++i;
                switch ($e) {
                  case 65545:
                    Ze();
                    if (0 === (12288 & $e)) throw cs();
                    break;

                  case 10:
                  case 11:
                    throw cs();

                  case 2162700:
                    Pe = true;
                    Ze();
                    if (0 === (12288 & $e)) {
                        r = 0 === i ? xe : 1 === i ? ye : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & $e) {
                        r = 0 === i ? xe : 1 === i ? ye : new AccessThisExpression(i);
                        break t;
                    }
                    throw us();
                }
            } while (12294 === $e);

          case 4096:
            {
                const t = Le;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Re = !Pe;
                Ze();
                if (rs(49)) {
                    if (524296 === $e) throw $s();
                    const e = Pe;
                    const s = ke;
                    ++ke;
                    const i = Ie(62, 0);
                    Pe = e;
                    ke = s;
                    Re = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Ls();

          case 11:
            throw os();

          case 12292:
            Re = false;
            Ze();
            switch (ke) {
              case 0:
                r = xe;
                break;

              case 1:
                r = ye;
                break;

              default:
                r = new AccessThisExpression(ke);
                break;
            }
            break;

          case 2688007:
            r = Ke(e);
            break;

          case 2688016:
            r = me.search(/\s+of\s+/) > Se ? _e() : Qe(e);
            break;

          case 524296:
            r = ze(e);
            break;

          case 2163758:
            r = new TemplateExpression([ Le ]);
            Re = false;
            Ze();
            break;

          case 2163759:
            r = Ge(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(Le);
            Re = false;
            Ze();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Bs[63 & $e];
            Re = false;
            Ze();
            break;

          default:
            if (Se >= Oe) throw hs(); else throw as();
        }
        if (2 & e) return qe(r);
        if (514 < t) return r;
        if (10 === $e || 11 === $e) throw cs();
        if (0 === r.$kind) switch ($e) {
          case 2162700:
            Pe = true;
            Re = false;
            Ze();
            if (0 === (13312 & $e)) throw Us();
            if (12288 & $e) {
                r = new AccessScopeExpression(Le, r.ancestor);
                Ze();
            } else if (2688007 === $e) r = new CallFunctionExpression(r, je(), true); else if (2688016 === $e) r = De(r, true); else throw ms();
            break;

          case 65545:
            Re = !Pe;
            Ze();
            if (0 === (12288 & $e)) throw cs();
            r = new AccessScopeExpression(Le, r.ancestor);
            Ze();
            break;

          case 10:
          case 11:
            throw cs();

          case 2688007:
            r = new CallFunctionExpression(r, je(), s);
            break;

          case 2688016:
            r = De(r, s);
            break;

          case 2163758:
            r = He(r);
            break;

          case 2163759:
            r = Ge(e, r, true);
            break;
        }
        while ((65536 & $e) > 0) switch ($e) {
          case 2162700:
            r = Fe(r);
            break;

          case 65545:
            Ze();
            if (0 === (12288 & $e)) throw cs();
            r = Ve(r, false);
            break;

          case 10:
          case 11:
            throw cs();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, je(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, je(), r.optional, false); else r = new CallFunctionExpression(r, je(), false);
            break;

          case 2688016:
            r = De(r, false);
            break;

          case 2163758:
            if (Pe) throw ms();
            r = He(r);
            break;

          case 2163759:
            if (Pe) throw ms();
            r = Ge(e, r, true);
            break;
        }
    }
    if (10 === $e || 11 === $e) throw cs();
    if (513 < t) return r;
    while ((262144 & $e) > 0) {
        const s = $e;
        if ((960 & s) <= t) break;
        Ze();
        r = new BinaryExpression(Bs[63 & s], r, Ie(960 & s, e));
        Re = false;
    }
    if (63 < t) return r;
    if (rs(6291477)) {
        const t = Ie(62, e);
        is(6291476);
        r = new ConditionalExpression(r, t, Ie(62, e));
        Re = false;
    }
    if (62 < t) return r;
    if (rs(4194348)) {
        if (!Re) throw fs();
        r = new AssignExpression(r, Ie(62, e));
    }
    if (61 < t) return r;
    while (rs(6291479)) {
        if (6291456 === $e) throw ps();
        const t = Le;
        Ze();
        const s = new Array;
        while (rs(6291476)) s.push(Ie(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (rs(6291478)) {
        if (6291456 === $e) throw ds();
        const t = Le;
        Ze();
        const s = new Array;
        while (rs(6291476)) s.push(Ie(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== $e) {
        if ((1 & e) > 0 && 7340045 === $e) return r;
        if ("of" === Te()) throw ws();
        throw as();
    }
    return r;
}

function _e() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Ze();
        switch ($e) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Te();
            break;

          default:
            throw ys();
        }
    }
    is(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(xe, s), new AccessKeyedExpression(xe, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function je() {
    const t = Pe;
    Ze();
    const e = [];
    while (7340046 !== $e) {
        e.push(Ie(62, 0));
        if (!rs(6291471)) break;
    }
    is(7340046);
    Re = false;
    Pe = t;
    return e;
}

function De(t, e) {
    const s = Pe;
    Ze();
    t = new AccessKeyedExpression(t, Ie(62, 0), e);
    is(7340051);
    Re = !s;
    Pe = s;
    return t;
}

function Fe(t) {
    Pe = true;
    Re = false;
    Ze();
    if (0 === (13312 & $e)) throw Us();
    if (12288 & $e) return Ve(t, true);
    if (2688007 === $e) if (1 === t.$kind) return new CallScopeExpression(t.name, je(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, je(), t.optional, true); else return new CallFunctionExpression(t, je(), true);
    if (2688016 === $e) return De(t, true);
    throw ms();
}

function Ve(t, e) {
    const s = Le;
    switch ($e) {
      case 2162700:
        {
            Pe = true;
            Re = false;
            const r = Se;
            const i = Ce;
            const n = $e;
            const o = Be;
            const c = Le;
            const u = Re;
            const h = Pe;
            Ze();
            if (0 === (13312 & $e)) throw Us();
            if (2688007 === $e) return new CallMemberExpression(t, s, je(), e, true);
            Se = r;
            Ce = i;
            $e = n;
            Be = o;
            Le = c;
            Re = u;
            Pe = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Re = false;
        return new CallMemberExpression(t, s, je(), e, false);

      default:
        Re = !Pe;
        Ze();
        return new AccessMemberExpression(t, s, e);
    }
}

var Ne;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(Ne || (Ne = {}));

function Ke(t) {
    Ze();
    const e = Se;
    const s = Ce;
    const r = $e;
    const i = Be;
    const n = Le;
    const o = Re;
    const c = Pe;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === $e) {
            Ze();
            if (4096 !== $e) throw cs();
            u.push(new BindingIdentifier(Le));
            Ze();
            if (6291471 === $e) throw Cs();
            if (7340046 !== $e) throw os();
            Ze();
            if (49 !== $e) throw os();
            Ze();
            const t = Pe;
            const e = ke;
            ++ke;
            const s = Ie(62, 0);
            Pe = t;
            ke = e;
            Re = false;
            return new ArrowFunction(u, s, true);
        }
        switch ($e) {
          case 4096:
            u.push(new BindingIdentifier(Le));
            Ze();
            break;

          case 7340046:
            Ze();
            break t;

          case 524296:
          case 2688016:
            Ze();
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
            Ze();
            h = 2;
            break;
        }
        switch ($e) {
          case 6291471:
            Ze();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Ze();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw Ss();
            Ze();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === $e) {
        if (1 === h) {
            Ze();
            if (524296 === $e) throw $s();
            const t = Pe;
            const e = ke;
            ++ke;
            const s = Ie(62, 0);
            Pe = t;
            ke = e;
            Re = false;
            return new ArrowFunction(u, s);
        }
        throw Ss();
    } else if (1 === h && 0 === u.length) throw As(49);
    if (a) switch (h) {
      case 2:
        throw Ss();

      case 3:
        throw Os();

      case 4:
        throw ks();
    }
    Se = e;
    Ce = s;
    $e = r;
    Be = i;
    Le = n;
    Re = o;
    Pe = c;
    const l = Pe;
    const f = Ie(62, t);
    Pe = l;
    is(7340046);
    if (49 === $e) switch (h) {
      case 2:
        throw Ss();

      case 3:
        throw Os();

      case 4:
        throw ks();
    }
    return f;
}

function Qe(t) {
    const e = Pe;
    Ze();
    const s = new Array;
    while (7340051 !== $e) if (rs(6291471)) {
        s.push(Ae);
        if (7340051 === $e) break;
    } else {
        s.push(Ie(62, ~2 & t));
        if (rs(6291471)) {
            if (7340051 === $e) break;
        } else break;
    }
    Pe = e;
    is(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Re = false;
        return new ArrayLiteralExpression(s);
    }
}

function qe(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw bs();
    if (4204592 !== $e) throw bs();
    Ze();
    const e = t;
    const s = Ie(61, 0);
    return new ForOfStatement(e, s);
}

function ze(t) {
    const e = Pe;
    const s = new Array;
    const r = new Array;
    Ze();
    while (7340045 !== $e) {
        s.push(Le);
        if (49152 & $e) {
            Ze();
            is(6291476);
            r.push(Ie(62, ~2 & t));
        } else if (12288 & $e) {
            const e = Be;
            const s = $e;
            const i = Se;
            Ze();
            if (rs(6291476)) r.push(Ie(62, ~2 & t)); else {
                Be = e;
                $e = s;
                Se = i;
                r.push(Ie(515, ~2 & t));
            }
        } else throw gs();
        if (7340045 !== $e) is(6291471);
    }
    Pe = e;
    is(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Re = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function We() {
    const t = [];
    const e = [];
    const s = Oe;
    let r = "";
    while (Se < s) {
        switch (Be) {
          case 36:
            if (123 === me.charCodeAt(Se + 1)) {
                t.push(r);
                r = "";
                Se += 2;
                Be = me.charCodeAt(Se);
                Ze();
                const s = Ie(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(de(Je()));
            break;

          default:
            r += String.fromCharCode(Be);
        }
        Je();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ge(t, e, s) {
    const r = Pe;
    const i = [ Le ];
    is(2163759);
    const n = [ Ie(62, t) ];
    while (2163758 !== ($e = ss())) {
        i.push(Le);
        is(2163759);
        n.push(Ie(62, t));
    }
    i.push(Le);
    Re = false;
    Pe = r;
    if (s) {
        Ze();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Ze();
        return new TemplateExpression(i, n);
    }
}

function He(t) {
    Re = false;
    const e = [ Le ];
    Ze();
    return new TaggedTemplateExpression(e, e, t);
}

function Ze() {
    while (Se < Oe) {
        Ce = Se;
        if (null != ($e = js[Be]())) return;
    }
    $e = 6291456;
}

function Je() {
    return Be = me.charCodeAt(++Se);
}

function Xe() {
    while (_s[Je()]) ;
    const t = Rs[Le = Te()];
    return void 0 === t ? 4096 : t;
}

function Ye(t) {
    let e = Be;
    if (false === t) {
        do {
            e = Je();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Le = parseInt(Te(), 10);
            return 32768;
        }
        e = Je();
        if (Se >= Oe) {
            Le = parseInt(Te().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Je();
    } while (e <= 57 && e >= 48); else Be = me.charCodeAt(--Se);
    Le = parseFloat(Te());
    return 32768;
}

function ts() {
    const t = Be;
    Je();
    let e = 0;
    const s = new Array;
    let r = Se;
    while (Be !== t) if (92 === Be) {
        s.push(me.slice(r, Se));
        Je();
        e = de(Be);
        Je();
        s.push(String.fromCharCode(e));
        r = Se;
    } else if (Se >= Oe) throw vs(); else Je();
    const i = me.slice(r, Se);
    Je();
    s.push(i);
    const n = s.join("");
    Le = n;
    return 16384;
}

function es() {
    let t = true;
    let e = "";
    while (96 !== Je()) if (36 === Be) if (Se + 1 < Oe && 123 === me.charCodeAt(Se + 1)) {
        Se++;
        t = false;
        break;
    } else e += "$"; else if (92 === Be) e += String.fromCharCode(de(Je())); else {
        if (Se >= Oe) throw Es();
        e += String.fromCharCode(Be);
    }
    Je();
    Le = e;
    if (t) return 2163758;
    return 2163759;
}

function ss() {
    if (Se >= Oe) throw Es();
    Se--;
    return es();
}

function rs(t) {
    if ($e === t) {
        Ze();
        return true;
    }
    return false;
}

function is(t) {
    if ($e === t) Ze(); else throw As(t);
}

function ns() {
    return new Error(`AUR0151:${me}`);
}

function os() {
    return new Error(`AUR0152:${me}`);
}

function cs() {
    return new Error(`AUR0153:${me}`);
}

function us() {
    return new Error(`AUR0154:${me}`);
}

function hs() {
    return new Error(`AUR0155:${me}`);
}

function as() {
    return new Error(`AUR0156:${me}`);
}

function ls() {
    return new Error(`AUR0157`);
}

function fs() {
    return new Error(`AUR0158:${me}`);
}

function ps() {
    return new Error(`AUR0159:${me}`);
}

function ds() {
    return new Error(`AUR0160:${me}`);
}

function ws() {
    return new Error(`AUR0161:${me}`);
}

function bs() {
    return new Error(`AUR0163:${me}`);
}

function gs() {
    return new Error(`AUR0164:${me}`);
}

function vs() {
    return new Error(`AUR0165:${me}`);
}

function Es() {
    return new Error(`AUR0166:${me}`);
}

function As(t) {
    return new Error(`AUR0167:${me}<${Bs[63 & t]}`);
}

const xs = () => {
    throw new Error(`AUR0168:${me}`);
};

xs.notMapped = true;

function ys() {
    return new Error(`AUR0170:${me}`);
}

function Us() {
    return new Error(`AUR0171:${me}`);
}

function ms() {
    return new Error(`AUR0172:${me}`);
}

function Ss() {
    return new Error(`AUR0173:${me}`);
}

function Os() {
    return new Error(`AUR0174:${me}`);
}

function ks() {
    return new Error(`AUR0175:${me}`);
}

function Cs() {
    return new Error(`AUR0176:${me}`);
}

function $s() {
    return new Error(`AUR0178:${me}`);
}

function Ls() {
    return new Error(`AUR0179:${me}`);
}

const Bs = [ ge, ve, Ee, Ae, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Rs = Object.assign(Object.create(null), {
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

const Ps = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Ts(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function Ms(t) {
    return () => {
        Je();
        return t;
    };
}

const Is = new Set;

Ts(null, Is, Ps.AsciiIdPart, true);

const _s = new Uint8Array(65535);

Ts(_s, null, Ps.IdStart, 1);

Ts(_s, null, Ps.Digit, 1);

const js = new Array(65535);

js.fill(xs, 0, 65535);

Ts(js, null, Ps.Skip, (() => {
    Je();
    return null;
}));

Ts(js, null, Ps.IdStart, Xe);

Ts(js, null, Ps.Digit, (() => Ye(false)));

js[34] = js[39] = () => ts();

js[96] = () => es();

js[33] = () => {
    if (61 !== Je()) return 131117;
    if (61 !== Je()) return 6553948;
    Je();
    return 6553950;
};

js[61] = () => {
    if (62 === Je()) {
        Je();
        return 49;
    }
    if (61 !== Be) return 4194348;
    if (61 !== Je()) return 6553947;
    Je();
    return 6553949;
};

js[38] = () => {
    if (38 !== Je()) return 6291478;
    Je();
    return 6553882;
};

js[124] = () => {
    if (124 !== Je()) return 6291479;
    Je();
    return 6553817;
};

js[63] = () => {
    if (46 === Je()) {
        const t = me.charCodeAt(Se + 1);
        if (t <= 48 || t >= 57) {
            Je();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Be) return 6291477;
    Je();
    return 6553752;
};

js[46] = () => {
    if (Je() <= 57 && Be >= 48) return Ye(true);
    if (46 === Be) {
        if (46 !== Je()) return 10;
        Je();
        return 11;
    }
    return 65545;
};

js[60] = () => {
    if (61 !== Je()) return 6554015;
    Je();
    return 6554017;
};

js[62] = () => {
    if (61 !== Je()) return 6554016;
    Je();
    return 6554018;
};

js[37] = Ms(6554154);

js[40] = Ms(2688007);

js[41] = Ms(7340046);

js[42] = Ms(6554153);

js[43] = Ms(2490853);

js[44] = Ms(6291471);

js[45] = Ms(2490854);

js[47] = Ms(6554155);

js[58] = Ms(6291476);

js[91] = Ms(2688016);

js[93] = Ms(7340051);

js[123] = Ms(524296);

js[125] = Ms(7340045);

let Ds = null;

const Fs = [];

let Vs = false;

function Ns() {
    Vs = false;
}

function Ks() {
    Vs = true;
}

function Qs() {
    return Ds;
}

function qs(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Ds) {
        Ds = t;
        Fs[0] = Ds;
        Vs = true;
        return;
    }
    if (Ds === t) throw new Error(`AUR0207`);
    Fs.push(t);
    Ds = t;
    Vs = true;
}

function zs(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Ds !== t) throw new Error(`AUR0209`);
    Fs.pop();
    Ds = Fs.length > 0 ? Fs[Fs.length - 1] : null;
    Vs = null != Ds;
}

const Ws = Object.freeze({
    get current() {
        return Ds;
    },
    get connecting() {
        return Vs;
    },
    enter: qs,
    exit: zs,
    pause: Ns,
    resume: Ks
});

const Gs = Reflect.get;

const Hs = Object.prototype.toString;

const Zs = new WeakMap;

function Js(t) {
    switch (Hs.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Xs = "__raw__";

function Ys(t) {
    return Js(t) ? tr(t) : t;
}

function tr(t) {
    return Zs.get(t) ?? ir(t);
}

function er(t) {
    return t[Xs] ?? t;
}

function sr(t) {
    return Js(t) && t[Xs] || t;
}

function rr(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function ir(t) {
    const e = f(t) ? or : t instanceof Map || t instanceof Set ? $r : nr;
    const s = new Proxy(t, e);
    Zs.set(t, s);
    return s;
}

const nr = {
    get(t, e, s) {
        if (e === Xs) return t;
        const r = Qs();
        if (!Vs || rr(e) || null == r) return Gs(t, e, s);
        r.observe(t, e);
        return Ys(Gs(t, e, s));
    }
};

const or = {
    get(t, e, s) {
        if (e === Xs) return t;
        const r = Qs();
        if (!Vs || rr(e) || null == r) return Gs(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return cr;

          case "includes":
            return ar;

          case "indexOf":
            return lr;

          case "lastIndexOf":
            return fr;

          case "every":
            return ur;

          case "filter":
            return hr;

          case "find":
            return dr;

          case "findIndex":
            return pr;

          case "flat":
            return wr;

          case "flatMap":
            return br;

          case "join":
            return gr;

          case "push":
            return Er;

          case "pop":
            return vr;

          case "reduce":
            return kr;

          case "reduceRight":
            return Cr;

          case "reverse":
            return Ur;

          case "shift":
            return Ar;

          case "unshift":
            return xr;

          case "slice":
            return Or;

          case "splice":
            return yr;

          case "some":
            return mr;

          case "sort":
            return Sr;

          case "keys":
            return _r;

          case "values":
          case Symbol.iterator:
            return jr;

          case "entries":
            return Dr;
        }
        r.observe(t, e);
        return Ys(Gs(t, e, s));
    },
    ownKeys(t) {
        Qs()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function cr(t, e) {
    const s = er(this);
    const r = s.map(((s, r) => sr(t.call(e, Ys(s), r, this))));
    Qs()?.observeCollection(s);
    return Ys(r);
}

function ur(t, e) {
    const s = er(this);
    const r = s.every(((s, r) => t.call(e, Ys(s), r, this)));
    Qs()?.observeCollection(s);
    return r;
}

function hr(t, e) {
    const s = er(this);
    const r = s.filter(((s, r) => sr(t.call(e, Ys(s), r, this))));
    Qs()?.observeCollection(s);
    return Ys(r);
}

function ar(t) {
    const e = er(this);
    const s = e.includes(sr(t));
    Qs()?.observeCollection(e);
    return s;
}

function lr(t) {
    const e = er(this);
    const s = e.indexOf(sr(t));
    Qs()?.observeCollection(e);
    return s;
}

function fr(t) {
    const e = er(this);
    const s = e.lastIndexOf(sr(t));
    Qs()?.observeCollection(e);
    return s;
}

function pr(t, e) {
    const s = er(this);
    const r = s.findIndex(((s, r) => sr(t.call(e, Ys(s), r, this))));
    Qs()?.observeCollection(s);
    return r;
}

function dr(t, e) {
    const s = er(this);
    const r = s.find(((e, s) => t(Ys(e), s, this)), e);
    Qs()?.observeCollection(s);
    return Ys(r);
}

function wr() {
    const t = er(this);
    Qs()?.observeCollection(t);
    return Ys(t.flat());
}

function br(t, e) {
    const s = er(this);
    Qs()?.observeCollection(s);
    return tr(s.flatMap(((s, r) => Ys(t.call(e, Ys(s), r, this)))));
}

function gr(t) {
    const e = er(this);
    Qs()?.observeCollection(e);
    return e.join(t);
}

function vr() {
    return Ys(er(this).pop());
}

function Er(...t) {
    return er(this).push(...t);
}

function Ar() {
    return Ys(er(this).shift());
}

function xr(...t) {
    return er(this).unshift(...t);
}

function yr(...t) {
    return Ys(er(this).splice(...t));
}

function Ur(...t) {
    const e = er(this);
    const s = e.reverse();
    Qs()?.observeCollection(e);
    return Ys(s);
}

function mr(t, e) {
    const s = er(this);
    const r = s.some(((s, r) => sr(t.call(e, Ys(s), r, this))));
    Qs()?.observeCollection(s);
    return r;
}

function Sr(t) {
    const e = er(this);
    const s = e.sort(t);
    Qs()?.observeCollection(e);
    return Ys(s);
}

function Or(t, e) {
    const s = er(this);
    Qs()?.observeCollection(s);
    return tr(s.slice(t, e));
}

function kr(t, e) {
    const s = er(this);
    const r = s.reduce(((e, s, r) => t(e, Ys(s), r, this)), e);
    Qs()?.observeCollection(s);
    return Ys(r);
}

function Cr(t, e) {
    const s = er(this);
    const r = s.reduceRight(((e, s, r) => t(e, Ys(s), r, this)), e);
    Qs()?.observeCollection(s);
    return Ys(r);
}

const $r = {
    get(t, e, s) {
        if (e === Xs) return t;
        const r = Qs();
        if (!Vs || rr(e) || null == r) return Gs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Mr;

          case "delete":
            return Ir;

          case "forEach":
            return Lr;

          case "add":
            if (t instanceof Set) return Tr;
            break;

          case "get":
            if (t instanceof Map) return Rr;
            break;

          case "set":
            if (t instanceof Map) return Pr;
            break;

          case "has":
            return Br;

          case "keys":
            return _r;

          case "values":
            return jr;

          case "entries":
            return Dr;

          case Symbol.iterator:
            return t instanceof Map ? Dr : jr;
        }
        return Ys(Gs(t, e, s));
    }
};

function Lr(t, e) {
    const s = er(this);
    Qs()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Ys(s), Ys(r), this);
    }));
}

function Br(t) {
    const e = er(this);
    Qs()?.observeCollection(e);
    return e.has(sr(t));
}

function Rr(t) {
    const e = er(this);
    Qs()?.observeCollection(e);
    return Ys(e.get(sr(t)));
}

function Pr(t, e) {
    return Ys(er(this).set(sr(t), sr(e)));
}

function Tr(t) {
    return Ys(er(this).add(sr(t)));
}

function Mr() {
    return Ys(er(this).clear());
}

function Ir(t) {
    return Ys(er(this).delete(sr(t)));
}

function _r() {
    const t = er(this);
    Qs()?.observeCollection(t);
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
                value: Ys(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function jr() {
    const t = er(this);
    Qs()?.observeCollection(t);
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
                value: Ys(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Dr() {
    const t = er(this);
    Qs()?.observeCollection(t);
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
                value: [ Ys(s[0]), Ys(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Fr = Object.freeze({
    getProxy: tr,
    getRaw: er,
    wrap: Ys,
    unwrap: sr,
    rawKey: Xs
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
    flush() {
        Vr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Vr);
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
            qs(this);
            return this.v = sr(this.$get.call(this.up ? Ys(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            zs(this);
        }
    }
}

le(ComputedObserver);

F(ComputedObserver);

z(ComputedObserver);

let Vr;

const Nr = e.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Kr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Qr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Kr.disabled) return;
            if (++this.C < Kr.timeoutsPerCheck) return;
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
        if (Kr.throw) throw new Error(`AUR0222:${w(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, Qr);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.O.cancel();
            this.O = null;
        }
    }
}

DirtyChecker.inject = [ i ];

z(DirtyChecker);

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

let qr;

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
        qr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, qr);
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
            this.queue.add(this);
        }
    }
    flush() {
        qr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, qr);
    }
}

F(SetterObserver);

F(SetterNotifier);

z(SetterObserver);

z(SetterNotifier);

const zr = new PropertyAccessor;

const Wr = e.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Gr = e.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return zr;
    }
    getAccessor() {
        return zr;
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
        if (null == t) throw Yr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Xr(t);
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
        if (this.B.handles(t, e, this)) return this.B.getAccessor(t, e, this);
        return zr;
    }
    getArrayObserver(t) {
        return yt(t);
    }
    getMapObserver(t) {
        return ee(t);
    }
    getSetObserver(t) {
        return Ft(t);
    }
    createObserver(t, e) {
        if (this.B.handles(t, e, this)) return this.B.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (f(t)) return yt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return ee(t).getLengthObserver(); else if (t instanceof Set) return Ft(t).getLengthObserver();
            break;

          default:
            if (f(t) && r(e)) return yt(t).getIndexObserver(Number(e));
            break;
        }
        let s = Jr(t, e);
        if (void 0 === s) {
            let r = Zr(t);
            while (null !== r) {
                s = Jr(r, e);
                if (void 0 === s) r = Zr(r); else break;
            }
        }
        if (void 0 !== s && !u.call(s, "value")) {
            let r = this.R(t, e, s);
            if (null == r) r = (s.get?.getObserver ?? s.set?.getObserver)?.(t, this);
            return null == r ? s.configurable ? ComputedObserver.create(t, e, s, this, true) : this.$.createProperty(t, e) : r;
        }
        return new SetterObserver(t, e);
    }
    R(t, e, s) {
        if (this.L.length > 0) for (const r of this.L) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
}

ObserverLocator.inject = [ Nr, Gr ];

const Hr = t => {
    let e;
    if (f(t)) e = yt(t); else if (t instanceof Map) e = ee(t); else if (t instanceof Set) e = Ft(t);
    return e;
};

const Zr = Object.getPrototypeOf;

const Jr = Object.getOwnPropertyDescriptor;

const Xr = t => {
    let e = t.$observers;
    if (void 0 === e) h(t, "$observers", {
        enumerable: false,
        value: e = b()
    });
    return e;
};

const Yr = t => new Error(`AUR0199:${w(t)}`);

const ti = e.createInterface("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Wr ];
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
            qs(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            zs(this);
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

le(Effect);

function ei(t) {
    if (void 0 === t.$observers) h(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const si = {};

function ri(t, e, s) {
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
        let o = si;
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
            const s = ii(this, e, n, o, c);
            Qs()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            ii(this, e, n, o, c).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return ii(s, e, n, o, c);
        };
        if (i) h(t.prototype, e, s); else return s;
    }
}

function ii(t, e, s, r, i) {
    const n = ei(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === si ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, L as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, $ as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, Ws as ConnectableSwitcher, CustomExpression, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Kr as DirtyCheckSettings, A as ExpressionKind, Ue as ExpressionType, FlushQueue, ForOfStatement, C as ICoercionConfiguration, Nr as IDirtyChecker, fe as IExpressionParser, G as IFlushQueue, Gr as INodeObserverLocator, ti as IObservation, Wr as IObserverLocator, E as ISignaler, Interpolation, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Fr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, ValueConverterExpression, mt as applyMutationsToIndices, _ as batch, P as cloneIndexMap, le as connectable, B as copyIndexMap, R as createIndexMap, xt as disableArrayObservation, te as disableMapObservation, Dt as disableSetObservation, At as enableArrayObservation, Yt as enableMapObservation, jt as enableSetObservation, Hr as getCollectionObserver, Xr as getObserverLookup, T as isIndexMap, ri as observable, Me as parseExpression, F as subscriberCollection, St as synchronizeIndices, z as withFlushQueue };
//# sourceMappingURL=index.mjs.map
