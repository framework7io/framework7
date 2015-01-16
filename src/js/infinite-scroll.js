/* ===============================================================================
************   Infinite Scroll Bottom   ************
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
    if (!distance) distance = 50;
    if (typeof distance === 'string' && distance.indexOf('%') >= 0) {
        distance = parseInt(distance, 10) / 100 * height;
    }
    if (distance > height) distance = height;
    if (scrollTop + height >= scrollHeight - distance) {
        if (virtualListContainer.length > 0) {
            virtualList = virtualListContainer[0].f7VirtualList;
            if (virtualList && !virtualList.reachEnd) return;
        }
        inf.trigger('infinite');
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

/* ===============================================================================
 ************   Infinite Scroll Top   ************
 =============================================================================== */
function handleInfiniteScrollTop() {
    /*jshint validthis:true */
    var inf = $(this);
    var scrollTop = inf[0].scrollTop;
    if (scrollTop <= 20) {
        inf.trigger('infiniteTop');
    }
}
app.attachInfiniteScrollTop = function (infiniteTopContent) {
    $(infiniteTopContent).on('scroll', handleInfiniteScrollTop);
};
app.detachInfiniteScrollTop = function (infiniteTopContent) {
    $(infiniteTopContent).off('scroll', handleInfiniteScrollTop);
};

app.initInfiniteScrollTop = function (pageContainer) {
    pageContainer = $(pageContainer);
    var infiniteTopContent = pageContainer.find('.infinite-scroll-top');
    if (infiniteTopContent.length === 0) return;
    app.attachInfiniteScrollTop(infiniteTopContent);
    function detachEvents() {
        app.detachInfiniteScrollTop(infiniteTopContent);
        pageContainer.off('pageBeforeRemove', detachEvents);
    }
    pageContainer.on('pageBeforeRemove', detachEvents);
};