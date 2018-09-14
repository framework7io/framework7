import $ from 'dom7';
import ConstructorMethods from '../../utils/constructor-methods';
import Calendar from './calendar-class';

export default {
  name: 'calendar',
  static: {
    Calendar,
  },
  create() {
    const app = this;
    app.calendar = ConstructorMethods({
      defaultSelector: '.calendar',
      constructor: Calendar,
      app,
      domProp: 'f7Calendar',
    });
    app.calendar.close = function close(el = '.calendar') {
      const $el = $(el);
      if ($el.length === 0) return;
      const calendar = $el[0].f7Calendar;
      if (!calendar || (calendar && !calendar.opened)) return;
      calendar.close();
    };
  },
  params: {
    calendar: {
      // Calendar settings
      calendarType: 'gregorian', // or 'jalali'
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1, // First day of the week, Monday
      weekendDays: [0, 6], // Sunday and Saturday
      jalali: {
        monthNames: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        monthNamesShort: ['فَر', 'اُر', 'خُر', 'تیر', 'مُر', 'شَه', 'مهر', 'آب', 'آذر', 'دی', 'بَه', 'اِس'],
        dayNames: ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'],
        dayNamesShort: ['1ش', '۲ش', '۳ش', '۴ش', '۵ش', 'ج', 'ش'],
        firstDay: 6, // Saturday
        weekendDays: [5], // Friday
      },
      multiple: false,
      rangePicker: false,
      rangePickerMinDays: 1, // when calendar is used as rangePicker
      rangePickerMaxDays: 0, // when calendar is used as rangePicker, 0 means unlimited
      dateFormat: 'yyyy-mm-dd',
      direction: 'horizontal', // or 'vertical'
      minDate: null,
      maxDate: null,
      disabled: null, // dates range of disabled days
      events: null, // dates range of days with events
      rangesClasses: null, // array with custom classes date ranges
      touchMove: true,
      animate: true,
      closeOnSelect: false,
      monthSelector: true,
      yearSelector: true,
      weekHeader: true,
      value: null,
      // Common opener settings
      containerEl: null,
      openIn: 'auto', // or 'popover' or 'sheet' or 'customModal'
      formatValue: null,
      inputEl: null,
      inputReadOnly: true,
      closeByOutsideClick: true,
      scrollToInput: true,
      header: false,
      headerPlaceholder: 'Select date',
      footer: false,
      toolbar: true,
      toolbarCloseText: 'Done',
      cssClass: null,
      routableModals: true,
      view: null,
      url: 'date/',
      backdrop: null,
      closeByBackdropClick: true,
      // Render functions
      renderWeekHeader: null,
      renderMonths: null,
      renderMonth: null,
      renderMonthSelector: null,
      renderYearSelector: null,
      renderHeader: null,
      renderFooter: null,
      renderToolbar: null,
      renderInline: null,
      renderPopover: null,
      renderSheet: null,
      render: null,
    },
  },
};
