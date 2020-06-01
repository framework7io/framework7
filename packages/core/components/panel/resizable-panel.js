import $ from 'dom7';
import Utils from '../../utils/utils';
import Support from '../../utils/support';

function resizablePanel(panel) {
  const app = panel.app;
  if (panel.resizableInitialized) return;
  Utils.extend(panel, {
    resizable: true,
    resizableWidth: null,
    resizableInitialized: true,
  });
  const $htmlEl = $('html');
  const { $el, $backdropEl, side, effect } = panel;
  if (!$el) return;

  let isTouched;
  let isMoved;
  const touchesStart = {};
  let touchesDiff;
  let panelWidth;

  let $viewEl;

  let panelMinWidth;
  let panelMaxWidth;
  let visibleByBreakpoint;

  function transformCSSWidth(v) {
    if (!v) return null;
    if (v.indexOf('%') >= 0 || v.indexOf('vw') >= 0) {
      return parseInt(v, 10) / 100 * app.width;
    }
    const newV = parseInt(v, 10);
    if (Number.isNaN(newV)) return null;
    return newV;
  }

  function isResizable() {
    return panel.resizable && $el.hasClass('panel-resizable');
  }

  function handleTouchStart(e) {
    if (!isResizable()) return;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    isMoved = false;
    isTouched = true;
    panelMinWidth = transformCSSWidth($el.css('min-width'));
    panelMaxWidth = transformCSSWidth($el.css('max-width'));
    visibleByBreakpoint = $el.hasClass('panel-in-breakpoint');
  }
  function handleTouchMove(e) {
    if (!isTouched) return;
    const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;

    if (!isMoved) {
      panelWidth = $el[0].offsetWidth;
      $el.transition(0);
      $el.addClass('panel-resizing');
      $htmlEl.css('cursor', 'col-resize');
      if (effect === 'reveal' || visibleByBreakpoint) {
        $viewEl = $(panel.getViewEl());
      }
      if (effect === 'reveal' && !visibleByBreakpoint) {
        $backdropEl.transition(0);
        $viewEl.transition(0);
      }
    }

    isMoved = true;

    e.preventDefault();

    touchesDiff = (pageX - touchesStart.x);

    let newPanelWidth = side === 'left' ? panelWidth + touchesDiff : panelWidth - touchesDiff;
    if (panelMinWidth && !Number.isNaN(panelMinWidth)) {
      newPanelWidth = Math.max(newPanelWidth, panelMinWidth);
    }
    if (panelMaxWidth && !Number.isNaN(panelMaxWidth)) {
      newPanelWidth = Math.min(newPanelWidth, panelMaxWidth);
    }
    newPanelWidth = Math.min(Math.max(newPanelWidth, 0), app.width);

    panel.resizableWidth = newPanelWidth;
    $el[0].style.width = `${newPanelWidth}px`;
    if (effect === 'reveal' && !visibleByBreakpoint) {
      if ($viewEl) {
        $viewEl.transform(`translate3d(${side === 'left' ? newPanelWidth : -newPanelWidth}px, 0, 0)`);
      }
      if ($backdropEl) {
        $backdropEl.transform(`translate3d(${side === 'left' ? newPanelWidth : -newPanelWidth}px, 0, 0)`);
      }
    } else if (visibleByBreakpoint && $viewEl) {
      $viewEl.css(`margin-${side}`, `${newPanelWidth}px`);
    }

    $el.trigger('panel:resize', newPanelWidth);
    panel.emit('local::resize panelResize', panel, newPanelWidth);
  }
  function handleTouchEnd() {
    $('html').css('cursor', '');
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;

    $htmlEl[0].style.setProperty(`--f7-panel-${side}-width`, `${panel.resizableWidth}px`);
    $el[0].style.width = '';
    if (effect === 'reveal' && !visibleByBreakpoint) {
      $viewEl.transform('');
      $backdropEl.transform('');
    }
    $el.removeClass('panel-resizing');
    Utils.nextFrame(() => {
      $el.transition('');
      if (effect === 'reveal') {
        $backdropEl.transition('');
        if ($viewEl) $viewEl.transition('');
      }
    });
  }

  function handleResize() {
    if (!panel.opened || !panel.resizableWidth) return;
    panelMinWidth = transformCSSWidth($el.css('min-width'));
    panelMaxWidth = transformCSSWidth($el.css('max-width'));

    if (panelMinWidth && !Number.isNaN(panelMinWidth) && panel.resizableWidth < panelMinWidth) {
      panel.resizableWidth = Math.max(panel.resizableWidth, panelMinWidth);
    }
    if (panelMaxWidth && !Number.isNaN(panelMaxWidth) && panel.resizableWidth > panelMaxWidth) {
      panel.resizableWidth = Math.min(panel.resizableWidth, panelMaxWidth);
    }
    panel.resizableWidth = Math.min(Math.max(panel.resizableWidth, 0), app.width);

    $htmlEl[0].style.setProperty(`--f7-panel-${side}-width`, `${panel.resizableWidth}px`);
  }

  if (panel.$el.find('.panel-resize-handler').length === 0) {
    panel.$el.append('<div class="panel-resize-handler"></div>');
  }
  panel.$resizeHandlerEl = panel.$el.children('.panel-resize-handler');

  $el.addClass('panel-resizable');

  // Add Events
  const passive = Support.passiveListener ? { passive: true } : false;

  panel.$el.on(app.touchEvents.start, '.panel-resize-handler', handleTouchStart, passive);
  app.on('touchmove:active', handleTouchMove);
  app.on('touchend:passive', handleTouchEnd);
  app.on('resize', handleResize);
  panel.on('beforeOpen', handleResize);

  panel.once('panelDestroy', () => {
    $el.removeClass('panel-resizable');
    panel.$resizeHandlerEl.remove();
    panel.$el.off(app.touchEvents.start, '.panel-resize-handler', handleTouchStart, passive);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
    app.off('resize', handleResize);
    panel.off('beforeOpen', handleResize);
  });
}

export default resizablePanel;
