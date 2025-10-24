import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  accordionOpposite: boolean;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Accordion = (props) => {
  const { className, id, style, accordionOpposite, children, ref } = props;
  const elRef = useRef(null);
  const extraAttrs = getExtraAttrs(props);
  const classes = classNames(
    className,
    'accordion-list',
    accordionOpposite && 'accordion-opposite',
    colorClasses(props),
  );
  return (
    <div
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
    </div>
  );
};
Accordion.displayName = 'f7-accordion';

export default Accordion;
