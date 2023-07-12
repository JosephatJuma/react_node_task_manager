const express = require("express");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
