'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coreClass = require('./components/core/core-class');

var _coreClass2 = _interopRequireDefault(_coreClass);

var _device = require('./modules/device/device');

var _device2 = _interopRequireDefault(_device);

var _support = require('./modules/support/support');

var _support2 = _interopRequireDefault(_support);

var _browser = require('./modules/browser/browser');

var _browser2 = _interopRequireDefault(_browser);

var _resize = require('./modules/resize/resize');

var _resize2 = _interopRequireDefault(_resize);

var _observer = require('./modules/observer/observer');

var _observer2 = _interopRequireDefault(_observer);

var _virtual = require('./components/virtual/virtual');

var _virtual2 = _interopRequireDefault(_virtual);

var _navigation = require('./components/navigation/navigation');

var _navigation2 = _interopRequireDefault(_navigation);

var _pagination = require('./components/pagination/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

var _scrollbar = require('./components/scrollbar/scrollbar');

var _scrollbar2 = _interopRequireDefault(_scrollbar);

var _parallax = require('./components/parallax/parallax');

var _parallax2 = _interopRequireDefault(_parallax);

var _zoom = require('./components/zoom/zoom');

var _zoom2 = _interopRequireDefault(_zoom);

var _lazy = require('./components/lazy/lazy');

var _lazy2 = _interopRequireDefault(_lazy);

var _controller = require('./components/controller/controller');

var _controller2 = _interopRequireDefault(_controller);

var _a11y = require('./components/a11y/a11y');

var _a11y2 = _interopRequireDefault(_a11y);

var _autoplay = require('./components/autoplay/autoplay');

var _autoplay2 = _interopRequireDefault(_autoplay);

var _effectFade = require('./components/effect-fade/effect-fade');

var _effectFade2 = _interopRequireDefault(_effectFade);

var _effectCube = require('./components/effect-cube/effect-cube');

var _effectCube2 = _interopRequireDefault(_effectCube);

var _effectFlip = require('./components/effect-flip/effect-flip');

var _effectFlip2 = _interopRequireDefault(_effectFlip);

var _effectCoverflow = require('./components/effect-coverflow/effect-coverflow');

var _effectCoverflow2 = _interopRequireDefault(_effectCoverflow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Components
// Swiper Class
_coreClass2.default.use([_device2.default, _browser2.default, _support2.default, _resize2.default, _observer2.default, _virtual2.default, _navigation2.default, _pagination2.default, _scrollbar2.default, _parallax2.default, _zoom2.default, _lazy2.default, _controller2.default, _a11y2.default, _autoplay2.default, _effectFade2.default, _effectCube2.default, _effectFlip2.default, _effectCoverflow2.default]);

// Core Modules
exports.default = _coreClass2.default;