/**
 * @license
 * Copyright 2022 Google LLC
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
import { Contrast } from '../contrast/contrast.js';
import { Hct } from '../hct/hct.js';
import * as math from '../utils/math_utils.js';
function validateExtendedColor(originalColor, specVersion, extendedColor) {
    if (originalColor.name !== extendedColor.name) {
        throw new Error(`Attempting to extend color ${originalColor.name} with color ${extendedColor.name} of different name for spec version ${specVersion}.`);
    }
    if (originalColor.isBackground !== extendedColor.isBackground) {
        throw new Error(`Attempting to extend color ${originalColor.name} as a ${(originalColor.isBackground ?
            'background' :
            'foreground')} with color ${extendedColor.name} as a ${(extendedColor.isBackground ?
            'background' :
            'foreground')} for spec version ${specVersion}.`);
    }
}
/**
 * Returns a new DynamicColor that is the same as the original color, but with
 * the extended dynamic color's constraints for the given spec version.
 *
 * @param originlColor The original color.
 * @param specVersion The spec version to extend.
 * @param extendedColor The color with the values to extend.
 */
export function extendSpecVersion(originlColor, specVersion, extendedColor) {
    validateExtendedColor(originlColor, specVersion, extendedColor);
    return DynamicColor.fromPalette({
        name: originlColor.name,
        palette: (s) => s.specVersion === specVersion ? extendedColor.palette(s) :
            originlColor.palette(s),
        tone: (s) => s.specVersion === specVersion ? extendedColor.tone(s) :
            originlColor.tone(s),
        isBackground: originlColor.isBackground,
        chromaMultiplier: (s) => {
            const chromaMultiplier = s.specVersion === specVersion ?
                extendedColor.chromaMultiplier :
                originlColor.chromaMultiplier;
            return chromaMultiplier !== undefined ? chromaMultiplier(s) : 1;
        },
        background: (s) => {
            const background = s.specVersion === specVersion ?
                extendedColor.background :
                originlColor.background;
            return background !== undefined ? background(s) : undefined;
        },
        secondBackground: (s) => {
            const secondBackground = s.specVersion === specVersion ?
                extendedColor.secondBackground :
                originlColor.secondBackground;
            return secondBackground !== undefined ? secondBackground(s) : undefined;
        },
        contrastCurve: (s) => {
            const contrastCurve = s.specVersion === specVersion ?
                extendedColor.contrastCurve :
                originlColor.contrastCurve;
            return contrastCurve !== undefined ? contrastCurve(s) : undefined;
        },
        toneDeltaPair: (s) => {
            const toneDeltaPair = s.specVersion === specVersion ?
                extendedColor.toneDeltaPair :
                originlColor.toneDeltaPair;
            return toneDeltaPair !== undefined ? toneDeltaPair(s) : undefined;
        },
    });
}
/**
 * A color that adjusts itself based on UI state provided by DynamicScheme.
 *
 * Colors without backgrounds do not change tone when contrast changes. Colors
 * with backgrounds become closer to their background as contrast lowers, and
 * further when contrast increases.
 *
 * Prefer static constructors. They require either a hexcode, a palette and
 * tone, or a hue and chroma. Optionally, they can provide a background
 * DynamicColor.
 */
