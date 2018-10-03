import { CSSSelector, Framework7Plugin } from '../app/app-class';

export namespace Sortable {
  interface SortIndexes {
    from: number
    to: number
  }
  interface DomEvents {
    /** Event will be triggered when sortable mode is enabled */
    'sortable:enable': (event: any) => void
    /** Event will be triggered when sortable mode is disabled */
    'sortable:disable': (event: any) => void
    /** Event will be triggered after user release currently sorting element in new position. event.detail will contain object with from and to properties with from/to index numbers of sorted list item */
    'sortable:sort': (event: any, indexes: SortIndexes) => void
  }
  interface AppMethods {
    sortable: {
      /** enable sorting mode on sortable list */
      enable(listEl?: HTMLElement | CSSSelector): void
      /** disable sorting mode on sortable list */
      disable(listEl?: HTMLElement | CSSSelector): void
      /** toggle sorting mode on sortable list */
      toggle(listEl?: HTMLElement | CSSSelector): void
    }
  }
  interface AppParams {
    sortable?: {
      /** When enabled then it will move (reorder) HTML elements according to new sortable order. It is useful to disable it if you use other library for DOM manipulation, like React or Vue (default true) */
      moveElements?: boolean
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered when sortable mode is enabled */
    sortableEnable: (listEl: HTMLElement) => void
    /** Event will be triggered when sortable mode is disabled */
    sortableDisable: (listEl: HTMLElement) => void
    /** Event will be triggered after user release currently sorting element in new position. indexes is an object with from and to properties with from/to index numbers of sorted list item */
    sortableSort: (listEl: HTMLElement, indexes: SortIndexes) => void
  }
}

declare const SortableComponent: Framework7Plugin;

export default SortableComponent;
