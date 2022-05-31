import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Breadcrumbs = forwardRef((props, ref) => {
  const { className, id, style, children } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  return (
    <div
      className={classNames('breadcrumbs', className)}
      ref={elRef}
      id={id}
      style={style}
      {...extraAttrs}
    >
      {children}
    </div>
  );
});

Breadcrumbs.displayName = 'f7-breadcrumbs';

export default Breadcrumbs;
