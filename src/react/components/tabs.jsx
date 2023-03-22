import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { TabsSwipeableContext } from '../shared/tabs-swipeable-context.js';

/* dts-imports
import { SwiperOptions } from 'swiper';
*/
/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  animated? : boolean
  swipeable? : boolean
  routable? : boolean
  swiperParams? : SwiperOptions
  COLOR_PROPS
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
  children?: React.ReactNode;
*/

const Tabs = forwardRef((props, ref) => {
  const { className, id, style, children, animated, swipeable, routable, swiperParams } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  useIsomorphicLayoutEffect(() => {
    if (!swipeable || !swiperParams) return;
    if (!elRef.current) return;
    Object.assign(elRef.current, swiperParams);
    elRef.current.initialize();
  }, []);

  const classes = classNames(className, colorClasses(props));
  const tabsClasses = classNames({
    tabs: true,
    'tabs-routable': routable,
  });

  if (animated) {
    return (
      <div
        id={id}
        style={style}
        className={classNames('tabs-animated-wrap', classes)}
        ref={elRef}
        {...extraAttrs}
      >
        <div className={tabsClasses}>{children}</div>
      </div>
    );
  }
  if (swipeable) {
    return (
      <swiper-container
        id={id}
        style={style}
        class={classNames(tabsClasses, classes)}
        ref={elRef}
        init={swiperParams ? 'false' : 'true'}
        {...extraAttrs}
      >
        <TabsSwipeableContext.Provider value={true}>{children}</TabsSwipeableContext.Provider>
      </swiper-container>
    );
  }

  return (
    <div
      id={id}
      style={style}
      className={classNames(tabsClasses, classes)}
      ref={elRef}
      {...extraAttrs}
    >
      {children}
    </div>
  );
});

Tabs.displayName = 'f7-tabs';

export default Tabs;
