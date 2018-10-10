const fs = require('fs');

function base64Encode(file) {
  // read binary data
  const bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return Buffer.from(bitmap).toString('base64');
}

module.exports = {
  install(less, pluginManager, functions) {
    functions.add('framework7_encodeURIComponent', svg => encodeURIComponent(svg.value));
    functions.add('framework7_floor', n => new less.tree.Dimension(Math.floor(n.value)));
    functions.add('framework7_calculateN', n => new less.tree.Dimension(100 / parseFloat(n.value)));
    functions.add('framework7_minusOne', n => new less.tree.Dimension(n.value - 1));
    functions.add('framework7_iconFont', (n) => {
      const iconsFontBase64 = base64Encode('./src/core/icons/font/Framework7CoreIcons.woff');
      return iconsFontBase64;
    });
  },
};
