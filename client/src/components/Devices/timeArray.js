exports.timeArray = date => {
  var h = date.getHours();
  var min = date.getMinutes();
  var time = [];

  min = (Math.ceil(min / 15) + 1) * 15;
  if (min > 60) {
    min = 15;
    h++;
  }
  if (min == 60) {
    min = 0;
    h++;
  }
  while (h < 24) {
    if (min >= 60) {
      min = 0;
      h++;
    }
    var d = new Date();
    d.setHours(h);
    d.setMinutes(min);
    time.push(d);
    min += 15;
  }
  return time;
};
