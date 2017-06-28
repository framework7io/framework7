import $ from 'dom7';
import Utils from '../../utils/utils';
import LoginScreen from './login-screen-class';

export default {
  name: 'loginScreen',
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
          const $loginScreenEl = $(loginScreenEl);
          let loginScreen = $loginScreenEl[0].f7Modal;
          if (!loginScreen) loginScreen = new LoginScreen(app, { el: $loginScreenEl });
          return loginScreen.open(animate);
        },
        close(loginScreenEl = '.login-screen.modal-in', animate) {
          const $loginScreenEl = $(loginScreenEl);
          if ($loginScreenEl.length === 0) return undefined;
          let loginScreen = $loginScreenEl[0].f7Modal;
          if (!loginScreen) loginScreen = new LoginScreen(app, { el: $loginScreenEl });
          return loginScreen.close(animate);
        },
        get(loginScreenEl = '.login-screen.modal-in') {
          const $loginScreenEl = $(loginScreenEl);
          if ($loginScreenEl.length === 0) return undefined;
          return $loginScreenEl[0].f7Modal;
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
