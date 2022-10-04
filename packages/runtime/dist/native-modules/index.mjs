import { DI as t, Protocol as e, emptyArray as s, isArrayIndex as r, IPlatform as i } from "../../../kernel/dist/native-modules/index.mjs";

import { Metadata as n } from "../../../metadata/dist/native-modules/index.mjs";

const o = Object.prototype.hasOwnProperty;

const c = Reflect.defineProperty;

const u = t => new Error(t);

const h = t => "function" === typeof t;

const a = t => "string" === typeof t;

const l = t => t instanceof Array;

const f = Object.is;

function b(t, e, s) {
    c(t, e, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: s
    });
    return s;
}

function w(t, e, s) {
    if (!(e in t)) b(t, e, s);
}

const p = String;

const d = t.createInterface;

const v = () => Object.create(null);

const g = n.getOwn;

n.hasOwn;

const A = n.define;

e.annotation.keyFor;

e.resource.keyFor;

e.resource.appendTo;

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
        throw u(`Unknown ast node ${JSON.stringify(t)}`);
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
        if (a(t.value)) {
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

var m;

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
})(m || (m = {}));

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
        if (null == t) throw y();
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
        if (null == t) throw E();
        return new Scope(null, t, null == e ? new OverrideContext : e, s ?? false);
    }
    static fromParent(t, e) {
        if (null == t) throw y();
        return new Scope(t, e, new OverrideContext, false);
    }
}

const y = () => u(`AUR0203`);

const E = () => u("AUR0204");

class OverrideContext {}

const O = d("ISignaler", (t => t.singleton(Signaler)));

class Signaler {
    constructor() {
        this.signals = v();
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

const k = Scope.getContext;

function C(t, e, s, r) {
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
            const i = k(e, t.name, t.ancestor);
            if (null !== r) r.observe(i, t.name);
            const n = i[t.name];
            if (null == n && "$host" === t.name) throw u(`AUR0105`);
            if (s?.strict) return s?.boundFn && h(n) ? n.bind(i) : n;
            return null == n ? "" : s?.boundFn && h(n) ? n.bind(i) : n;
        }

      case 2:
        return t.elements.map((t => C(t, e, s, r)));

      case 3:
        {
            const i = {};
            for (let n = 0; n < t.keys.length; ++n) i[t.keys[n]] = C(t.values[n], e, s, r);
            return i;
        }

      case 4:
        return t.value;

      case 5:
        {
            let i = t.cooked[0];
            for (let n = 0; n < t.expressions.length; ++n) {
                i += String(C(t.expressions[n], e, s, r));
                i += t.cooked[n + 1];
            }
            return i;
        }

      case 6:
        switch (t.operation) {
          case "void":
            return void C(t.expression, e, s, r);

          case "typeof":
            return typeof C(t.expression, e, s, r);

          case "!":
            return !C(t.expression, e, s, r);

          case "-":
            return -C(t.expression, e, s, r);

          case "+":
            return +C(t.expression, e, s, r);

          default:
            throw u(`AUR0109:${t.operation}`);
        }

      case 7:
        {
            const i = t.args.map((t => C(t, e, s, r)));
            const n = k(e, t.name, t.ancestor);
            const o = _(s?.strictFnCall, n, t.name);
            if (o) return o.apply(n, i);
            return;
        }

      case 8:
        {
            const i = C(t.object, e, s, r);
            const n = t.args.map((t => C(t, e, s, r)));
            const o = _(s?.strictFnCall, i, t.name);
            let c;
            if (o) {
                c = o.apply(i, n);
                if (l(i) && I.includes(t.name)) r?.observeCollection(i);
            }
            return c;
        }

      case 9:
        {
            const i = C(t.func, e, s, r);
            if (h(i)) return i(...t.args.map((t => C(t, e, s, r))));
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
                return C(t.body, h, s, r);
            };
            return i;
        }

      case 10:
        {
            const i = C(t.object, e, s, r);
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
            const i = C(t.object, e, s, r);
            if (i instanceof Object) {
                const n = C(t.key, e, s, r);
                if (null !== r) r.observe(i, n);
                return i[n];
            }
            return;
        }

      case 12:
        {
            const i = t.expressions.map((t => C(t, e, s, r)));
            const n = C(t.func, e, s, r);
            if (!h(n)) throw u(`AUR0110`);
            return n(t.cooked, ...i);
        }

      case 13:
        {
            const i = t.left;
            const n = t.right;
            switch (t.operation) {
              case "&&":
                return C(i, e, s, r) && C(n, e, s, r);

              case "||":
                return C(i, e, s, r) || C(n, e, s, r);

              case "??":
                return C(i, e, s, r) ?? C(n, e, s, r);

              case "==":
                return C(i, e, s, r) == C(n, e, s, r);

              case "===":
                return C(i, e, s, r) === C(n, e, s, r);

              case "!=":
                return C(i, e, s, r) != C(n, e, s, r);

              case "!==":
                return C(i, e, s, r) !== C(n, e, s, r);

              case "instanceof":
                {
                    const t = C(n, e, s, r);
                    if (h(t)) return C(i, e, s, r) instanceof t;
                    return false;
                }

              case "in":
                {
                    const t = C(n, e, s, r);
                    if (t instanceof Object) return C(i, e, s, r) in t;
                    return false;
                }

              case "+":
                {
                    const t = C(i, e, s, r);
                    const o = C(n, e, s, r);
                    if (s?.strict) return t + o;
                    if (!t || !o) {
                        if (M(t) || M(o)) return (t || 0) + (o || 0);
                        if (j(t) || j(o)) return (t || "") + (o || "");
                    }
                    return t + o;
                }

              case "-":
                return C(i, e, s, r) - C(n, e, s, r);

              case "*":
                return C(i, e, s, r) * C(n, e, s, r);

              case "/":
                return C(i, e, s, r) / C(n, e, s, r);

              case "%":
                return C(i, e, s, r) % C(n, e, s, r);

              case "<":
                return C(i, e, s, r) < C(n, e, s, r);

              case ">":
                return C(i, e, s, r) > C(n, e, s, r);

              case "<=":
                return C(i, e, s, r) <= C(n, e, s, r);

              case ">=":
                return C(i, e, s, r) >= C(n, e, s, r);

              default:
                throw u(`AUR0108:${t.operation}`);
            }
        }

      case 14:
        return C(t.condition, e, s, r) ? C(t.yes, e, s, r) : C(t.no, e, s, r);

      case 15:
        return S(t.target, e, s, C(t.value, e, s, r));

      case 17:
        {
            const i = s?.getConverter?.(t.name);
            if (null == i) throw u(`AUR0103:${t.name}`);
            if ("toView" in i) return i.toView(C(t.expression, e, s, r), ...t.args.map((t => C(t, e, s, r))));
            return C(t.expression, e, s, r);
        }

      case 18:
        return C(t.expression, e, s, r);

      case 21:
        return t.name;

      case 22:
        return C(t.iterable, e, s, r);

