/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */

const fs = require('fs');
const phenome = require('phenome');
const bannerVue = require('./banner-vue');
const bannerReact = require('./banner-react');

// Build Vue
function buildVueIndex() {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './dist';
  const files = fs.readdirSync(`${buildPath}/vue/components`);
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
${bannerVue.trim()}

${componentImports.join('\n')}

export {\n${componentExports.join(',\n')}\n};

export default Framework7Vue;
`.trim();

  fs.writeFileSync(`${buildPath}/vue/framework7-vue.esm.js`, componentsContent);
}

// Build React
function buildReactIndex() {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './dist';
  const files = fs.readdirSync(`${buildPath}/react/components`);
  const componentImports = [];
  const componentAliases = [];
  const componentExports = [];

  files.forEach((fileName) => {
    const componentName = fileName
      .replace('.js', '')
      .split('-')
      .map(word => word[0].toUpperCase() + word.substr(1))
      .join('');
    componentImports.push(`import F7${componentName} from './components/${fileName.replace('.js', '')}';`);
    componentAliases.push(`const ${componentName} = F7${componentName};`);
    componentExports.push(`  F7${componentName}`, `  ${componentName}`);
  });
  componentImports.push("import Framework7React from './utils/plugin';");

  const componentsContent = `
${bannerReact.trim()}

${componentImports.join('\n')}

${componentAliases.join('\n')}

export {\n${componentExports.join(',\n')}\n};

export default Framework7React;
`.trim();

  fs.writeFileSync(`${buildPath}/react/framework7-react.esm.js`, componentsContent);
}

// Phenome
function build(cb) {
  const env = process.env.NODE_ENV || 'development';
  const buildPath = env === 'development' ? './build' : './dist';
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
    buildVueIndex();
    buildReactIndex();

    if (cb) cb();
  }).catch((err) => {
    console.log(err.toString());
  });
}

module.exports = build;
