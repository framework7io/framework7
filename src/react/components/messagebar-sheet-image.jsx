import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

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

const MessagebarSheetImage = (props) => {
  const { className, id, style, children, image, checked, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onChange = (event) => {
    if (event.target.checked) emit(props, 'checked', event);
    else emit(props, 'unchecked', event);
    emit(props, 'change', event);
  };

  const classes = classNames(className, 'messagebar-sheet-image', 'checkbox', colorClasses(props));
  const styles = { ...(style || {}) };

  return (
    <label
      id={id}
      className={classes}
      style={styles}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      <input type="checkbox" checked={checked} onChange={onChange} />
      <i className="icon icon-checkbox" />
      {image && <img src={image} />}
      {children}
    </label>
  );
};

MessagebarSheetImage.displayName = 'f7-messagebar-sheet-image';

export default MessagebarSheetImage;
