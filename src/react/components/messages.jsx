import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, noUndefinedProps } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';

/* dts-imports
import { Messages } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  autoLayout? : boolean
  messages? : Array<any>
  newMessagesFirst? : boolean
  scrollMessages? : boolean
  scrollMessagesOnEdge? : boolean
  typing?: boolean
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
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Messages: () => Messages.Messages}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Messages = forwardRef((props, ref) => {
  const f7Messages = useRef(null);
  const mounted = useRef(false);
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
    typing = false,
    init = true,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const childrenBeforeUpdated = useRef(null);
  const reactChildrenBefore = useRef(children ? React.Children.count(children) : 0);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Messages: () => f7Messages.current,
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
      if (typing) {
        f7Messages.current.showTyping();
      }
    });
  };

  const onDestroy = () => {
    if (f7Messages.current && f7Messages.current.destroy) f7Messages.current.destroy();
    f7Messages.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const currentChildrenLength = children ? React.Children.count(children) : 0;
  if (f7Messages.current && scrollMessages) {
    const beforeChildrenLength = reactChildrenBefore.current || 0;
    if (currentChildrenLength !== beforeChildrenLength) {
      f7Messages.current.setScrollData();
    }
  }
  reactChildrenBefore.current = currentChildrenLength;

  useIsomorphicLayoutEffect(() => {
    const wasMounted = mounted.current;
    mounted.current = true;
    if (!init || !elRef.current) return;

    const childElements = elRef.current.children;
    if (!childElements) return;
    const childrenAfterUpdated = childElements.length;

    if (!wasMounted) {
      for (let i = 0; i < childElements.length; i += 1) {
        childElements[i].classList.add('message-appeared');
      }
      return;
    }

    for (let i = 0; i < childElements.length; i += 1) {
      if (!childElements[i].classList.contains('message-appeared')) {
        childElements[i].classList.add('message-appear-from-bottom');
      }
    }
    if (f7Messages.current) {
      if (f7Messages.current.layout && autoLayout) {
        f7Messages.current.layout();
      }
      if (
        childrenBeforeUpdated.current !== childrenAfterUpdated &&
        f7Messages.current.scroll &&
        f7Messages.current.scrollData &&
        scrollMessages
      ) {
        f7Messages.current.scrollWithEdgeCheck(true);
      }
    }

    childrenBeforeUpdated.current = childrenAfterUpdated;
  });

  watchProp(typing, (newValue) => {
    if (!f7Messages.current) return;
    if (newValue) f7Messages.current.showTyping();
    else f7Messages.current.hideTyping();
  });

  const classes = classNames(className, 'messages', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

Messages.displayName = 'f7-messages';

export default Messages;
