import $ from 'dom7';

function swipePanels() {
  const app = this;
  const params = app.params.panel;
  let $panelEl;
  let side;
  if (params.swipePanel) {
    $panelEl = $(`.panel.panel-${params.swipePanel}`);
    side = params.swipePanel;
    if ($panelEl.length === 0 && side !== 'both') return;
  } else if (params.swipePanelOnlyClose) {
    if ($('.panel').length === 0) return;
  } else return;

  const $overlayEl = $('.panel-overlay');
  let isTouched;
  let isMoved;
  let isScrolling;
  const touchesStart = {};
  let touchStartTime;
  let touchesDiff;
  let translate;
  let overlayOpacity;
  let opened;
  let panelWidth;
  let effect;
  let direction;
  let $viewEl;
  if (app.root.children('.views').length > 0) {
    $viewEl = app.root.children('.views');
  } else {
    $viewEl = app.root.children('.view').eq(0);
  }

  function handleTouchStart(e) {
    if (!app.panel.allowOpen || (!params.swipePanel && !params.swipePanelOnlyClose) || isTouched) return;
    if ($('.modal-in, .photo-browser-in').length > 0) return;
    if (!(params.swipePanelCloseOpposite || params.swipePanelOnlyClose)) {
      if ($('.panel.active').length > 0 && !$panelEl.hasClass('active')) return;
    }
    if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') return;
    if ($(e.target).closest('.tabs-swipeable-wrap').length > 0) return;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    if (params.swipePanelCloseOpposite || params.swipePanelOnlyClose) {
      if ($('.panel.active').length > 0) {
        side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
      } else {
        if (params.swipePanelOnlyClose) return;
        side = params.swipePanel;
      }
      if (!side) return;
    }
    $panelEl = $(`.panel.panel-${side}`);
    opened = $panelEl.hasClass('active');
    if (params.swipePanelActiveArea && !opened) {
      if (side === 'left') {
        if (touchesStart.x > params.swipePanelActiveArea) return;
      }
      if (side === 'right') {
        if (touchesStart.x < app.width - params.swipePanelActiveArea) return;
      }
    }
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;

    touchStartTime = (new Date()).getTime();
    direction = undefined;
  }
  function handleTouchMove(e) {
    if (!isTouched) return;
    if (e.f7PreventPanelSwipe) return;
    const pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    const pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (typeof isScrolling === 'undefined') {
      isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
    }
    if (isScrolling) {
      isTouched = false;
      return;
    }
    if (!direction) {
      if (pageX > touchesStart.x) {
        direction = 'to-right';
      } else {
        direction = 'to-left';
      }

      if (side === 'both') {
        if ($('.panel.active').length > 0) {
          side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
        } else {
          side = direction === 'to-right' ? 'left' : 'right';
        }
        if (params.swipePanelActiveArea > 0) {
          if (side === 'left' && touchesStart.x > params.swipePanelActiveArea) {
            isTouched = false;
            return;
          }
          if (side === 'right' && touchesStart.x < app.width - params.swipePanelActiveArea) {
            isTouched = false;
            return;
          }
        }
        $panelEl = $(`.panel.panel-${side}`);
      }
      if ($panelEl.hasClass('panel-visible-by-breakpoint')) {
        isTouched = false;
        return;
      }

      if (
        (side === 'left' &&
          (
            direction === 'to-left' && !$panelEl.hasClass('active')
          )
        )
        ||
        (side === 'right' &&
          (
            direction === 'to-right' && !$panelEl.hasClass('active')
          )
        )
      ) {
        isTouched = false;
        return;
      }
    }

    if (params.swipePanelNoFollow) {
      const timeDiff = (new Date()).getTime() - touchStartTime;
      if (timeDiff < 300) {
        if (direction === 'to-left') {
          if (side === 'right') app.openPanel(side);
          if (side === 'left' && $panelEl.hasClass('active')) app.closePanel();
        }
        if (direction === 'to-right') {
          if (side === 'left') app.openPanel(side);
          if (side === 'right' && $panelEl.hasClass('active')) app.closePanel();
        }
      }
      isTouched = false;
      isMoved = false;
      return;
    }

    if (!isMoved) {
      effect = $panelEl.hasClass('panel-cover') ? 'cover' : 'reveal';
      if (!opened) {
        $panelEl.show();
        $overlayEl.show();
      }
      panelWidth = $panelEl[0].offsetWidth;
      $panelEl.transition(0);
    }

    isMoved = true;

    e.preventDefault();
    let threshold = opened ? 0 : -params.swipePanelThreshold;
    if (side === 'right') threshold = -threshold;

    touchesDiff = (pageX - touchesStart.x) + threshold;

    if (side === 'right') {
      if (effect === 'cover') {
        translate = touchesDiff + (opened ? 0 : panelWidth);
        if (translate < 0) translate = 0;
        if (translate > panelWidth) {
          translate = panelWidth;
        }
      } else {
        translate = touchesDiff - (opened ? panelWidth : 0);
        if (translate > 0) translate = 0;
        if (translate < -panelWidth) {
          translate = -panelWidth;
        }
      }
    } else {
      translate = touchesDiff + (opened ? panelWidth : 0);
      if (translate < 0) translate = 0;
      if (translate > panelWidth) {
        translate = panelWidth;
      }
    }
    if (effect === 'reveal') {
      $viewEl.transform(`translate3d(${translate}px,0,0)`).transition(0);
      $overlayEl.transform(`translate3d(${translate}px,0,0)`).transition(0);

      $panelEl.trigger('panel:swipe', { progress: Math.abs(translate / panelWidth) });
      app.pluginHook('swipePanelSetTransform', $viewEl[0], $panelEl[0], Math.abs(translate / panelWidth));
    } else {
      if (side === 'left') translate -= panelWidth;
      $panelEl.transform(`translate3d(${translate}px,0,0)`).transition(0);

      $overlayEl.transition(0);
      overlayOpacity = 1 - Math.abs(translate / panelWidth);
      $overlayEl.css({ opacity: overlayOpacity });

      $panelEl.trigger('panel:swipe', { progress: Math.abs(translate / panelWidth) });
      app.pluginHook('swipePanelSetTransform', $viewEl[0], $panelEl[0], Math.abs(translate / panelWidth));
    }
  }
  function handleTouchEnd() {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    isTouched = false;
    isMoved = false;
    const timeDiff = (new Date()).getTime() - touchStartTime;
    let action;
    const edge = (translate === 0 || Math.abs(translate) === panelWidth);

    if (!opened) {
      if (effect === 'cover') {
        if (translate === 0) {
          action = 'swap'; // open
        } else if (timeDiff < 300 && Math.abs(translate) > 0) {
          action = 'swap'; // open
        } else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
          action = 'swap'; // open
        } else {
          action = 'reset'; // close
        }
      } else if (translate === 0) {
        action = 'reset';
      } else if (
        (timeDiff < 300 && Math.abs(translate) > 0)
        ||
        (timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2))
      ) {
        action = 'swap';
      } else {
        action = 'reset';
      }
    } else if (effect === 'cover') {
      if (translate === 0) {
        action = 'reset'; // open
      } else if (timeDiff < 300 && Math.abs(translate) > 0) {
        action = 'swap'; // open
      } else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
        action = 'reset'; // open
      } else {
        action = 'swap'; // close
      }
    } else if (translate === -panelWidth) {
      action = 'reset';
    } else if (
        (timeDiff < 300 && Math.abs(translate) >= 0)
        ||
        (timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2))
      ) {
      if (side === 'left' && translate === panelWidth) action = 'reset';
      else action = 'swap';
    } else {
      action = 'reset';
    }
    if (action === 'swap') {
      app.panel.allowOpen = true;
      if (opened) {
        app.closePanel();
        if (edge) {
          $panelEl.css({ display: '' });
          $('body').removeClass('panel-closing');
        }
      } else {
        app.openPanel(side);
      }
      if (edge) app.panel.allowOpen = true;
    }
    if (action === 'reset') {
      if (opened) {
        app.panel.allowOpen = true;
        app.openPanel(side);
      } else {
        app.closePanel();
        if (edge) {
          app.panel.allowOpen = true;
          $panelEl.css({ display: '' });
        } else {
          const target = effect === 'reveal' ? $viewEl : $panelEl;
          $panelEl.trigger('close panel:close');
          $('body').addClass('panel-closing');
          target.transitionEnd(() => {
            if ($panelEl.hasClass('active')) return;
            $panelEl.trigger('close panel:closed');
            $panelEl.css({ display: '' });
            $('body').removeClass('panel-closing');
            app.panel.allowOpen = true;
          });
        }
      }
    }
    if (effect === 'reveal') {
      $viewEl.transition('');
      $viewEl.transform('');
    }
    $panelEl.transition('').transform('');
    $overlayEl.css({ display: '' }).transform('').transition('').css('opacity', '');
  }
  const passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;
  const activeListener = app.support.passiveListener ? { passive: false, capture: false } : false;
  $(document).on(app.touchEvents.start, handleTouchStart, passiveListener);
  $(document).on(app.touchEvents.move, handleTouchMove, activeListener);
  $(document).on(app.touchEvents.end, handleTouchEnd, passiveListener);
}

export default swipePanels;
