/*===============================================================================
************   Virtual List   ************
===============================================================================*/
var VirtualList = function (listBlock, params) {
    var defaults = {
        cols: 1
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    /* @params example:
    {
        items: [] //array of full HTML elements or elements with data if template is specified
        rowsBefore: 10,
        rowsAfter: 10,
        cols:1,
        template: '' //template7 string 
        updatableScroll: true/false,
        searchAll: function(query, items) ,
        searchByItem: function(query, index, item) ,
        renderItem: function (item, index) {
            return 'item string' 
        }
    }
    */

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
    vl.ul = vl.listBlock.children('ul');
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

    // Set indexes
    vl.setIndexes = function () {
        for (var i = 0; i < vl.items.length; i++) {
            vl.items[i]._virtualIndex = i;
        }
    };

    // Filter
    vl.filter = function (indexes) {
        vl.filteredItems = [];
        var firstIndex = indexes[0];
        var lastIndex = indexes[indexes.length - 1];
        for (var i = 0; i < indexes.length; i++) {
            vl.filteredItems.push(vl.items[indexes[i]]);
        }
        vl.update();
    };
    vl.resetFilter = function () {
        vl.filteredItems = null;
        delete vl.filteredItems;
        vl.update();
    };

    // Set list size
    vl.setListSize = function () {
        var items = vl.filteredItems || vl.items;
        if (updatableScroll) {
            vl.ul.css({height: items.length * vl.params.height + 'px'});
        }
        vl.pageHeight = vl.pageContent[0].offsetHeight;
        vl.rowsPerScreen = Math.ceil(vl.pageHeight / vl.params.height);
        vl.rowsBefore = vl.params.rowsBefore || vl.rowsPerScreen;
        vl.rowsAfter = vl.params.rowsAfter || vl.rowsPerScreen;
        vl.rowsToRender = (vl.rowsPerScreen + vl.rowsBefore + vl.rowsAfter) * vl.params.cols;
        vl.maxBufferHeight = vl.rowsBefore * vl.params.height;
    };

    // Set items (inser/remove/replace)
    vl.renderItems = function (force) {
        if (force) vl.lastRepaintY = null;
        var scrollTop = vl.pageContent[0].scrollTop;
        var fromPos = parseInt(scrollTop / vl.params.height) - vl.rowsBefore;
        if (fromPos < 0) {
            fromPos = 0;
        }
        if (!vl.lastRepaintY || Math.abs(scrollTop - vl.lastRepaintY) > vl.maxBufferHeight || (!updatableScroll && (scrollTop + vl.pageHeight >= vl.pageContent[0].scrollHeight))) {
            vl.lastRepaintY = scrollTop;
        }
        else {
            return;
        }

        var items = vl.filteredItems || vl.items;
        var finalItem = Math.min(fromPos + vl.rowsToRender, items.length);
        for (var i = fromPos; i < finalItem; i++) {
            var item;
            if (vl.domCache[items[i]._virtualIndex]) {
                item = vl.domCache[items[i]._virtualIndex];
            }
            else {
                if (vl.template) {
                    vl.tempDomElement.innerHTML = vl.template(items[i], {index: items[i]._virtualIndex});
                }
                else if (vl.params.renderItem) {
                    vl.tempDomElement.innerHTML = vl.params.renderItem(items[i], items[i]._virtualIndex);   
                }
                else {
                    vl.tempDomElement.innerHTML = items[i];
                }
                item = vl.tempDomElement.childNodes[0];
                
                vl.domCache[items[i]._virtualIndex] = item;
            }
                

            item.style.top = (i * vl.params.height) + 'px';
            vl.fragment.appendChild(item);
            if (!updatableScroll) {
                vl.ul[0].style.height = (i + 1) * vl.params.height + 'px';
            }
        }
        vl.ul[0].innerHTML = '';
        vl.ul[0].appendChild(vl.fragment);
    };

    // Handle scroll event
    vl.handleScroll = function (e) {
        vl.renderItems();
    };
    // Handle resize event
    vl.handleResize = function (e) {
        vl.setListSize();
        vl.renderItems(true);
    };

    vl.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        vl.pageContent[action]('scroll', vl.handleScroll);
        $(window)[action]('resize', vl.handleResize);
    };

    // Init Virtual List
    vl.init = function () {
        vl.attachEvents();
        vl.setIndexes();
        vl.setListSize();
        vl.renderItems();
    };

    // Append/Prepend
    vl.appendItems = function (items) {
        for (var i = 0; i < items.length; i++) {
            vl.items.push(items[i]);
        }
        vl.setIndexes();
        vl.update();
    };
    vl.appendItem = function (item) {
        vl.appendItems([item]);
    };
    vl.replaceItem = function (index, item) {
        vl.items[index] = item;
        delete vl.domCache[index];
        vl.setIndexes();
        vl.update();
    };
    
    vl.prependItems = function (items) {
        for (var i = items.length - 1; i >= 0; i--) {
            vl.items.unshift(items[i]);
        }
        var newCache = {};
        for (var cached in vl.domCache) {
            newCache[parseInt(cached, 10) + items.length] = vl.domCache[cached];
        }
        vl.domCache = newCache;
        vl.setIndexes();
        vl.update();
    };
    vl.prependItem = function (item) {
        vl.prependItems([item]);
    };

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
        vl.setIndexes();
        vl.update();
    };
    vl.deleteItem = function (index) {
        vl.deleteItems([index]);
    };

    // Update Virtual List
    vl.update = function () {
        vl.setListSize();
        vl.renderItems(true);
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