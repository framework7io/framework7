/*===========================
Device/OS Detection
===========================*/
app.getDeviceInfo = function () {
    var device = {};
    var ua = navigator.userAgent;

    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

    // Android
    if (android) {
        device.os = 'android';
        device.osVersion = android[2];
    }
    if (ipad || iphone || ipod) {
        device.os = 'ios';
    }
    // iOS
    if (iphone && !ipod) device.osVersion = iphone[2].replace(/_/g, '.');
    if (ipad) device.osVersion = ipad[2].replace(/_/g, '.');
    if (ipod) device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;

    // Webview
    device.webview = !!navigator.standalone;

        
    // Minimal UI
    if (device.os && device.os === 'ios') {
        var osVersionArr = device.osVersion.split('.');
        device.minimalUi = !device.webview &&
                            (ipod || iphone) &&
                            (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                            $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
    }

    // Add html classes
    if (device.os) {
        var className = device.os +
                        ' ' +
                        device.os + '-' + device.osVersion.replace(/\./g, '-') +
                        ' ' +
                        device.os + '-' + device.osVersion.split('.')[0];
        $('html').addClass(className);
    }

    // Export to app
    app.device = device;
};