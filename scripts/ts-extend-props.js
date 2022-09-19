module.exports.COLOR_PROPS = `
color?: string;
colorTheme?: string;
textColor?: string;
bgColor?: string;
borderColor?: string;
rippleColor?: string;
dark?: boolean;
`;

module.exports.ICON_PROPS = `
icon?: string;
iconMaterial?: string;
iconF7?: string;
iconIos?: string;
iconMd?: string;
iconColor?: string;
iconSize?: string | number;
`;

module.exports.ROUTER_PROPS = `
back?: boolean;
external?: boolean;
force?: boolean;
animate?: boolean;
ignoreCache?: boolean;
reloadCurrent?: boolean;
reloadAll?: boolean;
reloadPrevious?: boolean;
reloadDetail?: boolean;
routeTabId?: string;
view?: string;
routeProps?: any;
preventRouter?: boolean;
transition?: string;
openIn?: string;
`;

module.exports.ACTIONS_PROPS = `
searchbarEnable?: boolean | string;
searchbarDisable?: boolean | string;
searchbarClear?: boolean | string;
searchbarToggle?: boolean | string;
panelOpen?: boolean | string;
panelClose?: boolean | string;
panelToggle?: boolean | string;
popupOpen?: boolean | string;
popupClose?: boolean | string;
actionsOpen?: boolean | string;
actionsClose?: boolean | string;
popoverOpen?: boolean | string;
popoverClose?: boolean | string;
loginScreenOpen?: boolean | string;
loginScreenClose?: boolean | string;
sheetOpen?: boolean | string;
sheetClose?: boolean | string;
sortableEnable?: boolean | string;
sortableDisable?: boolean | string;
sortableToggle?: boolean | string;
cardOpen?: boolean | string;
cardPreventOpen?: boolean | string;
cardClose?: boolean | string;
menuClose?: boolean | string;
`;
