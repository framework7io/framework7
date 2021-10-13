/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const exec = require('exec-sh');
const getOutput = require('./get-output.js');

async function buildClean(project, cb) {
  if (process.env.NODE_ENV === 'development' && project !== 'core') {
    cb();
    return;
  }
  const output = `${getOutput()}/${project}`;
  const toRemove = [
    "find **/*.js -type f -not -name 'postinstall.js' -print0 | xargs -0  -I {} rm -v {}",
    "find *.js -type f -not -name 'postinstall.js' -print0 | xargs -0  -I {} rm -v {}",
    '**/*.ts',
    '*.ts',
    '**/*.svelte',
    '*.svelte',
    '**/*.css',
    '*.css',
    '**/*.less',
    '*.less',
    '**/*.map',
    '*.map',
    'cjs',
    'esm',
    'components',
    'less',
    'modules',
    'types/*.ts',
    'types/components',
    'types/modules',
    'types/shared',
  ].map((command) => (command.includes('find') ? command : `rm -rf ${command}`));

  await exec.promise(`cd ${output} && ${toRemove.join(' && ')}`);

  if (cb) cb();
}

module.exports = buildClean;
