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
        } else if (
          !dataTarget.includes(item) &&
          (await fs.promises.stat(`./source/${item}`)).isDirectory() === false
        ) {
        } else if (
          (
            !dataTarget.includes(item) &&
            (await fs.promises.stat(`./source/${item}`))
          ).isDirectory() === true
        ) {
        }
      }
    },
  };
}

module.exports = file_sync;
