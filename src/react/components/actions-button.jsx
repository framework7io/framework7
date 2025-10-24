import React, { useRef } from 'react';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7 } from '../shared/f7.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  strong: boolean;
  close: boolean;
  onClick? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const ComponentName = (props) => {
  const { className, id, style, strong, close = true, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const classes = classNames(
    className,
    { 'actions-button': true, 'actions-button-strong': strong },
    colorClasses(props),
  );

  let mediaEl;

  const slots = getSlots(props);

  if (slots.media && slots.media.length) {
    mediaEl = <div className="actions-button-media">{slots.media}</div>;
  }

  const onClick = (e) => {
    if (elRef.current && close && f7) {
      f7.actions.close(f7.$(elRef.current).parents('.actions-modal'));
    }
    emit(props, 'click', e);
  };

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
      onClick={onClick}
    >
      {mediaEl}
      <div className="actions-button-text">{slots.default}</div>
    </div>
  );
};

ComponentName.displayName = 'f7-actions-button';

export default ComponentName;
