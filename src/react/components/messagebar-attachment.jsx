import React, { useRef } from 'react';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { setRef } from '../shared/set-ref.js';

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

const MessagebarAttachment = (props) => {
  const { className, id, style, children, image, deletable = true, ref } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (event) => {
    emit(props, 'attachmentClick', event);
  };
  const onDeleteClick = (event) => {
    emit(props, 'attachmentDelete', event);
  };

  const classes = classNames(className, 'messagebar-attachment', colorClasses(props));

  return (
    <div
      id={id}
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
      onClick={onClick}
    >
      {image && <img src={image} />}
      {deletable && <span className="messagebar-attachment-delete" onClick={onDeleteClick} />}
      {children}
    </div>
  );
};

MessagebarAttachment.displayName = 'f7-messagebar-attachment';

export default MessagebarAttachment;
