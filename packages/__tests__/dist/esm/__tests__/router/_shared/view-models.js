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
        // this.hia.binding.notify(`${this.viewport?.name}:${this.name}`);
        // this.hia.binding.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.binding.invoke(this, () => {
            // this.hia.binding.notify(`${this.viewport?.name}.${this.name}`);
            return this.$binding(initiator, parent, flags);
        }, this.hia.binding);
    }
    bound(initiator, parent, flags) {
        // this.hia.bound.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.bound.invoke(this, () => {
            // this.hia.bound.notify(`${this.viewport?.name}.${this.name}`);
            return this.$bound(initiator, parent, flags);
        }, this.hia.bound);
    }
    attaching(initiator, parent, flags) {
        // this.hia.attaching.notify(`${this.viewport?.name}:${this.name}`);
        // this.hia.attaching.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.attaching.invoke(this, () => {
            // this.hia.attaching.notify(`${this.viewport?.name}.${this.name}`);
            return this.$attaching(initiator, parent, flags);
        }, this.hia.attaching);
    }
    attached(initiator, flags) {
        // this.hia.attached.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.attached.invoke(this, () => {
            // this.hia.attached.notify(`${this.viewport?.name}.${this.name}`);
            return this.$attached(initiator, flags);
        }, this.hia.attached);
    }
    detaching(initiator, parent, flags) {
        // this.hia.detaching.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.detaching.invoke(this, () => {
            // this.hia.detaching.notify(`${this.viewport?.name}.${this.name}`);
            return this.$detaching(initiator, parent, flags);
        }, this.hia.detaching);
    }
    unbinding(initiator, parent, flags) {
        // console.log(`unbinding ${this.name} ${this.$controller.host.outerHTML}`);
        // this.hia.unbinding.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.unbinding.invoke(this, () => {
            // this.hia.unbinding.notify(`${this.viewport?.name}.${this.name}`);
            return this.$unbinding(initiator, parent, flags);
        }, this.hia.unbinding);
    }
    dispose() {
        // this.hia.$$dispose.notify(`${this.viewport?.name}.${this.name}`);
        this.specs.$dispose.invoke(this, () => {
            // this.hia.$$dispose.notify(`${this.viewport?.name}.${this.name}`);
            this.$dispose();
        }, this.hia.$$dispose);
    }
    canLoad(params, instruction, navigation) {
        this.viewport = instruction.viewport.instance;
        // console.log('TestViewModel canLoad', this.name);
        // this.hia.canLoad.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.canLoad.invoke(this, () => {
            // this.hia.canLoad.notify(`${this.viewport?.name}.${this.name}`, 'enter');
            // return onResolve(this.$canLoad(params, next, current), () => {
            // this.hia.canLoad.notify(`${this.viewport?.name}.${this.name}`, 'leave');
            // }) as any;
            return this.$canLoad(params, instruction, navigation);
            // this.hia.canLoad.notify(`${this.viewport?.name}.${this.name}`);
            // const result = this.$canLoad(params, next, current);
            // if (result instanceof Promise) {
            //   return result.then(() => {
            //     this.hia.canLoad.notify(`${this.viewport?.name}.${this.name}`, 'leave');
            //   });
            // }
            // this.hia.canLoad.notify(`${this.viewport?.name}.${this.name}`, 'leave');
            // return result;
        }, this.hia.canLoad);
    }
    load(params, instruction, navigation) {
        this.viewport = instruction.viewport.instance;
        // console.log('TestViewModel load', this.name);
        // this.hia.load.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.load.invoke(this, () => {
            // this.hia.load.notify(`${this.viewport?.name}.${this.name}`);
            return this.$load(params, instruction, navigation);
        }, this.hia.load);
    }
    canUnload(instruction, navigation) {
        this.viewport = instruction.viewport.instance;
        // console.log('TestViewModel canUnload', this);
        // this.hia.canUnload.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.canUnload.invoke(this, () => {
            return this.$canUnload(instruction, navigation);
            // this.hia.canUnload.notify(`${this.viewport?.name}.${this.name}`, 'enter');
            // return onResolve(this.$canUnload(instruction, navigation), () => {
            //   this.hia.canUnload.notify(`${this.viewport?.name}.${this.name}`, 'leave');
            // }) as any;
        }, this.hia.canUnload);
    }
    unload(instruction, navigation) {
        this.viewport = instruction.viewport.instance;
        // console.log('TestViewModel unload', this.name);
        // this.hia.unload.notify(`${this.viewport?.name}.${this.name}`);
        return this.specs.unload.invoke(this, () => {
            // this.hia.unload.notify(`${this.viewport?.name}.${this.name}`);
            return this.$unload(instruction, navigation);
        }, this.hia.unload);
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
    $canLoad(_params, _instruction, _navigation) {
        return true;
    }
    $load(_params, _instruction, _navigation) {
        // do nothing
    }
    $canUnload(_instruction, _navigation) {
        return true;
    }
    $unload(_instruction, _navigation) {
        // do nothing
    }
    $dispose() {
        const $this = this;
        $this.hia = void 0;
        $this.specs = void 0;
    }
}
//# sourceMappingURL=view-models.js.map