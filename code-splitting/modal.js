
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

  var CustomModal = (function (Modal$$1) {
    function CustomModal(app, params) {
      var extendedParams = Utils.extend({
        backdrop: true,
        closeByBackdropClick: true,
        on: {},
      }, params);

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var customModal = this;

      customModal.params = extendedParams;

      // Find Element
      var $el;
      if (!customModal.params.el) {
        $el = $(customModal.params.content);
      } else {
        $el = $(customModal.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return customModal.destroy();
      }
      var $backdropEl;
      if (customModal.params.backdrop) {
        $backdropEl = app.root.children('.custom-modal-backdrop');
        if ($backdropEl.length === 0) {
          $backdropEl = $('<div class="custom-modal-backdrop"></div>');
          app.root.append($backdropEl);
        }
      }

      function handleClick(e) {
        if (!customModal || customModal.destroyed) { return; }
        if ($backdropEl && e.target === $backdropEl[0]) {
          customModal.close();
        }
      }

      customModal.on('customModalOpened', function () {
        if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
          app.on('click', handleClick);
        }
      });
      customModal.on('customModalClose', function () {
        if (customModal.params.closeByBackdropClick && customModal.params.backdrop) {
          app.off('click', handleClick);
        }
      });

      Utils.extend(customModal, {
        app: app,
        $el: $el,
        el: $el[0],
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl && $backdropEl[0],
        type: 'customModal',
      });

      $el[0].f7Modal = customModal;

      return customModal;
    }

    if ( Modal$$1 ) CustomModal.__proto__ = Modal$$1;
    CustomModal.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    CustomModal.prototype.constructor = CustomModal;

    return CustomModal;
  }(Modal));

  var modal = {
    name: 'modal',
    static: {
      Modal: Modal,
      CustomModal: CustomModal,
    },
    create: function create() {
      var app = this;
      app.customModal = {
        create: function create(params) {
          return new CustomModal(app, params);
        },
      };
    },
    params: {
      modal: {
        moveToRoot: true,
        queueDialogs: true,
      },
    },
  };

  return modal;
}
framework7ComponentLoader.componentName = 'modal';

