import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../utils/utils';
import { colorClasses } from '../utils/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  title? : string;
  subtitle? : string;
  sliding? : boolean;
  COLOR_PROPS
*/

const NavTitle = forwardRef((props, ref) => {
  const { className, id, style, children, title, subtitle, sliding } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  let subtitleEl;
  if (subtitle) {
    subtitleEl = <span className="subtitle">{subtitle}</span>;
  }

  const classes = classNames(
    className,
    'title',
    {
      sliding,
    },
    colorClasses(props),
  );

  const hasChildren = children && children.length > 0;
  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
      {!hasChildren && title}
      {!hasChildren && subtitleEl}
    </div>
  );
});

NavTitle.displayName = 'f7-nav-title';

export default NavTitle;
