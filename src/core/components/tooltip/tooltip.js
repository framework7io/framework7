import $ from 'dom7';
import Tooltip from './tooltip-class';
import ConstructorMethods from '../../utils/constructor-methods';

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
      text: null,
      cssClass: null,
      render: null,
    },
  },
  on: {
    tabMounted(tabEl) {
      const app = this;
      $(tabEl).find('.tooltip-init').each((index, el) => {
        const text = $(el).attr('data-tooltip');
        if (!text) return;
        app.tooltip.create({ targetEl: el, text });
      });
    },
    tabBeforeRemove(tabEl) {
      $(tabEl).find('.tooltip-init').each((index, el) => {
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.tooltip-init').each((index, el) => {
        const text = $(el).attr('data-tooltip');
        if (!text) return;
        app.tooltip.create({ targetEl: el, text });
      });
    },
    pageBeforeRemove(page) {
      page.$el.find('.tooltip-init').each((index, el) => {
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      });
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
      destroy(vnode) {
        const el = vnode.elm;
        if (el.f7Tooltip) el.f7Tooltip.destroy();
      },
    },
  },
};
