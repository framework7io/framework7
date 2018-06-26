'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _panelClass = require('./panel-class');

var _panelClass2 = _interopRequireDefault(_panelClass);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'panel',
  params: {
    panel: {
      leftBreakpoint: 0,
      rightBreakpoint: 0,
      swipe: undefined, // or 'left' or 'right' or 'both'
      swipeActiveArea: 0,
      swipeCloseActiveAreaSide: 0,
      swipeCloseOpposite: true,
      swipeOnlyClose: false,
      swipeNoFollow: false,
      swipeThreshold: 0,
      closeByBackdropClick: true
    }
  },
  static: {
    Panel: _panelClass2.default
  },
  instance: {
    panel: {
      allowOpen: true
    }
  },
  create: function create() {
    var app = this;
    _utils2.default.extend(app.panel, {
      disableSwipe: function disableSwipe() {
        var panel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'both';

        var side = void 0;
        var panels = [];
        if (typeof panel === 'string') {
          if (panel === 'both') {
            side = 'both';
            panels = [app.panel.left, app.panel.right];
          } else {
            side = panel;
            panels.push(app.panel[side]);
          }
        } else {
          panels = [panel];
        }
        panels.forEach(function (panelInstance) {
          if (panelInstance) _utils2.default.extend(panelInstance, { swipeable: false });
        });
      },
      enableSwipe: function enableSwipe() {
        var panel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'both';

        var panels = [];
        var side = void 0;
        if (typeof panel === 'string') {
          side = panel;
          if (app.params.panel.swipe === 'left' && side === 'right' || app.params.panel.swipe === 'right' && side === 'left' || side === 'both') {
            side = 'both';
            app.params.panel.swipe = side;
            panels = [app.panel.left, app.panel.right];
          } else {
            app.params.panel.swipe = side;
            panels.push(app.panel[side]);
          }
        } else if (panel) {
          panels.push(panel);
        }
        if (panels.length) {
          panels.forEach(function (panelInstance) {
            if (!panelInstance) return;
            if (!panelInstance.swipeInitialized) {
              panelInstance.initSwipePanel();
            } else {
              _utils2.default.extend(panelInstance, { swipeable: true });
            }
          });
        }
      },
      create: function create(params) {
        return new _panelClass2.default(app, params);
      },
      open: function open(side, animate) {
        var panelSide = side;
        if (!panelSide) {
          if ((0, _dom2.default)('.panel').length > 1) {
            return false;
          }
          panelSide = (0, _dom2.default)('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) return false;
        if (app.panel[panelSide]) {
          return app.panel[panelSide].open(animate);
        }
        var $panelEl = (0, _dom2.default)('.panel-' + panelSide);
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl }).open(animate);
        }
        return false;
      },
      close: function close(side, animate) {
        var $panelEl = void 0;
        var panelSide = void 0;
        if (panelSide) {
          panelSide = side;
          $panelEl = (0, _dom2.default)('.panel-' + panelSide);
        } else {
          $panelEl = (0, _dom2.default)('.panel.panel-active');
          panelSide = $panelEl.hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) return false;
        if (app.panel[panelSide]) {
          return app.panel[panelSide].close(animate);
        }
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl }).close(animate);
        }
        return false;
      },
      get: function get(side) {
        var panelSide = side;
        if (!panelSide) {
          if ((0, _dom2.default)('.panel').length > 1) {
            return undefined;
          }
          panelSide = (0, _dom2.default)('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) return undefined;
        if (app.panel[panelSide]) {
          return app.panel[panelSide];
        }
        var $panelEl = (0, _dom2.default)('.panel-' + panelSide);
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl });
        }
        return undefined;
      }
    });
  },

  on: {
    init: function init() {
      var app = this;

      // Create Panels
      (0, _dom2.default)('.panel').each(function (index, panelEl) {
        var side = (0, _dom2.default)(panelEl).hasClass('panel-left') ? 'left' : 'right';
        app.panel[side] = app.panel.create({ el: panelEl, side: side });
      });
    }
  },
  clicks: {
    '.panel-open': function open(clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      var side = 'left';
      if (data.panel === 'right' || (0, _dom2.default)('.panel').length === 1 && (0, _dom2.default)('.panel').hasClass('panel-right')) {
        side = 'right';
      }
      app.panel.open(side, data.animate);
    },
    '.panel-close': function close(clickedEl) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var app = this;
      var side = data.panel;
      app.panel.close(side, data.animate);
    },
    '.panel-backdrop': function close() {
      var app = this;
      var $panelEl = (0, _dom2.default)('.panel-active');
      var instance = $panelEl[0] && $panelEl[0].f7Panel;
      $panelEl.trigger('panel:backdrop-click');
      if (instance) {
        instance.emit('backdropClick', instance);
      }
      app.emit('panelBackdropClick', instance || $panelEl[0]);
      if (app.params.panel.closeByBackdropClick) app.panel.close();
    }
  }
};