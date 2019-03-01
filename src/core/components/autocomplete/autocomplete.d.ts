import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { Searchbar } from '../searchbar/searchbar';
import { View } from '../view/view';

export namespace Autocomplete {
  interface Autocomplete extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Object with passed initialization parameters */
    params : Parameters
    /** Array with selected items */
    value : unknown[]
    /** true if Autocomplete is currently opened */
    opened : boolean
    /** HTML element of Autcomplete opener element (if passed on init) */
    openerEl : HTMLElement | undefined
    /** Dom7 instance of of Autcomplete opener element (if passed on init) */
    $openerEl : Dom7Instance | undefined
    /** HTML element of Autcomplete input (if passed on init) */
    inputEl : HTMLElement | undefined
    /** Dom7 instance of of Autcomplete input (if passed on init) */
    $inputEl : Dom7Instance | undefined
    /** Dom7 instance of Autcomplete dropdown */
    $dropdownEl : Dom7Instance | undefined
    /** Autcomplete URL (that was passed in url parameter) */
    url : string
    /** Autcomplete View (that was passed in view parameter) or found parent view */
    view : View.View
    /** HTML element of Autcomplete container: dropdown element, or popup element, or page element. Available when Autocomplete opened */
    el : HTMLElement | undefined
    /** Dom7 instance of Autcomplete container: dropdown element, or popup element, or page element. Available when Autocomplete opened */
    $el : Dom7Instance | undefined
    /** Autcomplete page Searchbar instance */
    searchbar : Searchbar.Searchbar

