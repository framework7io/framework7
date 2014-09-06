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
                url : mainView.history[0]
            };
        }
        var stateUrl = state && state.url || undefined;
        var stateContent = state && state.content || undefined;
        var animatePages;
        if (app.params.pushStateNoAnimation === true) animatePages = false;
        if (stateUrl !== mainView.url) {
            if (mainView.history.indexOf(stateUrl) >= 0) {
                // Go Back
                if (mainView.allowPageChange) {
                    app.goBack(mainView, {url:undefined, animatePages: animatePages, pushState: false, preloadOnly:false});
                }
                else {
                    app.pushStateQueue.push({
                        action: 'goBack',
                        view: mainView
                    });
                }
            }
            else if (stateUrl && !stateContent) {
                // Load Page
                if (mainView.allowPageChange) {
                    app.loadPage(mainView, {url:stateUrl, animatePages: animatePages, pushState: false});
                }
                else {
                    app.pushStateQueue.unshift({
                        action: 'loadPage',
                        stateUrl: stateUrl,
                        view: mainView
                    });
                }
            }
            else if (stateContent) {
                // Load Page
                if (mainView.allowPageChange) {
                    app.loadPage(mainView, {content:stateContent, animatePages: animatePages, pushState: false});
                }
                else {
                    app.pushStateQueue.unshift({
                        action: 'loadContent',
                        stateContent: stateContent,
                        view: mainView
                    });
                }
            }
        }
    }
    $(window).on('popstate', handlePopState);
};
