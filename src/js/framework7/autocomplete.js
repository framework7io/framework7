/*===============================================================================
************   Autocomplete   ************
===============================================================================*/
var Autocomplete = function (params) {
    var a = this;

    // Params
    var defaults = {
        // Standalone Options
        /*
        opener: undefined,
        */
        popupCloseText: 'Close',
        backText: 'Back',
        searchbarPlaceholderText: 'Search...',
        searchbarCancelText: 'Cancel',
        openIn: 'page',
        backOnSelect: false,
        notFoundText: 'Nothing found',
        requestSourceOnOpen: false,
        /*
        pageTitle: undefined,
        */

        // Handle Data
        /*
        source: undefined,
        limit: undefined,
        */
        valueProperty: 'id',
        textProperty: 'text',

        // Dropdown Options
        highlightMatches: true,

        /*
        dropdownPlaceholderText: 'Type anything...',
        */
        updateInputValueOnSelect: true,
        expandInput: false,

        // Preloader
        preloaderColor: false,
        preloader: false,

        // Templates
        /*
        itemTemplate: undefined,
        navbarTemplate: undefined,
        dropdownTemplate: undefined
        dropdownItemTemplate: undefined,
        dropdownPlaceholderTemplate: undefined
        */

        // Color themes
        /*
        navbarTheme: undefined,
        formTheme: undefined,
        */

        // Callbacks
        /*
        onChange: function (a, value) - for not dropdown
        onOpen: function (a)
        onClose: function (a)
        */
    };

    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }
    a.params = params;

    // Opener Link & View
    if (a.params.opener) {
        a.opener = $(a.params.opener);
    }
    var view = a.params.view;
    if (!a.params.view && a.opener && a.opener.length) {
        // Find related view
        view = a.opener.parents('.' + app.params.viewClass);
        if (view.length === 0) return;
        view = view[0].f7View;
    }

    // Input
    if (a.params.input) {
        a.input = $(a.params.input);
        if (a.input.length === 0 && a.params.openIn === 'dropdown') return;
    }

    // Array with selected items
    a.value = a.params.value || [];

    // ID & Inputs
    a.id = (new Date()).getTime();
    a.inputType = a.params.multiple ? 'checkbox' : 'radio';
    a.inputName = a.inputType + '-' + a.id;

    // Is Material
    var material = app.params.material;

    // Back On Select
    var backOnSelect = a.params.backOnSelect;

    if (a.params.openIn !== 'dropdown') {
        // Item Template
        a.itemTemplate = t7.compile(a.params.itemTemplate ||
            '<li>' +
                '<label class="label-{{inputType}} item-content">' +
                    '<input type="{{inputType}}" name="{{inputName}}" value="{{value}}" {{#if selected}}checked{{/if}}>' +
                    '{{#if material}}' +
                        '<div class="item-media">' +
                            '<i class="icon icon-form-{{inputType}}"></i>' +
                        '</div>' +
                        '<div class="item-inner">' +
                            '<div class="item-title">{{text}}</div>' +
                        '</div>' +
                    '{{else}}' +
                        '{{#if checkbox}}' +
                        '<div class="item-media">' +
                            '<i class="icon icon-form-checkbox"></i>' +
                        '</div>' +
                        '{{/if}}' +
                        '<div class="item-inner">' +
                            '<div class="item-title">{{text}}</div>' +
                        '</div>' +
                    '{{/if}}' +
                '</label>' +
            '</li>'
        );
        // Page Layout
        var pageTitle = a.params.pageTitle || '';
        if (!pageTitle && a.opener && a.opener.length) {
            pageTitle = a.opener.find('.item-title').text();
        }
        var pageName = 'autocomplete-' + a.inputName;

        var navbarTheme = a.params.navbarTheme,
            formTheme = a.params.formTheme;

        // Navbar HTML
        var navbarHTML;
        var noNavbar = '', noToolbar = '', navbarLayout;

        a.navbarTemplate = t7.compile(a.params.navbarTemplate ||
            '<div class="navbar {{#if navbarTheme}}theme-{{navbarTheme}}{{/if}}">' +
                '<div class="navbar-inner">' +
                    '<div class="left sliding">' +
                        '{{#if material}}' +
                        '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}} icon-only"><i class="icon icon-back"></i></a>' +
                        '{{else}}' +
                        '<a href="#" class="link {{#if inPopup}}close-popup{{else}}back{{/if}}">' +
                            '<i class="icon icon-back"></i>' +
                            '{{#if inPopup}}' +
                            '<span>{{popupCloseText}}</span>' +
                            '{{else}}' +
                            '<span>{{backText}}</span>' +
                            '{{/if}}' +
                        '</a>' +
                        '{{/if}}' +
                    '</div>' +
                    '<div class="center sliding">{{pageTitle}}</div>' +
                    '{{#if preloader}}' +
                    '<div class="right">' +
                        '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}"></div>' +
                    '</div>' +
                    '{{/if}}' +
                '</div>' +
            '</div>'
        );
        navbarHTML = a.navbarTemplate({
            pageTitle: pageTitle,
            backText: a.params.backText,
            popupCloseText: a.params.popupCloseText,
            openIn: a.params.openIn,
            navbarTheme: navbarTheme,
            inPopup: a.params.openIn === 'popup',
            inPage: a.params.openIn === 'page',
            material: material,
            preloader: a.params.preloader,
            preloaderColor: a.params.preloaderColor,
        });

        // Determine navbar layout type - static/fixed/through
        if (a.params.openIn === 'page') {
            navbarLayout = 'static';
            if (a.opener) {
                if (a.opener.parents('.navbar-through').length > 0) navbarLayout = 'through';
                if (a.opener.parents('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                noToolbar = a.opener.parents('.page').hasClass('no-toolbar') ? 'no-toolbar' : '';
                noNavbar  = a.opener.parents('.page').hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
            }
            else if (view.container) {
                if ($(view.container).hasClass('navbar-through') || $(view.container).find('.navbar-through').length > 0) navbarLayout = 'through';
                if ($(view.container).hasClass('navbar-fixed') || $(view.container).find('.navbar-fixed').length > 0) navbarLayout = 'fixed';
                noToolbar = $(view.activePage.container).hasClass('no-toolbar') ? 'no-toolbar' : '';
                noNavbar  = $(view.activePage.container).hasClass('no-navbar')  ? 'no-navbar'  : 'navbar-' + navbarLayout;
            }
        }
        else {
            navbarLayout = 'fixed';
        }
        var searchbarHTML =
            '<form class="searchbar">' +
                '<div class="searchbar-input">' +
                    '<input type="search" placeholder="' + a.params.searchbarPlaceholderText + '">' +
                    '<a href="#" class="searchbar-clear"></a>' +
                '</div>' +
                (material ? '' : '<a href="#" class="searchbar-cancel">' + a.params.searchbarCancelText + '</a>') +
            '</form>' +
            '<div class="searchbar-overlay"></div>';
        var pageHTML =
            (navbarLayout === 'through' ? navbarHTML : '') +
            '<div class="pages">' +
                '<div data-page="' + pageName + '" class="page autocomplete-page ' + noNavbar + ' ' + noToolbar + '">' +
                    (navbarLayout === 'fixed' ? navbarHTML : '') +
                    searchbarHTML +
                    '<div class="page-content">' +
                        (navbarLayout === 'static' ? navbarHTML : '') +
                        '<div class="list-block autocomplete-found autocomplete-list-' + a.id + ' ' + (formTheme ? 'theme-' + formTheme : '') + '">' +
                            '<ul></ul>' +
                        '</div>' +
                        '<div class="list-block autocomplete-not-found">' +
                            '<ul><li class="item-content"><div class="item-inner"><div class="item-title">' + a.params.notFoundText + '</div></div></li></ul>' +
                        '</div>' +
                        '<div class="list-block autocomplete-values">' +
                            '<ul></ul>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }
    else {
        a.dropdownItemTemplate = t7.compile(a.params.dropdownItemTemplate ||
            '<li>' +
                '<label class="{{#unless placeholder}}label-radio{{/unless}} item-content" data-value="{{value}}">' +
                    '<div class="item-inner">' +
                        '<div class="item-title">{{text}}</div>' +
                    '</div>' +
                '</label>' +
            '</li>'
        );
        a.dropdownPlaceholderTemplate = t7.compile(a.params.dropdownPlaceholderTemplate ||
            '<li class="autocomplete-dropdown-placeholder">' +
                '<div class="item-content">' +
                    '<div class="item-inner">' +
                        '<div class="item-title">{{text}}</div>' +
                    '</div>' +
                '</label>' +
            '</li>'
        );
        a.dropdownTemplate = t7.compile(a.params.dropdownTemplate ||
            '<div class="autocomplete-dropdown">' +
                '<div class="autocomplete-dropdown-inner">' +
                    '<div class="list-block">' +
                        '<ul></ul>' +
                    '</div>' +
                '</div>' +
                '{{#if preloader}}' +
                '<div class="autocomplete-preloader preloader {{#if preloaderColor}}preloader-{{preloaderColor}}{{/if}}">{{#if material}}{{materialPreloaderHtml}}{{/if}}</div>' +
                '{{/if}}' +
            '</div>'
        );
    }

    // Define popup
    a.popup = undefined;

    // Define Dropdown
    a.dropdown = undefined;

    // Handle Input Value Change
    function handleInputValue (e) {
        var query = a.input.val();
        if (a.params.source) {
            a.params.source(a, query, function (items) {
                var itemsHTML = '';
                var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                a.items = items;
                var i, j, regExp;
                if (a.params.highlightMatches) {
                    query = query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
                    regExp = new RegExp('('+query+')', 'i');
                }

                for (i = 0; i < limit; i++) {
                    var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                    var itemText = typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty];
                    itemsHTML += a.dropdownItemTemplate({
                        value: itemValue,
                        text: a.params.highlightMatches ? itemText.replace(regExp, '<b>$1</b>') : itemText
                    });
                }
                if (itemsHTML === '' && query === '' && a.params.dropdownPlaceholderText) {
                    itemsHTML += a.dropdownPlaceholderTemplate({
                        text: a.params.dropdownPlaceholderText,
                    });
                }
                a.dropdown.find('ul').html(itemsHTML);
            });
        }
    }
    // Handle Drop Down Click
    function handleDropdownClick (e) {
        /*jshint validthis:true */
        var clicked = $(this);
        var clickedItem;
        for (var i = 0; i < a.items.length; i++) {
            var itemValue = typeof a.items[i] === 'object' ? a.items[i][a.params.valueProperty] : a.items[i];
            var value = clicked.attr('data-value');
            if (itemValue === value || itemValue * 1 === value * 1) {
                clickedItem = a.items[i];
            }
        }
        if (a.params.updateInputValueOnSelect) {
            a.input.val(typeof clickedItem === 'object' ? clickedItem[a.params.textProperty] : clickedItem);
            a.input.trigger('input change');
        }

        if (a.params.onChange) {
            a.params.onChange(a, clickedItem);
        }

        a.close();
    }

    // Handle HTML Click to close Dropdown
    function closeOnHTMLClick (e) {
        var target = $(e.target);
        if (!(target.is(a.input[0]) || a.dropdown && target.parents(a.dropdown[0]).length > 0)) {
            a.close();
        }
    }

    a.positionDropDown = function () {
        var listBlock = a.input.parents('.list-block'),
            pageContent = a.input.parents('.page-content'),
            paddingTop = parseInt(pageContent.css('padding-top'), 10),
            paddingBottom = parseInt(pageContent.css('padding-top'), 10),
            // inputOffset = a.input.offset(),
            listBlockOffsetLeft = listBlock.length > 0 ? listBlock.offset().left - listBlock.parent().offset().left : 0,
            inputOffsetLeft = a.input.offset().left - (listBlock.length > 0 ? listBlock.offset().left : 0),
            inputOffsetTop = a.input.offset().top - (pageContent.offset().top - pageContent[0].scrollTop),
            maxHeight = pageContent[0].scrollHeight - paddingBottom - (inputOffsetTop + pageContent[0].scrollTop) - a.input[0].offsetHeight;

        a.dropdown.css({
            left: (listBlock.length > 0 ? listBlockOffsetLeft : inputOffsetLeft) + 'px',
            top: inputOffsetTop + pageContent[0].scrollTop + a.input[0].offsetHeight + 'px',
            width: (listBlock.length > 0 ? listBlock[0].offsetWidth : a.input[0].offsetWidth) + 'px'
        });
        a.dropdown.children('.autocomplete-dropdown-inner').css({
            maxHeight: maxHeight + 'px',
            paddingLeft: listBlock.length > 0 && !a.params.expandInput ? inputOffsetLeft - (material ? 16 : 15) + 'px' : ''
        });
    };

    // Event Listeners on new page
    a.pageInit = function (e) {
        var page = e.detail.page;
        a.page = $(page.container);
        a.pageData = page;
        if (page.name !== pageName) {
            return;
        }
        var container = $(page.container);

        // Source
        function onSource(query) {
            if (!a.params.source) return;
            var i, j, k;

            a.params.source(a, query, function(items) {
                var itemsHTML = '';
                var limit = a.params.limit ? Math.min(a.params.limit, items.length) : items.length;
                a.items = items;
                for (i = 0; i < limit; i++) {
                    var selected = false;
                    var itemValue = typeof items[i] === 'object' ? items[i][a.params.valueProperty] : items[i];
                    for (j = 0; j < a.value.length; j++) {
                        var aValue = typeof a.value[j] === 'object' ? a.value[j][a.params.valueProperty] : a.value[j];
                        if (aValue === itemValue || aValue * 1 === itemValue * 1) selected = true;
                    }
                    itemsHTML += a.itemTemplate({
                        value: itemValue,
                        text: typeof items[i] !== 'object' ? items[i] : items[i][a.params.textProperty],
                        inputType: a.inputType,
                        id: a.id,
                        inputName: a.inputName,
                        selected: selected,
                        checkbox: a.inputType === 'checkbox',
                        material: material
                    });
                }
                container.find('.autocomplete-found ul').html(itemsHTML);
                if (items.length === 0) {
                    if (query.length !== 0) {
                        container.find('.autocomplete-not-found').show();
                        container.find('.autocomplete-found, .autocomplete-values').hide();
                    }
                    else {
                        container.find('.autocomplete-values').show();
                        container.find('.autocomplete-found, .autocomplete-not-found').hide();
                    }
                }
                else {
                    container.find('.autocomplete-found').show();
                    container.find('.autocomplete-not-found, .autocomplete-values').hide();
                }
            });
        }

        // Init Search Bar
        var searchbar = app.searchbar(container.find('.searchbar'), {
            customSearch: true,
            onSearch: function (searchbar, data) {
                if (data.query.length === 0 && searchbar.active) {
                    searchbar.overlay.addClass('searchbar-overlay-active');
                }
                else {
                    searchbar.overlay.removeClass('searchbar-overlay-active');
                }

                onSource(data.query);
            }
        });

        // Save searchbar instance
        a.searchbar = searchbar;

        // Update values
        function updateValues() {
            var valuesHTML = '';
            var i;
            for (i = 0; i < a.value.length; i++) {

                valuesHTML += a.itemTemplate({
                    value: typeof a.value[i] === 'object' ? a.value[i][a.params.valueProperty] : a.value[i],
                    text: typeof a.value[i] === 'object' ? a.value[i][a.params.textProperty]: a.value[i],
                    inputType: a.inputType,
                    id: a.id,
                    inputName: a.inputName + '-checked',
                    checkbox: a.inputType === 'checkbox',
                    material: material,
                    selected: true
                });
            }
            container.find('.autocomplete-values ul').html(valuesHTML);
        }

        // Handle Inputs
        container.on('change', 'input[type="radio"], input[type="checkbox"]', function () {
            var i;
            var input = this;
            var value = input.value;
            var text = $(input).parents('li').find('.item-title').text();
            var isValues = $(input).parents('.autocomplete-values').length > 0;
            var item, itemValue, aValue;
            if (isValues) {
                if (a.inputType === 'checkbox' && !input.checked) {
                    for (i = 0; i < a.value.length; i++) {
                        aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                        if (aValue === value || aValue * 1 === value * 1) {
                            a.value.splice(i, 1);
                        }
                    }
                    updateValues();
                    if (a.params.onChange) a.params.onChange(a, a.value);
                }
                return;
            }

            // Find Related Item
            for (i = 0; i < a.items.length; i++) {
                itemValue = typeof a.items[i] === 'string' ? a.items[i] : a.items[i][a.params.valueProperty];
                if (itemValue === value || itemValue * 1 === value * 1) item = a.items[i];
            }
            // Update Selected Value
            if (a.inputType === 'radio') {
                a.value = [item];
            }
            else {
                if (input.checked) {
                    a.value.push(item);
                }
                else {
                    for (i = 0; i < a.value.length; i++) {
                        aValue = typeof a.value[i] === 'string' ? a.value[i] : a.value[i][a.params.valueProperty];
                        if (aValue === value || aValue * 1 === value * 1) {
                            a.value.splice(i, 1);
                        }
                    }
                }
            }

            // Update Values Block
            updateValues();

            // On Select Callback
            if ((a.inputType === 'radio' && input.checked || a.inputType === 'checkbox') && a.params.onChange ) {
                a.params.onChange(a, a.value);
            }
            if (backOnSelect && a.inputType === 'radio') {
                if (a.params.openIn === 'popup') app.closeModal(a.popup);
                else view.router.back();
            }
        });

        // Update Values On Page Init
        updateValues();

        // Source on load
        if (a.params.requestSourceOnOpen) onSource('');

        // On Open Callback
        if (a.params.onOpen) a.params.onOpen(a);
    };

    // Show Hide Preloader
    a.showPreloader = function () {
        if (a.params.openIn === 'dropdown') {
            if (a.dropdown) a.dropdown.find('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
        }
        else $('.autocomplete-preloader').addClass('autocomplete-preloader-visible');
    };

    a.hidePreloader = function () {
        if (a.params.openIn === 'dropdown') {
            if (a.dropdown) a.dropdown.find('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
        }
        else $('.autocomplete-preloader').removeClass('autocomplete-preloader-visible');
    };

    // Open Autocomplete Page/Popup
    a.open = function () {
        if (a.opened) return;
        a.opened = true;
        if (a.params.openIn === 'dropdown') {
            if (!a.dropdown) {
                a.dropdown = $(a.dropdownTemplate({
                    preloader: a.params.preloader,
                    preloaderColor: a.params.preloaderColor,
                    material: material,
                    materialPreloaderHtml: app.params.materialPreloaderHtml
                }));
                a.dropdown.on('click', 'label', handleDropdownClick);

            }
            var listBlock = a.input.parents('.list-block');
            if (listBlock.length && a.input.parents('.item-content').length > 0 && a.params.expandInput) {
                a.input.parents('.item-content').addClass('item-content-dropdown-expand');
            }
            a.positionDropDown();
            a.input.parents('.page-content').append(a.dropdown);
            a.dropdown.addClass('autocomplete-dropdown-in');
            a.input.trigger('input');
            $(window).on('resize', a.positionDropDown);
            if (a.params.onOpen) a.params.onOpen(a);
        }
        else {
            $(document).once('pageInit', '.autocomplete-page', a.pageInit);
            if (a.params.openIn === 'popup') {
                a.popup = app.popup(
                    '<div class="popup autocomplete-popup autocomplete-popup-' + a.inputName + '">' +
                        '<div class="view navbar-fixed">' +
                            pageHTML +
                        '</div>' +
                    '</div>'
                    );
                a.popup = $(a.popup);
                a.popup.once('closed', function () {
                    a.popup = undefined;
                    a.opened = false;
                    if (a.params.onClose) a.params.onClose(a);
                });
            }
            else {
                view.router.load({
                    content: pageHTML
                });
                $(document).once('pageBack', '.autocomplete-page', function () {
                    a.opened = false;
                    if (a.params.onClose) a.params.onClose(a);
                });
            }
        }
    };
    a.close = function (e) {
        if (!a.opened) return;
        if (a.params.openIn === 'dropdown') {
            if (e && e.type === 'blur' && a.dropdown.find('label.active-state').length > 0) return;
            a.dropdown.removeClass('autocomplete-dropdown-in').remove();
            a.input.parents('.item-content-dropdown-expand').removeClass('item-content-dropdown-expand');
            a.opened = false;
            $(window).off('resize', a.positionDropDown);
            if (a.params.onClose) a.params.onClose(a);
        }
        if (a.params.openIn === 'popup') {
            if (a.popup) app.closeModal(a.popup);
        }
    };

    // Init Events
    a.initEvents = function (detach) {
        var method = detach ? 'off' : 'on';
        if (a.params.openIn !== 'dropdown' && a.opener) {
            a.opener[method]('click', a.open);
        }
        if (a.params.openIn === 'dropdown' && a.input) {
            a.input[method]('focus', a.open);
            a.input[method]('input', handleInputValue);
            if (app.device.android) {
                $('html')[method]('click', closeOnHTMLClick);
            }
            else {
                a.input[method]('blur', a.close);
            }
        }
        if (detach && a.dropdown) {
            a.dropdown = null;
        }
    };

    // Init/Destroy Methods
    a.init = function () {
        a.initEvents();
    };
    a.destroy = function () {
        a.initEvents(true);
        a = null;
    };

    // Init
    a.init();

    return a;
};
app.autocomplete = function (params) {
    return new Autocomplete(params);
};