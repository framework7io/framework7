import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Breadcrumbs = (props) => {
  const { className, id, style, children, ref } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  return (
    <div
      className={classNames('breadcrumbs', className)}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      id={id}
      style={style}
      {...extraAttrs}
    >
      {children}
    </div>
  );
};

Breadcrumbs.displayName = 'f7-breadcrumbs';

export default Breadcrumbs;
