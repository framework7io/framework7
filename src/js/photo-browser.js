/*======================================================
************   Photo Browser   ************
======================================================*/
var PhotoBrowser = function (options) {
    var pb = this, i;

    var defaults = {
        photos : [],
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        zoom: true,
        maxZoom: 3,
        minZoom: 1,
        expose: true,
        type: 'standalone',
        navbar: true,
        toolbar: true,
    };
    
    options = options || {};
    for (var def in defaults) {
        if (typeof options[def] === 'undefined') {
            options[def] = defaults[def];
        }
    }

    pb.options = options;
    
    if (pb.options.type === 'page' && !pb.options.view) {
        for (i = 0; i < app.views.length; i ++) {
            if (app.views[i].main) pb.options.view = app.views[i];
        }
        if (!pb.options.view) return pb;
    }

    var navbarTemplate = pb.options.navbarTemplate ||
                        '<div class="navbar">' +
                            '<div class="navbar-inner">' +
                                '<div class="left sliding"><a href="#" class="back link close-popup photo-browser-close-link"><i class="icon icon-back-blue"></i><span>Back</span></a></div>' +
                                '<div class="center sliding"><span><span class="photo-browser-current"></span> of <span class="photo-browser-total"></span></span></div>' +
                                '<div class="right"></div>' +
                            '</div>' +
                        '</div>';

    var toolbarTemplate = pb.options.toolbarTemplate ||
                        '<div class="toolbar">' +
                            '<div class="toolbar-inner">' +
                                '<a href="#" class="link photo-browser-prev">Prev</a>' +
                                '<a href="#" class="link photo-browser-next">Next</a>' +
                            '</div>' +
                        '</div>';

    var template = pb.options.template ||
                    '<div class="photo-browser">' +
                        '<div class="view navbar-fixed toolbar-fixed">' +
                            '{{navbar}}' +
                            '<div data-page="photo-browser-slides" class="page no-toolbar {{noNavbar}} toolbar-fixed navbar-fixed">' +
                                '<div class="photo-browser-slider-container slider-container">' +
                                    '<div class="photo-browser-slider-wrapper slider-wrapper">' +
                                        '{{photos}}' +
                                    '</div>' +
                                '</div>' +
                                '{{toolbar}}' +
                            '</div>' +
                        '</div>' +
                    '</div>';

    var photosHtml = '';
    for (i = 0; i < pb.options.photos.length; i ++) {
        photosHtml += '<div class="photo-browser-slide slider-slide"><span class="photo-browser-zoom-container"><img src="' + pb.options.photos[i] + '"></span></div>';
    }

    var htmlTemplate = template
                        .replace('{{navbar}}', (pb.options.navbar ? navbarTemplate : ''))
                        .replace('{{noNavbar}}', (pb.options.navbar ? '' : 'no-navbar'))
                        .replace('{{photos}}', photosHtml)
                        .replace('{{toolbar}}', (pb.options.toolbar ? toolbarTemplate : ''));

    pb.activeSlideIndex = pb.options.initialSlide;
    pb.openIndex = pb.activeSlideIndex;
    pb.opened = false;

    pb.open = function (index) {
        if (typeof index === 'undefined') index = pb.activeSlideIndex;
        if (pb.opened && pb.slider) {
            pb.slider.slideTo(index);
            return;
        }
        pb.opened = true;
        pb.openIndex = index;
        if (pb.options.type === 'standalone') {
            $('body').append(htmlTemplate);
        }
        if (pb.options.type === 'popup') {
            pb.popup = app.popup('<div class="popup photo-browser-popup">' + htmlTemplate + '</div>');
            $(pb.popup).on('closed', pb.onPopupClose);
        }
        if (pb.options.type === 'page') {
            $(document).on('pageBeforeInit', pb.onPageBeforeInit);
            $(document).on('pageBeforeRemove', pb.onPageBeforeRemove);
            pb.options.view.loadContent(htmlTemplate);
            return;
        }
        pb.layout(pb.openIndex);

    };
    pb.destroy = function () {
        pb.opened = false;
        if (!pb.sliderContainer || pb.sliderContainer.length === 0) {
            return;
        }
        // Detach events
        pb.attachEvents(true);
        // Delete from DOM
        if (pb.options.type === 'standalone') {
            pb.container.removeClass('photo-browser-in').addClass('photo-browser-out').animationEnd(function () {
                pb.container.remove();
            });
        }
        // Destroy slider
        pb.slider.destroy();
        // Delete references
        pb.slider = pb.sliderContainer = pb.sliderWrapper = pb.slides = gestureSlide = gestureImg = gestureImgWrap = undefined;
    };

    pb.onPopupClose = function (e) {
        pb.destroy();
        $(pb.popup).off('pageBeforeInit', pb.onPopupClose);
    };
    pb.onPageBeforeInit = function (e) {
        if (e.detail.page.name === 'photo-browser-slides') {
            pb.layout(pb.openIndex);
        }
        $(document).off('pageBeforeInit', pb.onPageBeforeInit);
    };
    pb.onPageBeforeRemove = function (e) {
        if (e.detail.page.name === 'photo-browser-slides') {
            pb.destroy();
        }
        $(document).off('pageBeforeRemove', pb.onPageBeforeRemove);
    };

    pb.layout = function (index) {
        if (pb.options.type === 'page') {
            pb.container = $('.photo-browser-slider-container').parents('.view');
        }
        else {
            pb.container = $('.photo-browser');
        }
        if (pb.options.type === 'standalone') {
            pb.container.addClass('photo-browser-in');
            app.sizeNavbars(pb.container);
        }
        pb.sliderContainer = pb.container.find('.photo-browser-slider-container');
        pb.sliderWrapper = pb.container.find('.photo-browser-slider-wrapper');
        pb.slides = pb.container.find('.photo-browser-slide');
        

        pb.slider = app.slider(pb.sliderContainer, {
            nextButton: '.photo-browser-next',
            prevButton: '.photo-browser-prev',
            initialSlide: index,
            spaceBetween: pb.options.spaceBetween,
            speed: pb.options.speed,
            onClick: function (e) {
                if (pb.options.expose) pb.container.toggleClass('photo-browser-exposed');
            },
            onDoubleTap: function (e) {
                pb.toggleZoom($(e.target).parents('.photo-browser-slide'));
            },
            onSlideChangeStart: function (slider) {
                pb.activeSlideIndex = slider.activeSlideIndex;
                pb.container.find('.photo-browser-current').text(slider.activeSlideIndex + 1);
                pb.container.find('.photo-browser-total').text(slider.slides.length);
            },
            onSlideChangeEnd: function (slider) {
                // Reset zoom
                if (pb.options.zoom && gestureSlide && slider.previousSlideIndex !== slider.activeSlideIndex) {
                    gestureImg.transform('translate3d(0,0,0) scale(1)');
                    gestureImgWrap.transform('translate3d(0,0,0)');
                    gestureSlide = gestureImg = gestureImgWrap = undefined;
                    scale = currentScale = 1;
                }
            }
        });

        pb.attachEvents();
    };
    pb.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        // Slide between photos

        if (pb.options.zoom) {
            // Scale image
            pb.slides[action]('gesturestart', pb.onSlideGestureStart);
            pb.slides[action]('gesturechange', pb.onSlideGestureChange);
            pb.slides[action]('gestureend', pb.onSlideGestureEnd);

            // Move image
            pb.slides[action](app.touchEvents.start, pb.onSlideTouchStart);
            pb.slides[action](app.touchEvents.move, pb.onSlideTouchMove);
            pb.slides[action](app.touchEvents.end, pb.onSlideTouchEnd);
        }
        pb.container.find('.photo-browser-close-link')[action]('click', pb.destroy);
    };

    var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, animating = false, currentTranslate;
    var allowClick = true;

    
    // Gestures
    var gestureSlide, gestureImg, gestureImgWrap, scale = 1, currentScale = 1, isScaling = false;
    pb.onSlideGestureStart = function (e) {
        if (!gestureSlide) {
            gestureSlide = $(this);
            gestureImg = gestureSlide.find('img');
            gestureImgWrap = gestureImg.parent();
        }
        gestureImg.transition(0);
        isScaling = true;
    };
    pb.onSlideGestureChange = function (e) {
        scale = e.scale * currentScale;
        if (scale > pb.options.maxZoom) {
            scale = pb.options.maxZoom - 1 + Math.pow((scale - pb.options.maxZoom + 1), 0.5);
        }
        if (scale < pb.options.minZoom) {
            scale =  pb.options.minZoom + 1 - Math.pow((pb.options.minZoom - scale + 1), 0.5);
        }
        gestureImg.transform('translate3d(0,0,0) scale(' + scale + ')');
    };
    pb.onSlideGestureEnd = function (e) {
        scale = Math.max(Math.min(scale, pb.options.maxZoom), pb.options.minZoom);
        gestureImg.transition(pb.options.speed).transform('translate3d(0,0,0) scale(' + scale + ')');
        currentScale = scale;
        isScaling = false;
        if (scale === 1) gestureSlide = undefined;
    };
    pb.toggleZoom = function () {
        if (!gestureSlide) {
            gestureSlide = pb.slides.eq(pb.slider.activeSlideIndex);
            gestureImg = gestureSlide.find('img');
            gestureImgWrap = gestureImg.parent();
        }
        gestureImgWrap.transition(300).transform('translate3d(0,0,0)');
        if (scale && scale !== 1) {
            scale = currentScale = 1;
            gestureImg.transition(300).transform('translate3d(0,0,0) scale(1)');
            gestureSlide = undefined;
        }
        else {
            scale = currentScale = pb.options.maxZoom;
            gestureImg.transition(300).transform('translate3d(0,0,0) scale(' + scale + ')');
        }
    };

    var imageIsTouched, imageIsMoved, imageCurrentX, imageCurrentY, imageMinX, imageMinY, imageMaxX, imageMaxY, imageWidth, imageHeight, imageTouchesStart = {}, imageTouchesCurrent = {}, imageStartX, imageStartY, velocityPrevPositionX, velocityPrevTime, velocityX, velocityPrevPositionY, velocityY;

    pb.onSlideTouchStart = function (e) {
        if (imageIsTouched) return;
        imageIsTouched = true;
        imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    };
    pb.onSlideTouchMove = function (e) {
        pb.slider.allowClick = false;
        if (!imageIsTouched || !gestureSlide) return;

        if (!imageIsMoved) {
            imageWidth = gestureImg[0].offsetWidth;
            imageHeight = gestureImg[0].offsetHeight;
            imageStartX = $.getTranslate(gestureImgWrap[0], 'x') || 0;
            imageStartY = $.getTranslate(gestureImgWrap[0], 'y') || 0;
            gestureImgWrap.transition(0);
        }
        // Define if we need image drag
        var scaledWidth = imageWidth * scale;
        var scaledHeight = imageHeight * scale;

        if (scaledWidth < pb.slider.width && scaledHeight < pb.slider.height) return;

        imageMinX = Math.min((pb.slider.width / 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((pb.slider.height / 2 - scaledHeight / 2), 0);
        imageMaxY = -imageMinY;
        
        imageTouchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
        imageTouchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

        if (!imageIsMoved && !isScaling) {
            if (
                (Math.floor(imageMinX) === Math.floor(imageStartX) && imageTouchesCurrent.x < imageTouchesStart.x) ||
                (Math.floor(imageMaxX) === Math.floor(imageStartX) && imageTouchesCurrent.x > imageTouchesStart.x)
                ) {
                imageIsTouched = false;
                return;
            }
        }
        
        e.stopPropagation();
        imageIsMoved = true;
        imageCurrentX = imageTouchesCurrent.x - imageTouchesStart.x + imageStartX;
        imageCurrentY = imageTouchesCurrent.y - imageTouchesStart.y + imageStartY;
        
        
        if (imageCurrentX < imageMinX) {
            imageCurrentX =  imageMinX + 1 - Math.pow((imageMinX - imageCurrentX + 1), 0.8);
        }
        if (imageCurrentX > imageMaxX) {
            imageCurrentX = imageMaxX - 1 + Math.pow((imageCurrentX - imageMaxX + 1), 0.8);
        }
        
        if (imageCurrentY < imageMinY) {
            imageCurrentY =  imageMinY + 1 - Math.pow((imageMinY - imageCurrentY + 1), 0.8);
        }
        if (imageCurrentY > imageMaxY) {
            imageCurrentY = imageMaxY - 1 + Math.pow((imageCurrentY - imageMaxY + 1), 0.8);
        }

        //Velocity
        if (!velocityPrevPositionX) velocityPrevPositionX = imageTouchesCurrent.x;
        if (!velocityPrevPositionY) velocityPrevPositionY = imageTouchesCurrent.y;
        if (!velocityPrevTime) velocityPrevTime = Date.now();
        velocityX = (imageTouchesCurrent.x - velocityPrevPositionX) / (Date.now() - velocityPrevTime) / 2;
        velocityY = (imageTouchesCurrent.y - velocityPrevPositionY) / (Date.now() - velocityPrevTime) / 2;
        if (Math.abs(imageTouchesCurrent.x - velocityPrevPositionX) < 2) velocityX = 0;
        if (Math.abs(imageTouchesCurrent.y - velocityPrevPositionY) < 2) velocityY = 0;
        velocityPrevPositionX = imageTouchesCurrent.x;
        velocityPrevPositionY = imageTouchesCurrent.y;
        velocityPrevTime = Date.now();

        gestureImgWrap.transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
    };
    pb.onSlideTouchEnd = function (e) {
        if (!imageIsTouched || !imageIsMoved) {
            imageIsTouched = false;
            imageIsMoved = false;
            return;
        }
        imageIsTouched = false;
        imageIsMoved = false;
        var momentumDurationX = 300;
        var momentumDurationY = 300;
        var momentumDistanceX = velocityX * momentumDurationX;
        var newPositionX = imageCurrentX + momentumDistanceX;
        var momentumDistanceY = velocityY * momentumDurationY;
        var newPositionY = imageCurrentY + momentumDistanceY;

        //Fix duration
        if (velocityX !== 0) momentumDurationX = Math.abs((newPositionX - imageCurrentX) / velocityX);
        if (velocityY !== 0) momentumDurationY = Math.abs((newPositionY - imageCurrentY) / velocityY);
        var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

        imageCurrentX = newPositionX;
        imageCurrentY = newPositionY;

        // Define if we need image drag
        var scaledWidth = imageWidth * scale;
        var scaledHeight = imageHeight * scale;
        imageMinX = Math.min((pb.slider.width / 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((pb.slider.height / 2 - scaledHeight / 2), 0);
        imageMaxY = -imageMinY;
        imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
        imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);

        gestureImgWrap.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
    };

    return pb;
};

app.photoBrowser = function (options) {
    return new PhotoBrowser(options);
};
