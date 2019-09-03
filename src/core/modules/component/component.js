import Component, { registerComponentMixin } from './component-class';
import parseComponent from './parse-component';

export { Component };
export default {
  name: 'component',
  static: {
    Component,
    registerComponentMixin,
  },
  create() {
    const app = this;
    app.component = {
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
