import React, { forwardRef, useRef, useImperativeHandle, useEffect } from 'react';
import { classNames, getDataAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';

import RoutableModals from './routable-modals';
import { f7init, f7 } from '../shared/f7';

/* dts-imports
  import { Router, Framework7Parameters } from 'framework7/types';
*/

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  params?: Framework7Parameters
  routes?: Router.RouteParameters[]
  COLOR_PROPS
*/

const App = forwardRef((props, ref) => {
  const { className, id, style, children, params, routes } = props;
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'framework7-root', colorClasses(props));

  useEffect(() => {
    const parentEl = elRef.current && elRef.current.parentNode;
    /* eslint-disable no-restricted-globals */
    if (
      typeof document !== 'undefined' &&
      parentEl &&
      parentEl !== document.body &&
      parentEl.parentNode === document.body
    ) {
      parentEl.style.height = '100%';
    }
    /* eslint-enable no-restricted-globals */
    if (f7) return;
    f7init(elRef.current, params, routes);
  }, []);

  return (
    <div id={id || 'framework7-root'} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {children}
      <RoutableModals />
    </div>
  );
});

App.displayName = 'f7-app';

export default App;
