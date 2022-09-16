"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/metadata");

const e = t.Metadata.getOwn;

const r = t.Metadata.hasOwn;

const n = t.Metadata.define;

const i = t => "function" === typeof t;

const s = t => "string" === typeof t;

const o = () => Object.create(null);

const u = {};

function l(t) {
    switch (typeof t) {
      case "number":
        return t >= 0 && (0 | t) === t;

      case "string":
        {
            const e = u[t];
            if (void 0 !== e) return e;
            const r = t.length;
            if (0 === r) return u[t] = false;
            let n = 0;
            let i = 0;
            for (;i < r; ++i) {
                n = t.charCodeAt(i);
                if (0 === i && 48 === n && r > 1 || n < 48 || n > 57) return u[t] = false;
            }
            return u[t] = true;
        }

      default:
        return false;
    }
}

function c(t) {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
}

function f(t) {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
}

const a = function() {
    let t;
    (function(t) {
        t[t["none"] = 0] = "none";
        t[t["digit"] = 1] = "digit";
        t[t["upper"] = 2] = "upper";
        t[t["lower"] = 3] = "lower";
    })(t || (t = {}));
    const e = Object.assign(o(), {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true
    });
    function r(t) {
        if ("" === t) return 0;
        if (t !== t.toUpperCase()) return 3;
        if (t !== t.toLowerCase()) return 2;
        if (true === e[t]) return 1;
        return 0;
    }
    return function(t, e) {
        const n = t.length;
        if (0 === n) return t;
        let i = false;
        let s = "";
        let o;
        let u = "";
        let l = 0;
        let c = t.charAt(0);
        let f = r(c);
        let a = 0;
        for (;a < n; ++a) {
            o = l;
            u = c;
            l = f;
            c = t.charAt(a + 1);
            f = r(c);
            if (0 === l) {
                if (s.length > 0) i = true;
            } else {
                if (!i && s.length > 0 && 2 === l) i = 3 === o || 3 === f;
                s += e(u, i);
                i = false;
            }
        }
        return s;
    };
}();

const h = function() {
    const t = o();
    function e(t, e) {
        return e ? t.toUpperCase() : t.toLowerCase();
    }
    return function(r) {
        let n = t[r];
        if (void 0 === n) n = t[r] = a(r, e);
        return n;
    };
}();

const d = function() {
    const t = o();
    return function(e) {
        let r = t[e];
        if (void 0 === r) {
            r = h(e);
            if (r.length > 0) r = r[0].toUpperCase() + r.slice(1);
            t[e] = r;
        }
        return r;
    };
}();

const p = function() {
    const t = o();
    function e(t, e) {
        return e ? `-${t.toLowerCase()}` : t.toLowerCase();
    }
    return function(r) {
        let n = t[r];
        if (void 0 === n) n = t[r] = a(r, e);
        return n;
    };
}();

function v(t) {
    const {length: e} = t;
    const r = Array(e);
    let n = 0;
    for (;n < e; ++n) r[n] = t[n];
    return r;
}

const w = {};

function g(t) {
    if (void 0 === w[t]) w[t] = 0;
    return ++w[t];
}

function x(t) {
    w[t] = 0;
}

function R(t, e, r) {
    if (void 0 === t || null === t || t === Et) if (void 0 === e || null === e || e === Et) return Et; else return r ? e.slice(0) : e; else if (void 0 === e || null === e || e === Et) return r ? t.slice(0) : t;
    const n = {};
    const i = r ? t.slice(0) : t;
    let s = t.length;
    let o = e.length;
    while (s-- > 0) n[t[s]] = true;
    let u;
    while (o-- > 0) {
        u = e[o];
        if (void 0 === n[u]) {
            i.push(u);
            n[u] = true;
        }
    }
    return i;
}

function y(t, e, r) {
    return {
        configurable: true,
        enumerable: r.enumerable,
        get() {
            const t = r.value.bind(this);
            Reflect.defineProperty(this, e, {
                value: t,
                writable: true,
                configurable: true,
                enumerable: r.enumerable
            });
            return t;
        }
    };
}

function m(...t) {
    const e = [];
    let r = 0;
    const n = t.length;
    let i = 0;
    let s;
    let o = 0;
    for (;o < n; ++o) {
        s = t[o];
        if (void 0 !== s) {
            i = s.length;
            let t = 0;
            for (;t < i; ++t) e[r++] = s[t];
        }
    }
    return e;
}

function b(...t) {
    const e = {};
    const r = t.length;
    let n;
    let i;
    let s = 0;
    for (;r > s; ++s) {
        n = t[s];
        if (void 0 !== n) for (i in n) e[i] = n[i];
    }
    return e;
}

function $(...t) {
    const e = t.length;
    let r;
    let n = 0;
    for (;e > n; ++n) {
        r = t[n];
        if (void 0 !== r) return r;
    }
    throw new Error(`No default value found`);
}

const C = function() {
    const t = Function.prototype;
    const e = Object.getPrototypeOf;
    const r = new WeakMap;
    let n = t;
    let i = 0;
    let s;
    return function(o) {
        s = r.get(o);
        if (void 0 === s) {
            r.set(o, s = [ n = o ]);
            i = 0;
            while ((n = e(n)) !== t) s[++i] = n;
        }
        return s;
    };
}();

function E(...t) {
    return Object.assign(o(), ...t);
}

