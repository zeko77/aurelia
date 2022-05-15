"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var e = require("@aurelia/kernel");

var t = require("@aurelia/runtime");

var n = require("@aurelia/runtime-html");

var i = require("@aurelia/platform-browser");

const {getPrototypeOf: r, getOwnPropertyDescriptor: s, getOwnPropertyDescriptors: o, getOwnPropertyNames: a, getOwnPropertySymbols: l, defineProperty: u, defineProperties: c} = Object;

const f = Object.keys;

const h = Object.is;

const d = Object.freeze;

const p = Object.assign;

const m = Number.isNaN;

const g = Reflect.apply;

const b = ArrayBuffer.isView;

function v(e) {
    return (t, ...n) => g(e, t, n);
}

const x = v(Object.prototype.hasOwnProperty);

const $ = v(Object.prototype.propertyIsEnumerable);

const y = r(Uint8Array.prototype);

const w = v(s(y, Symbol.toStringTag).get);

const k = v(Object.prototype.toString);

const C = v(RegExp.prototype.toString);

const S = v(Date.prototype.toISOString);

const O = v(Date.prototype.toString);

const E = v(Error.prototype.toString);

const j = v(Date.prototype.getTime);

const A = v(Set.prototype.values);

const R = v(Map.prototype.entries);

const q = v(Boolean.prototype.valueOf);

const M = v(Number.prototype.valueOf);

const L = v(Symbol.prototype.valueOf);

const T = v(String.prototype.valueOf);

function z(e) {
    return "number" === typeof e;
}

function F(e) {
    return "string" === typeof e;
}

function N(e) {
    return "symbol" === typeof e;
}

function P(e) {
    return void 0 === e;
}

function B(e) {
    return null !== e && "object" === typeof e;
}

function I(e) {
    return "function" === typeof e;
}

function D(e) {
    return null === e || "object" !== typeof e && "function" !== typeof e;
}

function U(e) {
    return e instanceof ArrayBuffer;
}

function V(e) {
    return e instanceof ArrayBuffer || "undefined" !== typeof SharedArrayBuffer && e instanceof SharedArrayBuffer;
}

function H(e) {
    return e instanceof Date;
}

function J(e) {
    return e instanceof Map;
}

function W(e) {
    return "[object Map Iterator]" === k(e);
}

function _(e) {
    return e instanceof RegExp;
}

function G(e) {
    return e instanceof Set;
}

function Y(e) {
    return "[object Set Iterator]" === k(e);
}

function K(e) {
    return e instanceof Error;
}

function Q(e) {
    return e instanceof Number;
}

function X(e) {
    return e instanceof String;
}

function Z(e) {
    return e instanceof Boolean;
}

function ee(e) {
    return e instanceof Symbol;
}

function te(e) {
    return Q(e) || X(e) || Z(e) || ee(e);
}

function ne(e) {
    return void 0 !== w(e);
}

function ie(e) {
    return "Uint8Array" === w(e);
}

function re(e) {
    return "Uint8ClampedArray" === w(e);
}

function se(e) {
    return "Uint16Array" === w(e);
}

function oe(e) {
    return "Uint32Array" === w(e);
}

function ae(e) {
    return "Int8Array" === w(e);
}

function le(e) {
    return "Int16Array" === w(e);
}

function ue(e) {
    return "Int32Array" === w(e);
}

function ce(e) {
    return "Float32Array" === w(e);
}

function fe(e) {
    return "Float64Array" === w(e);
}

function he(e) {
    return "[object Arguments]" === k(e);
}

function de(e) {
    return "[object DataView]" === k(e);
}

function pe(e) {
    return "[object Promise]" === k(e);
}

function me(e) {
    return "[object WeakSet]" === k(e);
}

function ge(e) {
    return "[object WeakMap]" === k(e);
}

function be(t, n) {
    if (n) return a(t).filter((t => !e.isArrayIndex(t))); else return f(t).filter((t => !e.isArrayIndex(t)));
}

function ve(e, t) {
    return t.filter((t => $(e, t)));
}

const xe = d({
    bold(e) {
        return `[1m${e}[22m`;
    },
    italic(e) {
        return `[3m${e}[23m`;
    },
    underline(e) {
        return `[4m${e}[24m`;
    },
    inverse(e) {
        return `[7m${e}[27m`;
    },
    white(e) {
        return `[37m${e}[39m`;
    },
    grey(e) {
        return `[90m${e}[39m`;
    },
    black(e) {
        return `[30m${e}[39m`;
    },
    blue(e) {
        return `[34m${e}[39m`;
    },
    cyan(e) {
        return `[36m${e}[39m`;
    },
    green(e) {
        return `[32m${e}[39m`;
    },
    magenta(e) {
        return `[35m${e}[39m`;
    },
    red(e) {
        return `[31m${e}[39m`;
    },
    yellow(e) {
        return `[33m${e}[39m`;
    }
});

