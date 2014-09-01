/*===============================================================================
************   Global/Document event handlers    ************
===============================================================================*/
app.globalEventListeners = {};
app.initGlobalEventListeners = function () {
    function addHandler(eventName) {
        var i;
        $(document).on(eventName, function (e) {
            for (i = 0; i < app.globalEventListeners[eventName].length; i++) {
                app.globalEventListeners[eventName][i](e);
            }
        });
        app.globalEventListeners[eventName].initialized = true;
    }
    for (var eventName in app.globalEventListeners) {
        if (!app.globalEventListeners[eventName].initialized) addHandler(eventName);
    }
};
app.addGlobalEventListener = function (eventName, func) {
    if (!(eventName in app.globalEventListeners)) {
        app.globalEventListeners[eventName] = [];
    }
    app.globalEventListeners[eventName].push(func);
    app.initGlobalEventListeners();
};
app.removeGlobalEventListener = function (eventName, func) {
    if (!(eventName in app.globalEventListeners)) return;
    var funcs = app.globalEventListeners[eventName];
    for (var i = 0; i < funcs.length; i++) {
        if (funcs[i] === func) funcs.splice(i, 1);
    }
};
