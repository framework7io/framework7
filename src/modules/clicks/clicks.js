import $ from 'dom7';
import Device from '../../utils/device';
import Support from '../../utils/support';
import ViewClass from '../../components/view/view-class';

function initClicks(app) {
  function handleClicks(e) {
    const clicked = $(e.target);
    const clickedLink = clicked.closest('a');
    const isLink = clickedLink.length > 0;
    const url = isLink && clickedLink.attr('href');
    const isTabLink = isLink && clickedLink.hasClass('tab-link') && (clickedLink.attr('data-tab') || (url && url.indexOf('#') === 0));

    // Check if link is external
    if (isLink) {
      // eslint-disable-next-line
      if (clickedLink.is(app.params.clicks.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
        const target = clickedLink.attr('target');
        if (url && (target === '_system' || target === '_blank')) {
          e.preventDefault();
          if (window.cordova && window.cordova.InAppBrowser) {
            window.cordova.InAppBrowser.open(url, target);
          } else {
            window.open(url, target);
          }
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach((moduleName) => {
      const moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) return;
      Object.keys(moduleClicks).forEach((clickSelector) => {
        const matchingClickedElement = clicked.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(app, matchingClickedElement, matchingClickedElement.dataset());
        }
      });
    });

    // Load Page
    let clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = clickedLink.dataset();
    }
    const validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
    const template = clickedLinkData.template;
    if (validUrl || clickedLink.hasClass('back') || template) {
      let view;
      if (clickedLinkData.view) {
        view = $(clickedLinkData.view)[0].f7View;
      } else {
        view = clicked.parents('.view')[0] && clicked.parents('.view')[0].f7View;
        if (view && view.params.linksView) {
          if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
          else if (view.params.linksView instanceof ViewClass) view = view.params.linksView;
        }
      }
      if (!view) {
        if (app.views.main) view = app.views.main;
      }
      if (!view || !view.router) return;
      if (clickedLink.hasClass('back')) view.router.back(url, clickedLinkData);
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
    $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-backdrop, .dialog-backdrop, .preloader-backdrop, .popup-backdrop, .searchbar-backdrop', preventScrolling, activeListener);
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
