import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import { f7, f7ready } from './f7';

export const useTooltip = (elRef, props) => {
  const f7Tooltip = ref(null);
  const { tooltip, tooltipTrigger } = props;

  onMounted(() => {
    if (!elRef.value) return;
    if (!tooltip) return;

    f7ready(() => {
      f7Tooltip.value = f7.tooltip.create({
        targetEl: elRef.value,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  });

  onBeforeUnmount(() => {
    if (f7Tooltip.value && f7Tooltip.value.destroy) {
      f7Tooltip.value.destroy();
      f7Tooltip.value = null;
    }
  });

  watch(
    () => props.tooltip,
    (value) => {
      if (!value && f7Tooltip.value) {
        f7Tooltip.value.destroy();
        f7Tooltip.value = null;
        return;
      }
      if (value && !f7Tooltip.value && f7) {
        f7Tooltip.value = f7.tooltip.create({
          targetEl: elRef.value,
          text: value,
          trigger: tooltipTrigger,
        });
        return;
      }
      if (!value || !f7Tooltip.value) return;
      f7Tooltip.value.setText(value);
    },
  );
};
