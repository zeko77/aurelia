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

const u = Object.is;

function h(t, e, s) {
    r(t, e, {
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

const f = t.DI.createInterface;

const p = () => Object.create(null);

const b = e.Metadata.getOwn;

e.Metadata.hasOwn;

const w = e.Metadata.define;

t.Protocol.annotation.keyFor;

t.Protocol.resource.keyFor;

t.Protocol.resource.appendTo;

const d = (t, e) => {
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
        d(t, e);
        return e.text;
    }
    visitAccessMember(t) {
        d(t.object, this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        d(t.object, this);
        this.text += `${t.optional ? "?." : ""}[`;
        d(t.key, this);
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
            d(e[t], this);
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
        d(t.body, this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            d(s[t], this);
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
        d(t.func, this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        d(t.object, this);
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
            d(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        d(t.func, this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            d(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        d(t.expression, this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        d(t.left, this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        d(t.right, this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        d(t.condition, this);
        this.text += "?";
        d(t.yes, this);
        this.text += ":";
        d(t.no, this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        d(t.target, this);
        this.text += "=";
        d(t.value, this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        d(t.expression, this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            d(e[t], this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        d(t.expression, this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            d(e[t], this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            d(e[t], this);
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
            d(s[t], this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitForOfStatement(t) {
        d(t.declaration, this);
        this.text += " of ";
        d(t.iterable, this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            d(s[t], this);
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
                d(o, this);
                break;

              case 24:
              case 25:
                {
                    const t = o.source;
                    if (t) {
                        d(t, this);
                        this.text += ":";
                    }
                    d(o, this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        d(t.source, this);
        this.text += ":";
        d(t.target, this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            d(e, this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        d(t.target, this);
    }
    visitCustom(t) {
        this.text += l(t.value);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            d(t[e], this);
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
        if (null == t) throw v();
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
        if (null == t) throw x();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw v();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const v = () => i(`AUR0203`);

const x = () => i("AUR0204");

class OverrideContext {}

const g = f("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = p();
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

const A = Scope.getContext;

function y(t, e, s, r) {
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
            const o = A(e, t.name, t.ancestor);
            if (null !== r) r.observe(o, t.name);
            const c = o[t.name];
            if (null == c && "$host" === t.name) throw i(`AUR0105`);
            if (s?.strict) return s?.boundFn && n(c) ? c.bind(o) : c;
            return null == c ? "" : s?.boundFn && n(c) ? c.bind(o) : c;
        }

      case 2:
        return t.elements.map((t => y(t, e, s, r)));

      case 3:
        {
            const i = {};
            for (let n = 0; n < t.keys.length; ++n) i[t.keys[n]] = y(t.values[n], e, s, r);
            return i;
        }

      case 4:
        return t.value;

      case 5:
        {
            let i = t.cooked[0];
            for (let n = 0; n < t.expressions.length; ++n) {
                i += String(y(t.expressions[n], e, s, r));
                i += t.cooked[n + 1];
            }
            return i;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void y(t.expression, e, s, r);

          case "typeof":
            return typeof y(t.expression, e, s, r);

          case "!":
            return !y(t.expression, e, s, r);

          case "-":
            return -y(t.expression, e, s, r);

          case "+":
            return +y(t.expression, e, s, r);

          default:
            throw i(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const i = t.args.map((t => y(t, e, s, r)));
            const n = A(e, t.name, t.ancestor);
            const o = $(s?.strictFnCall, n, t.name);
            if (o) return o.apply(n, i);
            return;
        }

      case 8:
        {
            const i = y(t.object, e, s, r);
            const n = t.args.map((t => y(t, e, s, r)));
            const o = $(s?.strictFnCall, i, t.name);
            let u;
            if (o) {
                u = o.apply(i, n);
                if (c(i) && L.includes(t.name)) r?.observeCollection(i);
            }
            return u;
        }

      case 9:
        {
            const o = y(t.func, e, s, r);
            if (n(o)) return o(...t.args.map((t => y(t, e, s, r))));
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
                return y(t.body, h, s, r);
            };
            return i;
        }

      case 10:
        {
            const i = y(t.object, e, s, r);
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
            const i = y(t.object, e, s, r);
            if (i instanceof Object) {
                const n = y(t.key, e, s, r);
                if (null !== r) r.observe(i, n);
                return i[n];
            }
            return;
        }

      case 12:
        {
            const o = t.expressions.map((t => y(t, e, s, r)));
            const c = y(t.func, e, s, r);
            if (!n(c)) throw i(`AUR0110`);
            return c(t.cooked, ...o);
        }

      case 13:
        {
            const o = t.left;
            const c = t.right;
            switch (t.operation) {
              case "&&":
                return y(o, e, s, r) && y(c, e, s, r);

              case "||":
                return y(o, e, s, r) || y(c, e, s, r);

              case "??":
                return y(o, e, s, r) ?? y(c, e, s, r);

              case "==":
                return y(o, e, s, r) == y(c, e, s, r);

              case "===":
                return y(o, e, s, r) === y(c, e, s, r);

              case "!=":
                return y(o, e, s, r) != y(c, e, s, r);

              case "!==":
                return y(o, e, s, r) !== y(c, e, s, r);

              case "instanceof":
                {
                    const t = y(c, e, s, r);
                    if (n(t)) return y(o, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = y(c, e, s, r);
                    if (t instanceof Object) return y(o, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = y(o, e, s, r);
                    const i = y(c, e, s, r);
                    if (s?.strict) return t + i;
                    if (!t || !i) {
                        if (R(t) || R(i)) return (t || 0) + (i || 0);
                        if (U(t) || U(i)) return (t || "") + (i || "");
                    }
                    return t + i;
                }

              case "-":
                return y(o, e, s, r) - y(c, e, s, r);

              case "*":
                return y(o, e, s, r) * y(c, e, s, r);

              case "/":
                return y(o, e, s, r) / y(c, e, s, r);

              case "%":
                return y(o, e, s, r) % y(c, e, s, r);

              case "<":
                return y(o, e, s, r) < y(c, e, s, r);

              case ">":
                return y(o, e, s, r) > y(c, e, s, r);

              case "<=":
                return y(o, e, s, r) <= y(c, e, s, r);

              case ">=":
                return y(o, e, s, r) >= y(c, e, s, r);

              default:
                throw i(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return y(t.condition, e, s, r) ? y(t.yes, e, s, r) : y(t.no, e, s, r);

      case 15:
        return m(t.target, e, s, y(t.value, e, s, r));

      case 17:
        {
            const n = s?.getConverter?.(t.name);
            if (null == n) throw i(`AUR0103:${t.name}`);
            if ("toView" in n) return n.toView(y(t.expression, e, s, r), ...t.args.map((t => y(t, e, s, r))));
            return y(t.expression, e, s, r);
        }

      case 18:
        return y(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return y(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let i = t.parts[0];
            let n = 0;
            for (;n < t.expressions.length; ++n) {
                i += l(y(t.expressions[n], e, s, r));
                i += t.parts[n + 1];
            }
            return i;
        } else return `${t.parts[0]}${y(t.firstExpression, e, s, r)}${t.parts[1]}`;

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

function m(e, s, r, n) {
    switch (e.$kind) {
      case 1:
        {
            if ("$host" === e.name) throw i(`AUR0106`);
            const t = A(s, e.name, e.ancestor);
            if (t instanceof Object) if (void 0 !== t.$observers?.[e.name]) {
                t.$observers[e.name].setValue(n);
                return n;
            } else return t[e.name] = n;
            return;
        }

      case 10:
        {
            const t = y(e.object, s, r, null);
            if (t instanceof Object) if (void 0 !== t.$observers?.[e.name]) t.$observers[e.name].setValue(n); else t[e.name] = n; else m(e.object, s, r, {
                [e.name]: n
            });
            return n;
        }

      case 11:
        {
            const t = y(e.object, s, r, null);
            const i = y(e.key, s, r, null);
            return t[i] = n;
        }

      case 15:
        m(e.value, s, r, n);
        return m(e.target, s, r, n);

      case 17:
        {
            const t = r?.getConverter?.(e.name);
            if (null == t) throw S(e.name);
            if ("fromView" in t) n = t.fromView(n, ...e.args.map((t => y(t, s, r, null))));
            return m(e.expression, s, r, n);
        }

      case 18:
        return m(e.expression, s, r, n);

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
                    m(u, s, r, n);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof n || null === n) throw i(`AUR0112`);
                        let t = y(u.source, Scope.create(n), r, null);
                        if (void 0 === t && u.initializer) t = y(u.initializer, s, r, null);
                        m(u, s, r, t);
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
            let t = y(e.source, Scope.create(n), r, null);
            if (void 0 === t && e.initializer) t = y(e.initializer, s, r, null);
            m(e.target, s, r, t);
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
            m(e.target, s, r, c);
        }
        break;

      case 28:
        return e.assign(s, r, n);

      default:
        return;
    }
}

function E(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const i = t.key;
            const n = s.getBehavior?.(r);
            if (null == n) throw k(r);
            if (void 0 === s[i]) {
                s[i] = n;
                n.bind?.(e, s, ...t.args.map((t => y(t, e, s, null))));
            } else throw C(r);
            E(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const i = s.getConverter?.(r);
            if (null == i) throw S(r);
            const n = i.signals;
            if (null != n) {
                const t = s.get?.(g);
                const e = n.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(n[r], s);
            }
            E(t.expression, e, s);
            return;
        }

      case 22:
        E(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function O(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const i = s;
            if (void 0 !== i[r]) {
                i[r].unbind?.(e, s);
                i[r] = void 0;
            }
            O(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const i = s.get(g);
            let n = 0;
            for (;n < r.signals.length; ++n) i.removeSignalListener(r.signals[n], s);
            O(t.expression, e, s);
            break;
        }

      case 22:
        O(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const k = t => i(`AUR0101:${t}`);

const C = t => i(`AUR0102:${t}`);

const S = t => i(`AUR0103:${t}`);

const $ = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (n(r)) return r;
    if (!t && null == r) return null;
    throw i(`AUR0111:${s}`);
};

const R = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const U = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const L = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const P = t.DI.createInterface("ICoercionConfiguration");

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

function _(t, e, s) {
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

function M(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function j(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function I(t) {
    return c(t) && true === t.isIndexMap;
}

let B = new Map;

let T = false;

function D(t) {
    const e = B;
    const s = B = new Map;
    T = true;
    try {
        t();
    } finally {
        B = null;
        T = false;
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
            B = e;
        }
    }
}

function V(t, e, s) {
    if (!B.has(t)) B.set(t, [ 2, e, s ]);
}

function F(t, e, s) {
    const r = B.get(t);
    if (void 0 === r) B.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function N(t) {
    return null == t ? z : z(t);
}

function z(t) {
    const e = t.prototype;
    r(e, "subs", {
        get: K
    });
    a(e, "subscribe", W);
    a(e, "unsubscribe", q);
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
        if (T) {
            F(this, t, e);
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

function K() {
    return h(this, "subs", new SubscriberRecord);
}

function W(t) {
    return this.subs.add(t);
}

function q(t) {
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

function J(t) {
    const e = t.prototype;
    a(e, "subscribe", G);
    a(e, "unsubscribe", H);
    N(t);
}

function G(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function H(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

J(CollectionLengthObserver);

J(CollectionSizeObserver);

const Q = "__au_array_obs__";

const X = (() => {
    let t = b(Q, Array);
    if (null == t) w(Q, t = new WeakMap, Array);
    return t;
})();

function Y(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function Z(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function tt(t, e, s, r, i) {
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

function et(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let p, b, w;
    let d, v;
    let x, g, A, y;
    let m, E, O, k;
    while (true) {
        if (r - s <= 10) {
            tt(t, e, s, r, i);
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
            et(t, e, y, r, i);
            r = A;
        } else {
            et(t, e, s, A, i);
            s = y;
        }
    }
}

const st = Array.prototype;

const rt = st.push;

const it = st.unshift;

const nt = st.pop;

const ot = st.shift;

const ct = st.splice;

const ut = st.reverse;

const ht = st.sort;

const at = {
    push: rt,
    unshift: it,
    pop: nt,
    shift: ot,
    splice: ct,
    reverse: ut,
    sort: ht
};

const lt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const ft = {
    push: function(...t) {
        const e = X.get(this);
        if (void 0 === e) return rt.apply(this, t);
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
        if (void 0 === e) return it.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        it.apply(e.indexMap, r);
        const n = it.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = X.get(this);
        if (void 0 === t) return nt.call(this);
        const e = t.indexMap;
        const s = nt.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        nt.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = X.get(this);
        if (void 0 === t) return ot.call(this);
        const e = t.indexMap;
        const s = ot.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        ot.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = X.get(this);
        if (void 0 === r) return ct.apply(this, t);
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
            ct.call(c, e, s, ...r);
        } else ct.apply(c, t);
        const l = ct.apply(this, t);
        if (h > 0 || a > 0) r.notify();
        return l;
    },
    reverse: function() {
        const t = X.get(this);
        if (void 0 === t) {
            ut.call(this);
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
            ht.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        et(this, e.indexMap, 0, s, Z);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !n(t)) t = Y;
        et(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of lt) r(ft[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let pt = false;

const bt = "__au_arr_on__";

function wt() {
    if (!(b(bt, Array) ?? false)) {
        w(bt, true, Array);
        for (const t of lt) if (true !== st[t].observing) h(st, t, ft[t]);
    }
}

function dt() {
    for (const t of lt) if (true === st[t].observing) h(st, t, at[t]);
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
        this.indexMap = M(t.length);
        this.lenObs = void 0;
        X.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (T) {
            V(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = M(r);
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

N(ArrayObserver);

N(ArrayIndexObserver);

function vt(t) {
    let e = X.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const xt = (t, e) => t - e;

function gt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = j(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(xt);
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

const yt = "__au_set_obs__";

const mt = (() => {
    let t = b(yt, Set);
    if (null == t) w(yt, t = new WeakMap, Set);
    return t;
})();

const Et = Set.prototype;

const Ot = Et.add;

const kt = Et.clear;

const Ct = Et.delete;

const St = {
    add: Ot,
    clear: kt,
    delete: Ct
};

const $t = [ "add", "clear", "delete" ];

const Rt = {
    add: function(t) {
        const e = mt.get(this);
        if (void 0 === e) {
            Ot.call(this, t);
            return this;
        }
        const s = this.size;
        Ot.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = mt.get(this);
        if (void 0 === t) return kt.call(this);
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
            kt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = mt.get(this);
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

const Ut = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of $t) r(Rt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Lt = false;

const Pt = "__au_set_on__";

function _t() {
    if (!(b(Pt, Set) ?? false)) {
        w(Pt, true, Set);
        for (const t of $t) if (true !== Et[t].observing) r(Et, t, {
            ...Ut,
            value: Rt[t]
        });
    }
}

function Mt() {
    for (const t of $t) if (true === Et[t].observing) r(Et, t, {
        ...Ut,
        value: St[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Lt) {
            Lt = true;
            _t();
        }
        this.collection = t;
        this.indexMap = M(t.size);
        this.lenObs = void 0;
        mt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (T) {
            V(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = M(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

N(SetObserver);

function jt(t) {
    let e = mt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const It = "__au_map_obs__";

const Bt = (() => {
    let t = b(It, Map);
    if (null == t) w(It, t = new WeakMap, Map);
    return t;
})();

const Tt = Map.prototype;

const Dt = Tt.set;

const Vt = Tt.clear;

const Ft = Tt.delete;

const Nt = {
    set: Dt,
    clear: Vt,
    delete: Ft
};

const zt = [ "set", "clear", "delete" ];

const Kt = {
    set: function(t, e) {
        const s = Bt.get(this);
        if (void 0 === s) {
            Dt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Dt.call(this, t, e);
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
        const t = Bt.get(this);
        if (void 0 === t) return Vt.call(this);
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
            Vt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Bt.get(this);
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

const Wt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of zt) r(Kt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let qt = false;

const Jt = "__au_map_on__";

function Gt() {
    if (!(b(Jt, Map) ?? false)) {
        w(Jt, true, Map);
        for (const t of zt) if (true !== Tt[t].observing) r(Tt, t, {
            ...Wt,
            value: Kt[t]
        });
    }
}

function Ht() {
    for (const t of zt) if (true === Tt[t].observing) r(Tt, t, {
        ...Wt,
        value: Nt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!qt) {
            qt = true;
            Gt();
        }
        this.collection = t;
        this.indexMap = M(t.size);
        this.lenObs = void 0;
        Bt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (T) {
            V(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = M(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

N(MapObserver);

function Qt(t) {
    let e = Bt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function Xt(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function Yt() {
    return h(this, "obs", new BindingObserverRecord(this));
}

function Zt(t) {
    let e;
    if (c(t)) e = vt(t); else if (t instanceof Set) e = jt(t); else if (t instanceof Map) e = Qt(t); else throw i(`AUR0210`);
    this.obs.add(e);
}

function te(t) {
    this.obs.add(t);
}

function ee() {
    throw i(`AUR2011:handleChange`);
}

function se() {
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
        this.o.forEach(ie, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(re, this);
        this.o.clear();
        this.count = 0;
    }
}

function re(t, e) {
    e.unsubscribe(this.b);
}

function ie(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this.b);
        this.o.delete(e);
    }
}

function ne(t) {
    const e = t.prototype;
    a(e, "observe", Xt);
    a(e, "observeCollection", Zt);
    a(e, "subscribeTo", te);
    r(e, "obs", {
        get: Yt
    });
    a(e, "handleChange", ee);
    a(e, "handleCollectionChange", se);
    return t;
}

function oe(t) {
    return null == t ? ne : ne(t);
}

const ce = f("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = p();
        this.u = p();
        this.h = p();
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
                throw rs();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        we = t;
        de = 0;
        ve = t.length;
        xe = 0;
        ge = 0;
        Ae = 6291456;
        ye = "";
        me = Ce(0);
        Ee = true;
        Oe = false;
        return Re(61, void 0 === e ? 8 : e);
    }
}

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

const he = PrimitiveLiteralExpression.$false;

const ae = PrimitiveLiteralExpression.$true;

const le = PrimitiveLiteralExpression.$null;

const fe = PrimitiveLiteralExpression.$undefined;

const pe = AccessThisExpression.$this;

const be = AccessThisExpression.$parent;

exports.ExpressionType = void 0;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(exports.ExpressionType || (exports.ExpressionType = {}));

let we = "";

let de = 0;

let ve = 0;

let xe = 0;

let ge = 0;

let Ae = 6291456;

let ye = "";

let me;

let Ee = true;

let Oe = false;

const ke = String.fromCharCode;

const Ce = t => we.charCodeAt(t);

const Se = () => we.slice(ge, de);

function $e(t, e) {
    we = t;
    de = 0;
    ve = t.length;
    xe = 0;
    ge = 0;
    Ae = 6291456;
    ye = "";
    me = Ce(0);
    Ee = true;
    Oe = false;
    return Re(61, void 0 === e ? 8 : e);
}

function Re(t, e) {
    if (16 === e) return new CustomExpression(we);
    if (0 === de) {
        if (1 & e) return De();
        Ne();
        if (4194304 & Ae) throw Xe();
    }
    Ee = 513 > t;
    Oe = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & Ae) {
        const t = Es[63 & Ae];
        Ne();
        r = new UnaryExpression(t, Re(514, e));
        Ee = false;
    } else {
        t: switch (Ae) {
          case 12294:
            i = xe;
            Ee = false;
            do {
                Ne();
                ++i;
                switch (Ae) {
                  case 65545:
                    Ne();
                    if (0 === (12288 & Ae)) throw Ze();
                    break;

                  case 10:
                  case 11:
                    throw Ze();

                  case 2162700:
                    Oe = true;
                    Ne();
                    if (0 === (12288 & Ae)) {
                        r = 0 === i ? pe : 1 === i ? be : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & Ae) {
                        r = 0 === i ? pe : 1 === i ? be : new AccessThisExpression(i);
                        break t;
                    }
                    throw ts();
                }
            } while (12294 === Ae);

          case 4096:
            {
                const t = ye;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Ee = !Oe;
                Ne();
                if (He(49)) {
                    if (524296 === Ae) throw ys();
                    const e = Oe;
                    const s = xe;
                    ++xe;
                    const i = Re(62, 0);
                    Oe = e;
                    xe = s;
                    Ee = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw ms();

          case 11:
            throw Ye();

          case 12292:
            Ee = false;
            Ne();
            switch (xe) {
              case 0:
                r = pe;
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
            r = je(e);
            break;

          case 2688016:
            r = we.search(/\s+of\s+/) > de ? Ue() : Ie(e);
            break;

          case 524296:
            r = Te(e);
            break;

          case 2163758:
            r = new TemplateExpression([ ye ]);
            Ee = false;
            Ne();
            break;

          case 2163759:
            r = Ve(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(ye);
            Ee = false;
            Ne();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Es[63 & Ae];
            Ee = false;
            Ne();
            break;

          default:
            if (de >= ve) throw es(); else throw ss();
        }
        if (2 & e) return Be(r);
        if (514 < t) return r;
        if (10 === Ae || 11 === Ae) throw Ze();
        if (0 === r.$kind) switch (Ae) {
          case 2162700:
            Oe = true;
            Ee = false;
            Ne();
            if (0 === (13312 & Ae)) throw ws();
            if (12288 & Ae) {
                r = new AccessScopeExpression(ye, r.ancestor);
                Ne();
            } else if (2688007 === Ae) r = new CallFunctionExpression(r, Le(), true); else if (2688016 === Ae) r = Pe(r, true); else throw ds();
            break;

          case 65545:
            Ee = !Oe;
            Ne();
            if (0 === (12288 & Ae)) throw Ze();
            r = new AccessScopeExpression(ye, r.ancestor);
            Ne();
            break;

          case 10:
          case 11:
            throw Ze();

          case 2688007:
            r = new CallFunctionExpression(r, Le(), s);
            break;

          case 2688016:
            r = Pe(r, s);
            break;

          case 2163758:
            r = Fe(r);
            break;

          case 2163759:
            r = Ve(e, r, true);
            break;
        }
        while ((65536 & Ae) > 0) switch (Ae) {
          case 2162700:
            r = _e(r);
            break;

          case 65545:
            Ne();
            if (0 === (12288 & Ae)) throw Ze();
            r = Me(r, false);
            break;

          case 10:
          case 11:
            throw Ze();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Le(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Le(), r.optional, false); else r = new CallFunctionExpression(r, Le(), false);
            break;

          case 2688016:
            r = Pe(r, false);
            break;

          case 2163758:
            if (Oe) throw ds();
            r = Fe(r);
            break;

          case 2163759:
            if (Oe) throw ds();
            r = Ve(e, r, true);
            break;
        }
    }
    if (10 === Ae || 11 === Ae) throw Ze();
    if (513 < t) return r;
    while ((262144 & Ae) > 0) {
        const s = Ae;
        if ((960 & s) <= t) break;
        Ne();
        r = new BinaryExpression(Es[63 & s], r, Re(960 & s, e));
        Ee = false;
    }
    if (63 < t) return r;
    if (He(6291477)) {
        const t = Re(62, e);
        Qe(6291476);
        r = new ConditionalExpression(r, t, Re(62, e));
        Ee = false;
    }
    if (62 < t) return r;
    if (He(4194348)) {
        if (!Ee) throw is();
        r = new AssignExpression(r, Re(62, e));
    }
    if (61 < t) return r;
    while (He(6291479)) {
        if (6291456 === Ae) throw ns();
        const t = ye;
        Ne();
        const s = new Array;
        while (He(6291476)) s.push(Re(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (He(6291478)) {
        if (6291456 === Ae) throw os();
        const t = ye;
        Ne();
        const s = new Array;
        while (He(6291476)) s.push(Re(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== Ae) {
        if ((1 & e) > 0 && 7340045 === Ae) return r;
        if ("of" === Se()) throw cs();
        throw ss();
    }
    return r;
}

function Ue() {
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
            s = Se();
            break;

          default:
            throw bs();
        }
    }
    Qe(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(pe, s), new AccessKeyedExpression(pe, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Le() {
    const t = Oe;
    Ne();
    const e = [];
    while (7340046 !== Ae) {
        e.push(Re(62, 0));
        if (!He(6291471)) break;
    }
    Qe(7340046);
    Ee = false;
    Oe = t;
    return e;
}

function Pe(t, e) {
    const s = Oe;
    Ne();
    t = new AccessKeyedExpression(t, Re(62, 0), e);
    Qe(7340051);
    Ee = !s;
    Oe = s;
    return t;
}

function _e(t) {
    Oe = true;
    Ee = false;
    Ne();
    if (0 === (13312 & Ae)) throw ws();
    if (12288 & Ae) return Me(t, true);
    if (2688007 === Ae) if (1 === t.$kind) return new CallScopeExpression(t.name, Le(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Le(), t.optional, true); else return new CallFunctionExpression(t, Le(), true);
    if (2688016 === Ae) return Pe(t, true);
    throw ds();
}

function Me(t, e) {
    const s = ye;
    switch (Ae) {
      case 2162700:
        {
            Oe = true;
            Ee = false;
            const r = de;
            const i = ge;
            const n = Ae;
            const o = me;
            const c = ye;
            const u = Ee;
            const h = Oe;
            Ne();
            if (0 === (13312 & Ae)) throw ws();
            if (2688007 === Ae) return new CallMemberExpression(t, s, Le(), e, true);
            de = r;
            ge = i;
            Ae = n;
            me = o;
            ye = c;
            Ee = u;
            Oe = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Ee = false;
        return new CallMemberExpression(t, s, Le(), e, false);

      default:
        Ee = !Oe;
        Ne();
        return new AccessMemberExpression(t, s, e);
    }
}

function je(t) {
    Ne();
    const e = de;
    const s = ge;
    const r = Ae;
    const i = me;
    const n = ye;
    const o = Ee;
    const c = Oe;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === Ae) {
            Ne();
            if (4096 !== Ae) throw Ze();
            u.push(new BindingIdentifier(ye));
            Ne();
            if (6291471 === Ae) throw As();
            if (7340046 !== Ae) throw Ye();
            Ne();
            if (49 !== Ae) throw Ye();
            Ne();
            const t = Oe;
            const e = xe;
            ++xe;
            const s = Re(62, 0);
            Oe = t;
            xe = e;
            Ee = false;
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
            if (a) throw vs();
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
            if (524296 === Ae) throw ys();
            const t = Oe;
            const e = xe;
            ++xe;
            const s = Re(62, 0);
            Oe = t;
            xe = e;
            Ee = false;
            return new ArrowFunction(u, s);
        }
        throw vs();
    } else if (1 === h && 0 === u.length) throw fs(49);
    if (a) switch (h) {
      case 2:
        throw vs();

      case 3:
        throw xs();

      case 4:
        throw gs();
    }
    de = e;
    ge = s;
    Ae = r;
    me = i;
    ye = n;
    Ee = o;
    Oe = c;
    const l = Oe;
    const f = Re(62, t);
    Oe = l;
    Qe(7340046);
    if (49 === Ae) switch (h) {
      case 2:
        throw vs();

      case 3:
        throw xs();

      case 4:
        throw gs();
    }
    return f;
}

function Ie(t) {
    const e = Oe;
    Ne();
    const s = new Array;
    while (7340051 !== Ae) if (He(6291471)) {
        s.push(fe);
        if (7340051 === Ae) break;
    } else {
        s.push(Re(62, ~2 & t));
        if (He(6291471)) {
            if (7340051 === Ae) break;
        } else break;
    }
    Oe = e;
    Qe(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Ee = false;
        return new ArrayLiteralExpression(s);
    }
}

function Be(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw us();
    if (4204592 !== Ae) throw us();
    Ne();
    const e = t;
    const s = Re(61, 0);
    return new ForOfStatement(e, s);
}

function Te(t) {
    const e = Oe;
    const s = new Array;
    const r = new Array;
    Ne();
    while (7340045 !== Ae) {
        s.push(ye);
        if (49152 & Ae) {
            Ne();
            Qe(6291476);
            r.push(Re(62, ~2 & t));
        } else if (12288 & Ae) {
            const e = me;
            const s = Ae;
            const i = de;
            Ne();
            if (He(6291476)) r.push(Re(62, ~2 & t)); else {
                me = e;
                Ae = s;
                de = i;
                r.push(Re(515, ~2 & t));
            }
        } else throw hs();
        if (7340045 !== Ae) Qe(6291471);
    }
    Oe = e;
    Qe(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Ee = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function De() {
    const t = [];
    const e = [];
    const s = ve;
    let r = "";
    while (de < s) {
        switch (me) {
          case 36:
            if (123 === Ce(de + 1)) {
                t.push(r);
                r = "";
                de += 2;
                me = Ce(de);
                Ne();
                const s = Re(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += ke(ue(ze()));
            break;

          default:
            r += ke(me);
        }
        ze();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ve(t, e, s) {
    const r = Oe;
    const i = [ ye ];
    Qe(2163759);
    const n = [ Re(62, t) ];
    while (2163758 !== (Ae = Ge())) {
        i.push(ye);
        Qe(2163759);
        n.push(Re(62, t));
    }
    i.push(ye);
    Ee = false;
    Oe = r;
    if (s) {
        Ne();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Ne();
        return new TemplateExpression(i, n);
    }
}

function Fe(t) {
    Ee = false;
    const e = [ ye ];
    Ne();
    return new TaggedTemplateExpression(e, e, t);
}

function Ne() {
    while (de < ve) {
        ge = de;
        if (null != (Ae = Us[me]())) return;
    }
    Ae = 6291456;
}

function ze() {
    return me = Ce(++de);
}

function Ke() {
    while (Rs[ze()]) ;
    const t = Os[ye = Se()];
    return void 0 === t ? 4096 : t;
}

function We(t) {
    let e = me;
    if (false === t) {
        do {
            e = ze();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            ye = parseInt(Se(), 10);
            return 32768;
        }
        e = ze();
        if (de >= ve) {
            ye = parseInt(Se().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = ze();
    } while (e <= 57 && e >= 48); else me = Ce(--de);
    ye = parseFloat(Se());
    return 32768;
}

function qe() {
    const t = me;
    ze();
    let e = 0;
    const s = new Array;
    let r = de;
    while (me !== t) if (92 === me) {
        s.push(we.slice(r, de));
        ze();
        e = ue(me);
        ze();
        s.push(ke(e));
        r = de;
    } else if (de >= ve) throw as(); else ze();
    const i = we.slice(r, de);
    ze();
    s.push(i);
    const n = s.join("");
    ye = n;
    return 16384;
}

function Je() {
    let t = true;
    let e = "";
    while (96 !== ze()) if (36 === me) if (de + 1 < ve && 123 === Ce(de + 1)) {
        de++;
        t = false;
        break;
    } else e += "$"; else if (92 === me) e += ke(ue(ze())); else {
        if (de >= ve) throw ls();
        e += ke(me);
    }
    ze();
    ye = e;
    if (t) return 2163758;
    return 2163759;
}

const Ge = () => {
    if (de >= ve) throw ls();
    de--;
    return Je();
};

const He = t => {
    if (Ae === t) {
        Ne();
        return true;
    }
    return false;
};

const Qe = t => {
    if (Ae === t) Ne(); else throw fs(t);
};

const Xe = () => i(`AUR0151:${we}`);

const Ye = () => i(`AUR0152:${we}`);

const Ze = () => i(`AUR0153:${we}`);

const ts = () => i(`AUR0154:${we}`);

const es = () => i(`AUR0155:${we}`);

const ss = () => i(`AUR0156:${we}`);

const rs = () => i(`AUR0157`);

const is = () => i(`AUR0158:${we}`);

const ns = () => i(`AUR0159:${we}`);

const os = () => i(`AUR0160:${we}`);

const cs = () => i(`AUR0161:${we}`);

const us = () => i(`AUR0163:${we}`);

const hs = () => i(`AUR0164:${we}`);

const as = () => i(`AUR0165:${we}`);

const ls = () => i(`AUR0166:${we}`);

const fs = t => i(`AUR0167:${we}<${Es[63 & t]}`);

const ps = () => {
    throw i(`AUR0168:${we}`);
};

ps.notMapped = true;

const bs = () => i(`AUR0170:${we}`);

const ws = () => i(`AUR0171:${we}`);

const ds = () => i(`AUR0172:${we}`);

const vs = () => i(`AUR0173:${we}`);

const xs = () => i(`AUR0174:${we}`);

const gs = () => i(`AUR0175:${we}`);

const As = () => i(`AUR0176:${we}`);

const ys = () => i(`AUR0178:${we}`);

const ms = () => i(`AUR0179:${we}`);

const Es = [ he, ae, le, fe, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

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

const Ss = t => () => {
    ze();
    return t;
};

const $s = new Set;

Cs(null, $s, ks.AsciiIdPart, true);

const Rs = new Uint8Array(65535);

Cs(Rs, null, ks.IdStart, 1);

Cs(Rs, null, ks.Digit, 1);

const Us = new Array(65535);

Us.fill(ps, 0, 65535);

Cs(Us, null, ks.Skip, (() => {
    ze();
    return null;
}));

Cs(Us, null, ks.IdStart, Ke);

Cs(Us, null, ks.Digit, (() => We(false)));

Us[34] = Us[39] = () => qe();

Us[96] = () => Je();

Us[33] = () => {
    if (61 !== ze()) return 131117;
    if (61 !== ze()) return 6553948;
    ze();
    return 6553950;
};

Us[61] = () => {
    if (62 === ze()) {
        ze();
        return 49;
    }
    if (61 !== me) return 4194348;
    if (61 !== ze()) return 6553947;
    ze();
    return 6553949;
};

Us[38] = () => {
    if (38 !== ze()) return 6291478;
    ze();
    return 6553882;
};

Us[124] = () => {
    if (124 !== ze()) return 6291479;
    ze();
    return 6553817;
};

Us[63] = () => {
    if (46 === ze()) {
        const t = Ce(de + 1);
        if (t <= 48 || t >= 57) {
            ze();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== me) return 6291477;
    ze();
    return 6553752;
};

Us[46] = () => {
    if (ze() <= 57 && me >= 48) return We(true);
    if (46 === me) {
        if (46 !== ze()) return 10;
        ze();
        return 11;
    }
    return 65545;
};

Us[60] = () => {
    if (61 !== ze()) return 6554015;
    ze();
    return 6554017;
};

Us[62] = () => {
    if (61 !== ze()) return 6554016;
    ze();
    return 6554018;
};

Us[37] = Ss(6554154);

Us[40] = Ss(2688007);

Us[41] = Ss(7340046);

Us[42] = Ss(6554153);

Us[43] = Ss(2490853);

Us[44] = Ss(6291471);

Us[45] = Ss(2490854);

Us[47] = Ss(6554155);

Us[58] = Ss(6291476);

Us[91] = Ss(2688016);

Us[93] = Ss(7340051);

Us[123] = Ss(524296);

Us[125] = Ss(7340045);

let Ls = null;

const Ps = [];

let _s = false;

function Ms() {
    _s = false;
}

function js() {
    _s = true;
}

function Is() {
    return Ls;
}

function Bs(t) {
    if (null == t) throw i(`AUR0206`);
    if (null == Ls) {
        Ls = t;
        Ps[0] = Ls;
        _s = true;
        return;
    }
    if (Ls === t) throw i(`AUR0207`);
    Ps.push(t);
    Ls = t;
    _s = true;
}

function Ts(t) {
    if (null == t) throw i(`AUR0208`);
    if (Ls !== t) throw i(`AUR0209`);
    Ps.pop();
    Ls = Ps.length > 0 ? Ps[Ps.length - 1] : null;
    _s = null != Ls;
}

const Ds = Object.freeze({
    get current() {
        return Ls;
    },
    get connecting() {
        return _s;
    },
    enter: Bs,
    exit: Ts,
    pause: Ms,
    resume: js
});

const Vs = Reflect.get;

const Fs = Object.prototype.toString;

const Ns = new WeakMap;

function zs(t) {
    switch (Fs.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Ks = "__raw__";

function Ws(t) {
    return zs(t) ? qs(t) : t;
}

function qs(t) {
    return Ns.get(t) ?? Qs(t);
}

function Js(t) {
    return t[Ks] ?? t;
}

function Gs(t) {
    return zs(t) && t[Ks] || t;
}

function Hs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function Qs(t) {
    const e = c(t) ? Ys : t instanceof Map || t instanceof Set ? yr : Xs;
    const s = new Proxy(t, e);
    Ns.set(t, s);
    return s;
}

const Xs = {
    get(t, e, s) {
        if (e === Ks) return t;
        const r = Is();
        if (!_s || Hs(e) || null == r) return Vs(t, e, s);
        r.observe(t, e);
        return Ws(Vs(t, e, s));
    }
};

const Ys = {
    get(t, e, s) {
        if (e === Ks) return t;
        if (!_s || Hs(e) || null == Ls) return Vs(t, e, s);
        switch (e) {
          case "length":
            Ls.observe(t, "length");
            return t.length;

          case "map":
            return Zs;

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
            return gr;

          case "reduceRight":
            return Ar;

          case "reverse":
            return wr;

          case "shift":
            return fr;

          case "unshift":
            return pr;

          case "slice":
            return xr;

          case "splice":
            return br;

          case "some":
            return dr;

          case "sort":
            return vr;

          case "keys":
            return Rr;

          case "values":
          case Symbol.iterator:
            return Ur;

          case "entries":
            return Lr;
        }
        Ls.observe(t, e);
        return Ws(Vs(t, e, s));
    },
    ownKeys(t) {
        Is()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function Zs(t, e) {
    const s = Js(this);
    const r = s.map(((s, r) => Gs(t.call(e, Ws(s), r, this))));
    Pr(Ls, s);
    return Ws(r);
}

function tr(t, e) {
    const s = Js(this);
    const r = s.every(((s, r) => t.call(e, Ws(s), r, this)));
    Pr(Ls, s);
    return r;
}

function er(t, e) {
    const s = Js(this);
    const r = s.filter(((s, r) => Gs(t.call(e, Ws(s), r, this))));
    Pr(Ls, s);
    return Ws(r);
}

function sr(t) {
    const e = Js(this);
    const s = e.includes(Gs(t));
    Pr(Ls, e);
    return s;
}

function rr(t) {
    const e = Js(this);
    const s = e.indexOf(Gs(t));
    Pr(Ls, e);
    return s;
}

function ir(t) {
    const e = Js(this);
    const s = e.lastIndexOf(Gs(t));
    Pr(Ls, e);
    return s;
}

function nr(t, e) {
    const s = Js(this);
    const r = s.findIndex(((s, r) => Gs(t.call(e, Ws(s), r, this))));
    Pr(Ls, s);
    return r;
}

function or(t, e) {
    const s = Js(this);
    const r = s.find(((e, s) => t(Ws(e), s, this)), e);
    Pr(Ls, s);
    return Ws(r);
}

function cr() {
    const t = Js(this);
    Pr(Ls, t);
    return Ws(t.flat());
}

function ur(t, e) {
    const s = Js(this);
    Pr(Ls, s);
    return qs(s.flatMap(((s, r) => Ws(t.call(e, Ws(s), r, this)))));
}

function hr(t) {
    const e = Js(this);
    Pr(Ls, e);
    return e.join(t);
}

function ar() {
    return Ws(Js(this).pop());
}

function lr(...t) {
    return Js(this).push(...t);
}

function fr() {
    return Ws(Js(this).shift());
}

function pr(...t) {
    return Js(this).unshift(...t);
}

function br(...t) {
    return Ws(Js(this).splice(...t));
}

function wr(...t) {
    const e = Js(this);
    const s = e.reverse();
    Pr(Ls, e);
    return Ws(s);
}

function dr(t, e) {
    const s = Js(this);
    const r = s.some(((s, r) => Gs(t.call(e, Ws(s), r, this))));
    Pr(Ls, s);
    return r;
}

function vr(t) {
    const e = Js(this);
    const s = e.sort(t);
    Pr(Ls, e);
    return Ws(s);
}

function xr(t, e) {
    const s = Js(this);
    Pr(Ls, s);
    return qs(s.slice(t, e));
}

function gr(t, e) {
    const s = Js(this);
    const r = s.reduce(((e, s, r) => t(e, Ws(s), r, this)), e);
    Pr(Ls, s);
    return Ws(r);
}

function Ar(t, e) {
    const s = Js(this);
    const r = s.reduceRight(((e, s, r) => t(e, Ws(s), r, this)), e);
    Pr(Ls, s);
    return Ws(r);
}

const yr = {
    get(t, e, s) {
        if (e === Ks) return t;
        const r = Is();
        if (!_s || Hs(e) || null == r) return Vs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Sr;

          case "delete":
            return $r;

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
            return Er;

          case "keys":
            return Rr;

          case "values":
            return Ur;

          case "entries":
            return Lr;

          case Symbol.iterator:
            return t instanceof Map ? Lr : Ur;
        }
        return Ws(Vs(t, e, s));
    }
};

function mr(t, e) {
    const s = Js(this);
    Pr(Ls, s);
    return s.forEach(((s, r) => {
        t.call(e, Ws(s), Ws(r), this);
    }));
}

function Er(t) {
    const e = Js(this);
    Pr(Ls, e);
    return e.has(Gs(t));
}

function Or(t) {
    const e = Js(this);
    Pr(Ls, e);
    return Ws(e.get(Gs(t)));
}

function kr(t, e) {
    return Ws(Js(this).set(Gs(t), Gs(e)));
}

function Cr(t) {
    return Ws(Js(this).add(Gs(t)));
}

function Sr() {
    return Ws(Js(this).clear());
}

function $r(t) {
    return Ws(Js(this).delete(Gs(t)));
}

function Rr() {
    const t = Js(this);
    Pr(Ls, t);
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

function Ur() {
    const t = Js(this);
    Pr(Ls, t);
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

function Lr() {
    const t = Js(this);
    Pr(Ls, t);
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

const Pr = (t, e) => t?.observeCollection(e);

const _r = Object.freeze({
    getProxy: qs,
    getRaw: Js,
    wrap: Ws,
    unwrap: Gs,
    rawKey: Ks
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
        if (!u(e, t)) {
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
            Bs(this);
            return this.v = Gs(this.$get.call(this.up ? Ws(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Ts(this);
        }
    }
}

oe(ComputedObserver);

N(ComputedObserver);

let Mr;

const jr = f("IDirtyChecker", (t => t.singleton(DirtyChecker)));

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

const Br = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (Ir.disabled) return;
            if (++this.O < Ir.timeoutsPerCheck) return;
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
        if (Ir.throw) throw i(`AUR0222:${l(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Br);
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
        throw i(`Trying to set value for property ${l(this.key)} in dirty checker`);
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

N(DirtyCheckProperty);

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
            if (u(t, this.v)) return;
            Tr = this.v;
            this.v = t;
            this.subs.notify(t, Tr);
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
        if (!u(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.cb?.call(this.o, this.v, this.ov);
            Tr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Tr);
        }
    }
}

N(SetterObserver);

N(SetterNotifier);

let Tr;

const Dr = new PropertyAccessor;

const Vr = f("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Fr = f("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Dr;
    }
    getAccessor() {
        return Dr;
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
        if (null == t) throw qr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Wr(t);
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
        return Dr;
    }
    getArrayObserver(t) {
        return vt(t);
    }
    getMapObserver(t) {
        return Qt(t);
    }
    getSetObserver(t) {
        return jt(t);
    }
    createObserver(e, r) {
        if (this.R.handles(e, r, this)) return this.R.getObserver(e, r, this);
        switch (r) {
          case "length":
            if (c(e)) return vt(e).getLengthObserver();
            break;

          case "size":
            if (e instanceof Map) return Qt(e).getLengthObserver(); else if (e instanceof Set) return jt(e).getLengthObserver();
            break;

          default:
            if (c(e) && t.isArrayIndex(r)) return vt(e).getIndexObserver(Number(r));
            break;
        }
        let i = Kr(e, r);
        if (void 0 === i) {
            let t = zr(e);
            while (null !== t) {
                i = Kr(t, r);
                if (void 0 === i) t = zr(t); else break;
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

ObserverLocator.inject = [ jr, Fr ];

const Nr = t => {
    let e;
    if (c(t)) e = vt(t); else if (t instanceof Map) e = Qt(t); else if (t instanceof Set) e = jt(t);
    return e;
};

const zr = Object.getPrototypeOf;

const Kr = Object.getOwnPropertyDescriptor;

const Wr = t => {
    let e = t.$observers;
    if (void 0 === e) r(t, "$observers", {
        enumerable: false,
        value: e = p()
    });
    return e;
};

const qr = t => i(`AUR0199:${l(t)}`);

const Jr = f("IObservation", (t => t.singleton(Observation)));

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
            Bs(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Ts(this);
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

oe(Effect);

function Gr(t) {
    if (void 0 === t.$observers) r(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Hr = {};

function Qr(t, e, s) {
    if (null == e) return (e, s, r) => n(e, s, r, t);
    return n(t, e, s);
    function n(t, e, s, n) {
        const o = void 0 === e;
        n = "object" !== typeof n ? {
            name: n
        } : n || {};
        if (o) e = n.name;
        if (null == e || "" === e) throw i(`AUR0224`);
        const c = n.callback || `${l(e)}Changed`;
        let u = Hr;
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
            const s = Xr(this, e, c, u, h);
            Is()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            Xr(this, e, c, u, h).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return Xr(s, e, c, u, h);
        };
        if (o) r(t.prototype, e, s); else return s;
    }
}

function Xr(t, e, s, r, i) {
    const n = Gr(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === Hr ? void 0 : r);
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

exports.DirtyCheckSettings = Ir;

exports.ForOfStatement = ForOfStatement;

exports.ICoercionConfiguration = P;

exports.IDirtyChecker = jr;

exports.IExpressionParser = ce;

exports.INodeObserverLocator = Fr;

exports.IObservation = Jr;

exports.IObserverLocator = Vr;

exports.ISignaler = g;

exports.Interpolation = Interpolation;

exports.MapObserver = MapObserver;

exports.ObjectBindingPattern = ObjectBindingPattern;

exports.ObjectLiteralExpression = ObjectLiteralExpression;

exports.Observation = Observation;

exports.ObserverLocator = ObserverLocator;

exports.PrimitiveLiteralExpression = PrimitiveLiteralExpression;

exports.PrimitiveObserver = PrimitiveObserver;

exports.PropertyAccessor = PropertyAccessor;

exports.ProxyObservable = _r;

exports.Scope = Scope;

exports.SetObserver = SetObserver;

exports.SetterObserver = SetterObserver;

exports.SubscriberRecord = SubscriberRecord;

exports.TaggedTemplateExpression = TaggedTemplateExpression;

exports.TemplateExpression = TemplateExpression;

exports.UnaryExpression = UnaryExpression;

exports.Unparser = Unparser;

exports.ValueConverterExpression = ValueConverterExpression;

exports.applyMutationsToIndices = gt;

exports.astAssign = m;

exports.astBind = E;

exports.astEvaluate = y;

exports.astUnbind = O;

exports.astVisit = d;

exports.batch = D;

exports.cloneIndexMap = j;

exports.connectable = oe;

exports.copyIndexMap = _;

exports.createIndexMap = M;

exports.disableArrayObservation = dt;

exports.disableMapObservation = Ht;

exports.disableSetObservation = Mt;

exports.enableArrayObservation = wt;

exports.enableMapObservation = Gt;

exports.enableSetObservation = _t;

exports.getCollectionObserver = Nr;

exports.getObserverLookup = Wr;

exports.isIndexMap = I;

exports.observable = Qr;

exports.parseExpression = $e;

exports.subscriberCollection = N;

exports.synchronizeIndices = At;
//# sourceMappingURL=index.cjs.map
