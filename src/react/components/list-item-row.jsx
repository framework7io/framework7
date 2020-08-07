import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  COLOR_PROPS
*/

const ListItemRow = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const dataAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'item-row', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

ListItemRow.displayName = 'f7-list-item-row';

export default ListItemRow;
