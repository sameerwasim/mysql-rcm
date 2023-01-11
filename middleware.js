// Just Passes the control to the next function, in case user middleware is missing
module.exports = function (req, res, next) {
  next();
};
