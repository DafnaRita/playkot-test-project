import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.css';

import Auth from './components/Auth';
import User from './components/User';

class App extends React.PureComponent {
  constructor() {
    console.log('App start');
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  login = () => {
    console.log('login');
    this.setState({ isAuthenticated: true });
  }

  logout = () => {
    console.log('logout');
    this.setState({ isAuthenticated: false });
  }

  render() {
    console.log('App render');
    const { isAuthenticated } = this.state;
    return (
      <Router>
        <div>
          <Route exact path='/' component={() => (
            isAuthenticated ? (
              <Redirect to='/users'/>
            ) : (
              <Redirect to={{
                pathname: '/auth',
              }} />
            )
          )}/>
          <Route
            path="/auth"
            render={props => <Auth {...props}
              isAuthenticated={this.state.isAuthenticated}
              login={this.login}
              logout={this.logout}
            />}/>
          <Route path="/users" component={User}/>
        </div>
      </ Router>
    );
  }
}

export default App;
