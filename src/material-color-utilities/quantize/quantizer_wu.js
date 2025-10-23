/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as utils from '../utils/color_utils.js';
import { QuantizerMap } from './quantizer_map.js';
const INDEX_BITS = 5;
const SIDE_LENGTH = 33; // ((1 << INDEX_INDEX_BITS) + 1)
const TOTAL_SIZE = 35937; // SIDE_LENGTH * SIDE_LENGTH * SIDE_LENGTH
const directions = {
    RED: 'red',
    GREEN: 'green',
    BLUE: 'blue',
};
/**
 * An image quantizer that divides the image's pixels into clusters by
 * recursively cutting an RGB cube, based on the weight of pixels in each area
 * of the cube.
 *
 * The algorithm was described by Xiaolin Wu in Graphic Gems II, published in
 * 1991.
 */
export class QuantizerWu {
    constructor(weights = [], momentsR = [], momentsG = [], momentsB = [], moments = [], cubes = []) {
        this.weights = weights;
        this.momentsR = momentsR;
        this.momentsG = momentsG;
        this.momentsB = momentsB;
        this.moments = moments;
        this.cubes = cubes;
    }
    /**
     * @param pixels Colors in ARGB format.
     * @param maxColors The number of colors to divide the image into. A lower
     *     number of colors may be returned.
     * @return Colors in ARGB format.
     */
    quantize(pixels, maxColors) {
        this.constructHistogram(pixels);
        this.computeMoments();
        const createBoxesResult = this.createBoxes(maxColors);
        const results = this.createResult(createBoxesResult.resultCount);
        return results;
    }
    constructHistogram(pixels) {
        this.weights = Array.from({ length: TOTAL_SIZE }).fill(0);
        this.momentsR = Array.from({ length: TOTAL_SIZE }).fill(0);
        this.momentsG = Array.from({ length: TOTAL_SIZE }).fill(0);
        this.momentsB = Array.from({ length: TOTAL_SIZE }).fill(0);
        this.moments = Array.from({ length: TOTAL_SIZE }).fill(0);
        const countByColor = QuantizerMap.quantize(pixels);
        for (const [pixel, count] of countByColor.entries()) {
            const red = utils.redFromArgb(pixel);
            const green = utils.greenFromArgb(pixel);
            const blue = utils.blueFromArgb(pixel);
            const bitsToRemove = 8 - INDEX_BITS;
            const iR = (red >> bitsToRemove) + 1;
            const iG = (green >> bitsToRemove) + 1;
            const iB = (blue >> bitsToRemove) + 1;
            const index = this.getIndex(iR, iG, iB);
            this.weights[index] = (this.weights[index] ?? 0) + count;
            this.momentsR[index] += count * red;
            this.momentsG[index] += count * green;
            this.momentsB[index] += count * blue;
            this.moments[index] += count * (red * red + green * green + blue * blue);
        }
    }
    computeMoments() {
        for (let r = 1; r < SIDE_LENGTH; r++) {
            const area = Array.from({ length: SIDE_LENGTH }).fill(0);
            const areaR = Array.from({ length: SIDE_LENGTH }).fill(0);
            const areaG = Array.from({ length: SIDE_LENGTH }).fill(0);
            const areaB = Array.from({ length: SIDE_LENGTH }).fill(0);
            const area2 = Array.from({ length: SIDE_LENGTH }).fill(0.0);
            for (let g = 1; g < SIDE_LENGTH; g++) {
                let line = 0;
                let lineR = 0;
                let lineG = 0;
                let lineB = 0;
                let line2 = 0.0;
                for (let b = 1; b < SIDE_LENGTH; b++) {
                    const index = this.getIndex(r, g, b);
                    line += this.weights[index];
                    lineR += this.momentsR[index];
                    lineG += this.momentsG[index];
                    lineB += this.momentsB[index];
                    line2 += this.moments[index];
                    area[b] += line;
                    areaR[b] += lineR;
                    areaG[b] += lineG;
                    areaB[b] += lineB;
                    area2[b] += line2;
                    const previousIndex = this.getIndex(r - 1, g, b);
                    this.weights[index] = this.weights[previousIndex] + area[b];
                    this.momentsR[index] = this.momentsR[previousIndex] + areaR[b];
                    this.momentsG[index] = this.momentsG[previousIndex] + areaG[b];
                    this.momentsB[index] = this.momentsB[previousIndex] + areaB[b];
                    this.moments[index] = this.moments[previousIndex] + area2[b];
                }
            }
        }
    }
    createBoxes(maxColors) {
        this.cubes =
            Array.from({ length: maxColors }).fill(0).map(() => new Box());
        const volumeVariance = Array.from({ length: maxColors }).fill(0.0);
        this.cubes[0].r0 = 0;
        this.cubes[0].g0 = 0;
        this.cubes[0].b0 = 0;
        this.cubes[0].r1 = SIDE_LENGTH - 1;
        this.cubes[0].g1 = SIDE_LENGTH - 1;
        this.cubes[0].b1 = SIDE_LENGTH - 1;
        let generatedColorCount = maxColors;
        let next = 0;
        for (let i = 1; i < maxColors; i++) {
            if (this.cut(this.cubes[next], this.cubes[i])) {
                volumeVariance[next] =
                    this.cubes[next].vol > 1 ? this.variance(this.cubes[next]) : 0.0;
                volumeVariance[i] =
                    this.cubes[i].vol > 1 ? this.variance(this.cubes[i]) : 0.0;
            }
            else {
                volumeVariance[next] = 0.0;
                i--;
            }
            next = 0;
            let temp = volumeVariance[0];
            for (let j = 1; j <= i; j++) {
                if (volumeVariance[j] > temp) {
                    temp = volumeVariance[j];
                    next = j;
                }
            }
            if (temp <= 0.0) {
                generatedColorCount = i + 1;
                break;
            }
        }
        return new CreateBoxesResult(maxColors, generatedColorCount);
    }
    createResult(colorCount) {
        const colors = [];
        for (let i = 0; i < colorCount; ++i) {
            const cube = this.cubes[i];
            const weight = this.volume(cube, this.weights);
            if (weight > 0) {
                const r = Math.round(this.volume(cube, this.momentsR) / weight);
                const g = Math.round(this.volume(cube, this.momentsG) / weight);
                const b = Math.round(this.volume(cube, this.momentsB) / weight);
                const color = (255 << 24) | ((r & 0x0ff) << 16) | ((g & 0x0ff) << 8) |
                    (b & 0x0ff);
                colors.push(color);
            }
        }
        return colors;
    }
    variance(cube) {
        const dr = this.volume(cube, this.momentsR);
        const dg = this.volume(cube, this.momentsG);
        const db = this.volume(cube, this.momentsB);
        const xx = this.moments[this.getIndex(cube.r1, cube.g1, cube.b1)] -
            this.moments[this.getIndex(cube.r1, cube.g1, cube.b0)] -
            this.moments[this.getIndex(cube.r1, cube.g0, cube.b1)] +
            this.moments[this.getIndex(cube.r1, cube.g0, cube.b0)] -
            this.moments[this.getIndex(cube.r0, cube.g1, cube.b1)] +
            this.moments[this.getIndex(cube.r0, cube.g1, cube.b0)] +
            this.moments[this.getIndex(cube.r0, cube.g0, cube.b1)] -
            this.moments[this.getIndex(cube.r0, cube.g0, cube.b0)];
        const hypotenuse = dr * dr + dg * dg + db * db;
        const volume = this.volume(cube, this.weights);
        return xx - hypotenuse / volume;
    }
    cut(one, two) {
        const wholeR = this.volume(one, this.momentsR);
        const wholeG = this.volume(one, this.momentsG);
        const wholeB = this.volume(one, this.momentsB);
        const wholeW = this.volume(one, this.weights);
        const maxRResult = this.maximize(one, directions.RED, one.r0 + 1, one.r1, wholeR, wholeG, wholeB, wholeW);
        const maxGResult = this.maximize(one, directions.GREEN, one.g0 + 1, one.g1, wholeR, wholeG, wholeB, wholeW);
        const maxBResult = this.maximize(one, directions.BLUE, one.b0 + 1, one.b1, wholeR, wholeG, wholeB, wholeW);
        let direction;
        const maxR = maxRResult.maximum;
        const maxG = maxGResult.maximum;
        const maxB = maxBResult.maximum;
        if (maxR >= maxG && maxR >= maxB) {
            if (maxRResult.cutLocation < 0) {
                return false;
            }
            direction = directions.RED;
        }
        else if (maxG >= maxR && maxG >= maxB) {
            direction = directions.GREEN;
        }
        else {
            direction = directions.BLUE;
        }
        two.r1 = one.r1;
        two.g1 = one.g1;
        two.b1 = one.b1;
        switch (direction) {
            case directions.RED:
                one.r1 = maxRResult.cutLocation;
                two.r0 = one.r1;
                two.g0 = one.g0;
                two.b0 = one.b0;
                break;
            case directions.GREEN:
                one.g1 = maxGResult.cutLocation;
                two.r0 = one.r0;
                two.g0 = one.g1;
                two.b0 = one.b0;
                break;
            case directions.BLUE:
                one.b1 = maxBResult.cutLocation;
                two.r0 = one.r0;
                two.g0 = one.g0;
                two.b0 = one.b1;
                break;
            default:
                throw new Error('unexpected direction ' + direction);
        }
        one.vol = (one.r1 - one.r0) * (one.g1 - one.g0) * (one.b1 - one.b0);
        two.vol = (two.r1 - two.r0) * (two.g1 - two.g0) * (two.b1 - two.b0);
        return true;
    }
    maximize(cube, direction, first, last, wholeR, wholeG, wholeB, wholeW) {
        const bottomR = this.bottom(cube, direction, this.momentsR);
        const bottomG = this.bottom(cube, direction, this.momentsG);
        const bottomB = this.bottom(cube, direction, this.momentsB);
        const bottomW = this.bottom(cube, direction, this.weights);
        let max = 0.0;
        let cut = -1;
        let halfR = 0;
        let halfG = 0;
        let halfB = 0;
        let halfW = 0;
        for (let i = first; i < last; i++) {
            halfR = bottomR + this.top(cube, direction, i, this.momentsR);
            halfG = bottomG + this.top(cube, direction, i, this.momentsG);
            halfB = bottomB + this.top(cube, direction, i, this.momentsB);
            halfW = bottomW + this.top(cube, direction, i, this.weights);
            if (halfW === 0) {
                continue;
            }
            let tempNumerator = (halfR * halfR + halfG * halfG + halfB * halfB) * 1.0;
            let tempDenominator = halfW * 1.0;
            let temp = tempNumerator / tempDenominator;
            halfR = wholeR - halfR;
            halfG = wholeG - halfG;
            halfB = wholeB - halfB;
            halfW = wholeW - halfW;
            if (halfW === 0) {
                continue;
            }
            tempNumerator = (halfR * halfR + halfG * halfG + halfB * halfB) * 1.0;
            tempDenominator = halfW * 1.0;
            temp += tempNumerator / tempDenominator;
            if (temp > max) {
                max = temp;
                cut = i;
            }
        }
        return new MaximizeResult(cut, max);
    }
    volume(cube, moment) {
        return (moment[this.getIndex(cube.r1, cube.g1, cube.b1)] -
            moment[this.getIndex(cube.r1, cube.g1, cube.b0)] -
            moment[this.getIndex(cube.r1, cube.g0, cube.b1)] +
            moment[this.getIndex(cube.r1, cube.g0, cube.b0)] -
            moment[this.getIndex(cube.r0, cube.g1, cube.b1)] +
            moment[this.getIndex(cube.r0, cube.g1, cube.b0)] +
            moment[this.getIndex(cube.r0, cube.g0, cube.b1)] -
            moment[this.getIndex(cube.r0, cube.g0, cube.b0)]);
    }
    bottom(cube, direction, moment) {
        switch (direction) {
            case directions.RED:
                return (-moment[this.getIndex(cube.r0, cube.g1, cube.b1)] +
                    moment[this.getIndex(cube.r0, cube.g1, cube.b0)] +
                    moment[this.getIndex(cube.r0, cube.g0, cube.b1)] -
                    moment[this.getIndex(cube.r0, cube.g0, cube.b0)]);
            case directions.GREEN:
                return (-moment[this.getIndex(cube.r1, cube.g0, cube.b1)] +
                    moment[this.getIndex(cube.r1, cube.g0, cube.b0)] +
                    moment[this.getIndex(cube.r0, cube.g0, cube.b1)] -
                    moment[this.getIndex(cube.r0, cube.g0, cube.b0)]);
            case directions.BLUE:
                return (-moment[this.getIndex(cube.r1, cube.g1, cube.b0)] +
                    moment[this.getIndex(cube.r1, cube.g0, cube.b0)] +
                    moment[this.getIndex(cube.r0, cube.g1, cube.b0)] -
                    moment[this.getIndex(cube.r0, cube.g0, cube.b0)]);
            default:
                throw new Error('unexpected direction $direction');
        }
    }
    top(cube, direction, position, moment) {
        switch (direction) {
            case directions.RED:
                return (moment[this.getIndex(position, cube.g1, cube.b1)] -
                    moment[this.getIndex(position, cube.g1, cube.b0)] -
                    moment[this.getIndex(position, cube.g0, cube.b1)] +
                    moment[this.getIndex(position, cube.g0, cube.b0)]);
            case directions.GREEN:
                return (moment[this.getIndex(cube.r1, position, cube.b1)] -
                    moment[this.getIndex(cube.r1, position, cube.b0)] -
                    moment[this.getIndex(cube.r0, position, cube.b1)] +
                    moment[this.getIndex(cube.r0, position, cube.b0)]);
            case directions.BLUE:
                return (moment[this.getIndex(cube.r1, cube.g1, position)] -
                    moment[this.getIndex(cube.r1, cube.g0, position)] -
                    moment[this.getIndex(cube.r0, cube.g1, position)] +
                    moment[this.getIndex(cube.r0, cube.g0, position)]);
            default:
                throw new Error('unexpected direction $direction');
        }
    }
    getIndex(r, g, b) {
        return (r << (INDEX_BITS * 2)) + (r << (INDEX_BITS + 1)) + r +
            (g << INDEX_BITS) + g + b;
    }
}
/**
 * Keeps track of the state of each box created as the Wu  quantization
 * algorithm progresses through dividing the image's pixels as plotted in RGB.
 */
class Box {
    constructor(r0 = 0, r1 = 0, g0 = 0, g1 = 0, b0 = 0, b1 = 0, vol = 0) {
        this.r0 = r0;
        this.r1 = r1;
        this.g0 = g0;
        this.g1 = g1;
        this.b0 = b0;
        this.b1 = b1;
        this.vol = vol;
    }
}
/**
 * Represents final result of Wu algorithm.
 */
class CreateBoxesResult {
    /**
     * @param requestedCount how many colors the caller asked to be returned from
     *     quantization.
     * @param resultCount the actual number of colors achieved from quantization.
     *     May be lower than the requested count.
     */
    constructor(requestedCount, resultCount) {
        this.requestedCount = requestedCount;
        this.resultCount = resultCount;
    }
}
/**
 * Represents the result of calculating where to cut an existing box in such
 * a way to maximize variance between the two new boxes created by a cut.
 */
class MaximizeResult {
    constructor(cutLocation, maximum) {
        this.cutLocation = cutLocation;
        this.maximum = maximum;
    }
}
