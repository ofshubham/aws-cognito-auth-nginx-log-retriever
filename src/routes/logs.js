const router = require("express").Router();
const authMiddleWare = require("../middlewares/AuthMiddleware");
const logsController = require("../controllers/LogsController");

router.get("/logs", authMiddleWare.Validate, logsController.logs);

module.exports = router;
