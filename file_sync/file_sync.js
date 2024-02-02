const fs = require("fs");
const fsAsync = require("fs/promises");
const logger = require("../utils/logger")("file_sync");

function file_sync() {
  return {
    start: async function syncFiles() {
      let dataSource = await fsAsync.readdir("./source"); // get array of files in ./source
      let dataTarget = await fsAsync.readdir("./target"); // get array of files in ./target

      for (const item of dataSource) {
        const sourceFilePath = `./source/${item}`;
        if (dataTarget.includes(item)) {
          logger.warn(`File(folder) "${item}" already exists`); // log the info about existing files/folders
        } else if (
          !dataTarget.includes(item) &&
          (await fs.promises.stat(`./source/${item}`)).isDirectory() === false
        ) {
          let dataFile = await fsAsync.readFile(sourceFilePath, "utf8"); // read files from ./source
          await fsAsync.writeFile(`./target/${item}`, dataFile, "utf-8"); // write files to ./target
          logger.info(`File "${item}" was copied successfully`); // log the info about coping of files
        } else if (
          (
            !dataTarget.includes(item) &&
            (await fs.promises.stat(`./source/${item}`))
          ).isDirectory() === true
        ) {
          await fsAsync.mkdir(`./target/${item}`); // write folders to ./target
          logger.info(`Folder "${item}" was created successfully`); // log the info about creating of folders
        }
      }
    },
  };
}

module.exports = file_sync;