const A = function() {
    const t = new WeakMap;
    let e = false;
    let r = "";
    let n = 0;
    return function(i) {
        e = t.get(i);
        if (void 0 === e) {
            r = i.toString();
            n = r.length;
            e = n >= 29 && n <= 100 && 125 === r.charCodeAt(n - 1) && r.charCodeAt(n - 2) <= 32 && 93 === r.charCodeAt(n - 3) && 101 === r.charCodeAt(n - 4) && 100 === r.charCodeAt(n - 5) && 111 === r.charCodeAt(n - 6) && 99 === r.charCodeAt(n - 7) && 32 === r.charCodeAt(n - 8) && 101 === r.charCodeAt(n - 9) && 118 === r.charCodeAt(n - 10) && 105 === r.charCodeAt(n - 11) && 116 === r.charCodeAt(n - 12) && 97 === r.charCodeAt(n - 13) && 110 === r.charCodeAt(n - 14) && 88 === r.charCodeAt(n - 15);
            t.set(i, e);
        }
        return e;
    };
}();

function j(t, e) {
    if (t instanceof Promise) return t.then(e);
    return e(t);
}

function I(...t) {
    let e;
    let r;
    let n;
    let i = 0;
    let s = t.length;
    for (;i < s; ++i) {
        e = t[i];
        if ((e = t[i]) instanceof Promise) if (void 0 === r) r = e; else if (void 0 === n) n = [ r, e ]; else n.push(e);
    }
    if (void 0 === n) return r;
    return Promise.all(n);
}

const O = "au:annotation";

const M = (t, e) => {
    if (void 0 === e) return `${O}:${t}`;
    return `${O}:${t}:${e}`;
};

const k = (t, r) => {
    const i = e(O, t);
    if (void 0 === i) n(O, [ r ], t); else i.push(r);
};

const F = Object.freeze({
    name: "au:annotation",
    appendTo: k,
    set(t, e, r) {
        n(M(e), r, t);
    },
    get: (t, r) => e(M(r), t),
    getKeys(t) {
        let r = e(O, t);
        if (void 0 === r) n(O, r = [], t);
        return r;
    },
    isKey: t => t.startsWith(O),
    keyFor: M
});

const L = "au:resource";

const U = Object.freeze({
    name: L,
    appendTo(t, r) {
        const i = e(L, t);
        if (void 0 === i) n(L, [ r ], t); else i.push(r);
    },
    has: t => r(L, t),
    getAll(t) {
        const r = e(L, t);
        if (void 0 === r) return Et; else return r.map((r => e(r, t)));
    },
    getKeys(t) {
        let r = e(L, t);
        if (void 0 === r) n(L, r = [], t);
        return r;
    },
    isKey: t => t.startsWith(L),
    keyFor(t, e) {
        if (void 0 === e) return `${L}:${t}`;
        return `${L}:${t}:${e}`;
    }
});

const S = {
    annotation: F,
    resource: U
};

const T = Object.prototype.hasOwnProperty;

function D(t, r, n, i) {
    let s = e(M(t), n);
    if (void 0 === s) {
        s = r[t];
        if (void 0 === s) {
            s = n[t];
            if (void 0 === s || !T.call(n, t)) return i();
            return s;
        }
        return s;
    }
    return s;
}

function P(t, r, n) {
    let i = e(M(t), r);
    if (void 0 === i) {
        i = r[t];
        if (void 0 === i || !T.call(r, t)) return n();
        return i;
    }
    return i;
}

function N(t, e, r) {
    const n = e[t];
    if (void 0 === n) return r();
    return n;
}

t.applyMetadataPolyfill(Reflect, false, false);

class ResolverBuilder {
    constructor(t, e) {
        this.container = t;
        this.key = e;
    }
    instance(t) {
        return this.registerResolver(0, t);
    }
    singleton(t) {
        return this.registerResolver(1, t);
    }
    transient(t) {
        return this.registerResolver(2, t);
    }
    callback(t) {
        return this.registerResolver(3, t);
    }
    cachedCallback(t) {
        return this.registerResolver(3, yt(t));
    }
    aliasTo(t) {
        return this.registerResolver(5, t);
    }
    registerResolver(t, e) {
        const {container: r, key: n} = this;
        this.container = this.key = void 0;
        return r.registerResolver(n, new Resolver(n, t, e));
    }
}

function W(t) {
    const e = t.slice();
    const r = Object.keys(t);
    const n = r.length;
    let i;
    for (let s = 0; s < n; ++s) {
        i = r[s];
        if (!l(i)) e[i] = t[i];
    }
    return e;
}

const B = {
    none(t) {
        throw Error(`AUR0002:${t.toString()}`);
    },
    singleton(t) {
        return new Resolver(t, 1, t);
    },
    transient(t) {
        return new Resolver(t, 2, t);
    }
};

class ContainerConfiguration {
    constructor(t, e) {
        this.inheritParentResources = t;
        this.defaultResolver = e;
    }
    static from(t) {
        if (void 0 === t || t === ContainerConfiguration.DEFAULT) return ContainerConfiguration.DEFAULT;
        return new ContainerConfiguration(t.inheritParentResources ?? false, t.defaultResolver ?? B.singleton);
    }
}

ContainerConfiguration.DEFAULT = ContainerConfiguration.from({});

