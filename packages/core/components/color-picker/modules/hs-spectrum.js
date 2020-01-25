import $ from 'dom7';
import Utils from '../../../utils/utils';

export default {
  render() {
    return `
      <div class="color-picker-module color-picker-module-hs-spectrum">
        <div class="color-picker-hs-spectrum">
          <div class="color-picker-hs-spectrum-handle"></div>
        </div>
      </div>
    `;
  },
  init(self) {
    const { app } = self;

    let isTouched;
    let isMoved;
    let touchStartX;
    let touchStartY;
    let touchCurrentX;
    let touchCurrentY;

    let specterRect;
    let specterIsTouched;
    let specterHandleIsTouched;

    const { $el } = self;

    function setHSFromSpecterCoords(x, y) {
      let h = (x - specterRect.left) / specterRect.width * 360;
      let s = (y - specterRect.top) / specterRect.height;
      h = Math.max(0, Math.min(360, h));
      s = 1 - Math.max(0, Math.min(1, s));

      self.setValue({ hsb: [h, s, self.value.hsb[2]] });
    }

    function handleTouchStart(e) {
      if (isMoved || isTouched) return;
      touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      touchCurrentX = touchStartX;
      touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
      touchCurrentY = touchStartY;
      const $targetEl = $(e.target);
      specterHandleIsTouched = $targetEl.closest('.color-picker-hs-spectrum-handle').length > 0;
      if (!specterHandleIsTouched) {
        specterIsTouched = $targetEl.closest('.color-picker-hs-spectrum').length > 0;
      }
      if (specterIsTouched) {
        specterRect = $el.find('.color-picker-hs-spectrum')[0].getBoundingClientRect();
        setHSFromSpecterCoords(touchStartX, touchStartY);
      }
      if (specterHandleIsTouched || specterIsTouched) {
        $el.find('.color-picker-hs-spectrum-handle').addClass('color-picker-hs-spectrum-handle-pressed');
      }
    }
    function handleTouchMove(e) {
      if (!(specterIsTouched || specterHandleIsTouched)) return;
      touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
      e.preventDefault();
      if (!isMoved) {
        // First move
        isMoved = true;
        if (specterHandleIsTouched) {
          specterRect = $el.find('.color-picker-hs-spectrum')[0].getBoundingClientRect();
        }
      }
      if (specterIsTouched || specterHandleIsTouched) {
        setHSFromSpecterCoords(touchCurrentX, touchCurrentY);
      }
    }
    function handleTouchEnd() {
      isMoved = false;
      if (specterIsTouched || specterHandleIsTouched) {
        $el.find('.color-picker-hs-spectrum-handle').removeClass('color-picker-hs-spectrum-handle-pressed');
      }
      specterIsTouched = false;
      specterHandleIsTouched = false;
    }

    function handleResize() {
      self.modules['hs-spectrum'].update(self);
    }

    const passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;

    self.$el.on(app.touchEvents.start, handleTouchStart, passiveListener);
    app.on('touchmove:active', handleTouchMove);
    app.on('touchend:passive', handleTouchEnd);
    app.on('resize', handleResize);

    self.destroySpectrumEvents = function destroySpectrumEvents() {
      self.$el.off(app.touchEvents.start, handleTouchStart, passiveListener);
      app.off('touchmove:active', handleTouchMove);
      app.off('touchend:passive', handleTouchEnd);
      app.off('resize', handleResize);
    };
  },
  update(self) {
    const {
      value,
    } = self;

    const { hsb } = value;

    const specterWidth = self.$el.find('.color-picker-hs-spectrum')[0].offsetWidth;
    const specterHeight = self.$el.find('.color-picker-hs-spectrum')[0].offsetHeight;

    const hslBright = Utils.colorHsbToHsl(hsb[0], hsb[1], 1);

    self.$el.find('.color-picker-hs-spectrum-handle')
      .css('background-color', `hsl(${hslBright[0]}, ${hslBright[1] * 100}%, ${hslBright[2] * 100}%)`)
      .transform(`translate(${specterWidth * (hsb[0] / 360)}px, ${specterHeight * (1 - hsb[1])}px)`);
  },
  destroy(self) {
    if (self.destroySpectrumEvents) self.destroySpectrumEvents();
    delete self.destroySpectrumEvents;
  },
};
