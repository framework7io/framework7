import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  COLOR_PROPS
*/

const AccordionToggle = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));
  const dataAttrs = getDataAttrs(props);

  const classes = classNames(className, 'accordion-item-toggle', colorClasses(props));
  return (
    <div id={id} style={style} className={classes} {...dataAttrs} ref={elRef}>
      {children}
    </div>
  );
});

AccordionToggle.displayName = 'f7-accordion-toggle';

export default AccordionToggle;
