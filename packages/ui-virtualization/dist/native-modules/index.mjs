import { DI as t, IContainer as s, Registration as e } from "../../../kernel/dist/native-modules/index.mjs";

import { BindingBehaviorExpression as i, ValueConverterExpression as r, Scope as n, BindingContext as o, getCollectionObserver as l } from "../../../runtime/dist/native-modules/index.mjs";

import { customAttribute as c, IRenderLocation as h, IInstruction as a, IController as u, IViewFactory as f, IPlatform as d } from "../../../runtime-html/dist/native-modules/index.mjs";

const g = t.createInterface("IDomRenderer");

const m = t.createInterface("IScrollerObsererLocator");

const w = t.createInterface("ICollectionStrategyLocator");

function C(t) {
    let s = false;
    while (t instanceof i) t = t.expression;
    while (t instanceof r) {
        t = t.expression;
        s = true;
    }
    return s ? t : null;
}

const p = t => {
    let s = t.parentNode;
    while (null !== s && s !== document.body) {
        if (b(s)) return s;
        s = s.parentNode;
    }
    throw new Error("Unable to find a scroller");
};

const b = t => {
    const s = window.getComputedStyle(t);
    return s && ("scroll" === s.overflowY || "scroll" === s.overflow || "auto" === s.overflowY || "auto" === s.overflow);
};

const v = (t, ...s) => {
    const e = window.getComputedStyle(t);
    let i = 0;
    let r = 0;
    for (let t = 0, n = s.length; n > t; ++t) {
        r = parseFloat(e[s[t]]);
        i += isNaN(r) ? 0 : r;
    }
    return i;
};

const y = t => {
    let s = t.getBoundingClientRect().height;
    s += v(t, "marginTop", "marginBottom");
    return s;
};

const S = (t, s) => {
    const e = t.offsetParent;
    const i = t.offsetTop;
    if (null === e || e === s) return i;
    if (e.contains(s)) return i - s.offsetTop;
    return i + S(e, s);
};

const D = {
    height: 0,
    scrollTop: 0,
    scroller: null,
    width: 0
};

