exports.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else return res.redirect("/users/sign-in");
};

exports.setAuthenticatedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};
