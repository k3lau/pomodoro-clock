export const displayTimeMMSS = (timeSecond) => {
  let sec = Math.floor(timeSecond % 60);
  let min = Math.floor(timeSecond / 60);
  let sMinutes = `${min}`.padStart(2, "0");
  let sSeconds = `${sec % 60}`.padStart(2, "0");
  return sMinutes + ":" + sSeconds;
};

export const getSecondsFromHHMMSS = (value) => {
  const [str1, str2] = value.split(":");

  const val1 = Number(str1);
  const val2 = Number(str2);

  if (!isNaN(val1) && isNaN(val2)) {
  // seconds
    return val1;
  }

  if (!isNaN(val1) && !isNaN(val2)) {
  // minutes * 60 + seconds
    return val1 * 60 + val2;
  }

  return 0;
};

export const secondsToHHMMSS = (secs) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;

  return [minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== "00" || index > 0).join(":");
};