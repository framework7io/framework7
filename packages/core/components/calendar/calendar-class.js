'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dom = require('dom7');

var _dom2 = _interopRequireDefault(_dom);

var _utils = require('../../utils/utils');

var _utils2 = _interopRequireDefault(_utils);

var _class = require('../../utils/class');

var _class2 = _interopRequireDefault(_class);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Calendar = function (_Framework7Class) {
  _inherits(Calendar, _Framework7Class);

  function Calendar(app) {
    var _ret2;

    var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, params, [app]));

    var calendar = _this;
    calendar.params = _utils2.default.extend({}, app.params.calendar, params);

    var $containerEl = void 0;
    if (calendar.params.containerEl) {
      var _ret;

      $containerEl = (0, _dom2.default)(calendar.params.containerEl);
      if ($containerEl.length === 0) return _ret = calendar, _possibleConstructorReturn(_this, _ret);
    }

    var $inputEl = void 0;
    if (calendar.params.inputEl) {
      $inputEl = (0, _dom2.default)(calendar.params.inputEl);
    }

    var view = void 0;
    if ($inputEl) {
      view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
    }
    if (!view) view = app.views.main;

    var isHorizontal = calendar.params.direction === 'horizontal';

    var inverter = 1;
    if (isHorizontal) {
      inverter = app.rtl ? -1 : 1;
    }

    _utils2.default.extend(calendar, {
      app: app,
      $containerEl: $containerEl,
      containerEl: $containerEl && $containerEl[0],
      inline: $containerEl && $containerEl.length > 0,
      $inputEl: $inputEl,
      inputEl: $inputEl && $inputEl[0],
      initialized: false,
      opened: false,
      url: calendar.params.url,
      isHorizontal: isHorizontal,
      inverter: inverter,
      view: view,
      animating: false
    });

    function onInputClick() {
      calendar.open();
    }
    function onInputFocus(e) {
      e.preventDefault();
    }
    function onHtmlClick(e) {
      var $targetEl = (0, _dom2.default)(e.target);
      if (calendar.isPopover()) return;
      if (!calendar.opened || calendar.closing) return;
      if ($targetEl.closest('[class*="backdrop"]').length) return;
      if ($inputEl && $inputEl.length > 0) {
        if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .calendar-modal').length === 0) {
          calendar.close();
        }
      } else if ((0, _dom2.default)(e.target).closest('.sheet-modal, .calendar-modal').length === 0) {
        calendar.close();
      }
    }

    // Events
    _utils2.default.extend(calendar, {
      attachInputEvents: function attachInputEvents() {
        calendar.$inputEl.on('click', onInputClick);
        if (calendar.params.inputReadOnly) {
          calendar.$inputEl.on('focus mousedown', onInputFocus);
        }
      },
      detachInputEvents: function detachInputEvents() {
        calendar.$inputEl.off('click', onInputClick);
        if (calendar.params.inputReadOnly) {
          calendar.$inputEl.off('focus mousedown', onInputFocus);
        }
      },
      attachHtmlEvents: function attachHtmlEvents() {
        app.on('click', onHtmlClick);
      },
      detachHtmlEvents: function detachHtmlEvents() {
        app.off('click', onHtmlClick);
      }
    });
    calendar.attachCalendarEvents = function attachCalendarEvents() {
      var allowItemClick = true;
      var isTouched = void 0;
      var isMoved = void 0;
      var touchStartX = void 0;
      var touchStartY = void 0;
      var touchCurrentX = void 0;
      var touchCurrentY = void 0;
      var touchStartTime = void 0;
      var touchEndTime = void 0;
      var currentTranslate = void 0;
      var wrapperWidth = void 0;
      var wrapperHeight = void 0;
      var percentage = void 0;
      var touchesDiff = void 0;
      var isScrolling = void 0;

      var $el = calendar.$el,
          $wrapperEl = calendar.$wrapperEl;


      function handleTouchStart(e) {
        if (isMoved || isTouched) return;
        isTouched = true;
        touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentX = touchStartX;
        touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchCurrentY = touchStartY;
        touchStartTime = new Date().getTime();
        percentage = 0;
        allowItemClick = true;
        isScrolling = undefined;
        currentTranslate = calendar.monthsTranslate;
      }
      function handleTouchMove(e) {
        if (!isTouched) return;
        var isH = calendar.isHorizontal;


        touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (typeof isScrolling === 'undefined') {
          isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
        }
        if (isH && isScrolling) {
          isTouched = false;
          return;
        }
        e.preventDefault();
        if (calendar.animating) {
          isTouched = false;
          return;
        }
        allowItemClick = false;
        if (!isMoved) {
          // First move
          isMoved = true;
          wrapperWidth = $wrapperEl[0].offsetWidth;
          wrapperHeight = $wrapperEl[0].offsetHeight;
          $wrapperEl.transition(0);
        }

        touchesDiff = isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
        percentage = touchesDiff / (isH ? wrapperWidth : wrapperHeight);
        currentTranslate = (calendar.monthsTranslate * calendar.inverter + percentage) * 100;

        // Transform wrapper
        $wrapperEl.transform('translate3d(' + (isH ? currentTranslate : 0) + '%, ' + (isH ? 0 : currentTranslate) + '%, 0)');
      }
      function handleTouchEnd() {
        if (!isTouched || !isMoved) {
          isTouched = false;
          isMoved = false;
          return;
        }
        isTouched = false;
        isMoved = false;

        touchEndTime = new Date().getTime();
        if (touchEndTime - touchStartTime < 300) {
          if (Math.abs(touchesDiff) < 10) {
            calendar.resetMonth();
          } else if (touchesDiff >= 10) {
            if (app.rtl) calendar.nextMonth();else calendar.prevMonth();
          } else if (app.rtl) calendar.prevMonth();else calendar.nextMonth();
        } else if (percentage <= -0.5) {
          if (app.rtl) calendar.prevMonth();else calendar.nextMonth();
        } else if (percentage >= 0.5) {
          if (app.rtl) calendar.nextMonth();else calendar.prevMonth();
        } else {
          calendar.resetMonth();
        }

        // Allow click
        setTimeout(function () {
          allowItemClick = true;
        }, 100);
      }

      function handleDayClick(e) {
        if (!allowItemClick) return;
        var $dayEl = (0, _dom2.default)(e.target).parents('.calendar-day');
        if ($dayEl.length === 0 && (0, _dom2.default)(e.target).hasClass('calendar-day')) {
          $dayEl = (0, _dom2.default)(e.target);
        }
        if ($dayEl.length === 0) return;
        if ($dayEl.hasClass('calendar-day-disabled')) return;
        if (!calendar.params.rangePicker) {
          if ($dayEl.hasClass('calendar-day-next')) calendar.nextMonth();
          if ($dayEl.hasClass('calendar-day-prev')) calendar.prevMonth();
        }
        var dateYear = $dayEl.attr('data-year');
        var dateMonth = $dayEl.attr('data-month');
        var dateDay = $dayEl.attr('data-day');
        calendar.emit('local::dayClick calendarDayClick', calendar, $dayEl[0], dateYear, dateMonth, dateDay);
        if (!$dayEl.hasClass('calendar-day-selected') || calendar.params.multiple || calendar.params.rangePicker) {
          calendar.addValue(new Date(dateYear, dateMonth, dateDay, 0, 0, 0));
        }
        if (calendar.params.closeOnSelect) {
          if (calendar.params.rangePicker && calendar.value.length === 2 || !calendar.params.rangePicker) {
            calendar.close();
          }
        }
      }
      function onNextMonthClick() {
        calendar.nextMonth();
      }
      function onPrevMonthClick() {
        calendar.prevMonth();
      }
      function onNextYearClick() {
        calendar.nextYear();
      }
      function onPrevYearClick() {
        calendar.prevYear();
      }

      var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? { passive: true, capture: false } : false;
      // Selectors clicks
      $el.find('.calendar-prev-month-button').on('click', onPrevMonthClick);
      $el.find('.calendar-next-month-button').on('click', onNextMonthClick);
      $el.find('.calendar-prev-year-button').on('click', onPrevYearClick);
      $el.find('.calendar-next-year-button').on('click', onNextYearClick);
      // Day clicks
      $wrapperEl.on('click', handleDayClick);
      // Touch events
      if ("universal" !== 'desktop') {
        if (calendar.params.touchMove) {
          $wrapperEl.on(app.touchEvents.start, handleTouchStart, passiveListener);
          app.on('touchmove:active', handleTouchMove);
          app.on('touchend:passive', handleTouchEnd);
        }
      }

      calendar.detachCalendarEvents = function detachCalendarEvents() {
        $el.find('.calendar-prev-month-button').off('click', onPrevMonthClick);
        $el.find('.calendar-next-month-button').off('click', onNextMonthClick);
        $el.find('.calendar-prev-year-button').off('click', onPrevYearClick);
        $el.find('.calendar-next-year-button').off('click', onNextYearClick);
        $wrapperEl.off('click', handleDayClick);
        if (process.env.TARGET !== 'desktop') {
          if (calendar.params.touchMove) {
            $wrapperEl.off(app.touchEvents.start, handleTouchStart, passiveListener);
            app.off('touchmove:active', handleTouchMove);
            app.off('touchend:passive', handleTouchEnd);
          }
        }
      };
    };

    calendar.init();

    return _ret2 = calendar, _possibleConstructorReturn(_this, _ret2);
  }
  // eslint-disable-next-line


  _createClass(Calendar, [{
    key: 'normalizeDate',
    value: function normalizeDate(date) {
      var d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
  }, {
    key: 'normalizeValues',
    value: function normalizeValues(values) {
      var calendar = this;
      var newValues = [];
      if (values && Array.isArray(values)) {
        newValues = values.map(function (val) {
          return calendar.normalizeDate(val);
        });
      }
      return newValues;
    }
  }, {
    key: 'initInput',
    value: function initInput() {
      var calendar = this;
      if (!calendar.$inputEl) return;
      if (calendar.params.inputReadOnly) calendar.$inputEl.prop('readOnly', true);
    }
  }, {
    key: 'isPopover',
    value: function isPopover() {
      var calendar = this;
      var app = calendar.app,
          modal = calendar.modal,
          params = calendar.params;

      if (params.openIn === 'sheet') return false;
      if (modal && modal.type !== 'popover') return false;

      if (!calendar.inline && calendar.inputEl) {
        if (params.openIn === 'popover') return true;
        if (app.device.ios) {
          return !!app.device.ipad;
        }
        if (app.width >= 768) {
          return true;
        }
      }
      return false;
    }
  }, {
    key: 'formatDate',
    value: function formatDate(d) {
      var calendar = this;
      var date = new Date(d);
      var year = date.getFullYear();
      var month = date.getMonth();
      var month1 = month + 1;
      var day = date.getDate();
      var weekDay = date.getDay();
      var _calendar$params = calendar.params,
          dateFormat = _calendar$params.dateFormat,
          monthNames = _calendar$params.monthNames,
          monthNamesShort = _calendar$params.monthNamesShort,
          dayNames = _calendar$params.dayNames,
          dayNamesShort = _calendar$params.dayNamesShort;


      return dateFormat.replace(/yyyy/g, year).replace(/yy/g, String(year).substring(2)).replace(/mm/g, month1 < 10 ? '0' + month1 : month1).replace(/m(\W+)/g, month1 + '$1').replace(/MM/g, monthNames[month]).replace(/M(\W+)/g, monthNamesShort[month] + '$1').replace(/dd/g, day < 10 ? '0' + day : day).replace(/d(\W+)/g, day + '$1').replace(/DD/g, dayNames[weekDay]).replace(/D(\W+)/g, dayNamesShort[weekDay] + '$1');
    }
  }, {
    key: 'formatValue',
    value: function formatValue() {
      var calendar = this;
      var value = calendar.value;

      if (calendar.params.formatValue) {
        return calendar.params.formatValue.call(calendar, value);
      }
      return value.map(function (v) {
        return calendar.formatDate(v);
      }).join(calendar.params.rangePicker ? ' - ' : ', ');
    }
  }, {
    key: 'addValue',
    value: function addValue(newValue) {
      var calendar = this;
      var _calendar$params2 = calendar.params,
          multiple = _calendar$params2.multiple,
          rangePicker = _calendar$params2.rangePicker;

      if (multiple) {
        if (!calendar.value) calendar.value = [];
        var inValuesIndex = void 0;
        for (var i = 0; i < calendar.value.length; i += 1) {
          if (new Date(newValue).getTime() === new Date(calendar.value[i]).getTime()) {
            inValuesIndex = i;
          }
        }
        if (typeof inValuesIndex === 'undefined') {
          calendar.value.push(newValue);
        } else {
          calendar.value.splice(inValuesIndex, 1);
        }
        calendar.updateValue();
      } else if (rangePicker) {
        if (!calendar.value) calendar.value = [];
        if (calendar.value.length === 2 || calendar.value.length === 0) {
          calendar.value = [];
        }
        if (calendar.value[0] !== newValue) calendar.value.push(newValue);else calendar.value = [];
        calendar.value.sort(function (a, b) {
          return a - b;
        });
        calendar.updateValue();
      } else {
        calendar.value = [newValue];
        calendar.updateValue();
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(values) {
      var calendar = this;
      calendar.value = values;
      calendar.updateValue();
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var calendar = this;
      return calendar.value;
    }
  }, {
    key: 'updateValue',
    value: function updateValue(onlyHeader) {
      var calendar = this;
      var $el = calendar.$el,
          $wrapperEl = calendar.$wrapperEl,
          $inputEl = calendar.$inputEl,
          value = calendar.value,
          params = calendar.params;

      var i = void 0;
      if ($el && $el.length > 0) {
        $wrapperEl.find('.calendar-day-selected').removeClass('calendar-day-selected');
        var valueDate = void 0;
        if (params.rangePicker && value.length === 2) {
          for (i = new Date(value[0]).getTime(); i <= new Date(value[1]).getTime(); i += 24 * 60 * 60 * 1000) {
            valueDate = new Date(i);
            $wrapperEl.find('.calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('calendar-day-selected');
          }
        } else {
          for (i = 0; i < calendar.value.length; i += 1) {
            valueDate = new Date(value[i]);
            $wrapperEl.find('.calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('calendar-day-selected');
          }
        }
      }
      if (!onlyHeader) {
        calendar.emit('local::change calendarChange', calendar, value);
      }

      if ($inputEl && $inputEl.length || params.header) {
        var inputValue = calendar.formatValue(value);
        if (params.header && $el && $el.length) {
          $el.find('.calendar-selected-date').text(inputValue);
        }
        if ($inputEl && $inputEl.length && !onlyHeader) {
          $inputEl.val(inputValue);
          $inputEl.trigger('change');
        }
      }
    }
  }, {
    key: 'updateCurrentMonthYear',
    value: function updateCurrentMonthYear(dir) {
      var calendar = this;
      var $months = calendar.$months,
          $el = calendar.$el,
          params = calendar.params;

      if (typeof dir === 'undefined') {
        calendar.currentMonth = parseInt($months.eq(1).attr('data-month'), 10);
        calendar.currentYear = parseInt($months.eq(1).attr('data-year'), 10);
      } else {
        calendar.currentMonth = parseInt($months.eq(dir === 'next' ? $months.length - 1 : 0).attr('data-month'), 10);
        calendar.currentYear = parseInt($months.eq(dir === 'next' ? $months.length - 1 : 0).attr('data-year'), 10);
      }
      $el.find('.current-month-value').text(params.monthNames[calendar.currentMonth]);
      $el.find('.current-year-value').text(calendar.currentYear);
    }
  }, {
    key: 'update',
    value: function update() {
      var calendar = this;
      var currentYear = calendar.currentYear,
          currentMonth = calendar.currentMonth,
          $wrapperEl = calendar.$wrapperEl;

      var currentDate = new Date(currentYear, currentMonth);
      var prevMonthHtml = calendar.renderMonth(currentDate, 'prev');
      var currentMonthHtml = calendar.renderMonth(currentDate);
      var nextMonthHtml = calendar.renderMonth(currentDate, 'next');

      $wrapperEl.transition(0).html('' + prevMonthHtml + currentMonthHtml + nextMonthHtml).transform('translate3d(0,0,0)');
      calendar.$months = $wrapperEl.find('.calendar-month');
      calendar.monthsTranslate = 0;
      calendar.setMonthsTranslate();
      calendar.$months.each(function (index, monthEl) {
        calendar.emit('local::monthAdd calendarMonthAdd', monthEl);
      });
    }
  }, {
    key: 'onMonthChangeStart',
    value: function onMonthChangeStart(dir) {
      var calendar = this;
      var $months = calendar.$months,
          currentYear = calendar.currentYear,
          currentMonth = calendar.currentMonth;

      calendar.updateCurrentMonthYear(dir);
      $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
      var currentIndex = dir === 'next' ? $months.length - 1 : 0;

      $months.eq(currentIndex).addClass('calendar-month-current');
      $months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'calendar-month-prev' : 'calendar-month-next');

      calendar.emit('local::monthYearChangeStart calendarMonthYearChangeStart', calendar, currentYear, currentMonth);
    }
  }, {
    key: 'onMonthChangeEnd',
    value: function onMonthChangeEnd(dir, rebuildBoth) {
      var calendar = this;
      var currentYear = calendar.currentYear,
          currentMonth = calendar.currentMonth,
          $wrapperEl = calendar.$wrapperEl,
          monthsTranslate = calendar.monthsTranslate;

      calendar.animating = false;
      var nextMonthHtml = void 0;
      var prevMonthHtml = void 0;
      var currentMonthHtml = void 0;
      $wrapperEl.find('.calendar-month:not(.calendar-month-prev):not(.calendar-month-current):not(.calendar-month-next)').remove();

      if (typeof dir === 'undefined') {
        dir = 'next'; // eslint-disable-line
        rebuildBoth = true; // eslint-disable-line
      }
      if (!rebuildBoth) {
        currentMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), dir);
      } else {
        $wrapperEl.find('.calendar-month-next, .calendar-month-prev').remove();
        prevMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), 'prev');
        nextMonthHtml = calendar.renderMonth(new Date(currentYear, currentMonth), 'next');
      }
      if (dir === 'next' || rebuildBoth) {
        $wrapperEl.append(currentMonthHtml || nextMonthHtml);
      }
      if (dir === 'prev' || rebuildBoth) {
        $wrapperEl.prepend(currentMonthHtml || prevMonthHtml);
      }
      var $months = $wrapperEl.find('.calendar-month');
      calendar.$months = $months;
      calendar.setMonthsTranslate(monthsTranslate);
      calendar.emit('local::monthAdd calendarMonthAdd', calendar, dir === 'next' ? $months.eq($months.length - 1)[0] : $months.eq(0)[0]);
      calendar.emit('local::monthYearChangeEnd calendarMonthYearChangeEnd', calendar, currentYear, currentMonth);
    }
  }, {
    key: 'setMonthsTranslate',
    value: function setMonthsTranslate(translate) {
      var calendar = this;
      var $months = calendar.$months,
          isH = calendar.isHorizontal,
          inverter = calendar.inverter;
      // eslint-disable-next-line

      translate = translate || calendar.monthsTranslate || 0;
      if (typeof calendar.monthsTranslate === 'undefined') {
        calendar.monthsTranslate = translate;
      }
      $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
      var prevMonthTranslate = -(translate + 1) * 100 * inverter;
      var currentMonthTranslate = -translate * 100 * inverter;
      var nextMonthTranslate = -(translate - 1) * 100 * inverter;
      $months.eq(0).transform('translate3d(' + (isH ? prevMonthTranslate : 0) + '%, ' + (isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('calendar-month-prev');
      $months.eq(1).transform('translate3d(' + (isH ? currentMonthTranslate : 0) + '%, ' + (isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('calendar-month-current');
      $months.eq(2).transform('translate3d(' + (isH ? nextMonthTranslate : 0) + '%, ' + (isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('calendar-month-next');
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth(transition) {
      var calendar = this;
      var params = calendar.params,
          $wrapperEl = calendar.$wrapperEl,
          inverter = calendar.inverter,
          isH = calendar.isHorizontal;

      if (typeof transition === 'undefined' || (typeof transition === 'undefined' ? 'undefined' : _typeof(transition)) === 'object') {
        transition = ''; // eslint-disable-line
        if (!params.animate) transition = 0; // eslint-disable-line
      }
      var nextMonth = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-month'), 10);
      var nextYear = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-year'), 10);
      var nextDate = new Date(nextYear, nextMonth);
      var nextDateTime = nextDate.getTime();
      var transitionEndCallback = !calendar.animating;
      if (params.maxDate) {
        if (nextDateTime > new Date(params.maxDate).getTime()) {
          calendar.resetMonth();
          return;
        }
      }
      calendar.monthsTranslate -= 1;
      if (nextMonth === calendar.currentMonth) {
        var nextMonthTranslate = -calendar.monthsTranslate * 100 * inverter;
        var nextMonthHtml = (0, _dom2.default)(calendar.renderMonth(nextDateTime, 'next')).transform('translate3d(' + (isH ? nextMonthTranslate : 0) + '%, ' + (isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('calendar-month-next');
        $wrapperEl.append(nextMonthHtml[0]);
        calendar.$months = $wrapperEl.find('.calendar-month');
        calendar.emit('local::monthAdd calendarMonthAdd', calendar.$months.eq(calendar.$months.length - 1)[0]);
      }
      calendar.animating = true;
      calendar.onMonthChangeStart('next');
      var translate = calendar.monthsTranslate * 100 * inverter;

      $wrapperEl.transition(transition).transform('translate3d(' + (isH ? translate : 0) + '%, ' + (isH ? 0 : translate) + '%, 0)');
      if (transitionEndCallback) {
        $wrapperEl.transitionEnd(function () {
          calendar.onMonthChangeEnd('next');
        });
      }
      if (!params.animate) {
        calendar.onMonthChangeEnd('next');
      }
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth(transition) {
      var calendar = this;
      var params = calendar.params,
          $wrapperEl = calendar.$wrapperEl,
          inverter = calendar.inverter,
          isH = calendar.isHorizontal;

      if (typeof transition === 'undefined' || (typeof transition === 'undefined' ? 'undefined' : _typeof(transition)) === 'object') {
        transition = ''; // eslint-disable-line
        if (!params.animate) transition = 0; // eslint-disable-line
      }
      var prevMonth = parseInt(calendar.$months.eq(0).attr('data-month'), 10);
      var prevYear = parseInt(calendar.$months.eq(0).attr('data-year'), 10);
      var prevDate = new Date(prevYear, prevMonth + 1, -1);
      var prevDateTime = prevDate.getTime();
      var transitionEndCallback = !calendar.animating;
      if (params.minDate) {
        var minDate = new Date(params.minDate);
        minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
        if (prevDateTime < minDate.getTime()) {
          calendar.resetMonth();
          return;
        }
      }
      calendar.monthsTranslate += 1;
      if (prevMonth === calendar.currentMonth) {
        var prevMonthTranslate = -calendar.monthsTranslate * 100 * inverter;
        var prevMonthHtml = (0, _dom2.default)(calendar.renderMonth(prevDateTime, 'prev')).transform('translate3d(' + (isH ? prevMonthTranslate : 0) + '%, ' + (isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('calendar-month-prev');
        $wrapperEl.prepend(prevMonthHtml[0]);
        calendar.$months = $wrapperEl.find('.calendar-month');
        calendar.emit('local::monthAdd calendarMonthAdd', calendar.$months.eq(0)[0]);
      }
      calendar.animating = true;
      calendar.onMonthChangeStart('prev');
      var translate = calendar.monthsTranslate * 100 * inverter;
      $wrapperEl.transition(transition).transform('translate3d(' + (isH ? translate : 0) + '%, ' + (isH ? 0 : translate) + '%, 0)');
      if (transitionEndCallback) {
        $wrapperEl.transitionEnd(function () {
          calendar.onMonthChangeEnd('prev');
        });
      }
      if (!params.animate) {
        calendar.onMonthChangeEnd('prev');
      }
    }
  }, {
    key: 'resetMonth',
    value: function resetMonth() {
      var transition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      var calendar = this;
      var $wrapperEl = calendar.$wrapperEl,
          inverter = calendar.inverter,
          isH = calendar.isHorizontal,
          monthsTranslate = calendar.monthsTranslate;

      var translate = monthsTranslate * 100 * inverter;
      $wrapperEl.transition(transition).transform('translate3d(' + (isH ? translate : 0) + '%, ' + (isH ? 0 : translate) + '%, 0)');
    }
    // eslint-disable-next-line

  }, {
    key: 'setYearMonth',
    value: function setYearMonth(year, month, transition) {
      var calendar = this;
      var params = calendar.params,
          isH = calendar.isHorizontal,
          $wrapperEl = calendar.$wrapperEl,
          inverter = calendar.inverter;
      // eslint-disable-next-line

      if (typeof year === 'undefined') year = calendar.currentYear;
      // eslint-disable-next-line
      if (typeof month === 'undefined') month = calendar.currentMonth;
      if (typeof transition === 'undefined' || (typeof transition === 'undefined' ? 'undefined' : _typeof(transition)) === 'object') {
        // eslint-disable-next-line
        transition = '';
        // eslint-disable-next-line
        if (!params.animate) transition = 0;
      }
      var targetDate = void 0;
      if (year < calendar.currentYear) {
        targetDate = new Date(year, month + 1, -1).getTime();
      } else {
        targetDate = new Date(year, month).getTime();
      }
      if (params.maxDate && targetDate > new Date(params.maxDate).getTime()) {
        return false;
      }
      if (params.minDate) {
        var minDate = new Date(params.minDate);
        minDate = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
        if (targetDate < minDate.getTime()) {
          return false;
        }
      }
      var currentDate = new Date(calendar.currentYear, calendar.currentMonth).getTime();
      var dir = targetDate > currentDate ? 'next' : 'prev';
      var newMonthHTML = calendar.renderMonth(new Date(year, month));
      calendar.monthsTranslate = calendar.monthsTranslate || 0;
      var prevTranslate = calendar.monthsTranslate;
      var monthTranslate = void 0;
      var transitionEndCallback = !calendar.animating;
      if (targetDate > currentDate) {
        // To next
        calendar.monthsTranslate -= 1;
        if (!calendar.animating) calendar.$months.eq(calendar.$months.length - 1).remove();
        $wrapperEl.append(newMonthHTML);
        calendar.$months = $wrapperEl.find('.calendar-month');
        monthTranslate = -(prevTranslate - 1) * 100 * inverter;
        calendar.$months.eq(calendar.$months.length - 1).transform('translate3d(' + (isH ? monthTranslate : 0) + '%, ' + (isH ? 0 : monthTranslate) + '%, 0)').addClass('calendar-month-next');
      } else {
        // To prev
        calendar.monthsTranslate += 1;
        if (!calendar.animating) calendar.$months.eq(0).remove();
        $wrapperEl.prepend(newMonthHTML);
        calendar.$months = $wrapperEl.find('.calendar-month');
        monthTranslate = -(prevTranslate + 1) * 100 * inverter;
        calendar.$months.eq(0).transform('translate3d(' + (isH ? monthTranslate : 0) + '%, ' + (isH ? 0 : monthTranslate) + '%, 0)').addClass('calendar-month-prev');
      }
      calendar.emit('local::monthAdd calendarMonthAdd', dir === 'next' ? calendar.$months.eq(calendar.$months.length - 1)[0] : calendar.$months.eq(0)[0]);

      calendar.animating = true;
      calendar.onMonthChangeStart(dir);
      var wrapperTranslate = calendar.monthsTranslate * 100 * inverter;
      $wrapperEl.transition(transition).transform('translate3d(' + (isH ? wrapperTranslate : 0) + '%, ' + (isH ? 0 : wrapperTranslate) + '%, 0)');
      if (transitionEndCallback) {
        $wrapperEl.transitionEnd(function () {
          calendar.onMonthChangeEnd(dir, true);
        });
      }
      if (!params.animate) {
        calendar.onMonthChangeEnd(dir);
      }
    }
  }, {
    key: 'nextYear',
    value: function nextYear() {
      var calendar = this;
      calendar.setYearMonth(calendar.currentYear + 1);
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      var calendar = this;
      calendar.setYearMonth(calendar.currentYear - 1);
    }
    // eslint-disable-next-line

  }, {
    key: 'dateInRange',
    value: function dateInRange(dayDate, range) {
      var match = false;
      var i = void 0;
      if (!range) return false;
      if (Array.isArray(range)) {
        for (i = 0; i < range.length; i += 1) {
          if (range[i].from || range[i].to) {
            if (range[i].from && range[i].to) {
              if (dayDate <= new Date(range[i].to).getTime() && dayDate >= new Date(range[i].from).getTime()) {
                match = true;
              }
            } else if (range[i].from) {
              if (dayDate >= new Date(range[i].from).getTime()) {
                match = true;
              }
            } else if (range[i].to) {
              if (dayDate <= new Date(range[i].to).getTime()) {
                match = true;
              }
            }
          } else if (dayDate === new Date(range[i]).getTime()) {
            match = true;
          }
        }
      } else if (range.from || range.to) {
        if (range.from && range.to) {
          if (dayDate <= new Date(range.to).getTime() && dayDate >= new Date(range.from).getTime()) {
            match = true;
          }
        } else if (range.from) {
          if (dayDate >= new Date(range.from).getTime()) {
            match = true;
          }
        } else if (range.to) {
          if (dayDate <= new Date(range.to).getTime()) {
            match = true;
          }
        }
      } else if (typeof range === 'function') {
        match = range(new Date(dayDate));
      }
      return match;
    }
    // eslint-disable-next-line

  }, {
    key: 'daysInMonth',
    value: function daysInMonth(date) {
      var d = new Date(date);
      return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    }
  }, {
    key: 'renderMonths',
    value: function renderMonths(date) {
      var calendar = this;
      if (calendar.params.renderMonths) {
        return calendar.params.renderMonths.call(calendar, date);
      }
      return ('\n      <div class="calendar-months-wrapper">\n        ' + calendar.renderMonth(date, 'prev') + '\n        ' + calendar.renderMonth(date) + '\n        ' + calendar.renderMonth(date, 'next') + '\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderMonth',
    value: function renderMonth(d, offset) {
      var calendar = this;
      var params = calendar.params,
          value = calendar.value;

      if (params.renderMonth) {
        return params.renderMonth.call(calendar, d, offset);
      }
      var date = new Date(d);
      var year = date.getFullYear();
      var month = date.getMonth();

      if (offset === 'next') {
        if (month === 11) date = new Date(year + 1, 0);else date = new Date(year, month + 1, 1);
      }
      if (offset === 'prev') {
        if (month === 0) date = new Date(year - 1, 11);else date = new Date(year, month - 1, 1);
      }
      if (offset === 'next' || offset === 'prev') {
        month = date.getMonth();
        year = date.getFullYear();
      }

      var currentValues = [];
      var today = new Date().setHours(0, 0, 0, 0);
      var minDate = params.minDate ? new Date(params.minDate).getTime() : null;
      var maxDate = params.maxDate ? new Date(params.maxDate).getTime() : null;
      var rows = 6;
      var cols = 7;
      var daysInPrevMonth = calendar.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000);
      var daysInMonth = calendar.daysInMonth(date);
      var minDayNumber = params.firstDay === 6 ? 0 : 1;

      var monthHtml = '';
      var dayIndex = 0 + (params.firstDay - 1);
      var disabled = void 0;
      var hasEvent = void 0;
      var firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
      if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

      if (value && value.length) {
        for (var i = 0; i < value.length; i += 1) {
          currentValues.push(new Date(value[i]).setHours(0, 0, 0, 0));
        }
      }

      for (var row = 1; row <= rows; row += 1) {
        var rowHtml = '';
        for (var col = 1; col <= cols; col += 1) {
          dayIndex += 1;
          var dayDate = void 0;
          var dayNumber = dayIndex - firstDayOfMonthIndex;
          var addClass = '';
          if (row === 1 && col === 1 && dayNumber > minDayNumber && params.firstDay !== 1) {
            dayIndex -= 7;
            dayNumber = dayIndex - firstDayOfMonthIndex;
          }

          var weekDayIndex = col - 1 + params.firstDay > 6 ? col - 1 - 7 + params.firstDay : col - 1 + params.firstDay;

          if (dayNumber < 0) {
            dayNumber = daysInPrevMonth + dayNumber + 1;
            addClass += ' calendar-day-prev';
            dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
          } else {
            dayNumber += 1;
            if (dayNumber > daysInMonth) {
              dayNumber -= daysInMonth;
              addClass += ' calendar-day-next';
              dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
            } else {
              dayDate = new Date(year, month, dayNumber).getTime();
            }
          }
          // Today
          if (dayDate === today) addClass += ' calendar-day-today';

          // Selected
          if (params.rangePicker && currentValues.length === 2) {
            if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) addClass += ' calendar-day-selected';
          } else if (currentValues.indexOf(dayDate) >= 0) addClass += ' calendar-day-selected';
          // Weekend
          if (params.weekendDays.indexOf(weekDayIndex) >= 0) {
            addClass += ' calendar-day-weekend';
          }
          // Has Events
          hasEvent = false;
          if (params.events) {
            if (calendar.dateInRange(dayDate, params.events)) {
              hasEvent = true;
            }
          }
          if (hasEvent) {
            addClass += ' calendar-day-has-events';
          }
          // Custom Ranges
          if (params.rangesClasses) {
            for (var k = 0; k < params.rangesClasses.length; k += 1) {
              if (calendar.dateInRange(dayDate, params.rangesClasses[k].range)) {
                addClass += ' ' + params.rangesClasses[k].cssClass;
              }
            }
          }
          // Disabled
          disabled = false;
          if (minDate && dayDate < minDate || maxDate && dayDate > maxDate) {
            disabled = true;
          }
          if (params.disabled) {
            if (calendar.dateInRange(dayDate, params.disabled)) {
              disabled = true;
            }
          }
          if (disabled) {
            addClass += ' calendar-day-disabled';
          }

          dayDate = new Date(dayDate);
          var dayYear = dayDate.getFullYear();
          var dayMonth = dayDate.getMonth();
          rowHtml += ('\n          <div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="calendar-day' + addClass + '" data-date="' + dayYear + '-' + dayMonth + '-' + dayNumber + '">\n            <span>' + dayNumber + '</span>\n          </div>').trim();
        }
        monthHtml += '<div class="calendar-row">' + rowHtml + '</div>';
      }
      monthHtml = '<div class="calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHtml + '</div>';
      return monthHtml;
    }
  }, {
    key: 'renderWeekHeader',
    value: function renderWeekHeader() {
      var calendar = this;
      if (calendar.params.renderWeekHeader) {
        return calendar.params.renderWeekHeader.call(calendar);
      }
      var params = calendar.params;

      var weekDaysHtml = '';
      for (var i = 0; i < 7; i += 1) {
        var dayIndex = i + params.firstDay > 6 ? i - 7 + params.firstDay : i + params.firstDay;
        var dayName = params.dayNamesShort[dayIndex];
        weekDaysHtml += '<div class="calendar-week-day">' + dayName + '</div>';
      }
      return ('\n      <div class="calendar-week-header">\n        ' + weekDaysHtml + '\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderMonthSelector',
    value: function renderMonthSelector() {
      var calendar = this;
      var app = calendar.app;
      if (calendar.params.renderMonthSelector) {
        return calendar.params.renderMonthSelector.call(calendar);
      }

      var needsBlackIcon = void 0;
      if (calendar.inline && calendar.$containerEl.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      } else if (app.root.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      }

      var iconColor = app.theme === 'md' && needsBlackIcon ? 'color-black' : '';
      return ('\n      <div class="calendar-month-selector">\n        <a href="#" class="link icon-only calendar-prev-month-button">\n          <i class="icon icon-prev ' + iconColor + '"></i>\n        </a>\n        <span class="current-month-value"></span>\n        <a href="#" class="link icon-only calendar-next-month-button">\n          <i class="icon icon-next ' + iconColor + '"></i>\n        </a>\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderYearSelector',
    value: function renderYearSelector() {
      var calendar = this;
      var app = calendar.app;
      if (calendar.params.renderYearSelector) {
        return calendar.params.renderYearSelector.call(calendar);
      }

      var needsBlackIcon = void 0;
      if (calendar.inline && calendar.$containerEl.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      } else if (app.root.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      }

      var iconColor = app.theme === 'md' && needsBlackIcon ? 'color-black' : '';
      return ('\n      <div class="calendar-year-selector">\n        <a href="#" class="link icon-only calendar-prev-year-button">\n          <i class="icon icon-prev ' + iconColor + '"></i>\n        </a>\n        <span class="current-year-value"></span>\n        <a href="#" class="link icon-only calendar-next-year-button">\n          <i class="icon icon-next ' + iconColor + '"></i>\n        </a>\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderHeader',
    value: function renderHeader() {
      var calendar = this;
      if (calendar.params.renderHeader) {
        return calendar.params.renderHeader.call(calendar);
      }
      return ('\n      <div class="calendar-header">\n        <div class="calendar-selected-date">' + calendar.params.headerPlaceholder + '</div>\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderFooter',
    value: function renderFooter() {
      var calendar = this;
      var app = calendar.app;
      if (calendar.params.renderFooter) {
        return calendar.params.renderFooter.call(calendar);
      }
      return ('\n      <div class="calendar-footer">\n        <a href="#" class="' + (app.theme === 'md' ? 'button' : 'link') + ' calendar-close sheet-close popover-close">' + calendar.params.toolbarCloseText + '</a>\n      </div>\n    ').trim();
    }
  }, {
    key: 'renderToolbar',
    value: function renderToolbar() {
      var calendar = this;
      if (calendar.params.renderToolbar) {
        return calendar.params.renderToolbar.call(calendar, calendar);
      }
      return ('\n      <div class="toolbar no-shadow">\n        <div class="toolbar-inner">\n          ' + calendar.renderMonthSelector() + '\n          ' + calendar.renderYearSelector() + '\n        </div>\n      </div>\n    ').trim();
    }
    // eslint-disable-next-line

  }, {
    key: 'renderInline',
    value: function renderInline() {
      var calendar = this;
      var _calendar$params3 = calendar.params,
          cssClass = _calendar$params3.cssClass,
          toolbar = _calendar$params3.toolbar,
          header = _calendar$params3.header,
          footer = _calendar$params3.footer,
          rangePicker = _calendar$params3.rangePicker,
          weekHeader = _calendar$params3.weekHeader;
      var value = calendar.value;

      var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
      var inlineHtml = ('\n      <div class="calendar calendar-inline ' + (rangePicker ? 'calendar-range' : '') + ' ' + (cssClass || '') + '">\n        ' + (header ? calendar.renderHeader() : '') + '\n        ' + (toolbar ? calendar.renderToolbar() : '') + '\n        ' + (weekHeader ? calendar.renderWeekHeader() : '') + '\n        <div class="calendar-months">\n          ' + calendar.renderMonths(date) + '\n        </div>\n        ' + (footer ? calendar.renderFooter() : '') + '\n      </div>\n    ').trim();

      return inlineHtml;
    }
  }, {
    key: 'renderCustomModal',
    value: function renderCustomModal() {
      var calendar = this;
      var _calendar$params4 = calendar.params,
          cssClass = _calendar$params4.cssClass,
          toolbar = _calendar$params4.toolbar,
          header = _calendar$params4.header,
          footer = _calendar$params4.footer,
          rangePicker = _calendar$params4.rangePicker,
          weekHeader = _calendar$params4.weekHeader;
      var value = calendar.value;

      var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
      var sheetHtml = ('\n      <div class="calendar calendar-modal ' + (rangePicker ? 'calendar-range' : '') + ' ' + (cssClass || '') + '">\n        ' + (header ? calendar.renderHeader() : '') + '\n        ' + (toolbar ? calendar.renderToolbar() : '') + '\n        ' + (weekHeader ? calendar.renderWeekHeader() : '') + '\n        <div class="calendar-months">\n          ' + calendar.renderMonths(date) + '\n        </div>\n        ' + (footer ? calendar.renderFooter() : '') + '\n      </div>\n    ').trim();

      return sheetHtml;
    }
  }, {
    key: 'renderSheet',
    value: function renderSheet() {
      var calendar = this;
      var _calendar$params5 = calendar.params,
          cssClass = _calendar$params5.cssClass,
          toolbar = _calendar$params5.toolbar,
          header = _calendar$params5.header,
          footer = _calendar$params5.footer,
          rangePicker = _calendar$params5.rangePicker,
          weekHeader = _calendar$params5.weekHeader;
      var value = calendar.value;

      var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
      var sheetHtml = ('\n      <div class="sheet-modal calendar calendar-sheet ' + (rangePicker ? 'calendar-range' : '') + ' ' + (cssClass || '') + '">\n        ' + (header ? calendar.renderHeader() : '') + '\n        ' + (toolbar ? calendar.renderToolbar() : '') + '\n        ' + (weekHeader ? calendar.renderWeekHeader() : '') + '\n        <div class="sheet-modal-inner calendar-months">\n          ' + calendar.renderMonths(date) + '\n        </div>\n        ' + (footer ? calendar.renderFooter() : '') + '\n      </div>\n    ').trim();

      return sheetHtml;
    }
  }, {
    key: 'renderPopover',
    value: function renderPopover() {
      var calendar = this;
      var _calendar$params6 = calendar.params,
          cssClass = _calendar$params6.cssClass,
          toolbar = _calendar$params6.toolbar,
          header = _calendar$params6.header,
          footer = _calendar$params6.footer,
          rangePicker = _calendar$params6.rangePicker,
          weekHeader = _calendar$params6.weekHeader;
      var value = calendar.value;

      var date = value && value.length ? value[0] : new Date().setHours(0, 0, 0);
      var popoverHtml = ('\n      <div class="popover calendar-popover">\n        <div class="popover-inner">\n          <div class="calendar ' + (rangePicker ? 'calendar-range' : '') + ' ' + (cssClass || '') + '">\n            ' + (header ? calendar.renderHeader() : '') + '\n            ' + (toolbar ? calendar.renderToolbar() : '') + '\n            ' + (weekHeader ? calendar.renderWeekHeader() : '') + '\n            <div class="calendar-months">\n              ' + calendar.renderMonths(date) + '\n            </div>\n            ' + (footer ? calendar.renderFooter() : '') + '\n          </div>\n        </div>\n      </div>\n    ').trim();

      return popoverHtml;
    }
  }, {
    key: 'render',
    value: function render() {
      var calendar = this;
      var params = calendar.params;

      if (params.render) return params.render.call(calendar);
      if (!calendar.inline) {
        var modalType = params.openIn;
        if (modalType === 'auto') modalType = calendar.isPopover() ? 'popover' : 'sheet';

        if (modalType === 'popover') return calendar.renderPopover();
        if (modalType === 'sheet') return calendar.renderSheet();
        return calendar.renderCustomModal();
      }
      return calendar.renderInline();
    }
  }, {
    key: 'onOpen',
    value: function onOpen() {
      var calendar = this;
      var initialized = calendar.initialized,
          $el = calendar.$el,
          app = calendar.app,
          $inputEl = calendar.$inputEl,
          inline = calendar.inline,
          value = calendar.value,
          params = calendar.params;

      calendar.closing = false;
      calendar.opened = true;
      calendar.opening = true;

      // Init main events
      calendar.attachCalendarEvents();

      var updateValue = !value && params.value;

      // Set value
      if (!initialized) {
        if (value) calendar.setValue(value, 0);else if (params.value) {
          calendar.setValue(calendar.normalizeValues(params.value), 0);
        }
      } else if (value) {
        calendar.setValue(value, 0);
      }

      // Update current month and year
      calendar.updateCurrentMonthYear();

      // Set initial translate
      calendar.monthsTranslate = 0;
      calendar.setMonthsTranslate();

      // Update input value
      if (updateValue) calendar.updateValue();else if (params.header && value) {
        calendar.updateValue(true);
      }

      // Extra focus
      if (!inline && $inputEl.length && app.theme === 'md') {
        $inputEl.trigger('focus');
      }

      calendar.initialized = true;

      calendar.$months.each(function (index, monthEl) {
        calendar.emit('local::monthAdd calendarMonthAdd', monthEl);
      });

      // Trigger events
      if ($el) {
        $el.trigger('calendar:open', calendar);
      }
      if ($inputEl) {
        $inputEl.trigger('calendar:open', calendar);
      }
      calendar.emit('local::open calendarOpen', calendar);
    }
  }, {
    key: 'onOpened',
    value: function onOpened() {
      var calendar = this;
      calendar.opening = false;
      if (calendar.$el) {
        calendar.$el.trigger('calendar:opened', calendar);
      }
      if (calendar.$inputEl) {
        calendar.$inputEl.trigger('calendar:opened', calendar);
      }
      calendar.emit('local::opened calendarOpened', calendar);
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      var calendar = this;
      var app = calendar.app;
      calendar.opening = false;
      calendar.closing = true;

      if (calendar.$inputEl && app.theme === 'md') {
        calendar.$inputEl.trigger('blur');
      }
      if (calendar.detachCalendarEvents) {
        calendar.detachCalendarEvents();
      }

      if (calendar.$el) {
        calendar.$el.trigger('calendar:close', calendar);
      }
      if (calendar.$inputEl) {
        calendar.$inputEl.trigger('calendar:close', calendar);
      }
      calendar.emit('local::close calendarClose', calendar);
    }
  }, {
    key: 'onClosed',
    value: function onClosed() {
      var calendar = this;
      calendar.opened = false;
      calendar.closing = false;

      if (!calendar.inline) {
        _utils2.default.nextTick(function () {
          if (calendar.modal && calendar.modal.el && calendar.modal.destroy) {
            if (!calendar.params.routableModals) {
              calendar.modal.destroy();
            }
          }
          delete calendar.modal;
        });
      }
      if (calendar.$el) {
        calendar.$el.trigger('calendar:closed', calendar);
      }
      if (calendar.$inputEl) {
        calendar.$inputEl.trigger('calendar:closed', calendar);
      }
      calendar.emit('local::closed calendarClosed', calendar);
    }
  }, {
    key: 'open',
    value: function open() {
      var calendar = this;
      var app = calendar.app,
          opened = calendar.opened,
          inline = calendar.inline,
          $inputEl = calendar.$inputEl,
          params = calendar.params;

      if (opened) return;

      if (inline) {
        calendar.$el = (0, _dom2.default)(calendar.render());
        calendar.$el[0].f7Calendar = calendar;
        calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
        calendar.$months = calendar.$wrapperEl.find('.calendar-month');
        calendar.$containerEl.append(calendar.$el);
        calendar.onOpen();
        calendar.onOpened();
        return;
      }
      var modalType = params.openIn;
      if (modalType === 'auto') {
        modalType = calendar.isPopover() ? 'popover' : 'sheet';
      }
      var modalContent = calendar.render();

      var modalParams = {
        targetEl: $inputEl,
        scrollToEl: calendar.params.scrollToInput ? $inputEl : undefined,
        content: modalContent,
        backdrop: modalType === 'popover' && app.params.popover.backdrop !== false,
        on: {
          open: function open() {
            var modal = this;
            calendar.modal = modal;
            calendar.$el = modalType === 'popover' ? modal.$el.find('.calendar') : modal.$el;
            calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
            calendar.$months = calendar.$wrapperEl.find('.calendar-month');
            calendar.$el[0].f7Calendar = calendar;
            if (modalType === 'customModal') {
              (0, _dom2.default)(calendar.$el).find('.calendar-close').once('click', function () {
                calendar.close();
              });
            }
            calendar.onOpen();
          },
          opened: function opened() {
            calendar.onOpened();
          },
          close: function close() {
            calendar.onClose();
          },
          closed: function closed() {
            calendar.onClosed();
          }
        }
      };
      if (calendar.params.routableModals) {
        calendar.view.router.navigate({
          url: calendar.url,
          route: _defineProperty({
            path: calendar.url
          }, modalType, modalParams)
        });
      } else {
        calendar.modal = app[modalType].create(modalParams);
        calendar.modal.open();
      }
    }
  }, {
    key: 'close',
    value: function close() {
      var calendar = this;
      var opened = calendar.opened,
          inline = calendar.inline;

      if (!opened) return;
      if (inline) {
        calendar.onClose();
        calendar.onClosed();
        return;
      }
      if (calendar.params.routableModals) {
        calendar.view.router.back();
      } else {
        calendar.modal.close();
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var calendar = this;

      calendar.initInput();

      if (calendar.inline) {
        calendar.open();
        calendar.emit('local::init calendarInit', calendar);
        return;
      }

      if (!calendar.initialized && calendar.params.value) {
        calendar.setValue(calendar.normalizeValues(calendar.params.value));
      }

      // Attach input Events
      if (calendar.$inputEl) {
        calendar.attachInputEvents();
      }
      if (calendar.params.closeByOutsideClick) {
        calendar.attachHtmlEvents();
      }
      calendar.emit('local::init calendarInit', calendar);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      var calendar = this;
      if (calendar.destroyed) return;
      var $el = calendar.$el;

      calendar.emit('local::beforeDestroy calendarBeforeDestroy', calendar);
      if ($el) $el.trigger('calendar:beforedestroy', calendar);

      calendar.close();

      // Detach Events
      if (calendar.$inputEl) {
        calendar.detachInputEvents();
      }
      if (calendar.params.closeByOutsideClick) {
        calendar.detachHtmlEvents();
      }

      if ($el && $el.length) delete calendar.$el[0].f7Calendar;
      _utils2.default.deleteProps(calendar);
      calendar.destroyed = true;
    }
  }]);

  return Calendar;
}(_class2.default);

exports.default = Calendar;