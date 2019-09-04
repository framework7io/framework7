import Component from './component-class';
import parseComponent from './parse-component';
import customComponents from './custom-components';
import componentMixins from './component-mixins';

function registerComponentMixin(name, mixin) {
  componentMixins[name] = mixin;
}
function registerComponent(tagName, component) {
  customComponents[tagName] = component;
}

export { Component };
export default {
  name: 'component',
  static: {
    Component,
    registerComponentMixin,
    registerComponent,
  },
  create() {
    const app = this;
    app.component = {
      registerComponentMixin,
      registerComponent,
      parse(componentString) {
        return parseComponent(componentString);
      },
      create(options, context) {
        if (typeof options === 'function') {
          // eslint-disable-next-line
          return new options(app, context, { isClassComponent: true });
        }
        return new Component(app, context, options);
      },
    };
  },
};
