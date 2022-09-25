"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/kernel");

var e = require("@aurelia/metadata");

const s = Object.prototype.hasOwnProperty;

const r = Reflect.defineProperty;

const n = t => "function" === typeof t;

const i = t => "string" === typeof t;

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

const h = String;

const a = t.DI.createInterface;

const l = () => Object.create(null);

const f = e.Metadata.getOwn;

e.Metadata.hasOwn;

const p = e.Metadata.define;

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
        throw new Error(`Unknown ast node ${JSON.stringify(t)}`);
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
        let n = "(";
        let i;
        for (;r < s; ++r) {
            i = e[r].name;
            if (r > 0) n += ", ";
            if (r < s - 1) n += i; else n += t.rest ? `...${i}` : i;
        }
        this.text += `${n}) => `;
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
        if (i(t.value)) {
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
        const n = r.length;
        let i;
        let o;
        for (i = 0; i < n; i++) {
            o = r[i];
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
        this.text += h(t.value);
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
    constructor(t, e, s, r = false, n = false) {
        this.object = t;
        this.name = e;
        this.args = s;
        this.optionalMember = r;
        this.optionalCall = n;
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
    constructor(e, s, r, n = t.emptyArray) {
        this.cooked = e;
        this.func = r;
        this.expressions = n;
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
        if (null == t) throw b();
        let r = t.overrideContext;
        let n = t;
        if (s > 0) {
            while (s > 0) {
                s--;
                n = n.parent;
                if (null == n) return;
            }
            r = n.overrideContext;
            return e in r ? r : n.bindingContext;
        }
        while (null != n && !n.isBoundary && !(e in n.overrideContext) && !(e in n.bindingContext)) n = n.parent;
        if (null == n) return t.bindingContext;
        r = n.overrideContext;
        return e in r ? r : n.bindingContext;
    }
    static create(t, e, s) {
        if (null == t) throw d();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw b();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const b = () => new Error(`AUR0203`);

const d = () => new Error("AUR0204");

class OverrideContext {}

const v = a("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = l();
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

const x = Scope.getContext;

function g(t, e, s, r) {
    switch (t.$kind) {
      case 0:
        {
            let s = e.overrideContext;
            let r = e;
            let n = t.ancestor;
            while (n-- && s) {
                r = r.parent;
                s = r?.overrideContext ?? null;
            }
            return n < 1 && r ? r.bindingContext : void 0;
        }

      case 1:
        {
            const i = x(e, t.name, t.ancestor);
            if (null !== r) r.observe(i, t.name);
            const o = i[t.name];
            if (null == o && "$host" === t.name) throw new Error(`AUR0105`);
            if (s?.strict) return s?.boundFn && n(o) ? o.bind(i) : o;
            return null == o ? "" : s?.boundFn && n(o) ? o.bind(i) : o;
        }

      case 2:
        return t.elements.map((t => g(t, e, s, r)));

      case 3:
        {
            const n = {};
            for (let i = 0; i < t.keys.length; ++i) n[t.keys[i]] = g(t.values[i], e, s, r);
            return n;
        }

      case 4:
        return t.value;

      case 5:
        {
            let n = t.cooked[0];
            for (let i = 0; i < t.expressions.length; ++i) {
                n += String(g(t.expressions[i], e, s, r));
                n += t.cooked[i + 1];
            }
            return n;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void g(t.expression, e, s, r);

          case "typeof":
            return typeof g(t.expression, e, s, r);

          case "!":
            return !g(t.expression, e, s, r);

          case "-":
            return -g(t.expression, e, s, r);

          case "+":
            return +g(t.expression, e, s, r);

          default:
            throw new Error(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const n = t.args.map((t => g(t, e, s, r)));
            const i = x(e, t.name, t.ancestor);
            const o = k(s?.strictFnCall, i, t.name);
            if (o) return o.apply(i, n);
            return;
        }

      case 8:
        {
            const n = g(t.object, e, s, r);
            const i = t.args.map((t => g(t, e, s, r)));
            const c = k(s?.strictFnCall, n, t.name);
            let u;
            if (c) {
                u = c.apply(n, i);
                if (o(n) && R.includes(t.name)) r?.observeCollection(n);
            }
            return u;
        }

      case 9:
        {
            const i = g(t.func, e, s, r);
            if (n(i)) return i(...t.args.map((t => g(t, e, s, r))));
            if (!s?.strictFnCall && null == i) return;
            throw new Error(`AUR0107`);
        }

      case 16:
        {
            const n = (...n) => {
                const i = t.args;
                const o = t.rest;
                const c = i.length - 1;
                const u = i.reduce(((t, e, s) => {
                    if (o && s === c) t[e.name] = n.slice(s); else t[e.name] = n[s];
                    return t;
                }), {});
                const h = Scope.fromParent(e, u);
                return g(t.body, h, s, r);
            };
            return n;
        }

      case 10:
        {
            const i = g(t.object, e, s, r);
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
            const n = g(t.object, e, s, r);
            if (n instanceof Object) {
                const i = g(t.key, e, s, r);
                if (null !== r) r.observe(n, i);
                return n[i];
            }
            return;
        }

      case 12:
        {
            const i = t.expressions.map((t => g(t, e, s, r)));
            const o = g(t.func, e, s, r);
            if (!n(o)) throw new Error(`AUR0110`);
            return o(t.cooked, ...i);
        }

      case 13:
        {
            const i = t.left;
            const o = t.right;
            switch (t.operation) {
              case "&&":
                return g(i, e, s, r) && g(o, e, s, r);

              case "||":
                return g(i, e, s, r) || g(o, e, s, r);

              case "??":
                return g(i, e, s, r) ?? g(o, e, s, r);

              case "==":
                return g(i, e, s, r) == g(o, e, s, r);

              case "===":
                return g(i, e, s, r) === g(o, e, s, r);

              case "!=":
                return g(i, e, s, r) != g(o, e, s, r);

              case "!==":
                return g(i, e, s, r) !== g(o, e, s, r);

              case "instanceof":
                {
                    const t = g(o, e, s, r);
                    if (n(t)) return g(i, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = g(o, e, s, r);
                    if (t instanceof Object) return g(i, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = g(i, e, s, r);
                    const n = g(o, e, s, r);
                    if (s?.strict) return t + n;
                    if (!t || !n) {
                        if (S(t) || S(n)) return (t || 0) + (n || 0);
                        if ($(t) || $(n)) return (t || "") + (n || "");
                    }
                    return t + n;
                }

              case "-":
                return g(i, e, s, r) - g(o, e, s, r);

              case "*":
                return g(i, e, s, r) * g(o, e, s, r);

              case "/":
                return g(i, e, s, r) / g(o, e, s, r);

              case "%":
                return g(i, e, s, r) % g(o, e, s, r);

              case "<":
                return g(i, e, s, r) < g(o, e, s, r);

              case ">":
                return g(i, e, s, r) > g(o, e, s, r);

              case "<=":
                return g(i, e, s, r) <= g(o, e, s, r);

              case ">=":
                return g(i, e, s, r) >= g(o, e, s, r);

              default:
                throw new Error(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return g(t.condition, e, s, r) ? g(t.yes, e, s, r) : g(t.no, e, s, r);

      case 15:
        return E(t.target, e, s, g(t.value, e, s, r));

      case 17:
        {
            const n = s?.getConverter?.(t.name);
            if (null == n) throw new Error(`AUR0103:${t.name}`);
            if ("toView" in n) return n.toView(g(t.expression, e, s, r), ...t.args.map((t => g(t, e, s, r))));
            return g(t.expression, e, s, r);
        }

      case 18:
        return g(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return g(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let n = t.parts[0];
            let i = 0;
            for (;i < t.expressions.length; ++i) {
                n += h(g(t.expressions[i], e, s, r));
                n += t.parts[i + 1];
            }
            return n;
        } else return `${t.parts[0]}${g(t.firstExpression, e, s, r)}${t.parts[1]}`;

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

function E(e, s, r, n) {
    switch (e.$kind) {
      case 1:
        {
            if ("$host" === e.name) throw new Error(`AUR0106`);
            const t = x(s, e.name, e.ancestor);
            if (t instanceof Object) if (void 0 !== t.$observers?.[e.name]) {
                t.$observers[e.name].setValue(n);
                return n;
            } else return t[e.name] = n;
            return;
        }

      case 10:
        {
            const t = g(e.object, s, r, null);
            if (t instanceof Object) if (void 0 !== t.$observers && void 0 !== t.$observers[e.name]) t.$observers[e.name].setValue(n); else t[e.name] = n; else E(e.object, s, r, {
                [e.name]: n
            });
            return n;
        }

      case 11:
        {
            const t = g(e.object, s, r, null);
            const i = g(e.key, s, r, null);
            return t[i] = n;
        }

      case 15:
        E(e.value, s, r, n);
        return E(e.target, s, r, n);

      case 17:
        {
            const t = r?.getConverter?.(e.name);
            if (null == t) throw C(e.name);
            if ("fromView" in t) n = t.fromView(n, ...e.args.map((t => g(t, s, r, null))));
            return E(e.expression, s, r, n);
        }

      case 18:
        return E(e.expression, s, r, n);

      case 24:
      case 25:
        {
            const t = e.list;
            const i = t.length;
            let o;
            let c;
            for (o = 0; o < i; o++) {
                c = t[o];
                switch (c.$kind) {
                  case 26:
                    E(c, s, r, n);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof n || null === n) throw new Error(`AUR0112`);
                        let t = g(c.source, Scope.create(n), r, null);
                        if (void 0 === t && c.initializer) t = g(c.initializer, s, r, null);
                        E(c, s, r, t);
                        break;
                    }
                }
            }
            break;
        }

      case 26:
        if (e instanceof DestructuringAssignmentSingleExpression) {
            if (null == n) return;
            if ("object" !== typeof n) throw new Error(`AUR0112`);
            let t = g(e.source, Scope.create(n), r, null);
            if (void 0 === t && e.initializer) t = g(e.initializer, s, r, null);
            E(e.target, s, r, t);
        } else {
            if (null == n) return;
            if ("object" !== typeof n) throw new Error(`AUR0112`);
            const i = e.indexOrProperties;
            let o;
            if (t.isArrayIndex(i)) {
                if (!Array.isArray(n)) throw new Error(`AUR0112`);
                o = n.slice(i);
            } else o = Object.entries(n).reduce(((t, [e, s]) => {
                if (!i.includes(e)) t[e] = s;
                return t;
            }), {});
            E(e.target, s, r, o);
        }
        break;

      case 28:
        return e.assign(s, r, n);

      default:
        return;
    }
}

function A(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const n = t.key;
            const i = s.getBehavior?.(r);
            if (null == i) throw m(r);
            if (void 0 === s[n]) {
                s[n] = i;
                i.bind?.(e, s, ...t.args.map((t => g(t, e, s, null))));
            } else throw O(r);
            A(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const n = s.getConverter?.(r);
            if (null == n) throw C(r);
            const i = n.signals;
            if (null != i) {
                const t = s.get?.(v);
                const e = i.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(i[r], s);
            }
            A(t.expression, e, s);
            return;
        }

      case 22:
        A(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function y(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const n = s;
            if (void 0 !== n[r]) {
                n[r].unbind?.(e, s);
                n[r] = void 0;
            }
            y(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const n = s.get(v);
            let i = 0;
            for (;i < r.signals.length; ++i) n.removeSignalListener(r.signals[i], s);
            y(t.expression, e, s);
            break;
        }

      case 22:
        y(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const m = t => new Error(`AUR0101:${t}`);

const O = t => new Error(`AUR0102:${t}`);

const C = t => new Error(`AUR0103:${t}`);

const k = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (n(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
};

const S = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const $ = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const R = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

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

function L(t, e, s) {
    const {length: r} = t;
    const n = Array(r);
    let i = 0;
    while (i < r) {
        n[i] = t[i];
        ++i;
    }
    if (void 0 !== e) n.deletedIndices = e.slice(0); else if (void 0 !== t.deletedIndices) n.deletedIndices = t.deletedIndices.slice(0); else n.deletedIndices = [];
    if (void 0 !== s) n.deletedItems = s.slice(0); else if (void 0 !== t.deletedItems) n.deletedItems = t.deletedItems.slice(0); else n.deletedItems = [];
    n.isIndexMap = true;
    return n;
}

function P(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function _(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function M(t) {
    return o(t) && true === t.isIndexMap;
}

let j = new Map;

let I = false;

function B(t) {
    const e = j;
    const s = j = new Map;
    I = true;
    try {
        t();
    } finally {
        j = null;
        I = false;
        try {
            let t;
            let r;
            let n;
            let i;
            let o;
            let c = false;
            let u;
            let h;
            for (t of s) {
                r = t[0];
                n = t[1];
                if (e?.has(r)) e.set(r, n);
                if (1 === n[0]) r.notify(n[1], n[2]); else {
                    i = n[1];
                    o = n[2];
                    c = false;
                    if (o.deletedIndices.length > 0) c = true; else for (u = 0, h = o.length; u < h; ++u) if (o[u] !== u) {
                        c = true;
                        break;
                    }
                    if (c) r.notifyCollection(i, o);
                }
            }
        } finally {
            j = e;
        }
    }
}

function T(t, e, s) {
    if (!j.has(t)) j.set(t, [ 2, e, s ]);
}

function D(t, e, s) {
    const r = j.get(t);
    if (void 0 === r) j.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function V(t) {
    return null == t ? F : F(t);
}

function F(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: N
    });
    u(e, "subscribe", z);
    u(e, "unsubscribe", K);
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
        if (I) {
            D(this, t, e);
            return;
        }
        const s = this.t.slice(0);
        const r = s.length;
        let n = 0;
        for (;n < r; ++n) s[n].handleChange(t, e);
        return;
    }
    notifyCollection(t, e) {
        const s = this.t.slice(0);
        const r = s.length;
        let n = 0;
        for (;n < r; ++n) s[n].handleCollectionChange(t, e);
        return;
    }
}

function N() {
    return c(this, "subs", new SubscriberRecord);
}

function z(t) {
    return this.subs.add(t);
}

function K(t) {
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
    setValue(e) {
        const s = this.v;
        if (e !== s && t.isArrayIndex(e)) {
            this.o.length = e;
            this.v = e;
            this.subs.notify(e, s);
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

function W(t) {
    const e = t.prototype;
    u(e, "subscribe", q);
    u(e, "unsubscribe", J);
    V(t);
}

function q(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function J(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

W(CollectionLengthObserver);

W(CollectionSizeObserver);

const G = "__au_array_obs__";

const H = (() => {
    let t = f(G, Array);
    if (null == t) p(G, t = new WeakMap, Array);
    return t;
})();

function Q(t, e) {
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

function Y(t, e, s, r, n) {
    let i, o, c, u, h;
    let a, l;
    for (a = s + 1; a < r; a++) {
        i = t[a];
        o = e[a];
        for (l = a - 1; l >= s; l--) {
            c = t[l];
            u = e[l];
            h = n(c, i);
            if (h > 0) {
                t[l + 1] = c;
                e[l + 1] = u;
            } else break;
        }
        t[l + 1] = i;
        e[l + 1] = o;
    }
}

function Z(t, e, s, r, n) {
    let i = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let p, w, b;
    let d, v;
    let x, g, E, A;
    let y, m, O, C;
    while (true) {
        if (r - s <= 10) {
            Y(t, e, s, r, n);
            return;
        }
        i = s + (r - s >> 1);
        c = t[s];
        a = e[s];
        u = t[r - 1];
        l = e[r - 1];
        h = t[i];
        f = e[i];
        p = n(c, u);
        if (p > 0) {
            d = c;
            v = a;
            c = u;
            a = l;
            u = d;
            l = v;
        }
        w = n(c, h);
        if (w >= 0) {
            d = c;
            v = a;
            c = h;
            a = f;
            h = u;
            f = l;
            u = d;
            l = v;
        } else {
            b = n(u, h);
            if (b > 0) {
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
        E = s + 1;
        A = r - 1;
        t[i] = t[E];
        e[i] = e[E];
        t[E] = x;
        e[E] = g;
        t: for (o = E + 1; o < A; o++) {
            y = t[o];
            m = e[o];
            O = n(y, x);
            if (O < 0) {
                t[o] = t[E];
                e[o] = e[E];
                t[E] = y;
                e[E] = m;
                E++;
            } else if (O > 0) {
                do {
                    A--;
                    if (A == o) break t;
                    C = t[A];
                    O = n(C, x);
                } while (O > 0);
                t[o] = t[A];
                e[o] = e[A];
                t[A] = y;
                e[A] = m;
                if (O < 0) {
                    y = t[o];
                    m = e[o];
                    t[o] = t[E];
                    e[o] = e[E];
                    t[E] = y;
                    e[E] = m;
                    E++;
                }
            }
        }
        if (r - A < E - s) {
            Z(t, e, A, r, n);
            r = E;
        } else {
            Z(t, e, s, E, n);
            s = A;
        }
    }
}

const tt = Array.prototype;

const et = tt.push;

const st = tt.unshift;

const rt = tt.pop;

const nt = tt.shift;

const it = tt.splice;

const ot = tt.reverse;

const ct = tt.sort;

const ut = {
    push: et,
    unshift: st,
    pop: rt,
    shift: nt,
    splice: it,
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
        let n = s;
        while (n < this.length) {
            this[n] = t[n - s];
            e.indexMap[n] = -2;
            n++;
        }
        e.notify();
        return this.length;
    },
    unshift: function(...t) {
        const e = H.get(this);
        if (void 0 === e) return st.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let n = 0;
        while (n < s) r[n++] = -2;
        st.apply(e.indexMap, r);
        const i = st.apply(this, t);
        e.notify();
        return i;
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
        const r = H.get(this);
        if (void 0 === r) return it.apply(this, t);
        const n = this.length;
        const i = 0 | e;
        const o = i < 0 ? Math.max(n + i, 0) : Math.min(i, n);
        const c = r.indexMap;
        const u = t.length;
        const h = 0 === u ? 0 : 1 === u ? n - o : s;
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
            let n = 0;
            while (n < t) r[n++] = -2;
            it.call(c, e, s, ...r);
        } else it.apply(c, t);
        const a = it.apply(this, t);
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
            const n = this[r];
            const i = t.indexMap[r];
            const o = this[s];
            const c = t.indexMap[s];
            this[r] = o;
            t.indexMap[r] = c;
            this[s] = n;
            t.indexMap[s] = i;
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
        Z(this, e.indexMap, 0, s, X);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !n(t)) t = Q;
        Z(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of ht) r(at[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let lt = false;

const ft = "__au_arr_on__";

function pt() {
    if (!(f(ft, Array) ?? false)) {
        p(ft, true, Array);
        for (const t of ht) if (true !== tt[t].observing) c(tt, t, at[t]);
    }
}

function wt() {
    for (const t of ht) if (true === tt[t].observing) c(tt, t, ut[t]);
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
        this.indexMap = P(t.length);
        this.lenObs = void 0;
        H.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
            T(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = P(r);
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
        const n = this.value;
        const i = this.value = this.getValue();
        if (n !== i) this.subs.notify(i, n);
    }
    subscribe(t) {
        if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.owner.unsubscribe(this);
    }
}

V(ArrayObserver);

V(ArrayIndexObserver);

function bt(t) {
    let e = H.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const dt = (t, e) => t - e;

function vt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const n = _(t);
    if (n.deletedIndices.length > 1) n.deletedIndices.sort(dt);
    const i = n.length;
    for (;r < i; ++r) {
        while (n.deletedIndices[s] <= r - e) {
            ++s;
            --e;
        }
        if (-2 === n[r]) ++e; else n[r] += e;
    }
    return n;
}

function xt(t, e) {
    const s = t.slice();
    const r = e.length;
    let n = 0;
    let i = 0;
    while (n < r) {
        i = e[n];
        if (-2 !== i) t[n] = s[i];
        ++n;
    }
}

const gt = "__au_set_obs__";

const Et = (() => {
    let t = f(gt, Set);
    if (null == t) p(gt, t = new WeakMap, Set);
    return t;
})();

const At = Set.prototype;

const yt = At.add;

const mt = At.clear;

const Ot = At.delete;

const Ct = {
    add: yt,
    clear: mt,
    delete: Ot
};

const kt = [ "add", "clear", "delete" ];

const St = {
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
        const e = Et.get(this);
        if (void 0 === e) return Ot.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const n = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (n[r] > -1) {
                    n.deletedIndices.push(n[r]);
                    n.deletedItems.push(s);
                }
                n.splice(r, 1);
                const i = Ot.call(this, t);
                if (true === i) e.notify();
                return i;
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

for (const t of kt) r(St[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Rt = false;

const Ut = "__au_set_on__";

function Lt() {
    if (!(f(Ut, Set) ?? false)) {
        p(Ut, true, Set);
        for (const t of kt) if (true !== At[t].observing) r(At, t, {
            ...$t,
            value: St[t]
        });
    }
}

function Pt() {
    for (const t of kt) if (true === At[t].observing) r(At, t, {
        ...$t,
        value: Ct[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Rt) {
            Rt = true;
            Lt();
        }
        this.collection = t;
        this.indexMap = P(t.size);
        this.lenObs = void 0;
        Et.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
            T(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = P(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

V(SetObserver);

function _t(t) {
    let e = Et.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Mt = "__au_map_obs__";

const jt = (() => {
    let t = f(Mt, Map);
    if (null == t) p(Mt, t = new WeakMap, Map);
    return t;
})();

const It = Map.prototype;

const Bt = It.set;

const Tt = It.clear;

const Dt = It.delete;

const Vt = {
    set: Bt,
    clear: Tt,
    delete: Dt
};

const Ft = [ "set", "clear", "delete" ];

const Nt = {
    set: function(t, e) {
        const s = jt.get(this);
        if (void 0 === s) {
            Bt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const n = this.size;
        Bt.call(this, t, e);
        const i = this.size;
        if (i === n) {
            let e = 0;
            for (const n of this.entries()) {
                if (n[0] === t) {
                    if (n[1] !== r) {
                        s.indexMap.deletedIndices.push(s.indexMap[e]);
                        s.indexMap.deletedItems.push(n);
                        s.indexMap[e] = -2;
                        s.notify();
                    }
                    return this;
                }
                e++;
            }
            return this;
        }
        s.indexMap[n] = -2;
        s.notify();
        return this;
    },
    clear: function() {
        const t = jt.get(this);
        if (void 0 === t) return Tt.call(this);
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
            Tt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = jt.get(this);
        if (void 0 === e) return Dt.call(this, t);
        const s = this.size;
        if (0 === s) return false;
        let r = 0;
        const n = e.indexMap;
        for (const s of this.keys()) {
            if (s === t) {
                if (n[r] > -1) {
                    n.deletedIndices.push(n[r]);
                    n.deletedItems.push(s);
                }
                n.splice(r, 1);
                const i = Dt.call(this, t);
                if (true === i) e.notify();
                return i;
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

for (const t of Ft) r(Nt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Kt = false;

const Wt = "__au_map_on__";

function qt() {
    if (!(f(Wt, Map) ?? false)) {
        p(Wt, true, Map);
        for (const t of Ft) if (true !== It[t].observing) r(It, t, {
            ...zt,
            value: Nt[t]
        });
    }
}

function Jt() {
    for (const t of Ft) if (true === It[t].observing) r(It, t, {
        ...zt,
        value: Vt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Kt) {
            Kt = true;
            qt();
        }
        this.collection = t;
        this.indexMap = P(t.size);
        this.lenObs = void 0;
        jt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (I) {
            T(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = P(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

V(MapObserver);

function Gt(t) {
    let e = jt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Ht(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Qt() {
    return c(this, "obs", new BindingObserverRecord(this));
}

function Xt(t) {
    let e;
    if (o(t)) e = bt(t); else if (t instanceof Set) e = _t(t); else if (t instanceof Map) e = Gt(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function Yt(t) {
    this.obs.add(t);
}

function Zt() {
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
    u(e, "observe", Ht);
    u(e, "observeCollection", Xt);
    u(e, "subscribeTo", Yt);
    r(e, "obs", {
        get: Qt
    });
    u(e, "handleChange", Zt);
    u(e, "handleCollectionChange", te);
    return t;
}

function ne(t) {
    return null == t ? re : re(t);
}

const ie = a("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = l();
        this.u = l();
        this.h = l();
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
                throw Ze();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        pe = t;
        we = 0;
        be = t.length;
        de = 0;
        ve = 0;
        xe = 6291456;
        ge = "";
        Ee = t.charCodeAt(0);
        Ae = true;
        ye = false;
        return Ce(61, void 0 === e ? 8 : e);
    }
}

function oe(t) {
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

const ce = PrimitiveLiteralExpression.$false;

const ue = PrimitiveLiteralExpression.$true;

const he = PrimitiveLiteralExpression.$null;

const ae = PrimitiveLiteralExpression.$undefined;

const le = AccessThisExpression.$this;

const fe = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let pe = "";

let we = 0;

let be = 0;

let de = 0;

let ve = 0;

let xe = 6291456;

let ge = "";

let Ee;

let Ae = true;

let ye = false;

function me() {
    return pe.slice(ve, we);
}

function Oe(t, e) {
    pe = t;
    we = 0;
    be = t.length;
    de = 0;
    ve = 0;
    xe = 6291456;
    ge = "";
    Ee = t.charCodeAt(0);
    Ae = true;
    ye = false;
    return Ce(61, void 0 === e ? 8 : e);
}

function Ce(t, e) {
    if (16 === e) return new CustomExpression(pe);
    if (0 === we) {
        if (1 & e) return je();
        Te();
        if (4194304 & xe) throw Je();
    }
    Ae = 513 > t;
    ye = false;
    let s = false;
    let r;
    let n = 0;
    if (131072 & xe) {
        const t = gs[63 & xe];
        Te();
        r = new UnaryExpression(t, Ce(514, e));
        Ae = false;
    } else {
        t: switch (xe) {
          case 12294:
            n = de;
            Ae = false;
            do {
                Te();
                ++n;
                switch (xe) {
                  case 65545:
                    Te();
                    if (0 === (12288 & xe)) throw He();
                    break;

                  case 10:
                  case 11:
                    throw He();

                  case 2162700:
                    ye = true;
                    Te();
                    if (0 === (12288 & xe)) {
                        r = 0 === n ? le : 1 === n ? fe : new AccessThisExpression(n);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & xe) {
                        r = 0 === n ? le : 1 === n ? fe : new AccessThisExpression(n);
                        break t;
                    }
                    throw Qe();
                }
            } while (12294 === xe);

          case 4096:
            {
                const t = ge;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, n);
                Ae = !ye;
                Te();
                if (We(49)) {
                    if (524296 === xe) throw vs();
                    const e = ye;
                    const s = de;
                    ++de;
                    const n = Ce(62, 0);
                    ye = e;
                    de = s;
                    Ae = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], n);
                }
                break;
            }

          case 10:
            throw xs();

          case 11:
            throw Ge();

          case 12292:
            Ae = false;
            Te();
            switch (de) {
              case 0:
                r = le;
                break;

              case 1:
                r = fe;
                break;

              default:
                r = new AccessThisExpression(de);
                break;
            }
            break;

          case 2688007:
            r = Le(e);
            break;

          case 2688016:
            r = pe.search(/\s+of\s+/) > we ? ke() : Pe(e);
            break;

          case 524296:
            r = Me(e);
            break;

          case 2163758:
            r = new TemplateExpression([ ge ]);
            Ae = false;
            Te();
            break;

          case 2163759:
            r = Ie(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(ge);
            Ae = false;
            Te();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = gs[63 & xe];
            Ae = false;
            Te();
            break;

          default:
            if (we >= be) throw Xe(); else throw Ye();
        }
        if (2 & e) return _e(r);
        if (514 < t) return r;
        if (10 === xe || 11 === xe) throw He();
        if (0 === r.$kind) switch (xe) {
          case 2162700:
            ye = true;
            Ae = false;
            Te();
            if (0 === (13312 & xe)) throw ls();
            if (12288 & xe) {
                r = new AccessScopeExpression(ge, r.ancestor);
                Te();
            } else if (2688007 === xe) r = new CallFunctionExpression(r, Se(), true); else if (2688016 === xe) r = $e(r, true); else throw fs();
            break;

          case 65545:
            Ae = !ye;
            Te();
            if (0 === (12288 & xe)) throw He();
            r = new AccessScopeExpression(ge, r.ancestor);
            Te();
            break;

          case 10:
          case 11:
            throw He();

          case 2688007:
            r = new CallFunctionExpression(r, Se(), s);
            break;

          case 2688016:
            r = $e(r, s);
            break;

          case 2163758:
            r = Be(r);
            break;

          case 2163759:
            r = Ie(e, r, true);
            break;
        }
        while ((65536 & xe) > 0) switch (xe) {
          case 2162700:
            r = Re(r);
            break;

          case 65545:
            Te();
            if (0 === (12288 & xe)) throw He();
            r = Ue(r, false);
            break;

          case 10:
          case 11:
            throw He();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Se(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Se(), r.optional, false); else r = new CallFunctionExpression(r, Se(), false);
            break;

          case 2688016:
            r = $e(r, false);
            break;

          case 2163758:
            if (ye) throw fs();
            r = Be(r);
            break;

          case 2163759:
            if (ye) throw fs();
            r = Ie(e, r, true);
            break;
        }
    }
    if (10 === xe || 11 === xe) throw He();
    if (513 < t) return r;
    while ((262144 & xe) > 0) {
        const s = xe;
        if ((960 & s) <= t) break;
        Te();
        r = new BinaryExpression(gs[63 & s], r, Ce(960 & s, e));
        Ae = false;
    }
    if (63 < t) return r;
    if (We(6291477)) {
        const t = Ce(62, e);
        qe(6291476);
        r = new ConditionalExpression(r, t, Ce(62, e));
        Ae = false;
    }
    if (62 < t) return r;
    if (We(4194348)) {
        if (!Ae) throw ts();
        r = new AssignExpression(r, Ce(62, e));
    }
    if (61 < t) return r;
    while (We(6291479)) {
        if (6291456 === xe) throw es();
        const t = ge;
        Te();
        const s = new Array;
        while (We(6291476)) s.push(Ce(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (We(6291478)) {
        if (6291456 === xe) throw ss();
        const t = ge;
        Te();
        const s = new Array;
        while (We(6291476)) s.push(Ce(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== xe) {
        if ((1 & e) > 0 && 7340045 === xe) return r;
        if ("of" === me()) throw rs();
        throw Ye();
    }
    return r;
}

function ke() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let n = 0;
    while (r) {
        Te();
        switch (xe) {
          case 7340051:
            r = false;
            i();
            break;

          case 6291471:
            i();
            break;

          case 4096:
            s = me();
            break;

          default:
            throw as();
        }
    }
    qe(7340051);
    return e;
    function i() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(le, s), new AccessKeyedExpression(le, new PrimitiveLiteralExpression(n++)), void 0));
            s = "";
        } else n++;
    }
}

function Se() {
    const t = ye;
    Te();
    const e = [];
    while (7340046 !== xe) {
        e.push(Ce(62, 0));
        if (!We(6291471)) break;
    }
    qe(7340046);
    Ae = false;
    ye = t;
    return e;
}

function $e(t, e) {
    const s = ye;
    Te();
    t = new AccessKeyedExpression(t, Ce(62, 0), e);
    qe(7340051);
    Ae = !s;
    ye = s;
    return t;
}

function Re(t) {
    ye = true;
    Ae = false;
    Te();
    if (0 === (13312 & xe)) throw ls();
    if (12288 & xe) return Ue(t, true);
    if (2688007 === xe) if (1 === t.$kind) return new CallScopeExpression(t.name, Se(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Se(), t.optional, true); else return new CallFunctionExpression(t, Se(), true);
    if (2688016 === xe) return $e(t, true);
    throw fs();
}

function Ue(t, e) {
    const s = ge;
    switch (xe) {
      case 2162700:
        {
            ye = true;
            Ae = false;
            const r = we;
            const n = ve;
            const i = xe;
            const o = Ee;
            const c = ge;
            const u = Ae;
            const h = ye;
            Te();
            if (0 === (13312 & xe)) throw ls();
            if (2688007 === xe) return new CallMemberExpression(t, s, Se(), e, true);
            we = r;
            ve = n;
            xe = i;
            Ee = o;
            ge = c;
            Ae = u;
            ye = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Ae = false;
        return new CallMemberExpression(t, s, Se(), e, false);

      default:
        Ae = !ye;
        Te();
        return new AccessMemberExpression(t, s, e);
    }
}

function Le(t) {
    Te();
    const e = we;
    const s = ve;
    const r = xe;
    const n = Ee;
    const i = ge;
    const o = Ae;
    const c = ye;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === xe) {
            Te();
            if (4096 !== xe) throw He();
            u.push(new BindingIdentifier(ge));
            Te();
            if (6291471 === xe) throw ds();
            if (7340046 !== xe) throw Ge();
            Te();
            if (49 !== xe) throw Ge();
            Te();
            const t = ye;
            const e = de;
            ++de;
            const s = Ce(62, 0);
            ye = t;
            de = e;
            Ae = false;
            return new ArrowFunction(u, s, true);
        }
        switch (xe) {
          case 4096:
            u.push(new BindingIdentifier(ge));
            Te();
            break;

          case 7340046:
            Te();
            break t;

          case 524296:
          case 2688016:
            Te();
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
            Te();
            h = 2;
            break;
        }
        switch (xe) {
          case 6291471:
            Te();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Te();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw ps();
            Te();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === xe) {
        if (1 === h) {
            Te();
            if (524296 === xe) throw vs();
            const t = ye;
            const e = de;
            ++de;
            const s = Ce(62, 0);
            ye = t;
            de = e;
            Ae = false;
            return new ArrowFunction(u, s);
        }
        throw ps();
    } else if (1 === h && 0 === u.length) throw us(49);
    if (a) switch (h) {
      case 2:
        throw ps();

      case 3:
        throw ws();

      case 4:
        throw bs();
    }
    we = e;
    ve = s;
    xe = r;
    Ee = n;
    ge = i;
    Ae = o;
    ye = c;
    const l = ye;
    const f = Ce(62, t);
    ye = l;
    qe(7340046);
    if (49 === xe) switch (h) {
      case 2:
        throw ps();

      case 3:
        throw ws();

      case 4:
        throw bs();
    }
    return f;
}

function Pe(t) {
    const e = ye;
    Te();
    const s = new Array;
    while (7340051 !== xe) if (We(6291471)) {
        s.push(ae);
        if (7340051 === xe) break;
    } else {
        s.push(Ce(62, ~2 & t));
        if (We(6291471)) {
            if (7340051 === xe) break;
        } else break;
    }
    ye = e;
    qe(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Ae = false;
        return new ArrayLiteralExpression(s);
    }
}

function _e(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw ns();
    if (4204592 !== xe) throw ns();
    Te();
    const e = t;
    const s = Ce(61, 0);
    return new ForOfStatement(e, s);
}

function Me(t) {
    const e = ye;
    const s = new Array;
    const r = new Array;
    Te();
    while (7340045 !== xe) {
        s.push(ge);
        if (49152 & xe) {
            Te();
            qe(6291476);
            r.push(Ce(62, ~2 & t));
        } else if (12288 & xe) {
            const e = Ee;
            const s = xe;
            const n = we;
            Te();
            if (We(6291476)) r.push(Ce(62, ~2 & t)); else {
                Ee = e;
                xe = s;
                we = n;
                r.push(Ce(515, ~2 & t));
            }
        } else throw is();
        if (7340045 !== xe) qe(6291471);
    }
    ye = e;
    qe(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Ae = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function je() {
    const t = [];
    const e = [];
    const s = be;
    let r = "";
    while (we < s) {
        switch (Ee) {
          case 36:
            if (123 === pe.charCodeAt(we + 1)) {
                t.push(r);
                r = "";
                we += 2;
                Ee = pe.charCodeAt(we);
                Te();
                const s = Ce(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(oe(De()));
            break;

          default:
            r += String.fromCharCode(Ee);
        }
        De();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ie(t, e, s) {
    const r = ye;
    const n = [ ge ];
    qe(2163759);
    const i = [ Ce(62, t) ];
    while (2163758 !== (xe = Ke())) {
        n.push(ge);
        qe(2163759);
        i.push(Ce(62, t));
    }
    n.push(ge);
    Ae = false;
    ye = r;
    if (s) {
        Te();
        return new TaggedTemplateExpression(n, n, e, i);
    } else {
        Te();
        return new TemplateExpression(n, i);
    }
}

function Be(t) {
    Ae = false;
    const e = [ ge ];
    Te();
    return new TaggedTemplateExpression(e, e, t);
}

function Te() {
    while (we < be) {
        ve = we;
        if (null != (xe = ks[Ee]())) return;
    }
    xe = 6291456;
}

function De() {
    return Ee = pe.charCodeAt(++we);
}

function Ve() {
    while (Cs[De()]) ;
    const t = Es[ge = me()];
    return void 0 === t ? 4096 : t;
}

function Fe(t) {
    let e = Ee;
    if (false === t) {
        do {
            e = De();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            ge = parseInt(me(), 10);
            return 32768;
        }
        e = De();
        if (we >= be) {
            ge = parseInt(me().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = De();
    } while (e <= 57 && e >= 48); else Ee = pe.charCodeAt(--we);
    ge = parseFloat(me());
    return 32768;
}

function Ne() {
    const t = Ee;
    De();
    let e = 0;
    const s = new Array;
    let r = we;
    while (Ee !== t) if (92 === Ee) {
        s.push(pe.slice(r, we));
        De();
        e = oe(Ee);
        De();
        s.push(String.fromCharCode(e));
        r = we;
    } else if (we >= be) throw os(); else De();
    const n = pe.slice(r, we);
    De();
    s.push(n);
    const i = s.join("");
    ge = i;
    return 16384;
}

function ze() {
    let t = true;
    let e = "";
    while (96 !== De()) if (36 === Ee) if (we + 1 < be && 123 === pe.charCodeAt(we + 1)) {
        we++;
        t = false;
        break;
    } else e += "$"; else if (92 === Ee) e += String.fromCharCode(oe(De())); else {
        if (we >= be) throw cs();
        e += String.fromCharCode(Ee);
    }
    De();
    ge = e;
    if (t) return 2163758;
    return 2163759;
}

function Ke() {
    if (we >= be) throw cs();
    we--;
    return ze();
}

function We(t) {
    if (xe === t) {
        Te();
        return true;
    }
    return false;
}

function qe(t) {
    if (xe === t) Te(); else throw us(t);
}

function Je() {
    return new Error(`AUR0151:${pe}`);
}

function Ge() {
    return new Error(`AUR0152:${pe}`);
}

function He() {
    return new Error(`AUR0153:${pe}`);
}

function Qe() {
    return new Error(`AUR0154:${pe}`);
}

function Xe() {
    return new Error(`AUR0155:${pe}`);
}

function Ye() {
    return new Error(`AUR0156:${pe}`);
}

function Ze() {
    return new Error(`AUR0157`);
}

function ts() {
    return new Error(`AUR0158:${pe}`);
}

function es() {
    return new Error(`AUR0159:${pe}`);
}

function ss() {
    return new Error(`AUR0160:${pe}`);
}

function rs() {
    return new Error(`AUR0161:${pe}`);
}

function ns() {
    return new Error(`AUR0163:${pe}`);
}

function is() {
    return new Error(`AUR0164:${pe}`);
}

function os() {
    return new Error(`AUR0165:${pe}`);
}

function cs() {
    return new Error(`AUR0166:${pe}`);
}

function us(t) {
    return new Error(`AUR0167:${pe}<${gs[63 & t]}`);
}

const hs = () => {
    throw new Error(`AUR0168:${pe}`);
};

hs.notMapped = true;

function as() {
    return new Error(`AUR0170:${pe}`);
}

function ls() {
    return new Error(`AUR0171:${pe}`);
}

function fs() {
    return new Error(`AUR0172:${pe}`);
}

function ps() {
    return new Error(`AUR0173:${pe}`);
}

function ws() {
    return new Error(`AUR0174:${pe}`);
}

function bs() {
    return new Error(`AUR0175:${pe}`);
}

function ds() {
    return new Error(`AUR0176:${pe}`);
}

function vs() {
    return new Error(`AUR0178:${pe}`);
}

function xs() {
    return new Error(`AUR0179:${pe}`);
}

const gs = [ ce, ue, he, ae, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

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

function ys(t, e, s, r) {
    const n = s.length;
    for (let i = 0; i < n; i += 2) {
        const n = s[i];
        let o = s[i + 1];
        o = o > 0 ? o : n + 1;
        if (t) t.fill(r, n, o);
        if (e) for (let t = n; t < o; t++) e.add(t);
    }
}

function ms(t) {
    return () => {
        De();
        return t;
    };
}

const Os = new Set;

ys(null, Os, As.AsciiIdPart, true);

const Cs = new Uint8Array(65535);

ys(Cs, null, As.IdStart, 1);

ys(Cs, null, As.Digit, 1);

const ks = new Array(65535);

ks.fill(hs, 0, 65535);

ys(ks, null, As.Skip, (() => {
    De();
    return null;
}));

ys(ks, null, As.IdStart, Ve);

ys(ks, null, As.Digit, (() => Fe(false)));

ks[34] = ks[39] = () => Ne();

ks[96] = () => ze();

ks[33] = () => {
    if (61 !== De()) return 131117;
    if (61 !== De()) return 6553948;
    De();
    return 6553950;
};

ks[61] = () => {
    if (62 === De()) {
        De();
        return 49;
    }
    if (61 !== Ee) return 4194348;
    if (61 !== De()) return 6553947;
    De();
    return 6553949;
};

ks[38] = () => {
    if (38 !== De()) return 6291478;
    De();
    return 6553882;
};

ks[124] = () => {
    if (124 !== De()) return 6291479;
    De();
    return 6553817;
};

ks[63] = () => {
    if (46 === De()) {
        const t = pe.charCodeAt(we + 1);
        if (t <= 48 || t >= 57) {
            De();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Ee) return 6291477;
    De();
    return 6553752;
};

ks[46] = () => {
    if (De() <= 57 && Ee >= 48) return Fe(true);
    if (46 === Ee) {
        if (46 !== De()) return 10;
        De();
        return 11;
    }
    return 65545;
};

ks[60] = () => {
    if (61 !== De()) return 6554015;
    De();
    return 6554017;
};

ks[62] = () => {
    if (61 !== De()) return 6554016;
    De();
    return 6554018;
};

ks[37] = ms(6554154);

ks[40] = ms(2688007);

ks[41] = ms(7340046);

ks[42] = ms(6554153);

ks[43] = ms(2490853);

ks[44] = ms(6291471);

ks[45] = ms(2490854);

ks[47] = ms(6554155);

ks[58] = ms(6291476);

ks[91] = ms(2688016);

ks[93] = ms(7340051);

ks[123] = ms(524296);

ks[125] = ms(7340045);

let Ss = null;

const $s = [];

let Rs = false;

function Us() {
    Rs = false;
}

function Ls() {
    Rs = true;
}

function Ps() {
    return Ss;
}

function _s(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == Ss) {
        Ss = t;
        $s[0] = Ss;
        Rs = true;
        return;
    }
    if (Ss === t) throw new Error(`AUR0207`);
    $s.push(t);
    Ss = t;
    Rs = true;
}

function Ms(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (Ss !== t) throw new Error(`AUR0209`);
    $s.pop();
    Ss = $s.length > 0 ? $s[$s.length - 1] : null;
    Rs = null != Ss;
}

const js = Object.freeze({
    get current() {
        return Ss;
    },
    get connecting() {
        return Rs;
    },
    enter: _s,
    exit: Ms,
    pause: Us,
    resume: Ls
});

const Is = Reflect.get;

const Bs = Object.prototype.toString;

const Ts = new WeakMap;

function Ds(t) {
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

const Vs = "__raw__";

function Fs(t) {
    return Ds(t) ? Ns(t) : t;
}

function Ns(t) {
    return Ts.get(t) ?? qs(t);
}

function zs(t) {
    return t[Vs] ?? t;
}

function Ks(t) {
    return Ds(t) && t[Vs] || t;
}

function Ws(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function qs(t) {
    const e = o(t) ? Gs : t instanceof Map || t instanceof Set ? vr : Js;
    const s = new Proxy(t, e);
    Ts.set(t, s);
    return s;
}

const Js = {
    get(t, e, s) {
        if (e === Vs) return t;
        const r = Ps();
        if (!Rs || Ws(e) || null == r) return Is(t, e, s);
        r.observe(t, e);
        return Fs(Is(t, e, s));
    }
};

const Gs = {
    get(t, e, s) {
        if (e === Vs) return t;
        const r = Ps();
        if (!Rs || Ws(e) || null == r) return Is(t, e, s);
        switch (e) {
          case "length":
            r.observe(t, "length");
            return t.length;

          case "map":
            return Hs;

          case "includes":
            return Ys;

          case "indexOf":
            return Zs;

          case "lastIndexOf":
            return tr;

          case "every":
            return Qs;

          case "filter":
            return Xs;

          case "find":
            return sr;

          case "findIndex":
            return er;

          case "flat":
            return rr;

          case "flatMap":
            return nr;

          case "join":
            return ir;

          case "push":
            return cr;

          case "pop":
            return or;

          case "reduce":
            return br;

          case "reduceRight":
            return dr;

          case "reverse":
            return lr;

          case "shift":
            return ur;

          case "unshift":
            return hr;

          case "slice":
            return wr;

          case "splice":
            return ar;

          case "some":
            return fr;

          case "sort":
            return pr;

          case "keys":
            return Cr;

          case "values":
          case Symbol.iterator:
            return kr;

          case "entries":
            return Sr;
        }
        r.observe(t, e);
        return Fs(Is(t, e, s));
    },
    ownKeys(t) {
        Ps()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Hs(t, e) {
    const s = zs(this);
    const r = s.map(((s, r) => Ks(t.call(e, Fs(s), r, this))));
    Ps()?.observeCollection(s);
    return Fs(r);
}

function Qs(t, e) {
    const s = zs(this);
    const r = s.every(((s, r) => t.call(e, Fs(s), r, this)));
    Ps()?.observeCollection(s);
    return r;
}

function Xs(t, e) {
    const s = zs(this);
    const r = s.filter(((s, r) => Ks(t.call(e, Fs(s), r, this))));
    Ps()?.observeCollection(s);
    return Fs(r);
}

function Ys(t) {
    const e = zs(this);
    const s = e.includes(Ks(t));
    Ps()?.observeCollection(e);
    return s;
}

function Zs(t) {
    const e = zs(this);
    const s = e.indexOf(Ks(t));
    Ps()?.observeCollection(e);
    return s;
}

function tr(t) {
    const e = zs(this);
    const s = e.lastIndexOf(Ks(t));
    Ps()?.observeCollection(e);
    return s;
}

function er(t, e) {
    const s = zs(this);
    const r = s.findIndex(((s, r) => Ks(t.call(e, Fs(s), r, this))));
    Ps()?.observeCollection(s);
    return r;
}

function sr(t, e) {
    const s = zs(this);
    const r = s.find(((e, s) => t(Fs(e), s, this)), e);
    Ps()?.observeCollection(s);
    return Fs(r);
}

function rr() {
    const t = zs(this);
    Ps()?.observeCollection(t);
    return Fs(t.flat());
}

function nr(t, e) {
    const s = zs(this);
    Ps()?.observeCollection(s);
    return Ns(s.flatMap(((s, r) => Fs(t.call(e, Fs(s), r, this)))));
}

function ir(t) {
    const e = zs(this);
    Ps()?.observeCollection(e);
    return e.join(t);
}

function or() {
    return Fs(zs(this).pop());
}

function cr(...t) {
    return zs(this).push(...t);
}

function ur() {
    return Fs(zs(this).shift());
}

function hr(...t) {
    return zs(this).unshift(...t);
}

function ar(...t) {
    return Fs(zs(this).splice(...t));
}

function lr(...t) {
    const e = zs(this);
    const s = e.reverse();
    Ps()?.observeCollection(e);
    return Fs(s);
}

function fr(t, e) {
    const s = zs(this);
    const r = s.some(((s, r) => Ks(t.call(e, Fs(s), r, this))));
    Ps()?.observeCollection(s);
    return r;
}

function pr(t) {
    const e = zs(this);
    const s = e.sort(t);
    Ps()?.observeCollection(e);
    return Fs(s);
}

function wr(t, e) {
    const s = zs(this);
    Ps()?.observeCollection(s);
    return Ns(s.slice(t, e));
}

function br(t, e) {
    const s = zs(this);
    const r = s.reduce(((e, s, r) => t(e, Fs(s), r, this)), e);
    Ps()?.observeCollection(s);
    return Fs(r);
}

function dr(t, e) {
    const s = zs(this);
    const r = s.reduceRight(((e, s, r) => t(e, Fs(s), r, this)), e);
    Ps()?.observeCollection(s);
    return Fs(r);
}

const vr = {
    get(t, e, s) {
        if (e === Vs) return t;
        const r = Ps();
        if (!Rs || Ws(e) || null == r) return Is(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return mr;

          case "delete":
            return Or;

          case "forEach":
            return xr;

          case "add":
            if (t instanceof Set) return yr;
            break;

          case "get":
            if (t instanceof Map) return Er;
            break;

          case "set":
            if (t instanceof Map) return Ar;
            break;

          case "has":
            return gr;

          case "keys":
            return Cr;

          case "values":
            return kr;

          case "entries":
            return Sr;

          case Symbol.iterator:
            return t instanceof Map ? Sr : kr;
        }
        return Fs(Is(t, e, s));
    }
};

function xr(t, e) {
    const s = zs(this);
    Ps()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Fs(s), Fs(r), this);
    }));
}

function gr(t) {
    const e = zs(this);
    Ps()?.observeCollection(e);
    return e.has(Ks(t));
}

function Er(t) {
    const e = zs(this);
    Ps()?.observeCollection(e);
    return Fs(e.get(Ks(t)));
}

function Ar(t, e) {
    return Fs(zs(this).set(Ks(t), Ks(e)));
}

function yr(t) {
    return Fs(zs(this).add(Ks(t)));
}

function mr() {
    return Fs(zs(this).clear());
}

function Or(t) {
    return Fs(zs(this).delete(Ks(t)));
}

function Cr() {
    const t = zs(this);
    Ps()?.observeCollection(t);
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
                value: Fs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function kr() {
    const t = zs(this);
    Ps()?.observeCollection(t);
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
                value: Fs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Sr() {
    const t = zs(this);
    Ps()?.observeCollection(t);
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
                value: [ Fs(s[0]), Fs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const $r = Object.freeze({
    getProxy: Ns,
    getRaw: zs,
    wrap: Fs,
    unwrap: Ks,
    rawKey: Vs
});

class ComputedObserver {
    constructor(t, e, s, r, n) {
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
        this.oL = n;
    }
    static create(t, e, s, n, i) {
        const o = s.get;
        const c = s.set;
        const u = new ComputedObserver(t, o, c, i, n);
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
            Rr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Rr);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            _s(this);
            return this.v = Ks(this.$get.call(this.up ? Fs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Ms(this);
        }
    }
}

ne(ComputedObserver);

V(ComputedObserver);

let Rr;

const Ur = a("IDirtyChecker", (t => t.singleton(DirtyChecker)));

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

const Pr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (Lr.disabled) return;
            if (++this.O < Lr.timeoutsPerCheck) return;
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
        if (Lr.throw) throw new Error(`AUR0222:${h(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Pr);
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
        throw new Error(`Trying to set value for property ${h(this.key)} in dirty checker`);
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

V(DirtyCheckProperty);

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
            _r = this.v;
            this.v = t;
            this.subs.notify(t, _r);
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
            _r = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, _r);
        }
    }
}

V(SetterObserver);

V(SetterNotifier);

let _r;

const Mr = new PropertyAccessor;

const jr = a("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Ir = a("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Mr;
    }
    getAccessor() {
        return Mr;
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
        if (null == t) throw Fr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Vr(t);
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
        return Mr;
    }
    getArrayObserver(t) {
        return bt(t);
    }
    getMapObserver(t) {
        return Gt(t);
    }
    getSetObserver(t) {
        return _t(t);
    }
    createObserver(e, r) {
        if (this.R.handles(e, r, this)) return this.R.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (o(e)) return bt(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Gt(e).getLengthObserver(); else if (e instanceof Set) return _t(e).getLengthObserver();
            break;

          default:
            if (o(e) && t.isArrayIndex(r)) return bt(e).getIndexObserver(Number(r));
            break;
        }
        let n = Dr(e, r);
        if (void 0 === n) {
            let t = Tr(e);
            while (null !== t) {
                n = Dr(t, r);
                if (void 0 === n) t = Tr(t); else break;
            }
        }
        if (void 0 !== n && !s.call(n, "value")) {
            let t = this.U(e, r, n);
            if (null == t) t = (n.get?.getObserver ?? n.set?.getObserver)?.(e, this);
            return null == t ? n.configurable ? ComputedObserver.create(e, r, n, this, true) : this.C.createProperty(e, r) : t;
        }
        return new SetterObserver(e, r);
    }
    U(t, e, s) {
        if (this.$.length > 0) for (const r of this.$) {
            const n = r.getObserver(t, e, s, this);
            if (null != n) return n;
        }
        return null;
    }
}

ObserverLocator.inject = [ Ur, Ir ];

const Br = t => {
    let e;
    if (o(t)) e = bt(t); else if (t instanceof Map) e = Gt(t); else if (t instanceof Set) e = _t(t);
    return e;
};

const Tr = Object.getPrototypeOf;

const Dr = Object.getOwnPropertyDescriptor;

const Vr = t => {
    let e = t.$observers;
    if (void 0 === e) r(t, "$observers", {
        enumerable: false,
        value: e = l()
    });
    return e;
};

const Fr = t => new Error(`AUR0199:${h(t)}`);

const Nr = a("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ jr ];
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
            _s(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Ms(this);
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

function zr(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Kr = {};

function Wr(t, e, s) {
    if (null == e) return (e, s, r) => n(e, s, r, t);
    return n(t, e, s);
    function n(t, e, s, n) {
        const i = void 0 === e;
        n = "object" !== typeof n ? {
            name: n
        } : n || {};
        if (i) e = n.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const o = n.callback || `${h(e)}Changed`;
        let c = Kr;
        if (s) {
            delete s.value;
            delete s.writable;
            c = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const u = n.set;
        s.get = function t() {
            const s = qr(this, e, o, c, u);
            Ps()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            qr(this, e, o, c, u).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return qr(s, e, o, c, u);
        };
        if (i) r(t.prototype, e, s); else return s;
    }
}

function qr(t, e, s, r, n) {
    const i = zr(t);
    let o = i[e];
    if (null == o) {
        o = new SetterNotifier(t, s, n, r === Kr ? void 0 : r);
        i[e] = o;
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

exports.ConnectableSwitcher = js;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = Lr;

exports.ForOfStatement = ForOfStatement;

exports.ICoercionConfiguration = U;

exports.IDirtyChecker = Ur;

exports.IExpressionParser = ie;

exports.INodeObserverLocator = Ir;

exports.IObservation = Nr;

exports.IObserverLocator = jr;

exports.ISignaler = v;

exports.Interpolation = Interpolation;

exports.MapObserver = MapObserver;

exports.ObjectBindingPattern = ObjectBindingPattern;

exports.ObjectLiteralExpression = ObjectLiteralExpression;

exports.Observation = Observation;

exports.ObserverLocator = ObserverLocator;

exports.PrimitiveLiteralExpression = PrimitiveLiteralExpression;

exports.PrimitiveObserver = PrimitiveObserver;

exports.PropertyAccessor = PropertyAccessor;

exports.ProxyObservable = $r;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.Unparser = Unparser;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = vt;

exports.astAssign = E;

exports.astBind = A;

exports.astEvaluate = g;

exports.astUnbind = y;

exports.astVisit = w;

exports.batch = B;

exports.cloneIndexMap = _;

exports.connectable = ne;

exports.copyIndexMap = L;

exports.createIndexMap = P;

exports.disableArrayObservation = wt;

exports.disableMapObservation = Jt;

exports.disableSetObservation = Pt;

exports.enableArrayObservation = pt;

exports.enableMapObservation = qt;

exports.enableSetObservation = Lt;

exports.getCollectionObserver = Br;

exports.getObserverLookup = Vr;

exports.isIndexMap = M;

exports.observable = Wr;

exports.parseExpression = Oe;

exports.subscriberCollection = V;

exports.synchronizeIndices = xt;
//# sourceMappingURL=index.cjs.map
