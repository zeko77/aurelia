import { Metadata as t, applyMetadataPolyfill as e, isObject as n } from "../../../metadata/dist/native-modules/index.js";

export { Metadata, applyMetadataPolyfill, isNullOrUndefined, isObject, metadata } from "../../../metadata/dist/native-modules/index.js";

export { Platform, Task, TaskAbortError, TaskQueue, TaskQueuePriority, TaskStatus } from "../../../platform/dist/native-modules/index.js";

const r = t.getOwn;

const i = t.hasOwn;

const s = t.define;

const o = t => "function" === typeof t;

const u = t => "string" === typeof t;

const l = () => Object.create(null);

const c = {};

function f(t) {
    switch (typeof t) {
      case "number":
        return t >= 0 && (0 | t) === t;

      case "string":
        {
            const e = c[t];
            if (void 0 !== e) return e;
            const n = t.length;
            if (0 === n) return c[t] = false;
            let r = 0;
            let i = 0;
            for (;i < n; ++i) {
                r = t.charCodeAt(i);
                if (0 === i && 48 === r && n > 1 || r < 48 || r > 57) return c[t] = false;
            }
            return c[t] = true;
        }

      default:
        return false;
    }
}

function a(t) {
    switch (typeof t) {
      case "number":
      case "bigint":
        return true;

      default:
        return false;
    }
}

function h(t) {
    switch (typeof t) {
      case "string":
        return true;

      case "object":
        return t instanceof Date;

      default:
        return false;
    }
}

