const router = require("express").Router();
const controller = require("./controller");

module.exports = (tables, db) => {
  tables.forEach((table) => {
    const endpoints = table?.endpoints || ["GET", "POST", "DELETE", "PUT"];
    const { validator, points } = table?.middleware || {};

    const _sql = {
      name: table.name,
      db: db,
    };

    if (endpoints.includes("GET")) {
      if (validator && points.includes("GET")) {
        router.get("/" + table.name, validator, (req, res) => {
          controller.get(req, res, _sql);
        });
      } else {
        router.get("/" + table.name, (req, res) => {
          controller.get(req, res, _sql);
        });
      }
    }

    if (endpoints.includes("POST")) {
      if (validator && points.includes("POST")) {
        router.post("/" + table.name, validator, (req, res) => {
          controller.post(req, res, _sql);
        });
      } else {
        router.post("/" + table.name, (req, res) => {
          controller.post(req, res, _sql);
        });
      }
    }

    if (endpoints.includes("DELETE")) {
      if (validator && points.includes("DELETE")) {
        router.delete("/" + table.name + "/:id", validator, (req, res) => {
          controller.delete(req, res, _sql);
        });
      } else {
        router.delete("/" + table.name + "/:id", (req, res) => {
          controller.delete(req, res, _sql);
        });
      }
    }

    if (endpoints.includes("PUT")) {
      if (validator && points.includes("PUT")) {
        router.put("/" + table.name + "/:id", validator, (req, res) => {
          controller.put(req, res, _sql);
        });
      } else {
        router.put("/" + table.name + "/:id", (req, res) => {
          controller.put(req, res, _sql);
        });
      }
    }
  });

  return router;
};
