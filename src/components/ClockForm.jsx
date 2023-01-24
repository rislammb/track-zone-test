import useForm from '../hooks/useForm';
import Modal from '../ui/Modal';
import InputGroup from './shared/InputGroup';

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
alert('submit',JSON.stringify(values));
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
    <Modal>
      <div>
      <button onClick={closeModal}>
        Close
      </button>

      <form onSubmit={e => handleSubmit(e, submit)}>
        <InputGroup value={state.title.value} error={state.title.error} label={'Clock Name'} name='title' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        <input value={state.timeZone.value} name='timeZone' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        {state.timeZone.error && <span>{state.timeZone.error}</span>}
        <input value={state.difference.value} name='difference' onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        {state.difference.error && <span>{state.difference.error}</span>}
        <button type='submit'>
          { openedClock ? 'Edit Clock' : 'Add Clock' }
        </button>
      </form>
      </div>
    </Modal>
  );
}

export default ClockForm; 
