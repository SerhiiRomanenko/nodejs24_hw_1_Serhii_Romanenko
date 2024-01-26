console.log("Logger connected correctly!");

function logger(module) {
  return {
    info: (...allIncomingThings) =>
      console.info(`${module}:`, ...allIncomingThings),
    warn: (...allIncomingThings) =>
      console.warn(`${module}:`, ...allIncomingThings),
    error: (...allIncomingThings) =>
      console.error(`${module}:`, ...allIncomingThings),
  };
}
module.exports = logger;
