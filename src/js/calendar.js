/*======================================================
************   Calendar   ************
======================================================*/
var Calendar = function (params) {
    var c = this;
    var defaults = {
        updateValuesOnMomentum: false,
        updateValuesOnTouchmove: true,
        rotateEffect: false,
        shrinkView: false,
        scrollToInput: true,
        momentumRatio: 7,
        freeMode: false,
        toolbarCloseText: 'Done',
        toolbarHTML: 
            '<div class="toolbar">' +
                '<div class="left"></div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-calendar">{{closeText}}</a>' +
                '</div>' +
            '</div>'
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    c.params = params;
    
    c.initialized = false;
    
    var isInline = c.params.container ? true : false;

    // Should be converted to popover
    function isPopover() {
        var toPopover = false;
        if (!isInline && c.params.input) {
            if (app.device.ios) {
                toPopover = app.device.ipad ? true : false;
            }
            else {
                if ($(window).width() >= 768) toPopover = true;
            }
        } 
        return toPopover; 
    }
    function inPopover() {
        if (c.opened && c.container && c.container.length > 0 && c.container.parents('.popover').length > 0) return true;
        else return false;
    }

    

    c.layout = function () {
        var calendarHTML;
        c.calendarHTML = calendarHTML;    
    };

    // Input Events
    function openOnInput(e) {
        e.preventDefault();
        c.open();
        if (c.params.scrollToInput && !isPopover()) {
            var pageContent = c.input.parents('.page-content');
            if (pageContent.length === 0) return;
            var pageHeight = pageContent.height() - 44 - c.container.height();
            if (c.params.shrinkView) pageHeight = pageHeight - 44;
            var inputTop = c.input.offset().top - 44;
            if (inputTop > pageHeight) {
                pageContent.scrollTop(pageContent.scrollTop() + inputTop - pageHeight + c.input[0].offsetHeight, 300);
            }
        }
    }
    function closeOnHTMLClick(e) {
        if (inPopover()) return;
        if (c.input && c.input.length > 0) {
            if (e.target !== c.input[0] && $(e.target).parents('.calendar').length === 0) c.close();
        }
        else {
            if ($(e.target).parents('.calendar').length === 0) c.close();   
        }
    }

    if (c.params.input) {
        c.input = $(c.params.input);
        c.input.prop('readOnly', true);
    }

    if (c.params.input && !isInline) {
        c.input.on('click', openOnInput);
        c.input.on('focus mousedown', function (e) {
            e.preventDefault();
        });
    }
    if (!isInline) $('html').on('click', closeOnHTMLClick);

    // Open
    c.opened = false;
    c.open = function () {
        var toPopover = isPopover();

        if (!c.opened) {
            // Layout
            c.layout();

            // Append
            if (toPopover) {
                c.calendarHTML = '<div class="popover popover-calendar"><div class="popover-inner">' + c.calendarHTML + '</div></div>';
                c.popover = app.popover(c.calendarHTML, c.params.input, true);
                c.container = $(c.popover).find('.picker');
                $(c.popover).on('close', function () {
                    c.opened = false;
                    if (c.params.onClose) c.params.onClose(c);
                });
            }
            else {
                c.container = $(c.calendarHTML);
                if (isInline) {
                    c.container.addClass('calendar-inline');
                    $(c.params.container).append(c.container);
                }
                else {
                    $('body').append(c.container);
                    c.container.show();
                }   
            }

            // Store picker instance
            c.container[0].f7Calendar = c;

            // Init Events
            

            // Set value
            if (!c.initialized) {
                if (c.params.value) {
                    // p.setValue(c.params.value, 0);
                }
            }
            else {
                if (c.value) {
                    // p.setValue(p.value, 0);
                }
            }
        }

        if (!isInline && !toPopover) {
            // In
            c.container.removeClass('calendar-out').addClass('calendar-in');

            // Add class to body
            $('body').addClass('with-calendar-opened');
            if (c.params.shrinkView) $('body').addClass('with-calendar-shrink-view');
        }
        // Set flag
        c.opened = true;
        c.initialized = true;

        if (c.params.onOpen) c.params.onOpen(c);
    };

    // Close
    c.close = function () {
        if (!c.opened || isInline) return;
        if (inPopover()) {
            app.closeModal('.popover-calendar.modal-in');
            return;
        }
        $('body').removeClass('with-calendar-opened');
        if (c.params.shrinkView) $('body').removeClass('with-calendar-shrink-view');
        $('body').addClass('calendar-closing');
        if (c.params.onClose) c.params.onClose(c);
        c.container.addClass('calendar-out').removeClass('calendar-in').transitionEnd(function () {
            $('body').removeClass('calendar-closing');
            if (c.container.hasClass('calendar-out')) {
                c.opened = false;
                c.container.remove();
            }
        });
    };

    // Destroy
    c.destroy = function () {
        c.close();
        if (c.params.input) {
            c.input.off('click focus', openOnInput);
        }
        $('html').off('click', closeOnHTMLClick);
    };

    if (isInline) {
        c.open();
    }

    return c;
};
app.calendar = function (params) {
    return new Picker(params);
};
app.closeCalendar = function (calendar) {
    calendar = $(calendar);
    if (calendar.length === 0) calendar = $('.calendar.calendar-in');
    if (calendar.length === 0) return;
    calendar.each(function () {
        var pickerInstance = this.f7Picker;
        if (pickerInstance) pickerInstance.close();
    });
};