/*======================================================
************   Messagebar   ************
======================================================*/
app.initMessagebar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
    if (messagebar.length === 0) return;
    var textarea = messagebar.find('textarea');
    var pageContent = messagebar.parents('.page').find('.page-content');
    var initialBarHeight = messagebar[0].offsetHeight;
    var initialAreaHeight = textarea[0].offsetHeight;

    //Prevent submit
    function preventSubmit(e) {
        e.preventDefault();
    }

    // Resize textarea
    function sizeTextarea() {
        
        // Reset
        textarea.css({'height': ''});
        
        var height = textarea[0].offsetHeight;
        var diff = height - textarea[0].clientHeight;
        var scrollHeight = textarea[0].scrollHeight;
        // Update
        if (scrollHeight + diff > height) {
            var newAreaHeight = scrollHeight + diff;
            var newBarHeight = initialBarHeight + (newAreaHeight - initialAreaHeight);
            var maxBarHeight = $(messagebar).parents('.view')[0].offsetHeight - 88;
            if (newBarHeight > maxBarHeight) {
                newBarHeight = maxBarHeight;
                newAreaHeight = newBarHeight - initialBarHeight + initialAreaHeight;
            }
            textarea.css('height', newAreaHeight + 'px');
            messagebar.css('height', newBarHeight + 'px');
            if (pageContent.length > 0) {
                pageContent.css('padding-bottom', newBarHeight + 'px');
                pageContent.scrollTop(pageContent[0].scrollHeight - pageContent[0].offsetHeight);
            }
        }
        else {
            if (pageContent.length > 0) {
                messagebar.css({'height': ''});
                pageContent.css({'padding-bottom': ''});
            }
        }
    }
    var to;
    function handleKey(e) {
        clearTimeout(to);
        to = setTimeout(function () {
            sizeTextarea();
        }, 0);
            
    }

    function attachEvents(destroy) {
        var method = destroy ? 'off' : 'on';
        messagebar[method]('submit', preventSubmit);
        textarea[method]('change keydown keypress keyup paste cut', handleKey);
    }
    function detachEvents() {
        attachEvents(true);
    }
    
    messagebar[0].f7DestroyMessagebar = detachEvents;

    // Attach events
    attachEvents();

    // Destroy on page remove
    function pageBeforeRemove() {
        detachEvents();
        pageContainer.off('pageBeforeRemove', pageBeforeRemove);
    }
    if (pageContainer.hasClass('page')) {
        pageContainer.on('pageBeforeRemove', pageBeforeRemove);
    }
};
app.destroyMessagebar = function (pageContainer) {
    pageContainer = $(pageContainer);
    var messagebar = pageContainer.hasClass('messagebar') ? pageContainer : pageContainer.find('.messagebar');
    if (messagebar.length === 0) return;
    if (messagebar[0].f7DestroyMessagebar) messagebar[0].f7DestroyMessagebar();
};