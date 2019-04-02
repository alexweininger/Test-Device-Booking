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
        'SignUp',
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

        function(req, firstName, lastName, slackUsername, email, slackUsername, id, officeId, role, password, done) {
            connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows) {

                if (err)

                    return done(err);

                if (rows.length) {

                    return done(null, false, req.flash('That username is already taken.'));

                } else {
                    var newUserMysql = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        slackUsername: slackUsername,
                        id: id,
                        officeId: officeId,
                        role: role,
                        password: bcrypt.hashSync(password, null, null)
                    };

                    var insertQuery = "INSERT INTO Users ( firstName, lastName, email, slackUsername, id, officeId, role, password ) values (?,?,?,?,?,?,?,?)";

                    connection.query(insertQuery,[newUserMysql.firstName, newUserMysql.lastName, newUserMysql.slackUsername, newUserMysql.employeeID, newUserMysql.officeID, newUserMysql.username, newUserMysql.password],function(err, rows) {
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

        function(req, email, password, done) {
            console.log('username (email): ', email);
            console.log('password: ' + password);
            connection.query("SELECT * FROM Users WHERE email = '" + email + "';", function(err, rows){
                console.log("Rows: " + rows);
                
                if (err)

                    return done(err);

                if (!rows.length) {
                    console.log('NO USERS FOUND');
                    
                    return done(null, false, req.flash('loginMessage', 'No user found.')); 
                }
                console.log('password: ' + password + ' rows: ' + rows[0].password);
                let cryptedpassword = bcrypt.hashSync(rows[0].password, null, null);
                if (!bcrypt.compareSync(password, cryptedpassword)) {
                    console.log('password is incorrect');
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                    
                console.log('successsss');
                return done(null, rows[0]);

            });

        })

    );

};

