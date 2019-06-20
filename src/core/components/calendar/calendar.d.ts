import { Dom7Instance } from 'dom7';
import Framework7, { CSSSelector, Framework7EventsClass, Framework7Plugin } from '../app/app-class';
import { View } from '../view/view';

export namespace Calendar {
  interface Calendar extends Framework7EventsClass<Events> {
    /** Link to global app instance */
    app : Framework7
    /** Calendar wrapping container HTML element (when inline calendar is in use) */
    containerEl : HTMLElement
    /** Dom7 instance with calendar wrapping container HTML element (when inline calendar is in use) */
    $containerEl : Dom7Instance
    /** Calendar HTML element */
    el : HTMLElement
    /** Dom7 instance with calendar HTML element */
    $el : Dom7Instance
    /** Calendar input HTML element (passed in inputEl parameter) */
    inputEl : HTMLElement
    /** Dom7 instance with calendar input HTML element (passed in inputEl parameter) */
    $inputEl : Dom7Instance
    /** Array where each item represents selected date */
    value : Date[]
    /** Calendar view current month. Number, from 0 to 11 */
    currentMonth: number
    /** Calendar view current year. Number, for example 2020 */
    currentYear: number
    /** true if Calendar is currently opened */
    opened : boolean
    /** true when inline calendar is in use */
    inline : boolean
    /** Array with specified Calendar columns. Each column also has its own methods and properties (look below) */
    cols : object[]
    /** Calendar URL (that was passed in url parameter) */
    url: string
    /** Calendar View (that was passed in view parameter) or found parent view */
    view : View.View
    /** Object with initialization parameters */
    params : Parameters


    /** Set new selected dates. values is array where each item represents selected date */
    setValue(values : Date[]) : void
    /** Returns current calendar value */
    getValue() : Date[]
    /** Adds value to the values array. Useful in case if multiple selection is enabled (with multiple: true parameter) */
    addValue(value: Date) : void
    /** Rerenders calendar. Useful in case you added/changed values dynamically and need to update calendar layout */
    update() : void
    /** Calendar transition to next month for specified duration in ms */
    nextMonth(duration : number) : void
    /** Calendar transition to previous month for specified duration in ms */
    prevMonth(duration : number) : void
    /** Calendar transition to next year */
    nextYear() : void
    /** Calendar transition to previous year */
    prevYear() : void
    /** Calendar transition to specified year, month for specified duration in ms */
    setYearMonth(year : number, month : number, duration : number) : void
    /** Open Calendar */
    open() : void
    /** Close Calendar */
    close() : void
    /** Destroy Calendar instance and remove all events */
    destroy() : void
  }

  type DateRangeItem =
  | [ Date, Date ]
  | { (candidate : Date) : boolean }
  | { from: Date, to: Date }
  | { from: Date }
  | { to: Date }
  | { date: Date };
  type DateRange = DateRangeItem | DateRangeItem[];

  interface RangeClass {
    cssClass: string
    range: DateRange
  }

