/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const path = require('path');
const { transformSync } = require('@babel/core');
const phenome = require('phenome');
const getOutput = require('./get-output');
const fs = require('./utils/fs-extra');

function transformRestSpread(buildPath) {
  const reactFiles = fs.readdirSync(`${buildPath}/react/components`).filter(f => f[0] !== '.' && f.indexOf('.d.ts') < 0);
  const vueFiles = fs.readdirSync(`${buildPath}/vue/components`).filter(f => f[0] !== '.' && f.indexOf('.d.ts') < 0);

  function transformFile(filePath) {
    const fileContent = fs.readFileSync(filePath);
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
  const buildPath = path.relative(process.cwd(), getOutput());
  phenome({
    paths: ['./src/phenome/**/*.js', './src/phenome/**/*.jsx'],
    react: {
      out: `${buildPath}/react/`,
      typeScriptDefinitions: true,
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
    if (cb) cb();
  });
}

module.exports = build;
