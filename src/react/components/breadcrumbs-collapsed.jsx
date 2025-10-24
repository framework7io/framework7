import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick? : (event?: any) => void;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const BreadcrumbsCollapsed = (props) => {
  const { className, id, style, children, ref } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  return (
    <div
      className={classNames('breadcrumbs-collapsed', className)}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      id={id}
      style={style}
      onClick={onClick}
      {...extraAttrs}
    >
      <span />
      {children}
    </div>
  );
};

BreadcrumbsCollapsed.displayName = 'f7-breadcrumbs-collapsed';

export default BreadcrumbsCollapsed;
