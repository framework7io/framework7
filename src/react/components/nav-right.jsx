import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  sliding? : boolean;
  COLOR_PROPS
*/

const NavRight = forwardRef((props, ref) => {
  const { className, id, style, children, sliding } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(
    className,
    'right',
    {
      sliding,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

NavRight.displayName = 'f7-nav-right';

export default NavRight;
