import * as React from 'react';
import { Searchbar as SearchbarNamespace } from 'framework7/components/searchbar/searchbar';

declare namespace F7Searchbar {
  interface Props {
    slot? : string
    id? : string | number
    className? : string
    style? : React.CSSProperties
    noShadow? : boolean
    noHairline? : boolean
    form? : boolean
    placeholder? : string
    disableButton? : boolean
    disableButtonText? : string
    clearButton? : boolean
    value? : string | number | Array<any>
    inputEvents? : string
    expandable? : boolean
    inline? : boolean
    searchContainer? : string | Object
    searchIn? : string
    searchItem? : string
    searchGroup? : string
    searchGroupTitle? : string
    foundEl? : string | Object
    notFoundEl? : string | Object
    backdrop? : boolean
    backdropEl? : string | Object
    hideOnEnableEl? : string | Object
    hideOnSearchEl? : string | Object
    ignore? : string
    customSearch? : boolean
    removeDiacritics? : boolean
    hideDividers? : boolean
    hideGroups? : boolean
    init? : boolean
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
  f7Searchbar: SearchbarNamespace.Searchbar
}
export default F7Searchbar;