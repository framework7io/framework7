import $ from 'dom7';
import Utils from '../../utils/utils';

const Tabs = {
  show(...args) {
    const app = this;
    let [tab, tabLink, animate] = args;
    if (typeof args[1] === 'boolean') {
      [tab, animate, tabLink] = args;
    }
    if (typeof animate === 'undefined') animate = true;

    const $newTabEl = $(tab);
    if ($newTabEl.length === 0 || $newTabEl.hasClass('tab-active')) return;

    let $tabLinkEl;
    if (tabLink) $tabLinkEl = $(tabLink);

    const $tabsEl = $newTabEl.parent('.tabs');
    if ($tabsEl.length === 0) return;

    // Release swipeouts in hidden tabs
    if (app.swipeout) app.swipeout.allowOpen = true;

    // Animated tabs
    const isAnimatedTabs = $tabsEl.parent().hasClass('tabs-animated-wrap');
    if (isAnimatedTabs) {
      $tabsEl.parent()[animate ? 'removeClass' : 'addClass']('not-animated');
      const tabsTranslate = (app.rtl ? $newTabEl.index() : -$newTabEl.index()) * 100;
      $tabsEl.transform(`translate3d(${tabsTranslate}%,0,0)`);
    }

    // Swipeable tabs
    const isSwipeableTabs = $tabsEl.parent().hasClass('tabs-swipeable-wrap');
    let swiper;
    if (isSwipeableTabs && app.swiper) {
      swiper = $tabsEl.parent()[0].swiper;
      if (swiper.activeIndex !== $newTabEl.index()) {
        swiper.slideTo($newTabEl.index(), animate ? undefined : 0, false);
      }
    }

    // Remove active class from old tabs
    const $oldTabEl = $tabsEl.children('.tab-active');
    $oldTabEl
      .removeClass('tab-active')
      .trigger('hide tab:hide tabHide');
    app.emit('tabHide tab:hide', $oldTabEl[0]);

    // Trigger 'show' event on new tab
    $newTabEl
      .addClass('tab-active')
      .trigger('show tab:show tabShow');
    app.emit('tabShow tab:show', $newTabEl[0]);

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
    }
    if ($tabLinkEl.length === 0) return;

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
    }

    // Update links' classes
    if ($tabLinkEl && $tabLinkEl.length > 0) {
      $tabLinkEl.addClass('tab-link-active');
      // Material Highlight
      if (app.theme === 'md' && app.toolbar) {
        const $tabbarEl = $tabLinkEl.parents('.tabbar');
        if ($tabbarEl.length > 0) {
          if ($tabbarEl.find('.tab-link-highlight').length === 0) {
            $tabbarEl.find('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
          }
          app.toolbar.setHighlight($tabbarEl);
        }
      }
    }
    if ($oldTabLinkEl && $oldTabLinkEl.length > 0) $oldTabLinkEl.removeClass('tab-link-active');
  },
};
export default {
  name: 'tabs',
  create() {
    const app = this;
    Utils.extend(app, {
      tabs: {
        show: Tabs.show.bind(app),
      },
    });
  },
  clicks: {
    '.tab-link': function tabLinkClick($clickedEl, data = {}) {
      const app = this;
      app.tabs.show(data.tab || $clickedEl.attr('href'), $clickedEl, data.animate);
    },
  },
};