      case 23:
        if (t.isMulti) {
            let i = t.parts[0];
            let n = 0;
            for (;n < t.expressions.length; ++n) {
                i += p(C(t.expressions[n], e, s, r));
                i += t.parts[n + 1];
            }
            return i;
        } else return `${t.parts[0]}${C(t.firstExpression, e, s, r)}${t.parts[1]}`;

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

function S(t, e, s, i) {
    switch (t.$kind) {
      case 1:
        {
            if ("$host" === t.name) throw u(`AUR0106`);
            const s = k(e, t.name, t.ancestor);
            if (s instanceof Object) if (void 0 !== s.$observers?.[t.name]) {
                s.$observers[t.name].setValue(i);
                return i;
            } else return s[t.name] = i;
            return;
        }

      case 10:
        {
            const r = C(t.object, e, s, null);
            if (r instanceof Object) if (void 0 !== r.$observers?.[t.name]) r.$observers[t.name].setValue(i); else r[t.name] = i; else S(t.object, e, s, {
                [t.name]: i
            });
            return i;
        }

      case 11:
        {
            const r = C(t.object, e, s, null);
            const n = C(t.key, e, s, null);
            return r[n] = i;
        }

      case 15:
        S(t.value, e, s, i);
        return S(t.target, e, s, i);

      case 17:
        {
            const r = s?.getConverter?.(t.name);
            if (null == r) throw P(t.name);
            if ("fromView" in r) i = r.fromView(i, ...t.args.map((t => C(t, e, s, null))));
            return S(t.expression, e, s, i);
        }

      case 18:
        return S(t.expression, e, s, i);

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
                    S(c, e, s, i);
                    break;

                  case 24:
                  case 25:
                    {
                        if ("object" !== typeof i || null === i) throw u(`AUR0112`);
                        let t = C(c.source, Scope.create(i), s, null);
                        if (void 0 === t && c.initializer) t = C(c.initializer, e, s, null);
                        S(c, e, s, t);
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
            let r = C(t.source, Scope.create(i), s, null);
            if (void 0 === r && t.initializer) r = C(t.initializer, e, s, null);
            S(t.target, e, s, r);
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
            S(t.target, e, s, o);
        }
        break;

      case 28:
        return t.assign(e, s, i);

      default:
        return;
    }
}

function $(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.name;
            const i = t.key;
            const n = s.getBehavior?.(r);
            if (null == n) throw U(r);
            if (void 0 === s[i]) {
                s[i] = n;
                n.bind?.(e, s, ...t.args.map((t => C(t, e, s, null))));
            } else throw L(r);
            $(t.expression, e, s);
            return;
        }

      case 17:
        {
            const r = t.name;
            const i = s.getConverter?.(r);
            if (null == i) throw P(r);
            const n = i.signals;
            if (null != n) {
                const t = s.get?.(O);
                const e = n.length;
                let r = 0;
                for (;r < e; ++r) t?.addSignalListener(n[r], s);
            }
            $(t.expression, e, s);
            return;
        }

      case 22:
        $(t.iterable, e, s);
        break;

      case 28:
        t.bind?.(e, s);
    }
}

function R(t, e, s) {
    switch (t.$kind) {
      case 18:
        {
            const r = t.key;
            const i = s;
            if (void 0 !== i[r]) {
                i[r].unbind?.(e, s);
                i[r] = void 0;
            }
            R(t.expression, e, s);
            break;
        }

      case 17:
        {
            const r = s.getConverter?.(t.name);
            if (void 0 === r?.signals) return;
            const i = s.get(O);
            let n = 0;
            for (;n < r.signals.length; ++n) i.removeSignalListener(r.signals[n], s);
            R(t.expression, e, s);
            break;
        }

      case 22:
        R(t.iterable, e, s);
        break;

      case 28:
        t.unbind?.(e, s);
    }
}

const U = t => u(`AUR0101:${t}`);

const L = t => u(`AUR0102:${t}`);

const P = t => u(`AUR0103:${t}`);

const _ = (t, e, s) => {
    const r = null == e ? null : e[s];
    if (h(r)) return r;
    if (!t && null == r) return null;
    throw u(`AUR0111:${s}`);
};

const M = t => {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
};

const j = t => {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
};

const I = "at map filter includes indexOf lastIndexOf findIndex find flat flatMap join reduce reduceRight slice every some sort".split(" ");

const B = t.createInterface("ICoercionConfiguration");

var T;

(function(t) {
    t[t["indexed"] = 8] = "indexed";
    t[t["keyed"] = 4] = "keyed";
    t[t["array"] = 9] = "array";
    t[t["map"] = 6] = "map";
    t[t["set"] = 7] = "set";
})(T || (T = {}));

var D;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Observer"] = 1] = "Observer";
    t[t["Node"] = 2] = "Node";
    t[t["Layout"] = 4] = "Layout";
    t[t["Primtive"] = 8] = "Primtive";
    t[t["Array"] = 18] = "Array";
    t[t["Set"] = 34] = "Set";
    t[t["Map"] = 66] = "Map";
})(D || (D = {}));

function V(t, e, s) {
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

function F(t = 0) {
    const e = Array(t);
    let s = 0;
    while (s < t) e[s] = s++;
    e.deletedIndices = [];
    e.deletedItems = [];
    e.isIndexMap = true;
    return e;
}

function N(t) {
    const e = t.slice();
    e.deletedIndices = t.deletedIndices.slice();
    e.deletedItems = t.deletedItems.slice();
    e.isIndexMap = true;
    return e;
}

function z(t) {
    return l(t) && true === t.isIndexMap;
}

let K = new Map;

let W = false;

function J(t) {
    const e = K;
    const s = K = new Map;
    W = true;
    try {
        t();
    } finally {
        K = null;
        W = false;
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
            K = e;
        }
    }
}

function q(t, e, s) {
    if (!K.has(t)) K.set(t, [ 2, e, s ]);
}

function G(t, e, s) {
    const r = K.get(t);
    if (void 0 === r) K.set(t, [ 1, e, s ]); else {
        r[1] = e;
        r[2] = s;
    }
}

function H(t) {
    return null == t ? Q : Q(t);
}

