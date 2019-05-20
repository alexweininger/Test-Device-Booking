module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server/app");

var nrOfDevices = 7;
var sNumber = "1vfxAZ1";

describe("test the /get_device route that returns a json array of all devices", () => {
  test("get_device request returns OK", () => {
    return request(app)
      .get("/get_device")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("get_device request returns a defined object", () => {
    return request(app)
      .get("/get_device")
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test(`get_device request returns a an array with a length equal ${nrOfDevices}`, async () => {
    const response = await request(app).get("/get_device");
    return expect(response.body.length).toBe(nrOfDevices);
  });

  test(`get_device request returns a value equal serial number = ${sNumber}`, () => {
    return request(app)
      .get(`/get_device/${sNumber}`)
      .then(response => {
        expect(response.body[0].Serial_Number).toBe(sNumber);
      });
  });
});
