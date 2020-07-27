import React, { forwardRef, useRef, useImperativeHandle, useEffect, useLayoutEffect } from 'react';
import { classNames, getDataAttrs, noUndefinedProps } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  autoLayout? : boolean
  messages? : Array<any>
  newMessagesFirst? : boolean
  scrollMessages? : boolean
  scrollMessagesOnEdge? : boolean
  firstMessageRule? : Function
  lastMessageRule? : Function
  tailMessageRule? : Function
  sameNameMessageRule? : Function
  sameHeaderMessageRule? : Function
  sameFooterMessageRule? : Function
  sameAvatarMessageRule? : Function
  customClassMessageRule? : Function
  renderMessage? : Function
  init? : boolean
  COLOR_PROPS
*/

const Messages = forwardRef((props, ref) => {
  const f7Messages = useRef(null);
  const {
    className,
    id,
    style,
    children,
    autoLayout = false,
    messages = [],
    newMessagesFirst = false,
    scrollMessages = true,
    scrollMessagesOnEdge = true,
    firstMessageRule,
    lastMessageRule,
    tailMessageRule,
    sameNameMessageRule,
    sameHeaderMessageRule,
    sameFooterMessageRule,
    sameAvatarMessageRule,
    customClassMessageRule,
    renderMessage,
    init = true,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Messages: f7Messages.current,
    renderMessages(messagesToRender, method) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.renderMessages(messagesToRender, method);
    },
    layout() {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.layout();
    },
    scroll(duration, scrollTop) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.scroll(duration, scrollTop);
    },
    clear() {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.clear();
    },
    removeMessage(messageToRemove, layout) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.removeMessage(messageToRemove, layout);
    },
    removeMessages(messagesToRemove, layout) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.removeMessages(messagesToRemove, layout);
    },
    addMessage(...args) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.addMessage(...args);
    },
    addMessages(...args) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.addMessages(...args);
    },
    showTyping(message) {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.showTyping(message);
    },
    hideTyping() {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.hideTyping();
    },
    destroy() {
      if (!f7Messages.current) return undefined;
      return f7Messages.current.destroy();
    },
  }));

  const onMount = () => {
    if (!init) return;

    f7ready(() => {
      f7Messages.current = f7.messages.create(
        noUndefinedProps({
          el: elRef.current,
          autoLayout,
          messages,
          newMessagesFirst,
          scrollMessages,
          scrollMessagesOnEdge,
          firstMessageRule,
          lastMessageRule,
          tailMessageRule,
          sameNameMessageRule,
          sameHeaderMessageRule,
          sameFooterMessageRule,
          sameAvatarMessageRule,
          customClassMessageRule,
          renderMessage,
        }),
      );
    });
  };

  const onDestroy = () => {
    if (f7Messages.current && f7Messages.current.destroy) f7Messages.current.destroy();
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  });

  useLayoutEffect(() => {
    if (!init || elRef.current) return;

    const childElements = elRef.current.children;
    if (!childElements) return;

    for (let i = 0; i < childElements.length; i += 1) {
      if (!childElements[i].classList.contains('message-appeared')) {
        childElements[i].classList.add('message-appear-from-bottom');
      }
    }
    if (f7Messages.current) {
      if (f7Messages.current.layout && autoLayout) {
        f7Messages.current.layout();
      }
      if (f7Messages.current.scroll && scrollMessages) {
        f7Messages.current.scroll();
      }
    }
  });

  const classes = classNames(className, 'messages', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

Messages.displayName = 'f7-messages';

export default Messages;
