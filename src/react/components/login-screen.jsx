import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getDataAttrs, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';
import { watchProp } from '../shared/watch-prop';

/* dts-imports
import { LoginScreen } from 'framework7/types';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  opened?: boolean;
  onLoginScreenOpen? : (instance: LoginScreen.LoginScreen) => void
  onLoginScreenOpened? : (instance: LoginScreen.LoginScreen) => void
  onLoginScreenClose? : (instance: LoginScreen.LoginScreen) => void
  onLoginScreenClosed? : (instance: LoginScreen.LoginScreen) => void
  COLOR_PROPS
*/

const LoginScreen = forwardRef((props, ref) => {
  const f7LoginScreen = useRef(null);
  const { className, id, style, children, opened } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const onOpen = (instance) => {
    emit(props, 'loginScreenOpen', instance);
  };
  const onOpened = (instance) => {
    emit(props, 'loginScreenOpened', instance);
  };
  const onClose = (instance) => {
    emit(props, 'loginScreenClose', instance);
  };
  const onClosed = (instance) => {
    emit(props, 'loginScreenClosed', instance);
  };
  const open = (animate) => {
    if (!f7LoginScreen.current) return undefined;
    return f7LoginScreen.current.open(animate);
  };
  const close = (animate) => {
    if (!f7LoginScreen.current) return undefined;
    return f7LoginScreen.current.close(animate);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    f7LoginScreen: () => f7LoginScreen.current,
    open,
    close,
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

  const onMount = () => {
    if (!elRef.current) return;
    f7ready(() => {
      f7LoginScreen.current = f7.loginScreen.create({
        el: elRef.current,
        on: {
          open: onOpen,
          opened: onOpened,
          close: onClose,
          closed: onClosed,
        },
      });
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
    onMount();
    return onDestroy;
  }, []);

  const classes = classNames(className, 'login-screen', colorClasses(props));

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
    </div>
  );
});

LoginScreen.displayName = 'f7-login-screen';

export default LoginScreen;
