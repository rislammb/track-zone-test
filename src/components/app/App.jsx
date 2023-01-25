import useApp from '../../hooks/useApp';
import ClockForm from '../clock-form/ClockForm';
import Clock from '../clock/Clock';

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
  } = useApp();

  return (
    <div className='app'>
      <Title color={'primary'} p={'12px 8px'}>
        Track Zone App
      </Title>
      <Flex ai={'start'}>
        <Clock adminClock={state.adminClock} openModal={openModal} />
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
              openModal={openModal}
              deleteClock={deleteClock}
            />
          ))}
      </Flex>

      {state.open && (
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
