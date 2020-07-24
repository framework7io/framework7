import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  COLOR_PROPS
*/

const BlockFooter = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'block-footer', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

BlockFooter.displayName = 'f7-block-footer';

export default BlockFooter;
