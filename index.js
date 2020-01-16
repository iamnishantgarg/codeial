const express = require("express");
const app = express();
const PORT = 8000;
app.get("/", (req, res, next) => {
  res.send("hello");
});
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`server is running ${PORT}`);
});
