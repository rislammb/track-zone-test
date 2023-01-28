export const generateId = () => {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
  .toString(16);
  }
  return v4() + v4() + '-' + v4() + '-' + v4() + '-' + v4() + v4();
};

// export const addZeroFrist = (number) => {
 // return number > 9 ? `${number}` : `0${number}`;
// };

export const addMinutesFN = (dateObj, minutes) => {
  return new Date(new Date(dateObj).getTime() + minutes * 60 * 1000);
};

export const getHours = (hours) => {
  return hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
};

export const getAmPm = (hours) => {
  return hours > 11 ? 'pm' : 'am';
};

export const minutesFromUTC = (clock) => {
  return (
    JSON.parse(clock.timeZone)?.minutes + JSON.parse(clock.difference)?.minutes
  );
};
