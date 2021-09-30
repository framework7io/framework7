import Framework7, {
  Framework7EventsClass,
  Framework7Plugin,
  CSSSelector,
} from '../../components/app/app-class';
import { Dom7, Dom7Array } from 'dom7';
import { Router } from '../../modules/router/router';
import { StoreObject as Store } from '../../modules/store/store';

interface ComponentRender extends Function {}

export interface ComponentContext {
  /** Component ID */
  $id: string | number;
  /** Dom7 library */
  $: Dom7;
  /** Current route. Contains object with route query, hash, params, path and url */
  $f7route: Router.Route;
  /** Router instance */
  $f7router: Router.Router;
  /** Framework7 app instance */
  $f7: Framework7;
  /** Object with md, ios and aurora boolean properties which indicating current theme.  */
  $theme: {
    ios: boolean;
    md: boolean;
    aurora: boolean;
  };
  /** Main app store */
  $store: Store;
  /** Object where `value` contains Dom7 instance with component HTML element */
  $el: {
    value: Dom7Array;
  };
  /** Create reactive variable */
  $ref: (initialValue: any) => { value: any };

  /** Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.  */
  $tick: (callback?: () => void) => Promise<any>;
  /** Update/rerender component when state/data changed  */
  $update: (callback?: () => void) => Promise<any>;
  /** Emits DOM event on component element */
  $emit: (name: string, data: any) => void;
  /** Tagged template literal */
  $h: any;
  /** Render function */
  $render: ComponentRender;
  /** Attach event handler to component root DOM element */
  $on: (eventName, handler: () => void) => void;
  /** Attach event handler to component root DOM element that will be executed only once */
  $once: (eventName, handler: () => void) => void;
  /** Hook called right before component will be added to DOM */
  $onBeforeMount: (callback: () => void) => void;
  /** Hook called right after component has been added to DOM */
  $onMounted: (callback: () => void) => void;
  /** Hook called right before component VDOM will be patched */
  $onBeforeUpdate: (callback: () => void) => void;
  /** Hook called right after component VDOM has been patched */
  $onUpdated: (callback: () => void) => void;
  /** Hook called right before component will be destoyed */
  $onBeforeUnmount: (callback: () => void) => void;
  /** Hook called when component destroyed */
  $onUnmounted: (callback: () => void) => void;
}
export interface ComponentFunction {
  (props: any, ctx: ComponentContext): ComponentRender | any;
}
export class ComponentClass {
  constructor(app: Framework7, component: ComponentFunction, props?: object, context?: object);
}

export namespace Component {
  interface AppMethods {
    /** Object with router/view cache data */
    component: {
      /** Create and init component */
      create(
        component: ComponentFunction,
        props?: object,
        context?: object,
      ): Promise<ComponentClass>;
      /** Parse component from single file component-style string */
      parse(componentString: string): ComponentFunction;
      /** Register custom component */
      registerComponent(tagName: string, component: ComponentFunction): void;
      /** Unregister custom component */
      unregisterComponent(tagName: string): void;
    };
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const ComponentModule: Framework7Plugin;

export default ComponentModule;
