import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick? : (event?: any) => void;
  active?: boolean;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const BreadcrumbsItem = forwardRef((props, ref) => {
  const { className, id, style, active, children } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  return (
    <div
      className={classNames('breadcrumbs-item', className, active && 'breadcrumbs-item-active')}
      ref={elRef}
      id={id}
      style={style}
      onClick={onClick}
      {...extraAttrs}
    >
      {children}
    </div>
  );
});

BreadcrumbsItem.displayName = 'f7-breadcrumbs-item';

export default BreadcrumbsItem;
