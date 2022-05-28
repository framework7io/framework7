import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  sliding? : boolean
  title? : string
  inner? : boolean
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Subnavbar = forwardRef((props, ref) => {
  const { className, id, style, children, inner = true, title, sliding } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(
    className,
    'subnavbar',
    {
      sliding,
    },
    colorClasses(props),
  );
  return (
    <div className={classes} id={id} style={style} ref={elRef} {...extraAttrs}>
      {inner ? (
        <div className="subnavbar-inner">
          {title && <div className="subnavbar-title">{title}</div>}
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
});

Subnavbar.displayName = 'f7-subnavbar';

export default Subnavbar;
