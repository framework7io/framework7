import { Dom7Array } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace ListIndex {
  interface ListIndex extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** List index HTML element */
    el: HTMLElement;
    /** Dom7 instance with list index HTML element */
    $el: Dom7Array;
    /** Dynamically created inner <ul> HTML element */
    ul: HTMLElement;
    /** Dom7 instance with dynamically created inner <ul> HTML element */
    $ul: Dom7Array;
    /** Related List HTML element, passed in listEl parameter */
    listEl: HTMLElement;
    /** Dom7 instance with related List HTML element, passed in listEl parameter */
    $listEl: Dom7Array;
    /** Array with calculated indexes */
    indexes: number[];
    /** List index parameters */
    params: Parameters;

    /** Recalculates indexes, sizes and rerenders list index */
    update(): ListIndex;
    /** Scrolls related list to specified index content */
    scrollToList(itemContent: string): ListIndex;
    /** Destroys list index instance */
    destroy(): void;
  }

  interface Parameters {
    /** List Index element. HTMLElement or string with CSS selector of list index element. */
    el?: HTMLElement | CSSSelector;
    /** Related List View element. HTMLElement or string with CSS selector of List View element. */
    listEl?: HTMLElement | CSSSelector;
    /** Array with indexes. If not passed then it will automatically generate it based on item-divider and list-group-title elements inside of passed List View element in listEl parameter. (default auto) */
    indexes?: number[] | string; // ??
    /** Will automatically scroll related List View to the selected index. (default true) */
    scrollList?: boolean;
    /** Enables label bubble with selected index when you swipe over list index. (default false) */
    label?: boolean;
    /** Single index item height. It is required to calculate dynamic index and how many indexes fit on the screen. For iOS theme. (default 14) */
    iosItemHeight?: number;
    /** Single index item height. It is required to calculate dynamic index and how many indexes fit on the screen. For MD theme. (default 14) */
    mdItemHeight?: number;
    /** Single index item height. It is required to calculate dynamic index and how many indexes fit on the screen. For Aurora theme. (default 14) */
    auroraItemHeight?: number;
    /** Object with events handlers.. */
    on: {
      [event in keyof Events]?: Events[event];
    };
  }

  interface Events {
    /** Event will be triggered on index select rather by click or swiping. As an argument event handler receives list index instance and selected index item content */
    select(listIndex: ListIndex, itemContent: string, itemIndex: number): void;
    /** Event will be triggered on index click. As an argument event handler receives list index instance and clicked index item content */
    click(listIndex: ListIndex, itemContent: string, itemIndex: number): void;
    /** Event will be triggered right before List Index instance will be destroyed. As an argument event handler receives list index instance */
    beforeDestroy(listIndex: ListIndex): void;
  }

  interface DomEvents {
    /** Event will be triggered on index select rather by click or swiping */
    'listindex:select': () => void;
    /** Event will be triggered on index click */
    'listindex:click': () => void;
    /** Event will be triggered right before List Index instance will be destroyed */
    'listindex:beforedestroy': () => void;
  }

  interface AppMethods {
    listIndex: {
      /** create ListIndex instance */
      create(parameters: Parameters): ListIndex;
      /** destroy ListIndex instance */
      destroy(el: HTMLElement | CSSSelector | ListIndex): void;
      /** get ListIndex instance by HTML element */
      get(el: HTMLElement | CSSSelector): ListIndex;
    };
  }
  interface AppParams {
    listIndex?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered on index select rather by click or swiping. As an argument event handler receives list index instance and selected index item content */
    listIndexSelect(listIndex: ListIndex, itemContent: string, itemIndex: number): void;
    /** Event will be triggered on index click. As an argument event handler receives list index instance and clicked index item content */
    listIndexClick(listIndex: ListIndex, itemContent: string, itemIndex: number): void;
    /** Event will be triggered right before List Index instance will be destroyed. As an argument event handler receives list index instance */
    listIndexBeforeDestroy(listIndex: ListIndex): void;
  }
}

declare const ListIndexComponent: Framework7Plugin;

export default ListIndexComponent;
