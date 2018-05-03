/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint import/no-unresolved: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

// const phenome = require('phenome');
const fs = require('fs');
const phenome = require('../../phenome/lib/compiler-io/index.js');

// Build Vue
function buildVueIndex() {
  const files = fs.readdirSync('./vue/components');
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.js', '')
      .split('-')
      .map((word, index) => {
        const capitalized = word[0].toUpperCase() + word.substr(1);
        return index === 0 ? `f7${capitalized}` : capitalized;
      })
      .join('');
    componentImports.push(`import ${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentExports.push(`  ${componentName}`);
  });
  componentImports.push("import Framework7Vue from './utils/plugin';");

  const componentsContent = `
${componentImports.join('\n')}

export {\n${componentExports.join(',\n')}\n};

export default Framework7Vue;
`.trim();

  fs.writeFileSync('./vue/framework7-vue.esm.js', componentsContent);
}

// Build React
function buildReactIndex() {
  const files = fs.readdirSync('./react/components');
  const componentImports = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.js', '')
      .split('-')
      .map((word, index) => {
        const capitalized = word[0].toUpperCase() + word.substr(1);
        return index === 0 ? `F7${capitalized}` : capitalized;
      })
      .join('');
    componentImports.push(`import ${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentExports.push(`  ${componentName}`);
  });
  componentImports.push("import Framework7React from './utils/plugin';");

  const componentsContent = `
${componentImports.join('\n')}

export {\n${componentExports.join(',\n')}\n};

export default Framework7React;
`.trim();

  fs.writeFileSync('./react/framework7-react.esm.js', componentsContent);
}

// Phenome
function build(cb) {
  phenome({
    paths: ['./src/phenome/**/*.js', './src/phenome/**/*.jsx'],
    react: {
      out: './react/',
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
      out: './vue/',
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
    buildVueIndex();
    buildReactIndex();

    if (cb) cb();
  }).catch((err) => {
    console.log(err.toString());
  });
}

module.exports = build;
