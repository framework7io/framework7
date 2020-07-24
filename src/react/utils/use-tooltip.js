import { useEffect, useRef } from 'react';
import { watchProp } from './watch-prop';
import { f7, f7ready } from './f7';

export const useTooltip = (elRef, props) => {
  const f7Tooltip = useRef(null);
  const { tooltip, tooltipTrigger } = props;

  const onMount = () => {
    if (!elRef.current) return;
    if (!tooltip) return;

    f7ready(() => {
      f7Tooltip.current = f7.tooltip.create({
        targetEl: elRef.current,
        text: tooltip,
        trigger: tooltipTrigger,
      });
    });
  };

  const onDestroy = () => {
    if (f7Tooltip.current && f7Tooltip.current.destroy) {
      f7Tooltip.current.destroy();
      f7Tooltip.current = null;
      delete f7Tooltip.current;
    }
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  watchProp(tooltip, () => {
    if (!tooltip && f7Tooltip.current) {
      f7Tooltip.current.destroy();
      f7Tooltip.current = null;
      delete f7Tooltip.current;
      return;
    }
    if (tooltip && !f7Tooltip.current && f7) {
      f7Tooltip.current = f7.tooltip.create({
        targetEl: elRef.current,
        text: tooltip,
        trigger: tooltipTrigger,
      });
      return;
    }
    if (!tooltip || !f7Tooltip.current) return;
    f7Tooltip.current.setText(tooltip);
  });
};