export class DynamicColor {
    /**
     * Create a DynamicColor defined by a TonalPalette and HCT tone.
     *
     * @param args Functions with DynamicScheme as input. Must provide a palette
     *     and tone. May provide a background DynamicColor and ToneDeltaPair.
     */
    static fromPalette(args) {
        return new DynamicColor(args.name ?? '', args.palette, args.tone ?? DynamicColor.getInitialToneFromBackground(args.background), args.isBackground ?? false, args.chromaMultiplier, args.background, args.secondBackground, args.contrastCurve, args.toneDeltaPair);
    }
    static getInitialToneFromBackground(background) {
        if (background === undefined) {
            return (s) => 50;
        }
        return (s) => background(s) ? background(s).getTone(s) : 50;
    }
    /**
     * The base constructor for DynamicColor.
     *
     * _Strongly_ prefer using one of the convenience constructors. This class is
     * arguably too flexible to ensure it can support any scenario. Functional
     * arguments allow  overriding without risks that come with subclasses.
     *
     * For example, the default behavior of adjust tone at max contrast
     * to be at a 7.0 ratio with its background is principled and
     * matches accessibility guidance. That does not mean it's the desired
     * approach for _every_ design system, and every color pairing,
     * always, in every case.
     *
     * @param name The name of the dynamic color. Defaults to empty.
     * @param palette Function that provides a TonalPalette given DynamicScheme. A
     *     TonalPalette is defined by a hue and chroma, so this replaces the need
     *     to specify hue/chroma. By providing a tonal palette, when contrast
     *     adjustments are made, intended chroma can be preserved.
     * @param tone Function that provides a tone, given a DynamicScheme.
     * @param isBackground Whether this dynamic color is a background, with some
     *     other color as the foreground. Defaults to false.
     * @param chromaMultiplier A factor that multiplies the chroma for this color.
     * @param background The background of the dynamic color (as a function of a
     *     `DynamicScheme`), if it exists.
     * @param secondBackground A second background of the dynamic color (as a
     *     function of a `DynamicScheme`), if it exists.
     * @param contrastCurve A `ContrastCurve` object specifying how its contrast
     *     against its background should behave in various contrast levels
     *     options.
     * @param toneDeltaPair A `ToneDeltaPair` object specifying a tone delta
     *     constraint between two colors. One of them must be the color being
     *     constructed.
     */
    constructor(name, palette, tone, isBackground, chromaMultiplier, background, secondBackground, contrastCurve, toneDeltaPair) {
        this.name = name;
        this.palette = palette;
        this.tone = tone;
        this.isBackground = isBackground;
        this.chromaMultiplier = chromaMultiplier;
        this.background = background;
        this.secondBackground = secondBackground;
        this.contrastCurve = contrastCurve;
        this.toneDeltaPair = toneDeltaPair;
        this.hctCache = new Map();
        if ((!background) && secondBackground) {
            throw new Error(`Color ${name} has secondBackground` +
                `defined, but background is not defined.`);
        }
        if ((!background) && contrastCurve) {
            throw new Error(`Color ${name} has contrastCurve` +
                `defined, but background is not defined.`);
        }
        if (background && !contrastCurve) {
            throw new Error(`Color ${name} has background` +
                `defined, but contrastCurve is not defined.`);
        }
    }
    /**
     * Returns a deep copy of this DynamicColor.
     */
    clone() {
        return DynamicColor.fromPalette({
            name: this.name,
            palette: this.palette,
            tone: this.tone,
            isBackground: this.isBackground,
            chromaMultiplier: this.chromaMultiplier,
            background: this.background,
            secondBackground: this.secondBackground,
            contrastCurve: this.contrastCurve,
            toneDeltaPair: this.toneDeltaPair,
        });
    }
    /**
     * Clears the cache of HCT values for this color. For testing or debugging
     * purposes.
     */
    clearCache() {
        this.hctCache.clear();
    }
    /**
     * Returns a ARGB integer (i.e. a hex code).
     *
     * @param scheme Defines the conditions of the user interface, for example,
     *     whether or not it is dark mode or light mode, and what the desired
     *     contrast level is.
     */
    getArgb(scheme) {
        return this.getHct(scheme).toInt();
    }
    /**
     * Returns a color, expressed in the HCT color space, that this
     * DynamicColor is under the conditions in scheme.
     *
     * @param scheme Defines the conditions of the user interface, for example,
     *     whether or not it is dark mode or light mode, and what the desired
     *     contrast level is.
     */
    getHct(scheme) {
        const cachedAnswer = this.hctCache.get(scheme);
        if (cachedAnswer != null) {
            return cachedAnswer;
        }
        const answer = getSpec(scheme.specVersion).getHct(scheme, this);
        if (this.hctCache.size > 4) {
            this.hctCache.clear();
        }
        this.hctCache.set(scheme, answer);
        return answer;
    }
    /**
     * Returns a tone, T in the HCT color space, that this DynamicColor is under
     * the conditions in scheme.
     *
     * @param scheme Defines the conditions of the user interface, for example,
     *     whether or not it is dark mode or light mode, and what the desired
     *     contrast level is.
     */
    getTone(scheme) {
        return getSpec(scheme.specVersion).getTone(scheme, this);
    }
    /**
     * Given a background tone, finds a foreground tone, while ensuring they reach
     * a contrast ratio that is as close to [ratio] as possible.
     *
     * @param bgTone Tone in HCT. Range is 0 to 100, undefined behavior when it
     *     falls outside that range.
     * @param ratio The contrast ratio desired between bgTone and the return
     *     value.
     */
    static foregroundTone(bgTone, ratio) {
        const lighterTone = Contrast.lighterUnsafe(bgTone, ratio);
        const darkerTone = Contrast.darkerUnsafe(bgTone, ratio);
        const lighterRatio = Contrast.ratioOfTones(lighterTone, bgTone);
        const darkerRatio = Contrast.ratioOfTones(darkerTone, bgTone);
        const preferLighter = DynamicColor.tonePrefersLightForeground(bgTone);
        if (preferLighter) {
            // This handles an edge case where the initial contrast ratio is high
            // (ex. 13.0), and the ratio passed to the function is that high
            // ratio, and both the lighter and darker ratio fails to pass that
            // ratio.
            //
            // This was observed with Tonal Spot's On Primary Container turning
            // black momentarily between high and max contrast in light mode. PC's
            // standard tone was T90, OPC's was T10, it was light mode, and the
            // contrast value was 0.6568521221032331.
            const negligibleDifference = Math.abs(lighterRatio - darkerRatio) < 0.1 &&
                lighterRatio < ratio && darkerRatio < ratio;
            return lighterRatio >= ratio || lighterRatio >= darkerRatio ||
                negligibleDifference ?
                lighterTone :
                darkerTone;
        }
        else {
            return darkerRatio >= ratio || darkerRatio >= lighterRatio ? darkerTone :
                lighterTone;
        }
    }
    /**
     * Returns whether [tone] prefers a light foreground.
     *
     * People prefer white foregrounds on ~T60-70. Observed over time, and also
     * by Andrew Somers during research for APCA.
     *
     * T60 used as to create the smallest discontinuity possible when skipping
     * down to T49 in order to ensure light foregrounds.
     * Since `tertiaryContainer` in dark monochrome scheme requires a tone of
     * 60, it should not be adjusted. Therefore, 60 is excluded here.
     */
    static tonePrefersLightForeground(tone) {
        return Math.round(tone) < 60.0;
    }
    /**
     * Returns whether [tone] can reach a contrast ratio of 4.5 with a lighter
     * color.
     */
    static toneAllowsLightForeground(tone) {
        return Math.round(tone) <= 49.0;
    }
    /**
     * Adjusts a tone such that white has 4.5 contrast, if the tone is
     * reasonably close to supporting it.
     */
    static enableLightForeground(tone) {
        if (DynamicColor.tonePrefersLightForeground(tone) &&
            !DynamicColor.toneAllowsLightForeground(tone)) {
            return 49.0;
        }
        return tone;
    }
}
/**
 * A delegate for the color calculation of a DynamicScheme in the 2021 spec.
 */
