module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const fetch = require("node-fetch");
const request = require("supertest");
const app = require("../server/app");
var getDevices = require("../server/routes/devices/get_device");

describe("test the /get_device route that returns a json array of all devices", () => {
  test("get_device request returns OK", () => {
    return request(app)
      .get("/get_device")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  /*describe("test the /getUsers route that returns a json array of all users", () => {
    test("getUsers request returns OK", () => {
      var newDate = new Date();
      var expectedDate = [];
      var date = getDate(newDate);
      expect(date).toBe(expectedDate);*/

  test("get_device request returns a defined object", () => {
    return request(app)
      .get("/get_device")
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test("get_device request returns a an array with a length equal 7", async () => {
    const response = await request(app).get("/get_device");
    return expect(response.body.length).toBe(7);
    //response.on("data", function(chunk) {});
  });
  test("get_device request returns a an array with a length of at least 7", () => {
    return request(app)
      .get("/get_device")
      .then(response => {
        expect(response.body.length).toBeGreaterThanOrEqual(7);
      });
  });
  test("get_device request returns a value equal Brand = Samsung", () => {
    return request(app)
      .get("/get_device")
      .then(response => {
        expect(response.body[1].Brand).toContain("Samsung");
      });
  });
});
