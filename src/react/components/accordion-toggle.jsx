import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const AccordionToggle = (props) => {
  const { className, id, style, children, ref } = props;
  const elRef = useRef(null);
  const extraAttrs = getExtraAttrs(props);

  const classes = classNames(className, 'accordion-item-toggle', colorClasses(props));
  return (
    <div
      id={id}
      style={style}
      className={classes}
      {...extraAttrs}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
    >
      {children}
    </div>
  );
};

AccordionToggle.displayName = 'f7-accordion-toggle';

export default AccordionToggle;