const $e = /\u001b\[\d\d?m/g;

const ye = /[\x00-\x1f\x27\x5c]/;

const we = /[\x00-\x1f\x27\x5c]/g;

const ke = /[\x00-\x1f\x5c]/;

const Ce = /[\x00-\x1f\x5c]/g;

function Se(e) {
    return e.replace($e, "");
}

function Oe(e, t) {
    let n = "";
    if (0 !== e.length) {
        let i = 0;
        for (;i < e.length - 1; i++) {
            n += e[i];
            n += t;
        }
        n += e[i];
    }
    return n;
}

const Ee = d([ "\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", "\\b", "\\t", "\\n", "\\u000b", "\\f", "\\r", "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f", "", "", "", "", "", "", "", "\\'", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "\\\\" ]);

function je(e, t) {
    if (-1 === t) return `"${e}"`;
    if (-2 === t) return `\`${e}\``;
    return `'${e}'`;
}

const Ae = e => Ee[e.charCodeAt(0)];

function Re(e) {
    let t = ye;
    let n = we;
    let i = 39;
    if (e.includes("'")) {
        if (!e.includes('"')) i = -1; else if (!e.includes("`") && !e.includes("${")) i = -2;
        if (39 !== i) {
            t = ke;
            n = Ce;
        }
    }
    if (e.length < 5e3 && !t.test(e)) return je(e, i);
    if (e.length > 100) {
        e = e.replace(n, Ae);
        return je(e, i);
    }
    let r = "";
    let s = 0;
    let o = 0;
    for (;o < e.length; o++) {
        const t = e.charCodeAt(o);
        if (t === i || 92 === t || t < 32) {
            if (s === o) r += Ee[t]; else r += `${e.slice(s, o)}${Ee[t]}`;
            s = o + 1;
        }
    }
    if (s !== o) r += e.slice(s);
    return je(r, i);
}

function qe(e) {
    return e.replace(we, Ae);
}

const Me = function() {
    const e = {};
    return function(t) {
        let n = e[t];
        if (void 0 === n) {
            n = "";
            const i = t.length;
            let r = 0;
            for (let e = 0; e < i; ++e) {
                r = t.charCodeAt(e);
                if (r > 32) n += String.fromCharCode(r);
            }
            e[t] = n;
        }
        return n;
    };
}();

function Le(t, n, i) {
    const r = [];
    function s() {
        r.length = 0;
    }
    let o;
    let a;
    if (void 0 === t) {
        o = function e(...t) {
            r.push(t);
        };
        a = e.noop;
    } else if (void 0 === n) {
        o = function e(...n) {
            r.push(n);
            return t(...n);
        };
        a = e.noop;
    } else {
        if (!(n in t)) throw new Error(`No method named '${n}' exists in object of type ${Reflect.getPrototypeOf(t).constructor.name}`);
        let e = t;
        let s = Reflect.getOwnPropertyDescriptor(e, n);
        while (void 0 === s) {
            e = Reflect.getPrototypeOf(e);
            s = Reflect.getOwnPropertyDescriptor(e, n);
        }
        if (null !== s.value && ("object" === typeof s.value || "function" === typeof s.value) && "function" === typeof s.value.restore) {
            s.value.restore();
            s = Reflect.getOwnPropertyDescriptor(e, n);
        }
        a = function i() {
            if (t === e) Reflect.defineProperty(t, n, s); else Reflect.deleteProperty(t, n);
        };
        if (void 0 === i) o = function e(...t) {
            r.push(t);
        }; else if (true === i) o = function e(...n) {
            r.push(n);
            return s.value.apply(t, n);
        }; else if ("function" === typeof i) o = function e(...t) {
            r.push(t);
            return i(...t);
        }; else throw new Error(`Invalid spy`);
        Reflect.defineProperty(t, n, {
            ...s,
            value: o
        });
    }
    Reflect.defineProperty(o, "calls", {
        value: r
    });
    Reflect.defineProperty(o, "reset", {
        value: s
    });
    Reflect.defineProperty(o, "restore", {
        value: a
    });
    return o;
}

var Te;

(function(e) {
    e[e["noIterator"] = 0] = "noIterator";
    e[e["isArray"] = 1] = "isArray";
    e[e["isSet"] = 2] = "isSet";
    e[e["isMap"] = 3] = "isMap";
})(Te || (Te = {}));

function ze(e, t) {
    return e.source === t.source && e.flags === t.flags;
}

function Fe(e, t) {
    if (e.byteLength !== t.byteLength) return false;
    const {byteLength: n} = e;
    for (let i = 0; i < n; ++i) if (e[i] !== t[i]) return false;
    return true;
}

function Ne(e, t) {
    if (e === t) return 0;
    const n = e.length;
    const i = t.length;
    const r = Math.min(n, i);
    for (let n = 0; n < r; ++n) if (e[n] !== t[n]) {
        const i = e[n];
        const r = t[n];
        if (i < r) return -1;
        if (r < i) return 1;
        return 0;
    }
    if (n < i) return -1;
    if (i < n) return 1;
    return 0;
}

function Pe(e, t) {
    if (e.byteLength !== t.byteLength) return false;
    return 0 === Ne(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}

function Be(e, t) {
    return e.byteLength === t.byteLength && 0 === Ne(new Uint8Array(e), new Uint8Array(t));
}

function Ie(e, t) {
    if (Q(e)) return Q(t) && h(M(e), M(t));
    if (X(e)) return X(t) && T(e) === T(t);
    if (Z(e)) return Z(t) && q(e) === q(t);
    return ee(t) && L(e) === L(t);
}

function De(e, t, n, i) {
    if (e === t) {
        if (0 !== e) return true;
        return n ? h(e, t) : true;
    }
    if (n) {
        if ("object" !== typeof e) return z(e) && m(e) && m(t);
        if ("object" !== typeof t || null === e || null === t) return false;
        if (r(e) !== r(t)) return false;
    } else {
        if (!B(e)) {
            if (!B(t)) return e == t;
            return false;
        }
        if (!B(t)) return false;
    }
    const s = k(e);
    const o = k(t);
    if (s !== o) return false;
    if ("[object URLSearchParams]" === s) return De(Array.from(e.entries()), Array.from(t.entries()), n, i);
    if (Array.isArray(e)) {
        if (e.length !== t.length) return false;
        const r = be(e, false);
        const s = be(t, false);
        if (r.length !== s.length) return false;
        return Ue(e, t, n, i, 1, r);
    }
    if ("[object Object]" === s) return Ue(e, t, n, i, 0);
    if (H(e)) {
        if (j(e) !== j(t)) return false;
    } else if (_(e)) {
        if (!ze(e, t)) return false;
    } else if (K(e)) {
        if (e.message !== t.message || e.name !== t.name) return false;
    } else if (b(e)) {
        if (!n && (ce(e) || fe(e))) {
            if (!Fe(e, t)) return false;
        } else if (!Pe(e, t)) return false;
        const r = be(e, false);
        const s = be(t, false);
        if (r.length !== s.length) return false;
        return Ue(e, t, n, i, 0, r);
    } else if (G(e)) {
        if (!G(t) || e.size !== t.size) return false;
        return Ue(e, t, n, i, 2);
    } else if (J(e)) {
        if (!J(t) || e.size !== t.size) return false;
        return Ue(e, t, n, i, 3);
    } else if (V(e)) {
        if (!Be(e, t)) return false;
    } else if (te(e) && !Ie(e, t)) return false;
    return Ue(e, t, n, i, 0);
}

function Ue(e, t, n, i, r, s) {
    if (5 === arguments.length) {
        s = f(e);
        const n = f(t);
        if (s.length !== n.length) return false;
    }
    let o = 0;
    for (;o < s.length; o++) if (!x(t, s[o])) return false;
    if (n && 5 === arguments.length) {
        const n = l(e);
        if (0 !== n.length) {
            let i = 0;
            for (o = 0; o < n.length; o++) {
                const r = n[o];
                if ($(e, r)) {
                    if (!$(t, r)) return false;
                    s.push(r);
                    i++;
                } else if ($(t, r)) return false;
            }
            const r = l(t);
            if (n.length !== r.length && ve(t, r).length !== i) return false;
        } else {
            const e = l(t);
            if (0 !== e.length && 0 !== ve(t, e).length) return false;
        }
    }
    if (0 === s.length && (0 === r || 1 === r && 0 === e.length || 0 === e.size)) return true;
    if (void 0 === i) i = {
        val1: new Map,
        val2: new Map,
        position: 0
    }; else {
        const n = i.val1.get(e);
        if (void 0 !== n) {
            const e = i.val2.get(t);
            if (void 0 !== e) return n === e;
        }
        i.position++;
    }
    i.val1.set(e, i.position);
    i.val2.set(t, i.position);
    const a = Ke(e, t, n, s, i, r);
    i.val1.delete(e);
    i.val2.delete(t);
    return a;
}

function Ve(e, t, n, i) {
    for (const r of e) if (De(t, r, n, i)) {
        e.delete(r);
        return true;
    }
    return false;
}

function He(e) {
    switch (typeof e) {
      case "undefined":
        return null;

      case "object":
        return;

      case "symbol":
        return false;

      case "string":
        e = +e;

      case "number":
        if (m(e)) return false;
    }
    return true;
}

function Je(e, t, n) {
    const i = He(n);
    if (null != i) return i;
    return t.has(i) && !e.has(i);
}

function We(e, t, n, i, r) {
    const s = He(n);
    if (null != s) return s;
    const o = t.get(s);
    if (void 0 === o && !t.has(s) || !De(i, o, false, r)) return false;
    return !e.has(s) && De(i, o, false, r);
}

function _e(e, t, n, i) {
    let r = null;
    for (const i of e) if (B(i)) {
        if (null === r) r = new Set;
        r.add(i);
    } else if (!t.has(i)) {
        if (n) return false;
        if (!Je(e, t, i)) return false;
        if (null === r) r = new Set;
        r.add(i);
    }
    if (null !== r) {
        for (const s of t) if (B(s)) {
            if (!Ve(r, s, n, i)) return false;
        } else if (!n && !e.has(s) && !Ve(r, s, n, i)) return false;
        return 0 === r.size;
    }
    return true;
}

function Ge(e, t, n, i, r, s) {
    for (const o of e) if (De(n, o, r, s) && De(i, t.get(o), r, s)) {
        e.delete(o);
        return true;
    }
    return false;
}

function Ye(e, t, n, i) {
    let r = null;
    for (const [s, o] of e) if (B(s)) {
        if (null === r) r = new Set;
        r.add(s);
    } else {
        const a = t.get(s);
        if (void 0 === a && !t.has(s) || !De(o, a, n, i)) {
            if (n) return false;
            if (!We(e, t, s, o, i)) return false;
            if (null === r) r = new Set;
            r.add(s);
        }
    }
    if (null !== r) {
        for (const [s, o] of t) if (B(s)) {
            if (!Ge(r, e, s, o, n, i)) return false;
        } else if (!n && (!e.has(s) || !De(e.get(s), o, false, i)) && !Ge(r, e, s, o, false, i)) return false;
        return 0 === r.size;
    }
    return true;
}

function Ke(e, t, n, i, r, s) {
    let o = 0;
    if (2 === s) {
        if (!_e(e, t, n, r)) return false;
    } else if (3 === s) {
        if (!Ye(e, t, n, r)) return false;
    } else if (1 === s) for (;o < e.length; o++) if (x(e, o)) {
        if (!x(t, o) || !De(e[o], t[o], n, r)) return false;
    } else if (x(t, o)) return false; else {
        const i = f(e);
        for (;o < i.length; o++) {
            const s = i[o];
            if (!x(t, s) || !De(e[s], t[s], n, r)) return false;
        }
        if (i.length !== f(t).length) return false;
        return true;
    }
    for (o = 0; o < i.length; o++) {
        const s = i[o];
        if (!De(e[s], t[s], n, r)) return false;
    }
    return true;
}

function Qe(e, t) {
    return De(e, t, false);
}

function Xe(e, t) {
    return De(e, t, true);
}

class TestContext {
    constructor() {
        this.c = void 0;
        this.p = void 0;
        this.t = void 0;
        this.oL = void 0;
        this.i = void 0;
    }
    get wnd() {
        return this.platform.globalThis;
    }
    get doc() {
        return this.platform.document;
    }
    get userAgent() {
        return this.platform.navigator.userAgent;
    }
    get UIEvent() {
        return this.platform.globalThis.UIEvent;
    }
    get Event() {
        return this.platform.globalThis.Event;
    }
    get CustomEvent() {
        return this.platform.globalThis.CustomEvent;
    }
    get Node() {
        return this.platform.globalThis.Node;
    }
    get Element() {
        return this.platform.globalThis.Element;
    }
    get HTMLElement() {
        return this.platform.globalThis.HTMLElement;
    }
    get HTMLDivElement() {
        return this.platform.globalThis.HTMLDivElement;
    }
    get Text() {
        return this.platform.globalThis.Text;
    }
    get Comment() {
        return this.platform.globalThis.Comment;
    }
    get DOMParser() {
        return this.platform.globalThis.DOMParser;
    }
    get container() {
        if (void 0 === this.c) {
            this.c = e.DI.createContainer();
            n.StandardConfiguration.register(this.c);
            this.c.register(e.Registration.instance(TestContext, this));
            if (false === this.c.has(n.IPlatform, true)) this.c.register(exports.PLATFORMRegistration);
        }
        return this.c;
    }
    get platform() {
        if (void 0 === this.p) this.p = this.container.get(n.IPlatform);
        return this.p;
    }
    get templateCompiler() {
        if (void 0 === this.t) this.t = this.container.get(n.ITemplateCompiler);
        return this.t;
    }
    get observerLocator() {
        if (void 0 === this.oL) this.oL = this.container.get(t.IObserverLocator);
        return this.oL;
    }
    get domParser() {
        if (void 0 === this.i) this.i = this.doc.createElement("div");
        return this.i;
    }
    static create() {
        return new TestContext;
    }
    createElementFromMarkup(e) {
        this.domParser.innerHTML = e;
        return this.domParser.firstElementChild;
    }
    createElement(e) {
        return this.doc.createElement(e);
    }
    createAttribute(e, t) {
        const n = this.doc.createAttribute(e);
        n.value = t;
        return n;
    }
    type(e, t, n) {
        const i = e.querySelector(t);
        i.value = n;
        i.dispatchEvent(new this.CustomEvent("change", {
            bubbles: true
        }));
    }
}

exports.PLATFORM = void 0;

exports.PLATFORMRegistration = void 0;

function Ze(t) {
    exports.PLATFORM = t;
    exports.PLATFORMRegistration = e.Registration.instance(n.IPlatform, t);
}

function et(...t) {
    return e.DI.createContainer().register(exports.PLATFORMRegistration, ...t);
}

let tt;

let nt;

function it(e) {
    if (void 0 === nt) try {
        function t() {
            t();
        }
        t();
    } catch (e) {
        nt = e.message;
        tt = e.name;
    }
    return e.name === tt && e.message === nt;
}

const rt = d({
    showHidden: false,
    depth: 2,
    colors: true,
    customInspect: true,
    showProxy: false,
    maxArrayLength: 100,
    breakLength: 60,
    compact: true,
    sorted: false,
    getters: false,
    userOptions: void 0,
    stylize: ft
});

const st = f(rt);

function ot(e) {
    const t = {};
    for (const n of st) t[n] = e[n];
    if (void 0 !== e.userOptions) p(t, e.userOptions);
    return t;
}

function at(e) {
    const t = {
        ...rt,
        budget: {},
        indentationLvl: 0,
        seen: [],
        currentDepth: 0,
        stylize: e.colors ? ft : ht
    };
    for (const n of st) if (x(e, n)) t[n] = e[n];
    if (void 0 === t.userOptions) t.userOptions = e;
    return t;
}

const lt = d({
    special: "cyan",
    number: "yellow",
    boolean: "yellow",
    undefined: "grey",
    null: "bold",
    string: "green",
    symbol: "green",
    date: "magenta",
    regexp: "red"
});

const ut = d({
    deepStrictEqual: "Expected values to be strictly deep-equal:",
    strictEqual: "Expected values to be strictly equal:",
    strictEqualObject: 'Expected "actual" to be reference-equal to "expected":',
    deepEqual: "Expected values to be loosely deep-equal:",
    equal: "Expected values to be loosely equal:",
    notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:',
    notStrictEqual: 'Expected "actual" to be strictly unequal to:',
    notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":',
    notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:',
    notEqual: 'Expected "actual" to be loosely unequal to:',
    notIdentical: "Values identical but not reference-equal:"
});

const ct = Symbol.for("customInspect");

function ft(e, t) {
    const n = lt[t];
    if (F(n)) return xe[n](e); else return e;
}

function ht(e, t) {
    return e;
}

class AssertionError extends Error {
    constructor(e) {
        const {actual: t, expected: n, message: i, operator: r, stackStartFn: s} = e;
        const o = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        let a = null == i ? "" : `${i} - `;
        if ("deepStrictEqual" === r || "strictEqual" === r) super(`${a}${pt(t, n, r)}`); else if ("notDeepStrictEqual" === r || "notStrictEqual" === r) {
            let e = ut[r];
            let n = hn(t).split("\n");
            if ("notStrictEqual" === r && B(t)) e = ut.notStrictEqualObject;
            if (n.length > 30) {
                n[26] = xe.blue("...");
                while (n.length > 27) n.pop();
            }
            if (1 === n.length) super(`${a}${e} ${n[0]}`); else super(`${a}${e}\n\n${Oe(n, "\n")}\n`);
        } else {
            let e = hn(t);
            let i = "";
            const s = ut[r];
            if ("notDeepEqual" === r || "notEqual" === r) {
                e = `${ut[r]}\n\n${e}`;
                if (e.length > 1024) e = `${e.slice(0, 1021)}...`;
            } else {
                i = `${hn(n)}`;
                if (e.length > 512) e = `${e.slice(0, 509)}...`;
                if (i.length > 512) i = `${i.slice(0, 509)}...`;
                if ("deepEqual" === r || "equal" === r) e = `${s}\n\n${e}\n\nshould equal\n\n`; else i = ` ${r} ${i}`;
            }
            if (!r) {
                i = "";
                e = "";
                a = a.slice(0, -3);
            }
            super(`${a}${e}${i}`);
        }
        Error.stackTraceLimit = o;
        this.generatedMessage = !i || "Failed" === i;
        u(this, "name", {
            value: "AssertionError [ERR_ASSERTION]",
            enumerable: false,
            writable: true,
            configurable: true
        });
        this.code = "ERR_ASSERTION";
        this.actual = t;
        this.expected = n;
        this.operator = r;
        if ("function" === typeof Error.captureStackTrace) {
            Error.captureStackTrace(this, s);
            this.stack;
        } else Error().stack;
        this.name = "AssertionError";
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
    [ct](e, t) {
        return fn(this, {
            ...t,
            customInspect: false,
            depth: 0
        });
    }
}

const dt = 10;

function pt(e, t, n) {
    let i = "";
    let r = "";
    let s = 0;
    let o = "";
    let a = false;
    const l = hn(e);
    const u = l.split("\n");
    const c = hn(t).split("\n");
    let f = 0;
    let h = "";
    if ("strictEqual" === n && B(e) && B(t)) n = "strictEqualObject";
    if (1 === u.length && 1 === c.length && u[0] !== c[0]) {
        const i = u[0].length + c[0].length;
        if (i <= dt) {
            if (!B(e) && !B(t) && (0 !== e || 0 !== t)) return `${ut[n]}\n\n${u[0]} !== ${c[0]}\n`;
        } else if ("strictEqualObject" !== n && i < 80) {
            while (u[0][f] === c[0][f]) f++;
            if (f > 2) {
                h = `\n  ${" ".repeat(f)}^`;
                f = 0;
            }
        }
    }
    let d = u[u.length - 1];
    let p = c[c.length - 1];
    while (d === p) {
        if (f++ < 2) o = `\n  ${d}${o}`; else i = d;
        u.pop();
        c.pop();
        if (0 === u.length || 0 === c.length) break;
        d = u[u.length - 1];
        p = c[c.length - 1];
    }
    const m = Math.max(u.length, c.length);
    if (0 === m) {
        const e = l.split("\n");
        if (e.length > 30) {
            e[26] = xe.blue("...");
            while (e.length > 27) e.pop();
        }
        return `${ut.notIdentical}\n\n${Oe(e, "\n")}\n`;
    }
    if (f > 3) {
        o = `\n${xe.blue("...")}${o}`;
        a = true;
    }
    if ("" !== i) {
        o = `\n  ${i}${o}`;
        i = "";
    }
    let g = 0;
    const b = `${ut[n]}\n${xe.green("+ actual")} ${xe.red("- expected")}`;
    const v = ` ${xe.blue("...")} Lines skipped`;
    for (f = 0; f < m; f++) {
        const e = f - s;
        if (u.length < f + 1) {
            if (e > 1 && f > 2) {
                if (e > 4) {
                    r += `\n${xe.blue("...")}`;
                    a = true;
                } else if (e > 3) {
                    r += `\n  ${c[f - 2]}`;
                    g++;
                }
                r += `\n  ${c[f - 1]}`;
                g++;
            }
            s = f;
            i += `\n${xe.red("-")} ${c[f]}`;
            g++;
        } else if (c.length < f + 1) {
            if (e > 1 && f > 2) {
                if (e > 4) {
                    r += `\n${xe.blue("...")}`;
                    a = true;
                } else if (e > 3) {
                    r += `\n  ${u[f - 2]}`;
                    g++;
                }
                r += `\n  ${u[f - 1]}`;
                g++;
            }
            s = f;
            r += `\n${xe.green("+")} ${u[f]}`;
            g++;
        } else {
            const t = c[f];
            let n = u[f];
            let o = n !== t && (!n.endsWith(",") || n.slice(0, -1) !== t);
            if (o && t.endsWith(",") && t.slice(0, -1) === n) {
                o = false;
                n += ",";
            }
            if (o) {
                if (e > 1 && f > 2) {
                    if (e > 4) {
                        r += `\n${xe.blue("...")}`;
                        a = true;
                    } else if (e > 3) {
                        r += `\n  ${u[f - 2]}`;
                        g++;
                    }
                    r += `\n  ${u[f - 1]}`;
                    g++;
                }
                s = f;
                r += `\n${xe.green("+")} ${n}`;
                i += `\n${xe.red("-")} ${t}`;
                g += 2;
            } else {
                r += i;
                i = "";
                if (1 === e || 0 === f) {
                    r += `\n  ${n}`;
                    g++;
                }
            }
        }
        if (g > 1e3 && f < m - 2) return `${b}${v}\n${r}\n${xe.blue("...")}${i}\n${xe.blue("...")}`;
    }
    return `${b}${a ? v : ""}\n${r}${i}${o}${h}`;
}

const mt = 0;

const gt = 1;

const bt = 2;

const vt = new Int8Array(128);

const xt = new Int8Array(128);

for (let e = 0; e < 128; ++e) if (36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122) vt[e] = xt[e] = 1; else if (e >= 49 && e <= 57) xt[e] = 1;

function $t(e) {
    if (1 !== vt[e.charCodeAt(0)]) return false;
    const {length: t} = e;
    for (let n = 1; n < t; ++n) if (1 !== xt[e.charCodeAt(n)]) return false;
    return true;
}

const yt = {};

const wt = 16;

const kt = 0;

const Ct = 1;

const St = 2;

function Ot(e, t) {
    let n = 0;
    let i = 0;
    let r = 0;
    const s = new Array(t.length);
    for (;r < t.length; r++) {
        const o = e.colors ? Se(t[r]).length : t[r].length;
        s[r] = o;
        n += o;
        if (i < o) i = o;
    }
    const o = i + 2;
    if (3 * o + e.indentationLvl < e.breakLength && (n / i > 5 || i <= 6)) {
        const n = 2.5;
        const a = 1;
        const l = Math.min(Math.round(Math.sqrt(n * (o - a) * t.length) / (o - a)), 3 * e.compact, 10);
        if (l <= 1) return t;
        const u = [];
        let c = s[0];
        for (r = l; r < s.length; r += l) if (s[r] > c) c = s[r];
        for (r = 0; r < t.length; r += l) {
            let e = t[r].length - s[r];
            let n = t[r].padStart(c + e, " ");
            const o = Math.min(r + l, t.length);
            for (let a = r + 1; a < o; a++) {
                e = t[a].length - s[a];
                n += `, ${t[a].padStart(i + e, " ")}`;
            }
            u.push(n);
        }
        t = u;
    }
    return t;
}

function Et(e, t, n, i, r) {
    if (it(t)) {
        e.seen.pop();
        e.indentationLvl = r;
        return e.stylize(`[${Nt(n, i)}: Inspection interrupted prematurely. Maximum call stack size exceeded.]`, "special");
    }
    throw t;
}

const jt = d([ "BYTES_PER_ELEMENT", "length", "byteLength", "byteOffset", "buffer" ]);

function At(e) {
    const t = [];
    for (const [n, i] of e) t.push(n, i);
    return t;
}

function Rt(e, t, n) {
    let i = t.length + n;
    if (i + t.length > e.breakLength) return false;
    for (let n = 0; n < t.length; n++) {
        if (e.colors) i += Se(t[n]).length; else i += t[n].length;
        if (i > e.breakLength) return false;
    }
    return true;
}

function qt(e, t, n, i, r = false) {
    if (true !== e.compact) {
        if (r) {
            const r = t.length + e.indentationLvl + i[0].length + n.length + 10;
            if (Rt(e, t, r)) return `${n ? `${n} ` : ""}${i[0]} ${Oe(t, ", ")} ${i[1]}`;
        }
        const s = `\n${" ".repeat(e.indentationLvl)}`;
        return `${n ? `${n} ` : ""}${i[0]}${s}  ${Oe(t, `,${s}  `)}${s}${i[1]}`;
    }
    if (Rt(e, t, 0)) return `${i[0]}${n ? ` ${n}` : ""} ${Oe(t, ", ")} ${i[1]}`;
    const s = " ".repeat(e.indentationLvl);
    const o = "" === n && 1 === i[0].length ? " " : `${n ? ` ${n}` : ""}\n${s}  `;
    return `${i[0]}${o}${Oe(t, `,\n${s}  `)} ${i[1]}`;
}

function Mt(e, t) {
    let n;
    while (e) {
        const t = s(e, "constructor");
        if (!P(t) && I(t.value) && "" !== t.value.name) return t.value.name;
        e = r(e);
        if (void 0 === n) n = e;
    }
    if (null === n) return null;
    const i = {
        ...t,
        customInspect: false
    };
    return `<${fn(n, i)}>`;
}

function Lt() {
    return [];
}

function Tt(e, t, n) {
    if (null === e) {
        if ("" !== t) return `[${n}: null prototype] [${t}] `;
        return `[${n}: null prototype] `;
    }
    if ("" !== t && e !== t) return `${e} [${t}] `;
    return `${e} `;
}

const zt = Wt.bind(null, ht);

function Ft(e, t) {
    let n;
    const i = l(e);
    if (t) {
        n = a(e);
        if (0 !== i.length) n.push(...i);
    } else {
        n = f(e);
        if (0 !== i.length) n.push(...i.filter((t => $(e, t))));
    }
    return n;
}

function Nt(e, t) {
    return e || t || "Object";
}

const Pt = d([ [ ie, Uint8Array ], [ re, Uint8ClampedArray ], [ se, Uint16Array ], [ oe, Uint32Array ], [ ae, Int8Array ], [ le, Int16Array ], [ ue, Int32Array ], [ ce, Float32Array ], [ fe, Float64Array ] ]);

const Bt = Pt.length;

function It(e) {
    for (let t = 0; t < Bt; ++t) {
        const [n, i] = Pt[t];
        if (n(e)) return i;
    }
    return;
}

function Dt(e, t) {
    if (t !== `${e} Iterator`) {
        if ("" !== t) t += "] [";
        t += `${e} Iterator`;
    }
    return [ `[${t}] {`, "}" ];
}

let Ut;

function Vt(e, t) {
    if (void 0 === Ut) Ut = new Map; else {
        const t = Ut.get(e);
        if (void 0 !== t) return t;
    }
    class NullPrototype extends e {
        get [Symbol.toStringTag]() {
            return "";
        }
    }
    u(NullPrototype.prototype.constructor, "name", {
        value: `[${t}: null prototype]`
    });
    Ut.set(e, NullPrototype);
    return NullPrototype;
}

function Ht(e, t, n) {
    let i;
    if (G(t)) {
        const e = Vt(Set, "Set");
        i = new e(A(t));
    } else if (J(t)) {
        const e = Vt(Map, "Map");
        i = new e(R(t));
    } else if (Array.isArray(t)) {
        const e = Vt(Array, "Array");
        i = new e(t.length);
    } else if (ne(t)) {
        const e = It(t);
        const n = Vt(e, e.name);
        i = new n(t);
    }
    if (void 0 !== i) {
        c(i, o(t));
        return un(e, i, n);
    }
    return;
}

function Jt(e, t) {
    return e(h(t, -0) ? "-0" : `${t}`, "number");
}

function Wt(e, t, n) {
    switch (typeof t) {
      case "string":
        if (true !== n.compact && n.indentationLvl + t.length > n.breakLength && t.length > wt) {
            const i = n.breakLength - n.indentationLvl;
            const r = Math.max(i, wt);
            const s = Math.ceil(t.length / r);
            const o = Math.ceil(t.length / s);
            const a = Math.max(o, wt);
            if (void 0 === yt[a]) yt[a] = new RegExp(`(.|\\n){1,${a}}(\\s|$)|(\\n|.)+?(\\s|$)`, "gm");
            const l = t.match(yt[a]);
            if (l.length > 1) {
                const t = " ".repeat(n.indentationLvl);
                let i = `${e(Re(l[0]), "string")} +\n`;
                let r = 1;
                for (;r < l.length - 1; r++) i += `${t}  ${e(Re(l[r]), "string")} +\n`;
                i += `${t}  ${e(Re(l[r]), "string")}`;
                return i;
            }
        }
        return e(Re(t), "string");

      case "number":
        return Jt(e, t);

      case "boolean":
        return e(t.toString(), "boolean");

      case "undefined":
        return e("undefined", "undefined");

      case "symbol":
        return e(t.toString(), "symbol");
    }
    throw new Error(`formatPrimitive only handles non-null primitives. Got: ${k(t)}`);
}

function _t(e) {
    return e.stack || E(e);
}

function Gt(t, n, i, r, s, o) {
    const a = f(n);
    let l = o;
    for (;o < a.length && s.length < r; o++) {
        const u = a[o];
        const c = +u;
        if (c > 2 ** 32 - 2) break;
        if (`${l}` !== u) {
            if (!e.isArrayIndex(u)) break;
            const n = c - l;
            const i = n > 1 ? "s" : "";
            const o = `<${n} empty item${i}>`;
            s.push(t.stylize(o, "undefined"));
            l = c;
            if (s.length === r) break;
        }
        s.push(ln(t, n, i, u, gt));
        l++;
    }
    const u = n.length - l;
    if (s.length !== r) {
        if (u > 0) {
            const e = u > 1 ? "s" : "";
            const n = `<${u} empty item${e}>`;
            s.push(t.stylize(n, "undefined"));
        }
    } else if (u > 0) s.push(`... ${u} more item${u > 1 ? "s" : ""}`);
    return s;
}

function Yt(e, t) {
    const n = new Uint8Array(t);
    let i = Oe(n.slice(0, Math.min(e.maxArrayLength, n.length)).map((e => e.toString(16))), " ");
    const r = n.length - e.maxArrayLength;
    if (r > 0) i += ` ... ${r} more byte${r > 1 ? "s" : ""}`;
    return [ `${e.stylize("[Uint8Contents]", "special")}: <${i}>` ];
}

function Kt(e, t, n) {
    const i = t.length;
    const r = Math.min(Math.max(0, e.maxArrayLength), i);
    const s = i - r;
    const o = [];
    for (let i = 0; i < r; i++) {
        if (!x(t, i)) return Gt(e, t, n, r, o, i);
        o.push(ln(e, t, n, i, gt));
    }
    if (s > 0) o.push(`... ${s} more item${s > 1 ? "s" : ""}`);
    return o;
}

function Qt(e, t, n) {
    const i = Math.min(Math.max(0, e.maxArrayLength), t.length);
    const r = t.length - i;
    const s = new Array(i);
    let o = 0;
    for (;o < i; ++o) s[o] = Jt(e.stylize, t[o]);
    if (r > 0) s[o] = `... ${r} more item${r > 1 ? "s" : ""}`;
    if (e.showHidden) {
        e.indentationLvl += 2;
        for (const i of jt) {
            const r = cn(e, t[i], n, true);
            s.push(`[${i}]: ${r}`);
        }
        e.indentationLvl -= 2;
    }
    return s;
}

function Xt(e, t, n) {
    const i = [];
    e.indentationLvl += 2;
    for (const r of t) i.push(cn(e, r, n));
    e.indentationLvl -= 2;
    if (e.showHidden) i.push(`[size]: ${e.stylize(t.size.toString(), "number")}`);
    return i;
}

function Zt(e, t, n) {
    const i = [];
    e.indentationLvl += 2;
    for (const [r, s] of t) i.push(`${cn(e, r, n)} => ${cn(e, s, n)}`);
    e.indentationLvl -= 2;
    if (e.showHidden) i.push(`[size]: ${e.stylize(t.size.toString(), "number")}`);
    return i;
}

function en(e, t, n, i) {
    const r = Math.max(e.maxArrayLength, 0);
    const s = Math.min(r, n.length);
    const o = new Array(s);
    e.indentationLvl += 2;
    for (let i = 0; i < s; i++) o[i] = cn(e, n[i], t);
    e.indentationLvl -= 2;
    if (i === kt) o.sort();
    const a = n.length - s;
    if (a > 0) o.push(`... ${a} more item${a > 1 ? "s" : ""}`);
    return o;
}

function tn(e, t, n, i) {
    const r = Math.max(e.maxArrayLength, 0);
    const s = n.length / 2;
    const o = s - r;
    const a = Math.min(r, s);
    const l = new Array(a);
    let u = "";
    let c = "";
    let f = " => ";
    let h = 0;
    if (i === St) {
        u = "[ ";
        c = " ]";
        f = ", ";
    }
    e.indentationLvl += 2;
    for (;h < a; h++) {
        const i = 2 * h;
        l[h] = `${u}${cn(e, n[i], t)}` + `${f}${cn(e, n[i + 1], t)}${c}`;
    }
    e.indentationLvl -= 2;
    if (i === kt) l.sort();
    if (o > 0) l.push(`... ${o} more item${o > 1 ? "s" : ""}`);
    return l;
}

function nn(e) {
    return [ e.stylize("<items unknown>", "special") ];
}

function rn(e, t, n) {
    return en(e, n, [], kt);
}

function sn(e, t, n) {
    return tn(e, n, [], kt);
}

function on(e, t, n, i) {
    const r = At(t.entries());
    if (t instanceof Map) {
        i[0] = i[0].replace(/ Iterator] {$/, " Entries] {");
        return tn(e, n, r, St);
    }
    return en(e, n, r, Ct);
}

function an(e, t, n) {
    return [ "[object Promise]" ];
}

function ln(e, t, n, i, r) {
    switch (i) {
      case "$controller":
        return `$controller: { id: ${t.$controller.id} } (omitted for brevity)`;

      case "overrideContext":
        return "overrideContext: (omitted for brevity)";
    }
    let o, a;
    let l = " ";
    const u = s(t, i) || {
        value: t[i],
        enumerable: true
    };
    if (void 0 !== u.value) {
        const t = r !== mt || true !== e.compact ? 2 : 3;
        e.indentationLvl += t;
        a = cn(e, u.value, n);
        if (3 === t) {
            const t = e.colors ? Se(a).length : a.length;
            if (e.breakLength < t) l = `\n${" ".repeat(e.indentationLvl)}`;
        }
        e.indentationLvl -= t;
    } else if (void 0 !== u.get) {
        const r = void 0 !== u.set ? "Getter/Setter" : "Getter";
        const s = e.stylize;
        const o = "special";
        if (e.getters && (true === e.getters || "get" === e.getters && void 0 === u.set || "set" === e.getters && void 0 !== u.set)) try {
            const l = t[i];
            e.indentationLvl += 2;
            if (null === l) a = `${s(`[${r}:`, o)} ${s("null", "null")}${s("]", o)}`; else if ("object" === typeof l) a = `${s(`[${r}]`, o)} ${cn(e, l, n)}`; else {
                const t = Wt(s, l, e);
                a = `${s(`[${r}:`, o)} ${t}${s("]", o)}`;
            }
            e.indentationLvl -= 2;
        } catch (e) {
            const t = `<Inspection threw (${e.message})>`;
            a = `${s(`[${r}:`, o)} ${t}${s("]", o)}`;
        } else a = e.stylize(`[${r}]`, o);
    } else if (void 0 !== u.set) a = e.stylize("[Setter]", "special"); else a = e.stylize("undefined", "undefined");
    if (r === gt) return a;
    if (N(i)) {
        const t = qe(i.toString());
        o = `[${e.stylize(t, "symbol")}]`;
    } else if (false === u.enumerable) o = `[${qe(i.toString())}]`; else if ($t(i)) o = e.stylize(i, "name"); else o = e.stylize(Re(i), "string");
    return `${o}:${l}${a}`;
}

function un(e, t, n, i) {
    let r;
    const s = Mt(t, e);
    switch (s) {
      case "Container":
      case "ObserverLocator":
      case "Window":
        return e.stylize(`${s} (omitted for brevity)`, "special");

      case "Function":
        if ("Node" === t.name) return e.stylize("Node constructor (omitted for brevity)", "special");
    }
    let o = t[Symbol.toStringTag];
    if (!F(o)) o = "";
    let a = "";
    let l = Lt;
    let u;
    let c = true;
    let f = 0;
    let h = mt;
    if (t[Symbol.iterator]) {
        c = false;
        if (Array.isArray(t)) {
            r = be(t, e.showHidden);
            const n = Tt(s, o, "Array");
            u = [ `${"Array " === n ? "" : n}[`, "]" ];
            if (0 === t.length && 0 === r.length) return `${u[0]}]`;
            h = bt;
            l = Kt;
        } else if (G(t)) {
            r = Ft(t, e.showHidden);
            const n = Tt(s, o, "Set");
            if (0 === t.size && 0 === r.length) return `${n}{}`;
            u = [ `${n}{`, "}" ];
            l = Xt;
        } else if (J(t)) {
            r = Ft(t, e.showHidden);
            const n = Tt(s, o, "Map");
            if (0 === t.size && 0 === r.length) return `${n}{}`;
            u = [ `${n}{`, "}" ];
            l = Zt;
        } else if (ne(t)) {
            r = be(t, e.showHidden);
            const n = null !== s ? Tt(s, o) : Tt(s, o, It(t).name);
            u = [ `${n}[`, "]" ];
            if (0 === t.length && 0 === r.length && !e.showHidden) return `${u[0]}]`;
            l = Qt;
            h = bt;
        } else if (W(t)) {
            r = Ft(t, e.showHidden);
            u = Dt("Map", o);
            l = on;
        } else if (Y(t)) {
            r = Ft(t, e.showHidden);
            u = Dt("Set", o);
            l = on;
        } else c = true;
    }
    if (c) {
        r = Ft(t, e.showHidden);
        u = [ "{", "}" ];
        if ("Object" === s) {
            if (he(t)) u[0] = "[Arguments] {"; else if ("" !== o) u[0] = `${Tt(s, o, "Object")}{`;
            if (0 === r.length) return `${u[0]}}`;
        } else if (I(t)) {
            const n = s || o || "Function";
            let i = `${n}`;
            if (t.name && F(t.name)) i += `: ${t.name}`;
            if (0 === r.length) return e.stylize(`[${i}]`, "special");
            a = `[${i}]`;
        } else if (_(t)) {
            a = C(null !== s ? t : new RegExp(t));
            const i = Tt(s, o, "RegExp");
            if ("RegExp " !== i) a = `${i}${a}`;
            if (0 === r.length || n > e.depth && null !== e.depth) return e.stylize(a, "regexp");
        } else if (H(t)) {
            a = Number.isNaN(j(t)) ? O(t) : S(t);
            const n = Tt(s, o, "Date");
            if ("Date " !== n) a = `${n}${a}`;
            if (0 === r.length) return e.stylize(a, "date");
        } else if (K(t)) {
            a = _t(t);
            const n = a.indexOf("\n    at");
            if (-1 === n) a = `[${a}]`;
            if (0 !== e.indentationLvl) {
                const n = " ".repeat(e.indentationLvl);
                a = _t(t).replace(/\n/g, `\n${n}`);
            }
            if (0 === r.length) return a;
            if (false === e.compact && -1 !== n) {
                u[0] += `${a.slice(n)}`;
                a = `[${a.slice(0, n)}]`;
            }
        } else if (V(t)) {
            const n = U(t) ? "ArrayBuffer" : "SharedArrayBuffer";
            const a = Tt(s, o, n);
            if (void 0 === i) l = Yt; else if (0 === r.length) return `${a}{ byteLength: ${Jt(e.stylize, t.byteLength)} }`;
            u[0] = `${a}{`;
            r.unshift("byteLength");
        } else if (de(t)) {
            u[0] = `${Tt(s, o, "DataView")}{`;
            r.unshift("byteLength", "byteOffset", "buffer");
        } else if (pe(t)) {
            u[0] = `${Tt(s, o, "Promise")}{`;
            l = an;
        } else if (me(t)) {
            u[0] = `${Tt(s, o, "WeakSet")}{`;
            l = e.showHidden ? rn : nn;
        } else if (ge(t)) {
            u[0] = `${Tt(s, o, "WeakMap")}{`;
            l = e.showHidden ? sn : nn;
        } else if (te(t)) {
            let n;
            if (Q(t)) {
                a = `[Number: ${zt(M(t), e)}]`;
                n = "number";
            } else if (X(t)) {
                a = `[String: ${zt(T(t), e)}]`;
                n = "string";
                r = r.slice(t.length);
            } else if (Z(t)) {
                a = `[Boolean: ${zt(q(t), e)}]`;
                n = "boolean";
            } else {
                a = `[Symbol: ${zt(L(t), e)}]`;
                n = "symbol";
            }
            if (0 === r.length) return e.stylize(a, n);
        } else {
            if (null === s) {
                const i = Ht(e, t, n);
                if (i) return i;
            }
            if (W(t)) {
                u = Dt("Map", o);
                l = on;
            } else if (Y(t)) {
                u = Dt("Set", o);
                l = on;
            } else if (0 === r.length) return `${Tt(s, o, "Object")}{}`; else u[0] = `${Tt(s, o, "Object")}{`;
        }
    }
    if (n > e.depth && null !== e.depth) return e.stylize(`[${Nt(s, o)}]`, "special");
    n += 1;
    e.seen.push(t);
    e.currentDepth = n;
    let d;
    const p = e.indentationLvl;
    try {
        d = l(e, t, n, r, u);
        let i;
        const s = !(t instanceof exports.PLATFORM.Node);
        for (f = 0; f < r.length; f++) {
            i = r[f];
            if ((s || "textContent" === i || "outerHTML" === i) && "$$calls" !== i) d.push(ln(e, t, n, r[f], h));
        }
    } catch (t) {
        return Et(e, t, s, o, p);
    }
    e.seen.pop();
    if (e.sorted) {
        const t = true === e.sorted ? void 0 : e.sorted;
        if (h === mt) d.sort(t); else if (r.length > 1) {
            const e = d.slice(d.length - r.length).sort(t);
            d.splice(d.length - r.length, r.length, ...e);
        }
    }
    let m = false;
    if (z(e.compact)) {
        const t = d.length;
        if (h === bt && d.length > 6) d = Ot(e, d);
        if (e.currentDepth - n < e.compact && t === d.length) m = true;
    }
    const g = qt(e, d, a, u, m);
    const b = e.budget[e.indentationLvl] || 0;
    const v = b + g.length;
    e.budget[e.indentationLvl] = v;
    if (v > 2 ** 27) e.stop = true;
    return g;
}

function cn(e, t, n, i) {
    if ("object" !== typeof t && "function" !== typeof t) return Wt(e.stylize, t, e);
    if (null === t) return e.stylize("null", "null");
    if (void 0 !== e.stop) {
        const n = Mt(t, e) || t[Symbol.toStringTag];
        return e.stylize(`[${n || "Object"}]`, "special");
    }
    if (e.customInspect) {
        const i = t[ct];
        if (I(i) && i !== fn && !(t.constructor && t.constructor.prototype === t)) {
            const r = null === e.depth ? null : e.depth - n;
            const s = i.call(t, r, ot(e));
            if (s !== t) {
                if (!F(s)) return cn(e, s, n);
                return s.replace(/\n/g, `\n${" ".repeat(e.indentationLvl)}`);
            }
        }
    }
    if (e.seen.includes(t)) return e.stylize("[Circular]", "special");
    return un(e, t, n, i);
}

function fn(e, t = {}) {
    const n = at(t);
    return cn(n, e, 0);
}

function hn(e) {
    return fn(e, {
        compact: false,
        customInspect: false,
        depth: 100,
        maxArrayLength: 1 / 0,
        showHidden: false,
        breakLength: 1 / 0,
        showProxy: false,
        sorted: true,
        getters: true
    });
}

function dn(e, t, n, i, r) {
    if (void 0 === n) n = 0;
    if ("object" !== typeof t || null === t) {
        di.strictEqual(e, t, `actual, depth=${n}, prop=${i}, index=${r}`);
        return;
    }
    if (t instanceof Array) {
        for (let r = 0; r < t.length; r++) dn(e[r], t[r], n + 1, i, r);
        return;
    }
    if (t.nodeType > 0) {
        if (11 === t.nodeType) for (let r = 0; r < t.childNodes.length; r++) dn(e.childNodes.item(r), t.childNodes.item(r), n + 1, i, r); else di.strictEqual(e.outerHTML, t.outerHTML, `actual.outerHTML, depth=${n}, prop=${i}, index=${r}`);
        return;
    }
    if (e) {
        di.strictEqual(e.constructor.name, t.constructor.name, `actual.constructor.name, depth=${n}, prop=${i}, index=${r}`);
        di.strictEqual(e.toString(), t.toString(), `actual.toString(), depth=${n}, prop=${i}, index=${r}`);
        for (const i of Object.keys(t)) dn(e[i], t[i], n + 1, i, r);
    }
}

function pn(e, t) {
    var n, i, r;
    const s = null !== (i = null !== (n = t.parentNode) && void 0 !== n ? n : t.host) && void 0 !== i ? i : null;
    if (null === s || s === e) return null;
    return null !== (r = s.nextSibling) && void 0 !== r ? r : pn(e, s);
}

function mn(e, t) {
    var i, r, s, o, a;
    return null !== (a = null !== (o = null !== (s = null === (r = null === (i = n.CustomElement.for(t, {
        optional: true
    })) || void 0 === i ? void 0 : i.shadowRoot) || void 0 === r ? void 0 : r.firstChild) && void 0 !== s ? s : t.firstChild) && void 0 !== o ? o : t.nextSibling) && void 0 !== a ? a : pn(e, t);
}

function gn(e, t) {
    var i, r, s;
    let o = "";
    let a = null !== (s = null === (r = null === (i = n.CustomElement.for(e, {
        optional: true
    })) || void 0 === i ? void 0 : i.shadowRoot) || void 0 === r ? void 0 : r.firstChild) && void 0 !== s ? s : e.firstChild;
    while (null !== a) {
        if (3 === a.nodeType) o += a.data;
        a = mn(e, a);
    }
    return t && o ? o.replace(/\s\s+/g, " ").trim() : o;
}

function bn(e) {
    switch (e) {
      case "ha":
        return "textBinding";

      case "rf":
        return "interpolation";

      case "rg":
        return "propertyBinding";

      case "rk":
        return "iteratorBinding";

      case "hb":
        return "listenerBinding";

      case "rh":
        return "callBinding";

      case "rj":
        return "refBinding";

      case "hd":
        return "stylePropertyBinding";

      case "re":
        return "setProperty";

      case "he":
        return "setAttribute";

      case "ra":
        return "hydrateElement";

      case "rb":
        return "hydrateAttribute";

      case "rc":
        return "hydrateTemplateController";

      case "rd":
        return "hydrateLetElement";

      case "ri":
        return "letBinding";

      default:
        return e;
    }
}

function vn(e, t, n, i) {
    if (void 0 === i) i = "instruction";
    if (void 0 === n) n = [];
    if (!(t instanceof Object) || !(e instanceof Object)) if (e !== t) if (i.endsWith(".name")) {
        if ("unnamed" === String(t) && String(e).startsWith("unnamed-")) n.push(`OK   : ${i} === ${t} (${e})`);
    } else if (i.endsWith(".key")) {
        if (String(t).endsWith("unnamed") && /unnamed-\d+$/.test(String(e))) n.push(`OK   : ${i} === ${t} (${e})`);
    } else {
        if ("object" === typeof t && null != t) t = JSON.stringify(t);
        if ("object" === typeof e && null != e) e = JSON.stringify(e);
        if (i.endsWith("type")) {
            t = bn(t);
            e = bn(e);
        }
        n.push(`WRONG: ${i} === ${e} (expected: ${t})`);
    } else n.push(`OK   : ${i} === ${t}`); else if (t instanceof Array) for (let r = 0, s = Math.max(t.length, e.length); r < s; ++r) vn(e[r], t[r], n, `${i}[${r}]`); else if (t.nodeType > 0) if (11 === t.nodeType) for (let r = 0, s = Math.max(t.childNodes.length, e.childNodes.length); r < s; ++r) vn(e.childNodes.item(r), t.childNodes.item(r), n, `${i}.childNodes[${r}]`); else if (e.outerHTML !== t["outerHTML"]) n.push(`WRONG: ${i}.outerHTML === ${e.outerHTML} (expected: ${t["outerHTML"]})`); else n.push(`OK   : ${i}.outerHTML === ${t}`); else if (e) {
        const r = {};
        for (const s in t) {
            vn(e[s], t[s], n, `${i}.${s}`);
            r[s] = true;
        }
        for (const s in e) if (!r[s]) vn(e[s], t[s], n, `${i}.${s}`);
    }
    if ("instruction" === i && n.some((e => e.startsWith("W")))) throw new Error(`Failed assertion: binding instruction mismatch\n  - ${n.join("\n  - ")}`);
}

function xn(e) {
    if (!e) e = i.BrowserPlatform.getOrCreate(globalThis);
    e.taskQueue.flush();
    e.taskQueue["pending"].forEach((e => e.cancel()));
    e.domWriteQueue.flush();
    e.domWriteQueue["pending"].forEach((e => e.cancel()));
    e.domReadQueue.flush();
    e.domReadQueue["pending"].forEach((e => e.cancel()));
}

const $n = Symbol("noException");

function yn(e) {
    if (K(e.message)) throw e.message;
    throw new AssertionError(e);
}

function wn(e, t, n, i) {
    if (!n) {
        let r = false;
        if (0 === t) {
            r = true;
            i = "No value argument passed to `assert.ok()`";
        } else if (K(i)) throw i;
        const s = new AssertionError({
            actual: n,
            expected: true,
            message: i,
            operator: "==",
            stackStartFn: e
        });
        s.generatedMessage = r;
        throw s;
    }
}

class Comparison {
    constructor(e, t, n) {
        for (const i of t) if (i in e) if (!P(n) && F(n[i]) && _(e[i]) && e[i].test(n[i])) this[i] = n[i]; else this[i] = e[i];
    }
}

function kn(e, t, n, i, r) {
    if (!(n in e) || !Xe(e[n], t[n])) {
        if (!i) {
            const n = new Comparison(e, r);
            const i = new Comparison(t, r, e);
            const s = new AssertionError({
                actual: n,
                expected: i,
                operator: "deepStrictEqual",
                stackStartFn: An
            });
            s.actual = e;
            s.expected = t;
            s.operator = "throws";
            throw s;
        }
        yn({
            actual: e,
            expected: t,
            message: i,
            operator: "throws",
            stackStartFn: An
        });
    }
}

function Cn(e, t, n) {
    if (!I(t)) {
        if (_(t)) return t.test(e);
        if (D(e)) {
            const i = new AssertionError({
                actual: e,
                expected: t,
                message: n,
                operator: "deepStrictEqual",
                stackStartFn: An
            });
            i.operator = "throws";
            throw i;
        }
        const i = f(t);
        if (K(t)) i.push("name", "message");
        for (const r of i) {
            if (F(e[r]) && _(t[r]) && t[r].test(e[r])) continue;
            kn(e, t, r, n, i);
        }
        return true;
    }
    if (void 0 !== t.prototype && e instanceof t) return true;
    if (Object.prototype.isPrototypeOf.call(Error, t)) return false;
    return true === t.call({}, e);
}

function Sn(e) {
    try {
        e();
    } catch (e) {
        return e;
    }
    return $n;
}

async function On(e) {
    let t;
    if (I(e)) t = e(); else t = e;
    try {
        await t;
    } catch (e) {
        return e;
    }
    return $n;
}

function En(e, t, n, i) {
    if (F(n)) {
        i = n;
        n = void 0;
    }
    if (t === $n) {
        let t = "";
        if (n && n.name) t += ` (${n.name})`;
        t += i ? `: ${i}` : ".";
        const r = "rejects" === e.name ? "rejection" : "exception";
        yn({
            actual: void 0,
            expected: n,
            operator: e.name,
            message: `Missing expected ${r}${t}`,
            stackStartFn: e
        });
    }
    if (n && false === Cn(t, n, i)) throw t;
}

function jn(e, t, n, i) {
    if (t === $n) return;
    if (F(n)) {
        i = n;
        n = void 0;
    }
    if (!n || Cn(t, n)) {
        const r = i ? `: ${i}` : ".";
        const s = "doesNotReject" === e.name ? "rejection" : "exception";
        yn({
            actual: t,
            expected: n,
            operator: e.name,
            message: `Got unwanted ${s}${r}\nActual message: "${t && t.message}"`,
            stackStartFn: e
        });
    }
    throw t;
}

function An(e, t, n) {
    En(An, Sn(e), t, n);
}

async function Rn(e, t, n) {
    En(Rn, await On(e), t, n);
}

function qn(e, t, n) {
    jn(qn, Sn(e), t, n);
}

async function Mn(e, t, n) {
    jn(Mn, await On(e), t, n);
}

function Ln(...e) {
    wn(Ln, e.length, ...e);
}

function Tn(e = "Failed") {
    if (K(e)) throw e;
    const t = new AssertionError({
        message: e,
        actual: void 0,
        expected: void 0,
        operator: "fail",
        stackStartFn: Tn
    });
    t.generatedMessage = "Failed" === e;
    throw t;
}

function zn(e, t, n) {
    const i = gn(e);
    if (i !== t) yn({
        actual: i,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: zn
    });
}

function Fn(e, t, n) {
    if (e != t) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: Fn
    });
}

function Nn(e, t, n) {
    if (typeof e !== t) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "typeof",
        stackStartFn: Nn
    });
}

function Pn(e, t, n) {
    if (!(e instanceof t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "instanceOf",
        stackStartFn: Pn
    });
}

function Bn(e, t, n) {
    if (e instanceof t) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notInstanceOf",
        stackStartFn: Bn
    });
}

