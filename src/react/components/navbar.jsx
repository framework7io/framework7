import React, { forwardRef, useRef, useImperativeHandle, useState, useEffect } from 'react';
import { classNames, getDataAttrs, emit, getSlots } from '../utils/utils';
import { colorClasses } from '../utils/mixins';
import { f7ready, f7 } from '../utils/f7';
import { useTheme } from '../utils/use-theme';

import NavLeft from './nav-left';
import NavTitle from './nav-title';
import NavRight from './nav-right';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  backLink? : boolean | string
  backLinkUrl? : string
  backLinkForce? : boolean
  backLinkShowText? : boolean
  sliding? : boolean
  title? : string
  subtitle? : string
  hidden? : boolean
  noShadow? : boolean
  noHairline? : boolean
  innerClass? : string
  innerClassName? : string
  large? : boolean
  largeTransparent? : boolean
  transparent? : boolean
  titleLarge? : string
  COLOR_PROPS
  onNavbarHide? : (...args: any[]) => void
  onNavbarShow? : (...args: any[]) => void
  onNavbarExpand? : (...args: any[]) => void
  onNavbarCollapse? : (...args: any[]) => void
  onNavbarTransparentShow? : (...args: any[]) => void
  onNavbarTransparentHide? : (...args: any[]) => void
  onBackClick? : (event?: any) => void
  onClickBack? : (event?: any) => void
*/

