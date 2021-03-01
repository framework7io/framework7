import React, { forwardRef, useRef, useImperativeHandle, useState, useContext } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs, getComponentId } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7routers, f7, f7events } from '../shared/f7';
import { useTab } from '../shared/use-tab';
import { RouterContext } from '../shared/router-context';
import { useAsyncComponent } from '../shared/use-async-component';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  COLOR_PROPS
  tabActive? : boolean
  onTabShow? : (el?: HTMLElement) => void
  onTabHide? : (el?: HTMLElement) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null}>;
*/

const Tab = forwardRef((props, ref) => {
  const { className, id, style, children, tabActive } = props;

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);
  const routerData = useRef(null);

  const routerContext = useContext(RouterContext);

  let initialTabContent = null;

  if (
    !routerData.current &&
    routerContext &&
    routerContext.route &&
    routerContext.route.route &&
    routerContext.route.route.tab &&
    routerContext.route.route.tab.id === id
  ) {
    const { component, asyncComponent } = routerContext.route.route.tab;
    if (component || asyncComponent) {
      initialTabContent = {
        id: getComponentId(),
        component: component || asyncComponent,
        isAsync: !!asyncComponent,
        props: {
          f7router: routerContext.router,
          f7route: routerContext.route,
          ...routerContext.route.params,
        },
      };
    }
  }

  const [tabContent, setTabContent] = useState(initialTabContent || null);

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  if (f7 && !routerData.current) {
    routerData.current = {
      setTabContent,
    };
    f7routers.tabs.push(routerData.current);
  }

  const onMount = () => {
    if (elRef.current && initialTabContent) {
      elRef.current.f7RouterTabLoaded = true;
    }
    f7ready(() => {
      if (!routerData.current) {
        routerData.current = {
          el: elRef.current,
          setTabContent,
        };
        f7routers.tabs.push(routerData.current);
      } else {
        routerData.current.el = elRef.current;
      }
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

  const renderChildren = () => {
    if (!tabContent) return children;
    if (tabContent.isAsync) {
      return useAsyncComponent(tabContent.component, tabContent.props, tabContent.id);
    }
    const TabContent = tabContent.component;
    return <TabContent key={tabContent.id} {...tabContent.props} />;
  };

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      {renderChildren()}
    </div>
  );
});

Tab.displayName = 'f7-tab';

export default Tab;