const z = {
    createContainer(t) {
        return new Container(null, ContainerConfiguration.from(t));
    },
    getDesignParamtypes(t) {
        return e("design:paramtypes", t);
    },
    getAnnotationParamtypes(t) {
        const r = M("di:paramtypes");
        return e(r, t);
    },
    getOrCreateAnnotationParamTypes: _,
    getDependencies: Q,
    createInterface(t, e) {
        const r = i(t) ? t : e;
        const n = s(t) ? t : void 0;
        const o = function(t, e, r) {
            if (null == t || void 0 !== new.target) throw new Error(`AUR0001:${o.friendlyName}`);
            const n = _(t);
            n[r] = o;
        };
        o.$isInterface = true;
        o.friendlyName = null == n ? "(anonymous)" : n;
        if (null != r) o.register = function(t, e) {
            return r(new ResolverBuilder(t, e ?? o));
        };
        o.toString = function t() {
            return `InterfaceSymbol<${o.friendlyName}>`;
        };
        return o;
    },
    inject(...t) {
        return function(e, r, n) {
            if ("number" === typeof n) {
                const r = _(e);
                const i = t[0];
                if (void 0 !== i) r[n] = i;
            } else if (r) {
                const n = _(e.constructor);
                const i = t[0];
                if (void 0 !== i) n[r] = i;
            } else if (n) {
                const e = n.value;
                const r = _(e);
                let i;
                for (let e = 0; e < t.length; ++e) {
                    i = t[e];
                    if (void 0 !== i) r[e] = i;
                }
            } else {
                const r = _(e);
                let n;
                for (let e = 0; e < t.length; ++e) {
                    n = t[e];
                    if (void 0 !== n) r[e] = n;
                }
            }
        };
    },
    transient(t) {
        t.register = function(e) {
            const r = mt.transient(t, t);
            return r.register(e, t);
        };
        t.registerInRequestor = false;
        return t;
    },
    singleton(t, e = X) {
        t.register = function(e) {
            const r = mt.singleton(t, t);
            return r.register(e, t);
        };
        t.registerInRequestor = e.scoped;
        return t;
    }
};

function Q(t) {
    const r = M("di:dependencies");
    let s = e(r, t);
    if (void 0 === s) {
        const e = t.inject;
        if (void 0 === e) {
            const e = z.getDesignParamtypes(t);
            const r = z.getAnnotationParamtypes(t);
            if (void 0 === e) if (void 0 === r) {
                const e = Object.getPrototypeOf(t);
                if (i(e) && e !== Function.prototype) s = W(Q(e)); else s = [];
            } else s = W(r); else if (void 0 === r) s = W(e); else {
                s = W(e);
                let t = r.length;
                let n;
                let i = 0;
                for (;i < t; ++i) {
                    n = r[i];
                    if (void 0 !== n) s[i] = n;
                }
                const o = Object.keys(r);
                let u;
                i = 0;
                t = o.length;
                for (i = 0; i < t; ++i) {
                    u = o[i];
                    if (!l(u)) s[u] = r[u];
                }
            }
        } else s = W(e);
        n(r, s, t);
        k(t, r);
    }
    return s;
}

function _(t) {
    const r = M("di:paramtypes");
    let i = e(r, t);
    if (void 0 === i) {
        n(r, i = [], t);
        k(t, r);
    }
    return i;
}

const G = z.createInterface("IContainer");

const K = G;

function H(t) {
    return function(e) {
        const r = function(t, e, n) {
            z.inject(r)(t, e, n);
        };
        r.$isResolver = true;
        r.resolve = function(r, n) {
            return t(e, r, n);
        };
        return r;
    };
}

const q = z.inject;

function V(t) {
    return z.transient(t);
}

function J(t) {
    return null == t ? V : V(t);
}

const X = {
    scoped: false
};

function Y(t) {
    if (i(t)) return z.singleton(t);
    return function(e) {
        return z.singleton(e, t);
    };
}

function Z(t) {
    return function(e, r) {
        r = !!r;
        const n = function(t, e, r) {
            z.inject(n)(t, e, r);
        };
        n.$isResolver = true;
        n.resolve = function(n, i) {
            return t(e, n, i, r);
        };
        return n;
    };
}

const tt = Z(((t, e, r, n) => r.getAll(t, n)));

const et = H(((t, e, r) => () => r.get(t)));

const rt = H(((t, e, r) => {
    if (r.has(t, true)) return r.get(t); else return;
}));

function nt(t, e, r) {
    z.inject(nt)(t, e, r);
}

nt.$isResolver = true;

nt.resolve = () => {};

const it = H(((t, e, r) => (...n) => e.getFactory(t).construct(r, n)));

const st = H(((t, e, r) => {
    const n = ut(t, e, r);
    const i = new InstanceProvider(String(t), n);
    r.registerResolver(t, i, true);
    return n;
}));

const ot = H(((t, e, r) => ut(t, e, r)));

function ut(t, e, r) {
    return e.getFactory(t).construct(r);
}

var lt;

(function(t) {
    t[t["instance"] = 0] = "instance";
    t[t["singleton"] = 1] = "singleton";
    t[t["transient"] = 2] = "transient";
    t[t["callback"] = 3] = "callback";
    t[t["array"] = 4] = "array";
    t[t["alias"] = 5] = "alias";
})(lt || (lt = {}));

