'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var Mixins = {
  colorProps: {
    color: String,
    colorTheme: String,
    textColor: String,
    bgColor: String,
    borderColor: String,
    rippleColor: String,
    themeDark: Boolean
  },
  colorClasses: function colorClasses(props) {
    var _ref;

    var color = props.color,
        colorTheme = props.colorTheme,
        textColor = props.textColor,
        bgColor = props.bgColor,
        borderColor = props.borderColor,
        rippleColor = props.rippleColor,
        themeDark = props.themeDark;

    return _ref = {
      'theme-dark': themeDark
    }, _defineProperty(_ref, 'color-' + color, color), _defineProperty(_ref, 'color-theme-' + colorTheme, colorTheme), _defineProperty(_ref, 'text-color-' + textColor, textColor), _defineProperty(_ref, 'bg-color-' + bgColor, bgColor), _defineProperty(_ref, 'border-color-' + borderColor, borderColor), _defineProperty(_ref, 'ripple-color-' + rippleColor, rippleColor), _ref;
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
    iconSize: [String, Number]
  },
  linkRouterProps: {
    back: Boolean,
    external: Boolean,
    force: Boolean,
    animate: {
      type: Boolean,
      default: undefined
    },
    ignoreCache: Boolean,
    pageName: String,
    reloadCurrent: Boolean,
    reloadAll: Boolean,
    reloadPrevious: Boolean,
    routeTabId: String,
    view: String
  },
  linkRouterAttrs: function linkRouterAttrs(props) {
    var force = props.force,
        reloadCurrent = props.reloadCurrent,
        reloadPrevious = props.reloadPrevious,
        reloadAll = props.reloadAll,
        animate = props.animate,
        ignoreCache = props.ignoreCache,
        routeTabId = props.routeTabId,
        view = props.view;

    var dataAnimate = void 0;
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
      'data-view': _utils2.default.isStringProp(view) ? view : undefined
    };
  },
  linkRouterClasses: function linkRouterClasses(props) {
    var back = props.back,
        linkBack = props.linkBack,
        external = props.external;

    return {
      back: back || linkBack,
      external: external
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
    sortableToggle: [Boolean, String]
  },
  linkActionsAttrs: function linkActionsAttrs(props) {
    var searchbarEnable = props.searchbarEnable,
        searchbarDisable = props.searchbarDisable,
        searchbarClear = props.searchbarClear,
        searchbarToggle = props.searchbarToggle,
        panelOpen = props.panelOpen,
        panelClose = props.panelClose,
        popupOpen = props.popupOpen,
        popupClose = props.popupClose,
        actionsOpen = props.actionsOpen,
        actionsClose = props.actionsClose,
        popoverOpen = props.popoverOpen,
        popoverClose = props.popoverClose,
        loginScreenOpen = props.loginScreenOpen,
        loginScreenClose = props.loginScreenClose,
        sheetOpen = props.sheetOpen,
        sheetClose = props.sheetClose,
        sortableEnable = props.sortableEnable,
        sortableDisable = props.sortableDisable,
        sortableToggle = props.sortableToggle;

    return {
      'data-searchbar': _utils2.default.isStringProp(searchbarEnable) && searchbarEnable || _utils2.default.isStringProp(searchbarDisable) && searchbarDisable || _utils2.default.isStringProp(searchbarClear) && searchbarClear || _utils2.default.isStringProp(searchbarToggle) && searchbarToggle || undefined,
      'data-panel': _utils2.default.isStringProp(panelOpen) && panelOpen || _utils2.default.isStringProp(panelClose) && panelClose || undefined,
      'data-popup': _utils2.default.isStringProp(popupOpen) && popupOpen || _utils2.default.isStringProp(popupClose) && popupClose || undefined,
      'data-actions': _utils2.default.isStringProp(actionsOpen) && actionsOpen || _utils2.default.isStringProp(actionsClose) && actionsClose || undefined,
      'data-popover': _utils2.default.isStringProp(popoverOpen) && popoverOpen || _utils2.default.isStringProp(popoverClose) && popoverClose || undefined,
      'data-sheet': _utils2.default.isStringProp(sheetOpen) && sheetOpen || _utils2.default.isStringProp(sheetClose) && sheetClose || undefined,
      'data-login-screen': _utils2.default.isStringProp(loginScreenOpen) && loginScreenOpen || _utils2.default.isStringProp(loginScreenClose) && loginScreenClose || undefined,
      'data-sortable': _utils2.default.isStringProp(sortableEnable) && sortableEnable || _utils2.default.isStringProp(sortableDisable) && sortableDisable || _utils2.default.isStringProp(sortableToggle) && sortableToggle || undefined
    };
  },
  linkActionsClasses: function linkActionsClasses(props) {
    var searchbarEnable = props.searchbarEnable,
        searchbarDisable = props.searchbarDisable,
        searchbarClear = props.searchbarClear,
        searchbarToggle = props.searchbarToggle,
        panelOpen = props.panelOpen,
        panelClose = props.panelClose,
        popupOpen = props.popupOpen,
        popupClose = props.popupClose,
        actionsClose = props.actionsClose,
        actionsOpen = props.actionsOpen,
        popoverOpen = props.popoverOpen,
        popoverClose = props.popoverClose,
        loginScreenOpen = props.loginScreenOpen,
        loginScreenClose = props.loginScreenClose,
        sheetOpen = props.sheetOpen,
        sheetClose = props.sheetClose,
        sortableEnable = props.sortableEnable,
        sortableDisable = props.sortableDisable,
        sortableToggle = props.sortableToggle;

    return {
      'searchbar-enable': searchbarEnable || searchbarEnable === '',
      'searchbar-disable': searchbarDisable || searchbarDisable === '',
      'searchbar-clear': searchbarClear || searchbarClear === '',
      'searchbar-toggle': searchbarToggle || searchbarToggle === '',
      'panel-close': _utils2.default.isTrueProp(panelClose),
      'panel-open': panelOpen || panelOpen === '',
      'popup-close': _utils2.default.isTrueProp(popupClose),
      'popup-open': popupOpen || popupOpen === '',
      'actions-close': _utils2.default.isTrueProp(actionsClose),
      'actions-open': actionsOpen || actionsOpen === '',
      'popover-close': _utils2.default.isTrueProp(popoverClose),
      'popover-open': popoverOpen || popoverOpen === '',
      'sheet-close': _utils2.default.isTrueProp(sheetClose),
      'sheet-open': sheetOpen || sheetOpen === '',
      'login-screen-close': _utils2.default.isTrueProp(loginScreenClose),
      'login-screen-open': loginScreenOpen || loginScreenOpen === '',
      'sortable-enable': _utils2.default.isTrueProp(sortableEnable),
      'sortable-disable': _utils2.default.isTrueProp(sortableDisable),
      'sortable-toggle': sortableToggle === true || typeof sortableToggle === 'string' && sortableToggle.length
    };
  }
};
exports.default = Mixins;