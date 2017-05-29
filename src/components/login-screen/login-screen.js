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
};
