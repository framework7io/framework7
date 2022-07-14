import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace PullToRefresh {
  interface PullToRefresh extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** PTR HTML element (ptr-content) */
    el: HTMLElement;
    /** Dom7 instance with PTR HTML element (ptr-content) */
    $el: Dom7Array;
    /** Reset PTR state */
    done(): void;
    /** Trigger PTR */
    refresh(): void;
    /** Destroy PTR instance and remove PTR event listeners from the specified HTML element */
    destroy(): void;
  }

  interface Events {
    /** Event will be triggered when you start to move pull to refresh content. As an argument event handler receives ptr element */
    pullStart(el: HTMLElement): void;
    /**  */
    pullMove(el: HTMLElement, data: Data): void;
    /**  */
    pullEnd(el: HTMLElement, data: Data): void;
    /**  */
    refresh(el: HTMLElement, done: () => void): void;
    /**  */
    done(el: HTMLElement): void;
    /**  */
    beforeDestroy(ptr: PullToRefresh): void;
  }

  interface DomEvents {
    /** Event will be triggered when you start to move pull to refresh content */
    'ptr:pullstart': () => void;
    /** Event will be triggered during you move pull to refresh content */
    'ptr:pullmove': () => void;
    /** Event will be triggered when you release pull to refresh content */
    'ptr:pullend': () => void;
    /** Event will be triggered when pull to refresh enters in "refreshing" state. event.detail contain ptr.done method to reset its state after loading completed */
    'ptr:refresh': () => void;
    /** Event will be triggered after pull to refresh is done and it is back to initial state (after calling ptr.done method) */
    'ptr:done': () => void;
    /** Event will be triggered right before PTR instance will be destroyed */
    'ptr:beforedestroy': () => void;
  }

  interface Data {
    /** touchmove event */
    event: Event;
    /** current scroll top position */
    scrollTop: number;
    /** current translateY offset */
    translate: number;
    /** touches difference (in px) */
    touchesDiff: number;
  }
  interface AppMethods {
    ptr: {
      /** initialise PTR on specified HTML element container */
      create(el: HTMLElement | CSSSelector): PullToRefresh;

      /** remove PTR event listeners from the specified HTML element */
      destroy(el: HTMLElement | CSSSelector | PullToRefresh): void;

      /** get PTR instance by HTML element */
      get(el: HTMLElement | CSSSelector): PullToRefresh;

      /** reset PTR state on specified PTR content element */
      done(el: HTMLElement | CSSSelector): PullToRefresh;

      /** trigger PTR on specified PTR content element */
      refresh(el: HTMLElement | CSSSelector): PullToRefresh;
    };
  }

  interface AppParams {}

  interface AppEvents {
    /** Event will be triggered when you start to move pull to refresh content. As an argument event handler receives ptr element */
    ptrPullStart(el: HTMLElement): void;
    /**  */
    ptrPullMove(el: HTMLElement, data: Data): void;
    /**  */
    ptrPullEnd(el: HTMLElement, data: Data): void;
    /**  */
    ptrRefresh(el: HTMLElement, done: () => void): void;
    /**  */
    ptrDone(el: HTMLElement): void;
    /**  */
    ptrBeforeDestroy(ptr: PullToRefresh): void;
  }
}

declare const PullToRefreshComponent: Framework7Plugin;

export default PullToRefreshComponent;
