import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTooltip } from '../shared/use-tooltip.js';
import { setRef } from '../shared/set-ref.js';

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

const Badge = (props) => {
  const { className, id, style, children, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useTooltip(elRef, props);

  const classes = classNames(className, 'badge', colorClasses(props));

  return (
    <span
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'f7-badge';

export default Badge;
