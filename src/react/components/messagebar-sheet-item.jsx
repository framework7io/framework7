import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getDataAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  COLOR_PROPS
*/

const MessagebarSheetItem = forwardRef((props, ref) => {
  const { className, id, style, children } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'messagebar-sheet-item', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

MessagebarSheetItem.displayName = 'f7-messagebar-sheet-item';

export default MessagebarSheetItem;
