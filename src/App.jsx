import useApp from './hooks/useApp';
import Clock from './components/Clock';
import ClockForm from './components/ClockForm';

import Title from './ui/Title';
import Button from './ui/Button';

import "./styles.css";

export default function App() {
  const { state, addClock, editAdminClock, editClock, deleteClock, openModal, closeModal } = useApp();
 
  return (
    <div className="app">
      <Title>Track Zone App</Title>
      <div>
        <Clock adminClock={state.adminClock} openModal={openModal} />
        <Button onClick={openModal}>Add Clock</Button>
      </div>

      { state.clocks.length > 0 && state.clocks.map(clock => 
         <Clock key={clock.id} adminClock={state.adminClock} openModal={openModal} deleteClock={deleteClock} />
      )}

      { state.open && <ClockForm addClock={addClock} editAdminClock={editAdminClock} editClock={editClock} closeModal={closeModal} openedClock={state.openedClock}  /> }    
    </div>
  );
}
