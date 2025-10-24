import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  text? : string
  confirmTitle? : string
  confirmText? : string
  overswipe? : boolean
  close? : boolean
  delete? : boolean
  href? : string
  COLOR_PROPS
  onClick? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const SwipeoutButton = (props) => {
  const {
    className,
    id,
    style,
    children,
    text,
    confirmTitle,
    confirmText,
    overswipe,
    close,
    delete: deleteProp,
    href,
    ref,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  const classes = classNames(
    className,
    { 'swipeout-overswipe': overswipe, 'swipeout-delete': deleteProp, 'swipeout-close': close },
    colorClasses(props),
  );

  return (
    <a
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      href={href || '#'}
      id={id}
      style={style}
      data-confirm={confirmText || undefined}
      data-confirm-title={confirmTitle || undefined}
      className={classes}
      {...extraAttrs}
      onClick={onClick}
    >
      {children}
      {text}
    </a>
  );
};

SwipeoutButton.displayName = 'f7-swipeout-button';

export default SwipeoutButton;
