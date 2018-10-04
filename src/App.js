import React, { Component } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Auth from './components/Auth';
import UserList from './components/UserList';
import sessionControlHoc from './components/hocs/sessionControlHoc';

const App = (props) => {
  return (
    <div>
      <Route exact
        path="/auth"
        {...props}
        render={() => <Auth {...props}
          login={props.login}
          logout={props.logout}
        />}/>
      <Route exact
        path="/users"
        {...props}
        render={() => <UserList {...props}/>}/>
      <Route exact path='/' component={() => {
        return props.isAuthenticated ? (
          <Redirect to='/users'/>
        ) : (
          <Redirect to={{
            pathname: '/auth',
          }} />
        );
      }}/>
    </div>
  );
};

export default sessionControlHoc(App);
