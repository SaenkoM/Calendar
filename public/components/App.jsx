import React from 'react';
import { connect } from 'react-redux'
import Sign_in from './Sign_in.jsx';
import Calendar from './Calendar.jsx';
import Export from './Export.jsx';

class App extends React.Component {
  render() {
    if(this.props.isLoggedIn) {
      return (
        <div>
          <Export/>
          <Calendar/>
        </div>
      );
    } else {
      return (
        <Sign_in/>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
  }
};

module.exports = connect(mapStateToProps)(App);