function Q(t) {
    const e = t.prototype;
    c(e, "subs", {
        get: X
    });
    w(e, "subscribe", Y);
    w(e, "unsubscribe", Z);
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
        if (W) {
            G(this, t, e);
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

function X() {
    return b(this, "subs", new SubscriberRecord);
}

function Y(t) {
    return this.subs.add(t);
}

function Z(t) {
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

function tt(t) {
    const e = t.prototype;
    w(e, "subscribe", et);
    w(e, "unsubscribe", st);
    H(t);
}

function et(t) {
    if (this.subs.add(t) && 1 === this.subs.count) this.owner.subscribe(this);
}

function st(t) {
    if (this.subs.remove(t) && 0 === this.subs.count) this.owner.subscribe(this);
}

tt(CollectionLengthObserver);

tt(CollectionSizeObserver);

const rt = "__au_array_obs__";

const it = (() => {
    let t = g(rt, Array);
    if (null == t) A(rt, t = new WeakMap, Array);
    return t;
})();

function nt(t, e) {
    if (t === e) return 0;
    t = null === t ? "null" : t.toString();
    e = null === e ? "null" : e.toString();
    return t < e ? -1 : 1;
}

function ot(t, e) {
    if (void 0 === t) if (void 0 === e) return 0; else return 1;
    if (void 0 === e) return -1;
    return 0;
}

function ct(t, e, s, r, i) {
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

function ut(t, e, s, r, i) {
    let n = 0, o = 0;
    let c, u, h;
    let a, l, f;
    let b, w, p;
    let d, v;
    let g, A, x, m;
    let y, E, O, k;
    while (true) {
        if (r - s <= 10) {
            ct(t, e, s, r, i);
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
            ut(t, e, m, r, i);
            r = x;
        } else {
            ut(t, e, s, x, i);
            s = m;
        }
    }
}

const ht = Array.prototype;

const at = ht.push;

const lt = ht.unshift;

const ft = ht.pop;

const bt = ht.shift;

const wt = ht.splice;

const pt = ht.reverse;

const dt = ht.sort;

const vt = {
    push: at,
    unshift: lt,
    pop: ft,
    shift: bt,
    splice: wt,
    reverse: pt,
    sort: dt
};

const gt = [ "push", "unshift", "pop", "shift", "splice", "reverse", "sort" ];

const At = {
    push: function(...t) {
        const e = it.get(this);
        if (void 0 === e) return at.apply(this, t);
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
        const e = it.get(this);
        if (void 0 === e) return lt.apply(this, t);
        const s = t.length;
        const r = new Array(s);
        let i = 0;
        while (i < s) r[i++] = -2;
        lt.apply(e.indexMap, r);
        const n = lt.apply(this, t);
        e.notify();
        return n;
    },
    pop: function() {
        const t = it.get(this);
        if (void 0 === t) return ft.call(this);
        const e = t.indexMap;
        const s = ft.call(this);
        const r = e.length - 1;
        if (e[r] > -1) {
            e.deletedIndices.push(e[r]);
            e.deletedItems.push(s);
        }
        ft.call(e);
        t.notify();
        return s;
    },
    shift: function() {
        const t = it.get(this);
        if (void 0 === t) return bt.call(this);
        const e = t.indexMap;
        const s = bt.call(this);
        if (e[0] > -1) {
            e.deletedIndices.push(e[0]);
            e.deletedItems.push(s);
        }
        bt.call(e);
        t.notify();
        return s;
    },
    splice: function(...t) {
        const e = t[0];
        const s = t[1];
        const r = it.get(this);
        if (void 0 === r) return wt.apply(this, t);
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
            wt.call(c, e, s, ...r);
        } else wt.apply(c, t);
        const l = wt.apply(this, t);
        if (h > 0 || a > 0) r.notify();
        return l;
    },
    reverse: function() {
        const t = it.get(this);
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
        const e = it.get(this);
        if (void 0 === e) {
            dt.call(this, t);
            return this;
        }
        let s = this.length;
        if (s < 2) return this;
        ut(this, e.indexMap, 0, s, ot);
        let r = 0;
        while (r < s) {
            if (void 0 === this[r]) break;
            r++;
        }
        if (void 0 === t || !h(t)) t = nt;
        ut(this, e.indexMap, 0, r, t);
        let i = false;
        for (r = 0, s = e.indexMap.length; s > r; ++r) if (e.indexMap[r] !== r) {
            i = true;
            break;
        }
        if (i) e.notify();
        return this;
    }
};

for (const t of gt) c(At[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let xt = false;

const mt = "__au_arr_on__";

function yt() {
    if (!(g(mt, Array) ?? false)) {
        A(mt, true, Array);
        for (const t of gt) if (true !== ht[t].observing) b(ht, t, At[t]);
    }
}

function Et() {
    for (const t of gt) if (true === ht[t].observing) b(ht, t, vt[t]);
}

class ArrayObserver {
    constructor(t) {
        this.type = 18;
        if (!xt) {
            xt = true;
            yt();
        }
        this.indexObservers = {};
        this.collection = t;
        this.indexMap = F(t.length);
        this.lenObs = void 0;
        it.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (W) {
            q(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.length;
        this.indexMap = F(r);
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

H(ArrayObserver);

H(ArrayIndexObserver);

function Ot(t) {
    let e = it.get(t);
    if (void 0 === e) e = new ArrayObserver(t);
    return e;
}

const kt = (t, e) => t - e;

function Ct(t) {
    let e = 0;
    let s = 0;
    let r = 0;
    const i = N(t);
    if (i.deletedIndices.length > 1) i.deletedIndices.sort(kt);
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

const $t = "__au_set_obs__";

const Rt = (() => {
    let t = g($t, Set);
    if (null == t) A($t, t = new WeakMap, Set);
    return t;
})();

const Ut = Set.prototype;

const Lt = Ut.add;

const Pt = Ut.clear;

const _t = Ut.delete;

const Mt = {
    add: Lt,
    clear: Pt,
    delete: _t
};

const jt = [ "add", "clear", "delete" ];

const It = {
    add: function(t) {
        const e = Rt.get(this);
        if (void 0 === e) {
            Lt.call(this, t);
            return this;
        }
        const s = this.size;
        Lt.call(this, t);
        const r = this.size;
        if (r === s) return this;
        e.indexMap[s] = -2;
        e.notify();
        return this;
    },
    clear: function() {
        const t = Rt.get(this);
        if (void 0 === t) return Pt.call(this);
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
            Pt.call(this);
            e.length = 0;
            t.notify();
        }
        return;
    },
    delete: function(t) {
        const e = Rt.get(this);
        if (void 0 === e) return _t.call(this, t);
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
                const n = _t.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            r++;
        }
        return false;
    }
};

const Bt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of jt) c(It[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Tt = false;

const Dt = "__au_set_on__";

function Vt() {
    if (!(g(Dt, Set) ?? false)) {
        A(Dt, true, Set);
        for (const t of jt) if (true !== Ut[t].observing) c(Ut, t, {
            ...Bt,
            value: It[t]
        });
    }
}

function Ft() {
    for (const t of jt) if (true === Ut[t].observing) c(Ut, t, {
        ...Bt,
        value: Mt[t]
    });
}

class SetObserver {
    constructor(t) {
        this.type = 34;
        if (!Tt) {
            Tt = true;
            Vt();
        }
        this.collection = t;
        this.indexMap = F(t.size);
        this.lenObs = void 0;
        Rt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (W) {
            q(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = F(r);
        this.subs.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

H(SetObserver);

function Nt(t) {
    let e = Rt.get(t);
    if (void 0 === e) e = new SetObserver(t);
    return e;
}

const zt = "__au_map_obs__";

const Kt = (() => {
    let t = g(zt, Map);
    if (null == t) A(zt, t = new WeakMap, Map);
    return t;
})();

const Wt = Map.prototype;

const Jt = Wt.set;

const qt = Wt.clear;

const Gt = Wt.delete;

const Ht = {
    set: Jt,
    clear: qt,
    delete: Gt
};

const Qt = [ "set", "clear", "delete" ];

const Xt = {
    set: function(t, e) {
        const s = Kt.get(this);
        if (void 0 === s) {
            Jt.call(this, t, e);
            return this;
        }
        const r = this.get(t);
        const i = this.size;
        Jt.call(this, t, e);
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
        const t = Kt.get(this);
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
        const e = Kt.get(this);
        if (void 0 === e) return Gt.call(this, t);
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
                const n = Gt.call(this, t);
                if (true === n) e.notify();
                return n;
            }
            ++r;
        }
        return false;
    }
};

const Yt = {
    writable: true,
    enumerable: false,
    configurable: true
};

for (const t of Qt) c(Xt[t], "observing", {
    value: true,
    writable: false,
    configurable: false,
    enumerable: false
});

let Zt = false;

const te = "__au_map_on__";

function ee() {
    if (!(g(te, Map) ?? false)) {
        A(te, true, Map);
        for (const t of Qt) if (true !== Wt[t].observing) c(Wt, t, {
            ...Yt,
            value: Xt[t]
        });
    }
}

function se() {
    for (const t of Qt) if (true === Wt[t].observing) c(Wt, t, {
        ...Yt,
        value: Ht[t]
    });
}

class MapObserver {
    constructor(t) {
        this.type = 66;
        if (!Zt) {
            Zt = true;
            ee();
        }
        this.collection = t;
        this.indexMap = F(t.size);
        this.lenObs = void 0;
        Kt.set(t, this);
    }
    notify() {
        const t = this.subs;
        const e = this.indexMap;
        if (W) {
            q(t, this.collection, e);
            return;
        }
        const s = this.collection;
        const r = s.size;
        this.indexMap = F(r);
        t.notifyCollection(s, e);
    }
    getLengthObserver() {
        return this.lenObs ?? (this.lenObs = new CollectionSizeObserver(this));
    }
}

H(MapObserver);

function re(t) {
    let e = Kt.get(t);
    if (void 0 === e) e = new MapObserver(t);
    return e;
}

function ie(t, e) {
    const s = this.oL.getObserver(t, e);
    this.obs.add(s);
}

function ne() {
    return b(this, "obs", new BindingObserverRecord(this));
}

function oe(t) {
    let e;
    if (l(t)) e = Ot(t); else if (t instanceof Set) e = Nt(t); else if (t instanceof Map) e = re(t); else throw u(`AUR0210`);
    this.obs.add(e);
}

function ce(t) {
    this.obs.add(t);
}

function ue() {
    throw u(`AUR2011:handleChange`);
}

function he() {
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
        this.o.forEach(le, this);
        this.count = this.o.size;
    }
    clearAll() {
        this.o.forEach(ae, this);
        this.o.clear();
        this.count = 0;
    }
}

function ae(t, e) {
    e.unsubscribe(this.b);
}

function le(t, e) {
    if (this.version !== t) {
        e.unsubscribe(this.b);
        this.o.delete(e);
    }
}

function fe(t) {
    const e = t.prototype;
    w(e, "observe", ie);
    w(e, "observeCollection", oe);
    w(e, "subscribeTo", ce);
    c(e, "obs", {
        get: ne
    });
    w(e, "handleChange", ue);
    w(e, "handleCollectionChange", he);
    return t;
}

function be(t) {
    return null == t ? fe : fe(t);
}

const we = d("IExpressionParser", (t => t.singleton(ExpressionParser)));

class ExpressionParser {
    constructor() {
        this.i = v();
        this.u = v();
        this.h = v();
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
                throw ls();
            }
            s = this.i[t];
            if (void 0 === s) s = this.i[t] = this.$parse(t, e);
            return s;
        }
    }
    $parse(t, e) {
        Ee = t;
        Oe = 0;
        ke = t.length;
        Ce = 0;
        Se = 0;
        $e = 6291456;
        Re = "";
        Ue = Me(0);
        Le = true;
        Pe = false;
        return Be(61, void 0 === e ? 8 : e);
    }
}

function pe(t) {
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

const de = PrimitiveLiteralExpression.$false;

const ve = PrimitiveLiteralExpression.$true;

const ge = PrimitiveLiteralExpression.$null;

const Ae = PrimitiveLiteralExpression.$undefined;

const xe = AccessThisExpression.$this;

const me = AccessThisExpression.$parent;

var ye;

(function(t) {
    t[t["None"] = 0] = "None";
    t[t["Interpolation"] = 1] = "Interpolation";
    t[t["IsIterator"] = 2] = "IsIterator";
    t[t["IsFunction"] = 4] = "IsFunction";
    t[t["IsProperty"] = 8] = "IsProperty";
    t[t["IsCustom"] = 16] = "IsCustom";
})(ye || (ye = {}));

let Ee = "";

let Oe = 0;

let ke = 0;

let Ce = 0;

let Se = 0;

let $e = 6291456;

let Re = "";

let Ue;

let Le = true;

let Pe = false;

const _e = String.fromCharCode;

const Me = t => Ee.charCodeAt(t);

const je = () => Ee.slice(Se, Oe);

function Ie(t, e) {
    Ee = t;
    Oe = 0;
    ke = t.length;
    Ce = 0;
    Se = 0;
    $e = 6291456;
    Re = "";
    Ue = Me(0);
    Le = true;
    Pe = false;
    return Be(61, void 0 === e ? 8 : e);
}

function Be(t, e) {
    if (16 === e) return new CustomExpression(Ee);
    if (0 === Oe) {
        if (1 & e) return qe();
        Qe();
        if (4194304 & $e) throw ns();
    }
    Le = 513 > t;
    Pe = false;
    let s = false;
    let r;
    let i = 0;
    if (131072 & $e) {
        const t = Ls[63 & $e];
        Qe();
        r = new UnaryExpression(t, Be(514, e));
        Le = false;
    } else {
        t: switch ($e) {
          case 12294:
            i = Ce;
            Le = false;
            do {
                Qe();
                ++i;
                switch ($e) {
                  case 65545:
                    Qe();
                    if (0 === (12288 & $e)) throw cs();
                    break;

                  case 10:
                  case 11:
                    throw cs();

                  case 2162700:
                    Pe = true;
                    Qe();
                    if (0 === (12288 & $e)) {
                        r = 0 === i ? xe : 1 === i ? me : new AccessThisExpression(i);
                        s = true;
                        break t;
                    }
                    break;

                  default:
                    if (2097152 & $e) {
                        r = 0 === i ? xe : 1 === i ? me : new AccessThisExpression(i);
                        break t;
                    }
                    throw us();
                }
            } while (12294 === $e);

          case 4096:
            {
                const t = Re;
                if (2 & e) r = new BindingIdentifier(t); else r = new AccessScopeExpression(t, i);
                Le = !Pe;
                Qe();
                if (rs(49)) {
                    if (524296 === $e) throw Rs();
                    const e = Pe;
                    const s = Ce;
                    ++Ce;
                    const i = Be(62, 0);
                    Pe = e;
                    Ce = s;
                    Le = false;
                    r = new ArrowFunction([ new BindingIdentifier(t) ], i);
                }
                break;
            }

          case 10:
            throw Us();

          case 11:
            throw os();

          case 12292:
            Le = false;
            Qe();
            switch (Ce) {
              case 0:
                r = xe;
                break;

              case 1:
                r = me;
                break;

              default:
                r = new AccessThisExpression(Ce);
                break;
            }
            break;

          case 2688007:
            r = ze(e);
            break;

          case 2688016:
            r = Ee.search(/\s+of\s+/) > Oe ? Te() : Ke(e);
            break;

          case 524296:
            r = Je(e);
            break;

          case 2163758:
            r = new TemplateExpression([ Re ]);
            Le = false;
            Qe();
            break;

          case 2163759:
            r = Ge(e, r, false);
            break;

          case 16384:
          case 32768:
            r = new PrimitiveLiteralExpression(Re);
            Le = false;
            Qe();
            break;

          case 8194:
          case 8195:
          case 8193:
          case 8192:
            r = Ls[63 & $e];
            Le = false;
            Qe();
            break;

          default:
            if (Oe >= ke) throw hs(); else throw as();
        }
        if (2 & e) return We(r);
        if (514 < t) return r;
        if (10 === $e || 11 === $e) throw cs();
        if (0 === r.$kind) switch ($e) {
          case 2162700:
            Pe = true;
            Le = false;
            Qe();
            if (0 === (13312 & $e)) throw Es();
            if (12288 & $e) {
                r = new AccessScopeExpression(Re, r.ancestor);
                Qe();
            } else if (2688007 === $e) r = new CallFunctionExpression(r, De(), true); else if (2688016 === $e) r = Ve(r, true); else throw Os();
            break;

          case 65545:
            Le = !Pe;
            Qe();
            if (0 === (12288 & $e)) throw cs();
            r = new AccessScopeExpression(Re, r.ancestor);
            Qe();
            break;

          case 10:
          case 11:
            throw cs();

          case 2688007:
            r = new CallFunctionExpression(r, De(), s);
            break;

          case 2688016:
            r = Ve(r, s);
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
            Qe();
            if (0 === (12288 & $e)) throw cs();
            r = Ne(r, false);
            break;

          case 10:
          case 11:
            throw cs();

          case 2688007:
            if (1 === r.$kind) r = new CallScopeExpression(r.name, De(), r.ancestor, false); else if (10 === r.$kind) r = new CallMemberExpression(r.object, r.name, De(), r.optional, false); else r = new CallFunctionExpression(r, De(), false);
            break;

          case 2688016:
            r = Ve(r, false);
            break;

          case 2163758:
            if (Pe) throw Os();
            r = He(r);
            break;

          case 2163759:
            if (Pe) throw Os();
            r = Ge(e, r, true);
            break;
        }
    }
    if (10 === $e || 11 === $e) throw cs();
    if (513 < t) return r;
    while ((262144 & $e) > 0) {
        const s = $e;
        if ((960 & s) <= t) break;
        Qe();
        r = new BinaryExpression(Ls[63 & s], r, Be(960 & s, e));
        Le = false;
    }
    if (63 < t) return r;
    if (rs(6291477)) {
        const t = Be(62, e);
        is(6291476);
        r = new ConditionalExpression(r, t, Be(62, e));
        Le = false;
    }
    if (62 < t) return r;
    if (rs(4194348)) {
        if (!Le) throw fs();
        r = new AssignExpression(r, Be(62, e));
    }
    if (61 < t) return r;
    while (rs(6291479)) {
        if (6291456 === $e) throw bs();
        const t = Re;
        Qe();
        const s = new Array;
        while (rs(6291476)) s.push(Be(62, e));
        r = new ValueConverterExpression(r, t, s);
    }
    while (rs(6291478)) {
        if (6291456 === $e) throw ws();
        const t = Re;
        Qe();
        const s = new Array;
        while (rs(6291476)) s.push(Be(62, e));
        r = new BindingBehaviorExpression(r, t, s);
    }
    if (6291456 !== $e) {
        if ((1 & e) > 0 && 7340045 === $e) return r;
        if ("of" === je()) throw ps();
        throw as();
    }
    return r;
}

function Te() {
    const t = [];
    const e = new DestructuringAssignmentExpression(24, t, void 0, void 0);
    let s = "";
    let r = true;
    let i = 0;
    while (r) {
        Qe();
        switch ($e) {
          case 7340051:
            r = false;
            n();
            break;

          case 6291471:
            n();
            break;

          case 4096:
            s = je();
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

function De() {
    const t = Pe;
    Qe();
    const e = [];
    while (7340046 !== $e) {
        e.push(Be(62, 0));
        if (!rs(6291471)) break;
    }
    is(7340046);
    Le = false;
    Pe = t;
    return e;
}

function Ve(t, e) {
    const s = Pe;
    Qe();
    t = new AccessKeyedExpression(t, Be(62, 0), e);
    is(7340051);
    Le = !s;
    Pe = s;
    return t;
}

function Fe(t) {
    Pe = true;
    Le = false;
    Qe();
    if (0 === (13312 & $e)) throw Es();
    if (12288 & $e) return Ne(t, true);
    if (2688007 === $e) if (1 === t.$kind) return new CallScopeExpression(t.name, De(), t.ancestor, true); else if (10 === t.$kind) return new CallMemberExpression(t.object, t.name, De(), t.optional, true); else return new CallFunctionExpression(t, De(), true);
    if (2688016 === $e) return Ve(t, true);
    throw Os();
}

function Ne(t, e) {
    const s = Re;
    switch ($e) {
      case 2162700:
        {
            Pe = true;
            Le = false;
            const r = Oe;
            const i = Se;
            const n = $e;
            const o = Ue;
            const c = Re;
            const u = Le;
            const h = Pe;
            Qe();
            if (0 === (13312 & $e)) throw Es();
            if (2688007 === $e) return new CallMemberExpression(t, s, De(), e, true);
            Oe = r;
            Se = i;
            $e = n;
            Ue = o;
            Re = c;
            Le = u;
            Pe = h;
            return new AccessMemberExpression(t, s, e);
        }

      case 2688007:
        Le = false;
        return new CallMemberExpression(t, s, De(), e, false);

      default:
        Le = !Pe;
        Qe();
        return new AccessMemberExpression(t, s, e);
    }
}

function ze(t) {
    Qe();
    const e = Oe;
    const s = Se;
    const r = $e;
    const i = Ue;
    const n = Re;
    const o = Le;
    const c = Pe;
    const u = [];
    let h = 1;
    let a = false;
    t: while (true) {
        if (11 === $e) {
            Qe();
            if (4096 !== $e) throw cs();
            u.push(new BindingIdentifier(Re));
            Qe();
            if (6291471 === $e) throw $s();
            if (7340046 !== $e) throw os();
            Qe();
            if (49 !== $e) throw os();
            Qe();
            const t = Pe;
            const e = Ce;
            ++Ce;
            const s = Be(62, 0);
            Pe = t;
            Ce = e;
            Le = false;
            return new ArrowFunction(u, s, true);
        }
        switch ($e) {
          case 4096:
            u.push(new BindingIdentifier(Re));
            Qe();
            break;

          case 7340046:
            Qe();
            break t;

          case 524296:
          case 2688016:
            Qe();
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
            Qe();
            h = 2;
            break;
        }
        switch ($e) {
          case 6291471:
            Qe();
            a = true;
            if (1 === h) break;
            break t;

          case 7340046:
            Qe();
            break t;

          case 4194348:
            if (1 === h) h = 3;
            break t;

          case 49:
            if (a) throw ks();
            Qe();
            h = 2;
            break t;

          default:
            if (1 === h) h = 2;
            break t;
        }
    }
    if (49 === $e) {
        if (1 === h) {
            Qe();
            if (524296 === $e) throw Rs();
            const t = Pe;
            const e = Ce;
            ++Ce;
            const s = Be(62, 0);
            Pe = t;
            Ce = e;
            Le = false;
            return new ArrowFunction(u, s);
        }
        throw ks();
    } else if (1 === h && 0 === u.length) throw xs(49);
    if (a) switch (h) {
      case 2:
        throw ks();

      case 3:
        throw Cs();

      case 4:
        throw Ss();
    }
    Oe = e;
    Se = s;
    $e = r;
    Ue = i;
    Re = n;
    Le = o;
    Pe = c;
    const l = Pe;
    const f = Be(62, t);
    Pe = l;
    is(7340046);
    if (49 === $e) switch (h) {
      case 2:
        throw ks();

      case 3:
        throw Cs();

      case 4:
        throw Ss();
    }
    return f;
}

function Ke(t) {
    const e = Pe;
    Qe();
    const s = new Array;
    while (7340051 !== $e) if (rs(6291471)) {
        s.push(Ae);
        if (7340051 === $e) break;
    } else {
        s.push(Be(62, ~2 & t));
        if (rs(6291471)) {
            if (7340051 === $e) break;
        } else break;
    }
    Pe = e;
    is(7340051);
    if (2 & t) return new ArrayBindingPattern(s); else {
        Le = false;
        return new ArrayLiteralExpression(s);
    }
}

function We(t) {
    if (0 === (t.$kind & (19 | 20 | 21))) throw ds();
    if (4204592 !== $e) throw ds();
    Qe();
    const e = t;
    const s = Be(61, 0);
    return new ForOfStatement(e, s);
}

function Je(t) {
    const e = Pe;
    const s = new Array;
    const r = new Array;
    Qe();
    while (7340045 !== $e) {
        s.push(Re);
        if (49152 & $e) {
            Qe();
            is(6291476);
            r.push(Be(62, ~2 & t));
        } else if (12288 & $e) {
            const e = Ue;
            const s = $e;
            const i = Oe;
            Qe();
            if (rs(6291476)) r.push(Be(62, ~2 & t)); else {
                Ue = e;
                $e = s;
                Oe = i;
                r.push(Be(515, ~2 & t));
            }
        } else throw vs();
        if (7340045 !== $e) is(6291471);
    }
    Pe = e;
    is(7340045);
    if (2 & t) return new ObjectBindingPattern(s, r); else {
        Le = false;
        return new ObjectLiteralExpression(s, r);
    }
}

function qe() {
    const t = [];
    const e = [];
    const s = ke;
    let r = "";
    while (Oe < s) {
        switch (Ue) {
          case 36:
            if (123 === Me(Oe + 1)) {
                t.push(r);
                r = "";
                Oe += 2;
                Ue = Me(Oe);
                Qe();
                const s = Be(61, 1);
                e.push(s);
                continue;
            } else r += "$";
            break;

          case 92:
            r += _e(pe(Xe()));
            break;

          default:
            r += _e(Ue);
        }
        Xe();
    }
    if (e.length) {
        t.push(r);
        return new Interpolation(t, e);
    }
    return null;
}

function Ge(t, e, s) {
    const r = Pe;
    const i = [ Re ];
    is(2163759);
    const n = [ Be(62, t) ];
    while (2163758 !== ($e = ss())) {
        i.push(Re);
        is(2163759);
        n.push(Be(62, t));
    }
    i.push(Re);
    Le = false;
    Pe = r;
    if (s) {
        Qe();
        return new TaggedTemplateExpression(i, i, e, n);
    } else {
        Qe();
        return new TemplateExpression(i, n);
    }
}

function He(t) {
    Le = false;
    const e = [ Re ];
    Qe();
    return new TaggedTemplateExpression(e, e, t);
}

function Qe() {
    while (Oe < ke) {
        Se = Oe;
        if (null != ($e = Ts[Ue]())) return;
    }
    $e = 6291456;
}

function Xe() {
    return Ue = Me(++Oe);
}

function Ye() {
    while (Bs[Xe()]) ;
    const t = Ps[Re = je()];
    return void 0 === t ? 4096 : t;
}

function Ze(t) {
    let e = Ue;
    if (false === t) {
        do {
            e = Xe();
        } while (e <= 57 && e >= 48);
        if (46 !== e) {
            Re = parseInt(je(), 10);
            return 32768;
        }
        e = Xe();
        if (Oe >= ke) {
            Re = parseInt(je().slice(0, -1), 10);
            return 32768;
        }
    }
    if (e <= 57 && e >= 48) do {
        e = Xe();
    } while (e <= 57 && e >= 48); else Ue = Me(--Oe);
    Re = parseFloat(je());
    return 32768;
}

function ts() {
    const t = Ue;
    Xe();
    let e = 0;
    const s = new Array;
    let r = Oe;
    while (Ue !== t) if (92 === Ue) {
        s.push(Ee.slice(r, Oe));
        Xe();
        e = pe(Ue);
        Xe();
        s.push(_e(e));
        r = Oe;
    } else if (Oe >= ke) throw gs(); else Xe();
    const i = Ee.slice(r, Oe);
    Xe();
    s.push(i);
    const n = s.join("");
    Re = n;
    return 16384;
}

function es() {
    let t = true;
    let e = "";
    while (96 !== Xe()) if (36 === Ue) if (Oe + 1 < ke && 123 === Me(Oe + 1)) {
        Oe++;
        t = false;
        break;
    } else e += "$"; else if (92 === Ue) e += _e(pe(Xe())); else {
        if (Oe >= ke) throw As();
        e += _e(Ue);
    }
    Xe();
    Re = e;
    if (t) return 2163758;
    return 2163759;
}

const ss = () => {
    if (Oe >= ke) throw As();
    Oe--;
    return es();
};

const rs = t => {
    if ($e === t) {
        Qe();
        return true;
    }
    return false;
};

const is = t => {
    if ($e === t) Qe(); else throw xs(t);
};

const ns = () => u(`AUR0151:${Ee}`);

const os = () => u(`AUR0152:${Ee}`);

const cs = () => u(`AUR0153:${Ee}`);

const us = () => u(`AUR0154:${Ee}`);

const hs = () => u(`AUR0155:${Ee}`);

const as = () => u(`AUR0156:${Ee}`);

const ls = () => u(`AUR0157`);

const fs = () => u(`AUR0158:${Ee}`);

const bs = () => u(`AUR0159:${Ee}`);

const ws = () => u(`AUR0160:${Ee}`);

const ps = () => u(`AUR0161:${Ee}`);

const ds = () => u(`AUR0163:${Ee}`);

const vs = () => u(`AUR0164:${Ee}`);

const gs = () => u(`AUR0165:${Ee}`);

const As = () => u(`AUR0166:${Ee}`);

const xs = t => u(`AUR0167:${Ee}<${Ls[63 & t]}`);

const ms = () => {
    throw u(`AUR0168:${Ee}`);
};

ms.notMapped = true;

const ys = () => u(`AUR0170:${Ee}`);

const Es = () => u(`AUR0171:${Ee}`);

const Os = () => u(`AUR0172:${Ee}`);

const ks = () => u(`AUR0173:${Ee}`);

const Cs = () => u(`AUR0174:${Ee}`);

const Ss = () => u(`AUR0175:${Ee}`);

const $s = () => u(`AUR0176:${Ee}`);

const Rs = () => u(`AUR0178:${Ee}`);

const Us = () => u(`AUR0179:${Ee}`);

const Ls = [ de, ve, ge, Ae, "$this", null, "$parent", "(", "{", ".", "..", "...", "?.", "}", ")", ",", "[", "]", ":", "?", "'", '"', "&", "|", "??", "||", "&&", "==", "!=", "===", "!==", "<", ">", "<=", ">=", "in", "instanceof", "+", "-", "typeof", "void", "*", "%", "/", "=", "!", 2163758, 2163759, "of", "=>" ];

const Ps = Object.assign(Object.create(null), {
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

const _s = {
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

const js = t => () => {
    Xe();
    return t;
};

const Is = new Set;

Ms(null, Is, _s.AsciiIdPart, true);

const Bs = new Uint8Array(65535);

Ms(Bs, null, _s.IdStart, 1);

Ms(Bs, null, _s.Digit, 1);

const Ts = new Array(65535);

Ts.fill(ms, 0, 65535);

Ms(Ts, null, _s.Skip, (() => {
    Xe();
    return null;
}));

Ms(Ts, null, _s.IdStart, Ye);

Ms(Ts, null, _s.Digit, (() => Ze(false)));

Ts[34] = Ts[39] = () => ts();

Ts[96] = () => es();

Ts[33] = () => {
    if (61 !== Xe()) return 131117;
    if (61 !== Xe()) return 6553948;
    Xe();
    return 6553950;
};

Ts[61] = () => {
    if (62 === Xe()) {
        Xe();
        return 49;
    }
    if (61 !== Ue) return 4194348;
    if (61 !== Xe()) return 6553947;
    Xe();
    return 6553949;
};

Ts[38] = () => {
    if (38 !== Xe()) return 6291478;
    Xe();
    return 6553882;
};

Ts[124] = () => {
    if (124 !== Xe()) return 6291479;
    Xe();
    return 6553817;
};

Ts[63] = () => {
    if (46 === Xe()) {
        const t = Me(Oe + 1);
        if (t <= 48 || t >= 57) {
            Xe();
            return 2162700;
        }
        return 6291477;
    }
    if (63 !== Ue) return 6291477;
    Xe();
    return 6553752;
};

Ts[46] = () => {
    if (Xe() <= 57 && Ue >= 48) return Ze(true);
    if (46 === Ue) {
        if (46 !== Xe()) return 10;
        Xe();
        return 11;
    }
    return 65545;
};

Ts[60] = () => {
    if (61 !== Xe()) return 6554015;
    Xe();
    return 6554017;
};

Ts[62] = () => {
    if (61 !== Xe()) return 6554016;
    Xe();
    return 6554018;
};

Ts[37] = js(6554154);

Ts[40] = js(2688007);

Ts[41] = js(7340046);

Ts[42] = js(6554153);

Ts[43] = js(2490853);

Ts[44] = js(6291471);

Ts[45] = js(2490854);

Ts[47] = js(6554155);

Ts[58] = js(6291476);

Ts[91] = js(2688016);

Ts[93] = js(7340051);

Ts[123] = js(524296);

Ts[125] = js(7340045);

let Ds = null;

const Vs = [];

let Fs = false;

function Ns() {
    Fs = false;
}

function zs() {
    Fs = true;
}

function Ks() {
    return Ds;
}

function Ws(t) {
    if (null == t) throw u(`AUR0206`);
    if (null == Ds) {
        Ds = t;
        Vs[0] = Ds;
        Fs = true;
        return;
    }
    if (Ds === t) throw u(`AUR0207`);
    Vs.push(t);
    Ds = t;
    Fs = true;
}

function Js(t) {
    if (null == t) throw u(`AUR0208`);
    if (Ds !== t) throw u(`AUR0209`);
    Vs.pop();
    Ds = Vs.length > 0 ? Vs[Vs.length - 1] : null;
    Fs = null != Ds;
}

const qs = Object.freeze({
    get current() {
        return Ds;
    },
    get connecting() {
        return Fs;
    },
    enter: Ws,
    exit: Js,
    pause: Ns,
    resume: zs
});

const Gs = Reflect.get;

const Hs = Object.prototype.toString;

const Qs = new WeakMap;

function Xs(t) {
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

const Ys = "__raw__";

function Zs(t) {
    return Xs(t) ? tr(t) : t;
}

function tr(t) {
    return Qs.get(t) ?? ir(t);
}

function er(t) {
    return t[Ys] ?? t;
}

function sr(t) {
    return Xs(t) && t[Ys] || t;
}

function rr(t) {
    return "constructor" === t || "__proto__" === t || "$observers" === t || t === Symbol.toPrimitive || t === Symbol.toStringTag;
}

function ir(t) {
    const e = l(t) ? or : t instanceof Map || t instanceof Set ? Rr : nr;
    const s = new Proxy(t, e);
    Qs.set(t, s);
    return s;
}

const nr = {
    get(t, e, s) {
        if (e === Ys) return t;
        const r = Ks();
        if (!Fs || rr(e) || null == r) return Gs(t, e, s);
        r.observe(t, e);
        return Zs(Gs(t, e, s));
    }
};

const or = {
    get(t, e, s) {
        if (e === Ys) return t;
        if (!Fs || rr(e) || null == Ds) return Gs(t, e, s);
        switch (e) {
          case "length":
            Ds.observe(t, "length");
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
            return wr;

          case "findIndex":
            return br;

          case "flat":
            return pr;

          case "flatMap":
            return dr;

          case "join":
            return vr;

          case "push":
            return Ar;

          case "pop":
            return gr;

          case "reduce":
            return Sr;

          case "reduceRight":
            return $r;

          case "reverse":
            return Er;

          case "shift":
            return xr;

          case "unshift":
            return mr;

          case "slice":
            return Cr;

          case "splice":
            return yr;

          case "some":
            return Or;

          case "sort":
            return kr;

          case "keys":
            return Br;

          case "values":
          case Symbol.iterator:
            return Tr;

          case "entries":
            return Dr;
        }
        Ds.observe(t, e);
        return Zs(Gs(t, e, s));
    },
    ownKeys(t) {
        Ks()?.observe(t, "length");
        return Reflect.ownKeys(t);
    }
};

function cr(t, e) {
    const s = er(this);
    const r = s.map(((s, r) => sr(t.call(e, Zs(s), r, this))));
    Vr(Ds, s);
    return Zs(r);
}

function ur(t, e) {
    const s = er(this);
    const r = s.every(((s, r) => t.call(e, Zs(s), r, this)));
    Vr(Ds, s);
    return r;
}

function hr(t, e) {
    const s = er(this);
    const r = s.filter(((s, r) => sr(t.call(e, Zs(s), r, this))));
    Vr(Ds, s);
    return Zs(r);
}

function ar(t) {
    const e = er(this);
    const s = e.includes(sr(t));
    Vr(Ds, e);
    return s;
}

function lr(t) {
    const e = er(this);
    const s = e.indexOf(sr(t));
    Vr(Ds, e);
    return s;
}

function fr(t) {
    const e = er(this);
    const s = e.lastIndexOf(sr(t));
    Vr(Ds, e);
    return s;
}

function br(t, e) {
    const s = er(this);
    const r = s.findIndex(((s, r) => sr(t.call(e, Zs(s), r, this))));
    Vr(Ds, s);
    return r;
}

function wr(t, e) {
    const s = er(this);
    const r = s.find(((e, s) => t(Zs(e), s, this)), e);
    Vr(Ds, s);
    return Zs(r);
}

function pr() {
    const t = er(this);
    Vr(Ds, t);
    return Zs(t.flat());
}

function dr(t, e) {
    const s = er(this);
    Vr(Ds, s);
    return tr(s.flatMap(((s, r) => Zs(t.call(e, Zs(s), r, this)))));
}

function vr(t) {
    const e = er(this);
    Vr(Ds, e);
    return e.join(t);
}

function gr() {
    return Zs(er(this).pop());
}

function Ar(...t) {
    return er(this).push(...t);
}

function xr() {
    return Zs(er(this).shift());
}

function mr(...t) {
    return er(this).unshift(...t);
}

function yr(...t) {
    return Zs(er(this).splice(...t));
}

function Er(...t) {
    const e = er(this);
    const s = e.reverse();
    Vr(Ds, e);
    return Zs(s);
}

function Or(t, e) {
    const s = er(this);
    const r = s.some(((s, r) => sr(t.call(e, Zs(s), r, this))));
    Vr(Ds, s);
    return r;
}

function kr(t) {
    const e = er(this);
    const s = e.sort(t);
    Vr(Ds, e);
    return Zs(s);
}

function Cr(t, e) {
    const s = er(this);
    Vr(Ds, s);
    return tr(s.slice(t, e));
}

function Sr(t, e) {
    const s = er(this);
    const r = s.reduce(((e, s, r) => t(e, Zs(s), r, this)), e);
    Vr(Ds, s);
    return Zs(r);
}

function $r(t, e) {
    const s = er(this);
    const r = s.reduceRight(((e, s, r) => t(e, Zs(s), r, this)), e);
    Vr(Ds, s);
    return Zs(r);
}

const Rr = {
    get(t, e, s) {
        if (e === Ys) return t;
        const r = Ks();
        if (!Fs || rr(e) || null == r) return Gs(t, e, s);
        switch (e) {
          case "size":
            r.observe(t, "size");
            return t.size;

          case "clear":
            return jr;

          case "delete":
            return Ir;

          case "forEach":
            return Ur;

          case "add":
            if (t instanceof Set) return Mr;
            break;

          case "get":
            if (t instanceof Map) return Pr;
            break;

          case "set":
            if (t instanceof Map) return _r;
            break;

          case "has":
            return Lr;

          case "keys":
            return Br;

          case "values":
            return Tr;

          case "entries":
            return Dr;

          case Symbol.iterator:
            return t instanceof Map ? Dr : Tr;
        }
        return Zs(Gs(t, e, s));
    }
};

function Ur(t, e) {
    const s = er(this);
    Vr(Ds, s);
    return s.forEach(((s, r) => {
        t.call(e, Zs(s), Zs(r), this);
    }));
}

function Lr(t) {
    const e = er(this);
    Vr(Ds, e);
    return e.has(sr(t));
}

function Pr(t) {
    const e = er(this);
    Vr(Ds, e);
    return Zs(e.get(sr(t)));
}

function _r(t, e) {
    return Zs(er(this).set(sr(t), sr(e)));
}

function Mr(t) {
    return Zs(er(this).add(sr(t)));
}

function jr() {
    return Zs(er(this).clear());
}

function Ir(t) {
    return Zs(er(this).delete(sr(t)));
}

function Br() {
    const t = er(this);
    Vr(Ds, t);
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
                value: Zs(s),
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

function Tr() {
    const t = er(this);
    Vr(Ds, t);
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
                value: Zs(s),
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
    Vr(Ds, t);
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
                value: [ Zs(s[0]), Zs(s[1]) ],
                done: r
            };
        },
        [Symbol.iterator]() {
            return this;
        }
    };
}

const Vr = (t, e) => t?.observeCollection(e);

const Fr = Object.freeze({
    getProxy: tr,
    getRaw: er,
    wrap: Zs,
    unwrap: sr,
    rawKey: Ys
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
        if (!f(e, t)) {
            this.ov = t;
            Nr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Nr);
        }
    }
    compute() {
        this.ir = true;
        this.obs.version++;
        try {
            Ws(this);
            return this.v = sr(this.$get.call(this.up ? Zs(this.o) : this.o, this));
        } finally {
            this.obs.clear();
            this.ir = false;
            Js(this);
        }
    }
}

be(ComputedObserver);

H(ComputedObserver);

let Nr;

const zr = d("IDirtyChecker", (t => t.singleton(DirtyChecker)));

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

const Wr = {
    persistent: true
};

class DirtyChecker {
    constructor(t) {
        this.p = t;
        this.tracked = [];
        this.A = null;
        this.O = 0;
        this.check = () => {
            if (Kr.disabled) return;
            if (++this.O < Kr.timeoutsPerCheck) return;
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
        if (Kr.throw) throw u(`AUR0222:${p(e)}`);
        return new DirtyCheckProperty(this, t, e);
    }
    addProperty(t) {
        this.tracked.push(t);
        if (1 === this.tracked.length) this.A = this.p.taskQueue.queueTask(this.check, Wr);
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
        throw u(`Trying to set value for property ${p(this.key)} in dirty checker`);
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

H(DirtyCheckProperty);

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
            if (f(t, this.v)) return;
            Jr = this.v;
            this.v = t;
            this.subs.notify(t, Jr);
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
        if (!f(t, this.v)) {
            this.ov = this.v;
            this.v = t;
            this.cb?.call(this.o, this.v, this.ov);
            Jr = this.ov;
            this.ov = this.v;
            this.subs.notify(this.v, Jr);
        }
    }
}

H(SetterObserver);

H(SetterNotifier);

let Jr;

const qr = new PropertyAccessor;

const Gr = d("IObserverLocator", (t => t.singleton(ObserverLocator)));

const Hr = d("INodeObserverLocator", (t => t.cachedCallback((t => new DefaultNodeObserverLocator))));

class DefaultNodeObserverLocator {
    handles() {
        return false;
    }
    getObserver() {
        return qr;
    }
    getAccessor() {
        return qr;
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
        if (null == t) throw ti(e);
        if (!(t instanceof Object)) return new PrimitiveObserver(t, e);
        const s = Zr(t);
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
        return qr;
    }
    getArrayObserver(t) {
        return Ot(t);
    }
    getMapObserver(t) {
        return re(t);
    }
    getSetObserver(t) {
        return Nt(t);
    }
    createObserver(t, e) {
        if (this.R.handles(t, e, this)) return this.R.getObserver(t, e, this);
        switch (e) {
          case "length":
            if (l(t)) return Ot(t).getLengthObserver();
            break;

          case "size":
            if (t instanceof Map) return re(t).getLengthObserver(); else if (t instanceof Set) return Nt(t).getLengthObserver();
            break;

          default:
            if (l(t) && r(e)) return Ot(t).getIndexObserver(Number(e));
            break;
        }
        let s = Yr(t, e);
        if (void 0 === s) {
            let r = Xr(t);
            while (null !== r) {
                s = Yr(r, e);
                if (void 0 === s) r = Xr(r); else break;
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

ObserverLocator.inject = [ zr, Hr ];

const Qr = t => {
    let e;
    if (l(t)) e = Ot(t); else if (t instanceof Map) e = re(t); else if (t instanceof Set) e = Nt(t);
    return e;
};

const Xr = Object.getPrototypeOf;

const Yr = Object.getOwnPropertyDescriptor;

const Zr = t => {
    let e = t.$observers;
    if (void 0 === e) c(t, "$observers", {
        enumerable: false,
        value: e = v()
    });
    return e;
};

const ti = t => u(`AUR0199:${p(t)}`);

const ei = d("IObservation", (t => t.singleton(Observation)));

class Observation {
    constructor(t) {
        this.oL = t;
    }
    static get inject() {
        return [ Gr ];
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
            Ws(this);
            this.fn(this);
        } finally {
            this.obs.clear();
            this.running = false;
            Js(this);
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

be(Effect);

function si(t) {
    if (void 0 === t.$observers) c(t, "$observers", {
        value: {}
    });
    return t.$observers;
}

const ri = {};

function ii(t, e, s) {
    if (null == e) return (e, s, i) => r(e, s, i, t);
    return r(t, e, s);
    function r(t, e, s, r) {
        const i = void 0 === e;
        r = "object" !== typeof r ? {
            name: r
        } : r || {};
        if (i) e = r.name;
        if (null == e || "" === e) throw u(`AUR0224`);
        const n = r.callback || `${p(e)}Changed`;
        let o = ri;
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
            const s = ni(this, e, n, o, h);
            Ks()?.subscribeTo(s);
            return s.getValue();
        };
        s.set = function t(s) {
            ni(this, e, n, o, h).setValue(s);
        };
        s.get.getObserver = function t(s) {
            return ni(s, e, n, o, h);
        };
        if (i) c(t.prototype, e, s); else return s;
    }
}

function ni(t, e, s, r, i) {
    const n = si(t);
    let o = n[e];
    if (null == o) {
        o = new SetterNotifier(t, s, i, r === ri ? void 0 : r);
        n[e] = o;
    }
    return o;
}

export { AccessKeyedExpression, AccessMemberExpression, AccessScopeExpression, AccessThisExpression, D as AccessorType, ArrayBindingPattern, ArrayIndexObserver, ArrayLiteralExpression, ArrayObserver, ArrowFunction, AssignExpression, BinaryExpression, BindingBehaviorExpression, BindingContext, BindingIdentifier, BindingObserverRecord, CallFunctionExpression, CallMemberExpression, CallScopeExpression, T as CollectionKind, CollectionLengthObserver, CollectionSizeObserver, ComputedObserver, ConditionalExpression, qs as ConnectableSwitcher, CustomExpression, DestructuringAssignmentExpression, DestructuringAssignmentRestExpression, DestructuringAssignmentSingleExpression, DirtyCheckProperty, Kr as DirtyCheckSettings, m as ExpressionKind, ye as ExpressionType, ForOfStatement, B as ICoercionConfiguration, zr as IDirtyChecker, we as IExpressionParser, Hr as INodeObserverLocator, ei as IObservation, Gr as IObserverLocator, O as ISignaler, Interpolation, MapObserver, ObjectBindingPattern, ObjectLiteralExpression, Observation, ObserverLocator, PrimitiveLiteralExpression, PrimitiveObserver, PropertyAccessor, Fr as ProxyObservable, Scope, SetObserver, SetterObserver, SubscriberRecord, TaggedTemplateExpression, TemplateExpression, UnaryExpression, Unparser, ValueConverterExpression, Ct as applyMutationsToIndices, S as astAssign, $ as astBind, C as astEvaluate, R as astUnbind, x as astVisit, J as batch, N as cloneIndexMap, be as connectable, V as copyIndexMap, F as createIndexMap, Et as disableArrayObservation, se as disableMapObservation, Ft as disableSetObservation, yt as enableArrayObservation, ee as enableMapObservation, Vt as enableSetObservation, Qr as getCollectionObserver, Zr as getObserverLookup, z as isIndexMap, ii as observable, Ie as parseExpression, H as subscriberCollection, St as synchronizeIndices };

