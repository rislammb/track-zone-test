import { useState, useEffect } from 'react';

const initial = {
  adminClock: {
    title: 'admin Clock',
    timeZone: 'UTC',
    difference: '00:00'
  },
  clocks: [],
  open: false, 
  openedClock: null
};

const useApp = () => {
  const [state, setState] = useState(initial);

  const addClock = ({ title, timeZone, difference }) => {
    const newClock = { id: Math.random() + '-' + Math.random(), title, timeZone, difference };

    setState(prev => ({
      ...prev, 
      clocks: [...prev.clocks, newClock],
      open: false
    }))
  };

  const editUserClock = ({ title, timeZone, difference }) => {
    const newClock = { 
      title: title ?? state.userClick.title,
      timeZone: timeZone ?? state.userClick.timeZone,
      difference: difference ?? state.userClick.difference
    };
      
    setState(prev => ({
      ...prev, 
      userClock: newClock,
      open: false,
      openedClock: null
    }))
  };

  const editClock = (id, { title, timeZone, difference }) => {
    const newClock = { 
      title: title ?? state.userClick.title,
      timeZone: timeZone ?? state.userClick.timeZone,
      difference: difference ?? state.userClick.difference
    };
    
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.clocks.findIndex(clock => clock.id === id);

    if (index > -1) {
      oldState.clocks[index] = {id, ...newClock}
    }
    oldState.open = false;
    oldState.openedClock = null;

    setState(oldState)
  };


  const deleteClock = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.clocks.findIndex(clock => clock.id === id);

    if (index > -1) {
      oldState.clocks.splice(index, 1);
    }

    setState(oldState)
  };

  const openModal = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));

    oldState.open = true; 
    if (id === 'admin') {
      oldState.openedClock = oldState.adminClock
    } else {
      const index = oldState.clocks.findIndex(clock => clock.id === id);

      if (index > -1) {
        oldState.openedClock = oldState.clocks[index];
      }
    }

    setState(oldState)
  };

  const closeModal = ({ title, timeZone, difference }) => {
    setState(prev => ({
      ...prev,
      open: false
    }))
  };

  return {
    state, 
    addClock, 
    editUserClock, 
    editClock, 
    deleteClock, 
    openModal,
    closeModal
  }
};

export default useApp;
