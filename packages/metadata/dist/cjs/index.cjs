"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function t(t) {
    return "object" === typeof t && null !== t || "function" === typeof t;
}

function e(t) {
    return null === t || void 0 === t;
}

let n = new WeakMap;

function r(t, e, n, r, o) {
    return new TypeError(`${t}(${e.map(String).join(",")}) - Expected '${n}' to be of type ${o}, but got: ${Object.prototype.toString.call(r)} (${String(r)})`);
}

function o(t) {
    switch (typeof t) {
      case "undefined":
      case "string":
      case "symbol":
        return t;

      default:
        return `${t}`;
    }
}

function a(t) {
    switch (typeof t) {
      case "string":
      case "symbol":
        return t;

      default:
        return `${t}`;
    }
}

function u(t) {
    switch (typeof t) {
      case "undefined":
      case "string":
      case "symbol":
        return t;

      default:
        throw new TypeError(`Invalid metadata propertyKey: ${t}.`);
    }
}

function i(t, e, r) {
    let o = n.get(t);
    if (void 0 === o) {
        if (!r) return;
        o = new Map;
        n.set(t, o);
    }
    let a = o.get(e);
    if (void 0 === a) {
        if (!r) return;
        a = new Map;
        o.set(e, a);
    }
    return a;
}

function c(t, e, n) {
    const r = i(e, n, false);
    if (void 0 === r) return false;
    return r.has(t);
}

function f(t, e, n) {
    if (c(t, e, n)) return true;
    const r = Object.getPrototypeOf(e);
    if (null !== r) return f(t, r, n);
    return false;
}

function s(t, e, n) {
    const r = i(e, n, false);
    if (void 0 === r) return;
    return r.get(t);
}

function d(t, e, n) {
    if (c(t, e, n)) return s(t, e, n);
    const r = Object.getPrototypeOf(e);
    if (null !== r) return d(t, r, n);
    return;
}

function l(t, e, n, r) {
    const o = i(n, r, true);
    o.set(t, e);
}

function w(t, e) {
    const n = [];
    const r = i(t, e, false);
    if (void 0 === r) return n;
    const o = r.keys();
    let a = 0;
    for (const t of o) {
        n[a] = t;
        ++a;
    }
    return n;
}

function g(t, e) {
    const n = w(t, e);
    const r = Object.getPrototypeOf(t);
    if (null === r) return n;
    const o = g(r, e);
    const a = n.length;
    if (0 === a) return o;
    const u = o.length;
    if (0 === u) return n;
    const i = new Set;
    const c = [];
    let f = 0;
    let s;
    for (let t = 0; t < a; ++t) {
        s = n[t];
        if (!i.has(s)) {
            i.add(s);
            c[f] = s;
            ++f;
        }
    }
    for (let t = 0; t < u; ++t) {
        s = o[t];
        if (!i.has(s)) {
            i.add(s);
            c[f] = s;
            ++f;
        }
    }
    return c;
}

function M(t, e, n) {
    const r = i(t, n, false);
    if (void 0 === r) return false;
    return r.delete(e);
}

function h(e, n) {
    function o(o, a) {
        if (!t(o)) throw r("@metadata", [ e, n, o, a ], "target", o, "Object or Function");
        l(e, n, o, u(a));
    }
    return o;
}

function O(n, o, u, i) {
    if (void 0 !== u) {
        if (!Array.isArray(n)) throw r("Metadata.decorate", [ n, o, u, i ], "decorators", n, "Array");
        if (!t(o)) throw r("Metadata.decorate", [ n, o, u, i ], "target", o, "Object or Function");
        if (!t(i) && !e(i)) throw r("Metadata.decorate", [ n, o, u, i ], "attributes", i, "Object, Function, null, or undefined");
        if (null === i) i = void 0;
        u = a(u);
        return b(n, o, u, i);
    } else {
        if (!Array.isArray(n)) throw r("Metadata.decorate", [ n, o, u, i ], "decorators", n, "Array");
        if ("function" !== typeof o) throw r("Metadata.decorate", [ n, o, u, i ], "target", o, "Function");
        return y(n, o);
    }
}

