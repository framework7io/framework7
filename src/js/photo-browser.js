/*======================================================
************   Photo Browser   ************
======================================================*/
var PhotoBrowser = function (params) {
    var pb = this, i;

    var defaults = {
        photos : [],
        initialSlide: 0,
        spaceBetween: 20,
        speed: 300,
        zoom: true,
        maxZoom: 3,
        minZoom: 1,
        exposition: true,
        expositionHideCaptions: false,
        type: 'standalone',
        navbar: true,
        toolbar: true,
        theme: 'light',
        backLinkText: 'Close'
    };
    
    params = params || {};
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    pb.params = params;
    
    function findView() {
        var view;
        for (i = 0; i < app.views.length; i ++) {
            if (app.views[i].main) view = app.views[i];
        }
        return view;
    }

    var iconColor = pb.params.theme === 'dark' ? 'white' : 'blue';

    var navbarTemplate = pb.params.navbarTemplate ||
                        '<div class="navbar">' +
                            '<div class="navbar-inner">' +
                                '<div class="left sliding"><a href="#" class="link ' + (pb.params.type === 'page' && 'back') + ' close-popup photo-browser-close-link"><i class="icon icon-back-' + iconColor + '"></i><span>' + pb.params.backLinkText + '</span></a></div>' +
                                '<div class="center sliding"><span><span class="photo-browser-current"></span> of <span class="photo-browser-total"></span></span></div>' +
                                '<div class="right"></div>' +
                            '</div>' +
                        '</div>';

    var toolbarTemplate = pb.params.toolbarTemplate ||
                        '<div class="toolbar tabbar">' +
                            '<div class="toolbar-inner">' +
                                '<a href="#" class="link photo-browser-prev"><i class="icon icon-prev-' + iconColor + '"></i></a>' +
                                '<a href="#" class="link photo-browser-next"><i class="icon icon-next-' + iconColor + '"></i></a>' +
                            '</div>' +
                        '</div>';

    var template = pb.params.template ||
                    '<div class="photo-browser photo-browser-' + pb.params.theme + '">' +
                        '<div class="view navbar-fixed toolbar-fixed">' +
                            '{{navbar}}' +
                            '<div data-page="photo-browser-slides" class="page no-toolbar {{noNavbar}} toolbar-fixed navbar-fixed">' +
                                '{{toolbar}}' +
                                '{{captions}}' +
                                '<div class="photo-browser-slider-container slider-container">' +
                                    '<div class="photo-browser-slider-wrapper slider-wrapper">' +
                                        '{{photos}}' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';

    var photoTemplate = pb.params.photoTemplate || '<div class="photo-browser-slide slider-slide"><span class="photo-browser-zoom-container"><img src="{{url}}"></span></div>';
    var captionsTheme = pb.params.captionsTheme || pb.params.theme;
    var captionsTemplate = pb.params.captionsTemplate || '<div class="photo-browser-captions photo-browser-captions-' + captionsTheme + '">{{captions}}</div>';
    var captionTemplate = pb.params.captionTemplate || '<div class="photo-browser-caption" data-caption-index="{{captionIndex}}">{{caption}}</div>';

    var objectTemplate = pb.params.objectTemplate || '<div class="photo-browser-slide photo-browser-object-slide slider-slide">{{html}}</div>';
    var photosHtml = '';
    var captionsHtml = '';
    for (i = 0; i < pb.params.photos.length; i ++) {
        var photo = pb.params.photos[i];
        var thisTemplate = '';

        //check if photo is a string or string-like object, for backwards compatibility 
        if (typeof(photo) === 'string' || photo instanceof String) {

            //check if "photo" is html object
            if (photo.indexOf('<') >= 0 || photo.indexOf('>') >= 0) {
                thisTemplate = objectTemplate.replace(/{{html}}/g, photo);
            } else {
                thisTemplate = photoTemplate.replace(/{{url}}/g, photo);
            }

            //photo is a string, thus has no caption, so remove the caption template placeholder
            // captionsHtml += captionTemplate.replace(/{{caption}}/g, '');

            //otherwise check if photo is an object with a url property
        } else if (typeof(photo) === 'object') {

            //check if "photo" is html object
            if (photo.hasOwnProperty('html') && photo.html.length > 0) {
                thisTemplate = objectTemplate.replace(/{{html}}/g, photo.html);
            } else if (photo.hasOwnProperty('url') && photo.url.length > 0) {
                thisTemplate = photoTemplate.replace(/{{url}}/g, photo.url);
            }

            //check if photo has a caption
            if (photo.hasOwnProperty('caption') && photo.caption.length > 0) {
                captionsHtml += captionTemplate.replace(/{{caption}}/g, photo.caption).replace(/{{captionIndex}}/g, i);
            } else {
                thisTemplate = thisTemplate.replace(/{{caption}}/g, '');
                // captionsHtml += captionTemplate.replace(/{{caption}}/g, '');
            }
        }

        photosHtml += thisTemplate;

    }

    var htmlTemplate = template
                        .replace('{{navbar}}', (pb.params.navbar ? navbarTemplate : ''))
                        .replace('{{noNavbar}}', (pb.params.navbar ? '' : 'no-navbar'))
                        .replace('{{photos}}', photosHtml)
                        .replace('{{captions}}', captionsTemplate.replace(/{{captions}}/g, captionsHtml))
                        .replace('{{toolbar}}', (pb.params.toolbar ? toolbarTemplate : ''));

    pb.activeSlideIndex = pb.params.initialSlide;
    pb.openIndex = pb.activeSlideIndex;
    pb.opened = false;

    pb.open = function (index) {
        if (typeof index === 'undefined') index = pb.activeSlideIndex;
        index = parseInt(index, 10);
        if (pb.opened && pb.slider) {
            pb.slider.slideTo(index);
            return;
        }
        pb.opened = true;
        pb.openIndex = index;
        if (pb.params.type === 'standalone') {
            $('body').append(htmlTemplate);
        }
        if (pb.params.type === 'popup') {
            pb.popup = app.popup('<div class="popup photo-browser-popup">' + htmlTemplate + '</div>');
            $(pb.popup).on('closed', pb.onPopupClose);
        }
        if (pb.params.type === 'page') {
            $(document).on('pageBeforeInit', pb.onPageBeforeInit);
            $(document).on('pageBeforeRemove', pb.onPageBeforeRemove);
            if (!pb.params.view) pb.params.view = findView();
            pb.params.view.loadContent(htmlTemplate);
            return;
        }
        pb.layout(pb.openIndex);

    };
    pb.close = function () {
        pb.opened = false;
        if (!pb.sliderContainer || pb.sliderContainer.length === 0) {
            return;
        }
        // Detach events
        pb.attachEvents(true);
        // Delete from DOM
        if (pb.params.type === 'standalone') {
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
        pb.close();
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
            pb.close();
        }
        $(document).off('pageBeforeRemove', pb.onPageBeforeRemove);
    };

    pb.layout = function (index) {
        if (pb.params.type === 'page') {
            pb.container = $('.photo-browser-slider-container').parents('.view');
        }
        else {
            pb.container = $('.photo-browser');
        }
        if (pb.params.type === 'standalone') {
            pb.container.addClass('photo-browser-in');
            app.sizeNavbars(pb.container);
        }
        pb.sliderContainer = pb.container.find('.photo-browser-slider-container');
        pb.sliderWrapper = pb.container.find('.photo-browser-slider-wrapper');
        pb.slides = pb.container.find('.photo-browser-slide');
        pb.captionsContainer = pb.container.find('.photo-browser-captions');
        pb.captions = pb.container.find('.photo-browser-caption');
        
        pb.slider = app.slider(pb.sliderContainer, {
            nextButton: pb.params.nextButton || '.photo-browser-next',
            prevButton: pb.params.prevButton || '.photo-browser-prev',
            indexButton: pb.params.indexButton,
            initialSlide: index,
            spaceBetween: pb.params.spaceBetween,
            speed: pb.params.speed,
            onTap: function (slider, e) {
                if (pb.params.onTap) pb.params.onTap(slider, e);
            },
            onClick: function (slider, e) {
                if (pb.params.exposition) pb.toggleExposition();
                if (pb.params.onClick) pb.params.onClick(slider, e);
            },
            onDoubleTap: function (slider, e) {
                pb.toggleZoom($(e.target).parents('.photo-browser-slide'));
                if (pb.params.onDoubleTap) pb.params.onDoubleTap(slider, e);
            },
            onSlideChangeStart: function (slider) {
                pb.activeSlideIndex = slider.activeSlideIndex;
                pb.container.find('.photo-browser-current').text(slider.activeSlideIndex + 1);
                pb.container.find('.photo-browser-total').text(slider.slides.length);
                if (slider.isFirst) {
                    $('.photo-browser-prev').addClass('photo-browser-link-inactive');
                    $('.photo-browser-next').removeClass('photo-browser-link-inactive');
                }
                else if (slider.isLast) {
                    $('.photo-browser-next').addClass('photo-browser-link-inactive');
                    $('.photo-browser-prev').removeClass('photo-browser-link-inactive');
                }
                else {
                    $('.photo-browser-prev, .photo-browser-next').removeClass('photo-browser-link-inactive');
                }

                // Update captions
                if (pb.captions.length > 0) {
                    pb.captionsContainer.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
                    pb.captionsContainer.find('[data-caption-index="' + pb.activeSlideIndex + '"]').addClass('photo-browser-caption-active');
                }

                // Stop Video
                var previousSlideVideo = slider.slides.eq(slider.previousSlideIndex).find('video');
                if (previousSlideVideo.length > 0) {
                    if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
                }
                // Callback
                if (pb.params.onSlideChangeStart) pb.params.onSlideChangeStart(slider);
            },
            onSlideChangeEnd: function (slider) {
                // Reset zoom
                if (pb.params.zoom && gestureSlide && slider.previousSlideIndex !== slider.activeSlideIndex) {
                    gestureImg.transform('translate3d(0,0,0) scale(1)');
                    gestureImgWrap.transform('translate3d(0,0,0)');
                    gestureSlide = gestureImg = gestureImgWrap = undefined;
                    scale = currentScale = 1;
                }
                if (pb.params.onSlideChangeEnd) pb.params.onSlideChangeEnd(slider);
            }
        });

        pb.attachEvents();

        

    };
    pb.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        // Slide between photos

        if (pb.params.zoom) {
            // Scale image
            pb.slides[action]('gesturestart', pb.onSlideGestureStart);
            pb.slides[action]('gesturechange', pb.onSlideGestureChange);
            pb.slides[action]('gestureend', pb.onSlideGestureEnd);

            // Move image
            pb.slides[action](app.touchEvents.start, pb.onSlideTouchStart);
            pb.slides[action](app.touchEvents.move, pb.onSlideTouchMove);
            pb.slides[action](app.touchEvents.end, pb.onSlideTouchEnd);
        }
        pb.container.find('.photo-browser-close-link')[action]('click', pb.close);
    };

    var isTouched, isMoved, touchesStart = {}, touchesCurrent = {}, touchStartTime, isScrolling, animating = false, currentTranslate;
    var allowClick = true;

    // Expose
    pb.exposed = false;
    pb.toggleExposition = function () {
        if (pb.container) pb.container.toggleClass('photo-browser-exposed');
        if (pb.params.expositionHideCaptions) pb.captionsContainer.toggleClass('photo-browser-captions-exposed');
        pb.exposed = !pb.exposed;
    };
    pb.expositionOn = function () {
        if (pb.container) pb.container.addClass('photo-browser-exposed');
        if (pb.params.expositionHideCaptions) pb.captionsContainer.addClass('photo-browser-captions-exposed');
        pb.exposed = true;
    };
    pb.expositionOff = function () {
        if (pb.container) pb.container.removeClass('photo-browser-exposed');
        if (pb.params.expositionHideCaptions) pb.captionsContainer.removeClass('photo-browser-captions-exposed');
        pb.exposed = false;
    };
    
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
        if (scale > pb.params.maxZoom) {
            scale = pb.params.maxZoom - 1 + Math.pow((scale - pb.params.maxZoom + 1), 0.5);
        }
        if (scale < pb.params.minZoom) {
            scale =  pb.params.minZoom + 1 - Math.pow((pb.params.minZoom - scale + 1), 0.5);
        }
        gestureImg.transform('translate3d(0,0,0) scale(' + scale + ')');
    };
    pb.onSlideGestureEnd = function (e) {
        scale = Math.max(Math.min(scale, pb.params.maxZoom), pb.params.minZoom);
        gestureImg.transition(pb.params.speed).transform('translate3d(0,0,0) scale(' + scale + ')');
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
            scale = currentScale = pb.params.maxZoom;
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

app.photoBrowser = function (params) {
    return new PhotoBrowser(params);
};
