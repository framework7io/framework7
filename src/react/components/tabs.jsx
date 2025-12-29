import React, { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { TabsSwipeableContext } from '../shared/tabs-swipeable-context.js';
import { f7ready, f7 } from '../shared/f7.js';
import { setRef } from '../shared/set-ref.js';
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

const Tabs = (props) => {
  const { className, id, style, children, animated, swipeable, routable, swiperParams, ref } =
    props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    if (!swipeable || !swiperParams) return;
    if (!elRef.current) return;
    Object.assign(elRef.current, swiperParams);
    elRef.current.initialize();
    f7ready(() => {
      // It only initializes in pageInit callback
      // We may need to manually call init() to update the instance
      f7.swiper.init(elRef.current)
    });
  }, []);

  const classes = classNames(className, colorClasses(props));
  const tabsClasses = classNames({ tabs: true, 'tabs-routable': routable });

  if (animated) {
    return (
      <div
        id={id}
        style={style}
        className={classNames('tabs-animated-wrap', classes)}
        ref={(el) => {
          elRef.current = el;
          setRef(ref, el);
        }}
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
        ref={(el) => {
          elRef.current = el;
          setRef(ref, el);
        }}
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
      ref={(el) => {
        elRef.current = el;
        setRef(ref, el);
      }}
      {...extraAttrs}
    >
      {children}
    </div>
  );
};

Tabs.displayName = 'f7-tabs';

export default Tabs;
