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

  // Set a clock interval in use effect for time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date().toUTCString());
    }, 1000);

    // clear clock interval
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className='app'>
      <Title color={'primary'} size={'lg'} style={{ marginBottom: '0.8rem' }}>
        FSA Track Zone
      </Title>
      <Flex ai={'start'} gap={'1rem'}>
        <Clock
          adminClock={state.adminClock}
          date={date}
          openModal={openModal}
          closeModal={closeModal}
          events={state.events?.filter((event) => event.clockId === 'admin')}
          deleteEvent={deleteEvent}
        />
        <Button
          fs={'1.1rem'}
          p={'0.4rem 1.3rem'}
          onClick={() => openModal('clock')}
        >
          Add Clock
        </Button>
      </Flex>
      <br />
      <Flex gap={'1rem'}>
        {state.clocks.length > 0 &&
          state.clocks.map((clock) => (
            <Clock
              key={clock.id}
              adminClock={state.adminClock}
              clock={clock}
              date={date}
              openModal={openModal}
              deleteClock={deleteClock}
              events={state.events?.filter(
                (event) => event.clockId === clock.id
              )}
              deleteEvent={deleteEvent}
            />
          ))}
      </Flex>

      {state.openFor &&
        (state.openFor === 'clock' ? (
          <ClockForm
            addClock={addClock}
            editAdminClock={editAdminClock}
            editClock={editClock}
            closeModal={closeModal}
            openedClock={state.openedClock}
          />
        ) : (
          <EventForm
            clockId={state.clockIdForEvent}
            addEvent={addEvent}
            editEvent={editEvent}
            closeModal={closeModal}
            openedEvent={state.openedEvent}
          />
        ))}
    </div>
  );
};

export default App;
