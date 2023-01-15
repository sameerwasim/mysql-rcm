const connection = require("./mysql");
const routing = require("./routing");

const MySQL = (params) => {
  const { config, tables } = params;

  if (config) {
    this.connect = connection(config);
  } else {
    console.error("MySQL RCM Error: Missing MySQL Connection Configuration");
    return -1;
  }

  if (tables) {
    this.routing = routing(tables, this.connect);
  } else {
    console.error("MySQL RCM Error: Missing Tables");
    return -1;
  }

  return this.routing;
};

module.exports = MySQL;
