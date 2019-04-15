module.exports = function(app, passport) {

// process the login form

app.post('/login', passport.authenticate('local-login', {

    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: false, // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages

  }),
    (req, res) => {
      console.log("hello");
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
        req.session.cookie.expires = false;
      }
      console.log('here');
      res.send(200);
    });

    app.post('/users', isLoggedIn, function(req, res) {
      console.log(req.user);
    });

    app.post('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
    });
}

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

  // if they aren't redirect them to the home page
  console.log('not logged in');
  res.redirect('/');
}
