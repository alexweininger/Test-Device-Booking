const bodyParser = require("body-parser");
const express = require("express");
const dbms = require("../dbms");
const router = express.Router();

// parse any type of request using bodyParser.json
router.use(bodyParser.json({ type: "*/*" }));

// Handles requests to create a new user.
router.post("/", (req, res) => {
  const user = req.body;

  const err = isValidUser(user);

  if (err) {
    res.status(400).send(err);
  } else {
    if (user.Role === undefined) {
      user.Role = 0;
    }

    const insert =
      "INSERT INTO atbl_Users (FirstName, LastName, Email, SlackUsername, ID, OfficeID, Role, Password)";
    const values = ` VALUES ('${user.FirstName}', '${user.LastName}', '${
      user.Email
    }', '${user.SlackUsername}', '${user.ID}', '${user.OfficeID}', '${
      user.Role
    }', '${user.Password}');`;
    dbms.dbquery(insert + values, (err, results) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).send("User added successfully.");
      }
    });
  }
});

// validates that the initial user profile is set up
function isValidUser(user) {
  if (!user) {
    return "User is not defined.";
  }
  const keys = ["LastName", "FirstName", "Email", "ID", "OfficeId", "Password"];
  let err;
  keys.forEach(key => {
    if (!user[key]) {
      err = `user.${key} is not defined.`;
    }
  });
  return err;
}

// user object:
// {
// lastName: '',
// firstName: '',
// slackUsername: '',
// employID: '',
// officeID: '',
// username: '',
// password: ''
// }
//

module.exports = router;
