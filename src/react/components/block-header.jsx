import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const BlockHeader = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'block-header', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

BlockHeader.displayName = 'f7-block-header';

export default BlockHeader;
