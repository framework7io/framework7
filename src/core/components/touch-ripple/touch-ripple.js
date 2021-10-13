import TouchRipple from './touch-ripple-class.js';

export default {
  name: 'touch-ripple',
  static: {
    TouchRipple,
  },
  create() {
    const app = this;
    app.touchRipple = {
      create(...args) {
        return new TouchRipple(...args);
      },
    };
  },
};
