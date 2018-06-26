'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _events = require('./events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f7 = {
  instance: null,
  Framework7: null,
  init: function init(rootEl) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var routes = arguments[2];

    var f7Params = _utils2.default.extend({}, params, {
      root: rootEl
    });
    if (routes && routes.length && !f7Params.routes) f7Params.routes = routes;

    f7.instance = new f7.Framework7(f7Params);
    _events2.default.emit('ready', f7.instance);
  },
  ready: function ready(callback) {
    if (!callback) return;
    if (f7.instance) callback(f7.instance);else {
      _events2.default.once('ready', callback);
    }
  },

  routers: {
    views: [],
    tabs: [],
    modals: null
  }
};

exports.default = f7;