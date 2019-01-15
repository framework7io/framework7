/* eslint-disable */
const path = require('path');
const postcss = require('postcss');
const postcssFilterRules = require('postcss-filter-rules');
const postcssCssVariables = require('postcss-css-variables');
const fs = require('./utils/fs-extra');

const plugin = postcss.plugin('pluginname', () => (ast) => {
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

function build() {
  const css = fs.readFileSync(path.resolve(__dirname, '../build/core/css/framework7.bundle.css'));
  postcss([
    postcssFilterRules({
      filter(selector, parts) {
        if (parts.indexOf('.md') >= 0 || parts[0].indexOf('.md') === 0) return false;
        return true;
      },
    }),
    plugin(),
    postcssCssVariables({ preserve: false }),
  ])
    .process(css, { from: './build/core/css/framework7.bundle.css', to: './build/core/css/framework7.bundle.legacy.css' })
    .then((result) => {
      fs.writeFileSync(path.resolve(__dirname, '../build/core/css/framework7.bundle.legacy.css'), result.css);
    });
}

build();
