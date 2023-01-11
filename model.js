const Model = function (data) {
  this.id = data.id;
};

Model.find = (data, callback) => {
  callback(null, true);
};

Model.findOne = (data, callback) => {
  callback(null, true);
};

Model.insert = (data, callback) => {
  callback(null, true);
};

Model.update = (data, callback) => {
  callback(null, true);
};

Model.delete = (data, callback) => {
  callback(null, true);
};

module.exports = Model;
