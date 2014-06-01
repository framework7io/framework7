/*=======================================
************   Plugins API   ************
=======================================*/
var _plugins = [];
app.initPlugins = function () {
    // Initialize plugins
    for (var plugin in app.plugins) {
        var p = app.plugins[plugin](app, app.params[plugin]);
        if (p) _plugins.push(p);
    }
};
// Plugin Hooks
app.pluginHook = function (hook) {
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].hooks && hook in _plugins[i].hooks) {
            _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        }
    }
};
// Prevented by plugin
app.pluginPrevent = function (action) {
    var prevent = false;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].prevents && action in _plugins[i].prevents) {
            if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
        }
    }
    return prevent;
};
// Preprocess content by plugin
app.pluginProcess = function (process, data) {
    var processed = data;
    for (var i = 0; i < _plugins.length; i++) {
        if (_plugins[i].process && process in _plugins[i].prevents) {
            processed = _plugins[i].prevents[process](processed);
        }
    }
    return processed;
};

