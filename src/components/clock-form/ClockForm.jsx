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

const times = [{
  name: '+03:30',
  value: {title: '+03:30', 
  minutes: (3 * 60) + 30}
 },{
  name: '00:00',
  value: {title: '00:00', 
  minutes: 0}
 },
 {
  name: '-02:30',
  value: {title: '-02:30', 
  minutes: -((2 * 60) + 30)}
 },
 {
  name: '-04:00',
  value: {title: '-04:00', 
  minutes: -(4 * 60)}
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
        timeZone: JSON.stringify({title: 'UTC', 
  minutes: 0}),
        difference: JSON.stringify({title: '00:00', 
  minutes: 0}),
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
            {zones.map(zone => <option key={zone.name} value={JSON.stringify(zone.value)}>{zone.name}</option>)}
          </select>

          <select
            value={state.difference.value}
            error={state.difference.error}
            label={'Time Difference'}
            name='difference'
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {times.map(time => <option key={time.name} value={JSON.stringify(time.value)}>{time.name}</option>)}
          </select>
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
