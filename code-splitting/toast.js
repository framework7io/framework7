
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

  var Toast = (function (Modal$$1) {
    function Toast(app, params) {
      var extendedParams = Utils.extend({
        on: {},
      }, app.params.toast, params);

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var toast = this;

      toast.app = app;

      toast.params = extendedParams;

      var ref = toast.params;
      var closeButton = ref.closeButton;
      var closeTimeout = ref.closeTimeout;

      var $el;
      if (!toast.params.el) {
        // Find Element
        var toastHtml = toast.render();

        $el = $(toastHtml);
      } else {
        $el = $(toast.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return toast.destroy();
      }

      Utils.extend(toast, {
        $el: $el,
        el: $el[0],
        type: 'toast',
      });

      $el[0].f7Modal = toast;

      if (closeButton) {
        $el.find('.toast-button').on('click', function () {
          toast.emit('local::closeButtonClick toastCloseButtonClick', toast);
          toast.close();
        });

        toast.on('beforeDestroy', function () {
          $el.find('.toast-button').off('click');
        });
      }

      var timeoutId;
      toast.on('open', function () {
        $('.toast.modal-in').each(function (index, openedEl) {
          var toastInstance = app.toast.get(openedEl);
          if (openedEl !== toast.el && toastInstance) {
            toastInstance.close();
          }
        });
        if (closeTimeout) {
          timeoutId = Utils.nextTick(function () {
            toast.close();
          }, closeTimeout);
        }
      });
      toast.on('close', function () {
        win.clearTimeout(timeoutId);
      });

      if (toast.params.destroyOnClose) {
        toast.once('closed', function () {
          setTimeout(function () {
            toast.destroy();
          }, 0);
        });
      }

      return toast;
    }

    if ( Modal$$1 ) Toast.__proto__ = Modal$$1;
    Toast.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Toast.prototype.constructor = Toast;

    Toast.prototype.render = function render () {
      var toast = this;
      var app = toast.app;
      if (toast.params.render) { return toast.params.render.call(toast, toast); }
      var ref = toast.params;
      var position = ref.position;
      var cssClass = ref.cssClass;
      var icon = ref.icon;
      var text = ref.text;
      var closeButton = ref.closeButton;
      var closeButtonColor = ref.closeButtonColor;
      var closeButtonText = ref.closeButtonText;
      return ("\n      <div class=\"toast toast-" + position + " " + (cssClass || '') + " " + (icon ? 'toast-with-icon' : '') + "\">\n        <div class=\"toast-content\">\n          " + (icon ? ("<div class=\"toast-icon\">" + icon + "</div>") : '') + "\n          <div class=\"toast-text\">" + text + "</div>\n          " + (closeButton && !icon ? ("\n          <a class=\"toast-button " + (app.theme === 'md' ? 'button' : 'link') + " " + (closeButtonColor ? ("color-" + closeButtonColor) : '') + "\">" + closeButtonText + "</a>\n          ").trim() : '') + "\n        </div>\n      </div>\n    ").trim();
    };

    return Toast;
  }(Modal));

  var toast = {
    name: 'toast',
    static: {
      Toast: Toast,
    },
    create: function create() {
      var app = this;
      app.toast = Utils.extend(
        {},
        ModalMethods({
          app: app,
          constructor: Toast,
          defaultSelector: '.toast.modal-in',
        }),
        {
          // Shortcuts
          show: function show(params) {
            Utils.extend(params, {
              destroyOnClose: true,
            });
            return new Toast(app, params).open();
          },
        }
      );
    },
    params: {
      toast: {
        icon: null,
        text: null,
        position: 'bottom',
        closeButton: false,
        closeButtonColor: null,
        closeButtonText: 'Ok',
        closeTimeout: null,
        cssClass: null,
        render: null,
      },
    },
  };

  return toast;
}
framework7ComponentLoader.componentName = 'toast';

