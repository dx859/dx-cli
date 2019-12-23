const fs = require('fs');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const download = require('download-git-repo');

exports.run = async (type, dir) => {
  const gitMap = {
    react: 'https://github.com:dx859/react-antd-template#master',
    package: 'https://github.com:dx859/npm-package-template#master'
  };
  if (!gitMap[type]) {
    console.log(chalk.red(`没有${type}项目`));
    return;
  }
  if (fs.existsSync(dir)) {
    console.log(chalk.red(`目录${dir}已存在`));
    return;
  }

  const questions = [
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: dir
    },
    {
      type: 'list',
      name: 'template',
      message: '请选择模板类型',
      choices: ['JavaScript', 'TypeScript'],
      default: 'JavaScript'
    }
  ];

  const answers = await inquirer.prompt(questions);

  const spinner = ora('download...');
  spinner.start();

  download(gitMap[type], dir, err => {
    if (err) {
      spinner.fail();
      console.log(chalk.red(err));
    } else {
      spinner.succeed();
      const pageFile = `${dir}/package.json`;
      if (fs.existsSync(pageFile)) {
        const content = JSON.parse(fs.readFileSync(pageFile).toString());
        content.name = answers.name;
        fs.writeFileSync(pageFile, JSON.stringify(content, null, 2));
      }
      console.log(chalk.green('success'));
    }
  });
};
