/*======================================================
************   Handle Browser's History   ************
======================================================*/
app.pushStateQueue = [];
app.pushStateClearQueue = function () {
    if (app.pushStateQueue.length === 0) return;
    var queue = app.pushStateQueue.pop();
    var animatePages;
    if (app.params.pushStateNoAnimation === true) animatePages = false;
    if (queue.action === 'goBack') {
        app.goBack(queue.view, {animatePages: animatePages});
    }
    if (queue.action === 'loadPage') {
        app.loadPage(queue.view, {url: queue.stateUrl, animatePages: animatePages, pushState: false});
    }
    if (queue.action === 'loadContent') {
        app.loadPage(queue.view, {content: queue.stateContent, animatePages: animatePages, pushState: false});
    }
    if (queue.action === 'loadPageName') {
        app.loadPage(queue.view, {pageName: queue.statePageName, animatePages: animatePages, pushState: false});
    }
};

app.initPushState = function () {
    var blockPopstate = true;
    $(window).on('load', function () {
        setTimeout(function () {
            blockPopstate = false;
        }, 0);
    });
    function handlePopState(e) {
        if (blockPopstate) return;
        var mainView;
        for (var i = 0; i < app.views.length; i++) {
            if (app.views[i].main) mainView = app.views[i];
        }
        if (!mainView) return;
        var state = e.state;
        if (!state) {
            state = {
                viewIndex: app.views.indexOf(mainView),
                url : mainView.history[0]
            };
        }
        if (state.viewIndex < 0) return;
        var view = app.views[state.viewIndex];
        var stateUrl = state && state.url || undefined;
        var stateContent = state && state.content || undefined;
        var statePageName = state && state.pageName || undefined;
        var animatePages;
        
        if (app.params.pushStateNoAnimation === true) animatePages = false;
        
        if (stateUrl !== view.url) {
            if (view.history.indexOf(stateUrl) >= 0) {
                // Go Back
                if (view.allowPageChange) {
                    app.goBack(view, {url:undefined, animatePages: animatePages, pushState: false, preloadOnly:false});
                }
                else {
                    app.pushStateQueue.push({
                        action: 'goBack',
                        view: view
                    });
                }
            }
            else if (stateContent) {
                // Load Page
                if (view.allowPageChange) {
                    app.loadPage(view, {content:stateContent, animatePages: animatePages, pushState: false});
                }
                else {
                    app.pushStateQueue.unshift({
                        action: 'loadContent',
                        stateContent: stateContent,
                        view: view
                    });
                }
                
            }
            else if (statePageName) {
                // Load Page by page name with Dom Cache
                if (view.allowPageChange) {
                    app.loadPage(view, {pageName:statePageName, animatePages: animatePages, pushState: false});
                }
                else {
                    app.pushStateQueue.unshift({
                        action: 'loadPageName',
                        statePageName: statePageName,
                        view: view
                    });
                }
            }
            else  {
                // Load Page
                if (view.allowPageChange) {
                    app.loadPage(view, {url:stateUrl, animatePages: animatePages, pushState: false});
                }
                else {
                    app.pushStateQueue.unshift({
                        action: 'loadPage',
                        stateUrl: stateUrl,
                        view: view
                    });
                }
            }
        }
    }
    $(window).on('popstate', handlePopState);
};
