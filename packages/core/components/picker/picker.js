'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

var _pickerClass = require('./picker-class');

var _pickerClass2 = _interopRequireDefault(_pickerClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'picker',
  static: {
    Picker: _pickerClass2.default
  },
  create: function create() {
    var app = this;
    app.picker = (0, _constructorMethods2.default)({
      defaultSelector: '.picker',
      constructor: _pickerClass2.default,
      app: app,
      domProp: 'f7Picker'
    });
    app.picker.close = function close() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.picker';

      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return;
      var picker = $el[0].f7Picker;
      if (!picker || picker && !picker.opened) return;
      picker.close();
    };
  },

  params: {
    picker: {
      // Picker settings
      updateValuesOnMomentum: false,
      updateValuesOnTouchmove: true,
      rotateEffect: false,
      momentumRatio: 7,
      freeMode: false,
      cols: [],
      // Common opener settings
      containerEl: null,
      openIn: 'auto', // or 'popover' or 'sheet'
      formatValue: null,
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      toolbar: true,
      toolbarCloseText: 'Done',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'select/',
      // Render functions
      renderToolbar: null,
      render: null
    }
  }
};