const express = require("express");
var bodyParser = require("body-parser");
const mysql = require(".");

const app = express();

var middleware = (req, res, next) => {
  res.send("failed authentication");
};

app.use(express.json());
app.use(
  mysql({
    config: {
      host: "localhost",
      user: "root",
      password: "",
      database: "mailerApp",
    },
    tables: [
      {
        name: "emails",
        endpoints: ["GET", "POST", "PUT", "DELETE"],
        middleware: {
          points: ["PUT", "DELETE"],
          validator: middleware,
        },
      },
      {
        name: "reviews",
        endpoints: ["GET", "POST", "PUT", "DELETE"],
        middleware: {
          points: ["PUT", "DELETE"],
          validator: middleware,
        },
      },
    ],
  })
);

app.listen(3000, () => {
  console.log("App Listening on 3000");
});
