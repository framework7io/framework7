/*===============================================================================
************   Contacts List ************
===============================================================================*/

var Index = function(params) {
    var defaults = {
        indexListTemplate: '{{#indexes}}<li data-index={{@index}}><strong>{{this}}</strong></li>{{/indexes}}'
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    this.params = params;
    this.tpl = t7(this.params.indexListTemplate).compile();
};

Index.prototype.render = function(list) {
    this.list = $(list || '.list');
    this.draw();
};

Index.prototype.draw = function() {
    if(this.indexList) this.indexList.remove();
    this.titles = this.list.find('.list-group-title');
    var titleTexts = Array.prototype.map.call(this.titles, function(t) {
        return $(t).data('index') || $(t).text();
    });

    this.indexList = $('<ul class="contacts-block-index"></ul>').appendTo(this.list.parents('.page'));
    this.indexList.html(this.tpl({indexes: titleTexts}));
    this.content = this.list.parents('.page-content');
    this.bind();
};

Index.prototype.bind = function(destroy) {
    var method = destroy ? 'off' : 'on';
    this.indexList[method](app.touchEvents.start, this.touchStart.bind(this));
    this.indexList[method](app.touchEvents.start + ' ' + app.touchEvents.move, this.touchMove.bind(this));
    this.indexList[method](app.touchEvents.end, this.touchEnd.bind(this));
}

Index.prototype.touchStart = function() {
    this.touching = true;
    this.contentPaddingTop = parseInt(this.content.css("padding-top"));
};

Index.prototype.touchMove = function(e) {
    if(!this.touching) return;
    e.preventDefault();
    var li = this.getElementOnTouch(e);
    if(!li) return;
    var title = this.titles.eq(li.data('index'));
    var titleTop = title.parent().offset().top; // if a element has class list-group-title, it will be sticky in safari, so it's offset is not correct
    var top =  titleTop + this.content.scrollTop() - this.contentPaddingTop;
    this.content.scrollTop(top);
};

Index.prototype.touchEnd = function() {
    this.touching = false;
};

Index.prototype.getElementOnTouch = function(e) {
    var result = null;

    var x = /touch/.test(e.type) ? e.targetTouches[0].pageX : e.pageX;
    var y = /touch/.test(e.type) ? e.targetTouches[0].pageY : e.pageY;
    this.indexList.find('li').each(function() {
        if(result) return;
        var $this = $(this);
        var offset = $this.offset();
        if(offset.top < y && offset.top + $this.outerHeight() > y) {
            result = $this;
        }
    });
    return result;
};

Index.prototype.destroy = function() {
    this.bind(true);
};

app.initContactsList = function(pageContainer) {
    pageContainer = $(pageContainer);
    var selects;
    if (pageContainer.is('.contacts-block')) {
        selects = pageContainer;
    } else {
        selects = pageContainer.find('.contacts-block');
    }
    selects.each(function() {
        var index = new Index(params).render(this);
        if (pageContainer.hasClass('page')) {
            pageContainer.once('pageBeforeRemove', function() { index.destroy() });   
        }
    });
};
