#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const program = require('commander');

program
  .command('init <type> <dir>')
  .description('初始化命令工程工具：react vue package')
  .action(async (type, dir, cmd) => {
    await require('../src/init').run(type, dir, cmd);
  });

program
  .command('new <type> <name>')
  .description('添加新的功能 type(类型)：page: p, component: c; name(名称)')
  .option('-d, --dirname <dir>', '文件的父级路径')
  .option('-n, --name <name>', '组件的名称')
  .action(async (type, name, cmd) => {
    await require('../src/new').run(type, name, cmd);
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
