import Framework7 from '../../components/app/app-class';

namespace ResizeModule {

}

declare module '../../components/app/app-class' {
  interface Framework7Class {
    /** App width in px */
    width : number
    /** App height in px */
    height : number
    /** App left offset in px */
    left : number
    /** App top offset in px */
    top : number
  }
  interface Framework7Params {
  }
  interface Framework7AppEvents {
    /** Event will be fired on app resize (window resize). */
    'resize': () => void
    /** Event will be fired on app orientation change (window orientantion change). */
    'orientationchange': () => void
  }
}

export default ResizeModule;