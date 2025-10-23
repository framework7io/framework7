/**
 * @license
 * Copyright 2025 Google LLC
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
import { ContrastCurve } from './contrast_curve.js';
import { DynamicColor } from './dynamic_color.js';
import { ToneDeltaPair } from './tone_delta_pair.js';
import { Variant } from './variant.js';
/**
 * Returns true if the scheme is Fidelity or Content.
 */
function isFidelity(scheme) {
    return scheme.variant === Variant.FIDELITY ||
        scheme.variant === Variant.CONTENT;
}
/**
 * Returns true if the scheme is Monochrome.
 */
function isMonochrome(scheme) {
    return scheme.variant === Variant.MONOCHROME;
}
/**
 * Returns the desired chroma for a given tone at a specific hue.
 *
 * @param hue The given hue.
 * @param chroma The target chroma.
 * @param tone The tone to start with.
 * @param byDecreasingTone Whether to search for lower tones.
 */
function findDesiredChromaByTone(hue, chroma, tone, byDecreasingTone) {
    let answer = tone;
    let closestToChroma = Hct.from(hue, chroma, tone);
    if (closestToChroma.chroma < chroma) {
        let chromaPeak = closestToChroma.chroma;
        while (closestToChroma.chroma < chroma) {
            answer += byDecreasingTone ? -1.0 : 1.0;
            const potentialSolution = Hct.from(hue, chroma, answer);
            if (chromaPeak > potentialSolution.chroma) {
                break;
            }
            if (Math.abs(potentialSolution.chroma - chroma) < 0.4) {
                break;
            }
            const potentialDelta = Math.abs(potentialSolution.chroma - chroma);
            const currentDelta = Math.abs(closestToChroma.chroma - chroma);
            if (potentialDelta < currentDelta) {
                closestToChroma = potentialSolution;
            }
            chromaPeak = Math.max(chromaPeak, potentialSolution.chroma);
        }
    }
    return answer;
}
/**
 * A delegate for the dynamic color spec of a DynamicScheme in the 2021 spec.
 */
