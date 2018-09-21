
function framework7ComponentLoader(chunks) {
  var doc = document;
  var win = window;
  var $ = chunks.$;
  var Template7 = chunks.Template7;
  var Utils = chunks.Utils;
  var Device = chunks.Device;
  var Support = chunks.Support;
  var ConstructorMethods = chunks.ConstructorMethods;
  var ModalMethods = chunks.ModalMethods;
  var Framework7Class = chunks.Framework7Class;
  var Modal = chunks.Modal;

  /*
  Converts a Gregorian date to Jalaali.
  */
  function toJalaali (gy, gm, gd) {
    if (Object.prototype.toString.call(gy) === '[object Date]') {
      gd = gy.getDate();
      gm = gy.getMonth() + 1;
      gy = gy.getFullYear();
    }
    return d2j(g2d(gy, gm, gd))
  }

  /*
  Converts a Jalaali date to Gregorian.
  */
  function toGregorian (jy, jm, jd) {
    return d2g(j2d(jy, jm, jd))
  }

  // /*
  // Checks whether a Jalaali date is valid or not.
  // */
  // function isValidJalaaliDate (jy, jm, jd) {
  //   return jy >= -61 && jy <= 3177 &&
  //         jm >= 1 && jm <= 12 &&
  //         jd >= 1 && jd <= monthLength(jy, jm)
  // }

  /*
  Is this a leap year or not?
  */
  function isLeapJalaaliYear (jy) {
    return jalCal(jy).leap === 0
  }

  /*
  Number of days in a given month in a Jalaali year.
  */
  function monthLength (jy, jm) {
    if (jm <= 6) { return 31 }
    if (jm <= 11) { return 30 }
    if (isLeapJalaaliYear(jy)) { return 30 }
    return 29
  }

  /*
  This function determines if the Jalaali (Persian) year is
  leap (366-day long) or is the common year (365 days), and
  finds the day in March (Gregorian calendar) of the first
  day of the Jalaali year (jy).
  @param jy Jalaali calendar year (-61 to 3177)
  @return
    leap: number of years since the last leap year (0 to 4)
    gy: Gregorian year of the beginning of Jalaali year
    march: the March day of Farvardin the 1st (1st day of jy)
  @see: http://www.astro.uni.torun.pl/~kb/Papers/EMP/PersianC-EMP.htm
  @see: http://www.fourmilab.ch/documents/calendar/
  */
  function jalCal (jy) {
  // Jalaali years starting the 33-year rule.
    var breaks = [-61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178];
    var bl = breaks.length;
    var gy = jy + 621;
    var leapJ = -14;
    var jp = breaks[0];
    var jm;
    var jump;
    var leap;
    var leapG;
    var march;
    var n;
    var i;

    if (jy < jp || jy >= breaks[bl - 1]) { throw new Error('Invalid Jalaali year ' + jy) }

    // Find the limiting years for the Jalaali year jy.
    for (i = 1; i < bl; i += 1) {
      jm = breaks[i];
      jump = jm - jp;
      if (jy < jm) { break }
      leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4);
      jp = jm;
    }
    n = jy - jp;

    // Find the number of leap years from AD 621 to the beginning
    // of the current Jalaali year in the Persian calendar.
    leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4);
    if (mod(jump, 33) === 4 && jump - n === 4) { leapJ += 1; }

    // And the same in the Gregorian calendar (until the year gy).
    leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150;

    // Determine the Gregorian date of Farvardin the 1st.
    march = 20 + leapJ - leapG;

    // Find how many years have passed since the last leap year.
    if (jump - n < 6) { n = n - jump + div(jump + 4, 33) * 33; }
    leap = mod(mod(n + 1, 33) - 1, 4);
    if (leap === -1) {
      leap = 4;
    }

    return { leap: leap,
      gy: gy,
      march: march
    }
  }

  /*
  Converts a date of the Jalaali calendar to the Julian Day number.
  @param jy Jalaali year (1 to 3100)
  @param jm Jalaali month (1 to 12)
  @param jd Jalaali day (1 to 29/31)
  @return Julian Day number
  */
  function j2d (jy, jm, jd) {
    var r = jalCal(jy);
    return g2d(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
  }

  /*
  Converts the Julian Day number to a date in the Jalaali calendar.
  @param jdn Julian Day number
  @return
    jy: Jalaali year (1 to 3100)
    jm: Jalaali month (1 to 12)
    jd: Jalaali day (1 to 29/31)
  */
  function d2j (jdn) {
    var gy = d2g(jdn).gy; // Calculate Gregorian year (gy).
    var jy = gy - 621;
    var r = jalCal(jy);
    var jdn1f = g2d(gy, 3, r.march);
    var jd;
    var jm;
    var k;

    // Find number of days that passed since 1 Farvardin.
    k = jdn - jdn1f;
    if (k >= 0) {
      if (k <= 185) {
      // The first 6 months.
        jm = 1 + div(k, 31);
        jd = mod(k, 31) + 1;
        return { jy: jy,
          jm: jm,
          jd: jd
        }
      } else {
      // The remaining months.
        k -= 186;
      }
    } else {
    // Previous Jalaali year.
      jy -= 1;
      k += 179;
      if (r.leap === 1) { k += 1; }
    }
    jm = 7 + div(k, 30);
    jd = mod(k, 30) + 1;
    return { jy: jy,
      jm: jm,
      jd: jd
    }
  }

  /*
  Calculates the Julian Day number from Gregorian or Julian
  calendar dates. This integer number corresponds to the noon of
  the date (i.e. 12 hours of Universal Time).
  The procedure was tested to be good since 1 March, -100100 (of both
  calendars) up to a few million years into the future.
  @param gy Calendar year (years BC numbered 0, -1, -2, ...)
  @param gm Calendar month (1 to 12)
  @param gd Calendar day of the month (1 to 28/29/30/31)
  @return Julian Day number
  */
  function g2d (gy, gm, gd) {
    var d = div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
      div(153 * mod(gm + 9, 12) + 2, 5) +
      gd - 34840408;
    d = d - div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4) + 752;
    return d
  }

  /*
  Calculates Gregorian and Julian calendar dates from the Julian Day number
  (jdn) for the period since jdn=-34839655 (i.e. the year -100100 of both
  calendars) to some millions years ahead of the present.
  @param jdn Julian Day number
  @return
    gy: Calendar year (years BC numbered 0, -1, -2, ...)
    gm: Calendar month (1 to 12)
    gd: Calendar day of the month M (1 to 28/29/30/31)
  */
  function d2g (jdn) {
    var j,
      i,
      gd,
      gm,
      gy;
    j = 4 * jdn + 139361631;
    j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
    i = div(mod(j, 1461), 4) * 5 + 308;
    gd = div(mod(i, 153), 5) + 1;
    gm = mod(div(i, 153), 12) + 1;
    gy = div(j, 1461) - 100100 + div(8 - gm, 6);
    return { gy: gy,
      gm: gm,
      gd: gd
    }
  }

  /*
  Utility helper functions.
  */

  function div (a, b) {
    return ~~(a / b)
  }

  function mod (a, b) {
    return a - ~~(a / b) * b
  }

  function fixDate (y, m, d) {
    if (m > 11) {
      y += Math.floor(m / 12);
      m = m % 12;
    }
    while (m < 0) {
      y -= 1;
      m += 12;
    }
    while (d > monthLength(y, m + 1)) {
      m = m !== 11 ? m + 1 : 0;
      y = m === 0 ? y + 1 : y;
      d -= monthLength(y, m + 1);
    }
    while (d <= 0) {
      m = m !== 0 ? m - 1 : 11;
      y = m === 11 ? y - 1 : y;
      d += monthLength(y, m + 1);
    }
    return [y, m || 0, d || 1]
  }

  /*
    Copyright nainemom <nainemom@gmail.com>
    https://github.com/nainemom/idate/blob/dev/package.json
  */

  var methods = [
    'getHours',
    'getMilliseconds',
    'getMinutes',
    'getSeconds',
    'getTime',
    'getTimezoneOffset',
    'getUTCDate',
    'getUTCDay',
    'getUTCFullYear',
    'getUTCHours',
    'getUTCMilliseconds',
    'getUTCMinutes',
    'getUTCMonth',
    'getUTCSeconds',
    'now',
    'parse',
    'setHours',
    'setMilliseconds',
    'setMinutes',
    'setSeconds',
    'setTime',
    'setUTCDate',
    'setUTCFullYear',
    'setUTCHours',
    'setUTCMilliseconds',
    'setUTCMinutes',
    'setUTCMonth',
    'setUTCSeconds',
    'toDateString',
    'toISOString',
    'toJSON',
    'toLocaleDateString',
    'toLocaleTimeString',
    'toLocaleString',
    'toTimeString',
    'toUTCString',
    'UTC',
    'valueOf'
  ];

  var DAY_NAMES = ['Shanbe', 'Yekshanbe', 'Doshanbe', 'Seshanbe', 'Chaharshanbe', 'Panjshanbe', 'Jom\'e'];
  var PERSIAN_DAY_NAMES = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  var MONTH_NAMES = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'];
  var PERSIAN_MONTH_NAMES = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  var PERSIAN_NUMBERS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  var IDate = (function (Date) {
    function IDate () {
      Date.call(this);

      var date;
      var args = Array.from(arguments);
      if (args.length === 0) {
        date = Date.now();
      } else if (args.length === 1) {
        date = args[0] instanceof Date ? args[0].getTime() : args[0];
      } else {
        var fixed = fixDate(
          args[0],
          args[1] || 0,
          typeof args[2] === 'undefined' ? 1 : args[2]);
        var converted$1 = toGregorian(fixed[0], fixed[1] + 1, fixed[2]);
        date = [converted$1.gy, converted$1.gm - 1, converted$1.gd].concat([args[3] || 0, args[4] || 0, args[5] || 0, args[6] || 0]);
      }

      if (Array.isArray(date)) {
        this.gdate = new (Function.prototype.bind.apply( Date, [ null ].concat( date) ));
      } else {
        this.gdate = new Date(date);
      }

      var converted = toJalaali(this.gdate.getFullYear(), this.gdate.getMonth() + 1, this.gdate.getDate());
      this.jdate = [converted.jy, converted.jm - 1, converted.jd];

      methods.forEach(function (method) {
        IDate.prototype[method] = function () {
          var ref;

          return (ref = this.gdate)[method].apply(ref, arguments)
        };
      });
    }

    if ( Date ) IDate.__proto__ = Date;
    IDate.prototype = Object.create( Date && Date.prototype );
    IDate.prototype.constructor = IDate;

    IDate.prototype.getFullYear = function getFullYear () {
      return this.jdate[0]
    };

    IDate.prototype.setFullYear = function setFullYear (value) {
      this.jdate = fixDate(value, this.jdate[1], this.jdate[2]);
      this.syncDate();
      return this.gdate.getTime()
    };

    IDate.prototype.getMonth = function getMonth () {
      return this.jdate[1]
    };

    IDate.prototype.setMonth = function setMonth (value) {
      this.jdate = fixDate(this.jdate[0], value, this.jdate[2]);
      this.syncDate();
      return this.gdate.getTime()
    };

    IDate.prototype.getDate = function getDate () {
      return this.jdate[2]
    };

    IDate.prototype.setDate = function setDate (value) {
      this.jdate = fixDate(this.jdate[0], this.jdate[1], value);
      this.syncDate();
      return this.gdate.getTime()
    };

    IDate.prototype.getDay = function getDay () {
      return (this.gdate.getDay() + 1) % 7
    };

    IDate.prototype.syncDate = function syncDate () {
      var converted = toGregorian(this.jdate[0], this.jdate[1] + 1, this.jdate[2]);
      this.gdate.setFullYear(converted.gy);
      this.gdate.setMonth(converted.gm - 1);
      this.gdate.setDate(converted.gd);
    };
    IDate.prototype.toString = function toString (persianString) {
      if ( persianString === void 0 ) persianString = true;

      var replaceNums = function (str) {
        return str.replace(/./g, function (c) { return PERSIAN_NUMBERS[c] || c; })
      };
      var padNumber = function (num) { return num.toString().length === 1 ? ("0" + num) : num.toString(); };
      var time = (padNumber(this.getHours())) + ":" + (padNumber(this.getMinutes())) + ":" + (padNumber(this.getSeconds()));
      if (persianString) {
        return replaceNums(((PERSIAN_DAY_NAMES[this.getDay()]) + " " + (this.getDate()) + " " + (PERSIAN_MONTH_NAMES[this.getMonth()]) + " " + (this.getFullYear()) + " ساعت " + time))
      }
      return ((DAY_NAMES[this.getDay()]) + " " + (this.getDate()) + " " + (MONTH_NAMES[this.getMonth()]) + " " + (this.getFullYear()) + " " + time)
    };

    return IDate;
  }(Date));

  var Calendar = (function (Framework7Class$$1) {
    function Calendar(app, params) {
      if ( params === void 0 ) params = {};

      Framework7Class$$1.call(this, params, [app]);
      var calendar = this;

      calendar.params = Utils.extend({}, app.params.calendar, params);

      if (calendar.params.calendarType === 'jalali') {
        Object.keys(calendar.params.jalali).forEach(function (param) {
          if (!params[param]) {
            calendar.params[param] = calendar.params.jalali[param];
          }
        });
      }

      if (calendar.params.calendarType === 'jalali') {
        calendar.DateHandleClass = IDate;
      } else {
        calendar.DateHandleClass = Date;
      }

      var $containerEl;
      if (calendar.params.containerEl) {
        $containerEl = $(calendar.params.containerEl);
        if ($containerEl.length === 0) { return calendar; }
      }

      var $inputEl;
      if (calendar.params.inputEl) {
        $inputEl = $(calendar.params.inputEl);
      }

      var view;
      if ($inputEl) {
        view = $inputEl.parents('.view').length && $inputEl.parents('.view')[0].f7View;
      }
      if (!view) { view = app.views.main; }

      var isHorizontal = calendar.params.direction === 'horizontal';

      var inverter = 1;
      if (isHorizontal) {
        inverter = app.rtl ? -1 : 1;
      }

      Utils.extend(calendar, {
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
        animating: false,
      });

      function onInputClick() {
        calendar.open();
      }
      function onInputFocus(e) {
        e.preventDefault();
      }
      function onHtmlClick(e) {
        var $targetEl = $(e.target);
        if (calendar.isPopover()) { return; }
        if (!calendar.opened || calendar.closing) { return; }
        if ($targetEl.closest('[class*="backdrop"]').length) { return; }
        if ($inputEl && $inputEl.length > 0) {
          if ($targetEl[0] !== $inputEl[0] && $targetEl.closest('.sheet-modal, .calendar-modal').length === 0) {
            calendar.close();
          }
        } else if ($(e.target).closest('.sheet-modal, .calendar-modal').length === 0) {
          calendar.close();
        }
      }

      // Events
      Utils.extend(calendar, {
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
        },
      });
      calendar.attachCalendarEvents = function attachCalendarEvents() {
        var allowItemClick = true;
        var isTouched;
        var isMoved;
        var touchStartX;
        var touchStartY;
        var touchCurrentX;
        var touchCurrentY;
        var touchStartTime;
        var touchEndTime;
        var currentTranslate;
        var wrapperWidth;
        var wrapperHeight;
        var percentage;
        var touchesDiff;
        var isScrolling;

        var $el = calendar.$el;
        var $wrapperEl = calendar.$wrapperEl;

        function handleTouchStart(e) {
          if (isMoved || isTouched) { return; }
          isTouched = true;
          touchStartX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
          touchCurrentX = touchStartX;
          touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
          touchCurrentY = touchStartY;
          touchStartTime = (new calendar.DateHandleClass()).getTime();
          percentage = 0;
          allowItemClick = true;
          isScrolling = undefined;
          currentTranslate = calendar.monthsTranslate;
        }
        function handleTouchMove(e) {
          if (!isTouched) { return; }
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
          currentTranslate = ((calendar.monthsTranslate * calendar.inverter) + percentage) * 100;

          // Transform wrapper
          $wrapperEl.transform(("translate3d(" + (isH ? currentTranslate : 0) + "%, " + (isH ? 0 : currentTranslate) + "%, 0)"));
        }
        function handleTouchEnd() {
          if (!isTouched || !isMoved) {
            isTouched = false;
            isMoved = false;
            return;
          }
          isTouched = false;
          isMoved = false;

          touchEndTime = new calendar.DateHandleClass().getTime();
          if (touchEndTime - touchStartTime < 300) {
            if (Math.abs(touchesDiff) < 10) {
              calendar.resetMonth();
            } else if (touchesDiff >= 10) {
              if (app.rtl) { calendar.nextMonth(); }
              else { calendar.prevMonth(); }
            } else if (app.rtl) { calendar.prevMonth(); }
            else { calendar.nextMonth(); }
          } else if (percentage <= -0.5) {
            if (app.rtl) { calendar.prevMonth(); }
            else { calendar.nextMonth(); }
          } else if (percentage >= 0.5) {
            if (app.rtl) { calendar.nextMonth(); }
            else { calendar.prevMonth(); }
          } else {
            calendar.resetMonth();
          }

          // Allow click
          setTimeout(function () {
            allowItemClick = true;
          }, 100);
        }

        function handleDayClick(e) {
          if (!allowItemClick) { return; }
          var $dayEl = $(e.target).parents('.calendar-day');
          if ($dayEl.length === 0 && $(e.target).hasClass('calendar-day')) {
            $dayEl = $(e.target);
          }
          if ($dayEl.length === 0) { return; }
          if ($dayEl.hasClass('calendar-day-disabled')) { return; }
          if (!calendar.params.rangePicker) {
            if ($dayEl.hasClass('calendar-day-next')) { calendar.nextMonth(); }
            if ($dayEl.hasClass('calendar-day-prev')) { calendar.prevMonth(); }
          }
          var dateYear = parseInt($dayEl.attr('data-year'), 10);
          var dateMonth = parseInt($dayEl.attr('data-month'), 10);
          var dateDay = parseInt($dayEl.attr('data-day'), 10);
          calendar.emit(
            'local::dayClick calendarDayClick',
            calendar,
            $dayEl[0],
            dateYear,
            dateMonth,
            dateDay
          );
          if (!$dayEl.hasClass('calendar-day-selected') || calendar.params.multiple || calendar.params.rangePicker) {
            calendar.addValue(new calendar.DateHandleClass(dateYear, dateMonth, dateDay, 0, 0, 0));
          }
          if (calendar.params.closeOnSelect) {
            if (
              (calendar.params.rangePicker && calendar.value.length === 2)
              || !calendar.params.rangePicker
            ) {
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
        {
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
          {
            if (calendar.params.touchMove) {
              $wrapperEl.off(app.touchEvents.start, handleTouchStart, passiveListener);
              app.off('touchmove:active', handleTouchMove);
              app.off('touchend:passive', handleTouchEnd);
            }
          }
        };
      };

      calendar.init();

      return calendar;
    }

    if ( Framework7Class$$1 ) Calendar.__proto__ = Framework7Class$$1;
    Calendar.prototype = Object.create( Framework7Class$$1 && Framework7Class$$1.prototype );
    Calendar.prototype.constructor = Calendar;
    // eslint-disable-next-line
    Calendar.prototype.normalizeDate = function normalizeDate (date) {
      var calendar = this;
      var d = new calendar.DateHandleClass(date);
      return new calendar.DateHandleClass(d.getFullYear(), d.getMonth(), d.getDate());
    };

    Calendar.prototype.normalizeValues = function normalizeValues (values) {
      var calendar = this;
      var newValues = [];
      if (values && Array.isArray(values)) {
        newValues = values.map(function (val) { return calendar.normalizeDate(val); });
      }
      return newValues;
    };

    Calendar.prototype.initInput = function initInput () {
      var calendar = this;
      if (!calendar.$inputEl) { return; }
      if (calendar.params.inputReadOnly) { calendar.$inputEl.prop('readOnly', true); }
    };

    Calendar.prototype.isPopover = function isPopover () {
      var calendar = this;
      var app = calendar.app;
      var modal = calendar.modal;
      var params = calendar.params;
      if (params.openIn === 'sheet') { return false; }
      if (modal && modal.type !== 'popover') { return false; }

      if (!calendar.inline && calendar.inputEl) {
        if (params.openIn === 'popover') { return true; }
        if (app.device.ios) {
          return !!app.device.ipad;
        }
        if (app.width >= 768) {
          return true;
        }
      }
      return false;
    };

    Calendar.prototype.formatDate = function formatDate (d) {
      var calendar = this;
      var date = new calendar.DateHandleClass(d);
      var year = date.getFullYear();
      var month = date.getMonth();
      var month1 = month + 1;
      var day = date.getDate();
      var weekDay = date.getDay();
      var ref = calendar.params;
      var dateFormat = ref.dateFormat;
      var monthNames = ref.monthNames;
      var monthNamesShort = ref.monthNamesShort;
      var dayNames = ref.dayNames;
      var dayNamesShort = ref.dayNamesShort;

      return dateFormat
        .replace(/yyyy/g, year)
        .replace(/yy/g, String(year).substring(2))
        .replace(/mm/g, month1 < 10 ? ("0" + month1) : month1)
        .replace(/m(\W+)/g, (month1 + "$1"))
        .replace(/MM/g, monthNames[month])
        .replace(/M(\W+)/g, ((monthNamesShort[month]) + "$1"))
        .replace(/dd/g, day < 10 ? ("0" + day) : day)
        .replace(/d(\W+)/g, (day + "$1"))
        .replace(/DD/g, dayNames[weekDay])
        .replace(/D(\W+)/g, ((dayNamesShort[weekDay]) + "$1"));
    };

    Calendar.prototype.formatValue = function formatValue () {
      var calendar = this;
      var value = calendar.value;
      if (calendar.params.formatValue) {
        return calendar.params.formatValue.call(calendar, value);
      }
      return value
        .map(function (v) { return calendar.formatDate(v); })
        .join(calendar.params.rangePicker ? ' - ' : ', ');
    };

    Calendar.prototype.addValue = function addValue (newValue) {
      var calendar = this;
      var ref = calendar.params;
      var multiple = ref.multiple;
      var rangePicker = ref.rangePicker;
      var rangePickerMinDays = ref.rangePickerMinDays;
      var rangePickerMaxDays = ref.rangePickerMaxDays;
      if (multiple) {
        if (!calendar.value) { calendar.value = []; }
        var inValuesIndex;
        for (var i = 0; i < calendar.value.length; i += 1) {
          if (new calendar.DateHandleClass(newValue).getTime() === new calendar.DateHandleClass(calendar.value[i]).getTime()) {
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
        if (!calendar.value) { calendar.value = []; }
        if (calendar.value.length === 2 || calendar.value.length === 0) {
          calendar.value = [];
        }

        if ((calendar.value.length === 0
          || ((Math.abs(calendar.value[0].getTime() - newValue.getTime()) >= (rangePickerMinDays - 1) * 60 * 60 * 24 * 1000) && (rangePickerMaxDays === 0 || Math.abs(calendar.value[0].getTime() - newValue.getTime()) <= (rangePickerMaxDays - 1) * 60 * 60 * 24 * 1000)))) { calendar.value.push(newValue); }
        else { calendar.value = []; }

        calendar.value.sort(function (a, b) { return a - b; });
        calendar.updateValue();
      } else {
        calendar.value = [newValue];
        calendar.updateValue();
      }
    };

    Calendar.prototype.setValue = function setValue (values) {
      var calendar = this;
      calendar.value = values;
      calendar.updateValue();
    };

    Calendar.prototype.getValue = function getValue () {
      var calendar = this;
      return calendar.value;
    };

    Calendar.prototype.updateValue = function updateValue (onlyHeader) {
      var calendar = this;
      var $el = calendar.$el;
      var $wrapperEl = calendar.$wrapperEl;
      var $inputEl = calendar.$inputEl;
      var value = calendar.value;
      var params = calendar.params;
      var i;
      if ($el && $el.length > 0) {
        $wrapperEl.find('.calendar-day-selected').removeClass('calendar-day-selected');
        var valueDate;
        if (params.rangePicker && value.length === 2) {
          for (i = new calendar.DateHandleClass(value[0]).getTime(); i <= new calendar.DateHandleClass(value[1]).getTime(); i += 24 * 60 * 60 * 1000) {
            valueDate = new calendar.DateHandleClass(i);
            $wrapperEl.find((".calendar-day[data-date=\"" + (valueDate.getFullYear()) + "-" + (valueDate.getMonth()) + "-" + (valueDate.getDate()) + "\"]")).addClass('calendar-day-selected');
          }
        } else {
          for (i = 0; i < calendar.value.length; i += 1) {
            valueDate = new calendar.DateHandleClass(value[i]);
            $wrapperEl.find((".calendar-day[data-date=\"" + (valueDate.getFullYear()) + "-" + (valueDate.getMonth()) + "-" + (valueDate.getDate()) + "\"]")).addClass('calendar-day-selected');
          }
        }
      }
      if (!onlyHeader) {
        calendar.emit('local::change calendarChange', calendar, value);
      }


      if (($inputEl && $inputEl.length) || params.header) {
        var inputValue = calendar.formatValue(value);
        if (params.header && $el && $el.length) {
          $el.find('.calendar-selected-date').text(inputValue);
        }
        if ($inputEl && $inputEl.length && !onlyHeader) {
          $inputEl.val(inputValue);
          $inputEl.trigger('change');
        }
      }
    };

    Calendar.prototype.updateCurrentMonthYear = function updateCurrentMonthYear (dir) {
      var calendar = this;
      var $months = calendar.$months;
      var $el = calendar.$el;
      var params = calendar.params;
      if (typeof dir === 'undefined') {
        calendar.currentMonth = parseInt($months.eq(1).attr('data-month'), 10);
        calendar.currentYear = parseInt($months.eq(1).attr('data-year'), 10);
      } else {
        calendar.currentMonth = parseInt($months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-month'), 10);
        calendar.currentYear = parseInt($months.eq(dir === 'next' ? ($months.length - 1) : 0).attr('data-year'), 10);
      }
      $el.find('.current-month-value').text(params.monthNames[calendar.currentMonth]);
      $el.find('.current-year-value').text(calendar.currentYear);
    };

    Calendar.prototype.update = function update () {
      var calendar = this;
      var currentYear = calendar.currentYear;
      var currentMonth = calendar.currentMonth;
      var $wrapperEl = calendar.$wrapperEl;
      var currentDate = new calendar.DateHandleClass(currentYear, currentMonth);
      var prevMonthHtml = calendar.renderMonth(currentDate, 'prev');
      var currentMonthHtml = calendar.renderMonth(currentDate);
      var nextMonthHtml = calendar.renderMonth(currentDate, 'next');

      $wrapperEl
        .transition(0)
        .html(("" + prevMonthHtml + currentMonthHtml + nextMonthHtml))
        .transform('translate3d(0,0,0)');
      calendar.$months = $wrapperEl.find('.calendar-month');
      calendar.monthsTranslate = 0;
      calendar.setMonthsTranslate();
      calendar.$months.each(function (index, monthEl) {
        calendar.emit(
          'local::monthAdd calendarMonthAdd',
          monthEl
        );
      });
    };

    Calendar.prototype.onMonthChangeStart = function onMonthChangeStart (dir) {
      var calendar = this;
      var $months = calendar.$months;
      var currentYear = calendar.currentYear;
      var currentMonth = calendar.currentMonth;
      calendar.updateCurrentMonthYear(dir);
      $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
      var currentIndex = dir === 'next' ? $months.length - 1 : 0;

      $months.eq(currentIndex).addClass('calendar-month-current');
      $months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'calendar-month-prev' : 'calendar-month-next');

      calendar.emit(
        'local::monthYearChangeStart calendarMonthYearChangeStart',
        calendar,
        currentYear,
        currentMonth
      );
    };

    Calendar.prototype.onMonthChangeEnd = function onMonthChangeEnd (dir, rebuildBoth) {
      var calendar = this;
      var currentYear = calendar.currentYear;
      var currentMonth = calendar.currentMonth;
      var $wrapperEl = calendar.$wrapperEl;
      var monthsTranslate = calendar.monthsTranslate;
      calendar.animating = false;
      var nextMonthHtml;
      var prevMonthHtml;
      var currentMonthHtml;
      $wrapperEl
        .find('.calendar-month:not(.calendar-month-prev):not(.calendar-month-current):not(.calendar-month-next)')
        .remove();

      if (typeof dir === 'undefined') {
        dir = 'next'; // eslint-disable-line
        rebuildBoth = true; // eslint-disable-line
      }
      if (!rebuildBoth) {
        currentMonthHtml = calendar.renderMonth(new calendar.DateHandleClass(currentYear, currentMonth), dir);
      } else {
        $wrapperEl.find('.calendar-month-next, .calendar-month-prev').remove();
        prevMonthHtml = calendar.renderMonth(new calendar.DateHandleClass(currentYear, currentMonth), 'prev');
        nextMonthHtml = calendar.renderMonth(new calendar.DateHandleClass(currentYear, currentMonth), 'next');
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
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        calendar,
        dir === 'next' ? $months.eq($months.length - 1)[0] : $months.eq(0)[0]
      );
      calendar.emit(
        'local::monthYearChangeEnd calendarMonthYearChangeEnd',
        calendar,
        currentYear,
        currentMonth
      );
    };

    Calendar.prototype.setMonthsTranslate = function setMonthsTranslate (translate) {
      var calendar = this;
      var $months = calendar.$months;
      var isH = calendar.isHorizontal;
      var inverter = calendar.inverter;
      // eslint-disable-next-line
      translate = translate || calendar.monthsTranslate || 0;
      if (typeof calendar.monthsTranslate === 'undefined') {
        calendar.monthsTranslate = translate;
      }
      $months.removeClass('calendar-month-current calendar-month-prev calendar-month-next');
      var prevMonthTranslate = -(translate + 1) * 100 * inverter;
      var currentMonthTranslate = -translate * 100 * inverter;
      var nextMonthTranslate = -(translate - 1) * 100 * inverter;
      $months.eq(0)
        .transform(("translate3d(" + (isH ? prevMonthTranslate : 0) + "%, " + (isH ? 0 : prevMonthTranslate) + "%, 0)"))
        .addClass('calendar-month-prev');
      $months.eq(1)
        .transform(("translate3d(" + (isH ? currentMonthTranslate : 0) + "%, " + (isH ? 0 : currentMonthTranslate) + "%, 0)"))
        .addClass('calendar-month-current');
      $months.eq(2)
        .transform(("translate3d(" + (isH ? nextMonthTranslate : 0) + "%, " + (isH ? 0 : nextMonthTranslate) + "%, 0)"))
        .addClass('calendar-month-next');
    };

    Calendar.prototype.nextMonth = function nextMonth (transition) {
      var calendar = this;
      var params = calendar.params;
      var $wrapperEl = calendar.$wrapperEl;
      var inverter = calendar.inverter;
      var isH = calendar.isHorizontal;
      if (typeof transition === 'undefined' || typeof transition === 'object') {
        transition = ''; // eslint-disable-line
        if (!params.animate) { transition = 0; } // eslint-disable-line
      }
      var nextMonth = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-month'), 10);
      var nextYear = parseInt(calendar.$months.eq(calendar.$months.length - 1).attr('data-year'), 10);
      var nextDate = new calendar.DateHandleClass(nextYear, nextMonth);
      var nextDateTime = nextDate.getTime();
      var transitionEndCallback = !calendar.animating;
      if (params.maxDate) {
        if (nextDateTime > new calendar.DateHandleClass(params.maxDate).getTime()) {
          calendar.resetMonth();
          return;
        }
      }
      calendar.monthsTranslate -= 1;
      if (nextMonth === calendar.currentMonth) {
        var nextMonthTranslate = -(calendar.monthsTranslate) * 100 * inverter;
        var nextMonthHtml = $(calendar.renderMonth(nextDateTime, 'next'))
          .transform(("translate3d(" + (isH ? nextMonthTranslate : 0) + "%, " + (isH ? 0 : nextMonthTranslate) + "%, 0)"))
          .addClass('calendar-month-next');
        $wrapperEl.append(nextMonthHtml[0]);
        calendar.$months = $wrapperEl.find('.calendar-month');
        calendar.emit(
          'local::monthAdd calendarMonthAdd',
          calendar.$months.eq(calendar.$months.length - 1)[0]
        );
      }
      calendar.animating = true;
      calendar.onMonthChangeStart('next');
      var translate = (calendar.monthsTranslate * 100) * inverter;

      $wrapperEl.transition(transition).transform(("translate3d(" + (isH ? translate : 0) + "%, " + (isH ? 0 : translate) + "%, 0)"));
      if (transitionEndCallback) {
        $wrapperEl.transitionEnd(function () {
          calendar.onMonthChangeEnd('next');
        });
      }
      if (!params.animate) {
        calendar.onMonthChangeEnd('next');
      }
    };

    Calendar.prototype.prevMonth = function prevMonth (transition) {
      var calendar = this;
      var params = calendar.params;
      var $wrapperEl = calendar.$wrapperEl;
      var inverter = calendar.inverter;
      var isH = calendar.isHorizontal;
      if (typeof transition === 'undefined' || typeof transition === 'object') {
        transition = ''; // eslint-disable-line
        if (!params.animate) { transition = 0; } // eslint-disable-line
      }
      var prevMonth = parseInt(calendar.$months.eq(0).attr('data-month'), 10);
      var prevYear = parseInt(calendar.$months.eq(0).attr('data-year'), 10);
      var prevDate = new calendar.DateHandleClass(prevYear, prevMonth + 1, -1);
      var prevDateTime = prevDate.getTime();
      var transitionEndCallback = !calendar.animating;
      if (params.minDate) {
        var minDate = new calendar.DateHandleClass(params.minDate);
        minDate = new calendar.DateHandleClass(minDate.getFullYear(), minDate.getMonth(), 1);
        if (prevDateTime < minDate.getTime()) {
          calendar.resetMonth();
          return;
        }
      }
      calendar.monthsTranslate += 1;
      if (prevMonth === calendar.currentMonth) {
        var prevMonthTranslate = -(calendar.monthsTranslate) * 100 * inverter;
        var prevMonthHtml = $(calendar.renderMonth(prevDateTime, 'prev'))
          .transform(("translate3d(" + (isH ? prevMonthTranslate : 0) + "%, " + (isH ? 0 : prevMonthTranslate) + "%, 0)"))
          .addClass('calendar-month-prev');
        $wrapperEl.prepend(prevMonthHtml[0]);
        calendar.$months = $wrapperEl.find('.calendar-month');
        calendar.emit(
          'local::monthAdd calendarMonthAdd',
          calendar.$months.eq(0)[0]
        );
      }
      calendar.animating = true;
      calendar.onMonthChangeStart('prev');
      var translate = (calendar.monthsTranslate * 100) * inverter;
      $wrapperEl
        .transition(transition)
        .transform(("translate3d(" + (isH ? translate : 0) + "%, " + (isH ? 0 : translate) + "%, 0)"));
      if (transitionEndCallback) {
        $wrapperEl.transitionEnd(function () {
          calendar.onMonthChangeEnd('prev');
        });
      }
      if (!params.animate) {
        calendar.onMonthChangeEnd('prev');
      }
    };

    Calendar.prototype.resetMonth = function resetMonth (transition) {
      if ( transition === void 0 ) transition = '';

      var calendar = this;
      var $wrapperEl = calendar.$wrapperEl;
      var inverter = calendar.inverter;
      var isH = calendar.isHorizontal;
      var monthsTranslate = calendar.monthsTranslate;
      var translate = (monthsTranslate * 100) * inverter;
      $wrapperEl
        .transition(transition)
        .transform(("translate3d(" + (isH ? translate : 0) + "%, " + (isH ? 0 : translate) + "%, 0)"));
    };
    // eslint-disable-next-line
    Calendar.prototype.setYearMonth = function setYearMonth (year, month, transition) {
      var calendar = this;
      var params = calendar.params;
      var isH = calendar.isHorizontal;
      var $wrapperEl = calendar.$wrapperEl;
      var inverter = calendar.inverter;
      // eslint-disable-next-line
      if (typeof year === 'undefined') { year = calendar.currentYear; }
      // eslint-disable-next-line
      if (typeof month === 'undefined') { month = calendar.currentMonth; }
      if (typeof transition === 'undefined' || typeof transition === 'object') {
        // eslint-disable-next-line
        transition = '';
        // eslint-disable-next-line
        if (!params.animate) { transition = 0; }
      }
      var targetDate;
      if (year < calendar.currentYear) {
        targetDate = new calendar.DateHandleClass(year, month + 1, -1).getTime();
      } else {
        targetDate = new calendar.DateHandleClass(year, month).getTime();
      }
      if (params.maxDate && targetDate > new calendar.DateHandleClass(params.maxDate).getTime()) {
        return false;
      }
      if (params.minDate) {
        var minDate = new calendar.DateHandleClass(params.minDate);
        minDate = new calendar.DateHandleClass(minDate.getFullYear(), minDate.getMonth(), 1);
        if (targetDate < minDate.getTime()) {
          return false;
        }
      }
      var currentDate = new calendar.DateHandleClass(calendar.currentYear, calendar.currentMonth).getTime();
      var dir = targetDate > currentDate ? 'next' : 'prev';
      var newMonthHTML = calendar.renderMonth(new calendar.DateHandleClass(year, month));
      calendar.monthsTranslate = calendar.monthsTranslate || 0;
      var prevTranslate = calendar.monthsTranslate;
      var monthTranslate;
      var transitionEndCallback = !calendar.animating;
      if (targetDate > currentDate) {
        // To next
        calendar.monthsTranslate -= 1;
        if (!calendar.animating) { calendar.$months.eq(calendar.$months.length - 1).remove(); }
        $wrapperEl.append(newMonthHTML);
        calendar.$months = $wrapperEl.find('.calendar-month');
        monthTranslate = -(prevTranslate - 1) * 100 * inverter;
        calendar.$months
          .eq(calendar.$months.length - 1)
          .transform(("translate3d(" + (isH ? monthTranslate : 0) + "%, " + (isH ? 0 : monthTranslate) + "%, 0)"))
          .addClass('calendar-month-next');
      } else {
        // To prev
        calendar.monthsTranslate += 1;
        if (!calendar.animating) { calendar.$months.eq(0).remove(); }
        $wrapperEl.prepend(newMonthHTML);
        calendar.$months = $wrapperEl.find('.calendar-month');
        monthTranslate = -(prevTranslate + 1) * 100 * inverter;
        calendar.$months
          .eq(0)
          .transform(("translate3d(" + (isH ? monthTranslate : 0) + "%, " + (isH ? 0 : monthTranslate) + "%, 0)"))
          .addClass('calendar-month-prev');
      }
      calendar.emit(
        'local::monthAdd calendarMonthAdd',
        dir === 'next'
          ? calendar.$months.eq(calendar.$months.length - 1)[0]
          : calendar.$months.eq(0)[0]
      );

      calendar.animating = true;
      calendar.onMonthChangeStart(dir);
      var wrapperTranslate = (calendar.monthsTranslate * 100) * inverter;
      $wrapperEl
        .transition(transition)
        .transform(("translate3d(" + (isH ? wrapperTranslate : 0) + "%, " + (isH ? 0 : wrapperTranslate) + "%, 0)"));
      if (transitionEndCallback) {
        $wrapperEl.transitionEnd(function () {
          calendar.onMonthChangeEnd(dir, true);
        });
      }
      if (!params.animate) {
        calendar.onMonthChangeEnd(dir);
      }
    };

    Calendar.prototype.nextYear = function nextYear () {
      var calendar = this;
      calendar.setYearMonth(calendar.currentYear + 1);
    };

    Calendar.prototype.prevYear = function prevYear () {
      var calendar = this;
      calendar.setYearMonth(calendar.currentYear - 1);
    };
    // eslint-disable-next-line
    Calendar.prototype.dateInRange = function dateInRange (dayDate, range) {
      var calendar = this;
      var match = false;
      var i;
      if (!range) { return false; }
      if (Array.isArray(range)) {
        for (i = 0; i < range.length; i += 1) {
          if (range[i].from || range[i].to) {
            if (range[i].from && range[i].to) {
              if ((dayDate <= new calendar.DateHandleClass(range[i].to).getTime()) && (dayDate >= new calendar.DateHandleClass(range[i].from).getTime())) {
                match = true;
              }
            } else if (range[i].from) {
              if (dayDate >= new calendar.DateHandleClass(range[i].from).getTime()) {
                match = true;
              }
            } else if (range[i].to) {
              if (dayDate <= new calendar.DateHandleClass(range[i].to).getTime()) {
                match = true;
              }
            }
          } else if (range[i].date) {
            if (dayDate === new calendar.DateHandleClass(range[i].date).getTime()) {
              match = true;
            }
          } else if (dayDate === new calendar.DateHandleClass(range[i]).getTime()) {
            match = true;
          }
        }
      } else if (range.from || range.to) {
        if (range.from && range.to) {
          if ((dayDate <= new calendar.DateHandleClass(range.to).getTime()) && (dayDate >= new calendar.DateHandleClass(range.from).getTime())) {
            match = true;
          }
        } else if (range.from) {
          if (dayDate >= new calendar.DateHandleClass(range.from).getTime()) {
            match = true;
          }
        } else if (range.to) {
          if (dayDate <= new calendar.DateHandleClass(range.to).getTime()) {
            match = true;
          }
        }
      } else if (range.date) {
        match = dayDate === new calendar.DateHandleClass(range.date).getTime();
      } else if (typeof range === 'function') {
        match = range(new calendar.DateHandleClass(dayDate));
      }
      return match;
    };
    // eslint-disable-next-line
    Calendar.prototype.daysInMonth = function daysInMonth (date) {
      var calendar = this;
      var d = new calendar.DateHandleClass(date);
      return new calendar.DateHandleClass(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    };

    Calendar.prototype.renderMonths = function renderMonths (date) {
      var calendar = this;
      if (calendar.params.renderMonths) {
        return calendar.params.renderMonths.call(calendar, date);
      }
      return ("\n    <div class=\"calendar-months-wrapper\">\n    " + (calendar.renderMonth(date, 'prev')) + "\n    " + (calendar.renderMonth(date)) + "\n    " + (calendar.renderMonth(date, 'next')) + "\n    </div>\n  ").trim();
    };

    Calendar.prototype.renderMonth = function renderMonth (d, offset) {
      var calendar = this;
      var params = calendar.params;
      var value = calendar.value;
      if (params.renderMonth) {
        return params.renderMonth.call(calendar, d, offset);
      }
      var date = new calendar.DateHandleClass(d);
      var year = date.getFullYear();
      var month = date.getMonth();

      if (offset === 'next') {
        if (month === 11) { date = new calendar.DateHandleClass(year + 1, 0); }
        else { date = new calendar.DateHandleClass(year, month + 1, 1); }
      }
      if (offset === 'prev') {
        if (month === 0) { date = new calendar.DateHandleClass(year - 1, 11); }
        else { date = new calendar.DateHandleClass(year, month - 1, 1); }
      }
      if (offset === 'next' || offset === 'prev') {
        month = date.getMonth();
        year = date.getFullYear();
      }

      var currentValues = [];
      var today = new calendar.DateHandleClass().setHours(0, 0, 0, 0);
      var minDate = params.minDate ? new calendar.DateHandleClass(params.minDate).getTime() : null;
      var maxDate = params.maxDate ? new calendar.DateHandleClass(params.maxDate).getTime() : null;
      var rows = 6;
      var cols = 7;
      var daysInPrevMonth = calendar.daysInMonth(new calendar.DateHandleClass(date.getFullYear(), date.getMonth()).getTime() - (10 * 24 * 60 * 60 * 1000));
      var daysInMonth = calendar.daysInMonth(date);
      var minDayNumber = params.firstDay === 6 ? 0 : 1;

      var monthHtml = '';
      var dayIndex = 0 + (params.firstDay - 1);
      var disabled;
      var hasEvents;
      var firstDayOfMonthIndex = new calendar.DateHandleClass(date.getFullYear(), date.getMonth()).getDay();
      if (firstDayOfMonthIndex === 0) { firstDayOfMonthIndex = 7; }

      if (value && value.length) {
        for (var i = 0; i < value.length; i += 1) {
          currentValues.push(new calendar.DateHandleClass(value[i]).setHours(0, 0, 0, 0));
        }
      }

      for (var row = 1; row <= rows; row += 1) {
        var rowHtml = '';
        var loop = function ( col ) {
          dayIndex += 1;
          var dayDate = (void 0);
          var dayNumber = dayIndex - firstDayOfMonthIndex;
          var addClass = '';
          if (row === 1 && col === 1 && dayNumber > minDayNumber && params.firstDay !== 1) {
            dayIndex -= 7;
            dayNumber = dayIndex - firstDayOfMonthIndex;
          }

          var weekDayIndex = ((col - 1) + params.firstDay > 6)
            ? ((col - 1 - 7) + params.firstDay)
            : ((col - 1) + params.firstDay);

          if (dayNumber < 0) {
            dayNumber = daysInPrevMonth + dayNumber + 1;
            addClass += ' calendar-day-prev';
            dayDate = new calendar.DateHandleClass(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
          } else {
            dayNumber += 1;
            if (dayNumber > daysInMonth) {
              dayNumber -= daysInMonth;
              addClass += ' calendar-day-next';
              dayDate = new calendar.DateHandleClass(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
            } else {
              dayDate = new calendar.DateHandleClass(year, month, dayNumber).getTime();
            }
          }
          // Today
          if (dayDate === today) { addClass += ' calendar-day-today'; }

          // Selected
          if (params.rangePicker && currentValues.length === 2) {
            if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) { addClass += ' calendar-day-selected'; }
          } else if (currentValues.indexOf(dayDate) >= 0) { addClass += ' calendar-day-selected'; }
          // Weekend
          if (params.weekendDays.indexOf(weekDayIndex) >= 0) {
            addClass += ' calendar-day-weekend';
          }
          // Events
          var eventsHtml = '';
          hasEvents = false;
          if (params.events) {
            if (calendar.dateInRange(dayDate, params.events)) {
              hasEvents = true;
            }
          }
          if (hasEvents) {
            addClass += ' calendar-day-has-events';
            eventsHtml = "\n            <span class=\"calendar-day-events\">\n              <span class=\"calendar-day-event\"></span>\n            </span>\n          ";
            if (Array.isArray(params.events)) {
              var eventDots = [];
              params.events.forEach(function (ev) {
                var color = ev.color || '';
                if (eventDots.indexOf(color) < 0 && calendar.dateInRange(dayDate, ev)) {
                  eventDots.push(color);
                }
              });
              eventsHtml = "\n              <span class=\"calendar-day-events\">\n                " + (eventDots.map(function (color) { return ("\n                  <span class=\"calendar-day-event\" style=\"" + (color ? ("background-color: " + color) : '') + "\"></span>\n                ").trim(); }).join('')) + "\n              </span>\n            ";
            }
          }
          // Custom Ranges
          if (params.rangesClasses) {
            for (var k = 0; k < params.rangesClasses.length; k += 1) {
              if (calendar.dateInRange(dayDate, params.rangesClasses[k].range)) {
                addClass += " " + (params.rangesClasses[k].cssClass);
              }
            }
          }
          // Disabled
          disabled = false;
          if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
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

          dayDate = new calendar.DateHandleClass(dayDate);
          var dayYear = dayDate.getFullYear();
          var dayMonth = dayDate.getMonth();
          rowHtml += ("\n          <div data-year=\"" + dayYear + "\" data-month=\"" + dayMonth + "\" data-day=\"" + dayNumber + "\" class=\"calendar-day" + addClass + "\" data-date=\"" + dayYear + "-" + dayMonth + "-" + dayNumber + "\">\n            <span class=\"calendar-day-number\">" + dayNumber + eventsHtml + "</span>\n          </div>").trim();
        };

        for (var col = 1; col <= cols; col += 1) loop( col );
        monthHtml += "<div class=\"calendar-row\">" + rowHtml + "</div>";
      }
      monthHtml = "<div class=\"calendar-month\" data-year=\"" + year + "\" data-month=\"" + month + "\">" + monthHtml + "</div>";
      return monthHtml;
    };

    Calendar.prototype.renderWeekHeader = function renderWeekHeader () {
      var calendar = this;
      if (calendar.params.renderWeekHeader) {
        return calendar.params.renderWeekHeader.call(calendar);
      }
      var params = calendar.params;
      var weekDaysHtml = '';
      for (var i = 0; i < 7; i += 1) {
        var dayIndex = (i + params.firstDay > 6)
          ? ((i - 7) + params.firstDay)
          : (i + params.firstDay);
        var dayName = params.dayNamesShort[dayIndex];
        weekDaysHtml += "<div class=\"calendar-week-day\">" + dayName + "</div>";
      }
      return ("\n    <div class=\"calendar-week-header\">\n    " + weekDaysHtml + "\n    </div>\n  ").trim();
    };

    Calendar.prototype.renderMonthSelector = function renderMonthSelector () {
      var calendar = this;
      var app = calendar.app;
      if (calendar.params.renderMonthSelector) {
        return calendar.params.renderMonthSelector.call(calendar);
      }

      var needsBlackIcon;
      if (calendar.inline && calendar.$containerEl.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      } else if (app.root.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      }

      var iconColor = app.theme === 'md' && needsBlackIcon ? 'color-black' : '';
      return ("\n    <div class=\"calendar-month-selector\">\n    <a href=\"#\" class=\"link icon-only calendar-prev-month-button\">\n      <i class=\"icon icon-prev " + iconColor + "\"></i>\n    </a>\n    <span class=\"current-month-value\"></span>\n    <a href=\"#\" class=\"link icon-only calendar-next-month-button\">\n      <i class=\"icon icon-next " + iconColor + "\"></i>\n    </a>\n    </div>\n  ").trim();
    };

    Calendar.prototype.renderYearSelector = function renderYearSelector () {
      var calendar = this;
      var app = calendar.app;
      if (calendar.params.renderYearSelector) {
        return calendar.params.renderYearSelector.call(calendar);
      }

      var needsBlackIcon;
      if (calendar.inline && calendar.$containerEl.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      } else if (app.root.closest('.theme-dark').length === 0) {
        needsBlackIcon = true;
      }

      var iconColor = app.theme === 'md' && needsBlackIcon ? 'color-black' : '';
      return ("\n    <div class=\"calendar-year-selector\">\n    <a href=\"#\" class=\"link icon-only calendar-prev-year-button\">\n      <i class=\"icon icon-prev " + iconColor + "\"></i>\n    </a>\n    <span class=\"current-year-value\"></span>\n    <a href=\"#\" class=\"link icon-only calendar-next-year-button\">\n      <i class=\"icon icon-next " + iconColor + "\"></i>\n    </a>\n    </div>\n  ").trim();
    };

    Calendar.prototype.renderHeader = function renderHeader () {
      var calendar = this;
      if (calendar.params.renderHeader) {
        return calendar.params.renderHeader.call(calendar);
      }
      return ("\n    <div class=\"calendar-header\">\n    <div class=\"calendar-selected-date\">" + (calendar.params.headerPlaceholder) + "</div>\n    </div>\n  ").trim();
    };

    Calendar.prototype.renderFooter = function renderFooter () {
      var calendar = this;
      var app = calendar.app;
      if (calendar.params.renderFooter) {
        return calendar.params.renderFooter.call(calendar);
      }
      return ("\n    <div class=\"calendar-footer\">\n    <a href=\"#\" class=\"" + (app.theme === 'md' ? 'button' : 'link') + " calendar-close sheet-close popover-close\">" + (calendar.params.toolbarCloseText) + "</a>\n    </div>\n  ").trim();
    };

    Calendar.prototype.renderToolbar = function renderToolbar () {
      var calendar = this;
      if (calendar.params.renderToolbar) {
        return calendar.params.renderToolbar.call(calendar, calendar);
      }
      return ("\n    <div class=\"toolbar no-shadow\">\n    <div class=\"toolbar-inner\">\n      " + (calendar.renderMonthSelector()) + "\n      " + (calendar.renderYearSelector()) + "\n    </div>\n    </div>\n  ").trim();
    };
    // eslint-disable-next-line
    Calendar.prototype.renderInline = function renderInline () {
      var calendar = this;
      var ref = calendar.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;
      var header = ref.header;
      var footer = ref.footer;
      var rangePicker = ref.rangePicker;
      var weekHeader = ref.weekHeader;
      var value = calendar.value;
      var date = value && value.length ? value[0] : new calendar.DateHandleClass().setHours(0, 0, 0);
      var inlineHtml = ("\n    <div class=\"calendar calendar-inline " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n    " + (header ? calendar.renderHeader() : '') + "\n    " + (toolbar ? calendar.renderToolbar() : '') + "\n    " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n    <div class=\"calendar-months\">\n      " + (calendar.renderMonths(date)) + "\n    </div>\n    " + (footer ? calendar.renderFooter() : '') + "\n    </div>\n  ").trim();

      return inlineHtml;
    };

    Calendar.prototype.renderCustomModal = function renderCustomModal () {
      var calendar = this;
      var ref = calendar.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;
      var header = ref.header;
      var footer = ref.footer;
      var rangePicker = ref.rangePicker;
      var weekHeader = ref.weekHeader;
      var value = calendar.value;
      var date = value && value.length ? value[0] : new calendar.DateHandleClass().setHours(0, 0, 0);
      var sheetHtml = ("\n    <div class=\"calendar calendar-modal " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n    " + (header ? calendar.renderHeader() : '') + "\n    " + (toolbar ? calendar.renderToolbar() : '') + "\n    " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n    <div class=\"calendar-months\">\n      " + (calendar.renderMonths(date)) + "\n    </div>\n    " + (footer ? calendar.renderFooter() : '') + "\n    </div>\n  ").trim();

      return sheetHtml;
    };

    Calendar.prototype.renderSheet = function renderSheet () {
      var calendar = this;
      var ref = calendar.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;
      var header = ref.header;
      var footer = ref.footer;
      var rangePicker = ref.rangePicker;
      var weekHeader = ref.weekHeader;
      var value = calendar.value;
      var date = value && value.length ? value[0] : new calendar.DateHandleClass().setHours(0, 0, 0);
      var sheetHtml = ("\n    <div class=\"sheet-modal calendar calendar-sheet " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n    " + (header ? calendar.renderHeader() : '') + "\n    " + (toolbar ? calendar.renderToolbar() : '') + "\n    " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n    <div class=\"sheet-modal-inner calendar-months\">\n      " + (calendar.renderMonths(date)) + "\n    </div>\n    " + (footer ? calendar.renderFooter() : '') + "\n    </div>\n  ").trim();

      return sheetHtml;
    };

    Calendar.prototype.renderPopover = function renderPopover () {
      var calendar = this;
      var ref = calendar.params;
      var cssClass = ref.cssClass;
      var toolbar = ref.toolbar;
      var header = ref.header;
      var footer = ref.footer;
      var rangePicker = ref.rangePicker;
      var weekHeader = ref.weekHeader;
      var value = calendar.value;
      var date = value && value.length ? value[0] : new calendar.DateHandleClass().setHours(0, 0, 0);
      var popoverHtml = ("\n    <div class=\"popover calendar-popover\">\n    <div class=\"popover-inner\">\n      <div class=\"calendar " + (rangePicker ? 'calendar-range' : '') + " " + (cssClass || '') + "\">\n      " + (header ? calendar.renderHeader() : '') + "\n      " + (toolbar ? calendar.renderToolbar() : '') + "\n      " + (weekHeader ? calendar.renderWeekHeader() : '') + "\n      <div class=\"calendar-months\">\n        " + (calendar.renderMonths(date)) + "\n      </div>\n      " + (footer ? calendar.renderFooter() : '') + "\n      </div>\n    </div>\n    </div>\n  ").trim();

      return popoverHtml;
    };

    Calendar.prototype.render = function render () {
      var calendar = this;
      var params = calendar.params;
      if (params.render) { return params.render.call(calendar); }
      if (!calendar.inline) {
        var modalType = params.openIn;
        if (modalType === 'auto') { modalType = calendar.isPopover() ? 'popover' : 'sheet'; }

        if (modalType === 'popover') { return calendar.renderPopover(); }
        if (modalType === 'sheet') { return calendar.renderSheet(); }
        return calendar.renderCustomModal();
      }
      return calendar.renderInline();
    };

    Calendar.prototype.onOpen = function onOpen () {
      var calendar = this;
      var initialized = calendar.initialized;
      var $el = calendar.$el;
      var app = calendar.app;
      var $inputEl = calendar.$inputEl;
      var inline = calendar.inline;
      var value = calendar.value;
      var params = calendar.params;
      calendar.closing = false;
      calendar.opened = true;
      calendar.opening = true;

      // Init main events
      calendar.attachCalendarEvents();

      var updateValue = !value && params.value;

      // Set value
      if (!initialized) {
        if (value) { calendar.setValue(value, 0); }
        else if (params.value) {
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
      if (updateValue) { calendar.updateValue(); }
      else if (params.header && value) {
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
    };

    Calendar.prototype.onOpened = function onOpened () {
      var calendar = this;
      calendar.opening = false;
      if (calendar.$el) {
        calendar.$el.trigger('calendar:opened', calendar);
      }
      if (calendar.$inputEl) {
        calendar.$inputEl.trigger('calendar:opened', calendar);
      }
      calendar.emit('local::opened calendarOpened', calendar);
    };

    Calendar.prototype.onClose = function onClose () {
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
    };

    Calendar.prototype.onClosed = function onClosed () {
      var calendar = this;
      calendar.opened = false;
      calendar.closing = false;

      if (!calendar.inline) {
        Utils.nextTick(function () {
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
    };

    Calendar.prototype.open = function open () {
      var obj;

      var calendar = this;
      var app = calendar.app;
      var opened = calendar.opened;
      var inline = calendar.inline;
      var $inputEl = calendar.$inputEl;
      var params = calendar.params;
      if (opened) { return; }

      if (inline) {
        calendar.$el = $(calendar.render());
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
        backdrop: calendar.params.backdrop === true || (modalType === 'popover' && app.params.popover.backdrop !== false && calendar.params.backdrop !== false),
        closeByBackdropClick: calendar.params.closeByBackdropClick,
        on: {
          open: function open() {
            var modal = this;
            calendar.modal = modal;
            calendar.$el = modalType === 'popover' ? modal.$el.find('.calendar') : modal.$el;
            calendar.$wrapperEl = calendar.$el.find('.calendar-months-wrapper');
            calendar.$months = calendar.$wrapperEl.find('.calendar-month');
            calendar.$el[0].f7Calendar = calendar;
            if (modalType === 'customModal') {
              $(calendar.$el).find('.calendar-close').once('click', function () {
                calendar.close();
              });
            }
            calendar.onOpen();
          },
          opened: function opened() { calendar.onOpened(); },
          close: function close() { calendar.onClose(); },
          closed: function closed() { calendar.onClosed(); },
        },
      };
      if (calendar.params.routableModals) {
        calendar.view.router.navigate({
          url: calendar.url,
          route: ( obj = {
            path: calendar.url
          }, obj[modalType] = modalParams, obj ),
        });
      } else {
        calendar.modal = app[modalType].create(modalParams);
        calendar.modal.open();
      }
    };

    Calendar.prototype.close = function close () {
      var calendar = this;
      var opened = calendar.opened;
      var inline = calendar.inline;
      if (!opened) { return; }
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
    };

    Calendar.prototype.init = function init () {
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
    };

    Calendar.prototype.destroy = function destroy () {
      var calendar = this;
      if (calendar.destroyed) { return; }
      var $el = calendar.$el;
      calendar.emit('local::beforeDestroy calendarBeforeDestroy', calendar);
      if ($el) { $el.trigger('calendar:beforedestroy', calendar); }

      calendar.close();

      // Detach Events
      if (calendar.$inputEl) {
        calendar.detachInputEvents();
      }
      if (calendar.params.closeByOutsideClick) {
        calendar.detachHtmlEvents();
      }

      if ($el && $el.length) { delete calendar.$el[0].f7Calendar; }
      Utils.deleteProps(calendar);
      calendar.destroyed = true;
    };

    return Calendar;
  }(Framework7Class));

  var calendar = {
    name: 'calendar',
    static: {
      Calendar: Calendar,
    },
    create: function create() {
      var app = this;
      app.calendar = ConstructorMethods({
        defaultSelector: '.calendar',
        constructor: Calendar,
        app: app,
        domProp: 'f7Calendar',
      });
      app.calendar.close = function close(el) {
        if ( el === void 0 ) el = '.calendar';

        var $el = $(el);
        if ($el.length === 0) { return; }
        var calendar = $el[0].f7Calendar;
        if (!calendar || (calendar && !calendar.opened)) { return; }
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

  return calendar;
}
framework7ComponentLoader.componentName = 'calendar';

