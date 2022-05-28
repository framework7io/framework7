import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  left? : boolean
  right? : boolean
  side? : string
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const SwipeoutActions = forwardRef((props, ref) => {
  const { className, id, style, children, left, right, side } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  let sideComputed = side;
  if (!sideComputed) {
    if (left) sideComputed = 'left';
    if (right) sideComputed = 'right';
  }

  const classes = classNames(className, `swipeout-actions-${sideComputed}`, colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

SwipeoutActions.displayName = 'f7-swipeout-actions';

export default SwipeoutActions;
