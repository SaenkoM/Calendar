import React from 'react';
import { connect } from 'react-redux';
import { removeEvent } from '../actions';

class RemoveEvent extends React.Component {
  render() {
    return (
      <div id="remove_event" className="event_modals">
        <p>Delete this event?</p>
        <div><button className="btn btn-md btn-primary btn-block" onClick={this.doNotRemoveEvent.bind(this)}>No</button></div>
        <div><button className="btn btn-md btn-primary btn-block" onClick={this.removeEvent.bind(this)}>Yes</button></div>
      </div>
    );
  }

  doNotRemoveEvent() {
    this.props.closeModal();
  }

  removeEvent() {
    let event_it = this.props.event_it;
    
    this.props.dispatch(removeEvent(event_it));
    this.props.closeModal();

    fetch('/calendar/events/' + event_it, {
      method: 'delete',
      credentials: 'include',
      headers: {
        "Content-type": "application/json"
      },
    }).then(res => {
      //Successful operation
    }).catch(function (error) {
      console.error('Failed to remove event', error);
    });
  }
}

module.exports = connect()(RemoveEvent);
