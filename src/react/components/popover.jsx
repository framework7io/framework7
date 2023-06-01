import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';
import { modalStateClasses } from '../shared/modal-state-classes.js';

/* dts-imports
import { Popover } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  opened? : boolean
  animate? : boolean
  targetEl? : string | object
  arrow? : boolean
  backdrop? : boolean
  backdropEl? : string | object
  closeByBackdropClick? : boolean
  closeByOutsideClick? : boolean
  closeOnEscape? : boolean
  containerEl? : string | object
  verticalPosition?: string
  COLOR_PROPS
  onPopoverOpen? : (instance?: Popover.Popover) => void
  onPopoverOpened? : (instance?: Popover.Popover) => void
  onPopoverClose? : (instance?: Popover.Popover) => void
  onPopoverClosed? : (instance?: Popover.Popover) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Popover: () => Popover.Popover}>;
  children?: React.ReactNode;
*/

const Popover = forwardRef((props, ref) => {
  const f7Popover = useRef(null);
  const {
    className,
    id,
    style,
    children,
    opened,
    animate,
    targetEl,
    arrow,
    backdrop,
    backdropEl,
    closeByBackdropClick,
    closeByOutsideClick,
    closeOnEscape,
    containerEl,
    verticalPosition,
  } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const isOpened = useRef(opened);
  const isClosing = useRef(false);

  const onOpen = (instance) => {
    isOpened.current = true;
    isClosing.current = false;
    emit(props, 'popoverOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'popoverOpened', instance);
  };
  const onClose = (instance) => {
    isOpened.current = false;
    isClosing.current = true;
    emit(props, 'popoverClose', instance);
  };
  const onClosed = (instance) => {
    isClosing.current = false;
    emit(props, 'popoverClosed', instance);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Popover: () => f7Popover.current,
  }));

  watchProp(opened, (value) => {
    if (!f7Popover.current) return;
    if (value) {
      f7Popover.current.open();
    } else {
      f7Popover.current.close();
    }
  });

  const modalEvents = (method) => {
    if (!f7Popover.current) return;
    f7Popover.current[method]('open', onOpen);
    f7Popover.current[method]('opened', onOpened);
    f7Popover.current[method]('close', onClose);
    f7Popover.current[method]('closed', onClosed);
  };

  const onMount = () => {
    if (!elRef.current) return;
    const popoverParams = {
      el: elRef.current,
    };
    if (targetEl) popoverParams.targetEl = targetEl;

    if ('closeByBackdropClick' in props) popoverParams.closeByBackdropClick = closeByBackdropClick;
    if ('closeByOutsideClick' in props) popoverParams.closeByOutsideClick = closeByOutsideClick;
    if ('closeOnEscape' in props) popoverParams.closeOnEscape = closeOnEscape;
    if ('arrow' in props) popoverParams.arrow = arrow;
    if ('backdrop' in props) popoverParams.backdrop = backdrop;
    if ('backdropEl' in props) popoverParams.backdropEl = backdropEl;
    if ('animate' in props) popoverParams.animate = animate;
    if ('containerEl' in props) popoverParams.containerEl = containerEl;
    if ('verticalPosition' in props) popoverParams.verticalPosition = verticalPosition;

    f7ready(() => {
      f7Popover.current = f7.popover.create(popoverParams);
      modalEvents('on');

      if (opened && targetEl) {
        f7Popover.current.open(targetEl, false);
      }
    });
  };

  const onDestroy = () => {
    if (f7Popover.current) {
      f7Popover.current.destroy();
    }
    f7Popover.current = null;
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
    'popover',
    modalStateClasses({ isOpened, isClosing }),
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {arrow !== false && <div className="popover-arrow" />}
      <div className="popover-inner">{children}</div>
    </div>
  );
});

Popover.displayName = 'f7-popover';

export default Popover;
