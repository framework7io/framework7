import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  large?: boolean;
  medium?: boolean;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const BlockTitle = (props) => {
  const { className, id, style, children, large, medium, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const classes = classNames(
    className,
    'block-title',
    { 'block-title-large': large, 'block-title-medium': medium },
    colorClasses(props),
  );

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
    </div>
  );
};

BlockTitle.displayName = 'f7-block-title';

export default BlockTitle;
