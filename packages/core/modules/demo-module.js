export default {
  // Module Name
  name: 'demo-module',
  install(params) {
    const Class = this;
    console.log(Class, params);
  },
  create(instance) {
    console.log('init', instance);
  },
  // App Params related to module
  params: {
    a: 1,
    b: 2,
    c: 3,
  },
  // Extend Prototype
  proto: {
    demo() {
      return 'demo-module-proto-method';
    },
    demoStatic: 'demo-module-proto-static',
  },
  // Extend Class, e.g. Class.myMethod
  static: {
    demo() {
      return 'demo-module-class-method';
    },
    demoStatic: 'demo-module-class-static',
  },
  // Initialized instance Props & Methods
  instance: {
    demoProp: true,
    demoMethod() {
      return 'demo-method';
    },
  },
  // Add Event Listeners
  on: {
    demoEvent(a, b) {
      console.log('demo-event', a, b);
    },
  },
};
