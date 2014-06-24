/*======================================================
************   Slider   ************
======================================================*/
var Slider = function (container, params) {
    var defaults = {
        initialSlide: 0,
        spaceBetween: 0,
        speed: 300,
        slidesPerView: 1,
        direction: 'horizontal',
        paginationHide: true,
        slideClass: 'slider-slide',
        slideActiveClass: 'slider-slide-active',
        slideNextClass: 'slider-slide-next',
        slidePrevClass: 'slider-slide-prev',
        wrapperClass: 'slider-wrapper',
        bulletClass: 'slider-pagination-bullet',
        bulletActiveClass: 'slider-pagination-active',
        preventClicks: true,
        preventClicksPropagation: true,
        autoplay: false,
        autoplayDisableOnInteraction: true
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    var s = this;
    s.params = params;
    s.container = $(container);
    if (s.container.length === 0) return;
    s.container[0].f7Slider = s;

    if (s.params.direction === 'vertical') {
        s.container.addClass('slider-container-vertical');
    }
    else {
        s.container.addClass('slider-container-horizontal');
    }

    s.wrapper = s.container.children('.' + s.params.wrapperClass);

    if (s.params.pagination) {
        s.paginationContainer = $(s.params.pagination);
    }
    
    s.activeSlideIndex = s.previousSlideIndex = s.params.initialSlide || 0;

    var isH = s.params.direction === 'horizontal';

    var inverter = isH ? (app.rtl ? -1 : 1) : 1;

    s.updateSlides = function () {
        s.slides = s.wrapper.children('.' + s.params.slideClass);

        if (s.params.spaceBetween !== 0) {
            var marginProp = app.rtl ? 'margin-left' : 'margin-right';
            if (isH) s.slides.css(marginProp, s.params.spaceBetween + 'px');
            else s.slides.css({marginBottom: s.params.spaceBetween + 'px'});
        }
        if (s.params.slidesPerView > 1) {
            var sizeValue = '(100% - ' + (s.params.slidesPerView - 1) * params.spaceBetween + 'px)/' + s.params.slidesPerView;
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
            for (var i = 0; i < s.slides.length - s.params.slidesPerView + 1; i++) {
                bulletsHTML += '<span class="' + s.params.bulletClass + '"></span>';
            }
            s.paginationContainer.html(bulletsHTML);
            s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
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
        if (s.params.nextButton) $(s.params.nextButton)[action]('click', s.onClickNext);
        if (s.params.prevButton) $(s.params.prevButton)[action]('click', s.onClickPrev);
        if (s.params.indexButton) $(s.params.indexButton)[action]('click', s.onClickIndex);

        // Prevent Links
        if (s.params.preventClicks) s.container[action]('click', s.onClick);
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

    s.onClick = function (e) {
        if (s.params.preventClicks && !s.allowClick) {
            e.preventDefault();
            if (s.params.preventClicksPropagation) e.stopPropagation();
        }
    };
    s.onTouchStart = function (e) {
        isTouched = true;
        isMoved = false;
        isScrolling = undefined;
        touchesStart.x = touchesCurrent.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        touchesStart.y = touchesCurrent.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        touchStartTime = Date.now();
        s.allowClick = true;
        s.updateSize();
        if (s.params.onTouchStart) s.params.onTouchStart(s, e);
        if (e.type === 'mousedown') e.preventDefault();
    };
    s.onTouchMove = function (e) {
        if (s.params.onTouchMove) s.params.onTouchMove(s, e);
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
        if (s.params.onSliderMove) s.params.onSliderMove(s, e);

        e.preventDefault();
        e.stopPropagation();

        if (!isMoved) {
            currentTranslate = $.getTranslate(s.wrapper[0], isH ? 'x' : 'y') * inverter;
            s.wrapper.transition(0);
            if (animating) s.onSlideChangeEnd();
            if (params.autoplay && autoplay) {
                if (s.params.autoplayDisableOnInteraction) s.stopAutoplay();
                else {
                    if (autoplayTimeout) clearTimeout(autoplayTimeout);
                }
            }
        }
        isMoved = true;
        var diff = isH ? (touchesCurrent.x - touchesStart.x) * inverter : touchesCurrent.y - touchesStart.y;

        if ((diff > 0 && s.activeSlideIndex === 0)) diff = Math.pow(diff, 0.85);
        else if (diff < 0 && s.activeSlideIndex === s.slides.length - s.params.slidesPerView) diff = -Math.pow(-diff, 0.85);
        
        var translateX = isH ? (diff + currentTranslate) * inverter : 0, translateY = isH ? 0 : diff + currentTranslate;

        s.wrapper.transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
    };
    s.onTouchEnd = function (e) {
        if (s.params.onTouchEnd) s.params.onTouchEnd(s, e);
        var touchEndTime = Date.now();
        var timeDiff = touchEndTime - touchStartTime;
        if (s.allowClick) {
            if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                if (clickTimeout) clearTimeout(clickTimeout);
                clickTimeout = setTimeout(function () {
                    if (s.params.paginationHide && s.paginationContainer) {
                        s.paginationContainer.toggleClass('slider-pagination-hidden');
                    }
                    if (s.params.onClick) s.params.onClick(s, e);
                }, 300);
                
            }
            if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                if (clickTimeout) clearTimeout(clickTimeout);
                if (s.params.onDoubleTap) {
                    s.params.onDoubleTap(s, e);
                }
            }
            if (s.params.onTap) s.params.onTap(s, e);
        }

        lastClickTime = Date.now();

        if (!isTouched || !isMoved) {
            isTouched = isMoved = false;
            return;
        }
        isTouched = isMoved = false;
        var touchesDiff = isH ? (touchesCurrent.x - touchesStart.x) * inverter : touchesCurrent.y - touchesStart.y;
        
        //Release links clicks
        if (Math.abs(touchesDiff) < 5 && (timeDiff) < 300 && s.allowClick === false) {
            s.allowClick = true;
        }
        setTimeout(function () {
            s.allowClick = true;
        }, 100);
        
        var continueAutoplay = s.params.autoplay && autoplay && !s.params.autoplayDisableOnInteraction;

        if (touchesDiff === 0) {
            if (continueAutoplay) {
                s.startAutoplay();
            }
            return;
        }
        var skipSlides = 1;
        var slideSize = s.size / s.params.slidesPerView;
        if (s.params.slidesPerView > 1) {
            skipSlides = Math.abs((Math.abs(touchesDiff) + slideSize / 2) / slideSize);
        }
        if (continueAutoplay) {
            s.wrapper.transitionEnd(function () {
                s.startAutoplay();
            });
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
        if (index > s.slides.length - s.params.slidesPerView) index = s.slides.length - s.params.slidesPerView;

        var translate = - (s.size + s.params.spaceBetween) * index / s.params.slidesPerView;

        if (typeof speed === 'undefined') speed = s.params.speed;
        s.previousSlideIndex = s.activeSlideIndex;
        s.activeSlideIndex = Math.round(index);
        s.isFirst = s.activeSlideIndex === 0;
        s.isLast = s.activeSlideIndex === s.slides.length - s.params.slidesPerView;
        s.onSlideChangeStart();
        var translateX = isH ? translate * inverter : 0, translateY = isH ? 0 : translate;
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
        s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass);
        var activeSlide = s.slides.eq(s.activeSlideIndex);
        activeSlide.addClass(s.params.slideActiveClass);
        activeSlide.next().addClass(s.params.slideNextClass);
        activeSlide.prev().addClass(s.params.slidePrevClass);

        if (s.bullets && s.bullets.length > 0) {
            s.bullets.removeClass(s.params.bulletActiveClass);
            s.bullets.eq(s.activeSlideIndex).addClass(s.params.bulletActiveClass);
        }
    };
    s.onSlideChangeStart = function () {
        s.updateClasses();
        if (s.params.onSlideChangeStart) s.params.onSlideChangeStart(s);
    };
    s.onSlideChangeEnd = function () {
        animating = false;
        s.wrapper.transition(0);
        if (s.params.onSlideChangeEnd) s.params.onSlideChangeEnd(s);
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

    // Autoplay
    var autoplayTimeout;
    var autoplay;
    s.startAutoplay = function () {
        if (!s.params.autoplay) return;
        autoplay = true;
        if (autoplayTimeout) clearTimeout(autoplayTimeout);
        autoplayTimeout = setTimeout(function () {
            s.wrapper.transitionEnd(function () {
                s.startAutoplay();
            });
            var index = s.activeSlideIndex + 1;
            if (index > s.slides.length - s.params.slidesPerView) index = 0;
            s.slideTo(index);
        }, s.params.autoplay);
    };
    s.stopAutoplay = function () {
        autoplay = false;
        if (autoplayTimeout) clearTimeout(autoplayTimeout);
    };
    s.resetAutoplay = function () {
        s.stopAutoplay();
        s.startAutoplay();
    };

    // init
    s.init = function () {
        s.updateSlides();
        s.updatePagination();
        s.updateSize();
        s.slideTo(s.params.initialSlide, 0);
        s.attachEvents();
        if (s.params.autoplay) s.startAutoplay();
    };

    // Destroy
    s.destroy = function () {
        s.detachEvents();
        if (s.params.onDestroy) s.params.onDestroy();
        s = undefined;
    };

    s.init();

    return s;
};
app.slider = function (container, params) {
    return new Slider(container, params);
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
        var params;
        if (slider.data('slider')) {
            params = JSON.parse(slider.data('slider'));
        }
        else {
            params = {
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
                indexButton: slider.data('indexButton'),
                autoplay: slider.data('autoplay')
            };
        }
        var _slider = app.slider(slider[0], params);
        destroySliderOnRemove(_slider);
    }
};
