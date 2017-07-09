import React from 'react';
import Timeline from './Timeline.jsx';
import EventsList from './EventsList.jsx';
import AddEvent from './AddEvent.jsx';
import RemoveEvent from './RemoveEvent.jsx';

class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      isAddingEvent: false,
      event_time: null,
      isRemovingEvent: false,
      event_it: null
    }
  }

  render() {
    return (
      <div id="calendar">
        <Timeline onTimeChoose={this.onTimeChoose.bind(this)}/>
        <EventsList onEventChoose={this.onEventChoose.bind(this)}/>
        {this.state.isAddingEvent ? (<AddEvent event_time={this.state.event_time} closeModal={this.closeEventAddingModal.bind(this)}/>) : ""}
        {this.state.isRemovingEvent ? (<RemoveEvent event_it={this.state.event_it} closeModal={this.closeEventRemovingModal.bind(this)}/>) : ""}
      </div>
    );
  }

  onTimeChoose(time) {
    this.setState({
      isAddingEvent: true,
      event_time: time
    });
  }

  onEventChoose(it) {
    this.setState({
      isRemovingEvent: true,
      event_it: it
    });
  }

  closeEventAddingModal() {
    this.setState({
      isAddingEvent: false,
      event_time: null
    });
  }

  closeEventRemovingModal() {
    this.setState({
      isRemovingEvent: false,
      event_it: null
    });
  }
}

module.exports = Calendar;
