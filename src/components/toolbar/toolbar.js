import $ from 'dom7';
import Utils from '../../utils/utils';

const Toolbar = {
  setHighlight(tabbarEl) {
    const app = this;
    if (app.theme !== 'md') return;

    const $tabbarEl = $(tabbarEl);

    if ($tabbarEl.length === 0 || !($tabbarEl.hasClass('tabbar') || $tabbarEl.hasClass('tabbar-labels'))) return;

    if ($tabbarEl.find('.tab-link-highlight').length === 0) {
      $tabbarEl.children('.toolbar-inner').append('<span class="tab-link-highlight"></span>');
    }

    const $highlightEl = $tabbarEl.find('.tab-link-highlight');
    const $activeLink = $tabbarEl.find('.tab-link-active');
    let highlightWidth;
    let highlightTranslate;

    if ($tabbarEl.hasClass('tabbar-scrollable')) {
      highlightWidth = `${$activeLink[0].offsetWidth}px`;
      highlightTranslate = `${$activeLink[0].offsetLeft}px`;
    } else {
      const activeIndex = $activeLink.index();
      const tabLinksCount = $tabbarEl.find('.tab-link').length;
      highlightWidth = `${100 / tabLinksCount}%`;
      highlightTranslate = `${(app.rtl ? -activeIndex : activeIndex) * 100}%`;
    }

    $highlightEl
      .css('width', highlightWidth)
      .transform(`translate3d(${highlightTranslate},0,0)`);
  },
  init(tabbarEl) {
    const app = this;
    app.toolbar.setHighlight(tabbarEl);
  },
  hide(el, animate = true) {
    const $el = $(el);
    if ($el.hasClass('toolbar-hidden')) return;
    const className = `toolbar-hidden${animate ? ' toolbar-transitioning' : ''}`;
    $el.transitionEnd(() => {
      $el.removeClass('toolbar-transitioning');
    });
    $el.addClass(className);
  },
  show(el, animate = true) {
    const $el = $(el);
    if (!$el.hasClass('toolbar-hidden')) return;
    if (animate) {
      $el.addClass('toolbar-transitioning');
      $el.transitionEnd(() => {
        $el.removeClass('toolbar-transitioning');
      });
    }
    $el.removeClass('toolbar-hidden');
  },
};
export default {
  name: 'toolbar',
  create() {
    const app = this;
    Utils.extend(app, {
      toolbar: {
        hide: Toolbar.hide.bind(app),
        show: Toolbar.show.bind(app),
        setHighlight: Toolbar.setHighlight.bind(app),
        init: Toolbar.init.bind(app),
      },
    });
  },
  on: {
    pageInit(page) {
      const app = this;
      page.$el.find('.tabbar, .tabbar-labels').each((index, tabbarEl) => {
        app.toolbar.init(tabbarEl);
      });
    },
  },
};
