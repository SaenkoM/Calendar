import React from 'react';
import { connect } from 'react-redux';

class Export extends React.Component {
  render() {
    return (
      <div id="export">
        <a id="download_anchor"></a>
        <button className="btn btn-md btn-primary btn-block" onClick={this.startDownload.bind(this)}>Export data</button>
      </div>
    );
  }

  startDownload() {
    if(this.props.jsonExport.length < 3) return;

    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(this.props.jsonExport);
    let anchor = document.getElementById('download_anchor');

    anchor.setAttribute("href", dataStr);
    anchor.setAttribute("download", "Calendar.json");
    anchor.click();
  }
}

let mapStateToProps = (state) => {
  return {
    jsonExport: JSON.stringify(state.events)
  };
};

module.exports = connect(mapStateToProps)(Export);
