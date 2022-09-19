/* eslint-disable prefer-template */
const fs = require('fs');

let output = '';
fs.readdirSync('./src/core/components').forEach((component) => {
  if (component.indexOf('.') === 0) return;
  if (!fs.existsSync(`./src/core/components/${component}/${component}-vars.less`)) return;

  const content = fs.readFileSync(
    `./src/core/components/${component}/${component}-vars.less`,
    'utf8',
  );

  const iosVars = {};
  const iosDarkVars = {};
  const mdVars = {};
  const mdDarkVars = {};

  let iosBegan;
  let mdBegan;
  let iosDarkBegan;
  let mdDarkBegan;
  content
    .split('\n')
    .map((l) => l.trim())
    .forEach((line) => {
      if (line.indexOf('.ios') >= 0) iosBegan = true;
      if (line.indexOf('.md') >= 0) mdBegan = true;
      if (line.indexOf('.dark-vars') >= 0) {
        if (mdBegan) mdDarkBegan = true;
        else if (iosBegan) iosDarkBegan = true;
      }

      let varName = line.match(/--f7-[^:]*/);
      if (!varName) return;
      varName = varName[0];

      let varValue = line.split(`${varName}:`)[1];
      if (!varValue) return;
      varValue = varValue.replace(';', '').trim();
      if (mdBegan) {
        if (mdDarkBegan) mdDarkVars[varName] = varValue;
        else mdVars[varName] = varValue;
      } else if (iosBegan) {
        if (iosDarkBegan) iosDarkVars[varName] = varValue;
        else iosVars[varName] = varValue;
      }
    });

  const commonVars = {};
  Object.keys(iosVars).forEach((varName) => {
    const varValue = iosVars[varName];
    if (mdVars[varName] === iosVars[varName]) {
      commonVars[varName] = varValue;
      delete iosVars[varName];
      delete mdVars[varName];
    }
  });

  const commonDarkVars = {};
  Object.keys(iosDarkVars).forEach((varName) => {
    const varValue = iosDarkVars[varName];
    if (mdDarkVars[varName] === iosDarkVars[varName]) {
      commonDarkVars[varName] = varValue;
      delete iosDarkVars[varName];
      delete mdDarkVars[varName];
    }
  });

  if (Object.keys(commonVars).length || Object.keys(commonDarkVars).length) {
    // prettier-ignore
    output += '\n===\n' + `
${Object.keys(commonVars).length ? `
${component} common vars:
${Object.keys(commonVars).map(v => `${v}: ${commonVars[v]};`).join('\n')}
`.trim() : ''}

${Object.keys(commonDarkVars).length ? `
${component} common dark vars:
${Object.keys(commonDarkVars).map(v => `${v}: ${commonDarkVars[v]};`).join('\n')}
`.trim() : ''}
    `.trim();
  }
});
fs.writeFileSync('./build/common-css-vars-data.md', output);
