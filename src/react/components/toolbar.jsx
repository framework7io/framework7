import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { useTheme } from '../shared/use-theme';
import { f7ready, f7 } from '../shared/f7';
import { TabbarContext } from '../shared/tabbar-context';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  tabbar? : boolean
  labels? : boolean
  scrollable? : boolean
  hidden? : boolean
  noShadow? : boolean
  noHairline? : boolean
  noBorder? : boolean
  position? : string
  topMd? : boolean
  topIos? : boolean
  topAurora? : boolean
  top? : boolean
  bottomMd? : boolean
  bottomIos? : boolean
  bottomAurora? : boolean
  bottom? : boolean
  inner? : boolean
  COLOR_PROPS
  onToolbarHide? : (...args: any[]) => void
  onToolbarShow? : (...args: any[]) => void
  ref?: React.MutableRefObject<{el: HTMLElement | null; hide: () => void; show: () => void;}>;
*/

const Toolbar = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    tabbar,
    labels,
    scrollable,
    hidden,
    noShadow,
    noHairline,
    noBorder,
    position,
    topMd,
    topIos,
    topAurora,
    top,
    bottomMd,
    bottomIos,
    bottomAurora,
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
        (theme && theme.aurora && bottomAurora) ||
        bottom ||
        position === 'bottom',
      'toolbar-top':
        (theme && theme.md && topMd) ||
        (theme && theme.ios && topIos) ||
        (theme && theme.aurora && topAurora) ||
        top ||
        position === 'top',
      'tabbar-labels': labels,
      'tabbar-scrollable': scrollable,
      'toolbar-hidden': hidden,
      'no-shadow': noShadow,
      'no-hairline': noHairline || noBorder,
    },
    colorClasses(props),
  );

  const slots = getSlots(props);

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...extraAttrs}>
      <TabbarContext.Provider
        value={{
          tabbarHasLabels: labels,
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
