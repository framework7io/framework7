import $ from 'dom7';
import Utils from '../../utils/utils';

const Fab = {
  morphOpen(fabEl, targetEl) {
    const app = this;
    const $fabEl = $(fabEl);
    const $targetEl = $(targetEl);
    if ($targetEl.length === 0) return;

    $targetEl.transition(0).addClass('fab-morph-target-visible');
    const target = {
      width: $targetEl[0].offsetWidth,
      height: $targetEl[0].offsetHeight,
      offset: $targetEl.offset(),
      borderRadius: $targetEl.css('border-radius'),
      zIndex: $targetEl.css('z-index'),
    };
    const fab = {
      width: $fabEl[0].offsetWidth,
      height: $fabEl[0].offsetHeight,
      offset: $fabEl.offset(),
      translateX: Utils.getTranslate($fabEl[0], 'x'),
      translateY: Utils.getTranslate($fabEl[0], 'y'),
    };

    $fabEl[0].f7FabMorphData = {
      $targetEl,
      target,
      fab,
    };

    const diffX = (fab.offset.left + (fab.width / 2)) -
                  (target.offset.left + (target.width / 2)) -
                  fab.translateX;
    const diffY = (fab.offset.top + (fab.height / 2)) -
                  (target.offset.top + (target.height / 2)) -
                  fab.translateY;
    const scaleX = target.width / fab.width;
    const scaleY = target.height / fab.height;

    let borderRadius = Math.ceil(parseInt(target.borderRadius, 10) / Math.max(scaleX, scaleY));
    if (borderRadius > 0) borderRadius += 2;

    $fabEl[0].f7FabMorphResizeHandler = function resizeHandler() {
      $fabEl.transition(0).transform('');
      $targetEl.transition(0);
      target.width = $targetEl[0].offsetWidth;
      target.height = $targetEl[0].offsetHeight;
      target.offset = $targetEl.offset();
      fab.offset = $fabEl.offset();

      const diffXNew = (fab.offset.left + (fab.width / 2)) -
                      (target.offset.left + (target.width / 2)) -
                      fab.translateX;
      const diffYNew = (fab.offset.top + (fab.height / 2)) -
                      (target.offset.top + (target.height / 2)) -
                      fab.translateY;
      const scaleXNew = target.width / fab.width;
      const scaleYNew = target.height / fab.height;

      $fabEl.transform(`translate3d(${-diffXNew}px, ${-diffYNew}px, 0) scale(${scaleXNew}, ${scaleYNew})`);
    };

    $targetEl
      .css('opacity', 0)
      .transform(`scale(${1 / scaleX}, ${1 / scaleY})`);
    $fabEl
      .addClass('fab-opened')
      .css('z-index', target.zIndex - 1)
      .transform(`translate3d(${-diffX}px, ${-diffY}px, 0)`);
    $fabEl.transitionEnd(() => {
      $targetEl.transition('');
      Utils.nextTick(() => {
        $targetEl.css('opacity', 1).transform('scale(1,1)');
      });
      $fabEl.transform(`translate3d(${-diffX}px, ${-diffY}px, 0) scale(${scaleX}, ${scaleY})`)
        .css('border-radius', `${borderRadius}px`)
        .css('box-shadow', 'none');
      app.on('resize', $fabEl[0].f7FabMorphResizeHandler);
      if ($targetEl.parents('.page-content').length > 0) {
        $targetEl.parents('.page-content').on('scroll', $fabEl[0].f7FabMorphResizeHandler);
      }
    });
  },
  morphClose(fabEl) {
    const app = this;
    const $fabEl = $(fabEl);
    const morphData = $fabEl[0].f7FabMorphData;
    if (!morphData) return;
    const { $targetEl, target, fab } = morphData;
    if ($targetEl.length === 0) return;

    const diffX = (fab.offset.left + (fab.width / 2)) -
                  (target.offset.left + (target.width / 2)) -
                  fab.translateX;
    const diffY = (fab.offset.top + (fab.height / 2)) -
                  (target.offset.top + (target.height / 2)) -
                  fab.translateY;
    const scaleX = target.width / fab.width;
    const scaleY = target.height / fab.height;

    app.off('resize', $fabEl[0].f7FabMorphResizeHandler);
    if ($targetEl.parents('.page-content').length > 0) {
      $targetEl.parents('.page-content').off('scroll', $fabEl[0].f7FabMorphResizeHandler);
    }

    $targetEl
      .css('opacity', 0)
      .transform(`scale(${1 / scaleX}, ${1 / scaleY})`);
    $fabEl
      .transition('')
      .css('box-shadow', '')
      .css('border-radius', '')
      .transform(`translate3d(${-diffX}px, ${-diffY}px, 0)`);
    $fabEl.transitionEnd(() => {
      $fabEl
        .css('z-index', '')
        .removeClass('fab-opened')
        .transform('');
      Utils.nextTick(() => {
        $fabEl.transitionEnd(() => {
          $targetEl
            .removeClass('fab-morph-target-visible')
            .css('opacity', '')
            .transform('')
            .transition('');
        });
      });
    });
  },
  open(fabEl, targetEl) {
    const app = this;
    const $fabEl = $(fabEl).eq(0);
    const $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) return;
    if ($fabEl.hasClass('fab-opened')) return;
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) return;

    if (app.fab.openedEl) {
      if (app.fab.openedEl === $fabEl[0]) return;
      app.fab.close(app.fab.openedEl);
    }
    app.fab.openedEl = $fabEl[0];
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphOpen($fabEl, targetEl || $fabEl.attr('data-morph-to'));
    } else {
      $fabEl.addClass('fab-opened');
    }
    $fabEl.trigger('fab:open');
  },
  close(fabEl = '.fab-opened') {
    const app = this;
    const $fabEl = $(fabEl).eq(0);
    const $buttonsEl = $fabEl.find('.fab-buttons');
    if (!$fabEl.length) return;
    if (!$fabEl.hasClass('fab-opened')) return;
    if (!$buttonsEl.length && !$fabEl.hasClass('fab-morph')) return;
    app.fab.openedEl = null;
    if ($fabEl.hasClass('fab-morph')) {
      app.fab.morphClose($fabEl);
    } else {
      $fabEl.removeClass('fab-opened');
    }
    $fabEl.trigger('fab:close');
  },
  toggle(fabEl) {
    const app = this;
    const $fabEl = $(fabEl);
    if (!$fabEl.hasClass('fab-opened')) app.fab.open(fabEl);
    else app.fab.close(fabEl);
  },
};

export default {
  name: 'fab',
  create() {
    const app = this;
    Utils.extend(app, {
      fab: {
        openedEl: null,
        morphOpen: Fab.morphOpen.bind(app),
        morphClose: Fab.morphClose.bind(app),
        open: Fab.open.bind(app),
        close: Fab.close.bind(app),
        toggle: Fab.toggle.bind(app),
      },
    });
  },
  clicks: {
    '.fab > a': function open($clickedEl) {
      const app = this;
      app.fab.toggle($clickedEl.parents('.fab'));
    },
    '.fab-open': function open($clickedEl, data = {}) {
      const app = this;
      app.fab.open(data.fab);
    },
    '.fab-close': function close($clickedEl, data = {}) {
      const app = this;
      app.fab.close(data.fab);
    },
  },
};
