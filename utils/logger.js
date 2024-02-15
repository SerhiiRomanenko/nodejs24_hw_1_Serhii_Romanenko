const colors = require("colors/safe");
const fs = require("fs");
const path = require("path");

const EventEmitter = require("events");
const emitter = new EventEmitter();

emitter.once("onceEmit", () => {
  console.log("ONCE");
});

emitter.emit("onceEmit");

// Перевірка наявності папки logs та її створення, якщо її немає
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Створення стрімів для запису у файли logs/info.log та logs/errors.log
const infoStream = fs.createWriteStream(path.join(logsDir, "info.log"), {
  flags: "a",
});
const errorStream = fs.createWriteStream(path.join(logsDir, "errors.log"), {
  flags: "a",
});

const config = require("config");
if (!config.COLORS_ENABLED) colors.disable();

console.log("Logger connected correctly!");

function writeToStream(stream, module, level, messages) {
  const logMessage = `${colors.bgBlack(
    colors[level.charAt(0).toUpperCase() + level.slice(1)]
  )} ${module}: ${messages.join(" ")}`;
  console[level](logMessage);
  stream.write(logMessage + "\n");
}

function logger(module) {
  return {
    info: (...allIncomingThings) => {
      if (
        config.LOG_LEVEL === "info" ||
        config.LOG_LEVEL === "warn" ||
        config.LOG_LEVEL === "error"
      ) {
        writeToStream(infoStream, module, "info", allIncomingThings);
      }
    },
    warn: (...allIncomingThings) => {
      if (config.LOG_LEVEL === "warn" || config.LOG_LEVEL === "error") {
        writeToStream(errorStream, module, "warn", allIncomingThings);
      }
    },
    error: (...allIncomingThings) => {
      writeToStream(errorStream, module, "error", allIncomingThings);
    },
  };
}

module.exports = logger;
