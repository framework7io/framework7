import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const AccordionContent = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));
  const extraAttrs = getExtraAttrs(props);

  const classes = classNames(className, 'accordion-item-content', colorClasses(props));
  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

AccordionContent.displayName = 'f7-accordion-content';

export default AccordionContent;
