/*======================================================
************   Slider   ************
======================================================*/
app.initSliders = function(pageContainer) {
    $(pageContainer).find('.slider').each(function(){
        var slider = $(this),
            isTouched = false,
            isMoved = false,
            isScrolling,
            minValue = slider.attr('data-min')*1 || 0,
            maxValue = slider.attr('data-max')*1 || 0,
            value = slider.attr('data-value')*1 || 0,
            startValue = value,
            sliderWidth,
            handle = slider.find('.slider-handle'),
            range = slider.find('.slider-range'),
            touches = {};
        // Set Handle/Range Position/Width
        var perc = (startValue-minValue)/(maxValue - minValue);
        if (perc<0) perc = 0;
        if (perc>1) perc = 1;
        handle.css({left: perc*100+'%'}).transform('translate3d(-'+perc*100+'%,0,0)');
        range.css({width: perc*100+'%'});
        // Handle Events
        handle.on(app.touchEvents.start, function(e){
            if (isTouched) return;
            e.stopPropagation();
            isTouched = true;
            touches.startX = touches.currentX = e.type=='touchmove' ? e.targetTouches[0].pageX : e.pageX;
            touches.startY = touches.currentY = e.type=='touchmove' ? e.targetTouches[0].pageY : e.pageY;
            sliderWidth = slider.width();
            startValue = value = slider.attr('data-value')*1 || 0;
            isScrolling = undefined;
        });
        handle.on(app.touchEvents.move, function(e){
            if (!isTouched) return;
            touches.currentX = e.type=='touchmove' ? e.targetTouches[0].pageX : e.pageX;
            touches.currentY = e.type=='touchmove' ? e.targetTouches[0].pageY : e.pageY;
            if ( typeof isScrolling === 'undefined') {
              isScrolling = !!( isScrolling || Math.abs(touches.currentY - touches.startY) > Math.abs( touches.currentX - touches.startX ) );
            }
            if (isScrolling) {
                isTouched = false;
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            isMoved = true;
            var diff = touches.currentX - touches.startX;

            var perc = diff/sliderWidth + (startValue-minValue)/(maxValue - minValue);
            if (perc<0) perc = 0;
            if (perc>1) perc = 1;
            value = (maxValue - minValue)*perc + minValue;
            slider.attr('data-value',value);
            
            handle.css({left:perc*100+'%'}).transform('translate3d(-'+perc*100+'%,0,0)');
            range.css({width:perc*100+'%'});
            slider.trigger('change', {values:[value]});
        });
        handle.on(app.touchEvents.end, function(e){
            if (!isTouched || !isMoved) {
                isTouched = isMoved = false;
                return;
            }

            isTouched = isMoved = false;
        });
    });
};
app.setSliderValue = function(sliderContainer, value) {
    var slider = $(sliderContainer),
        minValue = slider.attr('data-min')*1 || 0,
        maxValue = slider.attr('data-max')*1 || 0,
        handle = slider.find('.slider-handle'),
        range = slider.find('.slider-range');
    if (value>maxValue) value = maxValue;
    if (value<minValue) value = minValue;
    slider.attr('data-value',value);
    // Set Handle/Range Position/Width
    var perc = (value-minValue)/(maxValue - minValue);
    if (perc<0) perc = 0;
    if (perc>1) perc = 1;
    handle.css({left: perc*100+'%'}).transform('translate3d(-'+perc*100+'%,0,0)');
    range.css({width: perc*100+'%'});
};