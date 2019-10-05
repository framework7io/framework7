import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';
import SwipePanel from './swipe-panel';
import ResizablePanel from './resizable-panel';

class Panel extends Framework7Class {
  constructor(app, params = {}) {
    const extendedParams = Utils.extend(
      { on: {} },
      app.params.panel,
      params
    );
    super(extendedParams, [app]);

    const panel = this;

    panel.params = extendedParams;

    let $el;
    if (panel.params.el) {
      $el = $(panel.params.el).eq(0);
    } else if (panel.params.content) {
      $el = $(panel.params.content).filter((elIndex, node) => node.nodeType === 1).eq(0);
    }

    if ($el.length === 0) return panel;
    if ($el[0].f7Panel) return $el[0].f7Panel;

    $el[0].f7Panel = panel;

    let { side, effect, resizable } = panel.params;
    if (typeof side === 'undefined') side = $el.hasClass('panel-left') ? 'left' : 'right';
    if (typeof effect === 'undefined') effect = $el.hasClass('panel-cover') ? 'cover' : 'reveal';
    if (typeof resizable === 'undefined') resizable = $el.hasClass('panel-resizable');

    let $backdropEl;
    if (panel.params.backdrop && panel.params.backdropEl) {
      $backdropEl = $(panel.params.backdropEl);
    } else if (panel.params.backdrop) {
      $backdropEl = app.root.children('.panel-backdrop');
      if ($backdropEl.length === 0) {
        $backdropEl = $('<div class="panel-backdrop"></div>');
        app.root.prepend($backdropEl);
      }
    }

    Utils.extend(panel, {
      app,
      side,
      effect,
      resizable,
      $el,
      el: $el[0],
      opened: false,
      $backdropEl,
      backdropEl: $backdropEl && $backdropEl[0],
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

  enableVisibleBreakpoint() {
    const panel = this;
    panel.visibleBreakpointDisabled = false;
    panel.setVisibleBreakpoint();
    return panel;
  }

  disableVisibleBreakpoint() {
    const panel = this;
    panel.visibleBreakpointDisabled = true;
    panel.setVisibleBreakpoint();
    return panel;
  }

  toggleVisibleBreakpoint() {
    const panel = this;
    panel.visibleBreakpointDisabled = !panel.visibleBreakpointDisabled;
    panel.setVisibleBreakpoint();
    return panel;
  }

  setVisibleBreakpoint(emitEvents = true) {
    const panel = this;
    const app = panel.app;
    if (!panel.visibleBreakpointResizeHandler) {
      panel.visibleBreakpointResizeHandler = function visibleBreakpointResizeHandler() {
        panel.setVisibleBreakpoint();
      };
      app.on('resize', panel.visibleBreakpointResizeHandler);
    }
    const { side, $el, params, visibleBreakpointDisabled } = panel;
    const breakpoint = params.visibleBreakpoint;
    const $viewEl = $(panel.getViewEl());
    const wasVisible = $el.hasClass('panel-in-breakpoint');

    if (app.width >= breakpoint && typeof breakpoint !== 'undefined' && breakpoint !== null && !visibleBreakpointDisabled) {
      if (!wasVisible) {
        $('html').removeClass(`with-panel-${side}-reveal with-panel-${side}-cover with-panel`);
        $el.addClass('panel-in-breakpoint').removeClass('panel-in panel-in-collapsed');
        panel.onOpen(false);
        panel.onOpened();
        $viewEl.css({
          [`margin-${side}`]: `${$el.width()}px`,
        });
        app.allowPanelOpen = true;
        if (emitEvents) {
          panel.emit('local::breakpoint panelBreakpoint');
          panel.$el.trigger('panel:breakpoint');
        }
      } else {
        $viewEl.css({
          [`margin-${side}`]: `${$el.width()}px`,
        });
      }
    } else if (wasVisible) {
      $el.removeClass('panel-in-breakpoint panel-in');
      panel.onClose();
      panel.onClosed();
      $viewEl.css({
        [`margin-${side}`]: '',
      });
      if (emitEvents) {
        panel.emit('local::breakpoint panelBreakpoint');
        panel.$el.trigger('panel:breakpoint');
      }
    }
  }

  enableCollapsedBreakpoint() {
    const panel = this;
    panel.collapsedBreakpointDisabled = false;
    panel.setCollapsedBreakpoint();
    return panel;
  }

  disableCollapsedBreakpoint() {
    const panel = this;
    panel.collapsedBreakpointDisabled = true;
    panel.setCollapsedBreakpoint();
    return panel;
  }

  toggleCollapsedBreakpoint() {
    const panel = this;
    panel.collapsedBreakpointDisabled = !panel.collapsedBreakpointDisabled;
    panel.setCollapsedBreakpoint();
    return panel;
  }

  setCollapsedBreakpoint(emitEvents) {
    const panel = this;
    const app = panel.app;
    if (!panel.collapsedBreakpointResizeHandler) {
      panel.collapsedBreakpointResizeHandler = function collapsedBreakpointResizeHandler() {
        panel.setCollapsedBreakpoint();
      };
      app.on('resize', panel.collapsedBreakpointResizeHandler);
    }
    const { side, $el, params, collapsedBreakpointDisabled } = panel;
    if ($el.hasClass('panel-in-breakpoint')) return;
    const breakpoint = params.collapsedBreakpoint;
    const wasVisible = $el.hasClass('panel-in-collapsed');

    if (app.width >= breakpoint && typeof breakpoint !== 'undefined' && breakpoint !== null && !collapsedBreakpointDisabled) {
      if (!wasVisible) {
        $('html').removeClass(`with-panel-${side}-reveal with-panel-${side}-cover with-panel`);
        $el.addClass('panel-in-collapsed').removeClass('panel-in');
        panel.collapsed = true;
        app.allowPanelOpen = true;
        if (emitEvents) {
          panel.emit('local::collapsedBreakpoint panelCollapsedBreakpoint');
          panel.$el.trigger('panel:collapsedbreakpoint');
        }
      }
    } else if (wasVisible) {
      $el.removeClass('panel-in-collapsed panel-in');
      panel.collapsed = false;
      if (emitEvents) {
        panel.emit('local::collapsedBreakpoint panelCollapsedBreakpoint');
        panel.$el.trigger('panel:collapsedbreakpoint');
      }
    }
  }

  enableResizable() {
    const panel = this;
    if (panel.resizableInitialized) {
      panel.resizable = true;
      panel.$el.addClass('panel-resizable');
    } else {
      ResizablePanel(panel);
    }
    return panel;
  }

  disableResizable() {
    const panel = this;
    panel.resizable = false;
    panel.$el.removeClass('panel-resizable');
    return panel;
  }

  enableSwipe() {
    const panel = this;
    if (panel.swipeInitialized) {
      panel.swipeable = true;
    } else {
      SwipePanel(panel);
    }
    return panel;
  }

  disableSwipe() {
    const panel = this;
    panel.swipeable = false;
    return panel;
  }

  onOpen(modifyHtmlClasses = true) {
    const panel = this;
    const app = panel.app;

    panel.opened = true;
    app.panel.allowOpen = false;

    panel.$el.trigger('panel:beforeopen');
    panel.emit('local::beforeOpen panelBeforeOpen', panel);

    if (modifyHtmlClasses) {
      $('html').addClass(`with-panel with-panel-${panel.side}-${panel.effect}`);
    }

    panel.$el.trigger('panel:open');
    panel.emit('local::open panelOpen', panel);
  }

  onOpened() {
    const panel = this;
    const app = panel.app;

    app.panel.allowOpen = true;

    panel.$el.trigger('panel:opened');
    panel.emit('local::opened panelOpened', panel);
  }

  onClose() {
    const panel = this;
    const app = panel.app;

    panel.opened = false;
    app.panel.allowOpen = false;

    panel.$el.trigger('panel:beforeclose');
    panel.emit('local::beforeClose panelBeforeClose', panel);

    $('html').addClass('with-panel-closing');
    $('html').removeClass(`with-panel with-panel-${panel.side}-${panel.effect}`);

    panel.$el.trigger('panel:close');
    panel.emit('local::close panelClose', panel);
  }

  onClosed() {
    const panel = this;
    const app = panel.app;
    app.panel.allowOpen = true;
    $('html').removeClass('with-panel-closing');
    panel.$el.removeClass('panel-out');
    panel.$el.trigger('panel:closed');
    panel.emit('local::closed panelClosed', panel);
  }

  toggle(animate = true) {
    const panel = this;
    const breakpoint = panel.params.visibleBreakpoint;
    const app = panel.app;
    if (app.width >= breakpoint && typeof breakpoint !== 'undefined' && breakpoint !== null) {
      return panel.toggleVisibleBreakpoint();
    }
    if (panel.opened) panel.close(animate);
    else panel.open(animate);
    return panel;
  }

  insertToRoot() {
    const panel = this;
    const { $el, app, $backdropEl } = panel;
    const $panelParentEl = $el.parent();
    const wasInDom = $el.parents(document).length > 0;

    if (!$panelParentEl.is(app.root) || $el.prevAll('.views, .view').length) {
      const $insertBeforeEl = app.root.children('.panel, .views, .view').eq(0);
      const $insertAfterEl = app.root.children('.panel-backdrop').eq(0);

      if ($insertBeforeEl.length) {
        $el.insertBefore($insertBeforeEl);
      } else if ($insertAfterEl) {
        $el.insertBefore($insertAfterEl);
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
  }

  open(animate = true) {
    const panel = this;
    const app = panel.app;

    if (!app.panel.allowOpen) return false;

    const { effect, $el, $backdropEl, opened } = panel;

    if (!$el || $el.hasClass('panel-in')) {
      return panel;
    }

    panel.insertToRoot();

    // Ignore if opened
    if (opened || $el.hasClass('panel-in-breakpoint') || $el.hasClass('panel-in')) return false;

    // Close if some panel is opened
    const otherOpenedPanel = app.panel.get('.panel-in');
    if (otherOpenedPanel && otherOpenedPanel !== panel) {
      otherOpenedPanel.close(animate);
    }

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el.addClass('panel-in');

    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');

    if (panel.effect === 'cover') {
      /* eslint no-underscore-dangle: ["error", { "allow": ["_clientLeft"] }] */
      panel._clientLeft = $el[0].clientLeft;
    }

    // Transitionend
    const transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    function panelTransitionEnd() {
      transitionEndTarget.transitionEnd((e) => {
        if ($(e.target).is(transitionEndTarget)) {
          if ($el.hasClass('panel-out')) {
            panel.onClosed();
          } else {
            panel.onOpened();
          }
        } else panelTransitionEnd();
      });
    }
    if (animate) {
      if ($backdropEl) {
        $backdropEl.removeClass('not-animated');
      }
      panelTransitionEnd();
      $el
        .removeClass('panel-out not-animated')
        .addClass('panel-in');
      panel.onOpen();
    } else {
      if ($backdropEl) {
        $backdropEl.addClass('not-animated');
      }
      $el.removeClass('panel-out').addClass('panel-in not-animated');
      panel.onOpen();
      panel.onOpened();
    }

    return true;
  }

  close(animate = true) {
    const panel = this;

    const { effect, $el, $backdropEl, opened } = panel;
    if (!opened || $el.hasClass('panel-in-breakpoint') || !$el.hasClass('panel-in')) return panel;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $backdropEl[animate ? 'removeClass' : 'addClass']('not-animated');

    const transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

    function transitionEnd() {
      if ($el.hasClass('panel-out')) {
        panel.onClosed();
      } else if ($el.hasClass('panel-in')) {
        panel.onOpened();
      }
      $('html').removeClass('with-panel-closing');
    }
    if (animate) {
      transitionEndTarget
        .transitionEnd(() => {
          transitionEnd();
        });
      $el
        .removeClass('panel-in')
        .addClass('panel-out');
      // Emit close
      panel.onClose();
    } else {
      $el
        .addClass('not-animated')
        .removeClass('panel-in')
        .addClass('panel-out');
      // Emit close
      panel.onClose();
      panel.onClosed();
    }

    return panel;
  }

  init() {
    const panel = this;
    // const app = panel.app;
    if (typeof panel.params.visibleBreakpoint !== 'undefined') {
      panel.setVisibleBreakpoint();
    }
    if (typeof panel.params.collapsedBreakpoint !== 'undefined') {
      panel.setCollapsedBreakpoint();
    }
    if (panel.params.swipe) {
      panel.enableSwipe();
    }
    if (panel.resizable) {
      panel.enableResizable();
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
    panel.$el.trigger('panel:beforedestroy');

    if (panel.visibleBreakpointResizeHandler) {
      app.off('resize', panel.visibleBreakpointResizeHandler);
    }
    if (panel.collapsedBreakpointResizeHandler) {
      app.off('resize', panel.collapsedBreakpointResizeHandler);
    }
    if (panel.$el.hasClass('panel-in-breakpoint') || panel.$el.hasClass('panel-in-collapsed')) {
      const $viewEl = $(panel.getViewEl());
      panel.$el.removeClass('panel-in-breakpoint panel-in-collapsed panel-in');
      $viewEl.css({
        [`margin-${panel.side}`]: '',
      });
      panel.emit('local::breakpoint panelBreakpoint');
      panel.$el.trigger('panel:breakpoint');
    }

    panel.$el.trigger('panel:destroy');
    panel.emit('local::destroy panelDestroy');
    if (panel.el) {
      panel.el.f7Panel = null;
      delete panel.el.f7Panel;
    }
    Utils.deleteProps(panel);

    panel = null;
  }
}

export default Panel;
