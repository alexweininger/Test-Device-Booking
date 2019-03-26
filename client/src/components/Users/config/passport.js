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
    // passport.deserializeUser(function(username, firstName, lastName, done) {
    //     connection.query("SELECT * FROM users WHERE username = ? and WHERE firstName = ? and WHERE lastName = ?",[username],[firstName],[lastName], function(err, rows){
    //         done(err, rows[0]);

    //     });

    });
    passport.use(
        'Sign Up',
        new LocalStrategy({
            firstNameField: 'firstName',
            lastNameField: 'lastName',
            slackUsernameField: 'slackUsername',
            EmployeeIDField: 'employeeID',
            officeIDField: 'officeID',
            emailField: 'email',
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },

        function(req, firstName, lastName, slackUsername, employeeID, officeID, email, username, password, done) {
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {

                if (err)

                    return done(err);

                if (rows.length) {

                    return done(null, false, req.flash('That username is already taken.'));

                } else {
                    var newUserMysql = {
                        firstName: firstName,
                        lastName: lastName,
                        slackUsername: slackUsername,
                        employeeID: employeeID,
                        officeID: officeID,
                        email: email,
                        username: username,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var insertQuery = "INSERT INTO users ( firstName, lastName, slackUsername, employeeID, officeID, email, username, password ) values (?,?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.firstName, newUserMysql.lastName, newUserMysql.slackUsername, newUserMysql.employeeID, newUserMysql.officeID, newUserMysql.username, newUserMysql.password],function(err, rows) {
                        newUserMysql.id = rows.insertId;
                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'Login',
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

                    return done(null, false, req.flash('loginMessage', 'No user found.')); 
                }

                if (!bcrypt.compareSync(password, rows[0].password))

                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                return done(null, rows[0]);

            });

        })

    );

};