class VirtualRepeat {
    constructor(t, s, e, i, r, n) {
        this.location = t;
        this.instruction = s;
        this.parent = e;
        this.f = i;
        this.c = r;
        this.items = void 0;
        this.views = [];
        this.task = null;
        this.i = D;
        this.itemHeight = 0;
        this.minViewsRequired = 0;
        this.dom = null;
        this.scrollerObserver = null;
        const o = s.props[0];
        const l = o.from;
        const c = this.iterable = C(l.iterable) ?? l.iterable;
        const h = this.u = l.iterable !== c;
        this.C = new CollectionObservationMediator(this, h ? "handleInnerCollectionChange" : "handleCollectionChange");
        this.local = l.declaration.name;
        this.taskQueue = n.domWriteQueue;
    }
    static get inject() {
        return [ h, a, u, f, s, d ];
    }
    attaching() {
        const t = this.c;
        const s = t.get(w);
        const e = this.collectionStrategy = s.getStrategy(this.items);
        const i = e.count();
        if (0 === i) return;
        const r = this.dom = t.get(g).render(this.location);
        const n = this.O();
        (this.scrollerObserver = t.get(m).getObserver(r.scroller)).subscribe(this);
        this.L(n);
        this.itemsChanged(this.items);
    }
    detaching() {
        this.task?.cancel();
        this.T();
        this.dom.dispose();
        this.scrollerObserver.unsubscribe(this);
        this.dom = this.scrollerObserver = this.task = null;
    }
    L(t) {
        const s = y(t.nodes.firstChild);
        const e = this.scrollerObserver.getValue();
        const i = this.I(e, this.collectionStrategy.count(), s);
        if (1 & i.signals) this.T();
        if (0 === (2 & i.signals)) return;
        this.itemHeight = s;
        this.minViewsRequired = i.minViews;
    }
    I(t, s, e) {
        if (0 === s) return Calculation.reset;
        if (0 === e) return Calculation.none;
        const i = Math.floor(t.height / e);
        return Calculation.from(2, i);
    }
    T() {
        this.minViewsRequired = 0;
        this.itemHeight = 0;
    }
    itemsChanged(t) {
        const s = this.$controller;
        const e = this.collectionStrategy = this.c.get(w).getStrategy(t);
        const i = e.count();
        const r = this.views;
        const l = 2 * this.minViewsRequired;
        let c = 0;
        let h = r.length;
        let a = null;
        if (0 === i) {
            for (c = 0; h > c; ++c) {
                a = r[c];
                void a.deactivate(s, s, 2);
                a.nodes.remove();
            }
            r.length = 0;
            this.T();
            return;
        }
        if (h > l) {
            while (h > l) {
                a = r[h - 1];
                void a.deactivate(s, s, 2);
                a.nodes.remove();
                --h;
            }
            r.length = h;
        }
        if (h > i) {
            while (h > i) {
                a = r[h - 1];
                void a.deactivate(s, s, 2);
                a.nodes.remove();
                --h;
            }
            r.length = i;
        }
        h = r.length;
        const u = Math.min(l, i);
        for (c = h; c < u; c++) r.push(this.f.create());
        const f = this.itemHeight;
        const d = this.local;
        const {firstIndex: g, topCount: m, botCount: C} = this.measureBuffer(this.scrollerObserver.getValue(), r.length, i, f);
        let p = 0;
        let b;
        let v;
        let y;
        for (c = 0; u > c; ++c) {
            p = g + c;
            b = e.item(p);
            a = r[c];
            v = r[c - 1];
            if (a.isActive) {
                y = a.scope;
                y.bindingContext[d] = b;
                y.overrideContext.$index = p;
                y.overrideContext.$length = i;
            } else {
                a.nodes.insertBefore(v.nodes.firstChild.nextSibling);
                y = n.fromParent(s.scope, new o(d, e.item(p)));
                y.overrideContext.$index = p;
                y.overrideContext.$length = i;
                T(y.overrideContext);
                void a.activate(s, s, 1, y);
            }
        }
        this.C.start(t);
        this.dom.update(m * f, C * f);
    }
    calcRealScrollTop(t) {
        const s = t.scrollTop;
        const e = S(this.dom.top, t.scroller);
        const i = Math.max(0, 0 === s ? 0 : s - e);
        return i;
    }
    measureBuffer(t, s, e, i) {
        const r = this.calcRealScrollTop(t);
        let n = 0 === r ? 0 : Math.floor(r / i);
        if (n + s >= e) n = Math.max(0, e - s);
        const o = n;
        const l = Math.max(0, e - o - s);
        return {
            firstIndex: n,
            topCount: o,
            botCount: l
        };
    }
    handleScrollerChange(t) {
        const s = this.task;
        this.task = this.taskQueue.queueTask((() => {
            this.task = null;
            this.handleScroll(t);
        }));
        s?.cancel();
    }
    handleScroll(t) {
        if (0 === this.itemHeight) return;
        const s = this.i;
        const e = this.local;
        const i = this.itemHeight;
        const r = this.dom;
        const n = this.views;
        const o = this.collectionStrategy;
        const l = n.length;
        const c = o.count();
        const h = n[0].scope.overrideContext.$index;
        const {firstIndex: a, topCount: u, botCount: f} = this.measureBuffer(t, l, c, i);
        const d = t.scrollTop > s.scrollTop;
        const g = d ? a >= h + l : a + l <= h;
        this.i = t;
        if (a === h) return;
        let m = null;
        let w = null;
        let C = 0;
        let p = 0;
        let b = 0;
        let v = 0;
        if (g) for (v = 0; l > v; ++v) {
            C = a + v;
            w = n[v].scope;
            w.bindingContext[e] = o.item(C);
            w.overrideContext.$index = C;
            w.overrideContext.$length = c;
        } else if (d) {
            p = a - h;
            while (p > 0) {
                m = n.shift();
                C = n[n.length - 1].scope.overrideContext["$index"] + 1;
                n.push(m);
                w = m.scope;
                w.bindingContext[e] = o.item(C);
                w.overrideContext.$index = C;
                w.overrideContext.$length = c;
                m.nodes.insertBefore(r.bottom);
                ++b;
                --p;
            }
        } else {
            p = h - a;
            while (p > 0) {
                C = h - (b + 1);
                m = n.pop();
                w = m.scope;
                w.bindingContext[e] = o.item(C);
                w.overrideContext.$index = C;
                w.overrideContext.$length = c;
                m.nodes.insertBefore(n[0].nodes.firstChild);
                n.unshift(m);
                ++b;
                --p;
            }
        }
        if (d) {
            if (o.isNearBottom(a + (l - 1))) ;
        } else if (o.isNearTop(n[0].scope.overrideContext["$index"])) ;
        r.update(u * i, f * i);
    }
    getDistances() {
        return this.dom?.distances ?? [ 0, 0 ];
    }
    getViews() {
        return this.views.slice(0);
    }
    handleCollectionChange(t, s) {
        this.itemsChanged(this.items);
    }
    handleInnerCollectionChange() {
        const t = this.iterable.evaluate(this.parent.scope, this.c, null);
        const s = this.items;
        this.items = t;
        if (t === s) this.itemsChanged(t);
    }
    O() {
        const t = this.getOrCreateFirstView();
        const s = this.$controller;
        const e = this.collectionStrategy;
        const i = s.scope;
        const r = n.fromParent(i, new o(this.local, e.first()));
        r.overrideContext.$index = 0;
        r.overrideContext.$length = e.count();
        T(r.overrideContext);
        t.nodes.insertBefore(this.dom.bottom);
        void t.activate(s, s, 0, r);
        return t;
    }
    getOrCreateFirstView() {
        const t = this.views;
        if (t.length > 0) return t[0];
        const s = this.f.create();
        t.push(s);
        return s;
    }
}

