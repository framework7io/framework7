'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Support = exports.Device = exports.Utils = exports.Request = exports.Dom7 = exports.Template7 = undefined;

var _template = require('template7');

var _template2 = _interopRequireDefault(_template);

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _appClass = require('./components/app/app-class');

var _appClass2 = _interopRequireDefault(_appClass);

var _request = require('./utils/request');

var _request2 = _interopRequireDefault(_request);

var _utils = require('./utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _support = require('./utils/support');

var _support2 = _interopRequireDefault(_support);

var _device = require('./utils/device');

var _device2 = _interopRequireDefault(_device);

var _device3 = require('./modules/device/device');

var _device4 = _interopRequireDefault(_device3);

var _support3 = require('./modules/support/support');

var _support4 = _interopRequireDefault(_support3);

var _utils3 = require('./modules/utils/utils');

var _utils4 = _interopRequireDefault(_utils3);

var _resize = require('./modules/resize/resize');

var _resize2 = _interopRequireDefault(_resize);

var _request3 = require('./modules/request/request');

var _request4 = _interopRequireDefault(_request3);

var _touch = require('./modules/touch/touch');

var _touch2 = _interopRequireDefault(_touch);

var _clicks = require('./modules/clicks/clicks');

var _clicks2 = _interopRequireDefault(_clicks);

var _router = require('./modules/router/router');

var _router2 = _interopRequireDefault(_router);

var _history = require('./modules/history/history');

var _history2 = _interopRequireDefault(_history);

var _storage = require('./modules/storage/storage');

var _storage2 = _interopRequireDefault(_storage);

var _statusbar = require('./components/statusbar/statusbar');

var _statusbar2 = _interopRequireDefault(_statusbar);

var _view = require('./components/view/view');

var _view2 = _interopRequireDefault(_view);

var _navbar = require('./components/navbar/navbar');

var _navbar2 = _interopRequireDefault(_navbar);

var _toolbar = require('./components/toolbar/toolbar');

var _toolbar2 = _interopRequireDefault(_toolbar);

var _subnavbar = require('./components/subnavbar/subnavbar');

var _subnavbar2 = _interopRequireDefault(_subnavbar);

var _touchRipple = require('./components/touch-ripple/touch-ripple');

var _touchRipple2 = _interopRequireDefault(_touchRipple);

var _modal = require('./components/modal/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// F7 Class
/**
 * Framework7 3.0.0-beta.14
 * Full featured mobile HTML framework for building iOS & Android apps
 * http://framework7.io/
 *
 * Copyright 2014-2018 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: June 24, 2018
 */

if ("es" !== 'es') {
  if (typeof window !== 'undefined') {
    // Template7
    if (!window.Template7) window.Template7 = _template2.default;

    // Dom7
    if (!window.Dom7) window.Dom7 = _dom2.default;
  }
}

// Install Core Modules & Components


// Core Components


// Core Modules


// Import Helpers
_appClass2.default.use([_device4.default, _support4.default, _utils4.default, _resize2.default, _request4.default, _touch2.default, _clicks2.default, _router2.default, _history2.default, _storage2.default, _statusbar2.default, _view2.default, _navbar2.default, _toolbar2.default, _subnavbar2.default, _touchRipple2.default, _modal2.default]);

exports.Template7 = _template2.default;
exports.Dom7 = _dom2.default;
exports.Request = _request2.default;
exports.Utils = _utils2.default;
exports.Device = _device2.default;
exports.Support = _support2.default;
exports.default = _appClass2.default;