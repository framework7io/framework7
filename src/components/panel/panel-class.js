import $ from 'dom7';
import Utils from '../../utils/utils';
import Framework7Class from '../../utils/class';

class Panel extends Framework7Class {
  constructor(app, params = {}) {
    super(params, [app]);
    const panel = this;

    const el = params.el;
    const $el = $(el);
    if ($el.length === 0) return panel;
    if ($el[0].f7Panel) return $el[0].f7Panel;

    $el[0].f7Panel = panel;

    let { opened, side, effect } = params;
    if (typeof opened === 'undefined') opened = $el.hasClass('panel-active');
    if (typeof side === 'undefined') side = $el.hasClass('panel-left') ? 'left' : 'right';
    if (typeof effect === 'undefined') effect = $el.hasClass('panel-cover') ? 'cover' : 'reveal';

    let $overlayEl = $('.panel-overlay');
    if ($overlayEl.length === 0) {
      $overlayEl = $('<div class="panel-overlay"></div>');
      $overlayEl.insertBefore($el);
    }

    let $viewEl;
    if (app.root.children('.views').length > 0) {
      $viewEl = app.root.children('.views');
    } else {
      $viewEl = app.root.children('.view').eq(0);
    }

    Utils.extend(panel, {
      app,
      side,
      effect,
      $el,
      el: $el[0],
      opened,
      $overlayEl,
      overlayEl: $overlayEl[0],
      $viewEl,
      viewEl: $viewEl[0],
    });

    // Install Modules
    panel.useInstanceModules();

    // Init
    panel.init();

    return panel;
  }
  init() {
    const panel = this;
    const app = panel.app;
    if (app.params.panel[`${panel.side}Breakpoint`]) {
      panel.initBreakpoints();
    }
    if (app.params.panel.swipe) {
      panel.initSwipePanel();
    }
  }
  setBreakpoint() {
    const panel = this;
    const app = panel.app;
    const { side, $el, $viewEl } = panel;
    const breakpoint = app.params.panel[`${side}Breakpoint`];
    const wasVisible = $el.hasClass('panel-visible-by-breakpoint');

    if (app.width >= breakpoint) {
      if (!wasVisible) {
        $('html').removeClass(`with-panel-${side}-reveal with-panel-${side}-cover with-panel`);
        $el.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
        panel.onOpen();
        panel.onOpened();
        $viewEl.css({
          [`margin-${side}`]: `${$el.width()}px`,
        });
        app.allowPanelOpen = true;
      }
    } else if (wasVisible) {
      $el.css('display', '').removeClass('panel-visible-by-breakpoint active');
      panel.onClose();
      panel.onClosed();
      $viewEl.css({
        [`margin-${side}`]: '',
      });
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

  }
  destroy() {
    let panel = this;
    const app = panel.app;
    if (panel.resizeHandler) {
      app.off('resize', panel.resizeHandler);
    }
    delete app.panel[panel.side];
    delete panel.el.f7Panel;
    Object.keys(panel).forEach((key) => {
      delete panel[key];
    });
    panel = null;
  }
  open(animate = true) {
    const panel = this;
    const app = panel.app;
    if (!app.panel.allowOpen) return false;

    const { side, effect, $el, $overlayEl } = panel;

    // Close if some panel is opened
    app.panel.close(side === 'left' ? 'right' : 'left', animate);

    app.panel.allowOpen = false;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el
      .css({ display: 'block' })
      .addClass('panel-active');

    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $overlayEl.show();

    Utils.nextFrame(() => {
      $('html').addClass(`with-panel with-panel-${side}-${effect}`);
      panel.onOpen();

      // Transition End;
      const transitionEndTarget = effect === 'reveal' ? $el.nextAll('.view, .views').eq(0) : $el;

      function panelTransitionEnd() {
        transitionEndTarget.transitionEnd((e) => {
          if ($(e.target).is(transitionEndTarget)) {
            if ($el.hasClass('panel-active')) {
              panel.onOpened();
              $overlayEl.css({ display: '' });
            } else {
              panel.onClosed();
              $overlayEl.css({ display: '' });
            }
          } else panelTransitionEnd();
        });
      }
      if (animate) {
        panelTransitionEnd();
      } else {
        panel.onOpened();
        $overlayEl.css({ display: '' });
      }
    });

    return true;
  }
  close(animate = true) {
    const panel = this;
    const app = panel.app;

    const { side, effect, $el, $overlayEl } = panel;

    if ($el.hasClass('panel-visible-by-breakpoint') || !$el.hasClass('panel-active')) return false;

    $el[animate ? 'removeClass' : 'addClass']('not-animated');
    $el.removeClass('panel-active');

    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');

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
  onOpen() {
    const panel = this;
    panel.$el.trigger('open panel:open');
    panel.emit('panelOpen panel:open', panel.el, panel.side);
  }
  onOpened() {
    const panel = this;
    const app = panel.app;
    app.panel.allowOpen = true;

    panel.$el.trigger('opened panel:opened');
    panel.emit('panelOpened panel:opened', panel.el, panel.side);
  }
  onClose() {
    const panel = this;

    panel.$el.trigger('close panel:close');
    panel.emit('panelClose panel:close', panel.el, panel.side);
  }
  onClosed() {
    const panel = this;
    const app = panel.app;
    app.panel.allowOpen = true;

    panel.$el.trigger('closed panel:closed');
    panel.emit('panelClosed panel:closed', panel.el, panel.side);
  }
}

export default Panel;
