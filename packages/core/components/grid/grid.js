import $ from 'dom7';
import Utils from '../../utils/utils';

function getElMinSize(dimension, $el) {
  let minSize = $el.css(`min-${dimension}`);
  if (minSize === 'auto' || minSize === 'none') {
    minSize = 0;
  } else if (minSize.indexOf('px') >= 0) {
    minSize = parseFloat(minSize);
  } else if (minSize.indexOf('%') >= 0) {
    minSize = $el.parent()[0][dimension === 'height' ? 'offsetHeight' : 'offsetWidth'] * parseFloat(minSize) / 100;
  }
  return minSize;
}
function getElMaxSize(dimension, $el) {
  let maxSize = $el.css(`max-${dimension}`);
  if (maxSize === 'auto' || maxSize === 'none') {
    maxSize = null;
  } else if (maxSize.indexOf('px') >= 0) {
    maxSize = parseFloat(maxSize);
  } else if (maxSize.indexOf('%') >= 0) {
    maxSize = $el.parent()[0][dimension === 'height' ? 'offsetHeight' : 'offsetWidth'] * parseFloat(maxSize) / 100;
  }
  return maxSize;
}

const Grid = {
  init() {
    const app = this;
    let isTouched;
    let isMoved;
    let touchStartX;
    let touchStartY;
    let $resizeHandlerEl;
    let $prevResizableEl;
    let $nextResizableEl;
    let prevElSize;
    let prevElMinSize;
    let prevElMaxSize;
    let nextElSize;
    let nextElMinSize;
    let nextElMaxSize;
    let parentSize;
    let itemsInFlow;
    let gapSize;
    let isScrolling;

    function handleTouchStart(e) {
      if (isTouched || isMoved) return;
      $resizeHandlerEl = $(e.target).closest('.resize-handler');
      touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      isTouched = true;
      $prevResizableEl = undefined;
      $nextResizableEl = undefined;
      isScrolling = undefined;
    }

    function handleTouchMove(e) {
      if (!isTouched) return;
      const isRow = $resizeHandlerEl.parent('.row').length === 1;
      const sizeProp = isRow ? 'height' : 'width';
      const getSizeProp = isRow ? 'offsetHeight' : 'offsetWidth';
      if (!isMoved) {
        $prevResizableEl = $resizeHandlerEl.parent(isRow ? '.row' : '.col');
        if ($prevResizableEl.length && (!$prevResizableEl.hasClass('resizable') || $prevResizableEl.hasClass('resizable-fixed'))) {
          $prevResizableEl = $prevResizableEl.prevAll('.resizable:not(.resizable-fixed)').eq(0);
        }
        $nextResizableEl = $prevResizableEl.next(isRow ? '.row' : '.col');
        if ($nextResizableEl.length && (!$nextResizableEl.hasClass('resizable') || $nextResizableEl.hasClass('resizable-fixed'))) {
          $nextResizableEl = $nextResizableEl.nextAll('.resizable:not(.resizable-fixed)').eq(0);
        }

        if ($prevResizableEl.length) {
          prevElSize = $prevResizableEl[0][getSizeProp];
          prevElMinSize = getElMinSize(sizeProp, $prevResizableEl);
          prevElMaxSize = getElMaxSize(sizeProp, $prevResizableEl);
          parentSize = $prevResizableEl.parent()[0][getSizeProp];
          itemsInFlow = $prevResizableEl.parent().children(isRow ? '.row' : '[class*="col-"], .col').length;
          gapSize = parseFloat($prevResizableEl.css(isRow ? '--f7-grid-row-gap' : '--f7-grid-gap'));
        }
        if ($nextResizableEl.length) {
          nextElSize = $nextResizableEl[0][getSizeProp];
          nextElMinSize = getElMinSize(sizeProp, $nextResizableEl);
          nextElMaxSize = getElMaxSize(sizeProp, $nextResizableEl);
          if (!$prevResizableEl.length) {
            parentSize = $nextResizableEl.parent()[0][getSizeProp];
            itemsInFlow = $nextResizableEl.parent().children(isRow ? '.row' : '[class*="col-"], .col').length;
            gapSize = parseFloat($nextResizableEl.css(isRow ? '--f7-grid-row-gap' : '--f7-grid-gap'));
          }
        }
      }

      isMoved = true;
      const touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      const touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      if (typeof isScrolling === 'undefined' && !isRow) {
        isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
      }
      if (isScrolling) {
        isTouched = false;
        isMoved = false;
        return;
      }

      const isAbsolute = $prevResizableEl.hasClass('resizable-absolute') || $nextResizableEl.hasClass('resizable-absolute');
      const resizeNextEl = !isRow || (isRow && !isAbsolute);

      if ((resizeNextEl && !$nextResizableEl.length) || !$prevResizableEl.length) {
        isTouched = false;
        isMoved = false;
        return;
      }

      e.preventDefault();

      let diff = isRow
        ? touchCurrentY - touchStartY
        : touchCurrentX - touchStartX;

      let prevElNewSize;
      let nextElNewSize;
      if ($prevResizableEl.length) {
        prevElNewSize = prevElSize + diff;
        if (prevElNewSize < prevElMinSize) {
          prevElNewSize = prevElMinSize;
          diff = prevElNewSize - prevElSize;
        }
        if (prevElMaxSize && prevElNewSize > prevElMaxSize) {
          prevElNewSize = prevElMaxSize;
          diff = prevElNewSize - prevElSize;
        }
      }
      if ($nextResizableEl.length && resizeNextEl) {
        nextElNewSize = nextElSize - diff;
        if (nextElNewSize < nextElMinSize) {
          nextElNewSize = nextElMinSize;
          diff = nextElSize - nextElNewSize;
          prevElNewSize = prevElSize + diff;
        }
        if (nextElMaxSize && nextElNewSize > nextElMaxSize) {
          nextElNewSize = nextElMaxSize;
          diff = nextElSize - nextElNewSize;
          prevElNewSize = prevElSize + diff;
        }
      }

      if (isAbsolute) {
        $prevResizableEl[0].style[sizeProp] = `${prevElNewSize}px`;
        if (resizeNextEl) {
          $nextResizableEl[0].style[sizeProp] = `${nextElNewSize}px`;
        }
        $prevResizableEl.trigger('grid:resize');
        $nextResizableEl.trigger('grid:resize');
        app.emit('gridResize', $prevResizableEl[0]);
        app.emit('gridResize', $nextResizableEl[0]);
        return;
      }

      const gapAddSize = (itemsInFlow - 1) * gapSize / itemsInFlow;
      const gapAddSizeCSS = isRow
        ? `${itemsInFlow - 1} * var(--f7-grid-row-gap) / ${itemsInFlow}`
        : '(var(--f7-cols-per-row) - 1) * var(--f7-grid-gap) / var(--f7-cols-per-row)';
      const prevElNewSizeNormalized = prevElNewSize + gapAddSize;
      const nextElNewSizeNormalized = nextElNewSize + gapAddSize;
      $prevResizableEl[0].style[sizeProp] = `calc(${prevElNewSizeNormalized / parentSize * 100}% - ${gapAddSizeCSS})`;
      $nextResizableEl[0].style[sizeProp] = `calc(${nextElNewSizeNormalized / parentSize * 100}% - ${gapAddSizeCSS})`;
      $prevResizableEl.trigger('grid:resize');
      $nextResizableEl.trigger('grid:resize');
      app.emit('gridResize', $prevResizableEl[0]);
      app.emit('gridResize', $nextResizableEl[0]);
    }

    function handleTouchEnd() {
      if (!isTouched) return;
      if (!isMoved) {
        isTouched = false;
      }
      isTouched = false;
      isMoved = false;
    }

    $(document).on(app.touchEvents.start, '.col > .resize-handler, .row > .resize-handler', handleTouchStart);
    app.on('touchmove', handleTouchMove);
    app.on('touchend', handleTouchEnd);
  },
};

export default {
  name: 'grid',
  create() {
    const app = this;
    Utils.extend(app, {
      grid: {
        init: Grid.init.bind(app),
      },
    });
  },
  on: {
    init() {
      const app = this;
      app.grid.init();
    },
  },
};
