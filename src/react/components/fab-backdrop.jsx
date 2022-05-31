import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { getExtraAttrs, classNames } from '../shared/utils.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const FabBackdrop = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'fab-backdrop');

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

FabBackdrop.displayName = 'f7-fab-backdrop';

export default FabBackdrop;
