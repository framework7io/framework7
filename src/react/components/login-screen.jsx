import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { f7ready, f7 } from '../shared/f7.js';
import { watchProp } from '../shared/watch-prop.js';
import { modalStateClasses } from '../shared/modal-state-classes.js';

/* dts-imports
import { LoginScreen } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  opened?: boolean;
  animate?: boolean;
  containerEl? : string | object
  onLoginScreenOpen? : (instance: LoginScreen.LoginScreen) => void
  onLoginScreenOpened? : (instance: LoginScreen.LoginScreen) => void
  onLoginScreenClose? : (instance: LoginScreen.LoginScreen) => void
  onLoginScreenClosed? : (instance: LoginScreen.LoginScreen) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; f7LoginScreen: () => LoginScreen.LoginScreen}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const LoginScreen = forwardRef((props, ref) => {
  const f7LoginScreen = useRef(null);
  const { className, id, style, children, opened, animate, containerEl } = props;
  const extraAttrs = getExtraAttrs(props);

  const isOpened = useRef(opened);
  const isClosing = useRef(false);
  const elRef = useRef(null);

  const onOpen = (instance) => {
    isOpened.current = true;
    isClosing.current = false;
    emit(props, 'loginScreenOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'loginScreenOpened', instance);
  };
  const onClose = (instance) => {
    isOpened.current = false;
    isClosing.current = true;
    emit(props, 'loginScreenClose', instance);
  };
  const onClosed = (instance) => {
    isClosing.current = false;
    emit(props, 'loginScreenClosed', instance);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7LoginScreen: () => f7LoginScreen.current,
  }));

  // watch opened changes
  watchProp(opened, (value) => {
    if (!f7LoginScreen.current) return;
    if (value) {
      f7LoginScreen.current.open();
    } else {
      f7LoginScreen.current.close();
    }
  });

  const modalEvents = (method) => {
    if (!f7LoginScreen.current) return;
    f7LoginScreen.current[method]('open', onOpen);
    f7LoginScreen.current[method]('opened', onOpened);
    f7LoginScreen.current[method]('close', onClose);
    f7LoginScreen.current[method]('closed', onClosed);
  };

  const onMount = () => {
    if (!elRef.current) return;
    f7ready(() => {
      const loginScreenParams = {
        el: elRef.current,
      };
      if ('animate' in props) loginScreenParams.animate = animate;
      if ('containerEl' in props) loginScreenParams.containerEl = containerEl;

      f7LoginScreen.current = f7.loginScreen.create(loginScreenParams);
      modalEvents('on');
      if (opened) {
        f7LoginScreen.current.open(false);
      }
    });
  };

  const onDestroy = () => {
    if (f7LoginScreen.current) {
      f7LoginScreen.current.destroy();
    }
    f7LoginScreen.current = null;
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
    'login-screen',
    modalStateClasses({ isOpened, isClosing }),
    colorClasses(props),
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
    </div>
  );
});

LoginScreen.displayName = 'f7-login-screen';

export default LoginScreen;
