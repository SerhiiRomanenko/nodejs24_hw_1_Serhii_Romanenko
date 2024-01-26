console.log("Logger connected correctly!");

function logger(module) {
  return {
    info: (text) => console.info(`${module}: ${text}`),
    warn: (text) => console.warn(`${module}: ${text}`),
    error: (text) => console.error(`${module}: ${text}`),
  };
}
module.exports = logger;
