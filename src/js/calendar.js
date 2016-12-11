/*======================================================
************   Calendar   ************
======================================================*/
var Calendar = function (params) {
    var p = this;
    var defaults = {
        monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'],
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
        rangesClasses: null, //array with custom classes date ranges
        touchMove: true,
        animate: true,
        closeOnSelect: false,
        monthPicker: true,
        monthPickerTemplate:
            '<div class="picker-calendar-month-picker">' +
                '<a href="#" class="link icon-only picker-calendar-prev-month"><i class="icon icon-prev"></i></a>' +
                '<span class="current-month-value"></span>' +
                '<a href="#" class="link icon-only picker-calendar-next-month"><i class="icon icon-next"></i></a>' +
            '</div>',
        yearPicker: true,
        yearPickerTemplate:
            '<div class="picker-calendar-year-picker">' +
                '<a href="#" class="link icon-only picker-calendar-prev-year"><i class="icon icon-prev"></i></a>' +
                '<span class="current-year-value"></span>' +
                '<a href="#" class="link icon-only picker-calendar-next-year"><i class="icon icon-next"></i></a>' +
            '</div>',
        weekHeader: true,
        // Common settings
        closeByOutsideClick: true,
        scrollToInput: true,
        inputReadOnly: true,
        convertToPopover: true,
        onlyInPopover: false,
        toolbar: true,
        toolbarCloseText: 'Done',
        headerPlaceholder: 'Select date',
        header: app.params.material,
        footer: app.params.material,
        toolbarTemplate:
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '{{monthPicker}}' +
                    '{{yearPicker}}' +
                '</div>' +
            '</div>',
        headerTemplate:
            '<div class="picker-header">' +
                '<div class="picker-calendar-selected-date">{{placeholder}}</div>' +
            '</div>',
        footerTemplate:
            '<div class="picker-footer">' +
                '<a href="#" class="button close-picker">{{closeText}}</a>' +
            '</div>',

        /* Callbacks
        onMonthAdd
        onChange
        onOpen
        onClose
        onDayClick
        onMonthYearChangeStart
        onMonthYearChangeEnd
        */
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    p.params = params;
    p.initialized = false;

    // Inline flag
    p.inline = p.params.container ? true : false;

    // Is horizontal
    p.isH = p.params.direction === 'horizontal';

    // RTL inverter
    var inverter = p.isH ? (app.rtl ? -1 : 1) : 1;

    // Animating flag
    p.animating = false;

    // Should be converted to popover
    function isPopover() {
        var toPopover = false;
        if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
        if (!p.inline && p.params.input) {
            if (p.params.onlyInPopover) toPopover = true;
            else {
                if (app.device.ios) {
                    toPopover = app.device.ipad ? true : false;
                }
                else {
                    if ($(window).width() >= 768) toPopover = true;
                }
            }
        }
        return toPopover;
    }
    function inPopover() {
        if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
        else return false;
    }

    // Format date
    function formatDate(date) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth();
        var month1 = month + 1;
        var day = date.getDate();
        var weekDay = date.getDay();

        return p.params.dateFormat
            .replace(/yyyy/g, year)
            .replace(/yy/g, (year + '').substring(2))
            .replace(/mm/g, month1 < 10 ? '0' + month1 : month1)
            .replace(/m(\W+)/g, month1 + '$1')
            .replace(/MM/g, p.params.monthNames[month])
            .replace(/M(\W+)/g, p.params.monthNamesShort[month] + '$1')
            .replace(/dd/g, day < 10 ? '0' + day : day)
            .replace(/d(\W+)/g, day + '$1')
            .replace(/DD/g, p.params.dayNames[weekDay])
            .replace(/D(\W+)/g, p.params.dayNamesShort[weekDay] + '$1');
    }


    // Value
    p.addValue = function (value) {
        if (p.params.multiple) {
            if (!p.value) p.value = [];
            var inValuesIndex;
            for (var i = 0; i < p.value.length; i++) {
                if (new Date(value).getTime() === new Date(p.value[i]).getTime()) {
                    inValuesIndex = i;
                }
            }
            if (typeof inValuesIndex === 'undefined') {
                p.value.push(value);
            }
            else {
                p.value.splice(inValuesIndex, 1);
            }
            p.updateValue();
        }
        else if (p.params.rangePicker) {
            if (!p.value) p.value = [];
            if (p.value.length === 2 || p.value.length === 0) {
                p.value = [];
            }
            if (p.value[0] !== value) p.value.push(value);
            else p.value = [];
            p.value.sort(function (a,b) {
                return a - b;
            });
            p.updateValue();
        }
        else {
            p.value = [value];
            p.updateValue();
        }
    };
    p.setValue = function (arrValues) {
        p.value = arrValues;
        p.updateValue();
    };
    p.updateValue = function (onlyHeader) {
        var i, inputValue;
        if (p.container && p.container.length > 0) {
            p.wrapper.find('.picker-calendar-day-selected').removeClass('picker-calendar-day-selected');
            var valueDate;
            if (p.params.rangePicker && p.value.length === 2) {
                for (i = p.value[0]; i <= p.value[1]; i += 24*60*60*1000) {
                    valueDate = new Date(i);
                    p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                }
            }
            else {
                for (i = 0; i < p.value.length; i++) {
                    valueDate = new Date(p.value[i]);
                    p.wrapper.find('.picker-calendar-day[data-date="' + valueDate.getFullYear() + '-' + valueDate.getMonth() + '-' + valueDate.getDate() + '"]').addClass('picker-calendar-day-selected');
                }
            }
        }

        if (p.params.onChange) {
            p.params.onChange(p, p.value);
        }
        if ((p.input && p.input.length > 0) || (app.params.material && p.params.header)) {
            if (p.params.formatValue) inputValue = p.params.formatValue(p, p.value);
            else {
                inputValue = [];
                for (i = 0; i < p.value.length; i++) {
                    inputValue.push(formatDate(p.value[i]));
                }
                inputValue = inputValue.join(p.params.rangePicker ? ' - ' : ', ');
            }
            if (app.params.material && p.params.header && p.container && p.container.length > 0) {
                p.container.find('.picker-calendar-selected-date').text(inputValue);
            }
            if (p.input && p.input.length > 0 && !onlyHeader) {
                $(p.input).val(inputValue);
                $(p.input).trigger('change');
            }

        }
    };

    // Columns Handlers
    p.initCalendarEvents = function () {
        var col;
        var allowItemClick = true;
        var isTouched, isMoved, touchStartX, touchStartY, touchCurrentX, touchCurrentY, touchStartTime, touchEndTime, startTranslate, currentTranslate, wrapperWidth, wrapperHeight, percentage, touchesDiff, isScrolling;
        function handleTouchStart (e) {
            if (isMoved || isTouched) return;
            // e.preventDefault();
            isTouched = true;
            touchStartX = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            touchStartTime = (new Date()).getTime();
            percentage = 0;
            allowItemClick = true;
            isScrolling = undefined;
            startTranslate = currentTranslate = p.monthsTranslate;
        }
        function handleTouchMove (e) {
            if (!isTouched) return;

            touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if (typeof isScrolling === 'undefined') {
                isScrolling = !!(isScrolling || Math.abs(touchCurrentY - touchStartY) > Math.abs(touchCurrentX - touchStartX));
            }
            if (p.isH && isScrolling) {
                isTouched = false;
                return;
            }
            e.preventDefault();
            if (p.animating) {
                isTouched = false;
                return;
            }
            allowItemClick = false;
            if (!isMoved) {
                // First move
                isMoved = true;
                wrapperWidth = p.wrapper[0].offsetWidth;
                wrapperHeight = p.wrapper[0].offsetHeight;
                p.wrapper.transition(0);
            }

            touchesDiff = p.isH ? touchCurrentX - touchStartX : touchCurrentY - touchStartY;
            percentage = touchesDiff/(p.isH ? wrapperWidth : wrapperHeight);
            currentTranslate = (p.monthsTranslate * inverter + percentage) * 100;

            // Transform wrapper
            p.wrapper.transform('translate3d(' + (p.isH ? currentTranslate : 0) + '%, ' + (p.isH ? 0 : currentTranslate) + '%, 0)');

        }
        function handleTouchEnd (e) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;

            touchEndTime = new Date().getTime();
            if (touchEndTime - touchStartTime < 300) {
                if (Math.abs(touchesDiff) < 10) {
                    p.resetMonth();
                }
                else if (touchesDiff >= 10) {
                    if (app.rtl) p.nextMonth();
                    else p.prevMonth();
                }
                else {
                    if (app.rtl) p.prevMonth();
                    else p.nextMonth();
                }
            }
            else {
                if (percentage <= -0.5) {
                    if (app.rtl) p.prevMonth();
                    else p.nextMonth();
                }
                else if (percentage >= 0.5) {
                    if (app.rtl) p.nextMonth();
                    else p.prevMonth();
                }
                else {
                    p.resetMonth();
                }
            }

            // Allow click
            setTimeout(function () {
                allowItemClick = true;
            }, 100);
        }

        function handleDayClick(e) {
            if (!allowItemClick) return;
            var day = $(e.target).parents('.picker-calendar-day');
            if (day.length === 0 && $(e.target).hasClass('picker-calendar-day')) {
                day = $(e.target);
            }
            if (day.length === 0) return;
            if (day.hasClass('picker-calendar-day-selected') && !(p.params.multiple || p.params.rangePicker)) return;
            if (day.hasClass('picker-calendar-day-disabled')) return;
            if (!p.params.rangePicker) {
                if (day.hasClass('picker-calendar-day-next')) p.nextMonth();
                if (day.hasClass('picker-calendar-day-prev')) p.prevMonth();
            }
            var dateYear = day.attr('data-year');
            var dateMonth = day.attr('data-month');
            var dateDay = day.attr('data-day');
            if (p.params.onDayClick) {
                p.params.onDayClick(p, day[0], dateYear, dateMonth, dateDay);
            }
            p.addValue(new Date(dateYear, dateMonth, dateDay).getTime());
            if (p.params.closeOnSelect) {
                if (p.params.rangePicker && p.value.length === 2 || !p.params.rangePicker) p.close();
            }
        }

        p.container.find('.picker-calendar-prev-month').on('click', p.prevMonth);
        p.container.find('.picker-calendar-next-month').on('click', p.nextMonth);
        p.container.find('.picker-calendar-prev-year').on('click', p.prevYear);
        p.container.find('.picker-calendar-next-year').on('click', p.nextYear);
        p.wrapper.on('click', handleDayClick);
        var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
        if (p.params.touchMove) {
            p.wrapper.on(app.touchEvents.start, handleTouchStart, passiveListener);
            p.wrapper.on(app.touchEvents.move, handleTouchMove);
            p.wrapper.on(app.touchEvents.end, handleTouchEnd, passiveListener);
        }

        p.container[0].f7DestroyCalendarEvents = function () {
            p.container.find('.picker-calendar-prev-month').off('click', p.prevMonth);
            p.container.find('.picker-calendar-next-month').off('click', p.nextMonth);
            p.container.find('.picker-calendar-prev-year').off('click', p.prevYear);
            p.container.find('.picker-calendar-next-year').off('click', p.nextYear);
            p.wrapper.off('click', handleDayClick);
            if (p.params.touchMove) {
                p.wrapper.off(app.touchEvents.start, handleTouchStart, passiveListener);
                p.wrapper.off(app.touchEvents.move, handleTouchMove);
                p.wrapper.off(app.touchEvents.end, handleTouchEnd, passiveListener);
            }
        };


    };
    p.destroyCalendarEvents = function (colContainer) {
        if ('f7DestroyCalendarEvents' in p.container[0]) p.container[0].f7DestroyCalendarEvents();
    };

    // Scan Dates Range
    p.dateInRange = function (dayDate, range) {
        var match = false;
        var i;
        if (!range) return false;
        if ($.isArray(range)) {
            for (i = 0; i < range.length; i ++) {
                if (range[i].from || range[i].to) {
                    if (range[i].from && range[i].to) {
                        if ((dayDate <= new Date(range[i].to).getTime()) && (dayDate >= new Date(range[i].from).getTime())) {
                            match = true;
                        }
                    }
                    else if (range[i].from) {
                        if (dayDate >= new Date(range[i].from).getTime()) {
                            match = true;
                        }
                    }
                    else if (range[i].to) {
                        if (dayDate <= new Date(range[i].to).getTime()) {
                            match = true;
                        }
                    }
                } else if (dayDate === new Date(range[i]).getTime()) {
                    match = true;
                }
            }
        }
        else if (range.from || range.to) {
            if (range.from && range.to) {
                if ((dayDate <= new Date(range.to).getTime()) && (dayDate >= new Date(range.from).getTime())) {
                    match = true;
                }
            }
            else if (range.from) {
                if (dayDate >= new Date(range.from).getTime()) {
                    match = true;
                }
            }
            else if (range.to) {
                if (dayDate <= new Date(range.to).getTime()) {
                    match = true;
                }
            }
        }
        else if (typeof range === 'function') {
            match = range(new Date(dayDate));
        }
        return match;
    };
    // Calendar Methods
    p.daysInMonth = function (date) {
        var d = new Date(date);
        return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    };
    p.monthHTML = function (date, offset) {
        date = new Date(date);
        var year = date.getFullYear(),
            month = date.getMonth(),
            day = date.getDate();
        if (offset === 'next') {
            if (month === 11) date = new Date(year + 1, 0);
            else date = new Date(year, month + 1, 1);
        }
        if (offset === 'prev') {
            if (month === 0) date = new Date(year - 1, 11);
            else date = new Date(year, month - 1, 1);
        }
        if (offset === 'next' || offset === 'prev') {
            month = date.getMonth();
            year = date.getFullYear();
        }
        var daysInPrevMonth = p.daysInMonth(new Date(date.getFullYear(), date.getMonth()).getTime() - 10 * 24 * 60 * 60 * 1000),
            daysInMonth = p.daysInMonth(date),
            firstDayOfMonthIndex = new Date(date.getFullYear(), date.getMonth()).getDay();
        if (firstDayOfMonthIndex === 0) firstDayOfMonthIndex = 7;

        var dayDate, currentValues = [], i, j, k,
            rows = 6, cols = 7,
            monthHTML = '',
            dayIndex = 0 + (p.params.firstDay - 1),
            today = new Date().setHours(0,0,0,0),
            minDate = p.params.minDate ? new Date(p.params.minDate).getTime() : null,
            maxDate = p.params.maxDate ? new Date(p.params.maxDate).getTime() : null,
            disabled,
            hasEvent;

        if (p.value && p.value.length) {
            for (i = 0; i < p.value.length; i++) {
                currentValues.push(new Date(p.value[i]).setHours(0,0,0,0));
            }
        }

        for (i = 1; i <= rows; i++) {
            var rowHTML = '';
            var row = i;
            for (j = 1; j <= cols; j++) {
                var col = j;
                dayIndex ++;
                var dayNumber = dayIndex - firstDayOfMonthIndex;
                var weekDayIndex = (col - 1 + p.params.firstDay > 6) ? (col - 1 - 7 + p.params.firstDay) : (col - 1 + p.params.firstDay);
                var addClass = '';
                if (dayNumber < 0) {
                    dayNumber = daysInPrevMonth + dayNumber + 1;
                    addClass += ' picker-calendar-day-prev';
                    dayDate = new Date(month - 1 < 0 ? year - 1 : year, month - 1 < 0 ? 11 : month - 1, dayNumber).getTime();
                }
                else {
                    dayNumber = dayNumber + 1;
                    if (dayNumber > daysInMonth) {
                        dayNumber = dayNumber - daysInMonth;
                        addClass += ' picker-calendar-day-next';
                        dayDate = new Date(month + 1 > 11 ? year + 1 : year, month + 1 > 11 ? 0 : month + 1, dayNumber).getTime();
                    }
                    else {
                        dayDate = new Date(year, month, dayNumber).getTime();
                    }
                }
                // Today
                if (dayDate === today) addClass += ' picker-calendar-day-today';
                // Selected
                if (p.params.rangePicker && currentValues.length === 2) {
                    if (dayDate >= currentValues[0] && dayDate <= currentValues[1]) addClass += ' picker-calendar-day-selected';
                }
                else {
                    if (currentValues.indexOf(dayDate) >= 0) addClass += ' picker-calendar-day-selected';
                }
                // Weekend
                if (p.params.weekendDays.indexOf(weekDayIndex) >= 0) {
                    addClass += ' picker-calendar-day-weekend';
                }
                // Has Events
                hasEvent = false;
                if (p.params.events) {
                    if (p.dateInRange(dayDate, p.params.events)) {
                        hasEvent = true;
                    }
                }
                if (hasEvent) {
                    addClass += ' picker-calendar-day-has-events';
                }
                // Custom Ranges
                if (p.params.rangesClasses) {
                    for (k = 0; k < p.params.rangesClasses.length; k++) {
                        if (p.dateInRange(dayDate, p.params.rangesClasses[k].range)) {
                            addClass += ' ' + p.params.rangesClasses[k].cssClass;
                        }
                    }
                }
                // Disabled
                disabled = false;
                if ((minDate && dayDate < minDate) || (maxDate && dayDate > maxDate)) {
                    disabled = true;
                }
                if (p.params.disabled) {
                    if (p.dateInRange(dayDate, p.params.disabled)) {
                        disabled = true;
                    }
                }
                if (disabled) {
                    addClass += ' picker-calendar-day-disabled';
                }


                dayDate = new Date(dayDate);
                var dayYear = dayDate.getFullYear();
                var dayMonth = dayDate.getMonth();
                rowHTML += '<div data-year="' + dayYear + '" data-month="' + dayMonth + '" data-day="' + dayNumber + '" class="picker-calendar-day' + (addClass) + '" data-date="' + (dayYear + '-' + dayMonth + '-' + dayNumber) + '"><span>'+dayNumber+'</span></div>';
            }
            monthHTML += '<div class="picker-calendar-row">' + rowHTML + '</div>';
        }
        monthHTML = '<div class="picker-calendar-month" data-year="' + year + '" data-month="' + month + '">' + monthHTML + '</div>';
        return monthHTML;
    };
    p.animating = false;
    p.updateCurrentMonthYear = function (dir) {
        if (typeof dir === 'undefined') {
            p.currentMonth = parseInt(p.months.eq(1).attr('data-month'), 10);
            p.currentYear = parseInt(p.months.eq(1).attr('data-year'), 10);
        }
        else {
            p.currentMonth = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-month'), 10);
            p.currentYear = parseInt(p.months.eq(dir === 'next' ? (p.months.length - 1) : 0).attr('data-year'), 10);
        }
        p.container.find('.current-month-value').text(p.params.monthNames[p.currentMonth]);
        p.container.find('.current-year-value').text(p.currentYear);

    };
    p.onMonthChangeStart = function (dir) {
        p.updateCurrentMonthYear(dir);
        p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
        var currentIndex = dir === 'next' ? p.months.length - 1 : 0;

        p.months.eq(currentIndex).addClass('picker-calendar-month-current');
        p.months.eq(dir === 'next' ? currentIndex - 1 : currentIndex + 1).addClass(dir === 'next' ? 'picker-calendar-month-prev' : 'picker-calendar-month-next');

        if (p.params.onMonthYearChangeStart) {
            p.params.onMonthYearChangeStart(p, p.currentYear, p.currentMonth);
        }
    };
    p.onMonthChangeEnd = function (dir, rebuildBoth) {
        p.animating = false;
        var nextMonthHTML, prevMonthHTML, newMonthHTML;
        p.wrapper.find('.picker-calendar-month:not(.picker-calendar-month-prev):not(.picker-calendar-month-current):not(.picker-calendar-month-next)').remove();

        if (typeof dir === 'undefined') {
            dir = 'next';
            rebuildBoth = true;
        }
        if (!rebuildBoth) {
            newMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), dir);
        }
        else {
            p.wrapper.find('.picker-calendar-month-next, .picker-calendar-month-prev').remove();
            prevMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'prev');
            nextMonthHTML = p.monthHTML(new Date(p.currentYear, p.currentMonth), 'next');
        }
        if (dir === 'next' || rebuildBoth) {
            p.wrapper.append(newMonthHTML || nextMonthHTML);
        }
        if (dir === 'prev' || rebuildBoth) {
            p.wrapper.prepend(newMonthHTML || prevMonthHTML);
        }
        p.months = p.wrapper.find('.picker-calendar-month');
        p.setMonthsTranslate(p.monthsTranslate);
        if (p.params.onMonthAdd) {
            p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
        }
        if (p.params.onMonthYearChangeEnd) {
            p.params.onMonthYearChangeEnd(p, p.currentYear, p.currentMonth);
        }
    };
    p.setMonthsTranslate = function (translate) {
        translate = translate || p.monthsTranslate || 0;
        if (typeof p.monthsTranslate === 'undefined') p.monthsTranslate = translate;
        p.months.removeClass('picker-calendar-month-current picker-calendar-month-prev picker-calendar-month-next');
        var prevMonthTranslate = -(translate + 1) * 100 * inverter;
        var currentMonthTranslate = -translate * 100 * inverter;
        var nextMonthTranslate = -(translate - 1) * 100 * inverter;
        p.months.eq(0).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
        p.months.eq(1).transform('translate3d(' + (p.isH ? currentMonthTranslate : 0) + '%, ' + (p.isH ? 0 : currentMonthTranslate) + '%, 0)').addClass('picker-calendar-month-current');
        p.months.eq(2).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
    };
    p.nextMonth = function (transition) {
        if (typeof transition === 'undefined' || typeof transition === 'object') {
            transition = '';
            if (!p.params.animate) transition = 0;
        }
        var nextMonth = parseInt(p.months.eq(p.months.length - 1).attr('data-month'), 10);
        var nextYear = parseInt(p.months.eq(p.months.length - 1).attr('data-year'), 10);
        var nextDate = new Date(nextYear, nextMonth);
        var nextDateTime = nextDate.getTime();
        var transitionEndCallback = p.animating ? false : true;
        if (p.params.maxDate) {
            if (nextDateTime > new Date(p.params.maxDate).getTime()) {
                return p.resetMonth();
            }
        }
        p.monthsTranslate --;
        if (nextMonth === p.currentMonth) {
            var nextMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
            var nextMonthHTML = $(p.monthHTML(nextDateTime, 'next')).transform('translate3d(' + (p.isH ? nextMonthTranslate : 0) + '%, ' + (p.isH ? 0 : nextMonthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
            p.wrapper.append(nextMonthHTML[0]);
            p.months = p.wrapper.find('.picker-calendar-month');
            if (p.params.onMonthAdd) {
                p.params.onMonthAdd(p, p.months.eq(p.months.length - 1)[0]);
            }
        }
        p.animating = true;
        p.onMonthChangeStart('next');
        var translate = (p.monthsTranslate * 100) * inverter;

        p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
        if (transitionEndCallback) {
            p.wrapper.transitionEnd(function () {
                p.onMonthChangeEnd('next');
            });
        }
        if (!p.params.animate) {
            p.onMonthChangeEnd('next');
        }
    };
    p.prevMonth = function (transition) {
        if (typeof transition === 'undefined' || typeof transition === 'object') {
            transition = '';
            if (!p.params.animate) transition = 0;
        }
        var prevMonth = parseInt(p.months.eq(0).attr('data-month'), 10);
        var prevYear = parseInt(p.months.eq(0).attr('data-year'), 10);
        var prevDate = new Date(prevYear, prevMonth + 1, -1);
        var prevDateTime = prevDate.getTime();
        var transitionEndCallback = p.animating ? false : true;
        if (p.params.minDate) {
            if (prevDateTime < new Date(p.params.minDate).getTime()) {
                return p.resetMonth();
            }
        }
        p.monthsTranslate ++;
        if (prevMonth === p.currentMonth) {
            var prevMonthTranslate = -(p.monthsTranslate) * 100 * inverter;
            var prevMonthHTML = $(p.monthHTML(prevDateTime, 'prev')).transform('translate3d(' + (p.isH ? prevMonthTranslate : 0) + '%, ' + (p.isH ? 0 : prevMonthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
            p.wrapper.prepend(prevMonthHTML[0]);
            p.months = p.wrapper.find('.picker-calendar-month');
            if (p.params.onMonthAdd) {
                p.params.onMonthAdd(p, p.months.eq(0)[0]);
            }
        }
        p.animating = true;
        p.onMonthChangeStart('prev');
        var translate = (p.monthsTranslate * 100) * inverter;
        p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
        if (transitionEndCallback) {
            p.wrapper.transitionEnd(function () {
                p.onMonthChangeEnd('prev');
            });
        }
        if (!p.params.animate) {
            p.onMonthChangeEnd('prev');
        }
    };
    p.resetMonth = function (transition) {
        if (typeof transition === 'undefined') transition = '';
        var translate = (p.monthsTranslate * 100) * inverter;
        p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? translate : 0) + '%, ' + (p.isH ? 0 : translate) + '%, 0)');
    };
    p.setYearMonth = function (year, month, transition) {
        if (typeof year === 'undefined') year = p.currentYear;
        if (typeof month === 'undefined') month = p.currentMonth;
        if (typeof transition === 'undefined' || typeof transition === 'object') {
            transition = '';
            if (!p.params.animate) transition = 0;
        }
        var targetDate;
        if (year < p.currentYear) {
            targetDate = new Date(year, month + 1, -1).getTime();
        }
        else {
            targetDate = new Date(year, month).getTime();
        }
        if (p.params.maxDate && targetDate > new Date(p.params.maxDate).getTime()) {
            return false;
        }
        if (p.params.minDate && targetDate < new Date(p.params.minDate).getTime()) {
            return false;
        }
        var currentDate = new Date(p.currentYear, p.currentMonth).getTime();
        var dir = targetDate > currentDate ? 'next' : 'prev';
        var newMonthHTML = p.monthHTML(new Date(year, month));
        p.monthsTranslate = p.monthsTranslate || 0;
        var prevTranslate = p.monthsTranslate;
        var monthTranslate, wrapperTranslate;
        var transitionEndCallback = p.animating ? false : true;
        if (targetDate > currentDate) {
            // To next
            p.monthsTranslate --;
            if (!p.animating) p.months.eq(p.months.length - 1).remove();
            p.wrapper.append(newMonthHTML);
            p.months = p.wrapper.find('.picker-calendar-month');
            monthTranslate = -(prevTranslate - 1) * 100 * inverter;
            p.months.eq(p.months.length - 1).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-next');
        }
        else {
            // To prev
            p.monthsTranslate ++;
            if (!p.animating) p.months.eq(0).remove();
            p.wrapper.prepend(newMonthHTML);
            p.months = p.wrapper.find('.picker-calendar-month');
            monthTranslate = -(prevTranslate + 1) * 100 * inverter;
            p.months.eq(0).transform('translate3d(' + (p.isH ? monthTranslate : 0) + '%, ' + (p.isH ? 0 : monthTranslate) + '%, 0)').addClass('picker-calendar-month-prev');
        }
        if (p.params.onMonthAdd) {
            p.params.onMonthAdd(p, dir === 'next' ? p.months.eq(p.months.length - 1)[0] : p.months.eq(0)[0]);
        }
        p.animating = true;
        p.onMonthChangeStart(dir);
        wrapperTranslate = (p.monthsTranslate * 100) * inverter;
        p.wrapper.transition(transition).transform('translate3d(' + (p.isH ? wrapperTranslate : 0) + '%, ' + (p.isH ? 0 : wrapperTranslate) + '%, 0)');
        if (transitionEndCallback) {
           p.wrapper.transitionEnd(function () {
                p.onMonthChangeEnd(dir, true);
            });
        }
        if (!p.params.animate) {
            p.onMonthChangeEnd(dir);
        }
    };
    p.nextYear = function () {
        p.setYearMonth(p.currentYear + 1);
    };
    p.prevYear = function () {
        p.setYearMonth(p.currentYear - 1);
    };


    // HTML Layout
    p.layout = function () {
        var pickerHTML = '';
        var pickerClass = '';
        var i;

        var layoutDate = p.value && p.value.length ? p.value[0] : new Date().setHours(0,0,0,0);
        var prevMonthHTML = p.monthHTML(layoutDate, 'prev');
        var currentMonthHTML = p.monthHTML(layoutDate);
        var nextMonthHTML = p.monthHTML(layoutDate, 'next');
        var monthsHTML = '<div class="picker-calendar-months"><div class="picker-calendar-months-wrapper">' + (prevMonthHTML + currentMonthHTML + nextMonthHTML) + '</div></div>';
        // Week days header
        var weekHeaderHTML = '';
        if (p.params.weekHeader) {
            for (i = 0; i < 7; i++) {
                var weekDayIndex = (i + p.params.firstDay > 6) ? (i - 7 + p.params.firstDay) : (i + p.params.firstDay);
                var dayName = p.params.dayNamesShort[weekDayIndex];
                weekHeaderHTML += '<div class="picker-calendar-week-day ' + ((p.params.weekendDays.indexOf(weekDayIndex) >= 0) ? 'picker-calendar-week-day-weekend' : '') + '"> ' + dayName + '</div>';

            }
            weekHeaderHTML = '<div class="picker-calendar-week-days">' + weekHeaderHTML + '</div>';
        }
        pickerClass = 'picker-modal picker-calendar' +
                    (p.params.rangePicker ? ' picker-calendar-range' : '') +
                    (p.params.cssClass ? ' ' + p.params.cssClass : '');
        var toolbarHTML = p.params.toolbar ? p.params.toolbarTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';
        if (p.params.toolbar) {
            toolbarHTML = p.params.toolbarTemplate
                .replace(/{{closeText}}/g, p.params.toolbarCloseText)
                .replace(/{{monthPicker}}/g, (p.params.monthPicker ? p.params.monthPickerTemplate : ''))
                .replace(/{{yearPicker}}/g, (p.params.yearPicker ? p.params.yearPickerTemplate : ''));
        }
        var headerHTML = p.params.header ? p.params.headerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText).replace(/{{placeholder}}/g, p.params.headerPlaceholder) : '';
        var footerHTML = p.params.footer ? p.params.footerTemplate.replace(/{{closeText}}/g, p.params.toolbarCloseText) : '';

        pickerHTML =
            '<div class="' + (pickerClass) + '">' +
                headerHTML +
                footerHTML +
                toolbarHTML +
                '<div class="picker-modal-inner">' +
                    weekHeaderHTML +
                    monthsHTML +
                '</div>' +
            '</div>';


        p.pickerHTML = pickerHTML;
    };

    // Input Events
    function openOnInput(e) {
        e.preventDefault();
        if (p.opened) return;
        p.open();
        if (p.params.scrollToInput && !isPopover() && !app.params.material) {
            var pageContent = p.input.parents('.page-content');
            if (pageContent.length === 0) return;

            var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                newPaddingBottom;

            var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
            if (inputTop > pageHeight) {
                var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                if (scrollTop + pageHeight > pageScrollHeight) {
                    newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                    if (pageHeight === pageScrollHeight) {
                        newPaddingBottom = p.container.height();
                    }
                    pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                }
                pageContent.scrollTop(scrollTop, 300);
            }
        }
    }
    function closeOnHTMLClick(e) {
        if (inPopover()) return;
        if (p.input && p.input.length > 0) {
            if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
        }
        else {
            if ($(e.target).parents('.picker-modal').length === 0) p.close();
        }
    }

    if (p.params.input) {
        p.input = $(p.params.input);
        if (p.input.length > 0) {
            if (p.params.inputReadOnly) p.input.prop('readOnly', true);
            if (!p.inline) {
                p.input.on('click', openOnInput);
            }
            if (p.params.inputReadOnly) {
                p.input.on('focus mousedown', function (e) {
                    e.preventDefault();
                });
            }
        }

    }

    if (!p.inline && p.params.closeByOutsideClick) $('html').on('click', closeOnHTMLClick);

    // Open
    function onPickerClose() {
        p.opened = false;
        if (p.input && p.input.length > 0) {
            p.input.parents('.page-content').css({'padding-bottom': ''});
            if (app.params.material) p.input.trigger('blur');
        }
        if (p.params.onClose) p.params.onClose(p);

        // Destroy events
        p.destroyCalendarEvents();
    }

    p.opened = false;
    p.open = function () {
        var toPopover = isPopover();
        var updateValue = false;
        if (!p.opened) {
            // Set date value
            if (!p.value) {
                if (p.params.value) {
                    p.value = p.params.value;
                    updateValue = true;
                }
            }

            // Layout
            p.layout();

            // Append
            if (toPopover) {
                p.pickerHTML = '<div class="popover popover-picker-calendar"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                p.popover = app.popover(p.pickerHTML, p.params.input, true);
                p.container = $(p.popover).find('.picker-modal');
                $(p.popover).on('popover:close', function () {
                    onPickerClose();
                });
            }
            else if (p.inline) {
                p.container = $(p.pickerHTML);
                p.container.addClass('picker-modal-inline');
                $(p.params.container).append(p.container);
            }
            else {
                p.container = $(app.pickerModal(p.pickerHTML));
                $(p.container)
                .on('picker:close', function () {
                    onPickerClose();
                });
            }

            // Store calendar instance
            p.container[0].f7Calendar = p;
            p.wrapper = p.container.find('.picker-calendar-months-wrapper');

            // Months
            p.months = p.wrapper.find('.picker-calendar-month');

            // Update current month and year
            p.updateCurrentMonthYear();

            // Set initial translate
            p.monthsTranslate = 0;
            p.setMonthsTranslate();

            // Init events
            p.initCalendarEvents();

            // Update input value
            if (updateValue) p.updateValue();
            else if (app.params.material && p.value) p.updateValue(true);

            // Material Focus
            if (p.input && p.input.length > 0 && app.params.material) {
                p.input.trigger('focus');
            }

        }

        // Set flag
        p.opened = true;
        p.initialized = true;
        if (p.params.onMonthAdd) {
            p.months.each(function () {
                p.params.onMonthAdd(p, this);
            });
        }
        if (p.params.onOpen) p.params.onOpen(p);
    };

    // Close
    p.close = function () {
        if (!p.opened || p.inline) return;
        if (inPopover()) {
            app.closeModal(p.popover);
            return;
        }
        else {
            app.closeModal(p.container);
            return;
        }
    };

    // Destroy
    p.destroy = function () {
        p.close();
        if (p.params.input && p.input.length > 0) {
            p.input.off('click focus', openOnInput);
        }
        $('html').off('click', closeOnHTMLClick);
    };

    if (p.inline) {
        p.open();
    }
    else {
        if (!p.initialized && p.params.value) p.setValue(p.params.value);
    }

    return p;
};
app.calendar = function (params) {
    return new Calendar(params);
};
