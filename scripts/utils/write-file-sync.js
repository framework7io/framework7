const fs = require('fs');
const path = require('path');

module.exports = (to, data, options) => {
  if (!fs.existsSync(path.dirname(to))) {
    fs.mkdirSync(path.dirname(to), { recursive: true });
  }
  return fs.writeFileSync(to, data, options);
};
