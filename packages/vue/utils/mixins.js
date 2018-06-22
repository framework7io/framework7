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
    iconIfMd: String,
    iconIfIos: String,
    iconIos: String,
    iconMd: String,
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
    pageName: String,
    reloadCurrent: Boolean,
    reloadAll: Boolean,
    reloadPrevious: Boolean,
    routeTabId: String,
    view: String,
  },
  linkRouterAttrs(props) {
    const {
      force,
      reloadCurrent,
      reloadPrevious,
      reloadAll,
      animate,
      ignoreCache,
      routeTabId,
      view,
    } = props;

    let dataAnimate;
    if ('animate' in props && typeof animate !== 'undefined') {
      dataAnimate = animate.toString();
    }

    return {
      'data-force': force || undefined,
      'data-reload-current': reloadCurrent || undefined,
      'data-reload-all': reloadAll || undefined,
      'data-reload-previous': reloadPrevious || undefined,
      'data-animate': dataAnimate,
      'data-ignore-cache': ignoreCache || undefined,
      'data-route-tab-id': routeTabId || undefined,
      'data-view': Utils.isStringProp(view) ? view : undefined,
    };
  },
  linkRouterClasses(props) {
    const { back, linkBack, external } = props;

    return {
      back: back || linkBack,
      external,
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
  },
  linkActionsAttrs(props) {
    const {
      searchbarEnable,
      searchbarDisable,
      searchbarClear,
      searchbarToggle,
      panelOpen,
      panelClose,
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
    } = props;

    return {
      'data-searchbar': (Utils.isStringProp(searchbarEnable) && searchbarEnable)
                        || (Utils.isStringProp(searchbarDisable) && searchbarDisable)
                        || (Utils.isStringProp(searchbarClear) && searchbarClear)
                        || (Utils.isStringProp(searchbarToggle) && searchbarToggle) || undefined,
      'data-panel': (Utils.isStringProp(panelOpen) && panelOpen)
                    || (Utils.isStringProp(panelClose) && panelClose) || undefined,
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
    } = props;

    return {
      'searchbar-enable': searchbarEnable || searchbarEnable === '',
      'searchbar-disable': searchbarDisable || searchbarDisable === '',
      'searchbar-clear': searchbarClear || searchbarClear === '',
      'searchbar-toggle': searchbarToggle || searchbarToggle === '',
      'panel-close': Utils.isTrueProp(panelClose),
      'panel-open': panelOpen || panelOpen === '',
      'popup-close': Utils.isTrueProp(popupClose),
      'popup-open': popupOpen || popupOpen === '',
      'actions-close': Utils.isTrueProp(actionsClose),
      'actions-open': actionsOpen || actionsOpen === '',
      'popover-close': Utils.isTrueProp(popoverClose),
      'popover-open': popoverOpen || popoverOpen === '',
      'sheet-close': Utils.isTrueProp(sheetClose),
      'sheet-open': sheetOpen || sheetOpen === '',
      'login-screen-close': Utils.isTrueProp(loginScreenClose),
      'login-screen-open': loginScreenOpen || loginScreenOpen === '',
      'sortable-enable': Utils.isTrueProp(sortableEnable),
      'sortable-disable': Utils.isTrueProp(sortableDisable),
      'sortable-toggle': sortableToggle === true || (typeof sortableToggle === 'string' && sortableToggle.length),
    };
  },
};
export default Mixins;
