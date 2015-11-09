/*===========================
Framework7 Swiper Additions
===========================*/
app.swiper = function (container, params) {
    return new Swiper(container, params);
};
app.initPageSwiper = function (pageContainer) {
    pageContainer = $(pageContainer);
    var swipers = pageContainer.find('.swiper-init');
    if (swipers.length === 0) return;
    function destroySwiperOnRemove(slider) {
        function destroySwiper() {
            slider.destroy();
            pageContainer.off('pageBeforeRemove', destroySwiper);
        }
        pageContainer.on('pageBeforeRemove', destroySwiper);
    }
    for (var i = 0; i < swipers.length; i++) {
        var swiper = swipers.eq(i);
        var params;
        if (swiper.data('swiper')) {
            params = JSON.parse(swiper.data('swiper'));
        }
        else {
            params = swiper.dataset();
        }
        var _slider = app.swiper(swiper[0], params);
        destroySwiperOnRemove(_slider);
    }
};
app.reinitPageSwiper = function (pageContainer) {
    pageContainer = $(pageContainer);
    var sliders = pageContainer.find('.swiper-init');
    if (sliders.length === 0) return;
    for (var i = 0; i < sliders.length; i++) {
        var sliderInstance = sliders[0].swiper;
        if (sliderInstance) {
            sliderInstance.update(true);
        }
    }
};