class Resolver {
    constructor(t, e, r) {
        this.key = t;
        this.strategy = e;
        this.state = r;
        this.resolving = false;
    }
    get $isResolver() {
        return true;
    }
    register(t, e) {
        return t.registerResolver(e || this.key, this);
    }
    resolve(t, e) {
        switch (this.strategy) {
          case 0:
            return this.state;

          case 1:
            if (this.resolving) throw new Error(`AUR0003:${this.state.name}`);
            this.resolving = true;
            this.state = t.getFactory(this.state).construct(e);
            this.strategy = 0;
            this.resolving = false;
            return this.state;

          case 2:
            {
                const r = t.getFactory(this.state);
                if (null === r) throw new Error(`AUR0004:${String(this.key)}`);
                return r.construct(e);
            }

          case 3:
            return this.state(t, e, this);

          case 4:
            return this.state[0].resolve(t, e);

          case 5:
            return e.get(this.state);

          default:
            throw new Error(`AUR0005:${this.strategy}`);
        }
    }
    getFactory(t) {
        switch (this.strategy) {
          case 1:
          case 2:
            return t.getFactory(this.state);

          case 5:
            return t.getResolver(this.state)?.getFactory?.(t) ?? null;

          default:
            return null;
        }
    }
}

function ct(t) {
    return this.get(t);
}

function ft(t, e) {
    return e(t);
}

class Factory {
    constructor(t, e) {
        this.Type = t;
        this.dependencies = e;
        this.transformers = null;
    }
    construct(t, e) {
        let r;
        if (void 0 === e) r = new this.Type(...this.dependencies.map(ct, t)); else r = new this.Type(...this.dependencies.map(ct, t), ...e);
        if (null == this.transformers) return r;
        return this.transformers.reduce(ft, r);
    }
    registerTransformer(t) {
        (this.transformers ?? (this.transformers = [])).push(t);
    }
}

const at = {
    $isResolver: true,
    resolve(t, e) {
        return e;
    }
};

function ht(t) {
    return i(t.register);
}

function dt(t) {
    return ht(t) && "boolean" === typeof t.registerInRequestor;
}

function pt(t) {
    return dt(t) && t.registerInRequestor;
}

function vt(t) {
    return void 0 !== t.prototype;
}

function wt(t) {
    return s(t) && t.indexOf(":") > 0;
}

