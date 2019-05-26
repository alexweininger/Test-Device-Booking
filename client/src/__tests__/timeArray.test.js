const { timeArray_test } = require("../components/Devices/TestFunctions");

test("first time in timeArray when time is 10:54:30", () => {
  const date = new Date(2018, 11, 24, 10, 54, 30, 0);
  const time = timeArray_test(date, 1);
  expect(time[0].getHours().toString()).toEqual("11");
  expect(time[0].getMinutes().toString()).toEqual("15");
});

test("first time in timeArray when time is 09:01:10", () => {
  const date = new Date(2015, 5, 12, 9, 1, 10, 0);
  const time = timeArray_test(date, 1);
  expect(time[0].getHours().toString()).toEqual("9");
  expect(time[0].getMinutes().toString()).toEqual("30");
});
