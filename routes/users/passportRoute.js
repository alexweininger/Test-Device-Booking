module.exports = function(app, passport) {

// process the login form

app.post('/login', passport.authenticate('local-login', {

    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: false, // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages

  }),
    function (req, res) {
  
      console.log("hello");
      if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
      } else {
  
        req.session.cookie.expires = false;
  
      }
      res.redirect('/');
  
    });
}