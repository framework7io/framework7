export interface Device {
  /** true for iOS device */
  ios: boolean;
  /** true for Android device */
  android: boolean;
  /** true for Android Chrome */
  androidChrome: boolean;
  /** true for desktop browser */
  desktop: boolean;
  /** true for iPhone */
  iphone: boolean;
  /** true for iPod */
  ipod: boolean;
  /** true for iPad */
  ipad: boolean;
  /** true for MS Edge browser */
  edge: boolean;
  /** true for Internet Explorer browser */
  ie: boolean;
  /** true for FireFox browser */
  firefox: boolean;
  /** true for desktop macOS */
  macos: boolean;
  /** true for desktop windows */
  windows: boolean;
  /** true when app running in cordova environment */
  cordova: boolean;
  /** true when app running in capacitor environment */
  capacitor: boolean;
  /** true when app is running under Electron environment */
  electron: boolean;
  /** true when app is running under NW.js environment */
  nwjs: boolean;
  /** true when app running in cordova environment */
  phonegap: boolean;
  /** true if app runs in web view - webapp installed to home screen */
  webView: boolean;
  /** true if app runs in web view - webapp installed to home screen */
  standalone: boolean;
  /** Contains OS can be ios, android, macos, windows */
  os: string;
  /** Contains OS version, e.g. 11.2.0 */
  osVersion: string;
  /** Device pixel ratio */
  pixelRatio: number;
  /** Returns 'dark' or 'light' if (prefers-color-theme) media supported, otherwise returns undefined */
  prefersColorScheme(): string;
}

export interface DeviceParams {
  userAgent: string;
}

export const getDevice: (overrides?: DeviceParams) => Device;
