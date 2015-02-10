/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(function() {
    "use strict";

    var ImageLoader = {};
    ImageLoader.load = function(directory, callback, offset, size, sequence) {
        var htmlImagesSrcArray = new Array(size),
            htmlImagesArray = new Array(htmlImagesSrcArray.length),
            i,
            img,
            num;
            
        if (sequence === false) {
            htmlImagesSrcArray[0] = directory;
        } else {
            for ( i = 0; i < htmlImagesSrcArray.length; i++) {
                num = (offset + i);
                htmlImagesSrcArray[i] = directory + "image-" + ("00" + num).slice(-3) + ".jpg";
            }
        }
        htmlImagesArray.notLoaded = [];
        htmlImagesArray.addImage = function(img) {
            htmlImagesArray.notLoaded.push(img);
        };
        htmlImagesArray.loaded = function(loadedImg) {
            var notloadedImgs = htmlImagesArray.notLoaded;
            for (var x = 0; x < notloadedImgs.length; x++) {
                if (notloadedImgs[x] == loadedImg) {
                    notloadedImgs.splice(x, 1);
                    for (var y = 0; y < htmlImagesSrcArray.length; y++) {
                        var imgName = htmlImagesSrcArray[y].substr(htmlImagesSrcArray[y].lastIndexOf("/"));
                        if (loadedImg.src.lastIndexOf(imgName) != -1) {
                            htmlImagesArray[y] = loadedImg;
                            break;
                        }
                    }
                    break;
                }
            }
            if (notloadedImgs.length === 0) {
                console.log("Images loaded");
                callback.apply(null, [htmlImagesArray]);
            }
        };
        
        for ( i = 0; i < htmlImagesSrcArray.length; i++) {
            img = new Image();
            htmlImagesArray.addImage(img);
            addOnloadHandler(img, htmlImagesArray);
            img.src = htmlImagesSrcArray[i];
        }
    };
    
    function addOnloadHandler(img, htmlImagesArray) {
        img.onload = function() {
            htmlImagesArray.loaded(this);
        };
    }

    return (ImageLoader);
});
