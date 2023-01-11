const Model = require("./model");

exports.find = (req, res) => {
  const data = new Model(req.query);
  Model.find(data, (err, result) => {
    if (err) res.status(404).send(err);
    else res.json(result);
  });
};

exports.findOne = (req, res) => {
  const data = new Model(req.params);
  Model.findOne(data, (err, result) => {
    if (err) res.status(404).send(err);
    else res.json(result);
  });
};

exports.insert = (req, res) => {
  const data = new Model(req.body);
  Model.insert(data, (err, result) => {
    if (err) res.status(404).send(err);
    else res.json(result);
  });
};

exports.update = (req, res) => {
  req.body.id = req.params.id;
  const data = new Model(req.body);
  Model.update(data, (err, result) => {
    if (err) res.status(404).send(err);
    else res.json(result);
  });
};

exports.delete = (req, res) => {
  const data = new Model(req.params);
  Model.delete(data, (err, result) => {
    if (err) res.status(404).send(err);
    else res.json(result);
  });
};
