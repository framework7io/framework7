import LoginScreen from './login-screen-class';
import ModalMethods from '../../utils/modal-methods';

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
      app.loginScreen.open(data.loginScreen, data.animate);
    },
    '.login-screen-close': function closeLoginScreen($clickedEl, data = {}) {
      const app = this;
      app.loginScreen.close(data.loginScreen, data.animate);
    },
  },
};
