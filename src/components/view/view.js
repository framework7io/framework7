import Utils from '../../utils/utils';
import View from './view-class';

export default {
  name: 'view',
  params: {
    view: {
      stackPages: false,
      xhrCache: true,
      xhrCacheIgnore: [],
      xhrCacheIgnoreGetParameters: false,
      xhrCacheDuration: 1000 * 60 * 10, // Ten minutes
      preloadPreviousPage: true,
      uniqueHistory: false,
      uniqueHistoryIgnoreGetParameters: false,
      allowDuplicateUrls: false,
      reloadPages: false,
      removeElements: true,
      removeElementsWithTimeout: false,
      removeElementsTimeout: 0,
      // Swipe Back
      swipeBackPage: true,
      swipeBackPageAnimateShadow: true,
      swipeBackPageAnimateOpacity: true,
      swipeBackPageActiveArea: 30,
      swipeBackPageThreshold: 0,
      // Push State
      pushState: false,
      pushStateRoot: undefined,
      pushStateAnimate: true,
      pushStateAnimateOnLoad: false,
      pushStateSeparator: '#!',
      pushStateOnLoad: true,
      // Animate Pages
      animate: true,
      // iOS Dynamic Navbar
      iosDynamicNavbar: true,
      iosSeparateDynamicNavbar: true,
      // Animate iOS Navbar Back Icon
      iosAnimateNavbarBackIcon: true,
      // MD Theme delay
      materialPageLoadDelay: 0,
    },
  },
  static: {
    View,
  },
  create() {
    const app = this;
    const views = Utils.extend([], {
      add(el, params) {
        return new View(app, el, params);
      },
      current() {

      },
    });
    Utils.extend(app, { views });
  },
};

