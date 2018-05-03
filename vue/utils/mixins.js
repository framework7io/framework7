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
  colorClasses(self) {
    const {
      color,
      colorTheme,
      textColor,
      bgColor,
      borderColor,
      rippleColor,
      themeDark,
    } = self.props;

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
    iconColor: String,
    iconSize: [String, Number],
  },
  linkRouterProps: {
    back: Boolean,
    external: Boolean,
    force: Boolean,
    animate: Boolean,
    ignoreCache: Boolean,
    pageName: String,
    reloadCurrent: Boolean,
    reloadAll: Boolean,
    reloadPrevious: Boolean,
    routeTabId: String,
    view: String,
  },
  linkRouterAttrs(self) {
    const {
      force,
      reloadCurrent,
      reloadPrevious,
      reloadAll,
      animate,
      ignoreCache,
      routeTabId,
      view,
    } = self.props;

    let dataAnimate;
    if (self.$options && 'propsData' in self.$options) {
      if ('animate' in self.$options.propsData) {
        dataAnimate = animate.toString();
      }
    } else if ('animate' in self.props) {
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
  linkRouterClasses(self) {
    const { back, linkBack, external } = self.props;

    return {
      back: back || linkBack,
      external,
    };
  },
  linkActionsProps: {
    // Panel
    panelOpen: [Boolean, String],
    panelClose: [Boolean, String],

    // Popup
    popupOpen: [Boolean, String],
    popupClose: [Boolean, String],

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
  linkActionsAttrs(self) {
    const {
      panelOpen,
      panelClose,
      popupOpen,
      popupClose,
      popoverOpen,
      popoverClose,
      loginScreenOpen,
      loginScreenClose,
      sheetOpen,
      sheetClose,
      sortableEnable,
      sortableDisable,
      sortableToggle,
    } = self.props;

    return {
      'data-panel': (Utils.isStringProp(panelOpen) && panelOpen) ||
                    (Utils.isStringProp(panelClose) && panelClose) || undefined,
      'data-popup': (Utils.isStringProp(popupOpen) && popupOpen) ||
                    (Utils.isStringProp(popupClose) && popupClose) || undefined,
      'data-popover': (Utils.isStringProp(popoverOpen) && popoverOpen) ||
                      (Utils.isStringProp(popoverClose) && popoverClose) || undefined,
      'data-sheet': (Utils.isStringProp(sheetOpen) && sheetOpen) ||
                    (Utils.isStringProp(sheetClose) && sheetClose) || undefined,
      'data-login-screen': (Utils.isStringProp(loginScreenOpen) && loginScreenOpen) ||
                           (Utils.isStringProp(loginScreenClose) && loginScreenClose) || undefined,
      'data-sortable': (Utils.isStringProp(sortableEnable) && sortableEnable) ||
                       (Utils.isStringProp(sortableDisable) && sortableDisable) ||
                       (Utils.isStringProp(sortableToggle) && sortableToggle) || undefined,
    };
  },
  linkActionsClasses(self) {
    const {
      panelOpen,
      panelClose,
      popupOpen,
      popupClose,
      popoverOpen,
      popoverClose,
      loginScreenOpen,
      loginScreenClose,
      sheetOpen,
      sheetClose,
      sortableEnable,
      sortableDisable,
      sortableToggle,
    } = self.props;
    return {
      'panel-close': Utils.isTrueProp(panelClose),
      'panel-open': panelOpen || panelOpen === '',
      'popup-close': Utils.isTrueProp(popupClose),
      'popup-open': popupOpen || popupOpen === '',
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
