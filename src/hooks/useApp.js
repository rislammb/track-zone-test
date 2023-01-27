import { useEffect, useState } from 'react';

const initial = {
  adminClock: {
    title: 'Admin Clock',
    timeZone: JSON.stringify({ title: 'UTC', minutes: 0 }),
    difference: JSON.stringify({ title: '00:00', minutes: 0 }),
  },
  clocks: [],
  openedClock: null,
  events: [],
  openedEvent: null,
  open: false,

};

const useApp = () => {
  const initialState = localStorage.getItem('FSA-CLOCK')
    ? JSON.parse(localStorage.getItem('FSA-CLOCK'))
    : initial;

  const [state, setState] = useState(initialState);

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
      openedEvent: null,
    }));
  };

  const addEvent = (clockId, { title, date, time }) => {
    const newEvent = {
      clockId,
      id: Math.random() + '-' + Math.random(),
      title,
      date,
      time,
    };

    setState((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
    }));
  };

  const editEvent = (clockId, id, { title, date, time }) => {
    if (title || date || time) {
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.events.findIndex((event) => event.id === id && event.clockId === clockId);

    if (index > -1) {
      if (title) oldState.events[index].title = title;
      if (date) oldState.events[index].date = date;
      if (time) oldState.events[index].time = time;
    }
    oldState.openedEvent = null;

    setState(oldState);
    }
  };

  useEffect(() => {
    localStorage.setItem('FSA-CLOCK', JSON.stringify(state));
  }, [state]);

  return {
    state,
    addClock,
    editAdminClock,
    editClock,
    deleteClock,
    openModal,
    closeModal,
    addEvent, 
  };
};

export default useApp;
