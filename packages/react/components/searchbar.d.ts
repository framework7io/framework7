import React from 'react';

declare namespace F7Searchbar {
  export interface Props {
    slot? : string
    id? : string | number
    noShadow? : boolean
    noHairline? : boolean
    form? : boolean  | true
    placeholder? : string  | 'Search'
    disableButton? : boolean  | true
    disableButtonText? : string  | 'Cancel'
    clearButton? : boolean  | true
    expandable? : boolean
    searchContainer? : string | Object
    searchIn? : string  | '.item-title'
    searchItem? : string  | 'li'
    foundEl? : string | Object  | '.searchbar-found'
    notFoundEl? : string | Object  | '.searchbar-not-found'
    backdrop? : boolean  | true
    backdropEl? : string | Object
    hideOnEnableEl? : string | Object  | '.searchbar-hide-on-enable'
    hideOnSearchEl? : string | Object  | '.searchbar-hide-on-search'
    ignore? : string  | '.searchbar-ignore'
    customSearch? : boolean  | false
    removeDiacritics? : boolean  | false
    hideDividers? : boolean  | true
    hideGroups? : boolean  | true
    init? : boolean  | true
    color? : string
    colorTheme? : string
    textColor? : string
    bgColor? : string
    borderColor? : string
    rippleColor? : string
    themeDark? : boolean
    onSearchbarSearch? : Function
    onSearchbarClear? : Function
    onSearchbarEnable? : Function
    onSearchbarDisable? : Function
    onChange? : Function
    onInput? : Function
    onFocus? : Function
    onBlur? : Function
    onSubmit? : Function
    onClickClear? : Function
    onClickDisable? : Function
  }
}
declare class F7Searchbar extends React.Component<F7Searchbar.Props, {}> {
  search(query : any) : unknown
  enable() : unknown
  disable() : unknown
  toggle() : unknown
  clear() : unknown
  onChange(event : any) : unknown
  onInput(event : any) : unknown
  onFocus(event : any) : unknown
  onBlur(event : any) : unknown
  onSubmit(event : any) : unknown
  onClearButtonClick(event : any) : unknown
  onDisableButtonClick(event : any) : unknown
}
export default F7Searchbar;