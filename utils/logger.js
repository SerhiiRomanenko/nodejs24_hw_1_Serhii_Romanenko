const colors = require("colors/safe");

const config = require("config");
if (!config.COLORS_ENABLED) colors.disable();

console.log("Logger connected correctly!");

function logger(module) {
  return {
    info: (...allIncomingThings) =>
      config.LOG_LEVEL === "info" &&
      console.info(colors.bgGreen(`${module}:`), ...allIncomingThings),
    warn: (...allIncomingThings) =>
      config.LOG_LEVEL !== "error" &&
      console.warn(colors.bgYellow(`${module}:`), ...allIncomingThings),
    error: (...allIncomingThings) =>
      console.error(colors.bgRed(`${module}:`), ...allIncomingThings),
  };
}
module.exports = logger;
