/*======================================================
************   Handle Browser's History   ************
======================================================*/
app.pushStateQueue = [];
app.pushStateClearQueue = function () {
    if (app.pushStateQueue.length === 0) return;
    var queue = app.pushStateQueue.pop();
    if (queue.action === 'goBack') {
        app.goBack(queue.view, undefined, false, false);
    }
    if (queue.action === 'loadPage') {
        app.loadPage(queue.view, queue.stateUrl, false);
    }
    if (queue.action === 'loadContent') {
        app.loadContent(queue.view, queue.stateContent, false);
    }
};

app.initPushState = function () {
    var blockPopstate = true;
    $(window).on('load', function () {
        setTimeout(function () {
            blockPopstate = false;
        }, 0);
    });
    $(window).on('popstate', function (e) {
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
        if (stateUrl !== mainView.url) {
            if (mainView.history.indexOf(stateUrl) >= 0) {
                // Go Back
                if (app.allowPageChange) {
                    mainView.goBack(undefined, false);
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
                    mainView.loadPage(stateUrl, false);
                }
                else {
                    app.pushStateQueue.push({
                        action: 'loadPage',
                        stateUrl: stateUrl,
                        view: mainView
                    });
                }
            }
            else if (stateContent) {
                // Load Page
                if (app.allowPageChange) {
                    mainView.loadContent(stateContent, false);
                }
                else {
                    app.pushStateQueue.push({
                        action: 'loadContent',
                        stateContent: stateContent,
                        view: mainView
                    });
                }
            }
        }
    });
};