require("dotenv").config();

const logger = require("./utils/logger")("main");

const fileSync = require("./file_sync");

fileSync.start();

logger.info("the script is running! (info)");
logger.warn("the script has some warn! (warn)");
logger.error("the script has some troubles! (error)");
