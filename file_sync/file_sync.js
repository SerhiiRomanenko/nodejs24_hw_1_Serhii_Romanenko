const fs = require('fs');
const fsAsync = require('fs/promises');
const logger = require('../utils/logger')('file_sync');

let sourcePath = './source';
let targetPath = './target';

async function syncFiles() {
  let dataSource = await fsAsync.readdir(sourcePath); // get array of files in ./source
  let dataTarget = await fsAsync.readdir(targetPath); // get array of files in ./target

  for (const item of dataSource) {
    const sourceFilePath = `${sourcePath}/${item}`;
    if (dataTarget.includes(item)) {
      logger.warn(`File(folder) "${item}" already exists`); // log the info about existing files/folders
    } else if (
      !dataTarget.includes(item) &&
      (await fs.promises.stat(`${sourcePath}/${item}`)).isDirectory() === false
    ) {
      let dataFile = await fsAsync.readFile(sourceFilePath, 'utf-8'); // read files from ./source
      await fsAsync.writeFile(`${targetPath}/${item}`, dataFile, 'utf-8'); // write files to ./target
      logger.info(`File "${item}" was copied successfully`); // log the info about coping of files
    } else if (
      (!dataTarget.includes(item) && (await fs.promises.stat(`${sourcePath}/${item}`))).isDirectory() === true
    ) {
      await fsAsync.mkdir(`${targetPath}/${item}`); // write folders to ./target
      logger.info(`Folder "${item}" was created successfully`); // log the info about creating of folders
      sourcePath += `/${item}`;
      targetPath += `/${item}`;

      return syncFiles();
    }
  }
}

module.exports = {
  syncFiles
};
