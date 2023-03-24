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

export const colorProps = {
  color: String,
  colorTheme: String,
  textColor: String,
  bgColor: String,
  borderColor: String,
  rippleColor: String,
  dark: Boolean,
};

export const iconProps = {
  icon: String,
  iconMaterial: String,
  iconF7: String,
  iconIos: String,
  iconMd: String,
  iconColor: String,
  iconSize: [String, Number],
  iconBadge: [String, Number],
  iconBadgeColor: String,
};

export const routerProps = {
  back: Boolean,
  external: Boolean,
  force: Boolean,
  animate: {
    type: Boolean,
    default: undefined,
  },
  ignoreCache: Boolean,
  reloadCurrent: Boolean,
  reloadAll: Boolean,
  reloadPrevious: Boolean,
  reloadDetail: {
    type: Boolean,
    default: undefined,
  },
  routeTabId: String,
  view: String,
  routeProps: Object,
  preventRouter: Boolean,
  transition: String,
  openIn: String,
};

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

export const actionsProps = {
  searchbarEnable: [Boolean, String],
  searchbarDisable: [Boolean, String],

  searchbarClear: [Boolean, String],
  searchbarToggle: [Boolean, String],

  // Panel
  panelOpen: [Boolean, String],
  panelClose: [Boolean, String],
  panelToggle: [Boolean, String],

  // Popup
  popupOpen: [Boolean, String],
  popupClose: [Boolean, String],

  // Actions
  actionsOpen: [Boolean, String],
  actionsClose: [Boolean, String],

  // Popover
  popoverOpen: [Boolean, String],
  popoverClose: [Boolean, String],

  // Login Screen
  loginScreenOpen: [Boolean, String],
  loginScreenClose: [Boolean, String],

  // Picker
  sheetOpen: [Boolean, String],
  sheetClose: [Boolean, String],

  // Sortable
  sortableEnable: [Boolean, String],
  sortableDisable: [Boolean, String],
  sortableToggle: [Boolean, String],

  // Card
  cardOpen: [Boolean, String],
  cardPreventOpen: [Boolean, String],
  cardClose: [Boolean, String],
};

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
