let initialState = {
  isLoggedIn: false,
  day: 1,
  events: []
};

const calendar = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_LOGIN_STATE':
      return Object.assign({}, state, {
        isLoggedIn: action.isLoggedIn
      });
    case 'LOAD_CALENDAR_DATA':
      return Object.assign({}, state, {
        day: action.data.day,
        events: action.data.events
      });
    case 'ADD_EVENT':
      return Object.assign({}, state, {
        events: [...state.events, action.event]
      });
    case 'REMOVE_EVENT': {
      return Object.assign({}, state, {
        events: [...state.events.slice(0, action.id), ...state.events.slice(action.id + 1)]
      });
    }
    default:
      return state
  }
};

export default calendar
