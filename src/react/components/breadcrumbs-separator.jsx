import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const BreadcrumbsSeparator = forwardRef((props, ref) => {
  const { className, id, style } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  return (
    <div
      className={classNames('breadcrumbs-separator', className)}
      ref={elRef}
      id={id}
      style={style}
      {...extraAttrs}
    />
  );
});

BreadcrumbsSeparator.displayName = 'f7-breadcrumbs-separator';

export default BreadcrumbsSeparator;
