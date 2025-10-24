import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';

import RoutableModals from './routable-modals.js';
import { f7init, f7 } from '../shared/f7.js';
import { setRef } from '../shared/set-ref.js';

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

const App = (props) => {
  const { className, style, children, ref, ...rest } = props;
  const extraAttrs = getExtraAttrs(props);
  const params = rest;

  const elRef = useRef(null);

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
    <div
      id="framework7-root"
      style={style}
      className={classes}
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {children}
      <RoutableModals />
    </div>
  );
};

App.displayName = 'f7-app';

export default App;
