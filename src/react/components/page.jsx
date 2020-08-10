import React, { forwardRef, useRef, useImperativeHandle, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../shared/use-isomorphic-layout-effect';
import { classNames, getExtraAttrs, getSlots, emit } from '../shared/utils';
import { colorClasses } from '../shared/mixins';
import { f7ready, f7 } from '../shared/f7';

import PageContent from './page-content';

/* dts-props
  id?: string | number;
  className?: string;
  style?: React.CSSProperties;
  name? : string
  stacked? : boolean
  withSubnavbar? : boolean
  subnavbar? : boolean
  withNavbarLarge? : boolean
  navbarLarge? : boolean
  noNavbar? : boolean
  noToolbar? : boolean
  tabs? : boolean
  pageContent? : boolean
  noSwipeback? : boolean
  ptr? : boolean
  ptrDistance? : number
  ptrPreloader? : boolean
  ptrBottom? : boolean
  ptrMousewheel? : boolean
  infinite? : boolean
  infiniteTop? : boolean
  infiniteDistance? : number
  infinitePreloader? : boolean
  hideBarsOnScroll? : boolean
  hideNavbarOnScroll? : boolean
  hideToolbarOnScroll? : boolean
  messagesContent? : boolean
  loginScreen? : boolean
  COLOR_PROPS
  onPtrPullStart? : (...args: any[]) => void
  onPtrPullMove? : (...args: any[]) => void
  onPtrPullEnd? : (...args: any[]) => void
  onPtrRefresh? : (...args: any[]) => void
  onPtrDone? : (...args: any[]) => void
  onInfinite? : (...args: any[]) => void
  onPageMounted? : (page?: any) => void
  onPageInit? : (page?: any) => void
  onPageReinit? : (page?: any) => void
  onPageBeforeIn? : (page?: any) => void
  onPageBeforeOut? : (page?: any) => void
  onPageAfterOut? : (page?: any) => void
  onPageAfterIn? : (page?: any) => void
  onPageBeforeRemove? : (page?: any) => void
  onPageBeforeUnmount? : (page?: any) => void
  onPageTabShow? : (...args: any[]) => void
  onPageTabHide? : (...args: any[]) => void
*/

const Page = forwardRef((props, ref) => {
  const {
    className,
    id,
    style,
    name,
    stacked,
    withSubnavbar,
    subnavbar,
    withNavbarLarge,
    navbarLarge,
    noNavbar,
    noToolbar,
    tabs,
    pageContent = true,
    noSwipeback,
    ptr,
    ptrDistance,
    ptrPreloader = true,
    ptrBottom,
    ptrMousewheel,
    infinite,
    infiniteTop,
    infiniteDistance,
    infinitePreloader = true,
    hideBarsOnScroll,
    hideNavbarOnScroll,
    hideToolbarOnScroll,
    messagesContent,
    loginScreen,

    onPtrPullStart,
    onPtrPullMove,
    onPtrPullEnd,
    onPtrRefresh,
    onPtrDone,
    onInfinite,
  } = props;

  const [hasSubnavbar, setHasSubnavbar] = useState(false);
  const [hasNavbarLarge, setHasNavbarLarge] = useState(false);
  const [hasNavbarLargeCollapsed, setHasNavbarLargeCollapsed] = useState(false);
  const [hasCardExpandableOpened, setHasCardExpandableOpened] = useState(false);
  const [routerPositionClass, setRouterPositionClass] = useState('');
  const [routerForceUnstack, setRouterForceUnstack] = useState(false);
  const [routerPageRole, setRouterPageRole] = useState(null);
  const [routerPageRoleDetailRoot, setRouterPageRoleDetailRoot] = useState(false);
  const [routerPageMasterStack, setRouterPageMasterStack] = useState(false);

  const extraAttrs = getExtraAttrs(props);

  const elRef = useRef(null);

  // Main Page Events
  const onPageMounted = (page) => {
    if (elRef.current !== page.el) return;
    emit(props, 'pageMounted', page);
  };
  const onPageInit = (page) => {
    if (elRef.current !== page.el) return;
    if (typeof withSubnavbar === 'undefined' && typeof subnavbar === 'undefined') {
      if (
        (page.$navbarEl && page.$navbarEl.length && page.$navbarEl.find('.subnavbar').length) ||
        page.$el.children('.navbar').find('.subnavbar').length
      ) {
        setHasSubnavbar(true);
      }
    }

    if (typeof withNavbarLarge === 'undefined' && typeof navbarLarge === 'undefined') {
      if (page.$navbarEl && page.$navbarEl.hasClass('navbar-large')) {
        setHasNavbarLarge(true);
      }
    }

    emit(props, 'pageInit', page);
  };
  const onPageReinit = (page) => {
    if (elRef.current !== page.el) return;
    emit(props, 'pageReinit', page);
  };
  const onPageBeforeIn = (page) => {
    if (elRef.current !== page.el) return;
    if (!page.swipeBack) {
      if (page.from === 'next') {
        setRouterPositionClass('page-next');
      }
      if (page.from === 'previous') {
        setRouterPositionClass('page-previous');
      }
    }
    emit(props, 'pageBeforeIn', page);
  };
  const onPageBeforeOut = (page) => {
    if (elRef.current !== page.el) return;
    emit(props, 'pageBeforeOut', page);
  };
  const onPageAfterOut = (page) => {
    if (elRef.current !== page.el) return;
    if (page.to === 'next') {
      setRouterPositionClass('page-next');
    }
    if (page.to === 'previous') {
      setRouterPositionClass('page-previous');
    }
    emit(props, 'pageAfterOut', page);
  };
  const onPageAfterIn = (page) => {
    if (elRef.current !== page.el) return;
    setRouterPositionClass('page-current');
    emit(props, 'pageAfterIn', page);
  };
  const onPageBeforeRemove = (page) => {
    if (elRef.current !== page.el) return;
    emit(props, 'pageBeforeRemove', page);
  };
  const onPageBeforeUnmount = (page) => {
    if (elRef.current !== page.el) return;
    emit(props, 'pageBeforeUnmount', page);
  };
  // Helper events
  const onPageStack = (pageEl) => {
    if (elRef.current !== pageEl) return;
    setRouterForceUnstack(false);
  };
  const onPageUnstack = (pageEl) => {
    if (elRef.current !== pageEl) return;
    setRouterForceUnstack(true);
  };
  const onPagePosition = (pageEl, position) => {
    if (elRef.current !== pageEl) return;
    setRouterPositionClass(`page-${position}`);
  };
  const onPageRole = (pageEl, rolesData) => {
    if (elRef.current !== pageEl) return;
    setRouterPageRole(rolesData.role);
    setRouterPageRoleDetailRoot(rolesData.detailRoot);
  };
  const onPageMasterStack = (pageEl) => {
    if (elRef.current !== pageEl) return;
    setRouterPageMasterStack(true);
  };
  const onPageMasterUnstack = (pageEl) => {
    if (elRef.current !== pageEl) return;
    setRouterPageMasterStack(false);
  };
  const onPageNavbarLargeCollapsed = (pageEl) => {
    if (elRef.current !== pageEl) return;
    setHasNavbarLargeCollapsed(true);
  };
  const onPageNavbarLargeExpanded = (pageEl) => {
    if (elRef.current !== pageEl) return;
    setHasNavbarLargeCollapsed(false);
  };
  const onCardOpened = (cardEl, pageEl) => {
    if (elRef.current !== pageEl) return;
    setHasCardExpandableOpened(true);
  };
  const onCardClose = (cardEl, pageEl) => {
    if (elRef.current !== pageEl) return;
    setHasCardExpandableOpened(false);
  };
  const onPageTabShow = (pageEl) => {
    if (elRef.current !== pageEl) return;
    emit(props, 'pageTabShow');
  };
  const onPageTabHide = (pageEl) => {
    if (elRef.current !== pageEl) return;
    emit(props, 'pageTabHide');
  };

  useImperativeHandle(ref, () => ({
    el: elRef.current,
  }));

  const onMount = () => {
    f7ready(() => {
      f7.on('pageMounted', onPageMounted);
      f7.on('pageInit', onPageInit);
      f7.on('pageReinit', onPageReinit);
      f7.on('pageBeforeIn', onPageBeforeIn);
      f7.on('pageBeforeOut', onPageBeforeOut);
      f7.on('pageAfterOut', onPageAfterOut);
      f7.on('pageAfterIn', onPageAfterIn);
      f7.on('pageBeforeRemove', onPageBeforeRemove);
      f7.on('pageBeforeUnmount', onPageBeforeUnmount);
      f7.on('pageStack', onPageStack);
      f7.on('pageUnstack', onPageUnstack);
      f7.on('pagePosition', onPagePosition);
      f7.on('pageRole', onPageRole);
      f7.on('pageMasterStack', onPageMasterStack);
      f7.on('pageMasterUnstack', onPageMasterUnstack);
      f7.on('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
      f7.on('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
      f7.on('cardOpened', onCardOpened);
      f7.on('cardClose', onCardClose);
      f7.on('pageTabShow', onPageTabShow);
      f7.on('pageTabHide', onPageTabHide);
    });
  };

  const onDestroy = () => {
    if (!f7) return;
    f7.off('pageMounted', onPageMounted);
    f7.off('pageInit', onPageInit);
    f7.off('pageReinit', onPageReinit);
    f7.off('pageBeforeIn', onPageBeforeIn);
    f7.off('pageBeforeOut', onPageBeforeOut);
    f7.off('pageAfterOut', onPageAfterOut);
    f7.off('pageAfterIn', onPageAfterIn);
    f7.off('pageBeforeRemove', onPageBeforeRemove);
    f7.off('pageBeforeUnmount', onPageBeforeUnmount);
    f7.off('pageStack', onPageStack);
    f7.off('pageUnstack', onPageUnstack);
    f7.off('pagePosition', onPagePosition);
    f7.off('pageRole', onPageRole);
    f7.off('pageMasterStack', onPageMasterStack);
    f7.off('pageMasterUnstack', onPageMasterUnstack);
    f7.off('pageNavbarLargeCollapsed', onPageNavbarLargeCollapsed);
    f7.off('pageNavbarLargeExpanded', onPageNavbarLargeExpanded);
    f7.off('cardOpened', onCardOpened);
    f7.off('cardClose', onCardClose);
    f7.off('pageTabShow', onPageTabShow);
    f7.off('pageTabHide', onPageTabHide);
  };

  useIsomorphicLayoutEffect(() => {
    onMount();
    return onDestroy;
  }, []);

  const slots = getSlots(props);

  const fixedList = [];
  const staticList = [];

  const { static: slotsStatic, fixed: slotsFixed, default: slotsDefault } = slots;

  const fixedTags = 'navbar toolbar tabbar subnavbar searchbar messagebar fab list-index'
    .split(' ')
    .map((tagName) => `f7-${tagName}`);

  let hasSubnavbarComputed;
  let hasNavbarLargeComputed;
  let hasMessages = messagesContent;

  if (slotsDefault) {
    slotsDefault.forEach((child) => {
      if (typeof child === 'undefined') return;
      let isFixedTag = false;
      const tag = child.type && (child.type.displayName || child.type.name);
      if (!tag) {
        if (pageContent) staticList.push(child);
        return;
      }
      if (tag === 'f7-subnavbar') hasSubnavbarComputed = true;
      if (tag === 'f7-navbar') {
        if (child.props && child.props.large) hasNavbarLargeComputed = true;
      }
      if (typeof hasMessages === 'undefined' && tag === 'f7-messages') hasMessages = true;
      if (fixedTags.indexOf(tag) >= 0) {
        isFixedTag = true;
      }

      if (pageContent) {
        if (isFixedTag) fixedList.push(child);
        else staticList.push(child);
      }
    });
  }

  const forceSubnavbar =
    typeof subnavbar === 'undefined' && typeof withSubnavbar === 'undefined'
      ? hasSubnavbarComputed || hasSubnavbar
      : false;

  const forceNavbarLarge =
    typeof navbarLarge === 'undefined' && typeof withNavbarLarge === 'undefined'
      ? hasNavbarLargeComputed || hasNavbarLarge
      : false;

  const classes = classNames(
    className,
    'page',
    routerPositionClass,
    {
      stacked: stacked && !routerForceUnstack,
      tabs,
      'page-with-subnavbar': subnavbar || withSubnavbar || forceSubnavbar,
      'page-with-navbar-large': navbarLarge || withNavbarLarge || forceNavbarLarge,
      'no-navbar': noNavbar,
      'no-toolbar': noToolbar,
      'no-swipeback': noSwipeback,
      'page-master': routerPageRole === 'master',
      'page-master-detail': routerPageRole === 'detail',
      'page-master-detail-root': routerPageRoleDetailRoot === true,
      'page-master-stacked': routerPageMasterStack === true,
      'page-with-navbar-large-collapsed': hasNavbarLargeCollapsed === true,
      'page-with-card-opened': hasCardExpandableOpened === true,
      'login-screen-page': loginScreen,
    },
    colorClasses(props),
  );

  if (!pageContent) {
    return (
      <div id={id} style={style} className={classes} data-name={name} ref={elRef} {...extraAttrs}>
        {slotsFixed}
        {slotsStatic}
        {slotsDefault}
      </div>
    );
  }

  const pageContentEl = (
    <PageContent
      ptr={ptr}
      ptrDistance={ptrDistance}
      ptrPreloader={ptrPreloader}
      ptrBottom={ptrBottom}
      ptrMousewheel={ptrMousewheel}
      infinite={infinite}
      infiniteTop={infiniteTop}
      infiniteDistance={infiniteDistance}
      infinitePreloader={infinitePreloader}
      hideBarsOnScroll={hideBarsOnScroll}
      hideNavbarOnScroll={hideNavbarOnScroll}
      hideToolbarOnScroll={hideToolbarOnScroll}
      messagesContent={messagesContent || hasMessages}
      loginScreen={loginScreen}
      onPtrPullStart={onPtrPullStart}
      onPtrPullMove={onPtrPullMove}
      onPtrPullEnd={onPtrPullEnd}
      onPtrRefresh={onPtrRefresh}
      onPtrDone={onPtrDone}
      onInfinite={onInfinite}
    >
      {slotsStatic}
      {staticList}
    </PageContent>
  );

  return (
    <div id={id} style={style} className={classes} data-name={name} ref={elRef} {...extraAttrs}>
      {fixedList}
      {slotsFixed}
      {pageContentEl}
    </div>
  );
});

Page.displayName = 'f7-page';

export default Page;
