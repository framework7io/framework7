import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  image? : string
  deletable? : boolean
  COLOR_PROPS
  onAttachmentClick? : (event?: any) => void
  onAttachmentDelete? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const MessagebarAttachment = forwardRef((props, ref) => {
  const { className, id, style, children, image, deletable = true } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (event) => {
    emit(props, 'attachmentClick', event);
  };
  const onDeleteClick = (event) => {
    emit(props, 'attachmentDelete', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'messagebar-attachment', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs} onClick={onClick}>
      {image && <img src={image} />}
      {deletable && <span className="messagebar-attachment-delete" onClick={onDeleteClick} />}
      {children}
    </div>
  );
});

MessagebarAttachment.displayName = 'f7-messagebar-attachment';

export default MessagebarAttachment;
