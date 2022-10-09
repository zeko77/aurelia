import { DI as t, Protocol as e, emptyArray as s, isArrayIndex as r, IPlatform as i } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as n } from "../../../metadata/dist/native-modules/index.mjs";

const o = Object.prototype.hasOwnProperty;

const c = Reflect.defineProperty;

const u = t => new Error(t);

const h = t => "function" === typeof t;

const a = t => "string" === typeof t;

const l = t => t instanceof Array;

const f = t => t instanceof Set;

const b = t => t instanceof Map;

const w = Object.is;

function p(t, e, s) {
    c(t, e, {
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

const v = String;

const g = t.createInterface;

const A = () => Object.create(null);

const x = n.getOwn;

n.hasOwn;

const m = n.define;

e.annotation.keyFor;

e.resource.keyFor;

e.resource.appendTo;

const y = (t, e) => {
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
        throw u(`Unknown ast node ${JSON.stringify(t)}`);
    }
};

class Unparser {
    constructor() {
        this.text = "";
    }
    static unparse(t) {
        const e = new Unparser;
        y(t, e);
        return e.text;
    }
    visitAccessMember(t) {
        y(t.object, this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        y(t.object, this);
        this.text += `${t.optional ? "?." : ""}[`;
        y(t.key, this);
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
            y(e[t], this);
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
        y(t.body, this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            y(s[t], this);
        }
        this.text += "}";
    }
    visitPrimitiveLiteral(t) {
        this.text += "(";
        if (a(t.value)) {
            const e = t.value.replace(/'/g, "\\'");
            this.text += `'${e}'`;
        } else this.text += `${t.value}`;
        this.text += ")";
    }
    visitCallFunction(t) {
        this.text += "(";
        y(t.func, this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        y(t.object, this);
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
            y(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        y(t.func, this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            y(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        y(t.expression, this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        y(t.left, this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        y(t.right, this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        y(t.condition, this);
        this.text += "?";
        y(t.yes, this);
        this.text += ":";
        y(t.no, this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        y(t.target, this);
        this.text += "=";
        y(t.value, this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        y(t.expression, this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            y(e[t], this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        y(t.expression, this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            y(e[t], this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            y(e[t], this);
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
            y(s[t], this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitForOfStatement(t) {
        y(t.declaration, this);
        this.text += " of ";
        y(t.iterable, this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            y(s[t], this);
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
                y(o, this);
                break;

              case 24:
              case 25:
                {
                    const t = o.source;
                    if (t) {
                        y(t, this);
                        this.text += ":";
                    }
                    y(o, this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        y(t.source, this);
        this.text += ":";
        y(t.target, this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            y(e, this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        y(t.target, this);
    }
    visitCustom(t) {
        this.text += v(t.value);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            y(t[e], this);
        }
        this.text += ")";
    }
}

var E;

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
})(E || (E = {}));

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

ArrayLiteralExpression.$empty = new ArrayLiteralExpression(s);

class ObjectLiteralExpression {
    constructor(t, e) {
        this.keys = t;
        this.values = e;
        this.$kind = 3;
    }
}

ObjectLiteralExpression.$empty = new ObjectLiteralExpression(s, s);

class TemplateExpression {
    constructor(t, e = s) {
        this.cooked = t;
        this.expressions = e;
        this.$kind = 5;
    }
}

TemplateExpression.$empty = new TemplateExpression([ "" ]);

class TaggedTemplateExpression {
    constructor(t, e, r, i = s) {
        this.cooked = t;
        this.func = r;
        this.expressions = i;
        this.$kind = 12;
        t.raw = e;
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
    constructor(t, e = s) {
        this.parts = t;
        this.expressions = e;
        this.$kind = 23;
        this.isMulti = e.length > 1;
        this.firstExpression = e[0];
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
        if (null == t) throw O();
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
        if (null == t) throw k();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw O();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const O = () => u(`AUR0203`);

const k = () => u("AUR0204");

class OverrideContext {}

const C = Scope.getContext;

function S(t, e, s, r) {
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
            const i = C(e, t.name, t.ancestor);
            if (null !== r) r.observe(i, t.name);
            const n = i[t.name];
            if (null == n && "$host" === t.name) throw u(`AUR0105`);
            if (s?.strict) return s?.boundFn && h(n) ? n.bind(i) : n;
            return null == n ? "" : s?.boundFn && h(n) ? n.bind(i) : n;
        }

      case 2:
        return t.elements.map((t => S(t, e, s, r)));

      case 3:
        {
            const i = {};
            for (let n = 0; n < t.keys.length; ++n) i[t.keys[n]] = S(t.values[n], e, s, r);
            return i;
        }

      case 4:
        return t.value;

      case 5:
        {
            let i = t.cooked[0];
            for (let n = 0; n < t.expressions.length; ++n) {
                i += String(S(t.expressions[n], e, s, r));
                i += t.cooked[n + 1];
            }
            return i;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void S(t.expression, e, s, r);

          case "typeof":
            return typeof S(t.expression, e, s, r);

          case "!":
            return !S(t.expression, e, s, r);

          case "-":
            return -S(t.expression, e, s, r);

          case "+":
            return +S(t.expression, e, s, r);

          default:
            throw u(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const i = t.args.map((t => S(t, e, s, r)));
            const n = C(e, t.name, t.ancestor);
            const o = j(s?.strictFnCall, n, t.name);
            if (o) return o.apply(n, i);
            return;
        }

      case 8:
        {
            const i = S(t.object, e, s, r);
            const n = t.args.map((t => S(t, e, s, r)));
            const o = j(s?.strictFnCall, i, t.name);
            let c;
            if (o) {
                c = o.apply(i, n);
                if (l(i) && B.includes(t.name)) r?.observeCollection(i);
            }
            return c;
        }

      case 9:
        {
            const i = S(t.func, e, s, r);
            if (h(i)) return i(...t.args.map((t => S(t, e, s, r))));
            if (!s?.strictFnCall && null == i) return;
            throw u(`AUR0107`);
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
                return S(t.body, h, s, r);
            };
            return i;
        }

      case 10:
        {
            const i = S(t.object, e, s, r);
            let n;
            if (s?.strict) {
                if (null == i) return i;
                if (null !== r) r.observe(i, t.name);
                n = i[t.name];
                if (s?.boundFn && h(n)) return n.bind(i);
                return n;
            }
            if (null !== r && i instanceof Object) r.observe(i, t.name);
            if (i) {
                n = i[t.name];
                if (s?.boundFn && h(n)) return n.bind(i);
                return n;
            }
            return "";
        }

      case 11:
        {
            const i = S(t.object, e, s, r);
            if (i instanceof Object) {
                const n = S(t.key, e, s, r);
                if (null !== r) r.observe(i, n);
                return i[n];
            }
            return;
        }

      case 12:
        {
            const i = t.expressions.map((t => S(t, e, s, r)));
            const n = S(t.func, e, s, r);
            if (!h(n)) throw u(`AUR0110`);
            return n(t.cooked, ...i);
        }

      case 13:
        {
            const i = t.left;
            const n = t.right;
            switch (t.operation) {
              case "&&":
                return S(i, e, s, r) && S(n, e, s, r);

              case "||":
                return S(i, e, s, r) || S(n, e, s, r);

              case "??":
                return S(i, e, s, r) ?? S(n, e, s, r);

              case "==":
                return S(i, e, s, r) == S(n, e, s, r);

              case "===":
                return S(i, e, s, r) === S(n, e, s, r);

              case "!=":
                return S(i, e, s, r) != S(n, e, s, r);

              case "!==":
                return S(i, e, s, r) !== S(n, e, s, r);

              case "instanceof":
                {
                    const t = S(n, e, s, r);
                    if (h(t)) return S(i, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = S(n, e, s, r);
                    if (t instanceof Object) return S(i, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = S(i, e, s, r);
                    const o = S(n, e, s, r);
                    if (s?.strict) return t + o;
                    if (!t || !o) {
                        if (I(t) || I(o)) return (t || 0) + (o || 0);
                        if (M(t) || M(o)) return (t || "") + (o || "");
                    }
                    return t + o;
                }

              case "-":
                return S(i, e, s, r) - S(n, e, s, r);

              case "*":
                return S(i, e, s, r) * S(n, e, s, r);

              case "/":
                return S(i, e, s, r) / S(n, e, s, r);

              case "%":
                return S(i, e, s, r) % S(n, e, s, r);

              case "<":
                return S(i, e, s, r) < S(n, e, s, r);

              case ">":
                return S(i, e, s, r) > S(n, e, s, r);

              case "<=":
                return S(i, e, s, r) <= S(n, e, s, r);

              case ">=":
                return S(i, e, s, r) >= S(n, e, s, r);

              default:
                throw u(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return S(t.condition, e, s, r) ? S(t.yes, e, s, r) : S(t.no, e, s, r);

      case 15:
        return $(t.target, e, s, S(t.value, e, s, r));

      case 17:
        {
            const i = s?.getConverter?.(t.name);
            if (null == i) throw u(`AUR0103:${t.name}`);
            if ("toView" in i) return i.toView(S(t.expression, e, s, r), ...t.args.map((t => S(t, e, s, r))));
            return S(t.expression, e, s, r);
        }

      case 18:
        return S(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return S(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let i = t.parts[0];
            let n = 0;
            for (;n < t.expressions.length; ++n) {
                i += v(S(t.expressions[n], e, s, r));
                i += t.parts[n + 1];
            }
            return i;
        } else return `${t.parts[0]}${S(t.firstExpression, e, s, r)}${t.parts[1]}`;

      case 26:
        return S(t.target, e, s, r);

      case 24:
        return t.list.map((t => S(t, e, s, r)));

      case 19:
      case 20:
      case 25:
      default:
        return;

      case 28:
        return t.evaluate(e, s, r);
    }
}

function $(t, e, s, i) {
    switch (t.$kind) {
      case 1:
        {
            if ("$host" === t.name) throw u(`AUR0106`);
            const s = C(e, t.name, t.ancestor);
            if (s instanceof Object) if (void 0 !== s.$observers?.[t.name]) {
                s.$observers[t.name].setValue(i);
                return i;
            } else return s[t.name] = i;
            return;
        }

      case 10:
        {
            const r = S(t.object, e, s, null);
            if (r instanceof Object) if (void 0 !== r.$observers?.[t.name]) r.$observers[t.name].setValue(i); else r[t.name] = i; else $(t.object, e, s, {
                [t.name]: i
            });
            return i;
        }

      case 11:
        {
            const r = S(t.object, e, s, null);
            const n = S(t.key, e, s, null);
            return r[n] = i;
        }

      case 15:
        $(t.value, e, s, i);
        return $(t.target, e, s, i);

      case 17:
        {
            const r = s?.getConverter?.(t.name);
            if (null == r) throw _(t.name);
            if ("fromView" in r) i = r.fromView(i, ...t.args.map((t => S(t, e, s, null))));
            return $(t.expression, e, s, i);
        }

      case 18:
        return $(t.expression, e, s, i);

      case 24:
      case 25:
        {
            const r = t.list;
            const n = r.length;
            let o;
            let c;
            for (o = 0; o < n; o++) {
                c = r[o];
                switch (c.$kind) {
                  case 26:
                    $(c, e, s, i);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof i || null === i) throw u(`AUR0112`);
                        let t = S(c.source, Scope.create(i), s, null);
                        if (void 0 === t && c.initializer) t = S(c.initializer, e, s, null);
                        $(c, e, s, t);
                        break;
                    }
                }
            }
            break;
        }

      case 26:
        if (t instanceof DestructuringAssignmentSingleExpression) {
            if (null == i) return;
            if ("object" !== typeof i) throw u(`AUR0112`);
            let r = S(t.source, Scope.create(i), s, null);
            if (void 0 === r && t.initializer) r = S(t.initializer, e, s, null);
            $(t.target, e, s, r);
        } else {
            if (null == i) return;
            if ("object" !== typeof i) throw u(`AUR0112`);
            const n = t.indexOrProperties;
            let o;
            if (r(n)) {
                if (!Array.isArray(i)) throw u(`AUR0112`);
                o = i.slice(n);
            } else o = Object.entries(i).reduce(((t, [e, s]) => {
                if (!n.includes(e)) t[e] = s;
                return t;
            }), {});
            $(t.target, e, s, o);
        }
        break;

      case 28:
        return t.assign(e, s, i);

      default:
        return;
    }
}

function R(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const i = t.key;
            const n = s.getBehavior?.(r);
            if (null == n) throw L(r);
            if (void 0 === s[i]) {
                s[i] = n;
                n.bind?.(e, s, ...t.args.map((t => S(t, e, s, null))));
            } else throw P(r);
            R(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const i = s.getConverter?.(r);
            if (null == i) throw _(r);
            const n = i.signals;
            if (null != n) {
                const t = s.getSignaler?.();
                const e = n.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(n[r], s);
            }
            R(t.expression, e, s);
            return;
        }

      case 22:
        R(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function U(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const i = s;
            if (void 0 !== i[r]) {
                i[r].unbind?.(e, s);
                i[r] = void 0;
            }
            U(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const i = s.getSignaler?.();
            let n = 0;
            for (;n < r.signals.length; ++n) i?.removeSignalListener(r.signals[n], s);
            U(t.expression, e, s);
            break;
        }

      case 22:
        U(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const L = t => u(`AUR0101:${t}`);

const P = t => u(`AUR0102:${t}`);

const _ = t => u(`AUR0103:${t}`);

const j = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (h(r)) return r;
    if (!t && null == r) return null;
    throw u(`AUR0111:${s}`);
};

const I = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const M = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const B = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const T = t.createInterface("ICoercionConfiguration");

var D;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(D || (D = {}));

var V;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(V || (V = {}));

function F(t, e, s) {
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

function N(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function z(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function K(t) {
    return l(t) && true === t.isIndexMap;
}

let W = new Map;

let J = false;

function q(t) {
    const e = W;
    const s = W = new Map;
    J = true;
    try {
        t();
    } finally {
        W = null;
        J = false;
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
            W = e;
        }
    }
}

function G(t, e, s) {
    if (!W.has(t)) W.set(t, [ 2, e, s ]);
}

function H(t, e, s) {
    const r = W.get(t);
    if (void 0 === r) W.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function Q(t) {
    return null == t ? X : X(t);
}

function X(t) {
    const e = t.prototype;
    c(e, "subs", {
        get: Y
    });
    d(e, "subscribe", Z);
    d(e, "unsubscribe", tt);
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
        if (J) {
            H(this, t, e);
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

function Y() {
    return p(this, "subs", new SubscriberRecord);
}

function Z(t) {
    return this.subs.add(t);
}

function tt(t) {
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
        this.type = b(this.o) ? 66 : 34;
    }
    getValue() {
        return this.o.size;
    }
    setValue() {
        throw u(`AUR02`);
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.size;
        if ((this.v = r) !== s) this.subs.notify(this.v, s);
    }
}

function et(t) {
    const e = t.prototype;
    d(e, "subscribe", st);
    d(e, "unsubscribe", rt);
    Q(t);
}

function st(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function rt(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

et(CollectionLengthObserver);

et(CollectionSizeObserver);

const it = "__au_array_obs__";

const nt = (() => {
    let t = x(it, Array);
    if (null == t) m(it, t = new WeakMap, Array);
    return t;
})();

function ot(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function ct(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function ut(t, e, s, r, i) {
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

function ht(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let b, w, p;
    let d, v;
    let g, A, x, m;
    let y, E, O, k;
    while (true) {
        if (r - s <= 10) {
            ut(t, e, s, r, i);
            return;
        }
        n = s + (r - s >> 1);
        c = t[s];
        a = e[s];
        u = t[r - 1];
        l = e[r - 1];
        h = t[n];
        f = e[n];
        b = i(c, u);
        if (b > 0) {
            d = c;
            v = a;
            c = u;
            a = l;
            u = d;
            l = v;
        }
        w = i(c, h);
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
            p = i(u, h);
            if (p > 0) {
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
        g = u;
        A = l;
        x = s + 1;
        m = r - 1;
        t[n] = t[x];
        e[n] = e[x];
        t[x] = g;
        e[x] = A;
        t: for (o = x + 1; o < m; o++) {
            y = t[o];
            E = e[o];
            O = i(y, g);
            if (O < 0) {
                t[o] = t[x];
                e[o] = e[x];
                t[x] = y;
                e[x] = E;
                x++;
            } else if (O > 0) {
                do {
                    m--;
                    if (m == o) break t;
                    k = t[m];
                    O = i(k, g);
                } while (O > 0);
                t[o] = t[m];
                e[o] = e[m];
                t[m] = y;
                e[m] = E;
                if (O < 0) {
                    y = t[o];
                    E = e[o];
                    t[o] = t[x];
                    e[o] = e[x];
                    t[x] = y;
                    e[x] = E;
                    x++;
                }
            }
        }
        if (r - m < x - s) {
            ht(t, e, m, r, i);
            r = x;
        } else {
            ht(t, e, s, x, i);
            s = m;
        }
    }
}

const at = Array.prototype;

const lt = at.push;

const ft = at.unshift;

const bt = at.pop;

const wt = at.shift;

const pt = at.splice;

const dt = at.reverse;

const vt = at.sort;

const gt = {
    push: lt,
    unshift: ft,
    pop: bt,
    shift: wt,
    splice: pt,
    reverse: dt,
    sort: vt
};

const At = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const xt = {
    push: function(...t) {
        const e = nt.get(this);
        if (void 0 === e) return lt.apply(this, t);
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
        const e = nt.get(this);
        if (void 0 === e) return ft.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        ft.apply(e.indexMap, r);
        const n = ft.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = nt.get(this);
        if (void 0 === t) return bt.call(this);
        const e = t.indexMap;
        const s = bt.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        bt.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = nt.get(this);
        if (void 0 === t) return wt.call(this);
        const e = t.indexMap;
        const s = wt.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        wt.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = nt.get(this);
        if (void 0 === r) return pt.apply(this, t);
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
            pt.call(c, e, s, ...r);
        } else pt.apply(c, t);
        const l = pt.apply(this, t);
        if (h > 0 || a > 0) r.notify();
        return l;
    },
    reverse: function() {
        const t = nt.get(this);
        if (void 0 === t) {
            dt.call(this);
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
        const e = nt.get(this);
        if (void 0 === e) {
            vt.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        ht(this, e.indexMap, 0, s, ct);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !h(t)) t = ot;
        ht(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of At) c(xt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let mt = false;

const yt = "__au_arr_on__";

function Et() {
    if (!(x(yt, Array) ?? false)) {
        m(yt, true, Array);
        for (const t of At) if (true !== at[t].observing) p(at, t, xt[t]);
    }
}

function Ot() {
    for (const t of At) if (true === at[t].observing) p(at, t, gt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!mt) {
            mt = true;
            Et();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = N(t.length);
        this.lenObs = void 0;
        nt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (J) {
            G(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = N(r);
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

Q(ArrayObserver);

Q(ArrayIndexObserver);

function kt(t) {
    let e = nt.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const Ct = (t, e) => t - e;

function St(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = z(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(Ct);
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

function $t(t, e) {
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

const Rt = "__au_set_obs__";

const Ut = (() => {
    let t = x(Rt, Set);
    if (null == t) m(Rt, t = new WeakMap, Set);
    return t;
})();

const Lt = Set.prototype;

const Pt = Lt.add;

const _t = Lt.clear;

const jt = Lt.delete;

const It = {
    add: Pt,
    clear: _t,
    delete: jt
};

const Mt = [ "add", "clear", "delete" ];

const Bt = {
    add: function(t) {
        const e = Ut.get(this);
        if (void 0 === e) {
            Pt.call(this, t);
            return this;
        }
        const s = this.size;
        Pt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Ut.get(this);
        if (void 0 === t) return _t.call(this);
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
            _t.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Ut.get(this);
        if (void 0 === e) return jt.call(this, t);
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
                const n = jt.call(this, t);
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

for (const t of Mt) c(Bt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Dt = false;

const Vt = "__au_set_on__";

function Ft() {
    if (!(x(Vt, Set) ?? false)) {
        m(Vt, true, Set);
        for (const t of Mt) if (true !== Lt[t].observing) c(Lt, t, {
            ...Tt,
            value: Bt[t]
        });
    }
}

function Nt() {
    for (const t of Mt) if (true === Lt[t].observing) c(Lt, t, {
        ...Tt,
        value: It[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Dt) {
            Dt = true;
            Ft();
        }
        this.collection = t;
        this.indexMap = N(t.size);
        this.lenObs = void 0;
        Ut.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (J) {
            G(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = N(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

Q(SetObserver);

function zt(t) {
    let e = Ut.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Kt = "__au_map_obs__";

const Wt = (() => {
    let t = x(Kt, Map);
    if (null == t) m(Kt, t = new WeakMap, Map);
    return t;
})();

const Jt = Map.prototype;

const qt = Jt.set;

const Gt = Jt.clear;

const Ht = Jt.delete;

const Qt = {
    set: qt,
    clear: Gt,
    delete: Ht
};

const Xt = [ "set", "clear", "delete" ];

const Yt = {
    set: function(t, e) {
        const s = Wt.get(this);
        if (void 0 === s) {
            qt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        qt.call(this, t, e);
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
        const t = Wt.get(this);
        if (void 0 === t) return Gt.call(this);
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
            Gt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Wt.get(this);
        if (void 0 === e) return Ht.call(this, t);
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
                const n = Ht.call(this, t);
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

for (const t of Xt) c(Yt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let te = false;

const ee = "__au_map_on__";

function se() {
    if (!(x(ee, Map) ?? false)) {
        m(ee, true, Map);
        for (const t of Xt) if (true !== Jt[t].observing) c(Jt, t, {
            ...Zt,
            value: Yt[t]
        });
    }
}

function re() {
    for (const t of Xt) if (true === Jt[t].observing) c(Jt, t, {
        ...Zt,
        value: Qt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!te) {
            te = true;
            se();
        }
        this.collection = t;
        this.indexMap = N(t.size);
        this.lenObs = void 0;
        Wt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (J) {
            G(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = N(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

Q(MapObserver);

function ie(t) {
    let e = Wt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function ne() {
    return p(this, "obs", new BindingObserverRecord(this));
}

function oe(t, e) {
    this.obs.add(this.oL.getObserver(t, e));
}

function ce(t) {
    let e;
    if (l(t)) e = kt(t); else if (f(t)) e = zt(t); else if (b(t)) e = ie(t); else throw u(`AUR0210`);
    this.obs.add(e);
}

function ue(t) {
    this.obs.add(t);
}

function he() {
    throw u(`AUR2011:handleChange`);
}

function ae() {
    throw u(`AUR2011:handleCollectionChange`);
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
        this.o.forEach(fe, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(le, this);
        this.o.clear();
        this.count = 0;
    }
}

function le(t, e) {
    e.unsubscribe(this.b);
}

function fe(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this.b);
        this.o.delete(e);
    }
}

function be(t) {
    const e = t.prototype;
    d(e, "observe", oe);
    d(e, "observeCollection", ce);
    d(e, "subscribeTo", ue);
    c(e, "obs", {
        get: ne
    });
    d(e, "handleChange", he);
    d(e, "handleCollectionChange", ae);
    return t;
}

function we(t) {
    return null == t ? be : be(t);
}

const pe = g("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = A();
        this.u = A();
        this.h = A();
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
                throw bs();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        Oe = t;
        ke = 0;
        Ce = t.length;
        Se = 0;
        $e = 0;
        Re = 6291456;
        Ue = "";
        Le = Me(0);
        Pe = true;
        _e = false;
        je = -1;
        return De(61, void 0 === e ? 16 : e);
    }
}

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

const ve = PrimitiveLiteralExpression.$false;

const ge = PrimitiveLiteralExpression.$true;

const Ae = PrimitiveLiteralExpression.$null;

const xe = PrimitiveLiteralExpression.$undefined;

const me = AccessThisExpression.$this;

const ye = AccessThisExpression.$parent;

var Ee;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsChainable"] = 4] = "IsChainable";
    t[t["IsFunction"] = 8] = "IsFunction";
    t[t["IsProperty"] = 16] = "IsProperty";
    t[t["IsCustom"] = 32] = "IsCustom";
})(Ee || (Ee = {}));

let Oe = "";

let ke = 0;

let Ce = 0;

let Se = 0;

let $e = 0;

let Re = 6291456;

let Ue = "";

let Le;

let Pe = true;

let _e = false;

let je = -1;

const Ie = String.fromCharCode;

const Me = t => Oe.charCodeAt(t);

const Be = () => Oe.slice($e, ke);

function Te(t, e) {
    Oe = t;
    ke = 0;
    Ce = t.length;
    Se = 0;
    $e = 0;
    Re = 6291456;
    Ue = "";
    Le = Me(0);
    Pe = true;
    _e = false;
    je = -1;
    return De(61, void 0 === e ? 16 : e);
}

function De(t, e) {
    if (32 === e) return new CustomExpression(Oe);
    if (0 === ke) {
        if (1 & e) return He();
        Ye();
        if (4194304 & Re) throw cs();
    }
    Pe = 513 > t;
    _e = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & Re) {
        const t = _s[63 & Re];
        Ye();
        r = new UnaryExpression(t, De(514, e));
        Pe = false;
    } else {
        t: switch (Re) {
          case 12294:
            i = Se;
            Pe = false;
            do {
                Ye();
                ++i;
                switch (Re) {
                  case 65545:
                    Ye();
                    if (0 === (12288 & Re)) throw hs();
                    break;

                  case 10:
                  case 11:
                    throw hs();

                  case 2162700:
                    _e = true;
                    Ye();
                    if (0 === (12288 & Re)) {
                        r = 0 === i ? me : 1 === i ? ye : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & Re) {
                        r = 0 === i ? me : 1 === i ? ye : new AccessThisExpression(i);
                        break t;
                    }
                    throw as();
                }
            } while (12294 === Re);

          case 4096:
            {
                const t = Ue;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Pe = !_e;
                Ye();
                if (ns(50)) {
                    if (524296 === Re) throw Ls();
                    const e = _e;
                    const s = Se;
                    ++Se;
                    const i = De(62, 0);
                    _e = e;
                    Se = s;
                    Pe = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Ps();

          case 11:
            throw us();

          case 12292:
            Pe = false;
            Ye();
            switch (Se) {
              case 0:
                r = me;
                break;

              case 1:
                r = ye;
                break;

              default:
                r = new AccessThisExpression(Se);
                break;
            }
            break;

          case 2688007:
            r = We(e);
            break;

          case 2688016:
            r = Oe.search(/\s+of\s+/) > ke ? Ve() : Je(e);
            break;

          case 524296:
            r = Ge(e);
            break;

          case 2163759:
            r = new TemplateExpression([ Ue ]);
            Pe = false;
            Ye();
            break;

          case 2163760:
            r = Qe(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(Ue);
            Pe = false;
            Ye();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = _s[63 & Re];
            Pe = false;
            Ye();
            break;

          default:
            if (ke >= Ce) throw ls(); else throw fs();
        }
        if (2 & e) return qe(r);
        if (514 < t) return r;
        if (10 === Re || 11 === Re) throw hs();
        if (0 === r.$kind) switch (Re) {
          case 2162700:
            _e = true;
            Pe = false;
            Ye();
            if (0 === (13312 & Re)) throw ks();
            if (12288 & Re) {
                r = new AccessScopeExpression(Ue, r.ancestor);
                Ye();
            } else if (2688007 === Re) r = new CallFunctionExpression(r, Fe(), true); else if (2688016 === Re) r = Ne(r, true); else throw Cs();
            break;

          case 65545:
            Pe = !_e;
            Ye();
            if (0 === (12288 & Re)) throw hs();
            r = new AccessScopeExpression(Ue, r.ancestor);
            Ye();
            break;

          case 10:
          case 11:
            throw hs();

          case 2688007:
            r = new CallFunctionExpression(r, Fe(), s);
            break;

          case 2688016:
            r = Ne(r, s);
            break;

          case 2163759:
            r = Xe(r);
            break;

          case 2163760:
            r = Qe(e, r, true);
            break;
        }
        while ((65536 & Re) > 0) switch (Re) {
          case 2162700:
            r = ze(r);
            break;

          case 65545:
            Ye();
            if (0 === (12288 & Re)) throw hs();
            r = Ke(r, false);
            break;

          case 10:
          case 11:
            throw hs();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Fe(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Fe(), r.optional, false); else r = new CallFunctionExpression(r, Fe(), false);
            break;

          case 2688016:
            r = Ne(r, false);
            break;

          case 2163759:
            if (_e) throw Cs();
            r = Xe(r);
            break;

          case 2163760:
            if (_e) throw Cs();
            r = Qe(e, r, true);
            break;
        }
    }
    if (10 === Re || 11 === Re) throw hs();
    if (513 < t) return r;
    while ((262144 & Re) > 0) {
        const s = Re;
        if ((960 & s) <= t) break;
        Ye();
        r = new BinaryExpression(_s[63 & s], r, De(960 & s, e));
        Pe = false;
    }
    if (63 < t) return r;
    if (ns(6291478)) {
        const t = De(62, e);
        os(6291476);
        r = new ConditionalExpression(r, t, De(62, e));
        Pe = false;
    }
    if (62 < t) return r;
    if (ns(4194349)) {
        if (!Pe) throw ws();
        r = new AssignExpression(r, De(62, e));
    }
    if (61 < t) return r;
    while (ns(6291480)) {
        if (6291456 === Re) throw ps();
        const t = Ue;
        Ye();
        const s = new Array;
        while (ns(6291476)) s.push(De(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (ns(6291479)) {
        if (6291456 === Re) throw ds();
        const t = Ue;
        Ye();
        const s = new Array;
        while (ns(6291476)) s.push(De(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== Re) {
        if ((1 & e) > 0 && 7340045 === Re) return r;
        if ((4 & e) > 0 && 6291477 === Re) {
            if (ke === Ce) throw fs();
            je = ke - 1;
            return r;
        }
        if ("of" === Be()) throw vs();
        throw fs();
    }
    return r;
}

function Ve() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Ye();
        switch (Re) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Be();
            break;

          default:
            throw Os();
        }
    }
    os(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(me, s), new AccessKeyedExpression(me, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Fe() {
    const t = _e;
    Ye();
    const e = [];
    while (7340046 !== Re) {
        e.push(De(62, 0));
        if (!ns(6291471)) break;
    }
    os(7340046);
    Pe = false;
    _e = t;
    return e;
}

function Ne(t, e) {
    const s = _e;
    Ye();
    t = new AccessKeyedExpression(t, De(62, 0), e);
    os(7340051);
    Pe = !s;
    _e = s;
    return t;
}

function ze(t) {
    _e = true;
    Pe = false;
    Ye();
    if (0 === (13312 & Re)) throw ks();
    if (12288 & Re) return Ke(t, true);
    if (2688007 === Re) if (1 === t.$kind) return new CallScopeExpression(t.name, Fe(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Fe(), t.optional, true); else return new CallFunctionExpression(t, Fe(), true);
    if (2688016 === Re) return Ne(t, true);
    throw Cs();
}

function Ke(t, e) {
    const s = Ue;
    switch (Re) {
      case 2162700:
        {
            _e = true;
            Pe = false;
            const r = ke;
            const i = $e;
            const n = Re;
            const o = Le;
            const c = Ue;
            const u = Pe;
            const h = _e;
            Ye();
            if (0 === (13312 & Re)) throw ks();
            if (2688007 === Re) return new CallMemberExpression(t, s, Fe(), e, true);
            ke = r;
            $e = i;
            Re = n;
            Le = o;
            Ue = c;
            Pe = u;
            _e = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Pe = false;
        return new CallMemberExpression(t, s, Fe(), e, false);

      default:
        Pe = !_e;
        Ye();
        return new AccessMemberExpression(t, s, e);
    }
}

function We(t) {
    Ye();
    const e = ke;
    const s = $e;
    const r = Re;
    const i = Le;
    const n = Ue;
    const o = Pe;
    const c = _e;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === Re) {
            Ye();
            if (4096 !== Re) throw hs();
            u.push(new BindingIdentifier(Ue));
            Ye();
            if (6291471 === Re) throw Us();
            if (7340046 !== Re) throw us();
            Ye();
            if (50 !== Re) throw us();
            Ye();
            const t = _e;
            const e = Se;
            ++Se;
            const s = De(62, 0);
            _e = t;
            Se = e;
            Pe = false;
            return new ArrowFunction(u, s, true);
        }
        switch (Re) {
          case 4096:
            u.push(new BindingIdentifier(Ue));
            Ye();
            break;

          case 7340046:
            Ye();
            break t;

          case 524296:
          case 2688016:
            Ye();
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
            Ye();
            h = 2;
            break;
        }
        switch (Re) {
          case 6291471:
            Ye();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Ye();
            break t;

          case 4194349:
            if (1 === h) h = 3;
            break t;

          case 50:
            if (a) throw Ss();
            Ye();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (50 === Re) {
        if (1 === h) {
            Ye();
            if (524296 === Re) throw Ls();
            const t = _e;
            const e = Se;
            ++Se;
            const s = De(62, 0);
            _e = t;
            Se = e;
            Pe = false;
            return new ArrowFunction(u, s);
        }
        throw Ss();
    } else if (1 === h && 0 === u.length) throw ys(50);
    if (a) switch (h) {
      case 2:
        throw Ss();

      case 3:
        throw $s();

      case 4:
        throw Rs();
    }
    ke = e;
    $e = s;
    Re = r;
    Le = i;
    Ue = n;
    Pe = o;
    _e = c;
    const l = _e;
    const f = De(62, t);
    _e = l;
    os(7340046);
    if (50 === Re) switch (h) {
      case 2:
        throw Ss();

      case 3:
        throw $s();

      case 4:
        throw Rs();
    }
    return f;
}

function Je(t) {
    const e = _e;
    Ye();
    const s = new Array;
    while (7340051 !== Re) if (ns(6291471)) {
        s.push(xe);
        if (7340051 === Re) break;
    } else {
        s.push(De(62, ~2 & t));
        if (ns(6291471)) {
            if (7340051 === Re) break;
        } else break;
    }
    _e = e;
    os(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Pe = false;
        return new ArrayLiteralExpression(s);
    }
}

function qe(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw gs();
    if (4204593 !== Re) throw gs();
    Ye();
    const e = t;
    const s = De(61, 4);
    return new ForOfStatement(e, s, je);
}

function Ge(t) {
    const e = _e;
    const s = new Array;
    const r = new Array;
    Ye();
    while (7340045 !== Re) {
        s.push(Ue);
        if (49152 & Re) {
            Ye();
            os(6291476);
            r.push(De(62, ~2 & t));
        } else if (12288 & Re) {
            const e = Le;
            const s = Re;
            const i = ke;
            Ye();
            if (ns(6291476)) r.push(De(62, ~2 & t)); else {
                Le = e;
                Re = s;
                ke = i;
                r.push(De(515, ~2 & t));
            }
        } else throw As();
        if (7340045 !== Re) os(6291471);
    }
    _e = e;
    os(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Pe = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function He() {
    const t = [];
    const e = [];
    const s = Ce;
    let r = "";
    while (ke < s) {
        switch (Le) {
          case 36:
            if (123 === Me(ke + 1)) {
                t.push(r);
                r = "";
                ke += 2;
                Le = Me(ke);
                Ye();
                const s = De(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += Ie(de(Ze()));
            break;

          default:
            r += Ie(Le);
        }
        Ze();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Qe(t, e, s) {
    const r = _e;
    const i = [ Ue ];
    os(2163760);
    const n = [ De(62, t) ];
    while (2163759 !== (Re = is())) {
        i.push(Ue);
        os(2163760);
        n.push(De(62, t));
    }
    i.push(Ue);
    Pe = false;
    _e = r;
    if (s) {
        Ye();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Ye();
        return new TemplateExpression(i, n);
    }
}

function Xe(t) {
    Pe = false;
    const e = [ Ue ];
    Ye();
    return new TaggedTemplateExpression(e, e, t);
}

function Ye() {
    while (ke < Ce) {
        $e = ke;
        if (null != (Re = Vs[Le]())) return;
    }
    Re = 6291456;
}

function Ze() {
    return Le = Me(++ke);
}

function ts() {
    while (Ds[Ze()]) ;
    const t = js[Ue = Be()];
    return void 0 === t ? 4096 : t;
}

function es(t) {
    let e = Le;
    if (false === t) {
        do {
            e = Ze();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Ue = parseInt(Be(), 10);
            return 32768;
        }
        e = Ze();
        if (ke >= Ce) {
            Ue = parseInt(Be().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Ze();
    } while (e <= 57 && e >= 48); else Le = Me(--ke);
    Ue = parseFloat(Be());
    return 32768;
}

function ss() {
    const t = Le;
    Ze();
    let e = 0;
    const s = new Array;
    let r = ke;
    while (Le !== t) if (92 === Le) {
        s.push(Oe.slice(r, ke));
        Ze();
        e = de(Le);
        Ze();
        s.push(Ie(e));
        r = ke;
    } else if (ke >= Ce) throw xs(); else Ze();
    const i = Oe.slice(r, ke);
    Ze();
    s.push(i);
    const n = s.join("");
    Ue = n;
    return 16384;
}

function rs() {
    let t = true;
    let e = "";
    while (96 !== Ze()) if (36 === Le) if (ke + 1 < Ce && 123 === Me(ke + 1)) {
        ke++;
        t = false;
        break;
    } else e += "$"; else if (92 === Le) e += Ie(de(Ze())); else {
        if (ke >= Ce) throw ms();
        e += Ie(Le);
    }
    Ze();
    Ue = e;
    if (t) return 2163759;
    return 2163760;
}

const is = () => {
    if (ke >= Ce) throw ms();
    ke--;
    return rs();
};

const ns = t => {
    if (Re === t) {
        Ye();
        return true;
    }
    return false;
};

const os = t => {
    if (Re === t) Ye(); else throw ys(t);
};

const cs = () => u(`AUR0151:${Oe}`);

const us = () => u(`AUR0152:${Oe}`);

const hs = () => u(`AUR0153:${Oe}`);

const as = () => u(`AUR0154:${Oe}`);

const ls = () => u(`AUR0155:${Oe}`);

const fs = () => u(`AUR0156:${Oe}`);

const bs = () => u(`AUR0157`);

const ws = () => u(`AUR0158:${Oe}`);

const ps = () => u(`AUR0159:${Oe}`);

const ds = () => u(`AUR0160:${Oe}`);

const vs = () => u(`AUR0161:${Oe}`);

const gs = () => u(`AUR0163:${Oe}`);

const As = () => u(`AUR0164:${Oe}`);

const xs = () => u(`AUR0165:${Oe}`);

const ms = () => u(`AUR0166:${Oe}`);

const ys = t => u(`AUR0167:${Oe}<${_s[63 & t]}`);

const Es = () => {
    throw u(`AUR0168:${Oe}`);
};

Es.notMapped = true;

const Os = () => u(`AUR0170:${Oe}`);

const ks = () => u(`AUR0171:${Oe}`);

const Cs = () => u(`AUR0172:${Oe}`);

const Ss = () => u(`AUR0173:${Oe}`);

const $s = () => u(`AUR0174:${Oe}`);

const Rs = () => u(`AUR0175:${Oe}`);

const Us = () => u(`AUR0176:${Oe}`);

const Ls = () => u(`AUR0178:${Oe}`);

const Ps = () => u(`AUR0179:${Oe}`);

const _s = [ ve, ge, Ae, xe, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", ";", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163759, 2163760, "of", "=>" ];

const js = Object.assign(Object.create(null), {
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

const Is = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

const Ms = (t, e, s, r) => {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
};

const Bs = t => () => {
    Ze();
    return t;
};

const Ts = new Set;

Ms(null, Ts, Is.AsciiIdPart, true);

const Ds = new Uint8Array(65535);

Ms(Ds, null, Is.IdStart, 1);

Ms(Ds, null, Is.Digit, 1);

const Vs = new Array(65535);

Vs.fill(Es, 0, 65535);

Ms(Vs, null, Is.Skip, (() => {
    Ze();
    return null;
}));

Ms(Vs, null, Is.IdStart, ts);

Ms(Vs, null, Is.Digit, (() => es(false)));

Vs[34] = Vs[39] = () => ss();

Vs[96] = () => rs();

Vs[33] = () => {
    if (61 !== Ze()) return 131118;
    if (61 !== Ze()) return 6553949;
    Ze();
    return 6553951;
};

Vs[61] = () => {
    if (62 === Ze()) {
        Ze();
        return 50;
    }
    if (61 !== Le) return 4194349;
    if (61 !== Ze()) return 6553948;
    Ze();
    return 6553950;
};

Vs[38] = () => {
    if (38 !== Ze()) return 6291479;
    Ze();
    return 6553883;
};

Vs[124] = () => {
    if (124 !== Ze()) return 6291480;
    Ze();
    return 6553818;
};

Vs[63] = () => {
    if (46 === Ze()) {
        const t = Me(ke + 1);
        if (t <= 48 || t >= 57) {
            Ze();
            return 2162700;
        }
        return 6291478;
    }
    if (63 !== Le) return 6291478;
    Ze();
    return 6553753;
};

Vs[46] = () => {
    if (Ze() <= 57 && Le >= 48) return es(true);
    if (46 === Le) {
        if (46 !== Ze()) return 10;
        Ze();
        return 11;
    }
    return 65545;
};

Vs[60] = () => {
    if (61 !== Ze()) return 6554016;
    Ze();
    return 6554018;
};

Vs[62] = () => {
    if (61 !== Ze()) return 6554017;
    Ze();
    return 6554019;
};

Vs[37] = Bs(6554155);

Vs[40] = Bs(2688007);

Vs[41] = Bs(7340046);

Vs[42] = Bs(6554154);

Vs[43] = Bs(2490854);

Vs[44] = Bs(6291471);

Vs[45] = Bs(2490855);

Vs[47] = Bs(6554156);

Vs[58] = Bs(6291476);

Vs[59] = Bs(6291477);

Vs[91] = Bs(2688016);

Vs[93] = Bs(7340051);

Vs[123] = Bs(524296);

Vs[125] = Bs(7340045);

let Fs = null;

const Ns = [];

let zs = false;

function Ks() {
    zs = false;
}

function Ws() {
    zs = true;
}

function Js() {
    return Fs;
}

function qs(t) {
    if (null == t) throw u(`AUR0206`);
    if (null == Fs) {
        Fs = t;
        Ns[0] = Fs;
        zs = true;
        return;
    }
    if (Fs === t) throw u(`AUR0207`);
    Ns.push(t);
    Fs = t;
    zs = true;
}

function Gs(t) {
    if (null == t) throw u(`AUR0208`);
    if (Fs !== t) throw u(`AUR0209`);
    Ns.pop();
    Fs = Ns.length > 0 ? Ns[Ns.length - 1] : null;
    zs = null != Fs;
}

const Hs = Object.freeze({
    get current() {
        return Fs;
    },
    get connecting() {
        return zs;
    },
    enter: qs,
    exit: Gs,
    pause: Ks,
    resume: Ws
});

const Qs = Reflect.get;

const Xs = Object.prototype.toString;

const Ys = new WeakMap;

function Zs(t) {
    switch (Xs.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const tr = "__raw__";

function er(t) {
    return Zs(t) ? sr(t) : t;
}

function sr(t) {
    return Ys.get(t) ?? or(t);
}

function rr(t) {
    return t[tr] ?? t;
}

function ir(t) {
    return Zs(t) && t[tr] || t;
}

function nr(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function or(t) {
    const e = l(t) ? ur : b(t) || f(t) ? Lr : cr;
    const s = new Proxy(t, e);
    Ys.set(t, s);
    return s;
}

const cr = {
    get(t, e, s) {
        if (e === tr) return t;
        const r = Js();
        if (!zs || nr(e) || null == r) return Qs(t, e, s);
        r.observe(t, e);
        return er(Qs(t, e, s));
    }
};

const ur = {
    get(t, e, s) {
        if (e === tr) return t;
        if (!zs || nr(e) || null == Fs) return Qs(t, e, s);
        switch (e) {
          case "length":
            Fs.observe(t, "length");
            return t.length;

          case "map":
            return hr;

          case "includes":
            return fr;

          case "indexOf":
            return br;

          case "lastIndexOf":
            return wr;

          case "every":
            return ar;

          case "filter":
            return lr;

          case "find":
            return dr;

          case "findIndex":
            return pr;

          case "flat":
            return vr;

          case "flatMap":
            return gr;

          case "join":
            return Ar;

          case "push":
            return mr;

          case "pop":
            return xr;

          case "reduce":
            return Rr;

          case "reduceRight":
            return Ur;

          case "reverse":
            return kr;

          case "shift":
            return yr;

          case "unshift":
            return Er;

          case "slice":
            return $r;

          case "splice":
            return Or;

          case "some":
            return Cr;

          case "sort":
            return Sr;

          case "keys":
            return Dr;

          case "values":
          case Symbol.iterator:
            return Vr;

          case "entries":
            return Fr;
        }
        Fs.observe(t, e);
        return er(Qs(t, e, s));
    },
    ownKeys(t) {
        Js()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function hr(t, e) {
    const s = rr(this);
    const r = s.map(((s, r) => ir(t.call(e, er(s), r, this))));
    Nr(Fs, s);
    return er(r);
}

function ar(t, e) {
    const s = rr(this);
    const r = s.every(((s, r) => t.call(e, er(s), r, this)));
    Nr(Fs, s);
    return r;
}

function lr(t, e) {
    const s = rr(this);
    const r = s.filter(((s, r) => ir(t.call(e, er(s), r, this))));
    Nr(Fs, s);
    return er(r);
}

function fr(t) {
    const e = rr(this);
    const s = e.includes(ir(t));
    Nr(Fs, e);
    return s;
}

function br(t) {
    const e = rr(this);
    const s = e.indexOf(ir(t));
    Nr(Fs, e);
    return s;
}

function wr(t) {
    const e = rr(this);
    const s = e.lastIndexOf(ir(t));
    Nr(Fs, e);
    return s;
}

function pr(t, e) {
    const s = rr(this);
    const r = s.findIndex(((s, r) => ir(t.call(e, er(s), r, this))));
    Nr(Fs, s);
    return r;
}

function dr(t, e) {
    const s = rr(this);
    const r = s.find(((e, s) => t(er(e), s, this)), e);
    Nr(Fs, s);
    return er(r);
}

function vr() {
    const t = rr(this);
    Nr(Fs, t);
    return er(t.flat());
}

function gr(t, e) {
    const s = rr(this);
    Nr(Fs, s);
    return sr(s.flatMap(((s, r) => er(t.call(e, er(s), r, this)))));
}

function Ar(t) {
    const e = rr(this);
    Nr(Fs, e);
    return e.join(t);
}

function xr() {
    return er(rr(this).pop());
}

function mr(...t) {
    return rr(this).push(...t);
}

function yr() {
    return er(rr(this).shift());
}

function Er(...t) {
    return rr(this).unshift(...t);
}

function Or(...t) {
    return er(rr(this).splice(...t));
}

function kr(...t) {
    const e = rr(this);
    const s = e.reverse();
    Nr(Fs, e);
    return er(s);
}

function Cr(t, e) {
    const s = rr(this);
    const r = s.some(((s, r) => ir(t.call(e, er(s), r, this))));
    Nr(Fs, s);
    return r;
}

function Sr(t) {
    const e = rr(this);
    const s = e.sort(t);
    Nr(Fs, e);
    return er(s);
}

function $r(t, e) {
    const s = rr(this);
    Nr(Fs, s);
    return sr(s.slice(t, e));
}

function Rr(t, e) {
    const s = rr(this);
    const r = s.reduce(((e, s, r) => t(e, er(s), r, this)), e);
    Nr(Fs, s);
    return er(r);
}

function Ur(t, e) {
    const s = rr(this);
    const r = s.reduceRight(((e, s, r) => t(e, er(s), r, this)), e);
    Nr(Fs, s);
    return er(r);
}

const Lr = {
    get(t, e, s) {
        if (e === tr) return t;
        const r = Js();
        if (!zs || nr(e) || null == r) return Qs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Br;

          case "delete":
            return Tr;

          case "forEach":
            return Pr;

          case "add":
            if (t instanceof Set) return Mr;
            break;

          case "get":
            if (b(t)) return jr;
            break;

          case "set":
            if (b(t)) return Ir;
            break;

          case "has":
            return _r;

          case "keys":
            return Dr;

          case "values":
            return Vr;

          case "entries":
            return Fr;

          case Symbol.iterator:
            return b(t) ? Fr : Vr;
        }
        return er(Qs(t, e, s));
    }
};

function Pr(t, e) {
    const s = rr(this);
    Nr(Fs, s);
    return s.forEach(((s, r) => {
        t.call(e, er(s), er(r), this);
    }));
}

function _r(t) {
    const e = rr(this);
    Nr(Fs, e);
    return e.has(ir(t));
}

function jr(t) {
    const e = rr(this);
    Nr(Fs, e);
    return er(e.get(ir(t)));
}

function Ir(t, e) {
    return er(rr(this).set(ir(t), ir(e)));
}

function Mr(t) {
    return er(rr(this).add(ir(t)));
}

function Br() {
    return er(rr(this).clear());
}

function Tr(t) {
    return er(rr(this).delete(ir(t)));
}

function Dr() {
    const t = rr(this);
    Nr(Fs, t);
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
                value: er(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Vr() {
    const t = rr(this);
    Nr(Fs, t);
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
                value: er(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Fr() {
    const t = rr(this);
    Nr(Fs, t);
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
                value: [ er(s[0]), er(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Nr = (t, e) => t?.observeCollection(e);

const zr = Object.freeze({
    getProxy: sr,
    getRaw: rr,
    wrap: er,
    unwrap: ir,
    rawKey: tr
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
    static create(t, e, s, r, i) {
        const n = s.get;
        const o = s.set;
        const u = new ComputedObserver(t, n, o, i, r);
        const h = () => u.getValue();
        h.getObserver = () => u;
        c(t, e, {
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
        if (h(this.$set)) {
            if (t !== this.v) {
                this.ir = true;
                this.$set.call(this.o, t);
                this.ir = false;
                this.run();
            }
        } else throw u(`AUR0221`);
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
        if (!w(e, t)) {
            this.ov = t;
            Kr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Kr);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            qs(this);
            return this.v = ir(this.$get.call(this.up ? er(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Gs(this);
        }
    }
}

we(ComputedObserver);

Q(ComputedObserver);

let Kr;

const Wr = g("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Jr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const qr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (Jr.disabled) return;
            if (++this.O < Jr.timeoutsPerCheck) return;
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
        if (Jr.throw) throw u(`AUR0222:${v(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, qr);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.A.cancel();
            this.A = null;
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
        this.C = t;
    }
    getValue() {
        return this.obj[this.key];
    }
    setValue(t) {
        throw u(`Trying to set value for property ${v(this.key)} in dirty checker`);
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

Q(DirtyCheckProperty);

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
            if (w(t, this.v)) return;
            Gr = this.v;
            this.v = t;
            this.subs.notify(t, Gr);
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
            c(this.o, this.k, {
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
            c(this.o, this.k, {
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
        this.hs = h(s);
        const i = t[e];
        this.cb = h(i) ? i : void 0;
        this.v = r;
    }
    getValue() {
        return this.v;
    }
    setValue(t) {
        if (this.hs) t = this.S(t, null);
        if (!w(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.cb?.call(this.o, this.v, this.ov);
            Gr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Gr);
        }
    }
}

Q(SetterObserver);

Q(SetterNotifier);

let Gr;

const Hr = new PropertyAccessor;

const Qr = g("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Xr = g("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Hr;
    }
    getAccessor() {
        return Hr;
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
        if (null == t) throw si(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = ei(t);
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
        return Hr;
    }
    getArrayObserver(t) {
        return kt(t);
    }
    getMapObserver(t) {
        return ie(t);
    }
    getSetObserver(t) {
        return zt(t);
    }
    createObserver(t, e) {
        if (this.R.handles(t, e, this)) return this.R.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (l(t)) return kt(t).getLengthObserver();
            break;

          case "size":
            if (b(t)) return ie(t).getLengthObserver(); else if (f(t)) return zt(t).getLengthObserver();
            break;

          default:
            if (l(t) && r(e)) return kt(t).getIndexObserver(Number(e));
            break;
        }
        let s = ti(t, e);
        if (void 0 === s) {
            let r = Zr(t);
            while (null !== r) {
                s = ti(r, e);
                if (void 0 === s) r = Zr(r); else break;
            }
        }
        if (void 0 !== s && !o.call(s, "value")) {
            let r = this.U(t, e, s);
            if (null == r) r = (s.get?.getObserver ?? s.set?.getObserver)?.(t, this);
            return null == r ? s.configurable ? ComputedObserver.create(t, e, s, this, true) : this.C.createProperty(t, e) : r;
        }
        return new SetterObserver(t, e);
    }
    U(t, e, s) {
        if (this.$.length > 0) for (const r of this.$) {
            const i = r.getObserver(t, e, s, this);
            if (null != i) return i;
        }
        return null;
    }
}

ObserverLocator.inject = [ Wr, Xr ];

const Yr = t => {
    let e;
    if (l(t)) e = kt(t); else if (b(t)) e = ie(t); else if (f(t)) e = zt(t);
    return e;
};

const Zr = Object.getPrototypeOf;

const ti = Object.getOwnPropertyDescriptor;

const ei = t => {
    let e = t.$observers;
    if (void 0 === e) c(t, "$observers", {
        enumerable: false,
        value: e = A()
    });
    return e;
};

const si = t => u(`AUR0199:${v(t)}`);

const ri = g("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Qr ];
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
        if (this.stopped) throw u(`AUR0225`);
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
            Gs(this);
        }
        if (this.queued) {
            if (this.runCount > this.maxRunCount) {
                this.runCount = 0;
                throw u(`AUR0226`);
            }
            this.run();
        } else this.runCount = 0;
    }
    stop() {
        this.stopped = true;
        this.obs.clearAll();
    }
}

we(Effect);

function ii(t) {
    if (void 0 === t.$observers) c(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const ni = {};

function oi(t, e, s) {
    if (null == e) return (e, s, i) => r(e, s, i, t);
    return r(t, e, s);
    function r(t, e, s, r) {
        const i = void 0 === e;
        r = "object" !== typeof r ? {
            name: r
        } : r || {};
        if (i) e = r.name;
        if (null == e || "" === e) throw u(`AUR0224`);
        const n = r.callback || `${v(e)}Changed`;
        let o = ni;
        if (s) {
            delete s.value;
            delete s.writable;
            o = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const h = r.set;
        s.get = function t() {
            const s = ci(this, e, n, o, h);
            Js()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            ci(this, e, n, o, h).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return ci(s, e, n, o, h);
        };
        if (i) c(t.prototype, e, s); else return s;
    }
}

function ci(t, e, s, r, i) {
    const n = ii(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === ni ? void 0 : r);
        n[e] = o;
    }
    return o;
}

const ui = g("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = A();
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

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, V as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, D as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, Hs as ConnectableSwitcher, CustomExpression, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Jr as DirtyCheckSettings, E as ExpressionKind, Ee as ExpressionType, ForOfStatement, T as ICoercionConfiguration, Wr as IDirtyChecker, pe as IExpressionParser, Xr as INodeObserverLocator, ri as IObservation, Qr as IObserverLocator, ui as ISignaler, Interpolation, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, zr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, Unparser, ValueConverterExpression, St as applyMutationsToIndices, $ as astAssign, R as astBind, S as astEvaluate, U as astUnbind, y as astVisit, q as batch, z as cloneIndexMap, we as connectable, F as copyIndexMap, N as createIndexMap, Ot as disableArrayObservation, re as disableMapObservation, Nt as disableSetObservation, Et as enableArrayObservation, se as enableMapObservation, Ft as enableSetObservation, Yr as getCollectionObserver, ei as getObserverLookup, K as isIndexMap, oi as observable, Te as parseExpression, Q as subscriberCollection, $t as synchronizeIndices };

