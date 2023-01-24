import { useState } from 'react'; 

const useForm = (initial, validate) => {
  const [state, setState] = useState(mapObjToState(initial));

  const handleChange = e => {
    
  };

  const handleFocus = e => {
    
  };

  const handleBlur = e => {
    
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { valid, errors } = validate(values) 
const values = mapStateToValues(state);

    cb(values)
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
