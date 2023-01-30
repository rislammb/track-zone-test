import { useEffect, useState } from 'react';
import { deepClone, generateId } from '../utils.js';

// Initial state object for app
const initial = {
  adminClock: {
    title: 'Admin Clock',
    timeZone: JSON.stringify({ title: 'UTC', minutes: 0 }),
    difference: JSON.stringify({ title: '00:00', minutes: 0 }),
  },
  clocks: [],
  openedClock: null,
  clockIdForEvent: null,
  events: [],
  openedEvent: null,
  openFor: '', // clock or event
};

/**
 * useApp hooks for App.jsx component
 * @returns {object} state and other functionalities
 */
const useApp = () => {
  // Get initial state data from local storage or initial object
  const initialState = localStorage.getItem('FSA-CLOCK')
    ? JSON.parse(localStorage.getItem('FSA-CLOCK'))
    : initial;

  const [state, setState] = useState(initialState);

  /**
   * Add a user defined clock to state
   * @param {{ title: string, timeZone: string, difference: string }} clockInfo
   */
  const addClock = ({ title, timeZone, difference }) => {
    const newClock = {
      id: generateId(),
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

  /**
   * Edit admin clock
   * @param {{ title: string | undefined, timeZone: string| undefined, difference: string| undefined }} clockInfo
   */
  const editAdminClock = ({ title, timeZone, difference }) => {
    if (title || timeZone || difference) {
      const oldState = deepClone(state);

      if (title) oldState.adminClock.title = title;
      if (timeZone) oldState.adminClock.timeZone = timeZone;
      if (difference) oldState.adminClock.difference = difference;

      oldState.openFor = '';
      oldState.openedClock = null;

      setState(oldState);
    }
  };

  /**
   * Edit user defined clock
   * @param {string} id
   * @param {{ title: string | undefined, timeZone: string| undefined, difference: string| undefined }} clockInfo
   */
  const editClock = (id, { title, timeZone, difference }) => {
    if (title || timeZone || difference) {
      const oldState = deepClone(state);

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

  /**
   * Delete user defined clock and clock related event
   * @param {string} id
   */
  const deleteClock = (id) => {
    const oldState = deepClone(state);

    const index = oldState.clocks.findIndex((clock) => clock.id === id);

    if (index > -1) {
      oldState.clocks.splice(index, 1);
      oldState.events = oldState.events.filter((event) => event.clockId !== id);
    }

    setState(oldState);
  };

  /**
   * Open modal for clock or event and for add new or edit
   * @param {string} openFor
   * @param {string | undefined} clockId
   * @param {string | undefined} eventId
   */
  const openModal = (openFor, clockId, eventId) => {
    const oldState = deepClone(state);

    oldState.openFor = openFor;
    if (openFor === 'clock') {
      if (clockId) {
        if (clockId === 'admin') {
          oldState.openedClock = oldState.adminClock;
        } else {
          const index = oldState.clocks.findIndex(
            (clock) => clock.id === clockId
          );

          if (index > -1) {
            oldState.openedClock = oldState.clocks[index];
          }
        }
      }
    } else {
      oldState.clockIdForEvent = clockId;
      if (eventId) {
        const index = oldState.events.findIndex(
          (event) => event.id === eventId
        );

        if (index > -1) {
          oldState.openedEvent = oldState.events[index];
        }
      }
    }

    setState(oldState);
  };

  /**
   * Close modal
   */
  const closeModal = () => {
    setState((prev) => ({
      ...prev,
      openFor: '',
      openedClock: null,
      openedEvent: null,
      clockIdForEvent: null,
    }));
  };

  /**
   * Add a event to state with clock id
   * @param {string} clockId
   * @param {{ title: string, datetime: string  }} eventInfo
   */
  const addEvent = (clockId, { title, datetime }) => {
    const newEvent = {
      clockId,
      id: generateId(),
      title,
      datetime,
    };

    setState((prev) => ({
      ...prev,
      events: [...prev.events, newEvent],
      openFor: '',
      clockIdForEvent: null,
    }));
  };

  /**
   * Edit a event on clock
   * @param {string} id
   * @param {{ title: string | undefined, datetime: string | undefined  }} eventInfo
   */
  const editEvent = (id, { title, datetime }) => {
    if (title || datetime) {
      const oldState = deepClone(state);

      const index = oldState.events.findIndex((event) => event.id === id);

      if (index > -1) {
        if (title) oldState.events[index].title = title;
        if (datetime) oldState.events[index].datetime = datetime;
      }

      oldState.openFor = '';
      oldState.openedEvent = null;
      oldState.clockIdForEvent = null;

      setState(oldState);
    }
  };

  /**
   * Delete a event from state
   * @param {string} eventId
   */
  const deleteEvent = (eventId) => {
    const oldState = deepClone(state);

    const index = oldState.events.findIndex((event) => event.id === eventId);

    if (index > -1) {
      oldState.events.splice(index, 1);
    }

    setState(oldState);
  };

  /**
   * If any change on state, save state to local storage
   */
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
