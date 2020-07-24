import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';

import CardHeader from './card-header';
import CardContent from './card-content';
import CardFooter from './card-footer';

import { classNames, getDataAttrs, getSlots, emit } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7, f7ready } from '../utils/f7';
import { watchProp } from '../utils/watch-prop';

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  title? : string | number
  content? : string | number
  footer? : string | number
  outline? : boolean
  expandable? : boolean
  expandableAnimateWidth? : boolean
  expandableOpened? : boolean
  animate? : boolean
  hideNavbarOnOpen? : boolean
  hideToolbarOnOpen? : boolean
  hideStatusbarOnOpen? : boolean
  scrollableEl? : string
  swipeToClose? : boolean
  closeByBackdropClick? : boolean
  backdrop? : boolean
  backdropEl? : string
  noShadow? : boolean
  noBorder? : boolean
  padding? : boolean
  color? : string
  colorTheme? : string
  textColor? : string
  bgColor? : string
  borderColor? : string
  rippleColor? : string
  themeDark? : boolean
  onCardBeforeOpen? : (el?: HTMLElement, prevent?: any) => void
  onCardOpen? : (el?: HTMLElement) => void
  onCardOpened? : (el?: HTMLElement, pageEl?: HTMLElement) => void
  onCardClose? : (el?: HTMLElement) => void
  onCardClosed? : (el?: HTMLElement, pageEl?: HTMLElement) => void
  COLOR_PROPS
*/

const Card = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    title,
    content,
    footer,
    padding,
    outline,
    expandable,
    expandableAnimateWidth,
    expandableOpened,
    animate,
    hideNavbarOnOpen,
    hideToolbarOnOpen,
    hideStatusbarOnOpen,
    scrollableEl,
    swipeToClose,
    closeByBackdropClick,
    backdrop,
    backdropEl,
    noShadow,
    noBorder,
  } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const open = () => {
    if (!elRef.current) return;
    f7.card.open(elRef.current);
  };
  const close = () => {
    if (!elRef.current) return;
    f7.card.close(elRef.current);
  };
  const onBeforeOpen = (el, prevent) => {
    if (elRef.current !== el) return;
    emit(props, 'cardBeforeOpen', el, prevent);
  };
  const onOpen = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'cardOpen', el);
  };
  const onOpened = (el, pageEl) => {
    if (elRef.current !== el) return;
    emit(props, 'cardOpened', el, pageEl);
  };
  const onClose = (el) => {
    if (elRef.current !== el) return;
    emit(props, 'cardClose', el);
  };
  const onClosed = (el, pageEl) => {
    if (elRef.current !== el) return;
    emit(props, 'cardClosed', el, pageEl);
  };

  const onMount = () => {
    if (!expandable) return;
    if (!elRef.current) return;
    f7ready(() => {
      f7.on('cardBeforeOpen', onBeforeOpen);
      f7.on('cardOpen', onOpen);
      f7.on('cardOpened', onOpened);
      f7.on('cardClose', onClose);
      f7.on('cardClosed', onClosed);
      if (expandable && expandableOpened) {
        f7.card.open(elRef.current, false);
      }
    });
  };

  const onDestroy = () => {
    if (!expandable) return;
    if (!f7) return;
    f7.off('cardBeforeOpen', onBeforeOpen);
    f7.off('cardOpen', onOpen);
    f7.off('cardOpened', onOpened);
    f7.off('cardClose', onClose);
    f7.off('cardClosed', onClosed);
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  watchProp(expandableOpened, (value) => {
    if (value) {
      open();
    } else {
      close();
    }
  });

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    open,
    close,
  }));

  let headerEl;
  let contentEl;
  let footerEl;

  const classes = classNames(
    className,
    'card',
    {
      'card-outline': outline,
      'card-expandable': expandable,
      'card-expandable-animate-width': expandableAnimateWidth,
      'no-shadow': noShadow,
      'no-border': noBorder,
    },
    colorClasses(props),
  );

  const slots = getSlots(props);

  if (title || (slots && slots.header)) {
    headerEl = (
      <CardHeader>
        {title}
        {slots.header}
      </CardHeader>
    );
  }
  if (content || (slots && slots.content)) {
    contentEl = (
      <CardContent padding={padding}>
        {content}
        {slots.content}
      </CardContent>
    );
  }
  if (footer || (slots && slots.footer)) {
    footerEl = (
      <CardFooter>
        {footer}
        {slots.fooer}
      </CardFooter>
    );
  }

  return (
    <div
      id={id}
      style={style}
      className={classes}
      data-animate={typeof animate === 'undefined' ? animate : animate.toString()}
      data-hide-navbar-on-open={
        typeof hideNavbarOnOpen === 'undefined' ? hideNavbarOnOpen : hideNavbarOnOpen.toString()
      }
      data-hide-toolbar-on-open={
        typeof hideToolbarOnOpen === 'undefined' ? hideToolbarOnOpen : hideToolbarOnOpen.toString()
      }
      data-hide-statusbar-on-open={
        typeof hideStatusbarOnOpen === 'undefined'
          ? hideStatusbarOnOpen
          : hideStatusbarOnOpen.toString()
      }
      data-scrollable-el={scrollableEl}
      data-swipe-to-close={
        typeof swipeToClose === 'undefined' ? swipeToClose : swipeToClose.toString()
      }
      data-close-by-backdrop-click={
        typeof closeByBackdropClick === 'undefined'
          ? closeByBackdropClick
          : closeByBackdropClick.toString()
      }
      data-backdrop={typeof backdrop === 'undefined' ? backdrop : backdrop.toString()}
      data-backdrop-el={backdropEl}
      ref={elRef}
      {...dataAttrs}
    >
      {headerEl}
      {contentEl}
      {footerEl}
      <slot />
    </div>
  );
});

Card.displayName = 'f7-card';

export default Card;
