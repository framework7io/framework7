export default {
  render() {
    return `
      <div class="color-picker-module color-picker-module-current-color">
        <div class="color-picker-current-color"></div>
      </div>
    `;
  },
  update(self) {
    self.$el.find('.color-picker-module-current-color .color-picker-current-color').css(
      'background-color',
      self.value.hex,
    );
  },
};
