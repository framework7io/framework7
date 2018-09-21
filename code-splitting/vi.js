
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  var ViAd = (function (Framework7Class$$1) {
    function ViAd(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var vi = this;
      if (!win.vi) {
        throw new Error('Framework7: vi SDK not found.');
      }

      var orientation;
      if (typeof win.orientation !== 'undefined') {
        orientation = win.orientation === -90 || win.orientation === 90 ? 'horizontal' : 'vertical';
      }
      var defaults = Utils.extend(
        {},
        app.params.vi,
        {
          appId: app.id,
          appVer: app.version,
          language: app.language,
          width: app.width,
          height: app.height,
          os: Device.os,
          osVersion: Device.osVersion,
          orientation: orientation,
        }
      );

      // Extend defaults with modules params
      vi.useModulesParams(defaults);

      vi.params = Utils.extend(defaults, params);

      var adParams = {};
      var skipParams = ('on autoplay fallbackOverlay fallbackOverlayText enabled').split(' ');
      Object.keys(vi.params).forEach(function (paramName) {
        if (skipParams.indexOf(paramName) >= 0) { return; }
        var paramValue = vi.params[paramName];
        if ([null, undefined].indexOf(paramValue) >= 0) { return; }
        adParams[paramName] = paramValue;
      });

      if (!vi.params.appId) {
        throw new Error('Framework7: "app.id" is required to display an ad. Make sure you have specified it on app initialization.');
      }
      if (!vi.params.placementId) {
        throw new Error('Framework7: "placementId" is required to display an ad.');
      }

      function onResize() {
        var $viFrame = $('iframe#viAd');
        if ($viFrame.length === 0) { return; }
        $viFrame
          .css({
            width: ((app.width) + "px"),
            height: ((app.height) + "px"),
          });
      }

      function removeOverlay() {
        if (!vi.$overlayEl) { return; }
        vi.$overlayEl.off('click touchstart');
        vi.$overlayEl.remove();
      }
      function createOverlay(videoEl) {
        if (!videoEl) { return; }
        vi.$overlayEl = $(("\n        <div class=\"vi-overlay no-fastclick\">\n          " + (vi.params.fallbackOverlayText ? ("<div class=\"vi-overlay-text\">" + (vi.params.fallbackOverlayText) + "</div>") : '') + "\n          <div class=\"vi-overlay-play-button\"></div>\n        </div>\n      ").trim());

        var touchStartTime;
        vi.$overlayEl.on('touchstart', function () {
          touchStartTime = Utils.now();
        });
        vi.$overlayEl.on('click', function () {
          var timeDiff = Utils.now() - touchStartTime;
          if (timeDiff > 300) { return; }
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
      vi.ad = new win.vi.Ad(adParams);

      Utils.extend(vi.ad, {
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
        },
      });

      vi.init();

      Utils.extend(vi, {
        app: app,
      });
    }

    if ( Framework7Class$$1 ) ViAd.__proto__ = Framework7Class$$1;
    ViAd.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    ViAd.prototype.constructor = ViAd;

    ViAd.prototype.start = function start () {
      var vi = this;
      if (vi.destroyed) { return; }
      if (vi.ad) { vi.ad.startAd(); }
    };

    ViAd.prototype.pause = function pause () {
      var vi = this;
      if (vi.destroyed) { return; }
      if (vi.ad) { vi.ad.pauseAd(); }
    };

    ViAd.prototype.resume = function resume () {
      var vi = this;
      if (vi.destroyed) { return; }
      if (vi.ad) { vi.ad.resumeAd(); }
    };

    ViAd.prototype.stop = function stop () {
      var vi = this;
      if (vi.destroyed) { return; }
      if (vi.ad) { vi.ad.stopAd(); }
    };

    ViAd.prototype.init = function init () {
      var vi = this;
      if (vi.destroyed) { return; }
      if (vi.ad) { vi.ad.initAd(); }
    };

    ViAd.prototype.destroy = function destroy () {
      var vi = this;
      vi.destroyed = true;
      vi.emit('local::beforeDestroy');
      Utils.deleteProps(vi);
    };

    return ViAd;
  }(Framework7Class));

  var vi = {
    name: 'vi',
    params: {
      vi: {
        enabled: false,
        autoplay: true,
        fallbackOverlay: true,
        fallbackOverlayText: 'Please watch this ad',
        showMute: true,
        startMuted: (Device.ios || Device.android) && !Device.cordova,
        appId: null,
        appVer: null,
        language: null,
        width: null,
        height: null,
        placementId: 'pltd4o7ibb9rc653x14',
        placementType: 'interstitial',
        videoSlot: null,
        showProgress: true,
        showBranding: true,
        os: null,
        osVersion: null,
        orientation: null,
        age: null,
        gender: null,
        advertiserId: null,
        latitude: null,
        longitude: null,
        accuracy: null,
        storeId: null,
        ip: null,
        manufacturer: null,
        model: null,
        connectionType: null,
        connectionProvider: null,
      },
    },
    create: function create() {
      var app = this;
      app.vi = {
        sdkReady: false,
        createAd: function createAd(adParams) {
          return new ViAd(app, adParams);
        },
        loadSdk: function loadSdk() {
          if (app.vi.sdkReady) { return; }
          var script = doc.createElement('script');
          script.onload = function onload() {
            app.emit('viSdkReady');
            app.vi.sdkReady = true;
          };
          script.src = 'https://c.vi-serve.com/viadshtml/vi.min.js';
          $('head').append(script);
        },
      };
    },
    on: {
      init: function init() {
        var app = this;
        if (app.params.vi.enabled || (app.passedParams.vi && app.passedParams.vi.enabled !== false)) { app.vi.loadSdk(); }
      },
    },
  };

  return vi;
}
framework7ComponentLoader.componentName = 'vi';

