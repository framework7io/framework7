import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  title? : string
  inner? : boolean
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Subnavbar = (props) => {
  const { className, id, style, children, inner = true, title, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const classes = classNames(className, 'subnavbar', {}, colorClasses(props));
  return (
    <div
      className={classes}
      id={id}
      style={style}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
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
};

Subnavbar.displayName = 'f7-subnavbar';

export default Subnavbar;
