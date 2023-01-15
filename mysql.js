const mysql = require("mysql2");

module.exports = (config) => {
  var error = "";

  if (!config.host) error += "Missing MySQL Host, ";
  if (!config.user) error += "Missing MySQL Username, ";
  // if (!config.password) error += "Missing MySQL Password, ";
  if (!config.database) error += "Missing MySQL Database.";

  if (error.length == 0) {
    try {
      return mysql.createConnection(config);
    } catch (err) {
      return false;
    }
  } else {
    throw new Error(error);
  }
};
