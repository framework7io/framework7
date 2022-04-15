import { app, f7ready } from './f7.js';

export const useTooltip = (el, props) => {
  let f7Tooltip = null;
  const { tooltip, tooltipTrigger } = props;

  if (el && tooltip) {
    f7ready(() => {
      f7Tooltip = app.f7.tooltip.create({
        targetEl: el,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  }

  return {
    update({ tooltip: value } = {}) {
      if (!value && f7Tooltip) {
        f7Tooltip.destroy();
        f7Tooltip = null;
        return;
      }
      if (value && !f7Tooltip && app.f7) {
        f7Tooltip = app.f7.tooltip.create({
          targetEl: el,
          text: value,
          trigger: tooltipTrigger,
        });
        return;
      }
      if (!value || !f7Tooltip) return;
      f7Tooltip.setText(value);
    },
    destroy() {
      if (f7Tooltip && f7Tooltip.destroy) {
        f7Tooltip.destroy();
        f7Tooltip = null;
      }
    },
  };
};
