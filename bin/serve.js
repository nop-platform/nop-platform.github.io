const { resolve: resolvePath } = require('path');
const { pick } = require('@ntks/toolbox');

const { getConfig, readData, saveData, execute } = require('./helper');

const rootPath = resolvePath(__dirname, '..');

module.exports = {
  execute: () => {
    const siteSrcPath = resolvePath(rootPath, getConfig('site.default.source'));
    const pkg = readData(`${rootPath}/package.json`);

    saveData(`${siteSrcPath}/package.json`, { name: `${pkg.name}-site`, ...pick(pkg, ['version', 'private', 'hexo', 'dependencies']) });
    execute('site', 'serve');
  }
};
