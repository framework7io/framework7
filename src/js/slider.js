/*======================================================
************   Slider   ************
======================================================*/
var Slider = function (container, options) {
    var defaults = {
        initialSlide: 0,
        spaceBetween: 0,
        speed: 300,
        slidesPerView: 1,
        direction: 'horizontal',
        pagination: '',
        paginationHide: true,
        slideClass: 'slider-slide',
        slideActiveClass: 'slider-slide-active',
        slideNextClass: 'slider-slide-next',
        slidePrevClass: 'slider-slide-prev',
        wrapperClass: 'slider-wrapper',
        bulletClass: 'slider-pagination-bullet',
        bulletActiveClass: 'slider-pagination-active'
    };
    options = options || {};
    for (var def in defaults) {
        if (typeof options[def] === 'undefined') {
            options[def] = defaults[def];
        }
    }

    var s = this;
    s.options = options;
    s.container = $(container);
    if (s.container.length === 0) return;

    if (s.options.direction === 'vertical') {
        s.container.addClass('slider-container-vertical');
    }

    s.wrapper = s.container.children('.' + s.options.wrapperClass);

    if (s.options.pagination) {
        s.paginationContainer = $(s.options.pagination);
    }
    
    s.activeSlideIndex = s.previousSlideIndex = s.options.initialSlide || 0;

    var isH = s.options.direction === 'horizontal';

    s.updateSlides = function () {
        s.slides = s.wrapper.children('.' + s.options.slideClass);

        if (s.options.spaceBetween !== 0) {
            if (isH) s.slides.css({marginRight: s.options.spaceBetween + 'px'});
            else s.slides.css({marginBottom: s.options.spaceBetween + 'px'});
        }
        if (s.options.slidesPerView > 1) {
            var sizeValue = '(100% - ' + (s.options.slidesPerView - 1) * options.spaceBetween + 'px)/' + s.options.slidesPerView;
            if (isH) {
                s.slides.css('width', '-webkit-calc(' + sizeValue + ')');
                s.slides.css('width', '-moz-calc(' + sizeValue + ')');
                s.slides.css('width', 'calc(' + sizeValue + ')');
            }
            else {
                s.slides.css('height', '-webkit-calc(' + sizeValue + ')');
                s.slides.css('height', '-moz-calc(' + sizeValue + ')');
                s.slides.css('height', 'calc(' + sizeValue + ')');
            }
        }
    };

    s.updatePagination = function () {
        if (s.paginationContainer && s.paginationContainer.length > 0) {
            var bulletsHTML = '';
            for (var i = 0; i < s.slides.length - s.options.slidesPerView + 1; i++) {
                bulletsHTML += '<span class="' + s.options.bulletClass + '"></span>';
            }
            s.paginationContainer.html(bulletsHTML);
            s.bullets = s.paginationContainer.find('.' + s.options.bulletClass);
        }
    };

    s.updateSize = function () {
        s.width = s.container[0].offsetWidth;
        s.height = s.container[0].offsetHeight;
        s.size = isH ? s.width : s.height;
    };

    s.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        // Slide between photos
        s.container[action](app.touchEvents.start, s.onTouchStart);
        s.container[action](app.touchEvents.move, s.onTouchMove);
        s.container[action](app.touchEvents.end, s.onTouchEnd);
        $(window)[action]('resize', s.onResize);

        // Next, Prev, Index
        if (s.options.nextButton) $(s.options.nextButton)[action]('click', s.onClickNext);
        if (s.options.prevButton) $(s.options.prevButton)[action]('click', s.onClickPrev);
        if (s.options.indexButton) $(s.options.indexButton)[action]('click', s.onClickIndex);
    };
    s.detachEvents = function () {
        s.attachEvents(true);
    };

    s.onResize = function () {
        s.updateSize();
        s.slideTo(s.activeSlideIndex, 0, false);
    };

    var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, currentTranslate, animating = false;
    var lastClickTime = Date.now(), clickTimeout;
    s.allowClick = true;

    s.onTouchStart = function (e) {
        isTouched = true;
        isMoved = false;
        isScrolling = undefined;
        touchesStart.x = touchesCurrent.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = touchesCurrent.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = Date.now();
        s.allowClick = true;
        s.updateSize();
        if (s.options.onTouchStart) s.options.onTouchStart(s);
        if (e.type === 'mousedown') e.preventDefault();
    };
    s.onTouchMove = function (e) {
        if (s.options.onTouchMove) s.options.onTouchMove(s);
        s.allowClick = false;
        if (!isTouched) return;
        if (e.targetTouches && e.targetTouches.length > 1) return;
        
        touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (typeof isScrolling === 'undefined') {
            isScrolling = !!(isScrolling || Math.abs(touchesCurrent.y - touchesStart.y) > Math.abs(touchesCurrent.x - touchesStart.x));
        }
        if ((isH && isScrolling) || (!isH && !isScrolling))  {
            isTouched = false;
            return;
        }
        if (s.options.onSliderMove) s.options.onSliderMove(s);

        e.preventDefault();
        e.stopPropagation();

        if (!isMoved) {
            currentTranslate = $.getTranslate(s.wrapper[0], isH ? 'x' : 'y');
            s.wrapper.transition(0);
            if (animating) s.onSlideChangeEnd();
        }
        isMoved = true;
        var diff = isH ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;
        if ((diff > 0 && s.activeSlideIndex === 0)) diff = Math.pow(diff, 0.85);
        else if (diff < 0 && s.activeSlideIndex === s.slides.length - s.options.slidesPerView) diff = -Math.pow(-diff, 0.85);
        
        var translateX = isH ? diff + currentTranslate: 0, translateY = isH ? 0 : diff + currentTranslate;
        s.wrapper.transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
    };
    s.onTouchEnd = function (e) {
        if (s.options.onTouchEnd) s.options.onTouchEnd(s);
        var touchEndTime = Date.now();
        var timeDiff = touchEndTime - touchStartTime;
        if (s.allowClick) {
            if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                if (clickTimeout) clearTimeout(clickTimeout);
                clickTimeout = setTimeout(function () {
                    if (s.options.paginationHide && s.paginationContainer) {
                        s.paginationContainer.toggleClass('slider-pagination-hidden');
                    }
                    if (s.options.onClick) s.options.onClick(e);
                }, 300);
                
            }
            if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                if (clickTimeout) clearTimeout(clickTimeout);
                if (s.options.onDoubleTap) {
                    s.options.onDoubleTap(e);
                }
            }
        }

        lastClickTime = Date.now();
        s.allowClick = true;

        if (!isTouched || !isMoved) {
            isTouched = isMoved = false;
            return;
        }
        isTouched = isMoved = false;
        var touchesDiff = isH ? touchesCurrent.x - touchesStart.x : touchesCurrent.y - touchesStart.y;

        if (touchesDiff === 0) {
            return;
        }
        var skipSlides = 1;
        var slideSize = s.size / s.options.slidesPerView;
        if (s.options.slidesPerView > 1) {
            skipSlides = Math.abs((Math.abs(touchesDiff) + slideSize / 2) / slideSize);
        }

        if (timeDiff > 300) {
            // Long touches
            if (touchesDiff <= -slideSize / 2) {
                s.slideTo(s.activeSlideIndex + Math.floor(skipSlides));
            }
            else if (touchesDiff > slideSize / 2) {
                s.slideTo(s.activeSlideIndex - Math.floor(skipSlides));
            }
            else {
                s.slideReset();
            }
        }
        else {
            if (Math.abs(touchesDiff) < 10) {
                s.slideReset();
            }
            else {
                if (touchesDiff < 0) {
                    s.slideTo(s.activeSlideIndex + Math.round(skipSlides));
                }
                else {
                    s.slideTo(s.activeSlideIndex - Math.round(skipSlides));
                }
            }
                
        }
    };

    s.slideTo = function (index, speed, runCallbacks) {
        if (typeof index === 'undefined') index = 0;
        if (index < 0) index = 0;
        if (index > s.slides.length - s.options.slidesPerView) index = s.slides.length - s.options.slidesPerView;

        var translate = - (s.size + s.options.spaceBetween) * index / s.options.slidesPerView;

        if (typeof speed === 'undefined') speed = s.options.speed;
        s.previousSlideIndex = s.activeSlideIndex;
        s.activeSlideIndex = index;
        s.isFirst = s.activeSlideIndex === 0;
        s.isLast = s.activeSlideIndex === s.slides.length - s.options.slidesPerView;
        s.onSlideChangeStart();
        var translateX = isH ? translate : 0, translateY = isH ? 0 : translate;
        if (speed === 0) {
            s.wrapper
                .transition(0)
                .transform('translate3d(' + translateX + 'px,' + translateY + 'px,0)');
            if (runCallbacks !== false) s.onSlideChangeEnd();
        }
        else {
            animating = true;
            s.wrapper
                .transition(speed)
                .transform('translate3d(' + translateX + 'px,' + translateY + 'px,0)')
                .transitionEnd(function () {
                    if (runCallbacks !== false) s.onSlideChangeEnd();
                });
        }
    };
    s.updateClasses = function () {
        s.slides.removeClass(s.options.slideActiveClass + ' ' + s.options.slideNextClass + ' ' + s.options.slidePrevClass);
        var activeSlide = s.slides.eq(s.activeSlideIndex);
        activeSlide.addClass(s.options.slideActiveClass);
        activeSlide.next().addClass(s.options.slideNextClass);
        activeSlide.prev().addClass(s.options.slidePrevClass);

        if (s.bullets && s.bullets.length > 0) {
            s.bullets.removeClass(s.options.bulletActiveClass);
            s.bullets.eq(s.activeSlideIndex).addClass(s.options.bulletActiveClass);
        }
    };
    s.onSlideChangeStart = function () {
        s.updateClasses();
        if (s.options.onSlideChangeStart) s.options.onSlideChangeStart(s);
    };
    s.onSlideChangeEnd = function () {
        animating = false;
        s.wrapper.transition(0);
        if (s.options.onSlideChangeEnd) s.options.onSlideChangeEnd(s);
    };
    s.slideNext = function () {
        s.slideTo(s.activeSlideIndex + 1);
    };
    s.slidePrev = function () {
        s.slideTo(s.activeSlideIndex - 1);
    };
    s.slideReset = function () {
        s.slideTo(s.activeSlideIndex);
    };

    // Clicks
    s.onClickNext = function (e) {
        e.preventDefault();
        s.slideNext();
    };
    s.onClickPrev = function (e) {
        e.preventDefault();
        s.slidePrev();
    };
    s.onClickIndex = function (e) {
        e.preventDefault();
        s.slideTo($(this).index());
    };

    // init
    s.init = function () {
        s.updateSlides();
        s.updatePagination();
        s.updateSize();
        s.slideTo(s.options.initialSlide, 0);
        s.attachEvents();
    };

    // Destroy
    s.destroy = function () {
        s.detachEvents();
        if (s.options.onDestroy) s.options.onDestroy();
        s = undefined;
    };

    s.init();

    return s;
};
app.slider = function (container, options) {
    return new Slider(container, options);
};
app.initSlider = function (pageContainer) {
    var page = $(pageContainer);
    var sliders = page.find('.slider-init');
    if (sliders.length === 0) return;
    function destroySliderOnRemove(slider) {
        function destroySlider() {
            slider.destroy();
            page.off('pageBeforeRemove', destroySlider);
        }
        page.on('pageBeforeRemove', destroySlider);
    }
    for (var i = 0; i < sliders.length; i++) {
        var slider = sliders.eq(i);
        var options;
        if (slider.data('slider')) {
            options = JSON.parse(slider.data('slider'));
        }
        else {
            options = {
                initialSlide: parseInt(slider.data('initialSlide'), 10) || undefined,
                spaceBetween: parseInt(slider.data('spaceBetween'), 10) || undefined,
                speed: parseInt(slider.data('speed'), 10) || undefined,
                slidesPerView: slider.data('slidesPerView'),
                direction: slider.data('direction'),
                pagination: slider.data('pagination'),
                paginationHide: slider.data('paginationHide') && (slider.data('paginationHide') === 'true' ? true : false),
                slideClass: slider.data('slideClass'),
                slideActiveClass: slider.data('slideActiveClass'),
                slideNextClass: slider.data('slideNextClass'),
                slidePrevClass: slider.data('slidePrevClass'),
                wrapperClass: slider.data('wrapperClass'),
                bulletClass: slider.data('bulletClass'),
                bulletActiveClass: slider.data('bulletActiveClass'),
                nextButton: slider.data('nextButton'),
                prevButton: slider.data('prevButton'),
                indexButton: slider.data('indexButton')
            };
        }
        var _slider = app.slider(slider[0], options);
        slider[0].slider = _slider;
        destroySliderOnRemove(_slider);
    }
};
