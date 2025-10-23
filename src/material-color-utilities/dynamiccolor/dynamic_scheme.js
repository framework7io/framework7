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
import { DislikeAnalyzer } from '../dislike/dislike_analyzer.js';
import { Hct } from '../hct/hct.js';
import { TonalPalette } from '../palettes/tonal_palette.js';
import { TemperatureCache } from '../temperature/temperature_cache.js';
import * as math from '../utils/math_utils.js';
import { MaterialDynamicColors } from './material_dynamic_colors.js';
import { Variant } from './variant.js';
/**
 * Constructed by a set of values representing the current UI state (such as
 * whether or not its dark theme, what the theme style is, etc.), and
 * provides a set of TonalPalettes that can create colors that fit in
 * with the theme style. Used by DynamicColor to resolve into a color.
 */
export class DynamicScheme {
    constructor(args) {
        this.sourceColorArgb = args.sourceColorHct.toInt();
        this.variant = args.variant;
        this.contrastLevel = args.contrastLevel;
        this.isDark = args.isDark;
        this.platform = args.platform ?? 'phone';
        this.specVersion = args.specVersion ?? '2021';
        this.sourceColorHct = args.sourceColorHct;
        this.primaryPalette = args.primaryPalette ??
            getSpec(this.specVersion)
                .getPrimaryPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel);
        this.secondaryPalette = args.secondaryPalette ??
            getSpec(this.specVersion)
                .getSecondaryPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel);
        this.tertiaryPalette = args.tertiaryPalette ??
            getSpec(this.specVersion)
                .getTertiaryPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel);
        this.neutralPalette = args.neutralPalette ??
            getSpec(this.specVersion)
                .getNeutralPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel);
        this.neutralVariantPalette = args.neutralVariantPalette ??
            getSpec(this.specVersion)
                .getNeutralVariantPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel);
        this.errorPalette = args.errorPalette ??
            getSpec(this.specVersion)
                .getErrorPalette(this.variant, args.sourceColorHct, this.isDark, this.platform, this.contrastLevel) ??
            TonalPalette.fromHueAndChroma(25.0, 84.0);
        this.colors = new MaterialDynamicColors();
    }
    toString() {
        return `Scheme: ` +
            `variant=${Variant[this.variant]}, ` +
            `mode=${this.isDark ? 'dark' : 'light'}, ` +
            `platform=${this.platform}, ` +
            `contrastLevel=${this.contrastLevel.toFixed(1)}, ` +
            `seed=${this.sourceColorHct.toString()}, ` +
            `specVersion=${this.specVersion}`;
    }
    /**
     * Returns a new hue based on a piecewise function and input color hue.
     *
     * For example, for the following function:
     * result = 26 if 0 <= hue < 101
     * result = 39 if 101 <= hue < 210
     * result = 28 if 210 <= hue < 360
     *
     * call the function as:
     *
     * const hueBreakpoints = [0, 101, 210, 360];
     * const hues = [26, 39, 28];
     * const result = scheme.piecewise(hue, hueBreakpoints, hues);
     *
     * @param sourceColorHct The input value.
     * @param hueBreakpoints The breakpoints, in sorted order. No default lower or
     *     upper bounds are assumed.
     * @param hues The hues that should be applied when source color's hue is >=
     *     the same index in hueBrakpoints array, and < the hue at the next index
     *     in hueBrakpoints array. Otherwise, the source color's hue is returned.
     */
    static getPiecewiseHue(sourceColorHct, hueBreakpoints, hues) {
        const size = Math.min(hueBreakpoints.length - 1, hues.length);
        const sourceHue = sourceColorHct.hue;
        for (let i = 0; i < size; i++) {
            if (sourceHue >= hueBreakpoints[i] && sourceHue < hueBreakpoints[i + 1]) {
                return math.sanitizeDegreesDouble(hues[i]);
            }
        }
        // No condition matched, return the source hue.
        return sourceHue;
    }
    /**
     * Returns a shifted hue based on a piecewise function and input color hue.
     *
     * For example, for the following function:
     * result = hue + 26 if 0 <= hue < 101
     * result = hue - 39 if 101 <= hue < 210
     * result = hue + 28 if 210 <= hue < 360
     *
     * call the function as:
     *
     * const hueBreakpoints = [0, 101, 210, 360];
     * const hues = [26, -39, 28];
     * const result = scheme.getRotatedHue(hue, hueBreakpoints, hues);
     *
     * @param sourceColorHct the source color of the theme, in HCT.
     * @param hueBreakpoints The "breakpoints", i.e. the hues at which a rotation
     *     should be apply. No default lower or upper bounds are assumed.
     * @param rotations The rotation that should be applied when source color's
     *     hue is >= the same index in hues array, and < the hue at the next
     *     index in hues array. Otherwise, the source color's hue is returned.
     */
    static getRotatedHue(sourceColorHct, hueBreakpoints, rotations) {
        let rotation = DynamicScheme.getPiecewiseHue(sourceColorHct, hueBreakpoints, rotations);
        if (Math.min(hueBreakpoints.length - 1, rotations.length) <= 0) {
            // No condition matched, return the source hue.
            rotation = 0;
        }
        return math.sanitizeDegreesDouble(sourceColorHct.hue + rotation);
    }
    getArgb(dynamicColor) {
        return dynamicColor.getArgb(this);
    }
    getHct(dynamicColor) {
        return dynamicColor.getHct(this);
    }
    // Palette key colors
    get primaryPaletteKeyColor() {
        return this.getArgb(this.colors.primaryPaletteKeyColor());
    }
    get secondaryPaletteKeyColor() {
        return this.getArgb(this.colors.secondaryPaletteKeyColor());
    }
    get tertiaryPaletteKeyColor() {
        return this.getArgb(this.colors.tertiaryPaletteKeyColor());
    }
    get neutralPaletteKeyColor() {
        return this.getArgb(this.colors.neutralPaletteKeyColor());
    }
    get neutralVariantPaletteKeyColor() {
        return this.getArgb(this.colors.neutralVariantPaletteKeyColor());
    }
    get errorPaletteKeyColor() {
        return this.getArgb(this.colors.errorPaletteKeyColor());
    }
    // Surface colors
    get background() {
        return this.getArgb(this.colors.background());
    }
    get onBackground() {
        return this.getArgb(this.colors.onBackground());
    }
    get surface() {
        return this.getArgb(this.colors.surface());
    }
    get surfaceDim() {
        return this.getArgb(this.colors.surfaceDim());
    }
    get surfaceBright() {
        return this.getArgb(this.colors.surfaceBright());
    }
    get surfaceContainerLowest() {
        return this.getArgb(this.colors.surfaceContainerLowest());
    }
    get surfaceContainerLow() {
        return this.getArgb(this.colors.surfaceContainerLow());
    }
    get surfaceContainer() {
        return this.getArgb(this.colors.surfaceContainer());
    }
    get surfaceContainerHigh() {
        return this.getArgb(this.colors.surfaceContainerHigh());
    }
    get surfaceContainerHighest() {
        return this.getArgb(this.colors.surfaceContainerHighest());
    }
    get onSurface() {
        return this.getArgb(this.colors.onSurface());
    }
    get surfaceVariant() {
        return this.getArgb(this.colors.surfaceVariant());
    }
    get onSurfaceVariant() {
        return this.getArgb(this.colors.onSurfaceVariant());
    }
    get inverseSurface() {
        return this.getArgb(this.colors.inverseSurface());
    }
    get inverseOnSurface() {
        return this.getArgb(this.colors.inverseOnSurface());
    }
    get outline() {
        return this.getArgb(this.colors.outline());
    }
    get outlineVariant() {
        return this.getArgb(this.colors.outlineVariant());
    }
    get shadow() {
        return this.getArgb(this.colors.shadow());
    }
    get scrim() {
        return this.getArgb(this.colors.scrim());
    }
    get surfaceTint() {
        return this.getArgb(this.colors.surfaceTint());
    }
    // Primary colors
    get primary() {
        return this.getArgb(this.colors.primary());
    }
    get primaryDim() {
        const primaryDim = this.colors.primaryDim();
        if (primaryDim === undefined) {
            throw new Error('`primaryDim` color is undefined prior to 2025 spec.');
        }
        return this.getArgb(primaryDim);
    }
    get onPrimary() {
        return this.getArgb(this.colors.onPrimary());
    }
    get primaryContainer() {
        return this.getArgb(this.colors.primaryContainer());
    }
    get onPrimaryContainer() {
        return this.getArgb(this.colors.onPrimaryContainer());
    }
    get primaryFixed() {
        return this.getArgb(this.colors.primaryFixed());
    }
    get primaryFixedDim() {
        return this.getArgb(this.colors.primaryFixedDim());
    }
    get onPrimaryFixed() {
        return this.getArgb(this.colors.onPrimaryFixed());
    }
    get onPrimaryFixedVariant() {
        return this.getArgb(this.colors.onPrimaryFixedVariant());
    }
    get inversePrimary() {
        return this.getArgb(this.colors.inversePrimary());
    }
    // Secondary colors
    get secondary() {
        return this.getArgb(this.colors.secondary());
    }
    get secondaryDim() {
        const secondaryDim = this.colors.secondaryDim();
        if (secondaryDim === undefined) {
            throw new Error('`secondaryDim` color is undefined prior to 2025 spec.');
        }
        return this.getArgb(secondaryDim);
    }
    get onSecondary() {
        return this.getArgb(this.colors.onSecondary());
    }
    get secondaryContainer() {
        return this.getArgb(this.colors.secondaryContainer());
    }
    get onSecondaryContainer() {
        return this.getArgb(this.colors.onSecondaryContainer());
    }
    get secondaryFixed() {
        return this.getArgb(this.colors.secondaryFixed());
    }
    get secondaryFixedDim() {
        return this.getArgb(this.colors.secondaryFixedDim());
    }
    get onSecondaryFixed() {
        return this.getArgb(this.colors.onSecondaryFixed());
    }
    get onSecondaryFixedVariant() {
        return this.getArgb(this.colors.onSecondaryFixedVariant());
    }
    // Tertiary colors
    get tertiary() {
        return this.getArgb(this.colors.tertiary());
    }
    get tertiaryDim() {
        const tertiaryDim = this.colors.tertiaryDim();
        if (tertiaryDim === undefined) {
            throw new Error('`tertiaryDim` color is undefined prior to 2025 spec.');
        }
        return this.getArgb(tertiaryDim);
    }
    get onTertiary() {
        return this.getArgb(this.colors.onTertiary());
    }
    get tertiaryContainer() {
        return this.getArgb(this.colors.tertiaryContainer());
    }
    get onTertiaryContainer() {
        return this.getArgb(this.colors.onTertiaryContainer());
    }
    get tertiaryFixed() {
        return this.getArgb(this.colors.tertiaryFixed());
    }
    get tertiaryFixedDim() {
        return this.getArgb(this.colors.tertiaryFixedDim());
    }
    get onTertiaryFixed() {
        return this.getArgb(this.colors.onTertiaryFixed());
    }
    get onTertiaryFixedVariant() {
        return this.getArgb(this.colors.onTertiaryFixedVariant());
    }
    // Error colors
    get error() {
        return this.getArgb(this.colors.error());
    }
    get errorDim() {
        const errorDim = this.colors.errorDim();
        if (errorDim === undefined) {
            throw new Error('`errorDim` color is undefined prior to 2025 spec.');
        }
        return this.getArgb(errorDim);
    }
    get onError() {
        return this.getArgb(this.colors.onError());
    }
    get errorContainer() {
        return this.getArgb(this.colors.errorContainer());
    }
    get onErrorContainer() {
        return this.getArgb(this.colors.onErrorContainer());
    }
}
DynamicScheme.DEFAULT_SPEC_VERSION = '2021';
DynamicScheme.DEFAULT_PLATFORM = 'phone';
/**
 * A delegate for the palettes of a DynamicScheme in the 2021 spec.
 */
