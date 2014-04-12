/*===============================================================================
************   Smart Select   ************
===============================================================================*/
app.initSmartSelects = function (pageContainer) {
    var page = $(pageContainer);
    if (page.length === 0) return;

    var selects = page.find('.smart-select');
    if (selects.length === 0) return;

    selects.each(function () {
        var smartSelect = $(this);

        var $select = smartSelect.find('select');
        if ($select.length === 0) return;

        var select = $select[0];
        if (select.length === 0) return;

        var valueText;
        for (var i = 0; i < select.length; i++) {
            if (select[i].selected) valueText = select[i].textContent.trim();
        }

        var itemAfter = smartSelect.find('.item-after');
        if (itemAfter.length === 0) {
            smartSelect.find('.item-inner').append('<div class="item-after">' + valueText + '</div>');
        }
        else {
            itemAfter.text(valueText);
        }
        
    });
    
};
app.smartSelectOpen = function (smartSelect) {
    smartSelect = $(smartSelect);
    if (smartSelect.length === 0) return;

    // Find related view
    var view = smartSelect.parents('.view');
    if (view.length === 0) return;
    view = view[0].f7View;
    if (!view) return;

    // Collect all values
    var select = smartSelect.find('select')[0];
    var values = {};
    values.length = select.length;
    for (var i = 0; i < select.length; i++) {
        values[i] = {
            value: select[i].value,
            text: select[i].textContent.trim(),
            selected: select[i].selected
        };
    }

    var pageTitle = smartSelect.find('.item-title').text();

    // Generate dynamic page layout
    var radiosName = 'radio-' + (new Date()).getTime();
    var radiosHTML = '';
    for (var j = 0; j < values.length; j++) {
        var checked = values[j].selected ? 'checked' : '';
        radiosHTML +=
            '<li>' +
                '<label class="label-radio item-content">' +
                    '<input type="radio" name="' + radiosName + '" value="' + values[j].value + '" ' + checked + '>' +
                    '<div class="item-inner">' +
                        '<div class="item-title">' + values[j].text + '</div>' +
                    '</div>' +
                '</label>' +
            '</li>';
    }
    // Navbar HTML
    var navbarHTML =
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
            app.params.smartSelectBackTemplate +
        '    <div class="center sliding">' + pageTitle + '</div>' +
        '  </div>' +
        '</div>';
    // Determine navbar layout type - static/fixed/through
    var navbarLayout = 'static';
    if (smartSelect.parents('.navbar-through').length > 0) navbarLayout = 'through';
    if (smartSelect.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
    // Page Layout
    var pageName = 'smart-select-' + radiosName;
    var pageHTML =
        (navbarLayout === 'through' ? navbarHTML : '') +
        '<div class="pages">' +
        '  <div data-page="' + pageName + '" class="page">' +
             (navbarLayout === 'fixed' ? navbarHTML : '') +
        '    <div class="page-content">' +
               (navbarLayout === 'static' ? navbarHTML : '') +
        '      <div class="list-block">' +
        '        <ul>' +
                    radiosHTML +
        '        </ul>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    // Event Listeners on new page
    function handleRadios(e) {
        var page = e.detail.page;
        if (page.name === pageName) {
            $(document).off('pageInit', handleRadios);
            $(page.container).find('input[name="' + radiosName + '"]').on('change', function () {
                var value = this.value;
                select.value = value;
                $(select).trigger('change');
                var optionText = smartSelect.find('option[value="' + value + '"]').text();
                smartSelect.find('.item-after').text(optionText);
            });
        }
    }
    $(document).on('pageInit', handleRadios);

    // Load content
    view.loadContent(pageHTML);

};
