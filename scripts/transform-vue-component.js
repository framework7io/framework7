const fs = require('fs');
// eslint-disable-next-line
const compilerSFC = require('@vue/compiler-sfc');

const transformVueComponent = (inputFile, outputFile) => {
  const src = fs.readFileSync(inputFile, 'utf-8');
  const { descriptor } = compilerSFC.parse(src);
  let templateCode = '';
  let scriptContent = descriptor.script.content;
  if (descriptor.template) {
    templateCode = compilerSFC.compileTemplate({
      id: inputFile,
      source: descriptor.template.content,
      compilerOptions: {
        isCustomElement: (tag) => tag === 'swiper-slide' || tag === 'swiper-container',
      },
    }).code;
    templateCode = templateCode.replace('export function render', 'function render');
    scriptContent = scriptContent.replace(/name: '([a-z0-9-]*)',/i, `name: '$1',\n  render,`);
  }
  const content = `${templateCode}\n${scriptContent}`;
  fs.writeFileSync(outputFile, content);
};

module.exports = transformVueComponent;
