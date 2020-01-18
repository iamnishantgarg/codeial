const express = require("express");
const app = express();
const route = require("./routes/index");
const PORT = 8000;
const keys = require("./keys");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");

app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayout);

app.set("view engine", "ejs");
app.use("/", route);
mongoose.connect(keys.MONGOURI, { useNewUrlParser: true }, err => {
  if (err) console.log(err);
  else {
    console.log("connected to db");

    app.listen(PORT, err => {
      if (err) console.log(err);
      else console.log(`server is running ${PORT}`);
    });
  }
});
