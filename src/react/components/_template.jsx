/* eslint-disable */
import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';

/* dts-props

  id: string | number;
  className: string;
  style: React.CSSProperties;
  COLOR_PROPS
*/

const ComponentName = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

ComponentName.displayName = 'f7-';

export default ComponentName;
