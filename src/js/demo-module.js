export default {
  // Module Name
  name: 'demo-module',
  install(Framework7, params) {
    console.log(Framework7, params);
  },
  create(app) {
    console.log('init', app);
  },
  // App Params related to module
  params: {
    a: 1,
    b: 2,
    c: 3,
  },
  // Extend F7 Prototype
  proto: {
    demo() {
      return 'demo-module-proto-method';
    },
    demoStatic: 'demo-module-proto-static',
  },
  // Extend F7 Class, e.g. Framework7.myMethod
  class: {
    demo() {
      return 'demo-module-class-method';
    },
    demoStatic: 'demo-module-class-static',
  },
  // App Props & Methods
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
