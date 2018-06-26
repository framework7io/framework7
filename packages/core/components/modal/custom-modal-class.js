'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _modalClass = require('./modal-class');

var _modalClass2 = _interopRequireDefault(_modalClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomModal = function (_Modal) {
  _inherits(CustomModal, _Modal);

  function CustomModal(app, params) {
    var _ret3;

    _classCallCheck(this, CustomModal);

    var extendedParams = _utils2.default.extend({
      backdrop: true,
      closeByBackdropClick: true,
      on: {}
    }, params);

    // Extends with open/close Modal methods;

    var _this = _possibleConstructorReturn(this, (CustomModal.__proto__ || Object.getPrototypeOf(CustomModal)).call(this, app, extendedParams));

    var customModal = _this;

    customModal.params = extendedParams;

    // Find Element
    var $el = void 0;
    if (!customModal.params.el) {
      $el = (0, _dom2.default)(customModal.params.content);
    } else {
      $el = (0, _dom2.default)(customModal.params.el);
    }

    if ($el && $el.length > 0 && $el[0].f7Modal) {
      var _ret;

      return _ret = $el[0].f7Modal, _possibleConstructorReturn(_this, _ret);
    }

    if ($el.length === 0) {
      var _ret2;

      return _ret2 = customModal.destroy(), _possibleConstructorReturn(_this, _ret2);
    }
    var $backdropEl = void 0;
    if (customModal.params.backdrop) {
      $backdropEl = app.root.children('.custom-modal-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = (0, _dom2.default)('<div class="custom-modal-backdrop"></div>');
        app.root.append($backdropEl);
      }
    }

    function handleClick(e) {
      if (!customModal || customModal.destroyed) return;
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

    _utils2.default.extend(customModal, {
      app: app,
      $el: $el,
      el: $el[0],
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
      type: 'customModal'
    });

    $el[0].f7Modal = customModal;

    return _ret3 = customModal, _possibleConstructorReturn(_this, _ret3);
  }

  return CustomModal;
}(_modalClass2.default);

exports.default = CustomModal;