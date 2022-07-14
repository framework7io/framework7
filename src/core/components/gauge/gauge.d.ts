import { Dom7Array } from 'dom7';
import Framework7, {
  CSSSelector,
  Framework7EventsClass,
  Framework7Plugin,
} from '../app/app-class.js';

export namespace Gauge {
  interface Gauge extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app: Framework7;
    /** Gauge HTML element */
    el: HTMLElement;
    /** Dom7 instance with gauge HTML element */
    $el: Dom7Array;
    /** Gauge generated SVH HTML element */
    svgEl: HTMLElement;
    /** Dom7 instance with generated SVG HTML element */
    $svgEl: Dom7Array;
    /** Gauge parameters */
    params: Parameters;

    /** Update/rerender gauge SVG element according to passed parameters. It accepts object with same parameters required for gauge initialization. You can pass only parameters that needs to be updated */
    update(parameters: Omit<Parameters, 'el'>): Gauge;
    /** Destroys gauge instance */
    destroy(): void;
  }

  interface Parameters {
    /** Gauge element. HTMLElement or string with CSS selector of gauge element. Generated SVG will be inserted into this element. */
    el: HTMLElement | CSSSelector;
    /** Gauge type. Can be circle or semicircle. (default circle) */
    type?: string;
    /** Gauge value/percentage. Must be a number between 0 and 1. (default 0) */
    value?: number;
    /** Generated SVG image size (in px). (default 200) */
    size?: number;
    /** Gauge background color. Can be any valid color string, e.g. #ff00ff, rgb(0,0,255), etc.. (default transparent) */
    bgColor?: string;
    /** Main border/stroke background color. (default #eeeeee) */
    borderBgColor?: string;
    /** Main border/stroke color. (default #000000) */
    borderColor?: string;
    /** Main border/stroke width. (default 10) */
    borderWidth?: string;
    /** Gauge value text (large text in the center of gauge). (default null) */
    valueText?: string;
    /** Value text color. (default #000000) */
    valueTextColor?: string;
    /** Value text font size. (default 31) */
    valueFontSize?: string;
    /** Value text font weight. (default 500) */
    valueFontWeight?: string;
    /** Gauge additional label text. (default null) */
    labelText?: string;
    /** Label text color. (default #888888) */
    labelTextColor?: string;
    /** Label text font size. (default 14) */
    labelFontSize?: string;
    /** Label text font weight. (default 400) */
    labelFontWeight?: string;
    /** Object with events handlers.. */
    on?: {
      [event in keyof Events]?: Events[event];
    };
  }

  interface Events {
    /** Event will be triggered right before Gauge instance will be destroyed. As an argument event handler receives Gauge instance */
    beforeDestroy: (dialog: Gauge) => void;
  }

  interface DomEvents {
    /** Event will be triggered right before Gauge instance will be destroyed */
    'gauge:beforedestroy': () => void;
  }
  interface AppMethods {
    gauge: {
      /** create Gauge instance */
      create(parameters: Gauge.Parameters): Gauge;
      /** destroy Gauge instance */
      destroy(el: HTMLElement | CSSSelector | Gauge): void;
      /** get Gauge instance by HTML element */
      get(el: HTMLElement | CSSSelector): Gauge;
      /** update/rerender Gauge SVG according to passed parameters */
      update(parameters: Omit<Parameters, 'el'>): Gauge;
    };
  }
  interface AppParams {
    gauge?: Parameters | undefined;
  }
  interface AppEvents {
    /** Event will be triggered right before Gauge instance will be destroyed. As an argument event handler receives Gauge instance */
    gaugeBeforeDestroy: (dialog: Gauge) => void;
  }
}

declare const GaugeComponent: Framework7Plugin;

export default GaugeComponent;
