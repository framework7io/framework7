'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  // Module Name
  name: 'demo-module',
  install: function install(params) {
    var Class = this;
    console.log(Class, params);
  },
  create: function create(instance) {
    console.log('init', instance);
  },

  // App Params related to module
  params: {
    a: 1,
    b: 2,
    c: 3
  },
  // Extend Prototype
  proto: {
    demo: function demo() {
      return 'demo-module-proto-method';
    },

    demoStatic: 'demo-module-proto-static'
  },
  // Extend Class, e.g. Class.myMethod
  static: {
    demo: function demo() {
      return 'demo-module-class-method';
    },

    demoStatic: 'demo-module-class-static'
  },
  // Initialized instance Props & Methods
  instance: {
    demoProp: true,
    demoMethod: function demoMethod() {
      return 'demo-method';
    }
  },
  // Add Event Listeners
  on: {
    demoEvent: function demoEvent(a, b) {
      console.log('demo-event', a, b);
    }
  }
};