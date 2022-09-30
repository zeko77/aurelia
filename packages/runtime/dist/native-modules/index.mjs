import { DI as t, Protocol as e, emptyArray as s, isArrayIndex as r, IPlatform as i } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as n } from "../../../metadata/dist/native-modules/index.mjs";

const o = Object.prototype.hasOwnProperty;

const c = Reflect.defineProperty;

const u = t => new Error(t);

const h = t => "function" === typeof t;

const a = t => "string" === typeof t;

const l = t => t instanceof Array;

function f(t, e, s) {
    c(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function b(t, e, s) {
    if (!(e in t)) f(t, e, s);
}

const w = String;

const p = t.createInterface;

const d = () => Object.create(null);

const v = n.getOwn;

n.hasOwn;

const g = n.define;

e.annotation.keyFor;

e.resource.keyFor;

e.resource.appendTo;

const A = (t, e) => {
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
        A(t, e);
        return e.text;
    }
    visitAccessMember(t) {
        A(t.object, this);
        this.text += `${t.optional ? "?" : ""}.${t.name}`;
    }
    visitAccessKeyed(t) {
        A(t.object, this);
        this.text += `${t.optional ? "?." : ""}[`;
        A(t.key, this);
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
            A(e[t], this);
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
        A(t.body, this);
    }
    visitObjectLiteral(t) {
        const e = t.keys;
        const s = t.values;
        this.text += "{";
        for (let t = 0, r = e.length; t < r; ++t) {
            if (0 !== t) this.text += ",";
            this.text += `'${e[t]}':`;
            A(s[t], this);
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
        A(t.func, this);
        this.text += t.optional ? "?." : "";
        this.writeArgs(t.args);
        this.text += ")";
    }
    visitCallMember(t) {
        this.text += "(";
        A(t.object, this);
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
            A(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitTaggedTemplate(t) {
        const {cooked: e, expressions: s} = t;
        const r = s.length;
        A(t.func, this);
        this.text += "`";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            A(s[t], this);
            this.text += e[t + 1];
        }
        this.text += "`";
    }
    visitUnary(t) {
        this.text += `(${t.operation}`;
        if (t.operation.charCodeAt(0) >= 97) this.text += " ";
        A(t.expression, this);
        this.text += ")";
    }
    visitBinary(t) {
        this.text += "(";
        A(t.left, this);
        if (105 === t.operation.charCodeAt(0)) this.text += ` ${t.operation} `; else this.text += t.operation;
        A(t.right, this);
        this.text += ")";
    }
    visitConditional(t) {
        this.text += "(";
        A(t.condition, this);
        this.text += "?";
        A(t.yes, this);
        this.text += ":";
        A(t.no, this);
        this.text += ")";
    }
    visitAssign(t) {
        this.text += "(";
        A(t.target, this);
        this.text += "=";
        A(t.value, this);
        this.text += ")";
    }
    visitValueConverter(t) {
        const e = t.args;
        A(t.expression, this);
        this.text += `|${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            A(e[t], this);
        }
    }
    visitBindingBehavior(t) {
        const e = t.args;
        A(t.expression, this);
        this.text += `&${t.name}`;
        for (let t = 0, s = e.length; t < s; ++t) {
            this.text += ":";
            A(e[t], this);
        }
    }
    visitArrayBindingPattern(t) {
        const e = t.elements;
        this.text += "[";
        for (let t = 0, s = e.length; t < s; ++t) {
            if (0 !== t) this.text += ",";
            A(e[t], this);
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
            A(s[t], this);
        }
        this.text += "}";
    }
    visitBindingIdentifier(t) {
        this.text += t.name;
    }
    visitForOfStatement(t) {
        A(t.declaration, this);
        this.text += " of ";
        A(t.iterable, this);
    }
    visitInterpolation(t) {
        const {parts: e, expressions: s} = t;
        const r = s.length;
        this.text += "${";
        this.text += e[0];
        for (let t = 0; t < r; t++) {
            A(s[t], this);
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
                A(o, this);
                break;

              case 24:
              case 25:
                {
                    const t = o.source;
                    if (t) {
                        A(t, this);
                        this.text += ":";
                    }
                    A(o, this);
                    break;
                }
            }
        }
        this.text += s ? "}" : "]";
    }
    visitDestructuringAssignmentSingleExpression(t) {
        A(t.source, this);
        this.text += ":";
        A(t.target, this);
        const e = t.initializer;
        if (void 0 !== e) {
            this.text += "=";
            A(e, this);
        }
    }
    visitDestructuringAssignmentRestExpression(t) {
        this.text += "...";
        A(t.target, this);
    }
    visitCustom(t) {
        this.text += w(t.value);
    }
    writeArgs(t) {
        this.text += "(";
        for (let e = 0, s = t.length; e < s; ++e) {
            if (0 !== e) this.text += ",";
            A(t[e], this);
        }
        this.text += ")";
    }
}

var x;

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
})(x || (x = {}));

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
        if (null == t) throw m();
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
        if (null == t) throw y();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw m();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const m = () => u(`AUR0203`);

const y = () => u("AUR0204");

class OverrideContext {}

const E = p("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = d();
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

const O = Scope.getContext;

function k(t, e, s, r) {
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
            const i = O(e, t.name, t.ancestor);
            if (null !== r) r.observe(i, t.name);
            const n = i[t.name];
            if (null == n && "$host" === t.name) throw u(`AUR0105`);
            if (s?.strict) return s?.boundFn && h(n) ? n.bind(i) : n;
            return null == n ? "" : s?.boundFn && h(n) ? n.bind(i) : n;
        }

      case 2:
        return t.elements.map((t => k(t, e, s, r)));

      case 3:
        {
            const i = {};
            for (let n = 0; n < t.keys.length; ++n) i[t.keys[n]] = k(t.values[n], e, s, r);
            return i;
        }

      case 4:
        return t.value;

      case 5:
        {
            let i = t.cooked[0];
            for (let n = 0; n < t.expressions.length; ++n) {
                i += String(k(t.expressions[n], e, s, r));
                i += t.cooked[n + 1];
            }
            return i;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void k(t.expression, e, s, r);

          case "typeof":
            return typeof k(t.expression, e, s, r);

          case "!":
            return !k(t.expression, e, s, r);

          case "-":
            return -k(t.expression, e, s, r);

          case "+":
            return +k(t.expression, e, s, r);

          default:
            throw u(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const i = t.args.map((t => k(t, e, s, r)));
            const n = O(e, t.name, t.ancestor);
            const o = P(s?.strictFnCall, n, t.name);
            if (o) return o.apply(n, i);
            return;
        }

      case 8:
        {
            const i = k(t.object, e, s, r);
            const n = t.args.map((t => k(t, e, s, r)));
            const o = P(s?.strictFnCall, i, t.name);
            let c;
            if (o) {
                c = o.apply(i, n);
                if (l(i) && j.includes(t.name)) r?.observeCollection(i);
            }
            return c;
        }

      case 9:
        {
            const i = k(t.func, e, s, r);
            if (h(i)) return i(...t.args.map((t => k(t, e, s, r))));
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
                return k(t.body, h, s, r);
            };
            return i;
        }

      case 10:
        {
            const i = k(t.object, e, s, r);
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
            const i = k(t.object, e, s, r);
            if (i instanceof Object) {
                const n = k(t.key, e, s, r);
                if (null !== r) r.observe(i, n);
                return i[n];
            }
            return;
        }

      case 12:
        {
            const i = t.expressions.map((t => k(t, e, s, r)));
            const n = k(t.func, e, s, r);
            if (!h(n)) throw u(`AUR0110`);
            return n(t.cooked, ...i);
        }

      case 13:
        {
            const i = t.left;
            const n = t.right;
            switch (t.operation) {
              case "&&":
                return k(i, e, s, r) && k(n, e, s, r);

              case "||":
                return k(i, e, s, r) || k(n, e, s, r);

              case "??":
                return k(i, e, s, r) ?? k(n, e, s, r);

              case "==":
                return k(i, e, s, r) == k(n, e, s, r);

              case "===":
                return k(i, e, s, r) === k(n, e, s, r);

              case "!=":
                return k(i, e, s, r) != k(n, e, s, r);

              case "!==":
                return k(i, e, s, r) !== k(n, e, s, r);

              case "instanceof":
                {
                    const t = k(n, e, s, r);
                    if (h(t)) return k(i, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = k(n, e, s, r);
                    if (t instanceof Object) return k(i, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = k(i, e, s, r);
                    const o = k(n, e, s, r);
                    if (s?.strict) return t + o;
                    if (!t || !o) {
                        if (_(t) || _(o)) return (t || 0) + (o || 0);
                        if (M(t) || M(o)) return (t || "") + (o || "");
                    }
                    return t + o;
                }

              case "-":
                return k(i, e, s, r) - k(n, e, s, r);

              case "*":
                return k(i, e, s, r) * k(n, e, s, r);

              case "/":
                return k(i, e, s, r) / k(n, e, s, r);

              case "%":
                return k(i, e, s, r) % k(n, e, s, r);

              case "<":
                return k(i, e, s, r) < k(n, e, s, r);

              case ">":
                return k(i, e, s, r) > k(n, e, s, r);

              case "<=":
                return k(i, e, s, r) <= k(n, e, s, r);

              case ">=":
                return k(i, e, s, r) >= k(n, e, s, r);

              default:
                throw u(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return k(t.condition, e, s, r) ? k(t.yes, e, s, r) : k(t.no, e, s, r);

      case 15:
        return C(t.target, e, s, k(t.value, e, s, r));

      case 17:
        {
            const i = s?.getConverter?.(t.name);
            if (null == i) throw u(`AUR0103:${t.name}`);
            if ("toView" in i) return i.toView(k(t.expression, e, s, r), ...t.args.map((t => k(t, e, s, r))));
            return k(t.expression, e, s, r);
        }

      case 18:
        return k(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return k(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let i = t.parts[0];
            let n = 0;
            for (;n < t.expressions.length; ++n) {
                i += w(k(t.expressions[n], e, s, r));
                i += t.parts[n + 1];
            }
            return i;
        } else return `${t.parts[0]}${k(t.firstExpression, e, s, r)}${t.parts[1]}`;

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

function C(t, e, s, i) {
    switch (t.$kind) {
      case 1:
        {
            if ("$host" === t.name) throw u(`AUR0106`);
            const s = O(e, t.name, t.ancestor);
            if (s instanceof Object) if (void 0 !== s.$observers?.[t.name]) {
                s.$observers[t.name].setValue(i);
                return i;
            } else return s[t.name] = i;
            return;
        }

      case 10:
        {
            const r = k(t.object, e, s, null);
            if (r instanceof Object) if (void 0 !== r.$observers && void 0 !== r.$observers[t.name]) r.$observers[t.name].setValue(i); else r[t.name] = i; else C(t.object, e, s, {
                [t.name]: i
            });
            return i;
        }

      case 11:
        {
            const r = k(t.object, e, s, null);
            const n = k(t.key, e, s, null);
            return r[n] = i;
        }

      case 15:
        C(t.value, e, s, i);
        return C(t.target, e, s, i);

      case 17:
        {
            const r = s?.getConverter?.(t.name);
            if (null == r) throw L(t.name);
            if ("fromView" in r) i = r.fromView(i, ...t.args.map((t => k(t, e, s, null))));
            return C(t.expression, e, s, i);
        }

      case 18:
        return C(t.expression, e, s, i);

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
                    C(c, e, s, i);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof i || null === i) throw u(`AUR0112`);
                        let t = k(c.source, Scope.create(i), s, null);
                        if (void 0 === t && c.initializer) t = k(c.initializer, e, s, null);
                        C(c, e, s, t);
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
            let r = k(t.source, Scope.create(i), s, null);
            if (void 0 === r && t.initializer) r = k(t.initializer, e, s, null);
            C(t.target, e, s, r);
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
            C(t.target, e, s, o);
        }
        break;

      case 28:
        return t.assign(e, s, i);

      default:
        return;
    }
}

function S(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const i = t.key;
            const n = s.getBehavior?.(r);
            if (null == n) throw R(r);
            if (void 0 === s[i]) {
                s[i] = n;
                n.bind?.(e, s, ...t.args.map((t => k(t, e, s, null))));
            } else throw U(r);
            S(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const i = s.getConverter?.(r);
            if (null == i) throw L(r);
            const n = i.signals;
            if (null != n) {
                const t = s.get?.(E);
                const e = n.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(n[r], s);
            }
            S(t.expression, e, s);
            return;
        }

      case 22:
        S(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function $(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const i = s;
            if (void 0 !== i[r]) {
                i[r].unbind?.(e, s);
                i[r] = void 0;
            }
            $(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const i = s.get(E);
            let n = 0;
            for (;n < r.signals.length; ++n) i.removeSignalListener(r.signals[n], s);
            $(t.expression, e, s);
            break;
        }

      case 22:
        $(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const R = t => u(`AUR0101:${t}`);

const U = t => u(`AUR0102:${t}`);

const L = t => u(`AUR0103:${t}`);

const P = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (h(r)) return r;
    if (!t && null == r) return null;
    throw u(`AUR0111:${s}`);
};

const _ = t => {
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

const j = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const I = t.createInterface("ICoercionConfiguration");

var B;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(B || (B = {}));

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

function D(t, e, s) {
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

function V(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function F(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function N(t) {
    return l(t) && true === t.isIndexMap;
}

let z = new Map;

let K = false;

function W(t) {
    const e = z;
    const s = z = new Map;
    K = true;
    try {
        t();
    } finally {
        z = null;
        K = false;
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
            z = e;
        }
    }
}

function J(t, e, s) {
    if (!z.has(t)) z.set(t, [ 2, e, s ]);
}

function q(t, e, s) {
    const r = z.get(t);
    if (void 0 === r) z.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function G(t) {
    return null == t ? H : H(t);
}

function H(t) {
    const e = t.prototype;
    c(e, "subs", {
        get: Q
    });
    b(e, "subscribe", X);
    b(e, "unsubscribe", Y);
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
        if (K) {
            q(this, t, e);
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

function Q() {
    return f(this, "subs", new SubscriberRecord);
}

function X(t) {
    return this.subs.add(t);
}

function Y(t) {
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
        throw u(`AUR02`);
    }
    handleCollectionChange(t, e) {
        const s = this.v;
        const r = this.o.size;
        if ((this.v = r) !== s) this.subs.notify(this.v, s);
    }
}

function Z(t) {
    const e = t.prototype;
    b(e, "subscribe", tt);
    b(e, "unsubscribe", et);
    G(t);
}

function tt(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function et(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

Z(CollectionLengthObserver);

Z(CollectionSizeObserver);

const st = "__au_array_obs__";

const rt = (() => {
    let t = v(st, Array);
    if (null == t) g(st, t = new WeakMap, Array);
    return t;
})();

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
    let b, w, p;
    let d, v;
    let g, A, x, m;
    let y, E, O, k;
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
            ct(t, e, m, r, i);
            r = x;
        } else {
            ct(t, e, s, x, i);
            s = m;
        }
    }
}

const ut = Array.prototype;

const ht = ut.push;

const at = ut.unshift;

const lt = ut.pop;

const ft = ut.shift;

const bt = ut.splice;

const wt = ut.reverse;

const pt = ut.sort;

const dt = {
    push: ht,
    unshift: at,
    pop: lt,
    shift: ft,
    splice: bt,
    reverse: wt,
    sort: pt
};

const vt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const gt = {
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
        if (void 0 === r) return bt.apply(this, t);
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
            bt.call(c, e, s, ...r);
        } else bt.apply(c, t);
        const l = bt.apply(this, t);
        if (h > 0 || a > 0) r.notify();
        return l;
    },
    reverse: function() {
        const t = rt.get(this);
        if (void 0 === t) {
            wt.call(this);
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
            pt.call(this, t);
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
        if (void 0 === t || !h(t)) t = it;
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

for (const t of vt) c(gt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let At = false;

const xt = "__au_arr_on__";

function mt() {
    if (!(v(xt, Array) ?? false)) {
        g(xt, true, Array);
        for (const t of vt) if (true !== ut[t].observing) f(ut, t, gt[t]);
    }
}

function yt() {
    for (const t of vt) if (true === ut[t].observing) f(ut, t, dt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!At) {
            At = true;
            mt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = V(t.length);
        this.lenObs = void 0;
        rt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (K) {
            J(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = V(r);
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

G(ArrayObserver);

G(ArrayIndexObserver);

function Et(t) {
    let e = rt.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const Ot = (t, e) => t - e;

function kt(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = F(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(Ot);
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

function Ct(t, e) {
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

const St = "__au_set_obs__";

const $t = (() => {
    let t = v(St, Set);
    if (null == t) g(St, t = new WeakMap, Set);
    return t;
})();

const Rt = Set.prototype;

const Ut = Rt.add;

const Lt = Rt.clear;

const Pt = Rt.delete;

const _t = {
    add: Ut,
    clear: Lt,
    delete: Pt
};

const Mt = [ "add", "clear", "delete" ];

const jt = {
    add: function(t) {
        const e = $t.get(this);
        if (void 0 === e) {
            Ut.call(this, t);
            return this;
        }
        const s = this.size;
        Ut.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = $t.get(this);
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
        const e = $t.get(this);
        if (void 0 === e) return Pt.call(this, t);
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
                const n = Pt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            r++;
        }
        return false;
    }
};

const It = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Mt) c(jt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Bt = false;

const Tt = "__au_set_on__";

function Dt() {
    if (!(v(Tt, Set) ?? false)) {
        g(Tt, true, Set);
        for (const t of Mt) if (true !== Rt[t].observing) c(Rt, t, {
            ...It,
            value: jt[t]
        });
    }
}

function Vt() {
    for (const t of Mt) if (true === Rt[t].observing) c(Rt, t, {
        ...It,
        value: _t[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Bt) {
            Bt = true;
            Dt();
        }
        this.collection = t;
        this.indexMap = V(t.size);
        this.lenObs = void 0;
        $t.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (K) {
            J(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = V(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

G(SetObserver);

function Ft(t) {
    let e = $t.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const Nt = "__au_map_obs__";

const zt = (() => {
    let t = v(Nt, Map);
    if (null == t) g(Nt, t = new WeakMap, Map);
    return t;
})();

const Kt = Map.prototype;

const Wt = Kt.set;

const Jt = Kt.clear;

const qt = Kt.delete;

const Gt = {
    set: Wt,
    clear: Jt,
    delete: qt
};

const Ht = [ "set", "clear", "delete" ];

const Qt = {
    set: function(t, e) {
        const s = zt.get(this);
        if (void 0 === s) {
            Wt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Wt.call(this, t, e);
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
        const t = zt.get(this);
        if (void 0 === t) return Jt.call(this);
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
            Jt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = zt.get(this);
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

const Xt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Ht) c(Qt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Yt = false;

const Zt = "__au_map_on__";

function te() {
    if (!(v(Zt, Map) ?? false)) {
        g(Zt, true, Map);
        for (const t of Ht) if (true !== Kt[t].observing) c(Kt, t, {
            ...Xt,
            value: Qt[t]
        });
    }
}

function ee() {
    for (const t of Ht) if (true === Kt[t].observing) c(Kt, t, {
        ...Xt,
        value: Gt[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Yt) {
            Yt = true;
            te();
        }
        this.collection = t;
        this.indexMap = V(t.size);
        this.lenObs = void 0;
        zt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (K) {
            J(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = V(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

G(MapObserver);

function se(t) {
    let e = zt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function re(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function ie() {
    return f(this, "obs", new BindingObserverRecord(this));
}

function ne(t) {
    let e;
    if (l(t)) e = Et(t); else if (t instanceof Set) e = Ft(t); else if (t instanceof Map) e = se(t); else throw u(`AUR0210`);
    this.obs.add(e);
}

function oe(t) {
    this.obs.add(t);
}

function ce() {
    throw u(`AUR2011:handleChange`);
}

function ue() {
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
        this.o.forEach(ae, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(he, this);
        this.o.clear();
        this.count = 0;
    }
}

function he(t, e) {
    e.unsubscribe(this.b);
}

function ae(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this.b);
        this.o.delete(e);
    }
}

function le(t) {
    const e = t.prototype;
    b(e, "observe", re);
    b(e, "observeCollection", ne);
    b(e, "subscribeTo", oe);
    c(e, "obs", {
        get: ie
    });
    b(e, "handleChange", ce);
    b(e, "handleCollectionChange", ue);
    return t;
}

function fe(t) {
    return null == t ? le : le(t);
}

const be = p("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = d();
        this.u = d();
        this.h = d();
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
                throw as();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        ye = t;
        Ee = 0;
        Oe = t.length;
        ke = 0;
        Ce = 0;
        Se = 6291456;
        $e = "";
        Re = _e(0);
        Ue = true;
        Le = false;
        return Ie(61, void 0 === e ? 8 : e);
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

const pe = PrimitiveLiteralExpression.$false;

const de = PrimitiveLiteralExpression.$true;

const ve = PrimitiveLiteralExpression.$null;

const ge = PrimitiveLiteralExpression.$undefined;

const Ae = AccessThisExpression.$this;

const xe = AccessThisExpression.$parent;

var me;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(me || (me = {}));

let ye = "";

let Ee = 0;

let Oe = 0;

let ke = 0;

let Ce = 0;

let Se = 6291456;

let $e = "";

let Re;

let Ue = true;

let Le = false;

const Pe = String.fromCharCode;

const _e = t => ye.charCodeAt(t);

const Me = () => ye.slice(Ce, Ee);

function je(t, e) {
    ye = t;
    Ee = 0;
    Oe = t.length;
    ke = 0;
    Ce = 0;
    Se = 6291456;
    $e = "";
    Re = _e(0);
    Ue = true;
    Le = false;
    return Ie(61, void 0 === e ? 8 : e);
}

function Ie(t, e) {
    if (16 === e) return new CustomExpression(ye);
    if (0 === Ee) {
        if (1 & e) return Je();
        He();
        if (4194304 & Se) throw is();
    }
    Ue = 513 > t;
    Le = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & Se) {
        const t = Us[63 & Se];
        He();
        r = new UnaryExpression(t, Ie(514, e));
        Ue = false;
    } else {
        t: switch (Se) {
          case 12294:
            i = ke;
            Ue = false;
            do {
                He();
                ++i;
                switch (Se) {
                  case 65545:
                    He();
                    if (0 === (12288 & Se)) throw os();
                    break;

                  case 10:
                  case 11:
                    throw os();

                  case 2162700:
                    Le = true;
                    He();
                    if (0 === (12288 & Se)) {
                        r = 0 === i ? Ae : 1 === i ? xe : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & Se) {
                        r = 0 === i ? Ae : 1 === i ? xe : new AccessThisExpression(i);
                        break t;
                    }
                    throw cs();
                }
            } while (12294 === Se);

          case 4096:
            {
                const t = $e;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Ue = !Le;
                He();
                if (ss(49)) {
                    if (524296 === Se) throw $s();
                    const e = Le;
                    const s = ke;
                    ++ke;
                    const i = Ie(62, 0);
                    Le = e;
                    ke = s;
                    Ue = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Rs();

          case 11:
            throw ns();

          case 12292:
            Ue = false;
            He();
            switch (ke) {
              case 0:
                r = Ae;
                break;

              case 1:
                r = xe;
                break;

              default:
                r = new AccessThisExpression(ke);
                break;
            }
            break;

          case 2688007:
            r = Ne(e);
            break;

          case 2688016:
            r = ye.search(/\s+of\s+/) > Ee ? Be() : ze(e);
            break;

          case 524296:
            r = We(e);
            break;

          case 2163758:
            r = new TemplateExpression([ $e ]);
            Ue = false;
            He();
            break;

          case 2163759:
            r = qe(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression($e);
            Ue = false;
            He();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Us[63 & Se];
            Ue = false;
            He();
            break;

          default:
            if (Ee >= Oe) throw us(); else throw hs();
        }
        if (2 & e) return Ke(r);
        if (514 < t) return r;
        if (10 === Se || 11 === Se) throw os();
        if (0 === r.$kind) switch (Se) {
          case 2162700:
            Le = true;
            Ue = false;
            He();
            if (0 === (13312 & Se)) throw ys();
            if (12288 & Se) {
                r = new AccessScopeExpression($e, r.ancestor);
                He();
            } else if (2688007 === Se) r = new CallFunctionExpression(r, Te(), true); else if (2688016 === Se) r = De(r, true); else throw Es();
            break;

          case 65545:
            Ue = !Le;
            He();
            if (0 === (12288 & Se)) throw os();
            r = new AccessScopeExpression($e, r.ancestor);
            He();
            break;

          case 10:
          case 11:
            throw os();

          case 2688007:
            r = new CallFunctionExpression(r, Te(), s);
            break;

          case 2688016:
            r = De(r, s);
            break;

          case 2163758:
            r = Ge(r);
            break;

          case 2163759:
            r = qe(e, r, true);
            break;
        }
        while ((65536 & Se) > 0) switch (Se) {
          case 2162700:
            r = Ve(r);
            break;

          case 65545:
            He();
            if (0 === (12288 & Se)) throw os();
            r = Fe(r, false);
            break;

          case 10:
          case 11:
            throw os();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, Te(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, Te(), r.optional, false); else r = new CallFunctionExpression(r, Te(), false);
            break;

          case 2688016:
            r = De(r, false);
            break;

          case 2163758:
            if (Le) throw Es();
            r = Ge(r);
            break;

          case 2163759:
            if (Le) throw Es();
            r = qe(e, r, true);
            break;
        }
    }
    if (10 === Se || 11 === Se) throw os();
    if (513 < t) return r;
    while ((262144 & Se) > 0) {
        const s = Se;
        if ((960 & s) <= t) break;
        He();
        r = new BinaryExpression(Us[63 & s], r, Ie(960 & s, e));
        Ue = false;
    }
    if (63 < t) return r;
    if (ss(6291477)) {
        const t = Ie(62, e);
        rs(6291476);
        r = new ConditionalExpression(r, t, Ie(62, e));
        Ue = false;
    }
    if (62 < t) return r;
    if (ss(4194348)) {
        if (!Ue) throw ls();
        r = new AssignExpression(r, Ie(62, e));
    }
    if (61 < t) return r;
    while (ss(6291479)) {
        if (6291456 === Se) throw fs();
        const t = $e;
        He();
        const s = new Array;
        while (ss(6291476)) s.push(Ie(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (ss(6291478)) {
        if (6291456 === Se) throw bs();
        const t = $e;
        He();
        const s = new Array;
        while (ss(6291476)) s.push(Ie(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== Se) {
        if ((1 & e) > 0 && 7340045 === Se) return r;
        if ("of" === Me()) throw ws();
        throw hs();
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
        He();
        switch (Se) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = Me();
            break;

          default:
            throw ms();
        }
    }
    rs(7340051);
    return e;
    function n() {
        if ("" !== s) {
            t.push(new DestructuringAssignmentSingleExpression(new AccessMemberExpression(Ae, s), new AccessKeyedExpression(Ae, new PrimitiveLiteralExpression(i++)), void 0));
            s = "";
        } else i++;
    }
}

function Te() {
    const t = Le;
    He();
    const e = [];
    while (7340046 !== Se) {
        e.push(Ie(62, 0));
        if (!ss(6291471)) break;
    }
    rs(7340046);
    Ue = false;
    Le = t;
    return e;
}

function De(t, e) {
    const s = Le;
    He();
    t = new AccessKeyedExpression(t, Ie(62, 0), e);
    rs(7340051);
    Ue = !s;
    Le = s;
    return t;
}

function Ve(t) {
    Le = true;
    Ue = false;
    He();
    if (0 === (13312 & Se)) throw ys();
    if (12288 & Se) return Fe(t, true);
    if (2688007 === Se) if (1 === t.$kind) return new CallScopeExpression(t.name, Te(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, Te(), t.optional, true); else return new CallFunctionExpression(t, Te(), true);
    if (2688016 === Se) return De(t, true);
    throw Es();
}

function Fe(t, e) {
    const s = $e;
    switch (Se) {
      case 2162700:
        {
            Le = true;
            Ue = false;
            const r = Ee;
            const i = Ce;
            const n = Se;
            const o = Re;
            const c = $e;
            const u = Ue;
            const h = Le;
            He();
            if (0 === (13312 & Se)) throw ys();
            if (2688007 === Se) return new CallMemberExpression(t, s, Te(), e, true);
            Ee = r;
            Ce = i;
            Se = n;
            Re = o;
            $e = c;
            Ue = u;
            Le = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Ue = false;
        return new CallMemberExpression(t, s, Te(), e, false);

      default:
        Ue = !Le;
        He();
        return new AccessMemberExpression(t, s, e);
    }
}

function Ne(t) {
    He();
    const e = Ee;
    const s = Ce;
    const r = Se;
    const i = Re;
    const n = $e;
    const o = Ue;
    const c = Le;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === Se) {
            He();
            if (4096 !== Se) throw os();
            u.push(new BindingIdentifier($e));
            He();
            if (6291471 === Se) throw Ss();
            if (7340046 !== Se) throw ns();
            He();
            if (49 !== Se) throw ns();
            He();
            const t = Le;
            const e = ke;
            ++ke;
            const s = Ie(62, 0);
            Le = t;
            ke = e;
            Ue = false;
            return new ArrowFunction(u, s, true);
        }
        switch (Se) {
          case 4096:
            u.push(new BindingIdentifier($e));
            He();
            break;

          case 7340046:
            He();
            break t;

          case 524296:
          case 2688016:
            He();
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
            He();
            h = 2;
            break;
        }
        switch (Se) {
          case 6291471:
            He();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            He();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw Os();
            He();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === Se) {
        if (1 === h) {
            He();
            if (524296 === Se) throw $s();
            const t = Le;
            const e = ke;
            ++ke;
            const s = Ie(62, 0);
            Le = t;
            ke = e;
            Ue = false;
            return new ArrowFunction(u, s);
        }
        throw Os();
    } else if (1 === h && 0 === u.length) throw As(49);
    if (a) switch (h) {
      case 2:
        throw Os();

      case 3:
        throw ks();

      case 4:
        throw Cs();
    }
    Ee = e;
    Ce = s;
    Se = r;
    Re = i;
    $e = n;
    Ue = o;
    Le = c;
    const l = Le;
    const f = Ie(62, t);
    Le = l;
    rs(7340046);
    if (49 === Se) switch (h) {
      case 2:
        throw Os();

      case 3:
        throw ks();

      case 4:
        throw Cs();
    }
    return f;
}

function ze(t) {
    const e = Le;
    He();
    const s = new Array;
    while (7340051 !== Se) if (ss(6291471)) {
        s.push(ge);
        if (7340051 === Se) break;
    } else {
        s.push(Ie(62, ~2 & t));
        if (ss(6291471)) {
            if (7340051 === Se) break;
        } else break;
    }
    Le = e;
    rs(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Ue = false;
        return new ArrayLiteralExpression(s);
    }
}

function Ke(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw ps();
    if (4204592 !== Se) throw ps();
    He();
    const e = t;
    const s = Ie(61, 0);
    return new ForOfStatement(e, s);
}

function We(t) {
    const e = Le;
    const s = new Array;
    const r = new Array;
    He();
    while (7340045 !== Se) {
        s.push($e);
        if (49152 & Se) {
            He();
            rs(6291476);
            r.push(Ie(62, ~2 & t));
        } else if (12288 & Se) {
            const e = Re;
            const s = Se;
            const i = Ee;
            He();
            if (ss(6291476)) r.push(Ie(62, ~2 & t)); else {
                Re = e;
                Se = s;
                Ee = i;
                r.push(Ie(515, ~2 & t));
            }
        } else throw ds();
        if (7340045 !== Se) rs(6291471);
    }
    Le = e;
    rs(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Ue = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function Je() {
    const t = [];
    const e = [];
    const s = Oe;
    let r = "";
    while (Ee < s) {
        switch (Re) {
          case 36:
            if (123 === _e(Ee + 1)) {
                t.push(r);
                r = "";
                Ee += 2;
                Re = _e(Ee);
                He();
                const s = Ie(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += Pe(we(Qe()));
            break;

          default:
            r += Pe(Re);
        }
        Qe();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function qe(t, e, s) {
    const r = Le;
    const i = [ $e ];
    rs(2163759);
    const n = [ Ie(62, t) ];
    while (2163758 !== (Se = es())) {
        i.push($e);
        rs(2163759);
        n.push(Ie(62, t));
    }
    i.push($e);
    Ue = false;
    Le = r;
    if (s) {
        He();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        He();
        return new TemplateExpression(i, n);
    }
}

function Ge(t) {
    Ue = false;
    const e = [ $e ];
    He();
    return new TaggedTemplateExpression(e, e, t);
}

function He() {
    while (Ee < Oe) {
        Ce = Ee;
        if (null != (Se = Bs[Re]())) return;
    }
    Se = 6291456;
}

function Qe() {
    return Re = _e(++Ee);
}

function Xe() {
    while (Is[Qe()]) ;
    const t = Ls[$e = Me()];
    return void 0 === t ? 4096 : t;
}

function Ye(t) {
    let e = Re;
    if (false === t) {
        do {
            e = Qe();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            $e = parseInt(Me(), 10);
            return 32768;
        }
        e = Qe();
        if (Ee >= Oe) {
            $e = parseInt(Me().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Qe();
    } while (e <= 57 && e >= 48); else Re = _e(--Ee);
    $e = parseFloat(Me());
    return 32768;
}

function Ze() {
    const t = Re;
    Qe();
    let e = 0;
    const s = new Array;
    let r = Ee;
    while (Re !== t) if (92 === Re) {
        s.push(ye.slice(r, Ee));
        Qe();
        e = we(Re);
        Qe();
        s.push(Pe(e));
        r = Ee;
    } else if (Ee >= Oe) throw vs(); else Qe();
    const i = ye.slice(r, Ee);
    Qe();
    s.push(i);
    const n = s.join("");
    $e = n;
    return 16384;
}

function ts() {
    let t = true;
    let e = "";
    while (96 !== Qe()) if (36 === Re) if (Ee + 1 < Oe && 123 === _e(Ee + 1)) {
        Ee++;
        t = false;
        break;
    } else e += "$"; else if (92 === Re) e += Pe(we(Qe())); else {
        if (Ee >= Oe) throw gs();
        e += Pe(Re);
    }
    Qe();
    $e = e;
    if (t) return 2163758;
    return 2163759;
}

const es = () => {
    if (Ee >= Oe) throw gs();
    Ee--;
    return ts();
};

const ss = t => {
    if (Se === t) {
        He();
        return true;
    }
    return false;
};

const rs = t => {
    if (Se === t) He(); else throw As(t);
};

const is = () => u(`AUR0151:${ye}`);

const ns = () => u(`AUR0152:${ye}`);

const os = () => u(`AUR0153:${ye}`);

const cs = () => u(`AUR0154:${ye}`);

const us = () => u(`AUR0155:${ye}`);

const hs = () => u(`AUR0156:${ye}`);

const as = () => u(`AUR0157`);

const ls = () => u(`AUR0158:${ye}`);

const fs = () => u(`AUR0159:${ye}`);

const bs = () => u(`AUR0160:${ye}`);

const ws = () => u(`AUR0161:${ye}`);

const ps = () => u(`AUR0163:${ye}`);

const ds = () => u(`AUR0164:${ye}`);

const vs = () => u(`AUR0165:${ye}`);

const gs = () => u(`AUR0166:${ye}`);

const As = t => u(`AUR0167:${ye}<${Us[63 & t]}`);

const xs = () => {
    throw u(`AUR0168:${ye}`);
};

xs.notMapped = true;

const ms = () => u(`AUR0170:${ye}`);

const ys = () => u(`AUR0171:${ye}`);

const Es = () => u(`AUR0172:${ye}`);

const Os = () => u(`AUR0173:${ye}`);

const ks = () => u(`AUR0174:${ye}`);

const Cs = () => u(`AUR0175:${ye}`);

const Ss = () => u(`AUR0176:${ye}`);

const $s = () => u(`AUR0178:${ye}`);

const Rs = () => u(`AUR0179:${ye}`);

const Us = [ pe, de, ve, ge, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Ls = Object.assign(Object.create(null), {
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

const _s = (t, e, s, r) => {
    const i = s.length;
    for (let n = 0; n < i; n += 2) {
        const i = s[n];
        let o = s[n + 1];
        o = o > 0 ? o : i + 1;
        if (t) t.fill(r, i, o);
        if (e) for (let t = i; t < o; t++) e.add(t);
    }
};

const Ms = t => () => {
    Qe();
    return t;
};

const js = new Set;

_s(null, js, Ps.AsciiIdPart, true);

const Is = new Uint8Array(65535);

_s(Is, null, Ps.IdStart, 1);

_s(Is, null, Ps.Digit, 1);

const Bs = new Array(65535);

Bs.fill(xs, 0, 65535);

_s(Bs, null, Ps.Skip, (() => {
    Qe();
    return null;
}));

_s(Bs, null, Ps.IdStart, Xe);

_s(Bs, null, Ps.Digit, (() => Ye(false)));

Bs[34] = Bs[39] = () => Ze();

Bs[96] = () => ts();

Bs[33] = () => {
    if (61 !== Qe()) return 131117;
    if (61 !== Qe()) return 6553948;
    Qe();
    return 6553950;
};

Bs[61] = () => {
    if (62 === Qe()) {
        Qe();
        return 49;
    }
    if (61 !== Re) return 4194348;
    if (61 !== Qe()) return 6553947;
    Qe();
    return 6553949;
};

Bs[38] = () => {
    if (38 !== Qe()) return 6291478;
    Qe();
    return 6553882;
};

Bs[124] = () => {
    if (124 !== Qe()) return 6291479;
    Qe();
    return 6553817;
};

Bs[63] = () => {
    if (46 === Qe()) {
        const t = _e(Ee + 1);
        if (t <= 48 || t >= 57) {
            Qe();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Re) return 6291477;
    Qe();
    return 6553752;
};

Bs[46] = () => {
    if (Qe() <= 57 && Re >= 48) return Ye(true);
    if (46 === Re) {
        if (46 !== Qe()) return 10;
        Qe();
        return 11;
    }
    return 65545;
};

Bs[60] = () => {
    if (61 !== Qe()) return 6554015;
    Qe();
    return 6554017;
};

Bs[62] = () => {
    if (61 !== Qe()) return 6554016;
    Qe();
    return 6554018;
};

Bs[37] = Ms(6554154);

Bs[40] = Ms(2688007);

Bs[41] = Ms(7340046);

Bs[42] = Ms(6554153);

Bs[43] = Ms(2490853);

Bs[44] = Ms(6291471);

Bs[45] = Ms(2490854);

Bs[47] = Ms(6554155);

Bs[58] = Ms(6291476);

Bs[91] = Ms(2688016);

Bs[93] = Ms(7340051);

Bs[123] = Ms(524296);

Bs[125] = Ms(7340045);

let Ts = null;

const Ds = [];

let Vs = false;

function Fs() {
    Vs = false;
}

function Ns() {
    Vs = true;
}

function zs() {
    return Ts;
}

function Ks(t) {
    if (null == t) throw u(`AUR0206`);
    if (null == Ts) {
        Ts = t;
        Ds[0] = Ts;
        Vs = true;
        return;
    }
    if (Ts === t) throw u(`AUR0207`);
    Ds.push(t);
    Ts = t;
    Vs = true;
}

function Ws(t) {
    if (null == t) throw u(`AUR0208`);
    if (Ts !== t) throw u(`AUR0209`);
    Ds.pop();
    Ts = Ds.length > 0 ? Ds[Ds.length - 1] : null;
    Vs = null != Ts;
}

const Js = Object.freeze({
    get current() {
        return Ts;
    },
    get connecting() {
        return Vs;
    },
    enter: Ks,
    exit: Ws,
    pause: Fs,
    resume: Ns
});

const qs = Reflect.get;

const Gs = Object.prototype.toString;

const Hs = new WeakMap;

function Qs(t) {
    switch (Gs.call(t)) {
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
    return Qs(t) ? Zs(t) : t;
}

function Zs(t) {
    return Hs.get(t) ?? rr(t);
}

function tr(t) {
    return t[Xs] ?? t;
}

function er(t) {
    return Qs(t) && t[Xs] || t;
}

function sr(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function rr(t) {
    const e = l(t) ? nr : t instanceof Map || t instanceof Set ? $r : ir;
    const s = new Proxy(t, e);
    Hs.set(t, s);
    return s;
}

const ir = {
    get(t, e, s) {
        if (e === Xs) return t;
        const r = zs();
        if (!Vs || sr(e) || null == r) return qs(t, e, s);
        r.observe(t, e);
        return Ys(qs(t, e, s));
    }
};

const nr = {
    get(t, e, s) {
        if (e === Xs) return t;
        if (!Vs || sr(e) || null == Ts) return qs(t, e, s);
        switch (e) {
          case "length":
            Ts.observe(t, "length");
            return t.length;

          case "map":
            return or;

          case "includes":
            return hr;

          case "indexOf":
            return ar;

          case "lastIndexOf":
            return lr;

          case "every":
            return cr;

          case "filter":
            return ur;

          case "find":
            return br;

          case "findIndex":
            return fr;

          case "flat":
            return wr;

          case "flatMap":
            return pr;

          case "join":
            return dr;

          case "push":
            return gr;

          case "pop":
            return vr;

          case "reduce":
            return Cr;

          case "reduceRight":
            return Sr;

          case "reverse":
            return yr;

          case "shift":
            return Ar;

          case "unshift":
            return xr;

          case "slice":
            return kr;

          case "splice":
            return mr;

          case "some":
            return Er;

          case "sort":
            return Or;

          case "keys":
            return Ir;

          case "values":
          case Symbol.iterator:
            return Br;

          case "entries":
            return Tr;
        }
        Ts.observe(t, e);
        return Ys(qs(t, e, s));
    },
    ownKeys(t) {
        zs()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function or(t, e) {
    const s = tr(this);
    const r = s.map(((s, r) => er(t.call(e, Ys(s), r, this))));
    Dr(Ts, s);
    return Ys(r);
}

function cr(t, e) {
    const s = tr(this);
    const r = s.every(((s, r) => t.call(e, Ys(s), r, this)));
    Dr(Ts, s);
    return r;
}

function ur(t, e) {
    const s = tr(this);
    const r = s.filter(((s, r) => er(t.call(e, Ys(s), r, this))));
    Dr(Ts, s);
    return Ys(r);
}

function hr(t) {
    const e = tr(this);
    const s = e.includes(er(t));
    Dr(Ts, e);
    return s;
}

function ar(t) {
    const e = tr(this);
    const s = e.indexOf(er(t));
    Dr(Ts, e);
    return s;
}

function lr(t) {
    const e = tr(this);
    const s = e.lastIndexOf(er(t));
    Dr(Ts, e);
    return s;
}

function fr(t, e) {
    const s = tr(this);
    const r = s.findIndex(((s, r) => er(t.call(e, Ys(s), r, this))));
    Dr(Ts, s);
    return r;
}

function br(t, e) {
    const s = tr(this);
    const r = s.find(((e, s) => t(Ys(e), s, this)), e);
    Dr(Ts, s);
    return Ys(r);
}

function wr() {
    const t = tr(this);
    Dr(Ts, t);
    return Ys(t.flat());
}

function pr(t, e) {
    const s = tr(this);
    Dr(Ts, s);
    return Zs(s.flatMap(((s, r) => Ys(t.call(e, Ys(s), r, this)))));
}

function dr(t) {
    const e = tr(this);
    Dr(Ts, e);
    return e.join(t);
}

function vr() {
    return Ys(tr(this).pop());
}

function gr(...t) {
    return tr(this).push(...t);
}

function Ar() {
    return Ys(tr(this).shift());
}

function xr(...t) {
    return tr(this).unshift(...t);
}

function mr(...t) {
    return Ys(tr(this).splice(...t));
}

function yr(...t) {
    const e = tr(this);
    const s = e.reverse();
    Dr(Ts, e);
    return Ys(s);
}

function Er(t, e) {
    const s = tr(this);
    const r = s.some(((s, r) => er(t.call(e, Ys(s), r, this))));
    Dr(Ts, s);
    return r;
}

function Or(t) {
    const e = tr(this);
    const s = e.sort(t);
    Dr(Ts, e);
    return Ys(s);
}

function kr(t, e) {
    const s = tr(this);
    Dr(Ts, s);
    return Zs(s.slice(t, e));
}

function Cr(t, e) {
    const s = tr(this);
    const r = s.reduce(((e, s, r) => t(e, Ys(s), r, this)), e);
    Dr(Ts, s);
    return Ys(r);
}

function Sr(t, e) {
    const s = tr(this);
    const r = s.reduceRight(((e, s, r) => t(e, Ys(s), r, this)), e);
    Dr(Ts, s);
    return Ys(r);
}

const $r = {
    get(t, e, s) {
        if (e === Xs) return t;
        const r = zs();
        if (!Vs || sr(e) || null == r) return qs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return Mr;

          case "delete":
            return jr;

          case "forEach":
            return Rr;

          case "add":
            if (t instanceof Set) return _r;
            break;

          case "get":
            if (t instanceof Map) return Lr;
            break;

          case "set":
            if (t instanceof Map) return Pr;
            break;

          case "has":
            return Ur;

          case "keys":
            return Ir;

          case "values":
            return Br;

          case "entries":
            return Tr;

          case Symbol.iterator:
            return t instanceof Map ? Tr : Br;
        }
        return Ys(qs(t, e, s));
    }
};

function Rr(t, e) {
    const s = tr(this);
    Dr(Ts, s);
    return s.forEach(((s, r) => {
        t.call(e, Ys(s), Ys(r), this);
    }));
}

function Ur(t) {
    const e = tr(this);
    Dr(Ts, e);
    return e.has(er(t));
}

function Lr(t) {
    const e = tr(this);
    Dr(Ts, e);
    return Ys(e.get(er(t)));
}

function Pr(t, e) {
    return Ys(tr(this).set(er(t), er(e)));
}

function _r(t) {
    return Ys(tr(this).add(er(t)));
}

function Mr() {
    return Ys(tr(this).clear());
}

function jr(t) {
    return Ys(tr(this).delete(er(t)));
}

function Ir() {
    const t = tr(this);
    Dr(Ts, t);
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

function Br() {
    const t = tr(this);
    Dr(Ts, t);
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

function Tr() {
    const t = tr(this);
    Dr(Ts, t);
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

const Dr = (t, e) => t?.observeCollection(e);

const Vr = Object.freeze({
    getProxy: Zs,
    getRaw: tr,
    wrap: Ys,
    unwrap: er,
    rawKey: Xs
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
        if (!Object.is(e, t)) {
            this.ov = t;
            Fr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Fr);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            Ks(this);
            return this.v = er(this.$get.call(this.up ? Ys(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Ws(this);
        }
    }
}

fe(ComputedObserver);

G(ComputedObserver);

let Fr;

const Nr = p("IDirtyChecker", (t => t.singleton(DirtyChecker)));

const zr = {
    timeoutsPerCheck: 25,
    disabled: false,
    throw: false,
    resetToDefault() {
        this.timeoutsPerCheck = 6;
        this.disabled = false;
        this.throw = false;
    }
};

const Kr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (zr.disabled) return;
            if (++this.O < zr.timeoutsPerCheck) return;
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
        if (zr.throw) throw u(`AUR0222:${w(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Kr);
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
        throw u(`Trying to set value for property ${w(this.key)} in dirty checker`);
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

G(DirtyCheckProperty);

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
            Wr = this.v;
            this.v = t;
            this.subs.notify(t, Wr);
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
        if (!Object.is(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.cb?.call(this.o, this.v, this.ov);
            Wr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Wr);
        }
    }
}

G(SetterObserver);

G(SetterNotifier);

let Wr;

const Jr = new PropertyAccessor;

const qr = p("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Gr = p("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return Jr;
    }
    getAccessor() {
        return Jr;
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
        if (null == t) throw Zr(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Yr(t);
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
        return Jr;
    }
    getArrayObserver(t) {
        return Et(t);
    }
    getMapObserver(t) {
        return se(t);
    }
    getSetObserver(t) {
        return Ft(t);
    }
    createObserver(t, e) {
        if (this.R.handles(t, e, this)) return this.R.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (l(t)) return Et(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return se(t).getLengthObserver(); else if (t instanceof Set) return Ft(t).getLengthObserver();
            break;

          default:
            if (l(t) && r(e)) return Et(t).getIndexObserver(Number(e));
            break;
        }
        let s = Xr(t, e);
        if (void 0 === s) {
            let r = Qr(t);
            while (null !== r) {
                s = Xr(r, e);
                if (void 0 === s) r = Qr(r); else break;
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

ObserverLocator.inject = [ Nr, Gr ];

const Hr = t => {
    let e;
    if (l(t)) e = Et(t); else if (t instanceof Map) e = se(t); else if (t instanceof Set) e = Ft(t);
    return e;
};

const Qr = Object.getPrototypeOf;

const Xr = Object.getOwnPropertyDescriptor;

const Yr = t => {
    let e = t.$observers;
    if (void 0 === e) c(t, "$observers", {
        enumerable: false,
        value: e = d()
    });
    return e;
};

const Zr = t => u(`AUR0199:${w(t)}`);

const ti = p("IObservation", (t => t.singleton(Observation)));

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
            Ks(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Ws(this);
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

fe(Effect);

function ei(t) {
    if (void 0 === t.$observers) c(t, "$observers", {
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
        if (null == e || "" === e) throw u(`AUR0224`);
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
        const h = r.set;
        s.get = function t() {
            const s = ii(this, e, n, o, h);
            zs()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            ii(this, e, n, o, h).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return ii(s, e, n, o, h);
        };
        if (i) c(t.prototype, e, s); else return s;
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

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, T as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, B as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, Js as ConnectableSwitcher, CustomExpression, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, zr as DirtyCheckSettings, x as ExpressionKind, me as ExpressionType, ForOfStatement, I as ICoercionConfiguration, Nr as IDirtyChecker, be as IExpressionParser, Gr as INodeObserverLocator, ti as IObservation, qr as IObserverLocator, E as ISignaler, Interpolation, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Vr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, Unparser, ValueConverterExpression, kt as applyMutationsToIndices, C as astAssign, S as astBind, k as astEvaluate, $ as astUnbind, A as astVisit, W as batch, F as cloneIndexMap, fe as connectable, D as copyIndexMap, V as createIndexMap, yt as disableArrayObservation, ee as disableMapObservation, Vt as disableSetObservation, mt as enableArrayObservation, te as enableMapObservation, Dt as enableSetObservation, Hr as getCollectionObserver, Yr as getObserverLookup, N as isIndexMap, ri as observable, je as parseExpression, G as subscriberCollection, Ct as synchronizeIndices };

