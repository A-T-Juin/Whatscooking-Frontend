import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import Login from './components/authfx/Login';
import {blargh} from './components/authfx/VerificationCalls';
import Userdash from './components/Userdash';
import ProtectedRoute from './components/authfx/PrivateRoute';
import LoginPage from './components/viewerfx/LoginPage';

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: "",
      authorization: false
    }
  }

  authorize = () => {
    this.setState({
      authorization: !this.state.authorization
    })
  }

  logOut = () => {
    this.setState({
      authorization: false
    });
    sessionStorage.clear();
  }

  render() {
    return (
      <Router>
        {this.state.authorization ? <Userdash logout={this.logOut} /> : <LoginPage auth={this.authorize} />}
      </Router>
    );
  }
}

export default App;
