import useForm from '../../hooks/useForm';
import InputGroup from '../shared/InputGroup';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Form from '../ui/Form';
import Modal from '../ui/Modal';
import Title from '../ui/Title';

const zones = [{
  name: 'UTC',
  value: {title: 'UTC', 
  minutes: 0}
 },{
  name: 'GMT',
  value: {title: 'GMT', 
  minutes: 0}
 },
 {
  name: 'IST',
  value: {title: 'IST', 
  minutes: (5 * 60) + 30}
 },
 {
  name: 'PST',
  value: {title: 'PST', 
  minutes: -(8 * 60)}
 }
];

const validate = (values) => {
  const errors = {};
  Object.keys(values).forEach((key) => {
    if (!values[key]) {
      errors[key] = 'Invalid ' + key;
    }
  });

  return { valid: Object.keys(errors).length === 0, errors };
};

const ClockForm = ({
  addClock,
  editAdminClock,
  editClock,
  closeModal,
  openedClock,
}) => {
  const initial = openedClock
    ? {
        title: openedClock.title,
        timeZone: openedClock.timeZone,
        difference: openedClock.difference,
      }
    : {
        title: '',
        timeZone: {title: 'UTC', 
  minutes: 0},
        difference: '00:00',
      };

  const { state, handleChange, handleFocus, handleBlur, handleSubmit } =
    useForm(initial, validate);

  const submit = (values) => {
    if (openedClock) {
      if (openedClock.id) {
        editClock(openedClock.id, { ...values });
      } else {
        editAdminClock({ ...values });
      }
    } else {
      addClock({ ...values });
    }
  };

  return (
    <Modal>
      <Card fb={'320px'} p={2}>
        <Title>{openedClock ? 'Edit Clock' : 'Add Clock'}</Title>
        <Form onSubmit={(e) => handleSubmit(e, submit)}>
          <InputGroup
            value={state.title.value}
            error={state.title.error}
            label={'Clock Name'}
            name='title'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <select
            value={state.timeZone.value}
            error={state.timeZone.error}
            label={'Time Zone'}
            name='timeZone'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
          {zones.map(zone => <option value={zone.value}>{zone.name}</option>)}
          </select>
          <InputGroup
            value={state.difference.value}
            error={state.difference.error}
            label={'Time Difference'}
            name='difference'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          <Flex jc={'end'}>
            <Button type='button' color={'warning'} onClick={closeModal}>
              Cancel
            </Button>
            <Button color={'primary'} type='submit'>
              {openedClock ? 'Edit Clock' : 'Add Clock'}
            </Button>
          </Flex>
        </Form>
      </Card>
    </Modal>
  );
};

export default ClockForm;
