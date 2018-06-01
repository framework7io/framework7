/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const phenome = require('phenome');

// Phenome
function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './packages';
  phenome({
    paths: ['./src/phenome/**/*.js', './src/phenome/**/*.jsx'],
    react: {
      out: `${buildPath}/react/`,
      helpers: {
        el: 'auto',
        slots: 'auto',
        props: 'auto',
        children: 'auto',
        parent: 'auto',
        dispatchEvent: 'auto',
        watch: 'auto',
        forceUpdate: 'auto',
      },
    },
    vue: {
      out: `${buildPath}/vue/`,
      helpers: {
        el: 'auto',
        slots: 'auto',
        props: 'auto',
        children: 'auto',
        parent: 'auto',
        refs: 'auto',
        dispatchEvent: 'auto',
        state: 'auto',
        setState: 'auto',
        forceUpdate: 'auto',
      },
    },
  }).then(() => {
    if (cb) cb();
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = build;
