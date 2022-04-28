import { hookSpecsMap } from './hook-spec.js';
export class HookSpecs {
    constructor(binding, bound, attaching, attached, detaching, unbinding, $dispose, canLoad, load, canUnload, unload) {
        this.binding = binding;
        this.bound = bound;
        this.attaching = attaching;
        this.attached = attached;
        this.detaching = detaching;
        this.unbinding = unbinding;
        this.$dispose = $dispose;
        this.canLoad = canLoad;
        this.load = load;
        this.canUnload = canUnload;
        this.unload = unload;
    }
    static get DEFAULT() {
        return HookSpecs.create({});
    }
    static create(input) {
        return new HookSpecs(
        // TODO: use '??' instead of '||' but gotta figure out first why ts-node doesn't understand ES2020 syntax
        input.binding || hookSpecsMap.binding.sync, input.bound || hookSpecsMap.bound.sync, input.attaching || hookSpecsMap.attaching.sync, input.attached || hookSpecsMap.attached.sync, input.detaching || hookSpecsMap.detaching.sync, input.unbinding || hookSpecsMap.unbinding.sync, hookSpecsMap.dispose, input.canLoad || hookSpecsMap.canLoad.sync, input.load || hookSpecsMap.load.sync, input.canUnload || hookSpecsMap.canUnload.sync, input.unload || hookSpecsMap.unload.sync);
    }
    dispose() {
        const $this = this;
        $this.binding = void 0;
        $this.bound = void 0;
        $this.attaching = void 0;
        $this.attached = void 0;
        $this.detaching = void 0;
        $this.unbinding = void 0;
        $this.$dispose = void 0;
        $this.canLoad = void 0;
        $this.load = void 0;
        $this.canUnload = void 0;
        $this.unload = void 0;
    }
    toString(exclude) {
        const strings = [];
        for (const k of hookNames) {
            const spec = this[k];
            if (spec.type !== exclude) {
                strings.push(`${spec.name}.${spec.type}`);
            }
        }
        return strings.length > 0 ? `Hooks(${strings.join(',')})` : '';
    }
}
const hookNames = [
    'binding',
    'bound',
    'attaching',
    'attached',
    'detaching',
    'unbinding',
    'canLoad',
    'load',
    'canUnload',
    'unload',
];
export class TestRouteViewModelBase {
    constructor(hia, specs = HookSpecs.DEFAULT) {
        this.hia = hia;
        this.specs = specs;
    }
    get name() {
        return this.$controller.definition.name;
    }
    binding(initiator, parent, flags) {
        return this.specs.binding.invoke(this, () => {
            this.hia.binding.notify(this.name);
            return this.$binding(initiator, parent, flags);
        });
    }
    bound(initiator, parent, flags) {
        return this.specs.bound.invoke(this, () => {
            this.hia.bound.notify(this.name);
            return this.$bound(initiator, parent, flags);
        });
    }
    attaching(initiator, parent, flags) {
        return this.specs.attaching.invoke(this, () => {
            this.hia.attaching.notify(this.name);
            return this.$attaching(initiator, parent, flags);
        });
    }
    attached(initiator, flags) {
        return this.specs.attached.invoke(this, () => {
            this.hia.attached.notify(this.name);
            return this.$attached(initiator, flags);
        });
    }
    detaching(initiator, parent, flags) {
        return this.specs.detaching.invoke(this, () => {
            this.hia.detaching.notify(this.name);
            return this.$detaching(initiator, parent, flags);
        });
    }
    unbinding(initiator, parent, flags) {
        return this.specs.unbinding.invoke(this, () => {
            this.hia.unbinding.notify(this.name);
            return this.$unbinding(initiator, parent, flags);
        });
    }
    dispose() {
        this.specs.$dispose.invoke(this, () => {
            this.hia.$$dispose.notify(this.name);
            this.$dispose();
        });
    }
    canLoad(params, next, current) {
        return this.specs.canLoad.invoke(this, () => {
            this.hia.canLoad.notify(this.name);
            return this.$canLoad(params, next, current);
        });
    }
    load(params, next, current) {
        return this.specs.load.invoke(this, () => {
            this.hia.load.notify(this.name);
            return this.$load(params, next, current);
        });
    }
    canUnload(next, current) {
        return this.specs.canUnload.invoke(this, () => {
            this.hia.canUnload.notify(this.name);
            return this.$canUnload(next, current);
        });
    }
    unload(next, current) {
        return this.specs.unload.invoke(this, () => {
            this.hia.unload.notify(this.name);
            return this.$unload(next, current);
        });
    }
    $binding(_initiator, _parent, _flags) {
        // do nothing
    }
    $bound(_initiator, _parent, _flags) {
        // do nothing
    }
    $attaching(_initiator, _parent, _flags) {
        // do nothing
    }
    $attached(_initiator, _flags) {
        // do nothing
    }
    $detaching(_initiator, _parent, _flags) {
        // do nothing
    }
    $unbinding(_initiator, _parent, _flags) {
        // do nothing
    }
    $canLoad(_params, _next, _current) {
        return true;
    }
    $load(_params, _next, _current) {
        // do nothing
    }
    $canUnload(_next, _current) {
        return true;
    }
    $unload(_next, _current) {
        // do nothing
    }
    $dispose() {
        const $this = this;
        $this.hia = void 0;
        $this.specs = void 0;
    }
}
//# sourceMappingURL=view-models.js.map