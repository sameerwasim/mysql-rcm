const router = require("express").Router();
const controller = require("./controller");

const Operations = {
  find: "get",
  findOne: "get",
  insert: "post",
  update: "put",
  delete: "delete",
};

const PathParam = {
  find: "",
  findOne: "/:id",
  insert: "",
  update: "/:id",
  delete: "/:id",
};

MySqlRCM = (mysqlRCM) => {
  const { name, operations } = mysqlRCM;

  operations.forEach((operation) => {
    const path = "/" + name + PathParam[operation.name];

    if (operation.middleware) router[Operations[operation.name]](path, operation.middleware, (req, res) => controller[operation.name](req, res));
    else router[Operations[operation.name]](path, (req, res) => controller[operation.name](req, res));
  });

  //   operations.includes("find") && router.get("/" + path, middleware, controller.find);
  //   operations.includes("findOne") && router.get("/" + path + "/:id", middleware, controller.findOne);
  //   operations.includes("create") && router.post("/" + path, middleware, controller.create);
  //   operations.includes("update") && router.put("/" + path + "/:id", middleware, controller.update);
  //   operations.includes("delete") && router.delete("/" + path + "/:id", middleware, controller.delete);

  return router;
};

module.exports = MySqlRCM;
