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

const u = t => t instanceof Set;

const h = t => t instanceof Map;

const a = Object.is;

function l(t, e, s) {
    r(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function f(t, e, s) {
    if (!(e in t)) l(t, e, s);
}

const p = String;

const b = t.DI.createInterface;

const w = () => Object.create(null);

const d = e.Metadata.getOwn;

e.Metadata.hasOwn;

const v = e.Metadata.define;

t.Protocol.annotation.keyFor;

t.Protocol.resource.keyFor;

t.Protocol.resource.appendTo;

const x = (t, e) => {
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
        x(t, e);
        return e.text;
    }
    visitAccessMember(t) {
        x(t.object, this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        x(t.object, this);
        this.text += `${t.optional ? "?." : ""}[`;
        x(t.key, this);
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
            x(e[t], this);
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
        x(t.body, this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            x(s[t], this);
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
        x(t.func, this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        x(t.object, this);
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
            x(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        x(t.func, this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            x(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        x(t.expression, this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        x(t.left, this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        x(t.right, this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        x(t.condition, this);
        this.text += "?";
        x(t.yes, this);
        this.text += ":";
        x(t.no, this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        x(t.target, this);
        this.text += "=";
        x(t.value, this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        x(t.expression, this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            x(e[t], this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        x(t.expression, this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            x(e[t], this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            x(e[t], this);
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
            x(s[t], this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitForOfStatement(t) {
        x(t.declaration, this);
        this.text += " of ";
        x(t.iterable, this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            x(s[t], this);
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
                x(o, this);
                break;

              case 24:
              case 25:
                {
                    const t = o.source;
                    if (t) {
                        x(t, this);
                        this.text += ":";
                    }
                    x(o, this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        x(t.source, this);
        this.text += ":";
        x(t.target, this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            x(e, this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        x(t.target, this);
    }
    visitCustom(t) {
        this.text += p(t.value);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            x(t[e], this);
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
    constructor(t, e, s) {
        this.declaration = t;
        this.iterable = e;
        this.semiIdx = s;
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
        if (null == t) throw g();
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
        if (null == t) throw A();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw g();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const g = () => i(`AUR0203`);

const A = () => i("AUR0204");

class OverrideContext {}

const y = Scope.getContext;

function m(t, e, s, r) {
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
            const o = y(e, t.name, t.ancestor);
            if (null !== r) r.observe(o, t.name);
            const c = o[t.name];
            if (null == c && "$host" === t.name) throw i(`AUR0105`);
            if (s?.strict) return s?.boundFn && n(c) ? c.bind(o) : c;
            return null == c ? "" : s?.boundFn && n(c) ? c.bind(o) : c;
        }

      case 2:
        return t.elements.map((t => m(t, e, s, r)));

      case 3:
        {
            const i = {};
            for (let n = 0; n < t.keys.length; ++n) i[t.keys[n]] = m(t.values[n], e, s, r);
            return i;
        }

      case 4:
        return t.value;

      case 5:
        {
            let i = t.cooked[0];
            for (let n = 0; n < t.expressions.length; ++n) {
                i += String(m(t.expressions[n], e, s, r));
                i += t.cooked[n + 1];
            }
            return i;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void m(t.expression, e, s, r);

          case "typeof":
            return typeof m(t.expression, e, s, r);

          case "!":
            return !m(t.expression, e, s, r);

          case "-":
            return -m(t.expression, e, s, r);

          case "+":
            return +m(t.expression, e, s, r);

          default:
            throw i(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const i = t.args.map((t => m(t, e, s, r)));
            const n = y(e, t.name, t.ancestor);
            const o = R(s?.strictFnCall, n, t.name);
            if (o) return o.apply(n, i);
            return;
        }

      case 8:
        {
            const i = m(t.object, e, s, r);
            const n = t.args.map((t => m(t, e, s, r)));
            const o = R(s?.strictFnCall, i, t.name);
            let u;
            if (o) {
                u = o.apply(i, n);
                if (c(i) && P.includes(t.name)) r?.observeCollection(i);
            }
            return u;
        }

      case 9:
        {
            const o = m(t.func, e, s, r);
            if (n(o)) return o(...t.args.map((t => m(t, e, s, r))));
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
                return m(t.body, h, s, r);
            };
            return i;
        }

      case 10:
        {
            const i = m(t.object, e, s, r);
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
            const i = m(t.object, e, s, r);
            if (i instanceof Object) {
                const n = m(t.key, e, s, r);
                if (null !== r) r.observe(i, n);
                return i[n];
            }
            return;
        }

      case 12:
        {
            const o = t.expressions.map((t => m(t, e, s, r)));
            const c = m(t.func, e, s, r);
            if (!n(c)) throw i(`AUR0110`);
            return c(t.cooked, ...o);
        }

      case 13:
        {
            const o = t.left;
            const c = t.right;
            switch (t.operation) {
              case "&&":
                return m(o, e, s, r) && m(c, e, s, r);

              case "||":
                return m(o, e, s, r) || m(c, e, s, r);

              case "??":
                return m(o, e, s, r) ?? m(c, e, s, r);

              case "==":
                return m(o, e, s, r) == m(c, e, s, r);

              case "===":
                return m(o, e, s, r) === m(c, e, s, r);

              case "!=":
                return m(o, e, s, r) != m(c, e, s, r);

              case "!==":
                return m(o, e, s, r) !== m(c, e, s, r);

              case "instanceof":
                {
                    const t = m(c, e, s, r);
                    if (n(t)) return m(o, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = m(c, e, s, r);
                    if (t instanceof Object) return m(o, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = m(o, e, s, r);
                    const i = m(c, e, s, r);
                    if (s?.strict) return t + i;
                    if (!t || !i) {
                        if (U(t) || U(i)) return (t || 0) + (i || 0);
                        if (L(t) || L(i)) return (t || "") + (i || "");
                    }
                    return t + i;
                }

              case "-":
                return m(o, e, s, r) - m(c, e, s, r);

              case "*":
                return m(o, e, s, r) * m(c, e, s, r);

              case "/":
                return m(o, e, s, r) / m(c, e, s, r);

              case "%":
                return m(o, e, s, r) % m(c, e, s, r);

              case "<":
                return m(o, e, s, r) < m(c, e, s, r);

              case ">":
                return m(o, e, s, r) > m(c, e, s, r);

              case "<=":
                return m(o, e, s, r) <= m(c, e, s, r);

              case ">=":
                return m(o, e, s, r) >= m(c, e, s, r);

              default:
                throw i(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return m(t.condition, e, s, r) ? m(t.yes, e, s, r) : m(t.no, e, s, r);

      case 15:
        return E(t.target, e, s, m(t.value, e, s, r));

      case 17:
        {
            const n = s?.getConverter?.(t.name);
            if (null == n) throw i(`AUR0103:${t.name}`);
            if ("toView" in n) return n.toView(m(t.expression, e, s, r), ...t.args.map((t => m(t, e, s, r))));
            return m(t.expression, e, s, r);
        }

      case 18:
        return m(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return m(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let i = t.parts[0];
            let n = 0;
            for (;n < t.expressions.length; ++n) {
                i += p(m(t.expressions[n], e, s, r));
                i += t.parts[n + 1];
            }
            return i;
        } else return `${t.parts[0]}${m(t.firstExpression, e, s, r)}${t.parts[1]}`;

      case 26:
        return m(t.target, e, s, r);

      case 24:
        return t.list.map((t => m(t, e, s, r)));

      case 19:
      case 20:
      case 25:
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
            if ("$host" === e.name) throw i(`AUR0106`);
            const t = y(s, e.name, e.ancestor);
            if (t instanceof Object) if (void 0 !== t.$observers?.[e.name]) {
                t.$observers[e.name].setValue(n);
                return n;
            } else return t[e.name] = n;
            return;
        }

      case 10:
        {
            const t = m(e.object, s, r, null);
            if (t instanceof Object) if (void 0 !== t.$observers?.[e.name]) t.$observers[e.name].setValue(n); else t[e.name] = n; else E(e.object, s, r, {
                [e.name]: n
            });
            return n;
        }

      case 11:
        {
            const t = m(e.object, s, r, null);
            const i = m(e.key, s, r, null);
            return t[i] = n;
        }

      case 15:
        E(e.value, s, r, n);
        return E(e.target, s, r, n);

      case 17:
        {
            const t = r?.getConverter?.(e.name);
            if (null == t) throw $(e.name);
            if ("fromView" in t) n = t.fromView(n, ...e.args.map((t => m(t, s, r, null))));
            return E(e.expression, s, r, n);
        }

      case 18:
        return E(e.expression, s, r, n);

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
                    E(u, s, r, n);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof n || null === n) throw i(`AUR0112`);
                        let t = m(u.source, Scope.create(n), r, null);
                        if (void 0 === t && u.initializer) t = m(u.initializer, s, r, null);
                        E(u, s, r, t);
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
            let t = m(e.source, Scope.create(n), r, null);
            if (void 0 === t && e.initializer) t = m(e.initializer, s, r, null);
            E(e.target, s, r, t);
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
            E(e.target, s, r, c);
        }
        break;

      case 28:
        return e.assign(s, r, n);

      default:
        return;
    }
}

function O(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const i = t.key;
            const n = s.getBehavior?.(r);
            if (null == n) throw C(r);
            if (void 0 === s[i]) {
                s[i] = n;
                n.bind?.(e, s, ...t.args.map((t => m(t, e, s, null))));
            } else throw S(r);
            O(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const i = s.getConverter?.(r);
            if (null == i) throw $(r);
            const n = i.signals;
            if (null != n) {
                const t = s.getSignaler?.();
                const e = n.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(n[r], s);
            }
            O(t.expression, e, s);
            return;
        }

      case 22:
        O(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function k(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const i = s;
            if (void 0 !== i[r]) {
                i[r].unbind?.(e, s);
                i[r] = void 0;
            }
            k(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const i = s.getSignaler?.();
            let n = 0;
            for (;n < r.signals.length; ++n) i?.removeSignalListener(r.signals[n], s);
            k(t.expression, e, s);
            break;
        }

      case 22:
        k(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const C = t => i(`AUR0101:${t}`);

const S = t => i(`AUR0102:${t}`);

const $ = t => i(`AUR0103:${t}`);

const R = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (n(r)) return r;
    if (!t && null == r) return null;
    throw i(`AUR0111:${s}`);
};

const U = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const L = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const P = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const _ = t.DI.createInterface("ICoercionConfiguration");

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

function B(t) {
    return c(t) && true === t.isIndexMap;
}

let T = new Map;

let D = false;

function V(t) {
    const e = T;
    const s = T = new Map;
    D = true;
    try {
        t();
    } finally {
        T = null;
        D = false;
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
            T = e;
        }
    }
}

function F(t, e, s) {
    if (!T.has(t)) T.set(t, [ 2, e, s ]);
}

function N(t, e, s) {
    const r = T.get(t);
    if (void 0 === r) T.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function z(t) {
    return null == t ? K : K(t);
}

function K(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: W
    });
    f(e, "subscribe", q);
    f(e, "unsubscribe", J);
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
        if (D) {
            N(this, t, e);
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

function W() {
    return l(this, "subs", new SubscriberRecord);
}

function q(t) {
    return this.subs.add(t);
}

function J(t) {
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
        this.type = h(this.o) ? 66 : 34;
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

function G(t) {
    const e = t.prototype;
    f(e, "subscribe", H);
    f(e, "unsubscribe", Q);
    z(t);
}

function H(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function Q(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

G(CollectionLengthObserver);

G(CollectionSizeObserver);

const X = "__au_array_obs__";

const Y = (() => {
    let t = d(X, Array);
    if (null == t) v(X, t = new WeakMap, Array);
    return t;
})();

function Z(t, e) {
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
    let p, b, w;
    let d, v;
    let x, g, A, y;
    let m, E, O, k;
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
                    k = t[y];
                    O = i(k, x);
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
            st(t, e, y, r, i);
            r = A;
        } else {
            st(t, e, s, A, i);
            s = y;
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

const pt = {
    push: function(...t) {
        const e = Y.get(this);
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
        const e = Y.get(this);
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
        const t = Y.get(this);
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
        const t = Y.get(this);
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
        const r = Y.get(this);
        if (void 0 === r) return ut.apply(this, t);
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
            ut.call(c, e, s, ...r);
        } else ut.apply(c, t);
        const l = ut.apply(this, t);
        if (h > 0 || a > 0) r.notify();
        return l;
    },
    reverse: function() {
        const t = Y.get(this);
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
        const e = Y.get(this);
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
        if (void 0 === t || !n(t)) t = Z;
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

for (const t of ft) r(pt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let bt = false;

const wt = "__au_arr_on__";

function dt() {
    if (!(d(wt, Array) ?? false)) {
        v(wt, true, Array);
        for (const t of ft) if (true !== rt[t].observing) l(rt, t, pt[t]);
    }
}

function vt() {
    for (const t of ft) if (true === rt[t].observing) l(rt, t, lt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!bt) {
            bt = true;
            dt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = I(t.length);
        this.lenObs = void 0;
        Y.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (D) {
            F(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = I(r);
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

z(ArrayObserver);

z(ArrayIndexObserver);

function xt(t) {
    let e = Y.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const gt = (t, e) => t - e;

function At(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = M(t);
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

function yt(t, e) {
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

const mt = "__au_set_obs__";

const Et = (() => {
    let t = d(mt, Set);
    if (null == t) v(mt, t = new WeakMap, Set);
    return t;
})();

const Ot = Set.prototype;

const kt = Ot.add;

const Ct = Ot.clear;

const St = Ot.delete;

const $t = {
    add: kt,
    clear: Ct,
    delete: St
};

const Rt = [ "add", "clear", "delete" ];

const Ut = {
    add: function(t) {
        const e = Et.get(this);
        if (void 0 === e) {
            kt.call(this, t);
            return this;
        }
        const s = this.size;
        kt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Et.get(this);
        if (void 0 === t) return Ct.call(this);
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
            Ct.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Et.get(this);
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

const Lt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Rt) r(Ut[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Pt = false;

const _t = "__au_set_on__";

function jt() {
    if (!(d(_t, Set) ?? false)) {
        v(_t, true, Set);
        for (const t of Rt) if (true !== Ot[t].observing) r(Ot, t, {
            ...Lt,
            value: Ut[t]
        });
    }
}

function It() {
    for (const t of Rt) if (true === Ot[t].observing) r(Ot, t, {
        ...Lt,
        value: $t[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Pt) {
            Pt = true;
            jt();
        }
        this.collection = t;
        this.indexMap = I(t.size);
        this.lenObs = void 0;
        Et.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (D) {
            F(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = I(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

z(SetObserver);

function Mt(t) {
    let e = Et.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Bt = "__au_map_obs__";

const Tt = (() => {
    let t = d(Bt, Map);
    if (null == t) v(Bt, t = new WeakMap, Map);
    return t;
})();

const Dt = Map.prototype;

const Vt = Dt.set;

const Ft = Dt.clear;

const Nt = Dt.delete;

const zt = {
    set: Vt,
    clear: Ft,
    delete: Nt
};

const Kt = [ "set", "clear", "delete" ];

const Wt = {
    set: function(t, e) {
        const s = Tt.get(this);
        if (void 0 === s) {
            Vt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Vt.call(this, t, e);
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
        if (void 0 === t) return Ft.call(this);
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
            Ft.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Tt.get(this);
        if (void 0 === e) return Nt.call(this, t);
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
                const n = Nt.call(this, t);
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

for (const t of Kt) r(Wt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Jt = false;

const Gt = "__au_map_on__";

function Ht() {
    if (!(d(Gt, Map) ?? false)) {
        v(Gt, true, Map);
        for (const t of Kt) if (true !== Dt[t].observing) r(Dt, t, {
            ...qt,
            value: Wt[t]
        });
    }
}

function Qt() {
    for (const t of Kt) if (true === Dt[t].observing) r(Dt, t, {
        ...qt,
        value: zt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Jt) {
            Jt = true;
            Ht();
        }
        this.collection = t;
        this.indexMap = I(t.size);
        this.lenObs = void 0;
        Tt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (D) {
            F(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = I(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

z(MapObserver);

function Xt(t) {
    let e = Tt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Yt() {
    return l(this, "obs", new BindingObserverRecord(this));
}

function Zt(t, e) {
    this.obs.add(this.oL.getObserver(t, e));
}

function te(t) {
    let e;
    if (c(t)) e = xt(t); else if (u(t)) e = Mt(t); else if (h(t)) e = Xt(t); else throw i(`AUR0210`);
    this.obs.add(e);
}

function ee(t) {
    this.obs.add(t);
}

function se() {
    throw i(`AUR2011:handleChange`);
}

function re() {
    throw i(`AUR2011:handleCollectionChange`);
}

class BindingObserverRecord {
    constructor(t) {
        this.version = 0;
        this.count = 0;
        this.o = new Map;
        this.b = t;
    }
    add(t) {
        if (!this.o.has(t)) {
            t.subscribe(this.b);
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
    e.unsubscribe(this.b);
}

function ne(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this.b);
        this.o.delete(e);
    }
}

function oe(t) {
    const e = t.prototype;
    f(e, "observe", Zt);
    f(e, "observeCollection", te);
    f(e, "subscribeTo", ee);
    r(e, "obs", {
        get: Yt
    });
    f(e, "handleChange", se);
    f(e, "handleCollectionChange", re);
    return t;
}

function ce(t) {
    return null == t ? oe : oe(t);
}

const ue = b("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = w();
        this.u = w();
        this.h = w();
    }
    parse(t, e) {
        let s;
        switch (e) {
          case 32:
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
                if ((e & (8 | 16)) > 0) return PrimitiveLiteralExpression.$empty;
                throw ns();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        de = t;
        ve = 0;
        xe = t.length;
        ge = 0;
        Ae = 0;
        ye = 6291456;
        me = "";
        Ee = $e(0);
        Oe = true;
        ke = false;
        Ce = -1;
        return Le(61, void 0 === e ? 16 : e);
    }
}

function he(t) {
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

const ae = PrimitiveLiteralExpression.$false;

const le = PrimitiveLiteralExpression.$true;

const fe = PrimitiveLiteralExpression.$null;

const pe = PrimitiveLiteralExpression.$undefined;

const be = AccessThisExpression.$this;

const we = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsChainable"] = 4] = "IsChainable";
    t[t["IsFunction"] = 8] = "IsFunction";
    t[t["IsProperty"] = 16] = "IsProperty";
    t[t["IsCustom"] = 32] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let de = "";

let ve = 0;

let xe = 0;

let ge = 0;

let Ae = 0;

let ye = 6291456;

let me = "";

let Ee;

let Oe = true;

let ke = false;

let Ce = -1;

const Se = String.fromCharCode;

const $e = t => de.charCodeAt(t);

const Re = () => de.slice(Ae, ve);

function Ue(t, e) {
    de = t;
    ve = 0;
    xe = t.length;
    ge = 0;
    Ae = 0;
    ye = 6291456;
    me = "";
    Ee = $e(0);
    Oe = true;
    ke = false;
    Ce = -1;
    return Le(61, void 0 === e ? 16 : e);
}

function Le(t, e) {
    if (32 === e) return new CustomExpression(de);
    if (0 === ve) {
        if (1 & e) return Fe();
        Ke();
        if (4194304 & ye) throw Ze();
    }
    Oe = 513 > t;
    ke = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & ye) {
        const t = ks[63 & ye];
        Ke();
        r = new UnaryExpression(t, Le(514, e));
        Oe = false;
    } else {
        t: switch (ye) {
          case 12294:
            i = ge;
            Oe = false;
            do {
                Ke();
                ++i;
                switch (ye) {
                  case 65545:
                    Ke();
                    if (0 === (12288 & ye)) throw es();
                    break;

                  case 10:
                  case 11:
                    throw es();

                  case 2162700:
                    ke = true;
                    Ke();
                    if (0 === (12288 & ye)) {
                        r = 0 === i ? be : 1 === i ? we : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & ye) {
                        r = 0 === i ? be : 1 === i ? we : new AccessThisExpression(i);
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
                Ke();
                if (Xe(50)) {
                    if (524296 === ye) throw Es();
                    const e = ke;
                    const s = ge;
                    ++ge;
                    const i = Le(62, 0);
                    ke = e;
                    ge = s;
                    Oe = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Os();

          case 11:
            throw ts();

          case 12292:
            Oe = false;
            Ke();
            switch (ge) {
              case 0:
                r = be;
                break;

              case 1:
                r = we;
                break;

              default:
                r = new AccessThisExpression(ge);
                break;
            }
            break;

          case 2688007:
            r = Be(e);
            break;

          case 2688016:
            r = de.search(/\s+of\s+/) > ve ? Pe() : Te(e);
            break;

          case 524296:
            r = Ve(e);
            break;

          case 2163759:
            r = new TemplateExpression([ me ]);
            Oe = false;
            Ke();
            break;

          case 2163760:
            r = Ne(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(me);
            Oe = false;
            Ke();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = ks[63 & ye];
            Oe = false;
            Ke();
            break;

          default:
            if (ve >= xe) throw rs(); else throw is();
        }
        if (2 & e) return De(r);
        if (514 < t) return r;
        if (10 === ye || 11 === ye) throw es();
        if (0 === r.$kind) switch (ye) {
          case 2162700:
            ke = true;
            Oe = false;
            Ke();
            if (0 === (13312 & ye)) throw vs();
            if (12288 & ye) {
                r = new AccessScopeExpression(me, r.ancestor);
                Ke();
            } else if (2688007 === ye) r = new CallFunctionExpression(r, _e(), true); else if (2688016 === ye) r = je(r, true); else throw xs();
            break;

          case 65545:
            Oe = !ke;
            Ke();
            if (0 === (12288 & ye)) throw es();
            r = new AccessScopeExpression(me, r.ancestor);
            Ke();
            break;

          case 10:
          case 11:
            throw es();

          case 2688007:
            r = new CallFunctionExpression(r, _e(), s);
            break;

          case 2688016:
            r = je(r, s);
            break;

          case 2163759:
            r = ze(r);
            break;

          case 2163760:
            r = Ne(e, r, true);
            break;
        }
        while ((65536 & ye) > 0) switch (ye) {
          case 2162700:
            r = Ie(r);
            break;

          case 65545:
            Ke();
            if (0 === (12288 & ye)) throw es();
            r = Me(r, false);
            break;

          case 10:
          case 11:
            throw es();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, _e(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, _e(), r.optional, false); else r = new CallFunctionExpression(r, _e(), false);
            break;

          case 2688016:
            r = je(r, false);
            break;

          case 2163759:
            if (ke) throw xs();
            r = ze(r);
            break;

          case 2163760:
            if (ke) throw xs();
            r = Ne(e, r, true);
            break;
        }
    }
    if (10 === ye || 11 === ye) throw es();
    if (513 < t) return r;
    while ((262144 & ye) > 0) {
        const s = ye;
        if ((960 & s) <= t) break;
        Ke();
        r = new BinaryExpression(ks[63 & s], r, Le(960 & s, e));
        Oe = false;
    }
    if (63 < t) return r;
    if (Xe(6291478)) {
        const t = Le(62, e);
        Ye(6291476);
        r = new ConditionalExpression(r, t, Le(62, e));
        Oe = false;
    }
    if (62 < t) return r;
    if (Xe(4194349)) {
        if (!Oe) throw os();
        r = new AssignExpression(r, Le(62, e));
    }
    if (61 < t) return r;
    while (Xe(6291480)) {
        if (6291456 === ye) throw cs();
        const t = me;
        Ke();
        const s = new Array;
        while (Xe(6291476)) s.push(Le(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Xe(6291479)) {
        if (6291456 === ye) throw us();
        const t = me;
        Ke();
        const s = new Array;
        while (Xe(6291476)) s.push(Le(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== ye) {
        if ((1 & e) > 0 && 7340045 === ye) return r;
        if ((4 & e) > 0 && 6291477 === ye) {
            if (ve === xe) throw is();
            Ce = ve - 1;
            return r;
        }
        if ("of" === Re()) throw hs();
        throw is();
    }
    return r;
}

function Pe() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Ke();
        switch (ye) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Re();
            break;

          default:
            throw ds();
        }
    }
    Ye(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(be, s), new AccessKeyedExpression(be, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function _e() {
    const t = ke;
    Ke();
    const e = [];
    while (7340046 !== ye) {
        e.push(Le(62, 0));
        if (!Xe(6291471)) break;
    }
    Ye(7340046);
    Oe = false;
    ke = t;
    return e;
}

function je(t, e) {
    const s = ke;
    Ke();
    t = new AccessKeyedExpression(t, Le(62, 0), e);
    Ye(7340051);
    Oe = !s;
    ke = s;
    return t;
}

function Ie(t) {
    ke = true;
    Oe = false;
    Ke();
    if (0 === (13312 & ye)) throw vs();
    if (12288 & ye) return Me(t, true);
    if (2688007 === ye) if (1 === t.$kind) return new CallScopeExpression(t.name, _e(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, _e(), t.optional, true); else return new CallFunctionExpression(t, _e(), true);
    if (2688016 === ye) return je(t, true);
    throw xs();
}

function Me(t, e) {
    const s = me;
    switch (ye) {
      case 2162700:
        {
            ke = true;
            Oe = false;
            const r = ve;
            const i = Ae;
            const n = ye;
            const o = Ee;
            const c = me;
            const u = Oe;
            const h = ke;
            Ke();
            if (0 === (13312 & ye)) throw vs();
            if (2688007 === ye) return new CallMemberExpression(t, s, _e(), e, true);
            ve = r;
            Ae = i;
            ye = n;
            Ee = o;
            me = c;
            Oe = u;
            ke = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Oe = false;
        return new CallMemberExpression(t, s, _e(), e, false);

      default:
        Oe = !ke;
        Ke();
        return new AccessMemberExpression(t, s, e);
    }
}

function Be(t) {
    Ke();
    const e = ve;
    const s = Ae;
    const r = ye;
    const i = Ee;
    const n = me;
    const o = Oe;
    const c = ke;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === ye) {
            Ke();
            if (4096 !== ye) throw es();
            u.push(new BindingIdentifier(me));
            Ke();
            if (6291471 === ye) throw ms();
            if (7340046 !== ye) throw ts();
            Ke();
            if (50 !== ye) throw ts();
            Ke();
            const t = ke;
            const e = ge;
            ++ge;
            const s = Le(62, 0);
            ke = t;
            ge = e;
            Oe = false;
            return new ArrowFunction(u, s, true);
        }
        switch (ye) {
          case 4096:
            u.push(new BindingIdentifier(me));
            Ke();
            break;

          case 7340046:
            Ke();
            break t;

          case 524296:
          case 2688016:
            Ke();
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
            Ke();
            h = 2;
            break;
        }
        switch (ye) {
          case 6291471:
            Ke();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Ke();
            break t;

          case 4194349:
            if (1 === h) h = 3;
            break t;

          case 50:
            if (a) throw gs();
            Ke();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (50 === ye) {
        if (1 === h) {
            Ke();
            if (524296 === ye) throw Es();
            const t = ke;
            const e = ge;
            ++ge;
            const s = Le(62, 0);
            ke = t;
            ge = e;
            Oe = false;
            return new ArrowFunction(u, s);
        }
        throw gs();
    } else if (1 === h && 0 === u.length) throw bs(50);
    if (a) switch (h) {
      case 2:
        throw gs();

      case 3:
        throw As();

      case 4:
        throw ys();
    }
    ve = e;
    Ae = s;
    ye = r;
    Ee = i;
    me = n;
    Oe = o;
    ke = c;
    const l = ke;
    const f = Le(62, t);
    ke = l;
    Ye(7340046);
    if (50 === ye) switch (h) {
      case 2:
        throw gs();

      case 3:
        throw As();

      case 4:
        throw ys();
    }
    return f;
}

function Te(t) {
    const e = ke;
    Ke();
    const s = new Array;
    while (7340051 !== ye) if (Xe(6291471)) {
        s.push(pe);
        if (7340051 === ye) break;
    } else {
        s.push(Le(62, ~2 & t));
        if (Xe(6291471)) {
            if (7340051 === ye) break;
        } else break;
    }
    ke = e;
    Ye(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Oe = false;
        return new ArrayLiteralExpression(s);
    }
}

function De(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw as();
    if (4204593 !== ye) throw as();
    Ke();
    const e = t;
    const s = Le(61, 4);
    return new ForOfStatement(e, s, Ce);
}

function Ve(t) {
    const e = ke;
    const s = new Array;
    const r = new Array;
    Ke();
    while (7340045 !== ye) {
        s.push(me);
        if (49152 & ye) {
            Ke();
            Ye(6291476);
            r.push(Le(62, ~2 & t));
        } else if (12288 & ye) {
            const e = Ee;
            const s = ye;
            const i = ve;
            Ke();
            if (Xe(6291476)) r.push(Le(62, ~2 & t)); else {
                Ee = e;
                ye = s;
                ve = i;
                r.push(Le(515, ~2 & t));
            }
        } else throw ls();
        if (7340045 !== ye) Ye(6291471);
    }
    ke = e;
    Ye(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Oe = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function Fe() {
    const t = [];
    const e = [];
    const s = xe;
    let r = "";
    while (ve < s) {
        switch (Ee) {
          case 36:
            if (123 === $e(ve + 1)) {
                t.push(r);
                r = "";
                ve += 2;
                Ee = $e(ve);
                Ke();
                const s = Le(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += Se(he(We()));
            break;

          default:
            r += Se(Ee);
        }
        We();
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
    Ye(2163760);
    const n = [ Le(62, t) ];
    while (2163759 !== (ye = Qe())) {
        i.push(me);
        Ye(2163760);
        n.push(Le(62, t));
    }
    i.push(me);
    Oe = false;
    ke = r;
    if (s) {
        Ke();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Ke();
        return new TemplateExpression(i, n);
    }
}

function ze(t) {
    Oe = false;
    const e = [ me ];
    Ke();
    return new TaggedTemplateExpression(e, e, t);
}

function Ke() {
    while (ve < xe) {
        Ae = ve;
        if (null != (ye = Ps[Ee]())) return;
    }
    ye = 6291456;
}

function We() {
    return Ee = $e(++ve);
}

function qe() {
    while (Ls[We()]) ;
    const t = Cs[me = Re()];
    return void 0 === t ? 4096 : t;
}

function Je(t) {
    let e = Ee;
    if (false === t) {
        do {
            e = We();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            me = parseInt(Re(), 10);
            return 32768;
        }
        e = We();
        if (ve >= xe) {
            me = parseInt(Re().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = We();
    } while (e <= 57 && e >= 48); else Ee = $e(--ve);
    me = parseFloat(Re());
    return 32768;
}

function Ge() {
    const t = Ee;
    We();
    let e = 0;
    const s = new Array;
    let r = ve;
    while (Ee !== t) if (92 === Ee) {
        s.push(de.slice(r, ve));
        We();
        e = he(Ee);
        We();
        s.push(Se(e));
        r = ve;
    } else if (ve >= xe) throw fs(); else We();
    const i = de.slice(r, ve);
    We();
    s.push(i);
    const n = s.join("");
    me = n;
    return 16384;
}

function He() {
    let t = true;
    let e = "";
    while (96 !== We()) if (36 === Ee) if (ve + 1 < xe && 123 === $e(ve + 1)) {
        ve++;
        t = false;
        break;
    } else e += "$"; else if (92 === Ee) e += Se(he(We())); else {
        if (ve >= xe) throw ps();
        e += Se(Ee);
    }
    We();
    me = e;
    if (t) return 2163759;
    return 2163760;
}

const Qe = () => {
    if (ve >= xe) throw ps();
    ve--;
    return He();
};

const Xe = t => {
    if (ye === t) {
        Ke();
        return true;
    }
    return false;
};

const Ye = t => {
    if (ye === t) Ke(); else throw bs(t);
};

const Ze = () => i(`AUR0151:${de}`);

const ts = () => i(`AUR0152:${de}`);

const es = () => i(`AUR0153:${de}`);

const ss = () => i(`AUR0154:${de}`);

const rs = () => i(`AUR0155:${de}`);

const is = () => i(`AUR0156:${de}`);

const ns = () => i(`AUR0157`);

const os = () => i(`AUR0158:${de}`);

const cs = () => i(`AUR0159:${de}`);

const us = () => i(`AUR0160:${de}`);

const hs = () => i(`AUR0161:${de}`);

const as = () => i(`AUR0163:${de}`);

const ls = () => i(`AUR0164:${de}`);

const fs = () => i(`AUR0165:${de}`);

const ps = () => i(`AUR0166:${de}`);

const bs = t => i(`AUR0167:${de}<${ks[63 & t]}`);

const ws = () => {
    throw i(`AUR0168:${de}`);
};

ws.notMapped = true;

const ds = () => i(`AUR0170:${de}`);

const vs = () => i(`AUR0171:${de}`);

const xs = () => i(`AUR0172:${de}`);

const gs = () => i(`AUR0173:${de}`);

const As = () => i(`AUR0174:${de}`);

const ys = () => i(`AUR0175:${de}`);

const ms = () => i(`AUR0176:${de}`);

const Es = () => i(`AUR0178:${de}`);

const Os = () => i(`AUR0179:${de}`);

const ks = [ ae, le, fe, pe, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", ";", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163759, 2163760, "of", "=>" ];

const Cs = Object.assign(Object.create(null), {
    true: 8193,
    null: 8194,
    false: 8192,
    undefined: 8195,
    $this: 12292,
    $parent: 12294,
    in: 6562212,
    instanceof: 6562213,
    typeof: 139304,
    void: 139305,
    of: 4204593
});

const Ss = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

const $s = (t, e, s, r) => {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
};

const Rs = t => () => {
    We();
    return t;
};

const Us = new Set;

$s(null, Us, Ss.AsciiIdPart, true);

const Ls = new Uint8Array(65535);

$s(Ls, null, Ss.IdStart, 1);

$s(Ls, null, Ss.Digit, 1);

const Ps = new Array(65535);

Ps.fill(ws, 0, 65535);

$s(Ps, null, Ss.Skip, (() => {
    We();
    return null;
}));

$s(Ps, null, Ss.IdStart, qe);

$s(Ps, null, Ss.Digit, (() => Je(false)));

Ps[34] = Ps[39] = () => Ge();

Ps[96] = () => He();

Ps[33] = () => {
    if (61 !== We()) return 131118;
    if (61 !== We()) return 6553949;
    We();
    return 6553951;
};

Ps[61] = () => {
    if (62 === We()) {
        We();
        return 50;
    }
    if (61 !== Ee) return 4194349;
    if (61 !== We()) return 6553948;
    We();
    return 6553950;
};

Ps[38] = () => {
    if (38 !== We()) return 6291479;
    We();
    return 6553883;
};

Ps[124] = () => {
    if (124 !== We()) return 6291480;
    We();
    return 6553818;
};

Ps[63] = () => {
    if (46 === We()) {
        const t = $e(ve + 1);
        if (t <= 48 || t >= 57) {
            We();
            return 2162700;
        }
        return 6291478;
    }
    if (63 !== Ee) return 6291478;
    We();
    return 6553753;
};

Ps[46] = () => {
    if (We() <= 57 && Ee >= 48) return Je(true);
    if (46 === Ee) {
        if (46 !== We()) return 10;
        We();
        return 11;
    }
    return 65545;
};

Ps[60] = () => {
    if (61 !== We()) return 6554016;
    We();
    return 6554018;
};

Ps[62] = () => {
    if (61 !== We()) return 6554017;
    We();
    return 6554019;
};

Ps[37] = Rs(6554155);

Ps[40] = Rs(2688007);

Ps[41] = Rs(7340046);

Ps[42] = Rs(6554154);

Ps[43] = Rs(2490854);

Ps[44] = Rs(6291471);

Ps[45] = Rs(2490855);

Ps[47] = Rs(6554156);

Ps[58] = Rs(6291476);

Ps[59] = Rs(6291477);

Ps[91] = Rs(2688016);

Ps[93] = Rs(7340051);

Ps[123] = Rs(524296);

Ps[125] = Rs(7340045);

let _s = null;

const js = [];

let Is = false;

function Ms() {
    Is = false;
}

function Bs() {
    Is = true;
}

function Ts() {
    return _s;
}

function Ds(t) {
    if (null == t) throw i(`AUR0206`);
    if (null == _s) {
        _s = t;
        js[0] = _s;
        Is = true;
        return;
    }
    if (_s === t) throw i(`AUR0207`);
    js.push(t);
    _s = t;
    Is = true;
}

function Vs(t) {
    if (null == t) throw i(`AUR0208`);
    if (_s !== t) throw i(`AUR0209`);
    js.pop();
    _s = js.length > 0 ? js[js.length - 1] : null;
    Is = null != _s;
}

const Fs = Object.freeze({
    get current() {
        return _s;
    },
    get connecting() {
        return Is;
    },
    enter: Ds,
    exit: Vs,
    pause: Ms,
    resume: Bs
});

const Ns = Reflect.get;

const zs = Object.prototype.toString;

const Ks = new WeakMap;

function Ws(t) {
    switch (zs.call(t)) {
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

function Js(t) {
    return Ws(t) ? Gs(t) : t;
}

function Gs(t) {
    return Ks.get(t) ?? Ys(t);
}

function Hs(t) {
    return t[qs] ?? t;
}

function Qs(t) {
    return Ws(t) && t[qs] || t;
}

function Xs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Ys(t) {
    const e = c(t) ? tr : h(t) || u(t) ? Er : Zs;
    const s = new Proxy(t, e);
    Ks.set(t, s);
    return s;
}

const Zs = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = Ts();
        if (!Is || Xs(e) || null == r) return Ns(t, e, s);
        r.observe(t, e);
        return Js(Ns(t, e, s));
    }
};

const tr = {
    get(t, e, s) {
        if (e === qs) return t;
        if (!Is || Xs(e) || null == _s) return Ns(t, e, s);
        switch (e) {
          case "length":
            _s.observe(t, "length");
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
            return yr;

          case "reduceRight":
            return mr;

          case "reverse":
            return vr;

          case "shift":
            return br;

          case "unshift":
            return wr;

          case "slice":
            return Ar;

          case "splice":
            return dr;

          case "some":
            return xr;

          case "sort":
            return gr;

          case "keys":
            return Lr;

          case "values":
          case Symbol.iterator:
            return Pr;

          case "entries":
            return _r;
        }
        _s.observe(t, e);
        return Js(Ns(t, e, s));
    },
    ownKeys(t) {
        Ts()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function er(t, e) {
    const s = Hs(this);
    const r = s.map(((s, r) => Qs(t.call(e, Js(s), r, this))));
    jr(_s, s);
    return Js(r);
}

function sr(t, e) {
    const s = Hs(this);
    const r = s.every(((s, r) => t.call(e, Js(s), r, this)));
    jr(_s, s);
    return r;
}

function rr(t, e) {
    const s = Hs(this);
    const r = s.filter(((s, r) => Qs(t.call(e, Js(s), r, this))));
    jr(_s, s);
    return Js(r);
}

function ir(t) {
    const e = Hs(this);
    const s = e.includes(Qs(t));
    jr(_s, e);
    return s;
}

function nr(t) {
    const e = Hs(this);
    const s = e.indexOf(Qs(t));
    jr(_s, e);
    return s;
}

function or(t) {
    const e = Hs(this);
    const s = e.lastIndexOf(Qs(t));
    jr(_s, e);
    return s;
}

function cr(t, e) {
    const s = Hs(this);
    const r = s.findIndex(((s, r) => Qs(t.call(e, Js(s), r, this))));
    jr(_s, s);
    return r;
}

function ur(t, e) {
    const s = Hs(this);
    const r = s.find(((e, s) => t(Js(e), s, this)), e);
    jr(_s, s);
    return Js(r);
}

function hr() {
    const t = Hs(this);
    jr(_s, t);
    return Js(t.flat());
}

function ar(t, e) {
    const s = Hs(this);
    jr(_s, s);
    return Gs(s.flatMap(((s, r) => Js(t.call(e, Js(s), r, this)))));
}

function lr(t) {
    const e = Hs(this);
    jr(_s, e);
    return e.join(t);
}

function fr() {
    return Js(Hs(this).pop());
}

function pr(...t) {
    return Hs(this).push(...t);
}

function br() {
    return Js(Hs(this).shift());
}

function wr(...t) {
    return Hs(this).unshift(...t);
}

function dr(...t) {
    return Js(Hs(this).splice(...t));
}

function vr(...t) {
    const e = Hs(this);
    const s = e.reverse();
    jr(_s, e);
    return Js(s);
}

function xr(t, e) {
    const s = Hs(this);
    const r = s.some(((s, r) => Qs(t.call(e, Js(s), r, this))));
    jr(_s, s);
    return r;
}

function gr(t) {
    const e = Hs(this);
    const s = e.sort(t);
    jr(_s, e);
    return Js(s);
}

function Ar(t, e) {
    const s = Hs(this);
    jr(_s, s);
    return Gs(s.slice(t, e));
}

function yr(t, e) {
    const s = Hs(this);
    const r = s.reduce(((e, s, r) => t(e, Js(s), r, this)), e);
    jr(_s, s);
    return Js(r);
}

function mr(t, e) {
    const s = Hs(this);
    const r = s.reduceRight(((e, s, r) => t(e, Js(s), r, this)), e);
    jr(_s, s);
    return Js(r);
}

const Er = {
    get(t, e, s) {
        if (e === qs) return t;
        const r = Ts();
        if (!Is || Xs(e) || null == r) return Ns(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Rr;

          case "delete":
            return Ur;

          case "forEach":
            return Or;

          case "add":
            if (t instanceof Set) return $r;
            break;

          case "get":
            if (h(t)) return Cr;
            break;

          case "set":
            if (h(t)) return Sr;
            break;

          case "has":
            return kr;

          case "keys":
            return Lr;

          case "values":
            return Pr;

          case "entries":
            return _r;

          case Symbol.iterator:
            return h(t) ? _r : Pr;
        }
        return Js(Ns(t, e, s));
    }
};

function Or(t, e) {
    const s = Hs(this);
    jr(_s, s);
    return s.forEach(((s, r) => {
        t.call(e, Js(s), Js(r), this);
    }));
}

function kr(t) {
    const e = Hs(this);
    jr(_s, e);
    return e.has(Qs(t));
}

function Cr(t) {
    const e = Hs(this);
    jr(_s, e);
    return Js(e.get(Qs(t)));
}

function Sr(t, e) {
    return Js(Hs(this).set(Qs(t), Qs(e)));
}

function $r(t) {
    return Js(Hs(this).add(Qs(t)));
}

function Rr() {
    return Js(Hs(this).clear());
}

function Ur(t) {
    return Js(Hs(this).delete(Qs(t)));
}

function Lr() {
    const t = Hs(this);
    jr(_s, t);
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
                value: Js(s),
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
    jr(_s, t);
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
                value: Js(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function _r() {
    const t = Hs(this);
    jr(_s, t);
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
                value: [ Js(s[0]), Js(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const jr = (t, e) => t?.observeCollection(e);

const Ir = Object.freeze({
    getProxy: Gs,
    getRaw: Hs,
    wrap: Js,
    unwrap: Qs,
    rawKey: qs
});

class ComputedObserver {
    constructor(t, e, s, r, i) {
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
        if (!a(e, t)) {
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
            return this.v = Qs(this.$get.call(this.up ? Js(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Vs(this);
        }
    }
}

ce(ComputedObserver);

z(ComputedObserver);

let Mr;

const Br = b("IDirtyChecker", (t => t.singleton(DirtyChecker)));

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

const Dr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (Tr.disabled) return;
            if (++this.O < Tr.timeoutsPerCheck) return;
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
        if (Tr.throw) throw i(`AUR0222:${p(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Dr);
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
        throw i(`Trying to set value for property ${p(this.key)} in dirty checker`);
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

z(DirtyCheckProperty);

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
            if (a(t, this.v)) return;
            Vr = this.v;
            this.v = t;
            this.subs.notify(t, Vr);
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
        if (!a(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.cb?.call(this.o, this.v, this.ov);
            Vr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Vr);
        }
    }
}

z(SetterObserver);

z(SetterNotifier);

let Vr;

const Fr = new PropertyAccessor;

const Nr = b("IObserverLocator", (t => t.singleton(ObserverLocator)));

const zr = b("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

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
        this.$ = [];
        this.C = t;
        this.R = e;
    }
    addAdapter(t) {
        this.$.push(t);
    }
    getObserver(t, e) {
        if (null == t) throw Gr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Jr(t);
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
        return Fr;
    }
    getArrayObserver(t) {
        return xt(t);
    }
    getMapObserver(t) {
        return Xt(t);
    }
    getSetObserver(t) {
        return Mt(t);
    }
    createObserver(e, r) {
        if (this.R.handles(e, r, this)) return this.R.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (c(e)) return xt(e).getLengthObserver();
            break;

          case "size":
            if (h(e)) return Xt(e).getLengthObserver(); else if (u(e)) return Mt(e).getLengthObserver();
            break;

          default:
            if (c(e) && t.isArrayIndex(r)) return xt(e).getIndexObserver(Number(r));
            break;
        }
        let i = qr(e, r);
        if (void 0 === i) {
            let t = Wr(e);
            while (null !== t) {
                i = qr(t, r);
                if (void 0 === i) t = Wr(t); else break;
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

ObserverLocator.inject = [ Br, zr ];

const Kr = t => {
    let e;
    if (c(t)) e = xt(t); else if (h(t)) e = Xt(t); else if (u(t)) e = Mt(t);
    return e;
};

const Wr = Object.getPrototypeOf;

const qr = Object.getOwnPropertyDescriptor;

const Jr = t => {
    let e = t.$observers;
    if (void 0 === e) r(t, "$observers", {
        enumerable: false,
        value: e = w()
    });
    return e;
};

const Gr = t => i(`AUR0199:${p(t)}`);

const Hr = b("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Nr ];
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
            Ds(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Vs(this);
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

ce(Effect);

function Qr(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Xr = {};

function Yr(t, e, s) {
    if (null == e) return (e, s, r) => n(e, s, r, t);
    return n(t, e, s);
    function n(t, e, s, n) {
        const o = void 0 === e;
        n = "object" !== typeof n ? {
            name: n
        } : n || {};
        if (o) e = n.name;
        if (null == e || "" === e) throw i(`AUR0224`);
        const c = n.callback || `${p(e)}Changed`;
        let u = Xr;
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
            const s = Zr(this, e, c, u, h);
            Ts()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Zr(this, e, c, u, h).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Zr(s, e, c, u, h);
        };
        if (o) r(t.prototype, e, s); else return s;
    }
}

function Zr(t, e, s, r, i) {
    const n = Qr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Xr ? void 0 : r);
        n[e] = o;
    }
    return o;
}

const ti = b("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = w();
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

exports.ConnectableSwitcher = Fs;

exports.CustomExpression = CustomExpression;

exports.DestructuringAssignmentExpression = DestructuringAssignmentExpression;

exports.DestructuringAssignmentRestExpression = DestructuringAssignmentRestExpression;

exports.DestructuringAssignmentSingleExpression = DestructuringAssignmentSingleExpression;

exports.DirtyCheckProperty = DirtyCheckProperty;

exports.DirtyCheckSettings = Tr;

exports.ForOfStatement = ForOfStatement;

exports.ICoercionConfiguration = _;

exports.IDirtyChecker = Br;

exports.IExpressionParser = ue;

exports.INodeObserverLocator = zr;

exports.IObservation = Hr;

exports.IObserverLocator = Nr;

exports.ISignaler = ti;

exports.Interpolation = Interpolation;

exports.MapObserver = MapObserver;

exports.ObjectBindingPattern = ObjectBindingPattern;

exports.ObjectLiteralExpression = ObjectLiteralExpression;

exports.Observation = Observation;

exports.ObserverLocator = ObserverLocator;

exports.PrimitiveLiteralExpression = PrimitiveLiteralExpression;

exports.PrimitiveObserver = PrimitiveObserver;

exports.PropertyAccessor = PropertyAccessor;

exports.ProxyObservable = Ir;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.Unparser = Unparser;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = At;

exports.astAssign = E;

exports.astBind = O;

exports.astEvaluate = m;

exports.astUnbind = k;

exports.astVisit = x;

exports.batch = V;

exports.cloneIndexMap = M;

exports.connectable = ce;

exports.copyIndexMap = j;

exports.createIndexMap = I;

exports.disableArrayObservation = vt;

exports.disableMapObservation = Qt;

exports.disableSetObservation = It;

exports.enableArrayObservation = dt;

exports.enableMapObservation = Ht;

exports.enableSetObservation = jt;

exports.getCollectionObserver = Kr;

exports.getObserverLookup = Jr;

exports.isIndexMap = B;

exports.observable = Yr;

exports.parseExpression = Ue;

exports.subscriberCollection = z;

exports.synchronizeIndices = yt;
//# sourceMappingURL=index.cjs.map
