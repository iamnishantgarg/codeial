const express = require("express");
const app = express();
const route = require("./routes/index");
const path = require("path");
const PORT = 8000;
const keys = require("./keys");
const mongoose = require("mongoose");
const expressLayout = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const Authenticator = require("./config/authenticator");
const mongoStore = require("connect-mongo")(session);
const flash = require("connect-flash");
const cMWare = require("./config/middleware");
// const sassMiddleware = require("node-sass-middleware");

// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, "assets", "scss"),
//     dest: path.join(__dirname, "assets", "css"),
//     debug: true,
//     outputStyle: "extended",
//     prefix: "/css"
//   })
// );

app.use(express.urlencoded());

app.use(express.static("./assets"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(expressLayout);

app.set("view engine", "ejs");

app.use(
  session({
    name: "codeial",
    secret: "blashwfejbfwejf",
    saveUninitialized: false,
    resave: false,
    store: new mongoStore(
      {
        url: keys.MONGOURI,
        autoRemove: "disabled"
      },
      err => {
        console.log(err);
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(Authenticator.setAuthenticatedUser);
app.use(flash());
app.use(cMWare.setFlash);

app.use("/", route);

mongoose.connect(
  keys.MONGOURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) console.log(err);
    else {
      console.log("connected to db");

      app.listen(PORT, err => {
        if (err) console.log(err);
        else console.log(`server is running ${PORT}`);
      });
    }
  }
);
