export const addZeroFrist = (number) => {
  return number > 9 ? `${number}` : `0${number}`;
};

export const getHours = (time) => {
  return time.getUTCHours() === 0
    ? 12
    : time.getUTCHours() > 12
    ? time.getUTCHours() - 12
    : time.getUTCHours();
};

export const getAmPm = (time) => {
  return time.getUTCHours() > 11 ? 'pm' : 'am';
};

export const getClockTime = (time) => {
  return `
    ${addZeroFrist(getHours(time))}:${addZeroFrist(
    time.getUTCMinutes()
  )}:${addZeroFrist(time.getUTCSeconds())} 
    ${getAmPm(time)}`;
};

export const minutesFromUTC = (clock) => {
  return (
    JSON.parse(clock.timeZone)?.minutes + JSON.parse(clock.difference)?.minutes
  );
};
