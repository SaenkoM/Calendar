module.exports = {
  changeLoginState: (isLoggedIn) => ({
    type: 'CHANGE_LOGIN_STATE',
    isLoggedIn
  }),
  loadCalendarData: (data) => ({
    type: 'LOAD_CALENDAR_DATA',
    data
  }),
  addEvent: (event) => ({
    type: 'ADD_EVENT',
    event
  }),
  removeEvent: (id) => ({
    type: 'REMOVE_EVENT',
    id
  })
};
