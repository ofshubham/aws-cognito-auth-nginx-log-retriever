module.exports = function (app) {
  const bodyParser = require("body-parser");
  const cors = require("cors");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/api", require("./user"));
  app.use("/api", require("./logs"));
  // Catch all
  app.use("*", function (req, res, next) {
    res.status(404).json({ err: "Path" + req.originalUrl + " does not exist" });
  });
};
