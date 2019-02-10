/* eslint-disable */
const path = require('path');
const postcss = require('postcss');
const postcssCssVariables = require('postcss-css-variables');
const CleanCSS = require('clean-css');
const fs = require('./utils/fs-extra');
const config = require('./build-config');


const plugin = postcss.plugin('pluginname', () => (ast) => {
  ast.walkComments((comment) => {
    if (comment.text.trim().indexOf('--f7-') >= 0) {
      comment.replaceWith(comment.text.trim());
    }
  });
  ast.walkRules((rule) => {
    if (rule.selector && rule.selector.indexOf('theme-dark') >= 0) {
      rule.remove();
      return;
    }
    if (rule.selector !== ':root' && rule.selector.indexOf('.ios') < 0 && rule.selector.indexOf('.md') < 0) {
      let needsWrap;
      rule.walkDecls((decl, index) => {
        if (decl.prop.indexOf('--') < 0 && decl.value.indexOf('--f7') >= 0) {
          needsWrap = true;
        }
      });
      if (!needsWrap) return;
      let newSelector = [];
      rule.selector.split(',').forEach((r) => {
        if (r.indexOf('html') < 0 && r.indexOf('.device-') < 0) {
          newSelector.push(
            r.trim(),
            `.ios ${r.trim()}`,
            `.md ${r.trim()}`
          )
        } else if (r.indexOf('.device-') >= 0){
          newSelector.push(
            r.trim(),
            `${r.trim().replace(/.device-/, '.ios.device-')}`,
            `${r.trim().replace(/.device-/, '.md.device-')}`,
          )
        } else {
          newSelector.push(
            r.trim(),
            `${r.trim().replace(/html/, 'html.ios')}`,
            `${r.trim().replace(/html/, 'html.md')}`,
          )
        }
      });
      rule.selector = newSelector.join(',');
    }
  });
});

const removeUndefined = postcss.plugin('removeUndefined', () => (ast) => {
  ast.walkDecls((decl) => {
    if (decl.value && decl.value.indexOf('undefined') >= 0) {
      decl.remove();
    }
  });
  ast.walkAtRules((atRule) => {
    atRule.walkDecls((decl) => {
      if (decl.value && decl.value.indexOf('undefined') >= 0) {
        decl.remove();
      }
    })
  })
});
/*
const plugin2 = postcss.plugin('plugin2name', () => (ast) => {
  ast.walkComments((comment) => {
    if (comment.text.trim().indexOf('--f7-') >= 0) {
      comment.replaceWith(comment.text.trim());
    }
  });
  ast.walkRules((rule) => {
    if (rule.selector.indexOf('.ios') === 0) {
      let firstIsVar = false;
      rule.walkDecls((decl, index) => {
        if (index === 0 && decl.prop.indexOf('--f7-') === 0) firstIsVar = true;
      });
      if (firstIsVar) {
        rule.selector = rule.selector.replace(/.ios/g, ':root');
      }
    }
  });
});
*/

function build() {
  let css = fs.readFileSync(path.resolve(__dirname, '../build/core/css/framework7.bundle.css'));
  css = `:root{
    --f7-navbar-large-collapse-progress: 0;
    --f7-searchbar-expandable-size: 44px;
  }
  ${css}

  ${Object.keys(config.colors).map((colorName) => {
    const colorValue = config.colors[colorName];

    return `
    .text-color-${colorName} {
      color: ${colorValue} !important;
    }
    .bg-color-${colorName} {
      background-color: ${colorValue} !important;
    }
    .border-color-${colorName} {
      border-color: ${colorValue} !important;
    }
    `;
  }).join('\n')}
  `;

  postcss([
    plugin(),
    postcssCssVariables({ preserve: false }),
    removeUndefined(),
  ])
    .process(css, { from: './build/core/css/framework7.bundle.css', to: './build/core/css/framework7.bundle.legacy.css' })
    .then((result) => {
      // const options = {
      //   // format: 'beautify',
      //   compatibility: '*,-properties.zeroUnits',
      //   level: {
      //     2: {
      //       all: true,
      //     },
      //   },
      // };
      // const minified = new CleanCSS(options).minify(result.css);
      // fs.writeFileSync(path.resolve(__dirname, '../build/core/css/framework7.bundle.legacy.css'), minified.styles);
      fs.writeFileSync(path.resolve(__dirname, '../build/core/css/framework7.bundle.legacy.css'), result.css);

    });
}

build();
