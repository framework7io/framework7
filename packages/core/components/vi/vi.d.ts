import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace Vi {
  interface Vi extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7
    /** Original vi ad instance */
    ad: object
    /** vi ad parameters */
    params: Parameters
    /** Start ad video. Useful in case of disabled autoplay */
    start(): void
    /** Pause ad video */
    pause(): void
    /** Resume ad video */
    resume(): void
    /** Stop ad video, in this case ad will be closed and destroyed. It will be impossible to proceed with this video ad */
    stop(): void
    /** Destroy vi ad instance */
    destroy(): void
  }
  interface Parameters {
    /** Global app parameter which enables vi API and vi SDK to load. If you pass any vi parameters under vi app parameters then it will enable vi api as well */
    enabled?: boolean
    /** App bundle id, if not specified then equal to id app parameter */
    appId?: string
    /** vi placemenet ID, you can use this one for testing, and switch to yours real one for production */
    placementId?: string
    /** Ad type. Can be interstitial (when ad runs as full screen video) or instream (when ad video  */
    placementType?: string
    /** Enables video ad autoplay */
    autoplay?: boolean
    /** Defines whether the ad must start muted or not. By default is true when app is running as a web app (not Cordova) under mobile device (iOS or Android). It is required because on mobile device video autoplay usually requires additional user interaction */
    startMuted?: boolean
    /** Enables overlay layer that will be visible when ad can not autoplay (in case video autoplay requires user interaction) */
    fallbackOverlay?: boolean
    /** Fallback overlay text */
    fallbackOverlayText?: string
    /** App version, if not specified then equal to version app parameter */
    appVer?: string
    /** App language, if not specified then equal to language app parameter */
    language?: string
    /** App width in px. If not specified then equal to app container width */
    width?: number
    /** App height in px. If not specified then equal to app container height */
    height?: number
    /** Enable ad interface progress bar */
    showProgress?: boolean
    /** Enable ad interface vi branding logo */
    showBranding?: boolean
    /** Enable ad interface mute button */
    showMute?: boolean
    /** Operating system, if not specified then will be equal to app.device.os */
    os?: string
    /** Operating system version, if not specified then will be equal to app.device.osVersion */
    osVersion?: string
    /** Device orientation, if not specified then will be detected based on window.orientation */
    orientation?: string
    /** User age (optional) */
    age?: number
    /** User gender (optional) */
    gender?: string
    /** Unique advertiser identifier (optional) */
    advertiserId?: string
    /** Device location latitude (optional) */
    latitude?: number
    /** Device location longitude (optional) */
    longitude?: number
    /** App store id (optional) */
    storeId?: string
    /** Device IP address (optional) */
    ip?: string
    /** Device manufacturer (optional) */
    manufacturer?: string
    /** Device model */
    model?: string
    /** Device connection type (optional) */
    connectionType?: string
    /** Device connection provider (optional) */
    connectionProvider?: string
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]? : Events[event]
    }
  }
  interface Events {
    ready: () => void
    started: () => void
    click: (url: string) => void
    impression: () => void
    stopped: () => void
    complete: () => void
    userexit: () => void
    autplayFailed: () => void
    error: () => void
  }
  interface AppMethods {
    vi: {
      /** Create (and show) vi video ad */
      createAd(parameters: Parameters): Vi
      /** Loads vi SDK. By default if vi is not disabled in app parameters then it will load it automatically */
      loadSkd(): void
      /** Boolean property indicating whether the vi SDK is ready or not */
      sdkReady: boolean
    }
  }
  interface AppParams {
    vi?: Parameters | undefined
  }
  interface AppEvents {
    viSdkReady: () => void
  }
}

declare const ViComponent: Framework7Plugin;
export default ViComponent;