class DynamicSchemePalettesDelegateImpl2021 {
    //////////////////////////////////////////////////////////////////
    // Scheme Palettes                                              //
    //////////////////////////////////////////////////////////////////
    getPrimaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.CONTENT:
            case Variant.FIDELITY:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma);
            case Variant.FRUIT_SALAD:
                return TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 48.0);
            case Variant.MONOCHROME:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12.0);
            case Variant.RAINBOW:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 48.0);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue + 240), 40);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 200.0);
            default:
                throw new Error(`Unsupported variant: ${variant}`);
        }
    }
    getSecondaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.CONTENT:
            case Variant.FIDELITY:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, Math.max(sourceColorHct.chroma - 32.0, sourceColorHct.chroma * 0.5));
            case Variant.FRUIT_SALAD:
                return TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue - 50.0), 36.0);
            case Variant.MONOCHROME:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8.0);
            case Variant.RAINBOW:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 21, 51, 121, 151, 191, 271, 321, 360], [45, 95, 45, 20, 45, 90, 45, 45, 45]), 24.0);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 41, 61, 101, 131, 181, 251, 301, 360], [18, 15, 10, 12, 15, 18, 15, 12, 12]), 24.0);
            default:
                throw new Error(`Unsupported variant: ${variant}`);
        }
    }
    getTertiaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.CONTENT:
                return TonalPalette.fromHct(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct)
                    .analogous(/* count= */ 3, /* divisions= */ 6)[2]));
            case Variant.FIDELITY:
                return TonalPalette.fromHct(DislikeAnalyzer.fixIfDisliked(new TemperatureCache(sourceColorHct).complement));
            case Variant.FRUIT_SALAD:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 36.0);
            case Variant.MONOCHROME:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0);
            case Variant.RAINBOW:
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue + 60.0), 24.0);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 21, 51, 121, 151, 191, 271, 321, 360], [120, 120, 20, 45, 20, 15, 20, 120, 120]), 32.0);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 41, 61, 101, 131, 181, 251, 301, 360], [35, 30, 20, 25, 30, 35, 30, 25, 25]), 32.0);
            default:
                throw new Error(`Unsupported variant: ${variant}`);
        }
    }
    getNeutralPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.CONTENT:
            case Variant.FIDELITY:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, sourceColorHct.chroma / 8.0);
            case Variant.FRUIT_SALAD:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10.0);
            case Variant.MONOCHROME:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.0);
            case Variant.RAINBOW:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 6.0);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue + 15), 8);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 10);
            default:
                throw new Error(`Unsupported variant: ${variant}`);
        }
    }
    getNeutralVariantPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.CONTENT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, (sourceColorHct.chroma / 8.0) + 4.0);
            case Variant.FIDELITY:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, (sourceColorHct.chroma / 8.0) + 4.0);
            case Variant.FRUIT_SALAD:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16.0);
            case Variant.MONOCHROME:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 2.0);
            case Variant.RAINBOW:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 0.0);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 8.0);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(math.sanitizeDegreesDouble(sourceColorHct.hue + 15), 12);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 12);
            default:
                throw new Error(`Unsupported variant: ${variant}`);
        }
    }
    getErrorPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        return undefined;
    }
}
/**
 * A delegate for the palettes of a DynamicScheme in the 2025 spec.
 */
