/*===========================
Framework7 Swiper Additions
===========================*/
app.swiper = function (container, params) {
    return new Swiper(container, params);
};
app.initSwiper = function (pageContainer) {
    var page = $(pageContainer);
    var swipers = page.find('.swiper-init');
    if (swipers.length === 0) return;
    function destroySwiperOnRemove(slider) {
        function destroySwiper() {
            slider.destroy();
            page.off('pageBeforeRemove', destroySwiper);
        }
        page.on('pageBeforeRemove', destroySwiper);
    }
    for (var i = 0; i < swipers.length; i++) {
        var swiper = swipers.eq(i);
        var params;
        if (swiper.data('swiper')) {
            params = JSON.parse(swiper.data('swiper'));
        }
        else {
            params = {
                initialSlide: parseInt(swiper.data('initialSlide'), 10) || undefined,
                spaceBetween: parseInt(swiper.data('spaceBetween'), 10) || undefined,
                speed: parseInt(swiper.data('speed'), 10) || undefined,
                slidesPerView: parseInt(swiper.data('slidesPerView'), 10) || undefined,
                direction: swiper.data('direction'),
                pagination: swiper.data('pagination'),
                paginationHide: swiper.data('paginationHide') && (swiper.data('paginationHide') === 'true' ? true : false),
                loop: swiper.data('loop') && (swiper.data('loop') === 'true' ? true : false),
                onlyExternal: swiper.data('onlyExternal') && (swiper.data('onlyExternal') === 'true' ? true : false),
                slideClass: swiper.data('slideClass'),
                slideActiveClass: swiper.data('slideActiveClass'),
                slideNextClass: swiper.data('slideNextClass'),
                slidePrevClass: swiper.data('slidePrevClass'),
                wrapperClass: swiper.data('wrapperClass'),
                bulletClass: swiper.data('bulletClass'),
                bulletActiveClass: swiper.data('bulletActiveClass'),
                nextButton: swiper.data('nextButton'),
                prevButton: swiper.data('prevButton'),
                indexButton: swiper.data('indexButton'),
                autoplay: swiper.data('autoplay')
            };
        }
        var _slider = app.swiper(swiper[0], params);
        destroySwiperOnRemove(_slider);
    }
};
app.reinitSwiper = function (pageContainer) {
    var page = $(pageContainer);
    var sliders = page.find('.swiper-init');
    if (sliders.length === 0) return;
    for (var i = 0; i < sliders.length; i++) {
        var sliderInstance = sliders[0].swiper;
        if (sliderInstance) {
            sliderInstance.onResize();
        }
    }
};
