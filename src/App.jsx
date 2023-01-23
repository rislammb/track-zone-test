import useApp from '../hooks/useApp';
import "./styles.css";

export default function App() {
  const { state, addClock, editUserClock, editClock, deleteClock, openModal, closeModal } = useApp();
 
  const handleSubmit = e => {
    e.preventDefault()

    addClock({ title: 'Test', timeZone: 'GMT', difference: '02:15' })
  }
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

      { state.open && (
        <div>
          <button onClick={closeModal}>Close</button>
          <form onSubmit={ handleSubmit }>
            <input />
            <input />
            <button>ADD</button>
          </form>
        </div>
      )}    
    </div>
  );
}
