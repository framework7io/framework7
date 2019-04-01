export default {
  render() {
    return `
      <div class="color-picker-module color-picker-module-hue-slider">
        <div class="color-picker-slider-wrap">
          <div class="color-picker-slider-label">H</div>
          <div class="range-slider color-picker-slider color-picker-slider-hue"></div>
          <div class="color-picker-slider-value">
            <input type="number" step="0.1" min="0" max="360" class="color-picker-value-hue">
          </div>
        </div>
      </div>
    `;
  },
  init(self) {
    self.hueRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-hue'),
      min: 0,
      max: 360,
      step: 0.1,
      value: 0,
      on: {
        change(range, value) {
          self.setValue({ hue: value });
        },
      },
    });
  },
  update(self) {
    const {
      value,
    } = self;

    const { hue } = value;

    self.hueRangeSlider.value = hue;
    self.hueRangeSlider.layout();
    self.hueRangeSlider.$el[0].style.setProperty(
      '--f7-range-knob-color',
      `hsl(${hue}, 100%, 50%)`
    );

    self.$el.find('input.color-picker-value-hue').val(`${hue}`);
  },
  destroy(self) {
    if (self.hueRangeSlider && self.hueRangeSlider.destroy) {
      self.hueRangeSlider.destroy();
    }
    delete self.hueRangeSlider;
  },
};
