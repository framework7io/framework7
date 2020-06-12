import $ from 'dom7';

export default {
  render(self) {
    const { barLabel, barValue, barValueEditable, redLabelText, greenLabelText, blueLabelText } = self.params;
    return `
      <div class="color-picker-module color-picker-module-rgb-bars">
        <div class="color-picker-bar-wrap">
          ${barLabel ? `
            <div class="color-picker-bar-label">${redLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-bar color-picker-bar-red"></div>
          ${barValue ? `
            <div class="color-picker-bar-value">
              ${barValueEditable ? `
                <input type="number" step="1" min="0" max="255" class="color-picker-value-bar-red" data-color-index="0">
              ` : `
                <span class="color-picker-value-bar-red"></span>
              `}
            </div>
          ` : ''}
        </div>
        <div class="color-picker-bar-wrap">
          ${barLabel ? `
            <div class="color-picker-bar-label">${greenLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-bar color-picker-bar-green"></div>
          ${barValue ? `
            <div class="color-picker-bar-value">
              ${barValueEditable ? `
                <input type="number" step="1" min="0" max="255" class="color-picker-value-bar-green" data-color-index="1">
              ` : `
                <span class="color-picker-value-bar-green"></span>
              `}
            </div>
          ` : ''}
        </div>
        <div class="color-picker-bar-wrap">
          ${barLabel ? `
            <div class="color-picker-bar-label">${blueLabelText}</div>
          ` : ''}
          <div class="range-slider color-picker-bar color-picker-bar-blue"></div>
          ${barValue ? `
            <div class="color-picker-bar-value">
              ${barValueEditable ? `
                <input type="number" step="1" min="0" max="255" class="color-picker-value-bar-blue" data-color-index="2">
              ` : `
                <span class="color-picker-value-bar-blue"></span>
              `}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  },
  init(self) {
    self.redBar = self.app.range.create({
      el: self.$el.find('.color-picker-bar-red'),
      min: 0,
      max: 255,
      step: 1,
      value: 0,
      vertical: true,
      on: {
        change(range, value) {
          self.setValue({ rgb: [value, self.value.rgb[1], self.value.rgb[2]] });
        },
      },
    });
    self.greenBar = self.app.range.create({
      el: self.$el.find('.color-picker-bar-green'),
      min: 0,
      max: 255,
      step: 1,
      value: 0,
      vertical: true,
      on: {
        change(range, value) {
          self.setValue({ rgb: [self.value.rgb[0], value, self.value.rgb[2]] });
        },
      },
    });
    self.blueBar = self.app.range.create({
      el: self.$el.find('.color-picker-bar-blue'),
      min: 0,
      max: 255,
      step: 1,
      value: 0,
      vertical: true,
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

    self.$el.on('change', '.color-picker-module-rgb-bars input', handleInputChange);

    self.destroyRgbBarsEvents = function destroyRgbBarsEvents() {
      self.$el.off('change', '.color-picker-module-rgb-bars input', handleInputChange);
    };
  },
  update(self) {
    const {
      value,
      redBar,
      greenBar,
      blueBar,
    } = self;

    const { barValue, barValueEditable } = self.params;

    const { rgb } = value;

    redBar.value = rgb[0];
    greenBar.value = rgb[1];
    blueBar.value = rgb[2];

    redBar.layout();
    greenBar.layout();
    blueBar.layout();

    redBar.$el.find('.range-bar').css('background-image', `linear-gradient(to top, rgb(0, ${rgb[1]}, ${rgb[2]}), rgb(255, ${rgb[1]}, ${rgb[2]}))`);
    greenBar.$el.find('.range-bar').css('background-image', `linear-gradient(to top, rgb(${rgb[0]}, 0, ${rgb[2]}), rgb(${rgb[0]}, 255, ${rgb[2]}))`);
    blueBar.$el.find('.range-bar').css('background-image', `linear-gradient(to top, rgb(${rgb[0]}, ${rgb[1]}, 0), rgb(${rgb[0]}, ${rgb[1]}, 255))`);

    if (barValue && barValueEditable) {
      self.$el.find('input.color-picker-value-bar-red').val(rgb[0]);
      self.$el.find('input.color-picker-value-bar-green').val(rgb[1]);
      self.$el.find('input.color-picker-value-bar-blue').val(rgb[2]);
    } else if (barValue) {
      self.$el.find('span.color-picker-value-bar-red').text(rgb[0]);
      self.$el.find('span.color-picker-value-bar-green').text(rgb[1]);
      self.$el.find('span.color-picker-value-bar-blue').text(rgb[2]);
    }
  },
  destroy(self) {
    if (self.redBar && self.redBar.destroy) {
      self.redBar.destroy();
    }
    if (self.greenBar && self.greenBar.destroy) {
      self.greenBar.destroy();
    }
    if (self.blueBar && self.blueBar.destroy) {
      self.blueBar.destroy();
    }

    delete self.redBar;
    delete self.greenBar;
    delete self.blueBar;

    if (self.destroyRgbBarsEvents) self.destroyRgbBarsEvents();
    delete self.destroyRgbBarsEvents;
  },
};
