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
import { Hct } from '../hct/hct.js';
import * as math from '../utils/math_utils.js';
const SCORE_OPTION_DEFAULTS = {
    desired: 4,
    fallbackColorARGB: 0xff4285f4,
    filter: true, // Avoid unsuitable colors.
};
function compare(a, b) {
    if (a.score > b.score) {
        return -1;
    }
    else if (a.score < b.score) {
        return 1;
    }
    return 0;
}
/**
 *  Given a large set of colors, remove colors that are unsuitable for a UI
 *  theme, and rank the rest based on suitability.
 *
 *  Enables use of a high cluster count for image quantization, thus ensuring
 *  colors aren't muddied, while curating the high cluster count to a much
 *  smaller number of appropriate choices.
 */
export class Score {
    constructor() { }
    /**
     * Given a map with keys of colors and values of how often the color appears,
     * rank the colors based on suitability for being used for a UI theme.
     *
     * @param colorsToPopulation map with keys of colors and values of how often
     *     the color appears, usually from a source image.
     * @param {ScoreOptions} options optional parameters.
     * @return Colors sorted by suitability for a UI theme. The most suitable
     *     color is the first item, the least suitable is the last. There will
     *     always be at least one color returned. If all the input colors
     *     were not suitable for a theme, a default fallback color will be
     *     provided, Google Blue.
     */
    static score(colorsToPopulation, options) {
        const { desired, fallbackColorARGB, filter } = { ...SCORE_OPTION_DEFAULTS, ...options };
        // Get the HCT color for each Argb value, while finding the per hue count and
        // total count.
        const colorsHct = [];
        const huePopulation = new Array(360).fill(0);
        let populationSum = 0;
        for (const [argb, population] of colorsToPopulation.entries()) {
            const hct = Hct.fromInt(argb);
            colorsHct.push(hct);
            const hue = Math.floor(hct.hue);
            huePopulation[hue] += population;
            populationSum += population;
        }
        // Hues with more usage in neighboring 30 degree slice get a larger number.
        const hueExcitedProportions = new Array(360).fill(0.0);
        for (let hue = 0; hue < 360; hue++) {
            const proportion = huePopulation[hue] / populationSum;
            for (let i = hue - 14; i < hue + 16; i++) {
                const neighborHue = math.sanitizeDegreesInt(i);
                hueExcitedProportions[neighborHue] += proportion;
            }
        }
        // Scores each HCT color based on usage and chroma, while optionally
        // filtering out values that do not have enough chroma or usage.
        const scoredHct = new Array();
        for (const hct of colorsHct) {
            const hue = math.sanitizeDegreesInt(Math.round(hct.hue));
            const proportion = hueExcitedProportions[hue];
            if (filter && (hct.chroma < Score.CUTOFF_CHROMA || proportion <= Score.CUTOFF_EXCITED_PROPORTION)) {
                continue;
            }
            const proportionScore = proportion * 100.0 * Score.WEIGHT_PROPORTION;
            const chromaWeight = hct.chroma < Score.TARGET_CHROMA ? Score.WEIGHT_CHROMA_BELOW : Score.WEIGHT_CHROMA_ABOVE;
            const chromaScore = (hct.chroma - Score.TARGET_CHROMA) * chromaWeight;
            const score = proportionScore + chromaScore;
            scoredHct.push({ hct, score });
        }
        // Sorted so that colors with higher scores come first.
        scoredHct.sort(compare);
        // Iterates through potential hue differences in degrees in order to select
        // the colors with the largest distribution of hues possible. Starting at
        // 90 degrees(maximum difference for 4 colors) then decreasing down to a
        // 15 degree minimum.
        const chosenColors = [];
        for (let differenceDegrees = 90; differenceDegrees >= 15; differenceDegrees--) {
            chosenColors.length = 0;
            for (const { hct } of scoredHct) {
                const duplicateHue = chosenColors.find(chosenHct => {
                    return math.differenceDegrees(hct.hue, chosenHct.hue) < differenceDegrees;
                });
                if (!duplicateHue) {
                    chosenColors.push(hct);
                }
                if (chosenColors.length >= desired)
                    break;
            }
            if (chosenColors.length >= desired)
                break;
        }
        const colors = [];
        if (chosenColors.length === 0) {
            colors.push(fallbackColorARGB);
        }
        for (const chosenHct of chosenColors) {
            colors.push(chosenHct.toInt());
        }
        return colors;
    }
}
Score.TARGET_CHROMA = 48.0; // A1 Chroma
Score.WEIGHT_PROPORTION = 0.7;
Score.WEIGHT_CHROMA_ABOVE = 0.3;
Score.WEIGHT_CHROMA_BELOW = 0.1;
Score.CUTOFF_CHROMA = 5.0;
Score.CUTOFF_EXCITED_PROPORTION = 0.01;
