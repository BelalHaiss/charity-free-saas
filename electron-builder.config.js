/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  directories: {
    output: 'dist/electron'
  },
  publish: null,
  npmRebuild: false,
  files: ['dist/main/**/*', 'dist/render/**/*', 'dist/shared/**/*']
};

// eslint-disable-next-line no-undef
module.exports = config;
