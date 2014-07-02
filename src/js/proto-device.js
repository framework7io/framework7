/*===========================
 Device/OS Detection
 ===========================*/
Framework7.prototype.device = (function () {
    var device = {},
        ua = navigator.userAgent,
        android = ua.match(/(Android);?[\s\/]+([\d.]+)?/),
        ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
        ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/),
        iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
        osVersionArr, windowWidth, windowHeight, className, major, i;

    device.ios = device.android = device.iphone = device.ipad = false;

    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
        device.android = true;
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
        device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
        device.osVersion = iphone[2].replace(/_/g, '.');
        device.iphone = true;
    }
    if (ipad) {
        device.osVersion = ipad[2].replace(/_/g, '.');
        device.ipad = true;
    }
    if (ipod) {
        device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
        device.iphone = true;
    }

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
        osVersionArr = device.osVersion.split('.');
        device.minimalUi = !device.webView &&
            (ipod || iphone) &&
            (osVersionArr[0] === 7 ? osVersionArr[1] >= 1 : osVersionArr[0] > 7) &&
            $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
    }

    // Check for status bar and fullscreen app mode
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    device.statusBar = (
        device.webView &&
            (
                // iPhone 5
                (windowWidth === 320 && windowHeight === 568) ||
                    (windowWidth === 568 && windowHeight === 320) ||
                    // iPhone 4
                    (windowWidth === 320 && windowHeight === 480) ||
                    (windowWidth === 480 && windowHeight === 320) ||
                    // iPad
                    (windowWidth === 768 && windowHeight === 1024) ||
                    (windowWidth === 1024 && windowHeight === 768)
                )
        );

    // Pixel Ratio
    device.pixelRatio = window.devicePixelRatio || 1;

    // Add html classes
    if (device.os) {
        className = device.os +
            ' ' +
            device.os + '-' + device.osVersion.split('.')[0] +
            ' ' +
            device.os + '-' + device.osVersion.replace(/\./g, '-');
        if (device.os === 'ios') {
            major = parseInt(device.osVersion.split('.')[0], 10);
            for (i = major - 1; i >= 6; i--) {
                className += ' ' + 'ios-gt-' + i;
            }
        }
        $('html').addClass(className);
    }
    if (device.statusBar) {
        $('html').addClass('with-statusbar-overlay');
    }
    else {
        $('html').removeClass('with-statusbar-overlay');
    }

    // Export object
    return device;
})();
