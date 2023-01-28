import { addMinutes } from 'date-fns';
import { addZeroFrist, getAmPm, getHours, minutesFromUTC } from '../../utils';

import Button from '../ui/Button';
import Flex from '../ui/Flex';
import Text from '../ui/Text';

const Event = ({
  clockId,
  adminClock,
  clock,
  date,
  event,
  openModal,
  deleteEvent,
}) => {
  const time = new Date(event.datetime);
  const [, day, month, year] = time.toUTCString().split(' ');

  const getTimeDistance = () => {
    const eventTime = addMinutes(
      time,
      clock ? minutesFromUTC(clock) : minutesFromUTC(adminClock)
    ).getTime();

    const adminTime = addMinutes(
      new Date(date),
      minutesFromUTC(adminClock)
    ).getTime();

    let minutes =
      (eventTime - adminTime) / 1000 / 60 - time.getTimezoneOffset();

    minutes =
      minutes -
      minutesFromUTC(adminClock) -
      (clock ? minutesFromUTC(clock) : minutesFromUTC(adminClock));

    let result = '';
    if (minutes > 0) {
      if (minutes > 60) {
        result = `${Math.floor(minutes / 60)} hours and ${Math.floor(
          minutes % 60
        )} minutes ahead`;
      } else {
        result = `${Math.floor(minutes)} minutes ahead`;
      }
    } else if (minutes === 0) {
      result = 'in this time';
    } else {
      if (minutes > -60) {
        result = `${Math.abs(Math.floor(minutes))} minutes ago`;
      } else {
        result = `${Math.abs(Math.floor(minutes / 60))} hours and ${Math.abs(
          Math.floor(minutes % 60)
        )} minutes ago`;
      }
    }
    return result;
  };

  return (
    <Flex fd={'column'}>
      <Text color={'warning'}>{event.title}</Text>

      <Flex jc={'space-between'} ai={'center'}>
        <Flex fd={'column'}>
          <Text p={'0px'} size={'sm'}>
            {`${day} ${month} ${year}`} -{' '}
            {addZeroFrist(getHours(time.getHours()))}:
            {addZeroFrist(time.getMinutes())} {getAmPm(time.getHours())}
          </Text>
          <Text p={'0px'} size={'sm'}>
            {getTimeDistance()}
          </Text>
        </Flex>
        <Flex>
          <Button
            onClick={() => deleteEvent(event.id)}
            fs={'13px'}
            p={'3px 8px'}
            color={'danger'}
          >
            Delete
          </Button>
          <Button
            onClick={() => openModal('event', clockId, event.id)}
            fs={'13px'}
            p={'3px 8px'}
          >
            Edit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Event;
