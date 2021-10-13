import LoginScreen from './login-screen-class.js';
import ModalMethods from '../../shared/modal-methods.js';

export default {
  name: 'loginScreen',
  static: {
    LoginScreen,
  },
  create() {
    const app = this;
    app.loginScreen = ModalMethods({
      app,
      constructor: LoginScreen,
      defaultSelector: '.login-screen.modal-in',
    });
  },
  clicks: {
    '.login-screen-open': function openLoginScreen($clickedEl, data = {}) {
      const app = this;
      app.loginScreen.open(data.loginScreen, data.animate, $clickedEl);
    },
    '.login-screen-close': function closeLoginScreen($clickedEl, data = {}) {
      const app = this;
      app.loginScreen.close(data.loginScreen, data.animate, $clickedEl);
    },
  },
};
