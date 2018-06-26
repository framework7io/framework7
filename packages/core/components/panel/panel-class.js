'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

var _swipePanel = require('./swipe-panel');

var _swipePanel2 = _interopRequireDefault(_swipePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Panel = function (_Framework7Class) {
  _inherits(Panel, _Framework7Class);

  function Panel(app) {
    var _ret, _ret2, _ret3;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Panel);

    var _this = _possibleConstructorReturn(this, (Panel.__proto__ || Object.getPrototypeOf(Panel)).call(this, params, [app]));

    var panel = _this;

    var el = params.el;
    var $el = (0, _dom2.default)(el);
    if ($el.length === 0) return _ret = panel, _possibleConstructorReturn(_this, _ret);
    if ($el[0].f7Panel) return _ret2 = $el[0].f7Panel, _possibleConstructorReturn(_this, _ret2);

    $el[0].f7Panel = panel;

    var opened = params.opened,
        side = params.side,
        effect = params.effect;

    if (typeof opened === 'undefined') opened = $el.hasClass('panel-active');
    if (typeof side === 'undefined') side = $el.hasClass('panel-left') ? 'left' : 'right';
    if (typeof effect === 'undefined') effect = $el.hasClass('panel-cover') ? 'cover' : 'reveal';

    if (!app.panel[side]) {
      _utils2.default.extend(app.panel, _defineProperty({}, side, panel));
    }

    var $backdropEl = (0, _dom2.default)('.panel-backdrop');
    if ($backdropEl.length === 0) {
      $backdropEl = (0, _dom2.default)('<div class="panel-backdrop"></div>');
      $backdropEl.insertBefore($el);
    }

    _utils2.default.extend(panel, {
      app: app,
      side: side,
      effect: effect,
      $el: $el,
      el: $el[0],
      opened: opened,
      $backdropEl: $backdropEl,
      backdropEl: $backdropEl[0]
    });

    // Install Modules
    panel.useModules();

    // Init
    panel.init();

    return _ret3 = panel, _possibleConstructorReturn(_this, _ret3);
  }

  _createClass(Panel, [{
    key: 'init',
    value: function init() {
      var panel = this;
      var app = panel.app;
      if (app.params.panel[panel.side + 'Breakpoint']) {
        panel.initBreakpoints();
      }
      if ("universal" !== 'desktop') {
        if (app.params.panel.swipe === panel.side || app.params.panel.swipe === 'both' || app.params.panel.swipe && app.params.panel.swipe !== panel.side && app.params.panel.swipeCloseOpposite) {
          panel.initSwipePanel();
        }
      }
    }
  }, {
    key: 'getViewEl',
    value: function getViewEl() {
      var panel = this;
      var app = panel.app;
      var viewEl = void 0;
      if (app.root.children('.views').length > 0) {
        viewEl = app.root.children('.views')[0];
      } else {
        viewEl = app.root.children('.view')[0];
      }
      return viewEl;
    }
  }, {
    key: 'setBreakpoint',
    value: function setBreakpoint() {
      var panel = this;
      var app = panel.app;
      var side = panel.side,
          $el = panel.$el;

      var $viewEl = (0, _dom2.default)(panel.getViewEl());
      var breakpoint = app.params.panel[side + 'Breakpoint'];
      var wasVisible = $el.hasClass('panel-visible-by-breakpoint');

      if (app.width >= breakpoint) {
        if (!wasVisible) {
          (0, _dom2.default)('html').removeClass('with-panel-' + side + '-reveal with-panel-' + side + '-cover with-panel');
          $el.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('panel-active');
          panel.onOpen();
          panel.onOpened();
          $viewEl.css(_defineProperty({}, 'margin-' + side, $el.width() + 'px'));
          app.allowPanelOpen = true;
          app.emit('local::breakpoint panelBreakpoint');
          panel.$el.trigger('panel:breakpoint', panel);
        }
      } else if (wasVisible) {
        $el.css('display', '').removeClass('panel-visible-by-breakpoint panel-active');
        panel.onClose();
        panel.onClosed();
        $viewEl.css(_defineProperty({}, 'margin-' + side, ''));
        app.emit('local::breakpoint panelBreakpoint');
        panel.$el.trigger('panel:breakpoint', panel);
      }
    }
  }, {
    key: 'initBreakpoints',
    value: function initBreakpoints() {
      var panel = this;
      var app = panel.app;
      panel.resizeHandler = function resizeHandler() {
        panel.setBreakpoint();
      };
      if (app.params.panel[panel.side + 'Breakpoint']) {
        app.on('resize', panel.resizeHandler);
      }
      panel.setBreakpoint();
      return panel;
    }
  }, {
    key: 'initSwipePanel',
    value: function initSwipePanel() {
      if (process.env.TARGET !== 'desktop') {
        (0, _swipePanel2.default)(this);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var panel = this;
      var app = panel.app;

      panel.emit('local::beforeDestroy panelBeforeDestroy', panel);
      panel.$el.trigger('panel:beforedestroy', panel);

      if (panel.resizeHandler) {
        app.off('resize', panel.resizeHandler);
      }
      panel.$el.trigger('panel:destroy', panel);
      panel.emit('local::destroy panelDestroy');
      delete app.panel[panel.side];
      delete panel.el.f7Panel;
      _utils2.default.deleteProps(panel);
      panel = null;
    }
  }, {
    key: 'open',
    value: function open() {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var panel = this;
      var app = panel.app;
      if (!app.panel.allowOpen) return false;

      var side = panel.side,
          effect = panel.effect,
          $el = panel.$el,
          $backdropEl = panel.$backdropEl,
          opened = panel.opened;

      // Ignore if opened

      if (opened || $el.hasClass('panel-visible-by-breakpoint') || $el.hasClass('panel-active')) return false;

      // Close if some panel is opened
      app.panel.close(side === 'left' ? 'right' : 'left', animate);

      app.panel.allowOpen = false;

      $el[animate ? 'removeClass' : 'addClass']('not-animated');
      $el.css({ display: 'block' }).addClass('panel-active');

      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
      $backdropEl.show();

      /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
      panel._clientLeft = $el[0].clientLeft;

      (0, _dom2.default)('html').addClass('with-panel with-panel-' + side + '-' + effect);
      panel.onOpen();

      // Transition End;
      var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

      function panelTransitionEnd() {
        transitionEndTarget.transitionEnd(function (e) {
          if ((0, _dom2.default)(e.target).is(transitionEndTarget)) {
            if ($el.hasClass('panel-active')) {
              panel.onOpened();
              $backdropEl.css({ display: '' });
            } else {
              panel.onClosed();
              $backdropEl.css({ display: '' });
            }
          } else panelTransitionEnd();
        });
      }
      if (animate) {
        panelTransitionEnd();
      } else {
        panel.onOpened();
        $backdropEl.css({ display: '' });
      }

      return true;
    }
  }, {
    key: 'close',
    value: function close() {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      var panel = this;
      var app = panel.app;

      var side = panel.side,
          effect = panel.effect,
          $el = panel.$el,
          $backdropEl = panel.$backdropEl,
          opened = panel.opened;


      if (!opened || $el.hasClass('panel-visible-by-breakpoint') || !$el.hasClass('panel-active')) return false;

      $el[animate ? 'removeClass' : 'addClass']('not-animated');
      $el.removeClass('panel-active');

      $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');

      var transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

      panel.onClose();
      app.panel.allowOpen = false;

      if (animate) {
        transitionEndTarget.transitionEnd(function () {
          if ($el.hasClass('panel-active')) return;
          $el.css({ display: '' });
          (0, _dom2.default)('html').removeClass('with-panel-transitioning');
          panel.onClosed();
        });
        (0, _dom2.default)('html').removeClass('with-panel with-panel-' + side + '-' + effect).addClass('with-panel-transitioning');
      } else {
        $el.css({ display: '' });
        $el.removeClass('not-animated');
        (0, _dom2.default)('html').removeClass('with-panel with-panel-transitioning with-panel-' + side + '-' + effect);
        panel.onClosed();
      }
      return true;
    }
  }, {
    key: 'onOpen',
    value: function onOpen() {
      var panel = this;
      panel.opened = true;
      panel.$el.trigger('panel:open', panel);
      panel.emit('local::open panelOpen', panel);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var panel = this;
      var app = panel.app;
      app.panel.allowOpen = true;

      panel.$el.trigger('panel:opened', panel);
      panel.emit('local::opened panelOpened', panel);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var panel = this;
      panel.opened = false;
      panel.$el.addClass('panel-closing');
      panel.$el.trigger('panel:close', panel);
      panel.emit('local::close panelClose', panel);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var panel = this;
      var app = panel.app;
      app.panel.allowOpen = true;
      panel.$el.removeClass('panel-closing');
      panel.$el.trigger('panel:closed', panel);
      panel.emit('local::closed panelClosed', panel);
    }
  }]);

  return Panel;
}(_class2.default);

exports.default = Panel;