/*======================================================
************   Picker   ************
======================================================*/
var Picker = function (params) {
    var p = this;
    var defaults = {
        updateItemsDuringScroll: true,
        rotateEffect: true,
        shrinkView: true,
        pickerbarHTML: 
            '<div class="toolbar pickerbar">' +
                '<div class="left"></div>' +
                '<div class="right">' +
                    '<a href="#" class="link close-picker">Done</a>' +
                '</div>' +
            '</div>'
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    p.params = params;
    p.cols = p.params.cols;
    p.initialized = false;
    
    var isInline = p.params.container ? true : false;

    // Should be converted to popover
    function isPopover() {
        var toPopover = false;
        if (!isInline && p.params.input) {
            if (app.device.ios) {
                toPopover = app.device.ipad ? true : false;
            }
            else {
                if ($(window).width() >= 768) toPopover = true;
            }
        } 
        return toPopover; 
    }
    
        
        

    // Value
    p.setValue = function (arrValues, transition) {
        for (var i = 0; i < arrValues.length; i++) {
            if (p.cols[i]) p.cols[i].setValue(arrValues[i], transition);
        }
    };
    p.updateValue = function () {
        var newValue = [];
        var newTextValue = [];
        for (var i = 0; i < p.cols.length; i++) {
            newValue.push(p.cols[i].value);
            newTextValue.push(p.cols[i].textValue);
        }
        if (newValue.indexOf(undefined) >= 0) {
            return;
        }
        p.value = newValue;
        p.textValue = newTextValue;
        if (p.params.onChange) {
            p.params.onChange(p, p.value, p.textValue);
        }
        if (p.input && p.input.length > 0) {
            $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.textValue) : p.value.join(' '));
        }
    };
    p.initPickerCol = function (colElement, updateItems) {
        var colContainer = $(colElement);
        var colIndex = colContainer.index();
        var col = p.cols[colIndex];
        col.container = colContainer;
        col.wrapper = col.container.find('.picker-items-col-wrapper');
        col.items = col.wrapper.find('.picker-item');
        
        var i, j;
        var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;

        col.calcSize = function () {
            col.height = col.container[0].offsetHeight;
            wrapperHeight = col.wrapper[0].offsetHeight;
            itemHeight = col.items[0].offsetHeight;
            itemsHeight = itemHeight * col.items.length;
            minTranslate = col.height / 2 - itemsHeight + itemHeight / 2;
            maxTranslate = col.height / 2 - itemHeight / 2;    
        };
        col.calcSize();
        
        col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);

        var isTouched, isMoved, touchStartY, touchStartX, touchCurrentX, touchCurrentY, touchStartTime, isScrolling, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;

        var activeIndex = 0;
        var animationFrameId;

        // Set Value Function
        col.setValue = function (newValue, transition, valueCallbacks) {
            if (typeof transition === 'undefined') transition = '';
            var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
            if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                return;
            }
            var newTranslate = -newActiveIndex * itemHeight + maxTranslate;
            // Update wrapper
            col.wrapper.transition(transition);
            col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
            col.wrapper.transitionEnd(function(){
                $.cancelAnimationFrame(animationFrameId);
            });
            // Update items
            col.updateItems(newActiveIndex, newTranslate, transition, valueCallbacks);

            // Watch items
            if (p.params.updateItemsDuringScroll && col.activeIndex !== newActiveIndex) {
                updateDuringScroll();
            }
        };

        col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
            if (typeof translate === 'undefined') {
                translate = $.getTranslate(col.wrapper[0], 'y');
            }
            if (typeof valueCallbacks === 'undefined') valueCallbacks = true;
            if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
            var previousActiveIndex = col.activeIndex;
            col.activeIndex = activeIndex;
            col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

            col.items.transition(transition);
            var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
            var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
            var nextItems = selectedItem.nextAll().addClass('picker-after-selected');

            if (valueCallbacks) {
                // Update values
                col.value = selectedItem.attr('data-picker-value');
                col.textValue = col.textValues ? col.textValues[activeIndex] : col.value;
                // On change callback
                if (previousActiveIndex !== activeIndex) {
                    if (col.onChange) {
                        col.onChange(p, col.value, col.textValue);
                    }
                    p.updateValue();
                }
            }
                
            // Set 3D rotate effect
            if (!p.params.rotateEffect) {
                return;
            }
            var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
            
            col.items.each(function () {
                var item = $(this);
                var itemOffsetTop = item.index() * itemHeight;
                var translateOffset = maxTranslate - translate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / itemHeight;
                
                var angle = (-20*percentage);
                if (angle > 90) angle = 90;
                if (angle < -90) angle = -90;
                var tz = (Math.cos( angle*2*Math.PI/360 ) * 500 - 500);
                item.transform('translate3d(0, 0px,' + tz + 'px) rotateX(' + angle + 'deg)');
            });
        };

        function updateDuringScroll() {
            animationFrameId = $.requestAnimationFrame(function () {
                col.updateItems(undefined, undefined, 0);
                updateDuringScroll();
            });
        }

        // Update items on init
        if (updateItems) col.updateItems(0, maxTranslate, 0);

        var allowItemClick = true;
        function handleTouchStart (e) {
            if (isMoved || isTouched) return;
            e.preventDefault();
            isTouched = true;
            touchStartX = touchCurrentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            touchStartY = touchCurrentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            isScrolling = undefined;
            $.cancelAnimationFrame(animationFrameId);
            allowItemClick = true;
            startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
        }
        function handleTouchMove (e) {
            if (!isTouched) return;
            e.preventDefault();
            allowItemClick = false;
            touchCurrentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            touchCurrentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            
            if (!isMoved) {
                // First move
                isMoved = true;
                startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                col.wrapper.transition(0);
            }
            e.preventDefault();

            var diff = touchCurrentY - touchStartY;
            currentTranslate = startTranslate + diff;
            returnTo = undefined;

            // Normalize translate
            if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                returnTo = 'min';
            }
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                returnTo = 'max';
            }
            // Transform wrapper
            col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

            // Update items
            col.updateItems(undefined, currentTranslate, 0);
            
            // Calc velocity
            velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
            velocityTime = (new Date()).getTime();
            prevTranslate = currentTranslate;
        }
        function handleTouchEnd (e) {
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;

            col.wrapper.transition('');
            if (returnTo) {
                if (returnTo === 'min') {
                    col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                }
                else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
            }
            var touchEndTime = new Date();
            var velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
            var newTranslate = currentTranslate + velocityTranslate * 5;
            newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);
            // Active Index
            var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

            // Normalize translate
            newTranslate = -activeIndex * itemHeight + maxTranslate;

            // Transform wrapper
            col.wrapper.transform('translate3d(0,' + (newTranslate) + 'px,0)');
            col.wrapper.transitionEnd(function(){
                $.cancelAnimationFrame(animationFrameId);
            });

            // Update items
            col.updateItems(activeIndex, newTranslate, '');

            // Watch items
            if (p.params.updateItemsDuringScroll) {
                updateDuringScroll();
            }

            // Allow click
            setTimeout(function () {
                allowItemClick = true;
            }, 100);
        }

        function handleClick(e) {
            /*jshint validthis:true */
            var value = $(this).attr('data-picker-value');
            col.setValue(value);
        }

        col.container.on(app.touchEvents.start, handleTouchStart);
        col.container.on(app.touchEvents.move, handleTouchMove);
        col.container.on(app.touchEvents.end, handleTouchEnd);
        col.items.on('click', handleClick);

        col.container[0].f7DestroyPickerCol = function () {
            col.container.off(app.touchEvents.start, handleTouchStart);
            col.container.off(app.touchEvents.move, handleTouchMove);
            col.container.off(app.touchEvents.end, handleTouchEnd);
            col.items.off('click', handleClick);
        };

    };
    p.destroyPickerCol = function (colContainer) {
        colContainer = $(colContainer);
        if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
    };

    p.layout = function () {
        var colsHTML = '';
        for (var i = 0; i < p.cols.length; i++) {
            var columnItemsHTML = '';
            var col = p.cols[i];
            for (var j = 0; j < col.values.length; j++) {
                columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.textValues ? col.textValues[j] : col.values[j]) + '</div>';
            }
            colsHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';

        }
        var pickerHTML =
            '<div class="picker ' + (p.params.cssClass || '') + '">' +
                p.params.pickerbarHTML +
                '<div class="picker-items">' +
                    colsHTML +
                    '<div class="picker-center-highlight"></div>' +
                '</div>' +
            '</div>';
        p.pickerHTML = pickerHTML;    
    };

    // Input Events
    function openOnInput(e) {
        e.preventDefault();
        p.open();
    }
    function closeOnHTMLClick(e) {
        if (isPopover()) return;
        if (p.input && p.input.length > 0) {
            if (e.target !== p.input[0] && $(e.target).parents('.picker').length === 0) p.close();
        }
        else {
            if ($(e.target).parents('.picker').length === 0) p.close();   
        }
    }

    if (p.params.input) {
        p.input = $(p.params.input);
        p.input.prop('readOnly', true);
    }

    if (p.params.input && !isInline) {
        p.input.on('click', openOnInput);
    }
    if (!isInline) $('html').on('click', closeOnHTMLClick);

    // Resize cols
    function resizeCols() {
        if (!p.opened) return;
        for (var i = 0; i < p.cols.length; i++) {
            p.cols[i].calcSize();
            p.cols[i].setValue(p.cols[i].value, 0, false);
        }
    }
    $(window).on('resize', resizeCols);

    // Open
    p.opened = false;
    p.open = function () {
        var toPopover = isPopover();

        if (!p.opened) {
            // Layout
            p.layout();

            // Append
            if (toPopover) {
                p.pickerHTML = '<div class="popover popover-picker"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                p.popover = app.popover(p.pickerHTML, p.params.input, true);
                p.container = $(p.popover).find('.picker');
                $(p.popover).on('close', function () {
                    p.opened = false;
                    p.container.find('.picker-items-col').each(function () {
                        p.destroyPickerCol(this);
                    });
                });
            }
            else {
                p.container = $(p.pickerHTML);
                if (isInline) {
                    p.container.addClass('picker-inline');
                    $(p.params.container).append(p.container);
                }
                else {
                    $('body').append(p.container);
                    p.container.show();
                }   
            }

            // Store picker instance
            p.container[0].f7Picker = p;

            // Init Events
            p.container.find('.picker-items-col').each(function () {
                var updateItems = true;
                if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                p.initPickerCol(this, updateItems);
            });

            // Set value
            if (!p.initialized) {
                if (p.params.value) {
                    p.setValue(p.params.value, 0);
                }
            }
            else {
                if (p.value) p.setValue(p.value, 0);
            }
        }

        if (!isInline && !toPopover) {
            // In
            p.container.removeClass('picker-out').addClass('picker-in');

            // Add class to body
            $('body').addClass('with-picker-opened');
            if (p.params.shrinkView) $('body').addClass('with-picker-shrink-view');
        }
        // Set flag
        p.opened = true;
        p.initialized = true;
    };

    // Close
    p.close = function () {
        if (!p.opened || isInline) return;
        if (isPopover()) {
            app.closeModal('.popover-picker.modal-in');
            return;
        }
        $('body').removeClass('with-picker-opened');
        if (p.params.shrinkView) $('body').removeClass('with-picker-shrink-view');
        $('body').addClass('picker-closing');
        p.container.addClass('picker-out').removeClass('picker-in').transitionEnd(function () {
            $('body').removeClass('picker-closing');
            if (p.container.hasClass('picker-out')) {
                p.opened = false;
                p.container.remove();
                p.container.find('.picker-items-col').each(function () {
                    p.destroyPickerCol(this);
                });
            }
        });
    };

    // Destroy
    p.destroy = function () {
        p.close();
        if (p.params.input) {
            p.input.off('click focus', openOnInput);
        }
        $('html').off('click', closeOnHTMLClick);
        $(window).off('resize', resizeCols);
    };

    if (isInline) {
        p.open();
    }

    return p;
};
app.picker = function (params) {
    return new Picker(params);
};
app.closePicker = function (picker) {
    picker = $(picker);
    if (picker.length === 0) picker = $('.picker.picker-in');
    if (picker.length === 0) return;
    picker.each(function () {
        var pickerInstance = this.f7Picker;
        if (pickerInstance) pickerInstance.close();
    });
};