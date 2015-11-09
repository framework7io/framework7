/*======================================================
************   Image Lazy Loading   ************
************   Based on solution by Marc Godard, https://github.com/MarcGodard   ************
======================================================*/
app.initImagesLazyLoad = function (pageContainer) {
    pageContainer = $(pageContainer);

    // Lazy images
    var lazyLoadImages;
    if (pageContainer.hasClass('lazy')) {
        lazyLoadImages = pageContainer;
        pageContainer = lazyLoadImages.parents('.page');
    }
    else {
        lazyLoadImages = pageContainer.find('.lazy');
    }
    if (lazyLoadImages.length === 0) return;

    // Scrollable page content
    var pageContent;
    if (pageContainer.hasClass('page-content'))  {
        pageContent = pageContainer;
        pageContainer = pageContainer.parents('.page');
    }
    else  {
        pageContent = pageContainer.find('.page-content');
    }
    if (pageContent.length === 0) return;

    // Placeholder
    var placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
    if (typeof app.params.imagesLazyLoadPlaceholder === 'string') {
        placeholderSrc = app.params.imagesLazyLoadPlaceholder;
    }
    if (app.params.imagesLazyLoadPlaceholder !== false) lazyLoadImages.each(function(){
        if ($(this).attr('data-src')) $(this).attr('src', placeholderSrc);
    });

    // load image
    var imagesSequence = [];
    var imageIsLoading = false;
    function loadImage(el) {
        el = $(el);

        var bg = el.attr('data-background');
        var src = bg ? bg : el.attr('data-src');
        if (!src) return;

        function onLoad() {
            el.removeClass('lazy').addClass('lazy-loaded');
            if (bg) {
                el.css('background-image', 'url(' + src + ')');
            }
            else {
                el.attr('src', src);
            }

            if (app.params.imagesLazyLoadSequential) {
                imageIsLoading = false;
                if (imagesSequence.length > 0) {
                    loadImage(imagesSequence.shift());
                }
            }
        }

        if (app.params.imagesLazyLoadSequential) {
            if (imageIsLoading) {
                if (imagesSequence.indexOf(el[0]) < 0) imagesSequence.push(el[0]);
                return;
            }
        }

        // Loading flag
        imageIsLoading = true;
        
        var image = new Image();
        image.onload = onLoad;
        image.onerror = onLoad;
        image.src =src;
    }
    function lazyHandler() {
        lazyLoadImages = pageContainer.find('.lazy');
        lazyLoadImages.each(function(index, el) {
            el = $(el);
            if (el.parents('.tab:not(.active)').length > 0) {
                return;
            }
            if (isElementInViewport(el[0])) {
                loadImage(el);
            }
        });
    }

    function isElementInViewport (el) {
        var rect = el.getBoundingClientRect();
        var threshold = app.params.imagesLazyLoadThreshold || 0;
        return (
            rect.top >= (0 - threshold) &&
            rect.left >= (0 - threshold) &&
            rect.top <= (window.innerHeight + threshold) &&
            rect.left <= (window.innerWidth + threshold)
        );
    }

    function attachEvents(destroy) {
        var method = destroy ? 'off' : 'on';
        lazyLoadImages[method]('lazy', lazyHandler);
        lazyLoadImages.parents('.tab')[method]('show', lazyHandler);
        pageContainer[method]('lazy', lazyHandler);
        pageContent[method]('lazy', lazyHandler);
        pageContent[method]('scroll', lazyHandler);
        $(window)[method]('resize', lazyHandler);
    }
    function detachEvents() {
        attachEvents(true);
    }

    // Store detach function
    pageContainer[0].f7DestroyImagesLazyLoad = detachEvents;

    // Attach events
    attachEvents();

    // Destroy on page remove
    if (pageContainer.hasClass('page')) {
        pageContainer.once('pageBeforeRemove', detachEvents);
    }

    // Run loader on page load/init
    lazyHandler();

    // Run after page animation
    pageContainer.once('pageAfterAnimation', lazyHandler);
};
app.destroyImagesLazyLoad = function (pageContainer) {
    pageContainer = $(pageContainer);
    if (pageContainer.length > 0 && pageContainer[0].f7DestroyImagesLazyLoad) {
        pageContainer[0].f7DestroyLazyLoad();
    }
};
app.reinitImagesLazyLoad = function (pageContainer) {
    pageContainer = $(pageContainer);
    if (pageContainer.length > 0) {
        pageContainer.trigger('lazy');
    }
};