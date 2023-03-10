import { format, formatDistance, subMinutes } from 'date-fns';
import { addZeroFrist, getAmPm, getHours, minutesFromUTC } from '../../utils';

import Button from '../ui/Button';
import Flex from '../ui/Flex';
import ListItem from '../ui/ListItem';
import Text from '../ui/Text';

// Event component for each single event
const Event = ({
  clockId,
  adminClock,
  clock,
  appDateTime,
  event,
  openModal,
  deleteEvent,
}) => {
  const time = new Date(event.datetime);

  // Click handler for delete event button
  const deleteEventFn = () => {
    if (window.confirm(`Are you want to delete event: '${event.title}'?`))
      deleteEvent(event.id);
  };

  return (
    <ListItem>
      <Text color={'warning'}>{event.title}</Text>
      <Flex jc={'space-between'} ai={'center'}>
        <Flex fd={'column'} gap={'0.05rem'}>
          <Text size={'sm'}>
            {format(time, 'dd MMM yyyy')} -{' '}
            {addZeroFrist(getHours(time.getHours()))}:
            {addZeroFrist(time.getMinutes())} {getAmPm(time.getHours())}
          </Text>
          <Text size={'sm'} color={'secondary'}>
            {formatDistance(
              subMinutes(
                subMinutes(time, time.getTimezoneOffset()),
                minutesFromUTC(clock ?? adminClock)
              ),
              new Date(appDateTime),
              {
                addSuffix: true,
              }
            )}
          </Text>
        </Flex>
        <Flex>
          <Button
            onClick={deleteEventFn}
            fs={'0.85rem'}
            p={'0.2rem 0.6rem'}
            color={'danger'}
          >
            Delete
          </Button>
          <Button
            onClick={() => openModal('event', clockId, event.id)}
            fs={'0.8rem'}
            p={'0.2rem 0.5rem'}
          >
            Edit
          </Button>
        </Flex>
      </Flex>
    </ListItem>
  );
};

export default Event;
