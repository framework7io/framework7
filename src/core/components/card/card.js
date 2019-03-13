import $ from 'dom7';
import Utils from '../../utils/utils';
import Support from '../../utils/support';

const CardExpandable = {
  open(cardEl = '.card-expandable', animate = true) {
    const app = this;
    if ($('.card-opened').length) return;
    const $cardEl = $(cardEl).eq(0);

    if (!$cardEl || !$cardEl.length) return;
    if ($cardEl.hasClass('card-opened') || $cardEl.hasClass('card-opening') || $cardEl.hasClass('card-closing')) return;

    const $pageEl = $cardEl.parents('.page').eq(0);
    if (!$pageEl.length) return;

    let prevented;

    function prevent() {
      prevented = true;
    }

    $cardEl.trigger('card:beforeopen', { prevent });
    app.emit('cardBeforeOpen', $cardEl[0], prevent);

    if (prevented) return;

    let $backropEl;
    if ($cardEl.attr('data-backdrop-el')) {
      $backropEl = $($cardEl.attr('data-backdrop-el'));
    }
    if (!$backropEl && app.params.card.backrop) {
      $backropEl = $cardEl.parents('.page-content').find('.card-backdrop');
      if (!$backropEl.length) {
        $backropEl = $('<div class="card-backdrop"></div>');
        $cardEl.parents('.page-content').append($backropEl);
      }
    }

    let $navbarEl;
    let $toolbarEl;
    if (app.params.card.hideNavbarOnOpen) {
      $navbarEl = $pageEl.children('.navbar');
      if (!$navbarEl.length) {
        if ($pageEl[0].f7Page) $navbarEl = $pageEl[0].f7Page.$navbarEl;
      }
    }
    if (app.params.card.hideToolbarOnOpen) {
      $toolbarEl = $pageEl.children('.toolbar');
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.view').children('.toolbar');
      }
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.views').children('.toolbar');
      }
    }

    const currTransform = $cardEl.css('transform');
    let hasTransform;
    if (currTransform && currTransform.match(/[2-9]/)) {
      hasTransform = true;
    }
    const $cardContentEl = $cardEl.children('.card-content');

    const $cardSizeEl = $(document.createElement('div')).addClass('card-expandable-size');
    $cardEl.append($cardSizeEl);

    let cardWidth = $cardEl[0].offsetWidth;
    let cardHeight = $cardEl[0].offsetHeight;
    let pageWidth = $pageEl[0].offsetWidth;
    let pageHeight = $pageEl[0].offsetHeight;

    let maxWidth = $cardSizeEl[0].offsetWidth || pageWidth;
    let maxHeight = $cardSizeEl[0].offsetHeight || pageHeight;

    let scaleX = maxWidth / cardWidth;
    let scaleY = maxHeight / cardHeight;

    let offset = $cardEl.offset();
    let pageOffset = $pageEl.offset();
    offset.left -= pageOffset.left;
    offset.top -= pageOffset.top;

    let cardLeftOffset;
    let cardTopOffset;

    if (hasTransform) {
      const transformValues = currTransform
        .replace(/matrix\(|\)/g, '')
        .split(',')
        .map(el => el.trim());
      if (transformValues && transformValues.length > 1) {
        const scale = parseFloat(transformValues[0]);
        cardLeftOffset = offset.left - cardWidth * (1 - scale) / 2;
        cardTopOffset = offset.top - $pageEl.offset().top - cardHeight * (1 - scale) / 2;
        if (app.rtl) cardLeftOffset -= $cardEl[0].scrollLeft;
      } else {
        cardLeftOffset = $cardEl[0].offsetLeft;
        cardTopOffset = $cardEl[0].offsetTop - $cardEl.parents('.page-content')[0].scrollTop;
      }
    } else {
      cardLeftOffset = offset.left;
      cardTopOffset = offset.top - $pageEl.offset().top;
      if (app.rtl) cardLeftOffset -= $cardEl[0].scrollLeft;
    }

    cardLeftOffset -= (pageWidth - maxWidth) / 2;
    cardTopOffset -= (pageHeight - maxHeight) / 2;

    let cardRightOffset = maxWidth - cardWidth - cardLeftOffset;
    if (app.rtl) {
      [cardLeftOffset, cardRightOffset] = [cardRightOffset, cardLeftOffset];
    }
    let cardBottomOffset = maxHeight - cardHeight - cardTopOffset;
    let translateX = (cardRightOffset - cardLeftOffset) / 2;
    let translateY = (cardBottomOffset - cardTopOffset) / 2;
    if (app.params.card.hideNavbarOnOpen && $navbarEl && $navbarEl.length) {
      app.navbar.hide($navbarEl, animate);
    }
    if (app.params.card.hideToolbarOnOpen && $toolbarEl && $toolbarEl.length) {
      app.toolbar.hide($toolbarEl, animate);
    }
    if ($backropEl) {
      $backropEl.removeClass('card-backdrop-out').addClass('card-backdrop-in');
    }
    $cardEl.removeClass('card-transitioning');
    if (animate) {
      $cardEl.addClass('card-opening');
    }
    $cardEl.trigger('card:open');
    app.emit('cardOpen', $cardEl[0]);
    function transitionEnd() {
      $cardEl.addClass('card-opened');
      $cardEl.removeClass('card-opening');
      $cardEl.trigger('card:opened');
      app.emit('cardOpened', $cardEl[0]);
    }
    $cardContentEl
      .css({
        width: `${maxWidth}px`,
        height: `${maxHeight}px`,
      })
      .transform(`translate3d(${app.rtl ? (cardLeftOffset + translateX) : (-cardLeftOffset - translateX)}px, 0px, 0) scale(${1 / scaleX}, ${1 / scaleY})`);

    $cardEl
      .transform(`translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`);
    if (animate) {
      $cardEl.transitionEnd(() => {
        transitionEnd();
      });
    } else {
      transitionEnd();
    }

    $pageEl.addClass('page-with-card-opened');

    function onResize() {
      $cardEl.removeClass('card-transitioning');
      cardWidth = $cardEl[0].offsetWidth;
      cardHeight = $cardEl[0].offsetHeight;
      pageWidth = $pageEl[0].offsetWidth;
      pageHeight = $pageEl[0].offsetHeight;
      maxWidth = $cardSizeEl[0].offsetWidth || pageWidth;
      maxHeight = $cardSizeEl[0].offsetHeight || pageHeight;

      scaleX = maxWidth / cardWidth;
      scaleY = maxHeight / cardHeight;

      $cardEl.transform('translate3d(0px, 0px, 0) scale(1)');
      offset = $cardEl.offset();
      pageOffset = $pageEl.offset();
      offset.left -= pageOffset.left;
      offset.top -= pageOffset.top;

      cardLeftOffset = offset.left - (pageWidth - maxWidth) / 2;
      if (app.rtl) cardLeftOffset -= $cardEl[0].scrollLeft;
      cardTopOffset = offset.top - (pageHeight - maxHeight) / 2;

      cardRightOffset = maxWidth - cardWidth - cardLeftOffset;
      cardBottomOffset = maxHeight - cardHeight - cardTopOffset;
      if (app.rtl) {
        [cardLeftOffset, cardRightOffset] = [cardRightOffset, cardLeftOffset];
      }
      translateX = (cardRightOffset - cardLeftOffset) / 2;
      translateY = (cardBottomOffset - cardTopOffset) / 2;

      $cardEl.transform(`translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`);
      $cardContentEl
        .css({
          width: `${maxWidth}px`,
          height: `${maxHeight}px`,
        })
        .transform(`translate3d(${app.rtl ? (cardLeftOffset + translateX) : (-cardLeftOffset - translateX)}px, 0px, 0) scale(${1 / scaleX}, ${1 / scaleY})`);
    }

    let cardScrollTop;
    let isTouched;
    let isMoved;
    let touchStartX;
    let touchStartY;
    let touchEndX;
    let touchEndY;
    let isScrolling;
    let progress;
    let isV;
    let isH;
    function onTouchStart(e) {
      if (!$(e.target).closest($cardEl).length) return;
      if (!$cardEl.hasClass('card-opened')) return;
      cardScrollTop = $cardContentEl.scrollTop();
      isTouched = true;
      touchStartX = e.targetTouches[0].pageX;
      touchStartY = e.targetTouches[0].pageY;
      isScrolling = undefined;
      isV = false;
      isH = false;
    }
    function onTouchMove(e) {
      if (!isTouched) return;
      touchEndX = e.targetTouches[0].pageX;
      touchEndY = e.targetTouches[0].pageY;
      if (typeof isScrolling === 'undefined') {
        isScrolling = !!(isScrolling || Math.abs(touchEndY - touchStartY) > Math.abs(touchEndX - touchStartX));
      }
      if (!isH && !isV) {
        if (!isScrolling && e.targetTouches[0].clientX <= 50) {
          isH = true;
        } else {
          isV = true;
        }
      }

      if (!(isH || isV) || (isV && cardScrollTop !== 0)) {
        isTouched = true;
        isMoved = true;
        return;
      }
      if (!isMoved) {
        $cardEl.removeClass('card-transitioning');
      }

      isMoved = true;
      progress = isV ? Math.max((touchEndY - touchStartY) / 150, 0) : Math.max((touchEndX - touchStartX) / (cardWidth / 2), 0);
      if ((progress > 0 && isV) || isH) {
        if (isV && app.device.ios) {
          $cardContentEl.css('-webkit-overflow-scrolling', 'auto');
          $cardContentEl.scrollTop(0);
        }
        e.preventDefault();
      }

      if (progress > 1) progress **= 0.3;
      if (progress > (isV ? 1.3 : 1.1)) {
        isTouched = false;
        isMoved = false;
        app.card.close($cardEl);
      } else {
        $cardEl.transform(`translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX * (1 - progress * 0.2)}, ${scaleY * (1 - progress * 0.2)})`);
      }
    }
    function onTouchEnd() {
      if (!isTouched || !isMoved) return;
      isTouched = false;
      isMoved = false;
      if (app.device.ios) {
        $cardContentEl.css('-webkit-overflow-scrolling', '');
      }
      if (progress >= 0.8) {
        app.card.close($cardEl);
      } else {
        $cardEl
          .addClass('card-transitioning')
          .transform(`translate3d(${translateX}px, ${translateY}px, 0) scale(${scaleX}, ${scaleY})`);
      }
    }

    $cardEl[0].detachEventHandlers = function detachEventHandlers() {
      app.off('resize', onResize);
      if (Support.touch && app.params.card.swipeToClose) {
        app.off('touchstart:passive', onTouchStart);
        app.off('touchmove:active', onTouchMove);
        app.off('touchend:passive', onTouchEnd);
      }
    };

    app.on('resize', onResize);
    if (Support.touch && app.params.card.swipeToClose) {
      app.on('touchstart:passive', onTouchStart);
      app.on('touchmove:active', onTouchMove);
      app.on('touchend:passive', onTouchEnd);
    }
  },
  close(cardEl = '.card-expandable.card-opened', animate = true) {
    const app = this;
    const $cardEl = $(cardEl).eq(0);
    if (!$cardEl || !$cardEl.length) return;
    if (!$cardEl.hasClass('card-opened') || $cardEl.hasClass('card-opening') || $cardEl.hasClass('card-closing')) return;

    const $cardContentEl = $cardEl.children('.card-content');

    const $pageEl = $cardEl.parents('.page').eq(0);
    if (!$pageEl.length) return;
    let $navbarEl;
    let $toolbarEl;

    let $backropEl;
    if ($cardEl.attr('data-backdrop-el')) {
      $backropEl = $($cardEl.attr('data-backdrop-el'));
    }
    if (app.params.card.backrop) {
      $backropEl = $cardEl.parents('.page-content').find('.card-backdrop');
    }

    if (app.params.card.hideNavbarOnOpen) {
      $navbarEl = $pageEl.children('.navbar');
      if (!$navbarEl.length) {
        if ($pageEl[0].f7Page) $navbarEl = $pageEl[0].f7Page.$navbarEl;
      }
      if ($navbarEl && $navbarEl.length) {
        app.navbar.show($navbarEl, animate);
      }
    }
    if (app.params.card.hideToolbarOnOpen) {
      $toolbarEl = $pageEl.children('.toolbar');
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.view').children('.toolbar');
      }
      if (!$toolbarEl.length) {
        $toolbarEl = $pageEl.parents('.views').children('.toolbar');
      }
      if ($toolbarEl && $toolbarEl.length) {
        app.toolbar.show($toolbarEl, animate);
      }
    }
    $pageEl.removeClass('page-with-card-opened');

    if ($backropEl && $backropEl.length) {
      $backropEl.removeClass('card-backdrop-in').addClass('card-backdrop-out');
    }

    $cardEl.removeClass('card-opened card-transitioning');
    if (animate) {
      $cardEl.addClass('card-closing');
    } else {
      $cardEl.addClass('card-no-transition');
    }
    $cardEl.transform('');
    $cardEl.trigger('card:close');
    app.emit('cardClose', $cardEl[0]);

    function transitionEnd() {
      $cardEl.removeClass('card-closing card-no-transition');
      $cardEl.trigger('card:closed');
      $cardEl.find('.card-expandable-size').remove();
      app.emit('cardClosed', $cardEl[0]);
    }
    $cardContentEl
      .css({
        width: '',
        height: '',
      })
      .transform('')
      .scrollTop(0, animate ? 300 : 0);
    if (animate) {
      $cardContentEl.transitionEnd(() => {
        transitionEnd();
      });
    } else {
      transitionEnd();
    }

    if ($cardEl[0].detachEventHandlers) {
      $cardEl[0].detachEventHandlers();
      delete $cardEl[0].detachEventHandlers;
    }
  },
  toggle(cardEl = '.card-expandable', animate) {
    const app = this;
    const $cardEl = $(cardEl).eq(0);
    if (!$cardEl.length) return;
    if ($cardEl.hasClass('card-opened')) {
      app.card.close($cardEl, animate);
    } else {
      app.card.open($cardEl, animate);
    }
  },
};

