/*======================================================
************   XHR   ************
======================================================*/
// XHR Caching
app.cache = [];
app.removeFromCache = function (url) {
    var index = false;
    for (var i = 0; i < app.cache.length; i++) {
        if (app.cache[i].url === url) index = i;
    }
    if (index !== false) app.cache.splice(index, 1);
};

// XHR
app.xhr = false;
app.get = function (url, callback) {
    // should we ignore get params or not
    var _url = url;
    if (app.params.cacheIgnoreGetParameters && url.indexOf('?') >= 0) {
        _url = url.split('?')[0];
    }
    if (app.params.cache && url.indexOf('nocache') < 0 && app.params.cacheIgnore.indexOf(_url) < 0) {
        // Check is the url cached
        for (var i = 0; i < app.cache.length; i++) {
            if (app.cache[i].url === _url) {
                // Check expiration
                if ((new Date()).getTime() - app.cache[i].time < app.params.cacheDuration) {
                    // Load from cache
                    callback(app.cache[i].data);
                    return false;
                }
            }
        }
    }

    app.xhr = $.ajax({
        url: url,
        method: 'GET',
        start: app.params.onAjaxStart,
        complete: function (xhr) {
            if (xhr.status === 200 || xhr.status === 0) {
                callback(xhr.responseText, false);
                if (app.params.cache) {
                    app.removeFromCache(_url);
                    app.cache.push({
                        url: _url,
                        time: (new Date()).getTime(),
                        data: xhr.responseText
                    });
                }
            }
            else {
                callback(xhr.responseText, true);
            }
            if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
        },
        error: function (xhr) {
            callback(xhr.responseText, true);
            if (app.params.onAjaxError) app.params.onAjaxonAjaxError(xhr);
        }
    });

    return app.xhr;
};
