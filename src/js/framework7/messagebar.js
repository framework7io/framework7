/*======================================================
************   Messagebar   ************
======================================================*/
var Messagebar = function (container, params) {
    var defaults = {
        textarea: null,
        maxHeight: null,
    };
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined' || params[def] === null) {
            params[def] = defaults[def];
        }
    }
    
    // Instance
    var m = this;

    // Params
    m.params = params;

    // Container
    m.container = $(container);
    if (m.container.length === 0) return;

    // Textarea
    m.textarea = m.params.textarea ? $(m.params.textarea) : m.container.find('textarea');

    // Is In Page
    m.pageContainer = m.container.parents('.page').eq(0);
    m.pageContent = m.pageContainer.find('.page-content');

    // Initial Sizes
    m.pageContentPadding = parseInt(m.pageContent.css('padding-bottom'));
    m.initialBarHeight = m.container[0].offsetHeight;
    m.initialAreaHeight = m.textarea[0].offsetHeight;
    

    // Resize textarea
    m.sizeTextarea = function () {
        // Reset
        m.textarea.css({'height': ''});
        
        var height = m.textarea[0].offsetHeight;
        var diff = height - m.textarea[0].clientHeight;
        var scrollHeight = m.textarea[0].scrollHeight;

        // Update
        if (scrollHeight + diff > height) {
            var newAreaHeight = scrollHeight + diff;
            var newBarHeight = m.initialBarHeight + (newAreaHeight - m.initialAreaHeight);
            var maxBarHeight = m.params.maxHeight || m.container.parents('.view')[0].offsetHeight - 88;
            if (newBarHeight > maxBarHeight) {
                newBarHeight = parseInt(maxBarHeight, 10);
                newAreaHeight = newBarHeight - m.initialBarHeight + m.initialAreaHeight;
            }
            m.textarea.css('height', newAreaHeight + 'px');
            m.container.css('height', newBarHeight + 'px');
            var onBottom = (m.pageContent[0].scrollTop === m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight);
            if (m.pageContent.length > 0) {
                m.pageContent.css('padding-bottom', newBarHeight + 'px');
                if (m.pageContent.find('.messages-new-first').length === 0 && onBottom) {
                    m.pageContent.scrollTop(m.pageContent[0].scrollHeight - m.pageContent[0].offsetHeight);
                }
            }
        }
        else {
            if (m.pageContent.length > 0) {
                m.container.css({'height': '', 'bottom': ''});
                m.pageContent.css({'padding-bottom': ''});
            }
        }
    };
    
    // Clear
    m.clear = function () {
        m.textarea.val('').trigger('change');
    };
    m.value = function (value) {
        if (typeof value === 'undefined') return m.textarea.val();
        else m.textarea.val(value).trigger('change');  
    };
    
    // Handle textarea
    m.textareaTimeout = undefined;
    m.handleTextarea = function (e) {
        clearTimeout(m.textareaTimeout);
        m.textareaTimeout = setTimeout(function () {
            m.sizeTextarea();
        }, 0);
    };

    //Events
    function preventSubmit(e) {
        e.preventDefault();
    }

    m.attachEvents = function (destroy) {
        var method = destroy ? 'off' : 'on';
        m.container[method]('submit', preventSubmit);
        m.textarea[method]('change keydown keypress keyup paste cut', m.handleTextarea);
    };
    m.detachEvents = function () {
        m.attachEvents(true);
    };
    
    // Init Destroy
    m.init = function () {
        m.attachEvents();
    };
    m.destroy = function () {
        m.detachEvents();
        m = null;
    };

    // Init
    m.init();

    m.container[0].f7Messagebar = m;
    return m;
};
app.messagebar = function (container, params) {
    return new Messagebar(container, params);
};
app.initPageMessagebar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
    if (messagebar.length === 0) return;
    if (!messagebar.hasClass('messagebar-init')) return;
    var mb = app.messagebar(messagebar, messagebar.dataset());

    // Destroy on page remove
    function pageBeforeRemove() {
        mb.destroy();
        pageContainer.off('page:beforeremove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('page:beforeremove', pageBeforeRemove);
    }
};