import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  tabs?: boolean;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Views = (props) => {
  const { className, id, style, children, tabs, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const classes = classNames(className, 'views', { tabs }, colorClasses(props));

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

Views.displayName = 'f7-views';

export default Views;
