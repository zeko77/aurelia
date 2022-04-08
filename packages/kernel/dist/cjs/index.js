"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var t = require("@aurelia/metadata");

var e = require("@aurelia/platform");

const r = t.Metadata.getOwn;

const n = t.Metadata.hasOwn;

const i = t.Metadata.define;

const s = t => "function" === typeof t;

const o = t => "string" === typeof t;

const u = () => Object.create(null);

const l = {};

function c(t) {
    switch (typeof t) {
      case "number":
        return t >= 0 && (0 | t) === t;

      case "string":
        {
            const e = l[t];
            if (void 0 !== e) return e;
            const r = t.length;
            if (0 === r) return l[t] = false;
            let n = 0;
            let i = 0;
            for (;i < r; ++i) {
                n = t.charCodeAt(i);
                if (0 === i && 48 === n && r > 1 || n < 48 || n > 57) return l[t] = false;
            }
            return l[t] = true;
        }

      default:
        return false;
    }
}

function f(t) {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
}

function a(t) {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
}

const h = function() {
    let t;
    (function(t) {
        t[t["none"] = 0] = "none";
        t[t["digit"] = 1] = "digit";
        t[t["upper"] = 2] = "upper";
        t[t["lower"] = 3] = "lower";
    })(t || (t = {}));
    const e = Object.assign(u(), {
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

const d = function() {
    const t = u();
    function e(t, e) {
        return e ? t.toUpperCase() : t.toLowerCase();
    }
    return function(r) {
        let n = t[r];
        if (void 0 === n) n = t[r] = h(r, e);
        return n;
    };
}();

const v = function() {
    const t = u();
    return function(e) {
        let r = t[e];
        if (void 0 === r) {
            r = d(e);
            if (r.length > 0) r = r[0].toUpperCase() + r.slice(1);
            t[e] = r;
        }
        return r;
    };
}();

const p = function() {
    const t = u();
    function e(t, e) {
        return e ? `-${t.toLowerCase()}` : t.toLowerCase();
    }
    return function(r) {
        let n = t[r];
        if (void 0 === n) n = t[r] = h(r, e);
        return n;
    };
}();

function w(t) {
    const {length: e} = t;
    const r = Array(e);
    let n = 0;
    for (;n < e; ++n) r[n] = t[n];
    return r;
}

const g = {};

function x(t) {
    if (void 0 === g[t]) g[t] = 0;
    return ++g[t];
}

function R(t) {
    g[t] = 0;
}

function m(t, e) {
    return t - e;
}

function y(t, e, r) {
    if (void 0 === t || null === t || t === jt) if (void 0 === e || null === e || e === jt) return jt; else return r ? e.slice(0) : e; else if (void 0 === e || null === e || e === jt) return r ? t.slice(0) : t;
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

function b(t, e, r) {
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

function C(...t) {
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

function $(...t) {
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

function E(...t) {
    const e = t.length;
    let r;
    let n = 0;
    for (;e > n; ++n) {
        r = t[n];
        if (void 0 !== r) return r;
    }
    throw new Error(`No default value found`);
}

const A = function() {
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

function j(...t) {
    return Object.assign(u(), ...t);
}

const I = function() {
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

function O(t, e) {
    if (t instanceof Promise) return t.then(e);
    return e(t);
}

function M(...t) {
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

const k = "au:annotation";

const F = (t, e) => {
    if (void 0 === e) return `${k}:${t}`;
    return `${k}:${t}:${e}`;
};

const L = (t, e) => {
    const n = r(k, t);
    if (void 0 === n) i(k, [ e ], t); else n.push(e);
};

const U = Object.freeze({
    name: "au:annotation",
    appendTo: L,
    set(t, e, r) {
        i(F(e), r, t);
    },
    get: (t, e) => r(F(e), t),
    getKeys(t) {
        let e = r(k, t);
        if (void 0 === e) i(k, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(k),
    keyFor: F
});

const T = "au:resource";

const D = Object.freeze({
    name: T,
    appendTo(t, e) {
        const n = r(T, t);
        if (void 0 === n) i(T, [ e ], t); else n.push(e);
    },
    has: t => n(T, t),
    getAll(t) {
        const e = r(T, t);
        if (void 0 === e) return jt; else return e.map((e => r(e, t)));
    },
    getKeys(t) {
        let e = r(T, t);
        if (void 0 === e) i(T, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(T),
    keyFor(t, e) {
        if (void 0 === e) return `${T}:${t}`;
        return `${T}:${t}:${e}`;
    }
});

const P = {
    annotation: U,
    resource: D
};

const S = Object.prototype.hasOwnProperty;

function N(t, e, n, i) {
    let s = r(F(t), n);
    if (void 0 === s) {
        s = e[t];
        if (void 0 === s) {
            s = n[t];
            if (void 0 === s || !S.call(n, t)) return i();
            return s;
        }
        return s;
    }
    return s;
}

function W(t, e, n) {
    let i = r(F(t), e);
    if (void 0 === i) {
        i = e[t];
        if (void 0 === i || !S.call(e, t)) return n();
        return i;
    }
    return i;
}

function B(t, e, r) {
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
        return this.registerResolver(3, bt(t));
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

function z(t) {
    const e = t.slice();
    const r = Object.keys(t);
    const n = r.length;
    let i;
    for (let s = 0; s < n; ++s) {
        i = r[s];
        if (!c(i)) e[i] = t[i];
    }
    return e;
}

const Q = {
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
        var e, r;
        if (void 0 === t || t === ContainerConfiguration.DEFAULT) return ContainerConfiguration.DEFAULT;
        return new ContainerConfiguration(null !== (e = t.inheritParentResources) && void 0 !== e ? e : false, null !== (r = t.defaultResolver) && void 0 !== r ? r : Q.singleton);
    }
}

ContainerConfiguration.DEFAULT = ContainerConfiguration.from({});

const _ = {
    createContainer(t) {
        return new Container(null, ContainerConfiguration.from(t));
    },
    getDesignParamtypes(t) {
        return r("design:paramtypes", t);
    },
    getAnnotationParamtypes(t) {
        const e = F("di:paramtypes");
        return r(e, t);
    },
    getOrCreateAnnotationParamTypes: K,
    getDependencies: G,
    createInterface(t, e) {
        const r = s(t) ? t : e;
        const n = o(t) ? t : void 0;
        const i = function(t, e, r) {
            if (null == t || void 0 !== new.target) throw new Error(`AUR0001:${i.friendlyName}`);
            const n = K(t);
            n[r] = i;
        };
        i.$isInterface = true;
        i.friendlyName = null == n ? "(anonymous)" : n;
        if (null != r) i.register = function(t, e) {
            return r(new ResolverBuilder(t, null !== e && void 0 !== e ? e : i));
        };
        i.toString = function t() {
            return `InterfaceSymbol<${i.friendlyName}>`;
        };
        return i;
    },
    inject(...t) {
        return function(e, r, n) {
            if ("number" === typeof n) {
                const r = K(e);
                const i = t[0];
                if (void 0 !== i) r[n] = i;
            } else if (r) {
                const n = K(e.constructor);
                const i = t[0];
                if (void 0 !== i) n[r] = i;
            } else if (n) {
                const e = n.value;
                const r = K(e);
                let i;
                for (let e = 0; e < t.length; ++e) {
                    i = t[e];
                    if (void 0 !== i) r[e] = i;
                }
            } else {
                const r = K(e);
                let n;
                for (let e = 0; e < t.length; ++e) {
                    n = t[e];
                    if (void 0 !== n) r[e] = n;
                }
            }
        };
    },
    transient(t) {
        t.register = function e(r) {
            const n = Ct.transient(t, t);
            return n.register(r, t);
        };
        t.registerInRequestor = false;
        return t;
    },
    singleton(t, e = Z) {
        t.register = function e(r) {
            const n = Ct.singleton(t, t);
            return n.register(r, t);
        };
        t.registerInRequestor = e.scoped;
        return t;
    }
};

function G(t) {
    const e = F("di:dependencies");
    let n = r(e, t);
    if (void 0 === n) {
        const r = t.inject;
        if (void 0 === r) {
            const e = _.getDesignParamtypes(t);
            const r = _.getAnnotationParamtypes(t);
            if (void 0 === e) if (void 0 === r) {
                const e = Object.getPrototypeOf(t);
                if (s(e) && e !== Function.prototype) n = z(G(e)); else n = [];
            } else n = z(r); else if (void 0 === r) n = z(e); else {
                n = z(e);
                let t = r.length;
                let i;
                let s = 0;
                for (;s < t; ++s) {
                    i = r[s];
                    if (void 0 !== i) n[s] = i;
                }
                const o = Object.keys(r);
                let u;
                s = 0;
                t = o.length;
                for (s = 0; s < t; ++s) {
                    u = o[s];
                    if (!c(u)) n[u] = r[u];
                }
            }
        } else n = z(r);
        i(e, n, t);
        L(t, e);
    }
    return n;
}

function K(t) {
    const e = F("di:paramtypes");
    let n = r(e, t);
    if (void 0 === n) {
        i(e, n = [], t);
        L(t, e);
    }
    return n;
}

const H = _.createInterface("IContainer");

const q = H;

function V(t) {
    return function(e) {
        const r = function(t, e, n) {
            _.inject(r)(t, e, n);
        };
        r.$isResolver = true;
        r.resolve = function(r, n) {
            return t(e, r, n);
        };
        return r;
    };
}

const J = _.inject;

function X(t) {
    return _.transient(t);
}

function Y(t) {
    return null == t ? X : X(t);
}

const Z = {
    scoped: false
};

function tt(t) {
    if (s(t)) return _.singleton(t);
    return function(e) {
        return _.singleton(e, t);
    };
}

function et(t) {
    return function(e, r) {
        r = !!r;
        const n = function(t, e, r) {
            _.inject(n)(t, e, r);
        };
        n.$isResolver = true;
        n.resolve = function(n, i) {
            return t(e, n, i, r);
        };
        return n;
    };
}

const rt = et(((t, e, r, n) => r.getAll(t, n)));

const nt = V(((t, e, r) => () => r.get(t)));

const it = V(((t, e, r) => {
    if (r.has(t, true)) return r.get(t); else return;
}));

function st(t, e, r) {
    _.inject(st)(t, e, r);
}

st.$isResolver = true;

st.resolve = () => {};

const ot = V(((t, e, r) => (...n) => e.getFactory(t).construct(r, n)));

const ut = V(((t, e, r) => {
    const n = ct(t, e, r);
    const i = new InstanceProvider(String(t), n);
    r.registerResolver(t, i, true);
    return n;
}));

const lt = V(((t, e, r) => ct(t, e, r)));

function ct(t, e, r) {
    return e.getFactory(t).construct(r);
}

var ft;

(function(t) {
    t[t["instance"] = 0] = "instance";
    t[t["singleton"] = 1] = "singleton";
    t[t["transient"] = 2] = "transient";
    t[t["callback"] = 3] = "callback";
    t[t["array"] = 4] = "array";
    t[t["alias"] = 5] = "alias";
})(ft || (ft = {}));

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
        var e, r, n;
        switch (this.strategy) {
          case 1:
          case 2:
            return t.getFactory(this.state);

          case 5:
            return null !== (n = null === (r = null === (e = t.getResolver(this.state)) || void 0 === e ? void 0 : e.getFactory) || void 0 === r ? void 0 : r.call(e, t)) && void 0 !== n ? n : null;

          default:
            return null;
        }
    }
}

function at(t) {
    return this.get(t);
}

function ht(t, e) {
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
        if (void 0 === e) r = new this.Type(...this.dependencies.map(at, t)); else r = new this.Type(...this.dependencies.map(at, t), ...e);
        if (null == this.transformers) return r;
        return this.transformers.reduce(ht, r);
    }
    registerTransformer(t) {
        var e;
        (null !== (e = this.transformers) && void 0 !== e ? e : this.transformers = []).push(t);
    }
}

const dt = {
    $isResolver: true,
    resolve(t, e) {
        return e;
    }
};

function vt(t) {
    return s(t.register);
}

function pt(t) {
    return vt(t) && "boolean" === typeof t.registerInRequestor;
}

function wt(t) {
    return pt(t) && t.registerInRequestor;
}

function gt(t) {
    return void 0 !== t.prototype;
}

function xt(t) {
    return o(t) && t.indexOf(":") > 0;
}

const Rt = new Set([ "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Number", "Object", "Promise", "RangeError", "ReferenceError", "RegExp", "Set", "SharedArrayBuffer", "String", "SyntaxError", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URIError", "WeakMap", "WeakSet" ]);

let mt = 0;

class Container {
    constructor(t, e) {
        this.parent = t;
        this.config = e;
        this.id = ++mt;
        this.t = 0;
        this.i = new Map;
        if (null === t) {
            this.root = this;
            this.u = new Map;
            this.h = new Map;
            this.res = u();
        } else {
            this.root = t.root;
            this.u = new Map;
            this.h = t.h;
            if (e.inheritParentResources) this.res = Object.assign(u(), t.res, this.root.res); else this.res = u();
        }
        this.u.set(H, dt);
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
            if (vt(r)) r.register(this); else if (P.resource.has(r)) {
                const t = P.resource.getAll(r);
                if (1 === t.length) t[0].register(this); else {
                    s = 0;
                    o = t.length;
                    while (o > s) {
                        t[s].register(this);
                        ++s;
                    }
                }
            } else if (gt(r)) Ct.singleton(r, r).register(this); else {
                n = Object.keys(r);
                s = 0;
                o = n.length;
                for (;s < o; ++s) {
                    i = r[n[s]];
                    if (!t.isObject(i)) continue;
                    if (vt(i)) i.register(this); else this.register(i);
                }
            }
        }
        --this.t;
        return this;
    }
    registerResolver(t, e, r = false) {
        $t(t);
        const n = this.u;
        const i = n.get(t);
        if (null == i) {
            n.set(t, e);
            if (xt(t)) {
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
        $t(t);
        if (void 0 !== t.resolve) return t;
        let r = this;
        let n;
        while (null != r) {
            n = r.u.get(t);
            if (null == n) {
                if (null == r.parent) {
                    const n = wt(t) ? this : r;
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
        $t(t);
        if (t.$isResolver) return t.resolve(this, this);
        let e = this;
        let r;
        while (null != e) {
            r = e.u.get(t);
            if (null == r) {
                if (null == e.parent) {
                    const n = wt(t) ? this : e;
                    r = this.R(t, n);
                    return r.resolve(e, this);
                }
                e = e.parent;
            } else return r.resolve(e, this);
        }
        throw new Error(`AUR0008:${t}`);
    }
    getAll(t, e = false) {
        $t(t);
        const r = this;
        let n = r;
        let i;
        if (e) {
            let e = jt;
            while (null != n) {
                i = n.u.get(t);
                if (null != i) e = e.concat(Et(i, n, r));
                n = n.parent;
            }
            return e;
        } else while (null != n) {
            i = n.u.get(t);
            if (null == i) {
                n = n.parent;
                if (null == n) return jt;
            } else return Et(i, n, r);
        }
        return jt;
    }
    invoke(t, e) {
        if (I(t)) throw At(t);
        if (void 0 === e) return new t(...G(t).map(at, this)); else return new t(...G(t).map(at, this), ...e);
    }
    getFactory(t) {
        let e = this.h.get(t);
        if (void 0 === e) {
            if (I(t)) throw At(t);
            this.h.set(t, e = new Factory(t, G(t)));
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
        return new Container(this, ContainerConfiguration.from(null !== t && void 0 !== t ? t : this.config));
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
    find(t, e) {
        const n = t.keyFrom(e);
        let i = this.res[n];
        if (void 0 === i) {
            i = this.root.res[n];
            if (void 0 === i) return null;
        }
        if (null === i) return null;
        if (s(i.getFactory)) {
            const e = i.getFactory(this);
            if (null === e || void 0 === e) return null;
            const n = r(t.name, e.Type);
            if (void 0 === n) return null;
            return n;
        }
        return null;
    }
    create(t, e) {
        var r, n;
        const i = t.keyFrom(e);
        let s = this.res[i];
        if (void 0 === s) {
            s = this.root.res[i];
            if (void 0 === s) return null;
            return null !== (r = s.resolve(this.root, this)) && void 0 !== r ? r : null;
        }
        return null !== (n = s.resolve(this, this)) && void 0 !== n ? n : null;
    }
    dispose() {
        if (this.i.size > 0) this.disposeResolvers();
        this.u.clear();
    }
    R(t, e) {
        if (!s(t)) throw new Error(`AUR0009:${t}`);
        if (Rt.has(t.name)) throw new Error(`AUR0010:${t.name}`);
        if (vt(t)) {
            const r = t.register(e, t);
            if (!(r instanceof Object) || null == r.resolve) {
                const r = e.u.get(t);
                if (null != r) return r;
                throw new Error(`AUR0011`);
            }
            return r;
        } else if (P.resource.has(t)) {
            const r = P.resource.getAll(t);
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

const yt = new WeakMap;

function bt(t) {
    return function(e, r, n) {
        let i = yt.get(e);
        if (void 0 === i) yt.set(e, i = new WeakMap);
        if (i.has(n)) return i.get(n);
        const s = t(e, r, n);
        i.set(n, s);
        return s;
    };
}

const Ct = {
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
        return new Resolver(t, 3, bt(e));
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
        this.C = null;
        this.$ = t;
        if (void 0 !== e) this.C = e;
    }
    get friendlyName() {
        return this.$;
    }
    prepare(t) {
        this.C = t;
    }
    get $isResolver() {
        return true;
    }
    resolve() {
        if (null == this.C) throw new Error(`AUR0013:${this.$}`);
        return this.C;
    }
    dispose() {
        this.C = null;
    }
}

function $t(t) {
    if (null === t || void 0 === t) throw new Error(`AUR0014`);
}

function Et(t, e, r) {
    if (t instanceof Resolver && 4 === t.strategy) {
        const n = t.state;
        let i = n.length;
        const s = new Array(i);
        while (i--) s[i] = n[i].resolve(e, r);
        return s;
    }
    return [ t.resolve(e, r) ];
}

function At(t) {
    return new Error(`AUR0015:${t.name}`);
}

const jt = Object.freeze([]);

const It = Object.freeze({});

function Ot() {}

const Mt = _.createInterface("IPlatform");

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */ function kt(t, e, r, n) {
    var i = arguments.length, s = i < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, r) : n, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(t, e, r, n); else for (var u = t.length - 1; u >= 0; u--) if (o = t[u]) s = (i < 3 ? o(s) : i > 3 ? o(e, r, s) : o(e, r)) || s;
    return i > 3 && s && Object.defineProperty(e, r, s), s;
}

function Ft(t, e) {
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

const Lt = _.createInterface("ILogConfig", (t => t.instance(new LogConfig(0, 3))));

const Ut = _.createInterface("ISink");

const Tt = _.createInterface("ILogEventFactory", (t => t.singleton(exports.DefaultLogEventFactory)));

const Dt = _.createInterface("ILogger", (t => t.singleton(exports.DefaultLogger)));

const Pt = _.createInterface("ILogScope");

const St = Object.freeze({
    key: F("logger-sink-handles"),
    define(t, e) {
        i(this.key, e.handles, t.prototype);
        return t;
    },
    getHandles(e) {
        return t.Metadata.get(this.key, e);
    }
});

function Nt(t) {
    return function(e) {
        return St.define(e, t);
    };
}

const Wt = j({
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

const Bt = function() {
    const t = [ j({
        TRC: "TRC",
        DBG: "DBG",
        INF: "INF",
        WRN: "WRN",
        ERR: "ERR",
        FTL: "FTL",
        QQQ: "???"
    }), j({
        TRC: Wt.grey("TRC"),
        DBG: Wt.grey("DBG"),
        INF: Wt.white("INF"),
        WRN: Wt.yellow("WRN"),
        ERR: Wt.red("ERR"),
        FTL: Wt.red("FTL"),
        QQQ: Wt.grey("???")
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

function zt(t, e) {
    if (0 === e) return t.join(".");
    return t.map(Wt.cyan).join(".");
}

function Qt(t, e) {
    if (0 === e) return new Date(t).toISOString();
    return Wt.grey(new Date(t).toISOString());
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
        if (0 === r.length) return `${Qt(i, n)} [${Bt(t, n)}] ${e}`;
        return `${Qt(i, n)} [${Bt(t, n)} ${zt(r, n)}] ${e}`;
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

exports.DefaultLogEventFactory = kt([ Ft(0, Lt) ], exports.DefaultLogEventFactory);

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
        Ct.singleton(Ut, ConsoleSink).register(t);
    }
};

exports.ConsoleSink = kt([ Ft(0, Mt) ], exports.ConsoleSink);

exports.DefaultLogger = class DefaultLogger {
    constructor(t, e, r, n = [], i = null) {
        var s, o, l, c, f, a;
        this.config = t;
        this.factory = e;
        this.scope = n;
        this.scopedLoggers = u();
        let h;
        let d;
        let v;
        let p;
        let w;
        let g;
        if (null === i) {
            this.root = this;
            this.parent = this;
            h = this.traceSinks = [];
            d = this.debugSinks = [];
            v = this.infoSinks = [];
            p = this.warnSinks = [];
            w = this.errorSinks = [];
            g = this.fatalSinks = [];
            for (const t of r) {
                const e = St.getHandles(t);
                if (null !== (s = null === e || void 0 === e ? void 0 : e.includes(0)) && void 0 !== s ? s : true) h.push(t);
                if (null !== (o = null === e || void 0 === e ? void 0 : e.includes(1)) && void 0 !== o ? o : true) d.push(t);
                if (null !== (l = null === e || void 0 === e ? void 0 : e.includes(2)) && void 0 !== l ? l : true) v.push(t);
                if (null !== (c = null === e || void 0 === e ? void 0 : e.includes(3)) && void 0 !== c ? c : true) p.push(t);
                if (null !== (f = null === e || void 0 === e ? void 0 : e.includes(4)) && void 0 !== f ? f : true) w.push(t);
                if (null !== (a = null === e || void 0 === e ? void 0 : e.includes(5)) && void 0 !== a ? a : true) g.push(t);
            }
        } else {
            this.root = i.root;
            this.parent = i;
            h = this.traceSinks = i.traceSinks;
            d = this.debugSinks = i.debugSinks;
            v = this.infoSinks = i.infoSinks;
            p = this.warnSinks = i.warnSinks;
            w = this.errorSinks = i.errorSinks;
            g = this.fatalSinks = i.fatalSinks;
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
        const i = s(r) ? r() : r;
        const o = this.factory.createLogEvent(this, e, i, n);
        for (let e = 0, r = t.length; e < r; ++e) t[e].handleEvent(o);
    }
};

kt([ b ], exports.DefaultLogger.prototype, "trace", null);

kt([ b ], exports.DefaultLogger.prototype, "debug", null);

kt([ b ], exports.DefaultLogger.prototype, "info", null);

kt([ b ], exports.DefaultLogger.prototype, "warn", null);

kt([ b ], exports.DefaultLogger.prototype, "error", null);

kt([ b ], exports.DefaultLogger.prototype, "fatal", null);

exports.DefaultLogger = kt([ Ft(0, Lt), Ft(1, Tt), Ft(2, rt(Ut)), Ft(3, it(Pt)), Ft(4, st) ], exports.DefaultLogger);

const _t = j({
    create({level: t = 3, colorOptions: e = 0, sinks: r = []} = {}) {
        return j({
            register(n) {
                n.register(Ct.instance(Lt, new LogConfig(e, t)));
                for (const t of r) if (s(t)) n.register(Ct.singleton(Ut, t)); else n.register(t);
                return n;
            }
        });
    }
});

const Gt = _.createInterface((t => t.singleton(ModuleLoader)));

function Kt(t) {
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
        let e;
        let r;
        let n;
        let i;
        const o = [];
        for (const u in t) {
            switch (typeof (e = t[u])) {
              case "object":
                if (null === e) continue;
                r = s(e.register);
                n = false;
                i = jt;
                break;

              case "function":
                r = s(e.register);
                n = void 0 !== e.prototype;
                i = P.resource.getAll(e);
                break;

              default:
                continue;
            }
            o.push(new ModuleItem(u, e, r, n, i));
        }
        return new AnalyzedModule(t, o);
    }
}

class ModuleLoader {
    constructor() {
        this.transformers = new Map;
    }
    load(t, e = Kt) {
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

const Ht = _.createInterface("IEventAggregator", (t => t.singleton(EventAggregator)));

class EventAggregator {
    constructor() {
        this.eventLookup = {};
        this.messageHandlers = [];
    }
    publish(t, e) {
        if (!t) throw new Error(`Invalid channel name or instance: ${t}.`);
        if (o(t)) {
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
        if (o(t)) {
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

exports.Metadata = t.Metadata;

exports.applyMetadataPolyfill = t.applyMetadataPolyfill;

exports.isNullOrUndefined = t.isNullOrUndefined;

exports.isObject = t.isObject;

exports.metadata = t.metadata;

exports.Platform = e.Platform;

exports.Task = e.Task;

exports.TaskAbortError = e.TaskAbortError;

exports.TaskQueue = e.TaskQueue;

exports.TaskQueuePriority = e.TaskQueuePriority;

exports.TaskStatus = e.TaskStatus;

exports.AnalyzedModule = AnalyzedModule;

exports.ContainerConfiguration = ContainerConfiguration;

exports.DI = _;

exports.DefaultLogEvent = DefaultLogEvent;

exports.DefaultResolver = Q;

exports.EventAggregator = EventAggregator;

exports.IContainer = H;

exports.IEventAggregator = Ht;

exports.ILogConfig = Lt;

exports.ILogEventFactory = Tt;

exports.ILogger = Dt;

exports.IModuleLoader = Gt;

exports.IPlatform = Mt;

exports.IServiceLocator = q;

exports.ISink = Ut;

exports.InstanceProvider = InstanceProvider;

exports.LogConfig = LogConfig;

exports.LoggerConfiguration = _t;

exports.ModuleItem = ModuleItem;

exports.Protocol = P;

exports.Registration = Ct;

exports.all = rt;

exports.bound = b;

exports.camelCase = d;

exports.compareNumber = m;

exports.emptyArray = jt;

exports.emptyObject = It;

exports.factory = ot;

exports.firstDefined = E;

exports.format = Wt;

exports.fromAnnotationOrDefinitionOrTypeOrDefault = N;

exports.fromAnnotationOrTypeOrDefault = W;

exports.fromDefinitionOrDefault = B;

exports.getPrototypeChain = A;

exports.ignore = st;

exports.inject = J;

exports.isArrayIndex = c;

exports.isNativeFunction = I;

exports.isNumberOrBigInt = f;

exports.isStringOrDate = a;

exports.kebabCase = p;

exports.lazy = nt;

exports.mergeArrays = C;

exports.mergeDistinct = y;

exports.mergeObjects = $;

exports.newInstanceForScope = ut;

exports.newInstanceOf = lt;

exports.nextId = x;

exports.noop = Ot;

exports.onResolve = O;

exports.optional = it;

exports.pascalCase = v;

exports.resetId = R;

exports.resolveAll = M;

exports.singleton = tt;

exports.sink = Nt;

exports.toArray = w;

exports.transient = Y;
//# sourceMappingURL=index.js.map
