import $ from 'dom7';
import Utils from '../../utils/utils';
import Panel from './panel-class';

export default {
  name: 'panel',
  params: {
    panel: {
      leftBreakpoint: 0,
      rightBreakpoint: 0,
      swipe: undefined, // or 'left' or 'right' or 'both'
      swipeActiveArea: 0,
      swipeCloseActiveAreaSide: 0,
      swipeCloseOpposite: true,
      swipeOnlyClose: false,
      swipeNoFollow: false,
      swipeThreshold: 0,
      closeByBackdropClick: true,
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
      disableSwipe(panel = 'both') {
        let side;
        let panels = [];
        if (typeof panel === 'string') {
          if (panel === 'both') {
            side = 'both';
            panels = [app.panel.left, app.panel.right];
          } else {
            side = panel;
            panels.push(app.panel[side]);
          }
        } else {
          panels = [panel];
        }
        panels.forEach((panelInstance) => {
          if (panelInstance) Utils.extend(panelInstance, { swipeable: false });
        });
      },
      enableSwipe(panel = 'both') {
        let panels = [];
        let side;
        if (typeof panel === 'string') {
          side = panel;
          if (
            (app.params.panel.swipe === 'left' && side === 'right')
            || (app.params.panel.swipe === 'right' && side === 'left')
            || side === 'both'
          ) {
            side = 'both';
            app.params.panel.swipe = side;
            panels = [app.panel.left, app.panel.right];
          } else {
            app.params.panel.swipe = side;
            panels.push(app.panel[side]);
          }
        } else if (panel) {
          panels.push(panel);
        }
        if (panels.length) {
          panels.forEach((panelInstance) => {
            if (!panelInstance) return;
            if (!panelInstance.swipeInitialized) {
              panelInstance.initSwipePanel();
            } else {
              Utils.extend(panelInstance, { swipeable: true });
            }
          });
        }
      },
      create(params) {
        return new Panel(app, params);
      },
      open(side, animate) {
        let panelSide = side;
        if (!panelSide) {
          if ($('.panel').length > 1) {
            return false;
          }
          panelSide = $('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) return false;
        if (app.panel[panelSide]) {
          return app.panel[panelSide].open(animate);
        }
        const $panelEl = $(`.panel-${panelSide}`);
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl }).open(animate);
        }
        return false;
      },
      close(side, animate) {
        let $panelEl;
        let panelSide;
        if (panelSide) {
          panelSide = side;
          $panelEl = $(`.panel-${panelSide}`);
        } else {
          $panelEl = $('.panel.panel-active');
          panelSide = $panelEl.hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) return false;
        if (app.panel[panelSide]) {
          return app.panel[panelSide].close(animate);
        }
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl }).close(animate);
        }
        return false;
      },
      get(side) {
        let panelSide = side;
        if (!panelSide) {
          if ($('.panel').length > 1) {
            return undefined;
          }
          panelSide = $('.panel').hasClass('panel-left') ? 'left' : 'right';
        }
        if (!panelSide) return undefined;
        if (app.panel[panelSide]) {
          return app.panel[panelSide];
        }
        const $panelEl = $(`.panel-${panelSide}`);
        if ($panelEl.length > 0) {
          return app.panel.create({ el: $panelEl });
        }
        return undefined;
      },
    });
  },
  on: {
    init() {
      const app = this;

      // Create Panels
      $('.panel').each((index, panelEl) => {
        const side = $(panelEl).hasClass('panel-left') ? 'left' : 'right';
        app.panel[side] = app.panel.create({ el: panelEl, side });
      });
    },
  },
  clicks: {
    '.panel-open': function open(clickedEl, data = {}) {
      const app = this;
      let side = 'left';
      if (data.panel === 'right' || ($('.panel').length === 1 && $('.panel').hasClass('panel-right'))) {
        side = 'right';
      }
      app.panel.open(side, data.animate);
    },
    '.panel-close': function close(clickedEl, data = {}) {
      const app = this;
      const side = data.panel;
      app.panel.close(side, data.animate);
    },
    '.panel-backdrop': function close() {
      const app = this;
      const $panelEl = $('.panel-active');
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
