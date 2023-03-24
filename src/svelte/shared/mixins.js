import { isStringProp } from './utils.js';

export function colorClasses(props) {
  const { color, textColor, bgColor, borderColor, rippleColor, dark } = props;

  return {
    dark,
    [`color-${color}`]: color,
    [`text-color-${textColor}`]: textColor,
    [`bg-color-${bgColor}`]: bgColor,
    [`border-color-${borderColor}`]: borderColor,
    [`ripple-color-${rippleColor}`]: rippleColor,
  };
}

export function routerAttrs(props) {
  const {
    force,
    reloadCurrent,
    reloadPrevious,
    reloadAll,
    reloadDetail,
    animate,
    ignoreCache,
    routeTabId,
    view,
    transition,
    openIn,
  } = props;

  let dataAnimate;
  if ('animate' in props && typeof animate !== 'undefined') {
    dataAnimate = animate.toString();
  }

  let dataReloadDetail;
  if ('reloadDetail' in props && typeof reloadDetail !== 'undefined') {
    dataReloadDetail = reloadDetail.toString();
  }

  return {
    'data-force': force || undefined,
    'data-reload-current': reloadCurrent || undefined,
    'data-reload-all': reloadAll || undefined,
    'data-reload-previous': reloadPrevious || undefined,
    'data-reload-detail': dataReloadDetail,
    'data-animate': dataAnimate,
    'data-ignore-cache': ignoreCache || undefined,
    'data-route-tab-id': routeTabId || undefined,
    'data-view': isStringProp(view) ? view : undefined,
    'data-transition': isStringProp(transition) ? transition : undefined,
    'data-open-in': isStringProp(openIn) ? openIn : undefined,
  };
}
export function routerClasses(props) {
  const { back, linkBack, external, preventRouter } = props;

  return {
    back: back || linkBack,
    external,
    'prevent-router': preventRouter,
  };
}

export function actionsAttrs(props) {
  const {
    searchbarEnable,
    searchbarDisable,
    searchbarClear,
    searchbarToggle,
    panelOpen,
    panelClose,
    panelToggle,
    popupOpen,
    popupClose,
    actionsOpen,
    actionsClose,
    popoverOpen,
    popoverClose,
    loginScreenOpen,
    loginScreenClose,
    sheetOpen,
    sheetClose,
    sortableEnable,
    sortableDisable,
    sortableToggle,
    cardOpen,
    cardClose,
  } = props;

  return {
    'data-searchbar':
      (isStringProp(searchbarEnable) && searchbarEnable) ||
      (isStringProp(searchbarDisable) && searchbarDisable) ||
      (isStringProp(searchbarClear) && searchbarClear) ||
      (isStringProp(searchbarToggle) && searchbarToggle) ||
      undefined,
    'data-panel':
      (isStringProp(panelOpen) && panelOpen) ||
      (isStringProp(panelClose) && panelClose) ||
      (isStringProp(panelToggle) && panelToggle) ||
      undefined,
    'data-popup':
      (isStringProp(popupOpen) && popupOpen) ||
      (isStringProp(popupClose) && popupClose) ||
      undefined,
    'data-actions':
      (isStringProp(actionsOpen) && actionsOpen) ||
      (isStringProp(actionsClose) && actionsClose) ||
      undefined,
    'data-popover':
      (isStringProp(popoverOpen) && popoverOpen) ||
      (isStringProp(popoverClose) && popoverClose) ||
      undefined,
    'data-sheet':
      (isStringProp(sheetOpen) && sheetOpen) ||
      (isStringProp(sheetClose) && sheetClose) ||
      undefined,
    'data-login-screen':
      (isStringProp(loginScreenOpen) && loginScreenOpen) ||
      (isStringProp(loginScreenClose) && loginScreenClose) ||
      undefined,
    'data-sortable':
      (isStringProp(sortableEnable) && sortableEnable) ||
      (isStringProp(sortableDisable) && sortableDisable) ||
      (isStringProp(sortableToggle) && sortableToggle) ||
      undefined,
    'data-card':
      (isStringProp(cardOpen) && cardOpen) || (isStringProp(cardClose) && cardClose) || undefined,
  };
}
export function actionsClasses(props) {
  const {
    searchbarEnable,
    searchbarDisable,
    searchbarClear,
    searchbarToggle,
    panelOpen,
    panelClose,
    panelToggle,
    popupOpen,
    popupClose,
    actionsClose,
    actionsOpen,
    popoverOpen,
    popoverClose,
    loginScreenOpen,
    loginScreenClose,
    sheetOpen,
    sheetClose,
    sortableEnable,
    sortableDisable,
    sortableToggle,
    cardOpen,
    cardPreventOpen,
    cardClose,
  } = props;

  return {
    'searchbar-enable': searchbarEnable || searchbarEnable === '',
    'searchbar-disable': searchbarDisable || searchbarDisable === '',
    'searchbar-clear': searchbarClear || searchbarClear === '',
    'searchbar-toggle': searchbarToggle || searchbarToggle === '',
    'panel-close': panelClose || panelClose === '',
    'panel-open': panelOpen || panelOpen === '',
    'panel-toggle': panelToggle || panelToggle === '',
    'popup-close': popupClose || popupClose === '',
    'popup-open': popupOpen || popupOpen === '',
    'actions-close': actionsClose || actionsClose === '',
    'actions-open': actionsOpen || actionsOpen === '',
    'popover-close': popoverClose || popoverClose === '',
    'popover-open': popoverOpen || popoverOpen === '',
    'sheet-close': sheetClose || sheetClose === '',
    'sheet-open': sheetOpen || sheetOpen === '',
    'login-screen-close': loginScreenClose || loginScreenClose === '',
    'login-screen-open': loginScreenOpen || loginScreenOpen === '',
    'sortable-enable': sortableEnable || sortableEnable === '',
    'sortable-disable': sortableDisable || sortableDisable === '',
    'sortable-toggle': sortableToggle || sortableToggle === '',
    'card-close': cardClose || cardClose === '',
    'card-open': cardOpen || cardOpen === '',
    'card-prevent-open': cardPreventOpen || cardPreventOpen === '',
  };
}
