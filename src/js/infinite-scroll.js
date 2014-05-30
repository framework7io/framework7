/* ===============================================================================
************   Infinite Scroll   ************
=============================================================================== */
function handleInfiniteScroll() {
    /*jshint validthis:true */
    var inf = this;
    var scrollTop = inf.scrollTop;
    var scrollHeight = inf.scrollHeight;
    var height = inf.offsetHeight;
    var distance = inf.getAttribute('data-distance');
    if (!distance) distance = 50;
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
        distance = parseInt(distance, 10) / 100 * height;
    }
    if (distance > height) distance = height;
    if (scrollTop + height >= scrollHeight - distance) {
        $(inf).trigger('infinite');
    }
}
app.attachInfiniteScroll = function (infiniteContent) {
    $(infiniteContent).on('scroll', handleInfiniteScroll);
};
app.detachInfiniteScroll = function (infiniteContent) {
    $(infiniteContent).off('scroll', handleInfiniteScroll);
};

app.initInfiniteScroll = function (pageContainer) {
    pageContainer = $(pageContainer);
    var infiniteContent = pageContainer.find('.infinite-scroll');
    app.attachInfiniteScroll(infiniteContent);
    function detachEvents() {
        app.detachInfiniteScroll(infiniteContent);
        pageContainer.off('pageBeforeRemove', detachEvents);
    }
    pageContainer.on('pageBeforeRemove', detachEvents);
};