import { useState } from 'react';

const initial = {
  events: [],
  open: false, 
  openedEvent: null
};

const useClock = () => {
  const [state, setState] = useState(initial);

  const addEvent = ({ title, date, time }) => {
    const newEvent = { id: Math.random() + '-' + Math.random(), title, date, time };

    setState(prev => ({
      ...prev, 
      events: [...prev.events, newEvent],
      open: false
    }))
  };

  const editEvent = (id, { title, date, time }) => {
    const newEvent = { 
      title: title ?? state.openedEvent.title,
      date: date ?? state.openedEvent.date,
      time: time ?? state.openedEvent.time
    };
    
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.events.findIndex(event => event.id === id);

    if (index > -1) {
      oldState.events[index] = {id, ...newEvent}
    }
    oldState.open = false;
    oldState.openedEvent = null;

    setState(oldState)
  };


  const deleteEvent = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.events.findIndex(event => event.id === id);

    if (index > -1) {
      oldState.events.splice(index, 1);
    }

    setState(oldState)
  };

  const openModal = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));

    oldState.open = true; 
      const index = oldState.events.findIndex(event => event.id === id);

      if (index > -1) {
        oldState.openedEvent = oldState.events[index];
      }
    

    setState(oldState)
  };

  const closeModal = () => {
    setState(prev => ({
      ...prev,
      open: false
    }))
  };

  return {
    state, 
    addEvent, 
    editEvent, 
    deleteEvent, 
    openModal,
    closeModal
  }
};

export default useClock;
