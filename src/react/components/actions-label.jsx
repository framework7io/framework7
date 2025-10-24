import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  strong: boolean;
  onClick?: (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const ActionsLabel = (props) => {
  const { className, id, style, children, strong, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const classes = classNames(
    className,
    'actions-label',
    { 'actions-button-strong': strong },
    colorClasses(props),
  );

  const onClick = (e) => {
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
      {children}
    </div>
  );
};

ActionsLabel.displayName = 'f7-actions-label';

export default ActionsLabel;
