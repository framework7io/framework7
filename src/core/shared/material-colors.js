// eslint-disable-next-line
import {
  argbFromHex,
  hexFromArgb,
  Hct,
  SchemeTonalSpot,
  SchemeVibrant,
  SchemeMonochrome,
} from './material-color-utils.js';

/* eslint-disable */
// prettier-ignore
function toRGBA(d) {
  const r = Math.round;
  const l = d.length;
	const rgba = {};
	if (d.slice(0, 3).toLowerCase() === 'rgb') {
		d = d.replace(' ', '').split(',');
		rgba[0] = parseInt(d[0].slice(d[3].toLowerCase() === 'a' ? 5 : 4), 10);
		rgba[1] = parseInt(d[1], 10);
		rgba[2] = parseInt(d[2], 10);
		rgba[3] = d[3] ? parseFloat(d[3]) : -1;
	} else {
		if (l < 6) d = parseInt(String(d[1]) + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? String(d[4]) + d[4] : ''), 16);
		else d = parseInt(d.slice(1), 16);
		rgba[0] = (d >> 16) & 255;
		rgba[1] = (d >> 8) & 255;
		rgba[2] = d & 255;
		rgba[3] = l === 9 || l === 5 ? r((((d >> 24) & 255) / 255) * 10000) / 10000 : -1;
	}
	return rgba;
}

// prettier-ignore
function blend(from, to, p = 0.5) {
  const r = Math.round;
  from = from.trim();
	to = to.trim();
	const b = p < 0;
	p = b ? p * -1 : p;
	const f = toRGBA(from);
	const t = toRGBA(to);
	if (to[0] === 'r') {
		return 'rgb' + (to[3] === 'a' ? 'a(' : '(') +
			r(((t[0] - f[0]) * p) + f[0]) + ',' +
			r(((t[1] - f[1]) * p) + f[1]) + ',' +
			r(((t[2] - f[2]) * p) + f[2]) + (
				f[3] < 0 && t[3] < 0 ? '' : ',' + (
					f[3] > -1 && t[3] > -1
						? r((((t[3] - f[3]) * p) + f[3]) * 10000) / 10000
						: t[3] < 0 ? f[3] : t[3]
				)
			) + ')';
	}

	return '#' + (0x100000000 + ((
		f[3] > -1 && t[3] > -1
			? r((((t[3] - f[3]) * p) + f[3]) * 255)
			: t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255
		) * 0x1000000) +
		(r(((t[0] - f[0]) * p) + f[0]) * 0x10000) +
		(r(((t[1] - f[1]) * p) + f[1]) * 0x100) +
		r(((t[2] - f[2]) * p) + f[2])
	).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
}
/* eslint-enable */

let monochromeCached = null;
const cachedColors = {};

export const materialColors = (hexColor = '', colorScheme = 'default') => {
  const cacheKey = `${hexColor}-${colorScheme}`;
  if (cachedColors[cacheKey]) {
    return cachedColors[cacheKey];
  }
  if (monochromeCached && colorScheme.includes('monochrome')) {
    const defaultColors = materialColors(
      hexColor,
      colorScheme === 'monochrome' ? 'default' : 'vibrant',
    );
    cachedColors[cacheKey] = {
      light: {
        ...defaultColors.light,
        ...monochromeCached.light,
      },
      dark: {
        ...defaultColors.dark,
        ...monochromeCached.dark,
      },
    };
    return cachedColors[cacheKey];
  }
  const sourceColor = argbFromHex(`#${hexColor.replace('#', '')}`);
  let lightScheme;
  let darkScheme;
  const hctColor = Hct.fromInt(sourceColor);

  if (colorScheme === 'default') {
    lightScheme = new SchemeTonalSpot(hctColor, false, 0, '2025');
    darkScheme = new SchemeTonalSpot(hctColor, true, 0, '2025');
  }
  if (colorScheme === 'vibrant') {
    lightScheme = new SchemeVibrant(hctColor, false, 0, '2025');
    darkScheme = new SchemeVibrant(hctColor, true, 0, '2025');
  }
  if (colorScheme.includes('monochrome')) {
    lightScheme = new SchemeMonochrome(hctColor, false, 0, '2025');
    darkScheme = new SchemeMonochrome(hctColor, true, 0, '2025');
  }

  const getColorName = (name) => {
    let newName = name;
    if (name === 'surface_dim') newName = 'surface_variant';
    if (name === 'surface_container_low') newName = 'surface_1';
    if (name === 'surface_container') newName = 'surface_2';
    if (name === 'surface_container_high') newName = 'surface_3';
    if (name === 'surface_container_highest') newName = 'surface_4';
    return newName;
  };
  const theme = { light: {}, dark: {} };
  lightScheme.colors.allColors.forEach((color) => {
    const name = getColorName(color.name);
    const argb = color.getArgb(lightScheme);
    theme.light[name] = argb;
  });
  darkScheme.colors.allColors.forEach((color) => {
    const name = getColorName(color.name);
    const argb = color.getArgb(darkScheme);
    theme.dark[name] = argb;
  });
  theme.light.surface_5 = argbFromHex(
    blend(hexFromArgb(theme.light.surface_4), hexFromArgb(theme.light.primary), 0.05),
  );
  theme.dark.surface_5 = argbFromHex(
    blend(hexFromArgb(theme.dark.surface_4), hexFromArgb(theme.dark.primary), 0.05),
  );

  const name = (n) => {
    return n.replace(/_/g, '-');
  };

  const shouldKeep = (prop) => {
    const foreground = [
      'inverse_primary',
      'primary',
      'on_primary',
      'primary_container',
      'on_primary_container',
      'secondary',
      'on_secondary',
      'secondary_container',
      'on_secondary_container',
      'outline',
      'outline_variant',
    ];
    const background = [
      'on_surface',
      'on_surface_variant',
      'inverse_on_surface',
      'inverse_surface',
      'surface',
      'surface_variant',
      'surface_1',
      'surface_2',
      'surface_3',
      'surface_4',
      'surface_5',
    ];
    const keep =
      colorScheme === 'default'
        ? [...foreground, ...background]
        : colorScheme === 'vibrant'
        ? [...foreground, ...background]
        : background;
    return keep.includes(prop);
  };

  const light = {};
  const dark = {};

  Object.keys(theme.light).forEach((prop) => {
    if (!shouldKeep(prop)) return;
    light[name(`--f7-md-${prop}`)] = hexFromArgb(theme.light[prop]);
  });
  Object.keys(theme.dark).forEach((prop) => {
    if (!shouldKeep(prop)) return;
    dark[name(`--f7-md-${prop}`)] = hexFromArgb(theme.dark[prop]);
  });

  if (colorScheme.includes('monochrome')) {
    monochromeCached = {
      light,
      dark,
    };
    const defaultColors = materialColors(
      hexColor,
      colorScheme === 'monochrome' ? 'default' : 'vibrant',
    );
    cachedColors[cacheKey] = {
      light: {
        ...defaultColors.light,
        ...light,
      },
      dark: {
        ...defaultColors.dark,
        ...dark,
      },
    };
    return cachedColors[cacheKey];
  }

  cachedColors[cacheKey] = { light, dark };

  return cachedColors[cacheKey];
};
