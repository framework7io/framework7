import Utils from './utils';

const Mixins = {
  colorProps: {
    color: String,
    colorTheme: String,
    textColor: String,
    bgColor: String,
    borderColor: String,
    rippleColor: String,
    themeDark: Boolean,
  },
  colorClasses(props) {
    const {
      color,
      colorTheme,
      textColor,
      bgColor,
      borderColor,
      rippleColor,
      themeDark,
    } = props;

    return {
      'theme-dark': themeDark,
      [`color-${color}`]: color,
      [`color-theme-${colorTheme}`]: colorTheme,
      [`text-color-${textColor}`]: textColor,
      [`bg-color-${bgColor}`]: bgColor,
      [`border-color-${borderColor}`]: borderColor,
      [`ripple-color-${rippleColor}`]: rippleColor,
    };
  },
  linkIconProps: {
    icon: String,
    iconMaterial: String,
    iconIon: String,
    iconFa: String,
    iconF7: String,
    iconIos: String,
    iconMd: String,
    iconAurora: String,
    iconColor: String,
    iconSize: [String, Number],
  },
  linkRouterProps: {
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
  },
  linkRouterAttrs(props) {
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
      'data-view': Utils.isStringProp(view) ? view : undefined,
    };
  },
  linkRouterClasses(props) {
    const { back, linkBack, external, preventRouter } = props;

    return {
      back: back || linkBack,
      external,
      'prevent-router': preventRouter,
    };
  },
  linkActionsProps: {
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

    // Menu
    menuClose: {
      type: [Boolean, String],
      default: undefined,
    },
  },
  linkActionsAttrs(props) {
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
      'data-searchbar': (Utils.isStringProp(searchbarEnable) && searchbarEnable)
                        || (Utils.isStringProp(searchbarDisable) && searchbarDisable)
                        || (Utils.isStringProp(searchbarClear) && searchbarClear)
                        || (Utils.isStringProp(searchbarToggle) && searchbarToggle) || undefined,
      'data-panel': (Utils.isStringProp(panelOpen) && panelOpen)
                    || (Utils.isStringProp(panelClose) && panelClose)
                    || (Utils.isStringProp(panelToggle) && panelToggle) || undefined,
      'data-popup': (Utils.isStringProp(popupOpen) && popupOpen)
                    || (Utils.isStringProp(popupClose) && popupClose) || undefined,
      'data-actions': (Utils.isStringProp(actionsOpen) && actionsOpen)
                    || (Utils.isStringProp(actionsClose) && actionsClose) || undefined,
      'data-popover': (Utils.isStringProp(popoverOpen) && popoverOpen)
                      || (Utils.isStringProp(popoverClose) && popoverClose) || undefined,
      'data-sheet': (Utils.isStringProp(sheetOpen) && sheetOpen)
                    || (Utils.isStringProp(sheetClose) && sheetClose) || undefined,
      'data-login-screen': (Utils.isStringProp(loginScreenOpen) && loginScreenOpen)
                           || (Utils.isStringProp(loginScreenClose) && loginScreenClose) || undefined,
      'data-sortable': (Utils.isStringProp(sortableEnable) && sortableEnable)
                       || (Utils.isStringProp(sortableDisable) && sortableDisable)
                       || (Utils.isStringProp(sortableToggle) && sortableToggle) || undefined,
      'data-card': (Utils.isStringProp(cardOpen) && cardOpen)
                    || (Utils.isStringProp(cardClose) && cardClose) || undefined,
    };
  },
  linkActionsClasses(props) {
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
      menuClose,
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
      'menu-close': menuClose || menuClose === '',
    };
  },
};
export default Mixins;
