import { addMinutes, formatDistance, subMinutes } from 'date-fns';
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
            {formatDistance(
            addMinutes(subMinutes(time, time.getTimezoneOffset()), minutesFromUTC(clock ?? adminClock)),
            addMinutes(subMinutes(new Date(date), time.getTimezoneOffset()), minutesFromUTC(adminClock)),
            {
              addSuffix: true,
            }
          )}
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
