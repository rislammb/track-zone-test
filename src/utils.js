/**
 * Generate a unique id string
 * @returns {string}
 */
export const generateId = () => {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16);
  };
  return v4() + v4() + '-' + v4() + '-' + v4() + '-' + v4() + v4();
};

/**
 * Add zero before a number, if number less than 10
 * @param {number} number
 * @returns {string}
 */
export const addZeroFrist = (number) => {
  return number > 9 ? `${number}` : `0${number}`;
};

/**
 * Substract hours by 12, if hours greater than 12
 * @param {number} hours
 * @returns {number}
 */
export const getHours = (hours) => {
  return hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
};

/**
 * Get Am or Pm from hours
 * @param {number} hours
 * @returns {string}
 */
export const getAmPm = (hours) => {
  return hours > 11 ? 'pm' : 'am';
};

/**
 * Get a clock info and return minutes difference from UTC time
 * @param {{difference: string, id: string | undefined, timeZone: string,title:string}} clock
 * @returns {number}
 */
export const minutesFromUTC = (clock) => {
  return (
    JSON.parse(clock.timeZone)?.minutes + JSON.parse(clock.difference)?.minutes
  );
};
