import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  image? : string
  checked? : boolean
  COLOR_PROPS
  onChecked? : (event?: any) => void
  onUnchecked? : (event?: any) => void
  onChange? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const MessagebarSheetImage = forwardRef((props, ref) => {
  const { className, id, style, children, image, checked } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onChange = (event) => {
    if (event.target.checked) emit(props, 'checked', event);
    else emit(props, 'unchecked', event);
    emit(props, 'change', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'messagebar-sheet-image', 'checkbox', colorClasses(props));
  const styles = {
    ...(style || {}),
  };

  return (
    <label id={id} className={classes} style={styles} ref={elRef} {...extraAttrs}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <i className="icon icon-checkbox" />
      {image && <img src={image} />}
      {children}
    </label>
  );
});

MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';

export default MessagebarSheetImage;
