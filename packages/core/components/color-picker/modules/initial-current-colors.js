export default {
  render() {
    return `
      <div class="color-picker-module color-picker-module-initial-current-colors">
        <div class="color-picker-initial-current-colors">
          <div class="color-picker-initial-color"></div>
          <div class="color-picker-current-color"></div>
        </div>
      </div>
    `;
  },
  init(self) {
    function handleInitialColorClick() {
      if (self.initialValue) {
        const { hex, alpha } = self.initialValue;
        self.setValue({
          hex,
          alpha,
        });
      }
    }
    self.$el.on('click', '.color-picker-initial-color', handleInitialColorClick);
    self.destroyInitialCurrentEvents = function destroyInitialCurrentEvents() {
      self.$el.off('click', '.color-picker-initial-color', handleInitialColorClick);
    };
  },
  update(self) {
    self.$el.find('.color-picker-module-initial-current-colors .color-picker-initial-color').css(
      'background-color',
      self.initialValue.hex,
    );
    self.$el.find('.color-picker-module-initial-current-colors .color-picker-current-color').css(
      'background-color',
      self.value.hex,
    );
  },
  destroy(self) {
    if (self.destroyInitialCurrentEvents) {
      self.destroyInitialCurrentEvents();
    }
    delete self.destroyInitialCurrentEvents;
  },
};
