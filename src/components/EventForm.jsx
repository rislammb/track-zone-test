import useForm from '../hooks/useForm';
import Modal from '../ui/Modal';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Title from '../ui/Title';
import Form from '../ui/Form';
import InputGroup from './shared/InputGroup';
import Button from '../ui/Button';

const validate = values => {
  const errors = {};
  Object.keys(values).forEach(key => {
    if (!values[key]) {
      errors[key] = 'Invalid ' + key; 
    }
  })

  return { valid: Object.keys(errors).length === 0, errors  }
};

const EventForm = ({ addEvent, editEvent, closeModal, openedEvent }) => {
  const initial = openedEvent ? {
    title: openedEvent.title,
    date: openedEvent.date,
    time: openedEvent.time
  } : {
    title: '',
    date: '',
    time: ''
  };

  const { state, handleChange, handleFocus, handleBlur, handleSubmit } = useForm(initial, validate);

  const submit = (values) => {
    if (openedClock) {
      editEvent({ ...values });
    } else {
      addClock({ ...values });
    }
  };

  return (
    <Modal>
      <Card p={2}>
      <Title size={'sm'}>{ openedEvent ? 'Edit Event Form' : 'Add Event Form' }</Title>
      <Form onSubmit={e => handleSubmit(e, submit)}>
        <InputGroup value={state.title.value} error={state.title.error} label={'Event Title'} name={state.title.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        <InputGroup value={state.date.value} error={state.date.error} label={'Date'} name={state.date.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />
        <InputGroup value={state.time.value} error={state.time.error} label={'Time'} name={state.time.name} onChange={handleChange} onFocus={handleFocus} onBlur={handleBlur} />

       <Flex js={'flex-end'}>
        <Button type='button' color={'warning'} onClick={closeModal}>
          Cancel
        </Button>
        <Button type='submit'>
          { openedEvent ? 'Edit Event' : 'Add Event' }
        </Button>
       </Flex>
      </Form>
      </Card>
    </Modal>
  );
}

export default EventForm; 
