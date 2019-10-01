import $ from 'dom7';
import Utils from '../../utils/utils';

function swipePanel(panel) {
  const app = panel.app;
  if (panel.swipeInitialized) {
    return;
  }
  Utils.extend(panel, {
    swipeable: true,
    swipeInitialized: true,
  });
  const params = panel.params;
  const { $el, $backdropEl, side, effect } = panel;
  let otherPanel;

  let isTouched;
  let isGestureStarted;
  let isMoved;
  let isScrolling;
  const touchesStart = {};
  let touchStartTime;
  let touchesDiff;
  let translate;
  let backdropOpacity;
  let panelWidth;
  let direction;

  let $viewEl;

  let touchMoves = 0;
  function handleTouchStart(e) {
    if (!panel.swipeable || isGestureStarted) return;
    if (!app.panel.allowOpen || (!params.swipe && !params.swipeOnlyClose) || isTouched) return;
    if ($('.modal-in:not(.toast):not(.notification), .photo-browser-in').length > 0) return;
    otherPanel = app.panel.get(side === 'left' ? 'right' : 'left') || {};
    const otherPanelOpened = otherPanel.opened && otherPanel.$el && !otherPanel.$el.hasClass('panel-in-breakpoint');
    if (!panel.opened && otherPanelOpened) {
      return;
    }
    if (!params.swipeOnlyClose) {
      if (otherPanelOpened) return;
    }
    if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') return;
    if ($(e.target).closest('.range-slider, .tabs-swipeable-wrap, .calendar-months, .no-swipe-panel, .card-opened').length > 0) return;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    if (params.swipeOnlyClose && !panel.opened) {
      return;
    }
    if (params.swipeActiveArea && !panel.opened) {
      if (side === 'left') {
        if (touchesStart.x > params.swipeActiveArea) return;
      }
      if (side === 'right') {
        if (touchesStart.x < app.width - params.swipeActiveArea) return;
      }
    }
    touchMoves = 0;
    $viewEl = $(panel.getViewEl());
    isMoved = false;
    isTouched = true;
    isScrolling = undefined;

    touchStartTime = Utils.now();
    direction = undefined;
  }
  function handleTouchMove(e) {
    if (!isTouched || isGestureStarted) return;
    touchMoves += 1;
    if (touchMoves < 2) return;
    if (e.f7PreventSwipePanel || app.preventSwipePanelBySwipeBack || app.preventSwipePanel) {
      isTouched = false;
      return;
    }
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

      if (params.swipeActiveArea > 0 && !panel.opened) {
        if (side === 'left' && touchesStart.x > params.swipeActiveArea) {
          isTouched = false;
          return;
        }
        if (side === 'right' && touchesStart.x < app.width - params.swipeActiveArea) {
          isTouched = false;
          return;
        }
      }
      if ($el.hasClass('panel-in-breakpoint')) {
        isTouched = false;
        return;
      }

      if (
        (side === 'left'
          && (
            direction === 'to-left' && !$el.hasClass('panel-in')
          )
        )
        || (side === 'right'
          && (
            direction === 'to-right' && !$el.hasClass('panel-in')
          )
        )
      ) {
        isTouched = false;
        return;
      }
    }

    let threshold = panel.opened ? 0 : -params.swipeThreshold;
    if (side === 'right') threshold = -threshold;

    if (!isMoved) {
      if (!panel.opened) {
        panel.insertToRoot();
        $el.addClass('panel-in-swipe');
        $backdropEl.css('visibility', 'visible');
        $el.trigger('panel:swipeopen');
        panel.emit('local::swipeOpen panelSwipeOpen', panel);
      }
      panelWidth = $el[0].offsetWidth;
      if (effect === 'reveal' && $el.hasClass('panel-in-collapsed')) {
        panelWidth -= parseFloat($viewEl.css(`margin-${side}`));
      }
      $el.transition(0);
    }

    isMoved = true;

    e.preventDefault();

    touchesDiff = (pageX - touchesStart.x) + threshold;

    if (side === 'right') {
      if (effect === 'cover') {
        translate = touchesDiff + (panel.opened ? 0 : panelWidth);
        if (translate < 0) translate = 0;
        if (translate > panelWidth) {
          translate = panelWidth;
        }
      } else {
        translate = touchesDiff - (panel.opened ? panelWidth : 0);
        if (translate > 0) translate = 0;
        if (translate < -panelWidth) {
          translate = -panelWidth;
        }
      }
    } else {
      translate = touchesDiff + (panel.opened ? panelWidth : 0);
      if (translate < 0) translate = 0;
      if (translate > panelWidth) {
        translate = panelWidth;
      }
    }
    if (effect === 'reveal') {
      $viewEl.transform(`translate3d(${translate}px,0,0)`).transition(0);
      $backdropEl.transform(`translate3d(${translate}px,0,0)`).transition(0);

      $el.trigger('panel:swipe', Math.abs(translate / panelWidth));
      panel.emit('local::swipe panelSwipe', panel, Math.abs(translate / panelWidth));
    } else {
      if (side === 'left') translate -= panelWidth;
      $el.transform(`translate3d(${translate}px,0,0)`).transition(0);

      $backdropEl.transition(0);
      backdropOpacity = 1 - Math.abs(translate / panelWidth);
      $backdropEl.css({ opacity: backdropOpacity });

      $el.trigger('panel:swipe', Math.abs(translate / panelWidth));
      panel.emit('local::swipe panelSwipe', panel, Math.abs(translate / panelWidth));
    }
  }
  function handleTouchEnd(e) {
    if (!isTouched || !isMoved) {
      isTouched = false;
      isMoved = false;
      return;
    }
    const isGesture = e.type === 'gesturestart' || isGestureStarted;
    isTouched = false;
    isMoved = false;
    const timeDiff = (new Date()).getTime() - touchStartTime;
    let action;
    const edge = (translate === 0 || Math.abs(translate) === panelWidth);

    const threshold = params.swipeThreshold || 0;

    if (isGesture) {
      action = 'reset';
    } else if (!panel.opened) {
      if (Math.abs(touchesDiff) < threshold) {
        action = 'reset';
      } else if (effect === 'cover') {
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
        || (timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2))
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
      || (timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2))
    ) {
      if (side === 'left' && translate === panelWidth) action = 'reset';
      else action = 'swap';
    } else {
      action = 'reset';
    }
    if (action === 'swap') {
      if (panel.opened) {
        panel.close(!edge);
      } else {
        panel.open(!edge);
      }
    }
    let removePanelInClass = true;
    if (action === 'reset') {
      if (!panel.opened) {
        if (edge) {
          // edge position
          $el.removeClass('panel-in-swipe');
        } else {
          removePanelInClass = false;
          const target = effect === 'reveal' ? $viewEl : $el;
          $('html').addClass('with-panel-closing');
          target.transitionEnd(() => {
            if ($el.hasClass('panel-in')) return;
            $el.removeClass('panel-in-swipe');
            $('html').removeClass('with-panel-closing');
          });
        }
      }
    }
    if (effect === 'reveal') {
      Utils.nextFrame(() => {
        $viewEl.transition('');
        $viewEl.transform('');
      });
    }
    if (removePanelInClass) {
      $el.removeClass('panel-in-swipe');
    }
    $el.transition('').transform('');
    $backdropEl.transform('').transition('').css({ opacity: '', visibility: '' });
  }
  function handleGestureStart(e) {
    isGestureStarted = true;
    handleTouchEnd(e);
  }
  function handleGestureEnd() {
    isGestureStarted = false;
  }

  // Add Events
  app.on('touchstart:passive', handleTouchStart);
  app.on('touchmove:active', handleTouchMove);
  app.on('touchend:passive', handleTouchEnd);
  app.on('gesturestart', handleGestureStart);
  app.on('gestureend', handleGestureEnd);
  panel.on('panelDestroy', () => {
    app.off('touchstart:passive', handleTouchStart);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
    app.off('gesturestart', handleGestureStart);
    app.off('gestureend', handleGestureEnd);
  });
}

export default swipePanel;