c({
    isTemplateController: true,
    name: "virtual-repeat",
    bindables: {
        local: {
            property: "local"
        },
        items: {
            property: "items",
            primary: true
        }
    }
})(VirtualRepeat);

class CollectionObservationMediator {
    constructor(t, s) {
        this.repeat = t;
        this.key = s;
    }
    handleCollectionChange(t, s) {
        this.repeat[this.key](t, s);
    }
    start(t) {
        if (this.M === t) return;
        this.stop();
        if (null != t) l(this.M = t)?.subscribe(this);
    }
    stop() {
        l(this.M)?.unsubscribe(this);
    }
}

var O;

(function(t) {
    t[t["none"] = 0] = "none";
    t[t["reset"] = 1] = "reset";
    t[t["has_sizing"] = 2] = "has_sizing";
})(O || (O = {}));

class Calculation {
    constructor(t, s) {
        this.signals = t;
        this.minViews = s;
    }
    static from(t, s) {
        return new Calculation(t, s);
    }
}

Calculation.reset = new Calculation(1, 0);

Calculation.none = new Calculation(0, 0);

const L = new WeakSet;

function T(t) {
    const s = t;
    if (L.has(s)) return;
    Object.defineProperties(s, {
        $first: I(R),
        $last: I(V),
        $middle: I(x),
        $even: I(E),
        $odd: I(M)
    });
}

function I(t) {
    return {
        configurable: true,
        enumerable: true,
        get: t
    };
}

function E() {
    return this.$index % 2 === 0;
}

function M() {
    return this.$index % 2 !== 0;
}

function R() {
    return 0 === this.$index;
}

function V() {
    return this.$index === this.$length - 1;
}

function x() {
    return this.$index > 0 && this.$index < this.$length - 1;
}

class CollectionStrategyLocator {
    static register(t) {
        return e.singleton(w, this).register(t);
    }
    getStrategy(t) {
        if (null == t) return new NullCollectionStrategy;
        if (t instanceof Array) return new ArrayCollectionStrategy(t);
        throw new Error(`Unable to find a strategy for collection type: ${typeof t}`);
    }
}

class ArrayCollectionStrategy {
    constructor(t) {
        this.val = t;
    }
    count() {
        return this.val.length;
    }
    first() {
        return this.val.length > 0 ? this.val[0] : null;
    }
    last() {
        return this.val.length > 0 ? this.val[this.val.length - 1] : null;
    }
    item(t) {
        return this.val[t] ?? null;
    }
    range(t, s) {
        const e = this.val;
        const i = e.length;
        if (i > t && s > t) return e.slice(t, s);
        return [];
    }
    isNearTop(t) {
        return t < 5;
    }
    isNearBottom(t) {
        return t > this.val.length - 5;
    }
}

class NullCollectionStrategy {
    get val() {
        return null;
    }
    count() {
        return 0;
    }
    isNearTop() {
        return false;
    }
    isNearBottom() {
        return false;
    }
    first() {
        return null;
    }
    last() {
        return null;
    }
    item() {
        return null;
    }
    range() {
        return [];
    }
}

class ScrollerObserverLocator {
    constructor(t) {
        this.cache = new WeakMap;
        this.p = t;
    }
    static get inject() {
        return [ d ];
    }
    static register(t) {
        return e.singleton(m, this).register(t);
    }
    getObserver(t) {
        const s = this.cache;
        let e = s.get(t);
        if (!s.has(t)) s.set(t, e = new ScrollerObserver(this.p, t));
        return e;
    }
}

