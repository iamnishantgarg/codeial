exports.home = (req, res, next) => {
  //   res.send("<h1>Express is working for codeial</h1>");
  res.render("home", { title: "home" });
};
