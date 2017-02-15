/*===============================================================================
************   Sortable   ************
===============================================================================*/
app.sortableToggle = function (sortableContainer) {
    sortableContainer = $(sortableContainer);
    if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
    sortableContainer.toggleClass('sortable-opened');
    if (sortableContainer.hasClass('sortable-opened')) {
        sortableContainer.trigger('open sortable:open');
    }
    else {
        sortableContainer.trigger('close sortable:close');
    }
    return sortableContainer;
};
app.sortableOpen = function (sortableContainer) {
    sortableContainer = $(sortableContainer);
    if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
    sortableContainer.addClass('sortable-opened');
    sortableContainer.trigger('open sortable:open');
    return sortableContainer;
};
app.sortableClose = function (sortableContainer) {
    sortableContainer = $(sortableContainer);
    if (sortableContainer.length === 0) sortableContainer = $('.list-block.sortable');
    sortableContainer.removeClass('sortable-opened');
    sortableContainer.trigger('close sortable:close');
    return sortableContainer;
};
app.initSortable = function () {
    var isTouched, isMoved, touchStartY, touchesDiff, sortingEl, sortingElHeight, sortingItems, minTop, maxTop, insertAfter, insertBefore, sortableContainer, startIndex;
    
    function handleTouchStart(e) {
        isMoved = false;
        isTouched = true;
        touchStartY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        /*jshint validthis:true */
        sortingEl = $(this).parent();
        startIndex = sortingEl.index();
        sortingItems = sortingEl.parent().find('li');
        sortableContainer = sortingEl.parents('.sortable');
        e.preventDefault();
        app.allowPanelOpen = app.allowSwipeout = false;
    }
    function handleTouchMove(e) {
        if (!isTouched || !sortingEl) return;
        var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        if (!isMoved) {
            sortingEl.addClass('sorting');
            sortableContainer.addClass('sortable-sorting');
            minTop = sortingEl[0].offsetTop;
            maxTop = sortingEl.parent().height() - sortingEl[0].offsetTop - sortingEl.height();
            sortingElHeight = sortingEl[0].offsetHeight;
        }
        isMoved = true;

        e.preventDefault();
        e.f7PreventPanelSwipe = true;
        touchesDiff = pageY - touchStartY;
        var translate = touchesDiff;
        if (translate < -minTop) translate = -minTop;
        if (translate > maxTop) translate = maxTop;
        sortingEl.transform('translate3d(0,' + translate + 'px,0)');

        insertBefore = insertAfter = undefined;

        sortingItems.each(function () {
            var currentEl = $(this);
            if (currentEl[0] === sortingEl[0]) return;
            var currentElOffset = currentEl[0].offsetTop;
            var currentElHeight = currentEl.height();
            var sortingElOffset = sortingEl[0].offsetTop + translate;

            if ((sortingElOffset >= currentElOffset - currentElHeight / 2) && sortingEl.index() < currentEl.index()) {
                currentEl.transform('translate3d(0, '+(-sortingElHeight)+'px,0)');
                insertAfter = currentEl;
                insertBefore = undefined;
            }
            else if ((sortingElOffset <= currentElOffset + currentElHeight / 2) && sortingEl.index() > currentEl.index()) {
                currentEl.transform('translate3d(0, '+(sortingElHeight)+'px,0)');
                insertAfter = undefined;
                if (!insertBefore) insertBefore = currentEl;
            }
            else {
                $(this).transform('translate3d(0, 0%,0)');
            }
        });
    }
    function handleTouchEnd(e) {
        app.allowPanelOpen = app.allowSwipeout = true;
        if (!isTouched || !isMoved) {
            isTouched = false;
            isMoved = false;
            return;
        }
        e.preventDefault();
        sortingItems.transform('');
        sortingEl.removeClass('sorting');
        sortableContainer.removeClass('sortable-sorting');
        var virtualList, oldIndex, newIndex;
        if (insertAfter) {
            sortingEl.insertAfter(insertAfter);
            sortingEl.trigger('sort sortable:sort', {startIndex: startIndex, newIndex: sortingEl.index()});
        }
        if (insertBefore) {
            sortingEl.insertBefore(insertBefore);
            sortingEl.trigger('sort sortable:sort', {startIndex: startIndex, newIndex: sortingEl.index()});
        }
        if ((insertAfter || insertBefore) && sortableContainer.hasClass('virtual-list')) {
            virtualList = sortableContainer[0].f7VirtualList;
            oldIndex = sortingEl[0].f7VirtualListIndex;
            newIndex = insertBefore ? insertBefore[0].f7VirtualListIndex : insertAfter[0].f7VirtualListIndex;
            if (virtualList) virtualList.moveItem(oldIndex, newIndex);
        }
        insertAfter = insertBefore = undefined;
        isTouched = false;
        isMoved = false;
    }
    $(document).on(app.touchEvents.start, '.list-block.sortable .sortable-handler', handleTouchStart);
    if (app.support.touch) {
        $(document).on(app.touchEvents.move, '.list-block.sortable .sortable-handler', handleTouchMove);
        $(document).on(app.touchEvents.end, '.list-block.sortable .sortable-handler', handleTouchEnd);
    }
    else {
        $(document).on(app.touchEvents.move, handleTouchMove);
        $(document).on(app.touchEvents.end, handleTouchEnd);
    }
};
