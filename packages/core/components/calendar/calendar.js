'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _constructorMethods = require('../../utils/constructor-methods');

var _constructorMethods2 = _interopRequireDefault(_constructorMethods);

var _calendarClass = require('./calendar-class');

var _calendarClass2 = _interopRequireDefault(_calendarClass);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = {
  name: 'calendar',
  static: {
    Calendar: _calendarClass2.default
  },
  create: function create() {
    var app = this;
    app.calendar = (0, _constructorMethods2.default)({
      defaultSelector: '.calendar',
      constructor: _calendarClass2.default,
      app: app,
      domProp: 'f7Calendar'
    });
    app.calendar.close = function close() {
      var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.calendar';

      var $el = (0, _dom2.default)(el);
      if ($el.length === 0) return;
      var calendar = $el[0].f7Calendar;
      if (!calendar || calendar && !calendar.opened) return;
      calendar.close();
    };
  },

  params: {
    calendar: {
      // Calendar settings
      monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      firstDay: 1, // First day of the week, Monday
      weekendDays: [0, 6], // Sunday and Saturday
      multiple: false,
      rangePicker: false,
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
      render: null
    }
  }
};