import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getDataAttrs } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7routers, f7, f7events } from '../shared/f7';
import { useTab } from '../shared/use-tab';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  COLOR_PROPS
  tabActive? : boolean
  onTabShow? : (el?: HTMLElement) => void
  onTabHide? : (el?: HTMLElement) => void
*/

const Tab = forwardRef((props, ref) => {
  const { className, id, style, children, tabActive } = props;

  const dataAttrs = getDataAttrs(props);

  const [tabContent, setTabContent] = useState(null);

  const elRef = useRef(null);
  const routerData = useRef(null);

  const show = (animate) => {
    if (!f7) return;
    f7.tab.show(elRef.current, animate);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    show,
  }));

  const onMount = () => {
    setTabContent(null);

    f7ready(() => {
      routerData.current = {
        el: elRef.current,
        setTabContent,
      };
      f7routers.tabs.push(routerData.current);
    });
  };

  const onDestroy = () => {
    if (!routerData.current) return;
    f7routers.tabs.splice(f7routers.tabs.indexOf(routerData.current), 1);
    routerData.current = null;
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!routerData.current || !f7) return;
    f7events.emit('tabRouterDidUpdate', routerData.current);
  });

  useTab(elRef, props);

  const classes = classNames(
    className,
    'tab',
    {
      'tab-active': tabActive,
    },
    colorClasses(props),
  );

  let TabContent;
  if (tabContent) TabContent = tabContent.component;
  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      {tabContent ? <TabContent key={tabContent.id} {...tabContent.props} /> : children}
    </div>
  );
});

Tab.displayName = 'f7-tab';

export default Tab;
