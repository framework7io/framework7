import $ from 'dom7';
import Utils from '../../utils/utils';
import Support from '../../utils/support';
import Framework7Class from '../../utils/class';

class Tooltip extends Framework7Class {
  constructor(app, params = {}) {
    super(app, params);

    const tooltip = this;

    const defaults = Utils.extend({}, app.params.tooltip);

    // Extend defaults with modules params
    tooltip.useModulesParams(defaults);

    tooltip.params = Utils.extend(defaults, params);

    const { el } = tooltip.params;
    if (!el) return tooltip;

    const $el = $(el);
    if ($el.length === 0) return tooltip;

    const $tooltipEl = $(tooltip.render()).eq(0);

    Utils.extend(tooltip, {
      app,
      $el,
      el: $el && $el[0],
      $tooltipEl,
      tooltipEl: $tooltipEl && $tooltipEl[0],
      text: tooltip.params.text || '',
      visible: false,
      opened: false,
    });

    $el[0].f7Tooltip = tooltip;

    const touchesStart = {};
    let isTouched;
    function handleTouchStart(e) {
      if (isTouched) return;
      isTouched = true;
      touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      tooltip.show(this);
    }
    function handleTouchMove(e) {
      if (!isTouched) return;
      const x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      const y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      const distance = (
        ((x - touchesStart.x) ** 2) +
        ((y - touchesStart.y) ** 2)
      ) ** 0.5;
      if (distance > 50) {
        isTouched = false;
        tooltip.hide();
      }
    }
    function handleTouchEnd() {
      if (!isTouched) return;
      isTouched = false;
      tooltip.hide();
    }
    function handleMouseEnter() {
      tooltip.show(this);
    }
    function handleMouseLeave() {
      tooltip.hide();
    }
    function handleTransitionEnd() {
      if (!$tooltipEl.hasClass('tooltip-in')) {
        $tooltipEl.removeClass('tooltip-out').remove();
      }
    }

    tooltip.attachEvents = function attachEvents() {
      if (Support.touch) {
        const passive = Support.passiveListener ? { passive: true } : false;
        $el.on(app.touchEvents.start, handleTouchStart, passive);
        app.on('touchmove', handleTouchMove);
        app.on('touchend:passive', handleTouchEnd);
        return;
      }
      $tooltipEl.on('transitionend webkitTransitionEnd', handleTransitionEnd);
      $el.on('mouseenter', handleMouseEnter);
      $el.on('mouseleave', handleMouseLeave);
    };
    tooltip.detachEvents = function detachEvents() {
      if (Support.touch) {
        const passive = Support.passiveListener ? { passive: true } : false;
        $el.off(app.touchEvents.start, handleTouchStart, passive);
        app.off('touchmove', handleTouchMove);
        app.off('touchend:passive', handleTouchEnd);
        return;
      }
      $tooltipEl.off('transitionend webkitTransitionEnd', handleTransitionEnd);
      $el.off('mouseenter', handleMouseEnter);
      $el.off('mouseleave', handleMouseLeave);
    };

    // Install Modules
    tooltip.useModules();

    tooltip.init();

    return tooltip;
  }
  position(targetEl) {
    const tooltip = this;
    const { $tooltipEl, app } = tooltip;
    $tooltipEl.css({ left: '', top: '' });
    const $targetEl = $(targetEl || tooltip.el);
    const [width, height] = [$tooltipEl.width(), $tooltipEl.height()];

    $tooltipEl.css({ left: '', top: '' });

    let targetWidth;
    let targetHeight;
    let targetOffsetLeft;
    let targetOffsetTop;
    if ($targetEl && $targetEl.length > 0) {
      targetWidth = $targetEl.outerWidth();
      targetHeight = $targetEl.outerHeight();

      const targetOffset = $targetEl.offset();
      targetOffsetLeft = targetOffset.left - app.left;
      targetOffsetTop = targetOffset.top - app.top;

      const targetParentPage = $targetEl.parents('.page');
      if (targetParentPage.length > 0) {
        targetOffsetTop -= targetParentPage[0].scrollTop;
      }
    }
    let [left, top] = [0, 0, 0];

    // Top Position
    let position = 'top';

    if (height < targetOffsetTop) {
      // On top
      top = targetOffsetTop - height;
    } else if (height < app.height - targetOffsetTop - targetHeight) {
      // On bottom
      position = 'bottom';
      top = targetOffsetTop + targetHeight;
    } else {
      // On middle
      position = 'middle';
      top = ((targetHeight / 2) + targetOffsetTop) - (height / 2);
      if (top <= 0) {
        top = 8;
      } else if (top + height >= app.height) {
        top = app.height - height - 8;
      }
    }

    // Horizontal Position
    if (position === 'top' || position === 'bottom') {
      left = ((targetWidth / 2) + targetOffsetLeft) - (width / 2);
      if (left < 8) left = 8;
      if (left + width > app.width) left = app.width - width - 8;
      if (left < 0) left = 0;
    } else if (position === 'middle') {
      left = targetOffsetLeft - width;
      if (left < 8 || (left + width > app.width)) {
        if (left < 8) left = targetOffsetLeft + targetWidth;
        if (left + width > app.width) left = app.width - width - 8;
      }
    }

    // Apply Styles
    $tooltipEl.css({ top: `${top}px`, left: `${left}px` });
  }
  show(aroundEl) {
    const tooltip = this;
    const { app, $tooltipEl, $el } = tooltip;
    app.root.append($tooltipEl);
    tooltip.position(aroundEl);
    const $aroundEl = $(aroundEl);
    tooltip.visible = true;
    tooltip.opened = true;
    $el.trigger('tooltip:show', tooltip);
    $tooltipEl.trigger('tooltip:show', tooltip);
    if ($aroundEl.length && $aroundEl[0] !== $el[0]) {
      $aroundEl.trigger('tooltip:show', tooltip);
    }
    tooltip.emit('local::show tooltipShow', tooltip);
    $tooltipEl.removeClass('tooltip-out').addClass('tooltip-in');
    return tooltip;
  }
  hide() {
    const tooltip = this;
    const { $tooltipEl, $el } = tooltip;
    tooltip.visible = false;
    tooltip.opened = false;
    $el.trigger('tooltip:hide', tooltip);
    $tooltipEl.trigger('tooltip:hide', tooltip);
    tooltip.emit('local::hide tooltipHide', tooltip);
    $tooltipEl.addClass('tooltip-out').removeClass('tooltip-in');
    return tooltip;
  }
  render() {
    const tooltip = this;
    if (tooltip.params.render) return tooltip.params.render.call(tooltip, tooltip);
    const { cssClass, text } = tooltip.params;
    return `
      <div class="tooltip ${cssClass || ''}">
        <div class="tooltip-content">${text || ''}</div>
      </div>
    `.trim();
  }
  setText(newText) {
    const tooltip = this;
    if (typeof newText === 'undefined') {
      return tooltip;
    }
    tooltip.params.text = newText;
    tooltip.text = newText;
    if (tooltip.$tooltipEl) {
      tooltip.$tooltipEl.children('.tooltip-content').html(newText);
    }
    if (tooltip.opened) {
      tooltip.position();
    }
    return tooltip;
  }
  init() {
    const tooltip = this;
    tooltip.attachEvents();
  }
  destroy() {
    const tooltip = this;
    if (!tooltip.$el || tooltip.destroyed) return;
    tooltip.$el.trigger('tooltip:beforedestroy', tooltip);
    tooltip.emit('local::beforeDestroy tooltipBeforeDestroy', tooltip);
    tooltip.$tooltipEl.remove();
    delete tooltip.$el[0].f7Tooltip;
    tooltip.detachEvents();
    Utils.deleteProps(tooltip);
    tooltip.destroyed = true;
  }
}
export default Tooltip;
