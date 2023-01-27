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
  openFor: '', // clock or event

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
      openFor: '',
    }));
  };

  const editAdminClock = ({ title, timeZone, difference }) => {
    if (title || timeZone || difference) {
      const oldState = JSON.parse(JSON.stringify(state));

      if (title) oldState.adminClock.title = title;
      if (timeZone) oldState.adminClock.timeZone = timeZone;
      if (difference) oldState.adminClock.difference = difference;

      oldState.openFor = '';
      oldState.openedClock = null;

      setState(oldState);
    }
  };

  const editClock = (id, { title, timeZone, difference }) => {
    if (title || timeZone || difference) {
      const oldState = JSON.parse(JSON.stringify(state));
      const index = oldState.clocks.findIndex((clock) => clock.id === id);

      if (index > -1) {
        if (title) oldState.clocks[index].title = title;
        if (timeZone) oldState.clocks[index].timeZone = timeZone;
        if (difference) oldState.clocks[index].difference = difference;
      }
      oldState.openFor = '';
      oldState.openedClock = null;

      setState(oldState);
    }
  };

  const deleteClock = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.clocks.findIndex((clock) => clock.id === id);

    if (index > -1) {
      oldState.clocks.splice(index, 1);
    }

    setState(oldState);
  };

  const openModal = (openFor, id) => {
    const oldState = JSON.parse(JSON.stringify(state));

    oldState.openFor = openFor;
    if (openFor === 'clock') {
      if (id) {
        if (id === 'admin') {
          oldState.openedClock = oldState.adminClock;
        } else {
          const index = oldState.clocks.findIndex((clock) => clock.id === id);

          if (index > -1) {
            oldState.openedClock = oldState.clocks[index];
          }
        }
      }
    } else {
      if (id) {
        const index = oldState.events.findIndex((event) => event.id === id);

        if (index > -1) {
          oldState.openedEvent = oldState.events[index];
        }
      }
    }

    setState(oldState);
  };

  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      openFor: '',
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
      openFor: '',
    }));
  };

  const editEvent = (id, { title, date, time }) => {
    if (title || date || time) {
      const oldState = JSON.parse(JSON.stringify(state));
      const index = oldState.events.findIndex((event) => event.id === id);

      if (index > -1) {
        if (title) oldState.events[index].title = title;
        if (date) oldState.events[index].date = date;
        if (time) oldState.events[index].time = time;
      }

      oldState.openFor = ''; 
      oldState.openedEvent = null;

      setState(oldState);
    }
  };

  const deleteEvent = (id) => {
    const oldState = JSON.parse(JSON.stringify(state));
    const index = oldState.events.findIndex((event) => event.id === id);

    if (index > -1) {
      oldState.events.splice(index, 1);
    }

    setState(oldState);
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
    editEvent,
    deleteEvent,
  };
};

export default useApp;
