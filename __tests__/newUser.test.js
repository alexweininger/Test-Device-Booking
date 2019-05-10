module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});

const request = require("supertest");
const app = require("../server/app");
var newUser = require("../server/routes/users/newUser");

describe("test the isValidUser function", () => {
  let userMissingEmail = {
    FirstName: "John",
    LastName: "Doe",
    OfficeId: "1",
    ID: "1234",
    Role: "0",
    Password: "a;lskdjf"
  };

  test("isValidUser returns an error that says the user object is missing the email property.", () => {
    console.log(newUser.isValidUser(userMissingEmail));
    expect(newUser.isValidUser(userMissingEmail)).toEqual(
      expect.stringContaining("Email")
    );
  });

  let validUser = {
    FirstName: "John",
    LastName: "Doe",
    Email: "john.doe@hotmail.com",
    OfficeId: "1",
    ID: "1234",
    Role: "0",
    Password: "aksldj"
  };

  test("isValidUser returns no error string.", () => {
    console.log(newUser.isValidUser(userMissingEmail));
    expect(newUser.isValidUser(validUser)).toBeUndefined();
  });
});

describe("test the new user route to add a user to the database", () => {
  let userMissingEmail = {
    FirstName: "test",
    LastName: "test",
    OfficeId: "1",
    ID: "453",
    Role: "0",
    Password: "*******"
  };

  test("/new_user post request with invalid user in the body returns a 400 status.", () => {
    return request(app)
      .post("/new_user")
      .send(userMissingEmail)
      .then(response => {
        expect(response.statusCode).toBe(400);
      });
  });

  let validUser = {
    FirstName: "test2",
    LastName: "test2",
    Email: "test2.tes2t@hotmail.com",
    OfficeId: "1",
    ID: "13370",
    Role: "0",
    Password: "********"
  };

  test("/new_user post request with a valid user in body returns a 200 status.", () => {
    return request(app)
      .post("/new_user")
      .send(validUser)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
