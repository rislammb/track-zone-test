import { addMinutes, format,  formatDistance } from 'date-fns';
import { addZeroFrist, getAmPm, getHours, minutesFromUTC } from '../../utils';

import useClock from '../../hooks/useClock';
import EventForm from '../event-form/EventForm';
import Event from '../event/Event';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Hr from '../ui/Hr';
import Span from '../ui/Span';
import Text from '../ui/Text';
import Title from '../ui/Title';

const Clock = ({ adminClock, clock, date, openModal, deleteClock }) => {
  const {
    state,
    addEvent,
    editEvent,
    deleteEvent,
    openModal: openEventModal,
    closeModal,
  } = useClock();

  const time = addMinutes(new Date(date), minutesFromUTC(clock ?? adminClock));

  const [, day, month, year] = time.toUTCString().split(' ');

  return (
    <Card p={2} fb={'320px'} mw={'450px'} fg={'1'}>
      <Flex jc={'space-between'}>
        {clock ? (
          <Button color={'danger'} onClick={() => deleteClock(clock.id)}>
            Delete
          </Button>
        ) : (
          <span></span>
        )}
        <Button onClick={() => openModal(clock ? clock.id : 'admin')}>
          Edit
        </Button>
      </Flex>
      <Title size={'xl'} color={'primary'}>
        {addZeroFrist(getHours(time))}:{addZeroFrist(time.getUTCMinutes())}
        <Span fs={'24px'}>
          :{addZeroFrist(time.getUTCSeconds())} {getAmPm(time)}
        </Span>
      </Title>
      <Title size={'sm'}>{clock ? clock.title : adminClock.title}</Title>
      <Text ta={'center'}>
        {`${day} ${month} ${year}`} - {' '}
        {JSON.parse(clock ? clock.timeZone : adminClock.timeZone)?.title}(
        {JSON.parse(clock ? clock.difference : adminClock.difference)?.title})
      </Text>
      {clock && (
        <Text size={'sm'} ta={'center'} color={'secondary'}>
          {formatDistance(
            addMinutes(new Date(date), minutesFromUTC(clock)),
            addMinutes(new Date(date), minutesFromUTC(adminClock)),
            {
              addSuffix: true,
            }
          )}
        </Text>
      )}
      <br />
      <Hr />
      <Flex jc={'space-between'} m={'8px 0px'} ai={'center'}>
        <Text>Events:</Text>
        <Button onClick={openEventModal}>Add</Button>
      </Flex>

      <Flex fd={'column'}>
        {state.events.length > 0 &&
          state.events.map((event) => (
            <Event
              key={event.id}
              event={event}
              openModal={openEventModal}
              deleteEvent={deleteEvent}
            />
          ))}
      </Flex>

      {state.open && (
        <EventForm
          addEvent={addEvent}
          editEvent={editEvent}
          closeModal={closeModal}
          openedEvent={state.openedEvent}
        />
      )}
    </Card>
  );
};

export default Clock;
