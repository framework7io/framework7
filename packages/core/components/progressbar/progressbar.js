'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progressbar = {
  set: function set() {
    var app = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var el = args[0],
        progress = args[1],
        duration = args[2];

    if (typeof args[0] === 'number') {
      progress = args[0];
      duration = args[1];

      el = app.root;
    }
    if (typeof progress === 'undefined' || progress === null) return el;
    if (!progress) progress = 0;

    var $el = (0, _dom2.default)(el || app.root);
    if ($el.length === 0) {
      return el;
    }
    var progressNormalized = Math.min(Math.max(progress, 0), 100);
    var $progressbarEl = void 0;
    if ($el.hasClass('progressbar')) $progressbarEl = $el.eq(0);else {
      $progressbarEl = $el.children('.progressbar');
    }
    if ($progressbarEl.length === 0 || $progressbarEl.hasClass('progressbar-infinite')) {
      return $progressbarEl;
    }
    var $progressbarLine = $progressbarEl.children('span');
    if ($progressbarLine.length === 0) {
      $progressbarLine = (0, _dom2.default)('<span></span>');
      $progressbarEl.append($progressbarLine);
    }
    $progressbarLine.transition(typeof duration !== 'undefined' ? duration : '').transform('translate3d(' + (-100 + progressNormalized) + '%,0,0)');

    return $progressbarEl[0];
  },
  show: function show() {
    var app = this;

    // '.page', 50, 'multi'

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var el = args[0],
        progress = args[1],
        color = args[2];

    var type = 'determined';

    if (args.length === 2) {
      if ((typeof args[0] === 'string' || _typeof(args[0]) === 'object') && typeof args[1] === 'string') {
        el = args[0];
        // '.page', 'multi'

        color = args[1];
        progress = args[2];

        type = 'infinite';
      } else if (typeof args[0] === 'number' && typeof args[1] === 'string') {
        progress = args[0];
        // 50, 'multi'

        color = args[1];

        el = app.root;
      }
    } else if (args.length === 1) {
      if (typeof args[0] === 'number') {
        el = app.root;
        progress = args[0];
      } else if (typeof args[0] === 'string') {
        type = 'infinite';
        el = app.root;
        color = args[0];
      }
    } else if (args.length === 0) {
      type = 'infinite';
      el = app.root;
    }

    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return undefined;

    var $progressbarEl = void 0;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar:not(.progressbar-out), .progressbar-infinite:not(.progressbar-out)');
      if ($progressbarEl.length === 0) {
        $progressbarEl = (0, _dom2.default)('\n          <span class="progressbar' + (type === 'infinite' ? '-infinite' : '') + (color ? ' color-' + color : '') + ' progressbar-in">\n            ' + (type === 'infinite' ? '' : '<span></span>') + '\n          </span>');
        $el.append($progressbarEl);
      }
    }

    if (typeof progress !== 'undefined') {
      app.progressbar.set($progressbarEl, progress);
    }

    return $progressbarEl[0];
  },
  hide: function hide(el) {
    var removeAfterHide = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    var app = this;
    var $el = (0, _dom2.default)(el || app.root);
    if ($el.length === 0) return undefined;
    var $progressbarEl = void 0;
    if ($el.hasClass('progressbar') || $el.hasClass('progressbar-infinite')) {
      $progressbarEl = $el;
    } else {
      $progressbarEl = $el.children('.progressbar, .progressbar-infinite');
    }
    if ($progressbarEl.length === 0 || !$progressbarEl.hasClass('progressbar-in') || $progressbarEl.hasClass('progressbar-out')) {
      return $progressbarEl;
    }
    $progressbarEl.removeClass('progressbar-in').addClass('progressbar-out').animationEnd(function () {
      if (removeAfterHide) {
        $progressbarEl.remove();
      }
    });
    return $progressbarEl;
  }
};

exports.default = {
  name: 'progressbar',
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      progressbar: {
        set: Progressbar.set.bind(app),
        show: Progressbar.show.bind(app),
        hide: Progressbar.hide.bind(app)
      }
    });
  },

  on: {
    pageInit: function pageInit(page) {
      var app = this;
      page.$el.find('.progressbar').each(function (index, progressbarEl) {
        var $progressbarEl = (0, _dom2.default)(progressbarEl);
        app.progressbar.set($progressbarEl, $progressbarEl.attr('data-progress'));
      });
    }
  }
};