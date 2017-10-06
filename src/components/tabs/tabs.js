import $ from 'dom7';
import Utils from '../../utils/utils';

const Tab = {
  show(...args) {
    const app = this;
    let [tab, tabLink, animate, tabRoute] = args;
    if (typeof args[1] === 'boolean') {
      [tab, animate, tabLink, tabRoute] = args;
      if (args.length > 2 && tabLink.constructor === Object) {
        [tab, animate, tabRoute, tabLink] = args;
      }
    }
    if (typeof animate === 'undefined') animate = true;

    const $newTabEl = $(tab);

    if ($newTabEl.length === 0 || $newTabEl.hasClass('tab-active')) {
      return {
        $newTabEl,
        newTabEl: $newTabEl[0],
      };
    }

    let $tabLinkEl;
    if (tabLink) $tabLinkEl = $(tabLink);

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
    if ($tabsEl.parent().hasClass('tabs-swipeable-wrap') && app.swiper) {
      const swiper = $tabsEl.parent()[0].swiper;
      if (swiper && swiper.activeIndex !== $newTabEl.index()) {
        animated = true;
        swiper
          .once('slideChangeTransitionEnd', () => {
            tabsChanged();
          })
          .slideTo($newTabEl.index(), animate ? undefined : 0);
      }
    }

    // Remove active class from old tabs
    const $oldTabEl = $tabsEl.children('.tab-active');
    $oldTabEl
      .removeClass('tab-active')
      .trigger('tab:hide');
    app.emit('tabHide', $oldTabEl[0]);

    // Trigger 'show' event on new tab
    $newTabEl
      .addClass('tab-active')
      .trigger('tab:show');
    app.emit('tabShow', $newTabEl[0]);

    // Find related link for new tab
    if (!$tabLinkEl) {
      // Search by id
      if (typeof tab === 'string') $tabLinkEl = $(`.tab-link[href="${tab}"]`);
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
    }
    if ($tabLinkEl.length > 0) {
      // Find related link for old tab
      let $oldTabLinkEl;
      if ($oldTabEl && $oldTabEl.length > 0) {
        // Search by id
        const oldTabId = $oldTabEl.attr('id');
        if (oldTabId) $oldTabLinkEl = $(`.tab-link[href="#${oldTabId}"]`);
        // Search by data-tab
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $('[data-tab]').each((index, tabLinkEl) => {
            if ($oldTabEl.is($(tabLinkEl).attr('data-tab'))) $oldTabLinkEl = $(tabLinkEl);
          });
        }
        if (!$oldTabLinkEl || ($oldTabLinkEl && $oldTabLinkEl.length === 0)) {
          $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
        }
      } else if (tabRoute) {
        $oldTabLinkEl = $tabLinkEl.siblings('.tab-link-active');
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
        app.tab.show(data.tab || $clickedEl.attr('href'), $clickedEl, data.animate);
      }
    },
  },
};
