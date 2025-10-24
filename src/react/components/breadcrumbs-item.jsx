import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { setRef } from '../shared/set-ref.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  onClick? : (event?: any) => void;
  active?: boolean;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const BreadcrumbsItem = (props) => {
  const { className, id, style, active, children, ref } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (e) => {
    emit(props, 'click', e);
  };

  return (
    <div
      className={classNames('breadcrumbs-item', className, active && 'breadcrumbs-item-active')}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      id={id}
      style={style}
      onClick={onClick}
      {...extraAttrs}
    >
      {children}
    </div>
  );
};

BreadcrumbsItem.displayName = 'f7-breadcrumbs-item';

export default BreadcrumbsItem;
