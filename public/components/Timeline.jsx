import React from 'react';

class Timeline extends React.Component {
  render() {
    let _Timeline = [];
    for(let i = 1, hours = 8; i < 20; i++, hours += 0.5) {
      if(hours == 13) hours = 1;
      _Timeline.push(<p key={i} className={(i % 2 ? "time_even" : "time_odd")}>
        <span onClick={this.onTimeChoose(hours > 7 ? (hours - 8) * 60 : (hours + 4) * 60)}>
          {Math.floor(hours) + ":" + (i % 2 ? "00" : "30")}
        </span>
      </p>);
    }
    return (
      <div id="timeline">
        {_Timeline}
      </div>
    );
  }

  onTimeChoose(time) {
    return () => {
      this.props.onTimeChoose(time);
    }
  }
}

module.exports = Timeline;
