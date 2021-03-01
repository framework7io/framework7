import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  COLOR_PROPS
*/

const Menu = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames('menu', colorClasses(props), className);

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <div className="menu-inner">{children}</div>
    </div>
  );
});

Menu.displayName = 'f7-menu';

export default Menu;
