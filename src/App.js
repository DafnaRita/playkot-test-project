import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';

import Auth from './components/Auth';
import UserList from './components/UserList';
import User from './components/User';

const App = () => {
  console.log('app');
  return (
    <Router>
      <div>
        <Route path='/auth' component={Auth}></Route>
        <Switch>
          <Route path='/users/:number' component={User}></Route>
          <Route path='/users' component={UserList}></Route>
        </Switch>
      </div>
    </ Router>
  );
};

export default App;
