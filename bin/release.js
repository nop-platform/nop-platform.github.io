const { resolve: resolvePath } = require('path');
const { execSync } = require('child_process');
const { pick } = require('@ntks/toolbox');

const { getConfig, ensureDirExists, copyFileDeeply, cp, saveData } = require('./helper');

const rootPath = resolvePath(__dirname, '..');
const pkgName = '@nop-community/hexo-theme-site';

function copyMetaFiles() {
  const distDir = `${rootPath}/dist`;
  const readmeTemplate = `# \`${pkgName}\`
`;

  saveData(`${distDir}/README.md`, readmeTemplate);
  // cp(`${rootPath}/CHANGELOG.md`, `${distDir}/`);
}

function copyThemeFiles() {
  const themeSrcPath = resolvePath(rootPath, getConfig('site.default.source'), 'themes/nop-project');
  const themeDistPath = `${rootPath}/dist`;

  ensureDirExists(themeDistPath, true);
  copyFileDeeply(themeSrcPath, themeDistPath);

  const pkgFields = pick(require(`${rootPath}/package.json`), ['version', 'description', 'repository', 'author', 'license', 'bugs', 'homepage']);

  saveData(`${themeDistPath}/package.json`, JSON.stringify({
    name: pkgName,
    main: 'package.json',
    keywords: ['nop', 'nop-platform', 'nop-community', 'knosys', 'ksio', 'hexo', 'theme'],
    ...pkgFields,
  }, null, 2));
  copyMetaFiles();
}

module.exports = {
  execute: () => {
    copyThemeFiles();
    execSync('npm publish --access=public', { stdio: 'inherit', cwd: `${rootPath}/dist` });
  },
};
