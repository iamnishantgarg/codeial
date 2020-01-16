const express = require("express");
const app = express();
const route = require("./routes/index");
const PORT = 8000;
app.get("/", route);
app.listen(PORT, err => {
  if (err) console.log(err);
  else console.log(`server is running ${PORT}`);
});
