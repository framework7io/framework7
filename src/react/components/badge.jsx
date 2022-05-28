import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';

/* dts-imports
import { Tooltip } from 'framework7/types';
*/

/* dts-instance
f7Tooltip: Tooltip.Tooltip
*/

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  tooltip: string;
  tooltipTrigger: string;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Badge = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  const classes = classNames(className, 'badge', colorClasses(props));

  return (
    <span id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </span>
  );
});

Badge.displayName = 'f7-badge';

export default Badge;
