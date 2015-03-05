/*===========================
Framework7 Swiper Additions
===========================*/
app.swiper = function (container, params) {
    return new Swiper(container, params);
};
app.initPageSwiper = function (pageContainer) {
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
                initialSlide: parseInt(swiper.data('initial-slide'), 10) || undefined,
                spaceBetween: parseInt(swiper.data('space-between'), 10) || undefined,
                speed: parseInt(swiper.data('speed'), 10) || undefined,
                slidesPerView: swiper.data('slides-per-view') || undefined,
                slidesPerColumn: parseInt(swiper.data('slides-per-column'), 10) || undefined,
                centeredSlides: swiper.data('centered-slides') && (swiper.data('centered-slides') === 'true' ? true : false),
                direction: swiper.data('direction'),
                pagination: swiper.data('pagination'),
                paginationHide: swiper.data('pagination-hide') && (swiper.data('pagination-hide') === 'true' ? true : false),
                paginationClickable: swiper.data('pagination-clickable') && (swiper.data('pagination-clickable') === 'true' ? true : false),
                scrollbar: swiper.data('scrollbar'),
                scrollbarHide: swiper.data('scrollbar-hide') && (swiper.data('scrollbar-hide') === 'true' ? true : false),
                loop: swiper.data('loop') && (swiper.data('loop') === 'true' ? true : false),
                effect: swiper.data('effect') || 'slide',
                freeMode: swiper.data('free-mode') && (swiper.data('free-mode') === 'true' ? true : false),
                onlyExternal: swiper.data('only-external') && (swiper.data('only-external') === 'true' ? true : false),
                nextButton: swiper.data('next-button'),
                prevButton: swiper.data('prev-button'),
                autoplay: swiper.data('autoplay'),
                parallax: swiper.data('parallax') && (swiper.data('parallax') === 'true' ? true : false)
            };
        }
        var _slider = app.swiper(swiper[0], params);
        destroySwiperOnRemove(_slider);
    }
};
app.reinitPageSwiper = function (pageContainer) {
    var page = $(pageContainer);
    var sliders = page.find('.swiper-init');
    if (sliders.length === 0) return;
    for (var i = 0; i < sliders.length; i++) {
        var sliderInstance = sliders[0].swiper;
        if (sliderInstance) {
            sliderInstance.update(true);
        }
    }
};
