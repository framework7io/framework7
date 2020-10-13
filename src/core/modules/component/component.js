import Component from './component-class';
import parseComponent from './parse-component';
import customComponents from './custom-components';
import $jsx from './$jsx';

function registerComponent(tagName, component) {
  customComponents[tagName] = component;
}

function unregisterComponent(tagName) {
  delete customComponents[tagName];
}

export { Component, $jsx };
export default {
  name: 'component',
  static: {
    Component,
    registerComponent,
    unregisterComponent,
  },
  create() {
    const app = this;
    app.component = {
      registerComponent,
      unregisterComponent,
      parse(componentString) {
        return parseComponent(componentString);
      },
      create(component, props, { root, el, context, children }) {
        return new Component(app, component, props, { root, el, context, children });
      },
    };
  },
};
