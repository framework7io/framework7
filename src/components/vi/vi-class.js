import $ from 'dom7';
import Utils from '../../utils/utils';
import Device from '../../utils/device';
import Framework7Class from '../../utils/class';

class ViAd extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const vi = this;
    if (!window.vi) {
      throw new Error('vi SDK not found');
    }
    if (ViAd.current) {
      throw new Error('vi ad is already created');
    }
    ViAd.current = vi;

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
        orientation: window.orientation === -90 || window.orientation === 90 ? 'horizontal' : 'vertical',
        placementId: 'pltrmsvvgw9fax8k6az',
      }
    );

    // Extend defaults with modules params
    vi.useModulesParams(defaults);

    vi.params = Utils.extend(defaults, params);

    const adParams = {};
    const skipParams = ('on autoplay overlay overlayText').split(' ');
    Object.keys(vi.params).forEach((paramName) => {
      if (skipParams.indexOf(paramName) >= 0) return;
      const paramValue = vi.params[paramName];
      if ([null, undefined].indexOf(paramValue) >= 0) return;
      adParams[paramName] = paramValue;
    });

    if (!vi.params.appId) {
      throw new Error('"app.id" required to display an ad. Make sure you have specified on app initialization');
    }
    if (!vi.params.placementId) {
      throw new Error('"placementId" required to display an ad');
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
          ${vi.params.overlayText ? `<div class="vi-overlay-text">${vi.params.overlayText}</div>` : ''}
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

    /*
    =====================
    DISABLE VIDEO SEEKING
    =====================

    var videoElement = document.querySelector('iframe').contentDocument.querySelector('video')
    var trackingTime;
    function onTimeUpdate() {
      if (!videoElement.seeking) {
        trackingTime = videoElement.currentTime;
      }
    }
    function onSeeking() {
      var delta = Math.abs(videoElement.currentTime - trackingTime);
      if (delta > 0.01) {
        videoElement.currentTime = trackingTime;
      }
    }
    videoElement.addEventListener('timeupdate', onTimeUpdate, false)
    videoElement.addEventListener('seeking', onSeeking, false)

var videoElement = document.querySelector('iframe').contentDocument.querySelector('video')
videoElement.addEventListener('pause', (e) => {
  videoElement.play()
  .then(() => {})
  .catch((e) => {console.log(e)})
}, false)
    */

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
      onAdClick() {
        vi.emit('local::click');
      },
      onAdImpression() {
        vi.emit('local::impression');
      },
      onAdStopped(reason) {
        app.off('resize', onResize);
        removeOverlay();
        ViAd.current = null;

        vi.emit('local::stopped', reason);
        if (reason === 'complete') {
          vi.emit('local::complete');
        }
        if (reason === 'userexit') {
          vi.emit('local::userexit');
        }
      },
      onAutoPlayFailed(reason, videoEl) {
        vi.emit('local::autoplayFailed', reason, videoEl);
        if (reason && reason.name && reason.name.indexOf('NotAllowedError') !== -1 && vi.params.overlay) {
          createOverlay(videoEl);
        }
      },
      onAdError(msg) {
        removeOverlay();
        app.off('resize', onResize);
        ViAd.current = null;
        vi.emit('local::error', msg);
      },
    });


    vi.init();

    Utils.extend(vi, {
      app,
    });
  }
  start() {
    const vi = this;
    if (vi !== ViAd.current) return;
    if (vi.ad) vi.ad.startAd();
  }
  pause() {
    const vi = this;
    if (vi !== ViAd.current) return;
    if (vi.ad) vi.ad.pauseAd();
  }
  resume() {
    const vi = this;
    if (vi !== ViAd.current) return;
    if (vi.ad) vi.ad.resumeAd();
  }
  stop() {
    const vi = this;
    if (vi !== ViAd.current) return;
    if (vi.ad) vi.ad.stopAd();
  }
  init() {
    const vi = this;
    if (vi !== ViAd.current) return;
    if (vi.ad) vi.ad.initAd();
  }
  destroy() {
    const vi = this;
    ViAd.current = null;
    vi.emit('local::beforeDestroy');
    Utils.deleteProps(vi);
  }
}

export default ViAd;
