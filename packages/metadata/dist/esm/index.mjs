function t(t) {
    return "object" === typeof t && null !== t || "function" === typeof t;
}

function e(t) {
    return null === t || void 0 === t;
}

let n = new WeakMap;

function r(t, e, n, r, a) {
    return new TypeError(`${t}(${e.map(String).join(",")}) - Expected '${n}' to be of type ${a}, but got: ${Object.prototype.toString.call(r)} (${String(r)})`);
}

function a(t) {
    switch (typeof t) {
      case "undefined":
      case "string":
      case "symbol":
        return t;

      default:
        return `${t}`;
    }
}

function o(t) {
    switch (typeof t) {
      case "string":
      case "symbol":
        return t;

      default:
        return `${t}`;
    }
}

function i(t) {
    switch (typeof t) {
      case "undefined":
      case "string":
      case "symbol":
        return t;

      default:
        throw new TypeError(`Invalid metadata propertyKey: ${t}.`);
    }
}

function u(t, e, r) {
    let a = n.get(t);
    if (void 0 === a) {
        if (!r) return;
        a = new Map;
        n.set(t, a);
    }
    let o = a.get(e);
    if (void 0 === o) {
        if (!r) return;
        o = new Map;
        a.set(e, o);
    }
    return o;
}

function c(t, e, n) {
    const r = u(e, n, false);
    if (void 0 === r) return false;
    return r.has(t);
}

function f(t, e, n) {
    if (c(t, e, n)) return true;
    const r = Object.getPrototypeOf(e);
    if (null !== r) return f(t, r, n);
    return false;
}

function d(t, e, n) {
    const r = u(e, n, false);
    if (void 0 === r) return;
    return r.get(t);
}

function s(t, e, n) {
    if (c(t, e, n)) return d(t, e, n);
    const r = Object.getPrototypeOf(e);
    if (null !== r) return s(t, r, n);
    return;
}

function l(t, e, n, r) {
    const a = u(n, r, true);
    a.set(t, e);
}

function w(t, e) {
    const n = [];
    const r = u(t, e, false);
    if (void 0 === r) return n;
    const a = r.keys();
    let o = 0;
    for (const t of a) {
        n[o] = t;
        ++o;
    }
    return n;
}

function g(t, e) {
    const n = w(t, e);
    const r = Object.getPrototypeOf(t);
    if (null === r) return n;
    const a = g(r, e);
    const o = n.length;
    if (0 === o) return a;
    const i = a.length;
    if (0 === i) return n;
    const u = new Set;
    const c = [];
    let f = 0;
    let d;
    for (let t = 0; t < o; ++t) {
        d = n[t];
        if (!u.has(d)) {
            u.add(d);
            c[f] = d;
            ++f;
        }
    }
    for (let t = 0; t < i; ++t) {
        d = a[t];
        if (!u.has(d)) {
            u.add(d);
            c[f] = d;
            ++f;
        }
    }
    return c;
}

function M(t, e, n) {
    const r = u(t, n, false);
    if (void 0 === r) return false;
    return r.delete(e);
}

function h(e, n) {
    function a(a, o) {
        if (!t(a)) throw r("@metadata", [ e, n, a, o ], "target", a, "Object or Function");
        l(e, n, a, i(o));
    }
    return a;
}

function y(n, a, i, u) {
    if (void 0 !== i) {
        if (!Array.isArray(n)) throw r("Metadata.decorate", [ n, a, i, u ], "decorators", n, "Array");
        if (!t(a)) throw r("Metadata.decorate", [ n, a, i, u ], "target", a, "Object or Function");
        if (!t(u) && !e(u)) throw r("Metadata.decorate", [ n, a, i, u ], "attributes", u, "Object, Function, null, or undefined");
        if (null === u) u = void 0;
        i = o(i);
        return b(n, a, i, u);
    } else {
        if (!Array.isArray(n)) throw r("Metadata.decorate", [ n, a, i, u ], "decorators", n, "Array");
        if ("function" !== typeof a) throw r("Metadata.decorate", [ n, a, i, u ], "target", a, "Function");
        return O(n, a);
    }
}