  interface Parameters {
    /** Calendar type, can be gregorian or jalali. (default gregorian) */
    calendarType?: string
    /** Array with initial selected dates. Each array item represents selected date. */
    value?: Date[]
    /** Additonal disabled dates. Parameter accepts so called Date Range (look below for details). */
    disabled?: DateRange
    /** Dates with events. Will be marked with additonal "dot" on calendar day. Parameter accepts so called Date Range (look below for details).. */
    events?: DateRange | (Extract<DateRange, {}> & { color: string })
    /** Date ranges you want to add custom CSS class for additional styling. Look below for accepted format. */
    rangesClasses?: RangeClass[]
    /** Function to format input value, should return new/formatted string value. values is array where each item represents selected date. */
    formatValue?: (values : Date) => string
    /** Array with full month names. (default ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December']) */
    monthNames?: string[]
    /** Array with short month names. (default ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']) */
    monthNamesShort?: string[]
    /** Array with week day names. (default ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) */
    dayNames?: string[]
    /** Array with week day short names. (default ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']) */
    dayNamesShort?: string[]
    /** First day of the week. By default 1 - Monday. (default 1) */
    firstDay?: number
    /** Array with index numeber of weekend days, by default it is Saturday and Sunday. (default [0, 6]) */
    weekendDays?: number[]
    /** Object with configuration for Jalali type calendar. (default object) */
    jalali?: {
      /** Array with full month names. (default ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December']) */
      monthNames?: string[]
      /** Array with short month names. (default ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']) */
      monthNamesShort?: string[]
      /** Array with week day names. (default ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']) */
      dayNames?: string[]
      /** Array with week day short names. (default ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']) */
      dayNamesShort?: string[]
      /** First day of the week. By default 1 - Monday. (default 1) */
      firstDay?: number
      /** Array with index numeber of weekend days, by default it is Saturday and Sunday. (default [0, 6]) */
      weekendDays?: number[]
      /** Object with configuration for Jalali type calendar. (default object) */
    }
    /** Default date format. (default 'yyyy-mm-dd') */
    dateFormat?: string
    /** Enable to allows select multiple dates/values. (default false) */
    multiple?: boolean
    /** Enable to enable range picker. Not compatible with multiple. (default false) */
    rangePicker?: boolean
    /** Minimum days that need to be selected when rangePicker enabled. (default 1) */
    rangePickerMinDays?: number
    /** Maximum days allowed to be selected when rangePicker enabled. 0 means no maximum. (default 0) */
    rangePickerMaxDays?: number
    /** Months layout direction, could be 'horizontal' or 'vertical'. (default 'horizontal') */
    direction?: string
    /** Minimum allowed date. (default null) */
    minDate?: Date | null
    /** Maximum allowed date. (default null) */
    maxDate?: Date | null
    /** If enabled then calendar months slides follow finger during touch move. (default true) */
    touchMove?: boolean
    /** Enables transition between months. (default true) */
    animate?: boolean
    /** Enable and calendar will be closed when user pick a date. (default false) */
    closeOnSelect?: boolean
    /** Enable week header with short name week days. (default true) */
    weekHeader?: boolean
    /** Enable month selector in toolbar. (default true) */
    monthSelector?: boolean
    /** Enable year picker in toolbar. (default true) */
    yearSelector?: boolean

    // Container/opener-specific parameters
    /** String with CSS selector or HTMLElement where to place generated Calendar HTML. Use only for inline calendar. */
    containerEl?: HTMLElement | CSSSelector
    /** Can be auto, popover (to open calendar in popover), sheet (to open in sheet modal) or customModal (to open in custom Calendar modal overlay). In case of auto will open in sheet modal on small screens and in popover on large screens.. (default auto) */
    openIn?: string
    /** String with CSS selector or HTMLElement with related input element. */
    inputEl?: HTMLElement | CSSSelector
    /** Scroll viewport (page-content) to input when calendar opened. (default true) */
    scrollToInput?: boolean
    /** Sets "readonly" attribute on specified input. (default true) */
    inputReadOnly?: boolean
    /** Additional CSS class name to be set on calendar element. */
    cssClass?: string
    /** If enabled, picker will be closed by clicking outside of picker or related input element. (default true) */
    closeByOutsideClick?: boolean
    /** Enables calendar toolbar. (default true) */
    toolbar?: boolean
    /** Text for Done/Close toolbar button. (default Done) */
    toolbarCloseText?: string
    /** Enables calendar header. (default false) */
    header?: boolean
    /** Default calendar header placeholder text. (default Select date) */
    headerPlaceholder?: string
    /** Will add opened calendar to router history which gives ability to close calendar by going back in router history and set current route to the calendar modal. (default true) */
    routableModals?: boolean
    /** Calendar modal URL that will be set as a current route. (default date/) */
    url?: string
    /** View where to set routing when routableModals enabled. Defaults to parent view of inputEl or main view if not found parent view. */
    view?: View.View

    // render functions
    /** Function to render week header. Must return week header HTML string. */
    renderWeekHeader?: () => string
    /** Function to render months wrapper. Must return months container full HTML string. */
    renderMonths?: (date : Date) => string
    /** Function to render single month. Must return single month HTML string. */
    renderMonth?: (date : Date, /** ??? */ offset : number) => string
    /** Function to render month selector. Must return month selector HTML string. */
    renderMonthSelector?: () => string
    /** Function to render year selector. Must return year selector HTML string. */
    renderYearSelector?: () => string
    /** Function to render calendar header. Must return calendar header HTML string. */
    renderHeader?: () => string
    /** Function to render toolbar. Must return toolbar HTML string. */
    renderToolbar?: () => string
    /** Function to render whole calendar. Must return calendar full HTML string. */
    render?: () => string

