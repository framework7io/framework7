import $ from 'dom7';
import Utils from '../../../utils/utils';

export default {
  render(self) {
    const { sliderLabel, sliderValue, sliderValueEditable, hueLabelText, saturationLabelText, brightnessLabelText } = self.params;
    return `
      <div class="color-picker-module color-picker-module-hsb-sliders">
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${hueLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-hue"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="0.1" min="0" max="360" class="color-picker-value-hue" data-color-index="0">
              ` : `
                <span class="color-picker-value-hue"></span>
              `}
            </div>
          ` : ''}
        </div>
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${saturationLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-saturation"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="0.1" min="0" max="100" class="color-picker-value-saturation" data-color-index="1">
              ` : `
                <span class="color-picker-value-saturation"></span>
              `}
            </div>
          ` : ''}
        </div>
        <div class="color-picker-slider-wrap">
          ${sliderLabel ? `
            <div class="color-picker-slider-label">${brightnessLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-slider color-picker-slider-brightness"></div>
          ${sliderValue ? `
            <div class="color-picker-slider-value">
              ${sliderValueEditable ? `
                <input type="number" step="0.1" min="0" max="100" class="color-picker-value-brightness" data-color-index="2">
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
    self.saturationRangeSlider = self.app.range.create({
      el: self.$el.find('.color-picker-slider-saturation'),
      min: 0,
      max: 1,
      step: 0.001,
      value: 0,
      on: {
        change(range, value) {
          const s = Math.floor(value * 1000) / 1000;
          self.setValue({ hsb: [self.value.hsb[0], s, self.value.hsb[2]] });
        },
      },
    });
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

    function handleInputChange(e) {
      const hsb = [...self.value.hsb];
      const index = parseInt($(e.target).attr('data-color-index'), 10);
      let value = parseFloat(e.target.value);
      if (Number.isNaN(value)) {
        e.target.value = hsb[index];
        return;
      }
      if (index === 0) {
        value = Math.max(0, Math.min(360, value));
      } else {
        value = Math.max(0, Math.min(100, value)) / 100;
      }

      hsb[index] = value;
      self.setValue({ hsb });
    }

    self.$el.on('change', '.color-picker-module-hsb-sliders input', handleInputChange);

    self.destroyHsbSlidersEvents = function destroyHsbSlidersEvents() {
      self.$el.off('change', '.color-picker-module-hsb-sliders input', handleInputChange);
    };
  },
  update(self) {
    const {
      app,
      value,
    } = self;
    const { sliderValue, sliderValueEditable } = self.params;

    const { hsb, hue } = value;

    self.hueRangeSlider.value = hue;
    self.saturationRangeSlider.value = hsb[1];
    self.brightnessRangeSlider.value = hsb[2];

    self.hueRangeSlider.layout();
    self.saturationRangeSlider.layout();
    self.brightnessRangeSlider.layout();

    const hslCurrent = Utils.colorHsbToHsl(hsb[0], hsb[1], 1);
    const hslLeft = Utils.colorHsbToHsl(hsb[0], 0, 1);
    const hslRight = Utils.colorHsbToHsl(hsb[0], 1, 1);
    const brightness = hsb[2];

    self.hueRangeSlider.$el[0].style.setProperty(
      '--f7-range-knob-color',
      `hsl(${hue}, 100%, 50%)`
    );
    self.saturationRangeSlider.$el[0].style.setProperty(
      '--f7-range-knob-color',
      `hsl(${hslCurrent[0]}, ${hslCurrent[1] * 100}%, ${hslCurrent[2] * 100}%)`
    );
    self.brightnessRangeSlider.$el[0].style.setProperty(
      '--f7-range-knob-color',
      `rgb(${brightness * 255}, ${brightness * 255}, ${brightness * 255})`
    );
    self.saturationRangeSlider.$el.find('.range-bar').css(
      'background-image',
      `linear-gradient(${app.rtl ? 'to left' : 'to right'}, hsl(${hslLeft[0]}, ${hslLeft[1] * 100}%, ${hslLeft[2] * 100}%), hsl(${hslRight[0]}, ${hslRight[1] * 100}%, ${hslRight[2] * 100}%))`
    );

    if (sliderValue && sliderValueEditable) {
      self.$el.find('input.color-picker-value-hue').val(`${hue}`);
      self.$el.find('input.color-picker-value-saturation').val(`${hsb[1] * 1000 / 10}`);
      self.$el.find('input.color-picker-value-brightness').val(`${hsb[2] * 1000 / 10}`);
    } else if (sliderValue) {
      self.$el.find('span.color-picker-value-hue').text(`${hue}`);
      self.$el.find('span.color-picker-value-saturation').text(`${hsb[1] * 1000 / 10}`);
      self.$el.find('span.color-picker-value-brightness').text(`${hsb[2] * 1000 / 10}`);
    }
  },
  destroy(self) {
    if (self.hueRangeSlider && self.hueRangeSlider.destroy) {
      self.hueRangeSlider.destroy();
    }
    if (self.saturationRangeSlider && self.saturationRangeSlider.destroy) {
      self.saturationRangeSlider.destroy();
    }
    if (self.brightnessRangeSlider && self.brightnessRangeSlider.destroy) {
      self.brightnessRangeSlider.destroy();
    }

    delete self.hueRangeSlider;
    delete self.saturationRangeSlider;
    delete self.brightnessRangeSlider;

    if (self.destroyHsbSlidersEvents) self.destroyHsbSlidersEvents();
    delete self.destroyHsbSlidersEvents;
  },
};
