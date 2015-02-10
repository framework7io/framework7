/* jshint undef: true, unused: true, browser:true, devel: true */
/* global define, vec2, mat2  */

define([
    "subImage",
    "cv_utils",
    "array_helper"
    ], 
    function(SubImage, CVUtils, ArrayHelper) {
    
    'use strict';

    /**
     * Represents a basic image combining the data and size.
     * In addition, some methods for manipulation are contained.
     * @param size {x,y} The size of the image in pixel
     * @param data {Array} If given, a flat array containing the pixel data
     * @param ArrayType {Type} If given, the desired DataType of the Array (may be typed/non-typed)
     * @param initialize {Boolean} Indicating if the array should be initialized on creation.
     * @returns {ImageWrapper}
     */
    function ImageWrapper(size, data, ArrayType, initialize) {
        if (!data) {
            if (ArrayType) {
                this.data = new ArrayType(size.x * size.y);
                if (ArrayType === Array && initialize) {
                    ArrayHelper.init(this.data, 0);
                }
            } else {
                this.data = new Uint8Array(size.x * size.y);
                if (Uint8Array === Array && initialize) {
                    ArrayHelper.init(this.data, 0);
                }
            }

        } else {
            this.data = data;
        }
        this.size = size;
    }

    /**
     * tests if a position is within the image with a given offset
     * @param imgRef {x, y} The location to test
     * @param border Number the padding value in pixel
     * @returns {Boolean} true if location inside the image's border, false otherwise
     * @see cvd/image.h
     */
    ImageWrapper.prototype.inImageWithBorder = function(imgRef, border) {
        return (imgRef.x >= border) && (imgRef.y >= border) && (imgRef.x < (this.size.x - border)) && (imgRef.y < (this.size.y - border));
    };

    /**
     * Transforms an image according to the given affine-transformation matrix.
     * @param inImg ImageWrapper a image containing the information to be extracted.
     * @param outImg ImageWrapper the image to be filled.  The whole image out image is filled by the in image.
     * @param M mat2 the matrix used to map point in the out matrix to those in the in matrix
     * @param inOrig vec2 origin in the in image
     * @param outOrig vec2 origin in the out image
     * @returns Number the number of pixels not in the in image
     * @see cvd/vision.h
     */
    ImageWrapper.transform = function(inImg, outImg, M, inOrig, outOrig) {
        var w = outImg.size.x, h = outImg.size.y, iw = inImg.size.x, ih = inImg.size.y;
        var across = vec2.create([M[0], M[2]]);
        var down = vec2.create([M[1], M[3]]);
        var defaultValue = 0;

        var p0 = vec2.subtract(inOrig, mat2.xVec2(M, outOrig, vec2.create()), vec2.create());

        var min_x = p0[0], min_y = p0[1];
        var max_x = min_x, max_y = min_y;
        var p, i, j;

        var sampleFunc = ImageWrapper.sample;

        if (across[0] < 0)
            min_x += w * across[0];
        else
            max_x += w * across[0];

        if (down[0] < 0)
            min_x += h * down[0];
        else
            max_x += h * down[0];

        if (across[1] < 0)
            min_y += w * across[1];
        else
            max_y += w * across[1];

        if (down[1] < 0)
            min_y += h * down[1];
        else
            max_y += h * down[1];

        var carrigeReturn = vec2.subtract(down, vec2.scale(across, w, vec2.create()), vec2.create());

        if (min_x >= 0 && min_y >= 0 && max_x < iw - 1 && max_y < ih - 1) {
            p = p0;
            for ( i = 0; i < h; ++i, vec2.add(p, carrigeReturn))
                for ( j = 0; j < w; ++j, vec2.add(p, across))
                    outImg.set(j, i, sampleFunc(inImg, p[0], p[1]));
            return 0;
        } else {
            var x_bound = iw - 1;
            var y_bound = ih - 1;
            var count = 0;
            p = p0;
            for ( i = 0; i < h; ++i, vec2.add(p, carrigeReturn)) {
                for ( j = 0; j < w; ++j, vec2.add(p, across)) {
                    if (0 <= p[0] && 0 <= p[1] && p[0] < x_bound && p[1] < y_bound) {
                        outImg.set(j, i, sampleFunc(inImg, p[0], p[1]));
                    } else {
                        outImg.set(j, i, defaultValue); ++count;
                    }
                }
            }
            return count;
        }
    };

    /**
     * Performs bilinear sampling
     * @param inImg Image to extract sample from
     * @param x the x-coordinate
     * @param y the y-coordinate
     * @returns the sampled value
     * @see cvd/vision.h
     */
    ImageWrapper.sample = function(inImg, x, y) {
        var lx = Math.floor(x);
        var ly = Math.floor(y);
        var w = inImg.size.x;
        var base = ly * inImg.size.x + lx;
        var a = inImg.data[base + 0];
        var b = inImg.data[base + 1];
        var c = inImg.data[base + w];
        var d = inImg.data[base + w + 1];
        var e = a - b;
        x -= lx;
        y -= ly;

        var result = Math.floor(x * (y * (e - c + d) - e) + y * (c - a) + a);
        return result;
    };

    /**
     * Initializes a given array. Sets each element to zero.
     * @param array {Array} The array to initialize
     */
    ImageWrapper.clearArray = function(array) {
        var l = array.length;
        while (l--) {
            array[l] = 0;
        }
    };

    /**
     * Creates a {SubImage} from the current image ({this}).
     * @param from {ImageRef} The position where to start the {SubImage} from. (top-left corner)
     * @param size {ImageRef} The size of the resulting image
     * @returns {SubImage} A shared part of the original image
     */
    ImageWrapper.prototype.subImage = function(from, size) {
        return new SubImage(from, size, this);
    };

    /**
     * Creates an {ImageWrapper) and copies the needed underlying image-data area
     * @param imageWrapper {ImageWrapper} The target {ImageWrapper} where the data should be copied
     * @param from {ImageRef} The location where to copy from (top-left location)
     */
    ImageWrapper.prototype.subImageAsCopy = function(imageWrapper, from) {
        var sizeY = imageWrapper.size.y, sizeX = imageWrapper.size.x;
        var x, y;
        for ( x = 0; x < sizeX; x++) {
            for ( y = 0; y < sizeY; y++) {
                imageWrapper.data[y * sizeX + x] = this.data[(from.y + y) * this.size.x + from.x + x];
            }
        }
    };

    ImageWrapper.prototype.copyTo = function(imageWrapper) {
        var length = this.data.length, srcData = this.data, dstData = imageWrapper.data;

        while (length--) {
            dstData[length] = srcData[length];
        }
    };

    /**
     * Retrieves a given pixel position from the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    ImageWrapper.prototype.get = function(x, y) {
        return this.data[y * this.size.x + x];
    };

    /**
     * Retrieves a given pixel position from the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @returns {Number} The grayscale value at the pixel-position
     */
    ImageWrapper.prototype.getSafe = function(x, y) {
        var i;
        
        if (!this.indexMapping) {
            this.indexMapping = {
                x : [],
                y : []
            };
            for (i = 0; i < this.size.x; i++) {
                this.indexMapping.x[i] = i;
                this.indexMapping.x[i + this.size.x] = i;
            }
            for (i = 0; i < this.size.y; i++) {
                this.indexMapping.y[i] = i;
                this.indexMapping.y[i + this.size.y] = i;
            }
        }
        return this.data[(this.indexMapping.y[y + this.size.y]) * this.size.x + this.indexMapping.x[x + this.size.x]];
    };

    /**
     * Sets a given pixel position in the image
     * @param x {Number} The x-position
     * @param y {Number} The y-position
     * @param value {Number} The grayscale value to set
     * @returns {ImageWrapper} The Image itself (for possible chaining)
     */
    ImageWrapper.prototype.set = function(x, y, value) {
        this.data[y * this.size.x + x] = value;
        return this;
    };

    /**
     * Sets the border of the image (1 pixel) to zero
     */
    ImageWrapper.prototype.zeroBorder = function() {
        var i, width = this.size.x, height = this.size.y, data = this.data;
        for ( i = 0; i < width; i++) {
            data[i] = data[(height - 1) * width + i] = 0;
        }
        for ( i = 1; i < height - 1; i++) {
            data[i * width] = data[i * width + (width - 1)] = 0;
        }
    };

    /**
     * Inverts a binary image in place
     */
    ImageWrapper.prototype.invert = function() {
        var data = this.data, length = data.length;

        while (length--) {
            data[length] = data[length] ? 0 : 1;
        }

    };

    ImageWrapper.prototype.convolve = function(kernel) {
        var x, y, kx, ky, kSize = (kernel.length / 2) | 0, accu = 0;
        for ( y = 0; y < this.size.y; y++) {
            for ( x = 0; x < this.size.x; x++) {
                accu = 0;
                for ( ky = -kSize; ky <= kSize; ky++) {
                    for ( kx = -kSize; kx <= kSize; kx++) {
                        accu += kernel[ky+kSize][kx + kSize] * this.getSafe(x + kx, y + ky);
                    }
                }
                this.data[y * this.size.x + x] = accu;
            }
        }
    };

    ImageWrapper.prototype.moments = function(labelcount) {
        var data = this.data,
            x,
            y,
            height = this.size.y,
            width = this.size.x,
            val,
            ysq,
            labelsum = [],
            i,
            label,
            mu11,
            mu02,
            mu20,
            x_,
            y_,
            tmp,
            result = [],
            PI = Math.PI,
            PI_4 = PI / 4;

        if (labelcount <= 0) {
            return result;
        }

        for ( i = 0; i < labelcount; i++) {
            labelsum[i] = {
                m00 : 0,
                m01 : 0,
                m10 : 0,
                m11 : 0,
                m02 : 0,
                m20 : 0,
                theta : 0,
                rad : 0
            };
        }

        for ( y = 0; y < height; y++) {
            ysq = y * y;
            for ( x = 0; x < width; x++) {
                val = data[y * width + x];
                if (val > 0) {
                    label = labelsum[val - 1];
                    label.m00 += 1;
                    label.m01 += y;
                    label.m10 += x;
                    label.m11 += x * y;
                    label.m02 += ysq;
                    label.m20 += x * x;
                }
            }
        }

        for ( i = 0; i < labelcount; i++) {
            label = labelsum[i];
            if (!isNaN(label.m00) && label.m00 !== 0) {
                x_ = label.m10 / label.m00;
                y_ = label.m01 / label.m00;
                mu11 = label.m11 / label.m00 - x_ * y_;
                mu02 = label.m02 / label.m00 - y_ * y_;
                mu20 = label.m20 / label.m00 - x_ * x_;
                tmp = (mu02 - mu20) / (2 * mu11);
                tmp = 0.5 * Math.atan(tmp) + (mu11 >= 0 ? PI_4 : -PI_4 ) + PI;
                label.theta = (tmp * 180 / PI + 90) % 180 - 90;
                if (label.theta < 0) {
                    label.theta += 180;
                }
                label.rad = tmp > PI ? tmp - PI : tmp;
                label.vec = vec2.create([Math.cos(tmp), Math.sin(tmp)]);
                result.push(label);
            }
        }

        return result;
    };

    /**
     * Displays the {ImageWrapper} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    ImageWrapper.prototype.show = function(canvas, scale) {
        var ctx,
            frame,
            data,
            current,
            pixel,
            x,
            y;
        
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
        //frame.data = data;
        ctx.putImageData(frame, 0, 0);
    };

    /**
     * Displays the {SubImage} in a given canvas
     * @param canvas {Canvas} The canvas element to write to
     * @param scale {Number} Scale which is applied to each pixel-value
     */
    ImageWrapper.prototype.overlay = function(canvas, scale, from) {
        if (!scale || scale < 0 || scale > 360) {
            scale = 360;
        }
        var hsv = [0, 1, 1];
        var rgb = [0, 0, 0];
        var whiteRgb = [255, 255, 255];
        var blackRgb = [0, 0, 0];
        var result = [];
        var ctx = canvas.getContext('2d');
        var frame = ctx.getImageData(from.x, from.y, this.size.x, this.size.y);
        var data = frame.data;
        var length = this.data.length;
        while (length--) {
            hsv[0] = this.data[length] * scale;
            result = hsv[0] <= 0 ? whiteRgb : hsv[0] >= 360 ? blackRgb : CVUtils.hsv2rgb(hsv, rgb);
            data[length * 4 + 0] = result[0];
            data[length * 4 + 1] = result[1];
            data[length * 4 + 2] = result[2];
            data[length * 4 + 3] = 255;
        }
        ctx.putImageData(frame, from.x, from.y);
    };

    return (ImageWrapper);
}); 