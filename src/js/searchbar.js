/*======================================================
************   Searchbar   ************
======================================================*/
app.initSearchbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var searchbar = pageContainer.hasClass('searchbar') ? pageContainer : pageContainer.find('.searchbar');
    if (searchbar.length === 0) return;
    if (!pageContainer.hasClass('page')) pageContainer = searchbar.parents('.page').eq(0);
    var searchbarOverlay = pageContainer.hasClass('page') ? pageContainer.find('.searchbar-overlay') : $('.searchbar-overlay');
    var input = searchbar.find('input[type="search"]');
    var clear = searchbar.find('.searchbar-clear');
    var cancel = searchbar.find('.searchbar-cancel');
    var searchList = $(searchbar.attr('data-search-list'));
    var isVirtualList = searchList.hasClass('virtual-list');
    var virtualList;
    var searchIn = searchbar.attr('data-search-in');
    var searchBy = searchbar.attr('data-search-by');
    var found = searchbar.attr('data-searchbar-found');
    if (!found) {
        found = pageContainer.find('.searchbar-found');
        if (found.length === 0) found = $('.searchbar-found');
    }
    else {
        found = $(found);
    }
    var notFound = searchbar.attr('data-searchbar-not-found');
    if (!notFound) {
        notFound = pageContainer.find('.searchbar-not-found');
        if (notFound.length === 0) notFound = $('.searchbar-not-found');
    }
    else {
        notFound = $(notFound);
    }

    // Cancel button
    var cancelMarginProp = app.rtl ? 'margin-left' : 'margin-right';
    if (cancel.length > 0) {
        cancel.show();
        cancel.css(cancelMarginProp, -cancel[0].offsetWidth + 'px');
    }
        

    // Handlers
    function disableSearchbar() {
        input.val('').trigger('change');
        searchbar.removeClass('searchbar-active searchbar-not-empty');
        if (cancel.length > 0) cancel.css(cancelMarginProp, -cancel[0].offsetWidth + 'px');
        
        if (searchList) searchbarOverlay.removeClass('searchbar-overlay-active');
        if (app.device.ios) {
            setTimeout(function () {
                input.blur();
                searchList.trigger('disableSearch');
            }, 400);
        }
        else {
            input.blur();
            searchList.trigger('disableSearch');
        }
    }

    // Activate
    function enableSearchbar() {
        if (app.device.ios) {
            setTimeout(function () {
                if (searchList && !searchbar.hasClass('searchbar-active')) searchbarOverlay.addClass('searchbar-overlay-active');
                searchbar.addClass('searchbar-active');
                if (cancel.length > 0) cancel.css(cancelMarginProp, '0px');
                searchList.trigger('enableSearch');

            }, 400);
        }
        else {
            if (searchList && !searchbar.hasClass('searchbar-active')) searchbarOverlay.addClass('searchbar-overlay-active');
            searchbar.addClass('searchbar-active');
            if (cancel.length > 0) cancel.css(cancelMarginProp, '0px');
            searchList.trigger('enableSearch');
        }
    }

    // Clear
    function clearSearchbar() {
        input.val('').trigger('change').focus();
        searchList.trigger('clearSearch');
    }

    // Change
    function searchValue() {
        setTimeout(function () {
            var value = input.val().trim();
            if (value.length === 0) {
                searchbar.removeClass('searchbar-not-empty');
                if (searchList && searchbar.hasClass('searchbar-active')) searchbarOverlay.addClass('searchbar-overlay-active');
            }
            else {
                searchbar.addClass('searchbar-not-empty');
                if (searchList && searchbar.hasClass('searchbar-active')) searchbarOverlay.removeClass('searchbar-overlay-active');
            }
            if (searchList.length > 0 && (searchIn || isVirtualList)) search(value);
        }, 0);
    }

    //Prevent submit
    function preventSubmit(e) {
        e.preventDefault();
    }

    function attachEvents(destroy) {
        var method = destroy ? 'off' : 'on';
        searchbar[method]('submit', preventSubmit);
        cancel[method]('click', disableSearchbar);
        searchbarOverlay[method]('click', disableSearchbar);
        input[method]('focus', enableSearchbar);
        input[method]('change keydown keypress keyup', searchValue);
        clear[method]('click', clearSearchbar);
    }
    function detachEvents() {
        attachEvents(true);
    }
    searchbar[0].f7DestroySearchbar = detachEvents;

    // Attach events
    attachEvents();

    // Search
    var previousQuery;
    function search(query) {
        if (query.trim() === previousQuery) return;
        previousQuery = query.trim();
        var values = query.trim().toLowerCase().split(' ');
        var foundItems = [];
        if (isVirtualList) {
            virtualList = searchList[0].f7VirtualList;
            if (query.trim() === '') {
                virtualList.resetFilter();
                notFound.hide();
                found.show();
                return;
            }
            if (virtualList.params.searchAll) {
                foundItems = virtualList.params.searchAll(query, virtualList.items) || [];
            }
            else if (virtualList.params.searchByItem) {
                for (var i = 0; i < virtualList.items.length; i++) {
                    if(virtualList.params.searchByItem(query, i, virtualList.params.items[i])) {
                        foundItems.push(i);
                    }
                }
            }
        }
        else {
            searchIn = searchbar.attr('data-search-in');
            searchList.find('li').removeClass('hidden-by-searchbar').each(function (index, el) {
                el = $(el);
                var compareWithEl = el.find(searchIn);
                if (compareWithEl.length === 0) return;
                var compareWith;
                compareWith = compareWithEl.text().trim().toLowerCase();
                var wordsMatch = 0;
                for (var i = 0; i < values.length; i++) {
                    if (compareWith.indexOf(values[i]) >= 0) wordsMatch++;
                }
                if (wordsMatch !== values.length) {
                    el.addClass('hidden-by-searchbar');
                }
                else {
                    foundItems.push(el[0]);
                }
            });

            if (app.params.searchbarHideDividers) {
                searchList.find('.item-divider, .list-group-title').each(function () {
                    var title = $(this);
                    var nextElements = title.nextAll('li');
                    var hide = true;
                    for (var i = 0; i < nextElements.length; i++) {
                        var nextEl = $(nextElements[i]);
                        if (nextEl.hasClass('list-group-title') || nextEl.hasClass('item-divider')) break;
                        if (!nextEl.hasClass('hidden-by-searchbar')) {
                            hide = false;
                        }
                    }
                    if (hide) title.addClass('hidden-by-searchbar');
                    else title.removeClass('hidden-by-searchbar');
                });
            }
            if (app.params.searchbarHideGroups) {
                searchList.find('.list-group').each(function () {
                    var group = $(this);
                    var notHidden = group.find('li:not(.hidden-by-searchbar)');
                    if (notHidden.length === 0) {
                        group.addClass('hidden-by-searchbar');
                    }
                    else {
                        group.removeClass('hidden-by-searchbar');
                    }
                });
            }
        }
        searchList.trigger('search', {query: query, foundItems: foundItems});
        if (foundItems.length === 0) {
            notFound.show();
            found.hide();
        }
        else {
            notFound.hide();
            found.show();
        }
        if (isVirtualList) {
            virtualList.filterItems(foundItems);
        }
    }

    // Destroy on page remove
    function pageBeforeRemove() {
        detachEvents();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
        
};
app.destroySearchbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var searchbar = pageContainer.hasClass('searchbar') ? pageContainer : pageContainer.find('.searchbar');
    if (searchbar.length === 0) return;
    if (searchbar[0].f7DestroySearchbar) searchbar[0].f7DestroySearchbar();
};
