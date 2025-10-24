import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  title? : string;
  subtitle? : string;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const NavTitle = (props) => {
  const { className, id, style, children, title, subtitle, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  let subtitleEl;
  if (subtitle) {
    subtitleEl = <span className="subtitle">{subtitle}</span>;
  }

  const classes = classNames(className, 'title', {}, colorClasses(props));

  return (
    <div
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {children}
      {title}
      {subtitleEl}
    </div>
  );
};

NavTitle.displayName = 'f7-nav-title';

export default NavTitle;
