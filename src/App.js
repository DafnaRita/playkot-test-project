import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Auth from './components/Auth';
import Users from './components/Users';
import sessionControlHoc from './components/hocs/sessionControlHoc';

class App extends Component {
  constructor() {
    console.log('App start');
    super();
    this.state = {
      test: 'test',
    };
  }

  render() {
    console.log('App render');
    console.log('state - ', this.state);
    console.log('props - ', this.props);
    return (
      <div>
        <Route exact
          path="/auth"
          {...this.props}
          render={() => <Auth {...this.props}
            login={this.props.login}
            logout={this.props.logout}
          />}/>
        <Route exact
          path="/users"
          {...this.props}
          render={() => <Users {...this.props}/>}/>
        <Route exact path='/' component={() => {
          return this.props.isAuthenticated ? (
            <Redirect to='/users'/>
          ) : (
            <Redirect to={{
              pathname: '/auth',
            }} />
          );
        }}/>
      </div>
    );
  }
}

export default sessionControlHoc(App);
