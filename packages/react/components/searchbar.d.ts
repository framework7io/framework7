import * as React from 'react';

declare namespace F7Searchbar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
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
    onSearchbarSearch? : (searchbar?: any, query?: any, previousQuery?: any) => void
    onSearchbarClear? : (searchbar?: any, previousQuery?: any) => void
    onSearchbarEnable? : (searchbar?: any) => void
    onSearchbarDisable? : (searchbar?: any) => void
    onChange? : (event?: any) => void
    onInput? : (event?: any) => void
    onFocus? : (event?: any) => void
    onBlur? : (event?: any) => void
    onSubmit? : (event?: any) => void
    onClickClear? : (event?: any) => void
    onClickDisable? : (event?: any) => void
  }
}
declare class F7Searchbar extends React.Component<F7Searchbar.Props, {}> {
  search(query? : any) : unknown
  enable() : unknown
  disable() : unknown
  toggle() : unknown
  clear() : unknown
  onChange(event? : any) : unknown
  onInput(event? : any) : unknown
  onFocus(event? : any) : unknown
  onBlur(event? : any) : unknown
  onSubmit(event? : any) : unknown
  onClearButtonClick(event? : any) : unknown
  onDisableButtonClick(event? : any) : unknown
}
export default F7Searchbar;