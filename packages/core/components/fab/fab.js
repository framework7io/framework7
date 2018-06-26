'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fab = {
  morphOpen: function morphOpen(fabEl, targetEl) {
    var app = this;
    var $fabEl = (0, _dom2.default)(fabEl);
    var $targetEl = (0, _dom2.default)(targetEl);
    if ($targetEl.length === 0) return;

    $targetEl.transition(0).addClass('fab-morph-target-visible');
    var target = {
      width: $targetEl[0].offsetWidth,
      height: $targetEl[0].offsetHeight,
      offset: $targetEl.offset(),
      borderRadius: $targetEl.css('border-radius'),
      zIndex: $targetEl.css('z-index')
    };
    var fab = {
      width: $fabEl[0].offsetWidth,
      height: $fabEl[0].offsetHeight,
      offset: $fabEl.offset(),
      translateX: _utils2.default.getTranslate($fabEl[0], 'x'),
      translateY: _utils2.default.getTranslate($fabEl[0], 'y')
    };

    $fabEl[0].f7FabMorphData = {
      $targetEl: $targetEl,
      target: target,
      fab: fab
    };

    var diffX = fab.offset.left + fab.width / 2 - (target.offset.left + target.width / 2) - fab.translateX;
    var diffY = fab.offset.top + fab.height / 2 - (target.offset.top + target.height / 2) - fab.translateY;
    var scaleX = target.width / fab.width;
    var scaleY = target.height / fab.height;

    var borderRadius = Math.ceil(parseInt(target.borderRadius, 10) / Math.max(scaleX, scaleY));
    if (borderRadius > 0) borderRadius += 2;

    $fabEl[0].f7FabMorphResizeHandler = function resizeHandler() {
      $fabEl.transition(0).transform('');
      $targetEl.transition(0);
      target.width = $targetEl[0].offsetWidth;
      target.height = $targetEl[0].offsetHeight;
      target.offset = $targetEl.offset();
      fab.offset = $fabEl.offset();

      var diffXNew = fab.offset.left + fab.width / 2 - (target.offset.left + target.width / 2) - fab.translateX;
      var diffYNew = fab.offset.top + fab.height / 2 - (target.offset.top + target.height / 2) - fab.translateY;
      var scaleXNew = target.width / fab.width;
      var scaleYNew = target.height / fab.height;

      $fabEl.transform('translate3d(' + -diffXNew + 'px, ' + -diffYNew + 'px, 0) scale(' + scaleXNew + ', ' + scaleYNew + ')');
    };

    $targetEl.css('opacity', 0).transform('scale(' + 1 / scaleX + ', ' + 1 / scaleY + ')');
    $fabEl.addClass('fab-opened').css('z-index', target.zIndex - 1).transform('translate3d(' + -diffX + 'px, ' + -diffY + 'px, 0)');
    $fabEl.transitionEnd(function () {
      $targetEl.transition('');
      _utils2.default.nextTick(function () {
        $targetEl.css('opacity', 1).transform('scale(1,1)');
      });
      $fabEl.transform('translate3d(' + -diffX + 'px, ' + -diffY + 'px, 0) scale(' + scaleX + ', ' + scaleY + ')').css('border-radius', borderRadius + 'px').css('box-shadow', 'none');
      app.on('resize', $fabEl[0].f7FabMorphResizeHandler);
      if ($targetEl.parents('.page-content').length > 0) {
        $targetEl.parents('.page-content').on('scroll', $fabEl[0].f7FabMorphResizeHandler);
      }
    });
  },
  morphClose: function morphClose(fabEl) {
    var app = this;
    var $fabEl = (0, _dom2.default)(fabEl);
    var morphData = $fabEl[0].f7FabMorphData;
    if (!morphData) return;
    var $targetEl = morphData.$targetEl,
        target = morphData.target,
        fab = morphData.fab;

    if ($targetEl.length === 0) return;

    var diffX = fab.offset.left + fab.width / 2 - (target.offset.left + target.width / 2) - fab.translateX;
    var diffY = fab.offset.top + fab.height / 2 - (target.offset.top + target.height / 2) - fab.translateY;
    var scaleX = target.width / fab.width;
    var scaleY = target.height / fab.height;

    app.off('resize', $fabEl[0].f7FabMorphResizeHandler);
    if ($targetEl.parents('.page-content').length > 0) {
      $targetEl.parents('.page-content').off('scroll', $fabEl[0].f7FabMorphResizeHandler);
    }

    $targetEl.css('opacity', 0).transform('scale(' + 1 / scaleX + ', ' + 1 / scaleY + ')');
    $fabEl.transition('').css('box-shadow', '').css('border-radius', '').transform('translate3d(' + -diffX + 'px, ' + -diffY + 'px, 0)');
    $fabEl.transitionEnd(function () {
      $fabEl.css('z-index', '').removeClass('fab-opened').transform('');
      _utils2.default.nextTick(function () {
        $fabEl.transitionEnd(function () {
          $targetEl.removeClass('fab-morph-target-visible').css('opacity', '').transform('').transition('');
        });
      });
    });
  },
  open: function open(fabEl, targetEl) {
    var app = this;
    var $fabEl = (0, _dom2.default)(fabEl).eq(0);
    var $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) return;
    if ($fabEl.hasClass('fab-opened')) return;
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) return;

    if (app.fab.openedEl) {
      if (app.fab.openedEl === $fabEl[0]) return;
      app.fab.close(app.fab.openedEl);
    }
    app.fab.openedEl = $fabEl[0];
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphOpen($fabEl, targetEl || $fabEl.attr('data-morph-to'));
    } else {
      $fabEl.addClass('fab-opened');
    }
    $fabEl.trigger('fab:open');
  },
  close: function close() {
    var fabEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.fab-opened';

    var app = this;
    var $fabEl = (0, _dom2.default)(fabEl).eq(0);
    var $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) return;
    if (!$fabEl.hasClass('fab-opened')) return;
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) return;
    app.fab.openedEl = null;
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphClose($fabEl);
    } else {
      $fabEl.removeClass('fab-opened');
    }
    $fabEl.trigger('fab:close');
  },
  toggle: function toggle(fabEl) {
    var app = this;
    var $fabEl = (0, _dom2.default)(fabEl);
    if (!$fabEl.hasClass('fab-opened')) app.fab.open(fabEl);else app.fab.close(fabEl);
  }
};

exports.default = {
  name: 'fab',
  create: function create() {
    var app = this;
    _utils2.default.extend(app, {
      fab: {
        openedEl: null,
        morphOpen: Fab.morphOpen.bind(app),
        morphClose: Fab.morphClose.bind(app),
        open: Fab.open.bind(app),
        close: Fab.close.bind(app),
        toggle: Fab.toggle.bind(app)
      }
    });
  },

  clicks: {
    '.fab > a': function open($clickedEl) {
      var app = this;
      app.fab.toggle($clickedEl.parents('.fab'));
    },
    '.fab-open': function open($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.fab.open(data.fab);
    },
    '.fab-close': function close($clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      app.fab.close(data.fab);
    }
  }
};