function y(t, n) {
    for (let o = t.length - 1; o >= 0; --o) {
        const a = t[o];
        const u = a(n);
        if (!e(u)) {
            if ("function" !== typeof u) throw r("DecorateConstructor", [ t, n ], "decorated", u, "Function, null, or undefined");
            n = u;
        }
    }
    return n;
}

function b(n, o, a, u) {
    for (let i = n.length - 1; i >= 0; --i) {
        const c = n[i];
        const f = c(o, a, u);
        if (!e(f)) {
            if (!t(f)) throw r("DecorateProperty", [ n, o, a, u ], "decorated", f, "Object, Function, null, or undefined");
            u = f;
        }
    }
    return u;
}

function p(e, n, a, u) {
    if (!t(a)) throw r("Metadata.define", [ e, n, a, u ], "target", a, "Object or Function");
    return l(e, n, a, o(u));
}

function j(e, n, a) {
    if (!t(n)) throw r("Metadata.has", [ e, n, a ], "target", n, "Object or Function");
    return f(e, n, o(a));
}

function F(e, n, a) {
    if (!t(n)) throw r("Metadata.hasOwn", [ e, n, a ], "target", n, "Object or Function");
    return c(e, n, o(a));
}

function $(e, n, a) {
    if (!t(n)) throw r("Metadata.get", [ e, n, a ], "target", n, "Object or Function");
    return d(e, n, o(a));
}

function v(e, n, a) {
    if (!t(n)) throw r("Metadata.getOwn", [ e, n, a ], "target", n, "Object or Function");
    return s(e, n, o(a));
}

function K(e, n) {
    if (!t(e)) throw r("Metadata.getKeys", [ e, n ], "target", e, "Object or Function");
    return g(e, o(n));
}

function m(e, n) {
    if (!t(e)) throw r("Metadata.getOwnKeys", [ e, n ], "target", e, "Object or Function");
    return w(e, o(n));
}

function x(e, n, a) {
    if (!t(n)) throw r("Metadata.delete", [ e, n, a ], "target", n, "Object or Function");
    return M(n, e, o(a));
}

const A = {
    define: p,
    has: j,
    hasOwn: F,
    get: $,
    getOwn: v,
    getKeys: K,
    getOwnKeys: m,
    delete: x
};

function R(t, e, n, r, o) {
    if (!Reflect.defineProperty(t, e, {
        writable: r,
        enumerable: false,
        configurable: o,
        value: n
    })) throw D(`AUR1000`);
}

const E = "[[$au]]";

function S(t) {
    return E in t;
}

function U(t, e, r) {
    R(t, E, n, e, r);
    R(t, "metadata", h, e, r);
    R(t, "decorate", O, e, r);
    R(t, "defineMetadata", p, e, r);
    R(t, "hasMetadata", j, e, r);
    R(t, "hasOwnMetadata", F, e, r);
    R(t, "getMetadata", $, e, r);
    R(t, "getOwnMetadata", v, e, r);
    R(t, "getMetadataKeys", K, e, r);
    R(t, "getOwnMetadataKeys", m, e, r);
    R(t, "deleteMetadata", x, e, r);
}

function k(t, e = true, r = false, o = true, a = true) {
    if (S(t)) {
        if (t[E] === n) return;
        if (t[E] instanceof WeakMap) {
            n = t[E];
            return;
        }
        throw D(`AUR1001`);
    }
    const u = [ "metadata", "decorate", "defineMetadata", "hasMetadata", "hasOwnMetadata", "getMetadata", "getOwnMetadata", "getMetadataKeys", "getOwnMetadataKeys", "deleteMetadata" ].filter((function(t) {
        return t in Reflect;
    }));
    if (u.length > 0) {
        if (e) {
            const t = u.map((function(t) {
                const e = `${Reflect[t].toString().slice(0, 100)}...`;
                return `${t}:\n${e}`;
            })).join("\n\n");
            throw D(`AUR1002:${t}`);
        } else if (r) U(t, o, a);
    } else U(t, o, a);
}

const D = t => new Error(t);

exports.Metadata = A;

exports.applyMetadataPolyfill = k;

exports.isNullOrUndefined = e;

exports.isObject = t;

exports.metadata = h;
//# sourceMappingURL=index.cjs.map
