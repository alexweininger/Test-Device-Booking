module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const fetch = require("node-fetch");
const request = require("supertest");
const app = require("../server/app");
var getDevices = require("../server/routes/devices/get_availableDevice");

describe("test the /get_availableDevice route that returns a json array of all available devices", () => {
  test("get_device request returns OK", () => {
    return request(app)
      .get("/get_availableDevice")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("get_availableDevice request returns a defined object", () => {
    return request(app)
      .get("/get_availableDevice")
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test("get_availableDevice request returns a an array with a length equal 8", async () => {
    const response = await request(app).get("/get_availableDevice");
    return expect(response.body.length).toBe(8);
  });
});
