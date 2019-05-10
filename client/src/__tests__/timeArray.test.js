const { timeArray } = require("../components/Devices/BookDevice");

test("first time in timeArray", () => {
  const date = new Date(2018, 11, 24, 10, 54, 30, 0);
  const time = timeArray(date);
  expect(time[0].getHours().toString()).toEqual("11");
  expect(time[0].getMinutes().toString()).toEqual("15");
});

test("last time in timeArray", () => {
  const date = new Date(2018, 11, 24, 10, 54, 30, 0);
  const time = timeArray(date);
  expect(time[time.length - 1].getHours().toString()).toEqual("0");
  expect(time[time.length - 1].getMinutes().toString()).toEqual("0");
});