function In(e, t, n) {
    if (!e.includes(t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "includes",
        stackStartFn: In
    });
}

function Dn(e, t, n) {
    if (e.includes(t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notIncludes",
        stackStartFn: Dn
    });
}

function Un(e, t, n) {
    if (!e.contains(t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "contains",
        stackStartFn: Un
    });
}

function Vn(e, t, n) {
    if (e.contains(t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notContains",
        stackStartFn: Vn
    });
}

function Hn(e, t, n) {
    if (!(e > t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "greaterThan",
        stackStartFn: Hn
    });
}

function Jn(e, t, n) {
    if (!(e >= t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "greaterThanOrEqualTo",
        stackStartFn: Jn
    });
}

function Wn(e, t, n) {
    if (!(e < t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "lessThan",
        stackStartFn: Wn
    });
}

function _n(e, t, n) {
    if (!(e <= t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "lessThanOrEqualTo",
        stackStartFn: _n
    });
}

function Gn(e, t, n) {
    if (e == t) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "!=",
        stackStartFn: Gn
    });
}

function Yn(e, t, n) {
    if (!Qe(e, t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "deepEqual",
        stackStartFn: Yn
    });
}

function Kn(e, t, n) {
    if (Qe(e, t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notDeepEqual",
        stackStartFn: Kn
    });
}

