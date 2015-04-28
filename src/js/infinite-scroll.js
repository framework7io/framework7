/* ===============================================================================
************   Infinite Scroll   ************
=============================================================================== */
function handleInfiniteScroll() {
    /*jshint validthis:true */
    var inf = $(this);
    var scrollTop = inf[0].scrollTop;
    var scrollHeight = inf[0].scrollHeight;
    var height = inf[0].offsetHeight;
    var distance = inf[0].getAttribute('data-distance');
    var virtualListContainer = inf.find('.virtual-list');
    var virtualList;
    var onTop = inf.hasClass('infinite-scroll-top');
    if (!distance) distance = 50;
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
        distance = parseInt(distance, 10) / 100 * height;
    }
    if (distance > height) distance = height;
    if (onTop) {
        if (scrollTop < distance) {
            inf.trigger('infinite');
        }
    }
    else {
        if (scrollTop + height >= scrollHeight - distance) {
            if (virtualListContainer.length > 0) {
                virtualList = virtualListContainer[0].f7VirtualList;
                if (virtualList && !virtualList.reachEnd) return;
            }
            inf.trigger('infinite');
        }
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
    if (infiniteContent.length === 0) return;
    app.attachInfiniteScroll(infiniteContent);
    function detachEvents() {
        app.detachInfiniteScroll(infiniteContent);
        pageContainer.off('pageBeforeRemove', detachEvents);
    }
    pageContainer.on('pageBeforeRemove', detachEvents);
};