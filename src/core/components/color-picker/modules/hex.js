export default {
  render() {
    return `
      <div class="color-picker-module color-picker-module-hex">
        <div class="color-picker-hex-wrap">
          <div class="color-picker-hex-label">HEX</div>
          <div class="color-picker-hex-value">
            <input type="text" class="color-picker-value-hex">
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

    const { hex } = value;
    self.$el.find('input.color-picker-value-hex').val(hex);
  },
  destroy(self) {
    if (self.destroyHexEvents) self.destroyHexEvents();
    delete self.destroyHexEvents;
  },
};
