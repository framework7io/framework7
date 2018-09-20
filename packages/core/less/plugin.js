module.exports = {
  install(less, pluginManager, functions) {
    functions.add('framework7_encodeURIComponent', svg => encodeURIComponent(svg.value));
    functions.add('framework7_floor', n => new less.tree.Dimension(Math.floor(n.value)));
    functions.add('framework7_calculateN', n => new less.tree.Dimension(100 / parseFloat(n.value)));
  },
};
