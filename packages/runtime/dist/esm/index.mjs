import { DI as t, Protocol as e, emptyArray as s, isArrayIndex as r, IPlatform as n } from "@aurelia/kernel";

import { Metadata as i } from "@aurelia/metadata";

const o = Object.prototype.hasOwnProperty;

const c = Reflect.defineProperty;

const u = t => "function" === typeof t;

const h = t => "string" === typeof t;

const a = t => t instanceof Array;

function l(t, e, s) {
    c(t, e, {
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

const w = String;

const b = t.createInterface;

const p = () => Object.create(null);

const d = i.getOwn;

i.hasOwn;

const v = i.define;

e.annotation.keyFor;

e.resource.keyFor;

e.resource.appendTo;

const g = (t, e) => {
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
        g(t, e);
        return e.text;
    }
    visitAccessMember(t) {
        g(t.object, this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        g(t.object, this);
        this.text += `${t.optional ? "?." : ""}[`;
        g(t.key, this);
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
            g(e[t], this);
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
        g(t.body, this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            g(s[t], this);
        }
        this.text += "}";
    }
    visitPrimitiveLiteral(t) {
        this.text += "(";
        if (h(t.value)) {
            const e = t.value.replace(/'/g, "\\'");
            this.text += `'${e}'`;
        } else this.text += `${t.value}`;
        this.text += ")";
    }
    visitCallFunction(t) {
        this.text += "(";
        g(t.func, this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        g(t.object, this);
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
            g(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        g(t.func, this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            g(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        g(t.expression, this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        g(t.left, this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        g(t.right, this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        g(t.condition, this);
        this.text += "?";
        g(t.yes, this);
        this.text += ":";
        g(t.no, this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        g(t.target, this);
        this.text += "=";
        g(t.value, this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        g(t.expression, this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            g(e[t], this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        g(t.expression, this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            g(e[t], this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            g(e[t], this);
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
            g(s[t], this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitForOfStatement(t) {
        g(t.declaration, this);
        this.text += " of ";
        g(t.iterable, this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            g(s[t], this);
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
                g(o, this);
                break;

              case 24:
              case 25:
                {
                    const t = o.source;
                    if (t) {
                        g(t, this);
                        this.text += ":";
                    }
                    g(o, this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        g(t.source, this);
        this.text += ":";
        g(t.target, this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            g(e, this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        g(t.target, this);
    }
    visitCustom(t) {
        this.text += w(t.value);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            g(t[e], this);
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
    constructor(t, e, r, n = s) {
        this.cooked = t;
        this.func = r;
        this.expressions = n;
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
    constructor(t, e) {
        this.declaration = t;
        this.iterable = e;
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
        if (null == t) throw A();
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
        if (null == t) throw x();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw A();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const A = () => new Error(`AUR0203`);

const x = () => new Error("AUR0204");

class OverrideContext {}

const m = b("ISignaler", (t => t.singleton(Signaler)));

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

const y = Scope.getContext;

function O(t, e, s, r) {
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
            const n = y(e, t.name, t.ancestor);
            if (null !== r) r.observe(n, t.name);
            const i = n[t.name];
            if (null == i && "$host" === t.name) throw new Error(`AUR0105`);
            if (s?.strict) return s?.boundFn && u(i) ? i.bind(n) : i;
            return null == i ? "" : s?.boundFn && u(i) ? i.bind(n) : i;
        }

      case 2:
        return t.elements.map((t => O(t, e, s, r)));

      case 3:
        {
            const n = {};
            for (let i = 0; i < t.keys.length; ++i) n[t.keys[i]] = O(t.values[i], e, s, r);
            return n;
        }

      case 4:
        return t.value;

      case 5:
        {
            let n = t.cooked[0];
            for (let i = 0; i < t.expressions.length; ++i) {
                n += String(O(t.expressions[i], e, s, r));
                n += t.cooked[i + 1];
            }
            return n;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void O(t.expression, e, s, r);

          case "typeof":
            return typeof O(t.expression, e, s, r);

          case "!":
            return !O(t.expression, e, s, r);

          case "-":
            return -O(t.expression, e, s, r);

          case "+":
            return +O(t.expression, e, s, r);

          default:
            throw new Error(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const n = t.args.map((t => O(t, e, s, r)));
            const i = y(e, t.name, t.ancestor);
            const o = L(s?.strictFnCall, i, t.name);
            if (o) return o.apply(i, n);
            return;
        }

      case 8:
        {
            const n = O(t.object, e, s, r);
            const i = t.args.map((t => O(t, e, s, r)));
            const o = L(s?.strictFnCall, n, t.name);
            let c;
            if (o) {
                c = o.apply(n, i);
                if (a(n) && M.includes(t.name)) r?.observeCollection(n);
            }
            return c;
        }

      case 9:
        {
            const n = O(t.func, e, s, r);
            if (u(n)) return n(...t.args.map((t => O(t, e, s, r))));
            if (!s?.strictFnCall && null == n) return;
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
                return O(t.body, h, s, r);
            };
            return n;
        }

      case 10:
        {
            const n = O(t.object, e, s, r);
            let i;
            if (s?.strict) {
                if (null == n) return n;
                if (null !== r) r.observe(n, t.name);
                i = n[t.name];
                if (s?.boundFn && u(i)) return i.bind(n);
                return i;
            }
            if (null !== r && n instanceof Object) r.observe(n, t.name);
            if (n) {
                i = n[t.name];
                if (s?.boundFn && u(i)) return i.bind(n);
                return i;
            }
            return "";
        }

      case 11:
        {
            const n = O(t.object, e, s, r);
            if (n instanceof Object) {
                const i = O(t.key, e, s, r);
                if (null !== r) r.observe(n, i);
                return n[i];
            }
            return;
        }

      case 12:
        {
            const n = t.expressions.map((t => O(t, e, s, r)));
            const i = O(t.func, e, s, r);
            if (!u(i)) throw new Error(`AUR0110`);
            return i(t.cooked, ...n);
        }

      case 13:
        {
            const n = t.left;
            const i = t.right;
            switch (t.operation) {
              case "&&":
                return O(n, e, s, r) && O(i, e, s, r);

              case "||":
                return O(n, e, s, r) || O(i, e, s, r);

              case "??":
                return O(n, e, s, r) ?? O(i, e, s, r);

              case "==":
                return O(n, e, s, r) == O(i, e, s, r);

              case "===":
                return O(n, e, s, r) === O(i, e, s, r);

              case "!=":
                return O(n, e, s, r) != O(i, e, s, r);

              case "!==":
                return O(n, e, s, r) !== O(i, e, s, r);

              case "instanceof":
                {
                    const t = O(i, e, s, r);
                    if (u(t)) return O(n, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = O(i, e, s, r);
                    if (t instanceof Object) return O(n, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = O(n, e, s, r);
                    const o = O(i, e, s, r);
                    if (s?.strict) return t + o;
                    if (!t || !o) {
                        if (P(t) || P(o)) return (t || 0) + (o || 0);
                        if (_(t) || _(o)) return (t || "") + (o || "");
                    }
                    return t + o;
                }

              case "-":
                return O(n, e, s, r) - O(i, e, s, r);

              case "*":
                return O(n, e, s, r) * O(i, e, s, r);

              case "/":
                return O(n, e, s, r) / O(i, e, s, r);

              case "%":
                return O(n, e, s, r) % O(i, e, s, r);

              case "<":
                return O(n, e, s, r) < O(i, e, s, r);

              case ">":
                return O(n, e, s, r) > O(i, e, s, r);

              case "<=":
                return O(n, e, s, r) <= O(i, e, s, r);

              case ">=":
                return O(n, e, s, r) >= O(i, e, s, r);

              default:
                throw new Error(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return O(t.condition, e, s, r) ? O(t.yes, e, s, r) : O(t.no, e, s, r);

      case 15:
        return C(t.target, e, s, O(t.value, e, s, r));

      case 17:
        {
            const n = s?.getConverter?.(t.name);
            if (null == n) throw new Error(`AUR0103:${t.name}`);
            if ("toView" in n) return n.toView(O(t.expression, e, s, r), ...t.args.map((t => O(t, e, s, r))));
            return O(t.expression, e, s, r);
        }

      case 18:
        return O(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return O(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let n = t.parts[0];
            let i = 0;
            for (;i < t.expressions.length; ++i) {
                n += w(O(t.expressions[i], e, s, r));
                n += t.parts[i + 1];
            }
            return n;
        } else return `${t.parts[0]}${O(t.firstExpression, e, s, r)}${t.parts[1]}`;

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

function C(t, e, s, n) {
    switch (t.$kind) {
      case 1:
        {
            if ("$host" === t.name) throw new Error(`AUR0106`);
            const s = y(e, t.name, t.ancestor);
            if (s instanceof Object) if (void 0 !== s.$observers?.[t.name]) {
                s.$observers[t.name].setValue(n);
                return n;
            } else return s[t.name] = n;
            return;
        }

      case 10:
        {
            const r = O(t.object, e, s, null);
            if (r instanceof Object) if (void 0 !== r.$observers && void 0 !== r.$observers[t.name]) r.$observers[t.name].setValue(n); else r[t.name] = n; else C(t.object, e, s, {
                [t.name]: n
            });
            return n;
        }

      case 11:
        {
            const r = O(t.object, e, s, null);
            const i = O(t.key, e, s, null);
            return r[i] = n;
        }

      case 15:
        C(t.value, e, s, n);
        return C(t.target, e, s, n);

      case 17:
        {
            const r = s?.getConverter?.(t.name);
            if (null == r) throw U(t.name);
            if ("fromView" in r) n = r.fromView(n, ...t.args.map((t => O(t, e, s, null))));
            return C(t.expression, e, s, n);
        }

      case 18:
        return C(t.expression, e, s, n);

      case 24:
      case 25:
        {
            const r = t.list;
            const i = r.length;
            let o;
            let c;
            for (o = 0; o < i; o++) {
                c = r[o];
                switch (c.$kind) {
                  case 26:
                    C(c, e, s, n);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof n || null === n) throw new Error(`AUR0112`);
                        let t = O(c.source, Scope.create(n), s, null);
                        if (void 0 === t && c.initializer) t = O(c.initializer, e, s, null);
                        C(c, e, s, t);
                        break;
                    }
                }
            }
            break;
        }

      case 26:
        if (t instanceof DestructuringAssignmentSingleExpression) {
            if (null == n) return;
            if ("object" !== typeof n) throw new Error(`AUR0112`);
            let r = O(t.source, Scope.create(n), s, null);
            if (void 0 === r && t.initializer) r = O(t.initializer, e, s, null);
            C(t.target, e, s, r);
        } else {
            if (null == n) return;
            if ("object" !== typeof n) throw new Error(`AUR0112`);
            const i = t.indexOrProperties;
            let o;
            if (r(i)) {
                if (!Array.isArray(n)) throw new Error(`AUR0112`);
                o = n.slice(i);
            } else o = Object.entries(n).reduce(((t, [e, s]) => {
                if (!i.includes(e)) t[e] = s;
                return t;
            }), {});
            C(t.target, e, s, o);
        }
        break;

      case 28:
        return t.assign(e, s, n);

      default:
        return;
    }
}

function k(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const n = t.key;
            const i = s.getBehavior?.(r);
            if (null == i) throw $(r);
            if (void 0 === s[n]) {
                s[n] = i;
                i.bind?.(e, s, ...t.args.map((t => O(t, e, s, null))));
            } else throw R(r);
            k(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const n = s.getConverter?.(r);
            if (null == n) throw U(r);
            const i = n.signals;
            if (null != i) {
                const t = s.get?.(m);
                const e = i.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(i[r], s);
            }
            k(t.expression, e, s);
            return;
        }

      case 22:
        k(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function S(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const n = s;
            if (void 0 !== n[r]) {
                n[r].unbind?.(e, s);
                n[r] = void 0;
            }
            S(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const n = s.get(m);
            let i = 0;
            for (;i < r.signals.length; ++i) n.removeSignalListener(r.signals[i], s);
            S(t.expression, e, s);
            break;
        }

      case 22:
        S(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const $ = t => new Error(`AUR0101:${t}`);

const R = t => new Error(`AUR0102:${t}`);

const U = t => new Error(`AUR0103:${t}`);

const L = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (u(r)) return r;
    if (!t && null == r) return null;
    throw new Error(`AUR0111:${s}`);
};

const P = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const _ = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const M = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const j = t.createInterface("ICoercionConfiguration");

var I;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(I || (I = {}));

var B;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(B || (B = {}));

function T(t, e, s) {
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

function D(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function V(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function F(t) {
    return a(t) && true === t.isIndexMap;
}

let N = new Map;

let z = false;

function K(t) {
    const e = N;
    const s = N = new Map;
    z = true;
    try {
        t();
    } finally {
        N = null;
        z = false;
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
            N = e;
        }
    }
}

function W(t, e, s) {
    if (!N.has(t)) N.set(t, [ 2, e, s ]);
}

function J(t, e, s) {
    const r = N.get(t);
    if (void 0 === r) N.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function q(t) {
    return null == t ? G : G(t);
}

function G(t) {
    const e = t.prototype;
    c(e, "subs", {
        get: H
    });
    f(e, "subscribe", Q);
    f(e, "unsubscribe", X);
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
        if (z) {
            J(this, t, e);
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

function H() {
    return l(this, "subs", new SubscriberRecord);
}

function Q(t) {
    return this.subs.add(t);
}

function X(t) {
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

function Y(t) {
    const e = t.prototype;
    f(e, "subscribe", Z);
    f(e, "unsubscribe", tt);
    q(t);
}

function Z(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function tt(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

Y(CollectionLengthObserver);

Y(CollectionSizeObserver);

const et = "__au_array_obs__";

const st = (() => {
    let t = d(et, Array);
    if (null == t) v(et, t = new WeakMap, Array);
    return t;
})();

function rt(t, e) {
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

function it(t, e, s, r, n) {
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

function ot(t, e, s, r, n) {
    let i = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let w, b, p;
    let d, v;
    let g, E, A, x;
    let m, y, O, C;
    while (true) {
        if (r - s <= 10) {
            it(t, e, s, r, n);
            return;
        }
        i = s + (r - s >> 1);
        c = t[s];
        a = e[s];
        u = t[r - 1];
        l = e[r - 1];
        h = t[i];
        f = e[i];
        w = n(c, u);
        if (w > 0) {
            d = c;
            v = a;
            c = u;
            a = l;
            u = d;
            l = v;
        }
        b = n(c, h);
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
            p = n(u, h);
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
        E = l;
        A = s + 1;
        x = r - 1;
        t[i] = t[A];
        e[i] = e[A];
        t[A] = g;
        e[A] = E;
        t: for (o = A + 1; o < x; o++) {
            m = t[o];
            y = e[o];
            O = n(m, g);
            if (O < 0) {
                t[o] = t[A];
                e[o] = e[A];
                t[A] = m;
                e[A] = y;
                A++;
            } else if (O > 0) {
                do {
                    x--;
                    if (x == o) break t;
                    C = t[x];
                    O = n(C, g);
                } while (O > 0);
                t[o] = t[x];
                e[o] = e[x];
                t[x] = m;
                e[x] = y;
                if (O < 0) {
                    m = t[o];
                    y = e[o];
                    t[o] = t[A];
                    e[o] = e[A];
                    t[A] = m;
                    e[A] = y;
                    A++;
                }
            }
        }
        if (r - x < A - s) {
            ot(t, e, x, r, n);
            r = A;
        } else {
            ot(t, e, s, A, n);
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

const wt = ct.reverse;

const bt = ct.sort;

const pt = {
    push: ut,
    unshift: ht,
    pop: at,
    shift: lt,
    splice: ft,
    reverse: wt,
    sort: bt
};

const dt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const vt = {
    push: function(...t) {
        const e = st.get(this);
        if (void 0 === e) return ut.apply(this, t);
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
        const e = st.get(this);
        if (void 0 === e) return ht.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let n = 0;
        while (n < s) r[n++] = -2;
        ht.apply(e.indexMap, r);
        const i = ht.apply(this, t);
        e.notify();
        return i;
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
            ft.call(c, e, s, ...r);
        } else ft.apply(c, t);
        const a = ft.apply(this, t);
        r.notify();
        return a;
    },
    reverse: function() {
        const t = st.get(this);
        if (void 0 === t) {
            wt.call(this);
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
        const e = st.get(this);
        if (void 0 === e) {
            bt.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        ot(this, e.indexMap, 0, s, nt);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !u(t)) t = rt;
        ot(this, e.indexMap, 0, r, t);
        let n = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            n = true;
            break;
        }
        if (n) e.notify();
        return this;
    }
};

for (const t of dt) c(vt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let gt = false;

const Et = "__au_arr_on__";

function At() {
    if (!(d(Et, Array) ?? false)) {
        v(Et, true, Array);
        for (const t of dt) if (true !== ct[t].observing) l(ct, t, vt[t]);
    }
}

function xt() {
    for (const t of dt) if (true === ct[t].observing) l(ct, t, pt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!gt) {
            gt = true;
            At();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = D(t.length);
        this.lenObs = void 0;
        st.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (z) {
            W(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = D(r);
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

q(ArrayObserver);

q(ArrayIndexObserver);

function mt(t) {
    let e = st.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const yt = (t, e) => t - e;

function Ot(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const n = V(t);
    if (n.deletedIndices.length > 1) n.deletedIndices.sort(yt);
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

function Ct(t, e) {
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

const kt = "__au_set_obs__";

const St = (() => {
    let t = d(kt, Set);
    if (null == t) v(kt, t = new WeakMap, Set);
    return t;
})();

const $t = Set.prototype;

const Rt = $t.add;

const Ut = $t.clear;

const Lt = $t.delete;

const Pt = {
    add: Rt,
    clear: Ut,
    delete: Lt
};

const _t = [ "add", "clear", "delete" ];

const Mt = {
    add: function(t) {
        const e = St.get(this);
        if (void 0 === e) {
            Rt.call(this, t);
            return this;
        }
        const s = this.size;
        Rt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = St.get(this);
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
        const e = St.get(this);
        if (void 0 === e) return Lt.call(this, t);
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
                const i = Lt.call(this, t);
                if (true === i) e.notify();
                return i;
            }
            r++;
        }
        return false;
    }
};

const jt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of _t) c(Mt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let It = false;

const Bt = "__au_set_on__";

function Tt() {
    if (!(d(Bt, Set) ?? false)) {
        v(Bt, true, Set);
        for (const t of _t) if (true !== $t[t].observing) c($t, t, {
            ...jt,
            value: Mt[t]
        });
    }
}

function Dt() {
    for (const t of _t) if (true === $t[t].observing) c($t, t, {
        ...jt,
        value: Pt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!It) {
            It = true;
            Tt();
        }
        this.collection = t;
        this.indexMap = D(t.size);
        this.lenObs = void 0;
        St.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (z) {
            W(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = D(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

q(SetObserver);

function Vt(t) {
    let e = St.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Ft = "__au_map_obs__";

const Nt = (() => {
    let t = d(Ft, Map);
    if (null == t) v(Ft, t = new WeakMap, Map);
    return t;
})();

const zt = Map.prototype;

const Kt = zt.set;

const Wt = zt.clear;

const Jt = zt.delete;

const qt = {
    set: Kt,
    clear: Wt,
    delete: Jt
};

const Gt = [ "set", "clear", "delete" ];

const Ht = {
    set: function(t, e) {
        const s = Nt.get(this);
        if (void 0 === s) {
            Kt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const n = this.size;
        Kt.call(this, t, e);
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
        const t = Nt.get(this);
        if (void 0 === t) return Wt.call(this);
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
            Wt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Nt.get(this);
        if (void 0 === e) return Jt.call(this, t);
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
                const i = Jt.call(this, t);
                if (true === i) e.notify();
                return i;
            }
            ++r;
        }
        return false;
    }
};

const Qt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Gt) c(Ht[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Xt = false;

const Yt = "__au_map_on__";

function Zt() {
    if (!(d(Yt, Map) ?? false)) {
        v(Yt, true, Map);
        for (const t of Gt) if (true !== zt[t].observing) c(zt, t, {
            ...Qt,
            value: Ht[t]
        });
    }
}

function te() {
    for (const t of Gt) if (true === zt[t].observing) c(zt, t, {
        ...Qt,
        value: qt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Xt) {
            Xt = true;
            Zt();
        }
        this.collection = t;
        this.indexMap = D(t.size);
        this.lenObs = void 0;
        Nt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (z) {
            W(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = D(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

q(MapObserver);

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
    return l(this, "obs", new BindingObserverRecord(this));
}

function ne(t) {
    let e;
    if (a(t)) e = mt(t); else if (t instanceof Set) e = Vt(t); else if (t instanceof Map) e = ee(t); else throw new Error(`AUR0210`);
    this.obs.add(e);
}

function ie(t) {
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
    f(e, "observe", se);
    f(e, "observeCollection", ne);
    f(e, "subscribeTo", ie);
    c(e, "obs", {
        get: re
    });
    f(e, "handleChange", oe);
    f(e, "handleCollectionChange", ce);
    return t;
}

function le(t) {
    return null == t ? ae : ae(t);
}

const fe = b("IExpressionParser", (t => t.singleton(ExpressionParser)));

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
                throw cs();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        xe = t;
        me = 0;
        ye = t.length;
        Oe = 0;
        Ce = 0;
        ke = 6291456;
        Se = "";
        $e = t.charCodeAt(0);
        Re = true;
        Ue = false;
        return _e(61, void 0 === e ? 8 : e);
    }
}

function we(t) {
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

const be = PrimitiveLiteralExpression.$false;

const pe = PrimitiveLiteralExpression.$true;

const de = PrimitiveLiteralExpression.$null;

const ve = PrimitiveLiteralExpression.$undefined;

const ge = AccessThisExpression.$this;

const Ee = AccessThisExpression.$parent;

var Ae;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(Ae || (Ae = {}));

let xe = "";

let me = 0;

let ye = 0;

let Oe = 0;

let Ce = 0;

let ke = 6291456;

let Se = "";

let $e;

let Re = true;

let Ue = false;

function Le() {
    return xe.slice(Ce, me);
}

function Pe(t, e) {
    xe = t;
    me = 0;
    ye = t.length;
    Oe = 0;
    Ce = 0;
    ke = 6291456;
    Se = "";
    $e = t.charCodeAt(0);
    Re = true;
    Ue = false;
    return _e(61, void 0 === e ? 8 : e);
}

function _e(t, e) {
    if (16 === e) return new CustomExpression(xe);
    if (0 === me) {
        if (1 & e) return ze();
        Je();
        if (4194304 & ke) throw es();
    }
    Re = 513 > t;
    Ue = false;
    let s = false;
    let r;
    let n = 0;
    if (131072 & ke) {
        const t = Ss[63 & ke];
        Je();
        r = new UnaryExpression(t, _e(514, e));
        Re = false;
    } else {
        t: switch (ke) {
          case 12294:
            n = Oe;
            Re = false;
            do {
                Je();
                ++n;
                switch (ke) {
                  case 65545:
                    Je();
                    if (0 === (12288 & ke)) throw rs();
                    break;

                  case 10:
                  case 11:
                    throw rs();

                  case 2162700:
                    Ue = true;
                    Je();
                    if (0 === (12288 & ke)) {
                        r = 0 === n ? ge : 1 === n ? Ee : new AccessThisExpression(n);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & ke) {
                        r = 0 === n ? ge : 1 === n ? Ee : new AccessThisExpression(n);
                        break t;
                    }
                    throw ns();
                }
            } while (12294 === ke);

          case 4096:
            {
                const t = Se;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, n);
                Re = !Ue;
                Je();
                if (Ze(49)) {
                    if (524296 === ke) throw Cs();
                    const e = Ue;
                    const s = Oe;
                    ++Oe;
                    const n = _e(62, 0);
                    Ue = e;
                    Oe = s;
                    Re = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], n);
                }
                break;
            }

          case 10:
            throw ks();

          case 11:
            throw ss();

          case 12292:
            Re = false;
            Je();
            switch (Oe) {
              case 0:
                r = ge;
                break;

              case 1:
                r = Ee;
                break;

              default:
                r = new AccessThisExpression(Oe);
                break;
            }
            break;

          case 2688007:
            r = De(e);
            break;

          case 2688016:
            r = xe.search(/\s+of\s+/) > me ? Me() : Ve(e);
            break;

          case 524296:
            r = Ne(e);
            break;

          case 2163758:
            r = new TemplateExpression([ Se ]);
            Re = false;
            Je();
            break;

          case 2163759:
            r = Ke(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(Se);
            Re = false;
            Je();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Ss[63 & ke];
            Re = false;
            Je();
            break;

          default:
            if (me >= ye) throw is(); else throw os();
        }
        if (2 & e) return Fe(r);
        if (514 < t) return r;
        if (10 === ke || 11 === ke) throw rs();
        if (0 === r.$kind) switch (ke) {
          case 2162700:
            Ue = true;
            Re = false;
            Je();
            if (0 === (13312 & ke)) throw Es();
            if (12288 & ke) {
                r = new AccessScopeExpression(Se, r.ancestor);
                Je();
            } else if (2688007 === ke) r = new CallFunctionExpression(r, je(), true); else if (2688016 === ke) r = Ie(r, true); else throw As();
            break;

          case 65545:
            Re = !Ue;
            Je();
            if (0 === (12288 & ke)) throw rs();
            r = new AccessScopeExpression(Se, r.ancestor);
            Je();
            break;

          case 10:
          case 11:
            throw rs();

          case 2688007:
            r = new CallFunctionExpression(r, je(), s);
            break;

          case 2688016:
            r = Ie(r, s);
            break;

          case 2163758:
            r = We(r);
            break;

          case 2163759:
            r = Ke(e, r, true);
            break;
        }
        while ((65536 & ke) > 0) switch (ke) {
          case 2162700:
            r = Be(r);
            break;

          case 65545:
            Je();
            if (0 === (12288 & ke)) throw rs();
            r = Te(r, false);
            break;

          case 10:
          case 11:
            throw rs();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, je(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, je(), r.optional, false); else r = new CallFunctionExpression(r, je(), false);
            break;

          case 2688016:
            r = Ie(r, false);
            break;

          case 2163758:
            if (Ue) throw As();
            r = We(r);
            break;

          case 2163759:
            if (Ue) throw As();
            r = Ke(e, r, true);
            break;
        }
    }
    if (10 === ke || 11 === ke) throw rs();
    if (513 < t) return r;
    while ((262144 & ke) > 0) {
        const s = ke;
        if ((960 & s) <= t) break;
        Je();
        r = new BinaryExpression(Ss[63 & s], r, _e(960 & s, e));
        Re = false;
    }
    if (63 < t) return r;
    if (Ze(6291477)) {
        const t = _e(62, e);
        ts(6291476);
        r = new ConditionalExpression(r, t, _e(62, e));
        Re = false;
    }
    if (62 < t) return r;
    if (Ze(4194348)) {
        if (!Re) throw us();
        r = new AssignExpression(r, _e(62, e));
    }
    if (61 < t) return r;
    while (Ze(6291479)) {
        if (6291456 === ke) throw hs();
        const t = Se;
        Je();
        const s = new Array;
        while (Ze(6291476)) s.push(_e(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (Ze(6291478)) {
        if (6291456 === ke) throw as();
        const t = Se;
        Je();
        const s = new Array;
        while (Ze(6291476)) s.push(_e(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== ke) {
        if ((1 & e) > 0 && 7340045 === ke) return r;
        if ("of" === Le()) throw ls();
        throw os();
    }
    return r;
}

function Me() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let n = 0;
    while (r) {
        Je();
        switch (ke) {
          case 7340051:
            r = false;
            i();
            break;

          case 6291471:
            i();
            break;

          case 4096:
            s = Le();
            break;

          default:
            throw gs();
        }
    }
    ts(7340051);
    return e;
    function i() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(ge, s), new AccessKeyedExpression(ge, new PrimitiveLiteralExpression(n++)), void 0));
            s = "";
        } else n++;
    }
}

function je() {
    const t = Ue;
    Je();
    const e = [];
    while (7340046 !== ke) {
        e.push(_e(62, 0));
        if (!Ze(6291471)) break;
    }
    ts(7340046);
    Re = false;
    Ue = t;
    return e;
}

function Ie(t, e) {
    const s = Ue;
    Je();
    t = new AccessKeyedExpression(t, _e(62, 0), e);
    ts(7340051);
    Re = !s;
    Ue = s;
    return t;
}

function Be(t) {
    Ue = true;
    Re = false;
    Je();
    if (0 === (13312 & ke)) throw Es();
    if (12288 & ke) return Te(t, true);
    if (2688007 === ke) if (1 === t.$kind) return new CallScopeExpression(t.name, je(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, je(), t.optional, true); else return new CallFunctionExpression(t, je(), true);
    if (2688016 === ke) return Ie(t, true);
    throw As();
}

function Te(t, e) {
    const s = Se;
    switch (ke) {
      case 2162700:
        {
            Ue = true;
            Re = false;
            const r = me;
            const n = Ce;
            const i = ke;
            const o = $e;
            const c = Se;
            const u = Re;
            const h = Ue;
            Je();
            if (0 === (13312 & ke)) throw Es();
            if (2688007 === ke) return new CallMemberExpression(t, s, je(), e, true);
            me = r;
            Ce = n;
            ke = i;
            $e = o;
            Se = c;
            Re = u;
            Ue = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Re = false;
        return new CallMemberExpression(t, s, je(), e, false);

      default:
        Re = !Ue;
        Je();
        return new AccessMemberExpression(t, s, e);
    }
}

function De(t) {
    Je();
    const e = me;
    const s = Ce;
    const r = ke;
    const n = $e;
    const i = Se;
    const o = Re;
    const c = Ue;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === ke) {
            Je();
            if (4096 !== ke) throw rs();
            u.push(new BindingIdentifier(Se));
            Je();
            if (6291471 === ke) throw Os();
            if (7340046 !== ke) throw ss();
            Je();
            if (49 !== ke) throw ss();
            Je();
            const t = Ue;
            const e = Oe;
            ++Oe;
            const s = _e(62, 0);
            Ue = t;
            Oe = e;
            Re = false;
            return new ArrowFunction(u, s, true);
        }
        switch (ke) {
          case 4096:
            u.push(new BindingIdentifier(Se));
            Je();
            break;

          case 7340046:
            Je();
            break t;

          case 524296:
          case 2688016:
            Je();
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
            Je();
            h = 2;
            break;
        }
        switch (ke) {
          case 6291471:
            Je();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Je();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw xs();
            Je();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === ke) {
        if (1 === h) {
            Je();
            if (524296 === ke) throw Cs();
            const t = Ue;
            const e = Oe;
            ++Oe;
            const s = _e(62, 0);
            Ue = t;
            Oe = e;
            Re = false;
            return new ArrowFunction(u, s);
        }
        throw xs();
    } else if (1 === h && 0 === u.length) throw ds(49);
    if (a) switch (h) {
      case 2:
        throw xs();

      case 3:
        throw ms();

      case 4:
        throw ys();
    }
    me = e;
    Ce = s;
    ke = r;
    $e = n;
    Se = i;
    Re = o;
    Ue = c;
    const l = Ue;
    const f = _e(62, t);
    Ue = l;
    ts(7340046);
    if (49 === ke) switch (h) {
      case 2:
        throw xs();

      case 3:
        throw ms();

      case 4:
        throw ys();
    }
    return f;
}

function Ve(t) {
    const e = Ue;
    Je();
    const s = new Array;
    while (7340051 !== ke) if (Ze(6291471)) {
        s.push(ve);
        if (7340051 === ke) break;
    } else {
        s.push(_e(62, ~2 & t));
        if (Ze(6291471)) {
            if (7340051 === ke) break;
        } else break;
    }
    Ue = e;
    ts(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Re = false;
        return new ArrayLiteralExpression(s);
    }
}

function Fe(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw fs();
    if (4204592 !== ke) throw fs();
    Je();
    const e = t;
    const s = _e(61, 0);
    return new ForOfStatement(e, s);
}

function Ne(t) {
    const e = Ue;
    const s = new Array;
    const r = new Array;
    Je();
    while (7340045 !== ke) {
        s.push(Se);
        if (49152 & ke) {
            Je();
            ts(6291476);
            r.push(_e(62, ~2 & t));
        } else if (12288 & ke) {
            const e = $e;
            const s = ke;
            const n = me;
            Je();
            if (Ze(6291476)) r.push(_e(62, ~2 & t)); else {
                $e = e;
                ke = s;
                me = n;
                r.push(_e(515, ~2 & t));
            }
        } else throw ws();
        if (7340045 !== ke) ts(6291471);
    }
    Ue = e;
    ts(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Re = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function ze() {
    const t = [];
    const e = [];
    const s = ye;
    let r = "";
    while (me < s) {
        switch ($e) {
          case 36:
            if (123 === xe.charCodeAt(me + 1)) {
                t.push(r);
                r = "";
                me += 2;
                $e = xe.charCodeAt(me);
                Je();
                const s = _e(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += String.fromCharCode(we(qe()));
            break;

          default:
            r += String.fromCharCode($e);
        }
        qe();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ke(t, e, s) {
    const r = Ue;
    const n = [ Se ];
    ts(2163759);
    const i = [ _e(62, t) ];
    while (2163758 !== (ke = Ye())) {
        n.push(Se);
        ts(2163759);
        i.push(_e(62, t));
    }
    n.push(Se);
    Re = false;
    Ue = r;
    if (s) {
        Je();
        return new TaggedTemplateExpression(n, n, e, i);
    } else {
        Je();
        return new TemplateExpression(n, i);
    }
}

function We(t) {
    Re = false;
    const e = [ Se ];
    Je();
    return new TaggedTemplateExpression(e, e, t);
}

function Je() {
    while (me < ye) {
        Ce = me;
        if (null != (ke = Ms[$e]())) return;
    }
    ke = 6291456;
}

function qe() {
    return $e = xe.charCodeAt(++me);
}

function Ge() {
    while (_s[qe()]) ;
    const t = $s[Se = Le()];
    return void 0 === t ? 4096 : t;
}

function He(t) {
    let e = $e;
    if (false === t) {
        do {
            e = qe();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Se = parseInt(Le(), 10);
            return 32768;
        }
        e = qe();
        if (me >= ye) {
            Se = parseInt(Le().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = qe();
    } while (e <= 57 && e >= 48); else $e = xe.charCodeAt(--me);
    Se = parseFloat(Le());
    return 32768;
}

function Qe() {
    const t = $e;
    qe();
    let e = 0;
    const s = new Array;
    let r = me;
    while ($e !== t) if (92 === $e) {
        s.push(xe.slice(r, me));
        qe();
        e = we($e);
        qe();
        s.push(String.fromCharCode(e));
        r = me;
    } else if (me >= ye) throw bs(); else qe();
    const n = xe.slice(r, me);
    qe();
    s.push(n);
    const i = s.join("");
    Se = i;
    return 16384;
}

function Xe() {
    let t = true;
    let e = "";
    while (96 !== qe()) if (36 === $e) if (me + 1 < ye && 123 === xe.charCodeAt(me + 1)) {
        me++;
        t = false;
        break;
    } else e += "$"; else if (92 === $e) e += String.fromCharCode(we(qe())); else {
        if (me >= ye) throw ps();
        e += String.fromCharCode($e);
    }
    qe();
    Se = e;
    if (t) return 2163758;
    return 2163759;
}

function Ye() {
    if (me >= ye) throw ps();
    me--;
    return Xe();
}

function Ze(t) {
    if (ke === t) {
        Je();
        return true;
    }
    return false;
}

function ts(t) {
    if (ke === t) Je(); else throw ds(t);
}

function es() {
    return new Error(`AUR0151:${xe}`);
}

function ss() {
    return new Error(`AUR0152:${xe}`);
}

function rs() {
    return new Error(`AUR0153:${xe}`);
}

function ns() {
    return new Error(`AUR0154:${xe}`);
}

function is() {
    return new Error(`AUR0155:${xe}`);
}

function os() {
    return new Error(`AUR0156:${xe}`);
}

function cs() {
    return new Error(`AUR0157`);
}

function us() {
    return new Error(`AUR0158:${xe}`);
}

function hs() {
    return new Error(`AUR0159:${xe}`);
}

function as() {
    return new Error(`AUR0160:${xe}`);
}

function ls() {
    return new Error(`AUR0161:${xe}`);
}

function fs() {
    return new Error(`AUR0163:${xe}`);
}

function ws() {
    return new Error(`AUR0164:${xe}`);
}

function bs() {
    return new Error(`AUR0165:${xe}`);
}

function ps() {
    return new Error(`AUR0166:${xe}`);
}

function ds(t) {
    return new Error(`AUR0167:${xe}<${Ss[63 & t]}`);
}

const vs = () => {
    throw new Error(`AUR0168:${xe}`);
};

vs.notMapped = true;

function gs() {
    return new Error(`AUR0170:${xe}`);
}

function Es() {
    return new Error(`AUR0171:${xe}`);
}

function As() {
    return new Error(`AUR0172:${xe}`);
}

function xs() {
    return new Error(`AUR0173:${xe}`);
}

function ms() {
    return new Error(`AUR0174:${xe}`);
}

function ys() {
    return new Error(`AUR0175:${xe}`);
}

function Os() {
    return new Error(`AUR0176:${xe}`);
}

function Cs() {
    return new Error(`AUR0178:${xe}`);
}

function ks() {
    return new Error(`AUR0179:${xe}`);
}

const Ss = [ be, pe, de, ve, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const $s = Object.assign(Object.create(null), {
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

const Rs = {
    AsciiIdPart: [ 36, 0, 48, 58, 65, 91, 95, 0, 97, 123 ],
    IdStart: [ 36, 0, 65, 91, 95, 0, 97, 123, 170, 0, 186, 0, 192, 215, 216, 247, 248, 697, 736, 741, 7424, 7462, 7468, 7517, 7522, 7526, 7531, 7544, 7545, 7615, 7680, 7936, 8305, 0, 8319, 0, 8336, 8349, 8490, 8492, 8498, 0, 8526, 0, 8544, 8585, 11360, 11392, 42786, 42888, 42891, 42927, 42928, 42936, 42999, 43008, 43824, 43867, 43868, 43877, 64256, 64263, 65313, 65339, 65345, 65371 ],
    Digit: [ 48, 58 ],
    Skip: [ 0, 33, 127, 161 ]
};

function Us(t, e, s, r) {
    const n = s.length;
    for (let i = 0; i < n; i += 2) {
        const n = s[i];
        let o = s[i + 1];
        o = o > 0 ? o : n + 1;
        if (t) t.fill(r, n, o);
        if (e) for (let t = n; t < o; t++) e.add(t);
    }
}

function Ls(t) {
    return () => {
        qe();
        return t;
    };
}

const Ps = new Set;

Us(null, Ps, Rs.AsciiIdPart, true);

const _s = new Uint8Array(65535);

Us(_s, null, Rs.IdStart, 1);

Us(_s, null, Rs.Digit, 1);

const Ms = new Array(65535);

Ms.fill(vs, 0, 65535);

Us(Ms, null, Rs.Skip, (() => {
    qe();
    return null;
}));

Us(Ms, null, Rs.IdStart, Ge);

Us(Ms, null, Rs.Digit, (() => He(false)));

Ms[34] = Ms[39] = () => Qe();

Ms[96] = () => Xe();

Ms[33] = () => {
    if (61 !== qe()) return 131117;
    if (61 !== qe()) return 6553948;
    qe();
    return 6553950;
};

Ms[61] = () => {
    if (62 === qe()) {
        qe();
        return 49;
    }
    if (61 !== $e) return 4194348;
    if (61 !== qe()) return 6553947;
    qe();
    return 6553949;
};

Ms[38] = () => {
    if (38 !== qe()) return 6291478;
    qe();
    return 6553882;
};

Ms[124] = () => {
    if (124 !== qe()) return 6291479;
    qe();
    return 6553817;
};

Ms[63] = () => {
    if (46 === qe()) {
        const t = xe.charCodeAt(me + 1);
        if (t <= 48 || t >= 57) {
            qe();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== $e) return 6291477;
    qe();
    return 6553752;
};

Ms[46] = () => {
    if (qe() <= 57 && $e >= 48) return He(true);
    if (46 === $e) {
        if (46 !== qe()) return 10;
        qe();
        return 11;
    }
    return 65545;
};

Ms[60] = () => {
    if (61 !== qe()) return 6554015;
    qe();
    return 6554017;
};

Ms[62] = () => {
    if (61 !== qe()) return 6554016;
    qe();
    return 6554018;
};

Ms[37] = Ls(6554154);

Ms[40] = Ls(2688007);

Ms[41] = Ls(7340046);

Ms[42] = Ls(6554153);

Ms[43] = Ls(2490853);

Ms[44] = Ls(6291471);

Ms[45] = Ls(2490854);

Ms[47] = Ls(6554155);

Ms[58] = Ls(6291476);

Ms[91] = Ls(2688016);

Ms[93] = Ls(7340051);

Ms[123] = Ls(524296);

Ms[125] = Ls(7340045);

let js = null;

const Is = [];

let Bs = false;

function Ts() {
    Bs = false;
}

function Ds() {
    Bs = true;
}

function Vs() {
    return js;
}

function Fs(t) {
    if (null == t) throw new Error(`AUR0206`);
    if (null == js) {
        js = t;
        Is[0] = js;
        Bs = true;
        return;
    }
    if (js === t) throw new Error(`AUR0207`);
    Is.push(t);
    js = t;
    Bs = true;
}

function Ns(t) {
    if (null == t) throw new Error(`AUR0208`);
    if (js !== t) throw new Error(`AUR0209`);
    Is.pop();
    js = Is.length > 0 ? Is[Is.length - 1] : null;
    Bs = null != js;
}

const zs = Object.freeze({
    get current() {
        return js;
    },
    get connecting() {
        return Bs;
    },
    enter: Fs,
    exit: Ns,
    pause: Ts,
    resume: Ds
});

const Ks = Reflect.get;

const Ws = Object.prototype.toString;

const Js = new WeakMap;

function qs(t) {
    switch (Ws.call(t)) {
      case "[object Object]":
      case "[object Array]":
      case "[object Map]":
      case "[object Set]":
        return true;

      default:
        return false;
    }
}

const Gs = "__raw__";

function Hs(t) {
    return qs(t) ? Qs(t) : t;
}

function Qs(t) {
    return Js.get(t) ?? tr(t);
}

function Xs(t) {
    return t[Gs] ?? t;
}

function Ys(t) {
    return qs(t) && t[Gs] || t;
}

function Zs(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function tr(t) {
    const e = a(t) ? sr : t instanceof Map || t instanceof Set ? Cr : er;
    const s = new Proxy(t, e);
    Js.set(t, s);
    return s;
}

const er = {
    get(t, e, s) {
        if (e === Gs) return t;
        const r = Vs();
        if (!Bs || Zs(e) || null == r) return Ks(t, e, s);
        r.observe(t, e);
        return Hs(Ks(t, e, s));
    }
};

const sr = {
    get(t, e, s) {
        if (e === Gs) return t;
        const r = Vs();
        if (!Bs || Zs(e) || null == r) return Ks(t, e, s);
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
            return nr;

          case "filter":
            return ir;

          case "find":
            return ar;

          case "findIndex":
            return hr;

          case "flat":
            return lr;

          case "flatMap":
            return fr;

          case "join":
            return wr;

          case "push":
            return pr;

          case "pop":
            return br;

          case "reduce":
            return yr;

          case "reduceRight":
            return Or;

          case "reverse":
            return Er;

          case "shift":
            return dr;

          case "unshift":
            return vr;

          case "slice":
            return mr;

          case "splice":
            return gr;

          case "some":
            return Ar;

          case "sort":
            return xr;

          case "keys":
            return _r;

          case "values":
          case Symbol.iterator:
            return Mr;

          case "entries":
            return jr;
        }
        r.observe(t, e);
        return Hs(Ks(t, e, s));
    },
    ownKeys(t) {
        Vs()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function rr(t, e) {
    const s = Xs(this);
    const r = s.map(((s, r) => Ys(t.call(e, Hs(s), r, this))));
    Vs()?.observeCollection(s);
    return Hs(r);
}

function nr(t, e) {
    const s = Xs(this);
    const r = s.every(((s, r) => t.call(e, Hs(s), r, this)));
    Vs()?.observeCollection(s);
    return r;
}

function ir(t, e) {
    const s = Xs(this);
    const r = s.filter(((s, r) => Ys(t.call(e, Hs(s), r, this))));
    Vs()?.observeCollection(s);
    return Hs(r);
}

function or(t) {
    const e = Xs(this);
    const s = e.includes(Ys(t));
    Vs()?.observeCollection(e);
    return s;
}

function cr(t) {
    const e = Xs(this);
    const s = e.indexOf(Ys(t));
    Vs()?.observeCollection(e);
    return s;
}

function ur(t) {
    const e = Xs(this);
    const s = e.lastIndexOf(Ys(t));
    Vs()?.observeCollection(e);
    return s;
}

function hr(t, e) {
    const s = Xs(this);
    const r = s.findIndex(((s, r) => Ys(t.call(e, Hs(s), r, this))));
    Vs()?.observeCollection(s);
    return r;
}

function ar(t, e) {
    const s = Xs(this);
    const r = s.find(((e, s) => t(Hs(e), s, this)), e);
    Vs()?.observeCollection(s);
    return Hs(r);
}

function lr() {
    const t = Xs(this);
    Vs()?.observeCollection(t);
    return Hs(t.flat());
}

function fr(t, e) {
    const s = Xs(this);
    Vs()?.observeCollection(s);
    return Qs(s.flatMap(((s, r) => Hs(t.call(e, Hs(s), r, this)))));
}

function wr(t) {
    const e = Xs(this);
    Vs()?.observeCollection(e);
    return e.join(t);
}

function br() {
    return Hs(Xs(this).pop());
}

function pr(...t) {
    return Xs(this).push(...t);
}

function dr() {
    return Hs(Xs(this).shift());
}

function vr(...t) {
    return Xs(this).unshift(...t);
}

function gr(...t) {
    return Hs(Xs(this).splice(...t));
}

function Er(...t) {
    const e = Xs(this);
    const s = e.reverse();
    Vs()?.observeCollection(e);
    return Hs(s);
}

function Ar(t, e) {
    const s = Xs(this);
    const r = s.some(((s, r) => Ys(t.call(e, Hs(s), r, this))));
    Vs()?.observeCollection(s);
    return r;
}

function xr(t) {
    const e = Xs(this);
    const s = e.sort(t);
    Vs()?.observeCollection(e);
    return Hs(s);
}

function mr(t, e) {
    const s = Xs(this);
    Vs()?.observeCollection(s);
    return Qs(s.slice(t, e));
}

function yr(t, e) {
    const s = Xs(this);
    const r = s.reduce(((e, s, r) => t(e, Hs(s), r, this)), e);
    Vs()?.observeCollection(s);
    return Hs(r);
}

function Or(t, e) {
    const s = Xs(this);
    const r = s.reduceRight(((e, s, r) => t(e, Hs(s), r, this)), e);
    Vs()?.observeCollection(s);
    return Hs(r);
}

const Cr = {
    get(t, e, s) {
        if (e === Gs) return t;
        const r = Vs();
        if (!Bs || Zs(e) || null == r) return Ks(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Lr;

          case "delete":
            return Pr;

          case "forEach":
            return kr;

          case "add":
            if (t instanceof Set) return Ur;
            break;

          case "get":
            if (t instanceof Map) return $r;
            break;

          case "set":
            if (t instanceof Map) return Rr;
            break;

          case "has":
            return Sr;

          case "keys":
            return _r;

          case "values":
            return Mr;

          case "entries":
            return jr;

          case Symbol.iterator:
            return t instanceof Map ? jr : Mr;
        }
        return Hs(Ks(t, e, s));
    }
};

function kr(t, e) {
    const s = Xs(this);
    Vs()?.observeCollection(s);
    return s.forEach(((s, r) => {
        t.call(e, Hs(s), Hs(r), this);
    }));
}

function Sr(t) {
    const e = Xs(this);
    Vs()?.observeCollection(e);
    return e.has(Ys(t));
}

function $r(t) {
    const e = Xs(this);
    Vs()?.observeCollection(e);
    return Hs(e.get(Ys(t)));
}

function Rr(t, e) {
    return Hs(Xs(this).set(Ys(t), Ys(e)));
}

function Ur(t) {
    return Hs(Xs(this).add(Ys(t)));
}

function Lr() {
    return Hs(Xs(this).clear());
}

function Pr(t) {
    return Hs(Xs(this).delete(Ys(t)));
}

function _r() {
    const t = Xs(this);
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
                value: Hs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Mr() {
    const t = Xs(this);
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
                value: Hs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function jr() {
    const t = Xs(this);
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
                value: [ Hs(s[0]), Hs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Ir = Object.freeze({
    getProxy: Qs,
    getRaw: Xs,
    wrap: Hs,
    unwrap: Ys,
    rawKey: Gs
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
    static create(t, e, s, r, n) {
        const i = s.get;
        const o = s.set;
        const u = new ComputedObserver(t, i, o, n, r);
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
        if (u(this.$set)) {
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
            Br = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Br);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            Fs(this);
            return this.v = Ys(this.$get.call(this.up ? Hs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Ns(this);
        }
    }
}

le(ComputedObserver);

q(ComputedObserver);

let Br;

const Tr = b("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const Dr = {
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
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (Dr.disabled) return;
            if (++this.O < Dr.timeoutsPerCheck) return;
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
        if (Dr.throw) throw new Error(`AUR0222:${w(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Vr);
    }
    removeProperty(t) {
        this.tracked.splice(this.tracked.indexOf(t), 1);
        if (0 === this.tracked.length) {
            this.A.cancel();
            this.A = null;
        }
    }
}

DirtyChecker.inject = [ n ];

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
            this.C.addProperty(this);
        }
    }
    unsubscribe(t) {
        if (this.subs.remove(t) && 0 === this.subs.count) this.C.removeProperty(this);
    }
}

q(DirtyCheckProperty);

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
            Fr = this.v;
            this.v = t;
            this.subs.notify(t, Fr);
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
        this.hs = u(s);
        const n = t[e];
        this.cb = u(n) ? n : void 0;
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
            Fr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Fr);
        }
    }
}

q(SetterObserver);

q(SetterNotifier);

let Fr;

const Nr = new PropertyAccessor;

const zr = b("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Kr = b("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Nr;
    }
    getAccessor() {
        return Nr;
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
        if (null == t) throw Hr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Gr(t);
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
        return Nr;
    }
    getArrayObserver(t) {
        return mt(t);
    }
    getMapObserver(t) {
        return ee(t);
    }
    getSetObserver(t) {
        return Vt(t);
    }
    createObserver(t, e) {
        if (this.R.handles(t, e, this)) return this.R.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (a(t)) return mt(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return ee(t).getLengthObserver(); else if (t instanceof Set) return Vt(t).getLengthObserver();
            break;

          default:
            if (a(t) && r(e)) return mt(t).getIndexObserver(Number(e));
            break;
        }
        let s = qr(t, e);
        if (void 0 === s) {
            let r = Jr(t);
            while (null !== r) {
                s = qr(r, e);
                if (void 0 === s) r = Jr(r); else break;
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
            const n = r.getObserver(t, e, s, this);
            if (null != n) return n;
        }
        return null;
    }
}

ObserverLocator.inject = [ Tr, Kr ];

const Wr = t => {
    let e;
    if (a(t)) e = mt(t); else if (t instanceof Map) e = ee(t); else if (t instanceof Set) e = Vt(t);
    return e;
};

const Jr = Object.getPrototypeOf;

const qr = Object.getOwnPropertyDescriptor;

const Gr = t => {
    let e = t.$observers;
    if (void 0 === e) c(t, "$observers", {
        enumerable: false,
        value: e = p()
    });
    return e;
};

const Hr = t => new Error(`AUR0199:${w(t)}`);

const Qr = b("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ zr ];
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
            Fs(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Ns(this);
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

function Xr(t) {
    if (void 0 === t.$observers) c(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const Yr = {};

function Zr(t, e, s) {
    if (null == e) return (e, s, n) => r(e, s, n, t);
    return r(t, e, s);
    function r(t, e, s, r) {
        const n = void 0 === e;
        r = "object" !== typeof r ? {
            name: r
        } : r || {};
        if (n) e = r.name;
        if (null == e || "" === e) throw new Error(`AUR0224`);
        const i = r.callback || `${w(e)}Changed`;
        let o = Yr;
        if (s) {
            delete s.value;
            delete s.writable;
            o = s.initializer?.();
            delete s.initializer;
        } else s = {
            configurable: true
        };
        if (!("enumerable" in s)) s.enumerable = true;
        const u = r.set;
        s.get = function t() {
            const s = tn(this, e, i, o, u);
            Vs()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            tn(this, e, i, o, u).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return tn(s, e, i, o, u);
        };
        if (n) c(t.prototype, e, s); else return s;
    }
}

function tn(t, e, s, r, n) {
    const i = Xr(t);
    let o = i[e];
    if (null == o) {
        o = new SetterNotifier(t, s, n, r === Yr ? void 0 : r);
        i[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, B as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, I as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, zs as ConnectableSwitcher, CustomExpression, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Dr as DirtyCheckSettings, E as ExpressionKind, Ae as ExpressionType, ForOfStatement, j as ICoercionConfiguration, Tr as IDirtyChecker, fe as IExpressionParser, Kr as INodeObserverLocator, Qr as IObservation, zr as IObserverLocator, m as ISignaler, Interpolation, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Ir as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, Unparser, ValueConverterExpression, Ot as applyMutationsToIndices, C as astAssign, k as astBind, O as astEvaluate, S as astUnbind, g as astVisit, K as batch, V as cloneIndexMap, le as connectable, T as copyIndexMap, D as createIndexMap, xt as disableArrayObservation, te as disableMapObservation, Dt as disableSetObservation, At as enableArrayObservation, Zt as enableMapObservation, Tt as enableSetObservation, Wr as getCollectionObserver, Gr as getObserverLookup, F as isIndexMap, Zr as observable, Pe as parseExpression, q as subscriberCollection, Ct as synchronizeIndices };
//# sourceMappingURL=index.mjs.map
