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

const CardHeader = (props) => {
  const { className, id, style, children, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const classes = classNames(className, 'card-header', colorClasses(props));

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

CardHeader.displayName = 'f7-card-header';

export default CardHeader;
