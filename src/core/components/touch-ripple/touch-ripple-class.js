import $ from '../../shared/dom7';
import { nextTick, nextFrame } from '../../shared/utils';

export default class TouchRipple {
  constructor($el, x, y) {
    const ripple = this;

    if (!$el) return undefined;

    const { left, top, width, height } = $el[0].getBoundingClientRect();
    const center = {
      x: x - left,
      y: y - top,
    };
    let diameter = Math.max((height ** 2 + width ** 2) ** 0.5, 48);
    if (width === height) diameter = Math.max(width, 48);

    if (width !== height && $el.css('overflow') === 'hidden') {
      const distanceFromCenter =
        ((center.x - width / 2) ** 2 + (center.y - height / 2) ** 2) ** 0.5;
      const scale = (diameter / 2 + distanceFromCenter) / (diameter / 2);
      ripple.rippleTransform = `translate3d(0px, 0px, 0) scale(${scale})`;
    } else {
      // prettier-ignore
      ripple.rippleTransform = `translate3d(${-center.x + width / 2}px, ${-center.y + height / 2}px, 0) scale(1)`;
    }

    ripple.$rippleWaveEl = $(
      `<div class="ripple-wave" style="width: ${diameter}px; height: ${diameter}px; margin-top:-${
        diameter / 2
      }px; margin-left:-${diameter / 2}px; left:${center.x}px; top:${center.y}px;"></div>`,
    );

    $el.prepend(ripple.$rippleWaveEl);

    nextFrame(() => {
      if (!ripple || !ripple.$rippleWaveEl) return;
      ripple.$rippleWaveEl.transform(ripple.rippleTransform);
      ripple.$rippleWaveEl.transitionEnd(() => {
        if (!ripple.$rippleWaveEl) return;
        if (
          ripple.$rippleWaveEl.hasClass('ripple-wave-out') ||
          ripple.$rippleWaveEl.hasClass('ripple-wave-fill')
        )
          return;
        ripple.$rippleWaveEl.addClass('ripple-wave-in');
      });
    });

    return ripple;
  }

  destroy() {
    let ripple = this;
    if (ripple.$rippleWaveEl) {
      ripple.$rippleWaveEl.remove();
    }
    Object.keys(ripple).forEach((key) => {
      ripple[key] = null;
      delete ripple[key];
    });
    ripple = null;
  }

  remove() {
    const ripple = this;
    if (ripple.removing) return;
    const $rippleWaveEl = this.$rippleWaveEl;
    const rippleTransform = this.rippleTransform;
    let removeTimeout = nextTick(() => {
      ripple.destroy();
    }, 400);
    ripple.removing = true;
    if ($rippleWaveEl.hasClass('ripple-wave-in')) {
      clearTimeout(removeTimeout);
      $rippleWaveEl
        .addClass('ripple-wave-out')
        .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

      removeTimeout = nextTick(() => {
        ripple.destroy();
      }, 300);

      $rippleWaveEl.transitionEnd(() => {
        clearTimeout(removeTimeout);
        ripple.destroy();
      });
      return;
    }
    $rippleWaveEl
      .addClass('ripple-wave-fill')
      .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
      .transitionEnd(() => {
        clearTimeout(removeTimeout);
        nextFrame(() => {
          $rippleWaveEl
            .addClass('ripple-wave-out')
            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

          removeTimeout = nextTick(() => {
            ripple.destroy();
          }, 300);

          $rippleWaveEl.transitionEnd(() => {
            clearTimeout(removeTimeout);
            ripple.destroy();
          });
        });
      });
  }
}
