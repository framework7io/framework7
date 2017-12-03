import $ from 'dom7';
import Utils from '../../utils/utils';
import Device from '../../utils/device';
import Framework7Class from '../../utils/class';

class ViAd extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const vi = this;
    if (!window.vi) {
      throw new Error('f7:vi SDK not found.');
    }

    let orientation;
    if (typeof window.orientation !== 'undefined') {
      orientation = window.orientation === -90 || window.orientation === 90 ? 'horizontal' : 'vertical';
    }
    const defaults = Utils.extend(
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
        orientation,
      }
    );

    // Extend defaults with modules params
    vi.useModulesParams(defaults);

    vi.params = Utils.extend(defaults, params);

    const adParams = {};
    const skipParams = ('on autoplay fallbackOverlay fallbackOverlayText enabled').split(' ');
    Object.keys(vi.params).forEach((paramName) => {
      if (skipParams.indexOf(paramName) >= 0) return;
      const paramValue = vi.params[paramName];
      if ([null, undefined].indexOf(paramValue) >= 0) return;
      adParams[paramName] = paramValue;
    });

    if (!vi.params.appId) {
      throw new Error('Framework7:"app.id" is required to display an ad. Make sure you have specified it on app initialization.');
    }
    if (!vi.params.placementId) {
      throw new Error('Framework7:"placementId" is required to display an ad.');
    }

    function onResize() {
      const $viFrame = $('iframe#viAd');
      if ($viFrame.length === 0) return;
      $viFrame
        .css({
          width: `${app.width}px`,
          height: `${app.height}px`,
        });
    }

    function removeOverlay() {
      if (!vi.$overlayEl) return;
      vi.$overlayEl.off('click touchstart');
      vi.$overlayEl.remove();
    }
    function createOverlay(videoEl) {
      if (!videoEl) return;
      vi.$overlayEl = $(`
        <div class="vi-overlay no-fastclick">
          ${vi.params.fallbackOverlayText ? `<div class="vi-overlay-text">${vi.params.fallbackOverlayText}</div>` : ''}
          <div class="vi-overlay-play-button"></div>
        </div>
      `.trim());

      let touchStartTime;
      vi.$overlayEl.on('touchstart', () => {
        touchStartTime = Utils.now();
      });
      vi.$overlayEl.on('click', () => {
        const timeDiff = Utils.now() - touchStartTime;
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
    vi.ad = new window.vi.Ad(adParams);

    Utils.extend(vi.ad, {
      onAdReady() {
        app.on('resize', onResize);
        vi.emit('local::ready');
        if (vi.params.autoplay) {
          vi.start();
        }
      },
      onAdStarted() {
        vi.emit('local::started');
      },
      onAdClick(targetUrl) {
        vi.emit('local::click', targetUrl);
      },
      onAdImpression() {
        vi.emit('local::impression');
      },
      onAdStopped(reason) {
        app.off('resize', onResize);
        removeOverlay();

        vi.emit('local::stopped', reason);
        if (reason === 'complete') {
          vi.emit('local::complete');
        }
        if (reason === 'userexit') {
          vi.emit('local::userexit');
        }
        vi.destroyed = true;
      },
      onAutoPlayFailed(reason, videoEl) {
        vi.emit('local::autoplayFailed', reason, videoEl);
        if (reason && reason.name && reason.name.indexOf('NotAllowedError') !== -1 && vi.params.fallbackOverlay) {
          createOverlay(videoEl);
        }
      },
      onAdError(msg) {
        removeOverlay();
        app.off('resize', onResize);
        vi.emit('local::error', msg);
        vi.destroyed = true;
      },
    });

    vi.init();

    Utils.extend(vi, {
      app,
    });
  }
  start() {
    const vi = this;
    if (vi.destroyed) return;
    if (vi.ad) vi.ad.startAd();
  }
  pause() {
    const vi = this;
    if (vi.destroyed) return;
    if (vi.ad) vi.ad.pauseAd();
  }
  resume() {
    const vi = this;
    if (vi.destroyed) return;
    if (vi.ad) vi.ad.resumeAd();
  }
  stop() {
    const vi = this;
    if (vi.destroyed) return;
    if (vi.ad) vi.ad.stopAd();
  }
  init() {
    const vi = this;
    if (vi.destroyed) return;
    if (vi.ad) vi.ad.initAd();
  }
  destroy() {
    const vi = this;
    vi.destroyed = true;
    vi.emit('local::beforeDestroy');
    Utils.deleteProps(vi);
  }
}

export default ViAd;
