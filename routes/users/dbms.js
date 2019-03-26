/**
 * dbms.js
 *
 * This file contains functions for accessing the MySQL database
 * which contains the Cheesecake order data.
 *
 */

exports.version = '0.0.1';


var mysql = require('mysql'),
    async = require('async');

var host = '35.185.195.184';  //from GCloud instance (this may change)
var database = 'Users';
var user = 'student';
var password = 'student';
var dbclient;

/**
 * dbquery
 *
 * performs a given SQL query on the database and returns the results
 * to the caller
 *
 * @param query     the query to perform (e.g., 'SELECT * FROM ...')
 * @param callback  the callback function to call with two values
 *                   error - (or 'false' if none)
 *                   results - as given by the mysql client
 */
exports.dbquery = function(query_str, callback) {

    var results = null;

    async.waterfall([

        //Step 1: Connect to the database
        function (callback) {
            console.log('\n** creating connection.');
            dbclient = mysql.createConnection({
                host: host,
                user: user,
                password: password,
                database: database,
            });

            dbclient.connect(callback);
        },

        //Step 2: Issue query
        function (results, callback) {
            console.log('\n** retrieving data');
            dbclient.query(query_str, callback);
        },

        //Step 3: Collect results
        function (rows, fields, callback) {
            console.log('\n** dumping data:');
            results = rows;
            console.log('' + rows);
            callback(null);
        }

    ],
    // waterfall cleanup function
    function (err, res) {
        if (err) {
            console.log('Database query failed.');
            console.log(err);
            callback(err, null);
        } else {
            console.log('Database query completed.');
            callback(false, results);
        }

        //close connection to database
        // dbclient.end();

    });

}
