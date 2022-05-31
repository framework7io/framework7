import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  text? : string
  name? : string
  avatar? : string
  type? : string
  image? : string
  header? : string
  footer? : string
  textHeader? : string
  textFooter? : string
  first? : boolean
  last? : boolean
  tail? : boolean
  sameName? : boolean
  sameHeader? : boolean
  sameFooter? : boolean
  sameAvatar? : boolean
  typing? : boolean
  COLOR_PROPS
  onClick? : (event?: any) => void
  onClickName? : (event?: any) => void
  onClickText? : (event?: any) => void
  onClickAvatar? : (event?: any) => void
  onClickHeader? : (event?: any) => void
  onClickFooter? : (event?: any) => void
  onClickBubble? : (event?: any) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Message = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    text,
    name,
    avatar,
    type = 'sent',
    image,
    header,
    footer,
    textHeader,
    textFooter,
    first,
    last,
    tail,
    sameName,
    sameHeader,
    sameFooter,
    sameAvatar,
    typing,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onClick = (event) => {
    emit(props, 'click', event);
  };
  const onNameClick = (event) => {
    emit(props, 'clickName', event);
  };
  const onTextClick = (event) => {
    emit(props, 'clickText', event);
  };
  const onAvatarClick = (event) => {
    emit(props, 'clickAvatar', event);
  };
  const onHeaderClick = (event) => {
    emit(props, 'clickHeader', event);
  };
  const onFooterClick = (event) => {
    emit(props, 'clickFooter', event);
  };
  const onBubbleClick = (event) => {
    emit(props, 'clickBubble', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const slots = getSlots(props);

  const classes = classNames(
    className,
    'message',
    {
      'message-sent': type === 'sent',
      'message-received': type === 'received',
      'message-typing': typing,
      'message-first': first,
      'message-last': last,
      'message-tail': tail,
      'message-same-name': sameName,
      'message-same-header': sameHeader,
      'message-same-footer': sameFooter,
      'message-same-avatar': sameAvatar,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs} onClick={onClick}>
      {slots.start}
      {(avatar || slots.avatar) && (
        <div
          className="message-avatar"
          style={{ backgroundImage: avatar && `url(${avatar})` }}
          onClick={onAvatarClick}
        >
          {slots.avatar}
        </div>
      )}
      <div className="message-content">
        {slots['content-start']}
        {(slots.name || name) && (
          <div className="message-name" onClick={onNameClick}>
            {name}
            {slots.name}
          </div>
        )}
        {(slots.header || header) && (
          <div className="message-header" onClick={onHeaderClick}>
            {header}
            {slots.header}
          </div>
        )}
        <div className="message-bubble" onClick={onBubbleClick}>
          {slots['bubble-start']}
          {(slots.image || image) && (
            <div className="message-image">{slots.image || <img src={image} />}</div>
          )}
          {(slots['text-header'] || textHeader) && (
            <div className="message-text-header">
              {textHeader}
              {slots['text-header']}
            </div>
          )}
          {(slots.text || text || typing) && (
            <div className="message-text" onClick={onTextClick}>
              {text}
              {slots.text}
              {typing && (
                <div className="message-typing-indicator">
                  <div />
                  <div />
                  <div />
                </div>
              )}
            </div>
          )}
          {(slots['text-footer'] || textFooter) && (
            <div className="message-text-footer">
              {textFooter}
              {slots['text-footer']}
            </div>
          )}
          {slots['bubble-end']}
          {slots.default}
        </div>
        {(slots.footer || footer) && (
          <div className="message-footer" onClick={onFooterClick}>
            {footer}
            {slots.footer}
          </div>
        )}
        {slots['content-end']}
      </div>
      {slots.end}
    </div>
  );
});

Message.displayName = 'f7-message';

export default Message;