class ColorCalculationDelegateImpl2021 {
    getHct(scheme, color) {
        const tone = color.getTone(scheme);
        const palette = color.palette(scheme);
        return palette.getHct(tone);
    }
    getTone(scheme, color) {
        const decreasingContrast = scheme.contrastLevel < 0;
        const toneDeltaPair = color.toneDeltaPair ? color.toneDeltaPair(scheme) : undefined;
        // Case 1: dual foreground, pair of colors with delta constraint.
        if (toneDeltaPair) {
            const roleA = toneDeltaPair.roleA;
            const roleB = toneDeltaPair.roleB;
            const delta = toneDeltaPair.delta;
            const polarity = toneDeltaPair.polarity;
            const stayTogether = toneDeltaPair.stayTogether;
            const aIsNearer = (polarity === 'nearer' ||
                (polarity === 'lighter' && !scheme.isDark) ||
                (polarity === 'darker' && scheme.isDark));
            const nearer = aIsNearer ? roleA : roleB;
            const farther = aIsNearer ? roleB : roleA;
            const amNearer = color.name === nearer.name;
            const expansionDir = scheme.isDark ? 1 : -1;
            let nTone = nearer.tone(scheme);
            let fTone = farther.tone(scheme);
            // 1st round: solve to min for each, if background and contrast curve
            // are defined.
            if (color.background && nearer.contrastCurve && farther.contrastCurve) {
                const bg = color.background(scheme);
                const nContrastCurve = nearer.contrastCurve(scheme);
                const fContrastCurve = farther.contrastCurve(scheme);
                if (bg && nContrastCurve && fContrastCurve) {
                    const bgTone = bg.getTone(scheme);
                    const nContrast = nContrastCurve.get(scheme.contrastLevel);
                    const fContrast = fContrastCurve.get(scheme.contrastLevel);
                    // If a color is good enough, it is not adjusted.
                    // Initial and adjusted tones for `nearer`
                    if (Contrast.ratioOfTones(bgTone, nTone) < nContrast) {
                        nTone = DynamicColor.foregroundTone(bgTone, nContrast);
                    }
                    // Initial and adjusted tones for `farther`
                    if (Contrast.ratioOfTones(bgTone, fTone) < fContrast) {
                        fTone = DynamicColor.foregroundTone(bgTone, fContrast);
                    }
                    if (decreasingContrast) {
                        // If decreasing contrast, adjust color to the "bare minimum"
                        // that satisfies contrast.
                        nTone = DynamicColor.foregroundTone(bgTone, nContrast);
                        fTone = DynamicColor.foregroundTone(bgTone, fContrast);
                    }
                }
            }
            if ((fTone - nTone) * expansionDir < delta) {
                // 2nd round: expand farther to match delta, if contrast is not
                // satisfied.
                fTone = math.clampDouble(0, 100, nTone + delta * expansionDir);
                if ((fTone - nTone) * expansionDir >= delta) {
                    // Good! Tones now satisfy the constraint; no change needed.
                }
                else {
                    // 3rd round: contract nearer to match delta.
                    nTone = math.clampDouble(0, 100, fTone - delta * expansionDir);
                }
            }
            // Avoids the 50-59 awkward zone.
            if (50 <= nTone && nTone < 60) {
                // If `nearer` is in the awkward zone, move it away, together with
                // `farther`.
                if (expansionDir > 0) {
                    nTone = 60;
                    fTone = Math.max(fTone, nTone + delta * expansionDir);
                }
                else {
                    nTone = 49;
                    fTone = Math.min(fTone, nTone + delta * expansionDir);
                }
            }
            else if (50 <= fTone && fTone < 60) {
                if (stayTogether) {
                    // Fixes both, to avoid two colors on opposite sides of the "awkward
                    // zone".
                    if (expansionDir > 0) {
                        nTone = 60;
                        fTone = Math.max(fTone, nTone + delta * expansionDir);
                    }
                    else {
                        nTone = 49;
                        fTone = Math.min(fTone, nTone + delta * expansionDir);
                    }
                }
                else {
                    // Not required to stay together; fixes just one.
                    if (expansionDir > 0) {
                        fTone = 60;
                    }
                    else {
                        fTone = 49;
                    }
                }
            }
            // Returns `nTone` if this color is `nearer`, otherwise `fTone`.
            return amNearer ? nTone : fTone;
        }
        else {
            // Case 2: No contrast pair; just solve for itself.
            let answer = color.tone(scheme);
            if (color.background == undefined ||
                color.background(scheme) === undefined ||
                color.contrastCurve == undefined ||
                color.contrastCurve(scheme) === undefined) {
                return answer; // No adjustment for colors with no background.
            }
            const bgTone = color.background(scheme).getTone(scheme);
            const desiredRatio = color.contrastCurve(scheme).get(scheme.contrastLevel);
            if (Contrast.ratioOfTones(bgTone, answer) >= desiredRatio) {
                // Don't "improve" what's good enough.
            }
            else {
                // Rough improvement.
                answer = DynamicColor.foregroundTone(bgTone, desiredRatio);
            }
            if (decreasingContrast) {
                answer = DynamicColor.foregroundTone(bgTone, desiredRatio);
            }
            if (color.isBackground && 50 <= answer && answer < 60) {
                // Must adjust
                if (Contrast.ratioOfTones(49, bgTone) >= desiredRatio) {
                    answer = 49;
                }
                else {
                    answer = 60;
                }
            }
            if (color.secondBackground == undefined ||
                color.secondBackground(scheme) === undefined) {
                return answer;
            }
            // Case 3: Adjust for dual backgrounds.
            const [bg1, bg2] = [color.background, color.secondBackground];
            const [bgTone1, bgTone2] = [bg1(scheme).getTone(scheme), bg2(scheme).getTone(scheme)];
            const [upper, lower] = [Math.max(bgTone1, bgTone2), Math.min(bgTone1, bgTone2)];
            if (Contrast.ratioOfTones(upper, answer) >= desiredRatio &&
                Contrast.ratioOfTones(lower, answer) >= desiredRatio) {
                return answer;
            }
            // The darkest light tone that satisfies the desired ratio,
            // or -1 if such ratio cannot be reached.
            const lightOption = Contrast.lighter(upper, desiredRatio);
            // The lightest dark tone that satisfies the desired ratio,
            // or -1 if such ratio cannot be reached.
            const darkOption = Contrast.darker(lower, desiredRatio);
            // Tones suitable for the foreground.
            const availables = [];
            if (lightOption !== -1)
                availables.push(lightOption);
            if (darkOption !== -1)
                availables.push(darkOption);
            const prefersLight = DynamicColor.tonePrefersLightForeground(bgTone1) ||
                DynamicColor.tonePrefersLightForeground(bgTone2);
            if (prefersLight) {
                return (lightOption < 0) ? 100 : lightOption;
            }
            if (availables.length === 1) {
                return availables[0];
            }
            return (darkOption < 0) ? 0 : darkOption;
        }
    }
}
/**
 * A delegate for the color calculation of a DynamicScheme in the 2025 spec.
 */
