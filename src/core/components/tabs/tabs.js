import $ from 'dom7';
import Utils from '../../utils/utils';

const Tab = {
  show(...args) {
    const app = this;

    let tabEl;
    let tabLinkEl;
    let animate;
    let tabRoute;
    if (args.length === 1 && args[0].constructor === Object) {
      tabEl = args[0].tabEl;
      tabLinkEl = args[0].tabLinkEl;
      animate = args[0].animate;
      tabRoute = args[0].tabRoute;
    } else {
      [tabEl, tabLinkEl, animate, tabRoute] = args;
      if (typeof args[1] === 'boolean') {
        [tabEl, animate, tabLinkEl, tabRoute] = args;
        if (args.length > 2 && tabLinkEl.constructor === Object) {
          [tabEl, animate, tabRoute, tabLinkEl] = args;
        }
      }
    }
    if (typeof animate === 'undefined') animate = true;

    const $newTabEl = $(tabEl);
    if (tabRoute && $newTabEl[0]) {
      $newTabEl[0].f7TabRoute = tabRoute;
    }

    if ($newTabEl.length === 0 || $newTabEl.hasClass('tab-active')) {
      return {
        $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }

    let $tabLinkEl;
    if (tabLinkEl) $tabLinkEl = $(tabLinkEl);

    const $tabsEl = $newTabEl.parent('.tabs');
    if ($tabsEl.length === 0) {
      return {
        $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }

    // Release swipeouts in hidden tabs
    if (app.swipeout) app.swipeout.allowOpen = true;

    // Animated tabs
    const tabsChangedCallbacks = [];

    function onTabsChanged(callback) {
      tabsChangedCallbacks.push(callback);
    }
    function tabsChanged() {
      tabsChangedCallbacks.forEach((callback) => {
        callback();
      });
    }

    let animated = false;

    if ($tabsEl.parent().hasClass('tabs-animated-wrap')) {
      $tabsEl.parent()[animate ? 'removeClass' : 'addClass']('not-animated');

      const transitionDuration = parseFloat($tabsEl.css('transition-duration').replace(',', '.'));
      if (animate && transitionDuration) {
        $tabsEl.transitionEnd(tabsChanged);
        animated = true;
      }

      const tabsTranslate = (app.rtl ? $newTabEl.index() : -$newTabEl.index()) * 100;
      $tabsEl.transform(`translate3d(${tabsTranslate}%,0,0)`);
    }

    // Swipeable tabs
    let swiper;
    if ($tabsEl.parent().hasClass('tabs-swipeable-wrap') && app.swiper) {
      swiper = $tabsEl.parent()[0].swiper;
      if (swiper && swiper.activeIndex !== $newTabEl.index()) {
        animated = true;
        swiper
          .once('slideChangeTransitionEnd', () => {
            tabsChanged();
          })
          .slideTo($newTabEl.index(), animate ? undefined : 0);
      } else if (swiper && swiper.animating) {
        animated = true;
        swiper
          .once('slideChangeTransitionEnd', () => {
            tabsChanged();
          });
      }
    }

    // Remove active class from old tabs
    const $oldTabEl = $tabsEl.children('.tab-active');
    $oldTabEl.removeClass('tab-active');
    if (!swiper || (swiper && !swiper.animating)) {
      $oldTabEl.trigger('tab:hide');
      app.emit('tabHide', $oldTabEl[0]);
    }

    // Trigger 'show' event on new tab
    $newTabEl.addClass('tab-active');
    if (!swiper || (swiper && !swiper.animating)) {
      $newTabEl.trigger('tab:show');
      app.emit('tabShow', $newTabEl[0]);
    }

    // Find related link for new tab
    if (!$tabLinkEl) {
      // Search by id
      if (typeof tabEl === 'string') $tabLinkEl = $(`.tab-link[href="${tabEl}"]`);
      else $tabLinkEl = $(`.tab-link[href="#${$newTabEl.attr('id')}"]`);
      // Search by data-tab
      if (!$tabLinkEl || ($tabLinkEl && $tabLinkEl.length === 0)) {
        $('[data-tab]').each((index, el) => {
          if ($newTabEl.is($(el).attr('data-tab'))) $tabLinkEl = $(el);
        });
      }
      if (tabRoute && (!$tabLinkEl || ($tabLinkEl && $tabLinkEl.length === 0))) {
        $tabLinkEl = $(`[data-route-tab-id="${tabRoute.route.tab.id}"]`);
        if ($tabLinkEl.length === 0) {
          $tabLinkEl = $(`.tab-link[href="${tabRoute.url}"]`);
        }
      }
      if ($tabLinkEl.length > 1 && $newTabEl.parents('.page').length) {
        // eslint-disable-next-line
        $tabLinkEl = $tabLinkEl.filter((index, tabLinkElement) => {
          return $(tabLinkElement).parents('.page')[0] === $newTabEl.parents('.page')[0];
        });
        if (app.theme === 'ios' && $tabLinkEl.length === 0 && tabRoute) {
          const $pageEl = $newTabEl.parents('.page');
          const $navbarEl = $(app.navbar.getElByPage($pageEl));
          $tabLinkEl = $navbarEl.find(`[data-route-tab-id="${tabRoute.route.tab.id}"]`);
          if ($tabLinkEl.length === 0) {
            $tabLinkEl = $navbarEl.find(`.tab-link[href="${tabRoute.url}"]`);
          }
        }
      }
    }
    if ($tabLinkEl.length > 0) {
      // Find related link for old tab
      let $oldTabLinkEl;
      if ($oldTabEl && $oldTabEl.length > 0) {
        // Search by id
        const oldTabId = $oldTabEl.attr('id');
        if (oldTabId) {
          $oldTabLinkEl = $(`.tab-link[href="#${oldTabId}"]`);
          // Search by data-route-tab-id
          if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
            $oldTabLinkEl = $(`.tab-link[data-route-tab-id="${oldTabId}"]`);
          }
        }
        // Search by data-tab
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $('[data-tab]').each((index, tabLinkElement) => {
            if ($oldTabEl.is($(tabLinkElement).attr('data-tab'))) $oldTabLinkEl = $(tabLinkElement);
          });
        }
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
        }
      } else if (tabRoute) {
        $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 1 && $oldTabEl && $oldTabEl.parents('.page').length) {
        // eslint-disable-next-line
        $oldTabLinkEl = $oldTabLinkEl.filter((index, tabLinkElement) => {
          return $(tabLinkElement).parents('.page')[0] === $oldTabEl.parents('.page')[0];
        });
      }

      if ($oldTabLinkEl && $oldTabLinkEl.length > 0) $oldTabLinkEl.removeClass('tab-link-active');

      // Update links' classes
      if ($tabLinkEl && $tabLinkEl.length > 0) {
        $tabLinkEl.addClass('tab-link-active');
        // Material Highlight
        if (app.theme === 'md' && app.toolbar) {
          const $tabbarEl = $tabLinkEl.parents('.tabbar, .tabbar-labels');
          if ($tabbarEl.length > 0) {
            app.toolbar.setHighlight($tabbarEl);
          }
        }
      }
    }
    return {
      $newTabEl,
      newTabEl: $newTabEl[0],
      $oldTabEl,
      oldTabEl: $oldTabEl[0],
      onTabsChanged,
      animated,
    };
  },
};
export default {
  name: 'tabs',
  create() {
    const app = this;
    Utils.extend(app, {
      tab: {
        show: Tab.show.bind(app),
      },
    });
  },
  clicks: {
    '.tab-link': function tabLinkClick($clickedEl, data = {}) {
      const app = this;
      if (($clickedEl.attr('href') && $clickedEl.attr('href').indexOf('#') === 0) || $clickedEl.attr('data-tab')) {
        app.tab.show({
          tabEl: data.tab || $clickedEl.attr('href'),
          tabLinkEl: $clickedEl,
          animate: data.animate,
        });
      }
    },
  },
};
