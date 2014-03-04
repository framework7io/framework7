/*======================================================
************   Panels   ************
======================================================*/
app.allowPanelOpen = true;
app.openPanel = function (panelPosition) {
    // @panelPosition - string with panel position "left", "right", "top"
    if (!app.allowPanelOpen) return false;
    var panel = $('.panel-' + panelPosition);
    if (panel.length === 0 || panel.hasClass('active')) return false;
    app.closePanel(); // Close if some panel is opened
    app.allowPanelOpen = false;
    var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
    panel.css({display: 'block'}).addClass('active');
    panel.trigger('open');

    // Trigger reLayout
    var clientLeft = panel[0].clientLeft;
    
    // Transition End;
    var transitionEndTarget = effect === 'reveal' ? $('.views') : panel;
    var openedTriggered = false;
    transitionEndTarget.transitionEnd(function (e) {
        if ($(e.target).is(transitionEndTarget)) {
            if (!openedTriggered) panel.trigger('opened');
        }
        app.allowPanelOpen = true;
    });
    setTimeout(function () {
        if (!openedTriggered) panel.trigger('opened');
    }, app.params.panelsAnimationDuration);

    $('body').addClass('with-panel-' + panelPosition + '-' + effect);
    return true;
};
app.closePanel = function () {
    var activePanel = $('.panel.active');
    if (activePanel.length === 0) return false;
    var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
    var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
    activePanel.removeClass('active');
    var transitionEndTarget = effect === 'reveal' ? $('.views') : activePanel;
    activePanel.trigger('close');
    transitionEndTarget.transitionEnd(function () {
        activePanel.css({display: ''});
        activePanel.trigger('closed');
        $('body').removeClass('panel-closing');
    });
    $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
};