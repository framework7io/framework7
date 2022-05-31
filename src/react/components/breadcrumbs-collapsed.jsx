import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const BreadcrumbsCollapsed = forwardRef((props, ref) => {
  const { className, id, style, children } = props;

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
      className={classNames('breadcrumbs-collapsed', className)}
      ref={elRef}
      id={id}
      style={style}
      onClick={onClick}
      {...extraAttrs}
    >
      <span />
      {children}
    </div>
  );
});

BreadcrumbsCollapsed.displayName = 'f7-breadcrumbs-collapsed';

export default BreadcrumbsCollapsed;
