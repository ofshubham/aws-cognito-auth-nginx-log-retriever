const authService = require("../services/AuthService");
exports.register = function (req, res) {
  let response = { status: "failure", data: null, err: null };
  let register = authService.Register(req.body, function (err, result) {
    if (err) {
      response.err = err;
      res.status(400).json(response);
    } else {
      response.status = "success";
      response.data = result;
      res.json(response);
    }
  });
};
exports.login = function (req, res) {
  let response = { status: "failure", data: null, err: null };
  let login = authService.Login(req.body, function (err, result) {
    if (err) {
      response.err = err;
      res.status(401).json(response);
    } else {
      response.status = "success";
      response.data = result;
      res.json(response);
    }
  });
};
exports.confirm = function (req, res) {
  let response = { status: "failure", data: null, err: null };
  authService.confirm(req.body, function (err, result) {
    if (err) {
      response.err = err;
      res.status(401).json(response);
    } else {
      response.status = "success";
      response.data = result;
      res.json(response);
    }
  });
};
exports.validate_token = function (req, res) {
  let response = { status: "failure", data: null, err: null };
  let validate = authService.Validate(req.body.token, function (err, result) {
    if (err) {
      response.err = err;
      res.status(401).json(response);
    } else {
      response.status = "success";
      response.data = result;
      res.json(response);
    }
  });
};