const gt = new Set([ "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Number", "Object", "Promise", "RangeError", "ReferenceError", "RegExp", "Set", "SharedArrayBuffer", "String", "SyntaxError", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URIError", "WeakMap", "WeakSet" ]);

let xt = 0;

class Container {
    constructor(t, e) {
        this.parent = t;
        this.config = e;
        this.id = ++xt;
        this.t = 0;
        this.i = new Map;
        if (null === t) {
            this.root = this;
            this.u = new Map;
            this.h = new Map;
            this.res = o();
        } else {
            this.root = t.root;
            this.u = new Map;
            this.h = t.h;
            if (e.inheritParentResources) this.res = Object.assign(o(), t.res, this.root.res); else this.res = o();
        }
        this.u.set(G, at);
    }
    get depth() {
        return null === this.parent ? 0 : this.parent.depth + 1;
    }
    register(...e) {
        if (100 === ++this.t) throw new Error(`AUR0006:${e.map(String)}`);
        let r;
        let n;
        let i;
        let s;
        let o;
        let u = 0;
        let l = e.length;
        for (;u < l; ++u) {
            r = e[u];
            if (!t.isObject(r)) continue;
            if (ht(r)) r.register(this); else if (S.resource.has(r)) {
                const t = S.resource.getAll(r);
                if (1 === t.length) t[0].register(this); else {
                    s = 0;
                    o = t.length;
                    while (o > s) {
                        t[s].register(this);
                        ++s;
                    }
                }
            } else if (vt(r)) mt.singleton(r, r).register(this); else {
                n = Object.keys(r);
                s = 0;
                o = n.length;
                for (;s < o; ++s) {
                    i = r[n[s]];
                    if (!t.isObject(i)) continue;
                    if (ht(i)) i.register(this); else this.register(i);
                }
            }
        }
        --this.t;
        return this;
    }
    registerResolver(t, e, r = false) {
        bt(t);
        const n = this.u;
        const i = n.get(t);
        if (null == i) {
            n.set(t, e);
            if (wt(t)) {
                if (void 0 !== this.res[t]) throw new Error(`AUR0007:${t}`);
                this.res[t] = e;
            }
        } else if (i instanceof Resolver && 4 === i.strategy) i.state.push(e); else n.set(t, new Resolver(t, 4, [ i, e ]));
        if (r) this.i.set(t, e);
        return e;
    }
    registerTransformer(t, e) {
        const r = this.getResolver(t);
        if (null == r) return false;
        if (r.getFactory) {
            const t = r.getFactory(this);
            if (null == t) return false;
            t.registerTransformer(e);
            return true;
        }
        return false;
    }
    getResolver(t, e = true) {
        bt(t);
        if (void 0 !== t.resolve) return t;
        let r = this;
        let n;
        while (null != r) {
            n = r.u.get(t);
            if (null == n) {
                if (null == r.parent) {
                    const n = pt(t) ? this : r;
                    return e ? this.R(t, n) : null;
                }
                r = r.parent;
            } else return n;
        }
        return null;
    }
    has(t, e = false) {
        return this.u.has(t) ? true : e && null != this.parent ? this.parent.has(t, true) : false;
    }
    get(t) {
        bt(t);
        if (t.$isResolver) return t.resolve(this, this);
        let e = this;
        let r;
        while (null != e) {
            r = e.u.get(t);
            if (null == r) {
                if (null == e.parent) {
                    const n = pt(t) ? this : e;
                    r = this.R(t, n);
                    return r.resolve(e, this);
                }
                e = e.parent;
            } else return r.resolve(e, this);
        }
        throw new Error(`AUR0008:${String(t)}`);
    }
    getAll(t, e = false) {
        bt(t);
        const r = this;
        let n = r;
        let i;
        if (e) {
            let e = Et;
            while (null != n) {
                i = n.u.get(t);
                if (null != i) e = e.concat($t(i, n, r));
                n = n.parent;
            }
            return e;
        } else while (null != n) {
            i = n.u.get(t);
            if (null == i) {
                n = n.parent;
                if (null == n) return Et;
            } else return $t(i, n, r);
        }
        return Et;
    }
    invoke(t, e) {
        if (A(t)) throw Ct(t);
        if (void 0 === e) return new t(...Q(t).map(ct, this)); else return new t(...Q(t).map(ct, this), ...e);
    }
    getFactory(t) {
        let e = this.h.get(t);
        if (void 0 === e) {
            if (A(t)) throw Ct(t);
            this.h.set(t, e = new Factory(t, Q(t)));
        }
        return e;
    }
    registerFactory(t, e) {
        this.h.set(t, e);
    }
    createChild(t) {
        if (void 0 === t && this.config.inheritParentResources) {
            if (this.config === ContainerConfiguration.DEFAULT) return new Container(this, this.config);
            return new Container(this, ContainerConfiguration.from({
                ...this.config,
                inheritParentResources: false
            }));
        }
        return new Container(this, ContainerConfiguration.from(t ?? this.config));
    }
    disposeResolvers() {
        const t = this.u;
        const e = this.i;
        let r;
        let n;
        for ([n, r] of e.entries()) {
            r.dispose();
            t.delete(n);
        }
        e.clear();
    }
    find(t, r) {
        const n = t.keyFrom(r);
        let s = this.res[n];
        if (void 0 === s) {
            s = this.root.res[n];
            if (void 0 === s) return null;
        }
        if (null === s) return null;
        if (i(s.getFactory)) {
            const r = s.getFactory(this);
            if (null === r || void 0 === r) return null;
            const n = e(t.name, r.Type);
            if (void 0 === n) return null;
            return n;
        }
        return null;
    }
    create(t, e) {
        const r = t.keyFrom(e);
        let n = this.res[r];
        if (void 0 === n) {
            n = this.root.res[r];
            if (void 0 === n) return null;
            return n.resolve(this.root, this) ?? null;
        }
        return n.resolve(this, this) ?? null;
    }
    dispose() {
        if (this.i.size > 0) this.disposeResolvers();
        this.u.clear();
    }
    R(t, e) {
        if (!i(t)) throw new Error(`AUR0009:${t}`);
        if (gt.has(t.name)) throw new Error(`AUR0010:${t.name}`);
        if (ht(t)) {
            const r = t.register(e, t);
            if (!(r instanceof Object) || null == r.resolve) {
                const r = e.u.get(t);
                if (null != r) return r;
                throw new Error(`AUR0011`);
            }
            return r;
        } else if (S.resource.has(t)) {
            const r = S.resource.getAll(t);
            if (1 === r.length) r[0].register(e); else {
                const t = r.length;
                for (let n = 0; n < t; ++n) r[n].register(e);
            }
            const n = e.u.get(t);
            if (null != n) return n;
            throw new Error(`AUR0011`);
        } else if (t.$isInterface) throw new Error(`AUR0012:${t.friendlyName}`); else {
            const r = this.config.defaultResolver(t, e);
            e.u.set(t, r);
            return r;
        }
    }
}

class ParameterizedRegistry {
    constructor(t, e) {
        this.key = t;
        this.params = e;
    }
    register(t) {
        if (t.has(this.key, true)) {
            const e = t.get(this.key);
            e.register(t, ...this.params);
        } else t.register(...this.params.filter((t => "object" === typeof t)));
    }
}

const Rt = new WeakMap;

function yt(t) {
    return function(e, r, n) {
        let i = Rt.get(e);
        if (void 0 === i) Rt.set(e, i = new WeakMap);
        if (i.has(n)) return i.get(n);
        const s = t(e, r, n);
        i.set(n, s);
        return s;
    };
}

const mt = {
    instance(t, e) {
        return new Resolver(t, 0, e);
    },
    singleton(t, e) {
        return new Resolver(t, 1, e);
    },
    transient(t, e) {
        return new Resolver(t, 2, e);
    },
    callback(t, e) {
        return new Resolver(t, 3, e);
    },
    cachedCallback(t, e) {
        return new Resolver(t, 3, yt(e));
    },
    aliasTo(t, e) {
        return new Resolver(e, 5, t);
    },
    defer(t, ...e) {
        return new ParameterizedRegistry(t, e);
    }
};

class InstanceProvider {
    constructor(t, e) {
        this.$ = null;
        this.C = t;
        if (void 0 !== e) this.$ = e;
    }
    get friendlyName() {
        return this.C;
    }
    prepare(t) {
        this.$ = t;
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        if (null == this.$) throw new Error(`AUR0013:${this.C}`);
        return this.$;
    }
    dispose() {
        this.$ = null;
    }
}

function bt(t) {
    if (null === t || void 0 === t) throw new Error(`AUR0014`);
}

function $t(t, e, r) {
    if (t instanceof Resolver && 4 === t.strategy) {
        const n = t.state;
        let i = n.length;
        const s = new Array(i);
        while (i--) s[i] = n[i].resolve(e, r);
        return s;
    }
    return [ t.resolve(e, r) ];
}

function Ct(t) {
    return new Error(`AUR0015:${t.name}`);
}

const Et = Object.freeze([]);

const At = Object.freeze({});

function jt() {}

const It = z.createInterface("IPlatform");

function Ot(t, e, r, n) {
    var i = arguments.length, s = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(t, e, r, n); else for (var u = t.length - 1; u >= 0; u--) if (o = t[u]) s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s;
    return i > 3 && s && Object.defineProperty(e, r, s), s;
}

function Mt(t, e) {
    return function(r, n) {
        e(r, n, t);
    };
}

exports.LogLevel = void 0;

(function(t) {
    t[t["trace"] = 0] = "trace";
    t[t["debug"] = 1] = "debug";
    t[t["info"] = 2] = "info";
    t[t["warn"] = 3] = "warn";
    t[t["error"] = 4] = "error";
    t[t["fatal"] = 5] = "fatal";
    t[t["none"] = 6] = "none";
})(exports.LogLevel || (exports.LogLevel = {}));

exports.ColorOptions = void 0;

(function(t) {
    t[t["noColors"] = 0] = "noColors";
    t[t["colors"] = 1] = "colors";
})(exports.ColorOptions || (exports.ColorOptions = {}));

const kt = z.createInterface("ILogConfig", (t => t.instance(new LogConfig(0, 3))));

const Ft = z.createInterface("ISink");

const Lt = z.createInterface("ILogEventFactory", (t => t.singleton(exports.DefaultLogEventFactory)));

const Ut = z.createInterface("ILogger", (t => t.singleton(exports.DefaultLogger)));

const St = z.createInterface("ILogScope");

const Tt = Object.freeze({
    key: M("logger-sink-handles"),
    define(t, e) {
        n(this.key, e.handles, t.prototype);
        return t;
    },
    getHandles(e) {
        return t.Metadata.get(this.key, e);
    }
});

function Dt(t) {
    return function(e) {
        return Tt.define(e, t);
    };
}

const Pt = E({
    red(t) {
        return `[31m${t}[39m`;
    },
    green(t) {
        return `[32m${t}[39m`;
    },
    yellow(t) {
        return `[33m${t}[39m`;
    },
    blue(t) {
        return `[34m${t}[39m`;
    },
    magenta(t) {
        return `[35m${t}[39m`;
    },
    cyan(t) {
        return `[36m${t}[39m`;
    },
    white(t) {
        return `[37m${t}[39m`;
    },
    grey(t) {
        return `[90m${t}[39m`;
    }
});

class LogConfig {
    constructor(t, e) {
        this.colorOptions = t;
        this.level = e;
    }
}

const Nt = function() {
    const t = [ E({
        TRC: "TRC",
        DBG: "DBG",
        INF: "INF",
        WRN: "WRN",
        ERR: "ERR",
        FTL: "FTL",
        QQQ: "???"
    }), E({
        TRC: Pt.grey("TRC"),
        DBG: Pt.grey("DBG"),
        INF: Pt.white("INF"),
        WRN: Pt.yellow("WRN"),
        ERR: Pt.red("ERR"),
        FTL: Pt.red("FTL"),
        QQQ: Pt.grey("???")
    }) ];
    return function(e, r) {
        if (e <= 0) return t[r].TRC;
        if (e <= 1) return t[r].DBG;
        if (e <= 2) return t[r].INF;
        if (e <= 3) return t[r].WRN;
        if (e <= 4) return t[r].ERR;
        if (e <= 5) return t[r].FTL;
        return t[r].QQQ;
    };
}();

function Wt(t, e) {
    if (0 === e) return t.join(".");
    return t.map(Pt.cyan).join(".");
}

function Bt(t, e) {
    if (0 === e) return new Date(t).toISOString();
    return Pt.grey(new Date(t).toISOString());
}

class DefaultLogEvent {
    constructor(t, e, r, n, i, s) {
        this.severity = t;
        this.message = e;
        this.optionalParams = r;
        this.scope = n;
        this.colorOptions = i;
        this.timestamp = s;
    }
    toString() {
        const {severity: t, message: e, scope: r, colorOptions: n, timestamp: i} = this;
        if (0 === r.length) return `${Bt(i, n)} [${Nt(t, n)}] ${e}`;
        return `${Bt(i, n)} [${Nt(t, n)} ${Wt(r, n)}] ${e}`;
    }
}

exports.DefaultLogEventFactory = class DefaultLogEventFactory {
    constructor(t) {
        this.config = t;
    }
    createLogEvent(t, e, r, n) {
        return new DefaultLogEvent(e, r, n, t.scope, this.config.colorOptions, Date.now());
    }
};

exports.DefaultLogEventFactory = Ot([ Mt(0, kt) ], exports.DefaultLogEventFactory);

exports.ConsoleSink = class ConsoleSink {
    constructor(t) {
        const e = t.console;
        this.handleEvent = function t(r) {
            const n = r.optionalParams;
            if (void 0 === n || 0 === n.length) {
                const t = r.toString();
                switch (r.severity) {
                  case 0:
                  case 1:
                    return e.debug(t);

                  case 2:
                    return e.info(t);

                  case 3:
                    return e.warn(t);

                  case 4:
                  case 5:
                    return e.error(t);
                }
            } else {
                let t = r.toString();
                let i = 0;
                while (t.includes("%s")) t = t.replace("%s", String(n[i++]));
                switch (r.severity) {
                  case 0:
                  case 1:
                    return e.debug(t, ...n.slice(i));

                  case 2:
                    return e.info(t, ...n.slice(i));

                  case 3:
                    return e.warn(t, ...n.slice(i));

                  case 4:
                  case 5:
                    return e.error(t, ...n.slice(i));
                }
            }
        };
    }
    static register(t) {
        mt.singleton(Ft, ConsoleSink).register(t);
    }
};

exports.ConsoleSink = Ot([ Mt(0, It) ], exports.ConsoleSink);

exports.DefaultLogger = class DefaultLogger {
    constructor(t, e, r, n = [], i = null) {
        this.config = t;
        this.factory = e;
        this.scope = n;
        this.scopedLoggers = o();
        let s;
        let u;
        let l;
        let c;
        let f;
        let a;
        if (null === i) {
            this.root = this;
            this.parent = this;
            s = this.traceSinks = [];
            u = this.debugSinks = [];
            l = this.infoSinks = [];
            c = this.warnSinks = [];
            f = this.errorSinks = [];
            a = this.fatalSinks = [];
            for (const t of r) {
                const e = Tt.getHandles(t);
                if (e?.includes(0) ?? true) s.push(t);
                if (e?.includes(1) ?? true) u.push(t);
                if (e?.includes(2) ?? true) l.push(t);
                if (e?.includes(3) ?? true) c.push(t);
                if (e?.includes(4) ?? true) f.push(t);
                if (e?.includes(5) ?? true) a.push(t);
            }
        } else {
            this.root = i.root;
            this.parent = i;
            s = this.traceSinks = i.traceSinks;
            u = this.debugSinks = i.debugSinks;
            l = this.infoSinks = i.infoSinks;
            c = this.warnSinks = i.warnSinks;
            f = this.errorSinks = i.errorSinks;
            a = this.fatalSinks = i.fatalSinks;
        }
    }
    trace(t, ...e) {
        if (this.config.level <= 0) this.emit(this.traceSinks, 0, t, e);
    }
    debug(t, ...e) {
        if (this.config.level <= 1) this.emit(this.debugSinks, 1, t, e);
    }
    info(t, ...e) {
        if (this.config.level <= 2) this.emit(this.infoSinks, 2, t, e);
    }
    warn(t, ...e) {
        if (this.config.level <= 3) this.emit(this.warnSinks, 3, t, e);
    }
    error(t, ...e) {
        if (this.config.level <= 4) this.emit(this.errorSinks, 4, t, e);
    }
    fatal(t, ...e) {
        if (this.config.level <= 5) this.emit(this.fatalSinks, 5, t, e);
    }
    scopeTo(t) {
        const e = this.scopedLoggers;
        let r = e[t];
        if (void 0 === r) r = e[t] = new DefaultLogger(this.config, this.factory, void 0, this.scope.concat(t), this);
        return r;
    }
    emit(t, e, r, n) {
        const s = i(r) ? r() : r;
        const o = this.factory.createLogEvent(this, e, s, n);
        for (let e = 0, r = t.length; e < r; ++e) t[e].handleEvent(o);
    }
};

Ot([ y ], exports.DefaultLogger.prototype, "trace", null);

Ot([ y ], exports.DefaultLogger.prototype, "debug", null);

Ot([ y ], exports.DefaultLogger.prototype, "info", null);

Ot([ y ], exports.DefaultLogger.prototype, "warn", null);

Ot([ y ], exports.DefaultLogger.prototype, "error", null);

Ot([ y ], exports.DefaultLogger.prototype, "fatal", null);

exports.DefaultLogger = Ot([ Mt(0, kt), Mt(1, Lt), Mt(2, tt(Ft)), Mt(3, rt(St)), Mt(4, nt) ], exports.DefaultLogger);

const zt = E({
    create({level: t = 3, colorOptions: e = 0, sinks: r = []} = {}) {
        return E({
            register(n) {
                n.register(mt.instance(kt, new LogConfig(e, t)));
                for (const t of r) if (i(t)) n.register(mt.singleton(Ft, t)); else n.register(t);
                return n;
            }
        });
    }
});

const Qt = z.createInterface((t => t.singleton(ModuleLoader)));

function _t(t) {
    return t;
}

class ModuleTransformer {
    constructor(t) {
        this.$transform = t;
        this.A = new Map;
        this.j = new Map;
    }
    transform(t) {
        if (t instanceof Promise) return this.I(t); else if ("object" === typeof t && null !== t) return this.O(t); else throw new Error(`Invalid input: ${String(t)}. Expected Promise or Object.`);
    }
    I(t) {
        if (this.A.has(t)) return this.A.get(t);
        const e = t.then((t => this.O(t)));
        this.A.set(t, e);
        void e.then((e => {
            this.A.set(t, e);
        }));
        return e;
    }
    O(t) {
        if (this.j.has(t)) return this.j.get(t);
        const e = this.$transform(this.M(t));
        this.j.set(t, e);
        if (e instanceof Promise) void e.then((e => {
            this.j.set(t, e);
        }));
        return e;
    }
    M(t) {
        if (null == t) throw new Error(`Invalid input: ${String(t)}. Expected Object.`);
        if ("object" !== typeof t) return new AnalyzedModule(t, []);
        let e;
        let r;
        let n;
        let s;
        const o = [];
        for (const u in t) {
            switch (typeof (e = t[u])) {
              case "object":
                if (null === e) continue;
                r = i(e.register);
                n = false;
                s = Et;
                break;

              case "function":
                r = i(e.register);
                n = void 0 !== e.prototype;
                s = S.resource.getAll(e);
                break;

              default:
                continue;
            }
            o.push(new ModuleItem(u, e, r, n, s));
        }
        return new AnalyzedModule(t, o);
    }
}

class ModuleLoader {
    constructor() {
        this.transformers = new Map;
    }
    load(t, e = _t) {
        const r = this.transformers;
        let n = r.get(e);
        if (void 0 === n) r.set(e, n = new ModuleTransformer(e));
        return n.transform(t);
    }
    dispose() {
        this.transformers.clear();
    }
}

class AnalyzedModule {
    constructor(t, e) {
        this.raw = t;
        this.items = e;
    }
}

class ModuleItem {
    constructor(t, e, r, n, i) {
        this.key = t;
        this.value = e;
        this.isRegistry = r;
        this.isConstructable = n;
        this.definitions = i;
    }
}

class Handler {
    constructor(t, e) {
        this.messageType = t;
        this.callback = e;
    }
    handle(t) {
        if (t instanceof this.messageType) this.callback.call(null, t);
    }
}

const Gt = z.createInterface("IEventAggregator", (t => t.singleton(EventAggregator)));

class EventAggregator {
    constructor() {
        this.eventLookup = {};
        this.messageHandlers = [];
    }
    publish(t, e) {
        if (!t) throw new Error(`Invalid channel name or instance: ${t}.`);
        if (s(t)) {
            let r = this.eventLookup[t];
            if (void 0 !== r) {
                r = r.slice();
                let n = r.length;
                while (n-- > 0) r[n](e, t);
            }
        } else {
            const e = this.messageHandlers.slice();
            let r = e.length;
            while (r-- > 0) e[r].handle(t);
        }
    }
    subscribe(t, e) {
        if (!t) throw new Error(`Invalid channel name or type: ${t}.`);
        let r;
        let n;
        if (s(t)) {
            if (void 0 === this.eventLookup[t]) this.eventLookup[t] = [];
            r = e;
            n = this.eventLookup[t];
        } else {
            r = new Handler(t, e);
            n = this.messageHandlers;
        }
        n.push(r);
        return {
            dispose() {
                const t = n.indexOf(r);
                if (-1 !== t) n.splice(t, 1);
            }
        };
    }
    subscribeOnce(t, e) {
        const r = this.subscribe(t, (function(t, n) {
            r.dispose();
            e(t, n);
        }));
        return r;
    }
}

exports.AnalyzedModule = AnalyzedModule;

exports.ContainerConfiguration = ContainerConfiguration;

exports.DI = z;

exports.DefaultLogEvent = DefaultLogEvent;

exports.DefaultResolver = B;

exports.EventAggregator = EventAggregator;

exports.IContainer = G;

exports.IEventAggregator = Gt;

exports.ILogConfig = kt;

exports.ILogEventFactory = Lt;

exports.ILogger = Ut;

exports.IModuleLoader = Qt;

exports.IPlatform = It;

exports.IServiceLocator = K;

exports.ISink = Ft;

exports.InstanceProvider = InstanceProvider;

exports.LogConfig = LogConfig;

exports.LoggerConfiguration = zt;

exports.ModuleItem = ModuleItem;

exports.Protocol = S;

exports.Registration = mt;

exports.all = tt;

exports.bound = y;

exports.camelCase = h;

exports.emptyArray = Et;

exports.emptyObject = At;

exports.factory = it;

exports.firstDefined = $;

exports.format = Pt;

exports.fromAnnotationOrDefinitionOrTypeOrDefault = D;

exports.fromAnnotationOrTypeOrDefault = P;

exports.fromDefinitionOrDefault = N;

exports.getPrototypeChain = C;

exports.ignore = nt;

exports.inject = q;

exports.isArrayIndex = l;

exports.isNativeFunction = A;

exports.isNumberOrBigInt = c;

exports.isStringOrDate = f;

exports.kebabCase = p;

exports.lazy = et;

exports.mergeArrays = m;

exports.mergeDistinct = R;

exports.mergeObjects = b;

exports.newInstanceForScope = st;

exports.newInstanceOf = ot;

exports.nextId = g;

exports.noop = jt;

exports.onResolve = j;

exports.optional = rt;

exports.pascalCase = d;

exports.resetId = x;

exports.resolveAll = I;

exports.singleton = Y;

exports.sink = Dt;

exports.toArray = v;

exports.transient = J;
//# sourceMappingURL=index.cjs.map
