import { CSSSelector, Framework7Plugin } from '../app/app-class';

export namespace Tabs {
  interface TabShowResult {
    newTabEl: HTMLElement;
    oldTabEl: HTMLElement | undefined;
    onTabsChanged(callback: Function): void;
    animated: boolean;
  }
  interface DomEvents {
    /** Event will be triggered when Tab becomes visible/active */
    'tab:show': (event: any) => void;
    /** Event will be triggered when Tab becomes hidden/inactive */
    'tab:hide': (event: any) => void;
  }
  interface AppMethods {
    tab: {
      /** Show tab */
      show(tabEl: HTMLElement | CSSSelector, animate?: boolean): TabShowResult;
      /** Show tab */
      show(
        tabEl: HTMLElement | CSSSelector,
        tabLinkEl?: HTMLElement | CSSSelector,
        animate?: boolean,
      ): TabShowResult;
    };
  }
  interface AppParams {}
  interface AppEvents {
    /** Event will be triggered when Tab becomes visible/active */
    tabShow: (tabEl: HTMLElement) => void;
    /** Event will be triggered when Tab becomes hidden/inactive */
    tabHide: (tabEl: HTMLElement) => void;
  }
}

declare const TabsComponent: Framework7Plugin;

export default TabsComponent;