    on?: {
      [event in keyof Events]? : Events[event]
    }
  }

  interface Events {
    /** Event will be triggered after click on calendar day element */
    dayClick: (calendar : Calendar, dayEl : HTMLElement, year : number, month : number, day : number) => void
    /** Event will be triggered when calendar value changes */
    change: (calendar : Calendar, value : unknown) => void
    /** Event will be triggered when new month HTML layout has been added. Useful if you need to postprocess added html elements */
    monthAdd: (calendar : Calendar, monthEl : HTMLElement) => void
    /** Event will be triggered in the begining of transition to next month */
    monthYearChangeStart: (calendar : Calendar, year : number, month : number) => void
    /** Event will be triggered after transition to next month */
    monthYearChangeEnd: (calendar : Calendar, year : number, month : number) => void
    /** Event will be triggered when calendar initialized */
    init: (calendar : Calendar) => void
    /** Event will be triggered when Calendar starts its opening animation. As an argument event handler receives calendar instance */
    open: (calendar : Calendar) => void
    /** Event will be triggered after Calendar completes its opening animation. As an argument event handler receives calendar instance */
    opened: (calendar : Calendar) => void
    /** Event will be triggered when Calendar starts its closing animation. As an argument event handler receives calendar instance */
    close: (calendar : Calendar) => void
    /** Event will be triggered after Calendar completes its closing animation. As an argument event handler receives calendar instance */
    closed: (calendar : Calendar) => void
    /** Event will be triggered right before Calendar instance will be destroyed. As an argument event handler receives calendar instance */
    beforeDestroy: (calendar : Calendar) => void
  }

  interface DomEvents {
    /** Event will be triggered when Calendar starts its opening animation */
    'calendar:open' : () => void
    /** Event will be triggered after Calendar completes its opening animation */
    'calendar:opened' : () => void
    /** Event will be triggered when Calendar starts its closing animation */
    'calendar:close' : () => void
    /** Event will be triggered after Calendar completes its closing animation */
    'calendar:closed' : () => void
  }

  interface AppMethods {
    calendar: {
      /** create Calendar instance */
      create(parameters : Parameters) : Calendar

      /** destroy Calendar instance */
      destroy(el : HTMLElement | CSSSelector | Calendar) : void

      /** get Calendar instance by HTML element */
      get(el : HTMLElement | CSSSelector) : Calendar

      /** closes Calendar */
      close(el : HTMLElement | CSSSelector) : Calendar
    }
  }
  interface AppParams {
    calendar?: Parameters | undefined
  }
  interface AppEvents {
    /** Event will be triggered after click on calendar day element */
    calendarDayClick: (calendar : Calendar, dayEl : HTMLElement, year : number, month : number, day : number) => void
    /** Event will be triggered when calendar value changes */
    calendarChange: (calendar : Calendar, value : unknown) => void
    /** Event will be triggered when new month HTML layout has been added. Useful if you need to postprocess added html elements */
    calendarMonthAdd: (calendar : Calendar, monthEl : HTMLElement) => void
    /** Event will be triggered in the begining of transition to next month */
    calendarMonthYearChangeStart: (calendar : Calendar, year : number, month : number) => void
    /** Event will be triggered after transition to next month */
    calendarMonthYearChangeEnd: (calendar : Calendar, year : number, month : number) => void
    /** Event will be triggered when calendar initialized */
    calendarInit: (calendar : Calendar) => void
    /** Event will be triggered when Calendar starts its opening animation. As an argument event handler receives calendar instance */
    calendarOpen: (calendar : Calendar) => void
    /** Event will be triggered after Calendar completes its opening animation. As an argument event handler receives calendar instance */
    calendarOpened: (calendar : Calendar) => void
    /** Event will be triggered when Calendar starts its closing animation. As an argument event handler receives calendar instance */
    calendarClose: (calendar : Calendar) => void
    /** Event will be triggered after Calendar completes its closing animation. As an argument event handler receives calendar instance */
    calendarClosed: (calendar : Calendar) => void
    /** Event will be triggered right before Calendar instance will be destroyed. As an argument event handler receives calendar instance */
    calendarBeforeDestroy: (calendar : Calendar) => void
  }
}

declare const CalendarComponent: Framework7Plugin;

export default CalendarComponent;