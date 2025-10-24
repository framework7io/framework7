import React, { useRef } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const BreadcrumbsSeparator = (props) => {
  const { className, id, style, ref } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  return (
    <div
      className={classNames('breadcrumbs-separator', className)}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      id={id}
      style={style}
      {...extraAttrs}
    />
  );
};

BreadcrumbsSeparator.displayName = 'f7-breadcrumbs-separator';

export default BreadcrumbsSeparator;
