import React from 'react';
import { withRouter } from 'react-router';

const isExpired = () => {
  const sessionInfo = JSON.parse(window.sessionStorage.getItem('sessionInfo'));
  if (!sessionInfo) {
    return true;
  }
  if ((Date.now() - sessionInfo.tokenObj.expires_at) < 0) {
    return false;
  }
  return true;
};

function sessionControlHoc(WrappedComponent) {
  const hoc = class SessionControlHoc extends React.PureComponent {
    constructor() {
      super();
      this.state = {
        isAuthenticated: false,
      };
    }

    componentWillUpdate(nextProps, nextState) {
      if (isExpired()) {
        this.setState({ isAuthenticated: false });
      }
    }

    componentDidMount() {
      const sessionInfo = JSON.parse(window.sessionStorage.getItem('sessionInfo'));
      if (sessionInfo !== null && typeof sessionInfo === 'object' && !isExpired()) {
        this.setState({ isAuthenticated: true });
      }
    }

    login = (info) => {
      console.log('login');
      window.sessionStorage.setItem('sessionInfo', JSON.stringify(info));
      this.setState({ isAuthenticated: true });
    }

    logout = () => {
      console.log('logout');
      window.sessionStorage.removeItem('sessionInfo');
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
