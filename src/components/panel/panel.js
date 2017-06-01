import $ from 'dom7';
import Utils from '../../utils/utils';

const Panel = {
  onOpen($panelEl, side) {
    const app = this;

    $panelEl.trigger('open panel:open');
    app.emit('panelOpen panel:open', $panelEl[0], side);
  },
  onOpened($panelEl, side) {
    const app = this;
    app.panel.allowOpen = true;

    $panelEl.trigger('opened panel:opened');
    app.emit('panelOpened panel:opened', $panelEl[0], side);
  },
  onClose($panelEl, side) {
    const app = this;

    $panelEl.trigger('close panel:close');
    app.emit('panelClose panel:close', $panelEl[0], side);
  },
  onClosed($panelEl, side) {
    const app = this;
    app.panel.allowOpen = true;

    $panelEl.trigger('closed panel:closed');
    app.emit('panelClosed panel:closed', $panelEl[0], side);
  },
  open(side, animate = true) {
    const app = this;
    if (!app.panel.allowOpen) return false;

    let panelSide = side;
    if (!panelSide) {
      if ($('.panel').length > 1) {
        return false;
      }
      panelSide = $('.panel').hasClass('panel-left') ? 'left' : 'right';
    }

    const $panelEl = $(`.panel-${panelSide}`);
    if ($panelEl.length === 0 || $panelEl.hasClass('active') || $panelEl.hasClass('panel-visible-by-breakpoint')) {
      return false;
    }

    // Close if some panel is opened
    app.panel.close(panelSide === 'left' ? 'right' : 'left');

    app.panel.allowOpen = false;

    const effect = $panelEl.hasClass('panel-reveal') ? 'reveal' : 'cover';

    $panelEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $panelEl
      .css({ display: 'block' })
      .addClass('panel-active');

    let $overlayEl = $('.panel-overlay');
    if ($overlayEl.length === 0) {
      $overlayEl = $('<div class="panel-overlay"></div>');
      $overlayEl.insertBefore($panelEl);
    }
    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $overlayEl.show();

    Utils.nextFrame(() => {
      $('html').addClass(`with-panel with-panel-${panelSide}-${effect}`);
      Panel.onOpen.call(app, $panelEl, panelSide);

      // Transition End;
      const transitionEndTarget = effect === 'reveal' ? $panelEl.nextAll('.view, .views').eq(0) : $panelEl;

      function panelTransitionEnd() {
        transitionEndTarget.transitionEnd((e) => {
          if ($(e.target).is(transitionEndTarget)) {
            if ($panelEl.hasClass('panel-active')) {
              Panel.onOpened.call(app, $panelEl, panelSide);
              $overlayEl.css({ display: '' });
            } else {
              Panel.onClosed.call(app, $panelEl, panelSide);
              $overlayEl.css({ display: '' });
            }
          } else panelTransitionEnd();
        });
      }
      if (animate) {
        panelTransitionEnd();
      } else {
        Panel.onOpened.call(app, $panelEl, panelSide);
        $overlayEl.css({ display: '' });
      }
    });

    return true;
  },
  close(side, animate = true) {
    const app = this;
    let $panelEl;
    let panelSide;
    if (panelSide) {
      $panelEl = $(`.panel.panel-${side}`);
      panelSide = side;
    } else {
      $panelEl = $('.panel.panel-active');
      panelSide = $panelEl.hasClass('panel-left') ? 'left' : 'right';
    }
    if ($panelEl.length === 0 || $panelEl.hasClass('panel-visible-by-breakpoint') || !$panelEl.hasClass('panel-active')) return false;
    const effect = $panelEl.hasClass('panel-reveal') ? 'reveal' : 'cover';
    $panelEl[animate ? 'removeClass' : 'addClass']('not-animated');
    $panelEl.removeClass('panel-active');

    const $overlayEl = $('.panel-overlay');
    $overlayEl[animate ? 'removeClass' : 'addClass']('not-animated');

    const transitionEndTarget = effect === 'reveal' ? $panelEl.nextAll('.view, .views').eq(0) : $panelEl;

    Panel.onClose.call(app, $panelEl, panelSide);
    app.panel.allowOpen = false;

    if (animate) {
      transitionEndTarget.transitionEnd(() => {
        if ($panelEl.hasClass('panel-active')) return;
        $panelEl.css({ display: '' });
        $('html').removeClass('with-panel-transitioning');
        Panel.onClosed.call(app, $panelEl, panelSide);
      });
      $('html')
        .removeClass(`with-panel with-panel-${panelSide}-${effect}`)
        .addClass('with-panel-transitioning');
    } else {
      $panelEl.css({ display: '' });
      $panelEl.removeClass('not-animated');
      $('html').removeClass(`with-panel with-panel-transitioning with-panel-${panelSide}-${effect}`);
      Panel.onClosed.call(app, $panelEl, panelSide);
    }
    return true;
  },
  initBreakpoints() {
    const app = this;
    const $panelLeftEl = $('.panel-left');
    const $panelRightEl = $('.panel-right');
    const params = app.params.panels;
    // let wasVisible;
    let $viewEl;
    if (app.root.children('.views').length > 0) {
      $viewEl = app.root.children('.views');
    } else {
      $viewEl = app.root.children('.view').eq(0);
    }
    function setPanel(side, breakpoint) {
      const $panelEl = side === 'left' ? $panelLeftEl : $panelRightEl;
      const wasVisible = $panelEl.hasClass('panel-visible-by-breakpoint');
      if (app.width >= breakpoint) {
        if (!wasVisible) {
          $('html').removeClass(`with-panel-${side}-reveal with-panel-${side}-cover with-panel`);
          $panelEl.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
          Panel.onOpen.call(app, $panelEl, side);
          Panel.onOpened.call(app, $panelEl, side);
          $viewEl.css({
            [`margin-${side}`]: `${$panelEl.width()}px`,
          });
          app.allowPanelOpen = true;
        }
      } else if (wasVisible) {
        $panelEl.css('display', '').removeClass('panel-visible-by-breakpoint active');
        Panel.onClose.call(app, $panelEl, side);
        Panel.onClosed.call(app, $panelEl, side);
        $viewEl.css({
          [`margin-${side}`]: '',
        });
      }
    }
    function setPanels() {
      // Left Panel
      if (params.panelLeftBreakpoint && $panelLeftEl.length > 0) {
        setPanel('left', params.panelLeftBreakpoint);
      }
        // Right Panel
      if (params.panelRightBreakpoint && $panelRightEl.length > 0) {
        setPanel('right', params.panelRightBreakpoint);
      }
    }
    app.on('resize', setPanels);
    setPanels();
  },
  initSwipes() {
    const app = this;
  },
};

