/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const exec = require('exec-sh');
const getOutput = require('./get-output.js');

async function buildClean(project, cb) {
  const output = `${getOutput()}/${project}`;
  const toRemove = [
    '*.js',
    '*.ts',
    '*.css',
    '*.less',
    '*.map',
    'cjs',
    'esm',
    'components',
    'less',
    'modules',
    'types/*.ts',
    'types/components',
    'types/modules',
    'types/utils',
  ].map((command) => `rm -rf ${command}`);

  await exec.promise(`cd ${output} && ${toRemove.join(' && ')}`);

  if (cb) cb();
}

module.exports = buildClean;
