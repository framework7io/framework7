import { useEffect, useRef } from 'react';
import { watchProp } from './watch-prop.js';
import { f7, f7ready } from './f7.js';

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
    }
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  watchProp(tooltip, (value) => {
    if (!value && f7Tooltip.current) {
      f7Tooltip.current.destroy();
      f7Tooltip.current = null;
      return;
    }
    if (value && !f7Tooltip.current && f7) {
      f7Tooltip.current = f7.tooltip.create({
        targetEl: elRef.current,
        text: value,
        trigger: tooltipTrigger,
      });
      return;
    }
    if (!value || !f7Tooltip.current) return;
    f7Tooltip.current.setText(value);
  });
};
