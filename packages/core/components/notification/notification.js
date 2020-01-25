import Utils from '../../utils/utils';
import Notification from './notification-class';
import ModalMethods from '../../utils/modal-methods';

export default {
  name: 'notification',
  static: {
    Notification,
  },
  create() {
    const app = this;
    app.notification = Utils.extend(
      {},
      ModalMethods({
        app,
        constructor: Notification,
        defaultSelector: '.notification.modal-in',
      })
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
    },
  },
};
