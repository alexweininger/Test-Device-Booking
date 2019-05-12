module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server/app");
var getUsers = require("../server/routes/users/getUsers");

describe("Tests if the server started successfully", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/helloWorld")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});

describe("test the /getUsers route that returns a json array of all users", () => {
  test("getUsers request returns OK", () => {
    return request(app)
      .post("/users")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("getUsers request returns a defined object", () => {
    return request(app)
      .post("/users")
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test("getUsers request returns a an array with a length equal 13", () => {
    return request(app)
      .post("/users")
      .then(response => {
        expect(response.body.length).toBe(13);
      });
  });
  test("getUsers request returns a value equal FirstName = Ainsley", () => {
    return request(app)
      .post("/users")
      .then(response => {
        expect(response.body[0].FirstName).toContain("Ainsley");
      });
  });
});