class DynamicSchemePalettesDelegateImpl2025 extends DynamicSchemePalettesDelegateImpl2021 {
    //////////////////////////////////////////////////////////////////
    // Scheme Palettes                                              //
    //////////////////////////////////////////////////////////////////
    getPrimaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' ? (Hct.isBlue(sourceColorHct.hue) ? 12 : 8) :
                    (Hct.isBlue(sourceColorHct.hue) ? 16 : 12));
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' && isDark ? 26 : 32);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' ? (isDark ? 36 : 48) : 40);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' ? 74 : 56);
            default:
                return super.getPrimaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
        }
    }
    getSecondaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' ? (Hct.isBlue(sourceColorHct.hue) ? 6 : 4) :
                    (Hct.isBlue(sourceColorHct.hue) ? 10 : 6));
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, 16);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 105, 140, 204, 253, 278, 300, 333, 360], [-160, 155, -100, 96, -96, -156, -165, -160]), platform === 'phone' ? (isDark ? 16 : 24) : 24);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 38, 105, 140, 333, 360], [-14, 10, -14, 10, -14]), platform === 'phone' ? 56 : 36);
            default:
                return super.getSecondaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
        }
    }
    getTertiaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 38, 105, 161, 204, 278, 333, 360], [-32, 26, 10, -39, 24, -15, -32]), platform === 'phone' ? 20 : 36);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 20, 71, 161, 333, 360], [-40, 48, -32, 40, -32]), platform === 'phone' ? 28 : 32);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 105, 140, 204, 253, 278, 300, 333, 360], [-165, 160, -105, 101, -101, -160, -170, -165]), 48);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(DynamicScheme.getRotatedHue(sourceColorHct, [0, 38, 71, 105, 140, 161, 253, 333, 360], [-72, 35, 24, -24, 62, 50, 62, -72]), 56);
            default:
                return super.getTertiaryPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
        }
    }
    static getExpressiveNeutralHue(sourceColorHct) {
        const hue = DynamicScheme.getRotatedHue(sourceColorHct, [0, 71, 124, 253, 278, 300, 360], [10, 0, 10, 0, 10, 0]);
        return hue;
    }
    static getExpressiveNeutralChroma(sourceColorHct, isDark, platform) {
        const neutralHue = DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralHue(sourceColorHct);
        return platform === 'phone' ?
            (isDark ? (Hct.isYellow(neutralHue) ? 6 : 14) : 18) :
            12;
    }
    static getVibrantNeutralHue(sourceColorHct) {
        return DynamicScheme.getRotatedHue(sourceColorHct, [0, 38, 105, 140, 333, 360], [-14, 10, -14, 10, -14]);
    }
    static getVibrantNeutralChroma(sourceColorHct, platform) {
        const neutralHue = DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralHue(sourceColorHct);
        return platform === 'phone' ? 28 : (Hct.isBlue(neutralHue) ? 28 : 20);
    }
    getNeutralPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' ? 1.4 : 6);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, platform === 'phone' ? 5 : 10);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralHue(sourceColorHct), DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralChroma(sourceColorHct, isDark, platform));
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralHue(sourceColorHct), DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralChroma(sourceColorHct, platform));
            default:
                return super.getNeutralPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
        }
    }
    getNeutralVariantPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        switch (variant) {
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, (platform === 'phone' ? 1.4 : 6) * 2.2);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(sourceColorHct.hue, (platform === 'phone' ? 5 : 10) * 1.7);
            case Variant.EXPRESSIVE:
                const expressiveNeutralHue = DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralHue(sourceColorHct);
                const expressiveNeutralChroma = DynamicSchemePalettesDelegateImpl2025.getExpressiveNeutralChroma(sourceColorHct, isDark, platform);
                return TonalPalette.fromHueAndChroma(expressiveNeutralHue, expressiveNeutralChroma *
                    (expressiveNeutralHue >= 105 && expressiveNeutralHue < 125 ?
                        1.6 :
                        2.3));
            case Variant.VIBRANT:
                const vibrantNeutralHue = DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralHue(sourceColorHct);
                const vibrantNeutralChroma = DynamicSchemePalettesDelegateImpl2025.getVibrantNeutralChroma(sourceColorHct, platform);
                return TonalPalette.fromHueAndChroma(vibrantNeutralHue, vibrantNeutralChroma * 1.29);
            default:
                return super.getNeutralVariantPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
        }
    }
    getErrorPalette(variant, sourceColorHct, isDark, platform, contrastLevel) {
        const errorHue = DynamicScheme.getPiecewiseHue(sourceColorHct, [0, 3, 13, 23, 33, 43, 153, 273, 360], [12, 22, 32, 12, 22, 32, 22, 12]);
        switch (variant) {
            case Variant.NEUTRAL:
                return TonalPalette.fromHueAndChroma(errorHue, platform === 'phone' ? 50 : 40);
            case Variant.TONAL_SPOT:
                return TonalPalette.fromHueAndChroma(errorHue, platform === 'phone' ? 60 : 48);
            case Variant.EXPRESSIVE:
                return TonalPalette.fromHueAndChroma(errorHue, platform === 'phone' ? 64 : 48);
            case Variant.VIBRANT:
                return TonalPalette.fromHueAndChroma(errorHue, platform === 'phone' ? 80 : 60);
            default:
                return super.getErrorPalette(variant, sourceColorHct, isDark, platform, contrastLevel);
        }
    }
}
const spec2021 = new DynamicSchemePalettesDelegateImpl2021();
const spec2025 = new DynamicSchemePalettesDelegateImpl2025();
/**
 * Returns the DynamicSchemePalettesDelegate for the given spec version.
 */
function getSpec(specVersion) {
    return specVersion === '2025' ? spec2025 : spec2021;
}
