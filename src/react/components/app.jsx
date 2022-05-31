import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

import RoutableModals from './routable-modals.js';
import { f7init, f7 } from '../shared/f7.js';

/* dts-imports
  import { Framework7Parameters } from 'framework7/types';
*/

/* dts-extends
  Framework7Parameters
*/

/* dts-props
  className?: string;
  style?: React.CSSProperties;
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
  COLOR_PROPS
*/

const App = forwardRef((props, ref) => {
  const { className, style, children, ...rest } = props;
  const extraAttrs = getExtraAttrs(props);
  const params = rest;

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const classes = classNames(className, 'framework7-root', colorClasses(props));

  // eslint-disable-next-line
  if (!f7 || typeof window === 'undefined') {
    f7init(elRef.current, params, false);
  }

  useIsomorphicLayoutEffect(() => {
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
    if (f7) {
      f7.init(elRef.current);
      return;
    }
    f7init(elRef.current, params, true);
  }, []);

  return (
    <div id="framework7-root" style={style} className={classes} ref={elRef} {...extraAttrs}>
      {children}
      <RoutableModals />
    </div>
  );
});

App.displayName = 'f7-app';

export default App;