    /** Open Autocomplete (Dropdown, Page or Popup) */
    open() : void
    /** Close Autcomplete */
    close() : void
    /** Show autocomplete preloader */
    preloaderShow() : void
    /** Hide autocomplete preloader */
    preloaderHide() : void
    /** Destroy Autocomplete instance and remove all events */
    destroy() : void
  }

  interface Parameters {
    /** Defines how to open Autocomplete, can be page or popup (for Standalone) or dropdown. (default page) */
    openIn?: string
    /** Function which accepts search query and render function where you need to pass array with matched items. */
    source: (query: string, render: (items: any[]) => void) => void
    /** Limit number of maximum displayed items in autocomplete per query. */
    limit?: number
    /** Set to true to include Preloader to autocomplete layout. (default false) */
    preloader?: boolean
    /** Preloader color, one of the default colors. */
    preloaderColor?: string
    /** Array with default selected values. */
    value?: unknown[]
    /** Name of matched item object's key that represents item value. (default id) */
    valueProperty?: string
    /** Name of matched item object's key that represents item display value which is used as title of displayed options. (default text) */
    textProperty?: string
    /** If enabled, then it will request passed to source function on autocomplete open. (default false) */
    requestSourceOnOpen?: boolean
    /** String with CSS selector or HTMLElement of link which will open standalone autocomplete page or popup on click. */
    openerEl?: HTMLElement | CSSSelector
    /** Default text for "Close" button when opened as Popup. (default Close) */
    popupCloseLinkText?: string
    /** Default text for "Back" link when opened as Page. (default Back) */
    pageBackLinkText?: string
    /** Autocomplete page title. If nothing is specified and passed openerEl is an item of List View, then text value of item-title element will be used. */
    pageTitle?: string
    /** Searchbar placeholder text. (default Search...) */
    searchbarPlaceholder?: string
    /** Searchbar "Cancel" button text. (default Cancel) */
    searchbarDisableText?: string
    /** Enables searchbar disable button. By default, disabled for Aurora theme */
    searchbarDisableButton?: boolean
    /** Text which is displayed when no matches found. (default Nothing found) */
    notFoundText?: string
    /** Set to true to allow multiple selections. (default false) */
    multiple?: boolean
    /** Set to true and autocomplete will be closed when user picks value. Not available if multiple is enabled. (default false) */
    closeOnSelect?: boolean
    /** Set to true to auto focus search field on autocomplete open. (default false) */
    autoFocus?: boolean
    /** Set to false to open standalone autocomplete without animation. (default true) */
    animate?: boolean
    /** Navbar color theme. One of the default color themes. */
    navbarColorTheme?: string
    /** Form (checkboxes or radios) color theme. One of the default color themes. */
    formColorTheme?: string
    /** Will add opened autocomplete modal (when openIn: 'popup') to router history which gives ability to close autocomplete by going back in router history and set current route to the autocomplete modal. (default true) */
    routableModals?: boolean
    /** Standalone autocomplete URL that will be set as a current route. (default select/) */
    url?: string
    /** Link to initialized View instance if you want use standalone Autcomplete. By default, if not specified, it will be opened in Main View.. */
    view?: View.View
    /** String with CSS selector or HTMLElement of related text input. */
    inputEl?: HTMLElement | CSSSelector
    /** Allows to configure input events used to handle Autcomplete actions and source request. Can be changed for example to change keyup compositionend if you use keyboard with composition of Chinese characters. (default input) */
    inputEvents?: string
    /** Highlight matches in autcomplete results. (default true) */
    highlightMatches?: boolean
    /** Enables type ahead, will prefill input value with first item in match. (default false) */
    typeahead?: boolean
    /** Specify dropdown placeholder text. */
    dropdownPlaceholderText?: string
    /** If true then value of related input will be update as well. (default true) */
    updateInputValueOnSelect?: boolean
    /** If true then input which is used as item-input in List View will be expanded to full screen wide during dropdown visible.. (default false) */
    expandInput?: boolean
    /** By default dropdown will be added to parent page-content element. You can specify here different element where to add dropdown element. */
    dropdownContainerEl?: HTMLElement | CSSSelector
    /** Function to render autocomplete dropdown, must return dropdown HTML string. */
    renderDropdown?: (items : any[]) => string
    /** Function to render autocomplete page, must return page HTML string. */
    renderPage?: (items : any[]) => string
    /** Function to render autocomplete popup, must return popup HTML string. */
    renderPopup?: (items : any[]) => string
    /** Function to render single autocomplete, must return item HTML string. */
    renderItem?: (item : any, index: number) => string
    /** Function to render searchbar, must return searchbar HTML string. */
    renderSearchbar?: () => string
    /** Function to render navbar, must return navbar HTML string. */
    renderNavbar?: () => string

    on?: {
      [event in keyof Events]? : Events[event]
    }
  }

  interface Events {
    /** Event will be triggered when Autocomplete value changed. Returned value is an array with selected items */
    change : (values : any[]) => void
    /** Event will be triggered when Autocomplete starts its opening animation. As an argument event handler receives autocomplete instance */
    open : (autocomplete : Autocomplete) => void
    /** Event will be triggered after Autocomplete completes its opening animation. As an argument event handler receives autocomplete instance */
    opened : (autocomplete : Autocomplete) => void
    /** Event will be triggered when Autocomplete starts its closing animation. As an argument event handler receives autocomplete instance */
    close : (autocomplete : Autocomplete) => void
    /** Event will be triggered after Autocomplete completes its closing animation. As an argument event handler receives autocomplete instance */
    closed : (autocomplete : Autocomplete) => void
    /** Event will be triggered right before Autocomplete instance will be destroyed. As an argument event handler receives autocomplete instance */
    beforeDestroy : (autocomplete : Autocomplete) => void
  }

  interface AppMethods {
    autocomplete: {
      /** create Autocomplete instance */
      create(parameters : Parameters) : Autocomplete
      /** destroy Autocomplete instance */
      destroy(el : HTMLElement | CSSSelector) : void
      /** get Autocomplete instance by HTML element */
      get(el : HTMLElement | CSSSelector) : Autocomplete
      /** open Autocomplete */
      open(el : HTMLElement | CSSSelector) : Autocomplete
      /** closes Autocomplete */
      close(el : HTMLElement | CSSSelector) : Autocomplete
    }

  }
  interface AppParams {
    autocomplete?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered when Autocomplete value changed. Returned value is an array with selected items */
    autocompleteChange : (autocomplete : Autocomplete, value : unknown) => void
    /** Event will be triggered when Autocomplete starts its opening animation. As an argument event handler receives autocomplete instance */
    autocompleteOpen : (autocomplete : Autocomplete) => void
    /** Event will be triggered after Autocomplete completes its opening animation. As an argument event handler receives autocomplete instance */
    autocompleteOpened : (autocomplete : Autocomplete) => void
    /** Event will be triggered when Autocomplete starts its closing animation. As an argument event handler receives autocomplete instance */
    autocompleteClose : (autocomplete : Autocomplete) => void
    /** Event will be triggered after Autocomplete completes its closing animation. As an argument event handler receives autocomplete instance */
    autocompleteClosed : (autocomplete : Autocomplete) => void
    /** Event will be triggered right before Autocomplete instance will be destroyed. As an argument event handler receives autocomplete instance */
    autocompleteBeforeDestroy : (autocomplete : Autocomplete) => void
  }
}
declare const AutcompleteComponent: Framework7Plugin;

export default AutcompleteComponent;
