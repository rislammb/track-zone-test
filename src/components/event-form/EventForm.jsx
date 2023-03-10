import useForm from '../../hooks/useForm';
import InputGroup from '../shared/InputGroup';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Form from '../ui/Form';
import Modal from '../ui/Modal';
import Title from '../ui/Title';

/**
 * Set initial item and value for form
 * @param {object} openedEvent
 * @returns {object} initial item and value
 */
const initial = (openedEvent) =>
  openedEvent
    ? {
        title: openedEvent.title,
        datetime: openedEvent.datetime,
      }
    : {
        title: '',
        datetime: '',
      };

/**
 * Validate a form values
 * @param {object} values
 * @returns {{valid: boolean, errors: object}} validation info
 */
const validate = (values) => {
  const errors = {};
  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      errors[key] = 'Invalid ' + key;
    }
  });

  return { valid: Object.keys(errors).length === 0, errors };
};

// Form component for add or edit event
const EventForm = ({
  clockId,
  addEvent,
  editEvent,
  closeModal,
  openedEvent,
}) => {
  const { state, handleChange, handleFocus, handleBlur, handleSubmit } =
    useForm(initial(openedEvent), validate);

  /**
   * Finally submit form values
   * @param {object} values
   */
  const submit = (values) => {
    if (openedEvent) {
      editEvent(openedEvent.id, { ...values });
    } else {
      addEvent(clockId, { ...values });
    }
  };

  return (
    <Modal>
      <Card p={2} bc={'#1a1a1a'}>
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
            <Button color={'primary'} type='submit'>
              {openedEvent ? 'Edit' : 'Add'}
            </Button>
          </Flex>
        </Form>
      </Card>
    </Modal>
  );
};

export default EventForm;
