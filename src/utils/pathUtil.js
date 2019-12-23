const fs = require('fs');
const path = require('path');

exports.getRootPath = () => {
  let rootPath = false;
  for (let i = 0; i < 4; i++) {
    let midpaths = ['.', '..', '../..', '../../..'];
    if (fs.existsSync(path.join(process.cwd(), midpaths[i], 'package.json'))) {
      rootPath = path.join(process.cwd(), midpaths[i]);
      break;
    }
  }
  return rootPath;
};
