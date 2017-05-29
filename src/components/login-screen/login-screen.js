import $ from 'dom7';
import Utils from '../../utils/utils';
import LoginScreen from './login-screen-class';

export default {
  name: 'loginscreen',
  static: {
    LoginScreen,
  },
  create() {
    const app = this;
    Utils.extend(app, {
      loginScreen: {
        create(params) {
          return new LoginScreen(app, params);
        },
        open(loginScreenEl, animate) {
          return new LoginScreen(app, {
            el: $(loginScreenEl),
          }).open(animate);
        },
        close(loginScreenEl = '.login-screen.modal-in', animate) {
          return new LoginScreen(app, {
            el: $(loginScreenEl),
          }).close(animate);
        },
      },
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
