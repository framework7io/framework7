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
        swipeToClose: true,
        backLinkText: 'Close',
        ofText: 'of',
        loop: false,
        lazyLoading: false,
        lazyLoadingInPrevNext: false,
        lazyLoadingOnTransitionStart: false,
        material: app.params.material,
        materialPreloaderSvg: app.params.materialPreloaderSvg,
        /*
        Callbacks:
        onLazyImageLoad(pb, slide, img)
        onLazyImageReady(pb, slide, img)
        onOpen(pb)
        onClose(pb)
        onTransitionStart(swiper)
        onTransitionEnd(swiper)
        onSlideChangeStart(swiper)
        onSlideChangeEnd(swiper)
        onTap(swiper, e)
        onClick(swiper, e)
        onDoubleTap(swiper, e)
        onSwipeToClose(pb)
        */
    };
    
    params = params || {};
    if (!params.backLinkText && app.params.material) defaults.backLinkText = '';
    for (var def in defaults) {
        if (typeof params[def] === 'undefined') {
            params[def] = defaults[def];
        }
    }

    pb.params = params;
    pb.params.iconsColorClass = pb.params.iconsColor ? 'color-' + pb.params.iconsColor : (pb.params.theme === 'dark' ? 'color-white' : '');
    pb.params.preloaderColorClass = pb.params.theme === 'dark' ? 'preloader-white' : '';

    // Templates
    var photoTemplate = pb.params.photoTemplate || 
        '<div class="photo-browser-slide swiper-slide">' +
            '<span class="photo-browser-zoom-container">' +
                '<img src="{{js "this.url || this"}}">' +
            '</span>' +
        '</div>';
    var photoLazyTemplate = pb.params.lazyPhotoTemplate ||
        '<div class="photo-browser-slide photo-browser-slide-lazy swiper-slide">' +
            '<div class="preloader {{@root.preloaderColorClass}}">{{#if @root.material}}{{@root.materialPreloaderSvg}}{{/if}}</div>' +
            '<span class="photo-browser-zoom-container">' +
                '<img data-src="{{js "this.url || this"}}" class="swiper-lazy">' +
            '</span>' +
        '</div>';
    var objectTemplate = pb.params.objectTemplate ||
        '<div class="photo-browser-slide photo-browser-object-slide swiper-slide">{{js "this.html || this"}}</div>';
    var captionTemplate = pb.params.captionTemplate ||
        '<div class="photo-browser-caption" data-caption-index="{{@index}}">' +
            '{{caption}}' +
        '</div>';
    var navbarTemplate = pb.params.navbarTemplate ||
        '<div class="navbar">' +
            '<div class="navbar-inner">' +
                '<div class="left sliding">' +
                    '<a href="#" class="link close-popup photo-browser-close-link {{#unless backLinkText}}icon-only{{/unless}} {{js "this.type === \'page\' ? \'back\' : \'\'"}}">' +
                        '<i class="icon icon-back {{iconsColorClass}}"></i>' +
                        '{{#if backLinkText}}<span>{{backLinkText}}</span>{{/if}}' +
                    '</a>' +
                '</div>' +
                '<div class="center sliding">' +
                    '<span class="photo-browser-current"></span> ' +
                    '<span class="photo-browser-of">{{ofText}}</span> ' +
                    '<span class="photo-browser-total"></span>' +
                '</div>' +
                '<div class="right"></div>' +
            '</div>' +
        '</div>';
    var toolbarTemplate = pb.params.toolbarTemplate ||
        '<div class="toolbar tabbar">' +
            '<div class="toolbar-inner">' +
                '<a href="#" class="link photo-browser-prev">' +
                    '<i class="icon icon-prev {{iconsColorClass}}"></i>' +
                '</a>' +
                '<a href="#" class="link photo-browser-next">' +
                    '<i class="icon icon-next {{iconsColorClass}}"></i>' +
                '</a>' +
            '</div>' +
        '</div>';

    var htmlTemplate = t7.compile('<div class="photo-browser photo-browser-{{theme}}">' +
            '<div class="view navbar-fixed toolbar-fixed">' +
                '{{#unless material}}{{#if navbar}}' +
                navbarTemplate +
                '{{/if}}{{/unless}}' +
                '<div class="page no-toolbar {{#unless navbar}}no-navbar{{/unless}} toolbar-fixed navbar-fixed" data-page="photo-browser-slides">' +
                    '{{#if material}}{{#if navbar}}' +
                    navbarTemplate +
                    '{{/if}}{{/if}}' +
                    '{{#if toolbar}}' +
                    toolbarTemplate +
                    '{{/if}}' +
                    '<div class="photo-browser-captions photo-browser-captions-{{js "this.captionsTheme || this.theme"}}">' +
                        '{{#each photos}}{{#if caption}}' +
                        captionTemplate +
                        '{{/if}}{{/each}}' +
                    '</div>' +
                    '<div class="photo-browser-swiper-container swiper-container">' +
                        '<div class="photo-browser-swiper-wrapper swiper-wrapper">' +
                            '{{#each photos}}' +
                            '{{#js_compare "this.html || ((typeof this === \'string\' || this instanceof String) && (this.indexOf(\'<\') >= 0 || this.indexOf(\'>\') >= 0))"}}' +
                                objectTemplate +
                            '{{else}}' +
                                '{{#if @root.lazyLoading}}' +
                                photoLazyTemplate +
                                '{{else}}' +
                                photoTemplate +
                                '{{/if}}' +
                            '{{/js_compare}}' +
                            '{{/each}}' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>')(pb.params);

    pb.activeIndex = pb.params.initialSlide;
    pb.openIndex = pb.activeIndex;
    pb.opened = false;

    pb.open = function (index) {
        if (typeof index === 'undefined') index = pb.activeIndex;
        index = parseInt(index, 10);
        if (pb.opened && pb.swiper) {
            pb.swiper.slideTo(index);
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
            if (!pb.params.view) pb.params.view = app.mainView;
            pb.params.view.loadContent(htmlTemplate);
            return;
        }
        pb.layout(pb.openIndex);
        if (pb.params.onOpen) {
            pb.params.onOpen(pb);
        }

    };
    pb.close = function () {
        pb.opened = false;
        if (!pb.swiperContainer || pb.swiperContainer.length === 0) {
            return;
        }
        if (pb.params.onClose) {
            pb.params.onClose(pb);
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
        pb.swiper.destroy();
        // Delete references
        pb.swiper = pb.swiperContainer = pb.swiperWrapper = pb.slides = gestureSlide = gestureImg = gestureImgWrap = undefined;
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

    pb.onSliderTransitionStart = function (swiper) {
        pb.activeIndex = swiper.activeIndex;

        var current = swiper.activeIndex + 1;
        var total = swiper.slides.length;
        if (pb.params.loop) {
            total = total - 2;
            current = current - swiper.loopedSlides;
            if (current < 1) current = total + current;
            if (current > total) current = current - total;
        }
        pb.container.find('.photo-browser-current').text(current);
        pb.container.find('.photo-browser-total').text(total);

        $('.photo-browser-prev, .photo-browser-next').removeClass('photo-browser-link-inactive');
        
        if (swiper.isBeginning && !pb.params.loop) {
            $('.photo-browser-prev').addClass('photo-browser-link-inactive');
        }
        if (swiper.isEnd && !pb.params.loop) {
            $('.photo-browser-next').addClass('photo-browser-link-inactive');
        }

        // Update captions
        if (pb.captions.length > 0) {
            pb.captionsContainer.find('.photo-browser-caption-active').removeClass('photo-browser-caption-active');
            var captionIndex = pb.params.loop ? swiper.slides.eq(swiper.activeIndex).attr('data-swiper-slide-index') : pb.activeIndex;
            pb.captionsContainer.find('[data-caption-index="' + captionIndex + '"]').addClass('photo-browser-caption-active');
        }


        // Stop Video
        var previousSlideVideo = swiper.slides.eq(swiper.previousIndex).find('video');
        if (previousSlideVideo.length > 0) {
            if ('pause' in previousSlideVideo[0]) previousSlideVideo[0].pause();
        }
        // Callback
        if (pb.params.onTransitionStart) pb.params.onTransitionStart(swiper);
    };
    pb.onSliderTransitionEnd = function (swiper) {
        // Reset zoom
        if (pb.params.zoom && gestureSlide && swiper.previousIndex !== swiper.activeIndex) {
            gestureImg.transform('translate3d(0,0,0) scale(1)');
            gestureImgWrap.transform('translate3d(0,0,0)');
            gestureSlide = gestureImg = gestureImgWrap = undefined;
            scale = currentScale = 1;
        }
        if (pb.params.onTransitionEnd) pb.params.onTransitionEnd(swiper);
    };
    
    pb.layout = function (index) {
        if (pb.params.type === 'page') {
            pb.container = $('.photo-browser-swiper-container').parents('.view');
        }
        else {
            pb.container = $('.photo-browser');
        }
        if (pb.params.type === 'standalone') {
            pb.container.addClass('photo-browser-in');
            app.sizeNavbars(pb.container);
        }
        pb.swiperContainer = pb.container.find('.photo-browser-swiper-container');
        pb.swiperWrapper = pb.container.find('.photo-browser-swiper-wrapper');
        pb.slides = pb.container.find('.photo-browser-slide');
        pb.captionsContainer = pb.container.find('.photo-browser-captions');
        pb.captions = pb.container.find('.photo-browser-caption');
        
        var sliderSettings = {
            nextButton: pb.params.nextButton || '.photo-browser-next',
            prevButton: pb.params.prevButton || '.photo-browser-prev',
            indexButton: pb.params.indexButton,
            initialSlide: index,
            spaceBetween: pb.params.spaceBetween,
            speed: pb.params.speed,
            loop: pb.params.loop,
            lazyLoading: pb.params.lazyLoading,
            lazyLoadingInPrevNext: pb.params.lazyLoadingInPrevNext,
            lazyLoadingOnTransitionStart: pb.params.lazyLoadingOnTransitionStart,
            preloadImages: pb.params.lazyLoading ? false : true,
            onTap: function (swiper, e) {
                if (pb.params.onTap) pb.params.onTap(swiper, e);
            },
            onClick: function (swiper, e) {
                if (pb.params.exposition) pb.toggleExposition();
                if (pb.params.onClick) pb.params.onClick(swiper, e);
            },
            onDoubleTap: function (swiper, e) {
                pb.toggleZoom($(e.target).parents('.photo-browser-slide'));
                if (pb.params.onDoubleTap) pb.params.onDoubleTap(swiper, e);
            },
            onTransitionStart: function (swiper) {
                pb.onSliderTransitionStart(swiper);
            },
            onTransitionEnd: function (swiper) {
                pb.onSliderTransitionEnd(swiper);  
            },
            onSlideChangeStart: pb.params.onSlideChangeStart,
            onSlideChangeEnd: pb.params.onSlideChangeEnd,
            onLazyImageLoad: function (swiper, slide, img) {
                if (pb.params.onLazyImageLoad) pb.params.onLazyImageLoad(pb, slide, img);
            },
            onLazyImageReady: function (swiper, slide, img) {
                $(slide).removeClass('photo-browser-slide-lazy');
                if (pb.params.onLazyImageReady) pb.params.onLazyImageReady(pb, slide, img);
            }
        };

        if (pb.params.swipeToClose && pb.params.type !== 'page') {
            sliderSettings.onTouchStart = pb.swipeCloseTouchStart;
            sliderSettings.onTouchMoveOpposite = pb.swipeCloseTouchMove;
            sliderSettings.onTouchEnd = pb.swipeCloseTouchEnd;
        }

        pb.swiper = app.swiper(pb.swiperContainer, sliderSettings);
        if (index === 0) {
            pb.onSliderTransitionStart(pb.swiper);
        }
        pb.attachEvents();
    };
    pb.attachEvents = function (detach) {
        var action = detach ? 'off' : 'on';
        // Slide between photos

        if (pb.params.zoom) {
            var target = pb.params.loop ? pb.swiper.slides : pb.slides;
            // Scale image
            target[action]('gesturestart', pb.onSlideGestureStart);
            target[action]('gesturechange', pb.onSlideGestureChange);
            target[action]('gestureend', pb.onSlideGestureEnd);

            // Move image
            target[action](app.touchEvents.start, pb.onSlideTouchStart);
            target[action](app.touchEvents.move, pb.onSlideTouchMove);
            target[action](app.touchEvents.end, pb.onSlideTouchEnd);
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
    pb.enableExposition = function () {
        if (pb.container) pb.container.addClass('photo-browser-exposed');
        if (pb.params.expositionHideCaptions) pb.captionsContainer.addClass('photo-browser-captions-exposed');
        pb.exposed = true;
    };
    pb.disableExposition = function () {
        if (pb.container) pb.container.removeClass('photo-browser-exposed');
        if (pb.params.expositionHideCaptions) pb.captionsContainer.removeClass('photo-browser-captions-exposed');
        pb.exposed = false;
    };
    
    // Gestures
    var gestureSlide, gestureImg, gestureImgWrap, scale = 1, currentScale = 1, isScaling = false;
    pb.onSlideGestureStart = function (e) {
        if (!gestureSlide || !gestureSlide.length) {
            gestureSlide = $(this);
            if (gestureSlide.length === 0) gestureSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
            gestureImg = gestureSlide.find('img, svg, canvas');
            gestureImgWrap = gestureImg.parent('.photo-browser-zoom-container');
            if (gestureImgWrap.length === 0) {
                gestureImg = undefined;
                return;
            }
        }
        gestureImg.transition(0);
        isScaling = true;
    };
    pb.onSlideGestureChange = function (e) {
        if (!gestureImg || gestureImg.length === 0) return;
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
        if (!gestureImg || gestureImg.length === 0) return;
        scale = Math.max(Math.min(scale, pb.params.maxZoom), pb.params.minZoom);
        gestureImg.transition(pb.params.speed).transform('translate3d(0,0,0) scale(' + scale + ')');
        currentScale = scale;
        isScaling = false;
        if (scale === 1) gestureSlide = undefined;
    };
    pb.toggleZoom = function () {
        if (!gestureSlide) {
            gestureSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
            gestureImg = gestureSlide.find('img, svg, canvas');
            gestureImgWrap = gestureImg.parent('.photo-browser-zoom-container');
        }
        if (!gestureImg || gestureImg.length === 0) return;
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
        if (!gestureImg || gestureImg.length === 0) return;
        if (imageIsTouched) return;
        if (app.device.os === 'android') e.preventDefault();
        imageIsTouched = true;
        imageTouchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
        imageTouchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    };
    pb.onSlideTouchMove = function (e) {
        if (!gestureImg || gestureImg.length === 0) return;
        pb.swiper.allowClick = false;
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

        if (scaledWidth < pb.swiper.width && scaledHeight < pb.swiper.height) return;

        imageMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
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
        e.preventDefault();
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
        if (!gestureImg || gestureImg.length === 0) return;
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
        imageMinX = Math.min((pb.swiper.width / 2 - scaledWidth / 2), 0);
        imageMaxX = -imageMinX;
        imageMinY = Math.min((pb.swiper.height / 2 - scaledHeight / 2), 0);
        imageMaxY = -imageMinY;
        imageCurrentX = Math.max(Math.min(imageCurrentX, imageMaxX), imageMinX);
        imageCurrentY = Math.max(Math.min(imageCurrentY, imageMaxY), imageMinY);

        gestureImgWrap.transition(momentumDuration).transform('translate3d(' + imageCurrentX + 'px, ' + imageCurrentY + 'px,0)');
    };

    // Swipe Up To Close
    var swipeToCloseIsTouched = false;
    var allowSwipeToClose = true;
    var swipeToCloseDiff, swipeToCloseStart, swipeToCloseCurrent, swipeToCloseStarted = false, swipeToCloseActiveSlide, swipeToCloseTimeStart;
    pb.swipeCloseTouchStart = function (swiper, e) {
        if (!allowSwipeToClose) return;
        swipeToCloseIsTouched = true;
    };
    pb.swipeCloseTouchMove = function (swiper, e) {
        if (!swipeToCloseIsTouched) return;
        if (!swipeToCloseStarted) {
            swipeToCloseStarted = true;
            swipeToCloseStart = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
            swipeToCloseActiveSlide = pb.swiper.slides.eq(pb.swiper.activeIndex);
            swipeToCloseTimeStart = (new Date()).getTime();
        }
        e.preventDefault();
        swipeToCloseCurrent = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        swipeToCloseDiff = swipeToCloseStart - swipeToCloseCurrent;
        var opacity = 1 - Math.abs(swipeToCloseDiff) / 300;
        swipeToCloseActiveSlide.transform('translate3d(0,' + (-swipeToCloseDiff) + 'px,0)');
        pb.swiper.container.css('opacity', opacity).transition(0);
    };
    pb.swipeCloseTouchEnd = function (swiper, e) {
        swipeToCloseIsTouched = false;
        if (!swipeToCloseStarted) {
            swipeToCloseStarted = false;
            return;
        }
        swipeToCloseStarted = false;
        allowSwipeToClose = false;
        var diff = Math.abs(swipeToCloseDiff);
        var timeDiff = (new Date()).getTime() - swipeToCloseTimeStart;
        if ((timeDiff < 300 && diff > 20) || (timeDiff >= 300 && diff > 100)) {
            setTimeout(function () {
                if (pb.params.type === 'standalone') {
                    pb.close();
                }
                if (pb.params.type === 'popup') {
                    app.closeModal(pb.popup);
                }
                if (pb.params.onSwipeToClose) {
                    pb.params.onSwipeToClose(pb);
                }
                allowSwipeToClose = true;
            }, 0);
            return;
        }
        if (diff !== 0) {
            swipeToCloseActiveSlide.addClass('transitioning').transitionEnd(function () {
                allowSwipeToClose = true;
                swipeToCloseActiveSlide.removeClass('transitioning');
            });
        }
        else {
            allowSwipeToClose = true;
        }
        pb.swiper.container.css('opacity', '').transition('');
        swipeToCloseActiveSlide.transform('');
    };

    return pb;
};

app.photoBrowser = function (params) {
    return new PhotoBrowser(params);
};
