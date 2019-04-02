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
      res.redirect('/');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
        user : req.user // get the user out of session and pass to template
      });
    });

    app.get('/logout', function(req, res) {
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
	res.redirect('/');
}
