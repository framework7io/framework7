/*=======================================
 ************   Plugins API   ************
 =======================================*/
var _plugins = [];
app.initPlugins = function () {
    var plugin, p;
    // Initialize plugins
    for (plugin in app.plugins) {
        p = app.plugins[plugin](app, app.params[plugin]);
        if (p) {
            _plugins.push(p);
        }
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
    var prevent = false, i;
    for (i = 0; i < _plugins.length; i++) {
        if (_plugins[i].prevents && action in _plugins[i].prevents) {
            if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) {
                prevent = true;
            }
        }
    }
    return prevent;
};
// Preprocess content by plugin
app.pluginProcess = function (action, data) {
    var processed = data, i;
    for (i = 0; i < _plugins.length; i++) {
        if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
            processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
        }
    }
    return processed;
};

