var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { view, ViewLocator, ViewValueConverter, CustomElement, Views } from '@aurelia/runtime-html';
import { assert } from '@aurelia/testing';
describe('the view value converter', function () {
    it('delegates view location to the view locator service', function () {
        const fakeResult = class Component {
        };
        const fakeViewLocator = {
            object: null,
            viewName: null,
            getViewComponentForObject(o, vn) {
                this.object = o;
                this.viewName = vn;
                return fakeResult;
            }
        };
        const converter = new ViewValueConverter(fakeViewLocator);
        const object = {};
        const viewName = 'view-name';
        const result = converter.toView(object, viewName);
        assert.equal(fakeViewLocator.object, object);
        assert.equal(fakeViewLocator.viewName, viewName);
        assert.equal(result, fakeResult);
    });
});
describe('the view decorator', function () {
    it('can associate a view with a class', function () {
        const template = { name: 'name' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template)
        ], MyModel);
        const [associated] = Views.get(MyModel);
        assert.equal(associated.name, template.name);
    });
    it('can associate multiple views with a class', function () {
        const template1 = { name: 'view-1' };
        const template2 = { name: 'view-2' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template1),
            view(template2)
        ], MyModel);
        const [view2, view1] = Views.get(MyModel);
        assert.includes(view1.name, template1.name);
        assert.includes(view2.name, template2.name);
    });
});
describe('the view locator', function () {
    it('returns a component class bound to the requested model', function () {
        const template = { name: 'name' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template)
        ], MyModel);
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model);
        const instance = new Component();
        assert.isCustomElementType(Component);
        assert.equal(instance.viewModel, model);
    });
    it('returns the same component class for the same model instance', function () {
        const template = { name: 'name' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template)
        ], MyModel);
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component1 = locator.getViewComponentForObject(model);
        const Component2 = locator.getViewComponentForObject(model);
        assert.isCustomElementType(Component1);
        assert.isCustomElementType(Component2);
        assert.equal(Component1, Component2);
    });
    it('returns the same component base for two different instance of the same model', function () {
        const template = { name: 'name' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template)
        ], MyModel);
        const locator = new ViewLocator();
        const model1 = new MyModel();
        const model2 = new MyModel();
        const Component1 = locator.getViewComponentForObject(model1);
        const Component2 = locator.getViewComponentForObject(model2);
        const BaseComponent = Object.getPrototypeOf(Object.getPrototypeOf(Component1)).constructor;
        assert.isCustomElementType(Component1);
        assert.isCustomElementType(Component2);
        assert.instanceOf(Component1, BaseComponent);
        assert.instanceOf(Component2, BaseComponent);
    });
    it('returns a component with the only view', function () {
        const template1 = { name: 'view-1' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template1)
        ], MyModel);
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model);
        const template = CustomElement.getDefinition(Component);
        assert.isCustomElementType(Component);
        assert.equal('view-1', template.name);
    });
    it('returns a component with the specified view', function () {
        const template1 = { name: 'view-1' };
        const template2 = { name: 'view-2' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template1),
            view(template2)
        ], MyModel);
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model, 'view-2');
        const template = CustomElement.getDefinition(Component);
        assert.isCustomElementType(Component);
        assert.equal('view-2', template.name);
    });
    it('returns a component with the view named "default-view" if no name specified', function () {
        const template1 = { name: 'view-1' };
        const template2 = { name: 'default-view' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template1),
            view(template2)
        ], MyModel);
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model);
        const template = CustomElement.getDefinition(Component);
        assert.isCustomElementType(Component);
        assert.equal('default-view', template.name);
    });
    it('returns a component with the view based on a selector function', function () {
        const template1 = { name: 'view-1' };
        const template2 = { name: 'view-2' };
        let MyModel = class MyModel {
        };
        MyModel = __decorate([
            view(template1),
            view(template2)
        ], MyModel);
        let receivedObject;
        let receivedViews;
        function selectView(object, views) {
            receivedObject = object;
            receivedViews = views;
            return 'view-2';
        }
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model, selectView);
        const template = CustomElement.getDefinition(Component);
        assert.isCustomElementType(Component);
        assert.equal('view-2', template.name);
        assert.equal(receivedObject, model);
        assert.equal(receivedViews, Views.get(MyModel));
    });
    it('can return a component based on a dynamic view when selector used with model without associated views', function () {
        const template1 = { name: 'view-1' };
        class MyModel {
        }
        function selectView(object, views) {
            views.push(template1);
            return template1.name;
        }
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model, selectView);
        const template = CustomElement.getDefinition(Component);
        assert.isCustomElementType(Component);
        assert.equal(template1.name, template.name);
    });
    it('locates views that are defined statically, without a decorator', function () {
        class MyModel {
        }
        MyModel.$views = [{
                name: 'view-1'
            }];
        const locator = new ViewLocator();
        const model = new MyModel();
        const Component = locator.getViewComponentForObject(model);
        const template = CustomElement.getDefinition(Component);
        assert.isCustomElementType(Component);
        assert.equal('view-1', template.name);
    });
    [
        'hydrating',
        'define',
        'hydrated',
        'created',
        'binding',
        'bound',
        'attaching',
        'attached',
        'detaching',
        'unbinding',
        'dispose',
    ].forEach(lifecycleHook => {
        it(`returns a component that implements lifecycle '${lifecycleHook}' if present on the model`, function () {
            const template = { name: 'name' };
            let MyModel = class MyModel {
                constructor() {
                    this.invoked = false;
                }
            };
            MyModel = __decorate([
                view(template)
            ], MyModel);
            MyModel.prototype[lifecycleHook] = function () {
                this.invoked = true;
            };
            const locator = new ViewLocator();
            const model = new MyModel();
            const Component = locator.getViewComponentForObject(model);
            const instance = new Component();
            instance.$controller = {
                scope: {}
            };
            if (lifecycleHook === 'define') {
                instance[lifecycleHook](instance.$controller);
            }
            else {
                instance[lifecycleHook]();
            }
            assert.isCustomElementType(Component);
            assert.equal(model.invoked, true);
        });
    });
});
//# sourceMappingURL=view-location.spec.js.map