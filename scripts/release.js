/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const exec = require('exec-sh');
const inquirer = require('inquirer');
const pkg = require('../package.json');

const pkgCore = require('../packages/core/package.json');
const pkgReact = require('../packages/react/package.json');
const pkgVue = require('../packages/vue/package.json');
const pkgSvelte = require('../packages/svelte/package.json');

const date = new Date();
const formatter = new Intl.DateTimeFormat('en', {
  day: 'numeric',
  year: 'numeric',
  month: 'long',
});
const releaseDate = formatter.format(date);

async function release() {
  const options = await inquirer.prompt([
    {
      type: 'input',
      name: 'version',
      message: 'Version:',
      default: pkgCore.version,
    },
    {
      type: 'list',
      name: 'alpha',
      message: 'Alpha?',
      when: (opts) => opts.version.indexOf('alpha') >= 0,
      choices: [
        {
          name: 'YES',
          value: true,
        },
        {
          name: 'NO',
          value: false,
        },
      ],
    },
    {
      type: 'list',
      name: 'beta',
      message: 'Beta?',
      when: (opts) => opts.version.indexOf('beta') >= 0,
      choices: [
        {
          name: 'YES',
          value: true,
        },
        {
          name: 'NO',
          value: false,
        },
      ],
    },
  ]);

  // Set version
  pkgCore.version = options.version;
  pkgCore.releaseDate = releaseDate;
  pkgReact.version = options.version;
  pkgReact.releaseDate = releaseDate;
  pkgVue.version = options.version;
  pkgVue.releaseDate = releaseDate;
  pkgSvelte.version = options.version;
  pkgSvelte.releaseDate = releaseDate;

  // Copy dependencies
  pkgCore.dependencies = pkg.dependencies;

  fs.writeFileSync(
    path.resolve(__dirname, '../packages/core/package.json'),
    JSON.stringify(pkgCore, null, 2),
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../packages/react/package.json'),
    JSON.stringify(pkgReact, null, 2),
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../packages/vue/package.json'),
    JSON.stringify(pkgVue, null, 2),
  );
  fs.writeFileSync(
    path.resolve(__dirname, '../packages/svelte/package.json'),
    JSON.stringify(pkgSvelte, null, 2),
  );

  await exec.promise('git pull');
  await exec.promise('npm i');

  await exec.promise(`npm run build-core:prod`);
  await exec.promise(`npm run build-react:prod`);
  await exec.promise(`npm run build-vue:prod`);
  await exec.promise(`npm run build-svelte:prod`);

  // update web types version
  // eslint-disable-next-line
  const webTypes = require('../packages/vue/framework7-vue-web-types.json');
  webTypes.version = options.version;
  fs.writeFileSync(
    path.resolve(__dirname, '../packages/vue/framework7-vue-web-types.json'),
    JSON.stringify(webTypes, null, 2),
  );

  // NPM publish
  if (options.beta) {
    await exec.promise('cd ./packages/core && npm publish --tag beta');
    await exec.promise('cd ./packages/react && npm publish --tag beta');
    await exec.promise('cd ./packages/vue && npm publish --tag beta');
    await exec.promise('cd ./packages/svelte && npm publish --tag beta');
  } else if (options.alpha) {
    await exec.promise('cd ./packages/core && npm publish --tag next');
    await exec.promise('cd ./packages/react && npm publish --tag next');
    await exec.promise('cd ./packages/vue && npm publish --tag next');
    await exec.promise('cd ./packages/svelte && npm publish --tag next');
  } else {
    await exec.promise('cd ./packages/core && npm publish');
    await exec.promise('cd ./packages/react && npm publish');
    await exec.promise('cd ./packages/vue && npm publish');
    await exec.promise('cd ./packages/svelte && npm publish');
  }

  // Build Production Kitchen Sink
  await exec.promise('npm run build-ks:core');
  await exec.promise('npm run build-ks:react');
  await exec.promise('npm run build-ks:svelte');
  await exec.promise('npm run build-ks:vue');

  // Git commit & push
  await exec.promise('git add .');
  await exec.promise(`git commit -m ${pkgCore.version}`);
  await exec.promise('git push');
  await exec.promise(`git tag v${pkgCore.version}`);
  await exec.promise('git push origin --tags');
}

release();
