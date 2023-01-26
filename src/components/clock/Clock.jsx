import { useEffect, useState } from 'react';
import { addMinutes, subMinutes, getHours, getMinutes, getSeconds } from 'date-fns'

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

  // const [time, setTime] = useState({
  //  hours: new Date().getUTCHours(),
   // minutes: new Date().getUTCMinutes(),
  //  seconds: new Date().getUTCSeconds(),
 // });

  const minutesFromUTC = JSON.parse(clock ? clock.timeZone: adminClock.timeZone)?.minutes + JSON.parse(clock ? clock.difference : adminClock.difference)?.minutes;
  const initial = minutesFromUTC > -1 ? addMinutes(new Date(), minutesFromUTC) : subMinutes(new Date(), minutesFromUTC);
  const [time, setTime] = useState(initial);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newDate = minutesFromUTC > -1 ? addMinutes(new Date(), minutesFromUTC) : subMinutes(new Date(), minutesFromUTC);
      setTime(newDate);
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
        { getHours(time) } : { getMinutes(time) } : { getSeconds(time) }
      </Title>
      <Title size={'sm'}>{clock ? clock.title : adminClock.title}</Title>
      <Text ta={'center'}>{JSON.parse(clock ? clock.timeZone : adminClock.timeZone).title}({
        JSON.parse(clock ? clock.difference : adminClock.difference).title
      })</Text>
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
