export default {
  render(self) {
    const { hexLabel, hexLabelText, hexValueEditable } = self.params;
    return `
      <div class="color-picker-module color-picker-module-hex">
        <div class="color-picker-hex-wrap">
          ${hexLabel ? `
            <div class="color-picker-hex-label">${hexLabelText}</div>
          ` : ''}
          <div class="color-picker-hex-value">
            ${hexValueEditable ? `
              <input type="text" class="color-picker-value-hex">
            ` : `
              <span class="color-picker-value-hex"></span>
            `}
          </div>
        </div>
      </div>
    `;
  },
  init(self) {
    function handleInputChange(e) {
      const hex = self.value.hex;
      let value = e.target.value.replace(/#/g, '');
      if (Number.isNaN(value) || !value || (value.length !== 3 && value.length !== 6)) {
        e.target.value = hex;
        return;
      }
      const min = 0;
      const current = parseInt(value, 16);
      const max = parseInt('ffffff', 16); // eslint-disable-line
      if (current > max) {
        value = 'fff';
      }
      if (current < min) {
        value = '000';
      }
      self.setValue({ hex: value });
    }

    self.$el.on('change', '.color-picker-module-hex input', handleInputChange);

    self.destroyHexEvents = function destroyHexEvents() {
      self.$el.off('change', '.color-picker-module-hex input', handleInputChange);
    };
  },
  update(self) {
    const {
      value,
    } = self;

    const { hexValueEditable } = self.params;

    const { hex } = value;
    if (hexValueEditable) {
      self.$el.find('input.color-picker-value-hex').val(hex);
    } else {
      self.$el.find('span.color-picker-value-hex').text(hex);
    }
  },
  destroy(self) {
    if (self.destroyHexEvents) self.destroyHexEvents();
    delete self.destroyHexEvents;
  },
};
