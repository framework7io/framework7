import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace VirtualList {
  interface VirtualListRenderData {
    fromIndex: number;
    toIndex: number;
    listHeight: number;
    topPosition: number;
    items: any[];
  }
  interface VirtualList extends Framework7EventsClass<Events> {
    items: any[];
    filteredItems: any[];
    domCache: object;
    /** Virtual list target list block element */
    el: HTMLElement;
    /** Dom7 instance of target list block element */
    $el: Dom7Array;
    /** Parameters passed on list initialization */
    params: Parameters;
    /** Parent "page-content" element */
    pageContentEl: HTMLElement;
    /** Dom7 instance of parent "page-content" element */
    $pageContentEl: Dom7Array;
    /** Index number of currently first rendered item */
    currentFromIndex: number;
    /** Index number of currently last rendered item */
    currentToIndex: number;
    /** Boolean property. Equals true if the currently last rendered item is the last item of all specified items */
    reachEnd: boolean;

    /** Filter virtual list by passing array with indexes of items to show */
    filterItems(indexes: number[]): void;
    /** Disable filter and display all items again */
    resetFilter(): void;
    /** Append item to virtual list */
    appendItem(item: any): void;
    /** Append array with items to virtual list */
    appendItems(items: any[]): void;
    /** Prepend item to virtual list */
    prependItem(item: any): void;
    /** Prepend array with items to virtual list */
    prependItems(items: any[]): void;
    /** Replace item at specified index with the new one */
    replaceItem(index: number, item: any): void;
    /** Replace all items with arrays of new items */
    replaceAllItems(items: any[]): void;
    /** Move virtual item from oldIndex to newIndex */
    moveItem(oldIndex: number, newIndex: number): void;
    /** Insert new item before item with specified index */
    insertItemBefore(index: number, item: any): void;
    /** Delete item at specified index */
    deleteItem(index: number): void;
    /** Delete items at specified array of indexes */
    deleteItems(indexes: number[]): void;
    /** Delete all items */
    deleteAllItems(): void;
    /** Clear virtual list cached DOM elements */
    clearCache(): void;
    /** Destory initialized virtual list and detach all events */
    destroy(): void;
    /** Update virtual list, including recalculation of list sizes and re-rendering of virtual list */
    update(): void;
    /** Scroll Virtual List to specified item by its index number */
    scrollToItem(index: number): void;
  }
  interface Parameters {
    /** Target List Block element. In case of string - CSS selector of list block element */
    el: HTMLElement | CSSSelector;
    /** List element <ul> inside of List block */
    ul?: HTMLElement | CSSSelector;
    /** Will automatically create <ul> element inside of Virtual List block. If disabled, then virtual list can be used on any block element without ul > li structure (default true) */
    createUl?: boolean;
    /** Array with list items */
    items?: any[];
    /** Amount of rows (items) to be rendered before current screen scroll position. By default it is equal to double amount of rows (items) that fit to screen */
    rowsBefore?: number;
    /** Amount of rows (items) to be rendered after current screen scroll position. By default it is equal to the amount of rows (items) that fit to screen */
    rowsAfter?: number;
    /** Number of items per row. Doesn't compatible when using Virtual List with dynamic height (default 1) */
    cols?: number;
    /** If number - list item height in px. If function then function should return item height. By default equals to 44 for iOS theme, 48 for MD theme, and 38 for Aurora theme */
    height?: number | Function;
    /** This optional function allows to use custom function to render item HTML. It could be used instead of template parameter */
    renderItem?(item: any): string;
    /** This optional function allows to render DOM items using some custom method. Useful in case it is used (e.g.) with Vue/React plugin to pass DOM rendering and manipulation to Vue/React. renderParameters conaints object with the following properties: fromIndex, toIndex, listHeight, topPosition, items */
    renderExternal?(renderParameters: VirtualListRenderData): void;
    /** Defines list item template for the case if empty data passed */
    emptyTemplate?: string;
    /** This parameter allows to control buffer size on Virtual Lists with dynamic height (when height parameter is function) as a buffer size multiplier (default 1) */
    dynamicHeightBufferSize?: number;
    /** Disable or enable DOM cache for already rendered list items. In this case each item will be rendered only once and all further manipulations will be with DOM element. It is useful if your list items have some user interaction elements (like form elements or swipe outs) or could be modified (default true) */
    cache?: boolean;
    /** Is the current device updates and handles scroll events during scroll. By default (if not specified) it is "false" for all iOS devices with iOS version less than 8 */
    updatableScroll?: boolean;
    /** Will set height on list block if enabled (default true) */
    setListHeight?: boolean;
    /** Option to show filtered items only set by `filter()` method (default false) */
    showFilteredItemsOnly?: boolean;
    /** Search function that will be used by Searchbar, it receives search query, item itself and item index. If item matches to search query you need to return true, otherwise this function should return false */
    searchByItem?(query: string, item: any, index: number): boolean;
    /** Search function that will be used by Searchbar, it receives search query and array with all items. You need to loop through items and return array with indexes of matched items */
    searchAll?(query: string, items: any[]): any[];
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }
  interface Events {
    itemBeforeInsert: (virtualList: VirtualList, itemEl: HTMLElement, item: any) => void;
    itemsBeforeInsert: (virtualList: VirtualList, fragment: DocumentFragment) => void;
    beforeClear: (virtualList: VirtualList, fragment: DocumentFragment) => void;
    itemsAfterInsert: (virtualList: VirtualList, fragment: DocumentFragment) => void;
  }
  interface AppMethods {
    virtualList: {
      /** initialize virtual list with parameters */
      create(parameters: Parameters): VirtualList;
      /** destroy Virtual List instance */
      destroy(el: HTMLElement | CSSSelector): void;
      /** get Virtual List instance by HTML element */
      get(el: HTMLElement | CSSSelector): VirtualList;
    };
  }
  interface AppParams {
    virtualList?: Parameters | undefined;
  }
  interface AppEvents {
    vlItemBeforeInsert: (virtualList: VirtualList, itemEl: HTMLElement, item: any) => void;
    vlItemsBeforeInsert: (virtualList: VirtualList, fragment: DocumentFragment) => void;
    vlBeforeClear: (virtualList: VirtualList, fragment: DocumentFragment) => void;
    vlItemsAfterInsert: (virtualList: VirtualList, fragment: DocumentFragment) => void;
  }
}

declare const VirtualListComponent: Framework7Plugin;
export default VirtualListComponent;
