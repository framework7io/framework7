const pkg = require('../../packages/react/package.json');

const version = process.env.VERSION || pkg.version;

const date = {
  day: new Date().getDate(),
  month: ('January February March April May June July August September October November December').split(' ')[new Date().getMonth()],
  year: new Date().getFullYear(),
};

module.exports = `${`
/**
 * Framework7 React ${version}
 * ${pkg.description}
 * ${pkg.homepage}
 *
 * Copyright 2014-${date.year} ${pkg.author}
 *
 * Released under the ${pkg.license} License
 *
 * Released on: ${date.month} ${date.day}, ${date.year}
 */
`.trim()}\n`;