export default {
  name: 'panel',
  params: {
    panels: {
      panelLeftBreakpoint: 0,
      panelRightBreakpoint: 0,
      swipePanel: false, // or 'left' or 'right'
      swipePanelActiveArea: 0,
      swipePanelCloseOpposite: true,
      swipePanelOnlyClose: false,
      swipePanelNoFollow: false,
      swipePanelThreshold: 0,
      closeByOutsideClick: true,
    },
  },
  instance: {
    panel: {
      allowOpen: true,
    },
  },
  create() {
    const app = this;
    Utils.extend(app.panel, {
      open: Panel.open.bind(app),
      close: Panel.close.bind(app),
      initBreakpoints: Panel.initBreakpoints.bind(app),
      initSwipes: Panel.initSwipes.bind(app),
    });
  },
  on: {
    init() {
      const app = this;
      const params = app.params.panels;
      // Init Swipe Panels
      if (params.swipePanel) {
        app.panel.initSwipes();
      }
      // Init Panels Breakpoints
      if (params.panelLeftBreakpoint || params.panelRightBreakpoint) {
        app.panel.initBreakpoints();
      }
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
    '.panel-overlay': function close() {
      const app = this;
      $('.panel-active').trigger('panelOverlayClick panel:overlay-click');
      if (app.params.panels.closeByOutsideClick) app.panel.close();
    },
  },
};
