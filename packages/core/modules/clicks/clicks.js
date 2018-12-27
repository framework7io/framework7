import $ from 'dom7';
import { window, document } from 'ssr-window';
import Device from '../../utils/device';
import Support from '../../utils/support';
import ViewClass from '../../components/view/view-class';

function initClicks(app) {
  function handleClicks(e) {
    const $clickedEl = $(e.target);
    const $clickedLinkEl = $clickedEl.closest('a');
    const isLink = $clickedLinkEl.length > 0;
    const url = isLink && $clickedLinkEl.attr('href');
    const isTabLink = isLink && $clickedLinkEl.hasClass('tab-link') && ($clickedLinkEl.attr('data-tab') || (url && url.indexOf('#') === 0));

    // Check if link is external
    if (isLink) {
      // eslint-disable-next-line
      if ($clickedLinkEl.is(app.params.clicks.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
        const target = $clickedLinkEl.attr('target');
        if (
          url
          && window.cordova
          && window.cordova.InAppBrowser
          && (target === '_system' || target === '_blank')
        ) {
          e.preventDefault();
          window.cordova.InAppBrowser.open(url, target);
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach((moduleName) => {
      const moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) return;
      Object.keys(moduleClicks).forEach((clickSelector) => {
        const matchingClickedElement = $clickedEl.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset());
        }
      });
    });

    // Load Page
    let clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = $clickedLinkEl.dataset();
    }
    const validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
    if (validUrl || $clickedLinkEl.hasClass('back')) {
      let view;
      if (clickedLinkData.view) {
        view = $(clickedLinkData.view)[0].f7View;
      } else {
        view = $clickedEl.parents('.view')[0] && $clickedEl.parents('.view')[0].f7View;
        if (!$clickedLinkEl.hasClass('back') && view && view.params.linksView) {
          if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
          else if (view.params.linksView instanceof ViewClass) view = view.params.linksView;
        }
      }
      if (!view) {
        if (app.views.main) view = app.views.main;
      }
      if (!view || !view.router) return;
      if (clickedLinkData.context && typeof clickedLinkData.context === 'string') {
        try {
          clickedLinkData.context = JSON.parse(clickedLinkData.context);
        } catch (err) {
          // something wrong there
        }
      }
      if ($clickedLinkEl[0].f7RouteProps) {
        clickedLinkData.props = $clickedLinkEl[0].f7RouteProps;
      }
      if ($clickedLinkEl.hasClass('back')) view.router.back(url, clickedLinkData);
      else view.router.navigate(url, clickedLinkData);
    }
  }

  app.on('click', handleClicks);

  // Prevent scrolling on overlays
  function preventScrolling(e) {
    e.preventDefault();
  }
  if (Support.touch && !Device.android) {
    const activeListener = Support.passiveListener ? { passive: false, capture: false } : false;
    $(document).on((app.params.touch.fastClicks ? 'touchstart' : 'touchmove'), '.panel-backdrop, .dialog-backdrop, .preloader-backdrop, .popup-backdrop, .searchbar-backdrop', preventScrolling, activeListener);
  }
}
export default {
  name: 'clicks',
  params: {
    clicks: {
      // External Links
      externalLinks: '.external',
    },
  },
  on: {
    init() {
      const app = this;
      initClicks(app);
    },
  },
};
