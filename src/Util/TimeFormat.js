export const displayTimeMMSS = (timeSecond) => {
  let sec = Math.floor(timeSecond % 60);
  let min = Math.floor(timeSecond / 60);
  let sMinutes = `${min}`.padStart(2, "0");
  let sSeconds = `${sec % 60}`.padStart(2, "0");
  return sMinutes + ":" + sSeconds;
};
