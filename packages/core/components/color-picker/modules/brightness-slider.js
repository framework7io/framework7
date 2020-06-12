import Utils from '../../../utils/utils';

export default {
  render(self) {
    const { sliderLabel, sliderValue, sliderValueEditable, brightnessLabelText } = self.params;
    return `
      <div class="color-picker-module color-picker-module-brightness-slider">
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${brightnessLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-brightness"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="0.1" min="0" max="100" class="color-picker-value-brightness">
              ` : `
                <span class="color-picker-value-brightness"></span>
              `}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },
  init(self) {
    self.brightnessRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-brightness'),
      min: 0,
      max: 1,
      step: 0.001,
      value: 0,
      on: {
        change(range, value) {
          const b = Math.floor(value * 1000) / 1000;
          self.setValue({ hsb: [self.value.hsb[0], self.value.hsb[1], b] });
        },
      },
    });
  },
  update(self) {
    const {
      value,
      app,
    } = self;
    const { sliderValue, sliderValueEditable } = self.params;

    const { hsb } = value;

    self.brightnessRangeSlider.value = hsb[2];
    self.brightnessRangeSlider.layout();

    const hslCurrent = Utils.colorHsbToHsl(hsb[0], hsb[1], hsb[2]);
    const hslLeft = Utils.colorHsbToHsl(hsb[0], hsb[1], 0);
    const hslRight = Utils.colorHsbToHsl(hsb[0], hsb[1], 1);

    self.brightnessRangeSlider.$el[0].style.setProperty(
      '--f7-range-knob-color',
      `hsl(${hslCurrent[0]}, ${hslCurrent[1] * 100}%, ${hslCurrent[2] * 100}%)`
    );
    self.brightnessRangeSlider.$el.find('.range-bar').css(
      'background-image',
      `linear-gradient(${app.rtl ? 'to left' : 'to right'}, hsl(${hslLeft[0]}, ${hslLeft[1] * 100}%, ${hslLeft[2] * 100}%), hsl(${hslRight[0]}, ${hslRight[1] * 100}%, ${hslRight[2] * 100}%))`
    );
    if (sliderValue && sliderValueEditable) {
      self.$el.find('input.color-picker-value-brightness').val(`${hsb[2] * 1000 / 10}`);
    } else if (sliderValue) {
      self.$el.find('span.color-picker-value-brightness').text(`${hsb[2] * 1000 / 10}`);
    }
  },
  destroy(self) {
    if (self.brightnessRangeSlider && self.brightnessRangeSlider.destroy) {
      self.brightnessRangeSlider.destroy();
    }
    delete self.brightnessRangeSlider;
  },
};
