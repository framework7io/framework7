/*======================================================
 ************   Handle Browser's History   ************
 ======================================================*/
app.pushStateQueue = [];
app.pushStateClearQueue = function () {
    var queue, animatePages;
    if (app.pushStateQueue.length === 0) {
        return;
    }
    queue = app.pushStateQueue.pop();
    if (app.params.pushStateNoAnimation === true) {
        animatePages = false;
    }
    if (queue.action === 'goBack') {
        app.goBack(queue.view, undefined, animatePages, false, false);
    }
    if (queue.action === 'loadPage') {
        app.loadPage(queue.view, queue.stateUrl, animatePages, false);
    }
    if (queue.action === 'loadContent') {
        app.loadContent(queue.view, queue.stateContent, animatePages, false);
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
        var mainView, i, state, stateUrl, stateContent, animatePages;
        if (blockPopstate) {
            return;
        }

        for (i = 0; i < app.views.length; i++) {
            if (app.views[i].main) {
                mainView = app.views[i];
            }
        }
        if (!mainView) {
            return;
        }
        state = e.state;
        if (!state) {
            state = {
                url: mainView.history[0]
            };
        }
        stateUrl = state && state.url || undefined;
        stateContent = state && state.content || undefined;
        if (app.params.pushStateNoAnimation === true) {
            animatePages = false;
        }
        if (stateUrl !== mainView.url) {
            if (mainView.history.indexOf(stateUrl) >= 0) {
                // Go Back
                if (app.allowPageChange) {
                    app.goBack(mainView, undefined, animatePages, false, false);
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
                if (app.allowPageChange) {
                    app.loadPage(mainView, stateUrl, animatePages, false);
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
                if (app.allowPageChange) {
                    app.loadContent(mainView, stateContent, animatePages, false);
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