function Qn(e, t, n) {
    if (!Xe(e, t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "deepStrictEqual",
        stackStartFn: Qn
    });
}

function Xn(e, t, n) {
    if (Xe(e, t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notDeepStrictEqual",
        stackStartFn: Xn
    });
}

function Zn(e, t, n) {
    if (!h(e, t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "strictEqual",
        stackStartFn: Zn
    });
}

function ei(e, t, n) {
    if (h(e, t)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notStrictEqual",
        stackStartFn: ei
    });
}

function ti(e, t, n) {
    if (!t.test(e)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "match",
        stackStartFn: ti
    });
}

function ni(e, t, n) {
    if (t.test(e)) yn({
        actual: e,
        expected: t,
        message: n,
        operator: "notMatch",
        stackStartFn: ni
    });
}

function ii(e, t) {
    if (!n.CustomElement.isType(e)) yn({
        actual: false,
        expected: true,
        message: t,
        operator: "isCustomElementType",
        stackStartFn: ii
    });
}

function ri(e, t) {
    if (!n.CustomAttribute.isType(e)) yn({
        actual: false,
        expected: true,
        message: t,
        operator: "isCustomAttributeType",
        stackStartFn: ii
    });
}

function si(e, t = exports.PLATFORM.document) {
    return "string" === typeof e ? t.querySelector(e) : e;
}

function oi(e, t, n, i) {
    const r = si(e, i);
    const s = r && gn(r, true);
    if (s !== t) yn({
        actual: s,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: oi
    });
}

function ai(e, t, n, i) {
    const r = si(e, i);
    const s = r instanceof HTMLInputElement && r.value;
    if (s !== t) yn({
        actual: s,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: ai
    });
}

function li(e, t, n, i, r = true) {
    const s = si(e, i);
    let o = s.innerHTML;
    if (r) o = o.replace(/<!--au-start-->/g, "").replace(/<!--au-end-->/g, "").replace(/\s+/g, " ").trim();
    if (o !== t) yn({
        actual: o,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: li
    });
}

function ui(e, t) {
    const n = exports.PLATFORM.window.getComputedStyle(e);
    for (const [e, i] of Object.entries(t)) {
        const t = n[e];
        if (t !== i) return {
            isMatch: false,
            property: e,
            actual: t,
            expected: i
        };
    }
    return {
        isMatch: true
    };
}

function ci(e, t, n) {
    const i = ui(e, t);
    if (!i.isMatch) {
        const {property: e, actual: t, expected: r} = i;
        yn({
            actual: `${e}:${t}`,
            expected: `${e}:${r}`,
            message: n,
            operator: "==",
            stackStartFn: ci
        });
    }
}

function fi(e, t, n) {
    const i = ui(e, t);
    if (i.isMatch) {
        const e = Object.entries(t).map((([e, t]) => `${e}:${t}`)).join(",");
        yn({
            actual: e,
            expected: e,
            message: n,
            operator: "!=",
            stackStartFn: fi
        });
    }
}

