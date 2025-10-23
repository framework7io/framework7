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
import { ColorSpecDelegateImpl2025 } from './color_spec_2025.js';
/**
 * DynamicColors for the colors in the Material Design system.
 */
// Material Color Utilities namespaces the various utilities it provides.
// tslint:disable-next-line:class-as-namespace
export class MaterialDynamicColors {
    constructor() {
        ////////////////////////////////////////////////////////////////
        // All Colors                                                 //
        ////////////////////////////////////////////////////////////////
        this.allColors = [
            this.background(),
            this.onBackground(),
            this.surface(),
            this.surfaceDim(),
            this.surfaceBright(),
            this.surfaceContainerLowest(),
            this.surfaceContainerLow(),
            this.surfaceContainer(),
            this.surfaceContainerHigh(),
            this.surfaceContainerHighest(),
            this.onSurface(),
            this.onSurfaceVariant(),
            this.outline(),
            this.outlineVariant(),
            this.inverseSurface(),
            this.inverseOnSurface(),
            this.primary(),
            this.primaryDim(),
            this.onPrimary(),
            this.primaryContainer(),
            this.onPrimaryContainer(),
            this.primaryFixed(),
            this.primaryFixedDim(),
            this.onPrimaryFixed(),
            this.onPrimaryFixedVariant(),
            this.inversePrimary(),
            this.secondary(),
            this.secondaryDim(),
            this.onSecondary(),
            this.secondaryContainer(),
            this.onSecondaryContainer(),
            this.secondaryFixed(),
            this.secondaryFixedDim(),
            this.onSecondaryFixed(),
            this.onSecondaryFixedVariant(),
            this.tertiary(),
            this.tertiaryDim(),
            this.onTertiary(),
            this.tertiaryContainer(),
            this.onTertiaryContainer(),
            this.tertiaryFixed(),
            this.tertiaryFixedDim(),
            this.onTertiaryFixed(),
            this.onTertiaryFixedVariant(),
            this.error(),
            this.errorDim(),
            this.onError(),
            this.errorContainer(),
            this.onErrorContainer(),
        ].filter((c) => c !== undefined);
    }
    highestSurface(s) {
        return MaterialDynamicColors.colorSpec.highestSurface(s);
    }
    ////////////////////////////////////////////////////////////////
    // Main Palettes                                              //
    ////////////////////////////////////////////////////////////////
    primaryPaletteKeyColor() {
        return MaterialDynamicColors.colorSpec.primaryPaletteKeyColor();
    }
    secondaryPaletteKeyColor() {
        return MaterialDynamicColors.colorSpec.secondaryPaletteKeyColor();
    }
    tertiaryPaletteKeyColor() {
        return MaterialDynamicColors.colorSpec.tertiaryPaletteKeyColor();
    }
    neutralPaletteKeyColor() {
        return MaterialDynamicColors.colorSpec.neutralPaletteKeyColor();
    }
    neutralVariantPaletteKeyColor() {
        return MaterialDynamicColors.colorSpec.neutralVariantPaletteKeyColor();
    }
    errorPaletteKeyColor() {
        return MaterialDynamicColors.colorSpec.errorPaletteKeyColor();
    }
    ////////////////////////////////////////////////////////////////
    // Surfaces [S]                                               //
    ////////////////////////////////////////////////////////////////
    background() {
        return MaterialDynamicColors.colorSpec.background();
    }
    onBackground() {
        return MaterialDynamicColors.colorSpec.onBackground();
    }
    surface() {
        return MaterialDynamicColors.colorSpec.surface();
    }
    surfaceDim() {
        return MaterialDynamicColors.colorSpec.surfaceDim();
    }
    surfaceBright() {
        return MaterialDynamicColors.colorSpec.surfaceBright();
    }
    surfaceContainerLowest() {
        return MaterialDynamicColors.colorSpec.surfaceContainerLowest();
    }
    surfaceContainerLow() {
        return MaterialDynamicColors.colorSpec.surfaceContainerLow();
    }
    surfaceContainer() {
        return MaterialDynamicColors.colorSpec.surfaceContainer();
    }
    surfaceContainerHigh() {
        return MaterialDynamicColors.colorSpec.surfaceContainerHigh();
    }
    surfaceContainerHighest() {
        return MaterialDynamicColors.colorSpec.surfaceContainerHighest();
    }
    onSurface() {
        return MaterialDynamicColors.colorSpec.onSurface();
    }
    surfaceVariant() {
        return MaterialDynamicColors.colorSpec.surfaceVariant();
    }
    onSurfaceVariant() {
        return MaterialDynamicColors.colorSpec.onSurfaceVariant();
    }
    outline() {
        return MaterialDynamicColors.colorSpec.outline();
    }
    outlineVariant() {
        return MaterialDynamicColors.colorSpec.outlineVariant();
    }
    inverseSurface() {
        return MaterialDynamicColors.colorSpec.inverseSurface();
    }
    inverseOnSurface() {
        return MaterialDynamicColors.colorSpec.inverseOnSurface();
    }
    shadow() {
        return MaterialDynamicColors.colorSpec.shadow();
    }
    scrim() {
        return MaterialDynamicColors.colorSpec.scrim();
    }
    surfaceTint() {
        return MaterialDynamicColors.colorSpec.surfaceTint();
    }
    ////////////////////////////////////////////////////////////////
    // Primaries [P]                                              //
    ////////////////////////////////////////////////////////////////
    primary() {
        return MaterialDynamicColors.colorSpec.primary();
    }
    primaryDim() {
        return MaterialDynamicColors.colorSpec.primaryDim();
    }
    onPrimary() {
        return MaterialDynamicColors.colorSpec.onPrimary();
    }
    primaryContainer() {
        return MaterialDynamicColors.colorSpec.primaryContainer();
    }
    onPrimaryContainer() {
        return MaterialDynamicColors.colorSpec.onPrimaryContainer();
    }
    inversePrimary() {
        return MaterialDynamicColors.colorSpec.inversePrimary();
    }
    /////////////////////////////////////////////////////////////////
    // Primary Fixed [PF]                                          //
    /////////////////////////////////////////////////////////////////
    primaryFixed() {
        return MaterialDynamicColors.colorSpec.primaryFixed();
    }
    primaryFixedDim() {
        return MaterialDynamicColors.colorSpec.primaryFixedDim();
    }
    onPrimaryFixed() {
        return MaterialDynamicColors.colorSpec.onPrimaryFixed();
    }
    onPrimaryFixedVariant() {
        return MaterialDynamicColors.colorSpec.onPrimaryFixedVariant();
    }
    ////////////////////////////////////////////////////////////////
    // Secondaries [Q]                                            //
    ////////////////////////////////////////////////////////////////
    secondary() {
        return MaterialDynamicColors.colorSpec.secondary();
    }
    secondaryDim() {
        return MaterialDynamicColors.colorSpec.secondaryDim();
    }
    onSecondary() {
        return MaterialDynamicColors.colorSpec.onSecondary();
    }
    secondaryContainer() {
        return MaterialDynamicColors.colorSpec.secondaryContainer();
    }
    onSecondaryContainer() {
        return MaterialDynamicColors.colorSpec.onSecondaryContainer();
    }
    /////////////////////////////////////////////////////////////////
    // Secondary Fixed [QF]                                        //
    /////////////////////////////////////////////////////////////////
    secondaryFixed() {
        return MaterialDynamicColors.colorSpec.secondaryFixed();
    }
    secondaryFixedDim() {
        return MaterialDynamicColors.colorSpec.secondaryFixedDim();
    }
    onSecondaryFixed() {
        return MaterialDynamicColors.colorSpec.onSecondaryFixed();
    }
    onSecondaryFixedVariant() {
        return MaterialDynamicColors.colorSpec.onSecondaryFixedVariant();
    }
    ////////////////////////////////////////////////////////////////
    // Tertiaries [T]                                             //
    ////////////////////////////////////////////////////////////////
    tertiary() {
        return MaterialDynamicColors.colorSpec.tertiary();
    }
    tertiaryDim() {
        return MaterialDynamicColors.colorSpec.tertiaryDim();
    }
    onTertiary() {
        return MaterialDynamicColors.colorSpec.onTertiary();
    }
    tertiaryContainer() {
        return MaterialDynamicColors.colorSpec.tertiaryContainer();
    }
    onTertiaryContainer() {
        return MaterialDynamicColors.colorSpec.onTertiaryContainer();
    }
    /////////////////////////////////////////////////////////////////
    // Tertiary Fixed [TF]                                         //
    /////////////////////////////////////////////////////////////////
    tertiaryFixed() {
        return MaterialDynamicColors.colorSpec.tertiaryFixed();
    }
    tertiaryFixedDim() {
        return MaterialDynamicColors.colorSpec.tertiaryFixedDim();
    }
    onTertiaryFixed() {
        return MaterialDynamicColors.colorSpec.onTertiaryFixed();
    }
    onTertiaryFixedVariant() {
        return MaterialDynamicColors.colorSpec.onTertiaryFixedVariant();
    }
    ////////////////////////////////////////////////////////////////
    // Errors [E]                                                 //
    ////////////////////////////////////////////////////////////////
    error() {
        return MaterialDynamicColors.colorSpec.error();
    }
    errorDim() {
        return MaterialDynamicColors.colorSpec.errorDim();
    }
    onError() {
        return MaterialDynamicColors.colorSpec.onError();
    }
    errorContainer() {
        return MaterialDynamicColors.colorSpec.errorContainer();
    }
    onErrorContainer() {
        return MaterialDynamicColors.colorSpec.onErrorContainer();
    }
    // Static variables are deprecated. Use the instance methods to get correct
    // specs based on request.
    /** @deprecated Use highestSurface() instead. */
    static highestSurface(s) {
        return MaterialDynamicColors.colorSpec.highestSurface(s);
    }
}
MaterialDynamicColors.contentAccentToneDelta = 15.0;
MaterialDynamicColors.colorSpec = new ColorSpecDelegateImpl2025();
/** @deprecated Use primaryPaletteKeyColor() instead. */
MaterialDynamicColors.primaryPaletteKeyColor = MaterialDynamicColors.colorSpec.primaryPaletteKeyColor();
/** @deprecated Use secondaryPaletteKeyColor() instead. */
MaterialDynamicColors.secondaryPaletteKeyColor = MaterialDynamicColors.colorSpec.secondaryPaletteKeyColor();
/** @deprecated Use tertiaryPaletteKeyColor() instead. */
MaterialDynamicColors.tertiaryPaletteKeyColor = MaterialDynamicColors.colorSpec.tertiaryPaletteKeyColor();
/** @deprecated Use neutralPaletteKeyColor() instead. */
MaterialDynamicColors.neutralPaletteKeyColor = MaterialDynamicColors.colorSpec.neutralPaletteKeyColor();
/** @deprecated Use neutralVariantPaletteKeyColor() instead. */
MaterialDynamicColors.neutralVariantPaletteKeyColor = MaterialDynamicColors.colorSpec.neutralVariantPaletteKeyColor();
/** @deprecated Use background() instead. */
MaterialDynamicColors.background = MaterialDynamicColors.colorSpec.background();
/** @deprecated Use background() instead. */
MaterialDynamicColors.onBackground = MaterialDynamicColors.colorSpec.onBackground();
/** @deprecated Use surface() instead. */
MaterialDynamicColors.surface = MaterialDynamicColors.colorSpec.surface();
/** @deprecated Use surfaceDim() instead. */
MaterialDynamicColors.surfaceDim = MaterialDynamicColors.colorSpec.surfaceDim();
/** @deprecated Use surfaceBright() instead. */
MaterialDynamicColors.surfaceBright = MaterialDynamicColors.colorSpec.surfaceBright();
/** @deprecated Use surfaceContainerLowest() instead. */
MaterialDynamicColors.surfaceContainerLowest = MaterialDynamicColors.colorSpec.surfaceContainerLowest();
/** @deprecated Use surfaceContainerLow() instead. */
MaterialDynamicColors.surfaceContainerLow = MaterialDynamicColors.colorSpec.surfaceContainerLow();
/** @deprecated Use surfaceContainer() instead. */
MaterialDynamicColors.surfaceContainer = MaterialDynamicColors.colorSpec.surfaceContainer();
/** @deprecated Use surfaceContainerHigh() instead. */
MaterialDynamicColors.surfaceContainerHigh = MaterialDynamicColors.colorSpec.surfaceContainerHigh();
/** @deprecated Use surfaceContainerHighest() instead. */
MaterialDynamicColors.surfaceContainerHighest = MaterialDynamicColors.colorSpec.surfaceContainerHighest();
/** @deprecated Use onSurface() instead. */
MaterialDynamicColors.onSurface = MaterialDynamicColors.colorSpec.onSurface();
/** @deprecated Use surfaceVariant() instead. */
MaterialDynamicColors.surfaceVariant = MaterialDynamicColors.colorSpec.surfaceVariant();
/** @deprecated Use onSurfaceVariant() instead. */
MaterialDynamicColors.onSurfaceVariant = MaterialDynamicColors.colorSpec.onSurfaceVariant();
/** @deprecated Use inverseSurface() instead. */
MaterialDynamicColors.inverseSurface = MaterialDynamicColors.colorSpec.inverseSurface();
/** @deprecated Use inverseOnSurface() instead. */
MaterialDynamicColors.inverseOnSurface = MaterialDynamicColors.colorSpec.inverseOnSurface();
/** @deprecated Use outline() instead. */
MaterialDynamicColors.outline = MaterialDynamicColors.colorSpec.outline();
/** @deprecated Use outlineVariant() instead. */
MaterialDynamicColors.outlineVariant = MaterialDynamicColors.colorSpec.outlineVariant();
/** @deprecated Use shadow() instead. */
MaterialDynamicColors.shadow = MaterialDynamicColors.colorSpec.shadow();
/** @deprecated Use scrim() instead. */
MaterialDynamicColors.scrim = MaterialDynamicColors.colorSpec.scrim();
/** @deprecated Use surfaceTint() instead. */
MaterialDynamicColors.surfaceTint = MaterialDynamicColors.colorSpec.surfaceTint();
/** @deprecated Use primary() instead. */
MaterialDynamicColors.primary = MaterialDynamicColors.colorSpec.primary();
/** @deprecated Use onPrimary() instead. */
MaterialDynamicColors.onPrimary = MaterialDynamicColors.colorSpec.onPrimary();
/** @deprecated Use primaryContainer() instead. */
MaterialDynamicColors.primaryContainer = MaterialDynamicColors.colorSpec.primaryContainer();
/** @deprecated Use onPrimaryContainer() instead. */
MaterialDynamicColors.onPrimaryContainer = MaterialDynamicColors.colorSpec.onPrimaryContainer();
/** @deprecated Use inversePrimary() instead. */
MaterialDynamicColors.inversePrimary = MaterialDynamicColors.colorSpec.inversePrimary();
/** @deprecated Use secondary() instead. */
MaterialDynamicColors.secondary = MaterialDynamicColors.colorSpec.secondary();
/** @deprecated Use onSecondary() instead. */
MaterialDynamicColors.onSecondary = MaterialDynamicColors.colorSpec.onSecondary();
/** @deprecated Use secondaryContainer() instead. */
MaterialDynamicColors.secondaryContainer = MaterialDynamicColors.colorSpec.secondaryContainer();
/** @deprecated Use onSecondaryContainer() instead. */
MaterialDynamicColors.onSecondaryContainer = MaterialDynamicColors.colorSpec.onSecondaryContainer();
/** @deprecated Use tertiary() instead. */
MaterialDynamicColors.tertiary = MaterialDynamicColors.colorSpec.tertiary();
/** @deprecated Use onTertiary() instead. */
MaterialDynamicColors.onTertiary = MaterialDynamicColors.colorSpec.onTertiary();
/** @deprecated Use tertiaryContainer() instead. */
MaterialDynamicColors.tertiaryContainer = MaterialDynamicColors.colorSpec.tertiaryContainer();
/** @deprecated Use onTertiaryContainer() instead. */
MaterialDynamicColors.onTertiaryContainer = MaterialDynamicColors.colorSpec.onTertiaryContainer();
/** @deprecated Use error() instead. */
MaterialDynamicColors.error = MaterialDynamicColors.colorSpec.error();
/** @deprecated Use onError() instead. */
MaterialDynamicColors.onError = MaterialDynamicColors.colorSpec.onError();
/** @deprecated Use errorContainer() instead. */
MaterialDynamicColors.errorContainer = MaterialDynamicColors.colorSpec.errorContainer();
/** @deprecated Use onErrorContainer() instead. */
MaterialDynamicColors.onErrorContainer = MaterialDynamicColors.colorSpec.onErrorContainer();
/** @deprecated Use primaryFixed() instead. */
MaterialDynamicColors.primaryFixed = MaterialDynamicColors.colorSpec.primaryFixed();
/** @deprecated Use primaryFixedDim() instead. */
MaterialDynamicColors.primaryFixedDim = MaterialDynamicColors.colorSpec.primaryFixedDim();
/** @deprecated Use onPrimaryFixed() instead. */
MaterialDynamicColors.onPrimaryFixed = MaterialDynamicColors.colorSpec.onPrimaryFixed();
/** @deprecated Use onPrimaryFixedVariant() instead. */
MaterialDynamicColors.onPrimaryFixedVariant = MaterialDynamicColors.colorSpec.onPrimaryFixedVariant();
/** @deprecated Use secondaryFixed() instead. */
MaterialDynamicColors.secondaryFixed = MaterialDynamicColors.colorSpec.secondaryFixed();
/** @deprecated Use secondaryFixedDim() instead. */
MaterialDynamicColors.secondaryFixedDim = MaterialDynamicColors.colorSpec.secondaryFixedDim();
/** @deprecated Use onSecondaryFixed() instead. */
MaterialDynamicColors.onSecondaryFixed = MaterialDynamicColors.colorSpec.onSecondaryFixed();
/** @deprecated Use onSecondaryFixedVariant() instead. */
MaterialDynamicColors.onSecondaryFixedVariant = MaterialDynamicColors.colorSpec.onSecondaryFixedVariant();
/** @deprecated Use tertiaryFixed() instead. */
MaterialDynamicColors.tertiaryFixed = MaterialDynamicColors.colorSpec.tertiaryFixed();
/** @deprecated Use tertiaryFixedDim() instead. */
MaterialDynamicColors.tertiaryFixedDim = MaterialDynamicColors.colorSpec.tertiaryFixedDim();
/** @deprecated Use onTertiaryFixed() instead. */
MaterialDynamicColors.onTertiaryFixed = MaterialDynamicColors.colorSpec.onTertiaryFixed();
/** @deprecated Use onTertiaryFixedVariant() instead. */
MaterialDynamicColors.onTertiaryFixedVariant = MaterialDynamicColors.colorSpec.onTertiaryFixedVariant();
