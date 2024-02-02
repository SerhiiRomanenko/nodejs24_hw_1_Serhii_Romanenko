const fs = require("fs");
const fsAsync = require("fs/promises");
const logger = require("../utils/logger")("file_sync");

function file_sync() {
  return {
    start: async function syncFiles() {
      let dataSource = await fsAsync.readdir("./source"); // get array of files in ./source
      let dataTarget = await fsAsync.readdir("./target"); // get array of files in ./target
    },
  };
}

module.exports = file_sync;
