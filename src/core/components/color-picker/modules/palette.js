/* eslint indent: ["off"] */
import $ from 'dom7';

export default {
  render(self) {
    return `
      <div class="color-picker-module color-picker-module-palette">
        <div class="color-picker-palette">
          ${self.params.palette.map((p) => {
            if (Array.isArray(p)) {
              let row = '<div class="color-picker-palette-row">';
              row += p.map(c => `
                <div class="color-picker-palette-value" data-palette-color="${c}" style="background-color: ${c}"></div>
              `).join('');
              row += '</div>';
              return row;
            }
            return `
              <div class="color-picker-palette-value" data-palette-color="${p}" style="background-color: ${p}"></div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },
  init(self) {
    function handlePaletteClick(e) {
      const hex = $(e.target).attr('data-palette-color');
      self.setValue({
        hex,
      });
    }

    self.$el.on('click', '.color-picker-module-palette .color-picker-palette-value', handlePaletteClick);

    self.destroyPaletteEvents = function destroyPaletteEvents() {
      self.$el.off('click', '.color-picker-module-hex input', handlePaletteClick);
    };
  },
  destroy(self) {
    if (self.destroyPaletteEvents) {
      self.destroyPaletteEvents();
    }
    delete self.destroyPaletteEvents;
  },
};
