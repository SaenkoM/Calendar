import React from 'react';
import { connect } from 'react-redux';
import { changeLoginState, loadCalendarData } from '../actions';

class Sign_in extends React.Component {
  render() {
    return (
      <div className="container">
        <form className="sign-in_form" onSubmit={this.onSubmit(this.props.dispatch)}>
          <label htmlFor="inputLogin" className="sr-only">Login</label>
          <input type="text" id="inputLogin" className="form-control" placeholder="Login" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }

  onSubmit(dispatch) {
    return (e) => {
      e.preventDefault();

      fetch('/login', {
        method: 'post',
        credentials: 'include',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          username: inputLogin.value,
          password: inputPassword.value
        })
      }).then(res => {
        return res.json();
      }).then(function (data) {
        dispatch(loadCalendarData(data));
        dispatch(changeLoginState(true));
      }).catch(function (error) {
        console.error('Login request failed', error);
      });
    }
  }
}

module.exports = connect()(Sign_in);
