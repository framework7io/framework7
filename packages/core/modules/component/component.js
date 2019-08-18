import Component, { registerComponentMixin } from './component-class';
import parseComponent from './parse-component';

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
      create(options, extendContext) {
        return new Component(app, options, extendContext);
      },
    };
  },
};
