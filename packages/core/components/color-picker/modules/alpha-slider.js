export default {
  render(self) {
    const { sliderLabel, sliderValue, sliderValueEditable, alphaLabelText } = self.params;
    return `
      <div class="color-picker-module color-picker-module-alpha-slider">
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${alphaLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-alpha"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="0.01" min="0" max="1" class="color-picker-value-alpha">
              ` : `
                <span class="color-picker-value-alpha"></span>
              `}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },
  init(self) {
    self.alphaRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-alpha'),
      min: 0,
      max: 1,
      step: 0.01,
      value: 1,
      on: {
        change(range, value) {
          const alpha = Math.floor(value * 100) / 100;
          self.setValue({ alpha });
        },
      },
    });
    function handleInputChange(e) {
      const alpha = self.value.alpha;
      let value = parseFloat(e.target.value);
      if (Number.isNaN(value)) {
        e.target.value = alpha;
        return;
      }
      value = Math.max(0, Math.min(1, value));
      self.setValue({ alpha: value });
    }

    self.$el.on('change', '.color-picker-module-alpha-slider input', handleInputChange);

    self.destroyAlphaSliderEvents = function destroyAlphaSliderEvents() {
      self.$el.off('change', '.color-picker-module-alpha-slider input', handleInputChange);
    };
  },
  update(self) {
    const {
      value,
    } = self;
    const { sliderValue, sliderValueEditable } = self.params;

    const { alpha } = value;
    self.alphaRangeSlider.value = alpha;
    self.alphaRangeSlider.layout();
    if (sliderValue && sliderValueEditable) {
      self.$el.find('input.color-picker-value-alpha').val(alpha);
    } else {
      self.$el.find('span.color-picker-value-alpha').text(alpha);
    }
  },
  destroy(self) {
    if (self.alphaRangeSlider && self.alphaRangeSlider.destroy) {
      self.alphaRangeSlider.destroy();
    }
    delete self.alphaRangeSlider;

    if (self.destroyAlphaSliderEvents) self.destroyAlphaSliderEvents();
    delete self.destroyAlphaSliderEvents;
  },
};
