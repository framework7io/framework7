/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: "off" */
/* eslint global-require: "off" */
/* eslint no-param-reassign: ["error", { "props": false }] */
const exec = require('exec-sh');
const path = require('path');
const { rollup } = require('rollup');
const replace = require('@rollup/plugin-replace');
const { default: babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const { minify } = require('terser');
const commonjs = require('@rollup/plugin-commonjs');
const getConfig = require('./get-core-config.js');
const banner = require('./banners/core.js');
const getOutput = require('./get-output.js');
const fs = require('./utils/fs-extra');

let cache;
async function modular({ components, format }) {
  const outputDir = path.resolve(`${getOutput()}`, 'core');
  await exec.promise(
    `MODULES=${format} npx babel src/core --out-dir ${outputDir}/${format} --ignore "src/core/icons/**/*.*","src/core/less/*.js","src/core/*.js"`,
  );
  const removeUMD = (content) => {
    return `${content.split('// UMD_ONLY_START')[0]}${content.split('// UMD_ONLY_END')[1] || ''}`;
  };
  const coreSrc = fs.readFileSync(path.resolve(__dirname, '../src/core/framework7.js'), 'utf-8');
  const liteSrc = fs.readFileSync(
    path.resolve(__dirname, '../src/core/framework7-lite.js'),
    'utf-8',
  );

  const coreComponents = (content, isLite) => {
    return removeUMD(content)
      .replace('//IMPORT_COMPONENTS\n', '')
      .replace('//INSTALL_COMPONENTS\n', '')
      .replace(
        '//IMPORT_HELPERS',
        "import request from './shared/request';\nimport * as utils from './shared/utils';\nimport { getSupport } from './shared/get-support';\nimport { getDevice } from './shared/get-device';",
      )
      .replace(
        '//NAMED_EXPORT',
        `export { ${
          isLite ? '' : 'Component, $jsx,'
        } $ as Dom7, request, utils, getDevice, getSupport, createStore };`,
      );
  };
  const bundleComponents = (content, isLite) => {
    const comps = [...components];
    if (isLite) {
      const exclude = ['gauge', 'area-chart', 'pie-chart'];
      for (let i = comps.length - 1; i >= 0; i -= 1) {
        if (exclude.includes(comps[i].name)) {
          comps.splice(i, 1);
        }
      }
    }
    return removeUMD(content)
      .replace(
        '//IMPORT_COMPONENTS',
        comps
          .map(
            (component) =>
              `import ${component.capitalized} from './components/${component.name}/${component.name}';`,
          )
          .join('\n'),
      )
      .replace(
        '//INSTALL_COMPONENTS',
        comps.map((component) => component.capitalized).join(',\n  '),
      )
      .replace(
        '//IMPORT_HELPERS',
        "import request from './shared/request';\nimport * as utils from './shared/utils';\nimport { getSupport } from './shared/get-support';\nimport { getDevice } from './shared/get-device';",
      )
      .replace(
        '//NAMED_EXPORT',
        `export { ${
          isLite ? '' : 'Component, $jsx,'
        } $ as Dom7, request, utils, getDevice, getSupport, createStore };`,
      );
  };

  const coreContent = coreComponents(coreSrc);
  const bundleContent = bundleComponents(coreSrc);
  const liteContent = coreComponents(liteSrc, true);
  const liteBundleContent = bundleComponents(liteSrc, true);

  // Save core
  fs.writeFileSync(`${outputDir}/${format}/framework7.js`, coreContent);
  // Save bundle
  fs.writeFileSync(`${outputDir}/${format}/framework7-bundle.js`, bundleContent);

  // Save lite
  fs.writeFileSync(`${outputDir}/${format}/framework7-lite.js`, liteContent);
  // Save lite bundle
  fs.writeFileSync(`${outputDir}/${format}/framework7-lite-bundle.js`, liteBundleContent);

  const files = [
    'framework7.js',
    'framework7-bundle.js',
    'framework7-lite.js',
    'framework7-lite-bundle.js',
  ];

  // eslint-disable-next-line
  for (let fileName of files) {
    // eslint-disable-next-line
    await exec.promise(
      `MODULES=${format} npx babel ${outputDir}/${format}/${fileName} --out-file ${outputDir}/${format}/${fileName}`,
    );
  }

  // update swipers
  const swiperContent = fs.readFileSync(
    `${outputDir}/${format}/components/swiper/swiper.js`,
    'utf-8',
  );
  fs.writeFileSync(`${outputDir}/${format}/components/swiper/swiper.js`, removeUMD(swiperContent));

  // add banners
  files.forEach((fileName) => {
    const fileContentt = fs.readFileSync(`${outputDir}/${format}/${fileName}`, 'utf-8');
    fs.writeFileSync(`${outputDir}/${format}/${fileName}`, `${banner}\n${fileContentt}`);
  });
}

async function umdBundle({ components } = {}) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = path.resolve(`${getOutput()}`, 'core');

  return rollup({
    input: './src/core/framework7.js',
    cache,
    treeshake: false,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': components
          .map(
            (component) =>
              `import ${component.capitalized} from './components/${component.name}/${component.name}';`,
          )
          .join('\n'),
        '//INSTALL_COMPONENTS': components.map((component) => component.capitalized).join(',\n  '),
        '//IMPORT_HELPERS': '',
        '//NAMED_EXPORT': '',
        'export { $ as Dom7, request, utils, getDevice, getSupport, createStore, $jsx };': '',
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'] }),
      babel({ babelHelpers: 'bundled' }),
      commonjs(),
    ],
    onwarn(warning, warn) {
      const ignore = ['EVAL'];
      if (warning.code && ignore.indexOf(warning.code) >= 0) {
        return;
      }
      warn(warning);
    },
  })
    .then((bundle) => {
      cache = bundle;
      return bundle.write({
        strict: true,
        file: `${output}/framework7-bundle.js`,
        format: 'umd',
        name: 'Framework7',
        sourcemap: env === 'production',
        sourcemapFile: `${output}/framework7-bundle.js.map`,
        banner,
      });
    })
    .then(async (bundle) => {
      if (env === 'development') {
        return;
      }
      const result = bundle.output[0];
      const minified = await minify(result.code, {
        sourceMap: {
          content: env === 'production' ? result.map : undefined,
          filename: env === 'production' ? 'framework7-bundle.min.js' : undefined,
          url: `framework7-bundle.min.js.map`,
        },
        output: {
          preamble: banner,
        },
      });

      fs.writeFileSync(`${output}/framework7-bundle.min.js`, minified.code);
      fs.writeFileSync(`${output}/framework7-bundle.min.js.map`, minified.map);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function umdCore() {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';
  const format = process.env.FORMAT || config.format || 'umd';
  const output = path.resolve(`${getOutput()}`, 'core');

  return rollup({
    input: './src/core/framework7.js',
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env), // or 'production'
        'process.env.FORMAT': JSON.stringify(format),
        '//IMPORT_COMPONENTS': '',
        '//INSTALL_COMPONENTS': '',
        '//IMPORT_HELPERS': '',
        '//NAMED_EXPORT': '',
        'export { $ as Dom7, request, utils, getDevice, getSupport, createStore, $jsx };': '',
      }),
      nodeResolve({ mainFields: ['module', 'main', 'jsnext'] }),
      babel({ babelHelpers: 'bundled' }),
      commonjs(),
    ],
    onwarn(warning, warn) {
      const ignore = ['EVAL'];
      if (warning.code && ignore.indexOf(warning.code) >= 0) {
        return;
      }
      warn(warning);
    },
  })
    .then((bundle) => {
      // eslint-disable-line
      return bundle.write({
        strict: true,
        file: `${output}/framework7.js`,
        format: 'umd',
        name: 'Framework7',
        sourcemap: env === 'production',
        sourcemapFile: `${output}/framework7.js.map`,
        banner,
      });
    })
    .then(async (bundle) => {
      if (env === 'development') {
        return;
      }
      const result = bundle.output[0];
      const minified = await minify(result.code, {
        sourceMap: {
          content: env === 'production' ? result.map : undefined,
          filename: env === 'production' ? 'framework7.min.js' : undefined,
          url: `framework7.min.js.map`,
        },
        output: {
          preamble: banner,
        },
      });

      fs.writeFileSync(`${output}/framework7.min.js`, minified.code);
      fs.writeFileSync(`${output}/framework7.min.js.map`, minified.map);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function buildJs(cb) {
  const config = getConfig();
  const env = process.env.NODE_ENV || 'development';

  const components = [];
  config.components.forEach((name) => {
    // eslint-disable-next-line
    const capitalized = name
      .split('-')
      .map((word) => {
        return word
          .split('')
          .map((char, index) => {
            if (index === 0) return char.toUpperCase();
            return char;
          })
          .join('');
      })
      .join('');
    const jsFilePath = `./src/core/components/${name}/${name}.js`;
    if (fs.existsSync(jsFilePath)) {
      components.push({ name, capitalized });
    }
  });

  if (!process.env.CORE_BUILD_ONLY_UMD) {
    await modular({ components, format: 'cjs' });
    await modular({ components, format: 'esm' });
  }

  if (!process.env.CORE_BUILD_ONLY_MODULES) {
    if (env !== 'development') await umdCore();
    await umdBundle({ components });
  }

  cb();
}

module.exports = buildJs;
