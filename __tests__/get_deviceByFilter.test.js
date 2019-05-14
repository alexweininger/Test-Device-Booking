module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const fetch = require("node-fetch");
const request = require("supertest");
const app = require("../server/app");
var getDevices = require("../server/routes/devices/get_deviceByFilter");

describe("test the get_deviceByFilter route that returns a json array of all available devices", () => {
  test("get_deviceByFilter request returns OK", () => {
    return request(app)
      .get("/get_deviceByFilter/WHERE atbl_Device.`Available`='1'")
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test("get_deviceByFilter request returns an array with a length equal 10 (available is true)", () => {
    return request(app)
      .get("/get_deviceByFilter/WHERE atbl_Device.`Available`='1'")
      .then(response => {
        expect(response.body.length).toBe(10);
      });
  });

  test("get_deviceByFilter request returns an array with a length equal 2 (brand is Samsung)", async () => {
    const response = await request(app).get(
      "/get_deviceByFilter/WHERE atbl_Device.`Brand`='Samsung'"
    );
    expect(response.body[0].Brand).toContain("Samsung");
    return expect(response.body.length).toBe(2);
  });
  test("get_deviceByFilter request returns an array with a lenght equal 5 (location is Kaunas) ", async () => {
    const response = await request(app).get(
      "/get_deviceByFilter/WHERE atbl_Office.`City`= 'Kaunas'"
    );
    return expect(response.body.length).toBe(5);
  });
});
