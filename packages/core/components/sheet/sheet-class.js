'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('../modal/modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sheet = function (_Modal) {
  _inherits(Sheet, _Modal);

  function Sheet(app, params) {
    var _ret3;

    _classCallCheck(this, Sheet);

    var extendedParams = _utils2.default.extend({ on: {} }, app.params.sheet, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (Sheet.__proto__ || Object.getPrototypeOf(Sheet)).call(this, app, extendedParams));

    var sheet = _this;

    sheet.params = extendedParams;

    // Find Element
    var $el = void 0;
    if (!sheet.params.el) {
      $el = (0, _dom2.default)(sheet.params.content);
    } else {
      $el = (0, _dom2.default)(sheet.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = sheet.destroy(), _possibleConstructorReturn(_this, _ret2);
    }
    var $backdropEl = void 0;
    if (sheet.params.backdrop) {
      $backdropEl = app.root.children('.sheet-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = (0, _dom2.default)('<div class="sheet-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    var $pageContentEl = void 0;
    function scrollToOpen() {
      var $scrollEl = (0, _dom2.default)(sheet.params.scrollToEl).eq(0);
      if ($scrollEl.length === 0) return;
      $pageContentEl = $scrollEl.parents('.page-content');
      if ($pageContentEl.length === 0) return;

      var paddingTop = parseInt($pageContentEl.css('padding-top'), 10);
      var paddingBottom = parseInt($pageContentEl.css('padding-bottom'), 10);
      var pageHeight = $pageContentEl[0].offsetHeight - paddingTop - $el.height();
      var pageScrollHeight = $pageContentEl[0].scrollHeight - paddingTop - $el.height();
      var pageScroll = $pageContentEl.scrollTop();

      var newPaddingBottom = void 0;

      var scrollElTop = $scrollEl.offset().top - paddingTop + $scrollEl[0].offsetHeight;
      if (scrollElTop > pageHeight) {
        var scrollTop = pageScroll + scrollElTop - pageHeight;
        if (scrollTop + pageHeight > pageScrollHeight) {
          newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
          if (pageHeight === pageScrollHeight) {
            newPaddingBottom = $el.height();
          }
          $pageContentEl.css({
            'padding-bottom': newPaddingBottom + 'px'
          });
        }
        $pageContentEl.scrollTop(scrollTop, 300);
      }
    }

    function scrollToClose() {
      if ($pageContentEl && $pageContentEl.length > 0) {
        $pageContentEl.css({
          'padding-bottom': ''
        });
      }
    }
    function handleClick(e) {
      var target = e.target;
      var $target = (0, _dom2.default)(target);
      if ($target.closest(sheet.el).length === 0) {
        if (sheet.params.closeByBackdropClick && sheet.params.backdrop && sheet.backdropEl && sheet.backdropEl === target) {
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

    _utils2.default.extend(sheet, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'sheet'
    });

    $el[0].f7Modal = sheet;

    return _ret3 = sheet, _possibleConstructorReturn(_this, _ret3);
  }

  return Sheet;
}(_modalClass2.default);

exports.default = Sheet;