import $ from 'dom7';
import Utils from '../../utils/utils';

function swipePanel(panel) {
  const app = panel.app;
  Utils.extend(panel, {
    swipeable: true,
    swipeInitialized: true,
  });
  const params = app.params.panel;
  const { $el, $backdropEl, side, effect } = panel;
  let otherPanel;

  let isTouched;
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
    if (!panel.swipeable) return;
    if (!app.panel.allowOpen || (!params.swipe && !params.swipeOnlyClose) || isTouched) return;
    if ($('.modal-in:not(.toast):not(.notification), .photo-browser-in').length > 0) return;
    otherPanel = app.panel[side === 'left' ? 'right' : 'left'] || {};
    if (!panel.opened && otherPanel.opened) return;
    if (!(params.swipeCloseOpposite || params.swipeOnlyClose)) {
      if (otherPanel.opened) return;
    }
    if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') return;
    if ($(e.target).closest('.range-slider, .tabs-swipeable-wrap, .calendar-months, .no-swipe-panel, .card-opened').length > 0) return;
    touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    if (params.swipeOnlyClose && !panel.opened) {
      return;
    }
    if (params.swipe !== 'both' && params.swipeCloseOpposite && params.swipe !== side && !panel.opened) {
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
    if (params.swipeCloseActiveAreaSide && panel.opened) {
      if (side === 'left') {
        if (touchesStart.x < ($el[0].offsetWidth - params.swipeCloseActiveAreaSide)) return;
      }
      if (side === 'right') {
        if (touchesStart.x > ((app.width - $el[0].offsetWidth) + params.swipeCloseActiveAreaSide)) return;
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
    if (!isTouched) return;
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

      if (params.swipe === 'both') {
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
      }
      if ($el.hasClass('panel-visible-by-breakpoint')) {
        isTouched = false;
        return;
      }

      if (
        (side === 'left'
          && (
            direction === 'to-left' && !$el.hasClass('panel-active')
          )
        )
        || (side === 'right'
          && (
            direction === 'to-right' && !$el.hasClass('panel-active')
          )
        )
      ) {
        isTouched = false;
        return;
      }
    }

    let threshold = panel.opened ? 0 : -params.swipeThreshold;
    if (side === 'right') threshold = -threshold;

    if (params.swipeNoFollow) {
      const touchesDiffNoFollow = (pageX - touchesStart.x);
      const timeDiff = (new Date()).getTime() - touchStartTime;
      let needToSwitch;
      if (!panel.opened && (
        (side === 'left' && touchesDiffNoFollow > -threshold)
        || (side === 'right' && -touchesDiffNoFollow > threshold)
      )) {
        needToSwitch = true;
      }
      if (panel.opened && (
        (side === 'left' && touchesDiffNoFollow < 0)
        || (side === 'right' && touchesDiffNoFollow > 0)
      )) {
        needToSwitch = true;
      }

      if (needToSwitch) {
        if (timeDiff < 300) {
          if (direction === 'to-left') {
            if (side === 'right') app.panel.open(side);
            if (side === 'left' && $el.hasClass('panel-active')) app.panel.close();
          }
          if (direction === 'to-right') {
            if (side === 'left') app.panel.open(side);
            if (side === 'right' && $el.hasClass('panel-active')) app.panel.close();
          }
        }
        isTouched = false;
        isMoved = false;
      }
      return;
    }

    if (!isMoved) {
      if (!panel.opened) {
        $el.show();
        $backdropEl.show();
        $el.trigger('panel:swipeopen', panel);
        panel.emit('local::swipeOpen panelSwipeOpen', panel);
      }
      panelWidth = $el[0].offsetWidth;
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

      $el.trigger('panel:swipe', panel, Math.abs(translate / panelWidth));
      panel.emit('local::swipe panelSwipe', panel, Math.abs(translate / panelWidth));
    } else {
      if (side === 'left') translate -= panelWidth;
      $el.transform(`translate3d(${translate}px,0,0)`).transition(0);

      $backdropEl.transition(0);
      backdropOpacity = 1 - Math.abs(translate / panelWidth);
      $backdropEl.css({ opacity: backdropOpacity });

      $el.trigger('panel:swipe', panel, Math.abs(translate / panelWidth));
      panel.emit('local::swipe panelSwipe', panel, Math.abs(translate / panelWidth));
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

    const threshold = params.swipeThreshold || 0;

    if (!panel.opened) {
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
    if (action === 'reset') {
      if (!panel.opened) {
        if (edge) {
          $el.css({ display: '' });
        } else {
          const target = effect === 'reveal' ? $viewEl : $el;
          $('html').addClass('with-panel-transitioning');
          target.transitionEnd(() => {
            if ($el.hasClass('panel-active')) return;
            $el.css({ display: '' });
            $('html').removeClass('with-panel-transitioning');
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
    $el.transition('').transform('');
    $backdropEl.css({ display: '' }).transform('').transition('').css('opacity', '');
  }

  // Add Events
  app.on('touchstart:passive', handleTouchStart);
  app.on('touchmove:active', handleTouchMove);
  app.on('touchend:passive', handleTouchEnd);
  panel.on('panelDestroy', () => {
    app.off('touchstart:passive', handleTouchStart);
    app.off('touchmove:active', handleTouchMove);
    app.off('touchend:passive', handleTouchEnd);
  });
}

export default swipePanel;
