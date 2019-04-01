import $ from 'dom7';

export default {
  render() {
    return `
      <div class="color-picker-module color-picker-module-rgb-sliders">
        <div class="color-picker-slider-wrap">
          <div class="color-picker-slider-label">R</div>
          <div class="range-slider color-picker-slider color-picker-slider-red"></div>
          <div class="color-picker-slider-value">
            <input type="number" step="1" min="0" max="255" class="color-picker-value-red" data-color-index="0">
          </div>
        </div>
        <div class="color-picker-slider-wrap">
          <div class="color-picker-slider-label">G</div>
          <div class="range-slider color-picker-slider color-picker-slider-green"></div>
          <div class="color-picker-slider-value">
            <input type="number" step="1" min="0" max="255" class="color-picker-value-green" data-color-index="1">
          </div>
        </div>
        <div class="color-picker-slider-wrap">
          <div class="color-picker-slider-label">B</div>
          <div class="range-slider color-picker-slider color-picker-slider-blue"></div>
          <div class="color-picker-slider-value">
            <input type="number" step="1" min="0" max="255" class="color-picker-value-blue" data-color-index="2">
          </div>
        </div>
      </div>
    `;
  },
  init(self) {
    self.redRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-red'),
      min: 0,
      max: 255,
      step: 1,
      value: 0,
      on: {
        change(range, value) {
          self.setValue({ rgb: [value, self.value.rgb[1], self.value.rgb[2]] });
        },
      },
    });
    self.greenRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-green'),
      min: 0,
      max: 255,
      step: 1,
      value: 0,
      on: {
        change(range, value) {
          self.setValue({ rgb: [self.value.rgb[0], value, self.value.rgb[2]] });
        },
      },
    });
    self.blueRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-blue'),
      min: 0,
      max: 255,
      step: 1,
      value: 0,
      on: {
        change(range, value) {
          self.setValue({ rgb: [self.value.rgb[0], self.value.rgb[1], value] });
        },
      },
    });

    function handleInputChange(e) {
      const rgb = [...self.value.rgb];
      const index = parseInt($(e.target).attr('data-color-index'), 10);
      let value = parseInt(e.target.value, 10);
      if (Number.isNaN(value)) {
        e.target.value = rgb[index];
        return;
      }
      value = Math.max(0, Math.min(255, value));
      rgb[index] = value;
      self.setValue({ rgb });
    }

    self.$el.on('change', '.color-picker-module-rgb-sliders input', handleInputChange);

    self.destroyRgbSlidersEvents = function destroyRgbSlidersEvents() {
      self.$el.off('change', '.color-picker-module-rgb-sliders input', handleInputChange);
    };
  },
  update(self) {
    const {
      value,
      redRangeSlider,
      greenRangeSlider,
      blueRangeSlider,
    } = self;

    const { rgb } = value;

    redRangeSlider.value = rgb[0];
    greenRangeSlider.value = rgb[1];
    blueRangeSlider.value = rgb[2];

    redRangeSlider.layout();
    greenRangeSlider.layout();
    blueRangeSlider.layout();

    redRangeSlider.$el[0].style.setProperty('--f7-range-knob-color', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    greenRangeSlider.$el[0].style.setProperty('--f7-range-knob-color', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);
    blueRangeSlider.$el[0].style.setProperty('--f7-range-knob-color', `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`);

    redRangeSlider.$el.find('.range-bar').css('background-image', `linear-gradient(to right, rgb(0, ${rgb[1]}, ${rgb[2]}), rgb(255, ${rgb[1]}, ${rgb[2]}))`);
    greenRangeSlider.$el.find('.range-bar').css('background-image', `linear-gradient(to right, rgb(${rgb[0]}, 0, ${rgb[2]}), rgb(${rgb[0]}, 255, ${rgb[2]}))`);
    blueRangeSlider.$el.find('.range-bar').css('background-image', `linear-gradient(to right, rgb(${rgb[0]}, ${rgb[1]}, 0), rgb(${rgb[0]}, ${rgb[1]}, 255))`);

    self.$el.find('input.color-picker-value-red').val(rgb[0]);
    self.$el.find('input.color-picker-value-green').val(rgb[1]);
    self.$el.find('input.color-picker-value-blue').val(rgb[2]);
  },
  destroy(self) {
    if (self.redRangeSlider && self.redRangeSlider.destroy) {
      self.redRangeSlider.destroy();
    }
    if (self.greenRangeSlider && self.greenRangeSlider.destroy) {
      self.greenRangeSlider.destroy();
    }
    if (self.blueRangeSlider && self.blueRangeSlider.destroy) {
      self.blueRangeSlider.destroy();
    }

    delete self.redRangeSlider;
    delete self.greenRangeSlider;
    delete self.blueRangeSlider;

    if (self.destroyRgbSlidersEvents) self.destroyRgbSlidersEvents();
    delete self.destroyRgbSlidersEvents;
  },
};
