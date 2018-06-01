import $ from 'dom7';
import { window } from 'ssr-window';
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

    /* Touch Events */
    let isTouched;
    let isMoved;
    let isScrolling;
    let touchesDiff;
    let touchStartTime;
    let notificationHeight;
    const touchesStart = {};
    function handleTouchStart(e) {
      if (isTouched) return;
      isTouched = true;
      isMoved = false;
      isScrolling = undefined;
      touchStartTime = Utils.now();
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) < Math.abs(pageX - touchesStart.x));
      }
      if (isScrolling) {
        isTouched = false;
        return;
      }
      e.preventDefault();
      if (!isMoved) {
        notification.$el.removeClass('notification-transitioning');
        notification.$el.transition(0);
        notificationHeight = notification.$el[0].offsetHeight / 2;
      }
      isMoved = true;
      touchesDiff = (pageY - touchesStart.y);
      let newTranslate = touchesDiff;
      if (touchesDiff > 0) {
        newTranslate = touchesDiff ** 0.8;
      }
      notification.$el.transform(`translate3d(0, ${newTranslate}px, 0)`);
    }
    function handleTouchEnd() {
      if (!isTouched || !isMoved) {
        isTouched = false;
        isMoved = false;
        return;
      }
      isTouched = false;
      isMoved = false;
      if (touchesDiff === 0) {
        return;
      }

      const timeDiff = Utils.now() - touchStartTime;
      notification.$el.transition('');
      notification.$el.addClass('notification-transitioning');
      notification.$el.transform('');

      if (
        (touchesDiff < -10 && timeDiff < 300) ||
        (-touchesDiff >= notificationHeight / 1)
      ) {
        notification.close();
      }
    }

    function attachTouchEvents() {
      if ("universal" !== 'desktop') {
        notification.$el.on(app.touchEvents.start, handleTouchStart, { passive: true });
        app.on('touchmove:active', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
      }
    }
    function detachTouchEvents() {
      if (process.env.TARGET !== 'desktop') {
        notification.$el.off(app.touchEvents.start, handleTouchStart, { passive: true });
        app.off('touchmove:active', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
      }
    }

    let timeoutId;
    function closeOnTimeout() {
      timeoutId = Utils.nextTick(() => {
        if (isTouched && isMoved) {
          closeOnTimeout();
          return;
        }
        notification.close();
      }, closeTimeout);
    }
    notification.on('open', () => {
      if (notification.params.swipeToClose) {
        attachTouchEvents();
      }
      $('.notification.modal-in').each((index, openedEl) => {
        const notificationInstance = app.notification.get(openedEl);
        if (openedEl !== notification.el && notificationInstance) {
          notificationInstance.close();
        }
      });
      if (closeTimeout) {
        closeOnTimeout();
      }
    });
    notification.on('close beforeDestroy', () => {
      if (notification.params.swipeToClose) {
        detachTouchEvents();
      }
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
