import { getWindow } from 'ssr-window';
import $ from '../../shared/dom7.js';
import ViewClass from '../../components/view/view-class.js';

function initClicks(app) {
  function handleClicks(e) {
    const window = getWindow();
    const $clickedEl = $(e.target);
    const $clickedLinkEl = $clickedEl.closest('a');
    const isLink = $clickedLinkEl.length > 0;
    const url = isLink && $clickedLinkEl.attr('href');

    // Check if link is external
    if (isLink) {
      if (
        $clickedLinkEl.is(app.params.clicks.externalLinks) ||
        // eslint-disable-next-line
        (url && url.indexOf('javascript:') >= 0)
      ) {
        const target = $clickedLinkEl.attr('target');
        if (
          url &&
          window.cordova &&
          window.cordova.InAppBrowser &&
          (target === '_system' || target === '_blank')
        ) {
          e.preventDefault();
          window.cordova.InAppBrowser.open(url, target);
        } else if (
          url &&
          window.Capacitor &&
          window.Capacitor.Plugins &&
          window.Capacitor.Plugins.Browser &&
          (target === '_system' || target === '_blank')
        ) {
          e.preventDefault();
          window.Capacitor.Plugins.Browser.open({ url });
        }
        return;
      }
    }

    // Modules Clicks
    Object.keys(app.modules).forEach((moduleName) => {
      const moduleClicks = app.modules[moduleName].clicks;
      if (!moduleClicks) return;
      if (e.preventF7Router) return;
      Object.keys(moduleClicks).forEach((clickSelector) => {
        const matchingClickedElement = $clickedEl.closest(clickSelector).eq(0);
        if (matchingClickedElement.length > 0) {
          moduleClicks[clickSelector].call(
            app,
            matchingClickedElement,
            matchingClickedElement.dataset(),
            e,
          );
        }
      });
    });

    // Load Page
    let clickedLinkData = {};
    if (isLink) {
      e.preventDefault();
      clickedLinkData = $clickedLinkEl.dataset();
    }
    clickedLinkData.clickedEl = $clickedLinkEl[0];

    // Prevent Router
    if (e.preventF7Router) return;
    if ($clickedLinkEl.hasClass('prevent-router') || $clickedLinkEl.hasClass('router-prevent'))
      return;

    const validUrl = url && url.length > 0 && url[0] !== '#';
    if (validUrl || $clickedLinkEl.hasClass('back')) {
      let view;
      if (clickedLinkData.view && clickedLinkData.view === 'current') {
        view = app.views.current;
      } else if (clickedLinkData.view) {
        view = $(clickedLinkData.view)[0].f7View;
      } else {
        view = $clickedEl.parents('.view')[0] && $clickedEl.parents('.view')[0].f7View;
        if (
          view &&
          view.params.linksView &&
          (!$clickedLinkEl.hasClass('back') ||
            ($clickedLinkEl.hasClass('back') && view.router.history.length === 1))
        ) {
          if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
          else if (view.params.linksView instanceof ViewClass) view = view.params.linksView;
        }
      }
      if (!view) {
        if (app.views.main) view = app.views.main;
      }
      if (!view || !view.router) return;
      if ($clickedLinkEl[0].f7RouteProps) {
        clickedLinkData.props = $clickedLinkEl[0].f7RouteProps;
      }
      if ($clickedLinkEl.hasClass('back')) view.router.back(url, clickedLinkData);
      else view.router.navigate(url, clickedLinkData);
    }
  }

  app.on('click', handleClicks);
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
