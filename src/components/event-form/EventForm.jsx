import useForm from '../../hooks/useForm';
import InputGroup from '../shared/InputGroup';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Form from '../ui/Form';
import Modal from '../ui/Modal';
import Title from '../ui/Title';

const initial = (openedEvent) => {
  return openedEvent
    ? {
        title: openedEvent.title,
        datetime: openedEvent.datetime,
      }
    : {
        title: '',
        datetime: '',
      };
};

const validate = (values) => {
  const errors = {};
  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      errors[key] = 'Invalid ' + key;
    }
  });

  return { valid: Object.keys(errors).length === 0, errors };
};

const EventForm = ({
  clockId,
  addEvent,
  editEvent,
  closeModal,
  openedEvent,
}) => {
  const { state, handleChange, handleFocus, handleBlur, handleSubmit } =
    useForm(initial(openedEvent), validate);

  const submit = (values) => {
    if (openedEvent) {
      editEvent(openedEvent.id, { ...values });
    } else {
      addEvent(clockId, { ...values });
    }
  };

  return (
    <Modal>
      <Card p={2}>
        <Title size={'sm'}>{openedEvent ? 'Edit Event' : 'Add Event'}</Title>
        <Form onSubmit={(e) => handleSubmit(e, submit)}>
          <InputGroup
            value={state.title.value}
            error={state.title.error}
            label={'Event Title'}
            name={state.title.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.datetime.value}
            error={state.datetime.error}
            label={'Date and Time'}
            type={'datetime-local'}
            name={state.datetime.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Flex jc={'end'}>
            <Button type='button' color={'warning'} onClick={closeModal}>
              Cancel
            </Button>
            <Button type='submit'>{openedEvent ? 'Edit' : 'Add'}</Button>
          </Flex>
        </Form>
      </Card>
    </Modal>
  );
};

export default EventForm;
