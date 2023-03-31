import $ from '../../shared/dom7.js';

export default class TouchRipple {
  constructor(app, $el, x, y) {
    const ripple = this;

    if (!$el) return undefined;

    const { left, top, width, height } = $el[0].getBoundingClientRect();
    const center = {
      x: x - left,
      y: y - top,
    };
    let diameter = Math.max((height ** 2 + width ** 2) ** 0.5, 48);

    let isInset = false;
    const insetElements = app.params.touch.touchRippleInsetElements || '';
    if (insetElements && $el.is(insetElements)) {
      isInset = true;
    }
    if (isInset) {
      diameter = Math.max(Math.min(width, height), 48);
    }

    if (!isInset && $el.css('overflow') === 'hidden') {
      const distanceFromCenter =
        ((center.x - width / 2) ** 2 + (center.y - height / 2) ** 2) ** 0.5;
      const scale = (diameter / 2 + distanceFromCenter) / (diameter / 2);
      ripple.rippleTransform = `translate3d(0px, 0px, 0) scale(${scale * 2})`;
    } else {
      // prettier-ignore
      ripple.rippleTransform = `translate3d(${-center.x + width / 2}px, ${-center.y + height / 2}px, 0) scale(1)`;
    }
    if (isInset) {
      $el.addClass('ripple-inset');
    }

    ripple.$rippleWaveEl = $(
      `<div class="ripple-wave${
        isInset ? ' ripple-wave-inset' : ''
      }" style="width: ${diameter}px; height: ${diameter}px; margin-top:-${
        diameter / 2
      }px; margin-left:-${diameter / 2}px; left:${center.x}px; top:${
        center.y
      }px; --f7-ripple-transform: ${ripple.rippleTransform}"></div>`,
    );

    $el.prepend(ripple.$rippleWaveEl);

    ripple.$rippleWaveEl.animationEnd(() => {
      if (!ripple.$rippleWaveEl) return;
      if (ripple.$rippleWaveEl.hasClass('ripple-wave-out')) return;
      ripple.$rippleWaveEl.addClass('ripple-wave-in');
      if (ripple.shouldBeRemoved) {
        ripple.out();
      }
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

  out() {
    const ripple = this;
    const { $rippleWaveEl } = this;
    clearTimeout(ripple.removeTimeout);
    $rippleWaveEl.addClass('ripple-wave-out');

    ripple.removeTimeout = setTimeout(() => {
      ripple.destroy();
    }, 300);

    $rippleWaveEl.animationEnd(() => {
      clearTimeout(ripple.removeTimeout);
      ripple.destroy();
    });
  }

  remove() {
    const ripple = this;
    if (ripple.shouldBeRemoved) return;
    ripple.removeTimeout = setTimeout(() => {
      ripple.destroy();
    }, 400);
    ripple.shouldBeRemoved = true;
    if (ripple.$rippleWaveEl.hasClass('ripple-wave-in')) {
      ripple.out();
    }
  }
}
