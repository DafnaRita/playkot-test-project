import React, { PureComponent } from 'react';
import {
  Route,
  Link,
  Switch,
  Redirect,
} from 'react-router-dom';
import { withRouter } from 'react-router';

import './App.css';

import Auth from './components/Auth';
import Users from './components/Users';
import checkExpirationHoc from './components/hocs/checkExpirationHoc';

class App extends PureComponent {
  constructor() {
    console.log('App start');
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log('old props - ', this.props);
    console.log('new props - ', nextProps);
    if (nextProps.isExpired) {
      console.log('isExpired, isAuthenticated -> false ');
      this.setState({ isAuthenticated: false });
    }
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
    console.log('state - ', this.state);
    console.log('props - ', this.props);
    const { isAuthenticated } = this.state;
    return (
      <div>
        <Route exact
          path="/auth"
          render={props => <Auth {...props}
            isAuthenticated={this.state.isAuthenticated}
            login={this.login}
            logout={this.logout}
          />}/>
        <Route exact
          path="/users"
          isAuthenticated={this.state.isAuthenticated}
          render={props => <Users {...props}
            isAuthenticated={this.state.isAuthenticated}
          />}/>
        <Route exact path='/' component={(props) => {
          return isAuthenticated ? (
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

export default withRouter(checkExpirationHoc(App));
