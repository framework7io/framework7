/*===========================
Framework7 Swiper Additions
===========================*/
app.swiper = function (container, params) {
    return new Swiper(container, params);
};
app.initPageSwiper = function (pageContainer) {
    pageContainer = $(pageContainer);
    var swipers = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
    if (swipers.length === 0) return;
    function destroySwiperOnRemove(slider) {
        function destroySwiper() {
            slider.destroy();
            pageContainer.off('page:beforeremove', destroySwiper);
        }
        pageContainer.on('page:beforeremove', destroySwiper);
    }
    swipers.each(function () {
        var swiper = $(this), initialSlide;
        var params;
        if (swiper.hasClass('tabs-swipeable-wrap')) {
            swiper.addClass('swiper-container').children('.tabs').addClass('swiper-wrapper').children('.tab').addClass('swiper-slide');
            initialSlide = swiper.children('.tabs').children('.tab.active').index();
        }
        if (swiper.data('swiper')) {
            params = JSON.parse(swiper.data('swiper'));
        }
        else {
            params = swiper.dataset();
        }
        if (typeof params.initialSlide === 'undefined' && typeof initialSlide !== 'undefined') {
            params.initialSlide = initialSlide;
        }
        if (swiper.hasClass('tabs-swipeable-wrap')) {
            params.onSlideChangeStart = function (s) {
                app.showTab(s.slides.eq(s.activeIndex));
            };
        }
        var _slider = app.swiper(swiper[0], params);
        destroySwiperOnRemove(_slider);
    });
};
app.reinitPageSwiper = function (pageContainer) {
    pageContainer = $(pageContainer);
    var sliders = pageContainer.find('.swiper-init, .tabs-swipeable-wrap');
    if (sliders.length === 0) return;
    for (var i = 0; i < sliders.length; i++) {
        var sliderInstance = sliders[0].swiper;
        if (sliderInstance) {
            sliderInstance.update(true);
        }
    }
};
