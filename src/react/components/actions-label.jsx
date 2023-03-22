import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

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

const ActionsLabel = forwardRef((props, ref) => {
  const { className, id, style, children, strong } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(
    className,
    'actions-label',
    {
      'actions-button-strong': strong,
    },
    colorClasses(props),
  );

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs} onClick={onClick}>
      {children}
    </div>
  );
});

ActionsLabel.displayName = 'f7-actions-label';

export default ActionsLabel;
