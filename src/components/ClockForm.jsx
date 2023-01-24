import useForm from '../hooks/useForm';

const validate = values => {
  const errors = {};
  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] = 'Invalid ' + key; 
    }
  })

  return { valid: Object.keys(errors).length === 0, errors  }
};

const ClockForm = ({ addClock, editAdminClock, editClock, closeModal, openedClock }) => {
  const initial = openedClock ? {
    title: openedClock.title,
    timeZone: openedClock.timeZone,
    difference: openedClock.difference
  } : {
    title: '',
    timeZone: '',
    difference: ''
  };

  const { state, handleChange, handleFocus, handleBlur, handleSubmit } = useForm(initial, validate);

  const submit = (values) => {
    if (openedClock) {
      if(openedClock.id){
        editClock({ ...values });
      } else{
        editAdminClock({ ...values });
      }
    } else {
      addClock({ ...values });
    }
  };

  return (
    <div>
      <button onClick={closeModal}>
        Close
      </button>

      <form onSubmit={e => handleSubmit(e, submit)}>
        <input value={state.title.value} name='title' onChange={handleChange} />
        <input value={state.timeZone.value} name='timeZone' onChange={handleChange} />
        <input value={state.difference.value} name='difference' onChange={handleChange} />

        <button type='submit'>
          { openedClock ? 'Edit Clock' : 'Add Clock' }
        </button>
      </form>
    </div>
  );
}

export default ClockForm; 
