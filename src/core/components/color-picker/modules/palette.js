export default {
  render(self) {
    return `
      <div class="color-picker-module color-picker-module-palette">
        <div class="color-picker-palette">
          ${self.params.palette.map(p => `
          <div class="color-picker-palette-value" style="background-color: ${p}"></div>
          `).join('')}
        </div>
      </div>
    `;
  },
  init() {

  },
};