const hi = function() {
    function e(e) {
        return (10 * e + .5 | 0) / 10;
    }
    function t(t) {
        var n;
        const i = t.id;
        const r = e(t.createdTime);
        const s = e(t.queueTime);
        const o = t.preempt;
        const a = t.reusable;
        const l = t.persistent;
        const u = t.status;
        return `    task id=${i} createdTime=${r} queueTime=${s} preempt=${o} reusable=${a} persistent=${l} status=${u}\n` + `    task callback="${null === (n = t.callback) || void 0 === n ? void 0 : n.toString()}"`;
    }
    function n(e, n) {
        const i = n["processing"];
        const r = n["pending"];
        const s = n["delayed"];
        const o = n["flushRequested"];
        let a = `${e} has processing=${i.length} pending=${r.length} delayed=${s.length} flushRequested=${o}\n\n`;
        if (i.length > 0) a += `  Tasks in processing:\n${i.map(t).join("")}`;
        if (r.length > 0) a += `  Tasks in pending:\n${r.map(t).join("")}`;
        if (s.length > 0) a += `  Tasks in delayed:\n${s.map(t).join("")}`;
        return a;
    }
    return function e(t) {
        const r = i.BrowserPlatform.getOrCreate(globalThis);
        const s = r.domWriteQueue;
        const o = r.taskQueue;
        const a = r.domReadQueue;
        let l = true;
        let u = "";
        if (!s.isEmpty) {
            u += `\n${n("domWriteQueue", s)}\n\n`;
            l = false;
        }
        if (!o.isEmpty) {
            u += `\n${n("taskQueue", o)}\n\n`;
            l = false;
        }
        if (!a.isEmpty) {
            u += `\n${n("domReadQueue", a)}\n\n`;
            l = false;
        }
        if (!l) {
            if (true === t) xn(r);
            yn({
                actual: void 0,
                expected: void 0,
                message: u,
                operator: "",
                stackStartFn: e
            });
        }
    };
}();

const di = d({
    throws: An,
    doesNotThrow: qn,
    rejects: Rn,
    doesNotReject: Mn,
    ok: Ln,
    fail: Tn,
    equal: Fn,
    typeOf: Nn,
    instanceOf: Pn,
    notInstanceOf: Bn,
    includes: In,
    notIncludes: Dn,
    contains: Un,
    notContains: Vn,
    greaterThan: Hn,
    greaterThanOrEqualTo: Jn,
    lessThan: Wn,
    lessThanOrEqualTo: _n,
    notEqual: Gn,
    deepEqual: Yn,
    notDeepEqual: Kn,
    deepStrictEqual: Qn,
    notDeepStrictEqual: Xn,
    strictEqual: Zn,
    notStrictEqual: ei,
    match: ti,
    notMatch: ni,
    visibleTextEqual: zn,
    areTaskQueuesEmpty: hi,
    isCustomElementType: ii,
    isCustomAttributeType: ri,
    strict: {
        deepEqual: Qn,
        notDeepEqual: Xn,
        equal: Zn,
        notEqual: ei
    },
    html: {
        textContent: oi,
        innerEqual: li,
        value: ai,
        computedStyle: ci,
        notComputedStyle: fi
    }
});

