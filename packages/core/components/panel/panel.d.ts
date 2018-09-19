import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Panel {
  interface Panel extends Framework7EventsClass<Events>{
    /** Link to global app instance */
    app : Framework7
    /** String with panel side: left or right */
    side : 'left' | 'right'
    /** String with panel effect: cover or reveal */
    effect: 'cover' | 'reveal'
    /** Boolean property indicating whether it is opened or not */
    opened: boolean
    /** Panel HTML element */
    el : HTMLElement
    /** Dom7 instance with panel HTML element */
    $el: Dom7Instance
    /** Backdrop HTML element */
    backdropEl : HTMLElement
    /** Dom7 instance with backdrop HTML element */
    $backdropEl: Dom7Instance
    /** Popup parameters */
    params : Parameters

    /** Open panel. */
    open(animate : boolean) : void
    /** Close panel. */
    close(animate : boolean) : void
    /** Destroy panel instance */
    destroy() : void
  }

  interface Parameters {
    /** Panel element. */
    el?: HTMLElement
    /** Panel element HTML string. */
    content?: string
    /** Can be left or right. If not passed then will be determined based on panel-left or panel-right element classes. */
    side?: string
    /** Can be cover or reveal. If not passed then will be determined based on panel-cover or panel-reveal element classes. */
    effect?: string
  }

  interface Events {
    /** Event will be triggered when Panel starts its opening animation. As an argument event handler receives panel instance */
    open: (panel : Panel) => void
    /** Event will be triggered when Panel completes its opening animation. As an argument event handler receives panel instance */
    opened: (panel : Panel) => void
    /** Event will be triggered when Panel starts its closing animation. As an argument event handler receives panel instance */
    close: (panel : Panel) => void
    /** Event will be triggered after Notification completes its closing animation. As an argument event handler receives notification instance */
    closed: (panel : Panel) => void
    /** Event will be triggered when the panel backdrop is clicked. As an argument event handler receives panel instance */
    backdropClick: (panel : Panel) => void
    /** Event will be triggered in the very beginning of opening it with swipe. As an argument event handler receives panel instance */
    swipeOpen: (panel : Panel) => void
    /** Event will be triggered for swipe panel during touch swipe action. As an argument event handler receives panel instance and opened progress (from 0 to 1) */
    swipe: (panel : Panel, progress: number) => void
    /** Event will be triggered when it becomes visible/hidden when app width matches its breakpoint. As an argument event handler receives panel instance */
    breakpoint: (panel : Panel) => void
    /** Event will be triggered right before Panel instance will be destroyed */
    beforeDestroy: (panel : Panel) => void
  }

  interface DomEvents {
    /** Event will be triggered when Panel starts its opening animation */
    'panel:open': () => void
    /** Event will be triggered after Panel completes its opening animation */
    'panel:opened': () => void
    /** Event will be triggered when Panel starts its closing animation */
    'panel:close': () => void
    /** Event will be triggered after Panel completes its closing animation */
    'panel:closed': () => void
    /** Event will be triggered when the panel overlay is clicked */
    'panel:backdrop-click	': () => void
    /** Event will be triggered in the very beginning of opening it with swipe */
    'panel:swipeopen': () => void
    /** Event will be triggered for swipe panel during touch swipe action */
    'panel:swipe': () => void
    /** Event will be triggered when it becomes visible/hidden when app width matches its breakpoint */
    'panel:breakpoint': () => void
    /** Event will be triggered right before Panel instance will be destroyed */
    'panel:beforedestroy': () => void
  }

  interface AppMethods {
    panel: {
      /** open panel */
      open(side?: 'left' | 'right', animate?: boolean) : boolean
      /** close panel */
      close(side?: 'left' | 'right', animate?: boolean) : boolean
      /** create new panel instance */
      create(parameters : Parameters) : Panel
      /** get Panel instance by specified side */
      get(side : 'left' | 'right') : Panel
      /** enable swipes for panel (swipe-to-close and swipe-to-open) */
      enableSwipe(side : 'left' | 'right') : void
      /** disable swipes for panel (swipe-to-close and swipe-to-open) */
      disableSwipe(side : 'left' | 'right') : void
      /** left panel instance */
      left : Panel
      /** right panel instance */
      right : Panel
    }
  }
  interface AppParams {
    panel?: {
      /** Minimal app width (in px) when left panel becomes always visible. */
      leftBreakpoint? : number
      /** Minimal app width (in px) when right panel becomes always visible. */
      rightBreakpoint? : number
      /** Disabled by default. If you want to enable ability to open/close side panels with swipe you can pass here left (for left panel) or right (for right panel) or both (for both panels).. */
      swipe? : string
      /** Width (in px) of invisible edge from the screen that triggers swipe panel. (default 0) */
      swipeActiveArea? : number
      /** This parameter gives ability to close opposite panel by swipe. For example, if your swipePanel is "left", then you could close "right" panel also with swipe.. (default true) */
      swipeCloseOpposite? : boolean
      /** This parameter allows to close (but not open) panels with swipes. (default false) */
      swipeOnlyClose? : boolean
      /** Fallback option for potentially better performance on old/slow devices. If you enable it, then side panel will not follow your finger during touch, it will be automatically opened/closed on swipe left/right.. (default false) */
      swipeNoFollow? : boolean
      /** Panel will not move with swipe if "touch distance" will be less than this value (in px).. (default 0) */
      swipeThreshold? : number
      /** Enable/disable ability to close panel by clicking outside of panel (on panel's backdrop). (default true) */
      closeByBackdropClick? : boolean
    } | undefined
  }
  interface AppEvents {
    /** Event will be triggered when Panel starts its opening animation. As an argument event handler receives panel instance */
    panelOpen: (panel : Panel) => void
    /** Event will be triggered when Panel completes its opening animation. As an argument event handler receives panel instance */
    panelOpened: (panel : Panel) => void
    /** Event will be triggered when Panel starts its closing animation. As an argument event handler receives panel instance */
    panelClose: (panel : Panel) => void
    /** Event will be triggered after Notification completes its closing animation. As an argument event handler receives notification instance */
    panelClosed: (panel : Panel) => void
    /** Event will be triggered when the panel backdrop is clicked. As an argument event handler receives panel instance */
    panelBackdropClick: (panel : Panel) => void
    /** Event will be triggered in the very beginning of opening it with swipe. As an argument event handler receives panel instance */
    panelSwipeOpen: (panel : Panel) => void
    /** Event will be triggered for swipe panel during touch swipe action. As an argument event handler receives panel instance and opened progress (from 0 to 1) */
    panelSwipe: (panel : Panel, progress: number) => void
    /** Event will be triggered when it becomes visible/hidden when app width matches its breakpoint. As an argument event handler receives panel instance */
    panelBreakpoint: (panel : Panel) => void
    /** Event will be triggered right before Panel instance will be destroyed */
    panelBeforeDestroy: (panel : Panel) => void
  }
}

declare const PanelComponent: Framework7Plugin;

export default PanelComponent;
