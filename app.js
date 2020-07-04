const path = require("path");
const express = require("express");
const app = express();
const { port } = require("./environment");
const router = require("./src/routes/main")(app);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
