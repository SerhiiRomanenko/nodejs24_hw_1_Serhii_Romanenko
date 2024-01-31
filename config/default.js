const COLORS_ENABLED = process.env.COLORS_ENABLED === "1";
const LOG_LEVEL = process.env.LOG_LEVEL || "warn";

module.exports = {
  COLORS_ENABLED,
  LOG_LEVEL,
};
