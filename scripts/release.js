/* eslint-disable import/no-extraneous-dependencies */
const exec = require('exec-sh');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const pkg = require('../package.json');

const pkgCore = require('../packages/core/package.json');
const pkgReact = require('../packages/react/package.json');
const pkgVue = require('../packages/vue/package.json');
const pkgSvelte = require('../packages/svelte/package.json');

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
  pkgReact.version = options.version;
  pkgVue.version = options.version;
  pkgSvelte.version = options.version;

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

  // NPM publish
  if (options.beta) {
    await exec.promise('cd ./packages/core && npm publish --tag next');
    await exec.promise('cd ./packages/react && npm publish --tag next');
    await exec.promise('cd ./packages/vue && npm publish --tag next');
    await exec.promise('cd ./packages/svelte && npm publish --tag next');
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
  await exec.promise(`git commit -m "${pkgCore.version} release"`);
  await exec.promise('git push');
  await exec.promise(`git tag v${pkgCore.version}`);
  await exec.promise('git push origin --tags');
}

release();
