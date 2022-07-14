import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Statusbar {
  interface AppParams {
    /** Statusbar parameters */
    statusbar?:
      | {
          /** Enables statusbar handling by Framework7. Disable it if you don't want Framework7 to handle statusbar behavior */
          enabled?: boolean;
          /** If enabled, then click on statusbar overlay will scroll top page content to the top.This functionality is only available when app is running under cordova/capacitor environment with installed cordova-plugin-statusbar */
          scrollTopOnClick?: boolean;
          /** Hex string (#RRGGBB) with background color when app running under iOS device. If passed then it will override CSS value */
          iosBackgroundColor?: string;
          /** Makes the statusbar overlay or not overlay the WebView. This functionality is only available when app is running on iOS device under cordova/capacitor environment with installed cordova-plugin-statusbar*/
          iosOverlaysWebView?: boolean;
          /** Statusbar text color. Can be white or black. This functionality is only available when app is running on iOS under cordova/capacitor environment with installed cordova-plugin-statusbar */
          iosTextColor?: string;
          /** Hex string (#RRGGBB) with background color when app running on Android device. If passed then it will override CSS value */
          androidBackgroundColor?: string;
          /** Makes the statusbar overlay or not overlay the WebView. This functionality is only available when app is running on Android and under cordova/capacitor environment with installed cordova-plugin-statusbar
           */
          androidOverlaysWebView?: boolean;
          /** Statusbar text color. Can be white or black. This functionality is only available when app is running on Android and under cordova/capacitor environment with installed cordova-plugin-statusbar */
          androidTextColor?: string;
        }
      | undefined;
  }

  interface AppMethods {
    /** Statusbar methods and properties */
    statusbar: {
      /** Hide statusbar. In webapp it just hides statusbar overlay, but in cordova app it will hide statusbar at all. Hiding device statusbar is available when app is running under cordova/capacitor environment with installed cordova-plugin-statusbar */
      hide(): void;
      /** Show statusbar */
      show(): void;
      /** Makes the statusbar overlay or not overlay the WebView. This functionality is only available when app is running under cordova/capacitor environment with installed cordova-plugin-statusbar */
      overlaysWebView(overlays: boolean): void;
      /** "Set/change statusbar text color. "color" can be white or black. This functionality is only available when app is running under cordova/capacitor environment with installed cordova-plugin-statusbar" */
      setTextColor(color: string): void;
      /** Set/change statusbar background colorhex - string - Hex string (#RRGGBB) with background color */
      setBackgroundColor(hex: string): void;
      /** Returns Promise resolved with "true" if system statusbar is visible and false when it is not visible. This functionality is only available when app is running under cordova/capacitor/capacitor environment with installed cordova-plugin-statusbar */
      isVisible(): Promise<boolean>;
    };
  }
  interface AppEvents {}
}

declare const StatusbarComponent: Framework7Plugin;
export default StatusbarComponent;
