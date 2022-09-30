import { noop as e, isArrayIndex as t, DI as n, Registration as i, kebabCase as r, emptyArray as a, EventAggregator as s, ILogger as o } from "@aurelia/kernel";

import { IObserverLocator as l, astEvaluate as u, astAssign as c, astBind as f, astUnbind as h, IDirtyChecker as d, INodeObserverLocator as p, Scope as m } from "@aurelia/runtime";

import { StandardConfiguration as g, IPlatform as b, ITemplateCompiler as v, CustomElement as $, CustomAttribute as y, Aurelia as x, valueConverter as w, bindable as k, customElement as C } from "@aurelia/runtime-html";

import { BrowserPlatform as S } from "@aurelia/platform-browser";

import { Metadata as O } from "@aurelia/metadata";

const {getPrototypeOf: E, getOwnPropertyDescriptor: j, getOwnPropertyDescriptors: A, getOwnPropertyNames: R, getOwnPropertySymbols: M, defineProperty: q, defineProperties: L} = Object;

const T = Object.keys;

const z = Object.is;

const F = Object.freeze;

const N = Object.assign;

const P = Number.isNaN;

const B = Reflect.apply;

const I = ArrayBuffer.isView;

function D(e) {
    return (t, ...n) => B(e, t, n);
}

const U = D(Object.prototype.hasOwnProperty);

const V = D(Object.prototype.propertyIsEnumerable);

const H = E(Uint8Array.prototype);

const J = D(j(H, Symbol.toStringTag).get);

const W = D(Object.prototype.toString);

const _ = D(RegExp.prototype.toString);

const G = D(Date.prototype.toISOString);

const Y = D(Date.prototype.toString);

const K = D(Error.prototype.toString);

const Q = D(Date.prototype.getTime);

const X = D(Set.prototype.values);

const Z = D(Map.prototype.entries);

const ee = D(Boolean.prototype.valueOf);

const te = D(Number.prototype.valueOf);

const ne = D(Symbol.prototype.valueOf);

const ie = D(String.prototype.valueOf);

function re(e) {
    return "number" === typeof e;
}

function ae(e) {
    return "string" === typeof e;
}

function se(e) {
    return "symbol" === typeof e;
}

function oe(e) {
    return void 0 === e;
}

function le(e) {
    return null !== e && "object" === typeof e;
}

function ue(e) {
    return "function" === typeof e;
}

function ce(e) {
    return null === e || "object" !== typeof e && "function" !== typeof e;
}

function fe(e) {
    return e instanceof ArrayBuffer;
}

function he(e) {
    return e instanceof ArrayBuffer || "undefined" !== typeof SharedArrayBuffer && e instanceof SharedArrayBuffer;
}

function de(e) {
    return e instanceof Date;
}

function pe(e) {
    return e instanceof Map;
}

function me(e) {
    return "[object Map Iterator]" === W(e);
}

function ge(e) {
    return e instanceof RegExp;
}

function be(e) {
    return e instanceof Set;
}

function ve(e) {
    return "[object Set Iterator]" === W(e);
}

function $e(e) {
    return e instanceof Error;
}

function ye(e) {
    return e instanceof Number;
}

function xe(e) {
    return e instanceof String;
}

function we(e) {
    return e instanceof Boolean;
}

function ke(e) {
    return e instanceof Symbol;
}

function Ce(e) {
    return ye(e) || xe(e) || we(e) || ke(e);
}

function Se(e) {
    return void 0 !== J(e);
}

function Oe(e) {
    return "Uint8Array" === J(e);
}

function Ee(e) {
    return "Uint8ClampedArray" === J(e);
}

function je(e) {
    return "Uint16Array" === J(e);
}

function Ae(e) {
    return "Uint32Array" === J(e);
}

function Re(e) {
    return "Int8Array" === J(e);
}

function Me(e) {
    return "Int16Array" === J(e);
}

function qe(e) {
    return "Int32Array" === J(e);
}

function Le(e) {
    return "Float32Array" === J(e);
}

function Te(e) {
    return "Float64Array" === J(e);
}

function ze(e) {
    return "[object Arguments]" === W(e);
}

function Fe(e) {
    return "[object DataView]" === W(e);
}

function Ne(e) {
    return "[object Promise]" === W(e);
}

function Pe(e) {
    return "[object WeakSet]" === W(e);
}

function Be(e) {
    return "[object WeakMap]" === W(e);
}

function Ie(e, n) {
    if (n) return R(e).filter((e => !t(e))); else return T(e).filter((e => !t(e)));
}

function De(e, t) {
    return t.filter((t => V(e, t)));
}

