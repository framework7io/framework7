'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var Preloader = {
  init: function init(el) {
    var app = this;
    if (app.theme !== 'md') return;
    var $el = (0, _dom2.default)(el);
    if ($el.length === 0 || $el.children('.preloader-inner').length > 0) return;
    $el.append(_utils2.default.mdPreloaderContent);
  },

  // Modal
  visible: false,
  show: function show() {
    var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'white';

    var app = this;
    if (Preloader.visible) return;
    var preloaderInner = app.theme !== 'md' ? '' : _utils2.default.mdPreloaderContent;
    (0, _dom2.default)('html').addClass('with-modal-preloader');
    app.root.append('\n      <div class="preloader-backdrop"></div>\n      <div class="preloader-modal">\n        <div class="preloader color-' + color + '">' + preloaderInner + '</div>\n      </div>\n    ');
    Preloader.visible = true;
  },
  hide: function hide() {
    var app = this;
    if (!Preloader.visible) return;
    (0, _dom2.default)('html').removeClass('with-modal-preloader');
    app.root.find('.preloader-backdrop, .preloader-modal').remove();
    Preloader.visible = false;
  }
};
exports.default = {
  name: 'preloader',
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      preloader: {
        init: Preloader.init.bind(app),
        show: Preloader.show.bind(app),
        hide: Preloader.hide.bind(app)
      }
    });
  },

  on: {
    photoBrowserOpen: function photoBrowserOpen(pb) {
      var app = this;
      if (app.theme !== 'md') return;
      pb.$el.find('.preloader').each(function (index, preloaderEl) {
        app.preloader.init(preloaderEl);
      });
    },
    pageInit: function pageInit(page) {
      var app = this;
      if (app.theme !== 'md') return;
      page.$el.find('.preloader').each(function (index, preloaderEl) {
        app.preloader.init(preloaderEl);
      });
    }
  }
};