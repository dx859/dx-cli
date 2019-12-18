const fs = require("fs");
const chalk = require("chalk");
const ora = require("ora");
const download = require('download-git-repo');

exports.run = (type, name) => {

  const gitMap = {
    'react': 'https://github.com:dx859/react-antd-template#master'
  };
  if (!gitMap[type]) {
    console.log(chalk.red(`没有${type}项目`));
    return;
  }
  if (fs.existsSync(name)) {
    console.log(chalk.red(`目录${name}已存在`));
    return;
  }
  const spinner = ora("download...");
  spinner.start();

  download(gitMap[type], name, err=>{
    if (err) {
      spinner.fail();
      console.log(chalk.red(err));
    }else {
      spinner.succeed();
      const pageFile = `${name}/package.json`
      if (fs.existsSync(pageFile)) {
        const content = JSON.parse(fs.readFileSync(pageFile).toString());
        content.name = name;
        fs.writeFileSync(pageFile, JSON.stringify(content))
      }
      console.log(chalk.green('success'));
    }
  })

};

