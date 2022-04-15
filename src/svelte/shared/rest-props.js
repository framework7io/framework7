const ignoreProps = [
  'color',
  'colorTheme',
  'textColor',
  'bgColor',
  'borderColor',
  'rippleColor',
  'dark',
  'force',
  'reloadCurrent',
  'reloadPrevious',
  'reloadAll',
  'reloadDetail',
  'animate',
  'ignoreCache',
  'routeTabId',
  'view',
  'transition',
  'openIn',
  'back',
  'linkBack',
  'external',
  'preventRouter',
  'searchbarEnable',
  'searchbarDisable',
  'searchbarClear',
  'searchbarToggle',
  'panelOpen',
  'panelClose',
  'panelToggle',
  'popupOpen',
  'popupClose',
  'actionsOpen',
  'actionsClose',
  'popoverOpen',
  'popoverClose',
  'loginScreenOpen',
  'loginScreenClose',
  'sheetOpen',
  'sheetClose',
  'sortableEnable',
  'sortableDisable',
  'sortableToggle',
  'cardOpen',
  'cardClose',
];

export function restProps(rest = {}) {
  const props = {};
  Object.keys(rest)
    .filter((prop) => !ignoreProps.includes(prop))
    .forEach((key) => {
      if (key.indexOf('on') !== 0) {
        props[key] = rest[key];
      }
    });
  return props;
}
