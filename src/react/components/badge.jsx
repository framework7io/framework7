import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { useTooltip } from '../utils/use-tooltip';

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
  COLOR_PROPS
*/

const Badge = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useTooltip(elRef, props);

  const classes = classNames(className, 'badge', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

Badge.displayName = 'f7-badge';

export default Badge;
