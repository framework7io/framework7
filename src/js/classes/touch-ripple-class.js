import $ from 'dom7';

export default class TouchRipple {
  constructor($el, x, y) {
    const ripple = this;
    if (!$el) return;
    const box = $el[0].getBoundingClientRect();
    const center = {
      x: x - box.left,
      y: y - box.top,
    };
    const width = box.width;
    const height = box.height;
    const diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);

    const $rippleWaveEl = $(`<div class="ripple-wave" style="width: ${diameter}px; height: ${diameter}px; margin-top:-${diameter / 2}px; margin-left:-${diameter / 2}px; left:${center.x}px; top:${center.y}px;"></div>`);
    $el.prepend($rippleWaveEl);

    const clientLeft = $rippleWaveEl[0].clientLeft;

    const rippleTransform = `translate3d(${-center.x + (width / 2)}px, ${-center.y + (height / 2)}px, 0) scale(1)`;
    $rippleWaveEl.transform(rippleTransform);

    ripple.remove = function remove() {
      let removeTimeout = setTimeout(() => {
        $rippleWaveEl.remove();
      }, 400);

      $rippleWaveEl
        .addClass('ripple-wave-fill')
        .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
        .transitionEnd(() => {
          clearTimeout(removeTimeout);

          $rippleWaveEl
            .addClass('ripple-wave-out')
            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));

          removeTimeout = setTimeout(() => {
            $rippleWaveEl.remove();
          }, 700);

          setTimeout(() => {
            $rippleWaveEl.transitionEnd(() => {
              clearTimeout(removeTimeout);
              $rippleWaveEl.remove();
            });
          }, 0);
        });
    };
    return ripple;
  }
}