const Navbar = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    sliding = true,
    large,
    largeTransparent,
    transparent,
    hidden,
    noShadow,
    noHairline,
    backLink,
    backLinkForce,
    backLinkUrl,
    backLinkShowText,
    title,
    subtitle,
    titleLarge,
    innerClass,
    innerClassName,
  } = props;
  const [routerPositionClass, setRouterPositionClass] = useState('');
  const [largeCollapsed, setLargeCollapsed] = useState(false);
  const [routerNavbarRole, setRouterNavbarRole] = useState(null);
  const [routerNavbarRoleDetailRoot, setRouterNavbarRoleDetailRoot] = useState(false);
  const [routerNavbarMasterStack, setRouterNavbarMasterStack] = useState(false);
  const [transparentVisible, setTransparentVisible] = useState(false);
  const dataAttrs = getDataAttrs(props);

  const elRef = useRef(null);

  const theme = useTheme();

  const onHide = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    emit(props, 'navbarHide');
  };
  const onShow = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    emit(props, 'navbarShow');
  };
  const onExpand = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    setLargeCollapsed(false);
    emit(props, 'navbarExpand');
  };
  const onCollapse = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    setLargeCollapsed(true);
    emit(props, 'navbarCollapse');
  };
  const onNavbarTransparentShow = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    setTransparentVisible(true);
    emit(props, 'navbarTransparentShow');
  };
  const onNavbarTransparentHide = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    setTransparentVisible(false);
    emit(props, 'navbarTransparentHide');
  };
  const onNavbarPosition = (navbarEl, position) => {
    if (elRef.current !== navbarEl) return;
    setRouterPositionClass(position ? `navbar-${position}` : '');
  };
  const onNavbarRole = (navbarEl, rolesData) => {
    if (elRef.current !== navbarEl) return;
    setRouterNavbarRole(rolesData.role);
    setRouterNavbarRoleDetailRoot(rolesData.detailRoot);
  };
  const onNavbarMasterStack = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    setRouterNavbarMasterStack(true);
  };
  const onNavbarMasterUnstack = (navbarEl) => {
    if (elRef.current !== navbarEl) return;
    setRouterNavbarMasterStack(false);
  };
  const hide = (animate) => {
    if (!f7) return;
    f7.navbar.hide(elRef.current, animate);
  };
  const show = (animate) => {
    if (!f7) return;
    f7.navbar.show(elRef.current, animate);
  };
  const size = () => {
    if (!f7) return;
    f7.navbar.size(elRef.current);
  };
  const onBackClick = (event) => {
    emit(props, 'backClick clickBack', event);
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
    hide,
    show,
    size,
  }));

  const onMount = () => {
    if (!elRef.current) return;
    f7ready(() => {
      f7.on('navbarShow', onShow);
      f7.on('navbarHide', onHide);
      f7.on('navbarCollapse', onCollapse);
      f7.on('navbarExpand', onExpand);
      f7.on('navbarPosition', onNavbarPosition);
      f7.on('navbarRole', onNavbarRole);
      f7.on('navbarMasterStack', onNavbarMasterStack);
      f7.on('navbarMasterUnstack', onNavbarMasterUnstack);
      f7.on('navbarTransparentShow', onNavbarTransparentShow);
      f7.on('navbarTransparentHide', onNavbarTransparentHide);
    });
  };

  const onDestroy = () => {
    if (!f7) return;
    f7.off('navbarShow', onShow);
    f7.off('navbarHide', onHide);
    f7.off('navbarCollapse', onCollapse);
    f7.off('navbarExpand', onExpand);
    f7.off('navbarPosition', onNavbarPosition);
    f7.off('navbarRole', onNavbarRole);
    f7.off('navbarMasterStack', onNavbarMasterStack);
    f7.off('navbarMasterUnstack', onNavbarMasterUnstack);
    f7.off('navbarTransparentShow', onNavbarTransparentShow);
    f7.off('navbarTransparentHide', onNavbarTransparentHide);
  };

  useEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  useEffect(() => {
    if (!f7 || !elRef.current) return;
    f7.navbar.size(elRef.current);
  });

  const slots = getSlots(props);

  let leftEl;
  let titleEl;
  let rightEl;
  let titleLargeEl;

  const addLeftTitleClass = theme && theme.ios && f7 && !f7.params.navbar.iosCenterTitle;
  const addCenterTitleClass =
    (theme && theme.md && f7 && f7.params.navbar.mdCenterTitle) ||
    (theme && theme.aurora && f7 && f7.params.navbar.auroraCenterTitle);

  const isLarge = large || largeTransparent;
  const isTransparent = transparent || (isLarge && largeTransparent);
  const isTransparentVisible = isTransparent && transparentVisible;

  const classes = classNames(
    className,
    'navbar',
    routerPositionClass && routerPositionClass,
    {
      'navbar-hidden': hidden,
      'navbar-large': isLarge,
      'navbar-large-collapsed': isLarge && largeCollapsed,
      'navbar-transparent': isTransparent,
      'navbar-transparent-visible': isTransparentVisible,
      'navbar-master': routerNavbarRole === 'master',
      'navbar-master-detail': routerNavbarRole === 'detail',
      'navbar-master-detail-root': routerNavbarRoleDetailRoot === true,
      'navbar-master-stacked': routerNavbarMasterStack === true,
      'no-shadow': noShadow,
      'no-hairline': noHairline,
    },
    colorClasses(props),
  );

  if (backLink || slots['nav-left'] || slots.left) {
    leftEl = (
      <NavLeft
        backLink={backLink}
        backLinkUrl={backLinkUrl}
        backLinkForce={backLinkForce}
        backLinkShowText={backLinkShowText}
        onBackClick={onBackClick}
      >
        {slots['nav-left']}
        {slots.left}
      </NavLeft>
    );
  }
  if (title || subtitle || slots.title) {
    titleEl = (
      <NavTitle title={title} subtitle={subtitle}>
        {slots.title}
      </NavTitle>
    );
  }
  if (slots['nav-right'] || slots.right) {
    rightEl = (
      <NavRight>
        {slots['nav-right']}
        {slots.right}
      </NavRight>
    );
  }
  let largeTitle = titleLarge;
  if (!largeTitle && large && title) largeTitle = title;
  if (largeTitle || slots['title-large']) {
    titleLargeEl = (
      <div className="title-large">
        <div className="title-large-text">
          {largeTitle || ''}
          <slot name="title-large" />
        </div>
      </div>
    );
  }
  const innerEl = (
    <div
      className={classNames('navbar-inner', innerClass, innerClassName, {
        sliding,
        'navbar-inner-left-title': addLeftTitleClass,
        'navbar-inner-centered-title': addCenterTitleClass,
      })}
    >
      {leftEl}
      {titleEl}
      {rightEl}
      {titleLargeEl}
      {slots.default}
    </div>
  );

  return (
    <div id={id} style={style} className={classes} ref={elRef} {...dataAttrs}>
      <div className="navbar-bg" />
      {slots['before-inner']}
      {innerEl}
      {slots['after-inner']}
    </div>
  );
});

Navbar.displayName = 'f7-navbar';

export default Navbar;
