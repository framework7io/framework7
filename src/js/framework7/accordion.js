/*===============================================================================
************   Accordion   ************
===============================================================================*/
app.accordionToggle = function (item) {
    item = $(item);
    if (item.length === 0) return;
    var itemsForClose = item.filter(function(item) {
        return !item.dataset.closeManual;
    });
    if (itemsForClose.hasClass('accordion-item-expanded')) app.accordionClose(itemsForClose);
    else app.accordionOpen(item);
};
app.accordionOpen = function (item) {
    item = $(item);
    var list = item.parents('.accordion-list').eq(0);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    var expandedItem = list.find('.accordion-item-expanded').filter(function(item) {
        return !item.dataset.closeManual;
    });
    if (expandedItem.length) {
        app.accordionClose(expandedItem);
    }
    content.css('height', content[0].scrollHeight + 'px').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened accordion:opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed accordion:closed');
        }
    });
    item.trigger('open accordion:open');
    item.addClass('accordion-item-expanded');
};
app.accordionClose = function (item) {
    item = $(item);
    var content = item.children('.accordion-item-content');
    if (content.length === 0) content = item.find('.accordion-item-content');
    item.removeClass('accordion-item-expanded');
    content.transition(0);
    content.css('height', content[0].scrollHeight + 'px');
    // Relayout
    var clientLeft = content[0].clientLeft;
    // Close
    content.transition('');
    content.css('height', '').transitionEnd(function () {
        if (item.hasClass('accordion-item-expanded')) {
            content.transition(0);
            content.css('height', 'auto');
            var clientLeft = content[0].clientLeft;
            content.transition('');
            item.trigger('opened accordion:opened');
        }
        else {
            content.css('height', '');
            item.trigger('closed accordion:closed');
        }
    });
    item.trigger('close accordion:close');
};
