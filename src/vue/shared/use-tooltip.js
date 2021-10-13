import { watch, onMounted, onBeforeUnmount } from 'vue';
import { f7, f7ready } from './f7.js';

export const useTooltip = (elRef, props) => {
  let f7Tooltip = null;
  const { tooltip, tooltipTrigger } = props;

  onMounted(() => {
    if (!elRef.value) return;
    if (!tooltip) return;

    f7ready(() => {
      f7Tooltip = f7.tooltip.create({
        targetEl: elRef.value,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  });

  onBeforeUnmount(() => {
    if (f7Tooltip && f7Tooltip.destroy) {
      f7Tooltip.destroy();
      f7Tooltip = null;
    }
  });

  watch(
    () => props.tooltip,
    (value) => {
      if (!value && f7Tooltip) {
        f7Tooltip.destroy();
        f7Tooltip = null;
        return;
      }
      if (value && !f7Tooltip && f7) {
        f7Tooltip = f7.tooltip.create({
          targetEl: elRef.value,
          text: value,
          trigger: tooltipTrigger,
        });
        return;
      }
      if (!value || !f7Tooltip) return;
      f7Tooltip.setText(value);
    },
  );
};
