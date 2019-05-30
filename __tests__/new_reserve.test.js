module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server/app");
const db = require("../server/routes/dbmsTest");
var dateFormat = require("dateformat");

var date = new Date();

var Id = 30037972;
var userId = 2;
var startDate = dateFormat(date, "yyyy-mm-dd' 'HH:mm:ss");
var finishDate = dateFormat(date, "yyyy-mm-dd' 'HH:mm:ss");
var tempStartDate = startDate;
var tempFinishDate = finishDate;

describe("test the /new_reserve route that inserts new date", () => {
  beforeAll(async () => {
    await db.dbqueryPromise(
      "CREATE TABLE atbl_Booking (Number SERIAL PRIMARY KEY, StartDate DATETIME, FinishDate DATETIME, fk_user_id_reg INT, fk_device_ser_nr INT)"
    );
  });

  beforeAll(async () => {
    // seed with some data
    await db.dbqueryPromise(
      `INSERT INTO atbl_Booking (StartDate, FinishDate, fk_user_id_reg, fk_device_ser_nr) VALUES (CONVERT_TZ(now(),'+00:00','+3:00'), CONVERT_TZ(now(),'+00:00','+3:00'), RAND()*(10-5)+5, RAND()*10000000), (CONVERT_TZ(now(),'+00:00','+3:00'), CONVERT_TZ(now(),'+00:00','+3:00'), RAND()*(10-5)+5, RAND()*10000000), (CONVERT_TZ(now(),'+00:00','+3:00'), CONVERT_TZ(now(),'+00:00','+3:00'), RAND()*(10-5)+5, 0030037972)`
    );
  });

  afterAll(async () => {
    // seed with some data
    await db.dbqueryPromise(`DROP TABLE atbl_Booking`);
  });

  test(`POST /new_reserve (device ID=${Id}) inserted new StartDate = ${startDate} and FinishDate = ${finishDate}`, async () => {
    return await request(app)
      .post("/new_reserve")
      .send({
        startDate,
        finishDate,
        userID: userId,
        sNumber: Id
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test(`get_dayBooking request returns a an array with a length equal 1+1(new added time = ${tempStartDate}, device ID = ${Id})`, async () => {
    const response = await request(app).get(`/get_dayBookings/${Id}`);
    return expect(response.body.length).toBe(2);
  });

  test(`get_dayBooking request returns an object (new added time (device ID = ${Id}, user ID = ${userId})) equal StartDate = ${tempStartDate}`, () => {
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        var start = response.body[0].StartDate;
        var finish = response.body[0].FinishDate;
        expect(dateFormat(start, "UTC:yyyy-mm-dd' 'HH:mm:ss")).toBe(
          tempStartDate
        );
        expect(dateFormat(finish, "UTC:yyyy-mm-dd' 'HH:mm:ss")).toBe(
          tempFinishDate
        );
        expect(response.body[0].fk_user_id_reg).toBe(userId);
        expect(response.body[0].fk_device_ser_nr).toBe(Id);
      });
  });
});
