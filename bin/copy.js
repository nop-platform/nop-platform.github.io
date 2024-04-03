const { resolve: resolvePath } = require('path');

const { getConfig, ensureDirExists, copyFileDeeply } = require('./helper');

const rootPath = resolvePath(__dirname, '..');

module.exports = {
  execute: () => {
    const themeSrcPath = `${rootPath}/node_modules/hexo-theme-lime`;
    const themeDistPath = resolvePath(rootPath, getConfig('site.default.source'), 'themes/nop-project');

    ensureDirExists(themeDistPath);
    copyFileDeeply(themeSrcPath, themeDistPath, ['README.md', 'CHANGELOG.md', 'package.json']);
  },
};
