/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const phenome = require('phenome');
const fs = require('fs');
const { transformSync } = require('@babel/core');

function transformRestSpread(buildPath) {
  const reactFiles = fs.readdirSync(`${buildPath}/react/components`).filter(f => f[0] !== '.');
  const vueFiles = fs.readdirSync(`${buildPath}/vue/components`).filter(f => f[0] !== '.');

  function transformFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { code } = transformSync(fileContent, {
      plugins: [
        ['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
      ],
    });
    fs.writeFileSync(filePath, code);
  }
  reactFiles.forEach((fileName) => {
    transformFile(`${buildPath}/react/components/${fileName}`);
  });
  vueFiles.forEach((fileName) => {
    transformFile(`${buildPath}/vue/components/${fileName}`);
  });
}

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
    transformRestSpread(buildPath);
    if (cb) cb();
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = build;
