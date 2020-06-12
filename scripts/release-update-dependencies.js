const fs = require('fs');

const dest = require('../packages/core/package.json');
const src = require('../package.json');

dest.dependencies = src.dependencies;

fs.writeFileSync('./packages/core/package.json', JSON.stringify(dest, null, 2));