export class ColorSpecDelegateImpl2021 {
    ////////////////////////////////////////////////////////////////
    // Main Palettes                                              //
    ////////////////////////////////////////////////////////////////
    primaryPaletteKeyColor() {
        return DynamicColor.fromPalette({
            name: 'primary_palette_key_color',
            palette: (s) => s.primaryPalette,
            tone: (s) => s.primaryPalette.keyColor.tone,
        });
    }
    secondaryPaletteKeyColor() {
        return DynamicColor.fromPalette({
            name: 'secondary_palette_key_color',
            palette: (s) => s.secondaryPalette,
            tone: (s) => s.secondaryPalette.keyColor.tone,
        });
    }
    tertiaryPaletteKeyColor() {
        return DynamicColor.fromPalette({
            name: 'tertiary_palette_key_color',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => s.tertiaryPalette.keyColor.tone,
        });
    }
    neutralPaletteKeyColor() {
        return DynamicColor.fromPalette({
            name: 'neutral_palette_key_color',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.neutralPalette.keyColor.tone,
        });
    }
    neutralVariantPaletteKeyColor() {
        return DynamicColor.fromPalette({
            name: 'neutral_variant_palette_key_color',
            palette: (s) => s.neutralVariantPalette,
            tone: (s) => s.neutralVariantPalette.keyColor.tone,
        });
    }
    errorPaletteKeyColor() {
        return DynamicColor.fromPalette({
            name: 'error_palette_key_color',
            palette: (s) => s.errorPalette,
            tone: (s) => s.errorPalette.keyColor.tone,
        });
    }
    ////////////////////////////////////////////////////////////////
    // Surfaces [S]                                               //
    ////////////////////////////////////////////////////////////////
    background() {
        return DynamicColor.fromPalette({
            name: 'background',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 6 : 98,
            isBackground: true,
        });
    }
    onBackground() {
        return DynamicColor.fromPalette({
            name: 'on_background',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 90 : 10,
            background: (s) => this.background(),
            contrastCurve: (s) => new ContrastCurve(3, 3, 4.5, 7),
        });
    }
    surface() {
        return DynamicColor.fromPalette({
            name: 'surface',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 6 : 98,
            isBackground: true,
        });
    }
    surfaceDim() {
        return DynamicColor.fromPalette({
            name: 'surface_dim',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 6 : new ContrastCurve(87, 87, 80, 75).get(s.contrastLevel),
            isBackground: true,
        });
    }
    surfaceBright() {
        return DynamicColor.fromPalette({
            name: 'surface_bright',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ?
                new ContrastCurve(24, 24, 29, 34).get(s.contrastLevel) :
                98,
            isBackground: true,
        });
    }
    surfaceContainerLowest() {
        return DynamicColor.fromPalette({
            name: 'surface_container_lowest',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? new ContrastCurve(4, 4, 2, 0).get(s.contrastLevel) : 100,
            isBackground: true,
        });
    }
    surfaceContainerLow() {
        return DynamicColor.fromPalette({
            name: 'surface_container_low',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ?
                new ContrastCurve(10, 10, 11, 12).get(s.contrastLevel) :
                new ContrastCurve(96, 96, 96, 95).get(s.contrastLevel),
            isBackground: true,
        });
    }
    surfaceContainer() {
        return DynamicColor.fromPalette({
            name: 'surface_container',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ?
                new ContrastCurve(12, 12, 16, 20).get(s.contrastLevel) :
                new ContrastCurve(94, 94, 92, 90).get(s.contrastLevel),
            isBackground: true,
        });
    }
    surfaceContainerHigh() {
        return DynamicColor.fromPalette({
            name: 'surface_container_high',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ?
                new ContrastCurve(17, 17, 21, 25).get(s.contrastLevel) :
                new ContrastCurve(92, 92, 88, 85).get(s.contrastLevel),
            isBackground: true,
        });
    }
    surfaceContainerHighest() {
        return DynamicColor.fromPalette({
            name: 'surface_container_highest',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ?
                new ContrastCurve(22, 22, 26, 30).get(s.contrastLevel) :
                new ContrastCurve(90, 90, 84, 80).get(s.contrastLevel),
            isBackground: true,
        });
    }
    onSurface() {
        return DynamicColor.fromPalette({
            name: 'on_surface',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 90 : 10,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    surfaceVariant() {
        return DynamicColor.fromPalette({
            name: 'surface_variant',
            palette: (s) => s.neutralVariantPalette,
            tone: (s) => s.isDark ? 30 : 90,
            isBackground: true,
        });
    }
    onSurfaceVariant() {
        return DynamicColor.fromPalette({
            name: 'on_surface_variant',
            palette: (s) => s.neutralVariantPalette,
            tone: (s) => s.isDark ? 80 : 30,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    inverseSurface() {
        return DynamicColor.fromPalette({
            name: 'inverse_surface',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 90 : 20,
            isBackground: true,
        });
    }
    inverseOnSurface() {
        return DynamicColor.fromPalette({
            name: 'inverse_on_surface',
            palette: (s) => s.neutralPalette,
            tone: (s) => s.isDark ? 20 : 95,
            background: (s) => this.inverseSurface(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    outline() {
        return DynamicColor.fromPalette({
            name: 'outline',
            palette: (s) => s.neutralVariantPalette,
            tone: (s) => s.isDark ? 60 : 50,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1.5, 3, 4.5, 7),
        });
    }
    outlineVariant() {
        return DynamicColor.fromPalette({
            name: 'outline_variant',
            palette: (s) => s.neutralVariantPalette,
            tone: (s) => s.isDark ? 30 : 80,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
        });
    }
    shadow() {
        return DynamicColor.fromPalette({
            name: 'shadow',
            palette: (s) => s.neutralPalette,
            tone: (s) => 0,
        });
    }
    scrim() {
        return DynamicColor.fromPalette({
            name: 'scrim',
            palette: (s) => s.neutralPalette,
            tone: (s) => 0,
        });
    }
    surfaceTint() {
        return DynamicColor.fromPalette({
            name: 'surface_tint',
            palette: (s) => s.primaryPalette,
            tone: (s) => s.isDark ? 80 : 40,
            isBackground: true,
        });
    }
    ////////////////////////////////////////////////////////////////
    // Primary [P].                                               //
    ////////////////////////////////////////////////////////////////
    primary() {
        return DynamicColor.fromPalette({
            name: 'primary',
            palette: (s) => s.primaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 100 : 0;
                }
                return s.isDark ? 80 : 40;
            },
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 7),
            toneDeltaPair: (s) => new ToneDeltaPair(this.primaryContainer(), this.primary(), 10, 'nearer', false),
        });
    }
    primaryDim() {
        return undefined;
    }
    onPrimary() {
        return DynamicColor.fromPalette({
            name: 'on_primary',
            palette: (s) => s.primaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 10 : 90;
                }
                return s.isDark ? 20 : 100;
            },
            background: (s) => this.primary(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    primaryContainer() {
        return DynamicColor.fromPalette({
            name: 'primary_container',
            palette: (s) => s.primaryPalette,
            tone: (s) => {
                if (isFidelity(s)) {
                    return s.sourceColorHct.tone;
                }
                if (isMonochrome(s)) {
                    return s.isDark ? 85 : 25;
                }
                return s.isDark ? 30 : 90;
            },
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.primaryContainer(), this.primary(), 10, 'nearer', false),
        });
    }
    onPrimaryContainer() {
        return DynamicColor.fromPalette({
            name: 'on_primary_container',
            palette: (s) => s.primaryPalette,
            tone: (s) => {
                if (isFidelity(s)) {
                    return DynamicColor.foregroundTone(this.primaryContainer().tone(s), 4.5);
                }
                if (isMonochrome(s)) {
                    return s.isDark ? 0 : 100;
                }
                return s.isDark ? 90 : 30;
            },
            background: (s) => this.primaryContainer(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    inversePrimary() {
        return DynamicColor.fromPalette({
            name: 'inverse_primary',
            palette: (s) => s.primaryPalette,
            tone: (s) => s.isDark ? 40 : 80,
            background: (s) => this.inverseSurface(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 7),
        });
    }
    /////////////////////////////////////////////////////////////////
    // Secondary [Q].                                              //
    /////////////////////////////////////////////////////////////////
    secondary() {
        return DynamicColor.fromPalette({
            name: 'secondary',
            palette: (s) => s.secondaryPalette,
            tone: (s) => s.isDark ? 80 : 40,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 7),
            toneDeltaPair: (s) => new ToneDeltaPair(this.secondaryContainer(), this.secondary(), 10, 'nearer', false),
        });
    }
    secondaryDim() {
        return undefined;
    }
    onSecondary() {
        return DynamicColor.fromPalette({
            name: 'on_secondary',
            palette: (s) => s.secondaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 10 : 100;
                }
                else {
                    return s.isDark ? 20 : 100;
                }
            },
            background: (s) => this.secondary(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    secondaryContainer() {
        return DynamicColor.fromPalette({
            name: 'secondary_container',
            palette: (s) => s.secondaryPalette,
            tone: (s) => {
                const initialTone = s.isDark ? 30 : 90;
                if (isMonochrome(s)) {
                    return s.isDark ? 30 : 85;
                }
                if (!isFidelity(s)) {
                    return initialTone;
                }
                return findDesiredChromaByTone(s.secondaryPalette.hue, s.secondaryPalette.chroma, initialTone, s.isDark ? false : true);
            },
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.secondaryContainer(), this.secondary(), 10, 'nearer', false),
        });
    }
    onSecondaryContainer() {
        return DynamicColor.fromPalette({
            name: 'on_secondary_container',
            palette: (s) => s.secondaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 90 : 10;
                }
                if (!isFidelity(s)) {
                    return s.isDark ? 90 : 30;
                }
                return DynamicColor.foregroundTone(this.secondaryContainer().tone(s), 4.5);
            },
            background: (s) => this.secondaryContainer(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    /////////////////////////////////////////////////////////////////
    // Tertiary [T].                                               //
    /////////////////////////////////////////////////////////////////
    tertiary() {
        return DynamicColor.fromPalette({
            name: 'tertiary',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 90 : 25;
                }
                return s.isDark ? 80 : 40;
            },
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 7),
            toneDeltaPair: (s) => new ToneDeltaPair(this.tertiaryContainer(), this.tertiary(), 10, 'nearer', false),
        });
    }
    tertiaryDim() {
        return undefined;
    }
    onTertiary() {
        return DynamicColor.fromPalette({
            name: 'on_tertiary',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 10 : 90;
                }
                return s.isDark ? 20 : 100;
            },
            background: (s) => this.tertiary(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    tertiaryContainer() {
        return DynamicColor.fromPalette({
            name: 'tertiary_container',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 60 : 49;
                }
                if (!isFidelity(s)) {
                    return s.isDark ? 30 : 90;
                }
                const proposedHct = s.tertiaryPalette.getHct(s.sourceColorHct.tone);
                return DislikeAnalyzer.fixIfDisliked(proposedHct).tone;
            },
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.tertiaryContainer(), this.tertiary(), 10, 'nearer', false),
        });
    }
    onTertiaryContainer() {
        return DynamicColor.fromPalette({
            name: 'on_tertiary_container',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 0 : 100;
                }
                if (!isFidelity(s)) {
                    return s.isDark ? 90 : 30;
                }
                return DynamicColor.foregroundTone(this.tertiaryContainer().tone(s), 4.5);
            },
            background: (s) => this.tertiaryContainer(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    //////////////////////////////////////////////////////////////////
    // Error [E].                                                   //
    //////////////////////////////////////////////////////////////////
    error() {
        return DynamicColor.fromPalette({
            name: 'error',
            palette: (s) => s.errorPalette,
            tone: (s) => s.isDark ? 80 : 40,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 7),
            toneDeltaPair: (s) => new ToneDeltaPair(this.errorContainer(), this.error(), 10, 'nearer', false),
        });
    }
    errorDim() {
        return undefined;
    }
    onError() {
        return DynamicColor.fromPalette({
            name: 'on_error',
            palette: (s) => s.errorPalette,
            tone: (s) => s.isDark ? 20 : 100,
            background: (s) => this.error(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    errorContainer() {
        return DynamicColor.fromPalette({
            name: 'error_container',
            palette: (s) => s.errorPalette,
            tone: (s) => s.isDark ? 30 : 90,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.errorContainer(), this.error(), 10, 'nearer', false),
        });
    }
    onErrorContainer() {
        return DynamicColor.fromPalette({
            name: 'on_error_container',
            palette: (s) => s.errorPalette,
            tone: (s) => {
                if (isMonochrome(s)) {
                    return s.isDark ? 90 : 10;
                }
                return s.isDark ? 90 : 30;
            },
            background: (s) => this.errorContainer(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    //////////////////////////////////////////////////////////////////
    // Primary Fixed [PF]                                           //
    //////////////////////////////////////////////////////////////////
    primaryFixed() {
        return DynamicColor.fromPalette({
            name: 'primary_fixed',
            palette: (s) => s.primaryPalette,
            tone: (s) => isMonochrome(s) ? 40.0 : 90.0,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.primaryFixed(), this.primaryFixedDim(), 10, 'lighter', true),
        });
    }
    primaryFixedDim() {
        return DynamicColor.fromPalette({
            name: 'primary_fixed_dim',
            palette: (s) => s.primaryPalette,
            tone: (s) => isMonochrome(s) ? 30.0 : 80.0,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.primaryFixed(), this.primaryFixedDim(), 10, 'lighter', true),
        });
    }
    onPrimaryFixed() {
        return DynamicColor.fromPalette({
            name: 'on_primary_fixed',
            palette: (s) => s.primaryPalette,
            tone: (s) => isMonochrome(s) ? 100.0 : 10.0,
            background: (s) => this.primaryFixedDim(),
            secondBackground: (s) => this.primaryFixed(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    onPrimaryFixedVariant() {
        return DynamicColor.fromPalette({
            name: 'on_primary_fixed_variant',
            palette: (s) => s.primaryPalette,
            tone: (s) => isMonochrome(s) ? 90.0 : 30.0,
            background: (s) => this.primaryFixedDim(),
            secondBackground: (s) => this.primaryFixed(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    ///////////////////////////////////////////////////////////////////
    // Secondary Fixed [QF]                                          //
    ///////////////////////////////////////////////////////////////////
    secondaryFixed() {
        return DynamicColor.fromPalette({
            name: 'secondary_fixed',
            palette: (s) => s.secondaryPalette,
            tone: (s) => isMonochrome(s) ? 80.0 : 90.0,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.secondaryFixed(), this.secondaryFixedDim(), 10, 'lighter', true),
        });
    }
    secondaryFixedDim() {
        return DynamicColor.fromPalette({
            name: 'secondary_fixed_dim',
            palette: (s) => s.secondaryPalette,
            tone: (s) => isMonochrome(s) ? 70.0 : 80.0,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.secondaryFixed(), this.secondaryFixedDim(), 10, 'lighter', true),
        });
    }
    onSecondaryFixed() {
        return DynamicColor.fromPalette({
            name: 'on_secondary_fixed',
            palette: (s) => s.secondaryPalette,
            tone: (s) => 10.0,
            background: (s) => this.secondaryFixedDim(),
            secondBackground: (s) => this.secondaryFixed(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    onSecondaryFixedVariant() {
        return DynamicColor.fromPalette({
            name: 'on_secondary_fixed_variant',
            palette: (s) => s.secondaryPalette,
            tone: (s) => isMonochrome(s) ? 25.0 : 30.0,
            background: (s) => this.secondaryFixedDim(),
            secondBackground: (s) => this.secondaryFixed(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    /////////////////////////////////////////////////////////////////
    // Tertiary Fixed [TF]                                         //
    /////////////////////////////////////////////////////////////////
    tertiaryFixed() {
        return DynamicColor.fromPalette({
            name: 'tertiary_fixed',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => isMonochrome(s) ? 40.0 : 90.0,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, 'lighter', true),
        });
    }
    tertiaryFixedDim() {
        return DynamicColor.fromPalette({
            name: 'tertiary_fixed_dim',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => isMonochrome(s) ? 30.0 : 80.0,
            isBackground: true,
            background: (s) => this.highestSurface(s),
            contrastCurve: (s) => new ContrastCurve(1, 1, 3, 4.5),
            toneDeltaPair: (s) => new ToneDeltaPair(this.tertiaryFixed(), this.tertiaryFixedDim(), 10, 'lighter', true),
        });
    }
    onTertiaryFixed() {
        return DynamicColor.fromPalette({
            name: 'on_tertiary_fixed',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => isMonochrome(s) ? 100.0 : 10.0,
            background: (s) => this.tertiaryFixedDim(),
            secondBackground: (s) => this.tertiaryFixed(),
            contrastCurve: (s) => new ContrastCurve(4.5, 7, 11, 21),
        });
    }
    onTertiaryFixedVariant() {
        return DynamicColor.fromPalette({
            name: 'on_tertiary_fixed_variant',
            palette: (s) => s.tertiaryPalette,
            tone: (s) => isMonochrome(s) ? 90.0 : 30.0,
            background: (s) => this.tertiaryFixedDim(),
            secondBackground: (s) => this.tertiaryFixed(),
            contrastCurve: (s) => new ContrastCurve(3, 4.5, 7, 11),
        });
    }
    ////////////////////////////////////////////////////////////////
    // Other                                                      //
    ////////////////////////////////////////////////////////////////
    highestSurface(s) {
        return s.isDark ? this.surfaceBright() : this.surfaceDim();
    }
}
