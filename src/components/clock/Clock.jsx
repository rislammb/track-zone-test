import { addMinutes, formatDistance } from 'date-fns';
import { addZeroFrist, getAmPm, getHours, minutesFromUTC } from '../../utils';

import Event from '../event/Event';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Hr from '../ui/Hr';
import List from '../ui/List';
import Span from '../ui/Span';
import Text from '../ui/Text';
import Title from '../ui/Title';

// Clock component for each single clock
const Clock = ({
  appDateTime,
  adminClock,
  clock,
  openModal,
  deleteClock,
  events,
  deleteEvent,
}) => {
  // Time from app datetime based on clock time zone
  const time = addMinutes(
    new Date(appDateTime),
    minutesFromUTC(clock ?? adminClock)
  );

  // Array destructure day month and from UTC string
  const [, day, month, year] = time.toUTCString().split(' ');

  // Click handler for delete clock button
  const deleteClockFn = () => {
    if (window.confirm(`Are you want to delete clock: '${clock.title}'?`))
      deleteClock(clock.id);
  };

  return (
    <Card p={2} fb={'320px'} mw={'450px'} fg={'1'}>
      <Flex jc={'space-between'}>
        {clock ? (
          <Button color={'danger'} onClick={deleteClockFn}>
            Delete
          </Button>
        ) : (
          <span></span>
        )}
        <Button onClick={() => openModal('clock', clock ? clock.id : 'admin')}>
          Edit
        </Button>
      </Flex>
      <Title size={'xl'} color={'primary'}>
        {addZeroFrist(getHours(time.getUTCHours()))}:
        {addZeroFrist(time.getUTCMinutes())}
        <Span fs={'1.3rem'}>
          :{addZeroFrist(time.getUTCSeconds())} {getAmPm(time.getUTCHours())}
        </Span>
      </Title>
      <Title size={'sm'}>{clock ? clock.title : adminClock.title}</Title>
      <Text ta={'center'}>
        {`${day} ${month} ${year}`} -{' '}
        {JSON.parse(clock ? clock.timeZone : adminClock.timeZone)?.title}(
        {JSON.parse(clock ? clock.difference : adminClock.difference)?.title})
      </Text>
      {clock && (
        <Text size={'sm'} ta={'center'} color={'secondary'}>
          {formatDistance(
            addMinutes(new Date(appDateTime), minutesFromUTC(adminClock)),
            addMinutes(new Date(appDateTime), minutesFromUTC(clock)),
            {
              addSuffix: true,
            }
          )}
        </Text>
      )}
      <Hr />
      <Flex jc={'space-between'} m={'0.25rem 0'} ai={'center'}>
        {events?.length > 0 ? (
          <Text size={'lg'} style={{ borderBottom: '1px solid #4a4a4a' }}>
            Events:
          </Text>
        ) : (
          <span></span>
        )}
        <Button onClick={() => openModal('event', clock ? clock.id : 'admin')}>
          Add Event
        </Button>
      </Flex>

      <List>
        {events?.length > 0 &&
          events.map((event) => (
            <Event
              clockId={clock ? clock.id : 'admin'}
              adminClock={adminClock}
              clock={clock}
              appDateTime={appDateTime}
              key={event.id}
              event={event}
              openModal={openModal}
              deleteEvent={deleteEvent}
            />
          ))}
      </List>
    </Card>
  );
};

export default Clock;
