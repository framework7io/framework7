/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define */

define(["typedefs"], function() {
    "use strict";

    /**
     * Construct representing a part of another {ImageWrapper}. Shares data
     * between the parent and the child.
     * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
     * @param size {ImageRef} The size of the resulting image
     * @param I {ImageWrapper} The {ImageWrapper} to share from
     * @returns {SubImage} A shared part of the original image
     */
    function SubImage(from, size, I) {
        if (!I) {
            I = {
                data : null,
                size : size
            };
        }
        this.data = I.data;
        this.originalSize = I.size;
        this.I = I;

        this.from = from;
        this.size = size;
    }

    /**
     * Displays the {SubImage} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    SubImage.prototype.show = function(canvas, scale) {
        var ctx,
            frame,
            data,
            current,
            y,
            x,
            pixel;
            
        if (!scale) {
            scale = 1.0;
        }
        ctx = canvas.getContext('2d');
        canvas.width = this.size.x;
        canvas.height = this.size.y;
        frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        data = frame.data;
        current = 0;
        for (y = 0; y < this.size.y; y++) {
            for (x = 0; x < this.size.x; x++) {
                pixel = y * this.size.x + x;
                current = this.get(x, y) * scale;
                data[pixel * 4 + 0] = current;
                data[pixel * 4 + 1] = current;
                data[pixel * 4 + 2] = current;
                data[pixel * 4 + 3] = 255;
            }
        }
        frame.data = data;
        ctx.putImageData(frame, 0, 0);
    };

    /**
     * Retrieves a given pixel position from the {SubImage}
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    SubImage.prototype.get = function(x, y) {
        return this.data[(this.from.y + y) * this.originalSize.x + this.from.x + x];
    };

    /**
     * Updates the underlying data from a given {ImageWrapper}
     * @param image {ImageWrapper} The updated image
     */
    SubImage.prototype.updateData = function(image) {
        this.originalSize = image.size;
        this.data = image.data;
    };

    /**
     * Updates the position of the shared area
     * @param from {x,y} The new location
     * @returns {SubImage} returns {this} for possible chaining
     */
    SubImage.prototype.updateFrom = function(from) {
        this.from = from;
        return this;
    };
    
    return (SubImage);
}); 