import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getDataAttrs, emit } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7ready, f7 } from '../utils/f7';
import { watchProp } from '../utils/watch-prop';

/* dts-imports
import { Popover } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  opened? : boolean
  target? : string | Object
  backdrop? : boolean
  backdropEl? : string | Object
  closeByBackdropClick? : boolean
  closeByOutsideClick? : boolean
  closeOnEscape? : boolean
  COLOR_PROPS
  onPopoverOpen? : (instance?: Popover.Popover) => void
  onPopoverOpened? : (instance?: Popover.Popover) => void
  onPopoverClose? : (instance?: Popover.Popover) => void
  onPopoverClosed? : (instance?: Popover.Popover) => void
*/

const Popover = forwardRef((props, ref) => {
  const f7Popover = useRef(null);
  const {
    className,
    id,
    style,
    children,
    opened,
    target,
    backdrop,
    backdropEl,
    closeByBackdropClick,
    closeByOutsideClick,
    closeOnEscape,
  } = props;

  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onOpen = (instance) => {
    emit(props, 'popoverOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'popoverOpened', instance);
  };
  const onClose = (instance) => {
    emit(props, 'popoverClose', instance);
  };
  const onClosed = (instance) => {
    emit(props, 'popoverClosed', instance);
  };
  const open = (animate) => {
    if (!f7Popover.current) return undefined;
    return f7Popover.current.open(animate);
  };
  const close = (animate) => {
    if (!f7Popover.current) return undefined;
    return f7Popover.current.close(animate);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Popover: f7Popover.current,
    open,
    close,
  }));

  watchProp(opened, (value) => {
    if (!f7Popover.current) return;
    if (value) {
      f7Popover.current.open();
    } else {
      f7Popover.current.close();
    }
  });

  const onMount = () => {
    if (!elRef.current) return;
    const popoverParams = {
      el: elRef.current,
      on: {
        open: onOpen,
        opened: onOpened,
        close: onClose,
        closed: onClosed,
      },
    };
    if (target) popoverParams.targetEl = target;

    if ('closeByBackdropClick' in props) popoverParams.closeByBackdropClick = closeByBackdropClick;
    if ('closeByOutsideClick' in props) popoverParams.closeByOutsideClick = closeByOutsideClick;
    if ('closeOnEscape' in props) popoverParams.closeOnEscape = closeOnEscape;
    if ('backdrop' in props) popoverParams.backdrop = backdrop;
    if ('backdropEl' in props) popoverParams.backdropEl = backdropEl;

    f7ready(() => {
      f7Popover.current = f7.popover.create(popoverParams);

      if (opened && target) {
        f7Popover.current.open(target, false);
      }
    });
  };

  const onDestroy = () => {
    if (f7Popover.current) {
      f7Popover.current.destroy();
    }
    f7Popover.current = null;
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const classes = classNames(className, 'popover', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      <div className="popover-angle" />
      <div className="popover-inner">{children}</div>
    </div>
  );
});

Popover.displayName = 'f7-popover';

export default Popover;
