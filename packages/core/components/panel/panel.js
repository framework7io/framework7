import $ from 'dom7';
import Utils from '../../utils/utils';
import Panel from './panel-class';

export default {
  name: 'panel',
  params: {
    panel: {
      opened: undefined, // default based on panel-in class
      side: undefined, // default based on panel class
      effect: undefined, // default based on panel class
      resizable: undefined, // default based on panel-resizable class
      backdrop: true,
      backdropEl: undefined,
      visibleBreakpoint: undefined,
      collapsedBreakpoint: undefined,
      swipe: false, // or true
      swipeNoFollow: false, // or true
      swipeOnlyClose: false,
      swipeActiveArea: 0,
      swipeThreshold: 0,
      closeByBackdropClick: true,
      containerEl: undefined,
    },
  },
  static: {
    Panel,
  },
  instance: {
    panel: {
      allowOpen: true,
    },
  },
  create() {
    const app = this;
    Utils.extend(app.panel, {
      create(params) {
        return new Panel(app, params);
      },
      get(el = '.panel') {
        if (el instanceof Panel) return el;
        if (el === 'left' || el === 'right') el = `.panel-${el}`; // eslint-disable-line
        const $el = $(el);
        if ($el.length === 0 || $el.length > 1) return undefined;
        return $el[0].f7Panel;
      },
      destroy(el = '.panel') {
        const panel = app.panel.get(el);
        if (panel && panel.destroy) return panel.destroy();
        return undefined;
      },
      open(el = '.panel', animate) {
        if (el === 'left' || el === 'right') el = `.panel-${el}`; // eslint-disable-line
        let panel = app.panel.get(el);
        if (panel && panel.open) return panel.open(animate);
        if (!panel) {
          panel = app.panel.create({ el });
          return panel.open(animate);
        }
        return undefined;
      },
      close(el = '.panel-in', animate) {
        if (el === 'left' || el === 'right') el = `.panel-${el}`; // eslint-disable-line
        let panel = app.panel.get(el);
        if (panel && panel.open) return panel.close(animate);
        if (!panel) {
          panel = app.panel.create({ el });
          return panel.close(animate);
        }
        return undefined;
      },
      toggle(el = '.panel', animate) {
        if (el === 'left' || el === 'right') el = `.panel-${el}`; // eslint-disable-line
        let panel = app.panel.get(el);
        if (panel && panel.toggle) return panel.toggle(animate);
        if (!panel) {
          panel = app.panel.create({ el });
          return panel.toggle(animate);
        }
        return undefined;
      },
    });
  },
  on: {
    init() {
      const app = this;
      $('.panel-init').each((index, panelEl) => {
        const params = Object.assign(
          { el: panelEl },
          $(panelEl).dataset() || {}
        );
        app.panel.create(params);
      });
    },
    pageInit(page) {
      const app = this;
      page.$el.find('.panel-init').each((index, panelEl) => {
        const params = Object.assign(
          { el: panelEl },
          $(panelEl).dataset() || {}
        );
        app.panel.create(params);
      });
    },
    pageBeforeRemove(page) {
      const app = this;
      page.$el.find('.panel-init').each((index, panelEl) => {
        const panel = app.panel.get(panelEl);
        if (panel && panel.destroy) panel.destroy();
      });
    },
  },
  vnode: {
    'panel-init': {
      insert(vnode) {
        const app = this;
        const panelEl = vnode.elm;
        const params = Object.assign(
          { el: panelEl },
          $(panelEl).dataset() || {}
        );
        app.panel.create(params);
      },
      destroy(vnode) {
        const app = this;
        const panelEl = vnode.elm;
        const panel = app.panel.get(panelEl);
        if (panel && panel.destroy) panel.destroy();
      },
    },
  },
  clicks: {
    '.panel-open': function open(clickedEl, data = {}) {
      const app = this;
      app.panel.open(data.panel, data.animate);
    },
    '.panel-close': function close(clickedEl, data = {}) {
      const app = this;
      app.panel.close(data.panel, data.animate);
    },
    '.panel-toggle': function close(clickedEl, data = {}) {
      const app = this;
      app.panel.toggle(data.panel, data.animate);
    },
    '.panel-backdrop': function close() {
      const app = this;
      const $panelEl = $('.panel-in:not(.panel-out)');
      if (!$panelEl.length) return;
      const instance = $panelEl[0] && $panelEl[0].f7Panel;
      $panelEl.trigger('panel:backdrop-click');
      if (instance) {
        instance.emit('backdropClick', instance);
      }
      app.emit('panelBackdropClick', instance || $panelEl[0]);
      if (app.params.panel.closeByBackdropClick) app.panel.close();
    },
  },
};
