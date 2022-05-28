import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7, f7ready } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';
import { modalStateClasses } from '../shared/modal-state-classes.js';

/* dts-imports
import { Actions } from 'framework7/types';
*/

/* dts-props
  id: string | number;
  className: string;
  style: React.CSSProperties;
  opened? : boolean
  animate? : boolean
  grid? : boolean
  convertToPopover? : boolean
  forceToPopover? : boolean
  target? : string | object
  backdrop? : boolean
  backdropEl? : string | object
  closeByBackdropClick? : boolean
  closeByOutsideClick? : boolean
  closeOnEscape? : boolean
  onActionsOpen? : (instance?: Actions.Actions) => void
  onActionsOpened? : (instance?: Actions.Actions) => void
  onActionsClose? : (instance?: Actions.Actions) => void
  onActionsClosed? : (instance?: Actions.Actions) => void
  containerEl? : string | object
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7Actions: () => Actions.Actions}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const Actions = forwardRef((props, ref) => {
  const { className, id, style, children, grid, opened = false, animate } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const isOpened = useRef(opened);
  const isClosing = useRef(false);
  const f7Actions = useRef(null);

  const onOpen = (instance) => {
    isOpened.current = true;
    isClosing.current = false;
    emit(props, 'actionsOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'actionsOpened', instance);
  };
  const onClose = (instance) => {
    isOpened.current = false;
    isClosing.current = true;
    emit(props, 'actionsClose', instance);
  };
  const onClosed = (instance) => {
    isClosing.current = false;
    emit(props, 'actionsClosed', instance);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7Actions: () => f7Actions.current,
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

  const modalEvents = (method) => {
    if (!f7Actions.current) return;
    f7Actions.current[method]('open', onOpen);
    f7Actions.current[method]('opened', onOpened);
    f7Actions.current[method]('close', onClose);
    f7Actions.current[method]('closed', onClosed);
  };

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
      containerEl,
    } = props;

    const params = {
      el: elRef.current,
      grid,
    };
    if (target) params.targetEl = target;
    if ('convertToPopover' in props) params.convertToPopover = convertToPopover;
    if ('forceToPopover' in props) params.forceToPopover = forceToPopover;
    if ('backdrop' in props) params.backdrop = backdrop;
    if ('backdropEl' in props) params.backdropEl = backdropEl;
    if ('closeByBackdropClick' in props) params.closeByBackdropClick = closeByBackdropClick;
    if ('closeByOutsideClick' in props) params.closeByOutsideClick = closeByOutsideClick;
    if ('closeOnEscape' in props) params.closeOnEscape = closeOnEscape;
    if ('animate' in props) params.animate = animate;
    if ('containerEl' in props) params.containerEl = containerEl;

    f7ready(() => {
      f7Actions.current = f7.actions.create(params);
      modalEvents('on');

      if (opened) {
        f7Actions.current.open(false);
      }
    });
  };

  const onDestroy = () => {
    if (f7Actions.current) f7Actions.current.destroy();
    f7Actions.current = null;
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
    'actions-modal',
    {
      'actions-grid': grid,
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

Actions.displayName = 'f7-actions';

export default Actions;
