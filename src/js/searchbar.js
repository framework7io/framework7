/*======================================================
************   Searchbar   ************
======================================================*/
var Searchbar = function (container, params) {
    var defaults = {
        input: null,
        clearButton: null,
        cancelButton: null,
        searchList: null,
        searchIn: '.item-title',
        searchBy: '',
        found: null,
        notFound: null,
        overlay: null,
        ignore: '.searchbar-ignore'
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined' || params[def] === null) {
            params[def] = defaults[def];
        }
    }
    
    // Instance
    var s = this;

    // Params
    s.params = params;

    // Container
    container = $(container);
    s.container = container;

    // Active
    s.active = false;

    // Input
    s.input = s.params.input ? $(s.params.input) : s.container.find('input[type="search"]');
    s.clearButton = s.params.clearButton ? $(s.params.clearButton) : s.container.find('.searchbar-clear');
    s.cancelButton = s.params.cancelButton ? $(s.params.cancelButton) : s.container.find('.searchbar-cancel');

    // Search List
    s.searchList = $(s.params.searchList);

    // Is Virtual List
    s.isVirtualList = s.searchList.hasClass('virtual-list');

    // Is In Page
    s.pageContainer = s.container.parents('.page').eq(0);

    // Overlay
    if (!s.params.overlay) {
        s.overlay = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-overlay') : $('.searchbar-overlay');
    }
    else {
        s.overlay = $(s.params.overlay);
    }
    // Found and not found
    if (!s.params.found) {
        s.found = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-found') : $('.searchbar-found');
    }
    else {
        s.found = $(s.params.found);
    }
    if (!s.params.notFound) {
        s.notFound = s.pageContainer.length > 0 ? s.pageContainer.find('.searchbar-not-found') : $('.searchbar-not-found');
    }
    else {
        s.notFound = $(s.params.notFound);
    }

    // Cancel button
    var cancelMarginProp = app.rtl ? 'margin-left' : 'margin-right';
    if (s.cancelButton.length > 0) {
        s.cancelButton.show();
        s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');
    }

    // Enable/disalbe
    s.enable = function () {
        function _enable() {
            if (s.searchList.length && !s.container.hasClass('searchbar-active')) s.overlay.addClass('searchbar-overlay-active');
            s.container.addClass('searchbar-active');
            if (s.cancelButton.length > 0) s.cancelButton.css(cancelMarginProp, '0px');
            s.searchList.trigger('enableSearch');
            s.active = true;
        }
        if (app.device.ios) {
            setTimeout(function () {
                _enable();
            }, 400);
        }
        else {
            _enable();
        }
    };

    s.disable = function () {
        s.input.val('').trigger('change');
        s.container.removeClass('searchbar-active searchbar-not-empty');
        if (s.cancelButton.length > 0) s.cancelButton.css(cancelMarginProp, -s.cancelButton[0].offsetWidth + 'px');
        
        if (s.searchList.length) s.overlay.removeClass('searchbar-overlay-active');
        function _disable() {
            s.input.blur();
            s.searchList.trigger('disableSearch');
            s.active = false;
        }
        if (app.device.ios) {
            setTimeout(function () {
                _disable();
            }, 400);
        }
        else {
            _disable();
        }
    };

    // Clear
    s.clear = function () {
        s.input.val('').trigger('change').focus();
        s.searchList.trigger('clearSearch');
    };

    // Search
    s.handleInput = function () {
        setTimeout(function () {
            var value = s.input.val().trim();
            if (s.searchList.length > 0 && (s.params.searchIn || s.isVirtualList)) s.search(value, true);
        }, 0);
    };

    var previousQuery;
    var virtualList;
    s.search = function (query, internal) {
        if (query.trim() === previousQuery) return;
        previousQuery = query.trim();

        if (!internal) {
            if (!s.active) {
                s.enable();
            }
            if (!internal) {
                s.input.val(query);
            }
        }
        // Add active/inactive classes on overlay
        if (query.length === 0) {
            s.container.removeClass('searchbar-not-empty');
            if (s.searchList.length && s.container.hasClass('searchbar-active')) s.overlay.addClass('searchbar-overlay-active');
        }
        else {
            s.container.addClass('searchbar-not-empty');
            if (s.searchList.length && s.container.hasClass('searchbar-active')) s.overlay.removeClass('searchbar-overlay-active');
        }

        var values = query.trim().toLowerCase().split(' ');
        var foundItems = [];
        if (s.isVirtualList) {
            virtualList = s.searchList[0].f7VirtualList;
            if (query.trim() === '') {
                virtualList.resetFilter();
                s.notFound.hide();
                s.found.show();
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
            s.searchList.find('li').removeClass('hidden-by-searchbar').each(function (index, el) {
                el = $(el);
                var compareWithEl = el.find(s.params.searchIn);
                if (compareWithEl.length === 0) return;
                var compareWith;
                compareWith = compareWithEl.text().trim().toLowerCase();
                var wordsMatch = 0;
                for (var i = 0; i < values.length; i++) {
                    if (compareWith.indexOf(values[i]) >= 0) wordsMatch++;
                }
                if (wordsMatch !== values.length && !(s.params.ignore && el.is(s.params.ignore))) {
                    el.addClass('hidden-by-searchbar');
                }
                else {
                    foundItems.push(el[0]);
                }
            });

            if (app.params.searchbarHideDividers) {
                s.searchList.find('.item-divider, .list-group-title').each(function () {
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
                    var ignore = s.params.ignore && title.is(s.params.ignore);
                    if (hide && !ignore) title.addClass('hidden-by-searchbar');
                    else title.removeClass('hidden-by-searchbar');
                });
            }
            if (app.params.searchbarHideGroups) {
                s.searchList.find('.list-group').each(function () {
                    var group = $(this);
                    var ignore = s.params.ignore && group.is(s.params.ignore);
                    var notHidden = group.find('li:not(.hidden-by-searchbar)');
                    if (notHidden.length === 0 && !ignore) {
                        group.addClass('hidden-by-searchbar');
                    }
                    else {
                        group.removeClass('hidden-by-searchbar');
                    }
                });
            }
        }
        s.searchList.trigger('search', {query: query, foundItems: foundItems});
        if (foundItems.length === 0) {
            s.notFound.show();
            s.found.hide();
        }
        else {
            s.notFound.hide();
            s.found.show();
        }
        if (s.isVirtualList) {
            virtualList.filterItems(foundItems);
        }
    };

    // Events
    function preventSubmit(e) {
        e.preventDefault();
    }

    s.attachEvents = function (destroy) {
        var method = destroy ? 'off' : 'on';
        s.container[method]('submit', preventSubmit);
        s.cancelButton[method]('click', s.disable);
        s.overlay[method]('click', s.disable);
        s.input[method]('focus', s.enable);
        s.input[method]('change keydown keypress keyup', s.handleInput);
        s.clearButton[method]('click', s.clear);
    };
    s.detachEvents = function() {
        s.attachEvents(true);
    };

    // Init Destroy
    s.init = function () {
        s.attachEvents();
    };
    s.destroy = function () {
        s.detachEvents();
        s = null;
    };

    // Init
    s.init();

    s.container[0].f7Searchbar = s;
    return s;

};
app.searchbar = function (container, params) {
    return new Searchbar(container, params);
};
app.initPageSearchbar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var searchbar = pageContainer.hasClass('searchbar') ? pageContainer : pageContainer.find('.searchbar');
    if (searchbar.length === 0) return;
    if (!searchbar.hasClass('searchbar-init')) return;
    var sb = app.searchbar(searchbar, searchbar.dataset());

    // Destroy on page remove
    function pageBeforeRemove() {
        sb.destroy();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
        
};