import React, { forwardRef, useRef, useImperativeHandle, useLayoutEffect } from 'react';
import { classNames, getDataAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7, f7ready } from '../shared/f7';
import { watchProp } from '../shared/watch-prop';

/* dts-imports
import { Actions } from 'framework7/types';
*/

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  opened? : boolean
  grid? : boolean
  convertToPopover? : boolean
  forceToPopover? : boolean
  target? : string | Object
  backdrop? : boolean
  backdropEl? : string | Object
  closeByBackdropClick? : boolean
  closeByOutsideClick? : boolean
  closeOnEscape? : boolean
  onActionsOpen? : (instance?: Actions.Actions) => void
  onActionsOpened? : (instance?: Actions.Actions) => void
  onActionsClose? : (instance?: Actions.Actions) => void
  onActionsClosed? : (instance?: Actions.Actions) => void
  COLOR_PROPS
*/

const Actions = forwardRef((props, ref) => {
  const { className, id, style, children, grid, opened = false } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);
  const f7Actions = useRef(null);

  const onOpen = (instance) => {
    emit(props, 'actionsOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'actionsOpened', instance);
  };
  const onClose = (instance) => {
    emit(props, 'actionsClose', instance);
  };
  const onClosed = (instance) => {
    emit(props, 'actionsClosed', instance);
  };
  const open = (animate) => {
    if (!f7Actions.current) return undefined;
    return f7Actions.current.open(animate);
  };
  const close = (animate) => {
    if (!f7Actions.current) return undefined;
    return f7Actions.current.close(animate);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Actions: () => f7Actions.current,
    open,
    close,
  }));

  // watch opened changes
  watchProp(opened, (value) => {
    if (!f7Actions.current) return;
    if (value) {
      f7Actions.current.open();
    } else {
      f7Actions.current.close();
    }
  });

  const onMount = () => {
    if (!elRef.current) return;

    const {
      target,
      convertToPopover,
      forceToPopover,
      closeByBackdropClick,
      closeByOutsideClick,
      closeOnEscape,
      backdrop,
      backdropEl,
    } = props;

    const params = {
      el: elRef.current,
      grid,
      on: {
        open: onOpen,
        opened: onOpened,
        close: onClose,
        closed: onClosed,
      },
    };
    if (target) params.targetEl = target;
    if ('convertToPopover' in props) params.convertToPopover = convertToPopover;
    if ('forceToPopover' in props) params.forceToPopover = forceToPopover;
    if ('backdrop' in props) params.backdrop = backdrop;
    if ('backdropEl' in props) params.backdropEl = backdropEl;
    if ('closeByBackdropClick' in props) params.closeByBackdropClick = closeByBackdropClick;
    if ('closeByOutsideClick' in props) params.closeByOutsideClick = closeByOutsideClick;
    if ('closeOnEscape' in props) params.closeOnEscape = closeOnEscape;

    f7ready(() => {
      f7Actions.current = f7.actions.create(params);

      if (opened) {
        f7Actions.current.open(false);
      }
    });
  };

  const onDestroy = () => {
    if (f7Actions.current) f7Actions.current.destroy();
    f7Actions.current = null;
  };

  useLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const classes = classNames(
    className,
    'actions-modal',
    {
      'actions-grid': grid,
    },
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

Actions.displayName = 'f7-actions';

export default Actions;
