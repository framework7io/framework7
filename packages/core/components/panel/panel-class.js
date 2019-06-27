import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';
import SwipePanel from './swipe-panel';
import ResizablePanel from './resizable-panel';

class Panel extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const panel = this;

    let el = params.el;

    if (!el && params.content) {
      el = params.content;
    }

    const $el = $(el);
    if ($el.length === 0) return panel;
    if ($el[0].f7Panel) return $el[0].f7Panel;

    $el[0].f7Panel = panel;

    let { opened, side, effect } = params;
    if (typeof opened === 'undefined') opened = $el.hasClass('panel-active');
    if (typeof side === 'undefined') side = $el.hasClass('panel-left') ? 'left' : 'right';
    if (typeof effect === 'undefined') effect = $el.hasClass('panel-cover') ? 'cover' : 'reveal';

    if (!app.panel[side]) {
      app.panel[side] = panel;
    } else {
      throw new Error(`Framework7: Can't create panel; app already has a ${side} panel!`);
    }

    let $backdropEl = $('.panel-backdrop');

    if ($backdropEl.length === 0) {
      $backdropEl = $('<div class="panel-backdrop"></div>');
      $backdropEl.insertBefore($el);
    }

    Utils.extend(panel, {
      app,
      side,
      effect,
      $el,
      el: $el[0],
      opened,
      $backdropEl,
      backdropEl: $backdropEl[0],
      params,
    });

    // Install Modules
    panel.useModules();

    // Init
    panel.init();

    return panel;
  }

  getViewEl() {
    const panel = this;
    const app = panel.app;
    let viewEl;
    if (app.root.children('.views').length > 0) {
      viewEl = app.root.children('.views')[0];
    } else {
      viewEl = app.root.children('.view')[0];
    }
    return viewEl;
  }

  setBreakpoint(emitEvents = true) {
    const panel = this;
    const app = panel.app;
    const { side, $el } = panel;
    const $viewEl = $(panel.getViewEl());
    const breakpoint = app.params.panel[`${side}Breakpoint`];
    const wasVisible = $el.hasClass('panel-visible-by-breakpoint');

    if (app.width >= breakpoint) {
      if (!wasVisible) {
        $('html').removeClass(`with-panel-${side}-reveal with-panel-${side}-cover with-panel`);
        $el.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('panel-active');
        panel.onOpen();
        panel.onOpened();
        $viewEl.css({
          [`margin-${side}`]: `${$el.width()}px`,
        });
        app.allowPanelOpen = true;
        if (emitEvents) {
          app.emit('local::breakpoint panelBreakpoint');
          panel.$el.trigger('panel:breakpoint', panel);
        }
      } else {
        $viewEl.css({
          [`margin-${side}`]: `${$el.width()}px`,
        });
      }
    } else if (wasVisible) {
      $el.css('display', '').removeClass('panel-visible-by-breakpoint panel-active');
      panel.onClose();
      panel.onClosed();
      $viewEl.css({
        [`margin-${side}`]: '',
      });
      if (emitEvents) {
        app.emit('local::breakpoint panelBreakpoint');
        panel.$el.trigger('panel:breakpoint', panel);
      }
    }
  }

  initBreakpoints() {
    const panel = this;
    const app = panel.app;
    panel.resizeHandler = function resizeHandler() {
      panel.setBreakpoint();
    };
    if (app.params.panel[`${panel.side}Breakpoint`]) {
      app.on('resize', panel.resizeHandler);
    }
    panel.setBreakpoint();
    return panel;
  }

  initSwipePanel() {
    if ("universal" !== 'desktop') {
      SwipePanel(this);
    }
  }

  initResizablePanel() {
    ResizablePanel(this);
  }

  toggle(animate = true) {
    const panel = this;
    if (panel.opened) panel.close(animate);
    else panel.open(animate);
  }

  onOpen() {
    const panel = this;
    panel.opened = true;

    panel.$el.trigger('panel:beforeopen', panel);
    panel.emit('local::beforeOpen panelBeforeOpen', panel);

    panel.$el.trigger('panel:open', panel);
    panel.emit('local::open panelOpen', panel);
  }

  onOpened() {
    const panel = this;
    const app = panel.app;
    app.panel.allowOpen = true;

    panel.$el.trigger('panel:opened', panel);
    panel.emit('local::opened panelOpened', panel);
  }

  onClose() {
    const panel = this;
    panel.opened = false;
    panel.$el.addClass('panel-closing');

    panel.$el.trigger('panel:beforeclose', panel);
    panel.emit('local::beforeClose panelBeforeClose', panel);

    panel.$el.trigger('panel:close', panel);
    panel.emit('local::close panelClose', panel);
  }

  onClosed() {
    const panel = this;
    const app = panel.app;
    app.panel.allowOpen = true;
    panel.$el.removeClass('panel-closing');
    panel.$el.trigger('panel:closed', panel);
    panel.emit('local::closed panelClosed', panel);
  }

  open(animate = true) {
    const panel = this;
    const app = panel.app;
    if (!app.panel.allowOpen) return false;

    const { side, effect, $el, $backdropEl, opened } = panel;

    const $panelParentEl = $el.parent();
    const wasInDom = $el.parents(document).length > 0;

    if (!$panelParentEl.is(app.root) || $el.prevAll('.views, .view').length) {
      const $insertBeforeEl = app.root.children('.panel, .views, .view').eq(0);
      const $insertAfterEl = app.root.children('.statusbar').eq(0);

      if ($insertBeforeEl.length) {
        $el.insertBefore($insertBeforeEl);
      } else if ($insertAfterEl.length) {
        $el.insertAfter($insertBeforeEl);
      } else {
        app.root.prepend($el);
      }

      if ($backdropEl
        && $backdropEl.length
        && (
          (
            !$backdropEl.parent().is(app.root)
            && $backdropEl.nextAll('.panel').length === 0
          )
          || (
            $backdropEl.parent().is(app.root)
            && $backdropEl.nextAll('.panel').length === 0
          )
        )
      ) {
        $backdropEl.insertBefore($el);
      }

      panel.once('panelClosed', () => {
        if (wasInDom) {
          $panelParentEl.append($el);
        } else {
          $el.remove();
        }
      });
    }

    // Ignore if opened
    if (opened || $el.hasClass('panel-visible-by-breakpoint') || $el.hasClass('panel-active')) return false;

    // Close if some panel is opened
    app.panel.close(side === 'left' ? 'right' : 'left', animate);

    app.panel.allowOpen = false;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el
      .css({ display: 'block' })
      .addClass('panel-active');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $backdropEl.css({ display: 'block' });

    /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
    // panel._clientLeft = $el[0].clientLeft;

    // Transition End;
    const transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    function panelTransitionEnd() {
      transitionEndTarget.transitionEnd((e) => {
        if ($(e.target).is(transitionEndTarget)) {
          if ($el.hasClass('panel-active')) {
            panel.onOpened();
            $backdropEl.css({ display: '' });
          } else {
            panel.onClosed();
            $backdropEl.css({ display: '' });
          }
        } else panelTransitionEnd();
      });
    }

    if (animate) {
      Utils.nextFrame(() => {
        $('html').addClass(`with-panel with-panel-${side}-${effect}`);
        panel.onOpen();
        panelTransitionEnd();
      });
    } else {
      $('html').addClass(`with-panel with-panel-${side}-${effect}`);
      panel.onOpen();
      panel.onOpened();
      $backdropEl.css({ display: '' });
    }

    return true;
  }

  close(animate = true) {
    const panel = this;
    const app = panel.app;

    const { side, effect, $el, $backdropEl, opened } = panel;
    if (!opened || $el.hasClass('panel-visible-by-breakpoint') || !$el.hasClass('panel-active')) return false;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el.removeClass('panel-active');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');

    const transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    panel.onClose();
    app.panel.allowOpen = false;

    if (animate) {
      transitionEndTarget.transitionEnd(() => {
        if ($el.hasClass('panel-active')) return;
        $el.css({ display: '' });
        $('html').removeClass('with-panel-transitioning');
        panel.onClosed();
      });
      $('html')
        .removeClass(`with-panel with-panel-${side}-${effect}`)
        .addClass('with-panel-transitioning');
    } else {
      $el.css({ display: '' });
      $el.removeClass('not-animated');
      $('html').removeClass(`with-panel with-panel-transitioning with-panel-${side}-${effect}`);
      panel.onClosed();
    }
    return true;
  }

  init() {
    const panel = this;
    const app = panel.app;
    if (app.params.panel[`${panel.side}Breakpoint`]) {
      panel.initBreakpoints();
    }
    if (process.env.TARGET !== 'desktop') {
      if (
        (app.params.panel.swipe === panel.side)
        || (app.params.panel.swipe === 'both')
        || (app.params.panel.swipe && app.params.panel.swipe !== panel.side && app.params.panel.swipeCloseOpposite)
      ) {
        panel.initSwipePanel();
      }
    }
    if (panel.params.resizable || panel.$el.hasClass('panel-resizable')) {
      panel.initResizablePanel();
    }
  }

  destroy() {
    let panel = this;
    const app = panel.app;

    if (!panel.$el) {
      // Panel already destroyed
      return;
    }

    panel.emit('local::beforeDestroy panelBeforeDestroy', panel);
    panel.$el.trigger('panel:beforedestroy', panel);

    if (panel.resizeHandler) {
      app.off('resize', panel.resizeHandler);
    }

    if (panel.$el.hasClass('panel-visible-by-breakpoint')) {
      const $viewEl = $(panel.getViewEl());
      panel.$el.css('display', '').removeClass('panel-visible-by-breakpoint panel-active');
      $viewEl.css({
        [`margin-${panel.side}`]: '',
      });
      app.emit('local::breakpoint panelBreakpoint');
      panel.$el.trigger('panel:breakpoint', panel);
    }

    panel.$el.trigger('panel:destroy', panel);
    panel.emit('local::destroy panelDestroy');
    delete app.panel[panel.side];
    if (panel.el) {
      panel.el.f7Panel = null;
      delete panel.el.f7Panel;
    }
    Utils.deleteProps(panel);

    panel = null;
  }
}

export default Panel;
