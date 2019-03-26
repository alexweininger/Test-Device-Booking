var passport = require('passport');
var mysql = require('mysql');
var dbconfig = require('./database')
var connection = mysql.createConnection(dbconfig.connection)
var bcrypt = require('bcrypt-nodejs');
var LocalStrategy = require('passport-local').Strategy;


connection.query('USE ' + dbconfig.database);

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {

        done(null, user.id);

    });

    passport.deserializeUser(function(id, done) {

        connection.query("SELECT * FROM users WHERE id = ? ",[id], function(err, rows){

            done(err, rows[0]);

        });

    });
    passport.use(
        'Sign Up',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },

        function(req, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {

                if (err)

                    return done(err);

                if (rows.length) {

                    return done(null, false, req.flash('signupMessage', 'That username is already taken.'));

                } else {
                    var newUserMysql = {
                        username: username,
                        password: bcrypt.hashSync(password, null, null)  // use the generateHash function in our user model
                    };

                    var insertQuery = "INSERT INTO users ( username, password ) values (?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true

        },

        function(req, username, password, done) {

            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){

                if (err)

                    return done(err);

                if (!rows.length) {

                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                }



                // if the user is found but the password is wrong

                if (!bcrypt.compareSync(password, rows[0].password))

                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata



                // all is well, return successful user

                return done(null, rows[0]);

            });

        })

    );

};


// passport.use('sign-up', 
//     new LocalStrategy({
//         firstNameField: 'lastName',
//         lastNameField: 'lastName',
//         slackUsernameField: 'slackUsername',
//         EmployeeIDField: 'employeeID',
//         officeIDField: 'officeID',
//         usernameField: 'username',
//         passwordField: 'password',
//         passReqToCallback: true
//     },
//     function (req, username, password, done) {
//         connection.query("SELECT * FROM users WHERE username = ?", [username], function(error, rows) {
//             if (error) {
//                 return done(error);
//             }
//             if (rows.length) {
//                 return done(null, false, req.flash('Username already taken'));
//             }
//             else {
//                 var newUserMysql = { //check what fields are actually called
//                     username: username,
//                     password: bcrypt.hashSync(password, null, null),
//                     firstName: firstName,

//                 };
//             }
//         })
//     }
