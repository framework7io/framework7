
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

  var Sheet = (function (Modal$$1) {
    function Sheet(app, params) {
      var extendedParams = Utils.extend(
        { on: {} },
        app.params.sheet,
        params
      );

      // Extends with open/close Modal methods;
      Modal$$1.call(this, app, extendedParams);

      var sheet = this;

      sheet.params = extendedParams;

      // Find Element
      var $el;
      if (!sheet.params.el) {
        $el = $(sheet.params.content);
      } else {
        $el = $(sheet.params.el);
      }

      if ($el && $el.length > 0 && $el[0].f7Modal) {
        return $el[0].f7Modal;
      }

      if ($el.length === 0) {
        return sheet.destroy();
      }
      var $backdropEl;
      if (sheet.params.backdrop) {
        $backdropEl = app.root.children('.sheet-backdrop');
        if ($backdropEl.length === 0) {
          $backdropEl = $('<div class="sheet-backdrop"></div>');
          app.root.append($backdropEl);
        }
      }

      var $pageContentEl;
      function scrollToOpen() {
        var $scrollEl = $(sheet.params.scrollToEl).eq(0);
        if ($scrollEl.length === 0) { return; }
        $pageContentEl = $scrollEl.parents('.page-content');
        if ($pageContentEl.length === 0) { return; }

        var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
        var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
        var pageHeight = $pageContentEl[0].offsetHeight - paddingTop - $el.height();
        var pageScrollHeight = $pageContentEl[0].scrollHeight - paddingTop - $el.height();
        var pageScroll = $pageContentEl.scrollTop();

        var newPaddingBottom;

        var scrollElTop = ($scrollEl.offset().top - paddingTop) + $scrollEl[0].offsetHeight;
        if (scrollElTop > pageHeight) {
          var scrollTop = (pageScroll + scrollElTop) - pageHeight;
          if (scrollTop + pageHeight > pageScrollHeight) {
            newPaddingBottom = ((scrollTop + pageHeight) - pageScrollHeight) + paddingBottom;
            if (pageHeight === pageScrollHeight) {
              newPaddingBottom = $el.height();
            }
            $pageContentEl.css({
              'padding-bottom': (newPaddingBottom + "px"),
            });
          }
          $pageContentEl.scrollTop(scrollTop, 300);
        }
      }

      function scrollToClose() {
        if ($pageContentEl && $pageContentEl.length > 0) {
          $pageContentEl.css({
            'padding-bottom': '',
          });
        }
      }
      function handleClick(e) {
        var target = e.target;
        var $target = $(target);
        if ($target.closest(sheet.el).length === 0) {
          if (
            sheet.params.closeByBackdropClick
            && sheet.params.backdrop
            && sheet.backdropEl
            && sheet.backdropEl === target
          ) {
            sheet.close();
          } else if (sheet.params.closeByOutsideClick) {
            sheet.close();
          }
        }
      }

      sheet.on('sheetOpen', function () {
        if (sheet.params.scrollToEl) {
          scrollToOpen();
        }
      });
      sheet.on('sheetOpened', function () {
        if (sheet.params.closeByOutsideClick || sheet.params.closeByBackdropClick) {
          app.on('click', handleClick);
        }
      });
      sheet.on('sheetClose', function () {
        if (sheet.params.scrollToEl) {
          scrollToClose();
        }
        if (sheet.params.closeByOutsideClick || sheet.params.closeByBackdropClick) {
          app.off('click', handleClick);
        }
      });

      Utils.extend(sheet, {
        app: app,
        $el: $el,
        el: $el[0],
        $backdropEl: $backdropEl,
        backdropEl: $backdropEl && $backdropEl[0],
        type: 'sheet',
      });

      $el[0].f7Modal = sheet;

      return sheet;
    }

    if ( Modal$$1 ) Sheet.__proto__ = Modal$$1;
    Sheet.prototype = Object.create( Modal$$1 && Modal$$1.prototype );
    Sheet.prototype.constructor = Sheet;

    return Sheet;
  }(Modal));

  var sheet = {
    name: 'sheet',
    params: {
      sheet: {
        closeByBackdropClick: true,
        closeByOutsideClick: false,
      },
    },
    static: {
      Sheet: Sheet,
    },
    create: function create() {
      var app = this;
      if (!app.passedParams.sheet || app.passedParams.sheet.backdrop === undefined) {
        app.params.sheet.backdrop = app.theme === 'md';
      }
      app.sheet = Utils.extend(
        {},
        ModalMethods({
          app: app,
          constructor: Sheet,
          defaultSelector: '.sheet-modal.modal-in',
        })
      );
    },
    clicks: {
      '.sheet-open': function openSheet($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        if ($('.sheet-modal.modal-in').length > 0 && data.sheet && $(data.sheet)[0] !== $('.sheet-modal.modal-in')[0]) {
          app.sheet.close('.sheet-modal.modal-in');
        }
        app.sheet.open(data.sheet, data.animate);
      },
      '.sheet-close': function closeSheet($clickedEl, data) {
        if ( data === void 0 ) data = {};

        var app = this;
        app.sheet.close(data.sheet, data.animate);
      },
    },
  };

  return sheet;
}
framework7ComponentLoader.componentName = 'sheet';

