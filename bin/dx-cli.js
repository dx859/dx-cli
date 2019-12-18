#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const program = require("commander");
const package = fs.readFileSync(
  path.join(__dirname, "../package.json"),
  "utf-8"
);

program
  .version(JSON.parse(package).version)
  .command("init <type> <name>")
  .description("初始化命令工程工具：react vue package")
  .action(function(type, name) {
    require('../src/init').run(type, name)
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
