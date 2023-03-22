import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Searchbar {
  interface Parameters {
    /** Searchbar element. HTMLElement or string with CSS selector of searchbar element */
    el: HTMLElement | CSSSelector;
    /** CSS selector or HTML element of searchbar input element. By default (if not passed) will try to look for input type="search" inside of searchbar */
    inputEl?: HTMLElement | CSSSelector;
    /** Enables disable button (default true) */
    disableButton?: boolean;
    /** CSS selector or HTML element of searchbar disable button. By default (if not passed) will try to look for element with search-disable-button class inside of searchbar */
    disableButtonEl?: HTMLElement | CSSSelector;
    /** CSS selector or HTML element of list block to search in */
    searchContainer?: HTMLElement | CSSSelector;
    /** CSS selector of List View element's field where we need to search. Usually we search through element titles, in this case we need to pass .item-title. It is also possible to pass few elements for search like .item-title, .item-text */
    searchIn?: CSSSelector;
    /** CSS selector of single search item. If we do a search in List View, then it must be a single list element li (default "li") */
    searchItem?: CSSSelector;
    /** CSS selector of group element. Used when hideGroups enabled to hide groups. If we do a search in List View, then it usually a list group (default "list-group") */
    searchGroup?: CSSSelector;
    /** CSS selector of group titles. Used when hideGroupTitles enabled to hide group titles. If we do a search in List View, then it usually a list group title (default ".list-group-title") */
    searchGroupTitle?: CSSSelector;
    /** CSS selector or HTMLElement of searchbar "found" element to make it hidden when there is no search results (default ".searchbar-found") */
    foundEl?: HTMLElement | CSSSelector;
    /** CSS selector or HTMLElement of searchbar "not-found" element to make it visible when there is no search results (default ".searchbar-not-found") */
    notFoundEl?: HTMLElement | CSSSelector;
    /** CSS selector or HTMLElement of elements to be hidden when searchbar enabled (default ".searchbar-hide-on-enable") */
    hideOnEnableEl?: HTMLElement | CSSSelector;
    /** CSS selector or HTMLElement of elements to be hidden on searchbar search (default ".searchbar-hide-on-search") */
    hideOnSearchEl?: HTMLElement | CSSSelector;
    /** Enables searchbar backdrop element. (default true) */
    backdrop?: boolean;
    /** CSS selector or HTMLElement of searchbar backdrop element. If not passed and backdrop parameter is true then it will look for .searchbar-backdrop element. In case none found it will create one automatically */
    backdropEl?: HTMLElement | CSSSelector;
    /** CSS selector for items to be ignored by searchbar and always present in search results (default ".searchbar-ignore") */
    ignore?: CSSSelector;
    /** When enabled searchbar will not search through any of list blocks specified by searchContainer and you will be able to use custom search functionality, for example, for calling external APIs with search results and for displaying them manually (default false) */
    customSearch?: boolean;
    /** Enable to remove/replace diacritics (á, í, ó, etc.) during search (default false) */
    removeDiacritics?: boolean;
    /** If enabled, then search will consider item dividers and group titles and hide them if there are no found items right after them (default true) */
    hideGroupTitles?: boolean;
    /** If enabled, then search will consider list view groups hide them if there are no found items inside of these groups (default true) */
    hideGroups?: boolean;
    /** Disable searchbar on backdrop click */
    disableOnBackdropClick?: boolean;
    /** Enables expandable searchbar */
    expandable?: boolean;
    /** Input events used to track search event */
    inputEvents?: string;
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface Searchbar extends Framework7EventsClass<Events> {
    /** Searchbar HTML element */
    el: HTMLElement;
    /** Dom7 instance with searchbar HTML element */
    $el: Dom7Array;
    /** Searchbar input HTML element */
    inputEl: HTMLElement;
    /** Dom7 instance with searchbar input HTML element */
    $inputEl: Dom7Array;
    /** Current search query (search input value) */
    query: string;
    /** Previous search query (search input value) */
    previousQuery: string;
    /** Searchbar search container */
    searchContainer: HTMLElement;
    /** Dom7 element with searchbar search container */
    $searchContainer: Dom7Array;
    /** Boolean value that represents is searchbar enabled or disabled */
    enabled: boolean;
    /** Boolean value that represents is searchbar expandable or not */
    expandable: boolean;
    /** Searchbar parameters */
    params: Parameters;
    /** Force searchbar to search passed query */
    search(query: string): Searchbar;
    /** Enable/activate searchbar */
    enable(): Searchbar;
    /** Disable/deactivate searchbar */
    disable(): Searchbar;
    /** Toggle searchbar */
    toggle(): Searchbar;
    /** Clear search query and update results */
    clear(): Searchbar;
    /** Destroy searchbar */
    destroy(): void;
  }
  interface Events {
    /** Event will be triggered during search (search field change). As an argument event handler receives searchbar instance, current query and previous query */
    search: (searchbar: Searchbar, query: string, previousQuery: string) => void;
    /** Event will be triggered when user clicks on Searchbar's "clear" element . As an argument event handler receives searchbar instance and previous (before clear) query */
    clear: (searchbar: Searchbar, previousQuery: string) => void;
    /** Event will be triggered when Searchbar becomes active/enabled. As an argument event handler receives searchbar instance */
    enable: (searchbar: Searchbar) => void;
    /** Event will be triggered when Searchbar becomes inactive/disabled. As an argument event handler receives searchbar instance */
    disable: (searchbar: Searchbar) => void;
    /** Event will be triggered right before Searchbar instance will be destroyed */
    beforeDestroy: (searchbar: Searchbar) => void;
  }
  interface DomEvents {
    /** Event will be triggered during search (search field change). As an argument event handler receives searchbar instance, current query and previous query */
    'searchbar:search': () => void;
    /** Event will be triggered when user clicks on Searchbar's "clear" element . As an argument event handler receives searchbar instance and previous (before clear) query */
    'searchbar:clear': () => void;
    /** Event will be triggered when Searchbar becomes active/enabled. As an argument event handler receives searchbar instance */
    'searchbar:enable': () => void;
    /** Event will be triggered when Searchbar becomes inactive/disabled. As an argument event handler receives searchbar instance */
    'searchbar:disable': () => void;
    /** Event will be triggered right before Searchbar instance will be destroyed */
    'searchbar:beforedestroy': () => void;
  }

  interface AppMethods {
    searchbar: {
      /** create Searchbar instance */
      create(parameters: Parameters): Searchbar;
      /** get Searchbar instance by HTML element */
      get(el: HTMLElement | CSSSelector | Searchbar): Searchbar;
      /** destroy Searchbar instance */
      destroy(el: HTMLElement | CSSSelector | Searchbar): void;
      /** Clear search query and update results */
      clear(el: HTMLElement | CSSSelector | Searchbar): Searchbar;
      /** Enable/activate searchbar */
      enable(el: HTMLElement | CSSSelector | Searchbar): Searchbar;
      /** Disable/deactivate searchbar */
      disable(el: HTMLElement | CSSSelector | Searchbar): Searchbar;
      /** Toggle searchbar */
      toggle(el: HTMLElement | CSSSelector | Searchbar): Searchbar;
      /** Force searchbar to search passed query */
      search(el: HTMLElement | CSSSelector | Searchbar, query: string): Searchbar;
    };
  }
  interface AppParams {
    searchbar?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered during search (search field change). As an argument event handler receives searchbar instance, current query and previous query */
    searchbarSearch: (searchbar: Searchbar, query: string, previousQuery: string) => void;
    /** Event will be triggered when user clicks on Searchbar's "clear" element . As an argument event handler receives searchbar instance and previous (before clear) query */
    searchbarClear: (searchbar: Searchbar, previousQuery: string) => void;
    /** Event will be triggered when Searchbar becomes active/enabled. As an argument event handler receives searchbar instance */
    searchbarEnable: (searchbar: Searchbar) => void;
    /** Event will be triggered when Searchbar becomes inactive/disabled. As an argument event handler receives searchbar instance */
    searchbarDisable: (searchbar: Searchbar) => void;
    /** Event will be triggered right before Searchbar instance will be destroyed */
    searchbarBeforeDestroy: (searchbar: Searchbar) => void;
  }
}

declare const SearchbarComponent: Framework7Plugin;

export default SearchbarComponent;