function O(t, n) {
    for (let a = t.length - 1; a >= 0; --a) {
        const o = t[a];
        const i = o(n);
        if (!e(i)) {
            if ("function" !== typeof i) throw r("DecorateConstructor", [ t, n ], "decorated", i, "Function, null, or undefined");
            n = i;
        }
    }
    return n;
}

function b(n, a, o, i) {
    for (let u = n.length - 1; u >= 0; --u) {
        const c = n[u];
        const f = c(a, o, i);
        if (!e(f)) {
            if (!t(f)) throw r("DecorateProperty", [ n, a, o, i ], "decorated", f, "Object, Function, null, or undefined");
            i = f;
        }
    }
    return i;
}

function p(e, n, o, i) {
    if (!t(o)) throw r("Metadata.define", [ e, n, o, i ], "target", o, "Object or Function");
    return l(e, n, o, a(i));
}

function j(e, n, o) {
    if (!t(n)) throw r("Metadata.has", [ e, n, o ], "target", n, "Object or Function");
    return f(e, n, a(o));
}

function F(e, n, o) {
    if (!t(n)) throw r("Metadata.hasOwn", [ e, n, o ], "target", n, "Object or Function");
    return c(e, n, a(o));
}

function $(e, n, o) {
    if (!t(n)) throw r("Metadata.get", [ e, n, o ], "target", n, "Object or Function");
    return s(e, n, a(o));
}

function v(e, n, o) {
    if (!t(n)) throw r("Metadata.getOwn", [ e, n, o ], "target", n, "Object or Function");
    return d(e, n, a(o));
}

function K(e, n) {
    if (!t(e)) throw r("Metadata.getKeys", [ e, n ], "target", e, "Object or Function");
    return g(e, a(n));
}

function m(e, n) {
    if (!t(e)) throw r("Metadata.getOwnKeys", [ e, n ], "target", e, "Object or Function");
    return w(e, a(n));
}

function A(e, n, o) {
    if (!t(n)) throw r("Metadata.delete", [ e, n, o ], "target", n, "Object or Function");
    return M(n, e, a(o));
}

const R = {
    define: p,
    has: j,
    hasOwn: F,
    get: $,
    getOwn: v,
    getKeys: K,
    getOwnKeys: m,
    delete: A
};

function E(t, e, n, r, a) {
    if (!Reflect.defineProperty(t, e, {
        writable: r,
        enumerable: false,
        configurable: a,
        value: n
    })) throw D(`AUR1000`);
}

const S = "[[$au]]";

function U(t) {
    return S in t;
}

function k(t, e, r) {
    E(t, S, n, e, r);
    E(t, "metadata", h, e, r);
    E(t, "decorate", y, e, r);
    E(t, "defineMetadata", p, e, r);
    E(t, "hasMetadata", j, e, r);
    E(t, "hasOwnMetadata", F, e, r);
    E(t, "getMetadata", $, e, r);
    E(t, "getOwnMetadata", v, e, r);
    E(t, "getMetadataKeys", K, e, r);
    E(t, "getOwnMetadataKeys", m, e, r);
    E(t, "deleteMetadata", A, e, r);
}

function x(t, e = true, r = false, a = true, o = true) {
    if (U(t)) {
        if (t[S] === n) return;
        if (t[S] instanceof WeakMap) {
            n = t[S];
            return;
        }
        throw D(`AUR1001`);
    }
    const i = [ "metadata", "decorate", "defineMetadata", "hasMetadata", "hasOwnMetadata", "getMetadata", "getOwnMetadata", "getMetadataKeys", "getOwnMetadataKeys", "deleteMetadata" ].filter((function(t) {
        return t in Reflect;
    }));
    if (i.length > 0) {
        if (e) {
            const t = i.map((function(t) {
                const e = `${Reflect[t].toString().slice(0, 100)}...`;
                return `${t}:\n${e}`;
            })).join("\n\n");
            throw D(`AUR1002:${t}`);
        } else if (r) k(t, a, o);
    } else k(t, a, o);
}

const D = t => new Error(t);

export { R as Metadata, x as applyMetadataPolyfill, e as isNullOrUndefined, t as isObject, h as metadata };
//# sourceMappingURL=index.mjs.map
