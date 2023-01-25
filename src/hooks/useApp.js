import { useState } from 'react';

const initial = {
  adminClock: {
    title: 'Admin Clock',
    timeZone: 'UTC',
    difference: '00:00',
  },
  clocks: [],
  open: false,
  openedClock: null,
};

const useApp = () => {
  const [state, setState] = useState(initial);

  const addClock = ({ title, timeZone, difference }) => {
    const newClock = {
      id: Math.random() + '-' + Math.random(),
      title,
      timeZone,
      difference,
    };

    setState((prev) => ({
      ...prev,
      clocks: [...prev.clocks, newClock],
      open: false,
    }));
  };

  const editAdminClock = ({ title, timeZone, difference }) => {
    const newClock = {
      title: title ?? state.openedClock.title,
      timeZone: timeZone ?? state.openedClock.timeZone,
      difference: difference ?? state.openedClock.difference,
    };

    setState((prev) => ({
      ...prev,
      adminClock: newClock,
      open: false,
      openedClock: null,
    }));
  };

  const editClock = (id, { title, timeZone, difference }) => {
    const newClock = {
      title: title ?? state.openedClock.title,
      timeZone: timeZone ?? state.openedClock.timeZone,
      difference: difference ?? state.openedClock.difference,
    };

    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.clocks.findIndex((clock) => clock.id === id);

    if (index > -1) {
      oldState.clocks[index] = { id, ...newClock };
    }
    oldState.open = false;
    oldState.openedClock = null;

    setState(oldState);
  };

  const deleteClock = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.clocks.findIndex((clock) => clock.id === id);

    if (index > -1) {
      oldState.clocks.splice(index, 1);
    }

    setState(oldState);
  };

  const openModal = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));

    oldState.open = true;
    if (id === 'admin') {
      oldState.openedClock = oldState.adminClock;
    } else {
      const index = oldState.clocks.findIndex((clock) => clock.id === id);

      if (index > -1) {
        oldState.openedClock = oldState.clocks[index];
      }
    }

    setState(oldState);
  };

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      open: false,
      openedClock: null,
    }));
  };

  return {
    state,
    addClock,
    editAdminClock,
    editClock,
    deleteClock,
    openModal,
    closeModal,
  };
};

export default useApp;
