import $ from 'dom7';

export default {
  render(self) {
    const { sliderLabel, sliderValue, sliderValueEditable, redLabelText, greenLabelText, blueLabelText } = self.params;
    return `
      <div class="color-picker-module color-picker-module-rgb-sliders">
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${redLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-red"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="1" min="0" max="255" class="color-picker-value-red" data-color-index="0">
              ` : `
                <span class="color-picker-value-red"></span>
              `}
            </div>
          ` : ''}
        </div>
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${greenLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-green"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="1" min="0" max="255" class="color-picker-value-green" data-color-index="1">
              ` : `
                <span class="color-picker-value-green"></span>
              `}
            </div>
          ` : ''}
        </div>
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${blueLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-blue"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="1" min="0" max="255" class="color-picker-value-blue" data-color-index="2">
              ` : `
                <span class="color-picker-value-blue"></span>
              `}
            </div>
          ` : ''}
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
      app,
      value,
      redRangeSlider,
      greenRangeSlider,
      blueRangeSlider,
    } = self;

    const { sliderValue, sliderValueEditable } = self.params;

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

    const direction = app.rtl ? 'to left' : 'to right';

    redRangeSlider.$el.find('.range-bar').css('background-image', `linear-gradient(${direction}, rgb(0, ${rgb[1]}, ${rgb[2]}), rgb(255, ${rgb[1]}, ${rgb[2]}))`);
    greenRangeSlider.$el.find('.range-bar').css('background-image', `linear-gradient(${direction}, rgb(${rgb[0]}, 0, ${rgb[2]}), rgb(${rgb[0]}, 255, ${rgb[2]}))`);
    blueRangeSlider.$el.find('.range-bar').css('background-image', `linear-gradient(${direction}, rgb(${rgb[0]}, ${rgb[1]}, 0), rgb(${rgb[0]}, ${rgb[1]}, 255))`);

    if (sliderValue && sliderValueEditable) {
      self.$el.find('input.color-picker-value-red').val(rgb[0]);
      self.$el.find('input.color-picker-value-green').val(rgb[1]);
      self.$el.find('input.color-picker-value-blue').val(rgb[2]);
    } else if (sliderValue) {
      self.$el.find('span.color-picker-value-red').text(rgb[0]);
      self.$el.find('span.color-picker-value-green').text(rgb[1]);
      self.$el.find('span.color-picker-value-blue').text(rgb[2]);
    }
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
