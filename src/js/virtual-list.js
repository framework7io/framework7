/*===============================================================================
************   Virtual List   ************
===============================================================================*/
var VirtualList = function (listBlock, params) {
    var defaults = {
        cols: 1,
        height: 44,
        cache: true,
        dynamicHeightBufferSize: 1
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    // Preparation
    var vl = this;
    vl.listBlock = $(listBlock);
    vl.params = params;
    vl.items = params.items;
    if (params.template) {
        if (typeof params.template === 'string') vl.template = t7.compile(params.template);
        else if (typeof params.template === 'function') vl.template = params.template;
    }
    vl.pageContent = vl.listBlock.parents('.page-content');

    // Bad scroll
    var updatableScroll;
    if (typeof vl.params.updatableScroll !== 'undefined') {
        updatableScroll = vl.params.updatableScroll;
    }
    else {
        updatableScroll = true;
        if (app.device.ios && app.device.osVersion.split('.')[0] < 8) {
            updatableScroll = false;
        }
    }
        
    // Append <ul>
    vl.ul = vl.params.ul ? $(vl.params.ul) : vl.listBlock.children('ul');
    if (vl.ul.length === 0) {
        vl.listBlock.append('<ul></ul>');
        vl.ul = vl.listBlock.children('ul');
    }

    // DOM cached items
    vl.domCache = {};
    vl.displayDomCache = {};

    // Temporary DOM Element
    vl.tempDomElement = document.createElement('ul');

    // Last repain position
    vl.lastRepaintY = null;

    // Fragment
    vl.fragment = document.createDocumentFragment();

    // Filter
    vl.filterItems = function (indexes, resetScrollTop) {
        vl.filteredItems = [];
        var firstIndex = indexes[0];
        var lastIndex = indexes[indexes.length - 1];
        for (var i = 0; i < indexes.length; i++) {
            vl.filteredItems.push(vl.items[indexes[i]]);
        }
        if (typeof resetScrollTop === 'undefined') resetScrollTop = true;
        if (resetScrollTop) {
            vl.pageContent[0].scrollTop = 0;
        }
        vl.update();
    };
    vl.resetFilter = function () {
        vl.filteredItems = null;
        delete vl.filteredItems;
        vl.update();
    };

    var pageHeight, rowsPerScreen, rowsBefore, rowsAfter, rowsToRender, maxBufferHeight = 0, listHeight;
    var dynamicHeight = typeof vl.params.height === 'function';

    // Set list size
    vl.setListSize = function () {
        var items = vl.filteredItems || vl.items;
        pageHeight = vl.pageContent[0].offsetHeight;
        if (dynamicHeight) {
            listHeight = 0;
            vl.heights = [];
            for (var i = 0; i < items.length; i++) {
                var itemHeight = vl.params.height(items[i]);
                listHeight += itemHeight;
                vl.heights.push(itemHeight);
            }
        }
        else {
            listHeight = items.length * vl.params.height / vl.params.cols;
            rowsPerScreen = Math.ceil(pageHeight / vl.params.height);
            rowsBefore = vl.params.rowsBefore || rowsPerScreen * 2;
            rowsAfter = vl.params.rowsAfter || rowsPerScreen;
            rowsToRender = (rowsPerScreen + rowsBefore + rowsAfter);
            maxBufferHeight = rowsBefore / 2 * vl.params.height;
        }

        if (updatableScroll) {
            vl.ul.css({height: listHeight + 'px'});
        }
    };

    // Render items
    vl.render = function (force, forceScrollTop) {
        if (force) vl.lastRepaintY = null;

        var scrollTop = -(vl.listBlock[0].getBoundingClientRect().top + vl.pageContent[0].getBoundingClientRect().top);
        if (typeof forceScrollTop !== 'undefined') scrollTop = forceScrollTop;

        if (vl.lastRepaintY === null || Math.abs(scrollTop - vl.lastRepaintY) > maxBufferHeight || (!updatableScroll && (vl.pageContent[0].scrollTop + pageHeight >= vl.pageContent[0].scrollHeight))) {
            vl.lastRepaintY = scrollTop;
        }
        else {
            return;
        }

        var items = vl.filteredItems || vl.items, 
            fromIndex, toIndex, heightBeforeFirstItem = 0, heightBeforeLastItem = 0;
        if (dynamicHeight) {
            var itemTop = 0, j, itemHeight; 
            maxBufferHeight = pageHeight;
            
            for (j = 0; j < vl.heights.length; j++) {
                itemHeight = vl.heights[j];
                if (typeof fromIndex === 'undefined') {
                    if (itemTop + itemHeight >= scrollTop - pageHeight * 2 * vl.params.dynamicHeightBufferSize) fromIndex = j;
                    else heightBeforeFirstItem += itemHeight;
                }
                
                if (typeof toIndex === 'undefined') {
                    if (itemTop + itemHeight >= scrollTop + pageHeight * 2 * vl.params.dynamicHeightBufferSize || j === vl.heights.length - 1) toIndex = j + 1;
                    heightBeforeLastItem += itemHeight;
                }
                itemTop += itemHeight;
            }
            toIndex = Math.min(toIndex, items.length);
        }
        else {
            fromIndex = (parseInt(scrollTop / vl.params.height) - rowsBefore) * vl.params.cols;
            if (fromIndex < 0) {
                fromIndex = 0;
            }
            toIndex = Math.min(fromIndex + rowsToRender * vl.params.cols, items.length);
        }

        var topPosition;
        vl.reachEnd = false;
        for (var i = fromIndex; i < toIndex; i++) {
            var item, index;
            // Define real item index
            index = vl.items.indexOf(items[i]);

            if (i === fromIndex) vl.currentFromIndex = index;
            if (i === toIndex - 1) vl.currentToIndex = index;
            if (index === vl.items.length - 1) vl.reachEnd = true;
            
            // Find items
            if (vl.domCache[index]) {
                item = vl.domCache[index];
            }
            else {
                if (vl.template) {
                    vl.tempDomElement.innerHTML = vl.template(items[i], {index: index});
                }
                else if (vl.params.renderItem) {
                    vl.tempDomElement.innerHTML = vl.params.renderItem(index, items[i]);   
                }
                else {
                    vl.tempDomElement.innerHTML = items[i];
                }
                item = vl.tempDomElement.childNodes[0];
                if (vl.params.cache) vl.domCache[index] = item;
            }
            item.f7VirtualListIndex = index;

            // Set item top position
            if (i === fromIndex) {
                if (dynamicHeight) {
                    topPosition = heightBeforeFirstItem;
                }
                else {
                    topPosition = (i * vl.params.height / vl.params.cols);
                }
            }
            item.style.top = topPosition + 'px';
            
            // Before item insert
            if (vl.params.onItemBeforeInsert) vl.params.onItemBeforeInsert(vl, item);

            // Append item to fragment
            vl.fragment.appendChild(item);

        
        }

        // Update list height with not updatable scroll
        if (!updatableScroll) {
            if (dynamicHeight) {
                vl.ul[0].style.height = heightBeforeLastItem + 'px';
            }
            else {
                vl.ul[0].style.height = i * vl.params.height / vl.params.cols + 'px';
            }
        }
            

        // Update list html
        if (vl.params.onBeforeClear) vl.params.onBeforeClear(vl, vl.fragment);
        vl.ul[0].innerHTML = '';

        if (vl.params.onItemsBeforeInsert) vl.params.onItemsBeforeInsert(vl, vl.fragment);
        vl.ul[0].appendChild(vl.fragment);
        if (vl.params.onItemsAfterInsert) vl.params.onFragmentAfterInsert(vl, vl.fragment);

        if (typeof forceScrollTop !== 'undefined' && force) {
            vl.pageContent.scrollTop(forceScrollTop, 0);
        }
    };

    vl.scrollToItem = function (index) {
        if (index > vl.items.length) return false;

        var itemTop = 0, listTop;
        if (dynamicHeight) {
            for (var i = 0; i < index; i++) {
                itemTop += vl.heights[i];
            }
        }
        else {
            itemTop = index * vl.params.height;
        }
        listTop = vl.listBlock[0].offsetTop;
        vl.render(true, listTop + itemTop - parseInt(vl.pageContent.css('padding-top'), 10));
        return true;
    };

    // Handle scroll event
    vl.handleScroll = function (e) {
        vl.render();
    };
    // Handle resize event
    vl.handleResize = function (e) {
        vl.setListSize();
        vl.render(true);
    };

    vl.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        vl.pageContent[action]('scroll', vl.handleScroll);
        $(window)[action]('resize', vl.handleResize);
    };

    // Init Virtual List
    vl.init = function () {
        vl.attachEvents();
        vl.setListSize();
        vl.render();
    };

    // Append
    vl.appendItems = function (items) {
        for (var i = 0; i < items.length; i++) {
            vl.items.push(items[i]);
        }
        vl.update();
    };
    vl.appendItem = function (item) {
        vl.appendItems([item]);
    };
    // Replace
    vl.replaceAllItems = function (items) {
        vl.items = items;
        delete vl.filteredItems;
        vl.domCache = {};
        vl.update();
    };
    vl.replaceItem = function (index, item) {
        vl.items[index] = item;
        if (vl.params.cache) delete vl.domCache[index];
        vl.update();
    };
    // Prepend
    vl.prependItems = function (items) {
        for (var i = items.length - 1; i >= 0; i--) {
            vl.items.unshift(items[i]);
        }
        if (vl.params.cache) {
            var newCache = {};
            for (var cached in vl.domCache) {
                newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
            }
            vl.domCache = newCache;
        }
        vl.update();
    };
    vl.prependItem = function (item) {
        vl.prependItems([item]);
    };

    // Move
    vl.moveItem = function (oldIndex, newIndex) {
        if (oldIndex === newIndex) return;
        // remove item from array
        var item = vl.items.splice(oldIndex, 1)[0];
        if (newIndex >= vl.items.length) {
            // Add item to the end
            vl.items.push(item);
            newIndex = vl.items.length - 1;
        }
        else {
            // Add item to new index
            vl.items.splice(newIndex, 0, item);
        }
        // Update cache
        if (vl.params.cache) {
            var newCache = {};
            for (var cached in vl.domCache) {
                var cachedIndex = parseInt(cached, 10);
                var leftIndex = oldIndex < newIndex ? oldIndex : newIndex;
                var rightIndex = oldIndex < newIndex ? newIndex : oldIndex;
                var indexShift = oldIndex < newIndex ? -1 : 1;
                if (cachedIndex < leftIndex || cachedIndex > rightIndex) newCache[cachedIndex] = vl.domCache[cachedIndex];
                if (cachedIndex === leftIndex) newCache[rightIndex] = vl.domCache[cachedIndex];
                if (cachedIndex > leftIndex && cachedIndex <= rightIndex) newCache[cachedIndex + indexShift] = vl.domCache[cachedIndex];
            }
            vl.domCache = newCache;
        }
        vl.update();
    };
    // Insert before
    vl.insertItemBefore = function (index, item) {
        if (index === 0) {
            vl.prependItem(item);
            return;
        }
        if (index >= vl.items.length) {
            vl.appendItem(item);
            return;
        }
        vl.items.splice(index, 0, item);
        // Update cache
        if (vl.params.cache) {
            var newCache = {};
            for (var cached in vl.domCache) {
                var cachedIndex = parseInt(cached, 10);
                if (cachedIndex >= index) {
                    newCache[cachedIndex + 1] = vl.domCache[cachedIndex];
                }
            }
            vl.domCache = newCache;
        }
        vl.update();
    };
    // Delete
    vl.deleteItems = function (indexes) {
        var prevIndex, indexShift = 0;
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i];
            if (typeof prevIndex !== 'undefined') {
                if (index > prevIndex) {
                    indexShift = -i;
                }
            }
            index = index + indexShift;
            prevIndex = indexes[i];
            // Delete item
            var deletedItem = vl.items.splice(index, 1)[0];
            
            // Delete from filtered
            if (vl.filteredItems && vl.filteredItems.indexOf(deletedItem) >= 0) {
                vl.filteredItems.splice(vl.filteredItems.indexOf(deletedItem), 1);
            }
            // Update cache
            if (vl.params.cache) {
                var newCache = {};
                for (var cached in vl.domCache) {
                    var cachedIndex = parseInt(cached, 10);
                    if (cachedIndex === index) {
                        delete vl.domCache[index];
                    }
                    else if (parseInt(cached, 10) > index) {
                        newCache[cachedIndex - 1] = vl.domCache[cached];
                    }
                    else {
                        newCache[cachedIndex] = vl.domCache[cached];   
                    }
                }
                vl.domCache = newCache;
            }
        }
        vl.update();
    };
    vl.deleteAllItems = function () {
        vl.items = [];
        delete vl.filteredItems;
        if (vl.params.cache) vl.domCache = {};
        vl.update();
    };
    vl.deleteItem = function (index) {
        vl.deleteItems([index]);
    };

    // Clear cache
    vl.clearCache = function () {
        vl.domCache = {};
    };

    // Update Virtual List
    vl.update = function () {
        vl.setListSize();
        vl.render(true);
    };

    // Destroy
    vl.destroy = function () {
        vl.attachEvents(true);
        delete vl.items;
        delete vl.domCache;
    };

    // Init Virtual List
    vl.init();

    // Store vl in container
    vl.listBlock[0].f7VirtualList = vl;
    return vl;
};

// App Method
app.virtualList = function (listBlock, params) {
    return new VirtualList(listBlock, params);
};

app.reinitVirtualList = function (pageContainer) {
    var page = $(pageContainer);
    var vlists = page.find('.virtual-list');
    if (vlists.length === 0) return;
    for (var i = 0; i < vlists.length; i++) {
        var vlistInstance = vlistInstance[0].f7VirtualList;
        if (vlistInstance) {
            vlistInstance.update();
        }
    }
};