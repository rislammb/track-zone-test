import { useEffect, useState } from 'react';
import useApp from '../../hooks/useApp';
import ClockForm from '../clock-form/ClockForm';
import Clock from '../clock/Clock';
import EventForm from '../event-form/EventForm';

import Button from '../ui/Button';
import Flex from '../ui/Flex';
import Title from '../ui/Title';

const App = () => {
  const {
    state,
    addClock,
    editAdminClock,
    editClock,
    deleteClock,
    openModal,
    closeModal,
    addEvent,
    editEvent,
    deleteEvent,
  } = useApp();
  const [date, setDate] = useState(new Date().toUTCString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toUTCString());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='app'>
      <Title color={'primary'} size={'lg'} p={'12px 8px'}>
        Track Zone App
      </Title>
      <Flex ai={'start'}>
        <Clock
          adminClock={state.adminClock}
          date={date}
          openModal={openModal}
          events={state.events.filter(event => event.clockId === 'admin')}
          addEvent={addEvent}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
        <Button fs={'18px'} p={'8px 24px'} onClick={openModal}>
          Add Clock
        </Button>
      </Flex>
      <br />
      <Flex gap={'16px'}>
        {state.clocks.length > 0 &&
          state.clocks.map((clock) => (
            <Clock
              key={clock.id}
              adminClock={state.adminClock}
              clock={clock}
              date={date}
              openModal={openModal}
              deleteClock={deleteClock}
              events={state.events.filter(event => event.clockId === clockId)}
              addEvent={addEvent}
              editEvent={editEvent}
              deleteEvent={deleteEvent}
            />
          ))}
      </Flex>

      {state.open && state.open = 'event' ? (
        <EventForm
          addEvent={addEvent}
          editEvent={editEvent}
          closeModal={closeModal}
          openedEvent={state.openedEvent}
        />
      ) : (
        <ClockForm
          addClock={addClock}
          editAdminClock={editAdminClock}
          editClock={editClock}
          closeModal={closeModal}
          openedClock={state.openedClock}
        />
      )}
    </div>
  );
};

export default App;
