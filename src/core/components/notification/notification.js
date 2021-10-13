import { extend } from '../../shared/utils.js';
import Notification from './notification-class.js';
import ModalMethods from '../../shared/modal-methods.js';

export default {
  name: 'notification',
  static: {
    Notification,
  },
  create() {
    const app = this;
    app.notification = extend(
      {},
      ModalMethods({
        app,
        constructor: Notification,
        defaultSelector: '.notification.modal-in',
      }),
    );
  },
  params: {
    notification: {
      icon: null,
      title: null,
      titleRightText: null,
      subtitle: null,
      text: null,
      closeButton: false,
      closeTimeout: null,
      closeOnClick: false,
      swipeToClose: true,
      cssClass: null,
      render: null,
      containerEl: null,
    },
  },
};
