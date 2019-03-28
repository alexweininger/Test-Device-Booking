/**
 * dbms.js
 *
 * This file contains functions for accessing the MySQL database
 * which contains the Cheesecake order data.
 *
 */

exports.version = '0.0.1';


const mysql = require('mysql');
const async = require('async');

const host = '35.185.195.184'; // from GCloud instance (this may change)
const database = 'Users';
const user = 'student';
const password = 'student';
let dbclient;

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
exports.dbquery = (queryString, callback) => {
  let results = null;

  async.waterfall([

    // Step 1: Connect to the database
    function (callback) {
      console.log('\n** creating connection.');
      dbclient = mysql.createConnection({
        host,
        user,
        password,
        database,
      });

      dbclient.connect(callback);
    },

    // Step 2: Issue query
    function (results, callback) {
      console.log('\n** retrieving data');
      dbclient.query(queryString, callback);
    },

    // Step 3: Collect results
    function (rows, fields, callback) {
      console.log('\n** dumping data:');
      results = rows;
      console.log(`${rows}`);
      callback(null);
    },

  ],
  // waterfall cleanup function
  (err, res) => {
    if (err) {
      console.log('Database query failed.');
      console.log(err);
      callback(err, null);
    } else {
      console.log('Database query completed.');
      callback(false, results);
    }

    // close connection to database
    // dbclient.end();
  });
};
