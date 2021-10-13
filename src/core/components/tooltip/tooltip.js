import $ from '../../shared/dom7.js';
import Tooltip from './tooltip-class.js';
import ConstructorMethods from '../../shared/constructor-methods.js';

export default {
  name: 'tooltip',
  static: {
    Tooltip,
  },
  create() {
    const app = this;
    app.tooltip = ConstructorMethods({
      defaultSelector: '.tooltip',
      constructor: Tooltip,
      app,
      domProp: 'f7Tooltip',
    });
    app.tooltip.show = function show(el) {
      const $el = $(el);
      if ($el.length === 0) return undefined;
      const tooltip = $el[0].f7Tooltip;
      if (!tooltip) return undefined;
      tooltip.show($el[0]);
      return tooltip;
    };
    app.tooltip.hide = function hide(el) {
      const $el = $(el);
      if ($el.length === 0) return undefined;
      const tooltip = $el[0].f7Tooltip;
      if (!tooltip) return undefined;
      tooltip.hide();
      return tooltip;
    };
    app.tooltip.setText = function text(el, newText) {
      const $el = $(el);
      if ($el.length === 0) return undefined;
      const tooltip = $el[0].f7Tooltip;
      if (!tooltip) return undefined;
      tooltip.setText(newText);
      return tooltip;
    };
  },
  params: {
    tooltip: {
      targetEl: null,
      delegated: false,
      text: null,
      cssClass: null,
      render: null,
      offset: 0,
      trigger: 'hover',
      containerEl: undefined,
    },
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl)
        .find('.tooltip-init')
        .each((el) => {
          const text = $(el).attr('data-tooltip');
          if (!text) return;
          app.tooltip.create({ targetEl: el, text });
        });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl)
        .find('.tooltip-init')
        .each((el) => {
          if (el.f7Tooltip) el.f7Tooltip.destroy();
        });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.tooltip-init').each((el) => {
        const text = $(el).attr('data-tooltip');
        if (!text) return;
        app.tooltip.create({ targetEl: el, text });
      });
      if (
        app.theme === 'ios' &&
        page.view &&
        page.view.router.dynamicNavbar &&
        page.$navbarEl &&
        page.$navbarEl.length > 0
      ) {
        page.$navbarEl.find('.tooltip-init').each((el) => {
          const text = $(el).attr('data-tooltip');
          if (!text) return;
          app.tooltip.create({ targetEl: el, text });
        });
      }
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.tooltip-init').each((el) => {
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      });
      if (
        app.theme === 'ios' &&
        page.view &&
        page.view.router.dynamicNavbar &&
        page.$navbarEl &&
        page.$navbarEl.length > 0
      ) {
        page.$navbarEl.find('.tooltip-init').each((el) => {
          if (el.f7Tooltip) el.f7Tooltip.destroy();
        });
      }
    },
  },
  vnode: {
    'tooltip-init': {
      insert(vnode) {
        const app = this;
        const el = vnode.elm;
        const text = $(el).attr('data-tooltip');
        if (!text) return;
        app.tooltip.create({ targetEl: el, text });
      },
      update(vnode) {
        const el = vnode.elm;
        if (!el.f7Tooltip) return;
        if (vnode && vnode.data && vnode.data.attrs && vnode.data.attrs['data-tooltip']) {
          el.f7Tooltip.setText(vnode.data.attrs['data-tooltip']);
        }
      },
      destroy(vnode) {
        const el = vnode.elm;
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      },
    },
  },
};
