import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace DataTable {
  interface DataTable extends Framework7EventsClass<Events> {
    /** Data table HTML element */
    el: HTMLElement;
    /** Dom7 instance with Data table HTML element */
    $el: Dom7Array;
    /** Destroy data table */
    destroy(): void;
  }

  interface Parameters {
    /** Data Table element. Can be useful if you already have Data Table element in your HTML and want to create new instance using this element */
    el: HTMLElement | CSSSelector;

    on?: {
      [event in keyof Events]?: Events[event];
    };
  }

  interface Events {
    /** Event will be triggered data table sort changed. As an argument event handler receives data table instance and new sort order (asc or desc) */
    sort: (dataTable: DataTable, sort: string) => void;
    /** Event will be triggered right before Data Table instance will be destroyed. As an argument event handler receives Data table instance */
    beforeDestroy: (dataTable: DataTable) => void;
  }

  interface AppMethods {
    dataTable: {
      /** create DataTable instance */
      create(parameters: Parameters): DataTable;
      /** destroy DataTable instance */
      destroy(el: HTMLElement | CSSSelector | DataTable): void;
      /** get DataTable instance by HTML element */
      get(el: HTMLElement | CSSSelector): DataTable;
    };
  }
  interface AppParams {}
  interface DomEvents {
    /** Event will be triggered data table sort changed */
    'datatable:sort': () => void;
    /** Event will be triggered right before Data Table instance will be destroyed */
    'datatable:beforedestroy': () => void;
  }
  interface AppEvents {
    /** Event will be triggered data table sort changed. As an argument event handler receives data table instance and new sort order (asc or desc) */
    dataTableSort: (dataTable: DataTable, sort: string) => void;
    /** Event will be triggered right before Data Table instance will be destroyed. As an argument event handler receives Data table instance */
    dataTableBeforeDestroy: (dataTable: DataTable) => void;
  }
}

declare const DataTableComponent: Framework7Plugin;

export default DataTableComponent;
