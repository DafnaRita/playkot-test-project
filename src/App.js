import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import './App.css';

import Auth from './components/Auth';
import UserList from './components/UserList';
import PersonalPage from './components/PersonalPage';
import Header from './components/Header';
import sessionControlHoc from './app/hocs/sessionControlHoc';

const App = (props) => {
  return (
    <div>
      <Header {...props}/>
      <Route exact
        path="/auth"
        {...props}
        render={() => <Auth {...props}
          login={props.login}
          logout={props.logout}
        />}/>
      <Switch>
        <Route exact
          path="/users"
          {...props}
          render={() => <UserList {...props}/>}/>
        <Route exact
          path="/users/:number"
          {...props}
          render={() => <PersonalPage {...props}/>}/>
      </Switch>
      <Route exact path='/' component={() => {
        console.log('props.isAuthenticated - ', props.isAuthenticated)
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
