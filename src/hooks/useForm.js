import { useState } from 'react';

/**
 * @callback validateCallback
 * @param {object} values
 * @returns {{valid: boolean, errors: object}}
 */

/**
 *
 * @param {object} initial
 * @param {validateCallback} validate
 * @returns {object}
 */
const useForm = (initial, validate) => {
  const [state, setState] = useState(mapObjToState(initial));

  // change handler for input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));

    oldState[name].error = '';
    oldState[name].value = value;

    setState(oldState);
  };

  // focus handler for input
  const handleFocus = (e) => {
    const { name } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));

    oldState[name].touched = true;
    oldState[name].focused = true;

    setState(oldState);
  };

  // blur handler for input
  const handleBlur = (e) => {
    const { name } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[name].focused = false;

    const { errors } = validate(mapStateToValues(oldState));

    if (errors[name] && oldState[name].touched) {
      oldState[name].error = errors[name];
    }

    setState(oldState);
  };

  // submit handler for input
  const handleSubmit = (e, cb) => {
    e.preventDefault();

    const oldState = JSON.parse(JSON.stringify(state));

    const values = mapStateToValues(oldState);
    const { valid, errors } = validate(values);

    if (valid) {
      cb(values);
    } else {
      Object.keys(errors).forEach((key) => {
        oldState[key].error = errors[key];
      });

      setState(oldState);
    }
  };

  return { state, handleChange, handleFocus, handleBlur, handleSubmit };
};

export default useForm;

/**
 * Receive a object of input items with value and return state object
 * @param {object} obj
 * @returns {object} state
 */
const mapObjToState = (obj) => {
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
const mapStateToValues = (state) => {
  return Object.keys(state).reduce((acc, key) => {
    acc[key] = state[key].value;

    return acc;
  }, {});
};