const pi = {
    "align-content": {
        values: [ "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "normal", "safe", "space-around", "space-between", "space-evenly", "start", "stretch", "unsafe", "unset" ]
    },
    "align-items": {
        values: [ "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "normal", "safe", "self-end", "self-start", "start", "stretch", "unsafe", "unset" ]
    },
    "align-self": {
        values: [ "auto", "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "normal", "safe", "self-end", "self-start", "start", "stretch", "unsafe", "unset" ]
    },
    all: {
        values: [ "inherit", "initial", "unset" ]
    },
    animation: {
        values: [ "alternate", "alternate-reverse", "backwards", "both", "cubic-bezier", "ease", "ease-in", "ease-in-out", "ease-out", "forwards", "frames", "infinite", "inherit", "initial", "linear", "none", "normal", "paused", "reverse", "running", "step-end", "step-start", "steps", "unset" ]
    },
    "animation-delay": {
        values: [ "inherit", "initial", "unset" ]
    },
    "animation-direction": {
        values: [ "alternate", "alternate-reverse", "inherit", "initial", "normal", "reverse", "unset" ]
    },
    "animation-duration": {
        values: [ "inherit", "initial", "unset" ]
    },
    "animation-fill-mode": {
        values: [ "backwards", "both", "forwards", "inherit", "initial", "none", "unset" ]
    },
    "animation-iteration-count": {
        values: [ "infinite", "inherit", "initial", "unset" ]
    },
    "animation-name": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "animation-play-state": {
        values: [ "inherit", "initial", "paused", "running", "unset" ]
    },
    "animation-timing-function": {
        values: [ "cubic-bezier", "ease", "ease-in", "ease-in-out", "ease-out", "frames", "inherit", "initial", "linear", "step-end", "step-start", "steps", "unset" ]
    },
    "backface-visibility": {
        values: [ "hidden", "inherit", "initial", "unset", "visible" ]
    },
    background: {
        values: [ "COLOR", "auto", "border-box", "bottom", "center", "contain", "content-box", "cover", "currentColor", "fixed", "hsl", "hsla", "inherit", "initial", "left", "linear-gradient", "local", "no-repeat", "none", "padding-box", "radial-gradient", "repeat", "repeat-x", "repeat-y", "repeating-linear-gradient", "repeating-radial-gradient", "rgb", "rgba", "right", "round", "scroll", "space", "text", "top", "transparent", "unset", "url" ]
    },
    "background-attachment": {
        values: [ "fixed", "inherit", "initial", "local", "scroll", "unset" ]
    },
    "background-blend-mode": {
        values: [ "color", "color-burn", "color-dodge", "darken", "difference", "exclusion", "hard-light", "hue", "inherit", "initial", "lighten", "luminosity", "multiply", "normal", "overlay", "saturation", "screen", "soft-light", "unset" ]
    },
    "background-clip": {
        values: [ "border-box", "content-box", "inherit", "initial", "padding-box", "text", "unset" ]
    },
    "background-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "background-image": {
        values: [ "inherit", "initial", "linear-gradient", "none", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "unset", "url" ]
    },
    "background-origin": {
        values: [ "border-box", "content-box", "inherit", "initial", "padding-box", "unset" ]
    },
    "background-position": {
        values: [ "bottom", "center", "inherit", "initial", "left", "right", "top", "unset" ]
    },
    "background-position-x": {
        values: [ "center", "inherit", "initial", "left", "right", "unset" ]
    },
    "background-position-y": {
        values: [ "bottom", "center", "inherit", "initial", "top", "unset" ]
    },
    "background-repeat": {
        values: [ "inherit", "initial", "no-repeat", "repeat", "repeat-x", "repeat-y", "round", "space", "unset" ]
    },
    "background-size": {
        values: [ "auto", "contain", "cover", "inherit", "initial", "unset" ]
    },
    "block-size": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    border: {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-block-end": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-block-end-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-block-end-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-block-end-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-block-start": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-block-start-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-block-start-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-block-start-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-bottom": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-bottom-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-bottom-left-radius": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-bottom-right-radius": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-bottom-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-bottom-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-collapse": {
        values: [ "collapse", "inherit", "initial", "separate", "unset" ]
    },
    "border-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-image": {
        values: [ "auto", "fill", "inherit", "initial", "linear-gradient", "none", "radial-gradient", "repeat", "repeating-linear-gradient", "repeating-radial-gradient", "round", "space", "stretch", "unset", "url" ]
    },
    "border-image-outset": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-image-repeat": {
        values: [ "inherit", "initial", "repeat", "round", "space", "stretch", "unset" ]
    },
    "border-image-slice": {
        values: [ "fill", "inherit", "initial", "unset" ]
    },
    "border-image-source": {
        values: [ "inherit", "initial", "linear-gradient", "none", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "unset", "url" ]
    },
    "border-image-width": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "border-inline-end": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-inline-end-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-inline-end-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-inline-end-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-inline-start": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-inline-start-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-inline-start-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-inline-start-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-left": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-left-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-left-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-left-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-radius": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-right": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-right-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-right-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-right-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-spacing": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-top": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "border-top-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "border-top-left-radius": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-top-right-radius": {
        values: [ "inherit", "initial", "unset" ]
    },
    "border-top-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "border-top-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "border-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    bottom: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "box-decoration-break": {
        values: [ "clone", "inherit", "initial", "slice", "unset" ]
    },
    "box-shadow": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "inset", "none", "rgb", "rgba", "transparent", "unset" ]
    },
    "box-sizing": {
        values: [ "border-box", "content-box", "inherit", "initial", "unset" ]
    },
    "caption-side": {
        values: [ "bottom", "bottom-outside", "inherit", "initial", "left", "right", "top", "top-outside", "unset" ]
    },
    "caret-color": {
        values: [ "COLOR", "auto", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    clear: {
        values: [ "both", "inherit", "initial", "inline-end", "inline-start", "left", "none", "right", "unset" ]
    },
    clip: {
        values: [ "auto", "inherit", "initial", "rect", "unset" ]
    },
    "clip-path": {
        values: [ "border-box", "circle", "content-box", "ellipse", "fill-box", "inherit", "initial", "inset", "margin-box", "none", "padding-box", "polygon", "stroke-box", "unset", "url", "view-box" ]
    },
    "clip-rule": {
        values: [ "evenodd", "inherit", "initial", "nonzero", "unset" ]
    },
    color: {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "color-adjust": {
        values: [ "economy", "exact", "inherit", "initial", "unset" ]
    },
    "color-interpolation": {
        values: [ "auto", "inherit", "initial", "linearrgb", "srgb", "unset" ]
    },
    "color-interpolation-filters": {
        values: [ "auto", "inherit", "initial", "linearrgb", "srgb", "unset" ]
    },
    "column-count": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "column-fill": {
        values: [ "auto", "balance", "inherit", "initial", "unset" ]
    },
    "column-gap": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "column-rule": {
        values: [ "COLOR", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "column-rule-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "column-rule-style": {
        values: [ "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "column-rule-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    "column-width": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    columns: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    content: {
        values: [ "attr", "close-quote", "counter", "counters", "inherit", "initial", "no-close-quote", "no-open-quote", "none", "normal", "open-quote", "unset", "url" ]
    },
    "counter-increment": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "counter-reset": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    cursor: {
        values: [ "alias", "all-scroll", "auto", "cell", "col-resize", "context-menu", "copy", "crosshair", "default", "e-resize", "ew-resize", "grab", "grabbing", "help", "inherit", "initial", "move", "n-resize", "ne-resize", "nesw-resize", "no-drop", "none", "not-allowed", "ns-resize", "nw-resize", "nwse-resize", "pointer", "progress", "row-resize", "s-resize", "se-resize", "sw-resize", "text", "unset", "url", "vertical-text", "w-resize", "wait", "zoom-in", "zoom-out" ]
    },
    direction: {
        values: [ "inherit", "initial", "ltr", "rtl", "unset" ]
    },
    display: {
        values: [ "block", "contents", "flex", "flow-root", "grid", "inherit", "initial", "inline", "inline-block", "inline-flex", "inline-grid", "inline-table", "list-item", "none", "ruby", "ruby-base", "ruby-base-container", "ruby-text", "ruby-text-container", "table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "unset" ]
    },
    "dominant-baseline": {
        values: [ "alphabetic", "auto", "central", "hanging", "ideographic", "inherit", "initial", "mathematical", "middle", "no-change", "reset-size", "text-after-edge", "text-before-edge", "unset", "use-script" ]
    },
    "empty-cells": {
        values: [ "hide", "inherit", "initial", "show", "unset" ]
    },
    fill: {
        values: [ "COLOR", "context-fill", "context-stroke", "currentColor", "hsl", "hsla", "inherit", "initial", "none", "rgb", "rgba", "transparent", "unset", "url" ]
    },
    "fill-opacity": {
        values: [ "context-fill-opacity", "context-stroke-opacity", "inherit", "initial", "unset" ]
    },
    "fill-rule": {
        values: [ "evenodd", "inherit", "initial", "nonzero", "unset" ]
    },
    filter: {
        values: [ "blur", "brightness", "contrast", "drop-shadow", "grayscale", "hue-rotate", "inherit", "initial", "invert", "none", "opacity", "saturate", "sepia", "unset", "url" ]
    },
    flex: {
        values: [ "auto", "content", "inherit", "initial", "unset" ]
    },
    "flex-basis": {
        values: [ "auto", "content", "inherit", "initial", "unset" ]
    },
    "flex-direction": {
        values: [ "column", "column-reverse", "inherit", "initial", "row", "row-reverse", "unset" ]
    },
    "flex-flow": {
        values: [ "column", "column-reverse", "inherit", "initial", "nowrap", "row", "row-reverse", "unset", "wrap", "wrap-reverse" ]
    },
    "flex-grow": {
        values: [ "inherit", "initial", "unset" ]
    },
    "flex-shrink": {
        values: [ "inherit", "initial", "unset" ]
    },
    "flex-wrap": {
        values: [ "inherit", "initial", "nowrap", "unset", "wrap", "wrap-reverse" ]
    },
    float: {
        values: [ "inherit", "initial", "inline-end", "inline-start", "left", "none", "right", "unset" ]
    },
    "flood-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "flood-opacity": {
        values: [ "inherit", "initial", "unset" ]
    },
    font: {
        values: [ "all-petite-caps", "all-small-caps", "bold", "bolder", "caption", "condensed", "expanded", "extra-condensed", "extra-expanded", "icon", "inherit", "initial", "italic", "large", "larger", "lighter", "medium", "menu", "message-box", "normal", "oblique", "petite-caps", "semi-condensed", "semi-expanded", "small", "small-caps", "small-caption", "smaller", "status-bar", "titling-caps", "ultra-condensed", "ultra-expanded", "unicase", "unset", "x-large", "x-small", "xx-large", "xx-small" ]
    },
    "font-family": {
        values: [ "inherit", "initial", "unset" ]
    },
    "font-feature-settings": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "font-kerning": {
        values: [ "auto", "inherit", "initial", "none", "normal", "unset" ]
    },
    "font-language-override": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "font-optical-sizing": {
        values: [ "auto", "inherit", "initial", "none", "unset" ]
    },
    "font-size": {
        values: [ "inherit", "initial", "large", "larger", "medium", "small", "smaller", "unset", "x-large", "x-small", "xx-large", "xx-small" ]
    },
    "font-size-adjust": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "font-stretch": {
        values: [ "condensed", "expanded", "extra-condensed", "extra-expanded", "inherit", "initial", "normal", "semi-condensed", "semi-expanded", "ultra-condensed", "ultra-expanded", "unset" ]
    },
    "font-style": {
        values: [ "inherit", "initial", "italic", "normal", "oblique", "unset" ]
    },
    "font-synthesis": {
        values: [ "inherit", "initial", "style", "unset", "weight" ]
    },
    "font-variant": {
        values: [ "all-petite-caps", "all-small-caps", "annotation", "character-variant", "common-ligatures", "contextual", "diagonal-fractions", "discretionary-ligatures", "full-width", "historical-forms", "historical-ligatures", "inherit", "initial", "jis04", "jis78", "jis83", "jis90", "lining-nums", "no-common-ligatures", "no-contextual", "no-discretionary-ligatures", "no-historical-ligatures", "none", "normal", "oldstyle-nums", "ordinal", "ornaments", "petite-caps", "proportional-nums", "proportional-width", "ruby", "simplified", "slashed-zero", "small-caps", "stacked-fractions", "styleset", "stylistic", "sub", "super", "swash", "tabular-nums", "titling-caps", "traditional", "unicase", "unset" ]
    },
    "font-variant-alternates": {
        values: [ "annotation", "character-variant", "historical-forms", "inherit", "initial", "normal", "ornaments", "styleset", "stylistic", "swash", "unset" ]
    },
    "font-variant-caps": {
        values: [ "all-petite-caps", "all-small-caps", "inherit", "initial", "normal", "petite-caps", "small-caps", "titling-caps", "unicase", "unset" ]
    },
    "font-variant-east-asian": {
        values: [ "full-width", "inherit", "initial", "jis04", "jis78", "jis83", "jis90", "normal", "proportional-width", "ruby", "simplified", "traditional", "unset" ]
    },
    "font-variant-ligatures": {
        values: [ "common-ligatures", "contextual", "discretionary-ligatures", "historical-ligatures", "inherit", "initial", "no-common-ligatures", "no-contextual", "no-discretionary-ligatures", "no-historical-ligatures", "none", "normal", "unset" ]
    },
    "font-variant-numeric": {
        values: [ "diagonal-fractions", "inherit", "initial", "lining-nums", "normal", "oldstyle-nums", "ordinal", "proportional-nums", "slashed-zero", "stacked-fractions", "tabular-nums", "unset" ]
    },
    "font-variant-position": {
        values: [ "inherit", "initial", "normal", "sub", "super", "unset" ]
    },
    "font-variation-settings": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "font-weight": {
        values: [ "bold", "bolder", "inherit", "initial", "lighter", "normal", "unset" ]
    },
    gap: {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    grid: {
        values: [ "auto", "column", "dense", "fit-content", "inherit", "initial", "max-content", "min-content", "minmax", "none", "repeat", "row", "unset" ]
    },
    "grid-area": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-auto-columns": {
        values: [ "auto", "fit-content", "inherit", "initial", "max-content", "min-content", "minmax", "unset" ]
    },
    "grid-auto-flow": {
        values: [ "column", "dense", "inherit", "initial", "row", "unset" ]
    },
    "grid-auto-rows": {
        values: [ "auto", "fit-content", "inherit", "initial", "max-content", "min-content", "minmax", "unset" ]
    },
    "grid-column": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-column-end": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-column-gap": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "grid-column-start": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-gap": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "grid-row": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-row-end": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-row-gap": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "grid-row-start": {
        values: [ "inherit", "initial", "unset" ]
    },
    "grid-template": {
        values: [ "auto", "fit-content", "inherit", "initial", "max-content", "min-content", "minmax", "none", "repeat", "unset" ]
    },
    "grid-template-areas": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "grid-template-columns": {
        values: [ "auto", "fit-content", "inherit", "initial", "max-content", "min-content", "minmax", "none", "repeat", "unset" ]
    },
    "grid-template-rows": {
        values: [ "auto", "fit-content", "inherit", "initial", "max-content", "min-content", "minmax", "none", "repeat", "unset" ]
    },
    height: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    hyphens: {
        values: [ "auto", "inherit", "initial", "manual", "none", "unset" ]
    },
    "image-orientation": {
        values: [ "from-image", "inherit", "initial", "none", "unset" ]
    },
    "image-rendering": {
        values: [ "auto", "inherit", "initial", "optimizequality", "optimizespeed", "unset" ]
    },
    "ime-mode": {
        values: [ "active", "auto", "disabled", "inactive", "inherit", "initial", "normal", "unset" ]
    },
    "inline-size": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "inset-block-end": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "inset-block-start": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "inset-inline-end": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "inset-inline-start": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    isolation: {
        values: [ "auto", "inherit", "initial", "isolate", "unset" ]
    },
    "justify-content": {
        values: [ "center", "end", "flex-end", "flex-start", "inherit", "initial", "left", "normal", "right", "safe", "space-around", "space-between", "space-evenly", "start", "stretch", "unsafe", "unset" ]
    },
    "justify-items": {
        values: [ "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "left", "legacy", "normal", "right", "safe", "self-end", "self-start", "start", "stretch", "unsafe", "unset" ]
    },
    "justify-self": {
        values: [ "auto", "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "left", "normal", "right", "safe", "self-end", "self-start", "start", "stretch", "unsafe", "unset" ]
    },
    left: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "letter-spacing": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "lighting-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "line-height": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "list-style": {
        values: [ "arabic-indic", "armenian", "bengali", "cambodian", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "decimal", "decimal-leading-zero", "devanagari", "disc", "disclosure-closed", "disclosure-open", "ethiopic-numeric", "georgian", "gujarati", "gurmukhi", "hebrew", "hiragana", "hiragana-iroha", "inherit", "initial", "inside", "japanese-formal", "japanese-informal", "kannada", "katakana", "katakana-iroha", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "lao", "lower-alpha", "lower-armenian", "lower-greek", "lower-latin", "lower-roman", "malayalam", "mongolian", "myanmar", "none", "oriya", "outside", "persian", "simp-chinese-formal", "simp-chinese-informal", "square", "symbols", "tamil", "telugu", "thai", "tibetan", "trad-chinese-formal", "trad-chinese-informal", "unset", "upper-alpha", "upper-armenian", "upper-latin", "upper-roman", "url" ]
    },
    "list-style-image": {
        values: [ "inherit", "initial", "none", "unset", "url" ]
    },
    "list-style-position": {
        values: [ "inherit", "initial", "inside", "outside", "unset" ]
    },
    "list-style-type": {
        values: [ "arabic-indic", "armenian", "bengali", "cambodian", "circle", "cjk-decimal", "cjk-earthly-branch", "cjk-heavenly-stem", "cjk-ideographic", "decimal", "decimal-leading-zero", "devanagari", "disc", "disclosure-closed", "disclosure-open", "ethiopic-numeric", "georgian", "gujarati", "gurmukhi", "hebrew", "hiragana", "hiragana-iroha", "inherit", "initial", "japanese-formal", "japanese-informal", "kannada", "katakana", "katakana-iroha", "khmer", "korean-hangul-formal", "korean-hanja-formal", "korean-hanja-informal", "lao", "lower-alpha", "lower-armenian", "lower-greek", "lower-latin", "lower-roman", "malayalam", "mongolian", "myanmar", "none", "oriya", "persian", "simp-chinese-formal", "simp-chinese-informal", "square", "symbols", "tamil", "telugu", "thai", "tibetan", "trad-chinese-formal", "trad-chinese-informal", "unset", "upper-alpha", "upper-armenian", "upper-latin", "upper-roman" ]
    },
    margin: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-block-end": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-block-start": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-bottom": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-inline-end": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-inline-start": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-left": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-right": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "margin-top": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    marker: {
        values: [ "inherit", "initial", "none", "unset", "url" ]
    },
    "marker-end": {
        values: [ "inherit", "initial", "none", "unset", "url" ]
    },
    "marker-mid": {
        values: [ "inherit", "initial", "none", "unset", "url" ]
    },
    "marker-start": {
        values: [ "inherit", "initial", "none", "unset", "url" ]
    },
    mask: {
        values: [ "add", "alpha", "auto", "border-box", "bottom", "center", "contain", "content-box", "cover", "exclude", "fill-box", "inherit", "initial", "intersect", "left", "linear-gradient", "luminance", "match-source", "no-clip", "no-repeat", "none", "padding-box", "radial-gradient", "repeat", "repeat-x", "repeat-y", "repeating-linear-gradient", "repeating-radial-gradient", "right", "round", "space", "stroke-box", "subtract", "top", "unset", "url", "view-box" ]
    },
    "mask-clip": {
        values: [ "border-box", "content-box", "fill-box", "inherit", "initial", "no-clip", "padding-box", "stroke-box", "unset", "view-box" ]
    },
    "mask-composite": {
        values: [ "add", "exclude", "inherit", "initial", "intersect", "subtract", "unset" ]
    },
    "mask-image": {
        values: [ "inherit", "initial", "linear-gradient", "none", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "unset", "url" ]
    },
    "mask-mode": {
        values: [ "alpha", "inherit", "initial", "luminance", "match-source", "unset" ]
    },
    "mask-origin": {
        values: [ "border-box", "content-box", "fill-box", "inherit", "initial", "padding-box", "stroke-box", "unset", "view-box" ]
    },
    "mask-position": {
        values: [ "bottom", "center", "inherit", "initial", "left", "right", "top", "unset" ]
    },
    "mask-position-x": {
        values: [ "center", "inherit", "initial", "left", "right", "unset" ]
    },
    "mask-position-y": {
        values: [ "bottom", "center", "inherit", "initial", "top", "unset" ]
    },
    "mask-repeat": {
        values: [ "inherit", "initial", "no-repeat", "repeat", "repeat-x", "repeat-y", "round", "space", "unset" ]
    },
    "mask-size": {
        values: [ "auto", "contain", "cover", "inherit", "initial", "unset" ]
    },
    "mask-type": {
        values: [ "alpha", "inherit", "initial", "luminance", "unset" ]
    },
    "max-block-size": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "max-height": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "max-inline-size": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "max-width": {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "min-block-size": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "min-height": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "min-inline-size": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "min-width": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "mix-blend-mode": {
        values: [ "color", "color-burn", "color-dodge", "darken", "difference", "exclusion", "hard-light", "hue", "inherit", "initial", "lighten", "luminosity", "multiply", "normal", "overlay", "saturation", "screen", "soft-light", "unset" ]
    },
    "object-fit": {
        values: [ "contain", "cover", "fill", "inherit", "initial", "none", "scale-down", "unset" ]
    },
    "object-position": {
        values: [ "bottom", "center", "inherit", "initial", "left", "right", "top", "unset" ]
    },
    opacity: {
        values: [ "inherit", "initial", "unset" ]
    },
    order: {
        values: [ "inherit", "initial", "unset" ]
    },
    outline: {
        values: [ "COLOR", "auto", "currentColor", "dashed", "dotted", "double", "groove", "hidden", "hsl", "hsla", "inherit", "initial", "inset", "medium", "none", "outset", "rgb", "rgba", "ridge", "solid", "thick", "thin", "transparent", "unset" ]
    },
    "outline-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "outline-offset": {
        values: [ "inherit", "initial", "unset" ]
    },
    "outline-style": {
        values: [ "auto", "dashed", "dotted", "double", "groove", "hidden", "inherit", "initial", "inset", "none", "outset", "ridge", "solid", "unset" ]
    },
    "outline-width": {
        values: [ "inherit", "initial", "medium", "thick", "thin", "unset" ]
    },
    overflow: {
        values: [ "auto", "hidden", "inherit", "initial", "scroll", "unset", "visible" ]
    },
    "overflow-wrap": {
        values: [ "break-word", "inherit", "initial", "normal", "unset" ]
    },
    "overflow-x": {
        values: [ "auto", "hidden", "inherit", "initial", "scroll", "unset", "visible" ]
    },
    "overflow-y": {
        values: [ "auto", "hidden", "inherit", "initial", "scroll", "unset", "visible" ]
    },
    "overscroll-behavior": {
        values: [ "auto", "contain", "inherit", "initial", "none", "unset" ]
    },
    "overscroll-behavior-x": {
        values: [ "auto", "contain", "inherit", "initial", "none", "unset" ]
    },
    "overscroll-behavior-y": {
        values: [ "auto", "contain", "inherit", "initial", "none", "unset" ]
    },
    padding: {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-block-end": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-block-start": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-bottom": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-inline-end": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-inline-start": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-left": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-right": {
        values: [ "inherit", "initial", "unset" ]
    },
    "padding-top": {
        values: [ "inherit", "initial", "unset" ]
    },
    "page-break-after": {
        values: [ "always", "auto", "avoid", "inherit", "initial", "left", "right", "unset" ]
    },
    "page-break-before": {
        values: [ "always", "auto", "avoid", "inherit", "initial", "left", "right", "unset" ]
    },
    "page-break-inside": {
        values: [ "auto", "avoid", "inherit", "initial", "unset" ]
    },
    "paint-order": {
        values: [ "inherit", "initial", "unset" ]
    },
    perspective: {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    "perspective-origin": {
        values: [ "bottom", "center", "inherit", "initial", "left", "right", "top", "unset" ]
    },
    "place-content": {
        values: [ "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "left", "normal", "right", "safe", "space-around", "space-between", "space-evenly", "start", "stretch", "unsafe", "unset" ]
    },
    "place-items": {
        values: [ "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "left", "legacy", "normal", "right", "safe", "self-end", "self-start", "start", "stretch", "unsafe", "unset" ]
    },
    "place-self": {
        values: [ "auto", "baseline", "center", "end", "first baseline", "flex-end", "flex-start", "inherit", "initial", "last baseline", "left", "normal", "right", "safe", "self-end", "self-start", "start", "stretch", "unsafe", "unset" ]
    },
    "pointer-events": {
        values: [ "all", "auto", "fill", "inherit", "initial", "none", "painted", "stroke", "unset", "visible", "visiblefill", "visiblepainted", "visiblestroke" ]
    },
    position: {
        values: [ "absolute", "fixed", "inherit", "initial", "relative", "static", "sticky", "unset" ]
    },
    quotes: {
        values: [ "inherit", "initial", "none", "unset" ]
    },
    resize: {
        values: [ "block", "both", "horizontal", "inherit", "initial", "inline", "none", "unset", "vertical" ]
    },
    right: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "row-gap": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "ruby-align": {
        values: [ "center", "inherit", "initial", "space-around", "space-between", "start", "unset" ]
    },
    "ruby-position": {
        values: [ "inherit", "initial", "over", "under", "unset" ]
    },
    "scroll-behavior": {
        values: [ "auto", "inherit", "initial", "smooth", "unset" ]
    },
    "scroll-snap-coordinate": {
        values: [ "bottom", "center", "inherit", "initial", "left", "none", "right", "top", "unset" ]
    },
    "scroll-snap-destination": {
        values: [ "bottom", "center", "inherit", "initial", "left", "right", "top", "unset" ]
    },
    "scroll-snap-points-x": {
        values: [ "inherit", "initial", "none", "repeat", "unset" ]
    },
    "scroll-snap-points-y": {
        values: [ "inherit", "initial", "none", "repeat", "unset" ]
    },
    "scroll-snap-type": {
        values: [ "inherit", "initial", "mandatory", "none", "proximity", "unset" ]
    },
    "scroll-snap-type-x": {
        values: [ "inherit", "initial", "mandatory", "none", "proximity", "unset" ]
    },
    "scroll-snap-type-y": {
        values: [ "inherit", "initial", "mandatory", "none", "proximity", "unset" ]
    },
    "shape-image-threshold": {
        values: [ "inherit", "initial", "unset" ]
    },
    "shape-margin": {
        values: [ "inherit", "initial", "unset" ]
    },
    "shape-outside": {
        values: [ "border-box", "circle", "content-box", "ellipse", "inherit", "initial", "inset", "linear-gradient", "margin-box", "none", "padding-box", "polygon", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "unset", "url" ]
    },
    "shape-rendering": {
        values: [ "auto", "crispedges", "geometricprecision", "inherit", "initial", "optimizespeed", "unset" ]
    },
    "stop-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "stop-opacity": {
        values: [ "inherit", "initial", "unset" ]
    },
    stroke: {
        values: [ "COLOR", "context-fill", "context-stroke", "currentColor", "hsl", "hsla", "inherit", "initial", "none", "rgb", "rgba", "transparent", "unset", "url" ]
    },
    "stroke-dasharray": {
        values: [ "context-value", "inherit", "initial", "none", "unset" ]
    },
    "stroke-dashoffset": {
        values: [ "context-value", "inherit", "initial", "unset" ]
    },
    "stroke-linecap": {
        values: [ "butt", "inherit", "initial", "round", "square", "unset" ]
    },
    "stroke-linejoin": {
        values: [ "bevel", "inherit", "initial", "miter", "round", "unset" ]
    },
    "stroke-miterlimit": {
        values: [ "inherit", "initial", "unset" ]
    },
    "stroke-opacity": {
        values: [ "context-fill-opacity", "context-stroke-opacity", "inherit", "initial", "unset" ]
    },
    "stroke-width": {
        values: [ "context-value", "inherit", "initial", "unset" ]
    },
    "table-layout": {
        values: [ "auto", "fixed", "inherit", "initial", "unset" ]
    },
    "text-align": {
        values: [ "center", "end", "inherit", "initial", "justify", "left", "match-parent", "right", "start", "unset" ]
    },
    "text-align-last": {
        values: [ "auto", "center", "end", "inherit", "initial", "justify", "left", "right", "start", "unset" ]
    },
    "text-anchor": {
        values: [ "end", "inherit", "initial", "middle", "start", "unset" ]
    },
    "text-combine-upright": {
        values: [ "all", "inherit", "initial", "none", "unset" ]
    },
    "text-decoration": {
        values: [ "COLOR", "blink", "currentColor", "dashed", "dotted", "double", "hsl", "hsla", "inherit", "initial", "line-through", "none", "overline", "rgb", "rgba", "solid", "transparent", "underline", "unset", "wavy" ]
    },
    "text-decoration-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "text-decoration-line": {
        values: [ "blink", "inherit", "initial", "line-through", "none", "overline", "underline", "unset" ]
    },
    "text-decoration-style": {
        values: [ "dashed", "dotted", "double", "inherit", "initial", "solid", "unset", "wavy" ]
    },
    "text-emphasis": {
        values: [ "COLOR", "circle", "currentColor", "dot", "double-circle", "filled", "hsl", "hsla", "inherit", "initial", "none", "open", "rgb", "rgba", "sesame", "transparent", "triangle", "unset" ]
    },
    "text-emphasis-color": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "rgb", "rgba", "transparent", "unset" ]
    },
    "text-emphasis-position": {
        values: [ "inherit", "initial", "left", "over", "right", "under", "unset" ]
    },
    "text-emphasis-style": {
        values: [ "circle", "dot", "double-circle", "filled", "inherit", "initial", "none", "open", "sesame", "triangle", "unset" ]
    },
    "text-indent": {
        values: [ "inherit", "initial", "unset" ]
    },
    "text-justify": {
        values: [ "auto", "distribute", "inherit", "initial", "inter-character", "inter-word", "none", "unset" ]
    },
    "text-orientation": {
        values: [ "inherit", "initial", "mixed", "sideways", "sideways-right", "unset", "upright" ]
    },
    "text-overflow": {
        values: [ "clip", "ellipsis", "inherit", "initial", "unset" ]
    },
    "text-rendering": {
        values: [ "auto", "geometricprecision", "inherit", "initial", "optimizelegibility", "optimizespeed", "unset" ]
    },
    "text-shadow": {
        values: [ "COLOR", "currentColor", "hsl", "hsla", "inherit", "initial", "none", "rgb", "rgba", "transparent", "unset" ]
    },
    "text-transform": {
        values: [ "capitalize", "full-width", "inherit", "initial", "lowercase", "none", "unset", "uppercase" ]
    },
    top: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "touch-action": {
        values: [ "auto", "inherit", "initial", "manipulation", "none", "pan-x", "pan-y", "unset" ]
    },
    transform: {
        values: [ "accumulatematrix", "inherit", "initial", "interpolatematrix", "matrix", "matrix3d", "none", "perspective", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY", "translate", "translate3d", "translateX", "translateY", "translateZ", "unset" ]
    },
    "transform-box": {
        values: [ "border-box", "fill-box", "inherit", "initial", "unset", "view-box" ]
    },
    "transform-origin": {
        values: [ "bottom", "center", "inherit", "initial", "left", "right", "top", "unset" ]
    },
    "transform-style": {
        values: [ "flat", "inherit", "initial", "preserve-3d", "unset" ]
    },
    transition: {
        values: [ "all", "cubic-bezier", "ease", "ease-in", "ease-in-out", "ease-out", "frames", "inherit", "initial", "linear", "none", "step-end", "step-start", "steps", "unset" ]
    },
    "transition-delay": {
        values: [ "inherit", "initial", "unset" ]
    },
    "transition-duration": {
        values: [ "inherit", "initial", "unset" ]
    },
    "transition-property": {
        values: [ "all", "inherit", "initial", "none", "unset" ]
    },
    "transition-timing-function": {
        values: [ "cubic-bezier", "ease", "ease-in", "ease-in-out", "ease-out", "frames", "inherit", "initial", "linear", "step-end", "step-start", "steps", "unset" ]
    },
    "unicode-bidi": {
        values: [ "bidi-override", "embed", "inherit", "initial", "isolate", "isolate-override", "normal", "plaintext", "unset" ]
    },
    "vector-effect": {
        values: [ "inherit", "initial", "non-scaling-stroke", "none", "unset" ]
    },
    "vertical-align": {
        values: [ "baseline", "bottom", "inherit", "initial", "middle", "sub", "super", "text-bottom", "text-top", "top", "unset" ]
    },
    visibility: {
        values: [ "collapse", "hidden", "inherit", "initial", "unset", "visible" ]
    },
    "white-space": {
        values: [ "inherit", "initial", "normal", "nowrap", "pre", "pre-line", "pre-wrap", "unset" ]
    },
    width: {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "will-change": {
        values: [ "auto", "inherit", "initial", "unset" ]
    },
    "word-break": {
        values: [ "break-all", "inherit", "initial", "keep-all", "normal", "unset" ]
    },
    "word-spacing": {
        values: [ "inherit", "initial", "normal", "unset" ]
    },
    "word-wrap": {
        values: [ "break-word", "inherit", "initial", "normal", "unset" ]
    },
    "writing-mode": {
        values: [ "horizontal-tb", "inherit", "initial", "lr", "lr-tb", "rl", "rl-tb", "sideways-lr", "sideways-rl", "tb", "tb-rl", "unset", "vertical-lr", "vertical-rl" ]
    },
    "z-index": {
        values: [ "auto", "inherit", "initial", "unset" ]
    }
};

const mi = [ ":after", ":before", ":backdrop", ":cue", ":first-letter", ":first-line", ":selection", ":placeholder" ];

const gi = [ "xml:lang", "xml:base", "accesskey", "autocapitalize", "aria-foo", "class", "contenteditable", "contextmenu", "data-foo", "dir", "draggable", "dropzone", "hidden", "id", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "slot", "spellcheck", "style", "tabindex", "title", "translate", "onabort", "onautocomplete", "onautocompleteerror", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onsort", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting" ];

function bi(e, t) {
    e = e.slice(0).filter((e => e.length > 0));
    if ("function" !== typeof t) throw new Error("Callback is not a function");
    if (0 === e.length) return;
    const n = e.reduce(((e, t) => e *= t.length), 1);
    const i = Array(e.length).fill(0);
    const r = [];
    let s = null;
    try {
        s = vi(e, Array(e.length), i);
        t(...s);
    } catch (e) {
        r.push(e);
    }
    let o = 1;
    if (n === o) return;
    let a = false;
    while (!a) {
        const l = yi(e, i);
        if (l) {
            try {
                t(...vi(e, s, i));
            } catch (e) {
                r.push(e);
            }
            o++;
            if (n < o) throw new Error("Invalid loop implementation.");
        } else a = true;
    }
    if (r.length > 0) {
        const e = `eachCartesionJoinFactory failed to load ${r.length} tests:\n\n${r.map((e => e.message)).join("\n")}`;
        throw new Error(e);
    }
}

function vi(e, t, n) {
    for (let i = 0, r = e.length; r > i; ++i) t[i] = e[i][n[i]](...t);
    return t;
}

function xi(e, t) {
    e = e.slice(0).filter((e => e.length > 0));
    if ("function" !== typeof t) throw new Error("Callback is not a function");
    if (0 === e.length) return;
    const n = e.reduce(((e, t) => e *= t.length), 1);
    const i = Array(e.length).fill(0);
    const r = wi(e, Array(e.length), i);
    t(...r, 0);
    let s = 1;
    if (n === s) return;
    let o = false;
    while (!o) {
        const a = yi(e, i);
        if (a) {
            t(...wi(e, r, i), s);
            s++;
            if (n < s) throw new Error("Invalid loop implementation.");
        } else o = true;
    }
}

async function $i(e, t) {
    e = e.slice(0).filter((e => e.length > 0));
    if ("function" !== typeof t) throw new Error("Callback is not a function");
    if (0 === e.length) return;
    const n = e.reduce(((e, t) => e *= t.length), 1);
    const i = Array(e.length).fill(0);
    const r = wi(e, Array(e.length), i);
    await t(...r, 0);
    let s = 1;
    if (n === s) return;
    let o = false;
    while (!o) {
        const a = yi(e, i);
        if (a) {
            await t(...wi(e, r, i), s);
            s++;
            if (n < s) throw new Error("Invalid loop implementation.");
        } else o = true;
    }
}

function yi(e, t) {
    let n = e.length;
    while (n--) {
        if (t[n] === e[n].length - 1) {
            if (0 === n) return false;
            continue;
        }
        t[n] += 1;
        for (let i = n + 1, r = e.length; r > i; ++i) t[i] = 0;
        return true;
    }
    return false;
}

function wi(e, t, n) {
    for (let i = 0, r = e.length; r > i; ++i) t[i] = e[i][n[i]];
    return t;
}

function* ki(e) {
    const [t, ...n] = e;
    const i = n.length > 0 ? ki(n) : [ [] ];
    for (const e of i) for (const n of t) yield [ n, ...e ];
}

function Ci(t, n = null, ...i) {
    const r = exports.PLATFORM.document;
    const s = r.createElement(t);
    for (const t in n) if ("class" === t || "className" === t || "cls" === t) {
        let i = n[t];
        i = void 0 === i || null === i ? e.emptyArray : Array.isArray(i) ? i : `${i}`.split(" ");
        s.classList.add(...i.filter(Boolean));
    } else if (t in s || "data" === t || t.startsWith("_")) s[t.replace(/^_/, "")] = n[t]; else s.setAttribute(t, n[t]);
    const o = "TEMPLATE" === s.tagName ? s.content : s;
    for (const e of i) {
        if (null === e || void 0 === e) continue;
        o.appendChild(Si(e) ? e : r.createTextNode(`${e}`));
    }
    return s;
}

function Si(e) {
    return e.nodeType > 0;
}

const Oi = {
    delegate: 1,
    capture: 1,
    call: 1
};

const Ei = function(t, n, ...i) {
    const r = exports.PLATFORM.document;
    const s = r.createElement("let$" === t ? "let" : t);
    if (null != n) {
        let t;
        for (const i in n) {
            t = n[i];
            if ("class" === i || "className" === i || "cls" === i) {
                t = null == t ? [] : Array.isArray(t) ? t : `${t}`.split(" ");
                s.classList.add(...t);
            } else if (i in s || "data" === i || i.startsWith("_")) s[i] = t; else if ("asElement" === i) s.setAttribute("as-element", t); else if (i.startsWith("o") && "n" === i[1] && !i.endsWith("$")) {
                const n = e.kebabCase(i.slice(2));
                const r = n.split("-");
                if (r.length > 1) {
                    const e = r[r.length - 1];
                    const n = Oi[e] ? e : "trigger";
                    s.setAttribute(`${r.slice(0, -1).join("-")}.${n}`, t);
                } else s.setAttribute(`${r[0]}.trigger`, t);
            } else {
                const n = i.split("$");
                if (1 === n.length) s.setAttribute(e.kebabCase(i), t); else {
                    if ("" === n[n.length - 1]) n[n.length - 1] = "bind";
                    s.setAttribute(n.map(e.kebabCase).join("."), t);
                }
            }
        }
    }
    const o = null != s.content ? s.content : s;
    for (const e of i) {
        if (null == e) continue;
        if (Array.isArray(e)) for (const t of e) o.appendChild(t instanceof exports.PLATFORM.Node ? t : r.createTextNode(`${t}`)); else o.appendChild(e instanceof exports.PLATFORM.Node ? e : r.createTextNode(`${e}`));
    }
    return s;
};

const ji = new e.EventAggregator;

const Ai = e => ji.subscribe("fixture:created", (t => {
    try {
        e(t);
    } catch (e) {
        console.log("(!) Error in fixture:created callback");
        console.log(e);
    }
}));

function Ri(e, t, i = [], r = true, s = TestContext.create()) {
    const {container: o, platform: a, observerLocator: l} = s;
    o.register(...i);
    const u = s.doc.body.appendChild(s.doc.createElement("div"));
    const c = u.appendChild(s.createElement("app"));
    const f = new n.Aurelia(o);
    const h = "function" === typeof t ? t : null == t ? class {} : function e() {
        Object.setPrototypeOf(t, e.prototype);
        return t;
    };
    const d = n.CustomElement.define({
        name: "app",
        template: e
    }, h);
    if (o.has(d, true)) throw new Error("Container of the context contains instance of the application root component. " + "Consider using a different class, or context as it will likely cause surprises in tests.");
    const p = o.get(d);
    let m;
    if (r) {
        f.app({
            host: c,
            component: p
        });
        m = f.start();
    }
    let g = 0;
    const b = e => {
        const t = c.querySelectorAll(e);
        if (t.length > 1) throw new Error(`There is more than 1 element with selector "${e}": ${t.length} found`);
        if (0 === t.length) throw new Error(`No element found for selector: "${e}"`);
        return t[0];
    };
    const v = e => Array.from(c.querySelectorAll(e));
    const x = e => {
        const t = c.querySelectorAll(e);
        if (t.length > 1) throw new Error(`There is more than 1 element with selector "${e}": ${t.length} found`);
        return 0 === t.length ? null : t[0];
    };
    const $ = (e, t) => {
        if (2 === arguments.length) {
            const n = x(e);
            if (null === n) throw new Error(`No element found for selector "${e}" to compare text content with "${t}"`);
            di.strictEqual(n.textContent, t);
        } else di.strictEqual(c.textContent, e);
    };
    const y = (e, t) => {
        if (2 === arguments.length) {
            const n = x(e);
            if (null === n) throw new Error(`No element found for selector "${e}" to compare innerHTML with "${t}"`);
            di.strictEqual(n.innerHTML, t);
        } else di.strictEqual(c.innerHTML, e);
    };
    const w = (e, t, n) => {
        const i = x(e);
        if (null === i) throw new Error(`No element found for selector "${e}" to fire event "${t}"`);
        i.dispatchEvent(new s.CustomEvent(t, n));
    };
    [ "click", "change", "input", "scroll" ].forEach((e => {
        Object.defineProperty(w, e, {
            configurable: true,
            writable: true,
            value: (t, n) => {
                const i = x(t);
                if (null === i) throw new Error(`No element found for selector "${t}" to fire event "${e}"`);
                i.dispatchEvent(new s.CustomEvent(e, n));
            }
        });
    }));
    const k = (e, t) => {
        const n = x(e);
        if (null === n) throw new Error(`No element found for selector "${e}" to scroll by "${JSON.stringify(t)}"`);
        n.scrollBy("number" === typeof t ? {
            top: t
        } : t);
        n.dispatchEvent(new Event("scroll"));
    };
    const C = new class Results {
        constructor() {
            this.startPromise = m;
            this.ctx = s;
            this.host = s.doc.firstElementChild;
            this.container = o;
            this.platform = a;
            this.testHost = u;
            this.appHost = c;
            this.au = f;
            this.component = p;
            this.observerLocator = l;
            this.getBy = b;
            this.getAllBy = v;
            this.queryBy = x;
            this.assertText = $;
            this.assertHtml = y;
            this.trigger = w;
            this.scrollBy = k;
        }
        async start() {
            await f.app({
                host: c,
                component: p
            }).start();
        }
        tearDown() {
            if (2 === ++g) {
                console.log("(!) Fixture has already been torn down");
                return;
            }
            const e = () => {
                u.remove();
                f.dispose();
            };
            const t = f.stop();
            if (t instanceof Promise) return t.then(e); else return e();
        }
        get torn() {
            return g > 0;
        }
        get started() {
            if (m instanceof Promise) return Promise.resolve(m).then((() => this));
            return Promise.resolve(this);
        }
    };
    ji.publish("fixture:created", C);
    return C;
}

class FixtureBuilder {
    html(e, ...t) {
        this.u = e;
        this.h = t;
        return this;
    }
    component(e) {
        this.$ = e;
        return this;
    }
    deps(...e) {
        this.C = e;
        return this;
    }
    build() {
        var e;
        if (void 0 === this.u) throw new Error("Builder is not ready, missing template, call .html()/.html`` first");
        return Ri("string" === typeof this.u ? this.u : qi(this.u, ...null !== (e = this.h) && void 0 !== e ? e : []), this.$, this.C);
    }
}

function qi(e, ...t) {
    return e.join("");
}

Ri.html = (e, ...t) => (new FixtureBuilder).html(e, ...t);

Ri.component = e => (new FixtureBuilder).component(e);

Ri.deps = (...e) => (new FixtureBuilder).deps(...e);

class MockBinding {
    constructor() {
        this.interceptor = this;
        this.calls = [];
    }
    updateTarget(e, t) {
        this.trace("updateTarget", e, t);
    }
    updateSource(e, t) {
        this.trace("updateSource", e, t);
    }
    handleChange(e, t, n) {
        this.trace("handleChange", e, t, n);
    }
    handleCollectionChange(e, t) {
        this.trace("handleCollectionChange", e, t);
    }
    observe(e, t) {
        this.trace("observe", e, t);
    }
    observeCollection(e) {
        this.trace("observeCollection", e);
    }
    subscribeTo(e) {
        this.trace("subscribeTo", e);
    }
    $bind(e, t) {
        this.trace("$bind", e, t);
    }
    $unbind(e) {
        this.trace("$unbind", e);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
    dispose() {
        this.trace("dispose");
    }
}

class MockBindingBehavior {
    constructor() {
        this.calls = [];
    }
    bind(e, t, n, ...i) {
        this.trace("bind", e, t, n, ...i);
    }
    unbind(e, t, n, ...i) {
        this.trace("unbind", e, t, n, ...i);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockServiceLocator {
    constructor(e) {
        this.registrations = e;
        this.calls = [];
    }
    get(e) {
        this.trace("get", e);
        return this.registrations.get(e);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockSignaler {
    constructor() {
        this.calls = [];
    }
    dispatchSignal(...e) {
        this.trace("dispatchSignal", ...e);
    }
    addSignalListener(...e) {
        this.trace("addSignalListener", ...e);
    }
    removeSignalListener(...e) {
        this.trace("removeSignalListener", ...e);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockPropertySubscriber {
    constructor() {
        this.calls = [];
    }
    handleChange(e, t, n) {
        this.trace(`handleChange`, e, t, n);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockTracingExpression {
    constructor(e) {
        this.inner = e;
        this.$kind = 2048 | 4096;
        this.calls = [];
    }
    evaluate(...e) {
        this.trace("evaluate", ...e);
        return this.inner.evaluate(...e);
    }
    assign(...e) {
        this.trace("assign", ...e);
        return this.inner.assign(...e);
    }
    connect(...e) {
        this.trace("connect", ...e);
        this.inner.connect(...e);
    }
    bind(...e) {
        this.trace("bind", ...e);
        if (this.inner.bind) this.inner.bind(...e);
    }
    unbind(...e) {
        this.trace("unbind", ...e);
        if (this.inner.unbind) this.inner.unbind(...e);
    }
    accept(...e) {
        this.trace("accept", ...e);
        this.inner.accept(...e);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockValueConverter {
    constructor(e) {
        this.calls = [];
        for (const t of e) this[t] = this[`$${t}`];
    }
    $fromView(e, ...t) {
        this.trace("fromView", e, ...t);
        return e;
    }
    $toView(e, ...t) {
        this.trace("toView", e, ...t);
        return e;
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockContext {
    constructor() {
        this.log = [];
    }
}

class MockBrowserHistoryLocation {
    constructor() {
        this.states = [ {} ];
        this.paths = [ "" ];
        this.index = 0;
    }
    get length() {
        return this.states.length;
    }
    get state() {
        return this.states[this.index];
    }
    get path() {
        return this.paths[this.index];
    }
    get pathname() {
        const e = this.parts;
        let t = e.shift();
        if (!t.startsWith("/")) t = `/${t}`;
        return t;
    }
    get search() {
        const e = this.parts;
        e.shift();
        const t = e.shift();
        return void 0 !== t ? `?${t}` : "";
    }
    get hash() {
        const e = this.parts;
        e.shift();
        e.shift();
        const t = e.shift();
        return void 0 !== t ? `#${t}` : "";
    }
    set hash(e) {
        if (e.startsWith("#")) e = e.substring(1);
        const t = this.parts;
        let n = t.shift();
        const i = t.shift();
        if (void 0 !== i) n += `?${i}`;
        t.shift();
        n += `#${e}`;
        this.pushState({}, null, n);
        this.notifyChange();
    }
    activate() {
        return;
    }
    deactivate() {
        return;
    }
    get parts() {
        const e = [];
        const t = this.path.split("#");
        if (t.length > 1) e.unshift(t.pop()); else e.unshift(void 0);
        const n = t[0].split("?");
        if (n.length > 1) e.unshift(n.pop()); else e.unshift(void 0);
        e.unshift(n[0]);
        return e;
    }
    pushState(e, t, n) {
        this.states.splice(this.index + 1);
        this.paths.splice(this.index + 1);
        this.states.push(e);
        this.paths.push(n);
        this.index++;
    }
    replaceState(e, t, n) {
        this.states[this.index] = e;
        this.paths[this.index] = n;
    }
    go(e) {
        const t = this.index + e;
        if (t >= 0 && t < this.states.length) {
            this.index = t;
            this.notifyChange();
        }
    }
    notifyChange() {
        if (this.changeCallback) this.changeCallback(null).catch((e => {
            throw e;
        }));
    }
}

class ChangeSet {
    constructor(e, t, n, i) {
        this.index = e;
        this.flags = t;
        this.O = n;
        this.ov = i;
    }
    get newValue() {
        return this.O;
    }
    get oldValue() {
        return this.ov;
    }
    dispose() {
        this.O = void 0;
        this.ov = void 0;
    }
}

class ProxyChangeSet {
    constructor(e, t, n, i, r) {
        this.index = e;
        this.flags = t;
        this.key = n;
        this.O = i;
        this.ov = r;
    }
    get newValue() {
        return this.O;
    }
    get oldValue() {
        return this.ov;
    }
    dispose() {
        this.O = void 0;
        this.ov = void 0;
    }
}

class CollectionChangeSet {
    constructor(e, t, n) {
        this.index = e;
        this.flags = t;
        this.j = n;
    }
    get indexMap() {
        return this.j;
    }
    dispose() {
        this.j = void 0;
    }
}

class SpySubscriber {
    constructor() {
        this.A = void 0;
        this.R = void 0;
        this.q = void 0;
        this.M = 0;
    }
    get changes() {
        if (void 0 === this.A) return e.emptyArray;
        return this.A;
    }
    get proxyChanges() {
        if (void 0 === this.R) return e.emptyArray;
        return this.R;
    }
    get collectionChanges() {
        if (void 0 === this.q) return e.emptyArray;
        return this.q;
    }
    get hasChanges() {
        return void 0 !== this.A;
    }
    get hasProxyChanges() {
        return void 0 !== this.R;
    }
    get hasCollectionChanges() {
        return void 0 !== this.q;
    }
    get callCount() {
        return this.M;
    }
    handleChange(e, t, n) {
        if (void 0 === this.A) this.A = [ new ChangeSet(this.M++, n, e, t) ]; else this.A.push(new ChangeSet(this.M++, n, e, t));
    }
    handleProxyChange(e, t, n, i) {
        if (void 0 === this.R) this.R = [ new ProxyChangeSet(this.M++, i, e, t, n) ]; else this.R.push(new ProxyChangeSet(this.M++, i, e, t, n));
    }
    handleCollectionChange(e, t) {
        if (void 0 === this.q) this.q = [ new CollectionChangeSet(this.M++, t, e) ]; else this.q.push(new CollectionChangeSet(this.M++, t, e));
    }
    dispose() {
        if (void 0 !== this.A) {
            this.A.forEach((e => e.dispose()));
            this.A = void 0;
        }
        if (void 0 !== this.R) {
            this.R.forEach((e => e.dispose()));
            this.R = void 0;
        }
        if (void 0 !== this.q) {
            this.q.forEach((e => e.dispose()));
            this.q = void 0;
        }
        this.M = 0;
    }
}

function Mi(e, t, n, i) {
    var r = arguments.length, s = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(e, t, n, i); else for (var a = e.length - 1; a >= 0; a--) if (o = e[a]) s = (r < 3 ? o(s) : r > 3 ? o(t, n, s) : o(t, n)) || s;
    return r > 3 && s && Object.defineProperty(t, n, s), s;
}

exports.SortValueConverter = class SortValueConverter {
    toView(e, t, n = "asc") {
        if (Array.isArray(e)) {
            const i = "asc" === n ? 1 : -1;
            if (t && t.length) e.sort(((e, n) => e[t] - n[t] * i)); else e.sort(((e, t) => e - t * i));
        }
        return e;
    }
};

exports.SortValueConverter = Mi([ t.valueConverter("sort") ], exports.SortValueConverter);

exports.JsonValueConverter = class JsonValueConverter {
    toView(e) {
        return JSON.stringify(e);
    }
    fromView(e) {
        return JSON.parse(e);
    }
};

exports.JsonValueConverter = Mi([ t.valueConverter("json") ], exports.JsonValueConverter);

let Li = class NameTag {};

Mi([ n.bindable() ], Li.prototype, "name", void 0);

Li = Mi([ n.customElement({
    name: "name-tag",
    template: `<template>\${name}</template>`,
    needsCompile: true,
    dependencies: [],
    instructions: [],
    surrogates: []
}) ], Li);

const Ti = [ exports.SortValueConverter, exports.JsonValueConverter, Li ];

const zi = {
    register(e) {
        e.register(...Ti);
    }
};

function Fi(e, ...t) {
    const n = {
        result: ""
    };
    const i = t.length;
    for (let r = 0; r < i; ++r) n.result = n.result + e[r] + Ii(t[r], n);
    return n.result + e[i];
}

const Ni = /\r?\n/g;

const Pi = /\s+/g;

const Bi = Object.prototype.toString;

function Ii(e, t) {
    const n = Bi.call(e);
    switch (n) {
      case "[object Undefined]":
        return "undefined";

      case "[object Null]":
        return "null";

      case "[object String]":
        return `'${e}'`;

      case "[object Boolean]":
      case "[object Number]":
        return e;

      case "[object Array]":
        return `[${e.map((e => Ii(e, t))).join(",")}]`;

      case "[object Event]":
        return `'${e.type}'`;

      case "[object Object]":
        {
            const n = Object.getPrototypeOf(e);
            if (!n || !n.constructor || "Object" === n.constructor.name) return Di(e, t);
            return `class ${n.constructor.name}${Di(e, t)}`;
        }

      case "[object Function]":
        if (e.name && e.name.length) return `class ${e.name}`;
        return e.toString().replace(Pi, "");

      default:
        return Di(e, t);
    }
}

function Di(e, t) {
    if (t.result.length > 100) return "(json string)";
    try {
        let n = [];
        let i = 0;
        const r = JSON.stringify(e, (function(e, r) {
            if ("dom" === e) return "(dom)";
            if (2 === ++i) return String(r);
            if ("object" === typeof r && null !== r) {
                if (r.nodeType > 0) {
                    --i;
                    return Ui(r, t);
                }
                if (n.includes(r)) try {
                    --i;
                    return JSON.parse(JSON.stringify(r));
                } catch (e) {
                    return;
                }
                n.push(r);
            }
            --i;
            return r;
        }));
        n = void 0;
        let s = r.replace(Ni, "");
        if (s.length > 25) {
            const e = s.length;
            s = `${s.slice(0, 25)}...(+${e - 25})`;
        }
        t.result += s;
        return s;
    } catch (e) {
        return `error stringifying to json: ${e}`;
    }
}

function Ui(e, t) {
    if (t.result.length > 100) return "(html string)";
    if (null === e) return "null";
    if (void 0 === e) return "undefined";
    if (null != e.textContent && e.textContent.length || 3 === e.nodeType || 8 === e.nodeType) {
        const t = e.textContent.replace(Ni, "");
        if (t.length > 10) {
            const e = t.length;
            return `${t.slice(0, 10)}...(+${e - 10})`;
        }
        return t;
    }
    if (1 === e.nodeType) {
        if (e.innerHTML.length) {
            const t = e.innerHTML.replace(Ni, "");
            if (t.length > 10) {
                const e = t.length;
                return `${t.slice(0, 10)}...(+${e - 10})`;
            }
            return t;
        }
        if ("TEMPLATE" === e.nodeName) return Ui(e.content, t);
    }
    let n = "";
    for (let i = 0, r = e.childNodes.length; i < r; ++i) {
        const r = e.childNodes[i];
        n += Ui(r, t);
    }
    return n;
}

function Vi(e, t) {
    const n = `${e}`;
    const i = n.length;
    if (i >= t) return n;
    return n + new Array(t - i + 1).join(" ");
}

function Hi(e, t) {
    const n = `${e}`;
    const i = n.length;
    if (i >= t) return n;
    return new Array(t - i + 1).join(" ") + n;
}

function Ji(n) {
    let i;
    if (void 0 === n || !("get" in n)) i = et(); else i = n;
    const r = {
        handles() {
            return false;
        }
    };
    e.Registration.instance(t.IDirtyChecker, null).register(i);
    e.Registration.instance(t.INodeObserverLocator, r).register(i);
    return i.get(t.IObserverLocator);
}

function Wi(e = {}, n, i) {
    return n ? t.Scope.fromParent(t.Scope.create(n), e) : t.Scope.create(e, t.OverrideContext.create(e), i);
}

class Call {
    constructor(e, t, n, i) {
        this.instance = e;
        this.args = t;
        this.method = n;
        this.index = i;
    }
}

class CallCollection {
    constructor() {
        this.calls = [];
    }
    static register(t) {
        t.register(e.Registration.singleton(this, this));
    }
    addCall(e, t, ...n) {
        this.calls.push(new Call(e, n, t, this.calls.length));
        return this;
    }
}

function _i(t, n) {
    const i = t.prototype;
    const r = o(i);
    for (const t in r) {
        const s = r[t];
        if ("constructor" !== t && "function" === typeof s.value && true === s.configurable && true === s.writable) {
            const e = s.value;
            const r = function(...i) {
                n.addCall(this, t, ...i);
                return g(e, this, i);
            };
            Reflect.defineProperty(r, "original", {
                value: e,
                writable: true,
                configurable: true,
                enumerable: false
            });
            Reflect.defineProperty(i, t, {
                value: r,
                writable: s.writable,
                configurable: s.configurable,
                enumerable: s.enumerable
            });
        } else {
            const {get: r, set: o} = s;
            let a, l;
            if (r) {
                a = function() {
                    n.addCall(this, `get ${t}`, e.emptyArray);
                    return g(r, this, e.emptyArray);
                };
                Reflect.defineProperty(a, "original", {
                    value: r
                });
            }
            if (o) {
                l = function(i) {
                    n.addCall(this, `get ${t}`, e.emptyArray);
                    g(o, this, [ i ]);
                };
                Reflect.defineProperty(l, "original", {
                    value: o
                });
            }
            if (r || o) Reflect.defineProperty(i, t, {
                ...s,
                get: a,
                set: l
            });
        }
    }
}

function Gi(e) {
    const t = e.prototype;
    const n = o(t);
    for (const e in n) {
        const i = n[e];
        if ("constructor" !== e && "function" === typeof i.value && true === i.configurable && true === i.writable) Reflect.defineProperty(t, e, {
            value: i.value.original,
            writable: i.writable,
            configurable: i.configurable,
            enumerable: i.enumerable
        }); else {
            const {get: n, set: r} = i;
            if (n || r) Reflect.defineProperty(t, e, {
                ...i,
                get: n && Reflect.get(n, "original"),
                set: r && Reflect.get(r, "original")
            });
        }
    }
}

function Yi(e) {
    return function(t) {
        _i(t, e);
    };
}

exports.CSS_PROPERTIES = pi;

exports.Call = Call;

exports.CallCollection = CallCollection;

exports.ChangeSet = ChangeSet;

exports.CollectionChangeSet = CollectionChangeSet;

exports.MockBinding = MockBinding;

exports.MockBindingBehavior = MockBindingBehavior;

exports.MockBrowserHistoryLocation = MockBrowserHistoryLocation;

exports.MockContext = MockContext;

exports.MockPropertySubscriber = MockPropertySubscriber;

exports.MockServiceLocator = MockServiceLocator;

exports.MockSignaler = MockSignaler;

exports.MockTracingExpression = MockTracingExpression;

exports.MockValueConverter = MockValueConverter;

exports.PSEUDO_ELEMENTS = mi;

exports.ProxyChangeSet = ProxyChangeSet;

exports.SpySubscriber = SpySubscriber;

exports.TestConfiguration = zi;

exports.TestContext = TestContext;

exports._ = Fi;

exports.assert = di;

exports.createContainer = et;

exports.createFixture = Ri;

exports.createObserverLocator = Ji;

exports.createScopeForTest = Wi;

exports.createSpy = Le;

exports.eachCartesianJoin = xi;

exports.eachCartesianJoinAsync = $i;

exports.eachCartesianJoinFactory = bi;

exports.ensureTaskQueuesEmpty = xn;

exports.fail = Tn;

exports.generateCartesianProduct = ki;

exports.getVisibleText = gn;

exports.globalAttributeNames = gi;

exports.h = Ci;

exports.hJsx = Ei;

exports.htmlStringify = Ui;

exports.inspect = fn;

exports.instructionTypeName = bn;

exports.jsonStringify = Di;

exports.onFixtureCreated = Ai;

exports.padLeft = Hi;

exports.padRight = Vi;

exports.recordCalls = _i;

exports.setPlatform = Ze;

exports.stopRecordingCalls = Gi;

exports.stringify = Ii;

exports.trace = Yi;

exports.trimFull = Me;

exports.verifyBindingInstructionsEqual = vn;

exports.verifyEqual = dn;
//# sourceMappingURL=index.cjs.map
