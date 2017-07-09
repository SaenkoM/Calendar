import React from 'react';
import { connect } from 'react-redux';
import { addEvent } from '../actions';

class AddEvent extends React.Component {
  render() {
    return (
      <form id="add_event" className="event_modals" onSubmit={this.addEvent.bind(this)}>
        <label htmlFor="inputStart" className="sr-only">Start</label>
        <input type="text" id="inputStart" className="form-control event_data" placeholder="Start" defaultValue={this.props.event_time} required autoFocus />

        <label htmlFor="inputDuration" className="sr-only">Duration</label>
        <input type="text" id="inputDuration" className="form-control event_data" placeholder="Duration" required />

        <label htmlFor="inputTitle" className="sr-only">Title</label>
        <input type="text" id="inputTitle" className="form-control" placeholder="Title" required />

        <button className="btn btn-md btn-primary btn-block">Save</button>
      </form>
    );
  }

  addEvent(e) {
    e.preventDefault();

    let start = Number(inputStart.value), duration = Number(inputDuration.value), title = inputTitle.value;

    if(start + duration > 540) {
      console.log("Warning: event duration can't exceed 5:00 PM");
      this.props.closeModal();
      return;
    }

    let events = this.props.events;
    for(let i = 0; i < events.length; i++) {
      if(start <= events[i].start && start + duration >= events[i].start + events[i].duration ||
      start >= events[i].start && start + duration <= events[i].start + events[i].duration) {
        console.log("Warning: event time collision");
        this.props.closeModal();
        return;
      }
    }

    this.props.dispatch(addEvent({
      start: start,
      duration: duration,
      title: title
    }));
    this.props.closeModal();

    fetch('/calendar/events', {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        start: inputStart.value,
        duration: inputDuration.value,
        title: inputTitle.value
      })
    }).then(res => {
      //Successful operation
    }).catch(function (error) {
      console.error('Failed to add event', error);
    });
  }
}

let mapStateToProps = (state) => {
  return {
    events: JSON.parse(JSON.stringify(state.events))
  }
};

module.exports = connect(mapStateToProps)(AddEvent);
