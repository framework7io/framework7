import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Panel {
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
    /** Event will be triggered when it becomes collapsed/hidden when app width matches its collapsedBreakpoint. As an argument event handler receives panel instance */
    collapsedBreakpoint: (panel : Panel) => void
    /** Event will be triggered when it becomes visible/hidden when app width matches its breakpoint. As an argument event handler receives panel instance */
    breakpoint: (panel : Panel) => void
    /** Event will be triggered right when resizable Panel resized */
    resize: (panel : Panel, panelWidth: number) => void
    /** Event will be triggered right before Panel instance will be destroyed */
    beforeDestroy: (panel : Panel) => void
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
    /** Enables resizable panel */
    resizable?: string
    /** Enables Panel backdrop (dark semi transparent layer behind). (default true) */
    backdrop?: boolean
    /** Option to pass custom backdrop element */
    backdropEl?: HTMLElement | CSSSelector
    /** Minimal app width (in px) when panel becomes always visible. */
    visibleBreakpoint?: number
    /** Minimal app width (in px) when panel becomes visible but collapsed. */
    collapsedBreakpoint?: number
    /** Enables ability to open/close panel with swipe (default false) */
    swipe?: boolean
    /** Fallback option for potentially better performance on old/slow devices. If you enable it, then swipe panel will not follow your finger during touch move, it will be automatically opened/closed on swipe left/right. (default false) */
    swipeNoFollow?: boolean
    /** This parameter allows to close (but not open) panel with swipes. (default false) */
    swipeOnlyClose?: boolean
    /** Width (in px) of invisible edge from the screen that triggers swipe panel. (default 0) */
    swipeActiveArea?: number
    /** Panel will not move with swipe if "touch distance" will be less than this value (in px).. (default 0) */
    swipeThreshold?: number
    /** Enable/disable ability to close panel by clicking outside of panel (on panel's backdrop). (default true) */
    closeByBackdropClick? : boolean
    /** Element to mount panel to. (default app.root) */
    containerEl?: HTMLElement | CSSSelector
  }

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
    /** Element to mount panel to. (default app.root) */
    containerEl: HTMLElement | CSSSelector
    /** Dom7 instance with with element to mount panel to. (default app.root) */
    $containerEl: HTMLElement | CSSSelector

    /** Open panel. */
    open(animate : boolean) : void
    /** Close panel. */
    close(animate : boolean) : void
    /** Toggle panel */
    toggle(animate : boolean) : void
    /** Destroy panel instance */
    destroy() : void

    /** Enable visible breakpoint */
    enableVisibleBreakpoint() : void
    /** Disable visible breakpoint */
    disableVisibleBreakpoint() : void
    /** Toggle visible breakpoint */
    toggleVisibleBreakpoint() : void

    /** Enable collapsed breakpoint */
    enableCollapsedBreakpoint() : void
    /** Disable collapsed breakpoint */
    disableCollapsedBreakpoint() : void
    /** Toggle collapsed breakpoint */
    toggleCollapsedBreakpoint() : void

    /** Enable resizable panel */
    enableResizable() : void
    /** Disable resizable panel */
    disableResizable() : void

    /** Enable swipeable panel */
    enableSwipe() : void
    /** Disable swipeable panel */
    disableSwipe() : void
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
    /** Event will be triggered when it becomes collapsed/hidden when app width matches its collapsedBreakpoint */
    'panel:collapsedbreakpoint': () => void
    /** Event will be triggered right when resizable Panel resized */
    'panel:resize': () => void
    /** Event will be triggered right before Panel instance will be destroyed */
    'panel:beforedestroy': () => void
  }

  interface AppMethods {
    panel: {
      /** create new panel instance */
      create(parameters : Parameters) : Panel
      /** open panel */
      open(el?: HTMLElement | CSSSelector | Panel | 'left' | 'right', animate?: boolean) : boolean
      /** close panel */
      close(el?: HTMLElement | CSSSelector | Panel | 'left' | 'right', animate?: boolean) : boolean
      /** toggle panel */
      toggle(el?: HTMLElement | CSSSelector | Panel | 'left' | 'right', animate?: boolean) : boolean
      /** get Panel instance by specified side */
      get(el?: HTMLElement | CSSSelector | Panel | 'left' | 'right', animate?: boolean) : Panel
      /** destroy Panel instance */
      destroy(el : HTMLElement | CSSSelector | Panel | 'left' | 'right') : void
    }
  }
  interface AppParams {
    panel?: Parameters | undefined
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
    /** Event will be triggered when it becomes collapsed/hidden when app width matches its collapsedBreakpoint. As an argument event handler receives panel instance */
    panelCollapsedBreakpoint: (panel : Panel) => void
    /** Event will be triggered when it becomes visible/hidden when app width matches its breakpoint. As an argument event handler receives panel instance */
    panelBreakpoint: (panel : Panel) => void
    /** Event will be triggered right when resizable Panel resized */
    panelResize: (panel : Panel, panelWidth: number) => void
    /** Event will be triggered right before Panel instance will be destroyed */
    panelBeforeDestroy: (panel : Panel) => void
  }
}

declare const PanelComponent: Framework7Plugin;

export default PanelComponent;
