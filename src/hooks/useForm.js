import { useState } from 'react'; 

const useForm = (initial, validate) => {
  const [state, setState] = useState(mapObjToState(initial));

  const handleChange = e => {
    const { name, value } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));

    oldState[name].error = '';
    oldState[name].value = value;

    setState(oldState);
  };

  const handleFocus = e => {
    const { name } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));

    oldState[name].touched = true;
    oldState[name].focused = true;

    setState(oldState);
  };

  const handleBlur = e => {
    const { name } = e.target;
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[name].focused = false;

    const { errors } = validate(mapStateToValues(oldState));

    if (errors[name] && oldState[name].touched) {
      oldState[name].error = errors[name];
    }

    setState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();

    const values = mapStateToValues(state);
    const { valid, errors } = validate(values);

    if (!valid) {
      const oldState = JSON.parse(JSON.stringify(state));

      Object.keys(errors).forEach(key => {
        oldState[key].error = errors[key]
      });

      setState(oldState);
    }
    cb(values);
  };

  return { state, handleChange, handleFocus, handleBlur, handleSubmit } 
}

export default useForm; 

const mapObjToState = obj => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = {
      value: obj[key],
      error: '',
      touched: false,
      focused: false,
    };

    return acc; 
  }, {});
};

const mapStateToValues = state => {
  return Object.keys(state).reduce((acc, key) => {
    acc[key] = state[key];

    return acc; 
  }, {});
};
