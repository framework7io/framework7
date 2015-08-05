/*===============================================================================
************   Smart Select   ************
===============================================================================*/
app.initSmartSelects = function (pageContainer) {
    pageContainer = $(pageContainer);
    var selects;
    if (pageContainer.is('.smart-select')) {
        selects = pageContainer;
    }
    else {
        selects = pageContainer.find('.smart-select');
    }
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
            var selectedText = itemAfter.text();
            if (itemAfter.hasClass('smart-select-value')) {
                for (i = 0; i < select.length; i++) {
                    select[i].selected = select[i].textContent.trim() === selectedText.trim();
                }
            } else {
                itemAfter.text(valueText.join(', '));
            }
        }
        
    });
    
};
app.smartSelectAddOption = function (select, option, index) {
    select = $(select);
    var smartSelect = select.parents('.smart-select');
    if (typeof index === 'undefined') {
        select.append(option);
    }
    else {
        $(option).insertBefore(select.find('option').eq(index));
    }
    app.initSmartSelects(smartSelect);
    var selectName = smartSelect.find('select').attr('name');
    var opened = $('.page.smart-select-page[data-select-name="' + selectName + '"]').length > 0;
    if (opened) {
        app.smartSelectOpen(smartSelect, true);
    }
};
app.smartSelectOpen = function (smartSelect, reLayout) {
    smartSelect = $(smartSelect);
    if (smartSelect.length === 0) return;

    // Find related view
    var view = smartSelect.parents('.' + app.params.viewClass);
    if (view.length === 0) return;
    view = view[0].f7View;

    // Parameters
    var openIn = smartSelect.attr('data-open-in');
    if (!openIn) openIn = app.params.smartSelectInPopup ? 'popup' : 'page';
    if (openIn === 'popup') {
        if ($('.popup.smart-select-popup').length > 0) return;
    }
    else {
        if (!view) return;
    }

    var smartSelectData = smartSelect.dataset();
    var pageTitle = smartSelectData.pageTitle || smartSelect.find('.item-title').text();
    var backText = smartSelectData.backText || app.params.smartSelectBackText;
    var closeText = smartSelectData.popupCloseText || smartSelectData.backText || app.params.smartSelectPopupCloseText ;
    var backOnSelect = smartSelectData.backOnSelect !== undefined ? smartSelectData.backOnSelect : app.params.smartSelectBackOnSelect;
    var formTheme = smartSelectData.formTheme || app.params.smartSelectFormTheme;
    var navbarTheme = smartSelectData.navbarTheme || app.params.smartSelectNavbarTheme;
    var virtualList = smartSelectData.virtualList;
    var virtualListHeight = smartSelectData.virtualListHeight;
    var material = app.params.material;
    // Collect all options/values
    var select = smartSelect.find('select')[0];
    var $select = $(select);
    var $selectData = $select.dataset();
    if (select.disabled || smartSelect.hasClass('disabled') || $select.hasClass('disabled')) {
        return;
    }
    var values = [];
    var id = (new Date()).getTime();
    var inputType = select.multiple ? 'checkbox' : 'radio';
    var inputName = inputType + '-' + id;
    var selectName = select.name;
    var option, optionHasMedia, optionImage, optionIcon, optionGroup, optionGroupLabel, optionPreviousGroup, optionIsLabel, previousGroup, optionColor, optionClassName, optionData;
    for (var i = 0; i < select.length; i++) {
        option = $(select[i]);
        if (option[0].disabled) continue;
        optionData = option.dataset();
        optionImage = optionData.optionImage || $selectData.optionImage;
        optionIcon = optionData.optionIcon || $selectData.optionIcon;
        optionHasMedia = optionImage || optionIcon || inputType === 'checkbox';
        if (material) optionHasMedia = optionImage || optionIcon;
        optionColor = optionData.optionColor;
        optionClassName = optionData.optionClass;
        optionGroup = option.parent('optgroup')[0];
        optionGroupLabel = optionGroup && optionGroup.label;
        optionIsLabel = false;
        if (optionGroup) {
            if (optionGroup !== previousGroup) {
                optionIsLabel = true;
                previousGroup = optionGroup;
                values.push({
                    groupLabel: optionGroupLabel,
                    isLabel: optionIsLabel
                });
            }
        }
        values.push({
            value: option[0].value,
            text: option[0].textContent.trim(),
            selected: option[0].selected,
            group: optionGroup,
            groupLabel: optionGroupLabel,
            image: optionImage,
            icon: optionIcon,
            color: optionColor,
            className: optionClassName,
            disabled: option[0].disabled,
            inputType: inputType,
            id: id,
            hasMedia: optionHasMedia,
            checkbox: inputType === 'checkbox',
            inputName: inputName,
            material: app.params.material
        });
    }


    // Item template/HTML
    if (!app._compiledTemplates.smartSelectItem) {
        app._compiledTemplates.smartSelectItem = t7.compile(app.params.smartSelectItemTemplate || 
            '{{#if isLabel}}' +
            '<li class="item-divider">{{groupLabel}}</li>' +
            '{{else}}' +
            '<li{{#if className}} class="{{className}}"{{/if}}>' +
                '<label class="label-{{inputType}} item-content">' +
                    '<input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>' +
                    '{{#if material}}' +
                        '{{#if hasMedia}}' +
                        '<div class="item-media">' +
                            '{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}' +
                            '{{#if image}}<img src="{{image}}">{{/if}}' +
                        '</div>' +
                        '<div class="item-inner">' +
                            '<div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div>' +
                        '</div>' +
                        '<div class="item-after">' +
                            '<i class="icon icon-form-{{inputType}}"></i>' +
                        '</div>' +
                        '{{else}}' +
                        '<div class="item-media">' +
                            '<i class="icon icon-form-{{inputType}}"></i>' +
                        '</div>' +
                        '<div class="item-inner">' +
                            '<div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div>' +
                        '</div>' +
                        '{{/if}}' +
                    '{{else}}' +
                        '{{#if hasMedia}}' +
                        '<div class="item-media">' +
                            '{{#if checkbox}}<i class="icon icon-form-checkbox"></i>{{/if}}' +
                            '{{#if icon}}<i class="icon {{icon}}"></i>{{/if}}' +
                            '{{#if image}}<img src="{{image}}">{{/if}}' +
                        '</div>' +
                        '{{/if}}' +
                        '<div class="item-inner">' +
                            '<div class="item-title{{#if color}} color-{{color}}{{/if}}">{{text}}</div>' +
                        '</div>' +
                    '{{/if}}' +
                '</label>' +
            '</li>' +
            '{{/if}}'
        );
    }
    var smartSelectItemTemplate = app._compiledTemplates.smartSelectItem;
    
    var inputsHTML = '';
    if (!virtualList) {
        for (var j = 0; j < values.length; j++) {
            inputsHTML += smartSelectItemTemplate(values[j]);
        }
    }

    // Navbar HTML
    if (!app._compiledTemplates.smartSelectNavbar) {
        app._compiledTemplates.smartSelectNavbar = t7.compile(app.params.smartSelectNavbarTemplate || 
            '<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}">' +
                '<div class="navbar-inner">' +
                    '{{leftTemplate}}' +
                    '<div class="center sliding">{{pageTitle}}</div>' +
                '</div>' +
            '</div>'
        );
    }
    var navbarHTML = app._compiledTemplates.smartSelectNavbar({
        pageTitle: pageTitle,
        backText: backText,
        closeText: closeText,
        openIn: openIn,
        navbarTheme: navbarTheme,
        inPopup: openIn === 'popup',
        inPage: openIn === 'page',
        leftTemplate: openIn === 'popup' ? 
            (app.params.smartSelectPopupCloseTemplate || (material ? '<div class="left"><a href="#" class="link close-popup icon-only"><i class="icon icon-back"></i></a></div>' : '<div class="left"><a href="#" class="link close-popup"><i class="icon icon-back"></i><span>{{closeText}}</span></a></div>')).replace(/{{closeText}}/g, closeText) :
            (app.params.smartSelectBackTemplate || (material ? '<div class="left"><a href="#" class="back link icon-only"><i class="icon icon-back"></i></a></div>' : '<div class="left sliding"><a href="#" class="back link"><i class="icon icon-back"></i><span>{{backText}}</span></a></div>')).replace(/{{backText}}/g, backText)
    });
    
    // Determine navbar layout type - static/fixed/through
    var noNavbar = '', noToolbar = '', navbarLayout;
    if (openIn === 'page') {
        navbarLayout = 'static';
        if (smartSelect.parents('.navbar-through').length > 0) navbarLayout = 'through';
        if (smartSelect.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
        noToolbar = smartSelect.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
        noNavbar  = smartSelect.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
    }
    else {
        navbarLayout = 'fixed';
    }
        

    // Page Layout
    var pageName = 'smart-select-' + inputName;

    var useSearchbar = typeof smartSelect.data('searchbar') === 'undefined' ? app.params.smartSelectSearchbar : (smartSelect.data('searchbar') === 'true' ? true : false);
    var searchbarPlaceholder, searchbarCancel;
        
    if (useSearchbar) {
        searchbarPlaceholder = smartSelect.data('searchbar-placeholder') || 'Search';
        searchbarCancel = smartSelect.data('searchbar-cancel') || 'Cancel';
    }

    var searchbarHTML =   '<form class="searchbar searchbar-init" data-search-list=".smart-select-list-' + id + '" data-search-in=".item-title">' +
                            '<div class="searchbar-input">' +
                                '<input type="search" placeholder="' + searchbarPlaceholder + '">' +
                                '<a href="#" class="searchbar-clear"></a>' +
                            '</div>' +
                            (material ? '' : '<a href="#" class="searchbar-cancel">' + searchbarCancel + '</a>') +
                          '</form>' +
                          '<div class="searchbar-overlay"></div>';

    var pageHTML =
        (navbarLayout === 'through' ? navbarHTML : '') +
        '<div class="pages">' +
        '  <div data-page="' + pageName + '" data-select-name="' + selectName + '" class="page smart-select-page ' + noNavbar + ' ' + noToolbar + '">' +
             (navbarLayout === 'fixed' ? navbarHTML : '') +
             (useSearchbar ? searchbarHTML : '') +
        '    <div class="page-content">' +
               (navbarLayout === 'static' ? navbarHTML : '') +
        '      <div class="list-block ' + (virtualList ? 'virtual-list' : '') + ' smart-select-list-' + id + ' ' + (formTheme ? 'theme-' + formTheme : '') + '">' +
        '        <ul>' +
                    (virtualList ? '' : inputsHTML) +
        '        </ul>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>';

    // Define popup
    var popup;

    // Event Listeners on new page
    function handleInputs(container) {
        if (virtualList) {
            var virtualListInstance = app.virtualList($(container).find('.virtual-list'), {
                items: values,
                template: smartSelectItemTemplate,
                height: virtualListHeight || undefined,
                searchByItem: function (query, index, item) {
                    if (item.text.toLowerCase().indexOf(query.trim().toLowerCase()) >=0 ) return true;
                    return false;
                }
            });
            $(container).once(openIn === 'popup' ? 'closed': 'pageBeforeRemove', function () {
                if (virtualListInstance && virtualListInstance.destroy) virtualListInstance.destroy();
            });
        }
        $(container).on('change', 'input[name="' + inputName + '"]', function () {
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
                if (openIn === 'popup') app.closeModal(popup);
                else view.router.back();
            }
        });
    }
    function pageInit(e) {
        var page = e.detail.page;
        if (page.name === pageName) {
            handleInputs(page.container);
        }
    }
    if (openIn === 'popup') {
        if (reLayout) {
            popup = $('.popup.smart-select-popup .view');
            popup.html(pageHTML);
        }
        else {
            popup = app.popup(
                '<div class="popup smart-select-popup smart-select-popup-' + inputName + '">' +
                    '<div class="view navbar-fixed">' +
                        pageHTML +
                    '</div>' +
                '</div>'
                );
            popup = $(popup);
        }
        app.initPage(popup.find('.page'));
        handleInputs(popup);
    }
    else {
        $(document).once('pageInit', '.smart-select-page', pageInit);
        view.router.load({
            content: pageHTML,
            reload: reLayout ? true : undefined
        });
    }
};
