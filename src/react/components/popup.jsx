import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { f7, f7ready } from '../shared/f7.js';
import { colorClasses } from '../shared/mixins.js';
import { modalStateClasses } from '../shared/modal-state-classes.js';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, emit, getExtraAttrs } from '../shared/utils.js';
import { watchProp } from '../shared/watch-prop.js';

/* dts-imports
import { Popup } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  tabletFullscreen? : boolean
  opened? : boolean
  animate? : boolean
  backdrop? : boolean
  backdropEl? : string | object
  closeByBackdropClick? : boolean
  closeOnEscape? : boolean
  swipeToClose? : boolean | string
  swipeHandler? : string | object
  push? : boolean
  containerEl?: string | object
  COLOR_PROPS
  onPopupSwipeStart? : (instance?: Popup.Popup) => void
  onPopupSwipeMove? : (instance?: Popup.Popup) => void
  onPopupSwipeEnd? : (instance?: Popup.Popup) => void
  onPopupSwipeClose? : (instance?: Popup.Popup) => void
  onPopupOpen? : (instance?: Popup.Popup) => void
  onPopupOpened? : (instance?: Popup.Popup) => void
  onPopupClose? : (instance?: Popup.Popup) => void
  onPopupClosed? : (instance?: Popup.Popup) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Popup: () => Popup.Popup}>;
  children?: React.ReactNode;
*/

const Popup = forwardRef((props, ref) => {
  const f7Popup = useRef(null);
  const {
    className,
    id,
    style,
    children,
    tabletFullscreen,
    push,
    opened,
    closeByBackdropClick,
    backdrop,
    backdropEl,
    animate,
    closeOnEscape,
    swipeToClose = false,
    swipeHandler,
    containerEl,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const isOpened = useRef(opened);
  const isClosing = useRef(false);

  const onSwipeStart = (instance) => {
    emit(props, 'popupSwipeStart', instance);
  };
  const onSwipeMove = (instance) => {
    emit(props, 'popupSwipeMove', instance);
  };
  const onSwipeEnd = (instance) => {
    emit(props, 'popupSwipeEnd', instance);
  };
  const onSwipeClose = (instance) => {
    emit(props, 'popupSwipeClose', instance);
  };
  const onOpen = (instance) => {
    isOpened.current = true;
    isClosing.current = false;
    emit(props, 'popupOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'popupOpened', instance);
  };
  const onClose = (instance) => {
    isOpened.current = false;
    isClosing.current = true;
    emit(props, 'popupClose', instance);
  };
  const onClosed = (instance) => {
    isClosing.current = false;
    emit(props, 'popupClosed', instance);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Popup: () => f7Popup.current,
  }));

  watchProp(opened, (value) => {
    if (!f7Popup.current) return;
    if (value) {
      f7Popup.current.open();
    } else {
      f7Popup.current.close();
    }
  });

  const modalEvents = (method) => {
    if (!f7Popup.current) return;
    f7Popup.current[method]('swipeStart', onSwipeStart);
    f7Popup.current[method]('swipeMove', onSwipeMove);
    f7Popup.current[method]('swipeEnd', onSwipeEnd);
    f7Popup.current[method]('swipeClose', onSwipeClose);
    f7Popup.current[method]('open', onOpen);
    f7Popup.current[method]('opened', onOpened);
    f7Popup.current[method]('close', onClose);
    f7Popup.current[method]('closed', onClosed);
  };

  const onMount = () => {
    if (!elRef.current) return;
    const popupParams = {
      el: elRef.current,
    };

    if ('closeByBackdropClick' in props) popupParams.closeByBackdropClick = closeByBackdropClick;
    if ('closeOnEscape' in props) popupParams.closeOnEscape = closeOnEscape;
    if ('animate' in props) popupParams.animate = animate;
    if ('backdrop' in props) popupParams.backdrop = backdrop;
    if ('backdropEl' in props) popupParams.backdropEl = backdropEl;
    if ('swipeToClose' in props) popupParams.swipeToClose = swipeToClose;
    if ('swipeHandler' in props) popupParams.swipeHandler = swipeHandler;
    if ('containerEl' in props) popupParams.containerEl = containerEl;

    f7ready(() => {
      f7Popup.current = f7.popup.create(popupParams);
      modalEvents('on');
      if (opened) {
        f7Popup.current.open(false, true);
      }
    });
  };

  const onDestroy = () => {
    if (f7Popup.current) {
      f7Popup.current.destroy();
    }
    f7Popup.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    modalEvents('on');
    return () => {
      modalEvents('off');
    };
  });

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const classes = classNames(
    className,
    'popup',
    {
      'popup-tablet-fullscreen': tabletFullscreen,
      'popup-push': push,
    },
    modalStateClasses({ isOpened, isClosing }),
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

Popup.displayName = 'f7-popup';

export default Popup;
