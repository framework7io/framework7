import Framework7, { Framework7EventsClass, Framework7Plugin, CSSSelector } from '../../components/app/app-class';
import { Dom7, Dom7Instance } from 'dom7';
import { Router } from '../../modules/router/router';

export class ComponentClass {
  constructor(app: Framework7, context?: object, options?: ComponentOptions)
  /** Component ID */
  $id: string | number
  /** Dom7 library */
  $: Dom7
  /** Dom7 library */
  $$: Dom7
  /** Dom7 library */
  $dom7: Dom7
  /** Current route. Contains object with route query, hash, params, path and url */
  $f7route: Router.Route
  /** Current route. Contains object with route query, hash, params, path and url */
  $route: Router.Route
  /** Router instance */
  $router: Router.Router
  /** Router instance */
  $f7router: Router.Router
  /** Framework7 app instance */
  $f7: Framework7
  /** Framework7 app instance */
  $app: Framework7
  /** Object with md, ios and aurora boolean properties which indicating current theme.  */
  $theme: {
    ios: boolean
    md: boolean
    aurora: boolean
  }
  $options: ComponentOptions
  /** Root data and methods you have specified in data and methods properties on app init */
  $root: object
  /** Dom7 instance with component HTML element */
  $el: Dom7Instance
  /** Component's HTML element */
  el: HTMLElement
  /** Props passed to custom component */
  $props: object
  /** Defer the callback to be executed after the next DOM update cycle. Use it immediately after you’ve changed some data to wait for the DOM update.  */
  $tick: (callback?: () => void) => Promise<any>
  /** Update/rerender component when state/data changed  */
  $update: () => void
  /** Component method where you pass mergeState object that will be merged with current component state */
  $setState: (mergeState?: object) => void
}
export interface ComponentOptions {
  mixins?: ComponentOptions[] | string[]
  /** Template7 template string. Will be compiled as Template7 template */
  template? : string
  /** Render function to render component. Must return full html string or HTMLElement */
  render? : (this: ComponentClass) => string | HTMLElement
  /** Component data, function must return component context data or Promise that should be resolved with data */
  data? : (this: ComponentClass) => any
  /** Component CSS styles. Styles will be added to the document after component will be mounted (added to DOM), and removed after component will be destroyed (removed from the DOM) */
  style? : string
  /** Object with additional component methods which extend component context */
  methods? : { [name : string] : (this: ComponentClass, ...args: any) => any }
  /** Object with page events handlers */
  on? : { [event : string] : (this: ComponentClass, e: Event, page: any) => void }
  /** Object with page events once handlers */
  once? : { [event : string] : (this: ComponentClass, e: Event, page: any) => void }

  /** Called synchronously immediately after the component has been initialized, before data and event/watcher setup. */
  beforeCreate? : (this: ComponentClass) => void
  /** Called synchronously after the component is created, context data and methods are available and component element $el is also created and available */
  created? : (this: ComponentClass) => void
  /** Called right before component will be added to DOM */
  beforeMount? : (this: ComponentClass) => void
  /** Called right after component was be added to DOM */
  mounted? : (this: ComponentClass) => void
  /** Called right after component VDOM has been patched */
  updated? : (this: ComponentClass) => void
  /** Called right before component will be destoyed */
  beforeDestroy? : (this: ComponentClass) => void
  /** Called when component destroyed */
  destroyed? : (this: ComponentClass) => void
}
export namespace Component {
  interface AppMethods {
    /** Object with router/view cache data */
    component: {
      /** Create and init component */
      create(component: ComponentClass["constructor"] | ComponentOptions, context?: object): Promise<ComponentClass>
      /** Parse component from single file component-style string */
      parse(componentString: string): ComponentOptions,
      /** Register custom component */
      registerComponent(tagName: string, component: ComponentOptions | ComponentClass): void;
      /** Register component mixin */
      registerComponentMixin(mixinName: string, mixin: ComponentOptions): void
    }
  }
  interface AppParams {
  }
  interface AppEvents {
  }
}

declare const ComponentModule: Framework7Plugin;

export default ComponentModule;
