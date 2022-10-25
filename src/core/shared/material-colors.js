// eslint-disable-next-line
import { argbFromHex, hexFromArgb, themeFromSourceColor } from './material-color-utils.js';

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

export const materialColors = (hexColor = '') => {
  const theme = themeFromSourceColor(argbFromHex(`#${hexColor.replace('#', '')}`));
  [0.05, 0.08, 0.11, 0.12, 0.14].forEach((amount, index) => {
    theme.schemes.light.props[`surface${index + 1}`] = argbFromHex(
      blend(
        hexFromArgb(theme.schemes.light.props.surface),
        hexFromArgb(theme.schemes.light.props.primary),
        amount,
      ),
    );
    theme.schemes.dark.props[`surface${index + 1}`] = argbFromHex(
      blend(
        hexFromArgb(theme.schemes.dark.props.surface),
        hexFromArgb(theme.schemes.dark.props.primary),
        amount,
      ),
    );
  });

  const name = (n) => {
    return n
      .split('')
      .map((char) =>
        char.toUpperCase() === char && char !== '-' && char !== '7'
          ? `-${char.toLowerCase()}`
          : char,
      )
      .join('');
  };

  const shouldSkip = (prop) => {
    const skip = ['tertiary', 'shadow', 'scrim', 'error', 'background'];
    return skip.filter((v) => prop.toLowerCase().includes(v)).length > 0;
  };

  const light = {};
  const dark = {};
  Object.keys(theme.schemes.light.props).forEach((prop) => {
    if (shouldSkip(prop)) return;
    light[name(`--f7-md-${prop}`)] = hexFromArgb(theme.schemes.light.props[prop]);
  });
  Object.keys(theme.schemes.dark.props).forEach((prop) => {
    if (shouldSkip(prop)) return;
    dark[name(`--f7-md-${prop}`)] = hexFromArgb(theme.schemes.dark.props[prop]);
  });

  return { light, dark };
};
