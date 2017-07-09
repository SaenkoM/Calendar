import React from 'react';
import { connect } from 'react-redux';

class EventsList extends React.Component {
  render() {
    return (
      <div id="events_list">
        {this.props.events.map((event, i, events) => {
          return this.renderEvent(event, i, events);
        })}
      </div>
    );
  }

  renderEvent(event, it, events) {
    let style = {
      top: event.start * 2,
      height: event.duration * 2,
      width: 200
    };

    for(let i = 0; i < events.length; i++) {
      if(i == it) continue;
      if(event.start < events[i].start + events[i].duration && event.start > events[i].start ||
        event.start + event.duration < events[i].start + events[i].duration && event.start + event.duration > events[i].start) {
        if(event.start < events[i].start) {
          style.left = 100;
        } else {
          if(events[i].flag) {
            style.left = 100;
            event.flag = false;
          } else {
            event.flag = true;
          }
        }
        style.width = 100;
        break;
      }
    }

    function onClick() {
      this.props.onEventChoose(it);
    }

    return <span key={it} className="events" style={style} onClick={onClick.bind(this)}>{event.title}</span>;
  }
}

const mapStateToProps = (state) => {
  return {
    events: JSON.parse(JSON.stringify(state.events))
  }
};

module.exports = connect(mapStateToProps)(EventsList);
