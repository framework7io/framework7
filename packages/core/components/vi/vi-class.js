'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _ssrWindow = require('ssr-window');

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _device = require('../../utils/device');

var _device2 = _interopRequireDefault(_device);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViAd = function (_Framework7Class) {
  _inherits(ViAd, _Framework7Class);

  function ViAd(app) {
    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, ViAd);

    var _this = _possibleConstructorReturn(this, (ViAd.__proto__ || Object.getPrototypeOf(ViAd)).call(this, params, [app]));

    var vi = _this;
    if (!_ssrWindow.window.vi) {
      throw new Error('Framework7: vi SDK not found.');
    }

    var orientation = void 0;
    if (typeof _ssrWindow.window.orientation !== 'undefined') {
      orientation = _ssrWindow.window.orientation === -90 || _ssrWindow.window.orientation === 90 ? 'horizontal' : 'vertical';
    }
    var defaults = _utils2.default.extend({}, app.params.vi, {
      appId: app.id,
      appVer: app.version,
      language: app.language,
      width: app.width,
      height: app.height,
      os: _device2.default.os,
      osVersion: _device2.default.osVersion,
      orientation: orientation
    });

    // Extend defaults with modules params
    vi.useModulesParams(defaults);

    vi.params = _utils2.default.extend(defaults, params);

    var adParams = {};
    var skipParams = 'on autoplay fallbackOverlay fallbackOverlayText enabled'.split(' ');
    Object.keys(vi.params).forEach(function (paramName) {
      if (skipParams.indexOf(paramName) >= 0) return;
      var paramValue = vi.params[paramName];
      if ([null, undefined].indexOf(paramValue) >= 0) return;
      adParams[paramName] = paramValue;
    });

    if (!vi.params.appId) {
      throw new Error('Framework7: "app.id" is required to display an ad. Make sure you have specified it on app initialization.');
    }
    if (!vi.params.placementId) {
      throw new Error('Framework7: "placementId" is required to display an ad.');
    }

    function onResize() {
      var $viFrame = (0, _dom2.default)('iframe#viAd');
      if ($viFrame.length === 0) return;
      $viFrame.css({
        width: app.width + 'px',
        height: app.height + 'px'
      });
    }

    function removeOverlay() {
      if (!vi.$overlayEl) return;
      vi.$overlayEl.off('click touchstart');
      vi.$overlayEl.remove();
    }
    function createOverlay(videoEl) {
      if (!videoEl) return;
      vi.$overlayEl = (0, _dom2.default)(('\n        <div class="vi-overlay no-fastclick">\n          ' + (vi.params.fallbackOverlayText ? '<div class="vi-overlay-text">' + vi.params.fallbackOverlayText + '</div>' : '') + '\n          <div class="vi-overlay-play-button"></div>\n        </div>\n      ').trim());

      var touchStartTime = void 0;
      vi.$overlayEl.on('touchstart', function () {
        touchStartTime = _utils2.default.now();
      });
      vi.$overlayEl.on('click', function () {
        var timeDiff = _utils2.default.now() - touchStartTime;
        if (timeDiff > 300) return;
        if (videoEl) {
          videoEl.play();
          removeOverlay();
          return;
        }
        vi.start();
        removeOverlay();
      });
      app.root.append(vi.$overlayEl);
    }

    // Create ad
    vi.ad = new _ssrWindow.window.vi.Ad(adParams);

    _utils2.default.extend(vi.ad, {
      onAdReady: function onAdReady() {
        app.on('resize', onResize);
        vi.emit('local::ready');
        if (vi.params.autoplay) {
          vi.start();
        }
      },
      onAdStarted: function onAdStarted() {
        vi.emit('local::started');
      },
      onAdClick: function onAdClick(targetUrl) {
        vi.emit('local::click', targetUrl);
      },
      onAdImpression: function onAdImpression() {
        vi.emit('local::impression');
      },
      onAdStopped: function onAdStopped(reason) {
        app.off('resize', onResize);
        removeOverlay();

        vi.emit('local::stopped', reason);
        if (reason === 'complete') {
          vi.emit('local::complete');
          vi.emit('local::completed');
        }
        if (reason === 'userexit') {
          vi.emit('local::userexit');
        }
        vi.destroyed = true;
      },
      onAutoPlayFailed: function onAutoPlayFailed(reason, videoEl) {
        vi.emit('local::autoplayFailed', reason, videoEl);
        if (reason && reason.name && reason.name.indexOf('NotAllowedError') !== -1 && vi.params.fallbackOverlay) {
          createOverlay(videoEl);
        }
      },
      onAdError: function onAdError(msg) {
        removeOverlay();
        app.off('resize', onResize);
        vi.emit('local::error', msg);
        vi.destroyed = true;
      }
    });

    vi.init();

    _utils2.default.extend(vi, {
      app: app
    });
    return _this;
  }

  _createClass(ViAd, [{
    key: 'start',
    value: function start() {
      var vi = this;
      if (vi.destroyed) return;
      if (vi.ad) vi.ad.startAd();
    }
  }, {
    key: 'pause',
    value: function pause() {
      var vi = this;
      if (vi.destroyed) return;
      if (vi.ad) vi.ad.pauseAd();
    }
  }, {
    key: 'resume',
    value: function resume() {
      var vi = this;
      if (vi.destroyed) return;
      if (vi.ad) vi.ad.resumeAd();
    }
  }, {
    key: 'stop',
    value: function stop() {
      var vi = this;
      if (vi.destroyed) return;
      if (vi.ad) vi.ad.stopAd();
    }
  }, {
    key: 'init',
    value: function init() {
      var vi = this;
      if (vi.destroyed) return;
      if (vi.ad) vi.ad.initAd();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var vi = this;
      vi.destroyed = true;
      vi.emit('local::beforeDestroy');
      _utils2.default.deleteProps(vi);
    }
  }]);

  return ViAd;
}(_class2.default);

exports.default = ViAd;