import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
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

const SwipeoutActions = (props) => {
  const { className, id, style, children, left, right, side, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  let sideComputed = side;
  if (!sideComputed) {
    if (left) sideComputed = 'left';
    if (right) sideComputed = 'right';
  }

  const classes = classNames(className, `swipeout-actions-${sideComputed}`, colorClasses(props));

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

SwipeoutActions.displayName = 'f7-swipeout-actions';

export default SwipeoutActions;
