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

        var valueText = [];
        for (var i = 0; i < select.length; i++) {
            if (select[i].selected) valueText.push(select[i].textContent.trim());
        }

        var itemAfter = smartSelect.find('.item-after');
        if (itemAfter.length === 0) {
            smartSelect.find('.item-inner').append('<div class="item-after">' + valueText.join(', ') + '</div>');
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
    var view = smartSelect.parents('.' + app.params.viewClass);
    if (view.length === 0) return;
    view = view[0].f7View;
    if (!view) return;

    // Collect all values
    var select = smartSelect.find('select')[0];
    var $select = $(select);
    if (select.disabled || smartSelect.hasClass('disabled') || $select.hasClass('disabled')) {
        return;
    }
    var values = {};
    values.length = select.length;
    var option;
    for (var i = 0; i < select.length; i++) {
        option = $(select[i]);
        values[i] = {
            value: select[i].value,
            text: select[i].textContent.trim(),
            selected: select[i].selected,
            group: option.parent('optgroup')[0],
            image: option.attr('data-option-image') || $select.attr('data-option-image'),
            icon: option.attr('data-option-icon') || $select.attr('data-option-icon'),
            disabled: select[i].disabled
        };
    }

    var pageTitle = smartSelect.attr('data-page-title') || smartSelect.find('.item-title').text();
    var backText = smartSelect.attr('data-back-text') || app.params.smartSelectBackText;
    var backOnSelect = smartSelect.attr('data-back-onselect') ? (smartSelect.attr('data-back-onselect') === 'true' ? true : false) : app.params.smartSelectBackOnSelect;

    // Generate dynamic page layout
    var id = (new Date()).getTime();
    var inputType = select.multiple ? 'checkbox' : 'radio';
    var inputName = inputType + '-' + id;
    var inputsHTML = '';
    var previousGroup;
    for (var j = 0; j < values.length; j++) {
        if (values[j].disabled) continue;
        var checked = values[j].selected ? 'checked' : '';
        if (values[j].group) {
            if (values[j].group !== previousGroup) {
                inputsHTML += '<li class="item-divider">' + values[j].group.label + '</li>';
                previousGroup = values[j].group;
            }
        }
        var media = '';
        if (inputType === 'checkbox') media += '<i class="icon icon-form-checkbox"></i>';
        if (values[j].icon) media += '<i class="icon ' + values[j].icon + '"></i>';
        if (values[j].image) media += '<img src="' + values[j].image + '">';
        inputsHTML +=
            '<li>' +
                '<label class="label-' + inputType + ' item-content">' +
                    '<input type="' + inputType + '" name="' + inputName + '" value="' + values[j].value + '" ' + checked + '>' +
                    (media !== '' ? '<div class="item-media">' + media + '</div>' : '') +
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
            app.params.smartSelectBackTemplate.replace(/{{backText}}/g, backText) +
        '    <div class="center sliding">' + pageTitle + '</div>' +
        '  </div>' +
        '</div>';
    // Determine navbar layout type - static/fixed/through
    var navbarLayout = 'static';
    if (smartSelect.parents('.navbar-through').length > 0) navbarLayout = 'through';
    if (smartSelect.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
    // Page Layout
    var pageName = 'smart-select-' + inputName;

    var noToolbar = smartSelect.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
    var noNavbar  = smartSelect.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;

    var useSearchbar = typeof smartSelect.data('searchbar') === 'undefined' ? app.params.smartSelectSearchbar : (smartSelect.data('searchbar') === 'true' ? true : false);
    var searchbarPlaceholder, searchbarCancel;
        
    if (useSearchbar) {
        searchbarPlaceholder = smartSelect.data('searchbar-placeholder') || 'Search';
        searchbarCancel = smartSelect.data('searchbar-cancel') || 'Cancel';
    }

    var searchbarHTML =   '<form class="searchbar" data-search-list=".smart-select-list-' + id + '" data-search-in=".item-title">' +
                            '<div class="searchbar-input">' +
                                '<input type="search" placeholder="' + searchbarPlaceholder + '">' +
                                '<a href="#" class="searchbar-clear"></a>' +
                            '</div>' +
                            '<a href="#" class="searchbar-cancel">' + searchbarCancel + '</a>' +
                          '</form>' +
                          '<div class="searchbar-overlay"></div>';

    var pageHTML =
        (navbarLayout === 'through' ? navbarHTML : '') +
        '<div class="pages">' +
        '  <div data-page="' + pageName + '" class="page smart-select-page ' + noNavbar + ' ' + noToolbar + '">' +
             (navbarLayout === 'fixed' ? navbarHTML : '') +
             (useSearchbar ? searchbarHTML : '') +
        '    <div class="page-content">' +
               (navbarLayout === 'static' ? navbarHTML : '') +
        '      <div class="list-block smart-select-list-' + id + '">' +
        '        <ul>' +
                    inputsHTML +
        '        </ul>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    // Event Listeners on new page
    function handleInputs(e) {
        var page = e.detail.page;
        if (page.name === pageName) {
            $(document).off('pageInit', handleInputs);
            $(page.container).find('input[name="' + inputName + '"]').on('change', function () {
                var input = this;
                var value = input.value;
                var optionText = [];
                if (input.type === 'checkbox') {
                    var values = [];
                    for (var i = 0; i < select.options.length; i++) {
                        var option = select.options[i];
                        if (option.value === value) {
                            option.selected = input.checked;
                        }
                        if (option.selected) {
                            optionText.push(option.textContent.trim());
                        }
                    }
                }
                else {
                    optionText = [smartSelect.find('option[value="' + value + '"]').text()];
                    select.value = value;
                }
                    
                $select.trigger('change');
                smartSelect.find('.item-after').text(optionText.join(', '));
                if (backOnSelect && inputType === 'radio') {
                    view.goBack();
                }
            });
        }
    }
    $(document).on('pageInit', handleInputs);

    // Load content
    view.loadContent(pageHTML);

};
