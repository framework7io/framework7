/*======================================================
************   Handle Browser's History   ************
======================================================*/
app.pushStateQueue = [];
app.pushStateClearQueue = function () {
    if (app.pushStateQueue.length === 0) return;
    var queue = app.pushStateQueue.pop();
    var animatePages;
    if (app.params.pushStateNoAnimation === true) animatePages = false;
    if (queue.action === 'back') {
        app.router.back(queue.view, {animatePages: animatePages});
    }
    if (queue.action === 'loadPage') {
        app.router.load(queue.view, {url: queue.stateUrl, animatePages: animatePages, pushState: false});
    }
    if (queue.action === 'loadContent') {
        app.router.load(queue.view, {content: queue.stateContent, animatePages: animatePages, pushState: false});
    }
    if (queue.action === 'loadPageName') {
        app.router.load(queue.view, {pageName: queue.statePageName, url: queue.stateUrl, animatePages: animatePages, pushState: false});
    }
};

app.initPushState = function () {
    var blockPopstate = true;
    $(window).on('load', function () {
        setTimeout(function () {
            blockPopstate = false;
        }, 0);
    });

    if (document.readyState && document.readyState === 'complete') {
        blockPopstate = false;
    }

    function handlePopState(e) {
        if (blockPopstate) return;
        var mainView = app.mainView;
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
                    app.router.back(view, {url:undefined, animatePages: animatePages, pushState: false, preloadOnly:false});
                }
                else {
                    app.pushStateQueue.push({
                        action: 'back',
                        view: view
                    });
                }
            }
            else if (stateContent) {
                // Load Page
                if (view.allowPageChange) {
                    app.router.load(view, {content:stateContent, animatePages: animatePages, pushState: false});
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
                    app.router.load(view, {pageName:statePageName, url: stateUrl, animatePages: animatePages, pushState: false});
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
                    app.router.load(view, {url:stateUrl, animatePages: animatePages, pushState: false});
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
