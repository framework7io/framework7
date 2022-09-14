import Component from './component-class.js';
import parseComponent from './parse-component.js';
import customComponents from './custom-components.js';
import $jsx from './$jsx.js';

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
    parseComponent,
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
