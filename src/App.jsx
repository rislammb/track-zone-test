import useApp from './hooks/useApp';
import ClockForm from './components/ClockForm';
import "./styles.css";

export default function App() {
  const { state, addClock, editAdminClock, editClock, deleteClock, openModal, closeModal } = useApp();
 
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div>
        <div>
          <h2>{ state.adminClock.title }</h2>
          <p>{ state.adminClock.timeZone }</p>
          <p>{ state.adminClock.difference }</p>
        </div>
        <button onClick={openModal}>Add Clock</button>
      </div>

      { state.clocks.length > 0 && state.clocks.map(clock => (
        <div>
          <h2>{ clock.title }</h2>
          <p>{ clock.timeZone }</p>
          <p>{ clock.difference }</p>
        </div>
      ))}

      { state.open && <ClockForm addClock={addClock} editAdminClock={editAdminClock} editClock={editClock} closeModal={closeModal} openedClock={openedClock}  /> }    
    </div>
  );
}