const d = function() {
    let t;
    (function(t) {
        t[t["none"] = 0] = "none";
        t[t["digit"] = 1] = "digit";
        t[t["upper"] = 2] = "upper";
        t[t["lower"] = 3] = "lower";
    })(t || (t = {}));
    const e = Object.assign(l(), {
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
    function n(t) {
        if ("" === t) return 0;
        if (t !== t.toUpperCase()) return 3;
        if (t !== t.toLowerCase()) return 2;
        if (true === e[t]) return 1;
        return 0;
    }
    return function(t, e) {
        const r = t.length;
        if (0 === r) return t;
        let i = false;
        let s = "";
        let o;
        let u = "";
        let l = 0;
        let c = t.charAt(0);
        let f = n(c);
        let a = 0;
        for (;a < r; ++a) {
            o = l;
            u = c;
            l = f;
            c = t.charAt(a + 1);
            f = n(c);
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

const v = function() {
    const t = l();
    function e(t, e) {
        return e ? t.toUpperCase() : t.toLowerCase();
    }
    return function(n) {
        let r = t[n];
        if (void 0 === r) r = t[n] = d(n, e);
        return r;
    };
}();

const w = function() {
    const t = l();
    return function(e) {
        let n = t[e];
        if (void 0 === n) {
            n = v(e);
            if (n.length > 0) n = n[0].toUpperCase() + n.slice(1);
            t[e] = n;
        }
        return n;
    };
}();

const g = function() {
    const t = l();
    function e(t, e) {
        return e ? `-${t.toLowerCase()}` : t.toLowerCase();
    }
    return function(n) {
        let r = t[n];
        if (void 0 === r) r = t[n] = d(n, e);
        return r;
    };
}();

function m(t) {
    const {length: e} = t;
    const n = Array(e);
    let r = 0;
    for (;r < e; ++r) n[r] = t[r];
    return n;
}

const p = {};

function y(t) {
    if (void 0 === p[t]) p[t] = 0;
    return ++p[t];
}

function R(t) {
    p[t] = 0;
}

function b(t, e) {
    return t - e;
}

function C(t, e, n) {
    if (void 0 === t || null === t || t === It) if (void 0 === e || null === e || e === It) return It; else return n ? e.slice(0) : e; else if (void 0 === e || null === e || e === It) return n ? t.slice(0) : t;
    const r = {};
    const i = n ? t.slice(0) : t;
    let s = t.length;
    let o = e.length;
    while (s-- > 0) r[t[s]] = true;
    let u;
    while (o-- > 0) {
        u = e[o];
        if (void 0 === r[u]) {
            i.push(u);
            r[u] = true;
        }
    }
    return i;
}

function $(t, e, n) {
    return {
        configurable: true,
        enumerable: n.enumerable,
        get() {
            const t = n.value.bind(this);
            Reflect.defineProperty(this, e, {
                value: t,
                writable: true,
                configurable: true,
                enumerable: n.enumerable
            });
            return t;
        }
    };
}

function E(...t) {
    const e = [];
    let n = 0;
    const r = t.length;
    let i = 0;
    let s;
    let o = 0;
    for (;o < r; ++o) {
        s = t[o];
        if (void 0 !== s) {
            i = s.length;
            let t = 0;
            for (;t < i; ++t) e[n++] = s[t];
        }
    }
    return e;
}

function A(...t) {
    const e = {};
    const n = t.length;
    let r;
    let i;
    let s = 0;
    for (;n > s; ++s) {
        r = t[s];
        if (void 0 !== r) for (i in r) e[i] = r[i];
    }
    return e;
}

function j(...t) {
    const e = t.length;
    let n;
    let r = 0;
    for (;e > r; ++r) {
        n = t[r];
        if (void 0 !== n) return n;
    }
    throw new Error(`No default value found`);
}

const k = function() {
    const t = Function.prototype;
    const e = Object.getPrototypeOf;
    const n = new WeakMap;
    let r = t;
    let i = 0;
    let s;
    return function(o) {
        s = n.get(o);
        if (void 0 === s) {
            n.set(o, s = [ r = o ]);
            i = 0;
            while ((r = e(r)) !== t) s[++i] = r;
        }
        return s;
    };
}();

function I(...t) {
    return Object.assign(l(), ...t);
}

const O = function() {
    const t = new WeakMap;
    let e = false;
    let n = "";
    let r = 0;
    return function(i) {
        e = t.get(i);
        if (void 0 === e) {
            n = i.toString();
            r = n.length;
            e = r >= 29 && r <= 100 && 125 === n.charCodeAt(r - 1) && n.charCodeAt(r - 2) <= 32 && 93 === n.charCodeAt(r - 3) && 101 === n.charCodeAt(r - 4) && 100 === n.charCodeAt(r - 5) && 111 === n.charCodeAt(r - 6) && 99 === n.charCodeAt(r - 7) && 32 === n.charCodeAt(r - 8) && 101 === n.charCodeAt(r - 9) && 118 === n.charCodeAt(r - 10) && 105 === n.charCodeAt(r - 11) && 116 === n.charCodeAt(r - 12) && 97 === n.charCodeAt(r - 13) && 110 === n.charCodeAt(r - 14) && 88 === n.charCodeAt(r - 15);
            t.set(i, e);
        }
        return e;
    };
}();

function M(t, e) {
    if (t instanceof Promise) return t.then(e);
    return e(t);
}

function T(...t) {
    let e;
    let n;
    let r;
    let i = 0;
    let s = t.length;
    for (;i < s; ++i) {
        e = t[i];
        if ((e = t[i]) instanceof Promise) if (void 0 === n) n = e; else if (void 0 === r) r = [ n, e ]; else r.push(e);
    }
    if (void 0 === r) return n;
    return Promise.all(r);
}

const F = "au:annotation";

const U = (t, e) => {
    if (void 0 === e) return `${F}:${t}`;
    return `${F}:${t}:${e}`;
};

const L = (t, e) => {
    const n = r(F, t);
    if (void 0 === n) s(F, [ e ], t); else n.push(e);
};

const P = Object.freeze({
    name: "au:annotation",
    appendTo: L,
    set(t, e, n) {
        s(U(e), n, t);
    },
    get: (t, e) => r(U(e), t),
    getKeys(t) {
        let e = r(F, t);
        if (void 0 === e) s(F, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(F),
    keyFor: U
});

const D = "au:resource";

const S = Object.freeze({
    name: D,
    appendTo(t, e) {
        const n = r(D, t);
        if (void 0 === n) s(D, [ e ], t); else n.push(e);
    },
    has: t => i(D, t),
    getAll(t) {
        const e = r(D, t);
        if (void 0 === e) return It; else return e.map((e => r(e, t)));
    },
    getKeys(t) {
        let e = r(D, t);
        if (void 0 === e) s(D, e = [], t);
        return e;
    },
    isKey: t => t.startsWith(D),
    keyFor(t, e) {
        if (void 0 === e) return `${D}:${t}`;
        return `${D}:${t}:${e}`;
    }
});

const N = {
    annotation: P,
    resource: S
};

const W = Object.prototype.hasOwnProperty;

function B(t, e, n, i) {
    let s = r(U(t), n);
    if (void 0 === s) {
        s = e[t];
        if (void 0 === s) {
            s = n[t];
            if (void 0 === s || !W.call(n, t)) return i();
            return s;
        }
        return s;
    }
    return s;
}

function Q(t, e, n) {
    let i = r(U(t), e);
    if (void 0 === i) {
        i = e[t];
        if (void 0 === i || !W.call(e, t)) return n();
        return i;
    }
    return i;
}

function x(t, e, n) {
    const r = e[t];
    if (void 0 === r) return n();
    return r;
}

e(Reflect, false, false);

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
        return this.registerResolver(3, $t(t));
    }
    aliasTo(t) {
        return this.registerResolver(5, t);
    }
    registerResolver(t, e) {
        const {container: n, key: r} = this;
        this.container = this.key = void 0;
        return n.registerResolver(r, new Resolver(r, t, e));
    }
}

function z(t) {
    const e = t.slice();
    const n = Object.keys(t);
    const r = n.length;
    let i;
    for (let s = 0; s < r; ++s) {
        i = n[s];
        if (!f(i)) e[i] = t[i];
    }
    return e;
}

const G = {
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
        var e, n;
        if (void 0 === t || t === ContainerConfiguration.DEFAULT) return ContainerConfiguration.DEFAULT;
        return new ContainerConfiguration(null !== (e = t.inheritParentResources) && void 0 !== e ? e : false, null !== (n = t.defaultResolver) && void 0 !== n ? n : G.singleton);
    }
}

ContainerConfiguration.DEFAULT = ContainerConfiguration.from({});

const K = {
    createContainer(t) {
        return new Container(null, ContainerConfiguration.from(t));
    },
    getDesignParamtypes(t) {
        return r("design:paramtypes", t);
    },
    getAnnotationParamtypes(t) {
        const e = U("di:paramtypes");
        return r(e, t);
    },
    getOrCreateAnnotationParamTypes: H,
    getDependencies: _,
    createInterface(t, e) {
        const n = o(t) ? t : e;
        const r = u(t) ? t : void 0;
        const i = function(t, e, n) {
            if (null == t || void 0 !== new.target) throw new Error(`AUR0001:${i.friendlyName}`);
            const r = H(t);
            r[n] = i;
        };
        i.$isInterface = true;
        i.friendlyName = null == r ? "(anonymous)" : r;
        if (null != n) i.register = function(t, e) {
            return n(new ResolverBuilder(t, null !== e && void 0 !== e ? e : i));
        };
        i.toString = function t() {
            return `InterfaceSymbol<${i.friendlyName}>`;
        };
        return i;
    },
    inject(...t) {
        return function(e, n, r) {
            if ("number" === typeof r) {
                const n = H(e);
                const i = t[0];
                if (void 0 !== i) n[r] = i;
            } else if (n) {
                const r = H(e.constructor);
                const i = t[0];
                if (void 0 !== i) r[n] = i;
            } else if (r) {
                const e = r.value;
                const n = H(e);
                let i;
                for (let e = 0; e < t.length; ++e) {
                    i = t[e];
                    if (void 0 !== i) n[e] = i;
                }
            } else {
                const n = H(e);
                let r;
                for (let e = 0; e < t.length; ++e) {
                    r = t[e];
                    if (void 0 !== r) n[e] = r;
                }
            }
        };
    },
    transient(t) {
        t.register = function e(n) {
            const r = Et.transient(t, t);
            return r.register(n, t);
        };
        t.registerInRequestor = false;
        return t;
    },
    singleton(t, e = tt) {
        t.register = function e(n) {
            const r = Et.singleton(t, t);
            return r.register(n, t);
        };
        t.registerInRequestor = e.scoped;
        return t;
    }
};

function _(t) {
    const e = U("di:dependencies");
    let n = r(e, t);
    if (void 0 === n) {
        const r = t.inject;
        if (void 0 === r) {
            const e = K.getDesignParamtypes(t);
            const r = K.getAnnotationParamtypes(t);
            if (void 0 === e) if (void 0 === r) {
                const e = Object.getPrototypeOf(t);
                if (o(e) && e !== Function.prototype) n = z(_(e)); else n = [];
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
                    if (!f(u)) n[u] = r[u];
                }
            }
        } else n = z(r);
        s(e, n, t);
        L(t, e);
    }
    return n;
}

function H(t) {
    const e = U("di:paramtypes");
    let n = r(e, t);
    if (void 0 === n) {
        s(e, n = [], t);
        L(t, e);
    }
    return n;
}

const V = K.createInterface("IContainer");

const q = V;

function J(t) {
    return function(e) {
        const n = function(t, e, r) {
            K.inject(n)(t, e, r);
        };
        n.$isResolver = true;
        n.resolve = function(n, r) {
            return t(e, n, r);
        };
        return n;
    };
}

const X = K.inject;

function Y(t) {
    return K.transient(t);
}

function Z(t) {
    return null == t ? Y : Y(t);
}

const tt = {
    scoped: false
};

function et(t) {
    if (o(t)) return K.singleton(t);
    return function(e) {
        return K.singleton(e, t);
    };
}

function nt(t) {
    return function(e, n) {
        n = !!n;
        const r = function(t, e, n) {
            K.inject(r)(t, e, n);
        };
        r.$isResolver = true;
        r.resolve = function(r, i) {
            return t(e, r, i, n);
        };
        return r;
    };
}

const rt = nt(((t, e, n, r) => n.getAll(t, r)));

const it = J(((t, e, n) => () => n.get(t)));

const st = J(((t, e, n) => {
    if (n.has(t, true)) return n.get(t); else return;
}));

function ot(t, e, n) {
    K.inject(ot)(t, e, n);
}

ot.$isResolver = true;

ot.resolve = () => {};

const ut = J(((t, e, n) => (...r) => e.getFactory(t).construct(n, r)));

const lt = J(((t, e, n) => {
    const r = ft(t, e, n);
    const i = new InstanceProvider(String(t), r);
    n.registerResolver(t, i, true);
    return r;
}));

const ct = J(((t, e, n) => ft(t, e, n)));

function ft(t, e, n) {
    return e.getFactory(t).construct(n);
}

var at;

(function(t) {
    t[t["instance"] = 0] = "instance";
    t[t["singleton"] = 1] = "singleton";
    t[t["transient"] = 2] = "transient";
    t[t["callback"] = 3] = "callback";
    t[t["array"] = 4] = "array";
    t[t["alias"] = 5] = "alias";
})(at || (at = {}));

class Resolver {
    constructor(t, e, n) {
        this.key = t;
        this.strategy = e;
        this.state = n;
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
                const n = t.getFactory(this.state);
                if (null === n) throw new Error(`AUR0004:${String(this.key)}`);
                return n.construct(e);
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
        var e, n, r;
        switch (this.strategy) {
          case 1:
          case 2:
            return t.getFactory(this.state);

          case 5:
            return null !== (r = null === (n = null === (e = t.getResolver(this.state)) || void 0 === e ? void 0 : e.getFactory) || void 0 === n ? void 0 : n.call(e, t)) && void 0 !== r ? r : null;

          default:
            return null;
        }
    }
}

function ht(t) {
    return this.get(t);
}

function dt(t, e) {
    return e(t);
}

class Factory {
    constructor(t, e) {
        this.Type = t;
        this.dependencies = e;
        this.transformers = null;
    }
    construct(t, e) {
        let n;
        if (void 0 === e) n = new this.Type(...this.dependencies.map(ht, t)); else n = new this.Type(...this.dependencies.map(ht, t), ...e);
        if (null == this.transformers) return n;
        return this.transformers.reduce(dt, n);
    }
    registerTransformer(t) {
        var e;
        (null !== (e = this.transformers) && void 0 !== e ? e : this.transformers = []).push(t);
    }
}

const vt = {
    $isResolver: true,
    resolve(t, e) {
        return e;
    }
};

function wt(t) {
    return o(t.register);
}

function gt(t) {
    return wt(t) && "boolean" === typeof t.registerInRequestor;
}

function mt(t) {
    return gt(t) && t.registerInRequestor;
}

function pt(t) {
    return void 0 !== t.prototype;
}

function yt(t) {
    return u(t) && t.indexOf(":") > 0;
}

const Rt = new Set([ "Array", "ArrayBuffer", "Boolean", "DataView", "Date", "Error", "EvalError", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Number", "Object", "Promise", "RangeError", "ReferenceError", "RegExp", "Set", "SharedArrayBuffer", "String", "SyntaxError", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "URIError", "WeakMap", "WeakSet" ]);

let bt = 0;

class Container {
    constructor(t, e) {
        this.parent = t;
        this.config = e;
        this.id = ++bt;
        this.t = 0;
        this.i = new Map;
        if (null === t) {
            this.root = this;
            this.u = new Map;
            this.h = new Map;
            this.res = l();
        } else {
            this.root = t.root;
            this.u = new Map;
            this.h = t.h;
            if (e.inheritParentResources) this.res = Object.assign(l(), t.res, this.root.res); else this.res = l();
        }
        this.u.set(V, vt);
    }
    get depth() {
        return null === this.parent ? 0 : this.parent.depth + 1;
    }
    register(...t) {
        if (100 === ++this.t) throw new Error(`AUR0006:${t.map(String)}`);
        let e;
        let r;
        let i;
        let s;
        let o;
        let u = 0;
        let l = t.length;
        for (;u < l; ++u) {
            e = t[u];
            if (!n(e)) continue;
            if (wt(e)) e.register(this); else if (N.resource.has(e)) {
                const t = N.resource.getAll(e);
                if (1 === t.length) t[0].register(this); else {
                    s = 0;
                    o = t.length;
                    while (o > s) {
                        t[s].register(this);
                        ++s;
                    }
                }
            } else if (pt(e)) Et.singleton(e, e).register(this); else {
                r = Object.keys(e);
                s = 0;
                o = r.length;
                for (;s < o; ++s) {
                    i = e[r[s]];
                    if (!n(i)) continue;
                    if (wt(i)) i.register(this); else this.register(i);
                }
            }
        }
        --this.t;
        return this;
    }
    registerResolver(t, e, n = false) {
        At(t);
        const r = this.u;
        const i = r.get(t);
        if (null == i) {
            r.set(t, e);
            if (yt(t)) {
                if (void 0 !== this.res[t]) throw new Error(`AUR0007:${t}`);
                this.res[t] = e;
            }
        } else if (i instanceof Resolver && 4 === i.strategy) i.state.push(e); else r.set(t, new Resolver(t, 4, [ i, e ]));
        if (n) this.i.set(t, e);
        return e;
    }
    registerTransformer(t, e) {
        const n = this.getResolver(t);
        if (null == n) return false;
        if (n.getFactory) {
            const t = n.getFactory(this);
            if (null == t) return false;
            t.registerTransformer(e);
            return true;
        }
        return false;
    }
    getResolver(t, e = true) {
        At(t);
        if (void 0 !== t.resolve) return t;
        let n = this;
        let r;
        while (null != n) {
            r = n.u.get(t);
            if (null == r) {
                if (null == n.parent) {
                    const r = mt(t) ? this : n;
                    return e ? this.R(t, r) : null;
                }
                n = n.parent;
            } else return r;
        }
        return null;
    }
    has(t, e = false) {
        return this.u.has(t) ? true : e && null != this.parent ? this.parent.has(t, true) : false;
    }
    get(t) {
        At(t);
        if (t.$isResolver) return t.resolve(this, this);
        let e = this;
        let n;
        while (null != e) {
            n = e.u.get(t);
            if (null == n) {
                if (null == e.parent) {
                    const r = mt(t) ? this : e;
                    n = this.R(t, r);
                    return n.resolve(e, this);
                }
                e = e.parent;
            } else return n.resolve(e, this);
        }
        throw new Error(`AUR0008:${t}`);
    }
    getAll(t, e = false) {
        At(t);
        const n = this;
        let r = n;
        let i;
        if (e) {
            let e = It;
            while (null != r) {
                i = r.u.get(t);
                if (null != i) e = e.concat(jt(i, r, n));
                r = r.parent;
            }
            return e;
        } else while (null != r) {
            i = r.u.get(t);
            if (null == i) {
                r = r.parent;
                if (null == r) return It;
            } else return jt(i, r, n);
        }
        return It;
    }
    invoke(t, e) {
        if (O(t)) throw kt(t);
        if (void 0 === e) return new t(..._(t).map(ht, this)); else return new t(..._(t).map(ht, this), ...e);
    }
    getFactory(t) {
        let e = this.h.get(t);
        if (void 0 === e) {
            if (O(t)) throw kt(t);
            this.h.set(t, e = new Factory(t, _(t)));
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
        let n;
        let r;
        for ([r, n] of e.entries()) {
            n.dispose();
            t.delete(r);
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
        if (o(i.getFactory)) {
            const e = i.getFactory(this);
            if (null === e || void 0 === e) return null;
            const n = r(t.name, e.Type);
            if (void 0 === n) return null;
            return n;
        }
        return null;
    }
    create(t, e) {
        var n, r;
        const i = t.keyFrom(e);
        let s = this.res[i];
        if (void 0 === s) {
            s = this.root.res[i];
            if (void 0 === s) return null;
            return null !== (n = s.resolve(this.root, this)) && void 0 !== n ? n : null;
        }
        return null !== (r = s.resolve(this, this)) && void 0 !== r ? r : null;
    }
    dispose() {
        if (this.i.size > 0) this.disposeResolvers();
        this.u.clear();
    }
    R(t, e) {
        if (!o(t)) throw new Error(`AUR0009:${t}`);
        if (Rt.has(t.name)) throw new Error(`AUR0010:${t.name}`);
        if (wt(t)) {
            const n = t.register(e, t);
            if (!(n instanceof Object) || null == n.resolve) {
                const n = e.u.get(t);
                if (null != n) return n;
                throw new Error(`AUR0011`);
            }
            return n;
        } else if (N.resource.has(t)) {
            const n = N.resource.getAll(t);
            if (1 === n.length) n[0].register(e); else {
                const t = n.length;
                for (let r = 0; r < t; ++r) n[r].register(e);
            }
            const r = e.u.get(t);
            if (null != r) return r;
            throw new Error(`AUR0011`);
        } else if (t.$isInterface) throw new Error(`AUR0012:${t.friendlyName}`); else {
            const n = this.config.defaultResolver(t, e);
            e.u.set(t, n);
            return n;
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

const Ct = new WeakMap;

function $t(t) {
    return function(e, n, r) {
        let i = Ct.get(e);
        if (void 0 === i) Ct.set(e, i = new WeakMap);
        if (i.has(r)) return i.get(r);
        const s = t(e, n, r);
        i.set(r, s);
        return s;
    };
}

const Et = {
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
        return new Resolver(t, 3, $t(e));
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

function At(t) {
    if (null === t || void 0 === t) throw new Error(`AUR0014`);
}

function jt(t, e, n) {
    if (t instanceof Resolver && 4 === t.strategy) {
        const r = t.state;
        let i = r.length;
        const s = new Array(i);
        while (i--) s[i] = r[i].resolve(e, n);
        return s;
    }
    return [ t.resolve(e, n) ];
}

function kt(t) {
    return new Error(`AUR0015:${t.name}`);
}

const It = Object.freeze([]);

const Ot = Object.freeze({});

function Mt() {}

const Tt = K.createInterface("IPlatform");

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
***************************************************************************** */ function Ft(t, e, n, r) {
    var i = arguments.length, s = i < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, n) : r, o;
    if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) s = Reflect.decorate(t, e, n, r); else for (var u = t.length - 1; u >= 0; u--) if (o = t[u]) s = (i < 3 ? o(s) : i > 3 ? o(e, n, s) : o(e, n)) || s;
    return i > 3 && s && Object.defineProperty(e, n, s), s;
}

function Ut(t, e) {
    return function(n, r) {
        e(n, r, t);
    };
}

var Lt;

(function(t) {
    t[t["trace"] = 0] = "trace";
    t[t["debug"] = 1] = "debug";
    t[t["info"] = 2] = "info";
    t[t["warn"] = 3] = "warn";
    t[t["error"] = 4] = "error";
    t[t["fatal"] = 5] = "fatal";
    t[t["none"] = 6] = "none";
})(Lt || (Lt = {}));

var Pt;

(function(t) {
    t[t["noColors"] = 0] = "noColors";
    t[t["colors"] = 1] = "colors";
})(Pt || (Pt = {}));

const Dt = K.createInterface("ILogConfig", (t => t.instance(new LogConfig(0, 3))));

const St = K.createInterface("ISink");

const Nt = K.createInterface("ILogEventFactory", (t => t.singleton(Ht)));

const Wt = K.createInterface("ILogger", (t => t.singleton(qt)));

const Bt = K.createInterface("ILogScope");

const Qt = Object.freeze({
    key: U("logger-sink-handles"),
    define(t, e) {
        s(this.key, e.handles, t.prototype);
        return t;
    },
    getHandles(e) {
        return t.get(this.key, e);
    }
});

function xt(t) {
    return function(e) {
        return Qt.define(e, t);
    };
}

const zt = I({
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

const Gt = function() {
    const t = [ I({
        TRC: "TRC",
        DBG: "DBG",
        INF: "INF",
        WRN: "WRN",
        ERR: "ERR",
        FTL: "FTL",
        QQQ: "???"
    }), I({
        TRC: zt.grey("TRC"),
        DBG: zt.grey("DBG"),
        INF: zt.white("INF"),
        WRN: zt.yellow("WRN"),
        ERR: zt.red("ERR"),
        FTL: zt.red("FTL"),
        QQQ: zt.grey("???")
    }) ];
    return function(e, n) {
        if (e <= 0) return t[n].TRC;
        if (e <= 1) return t[n].DBG;
        if (e <= 2) return t[n].INF;
        if (e <= 3) return t[n].WRN;
        if (e <= 4) return t[n].ERR;
        if (e <= 5) return t[n].FTL;
        return t[n].QQQ;
    };
}();

function Kt(t, e) {
    if (0 === e) return t.join(".");
    return t.map(zt.cyan).join(".");
}

function _t(t, e) {
    if (0 === e) return new Date(t).toISOString();
    return zt.grey(new Date(t).toISOString());
}

class DefaultLogEvent {
    constructor(t, e, n, r, i, s) {
        this.severity = t;
        this.message = e;
        this.optionalParams = n;
        this.scope = r;
        this.colorOptions = i;
        this.timestamp = s;
    }
    toString() {
        const {severity: t, message: e, scope: n, colorOptions: r, timestamp: i} = this;
        if (0 === n.length) return `${_t(i, r)} [${Gt(t, r)}] ${e}`;
        return `${_t(i, r)} [${Gt(t, r)} ${Kt(n, r)}] ${e}`;
    }
}

let Ht = class DefaultLogEventFactory {
    constructor(t) {
        this.config = t;
    }
    createLogEvent(t, e, n, r) {
        return new DefaultLogEvent(e, n, r, t.scope, this.config.colorOptions, Date.now());
    }
};

Ht = Ft([ Ut(0, Dt) ], Ht);

let Vt = class ConsoleSink {
    constructor(t) {
        const e = t.console;
        this.handleEvent = function t(n) {
            const r = n.optionalParams;
            if (void 0 === r || 0 === r.length) {
                const t = n.toString();
                switch (n.severity) {
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
                let t = n.toString();
                let i = 0;
                while (t.includes("%s")) t = t.replace("%s", String(r[i++]));
                switch (n.severity) {
                  case 0:
                  case 1:
                    return e.debug(t, ...r.slice(i));

                  case 2:
                    return e.info(t, ...r.slice(i));

                  case 3:
                    return e.warn(t, ...r.slice(i));

                  case 4:
                  case 5:
                    return e.error(t, ...r.slice(i));
                }
            }
        };
    }
    static register(t) {
        Et.singleton(St, ConsoleSink).register(t);
    }
};

Vt = Ft([ Ut(0, Tt) ], Vt);

let qt = class DefaultLogger {
    constructor(t, e, n, r = [], i = null) {
        var s, o, u, c, f, a;
        this.config = t;
        this.factory = e;
        this.scope = r;
        this.scopedLoggers = l();
        let h;
        let d;
        let v;
        let w;
        let g;
        let m;
        if (null === i) {
            this.root = this;
            this.parent = this;
            h = this.traceSinks = [];
            d = this.debugSinks = [];
            v = this.infoSinks = [];
            w = this.warnSinks = [];
            g = this.errorSinks = [];
            m = this.fatalSinks = [];
            for (const t of n) {
                const e = Qt.getHandles(t);
                if (null !== (s = null === e || void 0 === e ? void 0 : e.includes(0)) && void 0 !== s ? s : true) h.push(t);
                if (null !== (o = null === e || void 0 === e ? void 0 : e.includes(1)) && void 0 !== o ? o : true) d.push(t);
                if (null !== (u = null === e || void 0 === e ? void 0 : e.includes(2)) && void 0 !== u ? u : true) v.push(t);
                if (null !== (c = null === e || void 0 === e ? void 0 : e.includes(3)) && void 0 !== c ? c : true) w.push(t);
                if (null !== (f = null === e || void 0 === e ? void 0 : e.includes(4)) && void 0 !== f ? f : true) g.push(t);
                if (null !== (a = null === e || void 0 === e ? void 0 : e.includes(5)) && void 0 !== a ? a : true) m.push(t);
            }
        } else {
            this.root = i.root;
            this.parent = i;
            h = this.traceSinks = i.traceSinks;
            d = this.debugSinks = i.debugSinks;
            v = this.infoSinks = i.infoSinks;
            w = this.warnSinks = i.warnSinks;
            g = this.errorSinks = i.errorSinks;
            m = this.fatalSinks = i.fatalSinks;
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
        let n = e[t];
        if (void 0 === n) n = e[t] = new DefaultLogger(this.config, this.factory, void 0, this.scope.concat(t), this);
        return n;
    }
    emit(t, e, n, r) {
        const i = o(n) ? n() : n;
        const s = this.factory.createLogEvent(this, e, i, r);
        for (let e = 0, n = t.length; e < n; ++e) t[e].handleEvent(s);
    }
};

Ft([ $ ], qt.prototype, "trace", null);

Ft([ $ ], qt.prototype, "debug", null);

Ft([ $ ], qt.prototype, "info", null);

Ft([ $ ], qt.prototype, "warn", null);

Ft([ $ ], qt.prototype, "error", null);

Ft([ $ ], qt.prototype, "fatal", null);

qt = Ft([ Ut(0, Dt), Ut(1, Nt), Ut(2, rt(St)), Ut(3, st(Bt)), Ut(4, ot) ], qt);

const Jt = I({
    create({level: t = 3, colorOptions: e = 0, sinks: n = []} = {}) {
        return I({
            register(r) {
                r.register(Et.instance(Dt, new LogConfig(e, t)));
                for (const t of n) if (o(t)) r.register(Et.singleton(St, t)); else r.register(t);
                return r;
            }
        });
    }
});

const Xt = K.createInterface((t => t.singleton(ModuleLoader)));

function Yt(t) {
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
        let n;
        let r;
        let i;
        const s = [];
        for (const u in t) {
            switch (typeof (e = t[u])) {
              case "object":
                if (null === e) continue;
                n = o(e.register);
                r = false;
                i = It;
                break;

              case "function":
                n = o(e.register);
                r = void 0 !== e.prototype;
                i = N.resource.getAll(e);
                break;

              default:
                continue;
            }
            s.push(new ModuleItem(u, e, n, r, i));
        }
        return new AnalyzedModule(t, s);
    }
}

class ModuleLoader {
    constructor() {
        this.transformers = new Map;
    }
    load(t, e = Yt) {
        const n = this.transformers;
        let r = n.get(e);
        if (void 0 === r) n.set(e, r = new ModuleTransformer(e));
        return r.transform(t);
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
    constructor(t, e, n, r, i) {
        this.key = t;
        this.value = e;
        this.isRegistry = n;
        this.isConstructable = r;
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

const Zt = K.createInterface("IEventAggregator", (t => t.singleton(EventAggregator)));

class EventAggregator {
    constructor() {
        this.eventLookup = {};
        this.messageHandlers = [];
    }
    publish(t, e) {
        if (!t) throw new Error(`Invalid channel name or instance: ${t}.`);
        if (u(t)) {
            let n = this.eventLookup[t];
            if (void 0 !== n) {
                n = n.slice();
                let r = n.length;
                while (r-- > 0) n[r](e, t);
            }
        } else {
            const e = this.messageHandlers.slice();
            let n = e.length;
            while (n-- > 0) e[n].handle(t);
        }
    }
    subscribe(t, e) {
        if (!t) throw new Error(`Invalid channel name or type: ${t}.`);
        let n;
        let r;
        if (u(t)) {
            if (void 0 === this.eventLookup[t]) this.eventLookup[t] = [];
            n = e;
            r = this.eventLookup[t];
        } else {
            n = new Handler(t, e);
            r = this.messageHandlers;
        }
        r.push(n);
        return {
            dispose() {
                const t = r.indexOf(n);
                if (-1 !== t) r.splice(t, 1);
            }
        };
    }
    subscribeOnce(t, e) {
        const n = this.subscribe(t, (function(t, r) {
            n.dispose();
            e(t, r);
        }));
        return n;
    }
}

export { AnalyzedModule, Pt as ColorOptions, Vt as ConsoleSink, ContainerConfiguration, K as DI, DefaultLogEvent, Ht as DefaultLogEventFactory, qt as DefaultLogger, G as DefaultResolver, EventAggregator, V as IContainer, Zt as IEventAggregator, Dt as ILogConfig, Nt as ILogEventFactory, Wt as ILogger, Xt as IModuleLoader, Tt as IPlatform, q as IServiceLocator, St as ISink, InstanceProvider, LogConfig, Lt as LogLevel, Jt as LoggerConfiguration, ModuleItem, N as Protocol, Et as Registration, rt as all, $ as bound, v as camelCase, b as compareNumber, It as emptyArray, Ot as emptyObject, ut as factory, j as firstDefined, zt as format, B as fromAnnotationOrDefinitionOrTypeOrDefault, Q as fromAnnotationOrTypeOrDefault, x as fromDefinitionOrDefault, k as getPrototypeChain, ot as ignore, X as inject, f as isArrayIndex, O as isNativeFunction, a as isNumberOrBigInt, h as isStringOrDate, g as kebabCase, it as lazy, E as mergeArrays, C as mergeDistinct, A as mergeObjects, lt as newInstanceForScope, ct as newInstanceOf, y as nextId, Mt as noop, M as onResolve, st as optional, w as pascalCase, R as resetId, T as resolveAll, et as singleton, xt as sink, m as toArray, Z as transient };
//# sourceMappingURL=index.js.map
