import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace TouchHighlight {
  interface TouchHighlight {
    $highlightEl: Dom7Array;
    highlightTransform: string;
    removing: boolean;
    remove(): void;
  }
  interface AppMethods {
    touchHighlight: {
      create($el: Dom7Array, x: number, y: number): TouchHighlight;
    };
  }
  interface AppParams {}
  interface AppEvents {}
}

declare const TouchHighlightComponent: Framework7Plugin;
export default TouchHighlightComponent;
