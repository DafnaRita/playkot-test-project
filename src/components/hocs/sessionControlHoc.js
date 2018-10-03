import React from 'react';
import { withRouter } from 'react-router';

const removeToken = () => {

};

const isExpired = () => {
  //TODO: проверяем что в SS, если истек - удаляем и возвращаем true, если нет- false
  console.log("is Expired? - ", window.sessionStorage.getItem('tokenStatus'));
  if (window.sessionStorage.getItem('tokenStatus') === 'expired') {
    return true;
  }
  return false;
};

function sessionControlHoc (WrappedComponent) {
  const hoc = class SessionControlHoc extends React.PureComponent {
    constructor() {
      console.log('SessionControl start');
      super();
      this.state = {
        isAuthenticated: false,
      };
    }

    /*componentDidMount() {
      const sessionInfo = JSON.parse(window.sessionStorage.getItem('sessionInfo'));
    }*/

    login = () => {
      console.log('login');
      this.setState({ isAuthenticated: true });
    }

    logout = () => {
      console.log('logout');
      this.setState({ isAuthenticated: false });
    }

    render() {
      return (
        <WrappedComponent
          isAuthenticated={ !isExpired() && this.state.isAuthenticated }
          login={this.login}
          logout={this.logout}
          {...this.state}>
          {this.children}
        </WrappedComponent>
      );
    }
  };
  return withRouter(hoc);
};

export default sessionControlHoc;
