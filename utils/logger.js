const colors = require("colors/safe");

const config = require("config");
config.COLORS_ENABLED == 1 ? colors.enable() : colors.disable();

console.log("Logger connected correctly!");

function logger(module) {
  let loggerMethods = {
    info: (...allIncomingThings) =>
      config.LOG_LEVEL === "info" &&
      console.info(colors.bgGreen(`${module}:`), ...allIncomingThings),
    warn: (...allIncomingThings) =>
      config.LOG_LEVEL !== "error" &&
      console.warn(colors.bgYellow(`${module}:`), ...allIncomingThings),
    error: (...allIncomingThings) =>
      console.error(colors.bgRed(`${module}:`), ...allIncomingThings),
  };
  return loggerMethods;
}
module.exports = logger;
