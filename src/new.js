const chalk = require('chalk');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const handlebars = require('handlebars');

exports.run = async (type, name, cmd) => {
  const page = { template: 'page', path: 'src/views' },
    component = { template: 'component', path: 'src/components' };
  const typeMap = { page: page, p: page, component: component, c: component };
  const typeObj = typeMap[type];
  if (!typeObj) {
    console.log(chalk.red(`没有new ${type}项目`));
    return;
  }
  const cmdDir = process.cwd();
  let rootPath;
  for (let i = 0; i < 4; i++) {
    let midpaths = ['.', '..', '../..', '../../..'];
    if (fs.existsSync(path.join(process.cwd(), midpaths[i], 'package.json'))) {
      rootPath = path.join(process.cwd(), midpaths[i]);
      break;
    }
  }
  if (!rootPath) {
    console.log(chalk.red(`没有找到项目的根目录`));
    return;
  }

  const distPath = cmd.dirname
    ? path.join(process.cwd(), cmd.dirname, name)
    : path.join(rootPath, typeObj.path, name);

  if (fs.existsSync(distPath)) {
    console.log(chalk.red(`路径${distPath}已有文件`));
    return;
  }

  fsExtra.copySync(
    path.join(__dirname, '..', 'templates', typeObj.template),
    path.join(distPath)
  );

  const files = fs.readdirSync(distPath);

  files.forEach(file => {
    if (path.extname(file) === '.hbs') {
      const filePath = path.join(distPath, file);

      const template = handlebars.compile(fs.readFileSync(filePath, 'utf-8'));
      const content = template({ name: name });
      fs.writeFileSync(filePath, content, 'utf-8');
      fs.renameSync(filePath, filePath.substring(0, filePath.lastIndexOf('.')));
    }
  });
};
