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
      create(options, context, children) {
        if (typeof options === 'function') {
          const { root, el } = options;
          // eslint-disable-next-line
          return new options(app, { isClassComponent: true, root, el }, context, children);
        }
        return new Component(app, options, context, children);
      },
    };
  },
};
