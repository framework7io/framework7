import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class LoginScreen extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      on: {},
    }, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const loginScreen = this;

    loginScreen.params = extendedParams;

    // Find Element
    let $el;
    if (!loginScreen.params.el) {
      $el = $(loginScreen.params.content);
    } else {
      $el = $(loginScreen.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return loginScreen.destroy();
    }

    Utils.extend(loginScreen, {
      app,
      $el,
      el: $el[0],
      type: 'loginScreen',
    });

    $el[0].f7Modal = loginScreen;

    return loginScreen;
  }
}
export default LoginScreen;