class ScrollerObserver {
    constructor(t, s) {
        this.p = t;
        this.scroller = s;
        this.subs = new Set;
        this.geo = null;
    }
    start() {
        this.scroller.addEventListener("scroll", this);
        const t = $(this.p);
        if ("function" === typeof t) (this.sizeObs = new t((t => {
            const s = this.geo;
            const e = new ElementGeometry(t[0].contentRect);
            if (!e.equals(s)) {
                this.geo = e;
                this.notify();
            }
        }))).observe(this.scroller);
    }
    stop() {
        this.scroller.removeEventListener("scroll", this);
        this.sizeObs?.disconnect();
        this.sizeObs = void 0;
    }
    notify() {
        this.subs.forEach(N, this.getValue());
    }
    setValue() {
        throw new Error("scroller info is readonly");
    }
    getValue() {
        const t = this.scroller;
        const s = t.getBoundingClientRect();
        return new ScrollerInfo(t, t.scrollTop, s.width, s.height);
    }
    handleEvent(t) {
        this.notify();
    }
    subscribe(t) {
        if (0 === this.subs.size) this.start();
        this.subs.add(t);
    }
    unsubscribe(t) {
        const s = this.subs;
        if (s.has(t) && 1 === s.size) this.stop();
        s.delete(t);
    }
}

function N(t) {
    t.handleScrollerChange(this);
}

class ElementGeometry {
    constructor(t) {
        this.t = t.top;
        this.l = t.left;
        this.w = t.width;
        this.h = t.height;
    }
    equals(t) {
        if (null == t) return false;
        return this.t === t.t && this.l === t.l && this.w === t.w && this.h === t.h;
    }
}

class ScrollerInfo {
    constructor(t, s, e, i) {
        this.scroller = t;
        this.scrollTop = s;
        this.width = e;
        this.height = i;
    }
}

const $ = t => t.window.ResizeObserver;

class DefaultDomRenderer {
    constructor(t) {
        this.p = t;
    }
    static get inject() {
        return [ d ];
    }
    static register(t) {
        return e.singleton(g, this).register(t);
    }
    render(t) {
        const s = this.p.document;
        const e = t.parentNode;
        if (null === e) throw new Error("Invalid render target");
        let i;
        switch (e.tagName) {
          case "TBODY":
          case "THEAD":
          case "TFOOT":
          case "TABLE":
            i = A(s, "tr", t);
            return new TableDom(e.closest("table"), t, i[0], i[1]);

          case "UL":
          case "OL":
            i = A(s, "div", t);
            return new ListDom(e, t, i[0], i[1]);

          default:
            i = A(s, "div", t);
            return new DefaultDom(t, i[0], i[1]);
        }
    }
}

class DefaultDom {
    constructor(t, s, e) {
        this.anchor = t;
        this.top = s;
        this.bottom = e;
        this.tH = 0;
        this.bH = 0;
    }
    get scroller() {
        return p(this.anchor);
    }
    get distances() {
        return [ this.tH, this.bH ];
    }
    update(t, s) {
        this.top.style.height = `${this.tH = t}px`;
        this.bottom.style.height = `${this.bH = s}px`;
    }
    dispose() {
        this.top.remove();
        this.bottom.remove();
    }
}

class ListDom extends DefaultDom {
    constructor(t, s, e, i) {
        super(s, e, i);
        this.list = t;
    }
    get scroller() {
        return p(this.list);
    }
}

class TableDom extends DefaultDom {
    constructor(t, s, e, i) {
        super(s, e, i);
        this.table = t;
    }
    get scroller() {
        return p(this.table);
    }
}

function A(t, s, e) {
    const i = e.parentNode;
    return [ i.insertBefore(t.createElement(s), e), i.insertBefore(t.createElement(s), e) ];
}

const B = {
    register(t) {
        return t.register(ScrollerObserverLocator, CollectionStrategyLocator, DefaultDomRenderer, VirtualRepeat);
    }
};

export { CollectionStrategyLocator, DefaultDomRenderer, B as DefaultVirtualRepeatConfiguration, w as ICollectionStrategyLocator, g as IDomRenderer, m as IScrollerObsererLocator, ScrollerObserver, ScrollerObserverLocator, VirtualRepeat };

