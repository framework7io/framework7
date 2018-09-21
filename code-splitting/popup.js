
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var Popup = (function (Modal$$1) {
    function Popup(app, params) {
      var extendedParams = Utils.extend(
        { on: {} },
        app.params.popup,
        params
      );

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var popup = this;

      popup.params = extendedParams;

      // Find Element
      var $el;
      if (!popup.params.el) {
        $el = $(popup.params.content);
      } else {
        $el = $(popup.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return popup.destroy();
      }

      var $backdropEl;
      if (popup.params.backdrop) {
        $backdropEl = app.root.children('.popup-backdrop');
        if ($backdropEl.length === 0) {
          $backdropEl = $('<div class="popup-backdrop"></div>');
          app.root.append($backdropEl);
        }
      }

      Utils.extend(popup, {
        app: app,
        $el: $el,
        el: $el[0],
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl && $backdropEl[0],
        type: 'popup',
      });

      function handleClick(e) {
        var target = e.target;
        var $target = $(target);
        if ($target.closest(popup.el).length === 0) {
          if (
            popup.params
            && popup.params.closeByBackdropClick
            && popup.params.backdrop
            && popup.backdropEl
            && popup.backdropEl === target
          ) {
            var needToClose = true;
            popup.$el.nextAll('.popup.modal-in').each(function (index, popupEl) {
              var popupInstance = popupEl.f7Modal;
              if (!popupInstance) { return; }
              if (
                popupInstance.params.closeByBackdropClick
                && popupInstance.params.backdrop
                && popupInstance.backdropEl === popup.backdropEl
              ) {
                needToClose = false;
              }
            });
            if (needToClose) {
              popup.close();
            }
          }
        }
      }

      popup.on('popupOpened', function () {
        if (popup.params.closeByBackdropClick) {
          app.on('click', handleClick);
        }
      });
      popup.on('popupClose', function () {
        if (popup.params.closeByBackdropClick) {
          app.off('click', handleClick);
        }
      });

      $el[0].f7Modal = popup;

      return popup;
    }

    if ( Modal$$1 ) Popup.__proto__ = Modal$$1;
    Popup.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Popup.prototype.constructor = Popup;

    return Popup;
  }(Modal));

  var popup = {
    name: 'popup',
    params: {
      popup: {
        backdrop: true,
        closeByBackdropClick: true,
      },
    },
    static: {
      Popup: Popup,
    },
    create: function create() {
      var app = this;
      app.popup = ModalMethods({
        app: app,
        constructor: Popup,
        defaultSelector: '.popup.modal-in',
      });
    },
    clicks: {
      '.popup-open': function openPopup($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.popup.open(data.popup, data.animate);
      },
      '.popup-close': function closePopup($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.popup.close(data.popup, data.animate);
      },
    },
  };

  return popup;
}
framework7ComponentLoader.componentName = 'popup';