export default {
  name: 'card',
  params: {
    card: {
      hideNavbarOnOpen: true,
      hideToolbarOnOpen: true,
      swipeToClose: true,
      closeByBackdropClick: true,
      backrop: true,
    },
  },
  create() {
    const app = this;
    Utils.extend(app, {
      card: {
        open: CardExpandable.open.bind(app),
        close: CardExpandable.close.bind(app),
        toggle: CardExpandable.toggle.bind(app),
      },
    });
  },
  on: {
    pageBeforeIn(page) {
      const app = this;
      if (app.params.card.hideNavbarOnOpen && page.navbarEl && page.$el.find('.card-opened.card-expandable').length) {
        app.navbar.hide(page.navbarEl);
      }

      if (app.params.card.hideToolbarOnOpen && page.$el.find('.card-opened.card-expandable').length) {
        let $toolbarEl = page.$el.children('.toolbar');
        if (!$toolbarEl.length) {
          $toolbarEl = page.$el.parents('.view').children('.toolbar');
        }
        if (!$toolbarEl.length) {
          $toolbarEl = page.$el.parents('.views').children('.toolbar');
        }
        if ($toolbarEl && $toolbarEl.length) {
          app.toolbar.hide($toolbarEl);
        }
      }
    },
  },
  clicks: {
    '.card-close': function closeCard($clickedEl, data) {
      const app = this;
      app.card.close(data.card);
    },
    '.card-open': function closeCard($clickedEl, data) {
      const app = this;
      app.card.open(data.card);
    },
    '.card-expandable': function toggleExpandableCard($clickedEl, data, e) {
      const app = this;
      if ($clickedEl.hasClass('card-opened') || $clickedEl.hasClass('card-opening') || $clickedEl.hasClass('card-closing')) return;
      if ($(e.target).closest('.card-prevent-open').length) return;
      app.card.open($clickedEl);
    },
    '.card-backdrop-in': function onBackdropClick() {
      const app = this;
      let needToClose = false;
      if (app.params.card.closeByBackdropClick) needToClose = true;
      const $openedCardEl = $('.card-opened');
      if (!$openedCardEl.length) return;
      if ($openedCardEl.attr('data-close-on-backdrop-click') === 'true') {
        needToClose = true;
      } else if ($openedCardEl.attr('data-close-on-backdrop-click') === 'false') {
        needToClose = false;
      }
      if (needToClose) app.card.close($openedCardEl);
    },
  },
};
