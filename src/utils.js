/**
 * Generate a unique id string
 * @returns {string} unique id
 */
export const generateId = () => {
  const v4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000).toString(16);
  };
  return v4() + v4() + '-' + v4() + '-' + v4() + '-' + v4() + v4();
};

/**
 * Deeply clone a object and return fully new object
 * @param {object} obj
 * @returns {object} new object
 */
export const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

/**
 * Add zero before a number, if number less than 10
 * @param {number} number
 * @returns {string} string of number
 */
export const addZeroFrist = (number) => {
  return number > 9 ? `${number}` : `0${number}`;
};

/**
 * Substract hours by 12, if hours greater than 12
 * @param {number} hours
 * @returns {number} am, pm based hours
 */
export const getHours = (hours) => {
  return hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
};

/**
 * Get Am or Pm from hours
 * @param {number} hours
 * @returns {string} am or pm
 */
export const getAmPm = (hours) => {
  return hours > 11 ? 'pm' : 'am';
};

/**
 * Get a clock info and return minutes difference from UTC time
 * @param {{difference: string, id: string | undefined, timeZone: string,title:string}} clock
 * @returns {number} minutes from UTC
 */
export const minutesFromUTC = (clock) => {
  return (
    JSON.parse(clock.timeZone)?.minutes + JSON.parse(clock.difference)?.minutes
  );
};

/**
 * Receive a object of input items with value and return state object
 * @param {object} obj
 * @returns {object} object for state
 */
export const mapFormInputsToState = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = {
      name: key,
      value: obj[key],
      error: '',
      touched: false,
      focused: false,
    };

    return acc;
  }, {});
};

/**
 * Receive a state object and return object with value
 * @param {object} state
 * @returns {object} values
 */
export const mapFormStateToValues = (state) => {
  return Object.keys(state).reduce((acc, key) => {
    acc[key] = state[key].value;

    return acc;
  }, {});
};
