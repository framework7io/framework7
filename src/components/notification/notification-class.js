import $ from 'dom7';
import Utils from '../../utils/utils';
import Modal from '../modal/modal-class';

class Notification extends Modal {
  constructor(app, params) {
    const extendedParams = Utils.extend({
      on: {},
    }, app.params.notification, params);

    // Extends with open/close Modal methods;
    super(app, extendedParams);

    const notification = this;

    notification.app = app;

    notification.params = extendedParams;

    const {
      icon,
      title,
      titleRightText,
      subtitle,
      text,
      closeButton,
      closeTimeout,
      cssClass,
      closeOnClick,
    } = notification.params;

    let $el;
    if (!notification.params.el) {
      // Find Element
      const notificationHtml = notification.render({
        icon,
        title,
        titleRightText,
        subtitle,
        text,
        closeButton,
        cssClass,
      });

      $el = $(notificationHtml);
    } else {
      $el = $(notification.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      return $el[0].f7Modal;
    }

    if ($el.length === 0) {
      return notification.destroy();
    }

    Utils.extend(notification, {
      $el,
      el: $el[0],
      type: 'notification',
    });

    $el[0].f7Modal = notification;

    if (closeButton) {
      $el.find('.notification-close-button').on('click', () => {
        notification.close();
      });
    }
    $el.on('click', (e) => {
      if (closeButton && $(e.target).closest('.notification-close-button').length) {
        return;
      }
      notification.emit('local::click notificationClick', notification);
      if (closeOnClick) notification.close();
    });

    notification.on('beforeDestroy', () => {
      $el.off('click');
    });

    let timeoutId;
    notification.on('open', () => {
      $('.notification.modal-in').each((index, openedEl) => {
        const notificationInstance = app.notification.get(openedEl);
        if (openedEl !== notification.el && notificationInstance) {
          notificationInstance.close();
        }
      });
      if (closeTimeout) {
        timeoutId = Utils.nextTick(() => {
          notification.close();
        }, closeTimeout);
      }
    });
    notification.on('close', () => {
      window.clearTimeout(timeoutId);
    });

    return notification;
  }
  render() {
    const notification = this;
    if (notification.params.render) return notification.params.render.call(notification, notification);
    const { icon, title, titleRightText, subtitle, text, closeButton, cssClass } = notification.params;
    return `
      <div class="notification ${cssClass || ''}">
        <div class="notification-header">
          ${icon ? `<div class="notification-icon">${icon}</div>` : ''}
          ${title ? `<div class="notification-title">${title}</div>` : ''}
          ${titleRightText ? `<div class="notification-title-right-text">${titleRightText}</div>` : ''}
          ${closeButton ? '<span class="notification-close-button"></span>' : ''}
        </div>
        <div class="notification-content">
          ${subtitle ? `<div class="notification-subtitle">${subtitle}</div>` : ''}
          ${text ? `<div class="notification-text">${text}</div>` : ''}
        </div>
      </div>
    `.trim();
  }
}
export default Notification;
