import timeDifferences from '../../data/timeDifferences';
import timeZones from '../../data/timeZones';
import useForm from '../../hooks/useForm';
import InputGroup from '../shared/InputGroup';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Form from '../ui/Form';
import Label from '../ui/Label';
import Modal from '../ui/Modal';
import Option from '../ui/Option';
import Select from '../ui/Select';
import Title from '../ui/Title';

/**
 * Get initial state for form
 * @param {object} openedClock
 * @returns object
 */
const initial = (openedClock) =>
  openedClock
    ? {
        title: openedClock.title,
        timeZone: openedClock.timeZone,
        difference: openedClock.difference,
      }
    : {
        title: '',
        timeZone: JSON.stringify({ title: 'UTC', minutes: 0 }),
        difference: JSON.stringify({ title: '00:00', minutes: 0 }),
      };

/**
 * Validate a form values
 * @param {object} values
 * @returns {{valid: boolean, errors: object}}
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

const ClockForm = ({
  addClock,
  editAdminClock,
  editClock,
  closeModal,
  openedClock,
}) => {
  const { state, handleChange, handleFocus, handleBlur, handleSubmit } =
    useForm(initial(openedClock), validate);

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
      <Card fb={'320px'} p={2} bc={'#1a1a1a'}>
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

          <Label>Time Zone</Label>
          <Select
            value={state.timeZone.value}
            name='timeZone'
            onChange={handleChange}
          >
            {timeZones.map((zone) => (
              <Option key={zone.name} value={JSON.stringify(zone.value)}>
                {zone.name}
              </Option>
            ))}
          </Select>

          <Label>Time Difference</Label>
          <Select
            value={state.difference.value}
            name='difference'
            onChange={handleChange}
          >
            {timeDifferences.map((time) => (
              <Option key={time.name} value={JSON.stringify(time.value)}>
                {time.name}
              </Option>
            ))}
          </Select>
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
