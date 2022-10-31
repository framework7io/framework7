import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect.js';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils.js';
import { colorClasses } from '../shared/mixins.js';
import { useTheme } from '../shared/use-theme.js';
import { f7ready, f7 } from '../shared/f7.js';
import { TabbarContext } from '../shared/tabbar-context.js';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  tabbar? : boolean
  icons? : boolean
  scrollable? : boolean
  hidden? : boolean
  outline? : boolean
  position? : string
  topMd? : boolean
  topIos? : boolean
  top? : boolean
  bottomMd? : boolean
  bottomIos? : boolean
  bottom? : boolean
  inner? : boolean
  COLOR_PROPS
  onToolbarHide? : (...args: any[]) => void
  onToolbarShow? : (...args: any[]) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; hide: () => void; show: () => void;}>;
  children?: React.ReactNode;
*/

const Toolbar = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    tabbar,
    icons,
    scrollable,
    hidden,
    outline = true,
    position,
    topMd,
    topIos,
    top,
    bottomMd,
    bottomIos,
    bottom,
    inner = true,
  } = props;
  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  const onHide = (toolbarEl) => {
    if (elRef.current !== toolbarEl) return;
    emit(props, 'toolbarHide');
  };
  const onShow = (toolbarEl) => {
    if (elRef.current !== toolbarEl) return;
    emit(props, 'toolbarShow');
  };
  const hide = (animate) => {
    if (!f7) return;
    f7.toolbar.hide(elRef.current, animate);
  };
  const show = (animate) => {
    if (!f7) return;
    f7.toolbar.show(elRef.current, animate);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    hide,
    show,
  }));

  useIsomorphicLayoutEffect(() => {
    f7ready(() => {
      if (tabbar && f7 && elRef.current) {
        f7.toolbar.setHighlight(elRef.current);
      }
      f7.on('toolbarShow', onShow);
      f7.on('toolbarHide', onHide);
    });
    return () => {
      if (!f7) return;
      f7.off('toolbarShow', onShow);
      f7.off('toolbarHide', onHide);
    };
  });

  const theme = useTheme();

  const classes = classNames(
    className,
    'toolbar',
    {
      tabbar,
      'toolbar-bottom':
        (theme && theme.md && bottomMd) ||
        (theme && theme.ios && bottomIos) ||
        bottom ||
        position === 'bottom',
      'toolbar-top':
        (theme && theme.md && topMd) || (theme && theme.ios && topIos) || top || position === 'top',
      'tabbar-icons': icons,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-outline': !outline,
    },
    colorClasses(props),
  );

  const slots = getSlots(props);

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <TabbarContext.Provider
        value={{
          tabbarHasIcons: icons,
        }}
      >
        {slots['before-inner']}
        {inner ? <div className="toolbar-inner">{slots.default}</div> : slots.default}
        {slots['after-inner']}
      </TabbarContext.Provider>
    </div>
  );
});

Toolbar.displayName = 'f7-toolbar';

export default Toolbar;
