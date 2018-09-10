import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Statusbar {
  interface AppParams {
    /** Statusbar parameters */
    statusbar?: {
      /** Enables statusbar handling by Framework7. Disable it if you
      * don't want Framework7 to handle statusbar behavior */
      enabled?:boolean
      /** Can be true, false, auto. Defines whether the statusbar overlay
      * should be visible or not. In case of autoFramework7 will detect
      * it automatically depending whether the app is in fullscreen mode
      * or not */
      overlay?: string | boolean
      /** Hex string (#RRGGBB) with background color when iOS theme is
      * active. If passed then it will override CSS value */
      iosBackgroundColor?:string
      /** Hex string (#RRGGBB) with background color when MD theme is
      * active. If passed then it will override CSS value */
      materialBackgroundColor?:string
      /** If enabled, then click on statusbar overlay will scroll top page
      * content to the top.This functionality is only available when app
      * is running under cordova/phonegap environment with installed
      * cordova-plugin-statusbar */
      scrollTopOnClick?:boolean
      /** "Makes the statusbar overlay or not overlay the WebView. iOS-only feature.
      This functionality is only available when app is running under cordova/phonegap
      environment with installed cordova-plugin-statusbar"
      */
      iosOverlaysWebView?:boolean
      /** "Statusbar text color. Can be white or black iOS-only feature. This
      functionality is only available when app is running under cordova/phonegap
      environment with installed cordova-plugin-statusbar" */
      iosTextColor?:string
    } | undefined
  }

  interface AppMethods {
    /** Statusbar methods and properties */
    statusbar: {
      /** Hide statusbar. In webapp it just hides statusbar overlay, but
      * in cordova app it will hide statusbar at all.Hiding device
      * statusbar is available when app is running under cordova/phonegap
      * environment with installed cordova-plugin-statusbar */
      hide() : void
      /** Show statusbar */
      show() : void
      /** Makes the statusbar overlay or not overlay the WebView.  overlays -
      * boolean - does it overlay or notThis functionality is only
      * available when app is running under cordova/phonegap environment
      * with installed cordova-plugin-statusbar */
      iosOverlaysWebView(overlays : boolean) : void
      /** "Set/change statusbar text color.color - string - text color,
      can be white or blackiOS-only feature This functionality is only
      available when app is running under cordova/phonegap environment
      with installed cordova-plugin-statusbar" */
      setIosTextColor(color : string) : void
      /** Set/change statusbar background colorhex - string - Hex string
      * (#RRGGBB) with background color */
      setBackgroundColor(hex : string) : void
      /** Returns true if system statusbar is visible and false when it is
      * not visibleThis functionality is only available when app is
      * running under cordova/phonegap environment with installed
      * cordova-plugin-statusbar */
      isVisible() : boolean
    }
  }
  interface AppEvents {}
}

declare const StatusbarComponent: Framework7Plugin;
export default StatusbarComponent;