const Ue = F({
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

const Ve = /\u001b\[\d\d?m/g;

const He = /[\x00-\x1f\x27\x5c]/;

const Je = /[\x00-\x1f\x27\x5c]/g;

const We = /[\x00-\x1f\x5c]/;

const _e = /[\x00-\x1f\x5c]/g;

function Ge(e) {
    return e.replace(Ve, "");
}

function Ye(e, t) {
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

const Ke = F([ "\\u0000", "\\u0001", "\\u0002", "\\u0003", "\\u0004", "\\u0005", "\\u0006", "\\u0007", "\\b", "\\t", "\\n", "\\u000b", "\\f", "\\r", "\\u000e", "\\u000f", "\\u0010", "\\u0011", "\\u0012", "\\u0013", "\\u0014", "\\u0015", "\\u0016", "\\u0017", "\\u0018", "\\u0019", "\\u001a", "\\u001b", "\\u001c", "\\u001d", "\\u001e", "\\u001f", "", "", "", "", "", "", "", "\\'", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "\\\\" ]);

function Qe(e, t) {
    if (-1 === t) return `"${e}"`;
    if (-2 === t) return `\`${e}\``;
    return `'${e}'`;
}

const Xe = e => Ke[e.charCodeAt(0)];

function Ze(e) {
    let t = He;
    let n = Je;
    let i = 39;
    if (e.includes("'")) {
        if (!e.includes('"')) i = -1; else if (!e.includes("`") && !e.includes("${")) i = -2;
        if (39 !== i) {
            t = We;
            n = _e;
        }
    }
    if (e.length < 5e3 && !t.test(e)) return Qe(e, i);
    if (e.length > 100) {
        e = e.replace(n, Xe);
        return Qe(e, i);
    }
    let r = "";
    let a = 0;
    let s = 0;
    for (;s < e.length; s++) {
        const t = e.charCodeAt(s);
        if (t === i || 92 === t || t < 32) {
            if (a === s) r += Ke[t]; else r += `${e.slice(a, s)}${Ke[t]}`;
            a = s + 1;
        }
    }
    if (a !== s) r += e.slice(a);
    return Qe(r, i);
}

function et(e) {
    return e.replace(Je, Xe);
}

const tt = function() {
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

function nt(t, n, i) {
    const r = [];
    function a() {
        r.length = 0;
    }
    let s;
    let o;
    if (void 0 === t) {
        s = function e(...t) {
            r.push(t);
        };
        o = e;
    } else if (void 0 === n) {
        s = function e(...n) {
            r.push(n);
            return t(...n);
        };
        o = e;
    } else {
        if (!(n in t)) throw new Error(`No method named '${String(n)}' exists in object of type ${Reflect.getPrototypeOf(t).constructor.name}`);
        let e = t;
        let a = Reflect.getOwnPropertyDescriptor(e, n);
        while (void 0 === a) {
            e = Reflect.getPrototypeOf(e);
            a = Reflect.getOwnPropertyDescriptor(e, n);
        }
        if (null !== a.value && ("object" === typeof a.value || "function" === typeof a.value) && "function" === typeof a.value.restore) {
            a.value.restore();
            a = Reflect.getOwnPropertyDescriptor(e, n);
        }
        o = function i() {
            if (t === e) Reflect.defineProperty(t, n, a); else Reflect.deleteProperty(t, n);
        };
        if (void 0 === i) s = function e(...t) {
            r.push(t);
        }; else if (true === i) s = function e(...n) {
            r.push(n);
            return a.value.apply(t, n);
        }; else if ("function" === typeof i) s = function e(...t) {
            r.push(t);
            return i(...t);
        }; else throw new Error(`Invalid spy`);
        Reflect.defineProperty(t, n, {
            ...a,
            value: s
        });
    }
    Reflect.defineProperty(s, "calls", {
        value: r
    });
    Reflect.defineProperty(s, "reset", {
        value: a
    });
    Reflect.defineProperty(s, "restore", {
        value: o
    });
    return s;
}

var it;

(function(e) {
    e[e["noIterator"] = 0] = "noIterator";
    e[e["isArray"] = 1] = "isArray";
    e[e["isSet"] = 2] = "isSet";
    e[e["isMap"] = 3] = "isMap";
})(it || (it = {}));

function rt(e, t) {
    return e.source === t.source && e.flags === t.flags;
}

function at(e, t) {
    if (e.byteLength !== t.byteLength) return false;
    const {byteLength: n} = e;
    for (let i = 0; i < n; ++i) if (e[i] !== t[i]) return false;
    return true;
}

function st(e, t) {
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

function ot(e, t) {
    if (e.byteLength !== t.byteLength) return false;
    return 0 === st(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength));
}

function lt(e, t) {
    return e.byteLength === t.byteLength && 0 === st(new Uint8Array(e), new Uint8Array(t));
}

function ut(e, t) {
    if (ye(e)) return ye(t) && z(te(e), te(t));
    if (xe(e)) return xe(t) && ie(e) === ie(t);
    if (we(e)) return we(t) && ee(e) === ee(t);
    return ke(t) && ne(e) === ne(t);
}

function ct(e, t, n, i) {
    if (e === t) {
        if (0 !== e) return true;
        return n ? z(e, t) : true;
    }
    if (n) {
        if ("object" !== typeof e) return re(e) && P(e) && P(t);
        if ("object" !== typeof t || null === e || null === t) return false;
        if (E(e) !== E(t)) return false;
    } else {
        if (!le(e)) {
            if (!le(t)) return e == t;
            return false;
        }
        if (!le(t)) return false;
    }
    const r = W(e);
    const a = W(t);
    if (r !== a) return false;
    if ("[object URLSearchParams]" === r) return ct(Array.from(e.entries()), Array.from(t.entries()), n, i);
    if (Array.isArray(e)) {
        if (e.length !== t.length) return false;
        const r = Ie(e, false);
        const a = Ie(t, false);
        if (r.length !== a.length) return false;
        return ft(e, t, n, i, 1, r);
    }
    if ("[object Object]" === r) return ft(e, t, n, i, 0);
    if (de(e)) {
        if (Q(e) !== Q(t)) return false;
    } else if (ge(e)) {
        if (!rt(e, t)) return false;
    } else if ($e(e)) {
        if (e.message !== t.message || e.name !== t.name) return false;
    } else if (I(e)) {
        if (!n && (Le(e) || Te(e))) {
            if (!at(e, t)) return false;
        } else if (!ot(e, t)) return false;
        const r = Ie(e, false);
        const a = Ie(t, false);
        if (r.length !== a.length) return false;
        return ft(e, t, n, i, 0, r);
    } else if (be(e)) {
        if (!be(t) || e.size !== t.size) return false;
        return ft(e, t, n, i, 2);
    } else if (pe(e)) {
        if (!pe(t) || e.size !== t.size) return false;
        return ft(e, t, n, i, 3);
    } else if (he(e)) {
        if (!lt(e, t)) return false;
    } else if (Ce(e) && !ut(e, t)) return false;
    return ft(e, t, n, i, 0);
}

function ft(e, t, n, i, r, a) {
    if (5 === arguments.length) {
        a = T(e);
        const n = T(t);
        if (a.length !== n.length) return false;
    }
    let s = 0;
    for (;s < a.length; s++) if (!U(t, a[s])) return false;
    if (n && 5 === arguments.length) {
        const n = M(e);
        if (0 !== n.length) {
            let i = 0;
            for (s = 0; s < n.length; s++) {
                const r = n[s];
                if (V(e, r)) {
                    if (!V(t, r)) return false;
                    a.push(r);
                    i++;
                } else if (V(t, r)) return false;
            }
            const r = M(t);
            if (n.length !== r.length && De(t, r).length !== i) return false;
        } else {
            const e = M(t);
            if (0 !== e.length && 0 !== De(t, e).length) return false;
        }
    }
    if (0 === a.length && (0 === r || 1 === r && 0 === e.length || 0 === e.size)) return true;
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
    const o = $t(e, t, n, a, i, r);
    i.val1.delete(e);
    i.val2.delete(t);
    return o;
}

function ht(e, t, n, i) {
    for (const r of e) if (ct(t, r, n, i)) {
        e.delete(r);
        return true;
    }
    return false;
}

function dt(e) {
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
        if (P(e)) return false;
    }
    return true;
}

function pt(e, t, n) {
    const i = dt(n);
    if (null != i) return i;
    return t.has(i) && !e.has(i);
}

function mt(e, t, n, i, r) {
    const a = dt(n);
    if (null != a) return a;
    const s = t.get(a);
    if (void 0 === s && !t.has(a) || !ct(i, s, false, r)) return false;
    return !e.has(a) && ct(i, s, false, r);
}

function gt(e, t, n, i) {
    let r = null;
    for (const i of e) if (le(i)) {
        if (null === r) r = new Set;
        r.add(i);
    } else if (!t.has(i)) {
        if (n) return false;
        if (!pt(e, t, i)) return false;
        if (null === r) r = new Set;
        r.add(i);
    }
    if (null !== r) {
        for (const a of t) if (le(a)) {
            if (!ht(r, a, n, i)) return false;
        } else if (!n && !e.has(a) && !ht(r, a, n, i)) return false;
        return 0 === r.size;
    }
    return true;
}

function bt(e, t, n, i, r, a) {
    for (const s of e) if (ct(n, s, r, a) && ct(i, t.get(s), r, a)) {
        e.delete(s);
        return true;
    }
    return false;
}

function vt(e, t, n, i) {
    let r = null;
    for (const [a, s] of e) if (le(a)) {
        if (null === r) r = new Set;
        r.add(a);
    } else {
        const o = t.get(a);
        if (void 0 === o && !t.has(a) || !ct(s, o, n, i)) {
            if (n) return false;
            if (!mt(e, t, a, s, i)) return false;
            if (null === r) r = new Set;
            r.add(a);
        }
    }
    if (null !== r) {
        for (const [a, s] of t) if (le(a)) {
            if (!bt(r, e, a, s, n, i)) return false;
        } else if (!n && (!e.has(a) || !ct(e.get(a), s, false, i)) && !bt(r, e, a, s, false, i)) return false;
        return 0 === r.size;
    }
    return true;
}

function $t(e, t, n, i, r, a) {
    let s = 0;
    if (2 === a) {
        if (!gt(e, t, n, r)) return false;
    } else if (3 === a) {
        if (!vt(e, t, n, r)) return false;
    } else if (1 === a) for (;s < e.length; s++) if (U(e, s)) {
        if (!U(t, s) || !ct(e[s], t[s], n, r)) return false;
    } else if (U(t, s)) return false; else {
        const i = T(e);
        for (;s < i.length; s++) {
            const a = i[s];
            if (!U(t, a) || !ct(e[a], t[a], n, r)) return false;
        }
        if (i.length !== T(t).length) return false;
        return true;
    }
    for (s = 0; s < i.length; s++) {
        const a = i[s];
        if (!ct(e[a], t[a], n, r)) return false;
    }
    return true;
}

function yt(e, t) {
    return ct(e, t, false);
}

function xt(e, t) {
    return ct(e, t, true);
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
            this.c = n.createContainer();
            g.register(this.c);
            this.c.register(i.instance(TestContext, this));
            if (false === this.c.has(b, true)) this.c.register(kt);
        }
        return this.c;
    }
    get platform() {
        if (void 0 === this.p) this.p = this.container.get(b);
        return this.p;
    }
    get templateCompiler() {
        if (void 0 === this.t) this.t = this.container.get(v);
        return this.t;
    }
    get observerLocator() {
        if (void 0 === this.oL) this.oL = this.container.get(l);
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

let wt;

let kt;

function Ct(e) {
    wt = e;
    kt = i.instance(b, e);
}

function St(...e) {
    return n.createContainer().register(kt, ...e);
}

let Ot;

let Et;

function jt(e) {
    if (void 0 === Et) try {
        function t() {
            t();
        }
        t();
    } catch (e) {
        Et = e.message;
        Ot = e.name;
    }
    return e.name === Ot && e.message === Et;
}

const At = F({
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
    stylize: Ft
});

const Rt = T(At);

function Mt(e) {
    const t = {};
    for (const n of Rt) t[n] = e[n];
    if (void 0 !== e.userOptions) N(t, e.userOptions);
    return t;
}

function qt(e) {
    const t = {
        ...At,
        budget: {},
        indentationLvl: 0,
        seen: [],
        currentDepth: 0,
        stylize: e.colors ? Ft : Nt
    };
    for (const n of Rt) if (U(e, n)) t[n] = e[n];
    if (void 0 === t.userOptions) t.userOptions = e;
    return t;
}

const Lt = F({
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

const Tt = F({
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

const zt = Symbol.for("customInspect");

function Ft(e, t) {
    const n = Lt[t];
    if (ae(n)) return Ue[n](e); else return e;
}

function Nt(e, t) {
    return e;
}

class AssertionError extends Error {
    constructor(e) {
        const {actual: t, expected: n, message: i, operator: r, stackStartFn: a} = e;
        const s = Error.stackTraceLimit;
        Error.stackTraceLimit = 0;
        let o = null == i ? "" : `${i} - `;
        if ("deepStrictEqual" === r || "strictEqual" === r) super(`${o}${Bt(t, n, r)}`); else if ("notDeepStrictEqual" === r || "notStrictEqual" === r) {
            let e = Tt[r];
            let n = Nn(t).split("\n");
            if ("notStrictEqual" === r && le(t)) e = Tt.notStrictEqualObject;
            if (n.length > 30) {
                n[26] = Ue.blue("...");
                while (n.length > 27) n.pop();
            }
            if (1 === n.length) super(`${o}${e} ${n[0]}`); else super(`${o}${e}\n\n${Ye(n, "\n")}\n`);
        } else {
            let e = Nn(t);
            let i = "";
            const a = Tt[r];
            if ("notDeepEqual" === r || "notEqual" === r) {
                e = `${Tt[r]}\n\n${e}`;
                if (e.length > 1024) e = `${e.slice(0, 1021)}...`;
            } else {
                i = `${Nn(n)}`;
                if (e.length > 512) e = `${e.slice(0, 509)}...`;
                if (i.length > 512) i = `${i.slice(0, 509)}...`;
                if ("deepEqual" === r || "equal" === r) e = `${a}\n\n${e}\n\nshould equal\n\n`; else i = ` ${r} ${i}`;
            }
            if (!r) {
                i = "";
                e = "";
                o = o.slice(0, -3);
            }
            super(`${o}${e}${i}`);
        }
        Error.stackTraceLimit = s;
        this.generatedMessage = !i || "Failed" === i;
        q(this, "name", {
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
            Error.captureStackTrace(this, a);
            this.stack;
        } else Error().stack;
        this.name = "AssertionError";
    }
    toString() {
        return `${this.name} [${this.code}]: ${this.message}`;
    }
    [zt](e, t) {
        return Fn(this, {
            ...t,
            customInspect: false,
            depth: 0
        });
    }
}

const Pt = 10;

function Bt(e, t, n) {
    let i = "";
    let r = "";
    let a = 0;
    let s = "";
    let o = false;
    const l = Nn(e);
    const u = l.split("\n");
    const c = Nn(t).split("\n");
    let f = 0;
    let h = "";
    if ("strictEqual" === n && le(e) && le(t)) n = "strictEqualObject";
    if (1 === u.length && 1 === c.length && u[0] !== c[0]) {
        const i = u[0].length + c[0].length;
        if (i <= Pt) {
            if (!le(e) && !le(t) && (0 !== e || 0 !== t)) return `${Tt[n]}\n\n${u[0]} !== ${c[0]}\n`;
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
        if (f++ < 2) s = `\n  ${d}${s}`; else i = d;
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
            e[26] = Ue.blue("...");
            while (e.length > 27) e.pop();
        }
        return `${Tt.notIdentical}\n\n${Ye(e, "\n")}\n`;
    }
    if (f > 3) {
        s = `\n${Ue.blue("...")}${s}`;
        o = true;
    }
    if ("" !== i) {
        s = `\n  ${i}${s}`;
        i = "";
    }
    let g = 0;
    const b = `${Tt[n]}\n${Ue.green("+ actual")} ${Ue.red("- expected")}`;
    const v = ` ${Ue.blue("...")} Lines skipped`;
    for (f = 0; f < m; f++) {
        const e = f - a;
        if (u.length < f + 1) {
            if (e > 1 && f > 2) {
                if (e > 4) {
                    r += `\n${Ue.blue("...")}`;
                    o = true;
                } else if (e > 3) {
                    r += `\n  ${c[f - 2]}`;
                    g++;
                }
                r += `\n  ${c[f - 1]}`;
                g++;
            }
            a = f;
            i += `\n${Ue.red("-")} ${c[f]}`;
            g++;
        } else if (c.length < f + 1) {
            if (e > 1 && f > 2) {
                if (e > 4) {
                    r += `\n${Ue.blue("...")}`;
                    o = true;
                } else if (e > 3) {
                    r += `\n  ${u[f - 2]}`;
                    g++;
                }
                r += `\n  ${u[f - 1]}`;
                g++;
            }
            a = f;
            r += `\n${Ue.green("+")} ${u[f]}`;
            g++;
        } else {
            const t = c[f];
            let n = u[f];
            let s = n !== t && (!n.endsWith(",") || n.slice(0, -1) !== t);
            if (s && t.endsWith(",") && t.slice(0, -1) === n) {
                s = false;
                n += ",";
            }
            if (s) {
                if (e > 1 && f > 2) {
                    if (e > 4) {
                        r += `\n${Ue.blue("...")}`;
                        o = true;
                    } else if (e > 3) {
                        r += `\n  ${u[f - 2]}`;
                        g++;
                    }
                    r += `\n  ${u[f - 1]}`;
                    g++;
                }
                a = f;
                r += `\n${Ue.green("+")} ${n}`;
                i += `\n${Ue.red("-")} ${t}`;
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
        if (g > 1e3 && f < m - 2) return `${b}${v}\n${r}\n${Ue.blue("...")}${i}\n${Ue.blue("...")}`;
    }
    return `${b}${o ? v : ""}\n${r}${i}${s}${h}`;
}

const It = 0;

const Dt = 1;

const Ut = 2;

const Vt = new Int8Array(128);

const Ht = new Int8Array(128);

for (let e = 0; e < 128; ++e) if (36 === e || 95 === e || e >= 65 && e <= 90 || e >= 97 && e <= 122) Vt[e] = Ht[e] = 1; else if (e >= 49 && e <= 57) Ht[e] = 1;

function Jt(e) {
    if (1 !== Vt[e.charCodeAt(0)]) return false;
    const {length: t} = e;
    for (let n = 1; n < t; ++n) if (1 !== Ht[e.charCodeAt(n)]) return false;
    return true;
}

const Wt = {};

const _t = 16;

const Gt = 0;

const Yt = 1;

const Kt = 2;

function Qt(e, t) {
    let n = 0;
    let i = 0;
    let r = 0;
    const a = new Array(t.length);
    for (;r < t.length; r++) {
        const s = e.colors ? Ge(t[r]).length : t[r].length;
        a[r] = s;
        n += s;
        if (i < s) i = s;
    }
    const s = i + 2;
    if (3 * s + e.indentationLvl < e.breakLength && (n / i > 5 || i <= 6)) {
        const n = 2.5;
        const o = 1;
        const l = Math.min(Math.round(Math.sqrt(n * (s - o) * t.length) / (s - o)), 3 * e.compact, 10);
        if (l <= 1) return t;
        const u = [];
        let c = a[0];
        for (r = l; r < a.length; r += l) if (a[r] > c) c = a[r];
        for (r = 0; r < t.length; r += l) {
            let e = t[r].length - a[r];
            let n = t[r].padStart(c + e, " ");
            const s = Math.min(r + l, t.length);
            for (let o = r + 1; o < s; o++) {
                e = t[o].length - a[o];
                n += `, ${t[o].padStart(i + e, " ")}`;
            }
            u.push(n);
        }
        t = u;
    }
    return t;
}

function Xt(e, t, n, i, r) {
    if (jt(t)) {
        e.seen.pop();
        e.indentationLvl = r;
        return e.stylize(`[${un(n, i)}: Inspection interrupted prematurely. Maximum call stack size exceeded.]`, "special");
    }
    throw t;
}

const Zt = F([ "BYTES_PER_ELEMENT", "length", "byteLength", "byteOffset", "buffer" ]);

function en(e) {
    const t = [];
    for (const [n, i] of e) t.push(n, i);
    return t;
}

function tn(e, t, n) {
    let i = t.length + n;
    if (i + t.length > e.breakLength) return false;
    for (let n = 0; n < t.length; n++) {
        if (e.colors) i += Ge(t[n]).length; else i += t[n].length;
        if (i > e.breakLength) return false;
    }
    return true;
}

function nn(e, t, n, i, r = false) {
    if (true !== e.compact) {
        if (r) {
            const r = t.length + e.indentationLvl + i[0].length + n.length + 10;
            if (tn(e, t, r)) return `${n ? `${n} ` : ""}${i[0]} ${Ye(t, ", ")} ${i[1]}`;
        }
        const a = `\n${" ".repeat(e.indentationLvl)}`;
        return `${n ? `${n} ` : ""}${i[0]}${a}  ${Ye(t, `,${a}  `)}${a}${i[1]}`;
    }
    if (tn(e, t, 0)) return `${i[0]}${n ? ` ${n}` : ""} ${Ye(t, ", ")} ${i[1]}`;
    const a = " ".repeat(e.indentationLvl);
    const s = "" === n && 1 === i[0].length ? " " : `${n ? ` ${n}` : ""}\n${a}  `;
    return `${i[0]}${s}${Ye(t, `,\n${a}  `)} ${i[1]}`;
}

function rn(e, t) {
    let n;
    while (e) {
        const t = j(e, "constructor");
        if (!oe(t) && ue(t.value) && "" !== t.value.name) return t.value.name;
        e = E(e);
        if (void 0 === n) n = e;
    }
    if (null === n) return null;
    const i = {
        ...t,
        customInspect: false
    };
    return `<${Fn(n, i)}>`;
}

function an() {
    return [];
}

function sn(e, t, n) {
    if (null === e) {
        if ("" !== t) return `[${n}: null prototype] [${t}] `;
        return `[${n}: null prototype] `;
    }
    if ("" !== t && e !== t) return `${e} [${t}] `;
    return `${e} `;
}

const on = vn.bind(null, Nt);

function ln(e, t) {
    let n;
    const i = M(e);
    if (t) {
        n = R(e);
        if (0 !== i.length) n.push(...i);
    } else {
        n = T(e);
        if (0 !== i.length) n.push(...i.filter((t => V(e, t))));
    }
    return n;
}

function un(e, t) {
    return e || t || "Object";
}

const cn = F([ [ Oe, Uint8Array ], [ Ee, Uint8ClampedArray ], [ je, Uint16Array ], [ Ae, Uint32Array ], [ Re, Int8Array ], [ Me, Int16Array ], [ qe, Int32Array ], [ Le, Float32Array ], [ Te, Float64Array ] ]);

const fn = cn.length;

function hn(e) {
    for (let t = 0; t < fn; ++t) {
        const [n, i] = cn[t];
        if (n(e)) return i;
    }
    return;
}

function dn(e, t) {
    if (t !== `${e} Iterator`) {
        if ("" !== t) t += "] [";
        t += `${e} Iterator`;
    }
    return [ `[${t}] {`, "}" ];
}

let pn;

function mn(e, t) {
    if (void 0 === pn) pn = new Map; else {
        const t = pn.get(e);
        if (void 0 !== t) return t;
    }
    class NullPrototype extends e {
        get [Symbol.toStringTag]() {
            return "";
        }
    }
    q(NullPrototype.prototype.constructor, "name", {
        value: `[${t}: null prototype]`
    });
    pn.set(e, NullPrototype);
    return NullPrototype;
}

function gn(e, t, n) {
    let i;
    if (be(t)) {
        const e = mn(Set, "Set");
        i = new e(X(t));
    } else if (pe(t)) {
        const e = mn(Map, "Map");
        i = new e(Z(t));
    } else if (Array.isArray(t)) {
        const e = mn(Array, "Array");
        i = new e(t.length);
    } else if (Se(t)) {
        const e = hn(t);
        const n = mn(e, e.name);
        i = new n(t);
    }
    if (void 0 !== i) {
        L(i, A(t));
        return Tn(e, i, n);
    }
    return;
}

function bn(e, t) {
    return e(z(t, -0) ? "-0" : `${t}`, "number");
}

function vn(e, t, n) {
    switch (typeof t) {
      case "string":
        if (true !== n.compact && n.indentationLvl + t.length > n.breakLength && t.length > _t) {
            const i = n.breakLength - n.indentationLvl;
            const r = Math.max(i, _t);
            const a = Math.ceil(t.length / r);
            const s = Math.ceil(t.length / a);
            const o = Math.max(s, _t);
            if (void 0 === Wt[o]) Wt[o] = new RegExp(`(.|\\n){1,${o}}(\\s|$)|(\\n|.)+?(\\s|$)`, "gm");
            const l = t.match(Wt[o]);
            if (l.length > 1) {
                const t = " ".repeat(n.indentationLvl);
                let i = `${e(Ze(l[0]), "string")} +\n`;
                let r = 1;
                for (;r < l.length - 1; r++) i += `${t}  ${e(Ze(l[r]), "string")} +\n`;
                i += `${t}  ${e(Ze(l[r]), "string")}`;
                return i;
            }
        }
        return e(Ze(t), "string");

      case "number":
        return bn(e, t);

      case "boolean":
        return e(t.toString(), "boolean");

      case "undefined":
        return e("undefined", "undefined");

      case "symbol":
        return e(t.toString(), "symbol");
    }
    throw new Error(`formatPrimitive only handles non-null primitives. Got: ${W(t)}`);
}

function $n(e) {
    return e.stack || K(e);
}

function yn(e, n, i, r, a, s) {
    const o = T(n);
    let l = s;
    for (;s < o.length && a.length < r; s++) {
        const u = o[s];
        const c = +u;
        if (c > 2 ** 32 - 2) break;
        if (`${l}` !== u) {
            if (!t(u)) break;
            const n = c - l;
            const i = n > 1 ? "s" : "";
            const s = `<${n} empty item${i}>`;
            a.push(e.stylize(s, "undefined"));
            l = c;
            if (a.length === r) break;
        }
        a.push(Ln(e, n, i, u, Dt));
        l++;
    }
    const u = n.length - l;
    if (a.length !== r) {
        if (u > 0) {
            const t = u > 1 ? "s" : "";
            const n = `<${u} empty item${t}>`;
            a.push(e.stylize(n, "undefined"));
        }
    } else if (u > 0) a.push(`... ${u} more item${u > 1 ? "s" : ""}`);
    return a;
}

function xn(e, t) {
    const n = new Uint8Array(t);
    let i = Ye(n.slice(0, Math.min(e.maxArrayLength, n.length)).map((e => e.toString(16))), " ");
    const r = n.length - e.maxArrayLength;
    if (r > 0) i += ` ... ${r} more byte${r > 1 ? "s" : ""}`;
    return [ `${e.stylize("[Uint8Contents]", "special")}: <${i}>` ];
}

function wn(e, t, n) {
    const i = t.length;
    const r = Math.min(Math.max(0, e.maxArrayLength), i);
    const a = i - r;
    const s = [];
    for (let i = 0; i < r; i++) {
        if (!U(t, i)) return yn(e, t, n, r, s, i);
        s.push(Ln(e, t, n, i, Dt));
    }
    if (a > 0) s.push(`... ${a} more item${a > 1 ? "s" : ""}`);
    return s;
}

function kn(e, t, n) {
    const i = Math.min(Math.max(0, e.maxArrayLength), t.length);
    const r = t.length - i;
    const a = new Array(i);
    let s = 0;
    for (;s < i; ++s) a[s] = bn(e.stylize, t[s]);
    if (r > 0) a[s] = `... ${r} more item${r > 1 ? "s" : ""}`;
    if (e.showHidden) {
        e.indentationLvl += 2;
        for (const i of Zt) {
            const r = zn(e, t[i], n, true);
            a.push(`[${i}]: ${r}`);
        }
        e.indentationLvl -= 2;
    }
    return a;
}

function Cn(e, t, n) {
    const i = [];
    e.indentationLvl += 2;
    for (const r of t) i.push(zn(e, r, n));
    e.indentationLvl -= 2;
    if (e.showHidden) i.push(`[size]: ${e.stylize(t.size.toString(), "number")}`);
    return i;
}

function Sn(e, t, n) {
    const i = [];
    e.indentationLvl += 2;
    for (const [r, a] of t) i.push(`${zn(e, r, n)} => ${zn(e, a, n)}`);
    e.indentationLvl -= 2;
    if (e.showHidden) i.push(`[size]: ${e.stylize(t.size.toString(), "number")}`);
    return i;
}

function On(e, t, n, i) {
    const r = Math.max(e.maxArrayLength, 0);
    const a = Math.min(r, n.length);
    const s = new Array(a);
    e.indentationLvl += 2;
    for (let i = 0; i < a; i++) s[i] = zn(e, n[i], t);
    e.indentationLvl -= 2;
    if (i === Gt) s.sort();
    const o = n.length - a;
    if (o > 0) s.push(`... ${o} more item${o > 1 ? "s" : ""}`);
    return s;
}

function En(e, t, n, i) {
    const r = Math.max(e.maxArrayLength, 0);
    const a = n.length / 2;
    const s = a - r;
    const o = Math.min(r, a);
    const l = new Array(o);
    let u = "";
    let c = "";
    let f = " => ";
    let h = 0;
    if (i === Kt) {
        u = "[ ";
        c = " ]";
        f = ", ";
    }
    e.indentationLvl += 2;
    for (;h < o; h++) {
        const i = 2 * h;
        l[h] = `${u}${zn(e, n[i], t)}` + `${f}${zn(e, n[i + 1], t)}${c}`;
    }
    e.indentationLvl -= 2;
    if (i === Gt) l.sort();
    if (s > 0) l.push(`... ${s} more item${s > 1 ? "s" : ""}`);
    return l;
}

function jn(e) {
    return [ e.stylize("<items unknown>", "special") ];
}

function An(e, t, n) {
    return On(e, n, [], Gt);
}

function Rn(e, t, n) {
    return En(e, n, [], Gt);
}

function Mn(e, t, n, i) {
    const r = en(t.entries());
    if (t instanceof Map) {
        i[0] = i[0].replace(/ Iterator] {$/, " Entries] {");
        return En(e, n, r, Kt);
    }
    return On(e, n, r, Yt);
}

function qn(e, t, n) {
    return [ "[object Promise]" ];
}

function Ln(e, t, n, i, r) {
    switch (i) {
      case "$controller":
        return `$controller: { id: ${t.$controller.name} } (omitted for brevity)`;

      case "overrideContext":
        return "overrideContext: (omitted for brevity)";
    }
    let a, s;
    let o = " ";
    const l = j(t, i) || {
        value: t[i],
        enumerable: true
    };
    if (void 0 !== l.value) {
        const t = r !== It || true !== e.compact ? 2 : 3;
        e.indentationLvl += t;
        s = zn(e, l.value, n);
        if (3 === t) {
            const t = e.colors ? Ge(s).length : s.length;
            if (e.breakLength < t) o = `\n${" ".repeat(e.indentationLvl)}`;
        }
        e.indentationLvl -= t;
    } else if (void 0 !== l.get) {
        const r = void 0 !== l.set ? "Getter/Setter" : "Getter";
        const a = e.stylize;
        const o = "special";
        if (e.getters && (true === e.getters || "get" === e.getters && void 0 === l.set || "set" === e.getters && void 0 !== l.set)) try {
            const l = t[i];
            e.indentationLvl += 2;
            if (null === l) s = `${a(`[${r}:`, o)} ${a("null", "null")}${a("]", o)}`; else if ("object" === typeof l) s = `${a(`[${r}]`, o)} ${zn(e, l, n)}`; else {
                const t = vn(a, l, e);
                s = `${a(`[${r}:`, o)} ${t}${a("]", o)}`;
            }
            e.indentationLvl -= 2;
        } catch (e) {
            const t = `<Inspection threw (${e.message})>`;
            s = `${a(`[${r}:`, o)} ${t}${a("]", o)}`;
        } else s = e.stylize(`[${r}]`, o);
    } else if (void 0 !== l.set) s = e.stylize("[Setter]", "special"); else s = e.stylize("undefined", "undefined");
    if (r === Dt) return s;
    if (se(i)) {
        const t = et(i.toString());
        a = `[${e.stylize(t, "symbol")}]`;
    } else if (false === l.enumerable) a = `[${et(i.toString())}]`; else if (Jt(i)) a = e.stylize(i, "name"); else a = e.stylize(Ze(i), "string");
    return `${a}:${o}${s}`;
}

function Tn(e, t, n, i) {
    let r;
    const a = rn(t, e);
    switch (a) {
      case "Container":
      case "ObserverLocator":
      case "Window":
        return e.stylize(`${a} (omitted for brevity)`, "special");

      case "Function":
        if ("Node" === t.name) return e.stylize("Node constructor (omitted for brevity)", "special");
    }
    let s = t[Symbol.toStringTag];
    if (!ae(s)) s = "";
    let o = "";
    let l = an;
    let u;
    let c = true;
    let f = 0;
    let h = It;
    if (t[Symbol.iterator]) {
        c = false;
        if (Array.isArray(t)) {
            r = Ie(t, e.showHidden);
            const n = sn(a, s, "Array");
            u = [ `${"Array " === n ? "" : n}[`, "]" ];
            if (0 === t.length && 0 === r.length) return `${u[0]}]`;
            h = Ut;
            l = wn;
        } else if (be(t)) {
            r = ln(t, e.showHidden);
            const n = sn(a, s, "Set");
            if (0 === t.size && 0 === r.length) return `${n}{}`;
            u = [ `${n}{`, "}" ];
            l = Cn;
        } else if (pe(t)) {
            r = ln(t, e.showHidden);
            const n = sn(a, s, "Map");
            if (0 === t.size && 0 === r.length) return `${n}{}`;
            u = [ `${n}{`, "}" ];
            l = Sn;
        } else if (Se(t)) {
            r = Ie(t, e.showHidden);
            const n = null !== a ? sn(a, s) : sn(a, s, hn(t).name);
            u = [ `${n}[`, "]" ];
            if (0 === t.length && 0 === r.length && !e.showHidden) return `${u[0]}]`;
            l = kn;
            h = Ut;
        } else if (me(t)) {
            r = ln(t, e.showHidden);
            u = dn("Map", s);
            l = Mn;
        } else if (ve(t)) {
            r = ln(t, e.showHidden);
            u = dn("Set", s);
            l = Mn;
        } else c = true;
    }
    if (c) {
        r = ln(t, e.showHidden);
        u = [ "{", "}" ];
        if ("Object" === a) {
            if (ze(t)) u[0] = "[Arguments] {"; else if ("" !== s) u[0] = `${sn(a, s, "Object")}{`;
            if (0 === r.length) return `${u[0]}}`;
        } else if (ue(t)) {
            const n = a || s || "Function";
            let i = `${n}`;
            if (t.name && ae(t.name)) i += `: ${t.name}`;
            if (0 === r.length) return e.stylize(`[${i}]`, "special");
            o = `[${i}]`;
        } else if (ge(t)) {
            o = _(null !== a ? t : new RegExp(t));
            const i = sn(a, s, "RegExp");
            if ("RegExp " !== i) o = `${i}${o}`;
            if (0 === r.length || n > e.depth && null !== e.depth) return e.stylize(o, "regexp");
        } else if (de(t)) {
            o = Number.isNaN(Q(t)) ? Y(t) : G(t);
            const n = sn(a, s, "Date");
            if ("Date " !== n) o = `${n}${o}`;
            if (0 === r.length) return e.stylize(o, "date");
        } else if ($e(t)) {
            o = $n(t);
            const n = o.indexOf("\n    at");
            if (-1 === n) o = `[${o}]`;
            if (0 !== e.indentationLvl) {
                const n = " ".repeat(e.indentationLvl);
                o = $n(t).replace(/\n/g, `\n${n}`);
            }
            if (0 === r.length) return o;
            if (false === e.compact && -1 !== n) {
                u[0] += `${o.slice(n)}`;
                o = `[${o.slice(0, n)}]`;
            }
        } else if (he(t)) {
            const n = fe(t) ? "ArrayBuffer" : "SharedArrayBuffer";
            const o = sn(a, s, n);
            if (void 0 === i) l = xn; else if (0 === r.length) return `${o}{ byteLength: ${bn(e.stylize, t.byteLength)} }`;
            u[0] = `${o}{`;
            r.unshift("byteLength");
        } else if (Fe(t)) {
            u[0] = `${sn(a, s, "DataView")}{`;
            r.unshift("byteLength", "byteOffset", "buffer");
        } else if (Ne(t)) {
            u[0] = `${sn(a, s, "Promise")}{`;
            l = qn;
        } else if (Pe(t)) {
            u[0] = `${sn(a, s, "WeakSet")}{`;
            l = e.showHidden ? An : jn;
        } else if (Be(t)) {
            u[0] = `${sn(a, s, "WeakMap")}{`;
            l = e.showHidden ? Rn : jn;
        } else if (Ce(t)) {
            let n;
            if (ye(t)) {
                o = `[Number: ${on(te(t), e)}]`;
                n = "number";
            } else if (xe(t)) {
                o = `[String: ${on(ie(t), e)}]`;
                n = "string";
                r = r.slice(t.length);
            } else if (we(t)) {
                o = `[Boolean: ${on(ee(t), e)}]`;
                n = "boolean";
            } else {
                o = `[Symbol: ${on(ne(t), e)}]`;
                n = "symbol";
            }
            if (0 === r.length) return e.stylize(o, n);
        } else {
            if (null === a) {
                const i = gn(e, t, n);
                if (i) return i;
            }
            if (me(t)) {
                u = dn("Map", s);
                l = Mn;
            } else if (ve(t)) {
                u = dn("Set", s);
                l = Mn;
            } else if (0 === r.length) return `${sn(a, s, "Object")}{}`; else u[0] = `${sn(a, s, "Object")}{`;
        }
    }
    if (n > e.depth && null !== e.depth) return e.stylize(`[${un(a, s)}]`, "special");
    n += 1;
    e.seen.push(t);
    e.currentDepth = n;
    let d;
    const p = e.indentationLvl;
    try {
        d = l(e, t, n, r, u);
        let i;
        const a = null != wt?.Node && !(t instanceof wt.Node);
        for (f = 0; f < r.length; f++) {
            i = r[f];
            if ((a || "textContent" === i || "outerHTML" === i) && "$$calls" !== i) d.push(Ln(e, t, n, r[f], h));
        }
    } catch (t) {
        return Xt(e, t, a, s, p);
    }
    e.seen.pop();
    if (e.sorted) {
        const t = true === e.sorted ? void 0 : e.sorted;
        if (h === It) d.sort(t); else if (r.length > 1) {
            const e = d.slice(d.length - r.length).sort(t);
            d.splice(d.length - r.length, r.length, ...e);
        }
    }
    let m = false;
    if (re(e.compact)) {
        const t = d.length;
        if (h === Ut && d.length > 6) d = Qt(e, d);
        if (e.currentDepth - n < e.compact && t === d.length) m = true;
    }
    const g = nn(e, d, o, u, m);
    const b = e.budget[e.indentationLvl] || 0;
    const v = b + g.length;
    e.budget[e.indentationLvl] = v;
    if (v > 2 ** 27) e.stop = true;
    return g;
}

function zn(e, t, n, i) {
    if ("object" !== typeof t && "function" !== typeof t) return vn(e.stylize, t, e);
    if (null === t) return e.stylize("null", "null");
    if (void 0 !== e.stop) {
        const n = rn(t, e) || t[Symbol.toStringTag];
        return e.stylize(`[${n || "Object"}]`, "special");
    }
    if (e.customInspect) {
        const i = t[zt];
        if (ue(i) && i !== Fn && !(t.constructor && t.constructor.prototype === t)) {
            const r = null === e.depth ? null : e.depth - n;
            const a = i.call(t, r, Mt(e));
            if (a !== t) {
                if (!ae(a)) return zn(e, a, n);
                return a.replace(/\n/g, `\n${" ".repeat(e.indentationLvl)}`);
            }
        }
    }
    if (e.seen.includes(t)) return e.stylize("[Circular]", "special");
    return Tn(e, t, n, i);
}

function Fn(e, t = {}) {
    const n = qt(t);
    return zn(n, e, 0);
}

function Nn(e) {
    return Fn(e, {
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

function Pn(e, t, n, i, r) {
    if (void 0 === n) n = 0;
    if ("object" !== typeof t || null === t) {
        Pi.strictEqual(e, t, `actual, depth=${n}, prop=${i}, index=${r}`);
        return;
    }
    if (t instanceof Array) {
        for (let r = 0; r < t.length; r++) Pn(e[r], t[r], n + 1, i, r);
        return;
    }
    if (t.nodeType > 0) {
        if (11 === t.nodeType) for (let r = 0; r < t.childNodes.length; r++) Pn(e.childNodes.item(r), t.childNodes.item(r), n + 1, i, r); else Pi.strictEqual(e.outerHTML, t.outerHTML, `actual.outerHTML, depth=${n}, prop=${i}, index=${r}`);
        return;
    }
    if (e) {
        Pi.strictEqual(e.constructor.name, t.constructor.name, `actual.constructor.name, depth=${n}, prop=${i}, index=${r}`);
        Pi.strictEqual(e.toString(), t.toString(), `actual.toString(), depth=${n}, prop=${i}, index=${r}`);
        for (const i of Object.keys(t)) Pn(e[i], t[i], n + 1, i, r);
    }
}

function Bn(e, t) {
    const n = t.parentNode ?? t.host ?? null;
    if (null === n || n === e) return null;
    return n.nextSibling ?? Bn(e, n);
}

function In(e, t) {
    return $.for(t, {
        optional: true
    })?.shadowRoot?.firstChild ?? t.firstChild ?? t.nextSibling ?? Bn(e, t);
}

function Dn(e, t) {
    let n = "";
    let i = $.for(e, {
        optional: true
    })?.shadowRoot?.firstChild ?? e.firstChild;
    while (null !== i) {
        if (3 === i.nodeType) n += i.data;
        i = In(e, i);
    }
    return t && n ? n.replace(/\s\s+/g, " ").trim() : n;
}

function Un(e) {
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

function Vn(e, t, n, i) {
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
            t = Un(t);
            e = Un(e);
        }
        n.push(`WRONG: ${i} === ${e} (expected: ${t})`);
    } else n.push(`OK   : ${i} === ${t}`); else if (t instanceof Array) for (let r = 0, a = Math.max(t.length, e.length); r < a; ++r) Vn(e[r], t[r], n, `${i}[${r}]`); else if (t.nodeType > 0) if (11 === t.nodeType) for (let r = 0, a = Math.max(t.childNodes.length, e.childNodes.length); r < a; ++r) Vn(e.childNodes.item(r), t.childNodes.item(r), n, `${i}.childNodes[${r}]`); else if (e.outerHTML !== t["outerHTML"]) n.push(`WRONG: ${i}.outerHTML === ${e.outerHTML} (expected: ${t["outerHTML"]})`); else n.push(`OK   : ${i}.outerHTML === ${t}`); else if (e) {
        const r = {};
        for (const a in t) {
            Vn(e[a], t[a], n, `${i}.${a}`);
            r[a] = true;
        }
        for (const a in e) if (!r[a]) Vn(e[a], t[a], n, `${i}.${a}`);
    }
    if ("instruction" === i && n.some((e => e.startsWith("W")))) throw new Error(`Failed assertion: binding instruction mismatch\n  - ${n.join("\n  - ")}`);
}

function Hn(e) {
    if (!e) e = S.getOrCreate(globalThis);
    e.taskQueue.flush();
    e.taskQueue["pending"].forEach((e => e.cancel()));
    e.domWriteQueue.flush();
    e.domWriteQueue["pending"].forEach((e => e.cancel()));
    e.domReadQueue.flush();
    e.domReadQueue["pending"].forEach((e => e.cancel()));
}

const Jn = Symbol("noException");

function Wn(e) {
    if ($e(e.message)) throw e.message;
    throw new AssertionError(e);
}

function _n(e, t, n, i) {
    if (!n) {
        let r = false;
        if (0 === t) {
            r = true;
            i = "No value argument passed to `assert.ok()`";
        } else if ($e(i)) throw i;
        const a = new AssertionError({
            actual: n,
            expected: true,
            message: i,
            operator: "==",
            stackStartFn: e
        });
        a.generatedMessage = r;
        throw a;
    }
}

class Comparison {
    constructor(e, t, n) {
        for (const i of t) if (i in e) if (!oe(n) && ae(n[i]) && ge(e[i]) && e[i].test(n[i])) this[i] = n[i]; else this[i] = e[i];
    }
}

function Gn(e, t, n, i, r) {
    if (!(n in e) || !xt(e[n], t[n])) {
        if (!i) {
            const n = new Comparison(e, r);
            const i = new Comparison(t, r, e);
            const a = new AssertionError({
                actual: n,
                expected: i,
                operator: "deepStrictEqual",
                stackStartFn: ei
            });
            a.actual = e;
            a.expected = t;
            a.operator = "throws";
            throw a;
        }
        Wn({
            actual: e,
            expected: t,
            message: i,
            operator: "throws",
            stackStartFn: ei
        });
    }
}

function Yn(e, t, n) {
    if (!ue(t)) {
        if (ge(t)) return t.test(e);
        if (ce(e)) {
            const i = new AssertionError({
                actual: e,
                expected: t,
                message: n,
                operator: "deepStrictEqual",
                stackStartFn: ei
            });
            i.operator = "throws";
            throw i;
        }
        const i = T(t);
        if ($e(t)) i.push("name", "message");
        for (const r of i) {
            if (ae(e[r]) && ge(t[r]) && t[r].test(e[r])) continue;
            Gn(e, t, r, n, i);
        }
        return true;
    }
    if (void 0 !== t.prototype && e instanceof t) return true;
    if (Object.prototype.isPrototypeOf.call(Error, t)) return false;
    return true === t.call({}, e);
}

function Kn(e) {
    try {
        e();
    } catch (e) {
        return e;
    }
    return Jn;
}

async function Qn(e) {
    let t;
    if (ue(e)) t = e(); else t = e;
    try {
        await t;
    } catch (e) {
        return e;
    }
    return Jn;
}

function Xn(e, t, n, i) {
    if (ae(n)) {
        i = n;
        n = void 0;
    }
    if (t === Jn) {
        let t = "";
        if (n && n.name) t += ` (${n.name})`;
        t += i ? `: ${i}` : ".";
        const r = "rejects" === e.name ? "rejection" : "exception";
        Wn({
            actual: void 0,
            expected: n,
            operator: e.name,
            message: `Missing expected ${r}${t}`,
            stackStartFn: e
        });
    }
    if (n && false === Yn(t, n, i)) throw t;
}

function Zn(e, t, n, i) {
    if (t === Jn) return;
    if (ae(n)) {
        i = n;
        n = void 0;
    }
    if (!n || Yn(t, n)) {
        const r = i ? `: ${i}` : ".";
        const a = "doesNotReject" === e.name ? "rejection" : "exception";
        Wn({
            actual: t,
            expected: n,
            operator: e.name,
            message: `Got unwanted ${a}${r}\nActual message: "${t && t.message}"`,
            stackStartFn: e
        });
    }
    throw t;
}

function ei(e, t, n) {
    Xn(ei, Kn(e), t, n);
}

async function ti(e, t, n) {
    Xn(ti, await Qn(e), t, n);
}

function ni(e, t, n) {
    Zn(ni, Kn(e), t, n);
}

async function ii(e, t, n) {
    Zn(ii, await Qn(e), t, n);
}

function ri(...e) {
    _n(ri, e.length, ...e);
}

function ai(e = "Failed") {
    if ($e(e)) throw e;
    const t = new AssertionError({
        message: e,
        actual: void 0,
        expected: void 0,
        operator: "fail",
        stackStartFn: ai
    });
    t.generatedMessage = "Failed" === e;
    throw t;
}

function si(e, t, n) {
    const i = Dn(e);
    if (i !== t) Wn({
        actual: i,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: si
    });
}

function oi(e, t, n) {
    if (e != t) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: oi
    });
}

function li(e, t, n) {
    if (typeof e !== t) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "typeof",
        stackStartFn: li
    });
}

function ui(e, t, n) {
    if (!(e instanceof t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "instanceOf",
        stackStartFn: ui
    });
}

function ci(e, t, n) {
    if (e instanceof t) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notInstanceOf",
        stackStartFn: ci
    });
}

function fi(e, t, n) {
    if (!e.includes(t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "includes",
        stackStartFn: fi
    });
}

function hi(e, t, n) {
    if (e.includes(t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notIncludes",
        stackStartFn: hi
    });
}

function di(e, t, n) {
    if (!e.contains(t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "contains",
        stackStartFn: di
    });
}

function pi(e, t, n) {
    if (e.contains(t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notContains",
        stackStartFn: pi
    });
}

function mi(e, t, n) {
    if (!(e > t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "greaterThan",
        stackStartFn: mi
    });
}

function gi(e, t, n) {
    if (!(e >= t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "greaterThanOrEqualTo",
        stackStartFn: gi
    });
}

function bi(e, t, n) {
    if (!(e < t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "lessThan",
        stackStartFn: bi
    });
}

function vi(e, t, n) {
    if (!(e <= t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "lessThanOrEqualTo",
        stackStartFn: vi
    });
}

function $i(e, t, n) {
    if (e == t) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "!=",
        stackStartFn: $i
    });
}

function yi(e, t, n) {
    if (!yt(e, t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "deepEqual",
        stackStartFn: yi
    });
}

function xi(e, t, n) {
    if (yt(e, t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notDeepEqual",
        stackStartFn: xi
    });
}

function wi(e, t, n) {
    if (!xt(e, t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "deepStrictEqual",
        stackStartFn: wi
    });
}

function ki(e, t, n) {
    if (xt(e, t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notDeepStrictEqual",
        stackStartFn: ki
    });
}

function Ci(e, t, n) {
    if (!z(e, t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "strictEqual",
        stackStartFn: Ci
    });
}

function Si(e, t, n) {
    if (z(e, t)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notStrictEqual",
        stackStartFn: Si
    });
}

function Oi(e, t, n) {
    if (!t.test(e)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "match",
        stackStartFn: Oi
    });
}

function Ei(e, t, n) {
    if (t.test(e)) Wn({
        actual: e,
        expected: t,
        message: n,
        operator: "notMatch",
        stackStartFn: Ei
    });
}

function ji(e, t) {
    if (!$.isType(e)) Wn({
        actual: false,
        expected: true,
        message: t,
        operator: "isCustomElementType",
        stackStartFn: ji
    });
}

function Ai(e, t) {
    if (!y.isType(e)) Wn({
        actual: false,
        expected: true,
        message: t,
        operator: "isCustomAttributeType",
        stackStartFn: ji
    });
}

function Ri(e, t = wt.document) {
    return "string" === typeof e ? t.querySelector(e) : e;
}

function Mi(e, t, n, i) {
    const r = Ri(e, i);
    const a = r && Dn(r, true);
    if (a !== t) Wn({
        actual: a,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: Mi
    });
}

function qi(e, t, n, i) {
    const r = Ri(e, i);
    const a = r instanceof HTMLInputElement && r.value;
    if (a !== t) Wn({
        actual: a,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: qi
    });
}

function Li(e, t, n, i, r = true) {
    const a = Ri(e, i);
    let s = a.innerHTML;
    if (r) s = s.replace(/<!--au-start-->/g, "").replace(/<!--au-end-->/g, "").replace(/\s+/g, " ").trim();
    if (s !== t) Wn({
        actual: s,
        expected: t,
        message: n,
        operator: "==",
        stackStartFn: Li
    });
}

function Ti(e, t) {
    const n = wt.window.getComputedStyle(e);
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

function zi(e, t, n) {
    const i = Ti(e, t);
    if (!i.isMatch) {
        const {property: e, actual: t, expected: r} = i;
        Wn({
            actual: `${e}:${t}`,
            expected: `${e}:${r}`,
            message: n,
            operator: "==",
            stackStartFn: zi
        });
    }
}

function Fi(e, t, n) {
    const i = Ti(e, t);
    if (i.isMatch) {
        const e = Object.entries(t).map((([e, t]) => `${e}:${t}`)).join(",");
        Wn({
            actual: e,
            expected: e,
            message: n,
            operator: "!=",
            stackStartFn: Fi
        });
    }
}

const Ni = function() {
    function e(e) {
        return (10 * e + .5 | 0) / 10;
    }
    function t(t) {
        const n = t.id;
        const i = e(t.createdTime);
        const r = e(t.queueTime);
        const a = t.preempt;
        const s = t.reusable;
        const o = t.persistent;
        const l = t.status;
        return `    task id=${n} createdTime=${i} queueTime=${r} preempt=${a} reusable=${s} persistent=${o} status=${l}\n` + `    task callback="${t.callback?.toString()}"`;
    }
    function n(e, n) {
        const i = n["processing"];
        const r = n["pending"];
        const a = n["delayed"];
        const s = n["flushRequested"];
        let o = `${e} has processing=${i.length} pending=${r.length} delayed=${a.length} flushRequested=${s}\n\n`;
        if (i.length > 0) o += `  Tasks in processing:\n${i.map(t).join("")}`;
        if (r.length > 0) o += `  Tasks in pending:\n${r.map(t).join("")}`;
        if (a.length > 0) o += `  Tasks in delayed:\n${a.map(t).join("")}`;
        return o;
    }
    return function e(t) {
        const i = S.getOrCreate(globalThis);
        const r = i.domWriteQueue;
        const a = i.taskQueue;
        const s = i.domReadQueue;
        let o = true;
        let l = "";
        if (!r.isEmpty) {
            l += `\n${n("domWriteQueue", r)}\n\n`;
            o = false;
        }
        if (!a.isEmpty) {
            l += `\n${n("taskQueue", a)}\n\n`;
            o = false;
        }
        if (!s.isEmpty) {
            l += `\n${n("domReadQueue", s)}\n\n`;
            o = false;
        }
        if (!o) {
            if (true === t) Hn(i);
            Wn({
                actual: void 0,
                expected: void 0,
                message: l,
                operator: "",
                stackStartFn: e
            });
        }
    };
}();

const Pi = F({
    throws: ei,
    doesNotThrow: ni,
    rejects: ti,
    doesNotReject: ii,
    ok: ri,
    fail: ai,
    equal: oi,
    typeOf: li,
    instanceOf: ui,
    notInstanceOf: ci,
    includes: fi,
    notIncludes: hi,
    contains: di,
    notContains: pi,
    greaterThan: mi,
    greaterThanOrEqualTo: gi,
    lessThan: bi,
    lessThanOrEqualTo: vi,
    notEqual: $i,
    deepEqual: yi,
    notDeepEqual: xi,
    deepStrictEqual: wi,
    notDeepStrictEqual: ki,
    strictEqual: Ci,
    notStrictEqual: Si,
    match: Oi,
    notMatch: Ei,
    visibleTextEqual: si,
    areTaskQueuesEmpty: Ni,
    isCustomElementType: ji,
    isCustomAttributeType: Ai,
    strict: {
        deepEqual: wi,
        notDeepEqual: ki,
        equal: Ci,
        notEqual: Si
    },
    html: {
        textContent: Mi,
        innerEqual: Li,
        value: qi,
        computedStyle: zi,
        notComputedStyle: Fi
    }
});

const Bi = {
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

const Ii = [ ":after", ":before", ":backdrop", ":cue", ":first-letter", ":first-line", ":selection", ":placeholder" ];

const Di = [ "xml:lang", "xml:base", "accesskey", "autocapitalize", "aria-foo", "class", "contenteditable", "contextmenu", "data-foo", "dir", "draggable", "dropzone", "hidden", "id", "is", "itemid", "itemprop", "itemref", "itemscope", "itemtype", "lang", "slot", "spellcheck", "style", "tabindex", "title", "translate", "onabort", "onautocomplete", "onautocompleteerror", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onsort", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting" ];

function Ui(e, t) {
    e = e.slice(0).filter((e => e.length > 0));
    if ("function" !== typeof t) throw new Error("Callback is not a function");
    if (0 === e.length) return;
    const n = e.reduce(((e, t) => e *= t.length), 1);
    const i = Array(e.length).fill(0);
    const r = [];
    let a = null;
    try {
        a = Vi(e, Array(e.length), i);
        t(...a);
    } catch (e) {
        r.push(e);
    }
    let s = 1;
    if (n === s) return;
    let o = false;
    while (!o) {
        const l = Wi(e, i);
        if (l) {
            try {
                t(...Vi(e, a, i));
            } catch (e) {
                r.push(e);
            }
            s++;
            if (n < s) throw new Error("Invalid loop implementation.");
        } else o = true;
    }
    if (r.length > 0) {
        const e = `eachCartesionJoinFactory failed to load ${r.length} tests:\n\n${r.map((e => e.message)).join("\n")}`;
        throw new Error(e);
    }
}

function Vi(e, t, n) {
    for (let i = 0, r = e.length; r > i; ++i) t[i] = e[i][n[i]](...t);
    return t;
}

function Hi(e, t) {
    e = e.slice(0).filter((e => e.length > 0));
    if ("function" !== typeof t) throw new Error("Callback is not a function");
    if (0 === e.length) return;
    const n = e.reduce(((e, t) => e *= t.length), 1);
    const i = Array(e.length).fill(0);
    const r = _i(e, Array(e.length), i);
    t(...r, 0);
    let a = 1;
    if (n === a) return;
    let s = false;
    while (!s) {
        const o = Wi(e, i);
        if (o) {
            t(..._i(e, r, i), a);
            a++;
            if (n < a) throw new Error("Invalid loop implementation.");
        } else s = true;
    }
}

async function Ji(e, t) {
    e = e.slice(0).filter((e => e.length > 0));
    if ("function" !== typeof t) throw new Error("Callback is not a function");
    if (0 === e.length) return;
    const n = e.reduce(((e, t) => e *= t.length), 1);
    const i = Array(e.length).fill(0);
    const r = _i(e, Array(e.length), i);
    await t(...r, 0);
    let a = 1;
    if (n === a) return;
    let s = false;
    while (!s) {
        const o = Wi(e, i);
        if (o) {
            await t(..._i(e, r, i), a);
            a++;
            if (n < a) throw new Error("Invalid loop implementation.");
        } else s = true;
    }
}

function Wi(e, t) {
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

function _i(e, t, n) {
    for (let i = 0, r = e.length; r > i; ++i) t[i] = e[i][n[i]];
    return t;
}

function* Gi(e) {
    const [t, ...n] = e;
    const i = n.length > 0 ? Gi(n) : [ [] ];
    for (const e of i) for (const n of t) yield [ n, ...e ];
}

function Yi(e, t = null, ...n) {
    const i = wt.document;
    const r = i.createElement(e);
    for (const e in t) if ("class" === e || "className" === e || "cls" === e) {
        let n = t[e];
        n = void 0 === n || null === n ? a : Array.isArray(n) ? n : `${n}`.split(" ");
        r.classList.add(...n.filter(Boolean));
    } else if (e in r || "data" === e || e.startsWith("_")) r[e.replace(/^_/, "")] = t[e]; else r.setAttribute(e, t[e]);
    const s = "TEMPLATE" === r.tagName ? r.content : r;
    for (const e of n) {
        if (null === e || void 0 === e) continue;
        s.appendChild(Ki(e) ? e : i.createTextNode(`${e}`));
    }
    return r;
}

function Ki(e) {
    return e.nodeType > 0;
}

const Qi = {
    delegate: 1,
    capture: 1,
    call: 1
};

const Xi = function(e, t, ...n) {
    const i = this || wt.document;
    const a = i.createElement("let$" === e ? "let" : e);
    if (null != t) {
        let e;
        for (const n in t) {
            e = t[n];
            if ("class" === n || "className" === n || "cls" === n) {
                e = null == e ? [] : Array.isArray(e) ? e : `${e}`.split(" ");
                a.classList.add(...e);
            } else if (n in a || "data" === n || n.startsWith("_")) a[n] = e; else if ("asElement" === n) a.setAttribute("as-element", e); else if (n.startsWith("o") && "n" === n[1] && !n.endsWith("$")) {
                const t = r(n.slice(2));
                const i = t.split("-");
                if (i.length > 1) {
                    const t = i[i.length - 1];
                    const n = Qi[t] ? t : "trigger";
                    a.setAttribute(`${i.slice(0, -1).join("-")}.${n}`, e);
                } else a.setAttribute(`${i[0]}.trigger`, e);
            } else {
                const t = n.split("$");
                if (1 === t.length) a.setAttribute(r(n), e); else {
                    if ("" === t[t.length - 1]) t[t.length - 1] = "bind";
                    a.setAttribute(t.map(r).join("."), e);
                }
            }
        }
    }
    const s = null != a.content ? a.content : a;
    for (const e of n) {
        if (null == e) continue;
        if (Array.isArray(e)) for (const t of e) s.appendChild(t instanceof wt.Node ? t : i.createTextNode(`${t}`)); else s.appendChild(e instanceof wt.Node ? e : i.createTextNode(`${e}`));
    }
    return a;
};

Xi.Fragment = "template";

const Zi = new s;

const er = e => Zi.subscribe("fixture:created", (t => {
    try {
        e(t);
    } catch (e) {
        console.log("(!) Error in fixture:created callback");
        console.log(e);
    }
}));

function tr(e, t, n = [], i = true, r = TestContext.create()) {
    const {container: a} = r;
    a.register(...n);
    const {platform: s, observerLocator: l} = r;
    const u = r.doc.body.appendChild(r.createElement("div"));
    const c = u.appendChild(r.createElement("app"));
    const f = new x(a);
    const h = "function" === typeof t ? t : null == t ? class {} : function e() {
        Object.setPrototypeOf(t, e.prototype);
        return t;
    };
    const d = [ "aliases", "bindables", "cache", "capture", "childrenObservers", "containerless", "dependencies", "enhance" ];
    if (h !== t && null != t) d.forEach((e => {
        O.define(e, $.getAnnotation(t, e), h);
    }));
    const p = $.isType(h) ? $.getDefinition(h) : {};
    const m = $.define({
        ...p,
        name: "app",
        template: e
    }, h);
    if (a.has(m, true)) throw new Error("Container of the context contains instance of the application root component. " + "Consider using a different class, or context as it will likely cause surprises in tests.");
    const g = a.get(m);
    let b;
    if (i) try {
        f.app({
            host: c,
            component: g
        });
        b = f.start();
    } catch (e) {
        try {
            const e = () => {
                u.remove();
                f.dispose();
            };
            const t = f.stop();
            if (t instanceof Promise) void t.then(e); else e();
        } catch {
            console.warn("(!) corrupted fixture state, should isolate the failing test and restart the run" + "as it is likely that this failing fixture creation will pollute others.");
        }
        throw e;
    }
    let v = 0;
    const y = e => {
        const t = c.querySelectorAll(e);
        if (t.length > 1) throw new Error(`There is more than 1 element with selector "${e}": ${t.length} found`);
        if (0 === t.length) throw new Error(`No element found for selector: "${e}"`);
        return t[0];
    };
    function w(e) {
        return Array.from(c.querySelectorAll(e));
    }
    function k(e) {
        const t = c.querySelectorAll(e);
        if (t.length > 1) throw new Error(`There is more than 1 element with selector "${e}": ${t.length} found`);
        return 0 === t.length ? null : t[0];
    }
    function C(e, t) {
        if (2 === arguments.length) {
            const n = k(e);
            if (null === n) throw new Error(`No element found for selector "${e}" to compare text content with "${t}"`);
            Pi.strictEqual(n.textContent, t);
        } else Pi.strictEqual(c.textContent, e);
    }
    function S(e, t) {
        if (2 === arguments.length) {
            const n = k(e);
            if (null === n) throw new Error(`No element found for selector "${e}" to compare innerHTML against "${t}"`);
            Pi.strictEqual(n.innerHTML, t);
        } else Pi.strictEqual(c.innerHTML, e);
    }
    function E(e, t, n) {
        const i = k(e);
        if (null === i) throw new Error(`No element found for selector "${e}" to compare attribute "${t}" against "${n}"`);
        Pi.strictEqual(i.getAttribute(t), n);
    }
    function j(e, t, n, i) {
        const r = k(e);
        if (null === r) throw new Error(`No element found for selector "${e}" to compare attribute "${n}" against "${i}"`);
        Pi.strictEqual(r.getAttributeNS(t, n), i);
    }
    function A(e, t) {
        const n = k(e);
        if (null === n) throw new Error(`No element found for selector "${e}" to compare value against "${t}"`);
        Pi.strictEqual(n.value, t);
    }
    function R(e, t, n) {
        const i = k(e);
        if (null === i) throw new Error(`No element found for selector "${e}" to fire event "${t}"`);
        i.dispatchEvent(new r.CustomEvent(t, n));
    }
    [ "click", "change", "input", "scroll" ].forEach((e => {
        Object.defineProperty(R, e, {
            configurable: true,
            writable: true,
            value: (t, n) => {
                const i = k(t);
                if (null === i) throw new Error(`No element found for selector "${t}" to fire event "${e}"`);
                i.dispatchEvent(new r.CustomEvent(e, n));
            }
        });
    }));
    function M(e, t) {
        const n = k(e);
        if (null === n || !/input|textarea/i.test(n.nodeName)) throw new Error(`No <input>/<textarea> element found for selector "${e}" to emulate input for "${t}"`);
        n.value = t;
        n.dispatchEvent(new s.window.Event("input"));
    }
    const q = (e, t) => {
        const n = k(e);
        if (null === n) throw new Error(`No element found for selector "${e}" to scroll by "${JSON.stringify(t)}"`);
        n.scrollBy("number" === typeof t ? {
            top: t
        } : t);
        n.dispatchEvent(new s.window.Event("scroll"));
    };
    const L = e => {
        r.platform.domWriteQueue.flush(e);
    };
    const T = new class Results {
        constructor() {
            this.startPromise = b;
            this.ctx = r;
            this.host = r.doc.firstElementChild;
            this.container = a;
            this.platform = s;
            this.testHost = u;
            this.appHost = c;
            this.au = f;
            this.component = g;
            this.observerLocator = l;
            this.logger = a.get(o);
            this.hJsx = Xi.bind(r.doc);
            this.getBy = y;
            this.getAllBy = w;
            this.queryBy = k;
            this.assertText = C;
            this.assertHtml = S;
            this.assertAttr = E;
            this.assertAttrNS = j;
            this.assertValue = A;
            this.createEvent = (e, t) => new s.CustomEvent(e, t);
            this.trigger = R;
            this.type = M;
            this.scrollBy = q;
            this.flush = L;
        }
        async start() {
            await f.app({
                host: c,
                component: g
            }).start();
        }
        tearDown() {
            if (2 === ++v) {
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
            return v > 0;
        }
        get started() {
            if (b instanceof Promise) return Promise.resolve(b).then((() => this));
            return Promise.resolve(this);
        }
    };
    Zi.publish("fixture:created", T);
    return T;
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
        if (void 0 === this.u) throw new Error("Builder is not ready, missing template, call .html()/.html`` first");
        return tr("string" === typeof this.u ? this.u : nr(this.u, ...this.h ?? []), this.$, this.C);
    }
}

function nr(e, ...t) {
    let n = e[0];
    for (let i = 0; i < t.length; ++i) n += String(t[i]) + e[i + 1];
    return n;
}

tr.html = (e, ...t) => (new FixtureBuilder).html(e, ...t);

tr.component = e => (new FixtureBuilder).component(e);

tr.deps = (...e) => (new FixtureBuilder).deps(...e);

class MockBinding {
    constructor() {
        this.calls = [];
    }
    get(e) {
        this.trace("get", e);
        return null;
    }
    updateTarget(e) {
        this.trace("updateTarget", e);
    }
    updateSource(e) {
        this.trace("updateSource", e);
    }
    handleChange(e, t) {
        this.trace("handleChange", e, t);
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
    $bind(e) {
        this.trace("$bind", e);
    }
    $unbind() {
        this.trace("$unbind");
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
    dispose() {
        this.trace("dispose");
    }
    limit(e) {
        this.trace("limit", e);
        return {
            dispose: () => {}
        };
    }
    useScope(e) {
        this.trace("useScope", e);
    }
}

class MockBindingBehavior {
    constructor() {
        this.calls = [];
    }
    bind(e, t, ...n) {
        this.trace("bind", e, t, ...n);
    }
    unbind(e, t, ...n) {
        this.trace("unbind", e, t, ...n);
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
    handleChange(e, t) {
        this.trace(`handleChange`, e, t);
    }
    trace(e, ...t) {
        this.calls.push([ e, ...t ]);
    }
}

class MockTracingExpression {
    constructor(e) {
        this.inner = e;
        this.$kind = 28;
        this.hasBind = true;
        this.hasUnbind = true;
        this.calls = [];
    }
    evaluate(...e) {
        this.trace("evaluate", ...e);
        return u(this.inner, ...e);
    }
    assign(...e) {
        this.trace("assign", ...e);
        return c(this.inner, ...e);
    }
    bind(...e) {
        this.trace("bind", ...e);
        f(this.inner, ...e);
    }
    unbind(...e) {
        this.trace("unbind", ...e);
        h(this.inner, ...e);
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
    constructor(e, t, n) {
        this.index = e;
        this.O = t;
        this.ov = n;
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
    constructor(e, t) {
        this.index = e;
        this.j = t;
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
        this.M = void 0;
        this.q = 0;
    }
    get changes() {
        if (void 0 === this.A) return [];
        return this.A;
    }
    get proxyChanges() {
        if (void 0 === this.R) return [];
        return this.R;
    }
    get collectionChanges() {
        if (void 0 === this.M) return [];
        return this.M;
    }
    get hasChanges() {
        return void 0 !== this.A;
    }
    get hasProxyChanges() {
        return void 0 !== this.R;
    }
    get hasCollectionChanges() {
        return void 0 !== this.M;
    }
    get callCount() {
        return this.q;
    }
    handleChange(e, t) {
        if (void 0 === this.A) this.A = [ new ChangeSet(this.q++, e, t) ]; else this.A.push(new ChangeSet(this.q++, e, t));
    }
    handleCollectionChange(e, t) {
        if (void 0 === this.M) this.M = [ new CollectionChangeSet(this.q++, t) ]; else this.M.push(new CollectionChangeSet(this.q++, t));
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
        if (void 0 !== this.M) {
            this.M.forEach((e => e.dispose()));
            this.M = void 0;
        }
        this.q = 0;
    }
}

function ir(e, t, n, i) {
    var r = arguments.length, a = r < 3 ? t : null === i ? i = Object.getOwnPropertyDescriptor(t, n) : i, s;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) a = Reflect.decorate(e, t, n, i); else for (var o = e.length - 1; o >= 0; o--) if (s = e[o]) a = (r < 3 ? s(a) : r > 3 ? s(t, n, a) : s(t, n)) || a;
    return r > 3 && a && Object.defineProperty(t, n, a), a;
}

let rr = class SortValueConverter {
    toView(e, t, n = "asc") {
        if (Array.isArray(e)) {
            const i = "asc" === n ? 1 : -1;
            if (t?.length) e.sort(((e, n) => e[t] - n[t] * i)); else e.sort(((e, t) => e - t * i));
        }
        return e;
    }
};

rr = ir([ w("sort") ], rr);

let ar = class JsonValueConverter {
    toView(e) {
        return JSON.stringify(e);
    }
    fromView(e) {
        return JSON.parse(e);
    }
};

ar = ir([ w("json") ], ar);

let sr = class NameTag {};

ir([ k() ], sr.prototype, "name", void 0);

sr = ir([ C({
    name: "name-tag",
    template: `<template>\${name}</template>`,
    needsCompile: true,
    dependencies: [],
    instructions: [],
    surrogates: []
}) ], sr);

const or = [ rr, ar, sr ];

const lr = {
    register(e) {
        e.register(...or);
    }
};

function ur(e, ...t) {
    const n = {
        result: ""
    };
    const i = t.length;
    for (let r = 0; r < i; ++r) n.result = n.result + e[r] + dr(t[r], n);
    return n.result + e[i];
}

const cr = /\r?\n/g;

const fr = /\s+/g;

const hr = Object.prototype.toString;

function dr(e, t) {
    const n = hr.call(e);
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
        return `[${e.map((e => dr(e, t))).join(",")}]`;

      case "[object Event]":
        return `'${e.type}'`;

      case "[object Object]":
        {
            const n = Object.getPrototypeOf(e);
            if (!n || !n.constructor || "Object" === n.constructor.name) return pr(e, t);
            return `class ${n.constructor.name}${pr(e, t)}`;
        }

      case "[object Function]":
        if (e.name && e.name.length) return `class ${e.name}`;
        return e.toString().replace(fr, "");

      default:
        return pr(e, t);
    }
}

function pr(e, t) {
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
                    return mr(r, t);
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
        let a = r.replace(cr, "");
        if (a.length > 25) {
            const e = a.length;
            a = `${a.slice(0, 25)}...(+${e - 25})`;
        }
        t.result += a;
        return a;
    } catch (e) {
        return `error stringifying to json: ${e}`;
    }
}

function mr(e, t) {
    if (t.result.length > 100) return "(html string)";
    if (null === e) return "null";
    if (void 0 === e) return "undefined";
    if (null != e.textContent && e.textContent.length || 3 === e.nodeType || 8 === e.nodeType) {
        const t = e.textContent.replace(cr, "");
        if (t.length > 10) {
            const e = t.length;
            return `${t.slice(0, 10)}...(+${e - 10})`;
        }
        return t;
    }
    if (1 === e.nodeType) {
        if (e.innerHTML.length) {
            const t = e.innerHTML.replace(cr, "");
            if (t.length > 10) {
                const e = t.length;
                return `${t.slice(0, 10)}...(+${e - 10})`;
            }
            return t;
        }
        if ("TEMPLATE" === e.nodeName) return mr(e.content, t);
    }
    let n = "";
    for (let i = 0, r = e.childNodes.length; i < r; ++i) {
        const r = e.childNodes[i];
        n += mr(r, t);
    }
    return n;
}

function gr(e, t) {
    const n = `${e}`;
    const i = n.length;
    if (i >= t) return n;
    return n + new Array(t - i + 1).join(" ");
}

function br(e, t) {
    const n = `${e}`;
    const i = n.length;
    if (i >= t) return n;
    return new Array(t - i + 1).join(" ") + n;
}

function vr(e) {
    let t;
    if (void 0 === e || !("get" in e)) t = St(); else t = e;
    const n = {
        handles() {
            return false;
        }
    };
    i.instance(d, null).register(t);
    i.instance(p, n).register(t);
    return t.get(l);
}

function $r(e = {}, t, n) {
    return t ? m.fromParent(m.create(t), e) : m.create(e, null, n);
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
    static register(e) {
        e.register(i.singleton(this, this));
    }
    addCall(e, t, ...n) {
        this.calls.push(new Call(e, n, t, this.calls.length));
        return this;
    }
}

function yr(e, t) {
    const n = e.prototype;
    const i = A(n);
    for (const e in i) {
        const r = i[e];
        if ("constructor" !== e && "function" === typeof r.value && true === r.configurable && true === r.writable) {
            const i = r.value;
            const a = function(...n) {
                t.addCall(this, e, ...n);
                return B(i, this, n);
            };
            Reflect.defineProperty(a, "original", {
                value: i,
                writable: true,
                configurable: true,
                enumerable: false
            });
            Reflect.defineProperty(n, e, {
                value: a,
                writable: r.writable,
                configurable: r.configurable,
                enumerable: r.enumerable
            });
        } else {
            const {get: i, set: s} = r;
            let o, l;
            if (i) {
                o = function() {
                    t.addCall(this, `get ${e}`, a);
                    return B(i, this, a);
                };
                Reflect.defineProperty(o, "original", {
                    value: i
                });
            }
            if (s) {
                l = function(n) {
                    t.addCall(this, `get ${e}`, a);
                    B(s, this, [ n ]);
                };
                Reflect.defineProperty(l, "original", {
                    value: s
                });
            }
            if (i || s) Reflect.defineProperty(n, e, {
                ...r,
                get: o,
                set: l
            });
        }
    }
}

function xr(e) {
    const t = e.prototype;
    const n = A(t);
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

function wr(e) {
    return function(t) {
        yr(t, e);
    };
}

export { Bi as CSS_PROPERTIES, Call, CallCollection, ChangeSet, CollectionChangeSet, ar as JsonValueConverter, MockBinding, MockBindingBehavior, MockBrowserHistoryLocation, MockContext, MockPropertySubscriber, MockServiceLocator, MockSignaler, MockTracingExpression, MockValueConverter, wt as PLATFORM, kt as PLATFORMRegistration, Ii as PSEUDO_ELEMENTS, ProxyChangeSet, rr as SortValueConverter, SpySubscriber, lr as TestConfiguration, TestContext, ur as _, Pi as assert, St as createContainer, tr as createFixture, vr as createObserverLocator, $r as createScopeForTest, nt as createSpy, Hi as eachCartesianJoin, Ji as eachCartesianJoinAsync, Ui as eachCartesianJoinFactory, Hn as ensureTaskQueuesEmpty, ai as fail, Gi as generateCartesianProduct, Dn as getVisibleText, Di as globalAttributeNames, Yi as h, Xi as hJsx, mr as htmlStringify, Fn as inspect, Un as instructionTypeName, pr as jsonStringify, er as onFixtureCreated, br as padLeft, gr as padRight, yr as recordCalls, Ct as setPlatform, xr as stopRecordingCalls, dr as stringify, wr as trace, tt as trimFull, Vn as verifyBindingInstructionsEqual, Pn as verifyEqual };
//# sourceMappingURL=index.mjs.map
