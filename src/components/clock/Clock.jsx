import { useEffect, useState } from 'react';

import useClock from '../../hooks/useClock';
import EventForm from '../event-form/EventForm';
import Event from '../event/Event';

import Button from '../ui/Button';
import Card from '../ui/Card';
import Flex from '../ui/Flex';
import Hr from '../ui/Hr';
import Text from '../ui/Text';
import Title from '../ui/Title';

const Clock = ({ adminClock, clock, openModal, deleteClock }) => {
  const {
    state,
    addEvent,
    editEvent,
    deleteEvent,
    openModal: openEventModal,
    closeModal,
  } = useClock();

  const [time, setTime] = useState({
    hours: new Date().getUTCHours(),
    minutes: new Date().getUTCMinutes(),
    seconds: new Date().getUTCSeconds(),
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime({
        hours: new Date().getUTCHours(),
        minutes: new Date().getUTCMinutes(),
        seconds: new Date().getUTCSeconds(),
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Card p={2} fb={'320px'} fg={'1'}>
      <Flex jc={'space-between'}>
        {clock && (
          <Button color={'danger'} onClick={() => deleteClock(clock.id)}>
            Delete
          </Button>
        )}
        <Button onClick={() => openModal(clock ? clock.id : 'admin')}>
          Edit
        </Button>
      </Flex>
      <Title size={'lg'} color={'primary'}>
        {time.hours} : {time.minutes} : {time.seconds}
      </Title>
      <Title size={'sm'}>{clock ? clock.title : adminClock.title}</Title>
      <Text ta={'center'}>{`${clock ? clock.timeZone : adminClock.timeZone}(${
        clock ? clock.difference : adminClock.difference
      })`}</Text>
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
