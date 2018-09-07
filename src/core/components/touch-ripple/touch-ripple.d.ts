import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';

export namespace TouchRipple {
  interface TouchRipple {
    $rippleWaveEl: Dom7Instance
    rippleTransform: string
    removing: boolean
    remove(): void
  }
  interface AppMethods {
    touchRipple: {
      create($el: Dom7Instance, x: number, y: number) : TouchRipple
    }
  }
  interface AppParams {

  }
  interface AppEvents {

  }
}

declare const TouchRippleComponent: Framework7Plugin;
export default TouchRippleComponent;