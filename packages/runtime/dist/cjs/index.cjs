"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/metadata");

const s = Object.prototype.hasOwnProperty;

const r = Reflect.defineProperty;

const i = t => new Error(t);

const n = t => "function" === typeof t;

const o = t => "string" === typeof t;

const c = t => t instanceof Array;

function u(t, e, s) {
    r(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function h(t, e, s) {
    if (!(e in t)) u(t, e, s);
}

const a = String;

const l = t.DI.createInterface;

const f = () => Object.create(null);

const p = e.Metadata.getOwn;

e.Metadata.hasOwn;

const b = e.Metadata.define;

t.Protocol.annotation.keyFor;

t.Protocol.resource.keyFor;

t.Protocol.resource.appendTo;

const w = (t, e) => {
    switch (t.$kind) {
      case 11:
        return e.visitAccessKeyed(t);

      case 10:
        return e.visitAccessMember(t);

      case 1:
        return e.visitAccessScope(t);

      case 0:
        return e.visitAccessThis(t);

      case 19:
        return e.visitArrayBindingPattern(t);

      case 24:
        return e.visitDestructuringAssignmentExpression(t);

      case 2:
        return e.visitArrayLiteral(t);

      case 16:
        return e.visitArrowFunction(t);

      case 15:
        return e.visitAssign(t);

      case 13:
        return e.visitBinary(t);

      case 18:
        return e.visitBindingBehavior(t);

      case 21:
        return e.visitBindingIdentifier(t);

      case 9:
        return e.visitCallFunction(t);

      case 8:
        return e.visitCallMember(t);

      case 7:
        return e.visitCallScope(t);

      case 14:
        return e.visitConditional(t);

      case 26:
        return e.visitDestructuringAssignmentSingleExpression(t);

      case 22:
        return e.visitForOfStatement(t);

      case 23:
        return e.visitInterpolation(t);

      case 20:
        return e.visitObjectBindingPattern(t);

      case 25:
        return e.visitDestructuringAssignmentExpression(t);

      case 3:
        return e.visitObjectLiteral(t);

      case 4:
        return e.visitPrimitiveLiteral(t);

      case 12:
        return e.visitTaggedTemplate(t);

      case 5:
        return e.visitTemplate(t);

      case 6:
        return e.visitUnary(t);

      case 17:
        return e.visitValueConverter(t);

      case 28:
        return e.visitCustom(t);

      default:
        throw i(`Unknown ast node ${JSON.stringify(t)}`);
    }
};

class Unparser {
    constructor() {
        this.text = "";
    }
    static unparse(t) {
        const e = new Unparser;
        w(t, e);
        return e.text;
    }
    visitAccessMember(t) {
        w(t.object, this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        w(t.object, this);
        this.text += `${t.optional ? "?." : ""}[`;
        w(t.key, this);
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
            w(e[t], this);
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
        w(t.body, this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            w(s[t], this);
        }
        this.text += "}";
    }
    visitPrimitiveLiteral(t) {
        this.text += "(";
        if (o(t.value)) {
            const e = t.value.replace(/'/g, "\\'");
            this.text += `'${e}'`;
        } else this.text += `${t.value}`;
        this.text += ")";
    }
    visitCallFunction(t) {
        this.text += "(";
        w(t.func, this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        w(t.object, this);
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
            w(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        w(t.func, this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            w(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        w(t.expression, this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        w(t.left, this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        w(t.right, this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        w(t.condition, this);
        this.text += "?";
        w(t.yes, this);
        this.text += ":";
        w(t.no, this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        w(t.target, this);
        this.text += "=";
        w(t.value, this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        w(t.expression, this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            w(e[t], this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        w(t.expression, this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            w(e[t], this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            w(e[t], this);
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
            w(s[t], this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitForOfStatement(t) {
        w(t.declaration, this);
        this.text += " of ";
        w(t.iterable, this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            w(s[t], this);
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
                w(o, this);
                break;

              case 24:
              case 25:
                {
                    const t = o.source;
                    if (t) {
                        w(t, this);
                        this.text += ":";
                    }
                    w(o, this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        w(t.source, this);
        this.text += ":";
        w(t.target, this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            w(e, this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        w(t.target, this);
    }
    visitCustom(t) {
        this.text += a(t.value);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            w(t[e], this);
        }
        this.text += ")";
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
    t[t["DestructuringAssignmentRestLeaf"] = 27] = "DestructuringAssignmentRestLeaf";
    t[t["Custom"] = 28] = "Custom";
})(exports.ExpressionKind || (exports.ExpressionKind = {}));

class CustomExpression {
    constructor(t) {
        this.value = t;
        this.$kind = 28;
    }
    evaluate(t, e, s) {
        return this.value;
    }
    assign(t, e, s) {
        return s;
    }
    bind(t, e) {}
    unbind(t, e) {}
    accept(t) {
        return;
    }
}

class BindingBehaviorExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
        this.$kind = 18;
        this.key = `_bb_${e}`;
    }
}

class ValueConverterExpression {
    constructor(t, e, s) {
        this.expression = t;
        this.name = e;
        this.args = s;
        this.$kind = 17;
    }
}

class AssignExpression {
    constructor(t, e) {
        this.target = t;
        this.value = e;
        this.$kind = 15;
    }
}

class ConditionalExpression {
    constructor(t, e, s) {
        this.condition = t;
        this.yes = e;
        this.no = s;
        this.$kind = 14;
    }
}

class AccessThisExpression {
    constructor(t = 0) {
        this.ancestor = t;
        this.$kind = 0;
    }
}

AccessThisExpression.$this = new AccessThisExpression(0);

AccessThisExpression.$parent = new AccessThisExpression(1);

class AccessScopeExpression {
    constructor(t, e = 0) {
        this.name = t;
        this.ancestor = e;
        this.$kind = 1;
    }
}

class AccessMemberExpression {
    constructor(t, e, s = false) {
        this.object = t;
        this.name = e;
        this.optional = s;
        this.$kind = 10;
    }
}

class AccessKeyedExpression {
    constructor(t, e, s = false) {
        this.object = t;
        this.key = e;
        this.optional = s;
        this.$kind = 11;
    }
}

class CallScopeExpression {
    constructor(t, e, s = 0, r = false) {
        this.name = t;
        this.args = e;
        this.ancestor = s;
        this.optional = r;
        this.$kind = 7;
    }
}

class CallMemberExpression {
    constructor(t, e, s, r = false, i = false) {
        this.object = t;
        this.name = e;
        this.args = s;
        this.optionalMember = r;
        this.optionalCall = i;
        this.$kind = 8;
    }
}

class CallFunctionExpression {
    constructor(t, e, s = false) {
        this.func = t;
        this.args = e;
        this.optional = s;
        this.$kind = 9;
    }
}

class BinaryExpression {
    constructor(t, e, s) {
        this.operation = t;
        this.left = e;
        this.right = s;
        this.$kind = 13;
    }
}

class UnaryExpression {
    constructor(t, e) {
        this.operation = t;
        this.expression = e;
        this.$kind = 6;
    }
}

class PrimitiveLiteralExpression {
    constructor(t) {
        this.value = t;
        this.$kind = 4;
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
        this.$kind = 2;
    }
}

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(t.emptyArray);

class ObjectLiteralExpression {
    constructor(t, e) {
        this.keys = t;
        this.values = e;
        this.$kind = 3;
    }
}

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(t.emptyArray, t.emptyArray);

class TemplateExpression {
    constructor(e, s = t.emptyArray) {
        this.cooked = e;
        this.expressions = s;
        this.$kind = 5;
    }
}

TemplateExpression.$empty = new TemplateExpression([ "" ]);

class TaggedTemplateExpression {
    constructor(e, s, r, i = t.emptyArray) {
        this.cooked = e;
        this.func = r;
        this.expressions = i;
        this.$kind = 12;
        e.raw = s;
    }
}

class ArrayBindingPattern {
    constructor(t) {
        this.elements = t;
        this.$kind = 19;
    }
}

class ObjectBindingPattern {
    constructor(t, e) {
        this.keys = t;
        this.values = e;
        this.$kind = 20;
    }
}

class BindingIdentifier {
    constructor(t) {
        this.name = t;
        this.$kind = 21;
    }
}

class ForOfStatement {
    constructor(t, e) {
        this.declaration = t;
        this.iterable = e;
        this.$kind = 22;
    }
}

class Interpolation {
    constructor(e, s = t.emptyArray) {
        this.parts = e;
        this.expressions = s;
        this.$kind = 23;
        this.isMulti = s.length > 1;
        this.firstExpression = s[0];
    }
}

class DestructuringAssignmentExpression {
    constructor(t, e, s, r) {
        this.$kind = t;
        this.list = e;
        this.source = s;
        this.initializer = r;
    }
}

class DestructuringAssignmentSingleExpression {
    constructor(t, e, s) {
        this.target = t;
        this.source = e;
        this.initializer = s;
        this.$kind = 26;
    }
}

class DestructuringAssignmentRestExpression {
    constructor(t, e) {
        this.target = t;
        this.indexOrProperties = e;
        this.$kind = 26;
    }
}

class ArrowFunction {
    constructor(t, e, s = false) {
        this.args = t;
        this.body = e;
        this.rest = s;
        this.$kind = 16;
    }
}

class BindingContext {
    constructor(t, e) {
        if (void 0 !== t) this[t] = e;
    }
}

class Scope {
    constructor(t, e, s, r) {
        this.parent = t;
        this.bindingContext = e;
        this.overrideContext = s;
        this.isBoundary = r;
    }
    static getContext(t, e, s) {
        if (null == t) throw d();
        let r = t.overrideContext;
        let i = t;
        if (s > 0) {
            while (s > 0) {
                s--;
                i = i.parent;
                if (null == i) return;
            }
            r = i.overrideContext;
            return e in r ? r : i.bindingContext;
        }
        while (null != i && !i.isBoundary && !(e in i.overrideContext) && !(e in i.bindingContext)) i = i.parent;
        if (null == i) return t.bindingContext;
        r = i.overrideContext;
        return e in r ? r : i.bindingContext;
    }
    static create(t, e, s) {
        if (null == t) throw v();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw d();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const d = () => i(`AUR0203`);

const v = () => i("AUR0204");

class OverrideContext {}

const x = l("ISignaler", (t => t.singleton(Signaler)));

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

const g = Scope.getContext;

function A(t, e, s, r) {
    switch (t.$kind) {
      case 0:
        {
            let s = e.overrideContext;
            let r = e;
            let i = t.ancestor;
            while (i-- && s) {
                r = r.parent;
                s = r?.overrideContext ?? null;
            }
            return i < 1 && r ? r.bindingContext : void 0;
        }

      case 1:
        {
            const o = g(e, t.name, t.ancestor);
            if (null !== r) r.observe(o, t.name);
            const c = o[t.name];
            if (null == c && "$host" === t.name) throw i(`AUR0105`);
            if (s?.strict) return s?.boundFn && n(c) ? c.bind(o) : c;
            return null == c ? "" : s?.boundFn && n(c) ? c.bind(o) : c;
        }

      case 2:
        return t.elements.map((t => A(t, e, s, r)));

      case 3:
        {
            const i = {};
            for (let n = 0; n < t.keys.length; ++n) i[t.keys[n]] = A(t.values[n], e, s, r);
            return i;
        }

      case 4:
        return t.value;

      case 5:
        {
            let i = t.cooked[0];
            for (let n = 0; n < t.expressions.length; ++n) {
                i += String(A(t.expressions[n], e, s, r));
                i += t.cooked[n + 1];
            }
            return i;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void A(t.expression, e, s, r);

          case "typeof":
            return typeof A(t.expression, e, s, r);

          case "!":
            return !A(t.expression, e, s, r);

          case "-":
            return -A(t.expression, e, s, r);

          case "+":
            return +A(t.expression, e, s, r);

          default:
            throw i(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const i = t.args.map((t => A(t, e, s, r)));
            const n = g(e, t.name, t.ancestor);
            const o = S(s?.strictFnCall, n, t.name);
            if (o) return o.apply(n, i);
            return;
        }

      case 8:
        {
            const i = A(t.object, e, s, r);
            const n = t.args.map((t => A(t, e, s, r)));
            const o = S(s?.strictFnCall, i, t.name);
            let u;
            if (o) {
                u = o.apply(i, n);
                if (c(i) && U.includes(t.name)) r?.observeCollection(i);
            }
            return u;
        }

      case 9:
        {
            const o = A(t.func, e, s, r);
            if (n(o)) return o(...t.args.map((t => A(t, e, s, r))));
            if (!s?.strictFnCall && null == o) return;
            throw i(`AUR0107`);
        }

      case 16:
        {
            const i = (...i) => {
                const n = t.args;
                const o = t.rest;
                const c = n.length - 1;
                const u = n.reduce(((t, e, s) => {
                    if (o && s === c) t[e.name] = i.slice(s); else t[e.name] = i[s];
                    return t;
                }), {});
                const h = Scope.fromParent(e, u);
                return A(t.body, h, s, r);
            };
            return i;
        }

      case 10:
        {
            const i = A(t.object, e, s, r);
            let o;
            if (s?.strict) {
                if (null == i) return i;
                if (null !== r) r.observe(i, t.name);
                o = i[t.name];
                if (s?.boundFn && n(o)) return o.bind(i);
                return o;
            }
            if (null !== r && i instanceof Object) r.observe(i, t.name);
            if (i) {
                o = i[t.name];
                if (s?.boundFn && n(o)) return o.bind(i);
                return o;
            }
            return "";
        }

      case 11:
        {
            const i = A(t.object, e, s, r);
            if (i instanceof Object) {
                const n = A(t.key, e, s, r);
                if (null !== r) r.observe(i, n);
                return i[n];
            }
            return;
        }

      case 12:
        {
            const o = t.expressions.map((t => A(t, e, s, r)));
            const c = A(t.func, e, s, r);
            if (!n(c)) throw i(`AUR0110`);
            return c(t.cooked, ...o);
        }

      case 13:
        {
            const o = t.left;
            const c = t.right;
            switch (t.operation) {
              case "&&":
                return A(o, e, s, r) && A(c, e, s, r);

              case "||":
                return A(o, e, s, r) || A(c, e, s, r);

              case "??":
                return A(o, e, s, r) ?? A(c, e, s, r);

              case "==":
                return A(o, e, s, r) == A(c, e, s, r);

              case "===":
                return A(o, e, s, r) === A(c, e, s, r);

              case "!=":
                return A(o, e, s, r) != A(c, e, s, r);

              case "!==":
                return A(o, e, s, r) !== A(c, e, s, r);

              case "instanceof":
                {
                    const t = A(c, e, s, r);
                    if (n(t)) return A(o, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = A(c, e, s, r);
                    if (t instanceof Object) return A(o, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = A(o, e, s, r);
                    const i = A(c, e, s, r);
                    if (s?.strict) return t + i;
                    if (!t || !i) {
                        if ($(t) || $(i)) return (t || 0) + (i || 0);
                        if (R(t) || R(i)) return (t || "") + (i || "");
                    }
                    return t + i;
                }

              case "-":
                return A(o, e, s, r) - A(c, e, s, r);

              case "*":
                return A(o, e, s, r) * A(c, e, s, r);

              case "/":
                return A(o, e, s, r) / A(c, e, s, r);

              case "%":
                return A(o, e, s, r) % A(c, e, s, r);

              case "<":
                return A(o, e, s, r) < A(c, e, s, r);

              case ">":
                return A(o, e, s, r) > A(c, e, s, r);

              case "<=":
                return A(o, e, s, r) <= A(c, e, s, r);

              case ">=":
                return A(o, e, s, r) >= A(c, e, s, r);

              default:
                throw i(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return A(t.condition, e, s, r) ? A(t.yes, e, s, r) : A(t.no, e, s, r);

      case 15:
        return y(t.target, e, s, A(t.value, e, s, r));

      case 17:
        {
            const n = s?.getConverter?.(t.name);
            if (null == n) throw i(`AUR0103:${t.name}`);
            if ("toView" in n) return n.toView(A(t.expression, e, s, r), ...t.args.map((t => A(t, e, s, r))));
            return A(t.expression, e, s, r);
        }

      case 18:
        return A(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return A(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let i = t.parts[0];
            let n = 0;
            for (;n < t.expressions.length; ++n) {
                i += a(A(t.expressions[n], e, s, r));
                i += t.parts[n + 1];
            }
            return i;
        } else return `${t.parts[0]}${A(t.firstExpression, e, s, r)}${t.parts[1]}`;

      case 19:
      case 20:
      case 24:
      case 25:
      case 26:
      default:
        return;

      case 28:
        return t.evaluate(e, s, r);
    }
}

function y(e, s, r, n) {
    switch (e.$kind) {
      case 1:
        {
            if ("$host" === e.name) throw i(`AUR0106`);
            const t = g(s, e.name, e.ancestor);
            if (t instanceof Object) if (void 0 !== t.$observers?.[e.name]) {
                t.$observers[e.name].setValue(n);
                return n;
            } else return t[e.name] = n;
            return;
        }

      case 10:
        {
            const t = A(e.object, s, r, null);
            if (t instanceof Object) if (void 0 !== t.$observers && void 0 !== t.$observers[e.name]) t.$observers[e.name].setValue(n); else t[e.name] = n; else y(e.object, s, r, {
                [e.name]: n
            });
            return n;
        }

      case 11:
        {
            const t = A(e.object, s, r, null);
            const i = A(e.key, s, r, null);
            return t[i] = n;
        }

      case 15:
        y(e.value, s, r, n);
        return y(e.target, s, r, n);

      case 17:
        {
            const t = r?.getConverter?.(e.name);
            if (null == t) throw k(e.name);
            if ("fromView" in t) n = t.fromView(n, ...e.args.map((t => A(t, s, r, null))));
            return y(e.expression, s, r, n);
        }

      case 18:
        return y(e.expression, s, r, n);

      case 24:
      case 25:
        {
            const t = e.list;
            const o = t.length;
            let c;
            let u;
            for (c = 0; c < o; c++) {
                u = t[c];
                switch (u.$kind) {
                  case 26:
                    y(u, s, r, n);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof n || null === n) throw i(`AUR0112`);
                        let t = A(u.source, Scope.create(n), r, null);
                        if (void 0 === t && u.initializer) t = A(u.initializer, s, r, null);
                        y(u, s, r, t);
                        break;
                    }
                }
            }
            break;
        }

      case 26:
        if (e instanceof DestructuringAssignmentSingleExpression) {
            if (null == n) return;
            if ("object" !== typeof n) throw i(`AUR0112`);
            let t = A(e.source, Scope.create(n), r, null);
            if (void 0 === t && e.initializer) t = A(e.initializer, s, r, null);
            y(e.target, s, r, t);
        } else {
            if (null == n) return;
            if ("object" !== typeof n) throw i(`AUR0112`);
            const o = e.indexOrProperties;
            let c;
            if (t.isArrayIndex(o)) {
                if (!Array.isArray(n)) throw i(`AUR0112`);
                c = n.slice(o);
            } else c = Object.entries(n).reduce(((t, [e, s]) => {
                if (!o.includes(e)) t[e] = s;
                return t;
            }), {});
            y(e.target, s, r, c);
        }
        break;

      case 28:
        return e.assign(s, r, n);

      default:
        return;
    }
}

function m(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const i = t.key;
            const n = s.getBehavior?.(r);
            if (null == n) throw O(r);
            if (void 0 === s[i]) {
                s[i] = n;
                n.bind?.(e, s, ...t.args.map((t => A(t, e, s, null))));
            } else throw C(r);
            m(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const i = s.getConverter?.(r);
            if (null == i) throw k(r);
            const n = i.signals;
            if (null != n) {
                const t = s.get?.(x);
                const e = n.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(n[r], s);
            }
            m(t.expression, e, s);
            return;
        }

      case 22:
        m(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function E(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const i = s;
            if (void 0 !== i[r]) {
                i[r].unbind?.(e, s);
                i[r] = void 0;
            }
            E(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const i = s.get(x);
            let n = 0;
            for (;n < r.signals.length; ++n) i.removeSignalListener(r.signals[n], s);
            E(t.expression, e, s);
            break;
        }

      case 22:
        E(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const O = t => i(`AUR0101:${t}`);

const C = t => i(`AUR0102:${t}`);

const k = t => i(`AUR0103:${t}`);

const S = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (n(r)) return r;
    if (!t && null == r) return null;
    throw i(`AUR0111:${s}`);
};

const $ = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const R = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const U = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const L = t.DI.createInterface("ICoercionConfiguration");

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

function P(t, e, s) {
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

function _(t = 0) {
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

function j(t) {
    return c(t) && true === t.isIndexMap;
}

let I = new Map;

let B = false;

function T(t) {
    const e = I;
    const s = I = new Map;
    B = true;
    try {
        t();
    } finally {
        I = null;
        B = false;
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
            I = e;
        }
    }
}

function D(t, e, s) {
    if (!I.has(t)) I.set(t, [ 2, e, s ]);
}

function V(t, e, s) {
    const r = I.get(t);
    if (void 0 === r) I.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function F(t) {
    return null == t ? N : N(t);
}

function N(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: z
    });
    h(e, "subscribe", K);
    h(e, "unsubscribe", W);
}

class SubscriberRecord {
    constructor() {
        this.count = 0;
        this.t = [];
    }
    add(t) {
        if (this.t.includes(t)) return false;
        this.t[this.t.length] = t;
        ++this.count;
        return true;
    }
    remove(t) {
        const e = this.t.indexOf(t);
        if (-1 !== e) {
            this.t.splice(e, 1);
            --this.count;
            return true;
        }
        return false;
    }
    notify(t, e) {
        if (B) {
            V(this, t, e);
            return;
        }
        const s = this.t.slice(0);
        const r = s.length;
        let i = 0;
        for (;i < r; ++i) s[i].handleChange(t, e);
        return;
    }
    notifyCollection(t, e) {
        const s = this.t.slice(0);
        const r = s.length;
        let i = 0;
        for (;i < r; ++i) s[i].handleCollectionChange(t, e);
        return;
    }
}

function z() {
    return u(this, "subs", new SubscriberRecord);
}

function K(t) {
    return this.subs.add(t);
}

function W(t) {
    return this.subs.remove(t);
}

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
        if (t !== this.v) if (!Number.isNaN(t)) {
            this.o.splice(t);
            this.v = this.o.length;
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
        throw i(`AUR02`);
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.size;
        if ((this.v = r) !== s) this.subs.notify(this.v, s);
    }
}

function q(t) {
    const e = t.prototype;
    h(e, "subscribe", J);
    h(e, "unsubscribe", G);
    F(t);
}

function J(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function G(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

q(CollectionLengthObserver);

q(CollectionSizeObserver);

const H = "__au_array_obs__";

const Q = (() => {
    let t = p(H, Array);
    if (null == t) b(H, t = new WeakMap, Array);
    return t;
})();

function X(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function Y(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function Z(t, e, s, r, i) {
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
    let p, b, w;
    let d, v;
    let x, g, A, y;
    let m, E, O, C;
    while (true) {
        if (r - s <= 10) {
            Z(t, e, s, r, i);
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
            d = c;
            v = a;
            c = u;
            a = l;
            u = d;
            l = v;
        }
        b = i(c, h);
        if (b >= 0) {
            d = c;
            v = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = d;
            l = v;
        } else {
            w = i(u, h);
            if (w > 0) {
                d = u;
                v = l;
                u = h;
                l = f;
                h = d;
                f = v;
            }
        }
        t[s] = c;
        e[s] = a;
        t[r - 1] = h;
        e[r - 1] = f;
        x = u;
        g = l;
        A = s + 1;
        y = r - 1;
        t[n] = t[A];
        e[n] = e[A];
        t[A] = x;
        e[A] = g;
        t: for (o = A + 1; o < y; o++) {
            m = t[o];
            E = e[o];
            O = i(m, x);
            if (O < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = m;
                e[A] = E;
                A++;
            } else if (O > 0) {
                do {
                    y--;
                    if (y == o) break t;
                    C = t[y];
                    O = i(C, x);
                } while (O > 0);
                t[o] = t[y];
                e[o] = e[y];
                t[y] = m;
                e[y] = E;
                if (O < 0) {
                    m = t[o];
                    E = e[o];
                    t[o] = t[A];
                    e[o] = e[A];
                    t[A] = m;
                    e[A] = E;
                    A++;
                }
            }
        }
        if (r - y < A - s) {
            tt(t, e, y, r, i);
            r = A;
        } else {
            tt(t, e, s, A, i);
            s = y;
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
        const e = Q.get(this);
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
        const e = Q.get(this);
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
        const t = Q.get(this);
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
        const t = Q.get(this);
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
        const r = Q.get(this);
        if (void 0 === r) return ot.apply(this, t);
        const i = this.length;
        const n = 0 | e;
        const o = n < 0 ? Math.max(i + n, 0) : Math.min(n, i);
        const c = r.indexMap;
        const u = t.length;
        const h = 0 === u ? 0 : 1 === u ? i - o : s;
        let a = o;
        if (h > 0) {
            const t = a + h;
            while (a < t) {
                if (c[a] > -1) {
                    c.deletedIndices.push(c[a]);
                    c.deletedItems.push(this[a]);
                }
                a++;
            }
        }
        a = 0;
        if (u > 2) {
            const t = u - 2;
            const r = new Array(t);
            while (a < t) r[a++] = -2;
            ot.call(c, e, s, ...r);
        } else ot.apply(c, t);
        const l = ot.apply(this, t);
        if (h > 0 || a > 0) r.notify();
        return l;
    },
    reverse: function() {
        const t = Q.get(this);
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
        const e = Q.get(this);
        if (void 0 === e) {
            ut.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        tt(this, e.indexMap, 0, s, Y);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !n(t)) t = X;
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

for (const t of at) r(lt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let ft = false;

const pt = "__au_arr_on__";

function bt() {
    if (!(p(pt, Array) ?? false)) {
        b(pt, true, Array);
        for (const t of at) if (true !== et[t].observing) u(et, t, lt[t]);
    }
}

function wt() {
    for (const t of at) if (true === et[t].observing) u(et, t, ht[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!ft) {
            ft = true;
            bt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = _(t.length);
        this.lenObs = void 0;
        Q.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (B) {
            D(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = _(r);
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

function dt(t) {
    let e = Q.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const vt = (t, e) => t - e;

function xt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = M(t);
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

function gt(t, e) {
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

const yt = (() => {
    let t = p(At, Set);
    if (null == t) b(At, t = new WeakMap, Set);
    return t;
})();

const mt = Set.prototype;

const Et = mt.add;

const Ot = mt.clear;

const Ct = mt.delete;

const kt = {
    add: Et,
    clear: Ot,
    delete: Ct
};

const St = [ "add", "clear", "delete" ];

const $t = {
    add: function(t) {
        const e = yt.get(this);
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
        const t = yt.get(this);
        if (void 0 === t) return Ot.call(this);
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
            Ot.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = yt.get(this);
        if (void 0 === e) return Ct.call(this, t);
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
                const n = Ct.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            r++;
        }
        return false;
    }
};

const Rt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of St) r($t[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Ut = false;

const Lt = "__au_set_on__";

function Pt() {
    if (!(p(Lt, Set) ?? false)) {
        b(Lt, true, Set);
        for (const t of St) if (true !== mt[t].observing) r(mt, t, {
            ...Rt,
            value: $t[t]
        });
    }
}

function _t() {
    for (const t of St) if (true === mt[t].observing) r(mt, t, {
        ...Rt,
        value: kt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Ut) {
            Ut = true;
            Pt();
        }
        this.collection = t;
        this.indexMap = _(t.size);
        this.lenObs = void 0;
        yt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (B) {
            D(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = _(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

F(SetObserver);

function Mt(t) {
    let e = yt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const jt = "__au_map_obs__";

const It = (() => {
    let t = p(jt, Map);
    if (null == t) b(jt, t = new WeakMap, Map);
    return t;
})();

const Bt = Map.prototype;

const Tt = Bt.set;

const Dt = Bt.clear;

const Vt = Bt.delete;

const Ft = {
    set: Tt,
    clear: Dt,
    delete: Vt
};

const Nt = [ "set", "clear", "delete" ];

const zt = {
    set: function(t, e) {
        const s = It.get(this);
        if (void 0 === s) {
            Tt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Tt.call(this, t, e);
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
        const t = It.get(this);
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
        const e = It.get(this);
        if (void 0 === e) return Vt.call(this, t);
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
                const n = Vt.call(this, t);
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

for (const t of Nt) r(zt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Wt = false;

const qt = "__au_map_on__";

function Jt() {
    if (!(p(qt, Map) ?? false)) {
        b(qt, true, Map);
        for (const t of Nt) if (true !== Bt[t].observing) r(Bt, t, {
            ...Kt,
            value: zt[t]
        });
    }
}

function Gt() {
    for (const t of Nt) if (true === Bt[t].observing) r(Bt, t, {
        ...Kt,
        value: Ft[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Wt) {
            Wt = true;
            Jt();
        }
        this.collection = t;
        this.indexMap = _(t.size);
        this.lenObs = void 0;
        It.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (B) {
            D(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = _(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

F(MapObserver);

function Ht(t) {
    let e = It.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Qt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Xt() {
    return u(this, "obs", new BindingObserverRecord(this));
}

function Yt(t) {
    let e;
    if (c(t)) e = dt(t); else if (t instanceof Set) e = Mt(t); else if (t instanceof Map) e = Ht(t); else throw i(`AUR0210`);
    this.obs.add(e);
}

function Zt(t) {
    this.obs.add(t);
}

function te() {
    throw i(`AUR2011:handleChange`);
}

function ee() {
    throw i(`AUR2011:handleCollectionChange`);
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
    h(e, "observe", Qt);
    h(e, "observeCollection", Yt);
    h(e, "subscribeTo", Zt);
    r(e, "obs", {
        get: Xt
    });
    h(e, "handleChange", te);
    h(e, "handleCollectionChange", ee);
    return t;
}

function ne(t) {
    return null == t ? ie : ie(t);
}

const oe = l("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = f();
        this.u = f();
        this.h = f();
    }
    parse(t, e) {
        let s;
        switch (e) {
          case 16:
            return new CustomExpression(t);

          case 1:
            s = this.h[t];
            if (void 0 === s) s = this.h[t] = this.$parse(t, e);
            return s;

          case 2:
            s = this.u[t];
            if (void 0 === s) s = this.u[t] = this.$parse(t, e);
            return s;

          default:
            if (0 === t.length) {
                if ((e & (4 | 8)) > 0) return PrimitiveLiteralExpression.$empty;
                throw ss();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        be = t;
        we = 0;
        de = t.length;
        ve = 0;
        xe = 0;
        ge = 6291456;
        Ae = "";
        ye = Ce(0);
        me = true;
        Ee = false;
        return $e(61, void 0 === e ? 8 : e);
    }
}

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

const ue = PrimitiveLiteralExpression.$false;

const he = PrimitiveLiteralExpression.$true;

const ae = PrimitiveLiteralExpression.$null;

const le = PrimitiveLiteralExpression.$undefined;

const fe = AccessThisExpression.$this;

const pe = AccessThisExpression.$parent;

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

let we = 0;

let de = 0;

let ve = 0;

let xe = 0;

let ge = 6291456;

let Ae = "";

let ye;

let me = true;

let Ee = false;

const Oe = String.fromCharCode;

const Ce = t => be.charCodeAt(t);

const ke = () => be.slice(xe, we);

function Se(t, e) {
    be = t;
    we = 0;
    de = t.length;
    ve = 0;
    xe = 0;
    ge = 6291456;
    Ae = "";
    ye = Ce(0);
    me = true;
    Ee = false;
    return $e(61, void 0 === e ? 8 : e);
}

function $e(t, e) {
    if (16 === e) return new CustomExpression(be);
    if (0 === we) {
        if (1 & e) return Te();
        Fe();
        if (4194304 & ge) throw Qe();
    }
    me = 513 > t;
    Ee = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & ge) {
        const t = ms[63 & ge];
        Fe();
        r = new UnaryExpression(t, $e(514, e));
        me = false;
    } else {
        t: switch (ge) {
          case 12294:
            i = ve;
            me = false;
            do {
                Fe();
                ++i;
                switch (ge) {
                  case 65545:
                    Fe();
                    if (0 === (12288 & ge)) throw Ye();
                    break;

                  case 10:
                  case 11:
                    throw Ye();

                  case 2162700:
                    Ee = true;
                    Fe();
                    if (0 === (12288 & ge)) {
                        r = 0 === i ? fe : 1 === i ? pe : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & ge) {
                        r = 0 === i ? fe : 1 === i ? pe : new AccessThisExpression(i);
                        break t;
                    }
                    throw Ze();
                }
            } while (12294 === ge);

          case 4096:
            {
                const t = Ae;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                me = !Ee;
                Fe();
                if (Ge(49)) {
                    if (524296 === ge) throw As();
                    const e = Ee;
                    const s = ve;
                    ++ve;
                    const i = $e(62, 0);
                    Ee = e;
                    ve = s;
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
            Fe();
            switch (ve) {
              case 0:
                r = fe;
                break;

              case 1:
                r = pe;
                break;

              default:
                r = new AccessThisExpression(ve);
                break;
            }
            break;

          case 2688007:
            r = Me(e);
            break;

          case 2688016:
            r = be.search(/\s+of\s+/) > we ? Re() : je(e);
            break;

          case 524296:
            r = Be(e);
            break;

          case 2163758:
            r = new TemplateExpression([ Ae ]);
            me = false;
            Fe();
            break;

          case 2163759:
            r = De(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(Ae);
            me = false;
            Fe();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = ms[63 & ge];
            me = false;
            Fe();
            break;

          default:
            if (we >= de) throw ts(); else throw es();
        }
        if (2 & e) return Ie(r);
        if (514 < t) return r;
        if (10 === ge || 11 === ge) throw Ye();
        if (0 === r.$kind) switch (ge) {
          case 2162700:
            Ee = true;
            me = false;
            Fe();
            if (0 === (13312 & ge)) throw bs();
            if (12288 & ge) {
                r = new AccessScopeExpression(Ae, r.ancestor);
                Fe();
            } else if (2688007 === ge) r = new CallFunctionExpression(r, Ue(), true); else if (2688016 === ge) r = Le(r, true); else throw ws();
            break;

          case 65545:
            me = !Ee;
            Fe();
            if (0 === (12288 & ge)) throw Ye();
            r = new AccessScopeExpression(Ae, r.ancestor);
            Fe();
            break;

          case 10:
          case 11:
            throw Ye();

          case 2688007:
            r = new CallFunctionExpression(r, Ue(), s);
            break;

          case 2688016:
            r = Le(r, s);
            break;

          case 2163758:
            r = Ve(r);
            break;

          case 2163759:
            r = De(e, r, true);
            break;
        }
        while ((65536 & ge) > 0) switch (ge) {
          case 2162700:
            r = Pe(r);
            break;

          case 65545:
            Fe();
            if (0 === (12288 & ge)) throw Ye();
            r = _e(r, false);
            break;

          case 10:
          case 11:
            throw Ye();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Ue(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Ue(), r.optional, false); else r = new CallFunctionExpression(r, Ue(), false);
            break;

          case 2688016:
            r = Le(r, false);
            break;

          case 2163758:
            if (Ee) throw ws();
            r = Ve(r);
            break;

          case 2163759:
            if (Ee) throw ws();
            r = De(e, r, true);
            break;
        }
    }
    if (10 === ge || 11 === ge) throw Ye();
    if (513 < t) return r;
    while ((262144 & ge) > 0) {
        const s = ge;
        if ((960 & s) <= t) break;
        Fe();
        r = new BinaryExpression(ms[63 & s], r, $e(960 & s, e));
        me = false;
    }
    if (63 < t) return r;
    if (Ge(6291477)) {
        const t = $e(62, e);
        He(6291476);
        r = new ConditionalExpression(r, t, $e(62, e));
        me = false;
    }
    if (62 < t) return r;
    if (Ge(4194348)) {
        if (!me) throw rs();
        r = new AssignExpression(r, $e(62, e));
    }
    if (61 < t) return r;
    while (Ge(6291479)) {
        if (6291456 === ge) throw is();
        const t = Ae;
        Fe();
        const s = new Array;
        while (Ge(6291476)) s.push($e(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Ge(6291478)) {
        if (6291456 === ge) throw ns();
        const t = Ae;
        Fe();
        const s = new Array;
        while (Ge(6291476)) s.push($e(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== ge) {
        if ((1 & e) > 0 && 7340045 === ge) return r;
        if ("of" === ke()) throw os();
        throw es();
    }
    return r;
}

function Re() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Fe();
        switch (ge) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = ke();
            break;

          default:
            throw ps();
        }
    }
    He(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(fe, s), new AccessKeyedExpression(fe, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Ue() {
    const t = Ee;
    Fe();
    const e = [];
    while (7340046 !== ge) {
        e.push($e(62, 0));
        if (!Ge(6291471)) break;
    }
    He(7340046);
    me = false;
    Ee = t;
    return e;
}

function Le(t, e) {
    const s = Ee;
    Fe();
    t = new AccessKeyedExpression(t, $e(62, 0), e);
    He(7340051);
    me = !s;
    Ee = s;
    return t;
}

function Pe(t) {
    Ee = true;
    me = false;
    Fe();
    if (0 === (13312 & ge)) throw bs();
    if (12288 & ge) return _e(t, true);
    if (2688007 === ge) if (1 === t.$kind) return new CallScopeExpression(t.name, Ue(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Ue(), t.optional, true); else return new CallFunctionExpression(t, Ue(), true);
    if (2688016 === ge) return Le(t, true);
    throw ws();
}

function _e(t, e) {
    const s = Ae;
    switch (ge) {
      case 2162700:
        {
            Ee = true;
            me = false;
            const r = we;
            const i = xe;
            const n = ge;
            const o = ye;
            const c = Ae;
            const u = me;
            const h = Ee;
            Fe();
            if (0 === (13312 & ge)) throw bs();
            if (2688007 === ge) return new CallMemberExpression(t, s, Ue(), e, true);
            we = r;
            xe = i;
            ge = n;
            ye = o;
            Ae = c;
            me = u;
            Ee = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        me = false;
        return new CallMemberExpression(t, s, Ue(), e, false);

      default:
        me = !Ee;
        Fe();
        return new AccessMemberExpression(t, s, e);
    }
}

function Me(t) {
    Fe();
    const e = we;
    const s = xe;
    const r = ge;
    const i = ye;
    const n = Ae;
    const o = me;
    const c = Ee;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === ge) {
            Fe();
            if (4096 !== ge) throw Ye();
            u.push(new BindingIdentifier(Ae));
            Fe();
            if (6291471 === ge) throw gs();
            if (7340046 !== ge) throw Xe();
            Fe();
            if (49 !== ge) throw Xe();
            Fe();
            const t = Ee;
            const e = ve;
            ++ve;
            const s = $e(62, 0);
            Ee = t;
            ve = e;
            me = false;
            return new ArrowFunction(u, s, true);
        }
        switch (ge) {
          case 4096:
            u.push(new BindingIdentifier(Ae));
            Fe();
            break;

          case 7340046:
            Fe();
            break t;

          case 524296:
          case 2688016:
            Fe();
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
            Fe();
            h = 2;
            break;
        }
        switch (ge) {
          case 6291471:
            Fe();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Fe();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw ds();
            Fe();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === ge) {
        if (1 === h) {
            Fe();
            if (524296 === ge) throw As();
            const t = Ee;
            const e = ve;
            ++ve;
            const s = $e(62, 0);
            Ee = t;
            ve = e;
            me = false;
            return new ArrowFunction(u, s);
        }
        throw ds();
    } else if (1 === h && 0 === u.length) throw ls(49);
    if (a) switch (h) {
      case 2:
        throw ds();

      case 3:
        throw vs();

      case 4:
        throw xs();
    }
    we = e;
    xe = s;
    ge = r;
    ye = i;
    Ae = n;
    me = o;
    Ee = c;
    const l = Ee;
    const f = $e(62, t);
    Ee = l;
    He(7340046);
    if (49 === ge) switch (h) {
      case 2:
        throw ds();

      case 3:
        throw vs();

      case 4:
        throw xs();
    }
    return f;
}

function je(t) {
    const e = Ee;
    Fe();
    const s = new Array;
    while (7340051 !== ge) if (Ge(6291471)) {
        s.push(le);
        if (7340051 === ge) break;
    } else {
        s.push($e(62, ~2 & t));
        if (Ge(6291471)) {
            if (7340051 === ge) break;
        } else break;
    }
    Ee = e;
    He(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        me = false;
        return new ArrayLiteralExpression(s);
    }
}

function Ie(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw cs();
    if (4204592 !== ge) throw cs();
    Fe();
    const e = t;
    const s = $e(61, 0);
    return new ForOfStatement(e, s);
}

function Be(t) {
    const e = Ee;
    const s = new Array;
    const r = new Array;
    Fe();
    while (7340045 !== ge) {
        s.push(Ae);
        if (49152 & ge) {
            Fe();
            He(6291476);
            r.push($e(62, ~2 & t));
        } else if (12288 & ge) {
            const e = ye;
            const s = ge;
            const i = we;
            Fe();
            if (Ge(6291476)) r.push($e(62, ~2 & t)); else {
                ye = e;
                ge = s;
                we = i;
                r.push($e(515, ~2 & t));
            }
        } else throw us();
        if (7340045 !== ge) He(6291471);
    }
    Ee = e;
    He(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        me = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function Te() {
    const t = [];
    const e = [];
    const s = de;
    let r = "";
    while (we < s) {
        switch (ye) {
          case 36:
            if (123 === Ce(we + 1)) {
                t.push(r);
                r = "";
                we += 2;
                ye = Ce(we);
                Fe();
                const s = $e(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += Oe(ce(Ne()));
            break;

          default:
            r += Oe(ye);
        }
        Ne();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function De(t, e, s) {
    const r = Ee;
    const i = [ Ae ];
    He(2163759);
    const n = [ $e(62, t) ];
    while (2163758 !== (ge = Je())) {
        i.push(Ae);
        He(2163759);
        n.push($e(62, t));
    }
    i.push(Ae);
    me = false;
    Ee = r;
    if (s) {
        Fe();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Fe();
        return new TemplateExpression(i, n);
    }
}

function Ve(t) {
    me = false;
    const e = [ Ae ];
    Fe();
    return new TaggedTemplateExpression(e, e, t);
}

function Fe() {
    while (we < de) {
        xe = we;
        if (null != (ge = Rs[ye]())) return;
    }
    ge = 6291456;
}

function Ne() {
    return ye = Ce(++we);
}

function ze() {
    while ($s[Ne()]) ;
    const t = Es[Ae = ke()];
    return void 0 === t ? 4096 : t;
}

function Ke(t) {
    let e = ye;
    if (false === t) {
        do {
            e = Ne();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Ae = parseInt(ke(), 10);
            return 32768;
        }
        e = Ne();
        if (we >= de) {
            Ae = parseInt(ke().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Ne();
    } while (e <= 57 && e >= 48); else ye = Ce(--we);
    Ae = parseFloat(ke());
    return 32768;
}

function We() {
    const t = ye;
    Ne();
    let e = 0;
    const s = new Array;
    let r = we;
    while (ye !== t) if (92 === ye) {
        s.push(be.slice(r, we));
        Ne();
        e = ce(ye);
        Ne();
        s.push(Oe(e));
        r = we;
    } else if (we >= de) throw hs(); else Ne();
    const i = be.slice(r, we);
    Ne();
    s.push(i);
    const n = s.join("");
    Ae = n;
    return 16384;
}

function qe() {
    let t = true;
    let e = "";
    while (96 !== Ne()) if (36 === ye) if (we + 1 < de && 123 === Ce(we + 1)) {
        we++;
        t = false;
        break;
    } else e += "$"; else if (92 === ye) e += Oe(ce(Ne())); else {
        if (we >= de) throw as();
        e += Oe(ye);
    }
    Ne();
    Ae = e;
    if (t) return 2163758;
    return 2163759;
}

const Je = () => {
    if (we >= de) throw as();
    we--;
    return qe();
};

const Ge = t => {
    if (ge === t) {
        Fe();
        return true;
    }
    return false;
};

const He = t => {
    if (ge === t) Fe(); else throw ls(t);
};

const Qe = () => i(`AUR0151:${be}`);

const Xe = () => i(`AUR0152:${be}`);

const Ye = () => i(`AUR0153:${be}`);

const Ze = () => i(`AUR0154:${be}`);

const ts = () => i(`AUR0155:${be}`);

const es = () => i(`AUR0156:${be}`);

const ss = () => i(`AUR0157`);

const rs = () => i(`AUR0158:${be}`);

const is = () => i(`AUR0159:${be}`);

const ns = () => i(`AUR0160:${be}`);

const os = () => i(`AUR0161:${be}`);

const cs = () => i(`AUR0163:${be}`);

const us = () => i(`AUR0164:${be}`);

const hs = () => i(`AUR0165:${be}`);

const as = () => i(`AUR0166:${be}`);

const ls = t => i(`AUR0167:${be}<${ms[63 & t]}`);

const fs = () => {
    throw i(`AUR0168:${be}`);
};

fs.notMapped = true;

const ps = () => i(`AUR0170:${be}`);

const bs = () => i(`AUR0171:${be}`);

const ws = () => i(`AUR0172:${be}`);

const ds = () => i(`AUR0173:${be}`);

const vs = () => i(`AUR0174:${be}`);

const xs = () => i(`AUR0175:${be}`);

const gs = () => i(`AUR0176:${be}`);

const As = () => i(`AUR0178:${be}`);

const ys = () => i(`AUR0179:${be}`);

const ms = [ ue, he, ae, le, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

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

const Os = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

const Cs = (t, e, s, r) => {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
};

const ks = t => () => {
    Ne();
    return t;
};

const Ss = new Set;

Cs(null, Ss, Os.AsciiIdPart, true);

const $s = new Uint8Array(65535);

Cs($s, null, Os.IdStart, 1);

Cs($s, null, Os.Digit, 1);

const Rs = new Array(65535);

Rs.fill(fs, 0, 65535);

Cs(Rs, null, Os.Skip, (() => {
    Ne();
    return null;
}));

Cs(Rs, null, Os.IdStart, ze);

Cs(Rs, null, Os.Digit, (() => Ke(false)));

Rs[34] = Rs[39] = () => We();

Rs[96] = () => qe();

Rs[33] = () => {
    if (61 !== Ne()) return 131117;
    if (61 !== Ne()) return 6553948;
    Ne();
    return 6553950;
};

Rs[61] = () => {
    if (62 === Ne()) {
        Ne();
        return 49;
    }
    if (61 !== ye) return 4194348;
    if (61 !== Ne()) return 6553947;
    Ne();
    return 6553949;
};

Rs[38] = () => {
    if (38 !== Ne()) return 6291478;
    Ne();
    return 6553882;
};

Rs[124] = () => {
    if (124 !== Ne()) return 6291479;
    Ne();
    return 6553817;
};

Rs[63] = () => {
    if (46 === Ne()) {
        const t = Ce(we + 1);
        if (t <= 48 || t >= 57) {
            Ne();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== ye) return 6291477;
    Ne();
    return 6553752;
};

Rs[46] = () => {
    if (Ne() <= 57 && ye >= 48) return Ke(true);
    if (46 === ye) {
        if (46 !== Ne()) return 10;
        Ne();
        return 11;
    }
    return 65545;
};

Rs[60] = () => {
    if (61 !== Ne()) return 6554015;
    Ne();
    return 6554017;
};

Rs[62] = () => {
    if (61 !== Ne()) return 6554016;
    Ne();
    return 6554018;
};

Rs[37] = ks(6554154);

Rs[40] = ks(2688007);

Rs[41] = ks(7340046);

Rs[42] = ks(6554153);

Rs[43] = ks(2490853);

Rs[44] = ks(6291471);

Rs[45] = ks(2490854);

Rs[47] = ks(6554155);

Rs[58] = ks(6291476);

Rs[91] = ks(2688016);

Rs[93] = ks(7340051);

Rs[123] = ks(524296);

Rs[125] = ks(7340045);

let Us = null;

const Ls = [];

let Ps = false;

function _s() {
    Ps = false;
}

function Ms() {
    Ps = true;
}

function js() {
    return Us;
}

function Is(t) {
    if (null == t) throw i(`AUR0206`);
    if (null == Us) {
        Us = t;
        Ls[0] = Us;
        Ps = true;
        return;
    }
    if (Us === t) throw i(`AUR0207`);
    Ls.push(t);
    Us = t;
    Ps = true;
}

function Bs(t) {
    if (null == t) throw i(`AUR0208`);
    if (Us !== t) throw i(`AUR0209`);
    Ls.pop();
    Us = Ls.length > 0 ? Ls[Ls.length - 1] : null;
    Ps = null != Us;
}

const Ts = Object.freeze({
    get current() {
        return Us;
    },
    get connecting() {
        return Ps;
    },
    enter: Is,
    exit: Bs,
    pause: _s,
    resume: Ms
});

const Ds = Reflect.get;

const Vs = Object.prototype.toString;

const Fs = new WeakMap;

function Ns(t) {
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

const zs = "__raw__";

function Ks(t) {
    return Ns(t) ? Ws(t) : t;
}

function Ws(t) {
    return Fs.get(t) ?? Hs(t);
}

function qs(t) {
    return t[zs] ?? t;
}

function Js(t) {
    return Ns(t) && t[zs] || t;
}

function Gs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Hs(t) {
    const e = c(t) ? Xs : t instanceof Map || t instanceof Set ? Ar : Qs;
    const s = new Proxy(t, e);
    Fs.set(t, s);
    return s;
}

const Qs = {
    get(t, e, s) {
        if (e === zs) return t;
        const r = js();
        if (!Ps || Gs(e) || null == r) return Ds(t, e, s);
        r.observe(t, e);
        return Ks(Ds(t, e, s));
    }
};

const Xs = {
    get(t, e, s) {
        if (e === zs) return t;
        if (!Ps || Gs(e) || null == Us) return Ds(t, e, s);
        switch (e) {
          case "length":
            Us.observe(t, "length");
            return t.length;

          case "map":
            return Ys;

          case "includes":
            return er;

          case "indexOf":
            return sr;

          case "lastIndexOf":
            return rr;

          case "every":
            return Zs;

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
            return xr;

          case "reduceRight":
            return gr;

          case "reverse":
            return br;

          case "shift":
            return lr;

          case "unshift":
            return fr;

          case "slice":
            return vr;

          case "splice":
            return pr;

          case "some":
            return wr;

          case "sort":
            return dr;

          case "keys":
            return $r;

          case "values":
          case Symbol.iterator:
            return Rr;

          case "entries":
            return Ur;
        }
        Us.observe(t, e);
        return Ks(Ds(t, e, s));
    },
    ownKeys(t) {
        js()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Ys(t, e) {
    const s = qs(this);
    const r = s.map(((s, r) => Js(t.call(e, Ks(s), r, this))));
    Lr(Us, s);
    return Ks(r);
}

function Zs(t, e) {
    const s = qs(this);
    const r = s.every(((s, r) => t.call(e, Ks(s), r, this)));
    Lr(Us, s);
    return r;
}

function tr(t, e) {
    const s = qs(this);
    const r = s.filter(((s, r) => Js(t.call(e, Ks(s), r, this))));
    Lr(Us, s);
    return Ks(r);
}

function er(t) {
    const e = qs(this);
    const s = e.includes(Js(t));
    Lr(Us, e);
    return s;
}

function sr(t) {
    const e = qs(this);
    const s = e.indexOf(Js(t));
    Lr(Us, e);
    return s;
}

function rr(t) {
    const e = qs(this);
    const s = e.lastIndexOf(Js(t));
    Lr(Us, e);
    return s;
}

function ir(t, e) {
    const s = qs(this);
    const r = s.findIndex(((s, r) => Js(t.call(e, Ks(s), r, this))));
    Lr(Us, s);
    return r;
}

function nr(t, e) {
    const s = qs(this);
    const r = s.find(((e, s) => t(Ks(e), s, this)), e);
    Lr(Us, s);
    return Ks(r);
}

function or() {
    const t = qs(this);
    Lr(Us, t);
    return Ks(t.flat());
}

function cr(t, e) {
    const s = qs(this);
    Lr(Us, s);
    return Ws(s.flatMap(((s, r) => Ks(t.call(e, Ks(s), r, this)))));
}

function ur(t) {
    const e = qs(this);
    Lr(Us, e);
    return e.join(t);
}

function hr() {
    return Ks(qs(this).pop());
}

function ar(...t) {
    return qs(this).push(...t);
}

function lr() {
    return Ks(qs(this).shift());
}

function fr(...t) {
    return qs(this).unshift(...t);
}

function pr(...t) {
    return Ks(qs(this).splice(...t));
}

function br(...t) {
    const e = qs(this);
    const s = e.reverse();
    Lr(Us, e);
    return Ks(s);
}

function wr(t, e) {
    const s = qs(this);
    const r = s.some(((s, r) => Js(t.call(e, Ks(s), r, this))));
    Lr(Us, s);
    return r;
}

function dr(t) {
    const e = qs(this);
    const s = e.sort(t);
    Lr(Us, e);
    return Ks(s);
}

function vr(t, e) {
    const s = qs(this);
    Lr(Us, s);
    return Ws(s.slice(t, e));
}

function xr(t, e) {
    const s = qs(this);
    const r = s.reduce(((e, s, r) => t(e, Ks(s), r, this)), e);
    Lr(Us, s);
    return Ks(r);
}

function gr(t, e) {
    const s = qs(this);
    const r = s.reduceRight(((e, s, r) => t(e, Ks(s), r, this)), e);
    Lr(Us, s);
    return Ks(r);
}

const Ar = {
    get(t, e, s) {
        if (e === zs) return t;
        const r = js();
        if (!Ps || Gs(e) || null == r) return Ds(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return kr;

          case "delete":
            return Sr;

          case "forEach":
            return yr;

          case "add":
            if (t instanceof Set) return Cr;
            break;

          case "get":
            if (t instanceof Map) return Er;
            break;

          case "set":
            if (t instanceof Map) return Or;
            break;

          case "has":
            return mr;

          case "keys":
            return $r;

          case "values":
            return Rr;

          case "entries":
            return Ur;

          case Symbol.iterator:
            return t instanceof Map ? Ur : Rr;
        }
        return Ks(Ds(t, e, s));
    }
};

function yr(t, e) {
    const s = qs(this);
    Lr(Us, s);
    return s.forEach(((s, r) => {
        t.call(e, Ks(s), Ks(r), this);
    }));
}

function mr(t) {
    const e = qs(this);
    Lr(Us, e);
    return e.has(Js(t));
}

function Er(t) {
    const e = qs(this);
    Lr(Us, e);
    return Ks(e.get(Js(t)));
}

function Or(t, e) {
    return Ks(qs(this).set(Js(t), Js(e)));
}

function Cr(t) {
    return Ks(qs(this).add(Js(t)));
}

function kr() {
    return Ks(qs(this).clear());
}

function Sr(t) {
    return Ks(qs(this).delete(Js(t)));
}

function $r() {
    const t = qs(this);
    Lr(Us, t);
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
                value: Ks(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Rr() {
    const t = qs(this);
    Lr(Us, t);
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
                value: Ks(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Ur() {
    const t = qs(this);
    Lr(Us, t);
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
                value: [ Ks(s[0]), Ks(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Lr = (t, e) => t?.observeCollection(e);

const Pr = Object.freeze({
    getProxy: Ws,
    getRaw: qs,
    wrap: Ks,
    unwrap: Js,
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
        if (n(this.$set)) {
            if (t !== this.v) {
                this.ir = true;
                this.$set.call(this.o, t);
                this.ir = false;
                this.run();
            }
        } else throw i(`AUR0221`);
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
            _r = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, _r);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            Is(this);
            return this.v = Js(this.$get.call(this.up ? Ks(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Bs(this);
        }
    }
}

ne(ComputedObserver);

F(ComputedObserver);

let _r;

const Mr = l("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const jr = {
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
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (jr.disabled) return;
            if (++this.O < jr.timeoutsPerCheck) return;
            this.O = 0;
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
        if (jr.throw) throw i(`AUR0222:${a(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Ir);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.A.cancel();
            this.A = null;
        }
    }
}

DirtyChecker.inject = [ t.IPlatform ];

class DirtyCheckProperty {
    constructor(t, e, s) {
        this.obj = e;
        this.key = s;
        this.type = 0;
        this.ov = void 0;
        this.C = t;
    }
    getValue() {
        return this.obj[this.key];
    }
    setValue(t) {
        throw i(`Trying to set value for property ${a(this.key)} in dirty checker`);
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
            this.C.addProperty(this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.C.removeProperty(this);
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
            Br = this.v;
            this.v = t;
            this.subs.notify(t, Br);
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
        this.hs = n(s);
        const i = t[e];
        this.cb = n(i) ? i : void 0;
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
            Br = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Br);
        }
    }
}

F(SetterObserver);

F(SetterNotifier);

let Br;

const Tr = new PropertyAccessor;

const Dr = l("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Vr = l("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Tr;
    }
    getAccessor() {
        return Tr;
    }
}

class ObserverLocator {
    constructor(t, e) {
        this.$ = [];
        this.C = t;
        this.R = e;
    }
    addAdapter(t) {
        this.$.push(t);
    }
    getObserver(t, e) {
        if (null == t) throw Wr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Kr(t);
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
        if (this.R.handles(t, e, this)) return this.R.getAccessor(t, e, this);
        return Tr;
    }
    getArrayObserver(t) {
        return dt(t);
    }
    getMapObserver(t) {
        return Ht(t);
    }
    getSetObserver(t) {
        return Mt(t);
    }
    createObserver(e, r) {
        if (this.R.handles(e, r, this)) return this.R.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (c(e)) return dt(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Ht(e).getLengthObserver(); else if (e instanceof Set) return Mt(e).getLengthObserver();
            break;

          default:
            if (c(e) && t.isArrayIndex(r)) return dt(e).getIndexObserver(Number(r));
            break;
        }
        let i = zr(e, r);
        if (void 0 === i) {
            let t = Nr(e);
            while (null !== t) {
                i = zr(t, r);
                if (void 0 === i) t = Nr(t); else break;
            }
        }
        if (void 0 !== i && !s.call(i, "value")) {
            let t = this.U(e, r, i);
            if (null == t) t = (i.get?.getObserver ?? i.set?.getObserver)?.(e, this);
            return null == t ? i.configurable ? ComputedObserver.create(e, r, i, this, true) : this.C.createProperty(e, r) : t;
        }
        return new SetterObserver(e, r);
    }
    U(t, e, s) {
        if (this.$.length > 0) for (const r of this.$) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
}

ObserverLocator.inject = [ Mr, Vr ];

const Fr = t => {
    let e;
    if (c(t)) e = dt(t); else if (t instanceof Map) e = Ht(t); else if (t instanceof Set) e = Mt(t);
    return e;
};

const Nr = Object.getPrototypeOf;

const zr = Object.getOwnPropertyDescriptor;

const Kr = t => {
    let e = t.$observers;
    if (void 0 === e) r(t, "$observers", {
        enumerable: false,
        value: e = f()
    });
    return e;
};

const Wr = t => i(`AUR0199:${a(t)}`);

const qr = l("IObservation", (t => t.singleton(Observation)));

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
        if (this.stopped) throw i(`AUR0225`);
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
            Bs(this);
        }
        if (this.queued) {
            if (this.runCount > this.maxRunCount) {
                this.runCount = 0;
                throw i(`AUR0226`);
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

function Jr(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Gr = {};

function Hr(t, e, s) {
    if (null == e) return (e, s, r) => n(e, s, r, t);
    return n(t, e, s);
    function n(t, e, s, n) {
        const o = void 0 === e;
        n = "object" !== typeof n ? {
            name: n
        } : n || {};
        if (o) e = n.name;
        if (null == e || "" === e) throw i(`AUR0224`);
        const c = n.callback || `${a(e)}Changed`;
        let u = Gr;
        if (s) {
            delete s.value;
            delete s.writable;
            u = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const h = n.set;
        s.get = function t() {
            const s = Qr(this, e, c, u, h);
            js()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Qr(this, e, c, u, h).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Qr(s, e, c, u, h);
        };
        if (o) r(t.prototype, e, s); else return s;
    }
}

function Qr(t, e, s, r, i) {
    const n = Jr(t);
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

exports.ConnectableSwitcher = Ts;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = jr;

exports.ForOfStatement = ForOfStatement;

exports.ICoercionConfiguration = L;

exports.IDirtyChecker = Mr;

exports.IExpressionParser = oe;

exports.INodeObserverLocator = Vr;

exports.IObservation = qr;

exports.IObserverLocator = Dr;

exports.ISignaler = x;

exports.Interpolation = Interpolation;

exports.MapObserver = MapObserver;

exports.ObjectBindingPattern = ObjectBindingPattern;

exports.ObjectLiteralExpression = ObjectLiteralExpression;

exports.Observation = Observation;

exports.ObserverLocator = ObserverLocator;

exports.PrimitiveLiteralExpression = PrimitiveLiteralExpression;

exports.PrimitiveObserver = PrimitiveObserver;

exports.PropertyAccessor = PropertyAccessor;

exports.ProxyObservable = Pr;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.Unparser = Unparser;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = xt;

exports.astAssign = y;

exports.astBind = m;

exports.astEvaluate = A;

exports.astUnbind = E;

exports.astVisit = w;

exports.batch = T;

exports.cloneIndexMap = M;

exports.connectable = ne;

exports.copyIndexMap = P;

exports.createIndexMap = _;

exports.disableArrayObservation = wt;

exports.disableMapObservation = Gt;

exports.disableSetObservation = _t;

exports.enableArrayObservation = bt;

exports.enableMapObservation = Jt;

exports.enableSetObservation = Pt;

exports.getCollectionObserver = Fr;

exports.getObserverLookup = Kr;

exports.isIndexMap = j;

exports.observable = Hr;

exports.parseExpression = Se;

exports.subscriberCollection = F;

exports.synchronizeIndices = gt;
//# sourceMappingURL=index.cjs.map
