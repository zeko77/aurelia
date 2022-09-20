"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/metadata");

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
    static getContext(t, e, r) {
        if (null == t) throw s();
        let i = t.overrideContext;
        let n = t;
        if (r > 0) {
            while (r > 0) {
                r--;
                n = n.parentScope;
                if (null == n) return;
            }
            i = n.overrideContext;
            return e in i ? i : n.bindingContext;
        }
        while (null != n && !n.isBoundary && !(e in n.overrideContext) && !(e in n.bindingContext)) n = n.parentScope;
        if (null == n) return t.bindingContext;
        i = n.overrideContext;
        return e in i ? i : n.bindingContext;
    }
    static create(t, e, s) {
        if (null == t) throw r();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw s();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const s = () => new Error(`AUR0203`);

const r = () => new Error("AUR0204");

class OverrideContext {}

const i = Object.prototype.hasOwnProperty;

const n = Reflect.defineProperty;

const o = t => "function" === typeof t;

const c = t => "string" === typeof t;

const u = t => t instanceof Array;

function h(t, e, s) {
    n(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function a(t, e, s) {
    if (!(e in t)) h(t, e, s);
}

const l = String;

const f = () => Object.create(null);

const p = e.Metadata.getOwn;

e.Metadata.hasOwn;

const d = e.Metadata.define;

t.Protocol.annotation.keyFor;

t.Protocol.resource.keyFor;

t.Protocol.resource.appendTo;

const w = t.DI.createInterface("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = f();
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
        if (c(t.value)) {
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
        if (null == i) throw b(s);
        if (void 0 === e[r]) {
            e[r] = i;
            i.bind?.(t, e, ...this.args.map((s => s.evaluate(t, e, null))));
        } else throw g(s);
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

const b = t => new Error(`AUR0101:${t}`);

const g = t => new Error(`AUR0102:${t}`);

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
        if (null == i) throw v(r);
        if ("toView" in i) return i.toView(this.expression.evaluate(t, e, s), ...this.args.map((r => r.evaluate(t, e, s))));
        return this.expression.evaluate(t, e, s);
    }
    assign(t, e, s) {
        const r = this.name;
        const i = e?.getConverter?.(r);
        if (null == i) throw v(r);
        if ("fromView" in i) s = i.fromView(s, ...this.args.map((s => s.evaluate(t, e, null))));
        return this.expression.assign(t, e, s);
    }
    bind(t, e) {
        const s = this.name;
        const r = e.getConverter?.(s);
        if (null == r) throw v(s);
        const i = r.signals;
        if (null != i) {
            const t = e.get?.(w);
            const s = i.length;
            let r = 0;
            for (;r < s; ++r) t?.addSignalListener(i[r], e);
        }
        if (this.expression.hasBind) this.expression.bind(t, e);
    }
    unbind(t, e) {
        const s = e.getConverter?.(this.name);
        if (void 0 === s?.signals) return;
        const r = e.get(w);
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

const v = t => new Error(`AUR0103:${t}`);

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
        const n = E(e?.strictFnCall, i, this.name);
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

const x = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

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
        const n = E(e?.strictFnCall, r, this.name);
        if (n) {
            const t = n.apply(r, i);
            if (u(r) && x.includes(this.name)) s?.observeCollection(r);
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
        if (o(r)) return r(...this.args.map((r => r.evaluate(t, e, s))));
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
                if (o(r)) return this.left.evaluate(t, e, s) instanceof r;
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
                    if (A(r) || A(i)) return (r || 0) + (i || 0);
                    if (y(r) || y(i)) return (r || "") + (i || "");
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

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(t.emptyArray);

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

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(t.emptyArray, t.emptyArray);

class TemplateExpression {
    constructor(e, s = t.emptyArray) {
        this.cooked = e;
        this.expressions = s;
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
            r += l(this.expressions[i].evaluate(t, e, s));
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
        if (!o(i)) throw new Error(`AUR0110`);
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
    constructor(e, s = t.emptyArray) {
        this.parts = e;
        this.expressions = s;
        this.isMulti = s.length > 1;
        this.firstExpression = s[0];
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
                r += l(this.expressions[i].evaluate(t, e, s));
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

function E(t, e, s) {
    const r = null == e ? null : e[s];
    if (o(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
}

function A(t) {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
}

function y(t) {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
}

const U = t.DI.createInterface("ICoercionConfiguration");

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

function S(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function O(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function k(t) {
    return u(t) && true === t.isIndexMap;
}

let C = new Map;

let $ = false;

function L(t) {
    const e = C;
    const s = C = new Map;
    $ = true;
    try {
        t();
    } finally {
        C = null;
        $ = false;
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
            C = e;
        }
    }
}

function B(t, e, s) {
    if (!C.has(t)) C.set(t, [ 2, e, s ]);
}

function R(t, e, s) {
    const r = C.get(t);
    if (void 0 === r) C.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function P(t) {
    return null == t ? T : T(t);
}

function T(t) {
    const e = t.prototype;
    n(e, "subs", {
        get: M
    });
    a(e, "subscribe", _);
    a(e, "unsubscribe", I);
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
        if ($) {
            R(this, t, e);
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

function M() {
    return h(this, "subs", new SubscriberRecord);
}

function _(t) {
    return this.subs.add(t);
}

function I(t) {
    return this.subs.remove(t);
}

var j;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Sub0"] = 1] = "Sub0";
    t[t["Sub1"] = 2] = "Sub1";
    t[t["Sub2"] = 4] = "Sub2";
    t[t["SubRest"] = 8] = "SubRest";
    t[t["Any"] = 15] = "Any";
})(j || (j = {}));

function D(t) {
    return null == t ? F : F(t);
}

function F(t) {
    const e = t.prototype;
    n(e, "queue", {
        get: N
    });
}

const V = t.DI.createInterface("IFlushQueue", (t => t.instance(FlushQueue.instance)));

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
            this.i.forEach(K);
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

function N() {
    return FlushQueue.instance;
}

function K(t, e, s) {
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
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.length;
        if ((this.v = r) !== s) {
            this.u = s;
            this.queue.add(this);
        }
    }
    flush() {
        W = this.u;
        this.u = this.v;
        this.subs.notify(this.v, W);
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
        W = this.u;
        this.u = this.v;
        this.subs.notify(this.v, W);
    }
}

function q(t) {
    const e = t.prototype;
    a(e, "subscribe", Q);
    a(e, "unsubscribe", z);
    D(t);
    P(t);
}

function Q(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function z(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

q(CollectionLengthObserver);

q(CollectionSizeObserver);

let W;

const G = "__au_array_obs__";

const H = (() => {
    let t = p(G, Array);
    if (null == t) d(G, t = new WeakMap, Array);
    return t;
})();

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
    let p, d, w;
    let b, g;
    let v, x, E, A;
    let y, U, m, S;
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
            y = t[o];
            U = e[o];
            m = i(y, v);
            if (m < 0) {
                t[o] = t[E];
                e[o] = e[E];
                t[E] = y;
                e[E] = U;
                E++;
            } else if (m > 0) {
                do {
                    A--;
                    if (A == o) break t;
                    S = t[A];
                    m = i(S, v);
                } while (m > 0);
                t[o] = t[A];
                e[o] = e[A];
                t[A] = y;
                e[A] = U;
                if (m < 0) {
                    y = t[o];
                    U = e[o];
                    t[o] = t[E];
                    e[o] = e[E];
                    t[E] = y;
                    e[E] = U;
                    E++;
                }
            }
        }
        if (r - A < E - s) {
            Y(t, e, A, r, i);
            r = E;
        } else {
            Y(t, e, s, E, i);
            s = A;
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
        const e = H.get(this);
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
        const e = H.get(this);
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
        const t = H.get(this);
        if (void 0 === t) return rt.call(this);
        const e = t.indexMap;
        const s = rt.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        rt.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = H.get(this);
        if (void 0 === t) return it.call(this);
        const e = t.indexMap;
        const s = it.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        it.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = H.get(this);
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
            nt.call(c, e, s, ...r);
        } else nt.apply(c, t);
        const a = nt.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = H.get(this);
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
        const e = H.get(this);
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
        if (void 0 === t || !o(t)) t = Z;
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

for (const t of ht) n(at[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let lt = false;

const ft = "__au_arr_on__";

function pt() {
    if (!(p(ft, Array) ?? false)) {
        d(ft, true, Array);
        for (const t of ht) if (true !== tt[t].observing) h(tt, t, at[t]);
    }
}

function dt() {
    for (const t of ht) if (true === tt[t].observing) h(tt, t, ut[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!lt) {
            lt = true;
            pt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = S(t.length);
        this.lenObs = void 0;
        H.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if ($) {
            B(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = S(r);
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

P(ArrayObserver);

P(ArrayIndexObserver);

function wt(t) {
    let e = H.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const bt = (t, e) => t - e;

function gt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = O(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(bt);
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

function vt(t, e) {
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

const xt = "__au_set_obs__";

const Et = (() => {
    let t = p(xt, Set);
    if (null == t) d(xt, t = new WeakMap, Set);
    return t;
})();

const At = Set.prototype;

const yt = At.add;

const Ut = At.clear;

const mt = At.delete;

const St = {
    add: yt,
    clear: Ut,
    delete: mt
};

const Ot = [ "add", "clear", "delete" ];

const kt = {
    add: function(t) {
        const e = Et.get(this);
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
        const t = Et.get(this);
        if (void 0 === t) return Ut.call(this);
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
            Ut.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Et.get(this);
        if (void 0 === e) return mt.call(this, t);
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
                const n = mt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            r++;
        }
        return false;
    }
};

const Ct = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ot) n(kt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let $t = false;

const Lt = "__au_set_on__";

function Bt() {
    if (!(p(Lt, Set) ?? false)) {
        d(Lt, true, Set);
        for (const t of Ot) if (true !== At[t].observing) n(At, t, {
            ...Ct,
            value: kt[t]
        });
    }
}

function Rt() {
    for (const t of Ot) if (true === At[t].observing) n(At, t, {
        ...Ct,
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
        this.indexMap = S(t.size);
        this.lenObs = void 0;
        Et.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if ($) {
            B(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = S(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

P(SetObserver);

function Pt(t) {
    let e = Et.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Tt = "__au_map_obs__";

const Mt = (() => {
    let t = p(Tt, Map);
    if (null == t) d(Tt, t = new WeakMap, Map);
    return t;
})();

const _t = Map.prototype;

const It = _t.set;

const jt = _t.clear;

const Dt = _t.delete;

const Ft = {
    set: It,
    clear: jt,
    delete: Dt
};

const Vt = [ "set", "clear", "delete" ];

const Nt = {
    set: function(t, e) {
        const s = Mt.get(this);
        if (void 0 === s) {
            It.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        It.call(this, t, e);
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
        const t = Mt.get(this);
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
        const e = Mt.get(this);
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

for (const t of Vt) n(Nt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let qt = false;

const Qt = "__au_map_on__";

function zt() {
    if (!(p(Qt, Map) ?? false)) {
        d(Qt, true, Map);
        for (const t of Vt) if (true !== _t[t].observing) n(_t, t, {
            ...Kt,
            value: Nt[t]
        });
    }
}

function Wt() {
    for (const t of Vt) if (true === _t[t].observing) n(_t, t, {
        ...Kt,
        value: Ft[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!qt) {
            qt = true;
            zt();
        }
        this.collection = t;
        this.indexMap = S(t.size);
        this.lenObs = void 0;
        Mt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if ($) {
            B(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = S(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

P(MapObserver);

function Gt(t) {
    let e = Mt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Ht(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Zt() {
    return h(this, "obs", new BindingObserverRecord(this));
}

function Jt(t) {
    let e;
    if (u(t)) e = wt(t); else if (t instanceof Set) e = Pt(t); else if (t instanceof Map) e = Gt(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function Xt(t) {
    this.obs.add(t);
}

function Yt() {
    throw new Error(`AUR2011:handleChange`);
}

function te() {
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
        this.o.forEach(se, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(ee, this);
        this.o.clear();
        this.count = 0;
    }
}

function ee(t, e) {
    e.unsubscribe(this);
}

function se(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this);
        this.o.delete(e);
    }
}

function re(t) {
    const e = t.prototype;
    a(e, "observe", Ht);
    a(e, "observeCollection", Jt);
    a(e, "subscribeTo", Xt);
    n(e, "obs", {
        get: Zt
    });
    a(e, "handleChange", Yt);
    a(e, "handleCollectionChange", te);
    return t;
}

function ie(t) {
    return null == t ? re : re(t);
}

const ne = t.DI.createInterface("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.h = f();
        this.A = f();
        this.U = f();
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
                throw rs();
            }
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        be = t;
        ge = 0;
        ve = t.length;
        xe = 0;
        Ee = 0;
        Ae = 6291456;
        ye = "";
        Ue = t.charCodeAt(0);
        me = true;
        Se = false;
        return Ce(61, void 0 === e ? 8 : e);
    }
}

var oe;

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
})(oe || (oe = {}));

function ce(t) {
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

var ue;

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
})(ue || (ue = {}));

var he;

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
})(he || (he = {}));

const ae = PrimitiveLiteralExpression.$false;

const le = PrimitiveLiteralExpression.$true;

const fe = PrimitiveLiteralExpression.$null;

const pe = PrimitiveLiteralExpression.$undefined;

const de = AccessThisExpression.$this;

const we = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let be = "";

let ge = 0;

let ve = 0;

let xe = 0;

let Ee = 0;

let Ae = 6291456;

let ye = "";

let Ue;

let me = true;

let Se = false;

function Oe() {
    return be.slice(Ee, ge);
}

function ke(t, e) {
    be = t;
    ge = 0;
    ve = t.length;
    xe = 0;
    Ee = 0;
    Ae = 6291456;
    ye = "";
    Ue = t.charCodeAt(0);
    me = true;
    Se = false;
    return Ce(61, void 0 === e ? 8 : e);
}

function Ce(t, e) {
    if (16 === e) return new CustomExpression(be);
    if (0 === ge) {
        if (1 & e) return De();
        Ne();
        if (4194304 & Ae) throw Je();
    }
    me = 513 > t;
    Se = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & Ae) {
        const t = Us[63 & Ae];
        Ne();
        r = new UnaryExpression(t, Ce(514, e));
        me = false;
    } else {
        t: switch (Ae) {
          case 12294:
            i = xe;
            me = false;
            do {
                Ne();
                ++i;
                switch (Ae) {
                  case 65545:
                    Ne();
                    if (0 === (12288 & Ae)) throw Ye();
                    break;

                  case 10:
                  case 11:
                    throw Ye();

                  case 2162700:
                    Se = true;
                    Ne();
                    if (0 === (12288 & Ae)) {
                        r = 0 === i ? de : 1 === i ? we : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & Ae) {
                        r = 0 === i ? de : 1 === i ? we : new AccessThisExpression(i);
                        break t;
                    }
                    throw ts();
                }
            } while (12294 === Ae);

          case 4096:
            {
                const t = ye;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                me = !Se;
                Ne();
                if (He(49)) {
                    if (524296 === Ae) throw As();
                    const e = Se;
                    const s = xe;
                    ++xe;
                    const i = Ce(62, 0);
                    Se = e;
                    xe = s;
                    me = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw ys();

          case 11:
            throw Xe();

          case 12292:
            me = false;
            Ne();
            switch (xe) {
              case 0:
                r = de;
                break;

              case 1:
                r = we;
                break;

              default:
                r = new AccessThisExpression(xe);
                break;
            }
            break;

          case 2688007:
            r = Me(e);
            break;

          case 2688016:
            r = be.search(/\s+of\s+/) > ge ? $e() : _e(e);
            break;

          case 524296:
            r = je(e);
            break;

          case 2163758:
            r = new TemplateExpression([ ye ]);
            me = false;
            Ne();
            break;

          case 2163759:
            r = Fe(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(ye);
            me = false;
            Ne();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Us[63 & Ae];
            me = false;
            Ne();
            break;

          default:
            if (ge >= ve) throw es(); else throw ss();
        }
        if (2 & e) return Ie(r);
        if (514 < t) return r;
        if (10 === Ae || 11 === Ae) throw Ye();
        if (0 === r.$kind) switch (Ae) {
          case 2162700:
            Se = true;
            me = false;
            Ne();
            if (0 === (13312 & Ae)) throw ws();
            if (12288 & Ae) {
                r = new AccessScopeExpression(ye, r.ancestor);
                Ne();
            } else if (2688007 === Ae) r = new CallFunctionExpression(r, Le(), true); else if (2688016 === Ae) r = Be(r, true); else throw bs();
            break;

          case 65545:
            me = !Se;
            Ne();
            if (0 === (12288 & Ae)) throw Ye();
            r = new AccessScopeExpression(ye, r.ancestor);
            Ne();
            break;

          case 10:
          case 11:
            throw Ye();

          case 2688007:
            r = new CallFunctionExpression(r, Le(), s);
            break;

          case 2688016:
            r = Be(r, s);
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
            r = Re(r);
            break;

          case 65545:
            Ne();
            if (0 === (12288 & Ae)) throw Ye();
            r = Pe(r, false);
            break;

          case 10:
          case 11:
            throw Ye();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Le(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Le(), r.optional, false); else r = new CallFunctionExpression(r, Le(), false);
            break;

          case 2688016:
            r = Be(r, false);
            break;

          case 2163758:
            if (Se) throw bs();
            r = Ve(r);
            break;

          case 2163759:
            if (Se) throw bs();
            r = Fe(e, r, true);
            break;
        }
    }
    if (10 === Ae || 11 === Ae) throw Ye();
    if (513 < t) return r;
    while ((262144 & Ae) > 0) {
        const s = Ae;
        if ((960 & s) <= t) break;
        Ne();
        r = new BinaryExpression(Us[63 & s], r, Ce(960 & s, e));
        me = false;
    }
    if (63 < t) return r;
    if (He(6291477)) {
        const t = Ce(62, e);
        Ze(6291476);
        r = new ConditionalExpression(r, t, Ce(62, e));
        me = false;
    }
    if (62 < t) return r;
    if (He(4194348)) {
        if (!me) throw is();
        r = new AssignExpression(r, Ce(62, e));
    }
    if (61 < t) return r;
    while (He(6291479)) {
        if (6291456 === Ae) throw ns();
        const t = ye;
        Ne();
        const s = new Array;
        while (He(6291476)) s.push(Ce(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (He(6291478)) {
        if (6291456 === Ae) throw os();
        const t = ye;
        Ne();
        const s = new Array;
        while (He(6291476)) s.push(Ce(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== Ae) {
        if ((1 & e) > 0 && 7340045 === Ae) return r;
        if ("of" === Oe()) throw cs();
        throw ss();
    }
    return r;
}

function $e() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
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
            s = Oe();
            break;

          default:
            throw ds();
        }
    }
    Ze(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(de, s), new AccessKeyedExpression(de, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Le() {
    const t = Se;
    Ne();
    const e = [];
    while (7340046 !== Ae) {
        e.push(Ce(62, 0));
        if (!He(6291471)) break;
    }
    Ze(7340046);
    me = false;
    Se = t;
    return e;
}

function Be(t, e) {
    const s = Se;
    Ne();
    t = new AccessKeyedExpression(t, Ce(62, 0), e);
    Ze(7340051);
    me = !s;
    Se = s;
    return t;
}

function Re(t) {
    Se = true;
    me = false;
    Ne();
    if (0 === (13312 & Ae)) throw ws();
    if (12288 & Ae) return Pe(t, true);
    if (2688007 === Ae) if (1 === t.$kind) return new CallScopeExpression(t.name, Le(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Le(), t.optional, true); else return new CallFunctionExpression(t, Le(), true);
    if (2688016 === Ae) return Be(t, true);
    throw bs();
}

function Pe(t, e) {
    const s = ye;
    switch (Ae) {
      case 2162700:
        {
            Se = true;
            me = false;
            const r = ge;
            const i = Ee;
            const n = Ae;
            const o = Ue;
            const c = ye;
            const u = me;
            const h = Se;
            Ne();
            if (0 === (13312 & Ae)) throw ws();
            if (2688007 === Ae) return new CallMemberExpression(t, s, Le(), e, true);
            ge = r;
            Ee = i;
            Ae = n;
            Ue = o;
            ye = c;
            me = u;
            Se = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        me = false;
        return new CallMemberExpression(t, s, Le(), e, false);

      default:
        me = !Se;
        Ne();
        return new AccessMemberExpression(t, s, e);
    }
}

var Te;

(function(t) {
    t[t["Valid"] = 1] = "Valid";
    t[t["Invalid"] = 2] = "Invalid";
    t[t["Default"] = 3] = "Default";
    t[t["Destructuring"] = 4] = "Destructuring";
})(Te || (Te = {}));

function Me(t) {
    Ne();
    const e = ge;
    const s = Ee;
    const r = Ae;
    const i = Ue;
    const n = ye;
    const o = me;
    const c = Se;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === Ae) {
            Ne();
            if (4096 !== Ae) throw Ye();
            u.push(new BindingIdentifier(ye));
            Ne();
            if (6291471 === Ae) throw Es();
            if (7340046 !== Ae) throw Xe();
            Ne();
            if (49 !== Ae) throw Xe();
            Ne();
            const t = Se;
            const e = xe;
            ++xe;
            const s = Ce(62, 0);
            Se = t;
            xe = e;
            me = false;
            return new ArrowFunction(u, s, true);
        }
        switch (Ae) {
          case 4096:
            u.push(new BindingIdentifier(ye));
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
            const t = Se;
            const e = xe;
            ++xe;
            const s = Ce(62, 0);
            Se = t;
            xe = e;
            me = false;
            return new ArrowFunction(u, s);
        }
        throw gs();
    } else if (1 === h && 0 === u.length) throw fs(49);
    if (a) switch (h) {
      case 2:
        throw gs();

      case 3:
        throw vs();

      case 4:
        throw xs();
    }
    ge = e;
    Ee = s;
    Ae = r;
    Ue = i;
    ye = n;
    me = o;
    Se = c;
    const l = Se;
    const f = Ce(62, t);
    Se = l;
    Ze(7340046);
    if (49 === Ae) switch (h) {
      case 2:
        throw gs();

      case 3:
        throw vs();

      case 4:
        throw xs();
    }
    return f;
}

function _e(t) {
    const e = Se;
    Ne();
    const s = new Array;
    while (7340051 !== Ae) if (He(6291471)) {
        s.push(pe);
        if (7340051 === Ae) break;
    } else {
        s.push(Ce(62, ~2 & t));
        if (He(6291471)) {
            if (7340051 === Ae) break;
        } else break;
    }
    Se = e;
    Ze(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        me = false;
        return new ArrayLiteralExpression(s);
    }
}

function Ie(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw us();
    if (4204592 !== Ae) throw us();
    Ne();
    const e = t;
    const s = Ce(61, 0);
    return new ForOfStatement(e, s);
}

function je(t) {
    const e = Se;
    const s = new Array;
    const r = new Array;
    Ne();
    while (7340045 !== Ae) {
        s.push(ye);
        if (49152 & Ae) {
            Ne();
            Ze(6291476);
            r.push(Ce(62, ~2 & t));
        } else if (12288 & Ae) {
            const e = Ue;
            const s = Ae;
            const i = ge;
            Ne();
            if (He(6291476)) r.push(Ce(62, ~2 & t)); else {
                Ue = e;
                Ae = s;
                ge = i;
                r.push(Ce(515, ~2 & t));
            }
        } else throw hs();
        if (7340045 !== Ae) Ze(6291471);
    }
    Se = e;
    Ze(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        me = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function De() {
    const t = [];
    const e = [];
    const s = ve;
    let r = "";
    while (ge < s) {
        switch (Ue) {
          case 36:
            if (123 === be.charCodeAt(ge + 1)) {
                t.push(r);
                r = "";
                ge += 2;
                Ue = be.charCodeAt(ge);
                Ne();
                const s = Ce(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(ce(Ke()));
            break;

          default:
            r += String.fromCharCode(Ue);
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
    const r = Se;
    const i = [ ye ];
    Ze(2163759);
    const n = [ Ce(62, t) ];
    while (2163758 !== (Ae = Ge())) {
        i.push(ye);
        Ze(2163759);
        n.push(Ce(62, t));
    }
    i.push(ye);
    me = false;
    Se = r;
    if (s) {
        Ne();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Ne();
        return new TemplateExpression(i, n);
    }
}

function Ve(t) {
    me = false;
    const e = [ ye ];
    Ne();
    return new TaggedTemplateExpression(e, e, t);
}

function Ne() {
    while (ge < ve) {
        Ee = ge;
        if (null != (Ae = Ls[Ue]())) return;
    }
    Ae = 6291456;
}

function Ke() {
    return Ue = be.charCodeAt(++ge);
}

function qe() {
    while ($s[Ke()]) ;
    const t = ms[ye = Oe()];
    return void 0 === t ? 4096 : t;
}

function Qe(t) {
    let e = Ue;
    if (false === t) {
        do {
            e = Ke();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            ye = parseInt(Oe(), 10);
            return 32768;
        }
        e = Ke();
        if (ge >= ve) {
            ye = parseInt(Oe().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Ke();
    } while (e <= 57 && e >= 48); else Ue = be.charCodeAt(--ge);
    ye = parseFloat(Oe());
    return 32768;
}

function ze() {
    const t = Ue;
    Ke();
    let e = 0;
    const s = new Array;
    let r = ge;
    while (Ue !== t) if (92 === Ue) {
        s.push(be.slice(r, ge));
        Ke();
        e = ce(Ue);
        Ke();
        s.push(String.fromCharCode(e));
        r = ge;
    } else if (ge >= ve) throw as(); else Ke();
    const i = be.slice(r, ge);
    Ke();
    s.push(i);
    const n = s.join("");
    ye = n;
    return 16384;
}

function We() {
    let t = true;
    let e = "";
    while (96 !== Ke()) if (36 === Ue) if (ge + 1 < ve && 123 === be.charCodeAt(ge + 1)) {
        ge++;
        t = false;
        break;
    } else e += "$"; else if (92 === Ue) e += String.fromCharCode(ce(Ke())); else {
        if (ge >= ve) throw ls();
        e += String.fromCharCode(Ue);
    }
    Ke();
    ye = e;
    if (t) return 2163758;
    return 2163759;
}

function Ge() {
    if (ge >= ve) throw ls();
    ge--;
    return We();
}

function He(t) {
    if (Ae === t) {
        Ne();
        return true;
    }
    return false;
}

function Ze(t) {
    if (Ae === t) Ne(); else throw fs(t);
}

function Je() {
    return new Error(`AUR0151:${be}`);
}

function Xe() {
    return new Error(`AUR0152:${be}`);
}

function Ye() {
    return new Error(`AUR0153:${be}`);
}

function ts() {
    return new Error(`AUR0154:${be}`);
}

function es() {
    return new Error(`AUR0155:${be}`);
}

function ss() {
    return new Error(`AUR0156:${be}`);
}

function rs() {
    return new Error(`AUR0157`);
}

function is() {
    return new Error(`AUR0158:${be}`);
}

function ns() {
    return new Error(`AUR0159:${be}`);
}

function os() {
    return new Error(`AUR0160:${be}`);
}

function cs() {
    return new Error(`AUR0161:${be}`);
}

function us() {
    return new Error(`AUR0163:${be}`);
}

function hs() {
    return new Error(`AUR0164:${be}`);
}

function as() {
    return new Error(`AUR0165:${be}`);
}

function ls() {
    return new Error(`AUR0166:${be}`);
}

function fs(t) {
    return new Error(`AUR0167:${be}<${Us[63 & t]}`);
}

const ps = () => {
    throw new Error(`AUR0168:${be}`);
};

ps.notMapped = true;

function ds() {
    return new Error(`AUR0170:${be}`);
}

function ws() {
    return new Error(`AUR0171:${be}`);
}

function bs() {
    return new Error(`AUR0172:${be}`);
}

function gs() {
    return new Error(`AUR0173:${be}`);
}

function vs() {
    return new Error(`AUR0174:${be}`);
}

function xs() {
    return new Error(`AUR0175:${be}`);
}

function Es() {
    return new Error(`AUR0176:${be}`);
}

function As() {
    return new Error(`AUR0178:${be}`);
}

function ys() {
    return new Error(`AUR0179:${be}`);
}

const Us = [ ae, le, fe, pe, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const ms = Object.assign(Object.create(null), {
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

const Ss = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Os(t, e, s, r) {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
}

function ks(t) {
    return () => {
        Ke();
        return t;
    };
}

const Cs = new Set;

Os(null, Cs, Ss.AsciiIdPart, true);

const $s = new Uint8Array(65535);

Os($s, null, Ss.IdStart, 1);

Os($s, null, Ss.Digit, 1);

const Ls = new Array(65535);

Ls.fill(ps, 0, 65535);

Os(Ls, null, Ss.Skip, (() => {
    Ke();
    return null;
}));

Os(Ls, null, Ss.IdStart, qe);

Os(Ls, null, Ss.Digit, (() => Qe(false)));

Ls[34] = Ls[39] = () => ze();

Ls[96] = () => We();

Ls[33] = () => {
    if (61 !== Ke()) return 131117;
    if (61 !== Ke()) return 6553948;
    Ke();
    return 6553950;
};

Ls[61] = () => {
    if (62 === Ke()) {
        Ke();
        return 49;
    }
    if (61 !== Ue) return 4194348;
    if (61 !== Ke()) return 6553947;
    Ke();
    return 6553949;
};

Ls[38] = () => {
    if (38 !== Ke()) return 6291478;
    Ke();
    return 6553882;
};

Ls[124] = () => {
    if (124 !== Ke()) return 6291479;
    Ke();
    return 6553817;
};

Ls[63] = () => {
    if (46 === Ke()) {
        const t = be.charCodeAt(ge + 1);
        if (t <= 48 || t >= 57) {
            Ke();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Ue) return 6291477;
    Ke();
    return 6553752;
};

Ls[46] = () => {
    if (Ke() <= 57 && Ue >= 48) return Qe(true);
    if (46 === Ue) {
        if (46 !== Ke()) return 10;
        Ke();
        return 11;
    }
    return 65545;
};

Ls[60] = () => {
    if (61 !== Ke()) return 6554015;
    Ke();
    return 6554017;
};

Ls[62] = () => {
    if (61 !== Ke()) return 6554016;
    Ke();
    return 6554018;
};

Ls[37] = ks(6554154);

Ls[40] = ks(2688007);

Ls[41] = ks(7340046);

Ls[42] = ks(6554153);

Ls[43] = ks(2490853);

Ls[44] = ks(6291471);

Ls[45] = ks(2490854);

Ls[47] = ks(6554155);

Ls[58] = ks(6291476);

Ls[91] = ks(2688016);

Ls[93] = ks(7340051);

Ls[123] = ks(524296);

Ls[125] = ks(7340045);

let Bs = null;

const Rs = [];

let Ps = false;

function Ts() {
    Ps = false;
}

function Ms() {
    Ps = true;
}

function _s() {
    return Bs;
}

function Is(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Bs) {
        Bs = t;
        Rs[0] = Bs;
        Ps = true;
        return;
    }
    if (Bs === t) throw new Error(`AUR0207`);
    Rs.push(t);
    Bs = t;
    Ps = true;
}

function js(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Bs !== t) throw new Error(`AUR0209`);
    Rs.pop();
    Bs = Rs.length > 0 ? Rs[Rs.length - 1] : null;
    Ps = null != Bs;
}

const Ds = Object.freeze({
    get current() {
        return Bs;
    },
    get connecting() {
        return Ps;
    },
    enter: Is,
    exit: js,
    pause: Ts,
    resume: Ms
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

function Qs(t) {
    return Ks(t) ? zs(t) : t;
}

function zs(t) {
    return Ns.get(t) ?? Zs(t);
}

function Ws(t) {
    return t[qs] ?? t;
}

function Gs(t) {
    return Ks(t) && t[qs] || t;
}

function Hs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Zs(t) {
    const e = u(t) ? Xs : t instanceof Map || t instanceof Set ? Ar : Js;
    const s = new Proxy(t, e);
    Ns.set(t, s);
    return s;
}

const Js = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = _s();
        if (!Ps || Hs(e) || null == r) return Fs(t, e, s);
        r.observe(t, e);
        return Qs(Fs(t, e, s));
    }
};

const Xs = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = _s();
        if (!Ps || Hs(e) || null == r) return Fs(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Ys;

          case "includes":
            return sr;

          case "indexOf":
            return rr;

          case "lastIndexOf":
            return ir;

          case "every":
            return tr;

          case "filter":
            return er;

          case "find":
            return or;

          case "findIndex":
            return nr;

          case "flat":
            return cr;

          case "flatMap":
            return ur;

          case "join":
            return hr;

          case "push":
            return lr;

          case "pop":
            return ar;

          case "reduce":
            return xr;

          case "reduceRight":
            return Er;

          case "reverse":
            return wr;

          case "shift":
            return fr;

          case "unshift":
            return pr;

          case "slice":
            return vr;

          case "splice":
            return dr;

          case "some":
            return br;

          case "sort":
            return gr;

          case "keys":
            return $r;

          case "values":
          case Symbol.iterator:
            return Lr;

          case "entries":
            return Br;
        }
        r.observe(t, e);
        return Qs(Fs(t, e, s));
    },
    ownKeys(t) {
        _s()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Ys(t, e) {
    const s = Ws(this);
    const r = s.map(((s, r) => Gs(t.call(e, Qs(s), r, this))));
    _s()?.observeCollection(s);
    return Qs(r);
}

function tr(t, e) {
    const s = Ws(this);
    const r = s.every(((s, r) => t.call(e, Qs(s), r, this)));
    _s()?.observeCollection(s);
    return r;
}

function er(t, e) {
    const s = Ws(this);
    const r = s.filter(((s, r) => Gs(t.call(e, Qs(s), r, this))));
    _s()?.observeCollection(s);
    return Qs(r);
}

function sr(t) {
    const e = Ws(this);
    const s = e.includes(Gs(t));
    _s()?.observeCollection(e);
    return s;
}

function rr(t) {
    const e = Ws(this);
    const s = e.indexOf(Gs(t));
    _s()?.observeCollection(e);
    return s;
}

function ir(t) {
    const e = Ws(this);
    const s = e.lastIndexOf(Gs(t));
    _s()?.observeCollection(e);
    return s;
}

function nr(t, e) {
    const s = Ws(this);
    const r = s.findIndex(((s, r) => Gs(t.call(e, Qs(s), r, this))));
    _s()?.observeCollection(s);
    return r;
}

function or(t, e) {
    const s = Ws(this);
    const r = s.find(((e, s) => t(Qs(e), s, this)), e);
    _s()?.observeCollection(s);
    return Qs(r);
}

function cr() {
    const t = Ws(this);
    _s()?.observeCollection(t);
    return Qs(t.flat());
}

function ur(t, e) {
    const s = Ws(this);
    _s()?.observeCollection(s);
    return zs(s.flatMap(((s, r) => Qs(t.call(e, Qs(s), r, this)))));
}

function hr(t) {
    const e = Ws(this);
    _s()?.observeCollection(e);
    return e.join(t);
}

function ar() {
    return Qs(Ws(this).pop());
}

function lr(...t) {
    return Ws(this).push(...t);
}

function fr() {
    return Qs(Ws(this).shift());
}

function pr(...t) {
    return Ws(this).unshift(...t);
}

function dr(...t) {
    return Qs(Ws(this).splice(...t));
}

function wr(...t) {
    const e = Ws(this);
    const s = e.reverse();
    _s()?.observeCollection(e);
    return Qs(s);
}

function br(t, e) {
    const s = Ws(this);
    const r = s.some(((s, r) => Gs(t.call(e, Qs(s), r, this))));
    _s()?.observeCollection(s);
    return r;
}

function gr(t) {
    const e = Ws(this);
    const s = e.sort(t);
    _s()?.observeCollection(e);
    return Qs(s);
}

function vr(t, e) {
    const s = Ws(this);
    _s()?.observeCollection(s);
    return zs(s.slice(t, e));
}

function xr(t, e) {
    const s = Ws(this);
    const r = s.reduce(((e, s, r) => t(e, Qs(s), r, this)), e);
    _s()?.observeCollection(s);
    return Qs(r);
}

function Er(t, e) {
    const s = Ws(this);
    const r = s.reduceRight(((e, s, r) => t(e, Qs(s), r, this)), e);
    _s()?.observeCollection(s);
    return Qs(r);
}

const Ar = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = _s();
        if (!Ps || Hs(e) || null == r) return Fs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return kr;

          case "delete":
            return Cr;

          case "forEach":
            return yr;

          case "add":
            if (t instanceof Set) return Or;
            break;

          case "get":
            if (t instanceof Map) return mr;
            break;

          case "set":
            if (t instanceof Map) return Sr;
            break;

          case "has":
            return Ur;

          case "keys":
            return $r;

          case "values":
            return Lr;

          case "entries":
            return Br;

          case Symbol.iterator:
            return t instanceof Map ? Br : Lr;
        }
        return Qs(Fs(t, e, s));
    }
};

function yr(t, e) {
    const s = Ws(this);
    _s()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Qs(s), Qs(r), this);
    }));
}

function Ur(t) {
    const e = Ws(this);
    _s()?.observeCollection(e);
    return e.has(Gs(t));
}

function mr(t) {
    const e = Ws(this);
    _s()?.observeCollection(e);
    return Qs(e.get(Gs(t)));
}

function Sr(t, e) {
    return Qs(Ws(this).set(Gs(t), Gs(e)));
}

function Or(t) {
    return Qs(Ws(this).add(Gs(t)));
}

function kr() {
    return Qs(Ws(this).clear());
}

function Cr(t) {
    return Qs(Ws(this).delete(Gs(t)));
}

function $r() {
    const t = Ws(this);
    _s()?.observeCollection(t);
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
                value: Qs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Lr() {
    const t = Ws(this);
    _s()?.observeCollection(t);
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
                value: Qs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Br() {
    const t = Ws(this);
    _s()?.observeCollection(t);
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
                value: [ Qs(s[0]), Qs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Rr = Object.freeze({
    getProxy: zs,
    getRaw: Ws,
    wrap: Qs,
    unwrap: Gs,
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
        const o = s.get;
        const c = s.set;
        const u = new ComputedObserver(t, o, c, i, r);
        const h = () => u.getValue();
        h.getObserver = () => u;
        n(t, e, {
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
        if (o(this.$set)) {
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
        Pr = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Pr);
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
            Is(this);
            return this.v = Gs(this.$get.call(this.up ? Qs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            js(this);
        }
    }
}

ie(ComputedObserver);

P(ComputedObserver);

D(ComputedObserver);

let Pr;

const Tr = t.DI.createInterface("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Mr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const _r = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.O = null;
        this.C = 0;
        this.check = () => {
            if (Mr.disabled) return;
            if (++this.C < Mr.timeoutsPerCheck) return;
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
        if (Mr.throw) throw new Error(`AUR0222:${l(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.O = this.p.taskQueue.queueTask(this.check, _r);
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

D(DirtyChecker);

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
        throw new Error(`Trying to set value for property ${l(this.key)} in dirty checker`);
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

P(DirtyCheckProperty);

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

let Ir;

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
        Ir = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ir);
    }
    start() {
        if (false === this.iO) {
            this.iO = true;
            this.v = this.o[this.k];
            n(this.o, this.k, {
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
            n(this.o, this.k, {
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
        this.hs = o(s);
        const i = t[e];
        this.cb = o(i) ? i : void 0;
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
        Ir = this.ov;
        this.ov = this.v;
        this.subs.notify(this.v, Ir);
    }
}

P(SetterObserver);

P(SetterNotifier);

D(SetterObserver);

D(SetterNotifier);

const jr = new PropertyAccessor;

const Dr = t.DI.createInterface("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Fr = t.DI.createInterface("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

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
        if (null == t) throw Qr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = qr(t);
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
        return jr;
    }
    getArrayObserver(t) {
        return wt(t);
    }
    getMapObserver(t) {
        return Gt(t);
    }
    getSetObserver(t) {
        return Pt(t);
    }
    createObserver(e, s) {
        if (this.B.handles(e, s, this)) return this.B.getObserver(e, s, this);
        switch (s) {
          case "length":
            if (u(e)) return wt(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Gt(e).getLengthObserver(); else if (e instanceof Set) return Pt(e).getLengthObserver();
            break;

          default:
            if (u(e) && t.isArrayIndex(s)) return wt(e).getIndexObserver(Number(s));
            break;
        }
        let r = Kr(e, s);
        if (void 0 === r) {
            let t = Nr(e);
            while (null !== t) {
                r = Kr(t, s);
                if (void 0 === r) t = Nr(t); else break;
            }
        }
        if (void 0 !== r && !i.call(r, "value")) {
            let t = this.R(e, s, r);
            if (null == t) t = (r.get?.getObserver ?? r.set?.getObserver)?.(e, this);
            return null == t ? r.configurable ? ComputedObserver.create(e, s, r, this, true) : this.$.createProperty(e, s) : t;
        }
        return new SetterObserver(e, s);
    }
    R(t, e, s) {
        if (this.L.length > 0) for (const r of this.L) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
}

ObserverLocator.inject = [ Tr, Fr ];

const Vr = t => {
    let e;
    if (u(t)) e = wt(t); else if (t instanceof Map) e = Gt(t); else if (t instanceof Set) e = Pt(t);
    return e;
};

const Nr = Object.getPrototypeOf;

const Kr = Object.getOwnPropertyDescriptor;

const qr = t => {
    let e = t.$observers;
    if (void 0 === e) n(t, "$observers", {
        enumerable: false,
        value: e = f()
    });
    return e;
};

const Qr = t => new Error(`AUR0199:${l(t)}`);

const zr = t.DI.createInterface("IObservation", (t => t.singleton(Observation)));

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
            Is(this);
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

ie(Effect);

function Wr(t) {
    if (void 0 === t.$observers) n(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Gr = {};

function Hr(t, e, s) {
    if (null == e) return (e, s, i) => r(e, s, i, t);
    return r(t, e, s);
    function r(t, e, s, r) {
        const i = void 0 === e;
        r = "object" !== typeof r ? {
            name: r
        } : r || {};
        if (i) e = r.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const o = r.callback || `${l(e)}Changed`;
        let c = Gr;
        if (s) {
            delete s.value;
            delete s.writable;
            c = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const u = r.set;
        s.get = function t() {
            const s = Zr(this, e, o, c, u);
            _s()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Zr(this, e, o, c, u).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Zr(s, e, o, c, u);
        };
        if (i) n(t.prototype, e, s); else return s;
    }
}

function Zr(t, e, s, r, i) {
    const n = Wr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Gr ? void 0 : r);
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

exports.ConnectableSwitcher = Ds;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = Mr;

exports.FlushQueue = FlushQueue;

exports.ForOfStatement = ForOfStatement;

exports.ICoercionConfiguration = U;

exports.IDirtyChecker = Tr;

exports.IExpressionParser = ne;

exports.IFlushQueue = V;

exports.INodeObserverLocator = Fr;

exports.IObservation = zr;

exports.IObserverLocator = Dr;

exports.ISignaler = w;

exports.Interpolation = Interpolation;

exports.MapObserver = MapObserver;

exports.ObjectBindingPattern = ObjectBindingPattern;

exports.ObjectLiteralExpression = ObjectLiteralExpression;

exports.Observation = Observation;

exports.ObserverLocator = ObserverLocator;

exports.PrimitiveLiteralExpression = PrimitiveLiteralExpression;

exports.PrimitiveObserver = PrimitiveObserver;

exports.PropertyAccessor = PropertyAccessor;

exports.ProxyObservable = Rr;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = gt;

exports.batch = L;

exports.cloneIndexMap = O;

exports.connectable = ie;

exports.copyIndexMap = m;

exports.createIndexMap = S;

exports.disableArrayObservation = dt;

exports.disableMapObservation = Wt;

exports.disableSetObservation = Rt;

exports.enableArrayObservation = pt;

exports.enableMapObservation = zt;

exports.enableSetObservation = Bt;

exports.getCollectionObserver = Vr;

exports.getObserverLookup = qr;

exports.isIndexMap = k;

exports.observable = Hr;

exports.parseExpression = ke;

exports.subscriberCollection = P;

exports.synchronizeIndices = vt;

exports.withFlushQueue = D;
//# sourceMappingURL=index.cjs.map