class ColorCalculationDelegateImpl2025 {
    getHct(scheme, color) {
        const palette = color.palette(scheme);
        const tone = color.getTone(scheme);
        const hue = palette.hue;
        const chroma = palette.chroma *
            (color.chromaMultiplier ? color.chromaMultiplier(scheme) : 1);
        return Hct.from(hue, chroma, tone);
    }
    getTone(scheme, color) {
        const toneDeltaPair = color.toneDeltaPair ? color.toneDeltaPair(scheme) : undefined;
        // Case 0: tone delta constraint.
        if (toneDeltaPair) {
            const roleA = toneDeltaPair.roleA;
            const roleB = toneDeltaPair.roleB;
            const polarity = toneDeltaPair.polarity;
            const constraint = toneDeltaPair.constraint;
            const absoluteDelta = polarity === 'darker' ||
                (polarity === 'relative_lighter' && scheme.isDark) ||
                (polarity === 'relative_darker' && !scheme.isDark) ?
                -toneDeltaPair.delta :
                toneDeltaPair.delta;
            const amRoleA = color.name === roleA.name;
            const selfRole = amRoleA ? roleA : roleB;
            const refRole = amRoleA ? roleB : roleA;
            let selfTone = selfRole.tone(scheme);
            let refTone = refRole.getTone(scheme);
            const relativeDelta = absoluteDelta * (amRoleA ? 1 : -1);
            if (constraint === 'exact') {
                selfTone = math.clampDouble(0, 100, refTone + relativeDelta);
            }
            else if (constraint === 'nearer') {
                if (relativeDelta > 0) {
                    selfTone = math.clampDouble(0, 100, math.clampDouble(refTone, refTone + relativeDelta, selfTone));
                }
                else {
                    selfTone = math.clampDouble(0, 100, math.clampDouble(refTone + relativeDelta, refTone, selfTone));
                }
            }
            else if (constraint === 'farther') {
                if (relativeDelta > 0) {
                    selfTone = math.clampDouble(refTone + relativeDelta, 100, selfTone);
                }
                else {
                    selfTone = math.clampDouble(0, refTone + relativeDelta, selfTone);
                }
            }
            if (color.background && color.contrastCurve) {
                const background = color.background(scheme);
                const contrastCurve = color.contrastCurve(scheme);
                if (background && contrastCurve) {
                    // Adjust the tones for contrast, if background and contrast curve
                    // are defined.
                    const bgTone = background.getTone(scheme);
                    const selfContrast = contrastCurve.get(scheme.contrastLevel);
                    selfTone = Contrast.ratioOfTones(bgTone, selfTone) >= selfContrast &&
                        scheme.contrastLevel >= 0 ?
                        selfTone :
                        DynamicColor.foregroundTone(bgTone, selfContrast);
                }
            }
            // This can avoid the awkward tones for background colors including the
            // access fixed colors. Accent fixed dim colors should not be adjusted.
            if (color.isBackground && !color.name.endsWith('_fixed_dim')) {
                if (selfTone >= 57) {
                    selfTone = math.clampDouble(65, 100, selfTone);
                }
                else {
                    selfTone = math.clampDouble(0, 49, selfTone);
                }
            }
            return selfTone;
        }
        else {
            // Case 1: No tone delta pair; just solve for itself.
            let answer = color.tone(scheme);
            if (color.background == undefined ||
                color.background(scheme) === undefined ||
                color.contrastCurve == undefined ||
                color.contrastCurve(scheme) === undefined) {
                return answer; // No adjustment for colors with no background.
            }
            const bgTone = color.background(scheme).getTone(scheme);
            const desiredRatio = color.contrastCurve(scheme).get(scheme.contrastLevel);
            // Recalculate the tone from desired contrast ratio if the current
            // contrast ratio is not enough or desired contrast level is decreasing
            // (<0).
            answer = Contrast.ratioOfTones(bgTone, answer) >= desiredRatio &&
                scheme.contrastLevel >= 0 ?
                answer :
                DynamicColor.foregroundTone(bgTone, desiredRatio);
            // This can avoid the awkward tones for background colors including the
            // access fixed colors. Accent fixed dim colors should not be adjusted.
            if (color.isBackground && !color.name.endsWith('_fixed_dim')) {
                if (answer >= 57) {
                    answer = math.clampDouble(65, 100, answer);
                }
                else {
                    answer = math.clampDouble(0, 49, answer);
                }
            }
            if (color.secondBackground == undefined ||
                color.secondBackground(scheme) === undefined) {
                return answer;
            }
            // Case 2: Adjust for dual backgrounds.
            const [bg1, bg2] = [color.background, color.secondBackground];
            const [bgTone1, bgTone2] = [bg1(scheme).getTone(scheme), bg2(scheme).getTone(scheme)];
            const [upper, lower] = [Math.max(bgTone1, bgTone2), Math.min(bgTone1, bgTone2)];
            if (Contrast.ratioOfTones(upper, answer) >= desiredRatio &&
                Contrast.ratioOfTones(lower, answer) >= desiredRatio) {
                return answer;
            }
            // The darkest light tone that satisfies the desired ratio,
            // or -1 if such ratio cannot be reached.
            const lightOption = Contrast.lighter(upper, desiredRatio);
            // The lightest dark tone that satisfies the desired ratio,
            // or -1 if such ratio cannot be reached.
            const darkOption = Contrast.darker(lower, desiredRatio);
            // Tones suitable for the foreground.
            const availables = [];
            if (lightOption !== -1)
                availables.push(lightOption);
            if (darkOption !== -1)
                availables.push(darkOption);
            const prefersLight = DynamicColor.tonePrefersLightForeground(bgTone1) ||
                DynamicColor.tonePrefersLightForeground(bgTone2);
            if (prefersLight) {
                return (lightOption < 0) ? 100 : lightOption;
            }
            if (availables.length === 1) {
                return availables[0];
            }
            return (darkOption < 0) ? 0 : darkOption;
        }
    }
}
const spec2021 = new ColorCalculationDelegateImpl2021();
const spec2025 = new ColorCalculationDelegateImpl2025();
/**
 * Returns the ColorCalculationDelegate for the given spec version.
 */
function getSpec(specVersion) {
    return specVersion === '2025' ? spec2025 : spec2021;
}
